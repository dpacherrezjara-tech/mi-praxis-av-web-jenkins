
Ext.define('Ext.Praxis.controller.payments.BalanceAnalysisByAge.BalanceAnalysisByAgeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BalanceAnalysisByAgeController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    reg99: 0,
    me: '',
    dup: '',
    typeBean: '',
    searchParams: {},
    searchParams2: {},
    searchParams3: {},
    searchParams4: {},
    paramsDetail: {},
    paramsObtainData: {},
    paramsTKT: {},
    dataObtain: {},
    beanTKT: {},
    bean_detail: {},
    beanCountryTotal: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'BalanceAnalysisByAgeForm';
        prototype.url = CONTEXTPATH + '/BalanceAnalysisByAge';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridSumaryMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#BalanceAnalysisByAgeForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#BalanceAnalysisByAgeForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#BalanceAnalysisByAgeForm-btnClear': {
                click: this.btnClear_click
            },
            '#BalanceAnalysisByAgeForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#BalanceAnalysisByAgeForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#BalanceAnalysisByAgeForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#BalanceAnalysisByAgeForm-btnBack': {
                click: this.btnBack_click
            },
            '#BalanceAnalysisByAgeForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#BalanceAnalysisByAgeForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#BalanceAnalysisByAgeForm-btn-pag-next': {
                click: this.pagNext
            },
            '#BalanceAnalysisByAgeForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#BalanceAnalysisByAgeForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#BalanceAnalysisByAgeForm-cmbDateToYear': {
                select: this.selectComboToYear
            },
            '#BalanceAnalysisByAgeForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#BalanceAnalysisByAgeForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
        });
    },
    xpanel_afterrender: function (obj, e) {


        $('#BalanceAnalysisByAgeForm-btnToggleSwitchPending').on('change', function () {

            var toggleCmp = Ext.getCmp(prototype.id + '-btnToggleSwitchPending');
            var isChecked = toggleCmp.getEl().down('input.toggle-input').dom.checked;
            if (isChecked) {
                Ext.getCmp(prototype.id + '-pieF1').setVisible(false);
                Ext.getCmp(prototype.id + '-pieF2').setVisible(false);
                Ext.getCmp(prototype.id + '-pieAcc').setVisible(false);
                Ext.getCmp(prototype.id + '-spacef1').setVisible(false);
                Ext.getCmp(prototype.id + '-spacef2').setVisible(false);
                Ext.getCmp(prototype.id + '-codeF1').setVisible(true);
                console.log('Pending View activo');
            } else {
                console.log('All View activo');
                Ext.getCmp(prototype.id + '-pieF1').setVisible(true);
                Ext.getCmp(prototype.id + '-pieF2').setVisible(true);
                Ext.getCmp(prototype.id + '-pieAcc').setVisible(true);
                Ext.getCmp(prototype.id + '-spacef1').setVisible(true);
                Ext.getCmp(prototype.id + '-spacef2').setVisible(true);
                Ext.getCmp(prototype.id + '-codeF1').setVisible(false);
            }
        });

        $('#BalanceAnalysisByAgeForm-btnToggleSwitchCashOrCredit').on('change', function () {

            var toggleCmp = Ext.getCmp(prototype.id + '-btnToggleSwitchCashOrCredit');
            var isChecked = toggleCmp.getEl().down('input.toggle-input').dom.checked;
            if (isChecked) {
                me.panelActual = '-panelGridSumaryMainCash';
                Ext.getCmp(prototype.id + '-panelGridSumaryMain').hide();
                Ext.getCmp(prototype.id + '-panelGridSumaryMainCash').show();
            } else {
                me.panelActual = '-panelGridSumaryMain';
                Ext.getCmp(prototype.id + '-panelGridSumaryMain').show();
                Ext.getCmp(prototype.id + '-panelGridSumaryMainCash').hide();
            }
            me.btnSearch_click();
        });


        this.setStoreData();
        this.getDataAudit();
        this.obtainData();



    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        console.log(storeComboDataYear, 'comboToYear')
        console.log(comboToYear, 'comboToYear')
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
    selectComboFromMonth: function (obj) {
        console.log(obj, 'obj from month')
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function (obj) {
        console.log(obj, 'obj to month')
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },

    //<editor-fold defaultstate="collapsed" desc="setStoreData">
    setStoreData: function () {
        var month = this.fecha.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);

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


    },
    getDataAudit: function () {

        Ext.Ajax.request({
            url: prototype.url + '/getDataAudit',
            method: 'POST',
            timeout: 60000000,
//            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                beanString: JSON.stringify({})
            },
            success: function (response, options) {
//                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res.result, 'res.result')
                console.log(res.result.MESSAGE, 'res.result.MESSAGE')
                if (res.result.MESSAGE.includes('YES')) {
                    Ext.getCmp(prototype.id + '-txtFECR').setValue(res.result.strFormatDate)
                    Ext.getCmp(prototype.id + '-txtHOCR').setValue(res.result.HOCR)
                } else {
                    Ext.getCmp(prototype.id + '-txtFECR').setValue('')
                    Ext.getCmp(prototype.id + '-txtHOCR').setValue('')
                }



                global.clear();
            },
            failure: function (response, opts) {
//                Ext.getBody().unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });

        Ext.Ajax.request({
            url: prototype.url + '/obtainCodeError',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify({})
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);

                // Tomamos el array correcto (ajusta si tu backend usa otro nombre)
                var data = res.data || [];

                // 🔹 NORMALIZAR: solo CODE y NAME
                var dataCorregida = Ext.Array.map(data, function (item) {
                    return {
                        CODE: item.CODE,
                        NAME: item.NAME
                    };
                });

                var storeCodeError = Ext.create('Ext.data.Store', {
                    fields: ['CODE', 'NAME'],
                    data: dataCorregida,
                    autoLoad: true
                });

                var cmb = Ext.getCmp(prototype.id + '-cmbCodeError');
                cmb.bindStore(storeCodeError);
                cmb.setValue('');

                global.clear();
            },

            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    obtainData: function () {

        this.paramsObtainData.BANK = 2;
        this.paramsObtainData.COUNTRY = 2;
        this.paramsObtainData.CARD = 2;
        this.paramsObtainData.IN_PF122CODPR = 2;

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
//            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {
//                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                console.log(res, 'res')
                me.lstBank = res.lstBank;
                me.lstCard = res.lstCard;
                me.lstCountry = res.lstCountry;
                me.lstProcessor = res.listaProcesadores;

                var storeData = Ext.create('Ext.data.Store', {
                    data: me.lstBank,
                    autoLoad: true
                });

                var storeData3 = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });

                var storeData4 = Ext.create('Ext.data.Store', {
                    data: me.lstProcessor,
                    autoLoad: true
                });

                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

                Ext.getCmp(prototype.id + '-cmbProcessor').bindStore(storeData4);
                Ext.getCmp(prototype.id + '-cmbProcessor').setValue('');

                global.clear();
                me.btnSearch_click();
            }
        });


    },

    setFormatParameter: function () {
        me.bean = {};
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtAGENCY').getValue();
        me.bean.IN_PERCENTAGE = Ext.getCmp(prototype.id + '-cmbPercentage').getValue();

        console.log(me.bean, 'me.bean primer parameter')
        var beanString = JSON.stringify(me.bean);
        searchParams2 = {
            beanString: beanString,
            bean: me.bean
        };
    },
    setFormatParameter2: function () {
        me.bean = {};
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtAGENCY').getValue();
        me.bean.IN_PERCENTAGE = Ext.getCmp(prototype.id + '-cmbPercentage').getValue();
        me.bean.IN_CANAL = Ext.getCmp(prototype.id + '-cmbSource').getValue();
        me.bean.IN_CUTDAYS = Ext.getCmp(prototype.id + '-txtCUTDAYS').getValue();
        me.bean.IN_TOP = Ext.getCmp(prototype.id + '-cmbTOP').getValue();
        me.bean.IN_CCUST = Ext.getCmp(prototype.id + '-cmbAviancaGroup').getValue();
        console.log(Ext.getCmp(prototype.id + '-chkboxTypeRecord').getValue(), 'dadadadadada0')
        me.bean.IN_TREG = Ext.getCmp(prototype.id + '-chkboxTypeRecord').getValue() ? '1' : '2';
        me.bean.IN_SURPLUS = Ext.getCmp(prototype.id + '-chkboxSurplus').getValue() ? '1' : '2';


        console.log(me.bean, 'me.bean segundo parameter')
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    setFormatParameter3: function () {
        me.bean = {};
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtAGENCY').getValue();
        me.bean.IN_PERCENTAGE = Ext.getCmp(prototype.id + '-cmbPercentage').getValue();
        me.bean.IN_CANAL = Ext.getCmp(prototype.id + '-cmbSource').getValue();
        me.bean.IN_CUTDAYS = Ext.getCmp(prototype.id + '-txtCUTDAYS').getValue();
        me.bean.IN_TOP = Ext.getCmp(prototype.id + '-cmbTOP').getValue();
        me.bean.IN_CCUST = Ext.getCmp(prototype.id + '-cmbAviancaGroup').getValue();
        me.bean.IN_DATE = 'SALEDATE';
        me.bean.IN_SELECT = Ext.getCmp(prototype.id + '-rbgFlag').getValue().rb;


        console.log(me.bean, 'me.bean TERCER parameter')
        var beanString = JSON.stringify(me.bean);
        searchParams3 = {
            beanString: beanString,
            bean: me.bean
        };
    },
    setFormatParameter4: function () {
        me.bean = {};
        me.bean.SENTDATE = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_DATE = 'VALDATE';
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();

        console.log(me.bean, 'me.bean CUARTO parameter')
        var beanString = JSON.stringify(me.bean);
        searchParams4 = {
            beanString: beanString,
            bean: me.bean
        };
    },
    btnSearch_click: function (obj, e) {

        let panelReportDay = Ext.getCmp(prototype.id + '-boxPendingData')
        let panelMain = Ext.getCmp(prototype.id + '-boxMainData')
        let panelSumaryMonth = Ext.getCmp(prototype.id + '-boxSumaryMonthData')
        let panelSumaryCanal = Ext.getCmp(prototype.id + '-boxSumaryCanalData')
        let panelSumaryCompany = Ext.getCmp(prototype.id + '-boxSumaryCompanyData')
        let panelSumaryCountry = Ext.getCmp(prototype.id + '-boxSumaryCountryData')
        let panelMainDataCLAtot = Ext.getCmp(prototype.id + '-boxMainDataCLAtot')
        let panelGroupDataCLAtot = Ext.getCmp(prototype.id + '-boxGroupDataCLAtot')
        let panelMainDataCLA = Ext.getCmp(prototype.id + '-boxMainDataCLA')
        let panelGroupDataCLA = Ext.getCmp(prototype.id + '-boxGroupDataCLA')
        let panelDataProvisions = Ext.getCmp(prototype.id + '-boxDataProvisions')
        let panelGridData = Ext.getCmp(prototype.id + '-panelGridData')
        let panelGridConciliation = Ext.getCmp(prototype.id + '-panelGridConciliation')
        let panelGridConciliationMDP = Ext.getCmp(prototype.id + '-panelGridConciliationMDP')
        let panelGridSumaryMain = Ext.getCmp(prototype.id + '-panelGridSumaryMain')
        let panelGridSumaryMainCash = Ext.getCmp(prototype.id + '-panelGridSumaryMainCash')
        console.log(panelGridSumaryMain.isVisible(), 'VISIBILIDAD')

        if (panelGridSumaryMain.isVisible()) {
            console.log(1)
            this.setFormatParameterDashboard();
            this.setGridDataDashboard();
        } else if (panelGridSumaryMainCash.isVisible()) {
            console.log(1)
            this.setFormatParameterDashboard();
            this.setGridDataDashboardCash();
        } else if (panelGridConciliationMDP.isVisible()) {
            this.setFormatParameter2();
            this.setGridDataConciliationMDP();
        } else if (panelGridConciliation.isVisible()) {
            this.setFormatParameter2();
//            this.setGridDataConciliationMDP();
            this.setGridDataConciliation();
        } else if (panelReportDay.isVisible()) {
            me.typeBean = 'S' //Search
            this.setFormatParameter2();
            this.setGridReportDay();
        } else if (panelGridConciliation.isVisible()) {
            console.log('ENTRE DOS')
            this.setFormatParameter2();
            this.setGridDataConciliation();
        } else if (panelMain.isVisible()) {
            this.setFormatParameter();
            this.setGridData();
        } else if (panelSumaryMonth.isVisible()) {
            this.setFormatParameter2();
            this.setGridSumaryMonth();
        } else if (panelSumaryCanal.isVisible()) {
            this.setFormatParameter2();
            this.setGridSumaryCanal();
        } else if (panelSumaryCompany.isVisible()) {
            this.setFormatParameter2();
            this.setGridSumaryCompany();
        } else if (panelSumaryCountry.isVisible()) {
            this.setFormatParameter2();
            this.setGridSumaryCountry();
        } else if (panelMainDataCLAtot.isVisible() || panelGroupDataCLAtot.isVisible()) {
            this.setFormatParameter3();
            this.searchClarificationTOT();
        } else if (panelMainDataCLA.isVisible() || panelGroupDataCLA.isVisible()) {
            this.setFormatParameter3();
            this.searchClarification();
        } else if (panelGridData.isVisible()) {
            console.log('ENTRE UNO')
            this.setFormatParameter2();
            this.setGridDataTotal();
        } else if (panelDataProvisions.isVisible()) {
            this.setFormatParameter4();
            this.searchProvisions();
        }
    },
    onChkboxPending: function (checkbox, newValue, oldValue) {
        console.log(newValue, 'newValue')
        this.btnSearch_click()
    },
    onChkboxSurplus: function (checkbox, newValue, oldValue) {
        console.log(newValue, 'newValue')
        this.btnSearch_click()
    },
    isEmpty: function (elemento) {
        if (elemento.getValue() === '') {
            return true;
        } else {
            return false;
        }
    },
    onReportDayPending: function () {
        let panelReportDay = Ext.getCmp(prototype.id + '-boxPendingData')
        let panelMain = Ext.getCmp(prototype.id + '-boxMainData')
        if (!panelReportDay.isVisible()) {
            this.setFormatParameter2();
            this.setGridReportDay()
            panelReportDay.show()
            panelMain.hide()
        } else {
            panelReportDay.hide()
            me.panelActual = '-boxMainData';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.setFormatParameter();
            this.setGridData()
            panelMain.show()
        }
    },
    setGridDataTotal: function () {
        win.lblUser_toolTip("Estructura: MPF108");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchSalesTotal'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj, obj2, success, response, obj5) {

                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                        var pag = Ext.getCmp(prototype.id + '-paggin7');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        var res = Ext.JSON.decode(response._response.responseText);
                        console.log(res.data, 'res.dadadatratata')


                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-graficosAños').bindStore('Ext.data.Store', {data: [], autoLoad: true});
                            Ext.getCmp(prototype.id + '-graficosAñosAmount').bindStore('Ext.data.Store', {data: [], autoLoad: true});
                            Ext.getCmp(prototype.id + '-displayPolarST').bindStore(Ext.create('Ext.data.Store', {data: [], autoLoad: true}));
                            Ext.getCmp(prototype.id + '-displayPolarST_T').bindStore('Ext.data.Store', {data: [], autoLoad: true});
                            Ext.getCmp(prototype.id + '-displayPolarST2').bindStore('Ext.data.Store', {data: [], autoLoad: true});
                            Ext.getCmp(prototype.id + '-displayPolarST2_T').bindStore('Ext.data.Store', {data: [], autoLoad: true});
                            Ext.getCmp(prototype.id + '-gridData').setStore(Ext.create('Ext.data.TreeStore', {root: {}}));
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            let storeDataBard = Ext.create('Ext.data.Store', {
                                data: res.data2,
                                autoLoad: true
                            });
                            //VENTA

                            let item = {};
                            let item2 = {};
                            let totals = [];
                            let charts = [];
                            let pendingPerc = (obj.data.items[0].data.totAPEND / obj.data.items[0].data.totASALES) * 100;
                            let paidPerc = (obj.data.items[0].data.totAMATCH / obj.data.items[0].data.totASALES) * 100;
                            if (obj.data.items.length > 0) {
                                item2.Perc2 = obj.data.items[0].data.totAPEND;
                                var pending = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totAPEND, '0,000') + "\n" + Ext.util.Format.number(pendingPerc, '0.00%');
                                item2.VENDOR = pending;
                                totals.push(item2);

                                item.Perc2 = obj.data.items[0].data.totAMATCH;
                                var Paid = "Payed:\n" + Ext.util.Format.number(obj.data.items[0].data.totAMATCH, '0,000') + "\n" + Ext.util.Format.number(paidPerc, '0.00%');
                                item.VENDOR = Paid;
                                totals.push(item);
                            } else {
                                totals.push({})
                            }


                            var storeData1er = Ext.create('Ext.data.Store', {
                                data: totals,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-displayPolarST').bindStore(storeData1er);
                            Ext.getCmp(prototype.id + '-lblTittleSalesTotal').setText('Totals Sales Amount USD: ' + Ext.util.Format.number(obj.data.items[0].data.totASALES, '0,000'))


                            let item_T = {};
                            let item2_T = {};
                            let totals_T = [];
                            let charts_T = [];
                            pendingPerc = (obj.data.items[0].data.totQPEND / obj.data.items[0].data.totQSALES) * 100;
                            paidPerc = (obj.data.items[0].data.totQMATCH / obj.data.items[0].data.totQSALES) * 100;
                            if (obj.data.items.length > 0) {
                                item2_T.Perc2 = obj.data.items[0].data.totQPEND;
                                var pending = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totQPEND, '0,000') + "\n" + Ext.util.Format.number(pendingPerc, '0.00%');
                                item2_T.VENDOR = pending;
                                totals_T.push(item2_T);

                                item_T.Perc2 = obj.data.items[0].data.totQMATCH;
                                var Paid = "Payed:\n" + Ext.util.Format.number(obj.data.items[0].data.totQMATCH, '0,000') + "\n" + Ext.util.Format.number(paidPerc, '0.00%');
                                item_T.VENDOR = Paid;
                                totals_T.push(item_T);
                            } else {
                                totals_T.push({})
                            }


                            var storeData1er = Ext.create('Ext.data.Store', {
                                data: totals_T,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-displayPolarST_T').bindStore(storeData1er);
                            Ext.getCmp(prototype.id + '-lblTittleSalesTotal_T').setText('Totals Sales Ticket: ' + Ext.util.Format.number(obj.data.items[0].data.totQSALES, '0,000'))

                            //// CONTABILIDAD

                            let item3 = {};
                            let item4 = {};
                            let totals2 = [];
                            let charts2 = [];
                            let totalContab = obj.data.items[0].data.totAPOLIC + obj.data.items[0].data.totAPOLIPE
                            paidPerc = (obj.data.items[0].data.totAPOLIC / totalContab) * 100;
                            pendingPerc = (obj.data.items[0].data.totAPOLIPE / totalContab) * 100;
                            if (obj.data.items.length > 0) {
                                item4.Perc2 = obj.data.items[0].data.totAPOLIC;
                                var pending = "Processed:\n" + Ext.util.Format.number(obj.data.items[0].data.totAPOLIC, '0,000') + "\n" + Ext.util.Format.number(paidPerc, '0.00%');
                                item4.VENDOR = pending;
                                totals2.push(item4);

                                item3.Perc2 = obj.data.items[0].data.totAPOLIPE;
                                var Paid = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totAPOLIPE, '0,000') + "\n" + Ext.util.Format.number(pendingPerc, '0.00%');
                                item3.VENDOR = Paid;
                                totals2.push(item3);
                            } else {
                                totals2.push({})
                            }


                            var storeData1er = Ext.create('Ext.data.Store', {
                                data: totals2,
                                autoLoad: true
                            });

                            Ext.getCmp(prototype.id + '-displayPolarST2').bindStore(storeData1er);
                            Ext.getCmp(prototype.id + '-lblTittleSalesTotal2').setText('Totals Accounting Amount USD: ' + Ext.util.Format.number(totalContab, '0,000'))


                            let item3_T = {};
                            let item4_T = {};
                            let totals2_T = [];
                            let charts2_T = [];
                            let totalContab_T = obj.data.items[0].data.totQPOLIC + obj.data.items[0].data.totQPOLIPE
                            paidPerc = (obj.data.items[0].data.totQPOLIC / totalContab_T) * 100;
                            pendingPerc = (obj.data.items[0].data.totQPOLIPE / totalContab_T) * 100;
                            if (obj.data.items.length > 0) {
                                item4_T.Perc2 = obj.data.items[0].data.totQPOLIC;
                                var pending = "Processed:\n" + Ext.util.Format.number(obj.data.items[0].data.totQPOLIC, '0,000') + "\n" + Ext.util.Format.number(paidPerc, '0.00%');
                                item4_T.VENDOR = pending;
                                totals2_T.push(item4_T);

                                item3_T.Perc2 = obj.data.items[0].data.totQPOLIPE;
                                var Paid = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totQPOLIPE, '0,000') + "\n" + Ext.util.Format.number(pendingPerc, '0.00%');
                                item3_T.VENDOR = Paid;
                                totals2_T.push(item3_T);
                            } else {
                                totals2_T.push({})
                            }


                            var storeData1er = Ext.create('Ext.data.Store', {
                                data: totals2_T,
                                autoLoad: true
                            });

                            Ext.getCmp(prototype.id + '-displayPolarST2_T').bindStore(storeData1er);
                            Ext.getCmp(prototype.id + '-lblTittleSalesTotal2_T').setText('Totals Accounting Ticket: ' + Ext.util.Format.number(totalContab_T, '0,000'))
                            console.log(obj.data.items, 'obj.data.items')
                            let lstData = []
                            for (let value of obj.data.items) {

                                lstData.push(value.data)
                            }

                            let lstData2 = res.data2
                            let totAMATCH = lstData2[0].totAMATCH
                            let totAPEND = lstData2[0].totAPEND
                            let totAPOLIC = lstData2[0].totAPOLIC
                            let totAPOLIPE = lstData2[0].totAPOLIPE
                            let totASALES = lstData2[0].totASALES

                            let totQMATCH = lstData2[0].totQMATCH
                            let totQPEND = lstData2[0].totQPEND
                            let totQPOLIC = lstData2[0].totQPOLIC
                            let totQPOLIPE = lstData2[0].totQPOLIPE
                            let totQSALES = lstData2[0].totQSALES

                            console.log(totASALES, 'totASALES')
                            console.log(lstData, 'lstData')
                            let a = [];
                            let dataRoot = {text: '.', expanded: false, children: []};

                            Ext.Object.each(lstData, function (index, value) {
                                if (a.indexOf(value.strFormatDate) < 0) {
                                    let x = [];

                                    let V_QSALES = 0;
                                    let V_ASALES = 0;
                                    let V_QMATCH = 0;
                                    let V_AMATCH = 0;
                                    let V_QPEND = 0;
                                    let V_APEND = 0;
                                    let V_APOLIC = 0;
                                    let V_QPOLIC = 0;
                                    let V_APOLIPE = 0;
                                    let V_QPOLIPE = 0;


                                    Ext.Object.each(lstData, function (index, valuex) {
                                        if (value.strFormatDate === valuex.strFormatDate) {
                                            V_QSALES += valuex.QSALES;
                                            V_ASALES += valuex.ASALES;
                                            V_QMATCH += valuex.QMATCH;
                                            V_AMATCH += valuex.AMATCH;
                                            V_QPEND += valuex.QPEND;
                                            V_APEND += valuex.APEND;
                                            V_APOLIC += valuex.APOLIC;
                                            V_QPOLIC += valuex.QPOLIC;
                                            V_APOLIPE += valuex.APOLIPE;
                                            V_QPOLIPE += valuex.QPOLIPE;
                                        }
                                    });


                                    a.push(value.strFormatDate);
                                    dataRoot.children.push({
                                        strFormatDate: value.strFormatDate,
                                        QSALES: V_QSALES,
                                        ASALES: V_ASALES,
                                        perc1: totASALES === 0 ? 0 : (V_ASALES / totASALES) * 100,
                                        QMATCH: V_QMATCH,
                                        AMATCH: V_AMATCH,
                                        QPEND: V_QPEND,
                                        APEND: V_APEND,
                                        APOLIC: V_APOLIC,
                                        QPOLIC: V_QPOLIC,
                                        APOLIPE: V_APOLIPE,
                                        QPOLIPE: V_QPOLIPE,

                                        expanded: false, children: []
                                    });
                                    let b = [];
                                    Ext.Object.each(lstData, function (index, value01) {
                                        if (value.strFormatDate === value01.strFormatDate) {
                                            dataRoot.children[a.indexOf(value.strFormatDate)].children.push({
                                                strFormatDate: value01.strFormatDate,
                                                CCUST: value01.CCUST,
                                                FCHILD: value01.FCHILD,
                                                QSALES: value01.QSALES,
                                                ASALES: value01.ASALES,
                                                perc1: totASALES === 0 ? 0 : (value01.ASALES / totASALES) * 100,
                                                QMATCH: value01.QMATCH,
                                                AMATCH: value01.AMATCH,
                                                QPEND: value01.QPEND,
                                                APEND: value01.APEND,
                                                APOLIC: value01.APOLIC,
                                                QPOLIC: value01.QPOLIC,
                                                APOLIPE: value01.APOLIPE,
                                                QPOLIPE: value01.QPOLIPE,
                                                leaf: true
                                            });
                                        }
                                    });
                                }
                            });

                            Ext.getCmp(prototype.id + '-totQSALES').setText(Ext.util.Format.number(totQSALES, '0,000'));
                            Ext.getCmp(prototype.id + '-totASALES').setText(Ext.util.Format.number(totASALES, '0,000'));
                            Ext.getCmp(prototype.id + '-totQMATCH').setText(Ext.util.Format.number(totQMATCH, '0,000'));
                            Ext.getCmp(prototype.id + '-totAMATCH').setText(Ext.util.Format.number(totAMATCH, '0,000'));
                            Ext.getCmp(prototype.id + '-totQPEND').setText(Ext.util.Format.number(totQPEND, '0,000'));
                            Ext.getCmp(prototype.id + '-totAPEND').setText(Ext.util.Format.number(totAPEND, '0,000'));
                            Ext.getCmp(prototype.id + '-totQPOLIC').setText(Ext.util.Format.number(totQPOLIC, '0,000'));
                            Ext.getCmp(prototype.id + '-totAPOLIC').setText(Ext.util.Format.number(totAPOLIC, '0,000'));
                            Ext.getCmp(prototype.id + '-totQPOLIPE').setText(Ext.util.Format.number(totQPOLIPE, '0,000'));
                            Ext.getCmp(prototype.id + '-totAPOLIPE').setText(Ext.util.Format.number(totAPOLIPE, '0,000'));



                            var storeTree = Ext.create('Ext.data.TreeStore', {
                                root: dataRoot
                            });

                            Ext.getCmp(prototype.id + '-gridData').setStore(storeTree);

//                            if(me.typeBean == 'D'){
//                                console.log('drilldown')
//                                Ext.getCmp(prototype.id + '-lblTittleGrid2').setText(obj.data.items[0].data.strFormatDate + ' | ' + obj.data.items[0].data.SAGENT + ' | ' + obj.data.items[0].data.CANAL)
//                            }else {
//                            }
                            Ext.getCmp(prototype.id + '-graficosAños').bindStore(storeDataBard);
                            Ext.getCmp(prototype.id + '-graficosAñosAmount').bindStore(storeDataBard);
                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();


//            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);

//            Ext.getCmp(prototype.id + '-displayPolar2').bindStore(storeGridDatas);
        }
    },
    onGridCountryTotal: function (column, e, row, column, x, rowData) {

        if (x.record.data.children && x.record.data.children[0].FCHILD === '1') {
            console.log('entra al child')
            return false;
        }
        me.bean = {};
        let dateFormat = {
            '2024-Jan': '202401',
            '2024-Feb': '202402',
            '2024-Mar': '202403',
            '2024-Apr': '202404',
            '2024-May': '202405',
            '2024-Jun': '202406',
            '2024-Jul': '202407',
            '2024-Aug': '202408',
            '2024-Sep': '202409',
            '2024-Oct': '202410',
            '2024-Nov': '202411',
            '2024-Dec': '202412',

        }
        if (!rowData.data.CCUST) {
            console.log('filtrado')
            me.bean.IN_CCUST = x.record.data.children[0].CCUST

        } else {
            console.log('desplegado')
            me.bean.IN_CCUST = x.record.data.CCUST
        }

        me.bean.IN_SDATE = dateFormat[x.record.data.strFormatDate]
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        console.log(searchParams, 'searchParams')
        me.drillDown.push(me.panelActual);
//        me.typeBean = 'D' // DRILL DOWN
        this.setGridCountryTotal();


    },
    setGridCountryTotal: function () {
        win.lblUser_toolTip("Estructura: MPF108");
        me.panelActual = '-panelGridCountryTotal';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchCountryTotal'
                }, listeners: {
                    beforeload: function (obj) {

                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj, obj2, success, response, obj5) {
                        var pag = Ext.getCmp(prototype.id + '-paggin8');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            let strCCUST = {
                                134: 'AVIANCA',
                                133: 'LACSA',
                                202: 'TACA',
                                547: 'AEROGAL',
                            }
                            let charts = []
                            var data = obj.data.items[0].data;
                            Ext.getCmp(prototype.id + '-gridCountryTotal').setTitle('<center style="font-size:12px;">' + 'Avianca Group: ' + strCCUST[data.IN_CCUST] + ' - Date: ' + data.strDescripcion + '</center>')
//                         
                            var res = Ext.JSON.decode(response._response.responseText);
                            if (res.data2.length > 0) {
                                for (let i = res.data2.length - 1; i >= 0; i--) {
                                    let AMOUNT = res.data2[i].ASALES;
                                    let SCOUNTRY = res.data2[i].descSCOUNTRY;
                                    charts.push({strDescription: SCOUNTRY, AMOUNT: AMOUNT});
                                }

//                            for (let i = 0 ;i < res.data2.length; i++) {
//                                let AMOUNT = res.data2[i].SVFOPUSDPENDING;
//                                let SAGENT = res.data2[i].SAGENT;
//                                let CANAL = res.data2[i].CANAL;
//                                charts.push({strDescription: SAGENT + '-' + CANAL , AMOUNT: AMOUNT});
//                            }
                            } else {
                                charts.push({strDescription: 'Not found', AMOUNT: 1});
                            }



                            var storeData1ercharts = Ext.create('Ext.data.Store', {
                                data: charts,
                                autoLoad: true
                            });

                            Ext.getCmp(prototype.id + '-displayGrafCountryTotal').bindStore(storeData1ercharts);

                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();


            Ext.getCmp(prototype.id + '-gridCountryTotal').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin8').bindStore(storeGridDatas);
        }
    },
    displayChart_ByMonth: function (a, b, c, d) {

        var rbg_Type_tc = Ext.getCmp(prototype.id + '-rbgFlagaa').getValue().rbgFlag;
        switch (rbg_Type_tc) {
            case 'Cpn':
                Ext.getCmp(prototype.id + '-graficosAños').show();
                Ext.getCmp(prototype.id + '-graficosAñosAmount').hide();

                Ext.getCmp(prototype.id + '-displayPolarST_T').show();
                Ext.getCmp(prototype.id + '-lblTittleSalesTotal_T').show();

                Ext.getCmp(prototype.id + '-displayPolarST2_T').show();
                Ext.getCmp(prototype.id + '-lblTittleSalesTotal2_T').show();

                Ext.getCmp(prototype.id + '-displayPolarST').hide();
                Ext.getCmp(prototype.id + '-lblTittleSalesTotal').hide();

                Ext.getCmp(prototype.id + '-displayPolarST2').hide();
                Ext.getCmp(prototype.id + '-lblTittleSalesTotal2').hide();


                break;
            case 'Amt':
                Ext.getCmp(prototype.id + '-graficosAños').hide();
                Ext.getCmp(prototype.id + '-graficosAñosAmount').show();

                Ext.getCmp(prototype.id + '-displayPolarST').show();
                Ext.getCmp(prototype.id + '-lblTittleSalesTotal').show();

                Ext.getCmp(prototype.id + '-displayPolarST2').show();
                Ext.getCmp(prototype.id + '-lblTittleSalesTotal2').show();

                Ext.getCmp(prototype.id + '-displayPolarST_T').hide();
                Ext.getCmp(prototype.id + '-lblTittleSalesTotal_T').hide();

                Ext.getCmp(prototype.id + '-displayPolarST2_T').hide();
                Ext.getCmp(prototype.id + '-lblTittleSalesTotal2_T').hide();
                break;
        }
    },
    onChangeSelectBy: function (combo, newValue, oldValue) {
        this.setFormatParameter2();
        console.log(newValue, 'NUEVO VALOR OBSERVAR ACA')
        if (newValue === 'T') {
            this.setGridDataTotal();
//            Ext.getCmp(prototype.id + '-contentFilter').show();
            Ext.getCmp(prototype.id + '-contentFilter2').hide();
            Ext.getCmp(prototype.id + '-contentFilter3').hide();
        } else if (newValue === 'P') {
            this.setGridSumaryMonth();

            var valueRadio = Ext.getCmp(prototype.id + '-rbgChangeReport').getValue().rb;
            Ext.getCmp(prototype.id + '-rbgChangeReport').items.items[0].setValue(true);
            Ext.getCmp(prototype.id + '-rbgChangeReport').cheked = true;
//            Ext.getCmp(prototype.id + '-contentFilter').hide();
            Ext.getCmp(prototype.id + '-contentFilter2').show();
            Ext.getCmp(prototype.id + '-contentFilter3').hide();
        } else if (newValue === 'C') {

            var valueRadio = Ext.getCmp(prototype.id + '-rbgFlag').getValue().rb;
            Ext.getCmp(prototype.id + '-rbgFlag').items.items[0].setValue(true);
            Ext.getCmp(prototype.id + '-rbgFlag').cheked = true;

            this.setFormatParameter3();
            this.searchClarificationTOT();
//            Ext.getCmp(prototype.id + '-contentFilter').hide();
            Ext.getCmp(prototype.id + '-contentFilter2').hide();
            Ext.getCmp(prototype.id + '-contentFilter3').show();
        } else if (newValue === 'V') {
            Ext.getCmp(prototype.id + '-pie').setVisible(false);
            this.setFormatParameter4();
            this.searchProvisions();
            Ext.getCmp(prototype.id + '-contentFilter2').hide();
            Ext.getCmp(prototype.id + '-contentFilter3').hide();

        } else if (newValue === 'Y') {
            Ext.getCmp(prototype.id + '-pie').setVisible(false);
            this.setFormatParameter2();
            this.setGridDataConciliationMDP();
            Ext.getCmp(prototype.id + '-contentFilter2').hide();
            Ext.getCmp(prototype.id + '-contentFilter3').hide();

        } else if (newValue === 'X') {
            Ext.getCmp(prototype.id + '-pie').setVisible(false);
            this.setFormatParameter2();
            this.setGridDataConciliation();
            Ext.getCmp(prototype.id + '-contentFilter2').hide();
            Ext.getCmp(prototype.id + '-contentFilter3').hide();

        } else if (newValue === 'A') {
            Ext.getCmp(prototype.id + '-pie').setVisible(false);
            this.setFormatParameterDashboard();
            this.setGridDataDashboard();
            Ext.getCmp(prototype.id + '-contentFilter2').hide();
            Ext.getCmp(prototype.id + '-contentFilter3').hide();

        }
        this.toggleFiltersByPanel(me.panelActual, prototype);
    },
    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPF117");
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
//                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams2;
                    },
                    load: function (obj) {
//                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
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
                            console.log(data);
                        }
                        me.setWidthPie();

                    }
                }, remoteSort: true
            });
            global.clear();
            let tittleCountry = Ext.getCmp(prototype.id + '-cmbCountry').getValue() === '' ? 'All Countries' : Ext.getCmp(prototype.id + '-cmbCountry').getRawValue();
            let tittleDate = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() === Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() ? Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() : Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + ' - ' + Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
            Ext.getCmp(prototype.id + '-lblTittleGrid').setText(tittleDate + ' | ' + tittleCountry)

            Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    setGridSumaryMonth: function () {
        win.lblUser_toolTip("Estructura: MPF118");
        me.panelActual = '-boxSumaryMonthData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchRM'
                }, listeners: {
                    beforeload: function (obj) {

                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj, obj2, success, response, obj5) {
                        var pag = Ext.getCmp(prototype.id + '-paggin3');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        // ------------------ GRAFICOS -------------------------

                        var item = {};
                        var item2 = {};
                        var totals = [];
                        var charts = [];
                        console.log(obj.data.items, 'obj.data.items')
                        if (obj.data.items.length > 0) {
                            item2.Perc2 = obj.data.items[0].data.totSVFOPUSDPENDING;
                            var pending = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDPENDING, '0,000');
                            item2.VENDOR = pending;
                            totals.push(item2);

                            item.Perc2 = obj.data.items[0].data.totSVFOPUSDP;
                            var Paid = "Paid:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDP, '0,000');
                            item.VENDOR = Paid;
                            totals.push(item);
                        } else {
                            totals.push({})
                        }


                        var storeData1er = Ext.create('Ext.data.Store', {
                            data: totals,
                            autoLoad: true
                        });
                        Ext.getCmp(prototype.id + '-displayPolar2').bindStore(storeData1er);

                        var res = Ext.JSON.decode(response._response.responseText);


                        if (res.data2.length > 0) {
                            for (let i = res.data2.length - 1; i >= 0; i--) {
                                let AMOUNT = res.data2[i].SVFOPUSDPENDING;
                                let SAGENT = res.data2[i].SAGENT;
                                let CANAL = res.data2[i].CANAL;
                                charts.push({strDescription: SAGENT + ' - ' + CANAL, AMOUNT: AMOUNT});
                            }

//                            for (let i = 0 ;i < res.data2.length; i++) {
//                                let AMOUNT = res.data2[i].SVFOPUSDPENDING;
//                                let SAGENT = res.data2[i].SAGENT;
//                                let CANAL = res.data2[i].CANAL;
//                                charts.push({strDescription: SAGENT + '-' + CANAL , AMOUNT: AMOUNT});
//                            }
                        } else {
                            charts.push({strDescription: 'Not found', AMOUNT: 1});
                        }



                        var storeData1ercharts = Ext.create('Ext.data.Store', {
                            data: charts,
                            autoLoad: true
                        });

                        Ext.getCmp(prototype.id + '-displayGraf2').bindStore(storeData1ercharts);

                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {

                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();

            Ext.getCmp(prototype.id + '-gridSumaryMonthData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        }
    },
    setGridSumaryCanal: function () {
        win.lblUser_toolTip("Estructura: MPF118");
        me.panelActual = '-boxSumaryCanalData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchRC'
                }, listeners: {
                    beforeload: function (obj) {

                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj, obj2, success, response, obj5) {
                        var pag = Ext.getCmp(prototype.id + '-paggin4');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        // ------------------ GRAFICOS -------------------------

                        var item = {};
                        var item2 = {};
                        var totals = [];
                        var charts = [];
                        console.log(obj.data.items, 'obj.data.items')
                        if (obj.data.items.length > 0) {
                            item2.Perc2 = obj.data.items[0].data.totSVFOPUSDPENDING;
                            var pending = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDPENDING, '0,000');
                            item2.VENDOR = pending;
                            totals.push(item2);

                            item.Perc2 = obj.data.items[0].data.totSVFOPUSDP;
                            var Paid = "Paid:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDP, '0,000');
                            item.VENDOR = Paid;
                            totals.push(item);
                        } else {
                            totals.push({})
                        }


                        var storeData1er = Ext.create('Ext.data.Store', {
                            data: totals,
                            autoLoad: true
                        });
                        Ext.getCmp(prototype.id + '-displayPolar3').bindStore(storeData1er);

                        var res = Ext.JSON.decode(response._response.responseText);


                        if (res.data2.length > 0) {
                            for (let i = res.data2.length - 1; i >= 0; i--) {
                                let AMOUNT = res.data2[i].SVFOPUSDPENDING;
//                                let SAGENT = res.data2[i].SAGENT;
                                let CANAL = res.data2[i].CANAL;
                                charts.push({strDescription: CANAL, AMOUNT: AMOUNT});
                            }

//                            for (let i = 0 ;i < res.data2.length; i++) {
//                                let AMOUNT = res.data2[i].SVFOPUSDPENDING;
//                                let SAGENT = res.data2[i].SAGENT;
//                                let CANAL = res.data2[i].CANAL;
//                                charts.push({strDescription: SAGENT + '-' + CANAL , AMOUNT: AMOUNT});
//                            }
                        } else {
                            charts.push({strDescription: 'Not found', AMOUNT: 1});
                        }



                        var storeData1ercharts = Ext.create('Ext.data.Store', {
                            data: charts,
                            autoLoad: true
                        });

                        Ext.getCmp(prototype.id + '-displayGraf3').bindStore(storeData1ercharts);

                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {

                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();

            Ext.getCmp(prototype.id + '-gridSumaryCanalData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
        }
    },
    // <editor-fold defaultstate="collapsed" desc="searchClarificationTOT">
    searchClarificationTOT: function () {
        win.lblUser_toolTip("Estructura: A2342/A2343");

        var IN_SELECT = Ext.getCmp(prototype.id + '-rbgFlag').getValue().rb;
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
                            obj.proxy.extraParams = searchParams3;
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
                            obj.proxy.extraParams = searchParams3;
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

        var IN_SELECT = Ext.getCmp(prototype.id + '-rbgFlag').getValue().rb;
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
                            obj.proxy.extraParams = searchParams3;
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
                            obj.proxy.extraParams = searchParams3;
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
    // <editor-fold defaultstate="collapsed" desc="searchProvisions">
    searchProvisions: function () {
        win.lblUser_toolTip("Estructura: MPF140/MPF102");

        me.panelActual = '-boxDataProvisions';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        Ext.getCmp(prototype.id + '-pie').setVisible(false);
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchProvisions'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams4;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var lstTemp = [];
                        var lstTemp2 = [];
                        var data = obj.data.items[0].data;
                        var item = {};
                        var item2 = {};

                        item.LABEL = 'Total Concilied - ' + Ext.util.Format.number(data.totQTY_CF2, '0,000');
                        item.QTY = data.totQTY_CF2;
                        lstTemp.push(item);

                        item = {};
                        item.LABEL = 'Pending to Concilied - ' + Ext.util.Format.number(data.totQTY_PF2, '0,000');
                        item.QTY = data.totQTY_PF2;
                        lstTemp.push(item);

                        item2.LABEL = 'Total Send - ' + Ext.util.Format.number(data.totQTY_SE, '0,000');
                        item2.QTY = data.totQTY_SE;
                        lstTemp2.push(item2);

                        item2 = {};
                        item2.LABEL = 'Pending to Send - ' + Ext.util.Format.number(data.totQTY_PE, '0,000');
                        item2.QTY = data.totQTY_PE;
                        lstTemp2.push(item2);

                        var storeData1er = Ext.create('Ext.data.Store', {
                            data: lstTemp,
                            autoLoad: true
                        });
                        var storeData1er2 = Ext.create('Ext.data.Store', {
                            data: lstTemp2,
                            autoLoad: true
                        });

                        Ext.getCmp(prototype.id + '-displayProvisions').bindStore(storeData1er);
                        Ext.getCmp(prototype.id + '-displayProvisions2').bindStore(storeData1er2);


                    }

                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataProvisions').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-pie').setVisible(false);
    },
    // </editor-fold>
    setPaidByCompany: function (array, ccust, id, idLabel) {
        if (array.length == 0) {
            console.log('NO HAY INFO PARA PAID')
            return false;
        }
        let strCCUST = {
            134: 'AVIANCA',
            133: 'LACSA',
            202: 'TACA',
            547: 'AEROGAL',
        }
        let item = {};
        let item2 = {};
        let totals = [];
        let isOnList = false;
        for (const value of array) {
            if (value.data.CCUST === ccust) {
                isOnList = true;
                let pendingPerc = (value.data.SVFOPUSDPENDING / value.data.SVFOPUSD) * 100;
                let paidPerc = (value.data.SVFOPUSDP / value.data.SVFOPUSD) * 100;
                item2.Perc2 = value.data.SVFOPUSDPENDING;
                var pending = "Pending:\n" + Ext.util.Format.number(value.data.SVFOPUSDPENDING, '0,000') + "\n" + Ext.util.Format.number(pendingPerc, '0.00%');
                item2.VENDOR = pending;
                totals.push(item2);

                item.Perc2 = value.data.SVFOPUSDP;
                var Paid = "Paid:\n" + Ext.util.Format.number(value.data.SVFOPUSDP, '0,000') + "\n" + Ext.util.Format.number(paidPerc, '0.00%');
                item.VENDOR = Paid;
                totals.push(item);


                var storeData1er = Ext.create('Ext.data.Store', {
                    data: totals,
                    autoLoad: true
                });

                Ext.getCmp(prototype.id + id).bindStore(storeData1er);
                Ext.getCmp(prototype.id + idLabel).setText(strCCUST[ccust] + ' - Total USD: ' + Ext.util.Format.number(value.data.SVFOPUSD, '0,000'))
            }
        }
        if (!isOnList) {
            Ext.getCmp(prototype.id + id).hide()
            Ext.getCmp(prototype.id + idLabel).hide()
        } else {
            Ext.getCmp(prototype.id + id).show()
            Ext.getCmp(prototype.id + idLabel).show()
        }
    },
    setBarByCompany: function (array, ccust, id) {
        console.log(array, 'array')
        if (array.length === 0) {
            console.log('NO HAY INFO PARA BAR')
            return false;
        }
        let strCCUST = {
            134: 'AVIANCA',
            133: 'LACSA',
            202: 'TACA',
            547: 'AEROGAL',
        }
        let item = {};
        let item2 = {};
        let totals = [];
        let charts = [];
        let isOnList = false;
        for (const row of array) {
            console.log(row.data.CCUST, 'row.data.CCUST')
            if (row.data.CCUST === ccust) {
                isOnList = true;
                let PENDING = row.data.SVFOPUSDPENDING;
                let PAID = row.data.SVFOPUSDP;
                let CCUST = row.data.CCUST;
                charts.push({strDescription: strCCUST[CCUST], PENDING: PENDING, PAID: PAID});
            }

        }
        console.log(charts, 'charts')

        var storeData1ercharts = Ext.create('Ext.data.Store', {
            data: charts,
            autoLoad: true
        });

        Ext.getCmp(prototype.id + id).bindStore(storeData1ercharts);

        if (!isOnList) {
            Ext.getCmp(prototype.id + id).hide()

        } else {
            Ext.getCmp(prototype.id + id).show()

        }

    },
    setGridSumaryCompany: function () {
        win.lblUser_toolTip("Estructura: MPF118");
        me.panelActual = '-boxSumaryCompanyData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchRP'
                }, listeners: {
                    beforeload: function (obj) {

                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj, obj2, success, response, obj5) {
                        var pag = Ext.getCmp(prototype.id + '-paggin5');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        // ------------------ GRAFICOS -------------------------



                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var item = {};
                            var item2 = {};
                            var totals = [];
                            var charts = [];
                            let pendingPerc = (obj.data.items[0].data.totSVFOPUSDPENDING / obj.data.items[0].data.totSVFOPUSD) * 100;
                            let paidPerc = (obj.data.items[0].data.totSVFOPUSDP / obj.data.items[0].data.totSVFOPUSD) * 100;
                            console.log(obj.data.items, 'obj.data.items')
                            if (obj.data.items.length > 0) {
                                item2.Perc2 = obj.data.items[0].data.totSVFOPUSDPENDING;
                                var pending = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDPENDING, '0,000') + "\n" + Ext.util.Format.number(pendingPerc, '0.00%');
                                item2.VENDOR = pending;
                                totals.push(item2);

                                item.Perc2 = obj.data.items[0].data.totSVFOPUSDP;
                                var Paid = "Paid:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDP, '0,000') + "\n" + Ext.util.Format.number(paidPerc, '0.00%');
                                item.VENDOR = Paid;
                                totals.push(item);
                                Ext.getCmp(prototype.id + '-lblTittlePaid4').setText('Total Amount USD: ' + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSD, '0,000'))


                            } else {
                                totals.push({})
                            }
                            console.log('wadadafafafa')
                            me.setPaidByCompany(obj.data.items, '134', '-displayPolar4_1', '-lblTittlePaid4_1')
                            me.setPaidByCompany(obj.data.items, '202', '-displayPolar4_2', '-lblTittlePaid4_2')
                            me.setPaidByCompany(obj.data.items, '133', '-displayPolar4_3', '-lblTittlePaid4_3')
                            me.setPaidByCompany(obj.data.items, '547', '-displayPolar4_4', '-lblTittlePaid4_4')
                            console.log('kiskideiski')
                            var storeData1er = Ext.create('Ext.data.Store', {
                                data: totals,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-displayPolar4').bindStore(storeData1er);

                            var res = Ext.JSON.decode(response._response.responseText);
                            let strCCUST = {
                                134: 'AVIANCA',
                                133: 'LACSA',
                                202: 'TACA',
                                547: 'AEROGAL',
                            }

                            if (res.data2.length > 0) {
//                            for (let i = res.data2.length - 1; i >= 0; i--) {
//                                let PENDING = res.data2[i].SVFOPUSDPENDING;
//                                let PAID = res.data2[i].SVFOPUSDP;
//                                let CCUST = res.data2[i].CCUST;
//                                charts.push({strDescription: strCCUST[CCUST], PENDING: PENDING, PAID: PAID});
//                            }

                                for (let i = 0; i < res.data2.length; i++) {
                                    let PAID = res.data2[i].SVFOPUSDP;
                                    let PENDING = res.data2[i].SVFOPUSDPENDING;
                                    let TOTAL = res.data2[i].SVFOPUSD;
                                    let CCUST = res.data2[i].CCUST;
                                    charts.push({strDescription: strCCUST[CCUST], PENDING: PENDING, PAID: PAID, TOTAL: TOTAL});
                                }
                            } else {
                                charts.push({strDescription: 'Not found', PENDING: 1, PAID: 1, TOTAL: 1});
                            }


                            me.setBarByCompany(obj.data.items, '134', '-displayGraf4_1')
                            me.setBarByCompany(obj.data.items, '202', '-displayGraf4_2')
                            me.setBarByCompany(obj.data.items, '133', '-displayGraf4_3')
                            me.setBarByCompany(obj.data.items, '547', '-displayGraf4_4')

                            var storeData1ercharts = Ext.create('Ext.data.Store', {
                                data: charts,
                                autoLoad: true
                            });

                            Ext.getCmp(prototype.id + '-displayGraf4').bindStore(storeData1ercharts);
                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();
//            Ext.getCmp(prototype.id + '-displayPolar4').getCaptions().title.setText().setText('Nuevo Título Dinámico');

            Ext.getCmp(prototype.id + '-gridSumaryCompanyData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
        }
    },
    setGridSumaryCountry: function () {
        win.lblUser_toolTip("Estructura: MPF118");
        me.panelActual = '-boxSumaryCountryData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchRS'
                }, listeners: {
                    beforeload: function (obj) {

                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj, obj2, success, response, obj5) {
                        var pag = Ext.getCmp(prototype.id + '-paggin6');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        // ------------------ GRAFICOS -------------------------

                        var item = {};
                        var item2 = {};
                        var totals = [];
                        var charts = [];
                        console.log(obj.data.items, 'obj.data.items')
                        if (obj.data.items.length > 0) {
                            item2.Perc2 = obj.data.items[0].data.totSVFOPUSDPENDING;
                            var pending = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDPENDING, '0,000');
                            item2.VENDOR = pending;
                            totals.push(item2);

                            item.Perc2 = obj.data.items[0].data.totSVFOPUSDP;
                            var Paid = "Paid:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDP, '0,000');
                            item.VENDOR = Paid;
                            totals.push(item);
                        } else {
                            totals.push({})
                        }


                        var storeData1er = Ext.create('Ext.data.Store', {
                            data: totals,
                            autoLoad: true
                        });
                        Ext.getCmp(prototype.id + '-displayPolar5').bindStore(storeData1er);

                        var res = Ext.JSON.decode(response._response.responseText);


                        if (res.data2.length > 0) {
                            for (let i = res.data2.length - 1; i >= 0; i--) {
                                let AMOUNT = res.data2[i].SVFOPUSDPENDING;
                                let SCOUNTRY = res.data2[i].SCOUNTRY;
                                charts.push({strDescription: SCOUNTRY, AMOUNT: AMOUNT});
                            }

//                            for (let i = 0 ;i < res.data2.length; i++) {
//                                let AMOUNT = res.data2[i].SVFOPUSDPENDING;
//                                let SAGENT = res.data2[i].SAGENT;
//                                let CANAL = res.data2[i].CANAL;
//                                charts.push({strDescription: SAGENT + '-' + CANAL , AMOUNT: AMOUNT});
//                            }
                        } else {
                            charts.push({strDescription: 'Not found', AMOUNT: 1});
                        }



                        var storeData1ercharts = Ext.create('Ext.data.Store', {
                            data: charts,
                            autoLoad: true
                        });

                        Ext.getCmp(prototype.id + '-displayGraf5').bindStore(storeData1ercharts);

                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {

                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();

            Ext.getCmp(prototype.id + '-gridSumaryCountryData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
        }
    },
    setGridReportDay: function () {
        win.lblUser_toolTip("Estructura: MPF118");
        me.panelActual = '-boxPendingData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchRD'
                }, listeners: {
                    beforeload: function (obj) {

                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj, obj2, success, response, obj5) {
                        var pag = Ext.getCmp(prototype.id + '-paggin2');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        // ------------------ GRAFICOS -------------------------



                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            var item = {};
                            var item2 = {};
                            var totals = [];
                            var charts = [];
                            let pendingPerc = (obj.data.items[0].data.totSVFOPUSDPENDING / obj.data.items[0].data.totSVFOPUSD) * 100;
                            let paidPerc = (obj.data.items[0].data.totSVFOPUSDP / obj.data.items[0].data.totSVFOPUSD) * 100;
                            console.log(obj.data.items, 'obj.data.items')
                            if (obj.data.items.length > 0) {
                                item2.Perc2 = obj.data.items[0].data.totSVFOPUSDPENDING;
                                var pending = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDPENDING, '0,000') + "\n" + Ext.util.Format.number(pendingPerc, '0.00%');
                                item2.VENDOR = pending;
                                totals.push(item2);

                                item.Perc2 = obj.data.items[0].data.totSVFOPUSDP;
                                var Paid = "Paid:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDP, '0,000') + "\n" + Ext.util.Format.number(paidPerc, '0.00%');
                                item.VENDOR = Paid;
                                totals.push(item);
                            } else {
                                totals.push({})
                            }


                            var storeData1er = Ext.create('Ext.data.Store', {
                                data: totals,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-displayPolar').bindStore(storeData1er);

                            var res = Ext.JSON.decode(response._response.responseText);


                            if (res.data2.length > 0) {
                                for (let i = 0; i < res.data2.length; i++) {

                                    let AMOUNT = res.data2[i].SVFOPUSD;
                                    let SAGENT = res.data2[i].SAGENT;
                                    let SDATE = res.data2[i].SDATE;
                                    charts.push({strDescription: SAGENT + "\n" + SDATE, AMOUNT: AMOUNT});
                                }
                            } else {
                                charts.push({strDescription: 'Not found', AMOUNT: 1});
                            }



                            var storeData1ercharts = Ext.create('Ext.data.Store', {
                                data: charts,
                                autoLoad: true
                            });

                            Ext.getCmp(prototype.id + '-displayGraf').bindStore(storeData1ercharts);

//                            if(me.typeBean == 'D'){
//                                console.log('drilldown')
//                                Ext.getCmp(prototype.id + '-lblTittleGrid2').setText(obj.data.items[0].data.strFormatDate + ' | ' + obj.data.items[0].data.SAGENT + ' | ' + obj.data.items[0].data.CANAL)
//                            }else {
                            console.log('search')
                            let tittleCountry = Ext.getCmp(prototype.id + '-cmbCountry').getValue() === '' ? 'All Countries' : Ext.getCmp(prototype.id + '-cmbCountry').getRawValue();
                            let tittleDate = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() === Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() ? Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() : Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + ' - ' + Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
                            Ext.getCmp(prototype.id + '-lblTittleGrid2').setText(tittleDate + ' - ' + tittleCountry)
                            Ext.getCmp(prototype.id + '-lblTittlePaid').setText('Total Amount USD: ' + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSD, '0,000'))
//                            }

                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();


            Ext.getCmp(prototype.id + '-gridPendingData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    onGridReportDay: function (column, e, row, column, x, rowData) {
        me.bean = {};
        me.bean.IN_FECHA_FROM = x.record.data.SDATE
        me.bean.IN_SCOUNTRY = x.record.data.SCOUNTRY
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        me.drillDown.push(me.panelActual);
        me.typeBean = 'D' // DRILL DOWN
        this.setGridReportDay();
    },

    clickColumn: function (ct, column, e, t, eOpts) {
        me.bean = {};
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtAGENCY').getValue();
        me.bean.IN_PERCENTAGE = Ext.getCmp(prototype.id + '-cmbPercentage').getValue();
        me.bean.IN_CANAL = Ext.getCmp(prototype.id + '-cmbSource').getValue();
        me.bean.IN_CUTDAYS = Ext.getCmp(prototype.id + '-txtCUTDAYS').getValue();
        me.bean.IN_TOP = Ext.getCmp(prototype.id + '-cmbTOP').getValue();
        me.bean.IN_CCUST = Ext.getCmp(prototype.id + '-cmbAviancaGroup').getValue();
        me.bean.IN_TREG = Ext.getCmp(prototype.id + '-chkboxTypeRecord').getValue() ? '1' : '2';
        me.bean.IN_SURPLUS = Ext.getCmp(prototype.id + '-chkboxSurplus').getValue() ? '1' : '2';

        switch (column.dataIndex) {
            case 'PERCPENDING':
                me.bean.IN_TYPEPERC = 'S'
                break;
            case 'PERCPAID':
                me.bean.IN_TYPEPERC = 'P'
                break;
            case 'SVFOPUSDP':
                me.bean.IN_TYPEPERC = 'A'
                break;
            case 'SVFOPUSDPENDING':
                me.bean.IN_TYPEPERC = 'N'
                break;
            case 'SVFOPUSD':
                me.bean.IN_TYPEPERC = 'M'
                break;

        }
        if (Ext.getCmp(prototype.id + '-hidePENDING').isVisible()) {
            me.bean.IN_ORDER = 'ASC'
            Ext.getCmp(prototype.id + '-hidePENDING').hide()
        } else {
            me.bean.IN_ORDER = 'DESC'
            Ext.getCmp(prototype.id + '-hidePENDING').show()
        }

        console.log(me.bean, 'me.bean')
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        if (me.panelActual == '-boxSumaryMonthData') {
            this.setGridSumaryMonth();
        } else if (me.panelActual == '-boxPendingData') {
            me.typeBean = 'S' // SEARCH
            this.setGridReportDay();
        } else if (me.panelActual == '-boxSumaryCanalData') {
            this.setGridSumaryCanal();
        } else if (me.panelActual == '-boxSumaryCompanyData') {
            this.setGridSumaryCompany();
        } else if (me.panelActual == '-boxSumaryCountryData') {
            this.setGridSumaryCountry();
        }

    },
    rgChangeAviancaGroup: function (field, newValue, oldValue) {
        console.log('cambio')
    },
    rgChangeReport: function (field, newValue, oldValue) {
        console.log(newValue, 'newValueAAAAA')
        if (newValue.opcion == '1') {
            this.setFormatParameter2();
            this.setGridSumaryMonth();
            Ext.getCmp(prototype.id + '-btn-TW').hide()
            Ext.getCmp(prototype.id + '-cmbTOP').show()
            Ext.getCmp(prototype.id + '-lblTOP').show()
        } else if (newValue.opcion == '2') {
            me.typeBean = 'S' // SEARCH
            this.setFormatParameter2();
            this.setGridReportDay();
            Ext.getCmp(prototype.id + '-btn-TW').show()
            Ext.getCmp(prototype.id + '-cmbTOP').hide()
            Ext.getCmp(prototype.id + '-lblTOP').hide()
        } else if (newValue.opcion == '3') {
            this.setFormatParameter2();
            this.setGridSumaryCanal()
            Ext.getCmp(prototype.id + '-btn-TW').hide()
            Ext.getCmp(prototype.id + '-cmbTOP').hide()
            Ext.getCmp(prototype.id + '-lblTOP').hide()
        } else if (newValue.opcion == '4') {
            this.setFormatParameter2();
            this.setGridSumaryCompany()
            Ext.getCmp(prototype.id + '-btn-TW').hide()
            Ext.getCmp(prototype.id + '-cmbTOP').hide()
            Ext.getCmp(prototype.id + '-lblTOP').hide()
        } else if (newValue.opcion == '5') {
            this.setFormatParameter2();
            this.setGridSumaryCountry()
            Ext.getCmp(prototype.id + '-btn-TW').hide()
            Ext.getCmp(prototype.id + '-cmbTOP').show()
            Ext.getCmp(prototype.id + '-lblTOP').show()
        }

    },
    clickColumnFilters: function (obj, metaData, rowNum, columnNum, obj2, rowData) {


        Ext.getCmp(prototype.id + '-txtAGENCY').setValue(rowData.data.SAGENT);

        me.btnSearch_click();
    },
    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },

    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.DataEntry', {
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
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');


    },
    btnExcel_click: function (obj, e) {
        this.setFormatParameter();
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
            case  '-boxPendingData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(searchParams.beanString));
                break;
            case  '-panelGridSumaryMain':
                global.getFile(prototype.url + '/getXLSXDashboard?beanString=' + encodeURI(searchParams.beanString));
                break;
            case  '-panelGridSumaryDetail':
                global.getFile(prototype.url + '/getXLSXDashboardDetail?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contFilter');
        if (option.isVisible(option)) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {

        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);

        switch (me.panelActual) {
            case  '-panelGridSumaryMain':
                Ext.getCmp(prototype.id + '-panelHeight').setHeight(830);
                break;
            case  '-panelGridSumaryDetail':
                Ext.getCmp(prototype.id + '-panelHeight').setHeight(590);
                break;
            default:
                console.log('n');
        }


    },
    getPaggin: function () {
        me.pagginActual = '';
        this.toggleFiltersByPanel(me.panelActual, prototype);
        switch (me.panelActual) {
            case  '-panelGridSumaryMain':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridSumaryDetail':
                me.pagginActual = '-paggin';
                break;
            case  '-boxMainData':
                me.pagginActual = '-paggin';
                break;
            case  '-boxPendingData':
                me.pagginActual = '-paggin2';
                break;
            case  '-boxSumaryMonthData':
                me.pagginActual = '-paggin3';
                break;
            case  '-boxSumaryCanalData':
                me.pagginActual = '-paggin4';
                break;
            case  '-boxSumaryCompanyData':
                me.pagginActual = '-paggin5';
                break;
            case  '-boxSumaryCountryData':
                me.pagginActual = '-paggin6';
                break;
            case  '-panelGridData':
                me.pagginActual = '-paggin7';
                break;
            case  '-panelGridCountryTotal':
                me.pagginActual = '-paggin8';
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
    setGridDataConciliation: function () {
        win.lblUser_toolTip("Estructura: MPF115");
        me.panelActual = '-panelGridConciliation';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchTotalConciliation'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj, obj2, success, response, obj5) {

                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                        var pag = Ext.getCmp(prototype.id + '-paggin7');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        var res = Ext.JSON.decode(response._response.responseText);
                        console.log(res, 'searchTotalConciliation')

                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-graficosAñosC').bindStore('Ext.data.Store', {data: [], autoLoad: true});
                            Ext.getCmp(prototype.id + '-graficosAñosAmountC').bindStore('Ext.data.Store', {data: [], autoLoad: true});
                            Ext.getCmp(prototype.id + '-displayPolarSTC').bindStore(Ext.create('Ext.data.Store', {data: [], autoLoad: true}));
                            Ext.getCmp(prototype.id + '-displayPolarST_TC').bindStore('Ext.data.Store', {data: [], autoLoad: true});
                            Ext.getCmp(prototype.id + '-displayPolarST2C').bindStore('Ext.data.Store', {data: [], autoLoad: true});
                            Ext.getCmp(prototype.id + '-gridDataConciZ').setStore(Ext.create('Ext.data.TreeStore', {root: {}}));
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {

                            let storeDataBard = Ext.create('Ext.data.Store', {
                                data: res.data2,
                                autoLoad: true
                            });
                            //VENTA

                            let item = {};
                            let item2 = {};
                            let totals = [];
                            let charts = [];
                            let pendingPerc = (obj.data.items[0].data.totAPEND / obj.data.items[0].data.totASALES) * 100;
                            let paidPerc = (obj.data.items[0].data.totAMATCH / obj.data.items[0].data.totASALES) * 100;
                            if (obj.data.items.length > 0) {
                                item2.Perc2 = obj.data.items[0].data.totAPEND;
                                var pending = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totAPEND, '0,000') + "\n" + Ext.util.Format.number(pendingPerc, '0.00%');
                                item2.VENDOR = pending;
                                totals.push(item2);

                                item.Perc2 = obj.data.items[0].data.totAMATCH;
                                var Paid = "Payed:\n" + Ext.util.Format.number(obj.data.items[0].data.totAMATCH, '0,000') + "\n" + Ext.util.Format.number(paidPerc, '0.00%');
                                item.VENDOR = Paid;
                                totals.push(item);
                            } else {
                                totals.push({})
                            }


                            var storeData1er = Ext.create('Ext.data.Store', {
                                data: totals,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-displayPolarST').bindStore(storeData1er);
                            Ext.getCmp(prototype.id + '-lblTittleSalesTotalC').setText('Totals and Match')


                            let item_T = {};
                            let item2_T = {};
                            let totals_T = [];
                            let charts_T = [];

                            console.log(obj.data.items, 'OBJETO DATA ITEMS')

                            pendingPerc = (obj.data.items[0].data.totQPEND / obj.data.items[0].data.totQSALES) * 100;
                            paidPerc = (obj.data.items[0].data.totQMATCH / obj.data.items[0].data.totQSALES) * 100;
                            if (obj.data.items.length > 0) {
                                item2_T.Perc2 = obj.data.items[0].data.totQSALES;
                                var pending = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totQSALES, '0,000') + "\n" + Ext.util.Format.number(pendingPerc, '0.00%');
                                item2_T.VENDOR = pending;
                                totals_T.push(item2_T);

                                item_T.Perc2 = obj.data.items[0].data.totQSALESC;
                                var Paid = "Payed:\n" + Ext.util.Format.number(obj.data.items[0].data.totQSALESC, '0,000') + "\n" + Ext.util.Format.number(paidPerc, '0.00%');
                                item_T.VENDOR = Paid;
                                totals_T.push(item_T);
                            } else {
                                totals_T.push({})
                            }

                            console.log(totals_T, 'TOTALS_t')
                            var storeData1er = Ext.create('Ext.data.Store', {
                                data: totals_T,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-displayPolarST_TC').bindStore(storeData1er);
                            Ext.getCmp(prototype.id + '-lblTittleSalesTotal_TC').setText('Totals Sales Ticket: ' + Ext.util.Format.number(obj.data.items[0].data.totQSALES, '0,000'))

                            //// CONTABILIDAD

                            let item3 = {};
                            let item4 = {};
                            let totals2 = [];
                            let charts2 = [];
                            let totalContab = obj.data.items[0].data.totAPOLIC + obj.data.items[0].data.totAPOLIPE
                            paidPerc = (obj.data.items[0].data.totAPOLIC / totalContab) * 100;
                            pendingPerc = (obj.data.items[0].data.totAPOLIPE / totalContab) * 100;
                            if (obj.data.items.length > 0) {
                                item4.Perc2 = obj.data.items[0].data.totAPOLIC;
                                var pending = "Processed:\n" + Ext.util.Format.number(obj.data.items[0].data.totAPOLIC, '0,000') + "\n" + Ext.util.Format.number(paidPerc, '0.00%');
                                item4.VENDOR = pending;
                                totals2.push(item4);

                                item3.Perc2 = obj.data.items[0].data.totAPOLIPE;
                                var Paid = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totAPOLIPE, '0,000') + "\n" + Ext.util.Format.number(pendingPerc, '0.00%');
                                item3.VENDOR = Paid;
                                totals2.push(item3);
                            } else {
                                totals2.push({})
                            }


                            var storeData1er = Ext.create('Ext.data.Store', {
                                data: totals2,
                                autoLoad: true
                            });

                            Ext.getCmp(prototype.id + '-displayPolarST2').bindStore(storeData1er);
                            Ext.getCmp(prototype.id + '-lblTittleSalesTotal2C').setText('Totals and Match')
                            console.log(storeDataBard, 'storeDataBard')
                            Ext.getCmp(prototype.id + '-graficosAñosC').bindStore(storeDataBard);
                            Ext.getCmp(prototype.id + '-graficosAñosAmount').bindStore(storeDataBard);


                            /**/

                            // AQUI LLENAMOS LA GRILLA Y LOS TOTALES

                            let lstData2 = res.data2
                            let totAMATCH = lstData2[0].totAMATCH
                            let totAPEND = lstData2[0].totAPEND
                            let totAPOLIC = lstData2[0].totAPOLIC
                            let totAPOLIPE = lstData2[0].totAPOLIPE
                            let totASALES = lstData2[0].totASALES

                            let totQMATCH = lstData2[0].totQMATCH
                            let totQPEND = lstData2[0].totQPEND
                            let totQPOLIC = lstData2[0].totQPOLIC
                            let totQPOLIPE = lstData2[0].totQPOLIPE

                            let totQSALES = lstData2[0].totQSALES


                            let totSVFOPUSDS = lstData2[0].totSVFOPUSDS
                            let totSVFOPUSDC = lstData2[0].totSVFOPUSDC
                            let totSVFOPUSDL = lstData2[0].totSVFOPUSDL
                            let totSVFOPUSDP = lstData2[0].totSVFOPUSDP
                            let totSVFOPUSDLT = lstData2[0].totSVFOPUSDLT
                            let totRATECON = lstData2[0].totRATECON
                            let totCOMISION = lstData2[0].totCOMISION
                            let totRTEIVA = lstData2[0].totRTEIVA
                            let totNETO = lstData2[0].totNETO

                            let porcentajeVentasTotal = (totSVFOPUSDS === 0)
                                    ? 0
                                    : Math.round((totSVFOPUSDC / totSVFOPUSDS) * 100 * 100) / 100;

                            let porcentajeLiquidacionesTotal = (totSVFOPUSDLT === 0)
                                    ? 0
                                    : Math.round((totSVFOPUSDL / totSVFOPUSDLT) * 100 * 100) / 100;


                            console.log(totASALES, 'totASALES')
                            let a = [];


                            let lstData = []
                            for (let value of obj.data.items) {
                                lstData.push(value.data)
                            }
                            console.log(lstData, 'lstData')


                            let dataRoot = {text: '.', expanded: false, children: []};
                            Ext.Object.each(lstData, function (index, value) {
                                if (a.indexOf(value.strFormatDate) < 0) {
                                    let x = [];

                                    let V_QSALES = 0;
                                    let V_QSALESC = 0;

                                    let V_QSVFOPUSDS = 0;
                                    let V_QSVFOPUSDC = 0;

                                    let V_SVFOPUSDL = 0;
                                    let V_SVFOPUSDP = 0;
                                    let V_SVFOPUSDLT = 0;
                                    let V_RATECON = 0;
                                    let V_RATECONL = 0;
                                    let V_COMISION = 0;
                                    let V_RTEIVA = 0;
                                    let V_NETO = 0;



                                    let V_ASALES = 0;
                                    let V_QMATCH = 0;
                                    let V_AMATCH = 0;
                                    let V_QPEND = 0;
                                    let V_APEND = 0;
                                    let V_APOLIC = 0;
                                    let V_QPOLIC = 0;
                                    let V_APOLIPE = 0;
                                    let V_QPOLIPE = 0;


                                    Ext.Object.each(lstData, function (index, valuex) {
                                        if (value.strFormatDate === valuex.strFormatDate) {
                                            V_QSALES += valuex.QSALES;
                                            V_QSALESC += valuex.QSALESC;

                                            V_QSVFOPUSDS += valuex.QSVFOPUSDS;
                                            V_QSVFOPUSDC += valuex.QSVFOPUSDC;

                                            V_SVFOPUSDL += valuex.QSVFOPUSDL;
                                            V_SVFOPUSDP += valuex.QSVFOPUSDP;
                                            V_SVFOPUSDLT += valuex.SVFOPUSDLT;
                                            V_RATECON += valuex.RATECON;
                                            V_RATECONL += valuex.RATECONL;
                                            V_COMISION += valuex.COMISION;
                                            V_RTEIVA += valuex.RTEIVA;
                                            V_NETO += valuex.NETO;

                                            V_ASALES += valuex.ASALES;
                                            V_QMATCH += valuex.QMATCH;
                                            V_AMATCH += valuex.AMATCH;
                                            V_QPEND += valuex.QPEND;
                                            V_APEND += valuex.APEND;
                                            V_APOLIC += valuex.APOLIC;
                                            V_QPOLIC += valuex.QPOLIC;
                                            V_APOLIPE += valuex.APOLIPE;
                                            V_QPOLIPE += valuex.QPOLIPE;
                                        }
                                    });


                                    a.push(value.strFormatDate);

                                    let porcentajeVentas = (V_QSVFOPUSDS === 0)
                                            ? 0
                                            : Math.round((V_QSVFOPUSDC / V_QSVFOPUSDS) * 100 * 100) / 100;

                                    let porcentajeLiquidaciones = (V_SVFOPUSDLT === 0)
                                            ? 0
                                            : Math.round((V_SVFOPUSDL / V_SVFOPUSDLT) * 100 * 100) / 100;

                                    dataRoot.children.push({
                                        strFormatDate: value.strFormatDate,

                                        QSALES: V_QSALES,
                                        QSALESC: V_QSALESC,

                                        QSVFOPUSDS: V_QSVFOPUSDS,
                                        QSVFOPUSDC: V_QSVFOPUSDC,

                                        QSVFOPUSDL: V_SVFOPUSDL,
                                        QSVFOPUSDP: V_SVFOPUSDP,
                                        QSVFOPUSDLT: V_SVFOPUSDLT,
                                        QRATECON: porcentajeVentas,
                                        QRATECONL: porcentajeLiquidaciones,
                                        QCOMISION: V_COMISION,
                                        QRTEIVA: V_RTEIVA,
                                        QNETO: V_NETO,

                                        ASALES: V_ASALES,
                                        perc1: totASALES === 0 ? 0 : (V_ASALES / totASALES) * 100,
                                        QMATCH: V_QMATCH,
                                        AMATCH: V_AMATCH,
                                        QPEND: V_QPEND,
                                        APEND: V_APEND,
                                        APOLIC: V_APOLIC,
                                        QPOLIC: V_QPOLIC,
                                        APOLIPE: V_APOLIPE,
                                        QPOLIPE: V_QPOLIPE,

                                        expanded: false, children: []
                                    });
                                    let b = [];
                                    Ext.Object.each(lstData, function (index, value01) {
                                        if (value.strFormatDate === value01.strFormatDate) {
                                            dataRoot.children[a.indexOf(value.strFormatDate)].children.push({
                                                strFormatDate: value01.strFormatDate,
                                                CCUST: value01.CCUST,
                                                FCHILD: value01.FCHILD,

                                                QSALES: value01.QSALES,
                                                QSALESC: value01.QSALESC,

                                                QSVFOPUSDS: value01.QSVFOPUSDS,
                                                QSVFOPUSDC: value01.QSVFOPUSDC,
                                                QSVFOPUSDL: value01.QSVFOPUSDL,
                                                QSVFOPUSDP: value01.QSVFOPUSDP,
                                                QSVFOPUSDLT: value01.SVFOPUSDLT,
                                                QRATECON: value01.RATECON,
                                                QRATECONL: value01.RATECONL,
                                                QCOMISION: value01.COMISION,
                                                QRTEIVA: value01.RTEIVA,
                                                QNETO: value01.NETO,

                                                ASALES: value01.ASALES,
                                                perc1: totASALES === 0 ? 0 : (value01.ASALES / totASALES) * 100,
                                                QMATCH: value01.QMATCH,
                                                AMATCH: value01.AMATCH,
                                                QPEND: value01.QPEND,
                                                APEND: value01.APEND,
                                                APOLIC: value01.APOLIC,
                                                QPOLIC: value01.QPOLIC,
                                                APOLIPE: value01.APOLIPE,
                                                QPOLIPE: value01.QPOLIPE,
                                                leaf: true
                                            });
                                        }
                                    });
                                }
                            });

                            Ext.getCmp(prototype.id + '-totQSALES_CONZ').setText('Totals');
                            Ext.getCmp(prototype.id + '-totQSALES_CON').setText(Ext.util.Format.number(totSVFOPUSDS, '0,000'));
                            Ext.getCmp(prototype.id + '-totSVFOPUSDS_CON').setText(Ext.util.Format.number(totSVFOPUSDC, '0,000'));
                            Ext.getCmp(prototype.id + '-totSVFOPUSDC_CON').setText(Ext.util.Format.number(totSVFOPUSDL, '0,000'));
                            Ext.getCmp(prototype.id + '-perc2_CON').setText(Ext.util.Format.number(porcentajeVentasTotal, '0.00%'));
                            Ext.getCmp(prototype.id + '-perc3_CON').setText(Ext.util.Format.number(porcentajeLiquidacionesTotal, '0.00%'));

                            Ext.getCmp(prototype.id + '-totSVFOPUSDC_CONT').setText(Ext.util.Format.number(totSVFOPUSDLT, '0,000'));
                            Ext.getCmp(prototype.id + '-totSVFOPUSDC_CON').setText(Ext.util.Format.number(totSVFOPUSDL, '0,000'));
                            Ext.getCmp(prototype.id + '-totSVFOPUSDL_CON').setText(Ext.util.Format.number(totSVFOPUSDP, '0,000'));
                            Ext.getCmp(prototype.id + '-totCOMISION_CON').setText(Ext.util.Format.number(totCOMISION, '0,000'));
                            Ext.getCmp(prototype.id + '-totTAXES_CON').setText(Ext.util.Format.number(totRTEIVA, '0,000'));
                            Ext.getCmp(prototype.id + '-totNet_CON').setText(Ext.util.Format.number(totNETO, '0,000'));


                            Ext.getCmp(prototype.id + '-totQPEND').setText(Ext.util.Format.number(totQPEND, '0,000'));
                            Ext.getCmp(prototype.id + '-totAPEND').setText(Ext.util.Format.number(totAPEND, '0,000'));
                            Ext.getCmp(prototype.id + '-totQPOLIC').setText(Ext.util.Format.number(totQPOLIC, '0,000'));
                            Ext.getCmp(prototype.id + '-totAPOLIC').setText(Ext.util.Format.number(totAPOLIC, '0,000'));
                            Ext.getCmp(prototype.id + '-totQPOLIPE').setText(Ext.util.Format.number(totQPOLIPE, '0,000'));
                            Ext.getCmp(prototype.id + '-totAPOLIPE').setText(Ext.util.Format.number(totAPOLIPE, '0,000'));



                            var storeTree = Ext.create('Ext.data.TreeStore', {
                                root: dataRoot
                            });

                            Ext.getCmp(prototype.id + '-gridDataConciZ').setStore(storeTree);

//                            if(me.typeBean == 'D'){
//                                console.log('drilldown')
//                                Ext.getCmp(prototype.id + '-lblTittleGrid2').setText(obj.data.items[0].data.strFormatDate + ' | ' + obj.data.items[0].data.SAGENT + ' | ' + obj.data.items[0].data.CANAL)
//                            }else {
//                            }


                            // LLENANDO GRAFICO

                            // Variables para ventas
                            let totalVentas = totSVFOPUSDS;
                            let ventasConciliadas = totSVFOPUSDC;
                            let ventasNoConciliadas = totalVentas - ventasConciliadas;

                            // Variables para liquidaciones
                            let totalLiquidaciones = totSVFOPUSDLT;
                            let liquidacionesConciliadas = totSVFOPUSDL;
                            let liquidacionesNoConciliadas = totalLiquidaciones - liquidacionesConciliadas;

                            // Pie data para Ventas
                            let pieDataVentas = [
                                {
                                    label: 'Sale Pending',
                                    value: ventasNoConciliadas,
                                    texto: 'Sale Pending:\n' + Ext.util.Format.number(ventasNoConciliadas, '0,000') + '\n' +
                                            Ext.util.Format.number(ventasNoConciliadas / totalVentas, '0.00%')
                                },
                                {
                                    label: 'Sale Match',
                                    value: ventasConciliadas,
                                    texto: 'Sale Match:\n' + Ext.util.Format.number(ventasConciliadas, '0,000') + '\n' +
                                            Ext.util.Format.number(ventasConciliadas / totalVentas, '0.00%')
                                }
                            ];

                            // Pie data para Liquidaciones
                            let pieDataLiquidaciones = [
                                {
                                    label: 'Sett. Pending',
                                    value: liquidacionesNoConciliadas,
                                    texto: 'Sett. Pending:\n' + Ext.util.Format.number(liquidacionesNoConciliadas, '0,000') + '\n' +
                                            Ext.util.Format.number(liquidacionesNoConciliadas / totalLiquidaciones, '0.00%')
                                },
                                {
                                    label: 'Sett. Match',
                                    value: liquidacionesConciliadas,
                                    texto: 'Sett. Match:\n' + Ext.util.Format.number(liquidacionesConciliadas, '0,000') + '\n' +
                                            Ext.util.Format.number(liquidacionesConciliadas / totalLiquidaciones, '0.00%')
                                }
                            ];

                            // Store para gráfico de ventas
                            let storePieVentas = Ext.create('Ext.data.Store', {
                                fields: ['label', 'value', 'texto'],
                                data: pieDataVentas,
                                autoLoad: true
                            });

                            // Store para gráfico de liquidaciones
                            let storePieLiquidaciones = Ext.create('Ext.data.Store', {
                                fields: ['label', 'value', 'texto'],
                                data: pieDataLiquidaciones,
                                autoLoad: true
                            });

                            // Asignar los stores a los respectivos charts
                            Ext.getCmp(prototype.id + '-displayPieGlobalMatch').bindStore(storePieVentas);
                            Ext.getCmp(prototype.id + '-displayPieSettlement').bindStore(storePieLiquidaciones);




                            Ext.getCmp(prototype.id + '-lblTitleSettlement').setText('Total Settlement: ' + Ext.util.Format.number(totalLiquidaciones, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTittleGlobalMatch').setText('Total Sale: ' + Ext.util.Format.number(totalVentas, '0,000'));



                        }
//                        me.setWidthPie();



                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-lblTittleSalesTotal2_T').hide()

//            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);

//            Ext.getCmp(prototype.id + '-displayPolar2').bindStore(storeGridDatas);
        }
    },
    setGridDataConciliationMDP: function () {
        win.lblUser_toolTip("Estructura: MPF250-Sumario");
        me.panelActual = '-panelGridConciliationMDP';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchTotalConciliationMDP'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj, obj2, success, response, obj5) {

                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                        var pag = Ext.getCmp(prototype.id + '-paggin7');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        var res = Ext.JSON.decode(response._response.responseText);

                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-graficosAñosCMDP').bindStore('Ext.data.Store', {data: [], autoLoad: true});
                            Ext.getCmp(prototype.id + '-graficosAñosAmountCMDP').bindStore('Ext.data.Store', {data: [], autoLoad: true});
                            Ext.getCmp(prototype.id + '-displayPolarSTCMDP').bindStore(Ext.create('Ext.data.Store', {data: [], autoLoad: true}));
                            Ext.getCmp(prototype.id + '-displayPolarST_TCMDP').bindStore('Ext.data.Store', {data: [], autoLoad: true});
                            Ext.getCmp(prototype.id + '-displayPolarST2CMDP').bindStore('Ext.data.Store', {data: [], autoLoad: true});
                            Ext.getCmp(prototype.id + '-gridDataConciMDP').setStore(Ext.create('Ext.data.TreeStore', {root: {}}));
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {

                            let storeDataBard = Ext.create('Ext.data.Store', {
                                data: res.data2,
                                autoLoad: true
                            });
                            //VENTA

                            let item = {};
                            let item2 = {};
                            let totals = [];
                            let charts = [];
                            let pendingPerc = (obj.data.items[0].data.totAPEND / obj.data.items[0].data.totASALES) * 100;
                            let paidPerc = (obj.data.items[0].data.totAMATCH / obj.data.items[0].data.totASALES) * 100;
                            if (obj.data.items.length > 0) {
                                item2.Perc2 = obj.data.items[0].data.totAPEND;
                                var pending = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totAPEND, '0,000') + "\n" + Ext.util.Format.number(pendingPerc, '0.00%');
                                item2.VENDOR = pending;
                                totals.push(item2);

                                item.Perc2 = obj.data.items[0].data.totAMATCH;
                                var Paid = "Payed:\n" + Ext.util.Format.number(obj.data.items[0].data.totAMATCH, '0,000') + "\n" + Ext.util.Format.number(paidPerc, '0.00%');
                                item.VENDOR = Paid;
                                totals.push(item);
                            } else {
                                totals.push({})
                            }


                            var storeData1er = Ext.create('Ext.data.Store', {
                                data: totals,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-displayPolarSTCMDP').bindStore(storeData1er);
                            Ext.getCmp(prototype.id + '-lblTittleSalesTotalCMDP').setText('Totals and Match')


                            let item_T = {};
                            let item2_T = {};
                            let totals_T = [];
                            let charts_T = [];

                            console.log(obj.data.items, 'OBJETO DATA ITEMS')

                            pendingPerc = (obj.data.items[0].data.totQPEND / obj.data.items[0].data.totQSALES) * 100;
                            paidPerc = (obj.data.items[0].data.totQMATCH / obj.data.items[0].data.totQSALES) * 100;
                            if (obj.data.items.length > 0) {
                                item2_T.Perc2 = obj.data.items[0].data.totQSALES;
                                var pending = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totQSALES, '0,000') + "\n" + Ext.util.Format.number(pendingPerc, '0.00%');
                                item2_T.VENDOR = pending;
                                totals_T.push(item2_T);

                                item_T.Perc2 = obj.data.items[0].data.totQSALESC;
                                var Paid = "Payed:\n" + Ext.util.Format.number(obj.data.items[0].data.totQSALESC, '0,000') + "\n" + Ext.util.Format.number(paidPerc, '0.00%');
                                item_T.VENDOR = Paid;
                                totals_T.push(item_T);
                            } else {
                                totals_T.push({})
                            }

                            console.log(totals_T, 'TOTALS_t')
                            var storeData1er = Ext.create('Ext.data.Store', {
                                data: totals_T,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-displayPolarST_TCMDP').bindStore(storeData1er);
                            Ext.getCmp(prototype.id + '-lblTittleSalesTotal_TCMDP').setText('Totals Sales Ticket: ' + Ext.util.Format.number(obj.data.items[0].data.totQSALES, '0,000'))

                            //// CONTABILIDAD

                            let item3 = {};
                            let item4 = {};
                            let totals2 = [];
                            let charts2 = [];
                            let totalContab = obj.data.items[0].data.totAPOLIC + obj.data.items[0].data.totAPOLIPE
                            paidPerc = (obj.data.items[0].data.totAPOLIC / totalContab) * 100;
                            pendingPerc = (obj.data.items[0].data.totAPOLIPE / totalContab) * 100;
                            if (obj.data.items.length > 0) {
                                item4.Perc2 = obj.data.items[0].data.totAPOLIC;
                                var pending = "Processed:\n" + Ext.util.Format.number(obj.data.items[0].data.totAPOLIC, '0,000') + "\n" + Ext.util.Format.number(paidPerc, '0.00%');
                                item4.VENDOR = pending;
                                totals2.push(item4);

                                item3.Perc2 = obj.data.items[0].data.totAPOLIPE;
                                var Paid = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totAPOLIPE, '0,000') + "\n" + Ext.util.Format.number(pendingPerc, '0.00%');
                                item3.VENDOR = Paid;
                                totals2.push(item3);
                            } else {
                                totals2.push({})
                            }


                            var storeData1er = Ext.create('Ext.data.Store', {
                                data: totals2,
                                autoLoad: true
                            });

                            Ext.getCmp(prototype.id + '-displayPolarST2CMDP').bindStore(storeData1er);
                            Ext.getCmp(prototype.id + '-lblTittleSalesTotal2CMDP').setText('Totals and Match')
                            console.log(storeDataBard, 'storeDataBard')
                            Ext.getCmp(prototype.id + '-graficosAñosCMDP').bindStore(storeDataBard);
                            Ext.getCmp(prototype.id + '-graficosAñosAmountCMDP').bindStore(storeDataBard);


                            /**/

                            // AQUI LLENAMOS LA GRILLA Y LOS TOTALES

                            let lstData2 = res.data2
                            let totAMATCH = lstData2[0].totAMATCH
                            let totAPEND = lstData2[0].totAPEND
                            let totAPOLIC = lstData2[0].totAPOLIC
                            let totAPOLIPE = lstData2[0].totAPOLIPE
                            let totASALES = lstData2[0].totASALES

                            let totQMATCH = lstData2[0].totQMATCH
                            let totQPEND = lstData2[0].totQPEND
                            let totQPOLIC = lstData2[0].totQPOLIC
                            let totQPOLIPE = lstData2[0].totQPOLIPE

                            let totQSALES = lstData2[0].totQSALES

                            let totQTYTACCOC = lstData2[0].totQTYTACCOC
                            let totQTYACCO = lstData2[0].totQTYACCO


                            let totSVFOPUSDS = lstData2[0].totSVFOPUSDS
                            let totSVFOPUSDC = lstData2[0].totSVFOPUSDC
                            let totSVFOPUSDL = lstData2[0].totSVFOPUSDL
                            let totSVFOPUSDP = lstData2[0].totSVFOPUSDP
                            let totSVFOPUSDLT = lstData2[0].totSVFOPUSDLT
                            let totSVFOPACCO = lstData2[0].totSVFOPACCO
                            let totSVFOPACCC = lstData2[0].totSVFOPACCC
                            let totRATECON = lstData2[0].totRATECON
                            let totRATEACCOU = lstData2[0].totRATEACCOU
                            let totCOMISION = lstData2[0].totCOMISION
                            let totRTEIVA = lstData2[0].totRTEIVA
                            let totNETO = lstData2[0].totNETO

                            let porcentajeVentasTotal = (totSVFOPUSDS === 0)
                                    ? 0
                                    : Math.round((totSVFOPUSDC / totSVFOPUSDS) * 100 * 100) / 100;

                            let porcentajeLiquidacionesTotal = (totSVFOPUSDLT === 0)
                                    ? 0
                                    : Math.round((totSVFOPUSDL / totSVFOPUSDLT) * 100 * 100) / 100;

                            let porcentajeContabilidad = (totQTYACCO === 0)
                                    ? 0
                                    : Math.round((totQTYTACCOC / totQTYACCO) * 100 * 100) / 100;


                            console.log(totASALES, 'totASALES')
                            let a = [];


                            let lstData = []
                            for (let value of obj.data.items) {
                                lstData.push(value.data)
                            }
                            console.log(lstData, 'lstData')


                            let dataRoot = {text: '.', expanded: false, children: []};
                            Ext.Object.each(lstData, function (index, value) {
                                if (a.indexOf(value.strFormatDate) < 0) {
                                    let x = [];

                                    let V_QSALES = 0;
                                    let V_QSALESC = 0;

                                    let V_QSVFOPUSDS = 0;
                                    let V_QSVFOPUSDC = 0;

                                    let V_SVFOPUSDL = 0;
                                    let V_SVFOPUSDP = 0;
                                    let V_SVFOPUSDLT = 0;
                                    let V_SVFOPACCO = 0;
                                    let V_SVFOPACCC = 0;
                                    let V_RATECON = 0;
                                    let V_RATECONL = 0;
                                    let V_RATEACCOU = 0;
                                    let V_COMISION = 0;
                                    let V_RTEIVA = 0;
                                    let V_NETO = 0;



                                    let V_ASALES = 0;
                                    let V_QMATCH = 0;
                                    let V_AMATCH = 0;
                                    let V_QPEND = 0;
                                    let V_APEND = 0;
                                    let V_APOLIC = 0;
                                    let V_QPOLIC = 0;
                                    let V_APOLIPE = 0;
                                    let V_QPOLIPE = 0;

                                    let V_QTYACCO = 0;
                                    let V_QTYTACCOC = 0;


                                    Ext.Object.each(lstData, function (index, valuex) {
                                        if (value.strFormatDate === valuex.strFormatDate) {
                                            V_QSALES += valuex.QSALES;
                                            V_QSALESC += valuex.QSALESC;

                                            V_QTYACCO += valuex.QTYACCO;
                                            V_QTYTACCOC += valuex.QTYTACCOC;

                                            V_QSVFOPUSDS += valuex.QSVFOPUSDS;
                                            V_QSVFOPUSDC += valuex.QSVFOPUSDC;

                                            V_SVFOPUSDL += valuex.QSVFOPUSDL;
                                            V_SVFOPUSDP += valuex.QSVFOPUSDP;
                                            V_SVFOPUSDLT += valuex.SVFOPUSDLT;
                                            V_RATECON += valuex.RATECON;
                                            V_RATECONL += valuex.RATECONL;
                                            V_RATEACCOU += valuex.RATEACCOU;
                                            V_SVFOPACCO += valuex.SVFOPACCO;
                                            V_SVFOPACCC += valuex.SVFOPACCC;


                                            V_COMISION += valuex.COMISION;
                                            V_RTEIVA += valuex.RTEIVA;
                                            V_NETO += valuex.NETO;

                                            V_ASALES += valuex.ASALES;
                                            V_QMATCH += valuex.QMATCH;
                                            V_AMATCH += valuex.AMATCH;
                                            V_QPEND += valuex.QPEND;
                                            V_APEND += valuex.APEND;
                                            V_APOLIC += valuex.APOLIC;
                                            V_QPOLIC += valuex.QPOLIC;
                                            V_APOLIPE += valuex.APOLIPE;
                                            V_QPOLIPE += valuex.QPOLIPE;
                                        }
                                    });


                                    a.push(value.strFormatDate);

                                    let porcentajeVentas = (V_QSVFOPUSDS === 0)
                                            ? 0
                                            : Math.round((V_QSVFOPUSDC / V_QSVFOPUSDS) * 100 * 100) / 100;

                                    let porcentajeLiquidaciones = (V_SVFOPUSDLT === 0)
                                            ? 0
                                            : Math.round((V_SVFOPUSDL / V_SVFOPUSDLT) * 100 * 100) / 100;

                                    let porcentajeContabilidad = (V_QTYACCO === 0)
                                            ? 0
                                            : Math.round((V_QTYTACCOC / V_QTYACCO) * 100 * 100) / 100;

                                    dataRoot.children.push({
                                        strFormatDate: value.strFormatDate,

                                        QSALES: V_QSALES,
                                        QSALESC: V_QSALESC,

                                        QTYACCO: V_QTYACCO,
                                        QTYTACCOC: V_QTYTACCOC,

                                        QSVFOPUSDS: V_QSVFOPUSDS,
                                        QSVFOPUSDC: V_QSVFOPUSDC,

                                        QSVFOPUSDL: V_SVFOPUSDL,
                                        QSVFOPUSDP: V_SVFOPUSDP,
                                        QSVFOPUSDLT: V_SVFOPUSDLT,
                                        QRATECON: porcentajeVentas,
                                        QRATECONL: porcentajeLiquidaciones,
                                        RATEACCOU: porcentajeContabilidad,

                                        SVFOPACCO: V_SVFOPACCO,
                                        SVFOPACCC: V_SVFOPACCC,

                                        QCOMISION: V_COMISION,
                                        QRTEIVA: V_RTEIVA,
                                        QNETO: V_NETO,

                                        ASALES: V_ASALES,
                                        perc1: totASALES === 0 ? 0 : (V_ASALES / totASALES) * 100,
                                        QMATCH: V_QMATCH,
                                        AMATCH: V_AMATCH,
                                        QPEND: V_QPEND,
                                        APEND: V_APEND,
                                        APOLIC: V_APOLIC,
                                        QPOLIC: V_QPOLIC,
                                        APOLIPE: V_APOLIPE,
                                        QPOLIPE: V_QPOLIPE,

                                        expanded: false, children: []
                                    });
                                    let b = [];
                                    Ext.Object.each(lstData, function (index, value01) {
                                        if (value.strFormatDate === value01.strFormatDate) {
                                            dataRoot.children[a.indexOf(value.strFormatDate)].children.push({
                                                strFormatDate: value01.strFormatDate,
                                                CCUST: value01.CCUST,
                                                FCHILD: value01.FCHILD,

                                                QSALES: value01.QSALES,
                                                QSALESC: value01.QSALESC,

                                                QTYACCO: value01.QTYACCO,
                                                QTYTACCOC: value01.QTYTACCOC,

                                                QSVFOPUSDS: value01.QSVFOPUSDS,
                                                QSVFOPUSDC: value01.QSVFOPUSDC,
                                                QSVFOPUSDL: value01.QSVFOPUSDL,
                                                QSVFOPUSDP: value01.QSVFOPUSDP,
                                                QSVFOPUSDLT: value01.SVFOPUSDLT,

                                                SVFOPACCO: value01.SVFOPACCO,
                                                SVFOPACCC: value01.SVFOPACCC,

                                                QRATECON: value01.RATECON,
                                                QRATECONL: value01.RATECONL,
                                                RATEACCOU: value01.RATEACCOU,

                                                QCOMISION: value01.COMISION,
                                                QRTEIVA: value01.RTEIVA,
                                                QNETO: value01.NETO,

                                                ASALES: value01.ASALES,
                                                perc1: totASALES === 0 ? 0 : (value01.ASALES / totASALES) * 100,
                                                QMATCH: value01.QMATCH,
                                                AMATCH: value01.AMATCH,
                                                QPEND: value01.QPEND,
                                                APEND: value01.APEND,
                                                APOLIC: value01.APOLIC,
                                                QPOLIC: value01.QPOLIC,
                                                APOLIPE: value01.APOLIPE,
                                                QPOLIPE: value01.QPOLIPE,
                                                leaf: true
                                            });
                                        }
                                    });
                                }
                            });

                            Ext.getCmp(prototype.id + '-totQSALES_CONZMDP').setText('Totals');
                            Ext.getCmp(prototype.id + '-totQSALES_CONMDP').setText(Ext.util.Format.number(totSVFOPUSDS, '0,000'));
                            Ext.getCmp(prototype.id + '-totSVFOPUSDS_CONMDP').setText(Ext.util.Format.number(totSVFOPUSDC, '0,000'));
                            Ext.getCmp(prototype.id + '-totSVFOPUSDC_CONMDP').setText(Ext.util.Format.number(totSVFOPUSDL, '0,000'));
                            Ext.getCmp(prototype.id + '-perc2_CONMDP').setText(Ext.util.Format.number(porcentajeVentasTotal, '0.00%'));
                            Ext.getCmp(prototype.id + '-perc3_CONMDP').setText(Ext.util.Format.number(porcentajeLiquidacionesTotal, '0.00%'));

                            Ext.getCmp(prototype.id + '-totSVFOPUSDC_CONTMDP').setText(Ext.util.Format.number(totSVFOPUSDLT, '0,000'));
                            Ext.getCmp(prototype.id + '-totSVFOPUSDC_CONMDP').setText(Ext.util.Format.number(totSVFOPUSDL, '0,000'));
                            Ext.getCmp(prototype.id + '-totSVFOPUSDL_CONMDP').setText(Ext.util.Format.number(totSVFOPUSDP, '0,000'));
                            Ext.getCmp(prototype.id + '-totCOMISION_CONMDP').setText(Ext.util.Format.number(totCOMISION, '0,000'));
                            Ext.getCmp(prototype.id + '-totTAXES_CONMDP').setText(Ext.util.Format.number(totRTEIVA, '0,000'));
                            Ext.getCmp(prototype.id + '-totNet_CONMDP').setText(Ext.util.Format.number(totNETO, '0,000'));
                            Ext.getCmp(prototype.id + '-totPerce_CONMP').setText(Ext.util.Format.number(porcentajeContabilidad, '0.00%'));


                            Ext.getCmp(prototype.id + '-totQPEND').setText(Ext.util.Format.number(totQPEND, '0,000'));
                            Ext.getCmp(prototype.id + '-totAPEND').setText(Ext.util.Format.number(totAPEND, '0,000'));
                            Ext.getCmp(prototype.id + '-totQPOLIC').setText(Ext.util.Format.number(totQPOLIC, '0,000'));
                            Ext.getCmp(prototype.id + '-totAPOLIC').setText(Ext.util.Format.number(totAPOLIC, '0,000'));
                            Ext.getCmp(prototype.id + '-totQPOLIPE').setText(Ext.util.Format.number(totQPOLIPE, '0,000'));
                            Ext.getCmp(prototype.id + '-totAPOLIPE').setText(Ext.util.Format.number(totAPOLIPE, '0,000'));



                            var storeTree = Ext.create('Ext.data.TreeStore', {
                                root: dataRoot
                            });

                            Ext.getCmp(prototype.id + '-gridDataConciMDP').setStore(storeTree);

//                            if(me.typeBean == 'D'){
//                                console.log('drilldown')
//                                Ext.getCmp(prototype.id + '-lblTittleGrid2').setText(obj.data.items[0].data.strFormatDate + ' | ' + obj.data.items[0].data.SAGENT + ' | ' + obj.data.items[0].data.CANAL)
//                            }else {
//                            }


                            // LLENANDO GRAFICO

                            // Variables para ventas
                            let totalVentas = totSVFOPUSDS;
                            let ventasConciliadas = totSVFOPUSDC;
                            let ventasNoConciliadas = totalVentas - ventasConciliadas;

                            // Variables para liquidaciones
                            let totalLiquidaciones = totSVFOPUSDLT;
                            let liquidacionesConciliadas = totSVFOPUSDL;
                            let liquidacionesNoConciliadas = totalLiquidaciones - liquidacionesConciliadas;

                            // Pie data para Ventas
                            let pieDataVentas = [
                                {
                                    label: 'Sale Pending',
                                    value: ventasNoConciliadas,
                                    texto: 'Sale Pending:\n' + Ext.util.Format.number(ventasNoConciliadas, '0,000') + '\n' +
                                            Ext.util.Format.number(ventasNoConciliadas / totalVentas, '0.00%')
                                },
                                {
                                    label: 'Sale Match',
                                    value: ventasConciliadas,
                                    texto: 'Sale Match:\n' + Ext.util.Format.number(ventasConciliadas, '0,000') + '\n' +
                                            Ext.util.Format.number(ventasConciliadas / totalVentas, '0.00%')
                                }
                            ];

                            // Pie data para Liquidaciones
                            let pieDataLiquidaciones = [
                                {
                                    label: 'Sett. Pending',
                                    value: liquidacionesNoConciliadas,
                                    texto: 'Sett. Pending:\n' + Ext.util.Format.number(liquidacionesNoConciliadas, '0,000') + '\n' +
                                            Ext.util.Format.number(liquidacionesNoConciliadas / totalLiquidaciones, '0.00%')
                                },
                                {
                                    label: 'Sett. Match',
                                    value: liquidacionesConciliadas,
                                    texto: 'Sett. Match:\n' + Ext.util.Format.number(liquidacionesConciliadas, '0,000') + '\n' +
                                            Ext.util.Format.number(liquidacionesConciliadas / totalLiquidaciones, '0.00%')
                                }
                            ];

                            // Store para gráfico de ventas
                            let storePieVentas = Ext.create('Ext.data.Store', {
                                fields: ['label', 'value', 'texto'],
                                data: pieDataVentas,
                                autoLoad: true
                            });

                            // Store para gráfico de liquidaciones
                            let storePieLiquidaciones = Ext.create('Ext.data.Store', {
                                fields: ['label', 'value', 'texto'],
                                data: pieDataLiquidaciones,
                                autoLoad: true
                            });

                            // Asignar los stores a los respectivos charts
                            Ext.getCmp(prototype.id + '-displayPieGlobalMatchMDP').bindStore(storePieVentas);
                            Ext.getCmp(prototype.id + '-displayPieSettlementMDP').bindStore(storePieLiquidaciones);




                            Ext.getCmp(prototype.id + '-lblTitleSettlementMDP').setText('Total Settlement: ' + Ext.util.Format.number(totalLiquidaciones, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTittleGlobalMatchMDP').setText('Total Sale: ' + Ext.util.Format.number(totalVentas, '0,000'));



                        }
//                        me.setWidthPie();



                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-lblTittleSalesTotal2_T').hide()

//            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);

//            Ext.getCmp(prototype.id + '-displayPolar2').bindStore(storeGridDatas);




        }
    },
    toggleFiltersByPanel: function (panelId, prototype) {
        const filterIds = [
            prototype.id + '-cmbCountry',
            prototype.id + '-txtAGENCY',
            prototype.id + '-cmbPercentage',
            prototype.id + '-cmbSource',
            prototype.id + '-txtCUTDAYS',
            prototype.id + '-txtFECR',
            prototype.id + '-txtHOCR',
            prototype.id + '-chkboxTypeRecord',
            prototype.id + '-chkboxSurplus',
            prototype.id + '-rayita'
        ];

        // === NUEVO: campos que se deben mostrar cuando los anteriores se ocultan ===
        const extraFilterIds = [
            prototype.id + '-txtBANDOC',
            prototype.id + '-txtREFER',
            prototype.id + '-cmbProcessor',
            prototype.id + '-txtIDCONT',
            prototype.id + '-txtHeaderText',
            prototype.id + '-txtAccprov',
            prototype.id + '-cargaMerchant',
            prototype.id + '-cmbCodeError',
        ];

        const hide = (panelId === '-panelGridSumaryMain' || panelId === '-panelGridSumaryDetail' || panelId === '-panelGridSumaryMainCash');

        // Ajustar altura del panel
        const panelHeight = Ext.getCmp(prototype.id + '-panelHeight');
        if (panelHeight) {
            panelHeight.setHeight(hide ? 750 : 830);
        }

        // Grupo principal: se ocultan si hide = true
        Ext.Array.each(filterIds, function (cmpId) {
            const cmp = Ext.getCmp(cmpId);
            if (cmp) {
                cmp.setVisible(!hide);
            } else {
                console.warn('No se encontró el componente con id:', cmpId);
            }
        });

        // Grupo secundario (extra): se muestran si hide = true
        Ext.Array.each(extraFilterIds, function (cmpId) {
            const cmp = Ext.getCmp(cmpId);
            if (cmp) {
                cmp.setVisible(hide);
            } else {
                console.warn('No se encontró el componente con id (extra):', cmpId);
            }
        });
    },
    setFormatParameterDashboard: function () {
        me.bean = {};
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_BANDOC = Ext.getCmp(prototype.id + '-txtBANDOC').getValue();
        me.bean.IN_REFER = Ext.getCmp(prototype.id + '-txtREFER').getValue();
        me.bean.IN_CODPRO = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        me.bean.IN_IDCONT = Ext.getCmp(prototype.id + '-txtIDCONT').getValue();
        me.bean.IN_HEADER = Ext.getCmp(prototype.id + '-txtHeaderText').getValue();
        me.bean.IN_PROVISION = Ext.getCmp(prototype.id + '-txtAccprov').getValue();
        me.bean.IN_CODEERROR = Ext.getCmp(prototype.id + '-cmbCodeError').getValue();
//        me.bean.IN_CODPRO = "CO";
//        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
//        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtAGENCY').getValue();
//        me.bean.IN_PERCENTAGE = Ext.getCmp(prototype.id + '-cmbPercentage').getValue();
//        me.bean.IN_CANAL = Ext.getCmp(prototype.id + '-cmbSource').getValue();
//        me.bean.IN_CUTDAYS = Ext.getCmp(prototype.id + '-txtCUTDAYS').getValue();
//        me.bean.IN_TOP = Ext.getCmp(prototype.id + '-cmbTOP').getValue();
        me.bean.IN_CCUST = Ext.getCmp(prototype.id + '-cmbAviancaGroup').getValue();
//        me.bean.IN_TREG = Ext.getCmp(prototype.id + '-chkboxTypeRecord').getValue() ? '1' : '2';
//        me.bean.IN_SURPLUS = Ext.getCmp(prototype.id + '-chkboxSurplus').getValue() ? '1' : '2';

        console.log(me.bean, 'setFormatParameterDashboard');
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    setGridDataDashboard: function () {
        win.lblUser_toolTip("Estructura: MPF102");
        me.panelActual = '-panelGridSumaryMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchSumaryMain'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {

                        let lstData = [];
                        for (let value of obj.data.items) {
                            lstData.push(value.data);
                        }

                        // Totales generales
                        let F1_TOTAL_GLOBAL = 0;
                        let F1_TOTAL_STVAL3_GLOBAL = 0;
                        let F1_TOTAL_STVAL1_GLOBAL = 0;
                        let F1_TOTAL_TAXES_GLOBAL = 0;
                        let F1_TOTAL_ERROR_GLOBAL = 0;
                        let F1_TOTAL_PENDING_TO_F2_GLOBAL = 0;

                        let F2_F1_TOTAL_COMPLETED_GLOBAL = 0;
                        let F2_TOTAL_PENDING_OVER50_GLOBAL = 0;
                        let F2_TOTAL_MATCH_OVER50_GLOBAL = 0;

                        let F3_F2_TOTAL_COMPLETED_GLOBAL = 0;
                        let F3_TOTAL_WO_ACC_GLOBAL = 0;
                        let F3_TOTAL_COMPLETED_GLOBAL = 0;
                        let F3_TOTAL_PENDING_SENT_GLOBAL = 0;
                        let F3_TOTAL_COMPLETED_SAP_GLOBAL = 0;
                        let F3_TOTAL_ERROR_GLOBAL = 0;

                        let a = [];
                        let dataRoot = {text: '.', expanded: false, children: []};

                        Ext.Object.each(lstData, function (index, value) {
                            if (a.indexOf(value.strFormatDate) < 0) {
                                let V_F1_TOTAL = 0;
                                let V_F1_TOTAL_STVAL3 = 0;
                                let V_F1_TOTAL_STVAL1 = 0;
                                let V_F1_TOTAL_TAXES = 0;
                                let V_F1_TOTAL_ERROR = 0;
                                let V_F1_PERCENT = 0;
                                let V_F1_PENDING_TO_F2 = 0;

                                let V_F2_F1_TOTAL_COMPLETED = 0;
                                let V_F2_TOTAL_PENDING_OVER50 = 0;
                                let V_F2_TOTAL_MATCH_OVER50 = 0;
                                let V_F2_PERCENT = 0;

                                let V_F3_F2_TOTAL_COMPLETED = 0;
                                let V_F3_TOTAL_WO_ACC = 0;
                                let V_F3_TOTAL_COMPLETED = 0;
                                let V_F3_TOTAL_PENDING_SENT = 0;
                                let V_F3_PERCENT = 0;
                                let V_F3_TOTAL_COMPLETED_SAP = 0;
                                let V_F3_TOTAL_ERROR = 0;

                                // Agrupar por mes
                                Ext.Object.each(lstData, function (index, valuex) {
                                    if (value.strFormatDate === valuex.strFormatDate) {
                                        V_F1_TOTAL += valuex.F1_TOTAL;
                                        V_F1_TOTAL_STVAL3 += valuex.F1_TOTAL_STVAL3;
                                        V_F1_TOTAL_STVAL1 += valuex.F1_TOTAL_STVAL1;
                                        V_F1_TOTAL_TAXES += valuex.F1_TOTAL_TAXES;
                                        V_F1_TOTAL_ERROR += valuex.F1_TOTAL_ERROR;
                                        V_F1_PENDING_TO_F2 += valuex.F1_TOTAL_PENDING_TO_F2;

                                        V_F2_F1_TOTAL_COMPLETED += valuex.F2_F1_TOTAL_COMPLETED;
                                        V_F2_TOTAL_PENDING_OVER50 += valuex.F2_TOTAL_PENDING_OVER50;
                                        V_F2_TOTAL_MATCH_OVER50 += valuex.F2_TOTAL_MATCH_OVER50;

                                        V_F3_F2_TOTAL_COMPLETED += valuex.F3_F2_TOTAL_COMPLETED;
                                        V_F3_TOTAL_WO_ACC += valuex.F3_TOTAL_WO_ACC;
                                        V_F3_TOTAL_COMPLETED += valuex.F3_TOTAL_COMPLETED;
                                        V_F3_TOTAL_PENDING_SENT += valuex.F3_TOTAL_PENDING_SENT;
                                        V_F3_TOTAL_COMPLETED_SAP += valuex.F3_TOTAL_COMPLETED_SAP;
                                        V_F3_TOTAL_ERROR += valuex.F3_TOTAL_ERROR;
                                    }
                                });

                                // Calcular porcentaje por mes
                                if (V_F1_TOTAL > 0) {
                                    V_F1_PERCENT = (V_F1_TOTAL_STVAL1 * 100) / V_F1_TOTAL;
                                }

                                if (V_F2_F1_TOTAL_COMPLETED > 0) {
                                    V_F2_PERCENT = (V_F2_TOTAL_MATCH_OVER50 * 100) / V_F2_F1_TOTAL_COMPLETED;
                                }

                                if (V_F3_F2_TOTAL_COMPLETED > 0) {
                                    V_F3_PERCENT = (V_F3_TOTAL_COMPLETED * 100) / V_F3_F2_TOTAL_COMPLETED;
                                }

                                // Agregar al árbol
                                a.push(value.strFormatDate);
                                dataRoot.children.push({
                                    strFormatDate: value.strFormatDate,
                                    VALDATE: value.VALDATE,
                                    F1_TOTAL: V_F1_TOTAL,
                                    F1_TOTAL_STVAL3: V_F1_TOTAL_STVAL3,
                                    F1_TOTAL_STVAL1: V_F1_TOTAL_STVAL1,
                                    F1_TOTAL_TAXES: V_F1_TOTAL_TAXES,
                                    F1_TOTAL_ERROR: V_F1_TOTAL_ERROR,
                                    F1_TOTAL_PENDING_TO_F2: V_F1_PENDING_TO_F2,
                                    F1_PERCENT: V_F1_PERCENT.toFixed(2) + '%',

                                    F2_F1_TOTAL_COMPLETED: V_F2_F1_TOTAL_COMPLETED,
                                    F2_TOTAL_PENDING_OVER50: V_F2_TOTAL_PENDING_OVER50,
                                    F2_TOTAL_MATCH_OVER50: V_F2_TOTAL_MATCH_OVER50,
                                    F2_PERCENT: V_F2_PERCENT.toFixed(2) + '%',

                                    F3_F2_TOTAL_COMPLETED: V_F3_F2_TOTAL_COMPLETED,
                                    F3_TOTAL_WO_ACC: V_F3_TOTAL_WO_ACC,
                                    F3_TOTAL_COMPLETED: V_F3_TOTAL_COMPLETED,
                                    F3_TOTAL_PENDING_SENT: V_F3_TOTAL_PENDING_SENT,
                                    F3_TOTAL_COMPLETED_SAP: V_F3_TOTAL_COMPLETED_SAP,
                                    F3_PERCENT: V_F3_PERCENT.toFixed(2) + '%',
                                    F3_TOTAL_ERROR: V_F3_TOTAL_ERROR,

                                    expanded: false,
                                    children: []
                                });

                                // Agregar las filas hijas
                                Ext.Object.each(lstData, function (index, value01) {
                                    if (value.strFormatDate === value01.strFormatDate) {
                                        let V_CHILD_PERCENT = 0;
                                        let V_CHILD_PERCENT_F2 = 0;
                                        let V_CHILD_PERCENT_F3 = 0;

                                        if (value01.F1_TOTAL > 0) {
                                            V_CHILD_PERCENT = (value01.F1_TOTAL_STVAL1 * 100) / value01.F1_TOTAL;
                                        }

                                        if (value01.F2_F1_TOTAL_COMPLETED > 0) {
                                            V_CHILD_PERCENT_F2 = (value01.F2_TOTAL_MATCH_OVER50 * 100) / value01.F2_F1_TOTAL_COMPLETED;
                                        }

                                        if (value01.F3_F2_TOTAL_COMPLETED > 0) {
                                            V_CHILD_PERCENT_F3 = (value01.F3_TOTAL_COMPLETED * 100) / value01.F3_F2_TOTAL_COMPLETED;
                                        }

                                        dataRoot.children[a.indexOf(value.strFormatDate)].children.push({
                                            strFormatDate: value01.strFormatDate,
                                            VALDATE: value01.VALDATE,
                                            CCUST: value01.CCUST,
                                            F1_TOTAL: value01.F1_TOTAL,
                                            F1_TOTAL_STVAL3: value01.F1_TOTAL_STVAL3,
                                            F1_TOTAL_STVAL1: value01.F1_TOTAL_STVAL1,
                                            F1_TOTAL_TAXES: value01.F1_TOTAL_TAXES,
                                            F1_TOTAL_ERROR: value01.F1_TOTAL_ERROR,
                                            F1_TOTAL_PENDING_TO_F2: value01.F1_TOTAL_PENDING_TO_F2,
                                            F1_PERCENT: V_CHILD_PERCENT.toFixed(2) + '%',

                                            F2_F1_TOTAL_COMPLETED: value01.F2_F1_TOTAL_COMPLETED,
                                            F2_TOTAL_PENDING_OVER50: value01.F2_TOTAL_PENDING_OVER50,
                                            F2_TOTAL_MATCH_OVER50: value01.F2_TOTAL_MATCH_OVER50,
                                            F2_PERCENT: V_CHILD_PERCENT_F2.toFixed(2) + '%',

                                            F3_F2_TOTAL_COMPLETED: value01.F3_F2_TOTAL_COMPLETED,
                                            F3_TOTAL_WO_ACC: value01.F3_TOTAL_WO_ACC,
                                            F3_TOTAL_COMPLETED: value01.F3_TOTAL_COMPLETED,
                                            F3_TOTAL_PENDING_SENT: value01.F3_TOTAL_PENDING_SENT,
                                            F3_TOTAL_COMPLETED_SAP: value01.F3_TOTAL_COMPLETED_SAP,
                                            F3_TOTAL_ERROR: value01.F3_TOTAL_ERROR,
                                            F3_PERCENT: V_CHILD_PERCENT_F3.toFixed(2) + '%',

                                            leaf: true
                                        });
                                    }
                                });

                                // Acumular global
                                F1_TOTAL_GLOBAL += V_F1_TOTAL;
                                F1_TOTAL_STVAL3_GLOBAL += V_F1_TOTAL_STVAL3;
                                F1_TOTAL_STVAL1_GLOBAL += V_F1_TOTAL_STVAL1;
                                F1_TOTAL_TAXES_GLOBAL += V_F1_TOTAL_TAXES;
                                F1_TOTAL_ERROR_GLOBAL += V_F1_TOTAL_ERROR;
                                F1_TOTAL_PENDING_TO_F2_GLOBAL += V_F1_PENDING_TO_F2;

                                F2_F1_TOTAL_COMPLETED_GLOBAL += V_F2_F1_TOTAL_COMPLETED;
                                F2_TOTAL_PENDING_OVER50_GLOBAL += V_F2_TOTAL_PENDING_OVER50;
                                F2_TOTAL_MATCH_OVER50_GLOBAL += V_F2_TOTAL_MATCH_OVER50;

                                F3_F2_TOTAL_COMPLETED_GLOBAL += V_F3_F2_TOTAL_COMPLETED;
                                F3_TOTAL_WO_ACC_GLOBAL += V_F3_TOTAL_WO_ACC;
                                F3_TOTAL_COMPLETED_GLOBAL += V_F3_TOTAL_COMPLETED;
                                F3_TOTAL_PENDING_SENT_GLOBAL += V_F3_TOTAL_PENDING_SENT;
                                F3_TOTAL_COMPLETED_SAP_GLOBAL += V_F3_TOTAL_COMPLETED_SAP;
                                F3_TOTAL_ERROR_GLOBAL += V_F3_TOTAL_ERROR;
                            }
                        });

                        // Calcular porcentaje global
                        let F1_PERCENT_GLOBAL = 0;
                        if (F1_TOTAL_GLOBAL > 0) {
                            F1_PERCENT_GLOBAL = (F1_TOTAL_STVAL1_GLOBAL * 100) / F1_TOTAL_GLOBAL;
                        }

                        let F1_PERCENT_GLOBAL_F2 = 0;
                        if (F2_F1_TOTAL_COMPLETED_GLOBAL > 0) {
                            F1_PERCENT_GLOBAL_F2 = (F2_TOTAL_MATCH_OVER50_GLOBAL * 100) / F2_F1_TOTAL_COMPLETED_GLOBAL;
                        }

                        let F1_PERCENT_GLOBAL_F3 = 0;
                        if (F3_F2_TOTAL_COMPLETED_GLOBAL > 0) {
                            F1_PERCENT_GLOBAL_F3 = (F3_TOTAL_COMPLETED_GLOBAL * 100) / F3_F2_TOTAL_COMPLETED_GLOBAL;
                        }

                        // Crear el store
                        var storeTree = Ext.create('Ext.data.TreeStore', {
                            root: dataRoot
                        });

                        Ext.getCmp(prototype.id + '-gridSumaryMain').setStore(storeTree);

                        Ext.getCmp(prototype.id + '-F1_TOTAL_GLOBAL').setText(Ext.util.Format.number(F1_TOTAL_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F1_TOTAL_STVAL3_GLOBAL').setText(Ext.util.Format.number(F1_TOTAL_STVAL3_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F1_TOTAL_STVAL1_GLOBAL').setText(Ext.util.Format.number(F1_TOTAL_STVAL1_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F1_TOTAL_TAXES_GLOBAL').setText(Ext.util.Format.number(F1_TOTAL_TAXES_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F1_TOTAL_ERROR_GLOBAL').setText(Ext.util.Format.number(F1_TOTAL_ERROR_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F1_PERCENT_GLOBAL').setText(F1_PERCENT_GLOBAL.toFixed(2) + '%');
                        Ext.getCmp(prototype.id + '-F1_TOTAL_PENDING_TO_F2_GLOBAL').setText(Ext.util.Format.number(F1_TOTAL_PENDING_TO_F2_GLOBAL, '0,000'));

                        Ext.getCmp(prototype.id + '-F2_TOTAL_GLOBAL').setText(Ext.util.Format.number(F2_F1_TOTAL_COMPLETED_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F2_TOTAL_STVAL3_GLOBAL').setText(Ext.util.Format.number(F2_TOTAL_PENDING_OVER50_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F2_TOTAL_STVAL1_GLOBAL').setText(Ext.util.Format.number(F2_TOTAL_MATCH_OVER50_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F2_PERCENT_GLOBAL').setText(F1_PERCENT_GLOBAL_F2.toFixed(2) + '%');

                        Ext.getCmp(prototype.id + '-SENT_TOTAL_GLOBAL').setText(Ext.util.Format.number(F3_F2_TOTAL_COMPLETED_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-SENT_TOTAL_STVAL3_GLOBAL').setText(Ext.util.Format.number(F3_TOTAL_WO_ACC_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-SENT_TOTAL_STVAL1_GLOBAL').setText(Ext.util.Format.number(F3_TOTAL_COMPLETED_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-SENT_PERCENT_GLOBAL').setText(F1_PERCENT_GLOBAL_F3.toFixed(2) + '%');
                        Ext.getCmp(prototype.id + '-SENT_TOTAL_SENT_GLOBAL').setText(Ext.util.Format.number(F3_TOTAL_PENDING_SENT_GLOBAL, '0,000'));

                        Ext.getCmp(prototype.id + '-SAP_TOTAL_STVAL1_GLOBAL').setText(Ext.util.Format.number(F3_TOTAL_COMPLETED_SAP_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-RETURN_ERROR_GLOBAL').setText(Ext.util.Format.number(F3_TOTAL_ERROR_GLOBAL, '0,000'));

                        // ==== F1 - Settlement ====
                        var totalsF1 = [];
                        if (typeof F1_PERCENT_GLOBAL !== 'undefined') {
                            totalsF1.push({
                                LABEL: 'Advance',
                                Perc2: F1_PERCENT_GLOBAL,
                                VENDOR: 'Advance:\n' + Ext.util.Format.number(F1_PERCENT_GLOBAL, '0.00') + '%'
                            });
                            totalsF1.push({
                                LABEL: 'Pending',
                                Perc2: 100 - F1_PERCENT_GLOBAL,
                                VENDOR: 'Pending:\n' + Ext.util.Format.number(100 - F1_PERCENT_GLOBAL, '0.00') + '%'
                            });
                        }
                        var storeF1 = Ext.create('Ext.data.Store', {fields: ['LABEL', 'Perc2', 'VENDOR'], data: totalsF1});
                        Ext.getCmp(prototype.id + '-displayPolarSM').bindStore(storeF1);


                        // ==== F2 - Sales ====
                        var totalsF2 = [];
                        if (typeof F1_PERCENT_GLOBAL_F2 !== 'undefined') {
                            totalsF2.push({
                                LABEL: 'Advance',
                                Perc2: F1_PERCENT_GLOBAL_F2,
                                VENDOR: 'Advance:\n' + Ext.util.Format.number(F1_PERCENT_GLOBAL_F2, '0.00') + '%'
                            });
                            totalsF2.push({
                                LABEL: 'Pending',
                                Perc2: 100 - F1_PERCENT_GLOBAL_F2,
                                VENDOR: 'Pending:\n' + Ext.util.Format.number(100 - F1_PERCENT_GLOBAL_F2, '0.00') + '%'
                            });
                        }
                        var storeF2 = Ext.create('Ext.data.Store', {fields: ['LABEL', 'Perc2', 'VENDOR'], data: totalsF2});
                        Ext.getCmp(prototype.id + '-displayPolarF2').bindStore(storeF2);

                        // ==== Accounted ====
                        var totalsF3 = [];
                        if (typeof F1_PERCENT_GLOBAL_F3 !== 'undefined') {
                            totalsF3.push({
                                LABEL: 'Advance',
                                Perc2: F1_PERCENT_GLOBAL_F3,
                                VENDOR: 'Advance:\n' + Ext.util.Format.number(F1_PERCENT_GLOBAL_F3, '0.00') + '%'
                            });
                            totalsF3.push({
                                LABEL: 'Pending',
                                Perc2: 100 - F1_PERCENT_GLOBAL_F3,
                                VENDOR: 'Pending:\n' + Ext.util.Format.number(100 - F1_PERCENT_GLOBAL_F3, '0.00') + '%'
                            });
                        }
                        var storeF3 = Ext.create('Ext.data.Store', {fields: ['LABEL', 'Perc2', 'VENDOR'], data: totalsF3});
                        Ext.getCmp(prototype.id + '-displayPolarF3').bindStore(storeF3);


                        console.log({
                            F1_TOTAL_GLOBAL,
                            F1_TOTAL_STVAL3_GLOBAL,
                            F1_TOTAL_STVAL1_GLOBAL,
                            F1_PERCENT_GLOBAL
                        }, 'totales globales');


                        return;
                        var data = lastRecord;
                        console.log(lastRecord, 'datadata');
                        console.log(obj, 'objobj');

                        return;

                        let item = {};
                        let item2 = {};
                        let item3 = {};
                        let item4 = {};
                        let item5 = {};
                        let totals = [];
                        let totalCantidad = lastRecord.QTY_TOTAL_REFUND +
                                lastRecord.QTY_TOTAL_CHGBACK +
                                lastRecord.QTY_TOTAL_REVERSE_CHGBACK +
                                lastRecord.QTY_TOTAL_ACRED +
                                lastRecord.QTY_TOTAL_PENDING;

                        let refundMatch = (lastRecord.QTY_TOTAL_REFUND / totalCantidad) * 100;
                        let chgbkMatch = (lastRecord.QTY_TOTAL_CHGBACK / totalCantidad) * 100;
                        let reverseChgbkMatch = (lastRecord.QTY_TOTAL_REVERSE_CHGBACK / totalCantidad) * 100;
                        let acreditMatch = (lastRecord.QTY_TOTAL_ACRED / totalCantidad) * 100;
                        let othersPend = (lastRecord.QTY_TOTAL_PENDING / totalCantidad) * 100;

                        if (obj.data.items.length > 0) {
                            totals.push({
                                LABEL: 'Refund',
                                Perc2: lastRecord.QTY_TOTAL_REFUND,
                                VENDOR: 'Refund:\n' + Ext.util.Format.number(refundMatch, '0.00%')
                            });

                            totals.push({
                                LABEL: 'Pending',
                                Perc2: lastRecord.QTY_TOTAL_PENDING,
                                VENDOR: 'Pending:\n' + Ext.util.Format.number(othersPend, '0.00%')
                            });
                            totals.push({
                                LABEL: 'Chgback',
                                Perc2: lastRecord.QTY_TOTAL_CHGBACK,
                                VENDOR: 'Chgback:\n' + Ext.util.Format.number(chgbkMatch, '0.00%')
                            });
                            totals.push({
                                LABEL: 'Acredit',
                                Perc2: lastRecord.QTY_TOTAL_ACRED,
                                VENDOR: 'Acredit:\n' + Ext.util.Format.number(acreditMatch, '0.00%')
                            });
                            totals.push({
                                LABEL: 'Chgback Reverse',
                                Perc2: lastRecord.QTY_TOTAL_REVERSE_CHGBACK,
                                VENDOR: 'Chgback Reverse:\n' + Ext.util.Format.number(reverseChgbkMatch, '0.00%')
                            });
                        }

                        var storeData1er = Ext.create('Ext.data.Store', {
                            data: totals,
                            autoLoad: true
                        });

                        Ext.getCmp(prototype.id + '-displayPolarSM').bindStore(storeData1er);
                        //Ext.getCmp(prototype.id + '-lblTittlePaidSumaryMain').setText('Totals Debits: ' + Ext.util.Format.number(totalCantidad, '0,000'));

                        let dataBar = [
                            {
                                category: 'Refund',
                                USD: lastRecord.AMOUNT_TOTAL_REFUND_USD,
                                SEND: lastRecord.AMOUNT_TOTAL_REFUND_SEND,
                                SAP: lastRecord.AMOUNT_TOTAL_REFUND_SAP
                            },
                            {
                                category: 'Chargeback',
                                USD: lastRecord.AMOUNT_TOTAL_CHGBACK_USD,
                                SEND: lastRecord.AMOUNT_TOTAL_CHGBACK_SEND,
                                SAP: lastRecord.AMOUNT_TOTAL_CHGBACK_SAP
                            },
                            {
                                category: 'Reverse ChgBck',
                                USD: lastRecord.AMOUNT_TOTAL_REVERSE_CHGBACK_USD,
                                SEND: lastRecord.AMOUNT_TOTAL_REVERSE_CHGBACK_SEND,
                                SAP: lastRecord.AMOUNT_TOTAL_REVERSE_CHGBACK_SAP
                            },
                            {
                                category: 'Acreditaciones',
                                USD: lastRecord.AMOUNT_TOTAL_ACRED_USD,
                                SEND: lastRecord.AMOUNT_TOTAL_ACRED_SEND,
                                SAP: lastRecord.AMOUNT_TOTAL_ACRED_SAP
                            },
                            {
                                category: 'Pending',
                                USD: lastRecord.AMOUNT_TOTAL_PENDING_USD,
                                SEND: lastRecord.AMOUNT_TOTAL_PENDING_SEND,
                                SAP: lastRecord.AMOUNT_TOTAL_PENDING_SAP
                            }
                        ];

                        let chart = Ext.getCmp(prototype.id + '-displayBarSM');
                        chart.setStore({
                            fields: ['category', 'USD', 'SEND', 'SAP'],
                            data: dataBar
                        });

                        chart.getSeries()[0].setTitle(['Amount USD', 'Amount SEND', 'Amount SAP']);

                    }
                }
            }
        });
        global.clear();
        this.getPaggin();

        var storeGridDatasPending = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchSumaryMainPendingGraf'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    if (obj.data.length === 0)
                        return;

                    let lstData = obj.data.items.map(v => v.data);
                    let dataRoot = {text: '.', expanded: true, children: []};

                    Ext.Array.each(lstData, function (value) {

                        let descError = value.DESCRIPTION_CERROR;

                        // 🔹 VALIDACIÓN: código vacío
                        if ((!value.CERROR || value.CERROR.trim() === '') &&
                                (!descError || descError.trim() === '')) {
                            descError = 'PENDIENTES SIN COMENTARIO';
                        }

                        dataRoot.children.push({
                            CERROR: value.CERROR,
                            DESCRIPTION_CERROR: descError,
                            QUANTITY: value.QUANTITY,
                            leaf: true
                        });
                    });

                    console.log(dataRoot, 'dataRoot');

                    let storeTree = Ext.create('Ext.data.TreeStore', {root: dataRoot});

                    // ------------------ GRÁFICO ------------------
                    let chartData = [];
                    let totalPending = 0;
                    let totalCerradoAV = 0;

                    Ext.Array.each(lstData, function (v) {

                        let qty = v.QUANTITY || 0;
                        let cerror = v.CERROR || '';
                        let descError = v.DESCRIPTION_CERROR;

                        // 🔹 MISMA VALIDACIÓN PARA DESCRIPCIÓN
                        if (cerror.trim() === '' &&
                                (!descError || descError.trim() === '')) {
                            descError = 'PENDIENTES SIN COMENTARIO';
                        }

                        chartData.push({
                            strDescription: descError,
                            QUANTITY_OF_DEPOSITS: qty
                        });

                        // 🔹 TOTALES
                        if (cerror === '07') {
                            totalCerradoAV += qty;           // solo 07
                        } else {
                            totalPending += qty;             // todo menos 07
                        }
                    });

                    if (chartData.length === 0) {
                        chartData.push({strDescription: 'Not found', QUANTITY_OF_DEPOSITS: 1});
                    }

                    console.log(chartData, 'chartData');

                    let storeGraf3 = Ext.create('Ext.data.Store', {data: chartData});

                    let chart = Ext.getCmp(prototype.id + '-displayF1');

                    // ------------------ TÍTULO ------------------
                    chart.setCaptions({
                        title: {
                            alignTo: 'chart',
                            text:
                                    'Pending (Total: ' +
                                    Ext.util.Format.number(totalPending, '0,000') +
                                    ') - Cerrado por AV (Total: ' +
                                    Ext.util.Format.number(totalCerradoAV, '0,000') +
                                    ')',
                            fontSize: 22,
                            color: '#333',
                            fontWeight: 'bold'
                        }
                    });

                    chart.bindStore(storeGraf3);
                }

            }
        });

    },
    setGridDataDashboardCash: function () {
        win.lblUser_toolTip("Estructura: MPF102");
        me.panelActual = '-panelGridSumaryMainCash';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchSumaryMainCash'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {

                        let lstData = [];
                        for (let value of obj.data.items) {
                            lstData.push(value.data);
                        }

                        // Totales generales
                        let F1_TOTAL_GLOBAL = 0;
                        let F1_TOTAL_STVAL3_GLOBAL = 0;
                        let F1_TOTAL_STVAL1_GLOBAL = 0;
                        let F1_TOTAL_TAXES_GLOBAL = 0;
                        let F1_TOTAL_ERROR_GLOBAL = 0;
                        let F1_TOTAL_PENDING_TO_F2_GLOBAL = 0;

                        let F2_F1_TOTAL_COMPLETED_GLOBAL = 0;
                        let F2_TOTAL_PENDING_OVER50_GLOBAL = 0;
                        let F2_TOTAL_MATCH_OVER50_GLOBAL = 0;

                        let F3_F2_TOTAL_COMPLETED_GLOBAL = 0;
                        let F3_TOTAL_WO_ACC_GLOBAL = 0;
                        let F3_TOTAL_COMPLETED_GLOBAL = 0;
                        let F3_TOTAL_PENDING_SENT_GLOBAL = 0;
                        let F3_TOTAL_COMPLETED_SAP_GLOBAL = 0;
                        let F3_TOTAL_ERROR_GLOBAL = 0;

                        let a = [];
                        let dataRoot = {text: '.', expanded: false, children: []};

                        Ext.Object.each(lstData, function (index, value) {
                            if (a.indexOf(value.strFormatDate) < 0) {
                                let V_F1_TOTAL = 0;
                                let V_F1_TOTAL_STVAL3 = 0;
                                let V_F1_TOTAL_STVAL1 = 0;
                                let V_F1_TOTAL_TAXES = 0;
                                let V_F1_TOTAL_ERROR = 0;
                                let V_F1_PERCENT = 0;
                                let V_F1_PENDING_TO_F2 = 0;

                                let V_F2_F1_TOTAL_COMPLETED = 0;
                                let V_F2_TOTAL_PENDING_OVER50 = 0;
                                let V_F2_TOTAL_MATCH_OVER50 = 0;
                                let V_F2_PERCENT = 0;

                                let V_F3_F2_TOTAL_COMPLETED = 0;
                                let V_F3_TOTAL_WO_ACC = 0;
                                let V_F3_TOTAL_COMPLETED = 0;
                                let V_F3_TOTAL_PENDING_SENT = 0;
                                let V_F3_PERCENT = 0;
                                let V_F3_TOTAL_COMPLETED_SAP = 0;
                                let V_F3_TOTAL_ERROR = 0;

                                // Agrupar por mes
                                Ext.Object.each(lstData, function (index, valuex) {
                                    if (value.strFormatDate === valuex.strFormatDate) {
                                        V_F1_TOTAL += valuex.F1_TOTAL;
                                        V_F1_TOTAL_STVAL3 += valuex.F1_TOTAL_STVAL3;
                                        V_F1_TOTAL_STVAL1 += valuex.F1_TOTAL_STVAL1;
                                        V_F1_TOTAL_TAXES += valuex.F1_TOTAL_TAXES;
                                        V_F1_TOTAL_ERROR += valuex.F1_TOTAL_ERROR;
                                        V_F1_PENDING_TO_F2 += valuex.F1_TOTAL_PENDING_TO_F2;

                                        V_F2_F1_TOTAL_COMPLETED += valuex.F2_F1_TOTAL_COMPLETED;
                                        V_F2_TOTAL_PENDING_OVER50 += valuex.F2_TOTAL_PENDING_OVER50;
                                        V_F2_TOTAL_MATCH_OVER50 += valuex.F2_TOTAL_MATCH_OVER50;

                                        V_F3_F2_TOTAL_COMPLETED += valuex.F3_F2_TOTAL_COMPLETED;
                                        V_F3_TOTAL_WO_ACC += valuex.F3_TOTAL_WO_ACC;
                                        V_F3_TOTAL_COMPLETED += valuex.F3_TOTAL_COMPLETED;
                                        V_F3_TOTAL_PENDING_SENT += valuex.F3_TOTAL_PENDING_SENT;
                                        V_F3_TOTAL_COMPLETED_SAP += valuex.F3_TOTAL_COMPLETED_SAP;
                                        V_F3_TOTAL_ERROR += valuex.F3_TOTAL_ERROR;
                                    }
                                });

                                // Calcular porcentaje por mes
                                if (V_F1_TOTAL > 0) {
                                    V_F1_PERCENT = (V_F1_TOTAL_STVAL1 * 100) / V_F1_TOTAL;
                                }

                                if (V_F2_F1_TOTAL_COMPLETED > 0) {
                                    V_F2_PERCENT = (V_F2_TOTAL_MATCH_OVER50 * 100) / V_F2_F1_TOTAL_COMPLETED;
                                }

                                if (V_F3_F2_TOTAL_COMPLETED > 0) {
                                    V_F3_PERCENT = (V_F3_TOTAL_COMPLETED * 100) / V_F3_F2_TOTAL_COMPLETED;
                                }

                                // Agregar al árbol
                                a.push(value.strFormatDate);
                                dataRoot.children.push({
                                    strFormatDate: value.strFormatDate,
                                    VALDATE: value.VALDATE,
                                    F1_TOTAL: V_F1_TOTAL,
                                    F1_TOTAL_STVAL3: V_F1_TOTAL_STVAL3,
                                    F1_TOTAL_STVAL1: V_F1_TOTAL_STVAL1,
                                    F1_TOTAL_TAXES: V_F1_TOTAL_TAXES,
                                    F1_TOTAL_ERROR: V_F1_TOTAL_ERROR,
                                    F1_TOTAL_PENDING_TO_F2: V_F1_PENDING_TO_F2,
                                    F1_PERCENT: V_F1_PERCENT.toFixed(2) + '%',

                                    F2_F1_TOTAL_COMPLETED: V_F2_F1_TOTAL_COMPLETED,
                                    F2_TOTAL_PENDING_OVER50: V_F2_TOTAL_PENDING_OVER50,
                                    F2_TOTAL_MATCH_OVER50: V_F2_TOTAL_MATCH_OVER50,
                                    F2_PERCENT: V_F2_PERCENT.toFixed(2) + '%',

                                    F3_F2_TOTAL_COMPLETED: V_F3_F2_TOTAL_COMPLETED,
                                    F3_TOTAL_WO_ACC: V_F3_TOTAL_WO_ACC,
                                    F3_TOTAL_COMPLETED: V_F3_TOTAL_COMPLETED,
                                    F3_TOTAL_PENDING_SENT: V_F3_TOTAL_PENDING_SENT,
                                    F3_TOTAL_COMPLETED_SAP: V_F3_TOTAL_COMPLETED_SAP,
                                    F3_PERCENT: V_F3_PERCENT.toFixed(2) + '%',
                                    F3_TOTAL_ERROR: V_F3_TOTAL_ERROR,

                                    expanded: false,
                                    children: []
                                });

                                // Agregar las filas hijas
                                Ext.Object.each(lstData, function (index, value01) {
                                    if (value.strFormatDate === value01.strFormatDate) {
                                        let V_CHILD_PERCENT = 0;
                                        let V_CHILD_PERCENT_F2 = 0;
                                        let V_CHILD_PERCENT_F3 = 0;

                                        if (value01.F1_TOTAL > 0) {
                                            V_CHILD_PERCENT = (value01.F1_TOTAL_STVAL1 * 100) / value01.F1_TOTAL;
                                        }

                                        if (value01.F2_F1_TOTAL_COMPLETED > 0) {
                                            V_CHILD_PERCENT_F2 = (value01.F2_TOTAL_MATCH_OVER50 * 100) / value01.F2_F1_TOTAL_COMPLETED;
                                        }

                                        if (value01.F3_F2_TOTAL_COMPLETED > 0) {
                                            V_CHILD_PERCENT_F3 = (value01.F3_TOTAL_COMPLETED * 100) / value01.F3_F2_TOTAL_COMPLETED;
                                        }

                                        dataRoot.children[a.indexOf(value.strFormatDate)].children.push({
                                            strFormatDate: value01.strFormatDate,
                                            VALDATE: value01.VALDATE,
                                            CCUST: value01.CCUST,
                                            F1_TOTAL: value01.F1_TOTAL,
                                            F1_TOTAL_STVAL3: value01.F1_TOTAL_STVAL3,
                                            F1_TOTAL_STVAL1: value01.F1_TOTAL_STVAL1,
                                            F1_TOTAL_TAXES: value01.F1_TOTAL_TAXES,
                                            F1_TOTAL_ERROR: value01.F1_TOTAL_ERROR,
                                            F1_TOTAL_PENDING_TO_F2: value01.F1_TOTAL_PENDING_TO_F2,
                                            F1_PERCENT: V_CHILD_PERCENT.toFixed(2) + '%',

                                            F2_F1_TOTAL_COMPLETED: value01.F2_F1_TOTAL_COMPLETED,
                                            F2_TOTAL_PENDING_OVER50: value01.F2_TOTAL_PENDING_OVER50,
                                            F2_TOTAL_MATCH_OVER50: value01.F2_TOTAL_MATCH_OVER50,
                                            F2_PERCENT: V_CHILD_PERCENT_F2.toFixed(2) + '%',

                                            F3_F2_TOTAL_COMPLETED: value01.F3_F2_TOTAL_COMPLETED,
                                            F3_TOTAL_WO_ACC: value01.F3_TOTAL_WO_ACC,
                                            F3_TOTAL_COMPLETED: value01.F3_TOTAL_COMPLETED,
                                            F3_TOTAL_PENDING_SENT: value01.F3_TOTAL_PENDING_SENT,
                                            F3_TOTAL_COMPLETED_SAP: value01.F3_TOTAL_COMPLETED_SAP,
                                            F3_TOTAL_ERROR: value01.F3_TOTAL_ERROR,
                                            F3_PERCENT: V_CHILD_PERCENT_F3.toFixed(2) + '%',

                                            leaf: true
                                        });
                                    }
                                });

                                // Acumular global
                                F1_TOTAL_GLOBAL += V_F1_TOTAL;
                                F1_TOTAL_STVAL3_GLOBAL += V_F1_TOTAL_STVAL3;
                                F1_TOTAL_STVAL1_GLOBAL += V_F1_TOTAL_STVAL1;
                                F1_TOTAL_TAXES_GLOBAL += V_F1_TOTAL_TAXES;
                                F1_TOTAL_ERROR_GLOBAL += V_F1_TOTAL_ERROR;
                                F1_TOTAL_PENDING_TO_F2_GLOBAL += V_F1_PENDING_TO_F2;

                                F2_F1_TOTAL_COMPLETED_GLOBAL += V_F2_F1_TOTAL_COMPLETED;
                                F2_TOTAL_PENDING_OVER50_GLOBAL += V_F2_TOTAL_PENDING_OVER50;
                                F2_TOTAL_MATCH_OVER50_GLOBAL += V_F2_TOTAL_MATCH_OVER50;

                                F3_F2_TOTAL_COMPLETED_GLOBAL += V_F3_F2_TOTAL_COMPLETED;
                                F3_TOTAL_WO_ACC_GLOBAL += V_F3_TOTAL_WO_ACC;
                                F3_TOTAL_COMPLETED_GLOBAL += V_F3_TOTAL_COMPLETED;
                                F3_TOTAL_PENDING_SENT_GLOBAL += V_F3_TOTAL_PENDING_SENT;
                                F3_TOTAL_COMPLETED_SAP_GLOBAL += V_F3_TOTAL_COMPLETED_SAP;
                                F3_TOTAL_ERROR_GLOBAL += V_F3_TOTAL_ERROR;
                            }
                        });

                        // Calcular porcentaje global
                        let F1_PERCENT_GLOBAL = 0;
                        if (F1_TOTAL_GLOBAL > 0) {
                            F1_PERCENT_GLOBAL = (F1_TOTAL_STVAL1_GLOBAL * 100) / F1_TOTAL_GLOBAL;
                        }

                        let F1_PERCENT_GLOBAL_F2 = 0;
                        if (F2_F1_TOTAL_COMPLETED_GLOBAL > 0) {
                            F1_PERCENT_GLOBAL_F2 = (F2_TOTAL_MATCH_OVER50_GLOBAL * 100) / F2_F1_TOTAL_COMPLETED_GLOBAL;
                        }

                        let F1_PERCENT_GLOBAL_F3 = 0;
                        if (F3_F2_TOTAL_COMPLETED_GLOBAL > 0) {
                            F1_PERCENT_GLOBAL_F3 = (F3_TOTAL_COMPLETED_GLOBAL * 100) / F3_F2_TOTAL_COMPLETED_GLOBAL;
                        }

                        // Crear el store
                        var storeTree = Ext.create('Ext.data.TreeStore', {
                            root: dataRoot
                        });

                        Ext.getCmp(prototype.id + '-gridSumaryMainCash').setStore(storeTree);

                        Ext.getCmp(prototype.id + '-F1_TOTAL_GLOBALCASH').setText(Ext.util.Format.number(F1_TOTAL_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F1_TOTAL_STVAL3_GLOBALCASH').setText(Ext.util.Format.number(F1_TOTAL_STVAL3_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F1_TOTAL_STVAL1_GLOBALCASH').setText(Ext.util.Format.number(F1_TOTAL_STVAL1_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F1_TOTAL_TAXES_GLOBALCASH').setText(Ext.util.Format.number(F1_TOTAL_TAXES_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F1_TOTAL_ERROR_GLOBALCASH').setText(Ext.util.Format.number(F1_TOTAL_ERROR_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F1_PERCENT_GLOBALCASH').setText(F1_PERCENT_GLOBAL.toFixed(2) + '%');
                        Ext.getCmp(prototype.id + '-F1_TOTAL_PENDING_TO_F2_GLOBALCASH').setText(Ext.util.Format.number(F1_TOTAL_PENDING_TO_F2_GLOBAL, '0,000'));

                        Ext.getCmp(prototype.id + '-F2_TOTAL_GLOBALCASH').setText(Ext.util.Format.number(F2_F1_TOTAL_COMPLETED_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F2_TOTAL_STVAL3_GLOBALCASH').setText(Ext.util.Format.number(F2_TOTAL_PENDING_OVER50_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F2_TOTAL_STVAL1_GLOBALCASH').setText(Ext.util.Format.number(F2_TOTAL_MATCH_OVER50_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-F2_PERCENT_GLOBALCASH').setText(F1_PERCENT_GLOBAL_F2.toFixed(2) + '%');
                        Ext.getCmp(prototype.id + '-SENT_TOTAL_SENT_GLOBAL').setText(Ext.util.Format.number(F3_TOTAL_PENDING_SENT_GLOBAL, '0,000'));


                        Ext.getCmp(prototype.id + '-SENT_TOTAL_GLOBAL').setText(Ext.util.Format.number(F3_F2_TOTAL_COMPLETED_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-SENT_TOTAL_STVAL3_GLOBAL').setText(Ext.util.Format.number(F3_TOTAL_WO_ACC_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-SENT_TOTAL_STVAL1_GLOBAL').setText(Ext.util.Format.number(F3_TOTAL_COMPLETED_GLOBAL, '0,000'));

                        Ext.getCmp(prototype.id + '-SAP_TOTAL_STVAL1_GLOBAL').setText(Ext.util.Format.number(F3_TOTAL_COMPLETED_SAP_GLOBAL, '0,000'));
                        Ext.getCmp(prototype.id + '-SENT_PERCENT_GLOBALCASH').setText(F1_PERCENT_GLOBAL_F3.toFixed(2) + '%');
                        Ext.getCmp(prototype.id + '-RETURN_ERROR_GLOBALCASH').setText(Ext.util.Format.number(F3_TOTAL_ERROR_GLOBAL, '0,000'));

                        // ==== F1 - Settlement ====
                        var totalsF1 = [];
                        if (typeof F1_PERCENT_GLOBAL !== 'undefined') {
                            totalsF1.push({
                                LABEL: 'Advance',
                                Perc2: F1_PERCENT_GLOBAL,
                                VENDOR: 'Advance:\n' + Ext.util.Format.number(F1_PERCENT_GLOBAL, '0.00') + '%'
                            });
                            totalsF1.push({
                                LABEL: 'Pending',
                                Perc2: 100 - F1_PERCENT_GLOBAL,
                                VENDOR: 'Pending:\n' + Ext.util.Format.number(100 - F1_PERCENT_GLOBAL, '0.00') + '%'
                            });
                        }
                        var storeF1 = Ext.create('Ext.data.Store', {fields: ['LABEL', 'Perc2', 'VENDOR'], data: totalsF1});
                        Ext.getCmp(prototype.id + '-displayPolarSMCASH').bindStore(storeF1);


                        // ==== F2 - Sales ====
                        var totalsF2 = [];
                        if (typeof F1_PERCENT_GLOBAL_F2 !== 'undefined') {
                            totalsF2.push({
                                LABEL: 'Advance',
                                Perc2: F1_PERCENT_GLOBAL_F2,
                                VENDOR: 'Advance:\n' + Ext.util.Format.number(F1_PERCENT_GLOBAL_F2, '0.00') + '%'
                            });
                            totalsF2.push({
                                LABEL: 'Pending',
                                Perc2: 100 - F1_PERCENT_GLOBAL_F2,
                                VENDOR: 'Pending:\n' + Ext.util.Format.number(100 - F1_PERCENT_GLOBAL_F2, '0.00') + '%'
                            });
                        }
                        var storeF2 = Ext.create('Ext.data.Store', {fields: ['LABEL', 'Perc2', 'VENDOR'], data: totalsF2});
                        Ext.getCmp(prototype.id + '-displayPolarF2CASH').bindStore(storeF2);

                        // ==== Accounted ====
                        var totalsF3 = [];
                        if (typeof F1_PERCENT_GLOBAL_F3 !== 'undefined') {
                            totalsF3.push({
                                LABEL: 'Advance',
                                Perc2: F1_PERCENT_GLOBAL_F3,
                                VENDOR: 'Advance:\n' + Ext.util.Format.number(F1_PERCENT_GLOBAL_F3, '0.00') + '%'
                            });
                            totalsF3.push({
                                LABEL: 'Pending',
                                Perc2: 100 - F1_PERCENT_GLOBAL_F3,
                                VENDOR: 'Pending:\n' + Ext.util.Format.number(100 - F1_PERCENT_GLOBAL_F3, '0.00') + '%'
                            });
                        }
                        var storeF3 = Ext.create('Ext.data.Store', {fields: ['LABEL', 'Perc2', 'VENDOR'], data: totalsF3});
                        Ext.getCmp(prototype.id + '-displayPolarF3CASH').bindStore(storeF3);


                        console.log({
                            F1_TOTAL_GLOBAL,
                            F1_TOTAL_STVAL3_GLOBAL,
                            F1_TOTAL_STVAL1_GLOBAL,
                            F1_PERCENT_GLOBAL
                        }, 'totales globales');


                        return;
                        var data = lastRecord;
                        console.log(lastRecord, 'datadata');
                        console.log(obj, 'objobj');

                        return;

                        let item = {};
                        let item2 = {};
                        let item3 = {};
                        let item4 = {};
                        let item5 = {};
                        let totals = [];
                        let totalCantidad = lastRecord.QTY_TOTAL_REFUND +
                                lastRecord.QTY_TOTAL_CHGBACK +
                                lastRecord.QTY_TOTAL_REVERSE_CHGBACK +
                                lastRecord.QTY_TOTAL_ACRED +
                                lastRecord.QTY_TOTAL_PENDING;

                        let refundMatch = (lastRecord.QTY_TOTAL_REFUND / totalCantidad) * 100;
                        let chgbkMatch = (lastRecord.QTY_TOTAL_CHGBACK / totalCantidad) * 100;
                        let reverseChgbkMatch = (lastRecord.QTY_TOTAL_REVERSE_CHGBACK / totalCantidad) * 100;
                        let acreditMatch = (lastRecord.QTY_TOTAL_ACRED / totalCantidad) * 100;
                        let othersPend = (lastRecord.QTY_TOTAL_PENDING / totalCantidad) * 100;

                        if (obj.data.items.length > 0) {
                            totals.push({
                                LABEL: 'Refund',
                                Perc2: lastRecord.QTY_TOTAL_REFUND,
                                VENDOR: 'Refund:\n' + Ext.util.Format.number(refundMatch, '0.00%')
                            });

                            totals.push({
                                LABEL: 'Pending',
                                Perc2: lastRecord.QTY_TOTAL_PENDING,
                                VENDOR: 'Pending:\n' + Ext.util.Format.number(othersPend, '0.00%')
                            });
                            totals.push({
                                LABEL: 'Chgback',
                                Perc2: lastRecord.QTY_TOTAL_CHGBACK,
                                VENDOR: 'Chgback:\n' + Ext.util.Format.number(chgbkMatch, '0.00%')
                            });
                            totals.push({
                                LABEL: 'Acredit',
                                Perc2: lastRecord.QTY_TOTAL_ACRED,
                                VENDOR: 'Acredit:\n' + Ext.util.Format.number(acreditMatch, '0.00%')
                            });
                            totals.push({
                                LABEL: 'Chgback Reverse',
                                Perc2: lastRecord.QTY_TOTAL_REVERSE_CHGBACK,
                                VENDOR: 'Chgback Reverse:\n' + Ext.util.Format.number(reverseChgbkMatch, '0.00%')
                            });
                        }

                        var storeData1er = Ext.create('Ext.data.Store', {
                            data: totals,
                            autoLoad: true
                        });

                        Ext.getCmp(prototype.id + '-displayPolarSM').bindStore(storeData1er);
                        //Ext.getCmp(prototype.id + '-lblTittlePaidSumaryMain').setText('Totals Debits: ' + Ext.util.Format.number(totalCantidad, '0,000'));

                        let dataBar = [
                            {
                                category: 'Refund',
                                USD: lastRecord.AMOUNT_TOTAL_REFUND_USD,
                                SEND: lastRecord.AMOUNT_TOTAL_REFUND_SEND,
                                SAP: lastRecord.AMOUNT_TOTAL_REFUND_SAP
                            },
                            {
                                category: 'Chargeback',
                                USD: lastRecord.AMOUNT_TOTAL_CHGBACK_USD,
                                SEND: lastRecord.AMOUNT_TOTAL_CHGBACK_SEND,
                                SAP: lastRecord.AMOUNT_TOTAL_CHGBACK_SAP
                            },
                            {
                                category: 'Reverse ChgBck',
                                USD: lastRecord.AMOUNT_TOTAL_REVERSE_CHGBACK_USD,
                                SEND: lastRecord.AMOUNT_TOTAL_REVERSE_CHGBACK_SEND,
                                SAP: lastRecord.AMOUNT_TOTAL_REVERSE_CHGBACK_SAP
                            },
                            {
                                category: 'Acreditaciones',
                                USD: lastRecord.AMOUNT_TOTAL_ACRED_USD,
                                SEND: lastRecord.AMOUNT_TOTAL_ACRED_SEND,
                                SAP: lastRecord.AMOUNT_TOTAL_ACRED_SAP
                            },
                            {
                                category: 'Pending',
                                USD: lastRecord.AMOUNT_TOTAL_PENDING_USD,
                                SEND: lastRecord.AMOUNT_TOTAL_PENDING_SEND,
                                SAP: lastRecord.AMOUNT_TOTAL_PENDING_SAP
                            }
                        ];

                        let chart = Ext.getCmp(prototype.id + '-displayBarSM');
                        chart.setStore({
                            fields: ['category', 'USD', 'SEND', 'SAP'],
                            data: dataBar
                        });

                        chart.getSeries()[0].setTitle(['Amount USD', 'Amount SEND', 'Amount SAP']);

                    }
                }
            }
        });
        global.clear();
        this.getPaggin();

        var storeGridDatasPending = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchSumaryMainPendingGraf'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    if (obj.data.length === 0)
                        return;

                    let lstData = obj.data.items.map(v => v.data);
                    let dataRoot = {text: '.', expanded: true, children: []};

                    Ext.Array.each(lstData, function (value) {
                        dataRoot.children.push({
                            CERROR: value.CERROR,
                            DESCRIPTION_CERROR: value.DESCRIPTION_CERROR,
                            F1_TOTAL_STVAL3: value.F1_TOTAL_STVAL3,
                            F2_TOTAL_PENDING_OVER50: value.F2_TOTAL_PENDING_OVER50,
                            F3_TOTAL_PENDING_SENT: value.F3_TOTAL_PENDING_SENT,
                            leaf: true
                        });
                    });

                    let storeTree = Ext.create('Ext.data.TreeStore', {root: dataRoot});

                    // gráfico
                    let chartData = lstData.map(v => ({
                            strDescription: v.DESCRIPTION_CERROR,
                            QUANTITY_OF_DEPOSITS: v.F1_TOTAL_STVAL3
                        }));

                    if (chartData.length === 0) {
                        chartData.push({strDescription: 'Not found', QUANTITY: 1});
                    }

                    console.log(chartData, 'chartData')

                    let storeGraf3 = Ext.create('Ext.data.Store', {data: chartData});
                    Ext.getCmp(prototype.id + '-displayF1').bindStore(storeGraf3);
                }

            }
        });

    },
    checkAndProceed: function (cantidad, label) {
        console.log(cantidad, label,'cantidad, label')
        if ((cantidad || 0) < 1) {
            Ext.Msg.alert('No Detail Available', `There are no ${label} records to display.`);
            return false;
        }
        console.log(`Proceeding to ${label} detail with count:`, cantidad);
        return true;
    },
    onClickDetailAvianca: function (IN_FLAG, cmp, cpm2, numRow, numCol, cpm3, rowData) {
        const me = this;
        const data = rowData?.data || {};
        const esPadre = !data.CCUST;

        me.paramsDetail = {};
        me.paramsDetail.IN_CCUST = esPadre ? "" : data.CCUST;
        me.paramsDetail.IN_DATE = data.VALDATE;
        me.paramsDetail.IN_BANDOC = Ext.getCmp(prototype.id + '-txtBANDOC').getValue();
        me.paramsDetail.IN_REFER = Ext.getCmp(prototype.id + '-txtREFER').getValue();
        me.paramsDetail.IN_CODPRO = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        me.paramsDetail.IN_IDCONT = Ext.getCmp(prototype.id + '-txtIDCONT').getValue();
        me.paramsDetail.IN_HEADER = Ext.getCmp(prototype.id + '-txtHeaderText').getValue();
        me.paramsDetail.IN_PROVISION = Ext.getCmp(prototype.id + '-txtAccprov').getValue();
        me.paramsDetail.IN_CODEERROR = Ext.getCmp(prototype.id + '-cmbCodeError').getValue();
//        me.paramsDetail.IN_CODPRO = "CO";

        console.log(data, 'data')
        console.log("IN_CCUST:", me.paramsDetail.IN_CCUST);
        
        console.log(IN_FLAG,'IN_FLAG')

        switch (IN_FLAG) {
            case "IN_WSETT":
            {
                const cantidad = data.F1_TOTAL_STVAL3;
                if (!me.checkAndProceed(cantidad, 'liquidation'))
                    return;

                me.paramsDetail = {
                    ...me.paramsDetail,
                    IN_WSETT: "1",
                    IN_TAXES: "",
                    IN_ERROR: "",
                    IN_PENDING_F2: "",
                    IN_WSALES: "",
                    IN_PENDING_ACC: "",
                    IN_PENDING_SENT: "",
                    IN_SENT: "",
                    IN_RETURN_ERROR: ""
                };
                break;
            }

            case "IN_TAXES":
            {
                const cantidad = data.F1_TOTAL_TAXES;
                if (!me.checkAndProceed(cantidad, 'tax'))
                    return;

                me.paramsDetail = {
                    ...me.paramsDetail,
                    IN_WSETT: "",
                    IN_TAXES: "1",
                    IN_ERROR: "",
                    IN_PENDING_F2: "",
                    IN_WSALES: "",
                    IN_PENDING_ACC: "",
                    IN_PENDING_SENT: "",
                    IN_SENT: "",
                    IN_RETURN_ERROR: ""
                };
                break;
            }

            case "IN_ERROR":
            {
                const cantidad = data.F1_TOTAL_ERROR;
                if (!me.checkAndProceed(cantidad, 'error'))
                    return;
                me.paramsDetail = {
                    ...me.paramsDetail,
                    IN_WSETT: "",
                    IN_TAXES: "",
                    IN_ERROR: "1",
                    IN_PENDING_F2: "",
                    IN_WSALES: "",
                    IN_PENDING_ACC: "",
                    IN_PENDING_SENT: "",
                    IN_SENT: "",
                    IN_RETURN_ERROR: ""
                };
                break;
            }

            case "IN_PENDING_F2":
            {
                const cantidad = data.F1_TOTAL_PENDING_TO_F2;
                if (!me.checkAndProceed(cantidad, 'pending F2'))
                    return;
                me.paramsDetail = {
                    ...me.paramsDetail,
                    IN_WSETT: "",
                    IN_TAXES: "",
                    IN_ERROR: "",
                    IN_PENDING_F2: "1",
                    IN_WSALES: "",
                    IN_PENDING_ACC: "",
                    IN_PENDING_SENT: "",
                    IN_SENT: "",
                    IN_RETURN_ERROR: ""
                };
                break;
            }

            case "IN_WSALES":
            {
                const cantidad = data.F2_TOTAL_PENDING_OVER50;
                if (!me.checkAndProceed(cantidad, 'W/O Sales'))
                    return;
                me.paramsDetail = {
                    ...me.paramsDetail,
                    IN_WSETT: "",
                    IN_TAXES: "",
                    IN_ERROR: "",
                    IN_PENDING_F2: "",
                    IN_WSALES: "1",
                    IN_PENDING_ACC: "",
                    IN_PENDING_SENT: "",
                    IN_SENT: "",
                    IN_RETURN_ERROR: ""
                };
                break;
            }

            case "IN_PENDING_ACC":
            {
                const cantidad = data.F3_TOTAL_WO_ACC;
                if (!me.checkAndProceed(cantidad, 'Pending to Accounting'))
                    return;
                me.paramsDetail = {
                    ...me.paramsDetail,
                    IN_WSETT: "",
                    IN_TAXES: "",
                    IN_ERROR: "",
                    IN_PENDING_F2: "",
                    IN_WSALES: "",
                    IN_PENDING_ACC: "1",
                    IN_PENDING_SENT: "",
                    IN_SENT: "",
                    IN_RETURN_ERROR: ""
                };
                break;
            }

            case "IN_PENDING_SENT":
            {
                const cantidad = data.F3_TOTAL_PENDING_SENT;
                if (!me.checkAndProceed(cantidad, 'Pending to Send'))
                    return;
                me.paramsDetail = {
                    ...me.paramsDetail,
                    IN_WSETT: "",
                    IN_TAXES: "",
                    IN_ERROR: "",
                    IN_PENDING_F2: "",
                    IN_WSALES: "",
                    IN_PENDING_ACC: "",
                    IN_PENDING_SENT: "1",
                    IN_SENT: "",
                    IN_RETURN_ERROR: ""
                };
                break;
            }

            case "IN_SENT":
            {
                const cantidad = data.F3_TOTAL_COMPLETED;
                console.log(data,'data')
                console.log(cantidad,'cantidad')
                if (!me.checkAndProceed(cantidad, 'Send'))
                    return;
                me.paramsDetail = {
                    ...me.paramsDetail,
                    IN_WSETT: "",
                    IN_TAXES: "",
                    IN_ERROR: "",
                    IN_PENDING_F2: "",
                    IN_WSALES: "",
                    IN_PENDING_ACC: "",
                    IN_PENDING_SENT: "",
                    IN_SENT: "1",
                    IN_RETURN_ERROR: ""
                };
                break;
            }
            
            case "IN_RETURN_ERROR":
            {
                const cantidad = data.F3_TOTAL_ERROR;
                console.log(data,'data')
                console.log(cantidad,'cantidad')
                if (!me.checkAndProceed(cantidad, 'Return Error SAP'))
                    console.log("ACACACACA")
                me.paramsDetail = {
                    ...me.paramsDetail,
                    IN_WSETT: "",
                    IN_TAXES: "",
                    IN_ERROR: "",
                    IN_PENDING_F2: "",
                    IN_WSALES: "",
                    IN_PENDING_ACC: "",
                    IN_PENDING_SENT: "",
                    IN_SENT: "",
                    IN_RETURN_ERROR: "1"
                };
                break;
            }

            default:
                Ext.Msg.alert('Invalid Option', 'This option is not recognized.');
                return;
        }
        console.log(me.paramsDetail,'me.paramsDetail')
        me.paramsDetail.beanString = JSON.stringify(me.paramsDetail);
        me.setGridDataDashboardDetail()
    },
    setGridDataDashboardDetail: function () {
        win.lblUser_toolTip("Estructura: MPF102");
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridSumaryDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        console.log("paramsDetail:", me.paramsDetail);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchSumaryMainDetail'
            }, listeners: {
                beforeload: function (obj) {
//                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
//                        Ext.getCmp(prototype.id + '-contentInfo').unmask();

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
        this.getPaggin();
        this.setWidthPie();
    },
    goURLpost: function (method, parms, columns) {

        var js_columns = JSON.stringify(columns);
        var mapForm = document.createElement("form");
        mapForm.target = "_blank";
        mapForm.method = "POST"; // or "post" if appropriate
        mapForm.action = prototype.url + '/' + method + '?dw_excel=true';
        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "beanString";
        mapInput.value = parms;
        mapForm.appendChild(mapInput);
        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "columns";
        mapInput.value = js_columns;
        mapForm.appendChild(mapInput);
        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "columns";
        mapInput.value = js_columns;
        mapForm.appendChild(mapInput);
        document.body.appendChild(mapForm);
        mapForm.submit();
    },
    searchOption: function (e, eOpts) {
        if (eOpts.getKey() !== 13)
            return false;
        this.fetchBandocSales();
    },
    onLoadClick: function () {
        var fileField = Ext.getCmp(prototype.id + '-file');
        var fileValue = fileField.getValue();

        if (!fileValue) {
            Ext.Msg.alert('Validation', 'Please select a TXT file before loading.');
            return;
        }

        var msjPregunta = 'Sure to load file?';

        Ext.MessageBox.show({
            title: 'Load Merchants',
            msg: msjPregunta,
            buttons: Ext.MessageBox.OKCANCEL,
            icon: Ext.MessageBox.WARNING,
            fn: function (btn) {
                if (btn === 'ok') {
                    me.onFileLoad();
                }
            }
        });
    },
    onFileLoad: function () {
        let beanValidation = {};
        let value = "U";
        beanValidation.OPTION = value;
        console.log(beanValidation.OPTION);
        var file = Ext.getCmp(prototype.id + '-file').getValue();
        let beanString = JSON.stringify(beanValidation);

        var form = Ext.getCmp(prototype.id + '-formMerchant').getForm();

        console.log(beanString, 'beanString')


        form.submit({
            url: prototype.url + '/setUploadInvoice',
            waitMsg: 'Uploading your file...',
            params: {fileName: file, beanString: beanString},
            success: function (f, o) {
                var res = Ext.decode(o.response.responseText);
                var msjResult = res.msjResult || 'No message returned.';
                global.Msg({msg: msjResult.replace(/\n/g, '<br>')}); // 👈 para mostrar saltos de línea
//                Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
            },
            failure: function (response) {
                console.log('server-side failure with status code ' + response.status);
            }
        });


    },
    btnAdd_click: function () {
        this.showUploadPopup();
    },
    showUploadPopup: function () {
        let win = Ext.create('Ext.window.Window', {
            title: 'Mark Reviewed',
            modal: true,
            width: 450,
            layout: 'fit',
            bodyPadding: 10,
            items: [
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-popupMerchant',
                    bodyStyle: 'background: transparent',
                    layout: 'column',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        xtype: 'textfield',
                        hidden: false,
                        selectOnFocus: true
                    },
                    items: [
                        {
                            xtype: 'form',
                            id: prototype.id + '-popupFormMerchant',
                            border: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [{
                                    xtype: 'filefield',
                                    id: prototype.id + '-popupFile',
                                    name: 'txtfile',
                                    allowBlank: true,
                                    accept: '.xlsx, .xls',
                                    labelWidth: 85,
                                    width: 300,
                                    buttonAlign: 'left',
                                    buttonText: 'Select excel...',
                                    regex: /(.)+(\.txt)$/i,
                                    regexText: 'Only TXT format is accepted',
                                    buttonConfig: {
                                        text: '<strong>Select</strong>',
                                        width: 80,
                                    }
                                }]
                        },
                        {
                            xtype: 'button',
                            margin: '1 0 0 15',
                            html: '<strong style="color:white;">Load</strong>',
                            style: 'background:#24678D;color:white;font-weight:bold;',
                            width: 100,
                            border: false,
                            handler: () => this.onLoadClickPopup()
                        }
                    ]
                }
            ]
        });

        win.show();
    },
    onLoadClickPopup: function () {
        var me = this;
        var fileField = Ext.getCmp(prototype.id + '-popupFile');
        var fileValue = fileField.getValue();

        if (!fileValue) {
            Ext.Msg.alert('Validation', 'Please select a TXT file before loading.');
            return;
        }

        Ext.MessageBox.show({
            title: 'Load Merchants',
            msg: 'Sure to load file?',
            buttons: Ext.MessageBox.OKCANCEL,
            icon: Ext.MessageBox.WARNING,
            fn: function (btn) {
                if (btn === 'ok') {
                    me.onFileLoadPopup();
                }
            }
        });
    },
    onFileLoadPopup: function () {
        let beanValidation = {OPTION: 'U'};
        let file = Ext.getCmp(prototype.id + '-popupFile').getValue();
        let form = Ext.getCmp(prototype.id + '-popupFormMerchant').getForm();

        form.submit({
            url: prototype.url + '/setUploadInvoice',
            waitMsg: 'Uploading your file...',
            params: {
                fileName: file,
                beanString: JSON.stringify(beanValidation)
            },
            success: function (f, o) {
                var res = Ext.decode(o.response.responseText);
                var msjResult = res.msjResult || 'No message returned.';
                global.Msg({msg: msjResult.replace(/\n/g, '<br>')});
            },
            failure: function (response) {
                console.log('server failure ' + response.status);
            }
        });
    },

});
