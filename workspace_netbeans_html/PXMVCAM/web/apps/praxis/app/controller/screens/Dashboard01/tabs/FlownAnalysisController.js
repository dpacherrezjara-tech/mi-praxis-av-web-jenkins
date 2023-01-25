Ext.define('Ext.Praxis.controller.screens.Dashboard01.tabs.FlownAnalysisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FlownAnalysisController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meIataCtr: '',
    bean: {},
    searchParams: {},
    beanDetail: {},
    beanDetalle: {},
    beanDetailCpn: {},
    beanDetailCabin: {},
    paramsFAFlight: {},
    paramsDetail2: {},
    paramsDetailCpn: {},
    paramsDetailCabin: {},
    paramsDetail: {},
    beanWK: {},
    paramsWK: {},
    meFlown: '',
    _path: '',
    dw_excel: false,
    boxActual: '-boxMainDataFA',
    meFA: '',
    DETALLE: '',
    BACK: '',
    BACKCABIN: '',
    strTipoCabin: '',
    drillDown: [],
    // </editor-fold>
    init: function (view) {
        meFlown = this;
        meFA = this;

        meFlown.panelActual = '-boxMainDataFA';
        meFlown.drillDown.push(meFlown.boxActual);

        prototypeProgram.view = 'screens-dashboard-01-form';
        prototypeProgram.nprog = 'PX00000109';
        prototypeProgram.title = 'Dashboard 1';
        prototypeProgram.modulo = '';

    },
    afterRender: function () {

        console.log('2---------FlownAnalysisController - after');

    },
    inicio: function () {

        console.log(' ----- Inicio Flow -------');

        meFlown.drillDown = [];
        Ext.getCmp(prototype.id + '-filterMain').hide();
        Ext.getCmp(prototype.id + '-panelRadio').hide();
        Ext.getCmp(prototype.id + '-boxFlownAnalysis').hide();
        this.setFormatParameter();
        var chkWP = Ext.getCmp(prototype.id + '-chkWP_FA').getValue();
        if (chkWP) {
            Ext.getCmp(prototype.id + '-filterMain').show();
            this.searchWK();
            Ext.getCmp(prototype.id + '-btnSwap_FA').setVisible(false);
            Ext.getCmp(prototype.id + '-panelGridSearchWK').setVisible(true);
            Ext.getCmp(prototype.id + '-boxMainDataFA').setVisible(false);
        } else {
            Ext.getCmp(prototype.id + '-filterMain').show();
            this.loadFAMonth();
            Ext.getCmp(prototype.id + '-btnSwap_FA').setVisible(true);
            Ext.getCmp(prototype.id + '-panelGridSearchWK').setVisible(false);
            Ext.getCmp(prototype.id + '-boxMainDataFA').setVisible(true);
        }
    },
    btnSearch_click: function (bean) {
        console.log(' 2--------FlownAnalysisController - btnSearch_click');

        Ext.getCmp(prototype.id + '-filterMain').hide();

        this.bean = bean;
        console.log(this.bean);

    },
    setFormatParameter: function () {
        meFA.bean = {};

        meFA.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbFADateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbFADateFromMonth').getValue();
        meFA.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbFADateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbFADateToMonth').getValue();

        meFA.searchParams = JSON.stringify(meFA.bean);

        console.log(meFA.bean)
    },
    loadFAMonth: function () {
        this.showGrid('-boxMainDataFA');
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadFAMonth'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxMainDataFA').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meFA.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-boxMainDataFA').unmask();
                    win.lblUser_toolTip("Estructura: A1972");

                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridFAmonth').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridFAmonth').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridFAmonth2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridFAmonth2').setStore(storeGridDatas);
    },
    searchWK: function () {
        this.showGrid('-panelGridSearchWK');
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchWK'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-panelGridSearchWK').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meFA.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-panelGridSearchWK').unmask();
                    win.lblUser_toolTip("Estructura: A1972");

                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else {
                        global.Msg({msg: res.sesion});
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridSearchWK').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displayDetWKChart01').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridSearchWK').setStore(storeGridDatas);
    },
    btnSwap_FA_click: function () {
        if (Ext.getCmp(prototype.id + '-gridFAmonth').isVisible()) {
            Ext.getCmp(prototype.id + '-gridFAmonth').setVisible(false);
            Ext.getCmp(prototype.id + '-gridFAmonth2').setVisible(true);
        } else {
            Ext.getCmp(prototype.id + '-gridFAmonth').setVisible(true);
            Ext.getCmp(prototype.id + '-gridFAmonth2').setVisible(false);
        }
    },
    chkWP_FA_click: function () {

        Ext.getCmp(prototype.id + '-chkWP_FA').getValue();
        Ext.getCmp(prototype.id + '-chkWP_FA').getValue();

        this.setFormatParameter;
        var chkWP = Ext.getCmp(prototype.id + '-chkWP_FA').getValue();
        if (chkWP) {
            this.searchWK();
            Ext.getCmp(prototype.id + '-btnSwap_FA').setVisible(false);
            Ext.getCmp(prototype.id + '-panelGridSearchWK').setVisible(true);
            Ext.getCmp(prototype.id + '-boxMainDataFA').setVisible(false);
        } else {
            this.loadFAMonth();
            Ext.getCmp(prototype.id + '-btnSwap_FA').setVisible(true);
            Ext.getCmp(prototype.id + '-panelGridSearchWK').setVisible(false);
            Ext.getCmp(prototype.id + '-boxMainDataFA').setVisible(true);
        }

    },
    viewDetFAFlight: function (param, column, e, row, column, x, rowData) {

        Ext.getCmp(prototype.id + '-radioFlownAnalysis').setValue({'rbgpDetail': 'MXN'});

        this.beanDetail = x.record.data;
        this.beanDetail.FLAG_VNR = param;
        meFA.paramsFAFlight.beanString = JSON.stringify(this.beanDetail);

        console.log(this.beanDetail);
        this.searchFlownFlight();

    },
    searchFlownFlight: function () {

        me.panelActual = '-boxFlownAnalysis';
        Ext.getCmp(prototype.id + '-panelRadio').show();

        win.lblUser_toolTip("Estructura: A1971");
        this.showGrid('-boxFlownAnalysis');

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchFlownFlight'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxFlownAnalysis').mask('Loading...');
                    obj.proxy.extraParams = meFA.paramsFAFlight;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-boxFlownAnalysis').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin_searchFlownFlight');
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

                        Ext.getCmp(prototype.id + '-gridFlownAnalysis').setTitle('<center style="font-size:12px;">' + ' Total by Month : ' + data.strFormatDate + '</center>');

                    }
//                    meFA.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridFlownAnalysis').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridFlownAnalysis').setStore(storeGridDatas);
        this.showPagination_clickHandler();
        Ext.getCmp(prototype.id + '-paggin_searchFlownFlight').bindStore(storeGridDatas);

    },
    viewDetail: function (param, column, e, row, column, x, rowData) {

        this.beanDetalle = x.record.data;

        meFA.DETALLE = param;
        meFA.paramsDetail2.beanString = JSON.stringify(this.beanDetalle);

        console.log(this.beanDetalle);
        this.searchDetail();

    },
    searchDetail: function () {

        me.panelActual = '-boxDetailData';
        Ext.getCmp(prototype.id + '-panelRadio').show();

        win.lblUser_toolTip("Estructura: A1971");
        this.showGrid('-boxDetailData');

        console.log(meFlown.drillDown);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxDetailData').mask('Loading...');
                    obj.proxy.extraParams = meFA.paramsDetail2;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-boxDetailData').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin_searchDetail');
                    var pagData = pag.getPageData();

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {

//                        console.log(obj.data);
                        var data = obj.data.items[0].data;
                        var titulo = ' Total by Month : ' + data.DFLIGHT.substring(0, 4) + '  ' + win.getAbreviaturaMes(data.DFLIGHT.substring(4, 6))

                        if (data.NPLANE !== '') {
                            titulo += '\tAircraft : ' + data.NPLANE;
                        } else if (data.ZONA !== '') {
                            titulo += '\tZone : ' + data.strZona;
                        }
                        if (data.NFLIGHT !== '') {
                            titulo += '\tFlight : ' + data.NFLIGHT;
                        }
                        if (data.CDEPART !== '' && data.CARRIVA !== '') {
                            titulo += '\tRoute : ' + data.CDEPART + ' ' + data.CARRIVA;
                        }

                        Ext.getCmp(prototype.id + '-gridDetailData').setTitle('<center style="font-size:12px;">' + titulo + '</center>');

                    }
//                    meFA.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDetailData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetailData').setStore(storeGridDatas);
        this.showPagination_clickHandler();
        Ext.getCmp(prototype.id + '-paggin_searchDetail').bindStore(storeGridDatas);

    },
    viewDetailByCupon: function (param, column, e, row, column, x, rowData) {

        this.beanDetailCpn = x.record.data;

        meFA.BACK = param;
        meFA.paramsDetailCpn.beanString = JSON.stringify(this.beanDetailCpn);

        console.log(this.beanDetailCpn);
        this.searchDetByCoupon();

    },
    searchDetByCoupon: function () {

        me.panelActual = '-boxCoupon';
        Ext.getCmp(prototype.id + '-panelRadio').show();

        win.lblUser_toolTip("Estructura: A1692");
        this.showGrid('-boxCoupon');

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetByCoupon'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxCoupon').mask('Loading...');
                    obj.proxy.extraParams = meFA.paramsDetailCpn;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-boxCoupon').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin_searchDetByCoupon');
                    var pagData = pag.getPageData();
                    console.log(pagData);
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {

//                        console.log(obj.data);
                        var data = obj.data.items[0].data;
                        var NPLANE = '';

                        if (data.strDescripcion !== '') {
                            NPLANE = '\t Aircraft :' + data.strDescripcion;
                        }

                        var titulo = 'Flight Date : ' + data.strFormatDate + '\t Flight Number : ' + data.NFLIGHT
                                + '\t Orig : ' + data.CDEPART + '\t Dest : ' + data.CARRIVA + NPLANE + '\t' + meFA.strTipoCabin;

                        Ext.getCmp(prototype.id + '-gridCoupon').setTitle('<center style="font-size:12px;">' + titulo + '</center>');

                    }
//                    meFA.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridCoupon').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridCoupon').setStore(storeGridDatas);
        this.showPagination_clickHandler();
        Ext.getCmp(prototype.id + '-paggin_searchDetByCoupon').bindStore(storeGridDatas);

    },
    // ----------------------------------------------------------------------
    viewDetailByCabin: function (Cabin, detail, column, e, row, column, x, rowData) {

        this.beanDetailCabin = x.record.data;

        meFA.BACKCABIN = detail;

        if (Cabin === 'J') {
            meFA.strTipoCabin = 'Cabin : Business';
        } else if (Cabin === 'Y') {
            meFA.strTipoCabin = 'Cabin : Economy';
        } else if (Cabin === 'F') {
            meFA.strTipoCabin = 'Cabin : First';
        } else if (Cabin === 'NR') {
            meFA.strTipoCabin = '* Not Revenue *';
        } else {
            meFA.strTipoCabin = '';
        }

        console.log(meFA.strTipoCabin);

        if (Cabin !== 'F') {

            this.beanDetailCabin.IN_CABI = Cabin;
            meFA.paramsDetailCabin.beanString = JSON.stringify(this.beanDetailCabin);

//            console.log(this.beanDetailCabin);
            this.searchByCabin();

        } else {
            global.Msg({msg: 'Data not found.'});
        }

    },
    searchByCabin: function () {

        me.panelActual = '-boxDetailByCabin';
        Ext.getCmp(prototype.id + '-panelRadio').show();

        win.lblUser_toolTip("Estructura: A1971");
        this.showGrid('-boxDetailByCabin');

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchByCabin'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxDetailByCabin').mask('Loading...');
                    obj.proxy.extraParams = meFA.paramsDetailCabin;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-boxDetailByCabin').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin_searchByCabin');
                    var pagData = pag.getPageData();

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        console.log(me.strTipoCabin);
                        console.log(meFA.strTipoCabin);

//                        console.log(obj.data);
                        var data = obj.data.items[0].data;
                        var lblCityPair = '';

                        if (data.ZONA !== '') {
                            lblCityPair = '\t Zone : ' + data.strZona;
                        }
                        if (data.NFLIGHT !== '') {
                            lblCityPair = '\t Flight Number : ' + data.NFLIGHT;
                        }
                        if (data.CDEPART !== '') {
                            lblCityPair = lblCityPair + '\t Orig : ' + data.CDEPART + '\t Dest : ' + data.CARRIVA;
                        }

                        var titulo = 'Flight Date : ' + data.strFormatDate2 + lblCityPair + '\t ' + meFA.strTipoCabin;

                        Ext.getCmp(prototype.id + '-gridDetailByCabin').setTitle('<center style="font-size:12px;">' + titulo + '</center>');

                    }
//                    meFA.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDetailByCabin').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetailByCabin').setStore(storeGridDatas);
        this.showPagination_clickHandler();
        Ext.getCmp(prototype.id + '-paggin_searchByCabin').bindStore(storeGridDatas);

    },
    ChangueFlown_clickHandler: function (a, value, c, d, e, f) {

        switch (value.rbgpDetail) {
            case 'Z':

                this.beanDetail.ZONA = '';
                this.beanDetail.NPLANE = '';
                this.beanDetail.CDEPART = '';
                this.beanDetail.CARRIVA = '';

                this.searchByZone(this.beanDetail);
                break;
            case 'C':
                this.beanDetail.ZONA = '';
                this.beanDetail.NPLANE = '';
                this.beanDetail.CDEPART = '';
                this.beanDetail.CARRIVA = '';

                this.searchByCityPair(this.beanDetail);
                break;
            case 'P':
                this.beanDetail.ZONA = '';
                this.beanDetail.NPLANE = '';
                this.beanDetail.CDEPART = '';
                this.beanDetail.CARRIVA = '';

                this.searchByNPlane(this.beanDetail);
                break;
            case 'MXN':
                this.beanDetail.ZONA = '';
                this.beanDetail.NPLANE = '';
                this.beanDetail.CDEPART = '';
                this.beanDetail.CARRIVA = '';

                this.searchFlownFlight(this.beanDetail);
                break;
            case 'FP':
                this.beanDetail.ZONA = '';
                this.beanDetail.NPLANE = '';
                this.beanDetail.CDEPART = '';
                this.beanDetail.CARRIVA = '';

                this.searchByFlightProfitability(this.beanDetail);
                break;
        }

        meFA.paramsDetail.beanString = JSON.stringify(this.beanDetail);

    },
    searchByZone: function (byBean) {
        win.lblUser_toolTip("Estructura: A1971");
        this.hidePagination_clickHandler();
        this.showGrid('-boxByZone');

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchByZone'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxByZone').mask('Loading...');
                    obj.proxy.extraParams = meFA.paramsDetail;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-boxByZone').unmask();

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-gridDataByZone').setTitle('<center style="font-size:12px;">' + ' Total by Month : ' + data.strFormatDate + '</center>');
                    }
//                    meFA.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataByZone').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataByZone').setStore(storeGridDatas);

    },
    searchByCityPair: function (byBean) {

        me.panelActual = '-boxByCityPair';
        win.lblUser_toolTip("Estructura: A1971");
        this.showGrid('-boxByCityPair');

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchByCityPair'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxByCityPair').mask('Loading...');
                    obj.proxy.extraParams = meFA.paramsDetail;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-boxByCityPair').unmask();

                    var pag = Ext.getCmp(prototype.id + '-paggin_searchByCityPair');
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
                        Ext.getCmp(prototype.id + '-gridDataByCityPair').setTitle('<center style="font-size:12px;">' + ' Total by Month : ' + data.strFormatDate + '</center>');
                    }
//                    meFA.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataByCityPair').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataByCityPair').setStore(storeGridDatas);
        this.showPagination_clickHandler();
        Ext.getCmp(prototype.id + '-paggin_searchByCityPair').bindStore(storeGridDatas);

    },
    searchByNPlane: function (byBean) {
        win.lblUser_toolTip("Estructura: A1971");
        this.hidePagination_clickHandler();
        this.showGrid('-boxByNPlane');

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchByNPlane'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxByNPlane').mask('Loading...');
                    obj.proxy.extraParams = meFA.paramsDetail;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-boxByNPlane').unmask();
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').setTitle('<center style="font-size:12px;">' + ' Total by Month : ' + data.strFormatDate + '</center>');
                    }
//                    meFA.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);

    },
    searchByWK: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        win.lblUser_toolTip("Estructura: A1971");
        //this.hidePagination_clickHandler();
        console.log(rowData.data.strFormatDate);
        me.panelActual = '-panelWKperMonth';
        meFlown.boxActual === '-panelWKperMonth'
        this.showGrid('-panelWKperMonth');
        Ext.getCmp(prototype.id + '-panelGridSearchWK').setVisible(false);
        Ext.getCmp(prototype.id + '-panelWKperMonth').setVisible(true);

        this.beanWK.DFLIGHT = rowData.data.DFLIGHT;
        this.paramsWK.beanString = JSON.stringify(this.beanWK);

        this.searchByWK1(this.paramsWK);
    },
    searchByWK1: function (paramsWK) {
        me.panelActual = '-panelWKperMonth';
        meFlown.boxActual === '-panelWKperMonth'
        win.lblUser_toolTip("Estructura: A1972");
        this.showGrid('-panelWKperMonth');

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchWKperMonth'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-panelWKperMonth').mask('Loading...');
                    obj.proxy.extraParams = meFA.paramsWK;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-panelWKperMonth').unmask();

                    var pag = Ext.getCmp(prototype.id + '-paggin_searchByFlightProfitability');
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
                        //Ext.getCmp(prototype.id + '-gridWKperMonth').setTitle('<center style="font-size:12px;">' + ' Total by Month : ' + data.strFormatDate + '</center>');
                    }
//                    meFA.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridWKperMonth').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridWKperMonth').setStore(storeGridDatas);
        this.showPagination_clickHandler();
        Ext.getCmp(prototype.id + '-gridWKperMonth').bindStore(storeGridDatas);
    },
    searchByFlightProfitability: function (byBean) {
        me.panelActual = '-boxByFlightProfitability';
        win.lblUser_toolTip("Estructura: A1971");
        this.showGrid('-boxByFlightProfitability');

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchByFlightProfitability'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxByFlightProfitability').mask('Loading...');
                    obj.proxy.extraParams = meFA.paramsDetail;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-boxByFlightProfitability').unmask();

                    var pag = Ext.getCmp(prototype.id + '-paggin_searchByFlightProfitability');
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
                        Ext.getCmp(prototype.id + '-gridDataByFlightProfitability').setTitle('<center style="font-size:12px;">' + ' Total by Month : ' + data.strFormatDate + '</center>');
                    }
//                    meFA.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataByFlightProfitability').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataByFlightProfitability').setStore(storeGridDatas);
        this.showPagination_clickHandler();
        Ext.getCmp(prototype.id + '-paggin_searchByFlightProfitability').bindStore(storeGridDatas);
    },
    showGrid: function (nameGrid) {

        Ext.getCmp(prototype.id + meFlown.boxActual).hide();
        meFlown.boxActual = nameGrid;

        if (meFlown.boxActual === '-boxMainDataFA' || meFlown.boxActual === '-panelGridSearchWK' || meFlown.boxActual === '-boxMainDataREvsCO') {
            Ext.getCmp(prototype.id + '-filterMain').show();
        } else {
            Ext.getCmp(prototype.id + '-filterMain').hide();
        }

        console.log(meFA.DETALLE);

        if (!meFlown.drillDown.includes(meFlown.boxActual)) {
            if (nameGrid !== '-boxByZone' && nameGrid !== '-boxByCityPair' && nameGrid !== '-boxByNPlane' && nameGrid !== '-boxByFlightProfitability') {
                meFlown.drillDown.push(meFlown.boxActual);
            } else {
                if (meFlown.boxActual === '-boxByZone' && meFA.DETALLE === '') {
                    meFlown.drillDown.push(meFlown.boxActual);
                } else if (meFlown.boxActual === '-boxByCityPair') {
                    meFlown.drillDown.push(meFlown.boxActual);
                } else if (meFlown.boxActual === '-boxByFlightProfitability') {
                    meFlown.drillDown.push(meFlown.boxActual);
                }
            }
        }
        console.log(meFlown.drillDown);

        Ext.getCmp(prototype.id + meFlown.boxActual).show();

    },
    imgBack_clickHandler: function () {

        console.log(meFlown.drillDown);
        console.log(meFlown.boxActual);
        if (meFlown.drillDown.length > 1) {


            if (meFlown.boxActual === '-boxByZone' || meFlown.boxActual === '-boxByCityPair' || meFlown.boxActual === '-boxByFlightProfitability') {
                console.log('waaaaaaaaaaa');
            } else {
                Ext.getCmp(prototype.id + meFlown.boxActual).hide();
                meFlown.drillDown.pop();
                meFlown.boxActual = meFlown.drillDown[meFlown.drillDown.length - 1];
                Ext.getCmp(prototype.id + meFlown.boxActual).show();
            }

            if (meFlown.boxActual === '-boxMainDataFA' || meFlown.boxActual === '-panelGridSearchWK' || meFlown.boxActual === '-boxMainDataREvsCO') {
                Ext.getCmp(prototype.id + '-filterMain').show();
            } else {
                Ext.getCmp(prototype.id + '-filterMain').hide();
            }

            if (meFlown.boxActual === '-boxMainDataFA') {
                Ext.getCmp(prototype.id + '-panelRadio').hide();
                this.hidePagination_clickHandler();

            } else if (meFlown.boxActual === '-boxFlownAnalysis') {
                me.panelActual = '-boxFlownAnalysis';

                var pag = Ext.getCmp(prototype.id + '-paggin_searchFlownFlight');
                var pagData = pag.getPageData();

                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

            } else if (meFlown.boxActual === '-boxDetailData') {
                me.panelActual = '-boxDetailData';

                var pag = Ext.getCmp(prototype.id + '-paggin_searchDetail');
                var pagData = pag.getPageData();

                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            } else if (meFlown.boxActual === '-boxDetailByCabin') {
                me.panelActual = '-boxDetailByCabin';

                var pag = Ext.getCmp(prototype.id + '-paggin_searchByCabin');
                var pagData = pag.getPageData();

                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        }
//        console.log('imgBack_clickHandler == ' + me.drillDown);
        
    },
    showPagination_clickHandler: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        Ext.getCmp(prototype.id + '-lblPagination').show();
    },
    hidePagination_clickHandler: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').hide();
        Ext.getCmp(prototype.id + '-lblPagination').hide();
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.buscarFlown();
        }
    },
    buscarFlown: function (obj, e, eOpts) {

        var nFlight = Ext.getCmp(prototype.id + '-txtNFLIGHT').getValue();
        var cPair = Ext.getCmp(prototype.id + '-txtCPAIR').getValue();

        if (nFlight !== "" && nFlight.length !== 4) {
            global.Msg({msg: 'Flight Number must be 4 digits.'});
        } else if (cPair !== "" && cPair.length !== 3 && cPair.length !== 6) {
            global.Msg({msg: 'Invalid City Pair'});
        } else {

//            this.beanDetail = {};

            this.beanDetail.IN_NFLIGHT = nFlight;
            this.beanDetail.IN_CPAIR = cPair;

            meFA.paramsFAFlight.beanString = JSON.stringify(this.beanDetail);
            meFA.paramsDetail.beanString = JSON.stringify(this.beanDetail);

            console.log(this.beanDetail);

            var selectedValue = Ext.getCmp(prototype.id + '-radioFlownAnalysis').getValue().rbgpDetail;
            switch (selectedValue) {
                case 'Z':
                    this.searchByZone(this.beanDetail);
                    break;
                case 'C':
                    this.searchByCityPair(this.beanDetail);
                    break;
                case 'P':
                    this.searchByNPlane(this.beanDetail);
                    break;
                case 'MXN':
                    this.searchFlownFlight(this.beanDetail);
                    break;
                case 'FP':
                    this.searchByFlightProfitability(this.beanDetail);
                    break;
            }
            //this.searchFlownFlight();

        }
    },
    displayMasterTkt_clickHandler: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.strTicket.trim();
        var beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(8, 6);
//        beanProMasterTicket.IN_SEQ = '00';

//        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'Dashboard1', beanProMasterTicket);
    },
});
