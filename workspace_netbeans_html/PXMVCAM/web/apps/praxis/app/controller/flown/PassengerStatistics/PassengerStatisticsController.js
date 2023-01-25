/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.PassengerStatistics.PassengerStatisticsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PassengerStatisticsController',
    fecha: new Date(),
    paginTem: '',
    pagginActual: '',
    drillDown: [],
    tabActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    paramsDetailCoupon: {},
    setContext: function() {
        me = this;
    },
    init: function(view) {
        prototype.id = 'PassengerStatisticsForm';
        prototype.url = CONTEXTPATH + '/PassengerStatistics';
        me = this;
        me.gridActual = '-gridData';
        this.control({
            // -------------------Eventos Genericos --------------------
            '#PassengerStatisticsForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#PassengerStatisticsForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#PassengerStatisticsForm-btnClear': {
                click: this.btnClear_click
            },
            '#PassengerStatisticsForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#PassengerStatisticsForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#PassengerStatisticsForm-btnBack': {
                click: this.btnBack_click
            },
            '#PassengerStatisticsForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#PassengerStatisticsForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#PassengerStatisticsForm-btn-pag-next': {
                click: this.pagNext
            },
            '#PassengerStatisticsForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#PassengerStatisticsForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#PassengerStatisticsForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            },
            '#PassengerStatisticsForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#PassengerStatisticsForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#PassengerStatisticsForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
            '#PassengerStatisticsForm-txtFlight': {
                keyup: this.eventKey,
                focusleave: this.onFocusLeave
            },
            '#PassengerStatisticsForm-tabStatistics': {
                activate: this.activatePanel
            },
            '#PassengerStatisticsForm-tabControlFigures': {
                activate: this.activatePanel
            },
            '#PassengerStatisticsForm-chkCtrlFlig': {
                change: this.btnSearch_click
            },
            '#PassengerStatisticsForm-cmbMatch': {
                change: this.btnSearch_click
            },
            '#PassengerStatisticsForm-cmbTipo': {
                change: this.btnSearch_click
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
    },
    onFocusLeave: function(obj) {
        var flightNum = Ext.getCmp(prototype.id + '-txtFlight');
        if (flightNum.getValue().length >= 1) {
            while (flightNum.getValue().length < 4) {
                flightNum.setValue('0' + flightNum.getValue());
            }
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Init">
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function(obj) {
        obj.setValue('');
    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function(obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectComboFromDay: function(obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataYear2 = win.getStoreYear2(false, this.fecha.getFullYear());
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear2);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");

        var cmbFlagFlown = Ext.getCmp(prototype.id + '-cmbFlagFlown');
        var cbxCarrier = Ext.getCmp(prototype.id + '-cbxCarrier');
        var cmbCUTP = Ext.getCmp(prototype.id + '-cmbCUTP');
        var cmbTipoFecha = Ext.getCmp(prototype.id + '-cmbTipoFecha');
        var cmbMatch = Ext.getCmp(prototype.id + '-cmbMatch');
        var cmbTipo = Ext.getCmp(prototype.id + '-cmbTipo');


        cmbTipoFecha.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["1", "Flight Date"],
                ["2", "Accounting Date"]
            ]}));
        cmbTipoFecha.setValue("1");
        cmbFlagFlown.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["P", "Scheduled"],
                ["C", "Charter"],
                ["X", "Canceled"],
                ["U", "Unscheduled"]
            ]}));
        cmbFlagFlown.setValue("");

        cbxCarrier.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["AM", "Aeroméxico"],
                ["5D", "AM Connect"],
                ["VW", "Aeromar"]

            ]}));
        cbxCarrier.setValue("");
        cmbCUTP.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["MXN", "MXN"],
                ["USD", "USD"],
                ["EUR", "EUR"]
            ]}));
        cmbCUTP.setValue("MXN");
        cmbMatch.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["M", "Match"],
                ["X", "Unmatched"]
            ]}));
        cmbMatch.setValue("");
        cmbTipo.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["P", "Pax"],
                ["R", "Revenue"]
            ]}));
        cmbTipo.setValue("P");


    },
    // </editor-fold>
    activatePanel: function(newActiveItem, d, oldActiveItem, eOpts) {
        me.tabActual = Ext.getCmp(prototype.id + '-tabMain').activeTab.id;
        this.btnSearch_click();
    },
    btnSearch_click: function(obj, e) {
        this.setSearchParams();
        switch (me.tabActual) {
            case  prototype.id + '-tabStatistics' :
                this.setGridData();

                break;
            case  prototype.id + '-tabControlFigures' :
                var tipo = searchParams.cmbTipo;
                var check = searchParams.chkCtrlFlig;

                switch (tipo) {
                    case 'R':
                        this.setGridDataPraxisOracle();
                        Ext.getCmp(prototype.id + '-gridPraxisOracle').show();
                        Ext.getCmp(prototype.id + '-gridControl').hide();
                        Ext.getCmp(prototype.id + '-panelDataControlSummary').hide();

                        break;
                    case 'P':
                        this.setGridDataControl();
                        Ext.getCmp(prototype.id + '-gridPraxisOracle').hide();
                        Ext.getCmp(prototype.id + '-gridControl').show();
                        Ext.getCmp(prototype.id + '-panelDataControlSummary').show();

                        break;
                }
                break;
        }
    },
    setSearchParams: function() {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var IN_NFLIGHT = Ext.getCmp(prototype.id + '-txtFlight').getValue();
        var IN_TIPOFECHA = Ext.getCmp(prototype.id + '-cmbTipoFecha').getValue();
        var IN_CIA = Ext.getCmp(prototype.id + '-cbxCarrier').getValue();
        var IN_CURRENCY = Ext.getCmp(prototype.id + '-cmbCUTP').getValue();
        var FFLOW = Ext.getCmp(prototype.id + '-cmbFlagFlown').getValue();
        var IN_FUENTE = Ext.getCmp(prototype.id + '-cmbMatch').getValue();
        var cmbTipo = Ext.getCmp(prototype.id + '-cmbTipo').getValue();
        var chkCtrlFlig = Ext.getCmp(prototype.id + '-chkCtrlFlig').getValue();
        var flag = '';

        if (dayFrom.getValue() === null || dayFrom.getValue() === '') {
            dayFrom.setValue('');
            dayTo.setValue('');
        } else {
            if (dayTo.getValue() === null || dayTo.getValue() === '') {
                dayTo.setValue(31);
            }
        }

        var IN_FECHA_FROM = yearFrom.getValue() + monthFrom.getValue() + dayFrom.getValue();
        var IN_FECHA_TO = yearTo.getValue() + monthTo.getValue() + dayTo.getValue();
        if (chkCtrlFlig) {
            flag = 'N';
        } else {
            flag = 'Y';
        }


        searchParams = {
            IN_FECHA_FROM: IN_FECHA_FROM,
            IN_FECHA_TO: IN_FECHA_TO,
            IN_NFLIGHT: IN_NFLIGHT,
            IN_TIPOFECHA: IN_TIPOFECHA,
            IN_CIA: IN_CIA,
            IN_CURRENCY: IN_CURRENCY,
            FFLOW: FFLOW,
            IN_FUENTE: IN_FUENTE,
            cmbTipo: cmbTipo,
            chkCtrlFlig: chkCtrlFlig,
            flag: flag
        };
        console.log("IN_FECHA_FROM : " + IN_FECHA_FROM);
        console.log("IN_FECHA_TO : " + IN_FECHA_TO);
        console.log("IN_NFLIGHT : " + IN_NFLIGHT);
        console.log("IN_TIPOFECHA : " + IN_TIPOFECHA);
        console.log("IN_CIA : " + IN_CIA);
        console.log("IN_CURRENCY : " + IN_CURRENCY);
        console.log("FFLOW : " + FFLOW);
        console.log("IN_FUENTE : " + IN_FUENTE);
        console.log("cmbTipo : " + cmbTipo);
        console.log("chkCtrlFlig : " + chkCtrlFlig);
        console.log("flag : " + flag);
        console.log("TAB : " + me.tabActual);

    },
    setGridData: function(obj, val) {

        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.PassengerStatistics.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    console.log("---------------");
                    console.log(obj);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
    },
    setGridDataPraxisOracle: function() {
        me.gridActual = '-gridPraxisOracle';
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.PassengerStatistics.GridData', {
            proxy: {
                url: prototype.url + '/searchPRAXISvsORACLE'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        Ext.Msg.show({
                            title: ".:PRAXIS:.",
                            msg: "Data not found",
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.QUESTION
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridPraxisOracle').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    setGridDataControl: function() {
        me.gridActual = '-gridControl';
        this.clearTotalRowGridDataControl()
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.PassengerStatistics.GridData', {
            proxy: {
                url: prototype.url + '/searchControl'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    console.log(obj.data);
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        Ext.Msg.show({
                            title: ".:PRAXIS:.",
                            msg: "Data not found",
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.QUESTION
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        me.setTotalRowGridDataControl(bean);
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridControl').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataDetail: function(flag) {

        if (!flag) { //Se llama desde el search , en otro caso se llama desde el drillDown
            this.setParametersDetail();
        }

        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.PassengerStatistics.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    var label = obj.data.items[0].data.strFormatDate3;
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    Ext.getCmp(prototype.id + '-labelTitle').setHtml('<b>Flight Date ' + label + '</b>');
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataDetailCoupon: function() {

        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.PassengerStatistics.GridData', {
            proxy: {
                url: prototype.url + '/searchDetailCupon'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetailCoupon;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
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
        Ext.getCmp(prototype.id + '-gridDataDetailCoupon').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    setGridDataTicket: function() {

        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.PassengerStatistics.GridData', {
            proxy: {
                url: prototype.url + '/searchTKT'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetailCoupon;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
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
        Ext.getCmp(prototype.id + '-gridDataDetailCoupon').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    onSetGridDataDetail: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.gridActual);
        me.gridActual = '-gridDataDetail';
        this.showGridActual();
        var data = rowData.data;
        me.paramsDetail = {
            DFLIGHT: data.DFLIGHT,
            NFLIGHT: data.NFLIGHT,
            IN_FECHA_FROM: data.IN_FECHA_FROM,
            IN_FECHA_TO: data.IN_FECHA_TO
        };
        this.setGridDataDetail(true); //El parametro es para identificar si se llama a la funcion desde la grilla usando el drillDown, o mediante el boton search
    }
    ,
    onSetGridDataDetailCoupon: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.gridActual);
        me.gridActual = '-gridDataDetailCoupon';
        this.showGridActual();
        var data = rowData.data;
        me.paramsDetailCoupon = {
            DFLIGHT: data.DFLIGHT,
            NFLIGHT: data.NFLIGHT,
            strFormatDate: data.strFormatDate,
            ZONA: data.ZONA,
            CDEPART: data.CDEPART,
            CARRIVA: data.CARRIVA
        };
        this.setGridDataDetailCoupon();
    },
    onFacsimilClick: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        var rec = rowData.data;
        console.log("Inicio de Facsimil");
        console.log(rec);
        var facsimilParams = {
            FUENTE: rec.FTE.trim(),
            TDNR: rec.CCIA + rec.FORMA + rec.SERIE,
            CPUI: rec.CUPON,
            COUNTRY: rec.PSVVTA,
            HRED: rec.FVTA,
            consulta: 'EMD',
            strVTR: '',
            strFuente: '',
            typeModal: '',
            listaReg63: '',
            back: '',
            TicketPadre: ''
        };
        if (rec.CCIA === '139') {
            facsimilParams.strVTR = 'VTR';
            facsimilParams.typeModal = 'PRORATE';
            facsimilParams.listaReg63 = '';
            facsimilParams.back = 'SALE_TKT0';
            facsimilParams.TicketPadre = facsimilParams.TDNR;
            this.searchProrrateo(facsimilParams);
        } else {

            Ext.Ajax.request({
                url: prototype.url + '/searchFacsimil',
                method: 'POST',
                timeout: 60000000,
                beforerequest: Ext.getCmp(prototype.id + '-gridDataDetailCoupon').mask('Loading...'),
                params: facsimilParams,
                success: function(response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var beanFaximil = res.beanFaximil;
                    var facsimil = Ext.create('Ext.Praxis.view.flown.PassengerStatisticsForm.Facsimil', {
                        id: prototype.id + '-facsimil',
                        params: {
                            beanFaximil: beanFaximil
                        }
                    });
                    facsimil.setId(prototype.id + "-facsimil");
                    facsimil.show();
                    Ext.getCmp(prototype.id + '-gridDataDetailCoupon').unmask();
                }
            });
        }
    },
    searchProrrateo: function(facsimilParams) {

        var urls = this.obtenerUrls(facsimilParams);
        var URL1 = CONTEXTPATH + '/Prorrateo/' + urls.url1;
        var URL2 = CONTEXTPATH + '/Prorrateo/' + urls.url2;
        var paramsProrrateo = {
            beanFacProrrateo: "",
            beanRest: "",
            facsimilParams: facsimilParams
        };
        Ext.Ajax.request({
            url: URL1,
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridDataDetailCoupon').mask('Loading...'),
            params: facsimilParams,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var beanFacProrrateo = res.beanFacProrrateo;
                console.log("Resultado del primer AJAX");
                console.log(beanFacProrrateo);
                paramsProrrateo.beanFacProrrateo = beanFacProrrateo;
                if (urls.url2 !== "") {
                    Ext.getCmp(prototype.id + '-gridDataDetailCoupon').unmask();
                    Ext.Ajax.request({
                        url: URL2,
                        method: 'POST',
                        timeout: 60000000,
                        beforerequest: Ext.getCmp(prototype.id + '-gridDataDetailCoupon').mask('Loading...'),
                        params: facsimilParams,
                        success: function(response, options) {
                            var res = Ext.JSON.decode(response.responseText);
                            var beanRest = res.beanRest;
                            console.log("Resultado del segundo AJAX");
                            console.log(beanRest);
                            paramsProrrateo.beanRest = beanRest;
                            Ext.getCmp(prototype.id + '-gridDataDetailCoupon').unmask();
                            var prorrateo = Ext.create('Ext.Praxis.view.flown.PassengerStatisticsForm.Prorrateo', {
                                id: prototype.id + '-prorrateo',
                                params: {
                                    paramsProrrateo: paramsProrrateo
                                }
                            });
                            prorrateo.setId(prototype.id + "-prorrateo");
                            prorrateo.show();
                            Ext.getCmp(prototype.id + '-gridDataDetailCoupon').unmask();
                        }
                    });
                } else {
                    Ext.getCmp(prototype.id + '-gridDataDetailCoupon').unmask();
                    var prorrateo = Ext.create('Ext.Praxis.view.flown.PassengerStatisticsForm.Prorrateo', {
                        id: prototype.id + '-prorrateo',
                        params: {
                            paramsProrrateo: paramsProrrateo
                        }
                    });
                    prorrateo.setId(prototype.id + "-prorrateo");
                    prorrateo.show();
                }

            }
        });
        console.log("URL 1 : " + urls.url1);
        console.log("URL 2 : " + urls.url2);
    },
    obtenerUrls: function(facsimilParams) {

        var urlProrrateo1 = '';
        var urlProrrateo2 = '';
        var fuente = facsimilParams.FUENTE;
        var back = facsimilParams.back;
        var backSub = back.substr(0, 8);
        var backSub2 = back.substr(8);
        console.log("fuente : " + fuente);
        console.log("back : " + back);
        console.log("backSub : " + backSub);
        console.log("backSub2 : " + backSub2);
        if (fuente.trim() === 'A' || fuente.trim() === 'ARC') {
            if (backSub === 'SALE_RFN') {
                if (backSub2 === '0') {
                    urlProrrateo1 = 'searchARC';
                    urlProrrateo2 = 'searchA713';
                }
            }
            else if (backSub === 'SALE_TKT') {
                if (backSub2 === '0') {
                    urlProrrateo1 = 'searchARC';
                    urlProrrateo2 = 'searchA720';
                }
            }
            else {
                urlProrrateo1 = 'searchARC';
                urlProrrateo2 = '';
            }
        } else {
            if (fuente.trim() === 'ASR' || fuente.trim() === 'S') {
                if (backSub === 'SALE_RFN') {
                    if (backSub2 === '0') {
                        urlProrrateo1 = 'searchASR';
                        urlProrrateo2 = 'searchA713';
                    }
                }
                else if (backSub === 'SALE_TKT') {
                    if (backSub2 === '0') {
                        urlProrrateo1 = 'searchASR';
                        urlProrrateo2 = 'searchA720';
                    }

                }
                else {
                    urlProrrateo1 = 'searchASR';
                    urlProrrateo2 = '';
                }
            } else {
                if (fuente.trim() === 'BSP' || fuente.trim() === 'B') {
                    if (backSub === 'SALE_RFN') {
                        if (backSub2 === '0') {
                            urlProrrateo1 = 'searchBSP';
                            urlProrrateo2 = 'searchA713';
                        }
                    }
                    else if (backSub === 'SALE_TKT') {
                        if (backSub2 === '0') {
                            urlProrrateo1 = 'searchBSP';
                            urlProrrateo2 = 'searchA720';
                        }
                    }
                    else {
                        urlProrrateo1 = 'searchBSP';
                        urlProrrateo2 = '';
                    }
                } else {
                    urlProrrateo1 = 'searchARC';
                    urlProrrateo2 = 'searchA720';
                }
            }
        }
        return {
            url1: urlProrrateo1,
            url2: urlProrrateo2
        };
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            var flightNum = Ext.getCmp(prototype.id + '-txtFlight');
            if (flightNum.getValue().length >= 1) {
                while (flightNum.getValue().length < 4) {
                    flightNum.setValue('0' + flightNum.getValue());
                }
            }
            this.btnSearch_click();
        }
    },
    btnBack_click: function(obj, e) {


//        if (me.drillDown.length > 0) {
//            me.gridActual = me.drillDown.pop();
//            this.showGridActual();
//            this.getPaggin();
//            var pag = Ext.getCmp(prototype.id + me.pagginActual);
//            var pagData = pag.getPageData();
//            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//            Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//        }
    }
    , btnClear_click: function(obj, e) {

        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var txtFlight = Ext.getCmp(prototype.id + '-txtFlight');
        var cmbFlagFlown = Ext.getCmp(prototype.id + '-cmbFlagFlown');
        var cbxCarrier = Ext.getCmp(prototype.id + '-cbxCarrier');
        var cmbCUTP = Ext.getCmp(prototype.id + '-cmbCUTP');
        var cmbTipoFecha = Ext.getCmp(prototype.id + '-cmbTipoFecha');
        var cmbMatch = Ext.getCmp(prototype.id + '-cmbMatch');
        var cmbTipo = Ext.getCmp(prototype.id + '-cmbTipo');
        yearFrom.setValue(this.fecha.getFullYear());
        var storeComboDataYear = win.getStoreYear2(false, yearFrom.getValue());
        yearTo.bindStore(storeComboDataYear);
        yearTo.setValue(this.fecha.getFullYear());
        monthFrom.setValue('');
        monthTo.setValue('');
        dayFrom.setValue('');
        dayTo.setValue('');
        txtFlight.setValue('');
        cmbTipoFecha.setValue("1");
        cmbFlagFlown.setValue("");
        cbxCarrier.setValue("");
        cmbCUTP.setValue("MXN");
        cmbMatch.setValue("");
        cmbTipo.setValue("P");
    },
    btnExcel_click: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    exportExcel: function() {

        switch (me.gridActual) {
            case  '-gridControl':
                global.getFile(prototype.url + '/getControlXLSX?IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM
                        + '&IN_FECHA_TO=' + searchParams.IN_FECHA_TO
                        + '&IN_CIA=' + searchParams.IN_CIA
                        + '&IN_FUENTE=' + searchParams.IN_FUENTE
                        + '&FFLOW=' + searchParams.FFLOW
                        + '&flag=' + searchParams.flag
                        + '&IN_NFLIGHT=' + searchParams.IN_NFLIGHT);
                break;
            case  '-gridPraxisOracle':
                global.getFile(prototype.url + '/getPraxisOracleXLSX?IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM
                        + '&IN_FECHA_TO=' + searchParams.IN_FECHA_TO
                        + '&IN_CIA=' + searchParams.IN_CIA
                        + '&IN_CURRENCY=' + searchParams.IN_CURRENCY
                        + '&flag=' + searchParams.flag);
                break;


        }
    },
    clearTotalRowGridDataControl: function(bean) {
        Ext.getCmp(prototype.id + '-lngQSVOPEND').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-lngQSVOPRO').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-longDiference').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');

    },
    setTotalRowGridDataControl: function(bean) {
        Ext.getCmp(prototype.id + '-lngQSVOPEND').setHtml(Ext.util.Format.number(bean.lngQSVOPEND, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-lngQSVOPRO').setHtml(Ext.util.Format.number(bean.lngQSVOPRO, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-longDiference').setHtml(Ext.util.Format.number((bean.lngQSVOPEND - bean.lngQSVOPRO), '0,000') + '&nbsp');

    }
    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    /**
     * Metodos usados para editar
     * */
    btnAdd_click: function(obj, e) {
        switch (me.gridActual) {
            case  '-gridData':
                break;
            case '-gridDataDetail':
                this.winDataEntry('I');
                break;
            case '-gridDataDetailCoupon':
                this.winDataEntry2('I');
                break;
        }
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);
    },
    onEditClick2: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry2('U', rec, all, rowIndex);
    },
    winDataEntry: function(action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        all = all === null || all === undefined ? {} : all;
        var dataEntry = Ext.create('Ext.Praxis.view.flown.PassengerStatisticsForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                all: all,
                rowIndex: rowIndex
            }
        });
        dataEntry.setId(prototype.id + "-dataEntry");
        dataEntry.show();
    },
    winDataEntry2: function(action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        all = all === null || all === undefined ? {} : all;
        var dataEntryT = Ext.create('Ext.Praxis.view.flown.PassengerStatisticsForm.DataEntryTicket', {
            id: prototype.id + '-dataEntryTicket',
            params: {
                action: action,
                rec: rec,
                all: all,
                rowIndex: rowIndex
            }
        });
        dataEntryT.setId(prototype.id + "-dataEntryTicket");
        dataEntryT.show();
    },
    /*     
     * Funciones para la paginacion     
     */
    getPaggin: function() {
        switch (me.gridActual) {
            case  '-gridData':
                break;
            case '-gridControl':
                me.pagginActual = '-paggin';
                break;
            case '-gridPraxisOracle':
                me.pagginActual = '-paggin2';
                break;
        }
    },
    pagFirst: function(obj, e) {
        this.getPaggin();
        if (me.pagginActual !== '') {
            var pag = Ext.getCmp(prototype.id + me.pagginActual);
            pag.moveFirst();
        }
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        if (me.pagginActual !== '') {
            var pag = Ext.getCmp(prototype.id + me.pagginActual);
            pag.movePrevious();
        }
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        console.log(me.pagginActual);
        if (me.pagginActual !== '') {
            var pag = Ext.getCmp(prototype.id + me.pagginActual);
            pag.moveNext();
        }
    },
    pagLast: function(obj, e) {
        this.getPaggin();

        if (me.pagginActual !== '') {
            var pag = Ext.getCmp(prototype.id + me.pagginActual);
            pag.moveLast();
        }
    }
});
