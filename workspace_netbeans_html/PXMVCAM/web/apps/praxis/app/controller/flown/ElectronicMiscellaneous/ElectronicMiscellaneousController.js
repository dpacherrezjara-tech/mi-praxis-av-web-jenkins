/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.ElectronicMiscellaneous.ElectronicMiscellaneousController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ElectronicMiscellaneousController',
    fecha: new Date(),
    childs: '5',
    paginTem: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    searchParams: {},
    paramsDetail: {},
    paramsDetailCoupon: {},
    me: '',
    setContext: function () {
        me = this;
    },
    init: function (view) {
        prototype.id = 'ElectronicMiscellaneousForm';
        prototype.url = CONTEXTPATH + '/ElectronicMiscellaneous';
        me = this;
        me.gridActual = '-gridData';
        this.childs = Ext.getCmp(prototype.id + '-regionCenterGrid01').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ElectronicMiscellaneousForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ElectronicMiscellaneousForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ElectronicMiscellaneousForm-btnClear': {
                click: this.btnClear_click
            },
            '#ElectronicMiscellaneousForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ElectronicMiscellaneousForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ElectronicMiscellaneousForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#ElectronicMiscellaneousForm-btnBack': {
                click: this.btnBack_click
            },
            '#ElectronicMiscellaneousForm-btnQuery': {
                click: this.btnQuery_click
            },
            '#ElectronicMiscellaneousForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ElectronicMiscellaneousForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ElectronicMiscellaneousForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ElectronicMiscellaneousForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#ElectronicMiscellaneousForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#ElectronicMiscellaneousForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            },
            '#ElectronicMiscellaneousForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#ElectronicMiscellaneousForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#ElectronicMiscellaneousForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
            '#ElectronicMiscellaneousForm-txtSearch': {
                keyup: this.eventKey,
                focusleave: this.onFocusLeave
            },
//            '#ElectronicMiscellaneousForm-txtTicket': {
//                keyup: this.eventKey
//            }

        });
    },
    xpanel_afterrender: function (obj, e) {

        this.setStoreData();
        this.showGridActual();
        this.btnSearch_click();
    },
    showGridActual: function () {
        this.hideAllGrid();
        switch (me.gridActual) {
            case  '-gridData':
                Ext.getCmp(prototype.id + '-panelPagination').hide();
                Ext.getCmp(prototype.id + '-pie').hide();
                Ext.getCmp(prototype.id + '-labelTitle').hide();

                break;
            case '-gridDataDetail':
                Ext.getCmp(prototype.id + '-panelPagination').show();
                Ext.getCmp(prototype.id + '-pie').show();
                Ext.getCmp(prototype.id + '-labelTitle').show();
                break;
            case '-gridDataDetailCoupon':
                Ext.getCmp(prototype.id + '-panelPagination').show();
                Ext.getCmp(prototype.id + '-pie').show();
                Ext.getCmp(prototype.id + '-labelTitle').hide();
                break;
        }
        Ext.getCmp(prototype.id + this.gridActual).show();
    },
    hideAllGrid: function () {
        Ext.getCmp(prototype.id + '-gridData').hide();
        Ext.getCmp(prototype.id + '-gridDataDetail').hide();
        Ext.getCmp(prototype.id + '-gridDataDetailCoupon').hide();
    },
    onFocusLeave: function (obj) {
        var flightNum = Ext.getCmp(prototype.id + '-txtSearch');
        if (flightNum.getValue().length >= 1) {
            while (flightNum.getValue().length < 4) {
                flightNum.setValue('0' + flightNum.getValue());
            }
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        obj.setValue('');
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
    setStoreData: function () {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataYear2 = win.getStoreYear2(false, this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear2);
        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        var storeComboDataDay = win.getStoreDays(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");
    },
    btnSearch_click: function (obj, e) {
        this.habilitarFiltros();
        console.log(me.gridActual);
        switch (me.gridActual) {
            case  '-gridData':
                this.setFormatParameter();
                if (searchParams.IN_TKT.trim() !== '') {
                    if (searchParams.IN_TKT.trim().length === 13) {
                        this.setParametersTicket();
                        this.setGridDataTicket();
                        me.drillDown.push(me.gridActual);
                        me.gridActual = '-gridDataDetailCoupon';
                        this.showGridActual();
                    } else {
                        global.Msg({
                            msg: 'Ticket number must contain 13 digits.'
                        });
                    }
                } else {
                    this.setGridData(obj, e);
                }


                break;
            case '-gridDataDetail':
                this.setParametersDetail();
                if (me.paramsDetail.IN_TKT.trim() !== '') {
                    if (me.paramsDetail.IN_TKT.trim().length === 13) {
                        this.setParametersTicket();
                        this.setGridDataTicket();
                        me.drillDown.push(me.gridActual);
                        me.gridActual = '-gridDataDetailCoupon';
                        this.showGridActual();
                    } else {
                        global.Msg({
                            msg: 'Ticket number must contain 13 digits.'
                        });
                    }
                } else {
                    this.setGridDataDetail(false);
                }
                break;
            case '-gridDataDetailCoupon':
                this.setParametersDetail();
                if (me.paramsDetail.IN_TKT.trim() !== '') {
                    if (me.paramsDetail.IN_TKT.trim().length === 13) {
                        this.setParametersTicket();
                        this.setGridDataTicket();
                        me.drillDown.push(me.gridActual);
                        me.gridActual = '-gridDataDetailCoupon';
                        this.showGridActual();
                    } else {
                        global.Msg({
                            msg: 'Ticket number must contain 13 digits.'
                        });
                    }
                } else {
//                    this.setGridDataDetailCoupon(obj, e);
                    this.setFormatParameter();
                    me.gridActual = '-gridData';
                    this.showGridActual();
                }
                break;
        }


    },
    setFormatParameter: function () {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var NFLIGHT = Ext.getCmp(prototype.id + '-txtSearch').getValue();
        var IN_TKT = Ext.getCmp(prototype.id + '-txtTicket').getValue();
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
        searchParams = {
            IN_FECHA_FROM: IN_FECHA_FROM,
            IN_FECHA_TO: IN_FECHA_TO,
            NFLIGHT: NFLIGHT,
            IN_TKT: IN_TKT
        };
//        console.log("IN_FECHA_FROM : " + IN_FECHA_FROM);
//        console.log("IN_FECHA_TO : " + IN_FECHA_TO);
//        console.log("IN_NFLIGHT : " + NFLIGHT);
//        console.log("IN_TKT : " + IN_TKT);
    },
    setParametersDetail: function () {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var NFLIGHT = Ext.getCmp(prototype.id + '-txtSearch').getValue();
        var IN_TKT = Ext.getCmp(prototype.id + '-txtTicket').getValue();
        var IN_FECHA_FROM = yearFrom.getValue() + monthFrom.getValue() + dayFrom.getValue();
        var IN_FECHA_TO = yearTo.getValue() + monthTo.getValue() + dayTo.getValue();
        var DFLIGHT = me.paramsDetail.DFLIGHT;
        me.paramsDetail = {
            DFLIGHT: DFLIGHT,
            NFLIGHT: NFLIGHT,
            IN_FECHA_FROM: IN_FECHA_FROM,
            IN_FECHA_TO: IN_FECHA_TO,
            IN_TKT: IN_TKT
        };
    },
    setParametersTicket: function () {

        var IN_TKT = Ext.getCmp(prototype.id + '-txtTicket').getValue();
        me.paramsDetailCoupon = {
            DFLIGHT: '',
            NFLIGHT: '',
            ZONA: '',
            CDEPART: '',
            CARRIVA: '',
            IN_TKT: IN_TKT
        };
    },
    setGridData: function (obj, val) {
        console.log(searchParams);
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.ElectronicMiscellaneous.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {

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
    setGridDataDetail: function (flag) {

        if (!flag) { //Se llama desde el search , en otro caso se llama desde el drillDown
            this.setParametersDetail();
        }

        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.ElectronicMiscellaneous.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
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

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataDetailCoupon: function () {

        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.ElectronicMiscellaneous.GridData', {
            proxy: {
                url: prototype.url + '/searchDetailCupon'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailCoupon;
                },
                load: function (obj) {
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
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailCoupon').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    setGridDataTicket: function () {

        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.ElectronicMiscellaneous.GridData', {
            proxy: {
                url: prototype.url + '/searchTKT'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailCoupon;
                },
                load: function (obj) {
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
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailCoupon').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    onSetGridDataDetail: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

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
        console.log(me.paramsDetail);
        this.setGridDataDetail(false); //El parametro es para identificar si se llama a la funcion desde la grilla usando el drillDown, o mediante el boton search
    },
    onSetGridDataDetailCoupon: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
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
    onFacsimilClick: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
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
                success: function (response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var beanFaximil = res.beanFaximil;
                    var facsimil = Ext.create('Ext.Praxis.view.flown.ElectronicMiscellaneousForm.Facsimil', {
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
    searchProrrateo: function (facsimilParams) {

        var urls = this.obtenerUrls(facsimilParams);
        var URL1 = CONTEXTPATH + '/Prorrateo/' + urls.url1;
        var URL2 = CONTEXTPATH + '/Prorrateo/' + urls.url2;
        var paramsProrrateo = {
            beanFacProrrateo: "",
            beanRest: "",
            facsimilParams: facsimilParams
        };
        console.log("--------Controller EMD -----");
        console.log(facsimilParams);
        Ext.Ajax.request({
            url: URL1,
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridDataDetailCoupon').mask('Loading...'),
            params: facsimilParams,
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var beanFacProrrateo = res.beanFacProrrateo;
                console.log("Resultado del primer AJAX - beanFacProrrateo");
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
                        success: function (response, options) {
                            var res = Ext.JSON.decode(response.responseText);
                            var beanRest = res.beanRest;
                            console.log("Resultado del segundo AJAX --- beanRest");
                            console.log(beanRest);
                            paramsProrrateo.beanRest = beanRest;
                            Ext.getCmp(prototype.id + '-gridDataDetailCoupon').unmask();
                            var prorrateo = Ext.create('Ext.Praxis.view.flown.ElectronicMiscellaneousForm.Prorrateo', {
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
                    var prorrateo = Ext.create('Ext.Praxis.view.flown.ElectronicMiscellaneousForm.Prorrateo', {
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
    obtenerUrls: function (facsimilParams) {

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
            } else if (backSub === 'SALE_TKT') {
                if (backSub2 === '0') {
                    urlProrrateo1 = 'searchARC';
                    urlProrrateo2 = 'searchA720';
                }
            } else {
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
                } else if (backSub === 'SALE_TKT') {
                    if (backSub2 === '0') {
                        urlProrrateo1 = 'searchASR';
                        urlProrrateo2 = 'searchA720';
                    }

                } else {
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
                    } else if (backSub === 'SALE_TKT') {
                        if (backSub2 === '0') {
                            urlProrrateo1 = 'searchBSP';
                            urlProrrateo2 = 'searchA720';
                        }
                    } else {
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
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            var flightNum = Ext.getCmp(prototype.id + '-txtSearch');
            if (flightNum.getValue().length >= 1) {
                while (flightNum.getValue().length < 4) {
                    flightNum.setValue('0' + flightNum.getValue());
                }
            }
            this.btnSearch_click();
        }
    },
    btnBack_click: function (obj, e) {


        if (me.drillDown.length > 0) {
            me.gridActual = me.drillDown.pop();
            this.showGridActual();
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
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var txtTicket = Ext.getCmp(prototype.id + '-txtTicket');
        var txtSearch = Ext.getCmp(prototype.id + '-txtSearch');
        yearFrom.setValue(this.fecha.getFullYear());
        var storeComboDataYear = win.getStoreYear2(false, yearFrom.getValue());
        yearTo.bindStore(storeComboDataYear);
        yearTo.setValue(this.fecha.getFullYear());
        monthFrom.setValue('');
        monthTo.setValue('');
        dayFrom.setValue('');
        dayTo.setValue('');
        txtTicket.setValue('');
        txtSearch.setValue('');
        Ext.getCmp(prototype.id + '-txtROLL').setValue('');
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
    btnQuery_click: function () {
        var myForm = document.createElement('FORM');
        myForm.method = 'post';
        myForm.action = CONTEXTPATH + '/Home#program-query-flight-form';
        myForm.id = 'QueryFlightForm';
        document.body.appendChild(myForm);
        myForm.submit();
    }
    ,
    exportExcel: function () {

        switch (me.gridActual) {
            case  '-gridData':
                global.getFile(prototype.url + '/getXLSX?IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM
                        + '&IN_FECHA_TO=' + searchParams.IN_FECHA_TO
                        + '&NFLIGHT=' + searchParams.NFLIGHT
                        + '&IN_TKT=' + searchParams.IN_TKT);
                break;
            case '-gridDataDetail':
                global.getFile(prototype.url + '/getDetailXLSX?DFLIGHT=' + me.paramsDetail.DFLIGHT
                        + '&NFLIGHT=' + me.paramsDetail.NFLIGHT
                        + '&IN_FECHA_FROM=' + me.paramsDetail.IN_FECHA_FROM
                        + '&IN_FECHA_TO=' + me.paramsDetail.IN_FECHA_TO
                        + '&IN_TKT=' + me.paramsDetail.IN_TKT);
                break;
            case '-gridDataDetailCoupon':

                global.getFile(prototype.url + '/getDetailCouponXLSX?DFLIGHT=' + me.paramsDetailCoupon.DFLIGHT
                        + '&NFLIGHT=' + me.paramsDetailCoupon.NFLIGHT
                        + '&strFormatDate=' + me.paramsDetailCoupon.strFormatDate
                        + '&ZONA=' + me.paramsDetailCoupon.ZONA
                        + '&ZONA=' + me.paramsDetailCoupon.ZONA
                        + '&CARRIVA=' + me.paramsDetailCoupon.CARRIVA);
                break;
                break;
        }
    }
    ,
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    BuscarTKT_keyDownHandler: function (obj, e, eOpts) {
        
        me.beanTKT = {};
        var txtTicket = Ext.getCmp(prototype.id + '-txtTicket').getValue();
        var txtROLL = Ext.getCmp(prototype.id + '-txtROLL').getValue();
                
        switch (e.getKey()) {
            case 13:
                if (txtTicket.trim().length === 13) {
                    me.beanTKT.IN_TKT = txtTicket;
                    me.beanTKT.IN_SEQRO = txtROLL;
                    this.searchTKT_2(me.beanTKT);
                    me.drillDown.push(me.gridActual);
                    me.gridActual = '-gridDataDetailCoupon';
                    this.showGridActual();
                } else {
                    Ext.getCmp(prototype.id + '-txtTicket').setValue('');
                    global.Msg({msg: 'Ticket number must contain 13 digits.'});
                }
                if (txtTicket !== '') {
                    this.deshabilitarFiltros();
                }
                break;
            case 8://Backspace
                this.habilitarFiltros();
                break;
            case 32: //Spacebar
                this.habilitarFiltros();
                break;
            case 46: //Delete
                this.habilitarFiltros();
                break;
        }
        if (txtTicket === '') {
            this.habilitarFiltros();
        }
    },
    searchTKT_2: function(bean) {
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.GridData', {
            proxy: {
                url: prototype.url + '/searchTKT_2'
            },
            listeners: {
                beforeload: function(obj) {
//                    Ext.getCmp(boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function(obj, obj2, success, obj4, obj5) {
//                    Ext.getCmp(boxActual).unmask();
                    console.log(obj);
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found'});
                    }else{
                        var data = obj.data.items[0].data;
                        console.log(data);
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataDetailCoupon').bindStore(storeGridDatas);
    },
    deshabilitarFiltros: function () {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateToYear').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateToDay').disable(true);
        Ext.getCmp(prototype.id + '-txtSearch').disable(true);
    },
    habilitarFiltros: function () {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateToYear').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateToDay').enable(true);
        Ext.getCmp(prototype.id + '-txtSearch').enable(true);
    },
    /**
     * Metodos usados para editar
     * */
    btnAdd_click: function (obj, e) {
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
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);
    },
    onEditClick2: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry2('U', rec, all, rowIndex);
    },
    winDataEntry: function (action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        all = all === null || all === undefined ? {} : all;

        var dataEntry = Ext.create('Ext.Praxis.view.flown.ElectronicMiscellaneousForm.DataEntry', {
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
    winDataEntry2: function (action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        all = all === null || all === undefined ? {} : all;

        var dataEntryT = Ext.create('Ext.Praxis.view.flown.ElectronicMiscellaneousForm.DataEntryTicket', {
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
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.gridActual) {
            case  '-gridData':
                break;
            case '-gridDataDetail':
                me.pagginActual = '-paggin';
                break;
            case '-gridDataDetailCoupon':
                me.pagginActual = '-paggin2';
                break;
        }
    },
    onValidarChange: function () {
        var list = Ext.getCmp(prototype.id + '-txtTicket').getValue().replace(/\s/g, "").split("");
        var txtTicket = '';
        for (var i = 0; i < list.length; i++) {
            if (this.esNumero(list[i])) {
                txtTicket += list[i];
            }
        }
        Ext.getCmp(prototype.id + '-txtTicket').setValue(txtTicket.substring(0, 13));
    },
    esNumero: function (valor) {
        return valor.toLowerCase() === valor.toUpperCase();
    },
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
//    getValue: function(id) {
//        return Ext.getCmp(prototype.id + '-' + id).getValue();
//    },
//    setValue: function(id, txt) {
//        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
//    },
});
