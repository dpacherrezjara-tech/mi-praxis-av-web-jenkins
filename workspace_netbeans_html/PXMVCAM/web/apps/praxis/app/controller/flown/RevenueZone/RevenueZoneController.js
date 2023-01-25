/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.RevenueZone.RevenueZoneController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RevenueZoneController',
    fecha: new Date(),
    paginTem: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    strTipo: '',
    tituloDetailByZone: '',
    tituloDetailCityPair: '',
    tituloDetailByCoupon: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    paramsDetailCoupon: {},
    setContext: function() {
        me = this;
    },
    init: function(view) {
        prototype.id = 'RevenueZoneForm';
        prototype.url = CONTEXTPATH + '/RevenueZone';
        me = this;
        me.gridActual = '-gridData';
        this.control({
            // -------------------Eventos Genericos --------------------
            '#RevenueZoneForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#RevenueZoneForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#RevenueZoneForm-btnClear': {
                click: this.btnClear_click
            },
            '#RevenueZoneForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#RevenueZoneForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#RevenueZoneForm-btnBack': {
                click: this.btnBack_click
            },
            '#RevenueZoneForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#RevenueZoneForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#RevenueZoneForm-btn-pag-next': {
                click: this.pagNext
            },
            '#RevenueZoneForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------

            '#RevenueZoneForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#RevenueZoneForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            },
            '#RevenueZoneForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#RevenueZoneForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            }

        });
    },
    // <editor-fold defaultstate="collapsed" desc="Init">
    xpanel_afterrender: function(obj, e) {

        this.setStoreData();
        this.showGridActual();
        this.btnSearch_click();
    },
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
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataYear2 = win.getStoreYear2(false, this.fecha.getFullYear());
        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear2);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);


        var cmbFlagFlown = Ext.getCmp(prototype.id + '-cmbFlagFlown');
        var cbxCarrier = Ext.getCmp(prototype.id + '-cbxCarrier');



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

    },
    // </editor-fold>

    showGridActual: function() {
        this.hideAllGrid();
        switch (me.gridActual) {
            case  '-gridData':
//                Ext.getCmp(prototype.id + '-panelDataSummary').show();
                Ext.getCmp(prototype.id + '-panelPagination').hide();
                Ext.getCmp(prototype.id + '-pie').hide();
                break;
            case '-gridDataDetailByZone':
                Ext.getCmp(prototype.id + '-panelPagination').hide();
                Ext.getCmp(prototype.id + '-pie').hide();
                Ext.getCmp(prototype.id + '-labelTitle').show();
                break;
            case '-gridDataDetailCityPair':
                Ext.getCmp(prototype.id + '-panelPagination').show();
                Ext.getCmp(prototype.id + '-pie').show();
                Ext.getCmp(prototype.id + '-labelTitle').show();
//                Ext.getCmp(prototype.id + '-panelDataDetailCityPairSummary').show();
                break;
            case '-gridDataDetailByCoupon':
                Ext.getCmp(prototype.id + '-panelPagination').show();
                Ext.getCmp(prototype.id + '-pie').show();
                Ext.getCmp(prototype.id + '-labelTitle').show();
//                Ext.getCmp(prototype.id + '-panelDataDetailByCouponSummary').show();
                break;
        }
        Ext.getCmp(prototype.id + this.gridActual).show();
    },
    hideAllGrid: function() {
        Ext.getCmp(prototype.id + '-gridData').hide();
//        Ext.getCmp(prototype.id + '-panelDataSummary').hide();
        Ext.getCmp(prototype.id + '-gridDataDetailByZone').hide();
        Ext.getCmp(prototype.id + '-labelTitle').hide();
        Ext.getCmp(prototype.id + '-gridDataDetailCityPair').hide();
        Ext.getCmp(prototype.id + '-panelDataDetailCityPairSummary').hide();
        Ext.getCmp(prototype.id + '-gridDataDetailByCoupon').hide();
        Ext.getCmp(prototype.id + '-panelDataDetailByCouponSummary').hide();
        Ext.getCmp(prototype.id + '-gridDataDetail').hide();
        Ext.getCmp(prototype.id + '-gridDataDetailByStock').hide();
    },
    btnSearch_click: function(obj, e) {

        this.setSearchParams();
        me.drillDown = [];
        me.gridActual = '-gridData';
        this.showGridActual();
        this.setGridData(obj, e);

    },
    setSearchParams: function() {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');


        var IN_CARRIER = Ext.getCmp(prototype.id + '-cbxCarrier').getValue();
        var FFLOW = Ext.getCmp(prototype.id + '-cmbFlagFlown').getValue();
        var yearFrom = yearFrom.getValue();
        var yearTo = yearTo.getValue();
        var monthFrom = monthFrom.getValue();
        var monthTo = monthTo.getValue();

        searchParams = {
            IN_CARRIER: IN_CARRIER,
            FFLOW: FFLOW,
            yearFrom: yearFrom,
            monthFrom: monthFrom,
            yearTo: yearTo,
            monthTo: monthTo

        };

    },
    // <editor-fold defaultstate="collapsed" desc="SetGridDatas">
    setGridData: function(obj, val) {
//        this.clearTotalRowGridData();
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueZone.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
//                        me.setTotalRowGridData(bean);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
    },
    setGridDataDetail: function() {

        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueZone.GridData', {
            proxy: {
                url: prototype.url + '/searchDetByTdoc'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {

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

    },
    setGridDataDetailByStock: function() {

        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueZone.GridData', {
            proxy: {
                url: prototype.url + '/searchDetByStock'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailByStock').bindStore(storeGridDatas);

    },
    setGridDataDetailByZone: function() {

        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueZone.GridData', {
            proxy: {
                url: prototype.url + '/searchDetByZone'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-labelTitle').setText('Flight Date : ' + bean.strFormatDate + ' Carrier : ' + bean.strDescCarrier + ' Type of Flight : ' + bean.strDescr_FFLOW);
                        me.tituloDetailByZone = 'Flight Date : ' + bean.strFormatDate + ' Carrier : ' + bean.strDescCarrier + ' Type of Flight : ' + bean.strDescr_FFLOW;
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailByZone').bindStore(storeGridDatas);
    },
    setGridDataDetailByCityPair: function() {

        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueZone.GridData', {
            proxy: {
                url: prototype.url + '/searchDetByCityPair'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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
                        var bean = obj.data.items[0].data;
                        me.setTotalRowGridDataCityPair(bean);
                        Ext.getCmp(prototype.id + '-labelTitle').setText('Flight Date : ' + bean.strFormatDate2 + ' Carrier : ' + bean.strDescCarrier + ' Type of Flight : ' + bean.strDescr_FFLOW);
                        me.tituloDetailCityPair = 'Flight Date : ' + bean.strFormatDate2 + ' Carrier : ' + bean.strDescCarrier + ' Type of Flight : ' + bean.strDescr_FFLOW
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailCityPair').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataDetailByCoupon: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueZone.GridData', {
            proxy: {
                url: prototype.url + '/searchDetByCoupon'
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
                    } else {
                        var bean = obj.data.items[0].data;
                        me.setTotalRowGridDataByCoupon(bean);
                        Ext.getCmp(prototype.id + '-labelTitle').setText('Flight Date : ' + bean.strFormatDate + ' Carrier : ' + me.paramsDetailCoupon.strDescCarrier + '  Flight Number :' + bean.NFLIGHT + ' Type of Flight : ' + me.paramsDetailCoupon.strDescr_FFLOW);
                        me.tituloDetailByCoupon = 'Flight Date : ' + bean.strFormatDate + ' Carrier : ' + me.paramsDetailCoupon.strDescCarrier + '  Flight Number :' + bean.NFLIGHT + ' Type of Flight : ' + me.paramsDetailCoupon.strDescr_FFLOW;
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailByCoupon').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    // </editor-fold>


    // <editor-fold defaultstate="collapsed" desc="OnSetGridDatas">
    onSetGridDataDetail: function(obj, metaData, rowNum, column, obj2, rowData) {

        me.drillDown.push(me.gridActual);
        me.gridActual = '-gridDataDetail';
        this.showGridActual();
        var data = rowData.data;


        me.paramsDetail = {
            DFLIGHT: data.DFLIGHT,
            strFormatDate: data.strFormatDate,
            FFLOW: data.FFLOW,
            CARR: data.CARR
        };
        this.setGridDataDetail();
    },
    onSetDetailByStock: function(obj, metaData, rowNum, column, obj2, rowData) {

        me.drillDown.push(me.gridActual);
        me.gridActual = '-gridDataDetailByStock';
        this.showGridActual();
        var data = rowData.data;

        me.paramsDetail = {
            strDescTipo: data.strDescTipo,
            DFLIGHT: data.DFLIGHT,
            FFLOW: data.FFLOW,
            CARR: data.CARR,
            strFormatDate: data.strFormatDate,
            QTYPAX: data.QTYPAX,
            TOTPAX: data.TOTPAX,
            QTYFLIG: data.QTYFLIG,
            QTYPAXO: data.QTYPAXO,
            TOTPAXO: data.TOTPAXO,
            QTYFLIGO: data.QTYFLIGO,
            QTYEMD: data.QTYEMD,
            TOTEMD: data.TOTEMD
        };
        this.setGridDataDetailByStock();
    },
    onSetGridDataDetailByZone: function(obj, metaData, rowNum, column, obj2, rowData) {

        me.drillDown.push(me.gridActual);
        me.gridActual = '-gridDataDetailByZone';
        this.showGridActual();
        var data = rowData.data;


        me.paramsDetail = {
            DFLIGHT: data.DFLIGHT,
            CARR: data.CARR,
            FFLOW: data.FFLOW,
            strFormatDate: data.strFormatDate
        };
        this.setGridDataDetailByZone();
    },
    onSetGridDataDetailByCityPair: function(obj, metaData, rowNum, column, obj2, rowData) {

        me.drillDown.push(me.gridActual);
        me.gridActual = '-gridDataDetailCityPair';
        this.showGridActual();
        var data = rowData.data;

        me.paramsDetail = {
            DFLIGHT: data.DFLIGHT,
            CARR: data.CARR,
            FFLOW: data.FFLOW,
            ZONA: data.ZONA
        };
        this.setGridDataDetailByCityPair();
    },
    onSetGridDataDetailCoupon: function(obj, metaData, rowNum, column, obj2, rowData) {

        me.drillDown.push(me.gridActual);
        me.gridActual = '-gridDataDetailByCoupon';
        this.showGridActual();
        var data = rowData.data;


        me.paramsDetailCoupon = {
            DFLIGHT: data.DFLIGHT,
            ZONA: data.ZONA,
            CARR: data.CARR,
            CDEPART: data.CDEPART,
            CARRIVA: data.CARRIVA,
            CURREAM: data.CURREAM,
            NFLIGHT: data.NFLIGHT,
            strDescr_FFLOW: data.strDescr_FFLOW,
            strDescCarrier: data.strDescCarrier
        };
        this.setGridDataDetailByCoupon();
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
    // </editor-fold>
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
            beforerequest: Ext.getCmp(prototype.id + '-gridDataDetailByCoupon').mask('Loading...'),
            params: facsimilParams,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var beanFacProrrateo = res.beanFacProrrateo;
                console.log("Resultado del primer AJAX");
                console.log(beanFacProrrateo);
                paramsProrrateo.beanFacProrrateo = beanFacProrrateo;
                if (urls.url2 !== "") {
                    Ext.getCmp(prototype.id + '-gridDataDetailByCoupon').unmask();
                    Ext.Ajax.request({
                        url: URL2,
                        method: 'POST',
                        timeout: 60000000,
                        beforerequest: Ext.getCmp(prototype.id + '-gridDataDetailByCoupon').mask('Loading...'),
                        params: facsimilParams,
                        success: function(response, options) {
                            var res = Ext.JSON.decode(response.responseText);
                            var beanRest = res.beanRest;
                            console.log("Resultado del segundo AJAX");
                            console.log(beanRest);
                            paramsProrrateo.beanRest = beanRest;
                            Ext.getCmp(prototype.id + '-gridDataDetailByCoupon').unmask();
                            var prorrateo = Ext.create('Ext.Praxis.view.flown.RevenueZoneForm.Prorrateo', {
                                id: prototype.id + '-prorrateo',
                                params: {
                                    paramsProrrateo: paramsProrrateo
                                }
                            });
                            prorrateo.setId(prototype.id + "-prorrateo");
                            prorrateo.show();
                            Ext.getCmp(prototype.id + '-gridDataDetailByCoupon').unmask();
                        }
                    });
                } else {
                    Ext.getCmp(prototype.id + '-gridDataDetailByCoupon').unmask();
                    var prorrateo = Ext.create('Ext.Praxis.view.flown.RevenueZoneForm.Prorrateo', {
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
    btnClear_click: function(obj, e) {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var storeComboDataYear = win.getStoreYear2(false, yearFrom.getValue());

        yearFrom.setValue(this.fecha.getFullYear());
        yearTo.bindStore(storeComboDataYear);
        yearTo.setValue(this.fecha.getFullYear());
        monthFrom.setValue('');
        monthTo.setValue('');
    },
    // <editor-fold defaultstate="collapsed" desc="Export Excel">
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
            case  '-gridData':
                global.getFile(prototype.url + '/getXLSX?IN_CARRIER=' + searchParams.IN_CARRIER
                        + '&FFLOW=' + searchParams.FFLOW
                        + '&yearFrom=' + searchParams.yearFrom
                        + '&monthFrom=' + searchParams.monthFrom
                        + '&yearTo=' + searchParams.yearTo
                        + '&monthTo=' + searchParams.monthTo
                        );
                break;
            case '-gridDataDetailCityPair':
                global.getFile(prototype.url + '/getCityPairXLSX?DFLIGHT=' + me.paramsDetail.DFLIGHT
                        + '&CARR=' + me.paramsDetail.CARR
                        + '&FFLOW=' + me.paramsDetail.FFLOW
                        + '&ZONA=' + me.paramsDetail.ZONA
                        );
                break;
            case '-gridDataDetailByCoupon':
                global.getFile(prototype.url + '/getByCouponXLSX?DFLIGHT=' + me.paramsDetailCoupon.DFLIGHT
                        + '&ZONA=' + me.paramsDetailCoupon.ZONA
                        + '&CARR=' + me.paramsDetailCoupon.CARR
                        + '&CDEPART=' + me.paramsDetailCoupon.CDEPART
                        + '&CARRIVA=' + me.paramsDetailCoupon.CARRIVA
                        + '&CURREAM=' + me.paramsDetailCoupon.CURREAM
                        + '&NFLIGHT=' + me.paramsDetailCoupon.NFLIGHT
                        + '&strDescr_FFLOW=' + me.paramsDetailCoupon.strDescr_FFLOW
                        + '&strDescCarrier=' + me.paramsDetailCoupon.strDescCarrier
                        );

                break;
            case '-gridDataDetail':
                global.getFile(prototype.url + '/getDataDetailXLSX?DFLIGHT=' + me.paramsDetail.DFLIGHT
                        + '&strFormatDate=' + me.paramsDetail.strFormatDate
                        + '&FFLOW=' + me.paramsDetail.FFLOW
                        + '&CARR=' + me.paramsDetail.CARR
                        );
                break;
            case '-gridDataDetailByStock':
                global.getFile(prototype.url + '/getDataByStockXLSX?strDescTipo=' + me.paramsDetail.strDescTipo
                        + '&DFLIGHT=' + me.paramsDetail.DFLIGHT
                        + '&FFLOW=' + me.paramsDetail.FFLOW
                        + '&CARR=' + me.paramsDetail.CARR

                        + '&strFormatDate=' + me.paramsDetail.strFormatDate
                        + '&QTYPAX=' + me.paramsDetail.QTYPAX
                        + '&TOTPAX=' + me.paramsDetail.TOTPAX
                        + '&QTYFLIG=' + me.paramsDetail.QTYFLIG
                        + '&QTYPAXO=' + me.paramsDetail.QTYPAXO
                        + '&TOTPAXO=' + me.paramsDetail.TOTPAXO
                        + '&QTYFLIGO=' + me.paramsDetail.QTYFLIGO
                        + '&QTYEMD=' + me.paramsDetail.QTYEMD
                        + '&TOTEMD=' + me.paramsDetail.TOTEMD
                        );

                break;


                break;
        }
    }
    // </editor-fold>

    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    clearTotalRowGridData: function(bean) {
        Ext.getCmp(prototype.id + '-intTotQDOC').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-dblTotDOC').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-TOTEMD').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-totTOTEMD').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
    },
    setTotalRowGridData: function(bean) {
        Ext.getCmp(prototype.id + '-intTotQDOC').setHtml(Ext.util.Format.number(bean.intTotQDOC, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-dblTotDOC').setHtml(Ext.util.Format.number(bean.dblTotDOC, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-TOTEMD').setHtml(Ext.util.Format.number(bean.TOTEMD, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-totTOTEMD').setHtml(Ext.util.Format.number(bean.totTOTEMD, '0,000') + '&nbsp');

    },
    clearTotalRowGridDataCityPair: function(bean) {
        Ext.getCmp(prototype.id + '-totQTYFLIG').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-totQTYPAX').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-totTOTPAX').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-totQTYPAXO').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-totTOTPAXO').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-totQTYEMD').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-totTOTEMD2').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');

    },
    setTotalRowGridDataCityPair: function(bean) {

        Ext.getCmp(prototype.id + '-totQTYFLIG').setHtml(Ext.util.Format.number(bean.totQTYFLIG, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-totQTYPAX').setHtml(Ext.util.Format.number(bean.totQTYPAX, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-totTOTPAX').setHtml(Ext.util.Format.number(bean.totTOTPAX, '0,000.00') + '&nbsp');
        Ext.getCmp(prototype.id + '-totQTYPAXO').setHtml(Ext.util.Format.number(bean.totQTYPAXO, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-totTOTPAXO').setHtml(Ext.util.Format.number(bean.totTOTPAXO, '0,000.00') + '&nbsp');
        Ext.getCmp(prototype.id + '-totQTYEMD').setHtml(Ext.util.Format.number(bean.totQTYEMD, '0,000.00') + '&nbsp');
        Ext.getCmp(prototype.id + '-totTOTEMD2').setHtml(Ext.util.Format.number(bean.totTOTEMD, '0,000.00') + '&nbsp');

    },
    clearTotalRowGridDataByCoupon: function(bean) {
        Ext.getCmp(prototype.id + '-totCPN_Aud').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-difVakues').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
    },
    setTotalRowGridDataByCoupon: function(bean) {

        Ext.getCmp(prototype.id + '-totCPN_Aud').setHtml(Ext.util.Format.number(bean.totCPN_Aud, '0,000') + '&nbsp');
        Ext.getCmp(prototype.id + '-difVakues').setHtml(Ext.util.Format.number(bean.difVakues, '0,000') + '&nbsp');
    },
    /*     
     * Funciones para la paginacion     
     */
    btnBack_click: function(obj, e) {

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
        }
        switch (me.gridActual) {
            case  '-gridData':
                break;
            case '-gridDataDetailByZone':
                Ext.getCmp(prototype.id + '-labelTitle').setText(me.tituloDetailByZone);
                break;
            case '-gridDataDetailCityPair':
                Ext.getCmp(prototype.id + '-labelTitle').setText(me.tituloDetailCityPair);
                break;
            case '-gridDataDetailByCoupon':
                Ext.getCmp(prototype.id + '-labelTitle').setText(me.tituloDetailByCoupon);

                break;
        }
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.gridActual) {
            case  '-gridDataDetailCityPair':
                me.pagginActual = '-paggin';
                break;
            case '-gridDataDetailByCoupon':
                me.pagginActual = '-paggin2';
                break;
        }
    },
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    }
});
