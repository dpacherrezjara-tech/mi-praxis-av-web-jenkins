Ext.define('Ext.Praxis.controller.screens.Dashboard01.tabs.SalesAnalysisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesAnalysisController',
    childs: '5',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    columns2: {},
    bean: {},
    beanCityPair: {},
    beanDet: {},
    beanCountryCity: {},
    beanAgent: {},
    paramsCountryCity: {},
    beanFareType: {},
    beanFareTypeZone: {},
    paramsFareType: {},
    paramsFareTypeZone: {},
    paramsAgent: {},
    beanGDSDet: {},
    beanGDSDetAg: {},
    beanGDSDetTkt: {},
    meSales: '',
    beanAllianceDet: {},
    beanAllianceDetPais: {},
    beanAllianceDetAgente: {},
    beanDetRoutingType: {},
    dataRoute_chart: [],
    dataFareType_chart: [],
    meCompare: '',
    gridActual: '',
    panelActual: '',
    GROUPBY: '',
    gloSelOpt: '',
    lstFinal: [],
    dw_excel: false,
    boxActual: '-boxMainData',
    drillDown: [],
    _path: '',
    // </editor-fold>
    init: function (view) {
        me = this;
        mePie = this;
        meCompare = this;
//        prototype.id = 'Dashboard01Form';
//        prototype.url = CONTEXTPATH + '/Dashboard01';
//        prototype.urlMaster = CONTEXTPATH + '/MasterController';
//        
//        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
//        console.log(this.childs);
        me.panelActual = '-boxMainData';
//        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        console.log(me.childs);
        me.drillDown.push(me.boxActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
//            '#Dashboard01Form-xpanel': {
//                afterrender: this.xpanel_afterrender
//            },
//            '#Dashboard01Form-btnSearch': {
//                click: this.btnSearch_click
//            },
//            '#Dashboard01Form-btnClear': {
//                click: this.btnClear_click
//            },
//            '#Dashboard01Form-btnExcel': {
//                click: this.btnExcel_click
//            },
//            '#Dashboard01Form-btnFilter': {
//                click: this.btnFilter_click
//            },
//            '#Dashboard01Form-btnBack': {
//                click: this.btnBack_click
//            },
//            '#Dashboard01Form-btn-pag-first': {
//                click: this.pagFirst
//            },
//            '#Dashboard01Form-btn-pag-previous': {
//                click: this.pagPrevious
//            },
//            '#Dashboard01Form-btn-pag-next': {
//                click: this.pagNext
//            },
//            '#Dashboard01Form-btn-pag-last': {
//                click: this.pagLast
//            }
        });

    },
    /*
     btnSearch_click: function (bean) {
     
     console.log('1--------------- SalesAnalysisController - btnSearch_clickwaaaaaaaaaaaaaaaaaa');
     this.bean = bean;
     console.log(this.bean);
     this.setFormatParameter();
     this.search();
     },
     setFormatParameter: function () {
     //        me.bean = {};
     var beanString = JSON.stringify(this.bean);
     this.searchParams = beanString;
     console.log(this.bean);
     },
     */
    imgSearch_clickHandler: function () {
        console.log('imgSearch_clickHandler - Sales Analysis');
    },
    afterRender: function () {

        console.log('1-----------------------SalesAnalysisController - afterweeeeeeeeeeee');
    },
    inicio: function () {
//        this.hidePagination_clickHandler();
        meSales.drillDown = [];
        console.clear();
        console.log('1-----------------------SalesAnalysisController - INICIOOOOOOOOOOO');
        this.setFormatParameter();

        var opcion = "1";

        console.log(gloSelOpt);
        switch (gloSelOpt) {
            case '1':
                GROUPBY = 'MONTH';
                if (me.bean.IN_NR === 'true') {
                    this.searchByNR();
                } else {
                    this.search();
                }
                break;
            case '2':
                GROUPBY = 'MONTH';
                this.loadCountryOfSale();
                break;
            case "3": //City of Sale
                GROUPBY = 'CITYS';
                this.loadCityOfSale();
                break;
            case "4"://City Pair
                GROUPBY = 'CITYPAIR';
//                me.beanCityPair.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
//                me.beanCityPair.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
//                me.beanCityPair.IN_PAIS = Ext.getCmp(prototype.id + '-cmbPais').getValue();
//                me.beanCityPair.IN_CITYPAIR = txtPairs.text.toUpperCase();
//                me.beanCityPair.IN_ORDER = '';
                this.loadCityPair();
                break;
            case "5"://Sales Agent
                GROUPBY = 'AGENT';
//                bean.CANAV = '';
//                bean.IN_ONOFF = '';
//                Activar_PBar();
                this.loadSalesAgent();
//                resetearOpcionesSA();
                break;
            case "6"://Alliances
                GROUPBY = 'ALLIANCES';
                this.loadAlliances();
                break;
            case "7"://Totals By Channel
                GROUPBY = 'CHANNEL';
                this.loadChannels();
                break;
            case "8"://Totals By Cabin
                GROUPBY = 'CABIN';
                this.loadCabin();
                break;
            case "10"://Fare Type
                GROUPBY = 'FARE';
                this.loadFareType();
                break;
            case "11"://Route type
                GROUPBY = 'ROUT';
                this.loadTypeRoute();
                break;
            case "17"://Alliances
                GROUPBY = 'GDS';
                this.loadGDS();
                break;
            case "18"://COMPARE
                GROUPBY = 'COMPARE';
                this.loadCompareSale('P');
                break;

            case "19"://COMPARE DAY
                GROUPBY = 'COMPAREDAY';
                this.loadCompareSaleDay();
                break;
        }
    },
    setFormatParameter: function () {
        me.bean = {};
        gloSelOpt = Ext.getCmp(prototype.id + '-cmbSelectBy').getValue();

        Ext.getCmp(prototype.id + '-chkRN').show();
        Ext.getCmp(prototype.id + '-cmbSelectBy').setReadOnly(false);
        Ext.getCmp(prototype.id + '-cmbPais').setReadOnly(false);
        Ext.getCmp(prototype.id + '-cmbDateToYear').show();
        Ext.getCmp(prototype.id + '-cmbDateToMonth').show();
        Ext.getCmp(prototype.id + '-lblTop').show();
        me.bean.strSelectedBy = gloSelOpt;

        if (gloSelOpt === '19') {
            Ext.getCmp(prototype.id + '-cmbDateToYear').hide();
            Ext.getCmp(prototype.id + '-cmbDateToMonth').hide();
            Ext.getCmp(prototype.id + '-lblTop').hide();

            me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
            me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        } else if (gloSelOpt === '4') {
            me.bean.IN_TSALES = Ext.getCmp(prototype.id + '-radiogroupType_cp1').getValue().rbgType_cp1;
            me.bean.IN_ONOFF = Ext.getCmp(prototype.id + '-radiogroupType_cp2').getValue().rbgType_cp2;
            me.bean.IN_CITYPAIR = Ext.getCmp(prototype.id + '-txtPairs').getValue().toUpperCase();
            me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
            me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        } else if (gloSelOpt === '5') {
            me.bean.CANAV = Ext.getCmp(prototype.id + '-radiogroupType_sa1').getValue().rbgType_sa1;
            me.bean.IN_ONOFF = Ext.getCmp(prototype.id + '-radiogroupType_sa2').getValue().rbgType_sa2;
            me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
            me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        } else if (gloSelOpt === '8') {
            var chkCabin = Ext.getCmp(prototype.id + '-chkCabin').getValue();
            if (chkCabin) {
                me.bean.IN_CITYPAIR = "S"
            } else {
                me.bean.IN_CITYPAIR = ""
            }
            me.bean.IN_ONOFF = Ext.getCmp(prototype.id + '-radiogroupType_ca').getValue().rbgType_ca;
            me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
            me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        } else {
            me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
            me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        }
         me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
         me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.strYearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + '';
        me.bean.strMonthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() + '';
        me.bean.strYearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + '';
        me.bean.strMonthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() + '';
        me.bean.IN_PAIS = Ext.getCmp(prototype.id + '-cmbPais').getValue();
        me.bean.IN_TOP = Ext.getCmp(prototype.id + '-cmbTop').getValue();
        me.bean.IN_NR = Ext.getCmp(prototype.id + '-chkRN').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        console.log(searchParams);

    },
    search: function () {
        console.log('searchParams');
        console.log('searchParams');
        console.log('searchParams');
        this.setFormatParameter();
        console.log(searchParams);
        console.log('searchParams');
        console.log('searchParams');
        console.log('searchParams');
        win.lblUser_toolTip("Estructura: IMF080");
        this.showGrid('-boxMainData');
//        me.panelActual = '-boxMainData';
//        console.log(me.panelActual);
//        global.selectedChild(me.childs, prototype.id + me.panelActual);

        Ext.Ajax.request({
            url: prototype.url + '/searchTest',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.lstData.length === 0) {
                    global.Msg({
                        msg: 'Data not found.'
                    });
                } else {
                    var totals = res.lstData[0][0]; //P_SALES_PER_MONTH_TOTALS
                    var lstData = res.lstData[1]; //P_SALES_PER_MONTH_DATA
                    //
                    console.log(lstData);
                    var storeData = Ext.create('Ext.data.Store', {
                        data: lstData,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridData').bindStore(storeData);

                    Ext.getCmp(prototype.id + '-lblTotalCpns').setText(Ext.util.Format.number(totals.TOTAL_CUPONS, '0,000'));
                    Ext.getCmp(prototype.id + '-lblTotalAmount').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT, '0,000'));
                    Ext.getCmp(prototype.id + '-totAVG').setText(Ext.util.Format.number(totals.totAVG, '0,000.00'));

                    Ext.getCmp(prototype.id + '-lblTotalCpnON').setText(Ext.util.Format.number(totals.TOTAL_CUPONS_ON, '0,000'));
                    Ext.getCmp(prototype.id + '-lblTotalCpnONPerc').setText(Ext.util.Format.number(totals.CUPONS_ON_PERCENT, '0,000.00'));
                    Ext.getCmp(prototype.id + '-lblTotalAmountON').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT_ON, '0,000'));
                    Ext.getCmp(prototype.id + '-lblTotalAmountONPerc').setText(Ext.util.Format.number(totals.AMOUNT_ON_PERCENT, '0,000.00'));
                    Ext.getCmp(prototype.id + '-lblTotalAvgON').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT_ON_AVG_RATE, '0,000.00'));

                    Ext.getCmp(prototype.id + '-lblTotalCpnOFF').setText(Ext.util.Format.number(totals.TOTAL_CUPONS_OFF, '0,000'));
                    Ext.getCmp(prototype.id + '-lblTotalCpnOFFPerc').setText(Ext.util.Format.number(totals.CUPONS_OFF_PERCENT, '0,000.00'));
                    Ext.getCmp(prototype.id + '-lblTotalAmountOFF').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT_OFF, '0,000'));
                    Ext.getCmp(prototype.id + '-lblTotalAmountOFFPerc').setText(Ext.util.Format.number(totals.AMOUNT_OFF_PERCENT, '0,000.00'));
                    Ext.getCmp(prototype.id + '-lblTotalAvgOFF').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT_OFF_AVG_RATE, '0,000.00'));

                    Ext.getCmp(prototype.id + '-lblTotalQCPNSNR').setText(Ext.util.Format.number(totals.TOTAL_QCPNS0, '0,000'));
                    Ext.getCmp(prototype.id + '-lblTotalAMOUNTNR').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT0, '0,000'));
                }


            }
        });

//        me.dw_excel = false;

    },
    GridDDTMtotalperMonth_colHandler: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

//        me.drillDown.push(me.panelActual);
//        me.panelActual = '-BoxDDTMCountryofSale';
//        console.log('1111');
//        console.log(prototype.id);
//        console.log(me.childs);
//        console.log(me.panelActual);
//        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        console.log('2222');
//        var dataIndex = Ext.getCmp(prototype.id + '-gridDetail').headerCt.getGridColumns()[columnNum].dataIndex;
        this.showGrid('-BoxDDTMCountryofSale');
        var cant = 0;
        console.log(columnNum);
        switch (columnNum) {
            case 0 :
                rowData.data.TYPE = '1';
                break;
            case 1 :
                rowData.data.TYPE = '2';
                break;
        }

        this.beanCountryCity.IN_FECHA_FROM = rowData.data.IN_FECHA_FROM;
        this.beanCountryCity.IN_FECHA_TO = rowData.data.IN_FECHA_TO;
        this.beanCountryCity.TYPE = rowData.data.TYPE;
        this.beanCountryCity.CARRIER = rowData.data.CARRIER;

        this.beanCountryCity.strFormatDate = rowData.data.strFormatDate;
        this.beanCountryCity.ALLIC = rowData.data.ALLIC;
        this.beanCountryCity.IN_PAIS = rowData.data.IN_PAIS;
        this.beanCountryCity.COUNTRY = rowData.data.COUNTRY;
        this.beanCountryCity.COUNTRY_NAME = rowData.data.COUNTRY_NAME;
        this.beanCountryCity.CARRIER = rowData.data.CARRIER;

        this.beanCountryCity.DSALES = rowData.data.DSALES;
        this.beanCountryCity.strDescription = rowData.data.strDescription;

        this.paramsCountryCity.beanString = JSON.stringify(this.beanCountryCity);
        console.log(this.beanCountryCity);
        this.loadDDTpMCountryofSale(this.paramsCountryCity, this.beanCountryCity);
    },
    loadDDTpMCountryofSale: function (paramsCountryCity, bean) {
        win.lblUser_toolTip("Estructura: IMF082");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadDDTpMCountryofSale'
            }, listeners: {
                beforeload: function (obj) {
//                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = paramsCountryCity;
                },
                load: function (obj) {
//                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
//                    var pag = Ext.getCmp(prototype.id + '-paggin2');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                        console.log(data);

                        if (bean.TYPE === "2") {
                            Ext.getCmp(prototype.id + '-lbl_Country').setText('City of Sale');
                        } else {
                            Ext.getCmp(prototype.id + '-lbl_Country').setText('Country of Sale');
                        }
                        var tit = Ext.getCmp(prototype.id + '-gridCountryofSale');
                        tit.setTitle('<center style="font-size:12px;">' + data.strDescription5 + '</center>');

                        Ext.getCmp(prototype.id + '-lblCUPON').setText(Ext.util.Format.number(data.TOTAL_CUPONS, '0,000'));
                        Ext.getCmp(prototype.id + '-lblAMOUNT').setText(Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000'));
                        Ext.getCmp(prototype.id + '-lblTARIFA').setText(Ext.util.Format.number(data.TOTAL_AVG, '0,000.00'));
                        Ext.getCmp(prototype.id + '-lblTotalDC_QCPNSNR').setText(Ext.util.Format.number(data.TOTAL_QCPNS0, '0,000'));
                        Ext.getCmp(prototype.id + '-lblTotalDC_AMOUNTNR').setText(Ext.util.Format.number(data.TOTAL_AMOUNT0, '0,000'));
                    }
//                    me.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridCountryofSale').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    GridDDTMDetailbyAgent_colHandler: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

//        me.drillDown.push(me.panelActual);
//        me.panelActual = '-BoxDDTMCountryofSale';
//        console.log(prototype.id);
//        console.log(me.childs);
//        console.log(me.panelActual);
//        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.showGrid('-BoxDDTMDetailbyAgent');

        var cant = 0;
        console.log(columnNum);
        switch (columnNum) {
            case 1 :
                rowData.data.TYPE = '1';
                break;
            case 2 :
                rowData.data.TYPE = '2';
                break;
        }

        this.beanAgent.TYPE = rowData.data.TYPE;

        this.beanAgent.strFormatDate = rowData.data.strFormatDate;
        this.beanAgent.ALLIC = rowData.data.ALLIC;
        this.beanAgent.IN_PAIS = rowData.data.IN_PAIS;
        this.beanAgent.COUNTRY = rowData.data.COUNTRY;
        this.beanAgent.COUNTRY_NAME = rowData.data.COUNTRY_NAME;
        this.beanAgent.CARRIER = rowData.data.CARRIER;
        this.beanAgent.strDescription5 = rowData.data.strDescription5;

        this.beanAgent.DSALES = rowData.data.DSALES;
        this.beanAgent.IN_FECHA_FROM = rowData.data.IN_FECHA_FROM;
        this.beanAgent.IN_FECHA_TO = rowData.data.IN_FECHA_TO;

        console.log(rowData.data);

        this.paramsAgent.beanString = JSON.stringify(this.beanAgent);
        console.log(this.beanAgent);
        this.loadDDTpMAgent(this.paramsAgent);
    },
    loadDDTpMAgent: function (paramsAgent) {
        me.panelActual = '-BoxDDTMDetailbyAgent';
        this.showPagination_clickHandler();

        win.lblUser_toolTip("Estructura: IMF084");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadDDTpMAgent'
            }, listeners: {
                beforeload: function (obj) {
//                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = paramsAgent;
                },
                load: function (obj) {
//                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin3');
                    var pagData = pag.getPageData();
                    console.log(pagData);
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
//                        me.panelActual = '-BoxDDTMDetailbyAgent';
                        var data = obj.data.items[0].data;
                        console.log(data);

                        var tit = Ext.getCmp(prototype.id + '-gridDetailbyAgent');
//                        var titSL = Ext.getCmp(prototype.id + '-gridDetailbyAgentSL');
                        tit.setTitle('<center style="font-size:12px;">' + data.strDescription5 + '</center>');
//                        titSL.setTitle('<center style="font-size:12px;">' + data.strDescription5 + '</center>');
//
                        Ext.getCmp(prototype.id + '-lblCUPON_Ag').setText(Ext.util.Format.number(data.TOTAL_CUPONS, '0,000'));
////                        Ext.getCmp(prototype.id + '-lblCUPON').setText('100%');
                        Ext.getCmp(prototype.id + '-lblAMOUNT_Ag').setText(Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000'));
                        Ext.getCmp(prototype.id + '-lblTARIFA_Ag').setText(Ext.util.Format.number(data.TOTAL_AVG, '0,000.00'));
                        Ext.getCmp(prototype.id + '-lblTotalDA_QCPNSNR').setText(Ext.util.Format.number(data.TOTAL_QCPNS0, '0,000'));
                        Ext.getCmp(prototype.id + '-lblTotalDA_AMOUNTNR').setText(Ext.util.Format.number(data.TOTAL_AMOUNT0, '0,000'));
                    }
//                    mePie.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDetailbyAgent').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-gridDetailbyAgentSL').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    loadCountryOfSale: function () {
        win.lblUser_toolTip("Estructura: IMF082");

        this.showGrid('-BoxCountryOfSale');
        Ext.Ajax.request({
            url: prototype.url + '/loadCountryOfSale',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                var data = res.data[0];

                var storeData = Ext.create('Ext.data.Store', {
                    data: res.data,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridCountryOfSale').bindStore(storeData);

                Ext.getCmp(prototype.id + '-tot1_CUPONS').setText(Ext.util.Format.number(data.TOTAL_CUPONS, '0,000'));
                Ext.getCmp(prototype.id + '-tot1_AMOUNT').setText(Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000'));

                Ext.getCmp(prototype.id + '-tot1_CUPONS_ON').setText(Ext.util.Format.number(data.TOTAL_CUPONS_ON, '0,000'));
                Ext.getCmp(prototype.id + '-tot1_AMOUNT_ON').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_ON, '0,000'));
                Ext.getCmp(prototype.id + '-tot1_AMOUNT_ON_AVG').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_ON_PERCENT, '0,000.00'));
                Ext.getCmp(prototype.id + '-tot1_AMOUNT_ON_AVG_RATE').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_ON_AVG_RATE, '0,000.00'));
//
                Ext.getCmp(prototype.id + '-tot1_CUPONS_OFF').setText(Ext.util.Format.number(data.TOTAL_CUPONS_OFF, '0,000'));
                Ext.getCmp(prototype.id + '-tot1_AMOUNT_OFF').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_OFF, '0,000'));
                Ext.getCmp(prototype.id + '-tot1_AMOUNT_OFF_AVG').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_OFF_PERCENT, '0,000.00'));
                Ext.getCmp(prototype.id + '-tot1_AMOUNT_OFF_AVG_RATE').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_OFF_AVG_RATE, '0,000.00'));

                Ext.getCmp(prototype.id + '-lblTotalC_QCPNSNR').setText(Ext.util.Format.number(data.TOTAL_QCPNS0, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblTotalC_AMOUNTNR').setText(Ext.util.Format.number(data.TOTAL_AMOUNT0, '0,000.00'));

            }
        });

//        me.dw_excel = false;

    },
    loadCityOfSale: function () {
        win.lblUser_toolTip("Estructura: IMF082");

        this.showGrid('-BoxCityOfSale');
        Ext.Ajax.request({
            url: prototype.url + '/loadCityOfSale',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                var data = res.data[0];

                var storeData = Ext.create('Ext.data.Store', {
                    data: res.data,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridCityOfSale').bindStore(storeData);

                Ext.getCmp(prototype.id + '-lblCiSTotalCPN').setText(Ext.util.Format.number(data.TOTAL_CUPONS, '0,000'));
                Ext.getCmp(prototype.id + '-lblCiSTotalUSD').setText(Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000'));

                Ext.getCmp(prototype.id + '-lblCiSTotalCPNOn').setText(Ext.util.Format.number(data.TOTAL_CUPONS_ON, '0,000'));
                Ext.getCmp(prototype.id + '-lblCiSTotalUSDOn').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_ON, '0,000'));
                Ext.getCmp(prototype.id + '-lblCiSTotalCPNOff').setText(Ext.util.Format.number(data.TOTAL_CUPONS_OFF, '0,000'));
                Ext.getCmp(prototype.id + '-lblCiSTotalUSDOff').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_OFF, '0,000'));
                Ext.getCmp(prototype.id + '-lblCiSTotalCPNPercOn').setText(Ext.util.Format.number(data.TOTAL_CUPONS_ON_PERCEN, '0,000.00'));
//
                Ext.getCmp(prototype.id + '-lblCiSTotalUSDPercOn').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_ON_PERCENT, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblCiSTotalAVGOn').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_ON_AVG_RATE, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblCiSTotalCPNPercOff').setText(Ext.util.Format.number(data.TOTAL_CUPONS_OFF_PERCEN, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblCiSTotalUSDPercOff').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_OFF_PERCENT, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblCiSTotalAVGOff').setText(Ext.util.Format.number(data.TOTAL_AMOUNT_OFF_AVG_RATE, '0,000.00'));

                Ext.getCmp(prototype.id + '-lblTotalY_QCPNSNR').setText(Ext.util.Format.number(data.TOTAL_QCPNS0, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalY_AMOUNTNR').setText(Ext.util.Format.number(data.TOTAL_AMOUNT0, '0,000'));

            }
        });

//        me.dw_excel = false;

    },
    loadAlliances: function () {
        win.lblUser_toolTip("Estructura: IMF083");

        this.showGrid('-BoxAlliances');
        Ext.Ajax.request({
            url: prototype.url + '/loadAlliances',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                var data = res.data[0];

                var storeData = Ext.create('Ext.data.Store', {
                    data: res.data,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridAlliances').bindStore(storeData);

                //AEROMEXICO
                Ext.getCmp(prototype.id + '-lblTotalAlCPN').setText(Ext.util.Format.number(data.CUPONS_OFF, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalAlAmount').setText(Ext.util.Format.number(data.AMOUNT_OFF, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalAlAVG').setText(Ext.util.Format.number(data.totAVG, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblTotalPerGral').setText(Ext.util.Format.number(data.Perc4, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblTotalAL_QCPNSNR').setText(Ext.util.Format.number(data.CUPONS_OTHER, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalAL_AMOUNTNR').setText(Ext.util.Format.number(data.AMOUNT_O, '0,000'));

            }
        });

//        me.dw_excel = false;

    },
    loadChannels: function () {
        win.lblUser_toolTip("Estructura: IMF085");
        me.panelActual = '-BoxChannels';
        this.showGrid('-BoxChannels');
        Ext.Ajax.request({
            url: prototype.url + '/loadChannelsChart',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                var data = res.data[0];

                var storeData = Ext.create('Ext.data.Store', {
                    data: res.data,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-ADG_GridChannels').bindStore(storeData);
                Ext.getCmp(prototype.id + '-ADG_GridChannels').setStore(storeData);
            }
        });

//        me.dw_excel = false;

    },
    loadCityPair: function () {
        win.lblUser_toolTip("Estructura: IMF086");

        me.panelActual = '-BoxCityPair';
        this.showGrid('-BoxCityPair');

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadCityPair'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getBody().mask('Loading...');
                    obj.proxy.extraParams = {beanString: searchParams, dw_excel: false};
                },
                load: function (obj) {
                    Ext.getBody().unmask('Loading...');
                    
                    var pag = Ext.getCmp(prototype.id + '-paggin_loadCityPair');
                    var pagData = pag.getPageData();
                    
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var data = obj.data.items[0].data;
                        console.log(data);

                    }
//                    mePie.setWidthPie();
                }
            }
        });

        Ext.getCmp(prototype.id + '-ADG_GridDDCPCityPair').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ADG_GridDDCPCityPair').setStore(storeGridDatas);
        this.showPagination_clickHandler();
        Ext.getCmp(prototype.id + '-paggin_loadCityPair').bindStore(storeGridDatas);

//        me.dw_excel = false;

    },
    BuscarPair_keyDownHandler: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.inicio();
        }
    },
    rbChangeType_cp: function () {
        this.inicio();
    },
    loadCabin: function () {
        win.lblUser_toolTip("Estructura: IMF088");
        me.panelActual = '-BoxCabin';
        this.showGrid('-BoxCabin');

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadCabin'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getBody().mask('Loading...');
                    obj.proxy.extraParams = {beanString: searchParams, dw_excel: false};
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-pagginCabin');
                    var pagData = pag.getPageData();
                    console.log(pagData);
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    Ext.getBody().unmask('Loading...');
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var data = obj.data.items[0].data;
                        console.log(data);
                        var chkCabin = Ext.getCmp(prototype.id + '-chkCabin').getValue();
                        if (chkCabin) {
                            Ext.getCmp(prototype.id + '-titCabin').setText('City Pair');
                        } else {
                            Ext.getCmp(prototype.id + '-titCabin').setText('Sales Date');
                        }

                    }
//                    mePie.setWidthPie();
                }
            }
        });

        Ext.getCmp(prototype.id + '-ADG_GridCabin').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ADG_GridCabin').setStore(storeGridDatas);

        this.showPagination_clickHandler();
        Ext.getCmp(prototype.id + '-pagginCabin').bindStore(storeGridDatas);
//        me.dw_excel = false;
    },
    chooseCAB_clickHandler: function () {
        this.inicio();
    },
    rbChangeType_ca: function () {
        this.inicio();
    },
    click_detailCabin_colHandler: function (param, metaData, rowNum, colNum, obj2, rowData) {
        var titulo = "";

        if (rowData.data.DSALES != '') {
            titulo = ' - Sales Date : ' + rowData.data.strFormatDate;
        }
        if (rowData.data.CITYO != '' && rowData.data.CITYD != '') {
            titulo = ' - City Pair : ' + rowData.data.strFormatDate;
        }

        me.bean.DSALES = rowData.data.DSALES;
        me.bean.CITYO = rowData.data.CITYO;
        me.bean.CITYD = rowData.data.CITYD;

        switch (colNum) {
            case 3:
                me.bean.CLASS = "F";
                titulo = 'First Class ' + titulo;
                break;
            case 5:
                me.bean.CLASS = "J";
                titulo = 'Business Class ' + titulo;
                break;
            case 7:
                me.bean.CLASS = "Y";
                titulo = 'Econnomy/Coach Class ' + titulo;
                break;
        }

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };

        this.loadDetailCabin(titulo);
    },
    loadDetailCabin: function (titulo) {
        win.lblUser_toolTip("Estructura: IMF088");
        me.panelActual = '-BoxDetCabin';
        this.showGrid('-BoxDetCabin');
        this.hidePagination_clickHandler();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadDetailCabin'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getBody().mask('Loading...');
                    obj.proxy.extraParams = {beanString: searchParams, dw_excel: false};
                },
                load: function (obj) {
                    Ext.getBody().unmask('Loading...');
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var data = obj.data.items[0].data;
                        console.log(data);
                        Ext.getCmp(prototype.id + '-ADG_GridDetCabin').setTitle('<center style="font-size:12px;">' + titulo + '</center>');
                    }
//                    mePie.setWidthPie();
                }
            }
        });

        Ext.getCmp(prototype.id + '-ADG_GridDetCabin').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displayDetCabinChart01').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ADG_GridDetCabin').setStore(storeGridDatas);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    loadSalesAgent: function () {
        win.lblUser_toolTip("Estructura: IMF084");

        me.panelActual = '-BoxDDTMDetailbyAgent';
        this.showGrid('-BoxSalesAgent');
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadSalesAgent'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getBody().mask('Loading...');
                    obj.proxy.extraParams = {beanString: searchParams, dw_excel: false};
                },
                load: function (obj) {
                    Ext.getBody().unmask('Loading...');
                    
                    var pag = Ext.getCmp(prototype.id + '-paggin_loadSalesAgent');
                    var pagData = pag.getPageData();
//                    console.log(pagData);
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        
//                        console.log(obj.data);
//                        var data = obj.data.items[0].data;

                    }
//                    mePie.setWidthPie();
                }
            }
        });
        
        Ext.getCmp(prototype.id + '-ADG_GridSalesAgent').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ADG_GridSalesAgent').setStore(storeGridDatas);
        this.showPagination_clickHandler();
        Ext.getCmp(prototype.id + '-paggin_loadSalesAgent').bindStore(storeGridDatas);

    },
    rbChangeType_sa: function () {
        this.inicio();
    },
    loadTypeRoute: function () {
        win.lblUser_toolTip("Estructura: IMF089");

        this.showGrid('-BoxRouting');
        Ext.Ajax.request({
            url: prototype.url + '/loadTypeRoute',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);

                var storeData = Ext.create('Ext.data.Store', {
                    data: res.lstData,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-ADG_GridRouting').bindStore(storeData);


                // -------------------------------------  GRAFICO -----------------------------------------------------------

                var lstDataEdit = [];
                var otros = 0;

                for (var i = 0; i < res.lstData.length; i++) {
                    if (i <= 3) {
                        var perc = Ext.util.Format.number(res.lstData[i].AMOUNT_PERCENT, '0,000.00')
                        lstDataEdit.push({strDescription: res.lstData[i].strDescription + ',' + perc + '%', AMOUNT_PERCENT: res.lstData[i].AMOUNT_PERCENT});
                    } else {
                        otros += res.lstData[i].AMOUNT_PERCENT;
                    }

                }

                lstDataEdit.push({strDescription: 'Others,' + Ext.util.Format.number(otros, '0,000.00') + '%', AMOUNT_PERCENT: otros});


                var storeChtSalesAnalysis35_PC = Ext.create('Ext.data.Store', {
                    data: lstDataEdit,
                    autoLoad: true
                });

                Ext.getCmp(prototype.id + '-ChtSalesAnalysis35_PC').bindStore(storeChtSalesAnalysis35_PC);

            }
        });

//        me.dw_excel = false;

    },
    click_detRouting_colHandler: function (column, e, row, column, x, rowData) {

        this.beanDetRoutingType = {};
        this.beanDetRoutingType.beanString = JSON.stringify(rowData.data);

        this.loadDetTypeRoute(this.beanDetRoutingType);
    },
    loadDetTypeRoute: function (searchParams) {
        win.lblUser_toolTip("Estructura: IMF089");

        me.panelActual = '-BoxDetRouting';
        this.showGrid('-BoxDetRouting');
        var storeGridDatas = Ext.create('Ext.Praxis.store.screens.GridData', {
            proxy: {
                url: prototype.url + '/loadDetTypeRoute'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
//                    var pag = Ext.getCmp(prototype.id + '-pagginRoutingType');
//                    var pagData = pag.getPageData();
//                    console.log(pagData);
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var Objtemp = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-titDetRouting').setText('Type of Route : ' + Objtemp.strDescription1);


                        // -------------------------------------  GRAFICO -----------------------------------------------------------
                        meCompare.dataRoute_chart = Ext.clone(obj.data);
                        meCompare.onChangeTopRoute('', 20, '', '');
                    }
                }
            }
        });
//            global.clear();
//        Ext.getCmp(prototype.id + '-gridDetailGDS').bindStore(storeGridDatas);
        global.clear();

        Ext.getCmp(prototype.id + '-gridDetRouting').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetRouting').setStore(storeGridDatas);
//
//        this.showPagination_clickHandler();
//        Ext.getCmp(prototype.id + '-pagginRoutingType').bindStore(storeGridDatas);
    },
    onChangeTopRoute: function (obj, value, cmp, strFunc) {

        var data = meCompare.dataRoute_chart.items;

        var lstDataEdit = [];
        var newArrayDesc = [];

        for (var i = 0; i < data.length; i++) {
            if (i < value) {
                var AMOUNT = Ext.util.Format.number(data[i].data.AMOUNT, '0,000')
                lstDataEdit.push({strDescription: data[i].data.CITYO + '-' + data[i].data.CITYD, AMOUNT: data[i].data.AMOUNT});
            } else {
                break;
            }

        }

        for (var i = (lstDataEdit.length - 1); i >= 0; i--) {
            newArrayDesc.push(lstDataEdit[i]);
        }

        console.log(lstDataEdit);
        var storeChtSalesAnalysis36MSBC = Ext.create('Ext.data.Store', {
            data: newArrayDesc,
            autoLoad: true
        });

        Ext.getCmp(prototype.id + '-ChtSalesAnalysis36MSBC').bindStore(storeChtSalesAnalysis36MSBC);

    },
    loadGDS: function () {
        win.lblUser_toolTip("Estructura: IMF099");

        this.showGrid('-BoxGDS');
        Ext.Ajax.request({
            url: prototype.url + '/loadGDS',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);

                if (res.lstData.length === 0) {
                    global.Msg({
                        msg: 'Data not found.'
                    });
                } else {
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.lstData,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridGDS').bindStore(storeData);


                    // -------------------------------------  GRAFICO -----------------------------------------------------------

                    var lstDataEdit = [];
                    var otros = 0;

                    for (var i = 0; i < res.lstData.length; i++) {
                        if (i <= 2) {
                            var perc = Ext.util.Format.number(res.lstData[i].Perc2, '0,000.00')
                            lstDataEdit.push({strDescription: res.lstData[i].strDescription + ',' + perc + '%', Perc2: res.lstData[i].Perc2});
                        } else {
                            otros += res.lstData[i].Perc2;
                        }

                    }

                    lstDataEdit.push({strDescription: 'Others,' + Ext.util.Format.number(otros, '0,000.00') + '%', Perc2: otros});

                    console.log('---->');
                    console.log(lstDataEdit);
                    var storeChtSalesAnalysis41_PC = Ext.create('Ext.data.Store', {
                        data: lstDataEdit,
                        autoLoad: true
                    });

                    Ext.getCmp(prototype.id + '-ChtSalesAnalysis41_PC').bindStore(storeChtSalesAnalysis41_PC);

                }
            }
        });

//        me.dw_excel = false;

    },
    click_detailGDS_colHandler: function (column, e, row, column, x, rowData) {
//        console.log(param);
//        Ext.getCmp(field.id).setGroupValue(param);
//        var data = x.record.data;

        this.beanGDSDet = {};
        this.beanGDSDet.beanString = JSON.stringify(rowData.data);

        console.log(this.beanGDSDet);
        this.loadDetGDS(this.beanGDSDet);
    },
    loadDetGDS: function (searchParams) {
        win.lblUser_toolTip("Estructura: IMF099");


        this.showGrid('-BoxDetGDS');
        var storeGridDatas = Ext.create('Ext.Praxis.store.screens.GridData', {
            proxy: {
                url: prototype.url + '/loadDetGDS'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var Objtemp = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-lblTitDetGDS').setText(Objtemp.strDescription5);
                    }
                }
            }
        });
//            global.clear();
//        Ext.getCmp(prototype.id + '-gridDetailGDS').bindStore(storeGridDatas);
        global.clear();

        Ext.getCmp(prototype.id + '-gridDetailGDS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetailGDS').setStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    click_detailGDSAgte_colHandler: function (column, e, row, column, x, rowData) {
//        console.log(param);
//        Ext.getCmp(field.id).setGroupValue(param);
//        var data = x.record.data;

        this.beanGDSDetAg = {};
        this.beanGDSDetAg.beanString = JSON.stringify(rowData.data);

        console.log(this.beanGDSDetAg);
        this.loadDetGDSAgte(this.beanGDSDetAg);
    },
    loadDetGDSAgte: function (searchParams) {
        win.lblUser_toolTip("Estructura: IMF072R");

        me.panelActual = '-BoxDetGDSAgte';
        this.showGrid('-BoxDetGDSAgte');
        var storeGridDatas = Ext.create('Ext.Praxis.store.screens.GridData', {
            proxy: {
                url: prototype.url + '/loadDetGDSAgte'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-pagginGDS');
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
                        var Objtemp = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-lblTitDetGDSAgte').setText(Objtemp.strDescription5);
                    }
                }
            }
        });
//            global.clear();
//        Ext.getCmp(prototype.id + '-gridDetailGDS').bindStore(storeGridDatas);
        global.clear();

        Ext.getCmp(prototype.id + '-gridDetailGDSAgte').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetailGDSAgte').setStore(storeGridDatas);

        this.showPagination_clickHandler();
        Ext.getCmp(prototype.id + '-pagginGDS').bindStore(storeGridDatas);
    },
    click_detailGDSTkt_colHandler: function (column, e, row, column, x, rowData) {
//        console.log(param);
//        Ext.getCmp(field.id).setGroupValue(param);
//        var data = x.record.data;

        this.beanGDSDetTkt = {};
        this.beanGDSDetTkt.beanString = JSON.stringify(rowData.data);

        console.log(this.beanGDSDetTkt);
        this.loadDetGDSTkt(this.beanGDSDetTkt);
    },
    loadDetGDSTkt: function (searchParams) {
        win.lblUser_toolTip("Estructura: IMF072R");

        me.panelActual = '-BoxDetGDSTkt';
        this.showGrid('-BoxDetGDSTkt');
        var storeGridDatas = Ext.create('Ext.Praxis.store.screens.GridData', {
            proxy: {
                url: prototype.url + '/loadDetGDSTkt'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-pagginGDStkt');
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
                        var Objtemp = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-lblTitDetGDSTkt').setText(Objtemp.strDescripcion5);
                    }
                }
            }
        });
//            global.clear();
//        Ext.getCmp(prototype.id + '-gridDetailGDS').bindStore(storeGridDatas);
        global.clear();

        Ext.getCmp(prototype.id + '-gridDetailGDSTkt').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetailGDSTkt').setStore(storeGridDatas);

        this.showPagination_clickHandler();
        Ext.getCmp(prototype.id + '-pagginGDStkt').bindStore(storeGridDatas);
    },
    /* ======================= FARE TYPE ====================================*/
    loadFareType: function () {
        var rbg_FareType = Ext.getCmp(prototype.id + '-radiogroupType_ft').getValue().rbgType_ft;
        me.panelActual = '-BoxFare';
        this.showGrid('-BoxFare');
        switch (rbg_FareType) {
            case 'S':
                Ext.getCmp(prototype.id + '-BoxFareSource').show();
                Ext.getCmp(prototype.id + '-BoxFareCabin').hide();
                Ext.getCmp(prototype.id + '-BoxFareZona').hide();
                this.loadFareTypeSource();
                break;
            case 'C':
                Ext.getCmp(prototype.id + '-BoxFareSource').hide();
                Ext.getCmp(prototype.id + '-BoxFareCabin').show();
                Ext.getCmp(prototype.id + '-BoxFareZona').hide();
                this.loadFareTypeCabin();
                break;
            case 'Z':
                Ext.getCmp(prototype.id + '-BoxFareSource').hide();
                Ext.getCmp(prototype.id + '-BoxFareCabin').hide();
                Ext.getCmp(prototype.id + '-BoxFareZona').show();
                this.loadFareTypeZona();
                break;
        }
    },
    rbChangeType_ft: function () {
        this.inicio();
    },
    loadFareTypeSource: function () {
        win.lblUser_toolTip("Estructura: IMF097");


        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadTypeFare'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getBody().mask('Loading...');
                    obj.proxy.extraParams = {beanString: searchParams, dw_excel: false};
                },
                load: function (obj) {
                    Ext.getBody().unmask('Loading...');
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var data = obj.data.items[0].data;
                        console.log(data);

                    }
//                    mePie.setWidthPie();
                }
            }
        });

        Ext.getCmp(prototype.id + '-ADG_GridFareSource').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ADG_GridFareSource').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ChartFareType').bindStore(storeGridDatas);
    },
    loadFareTypeCabin: function () {
        win.lblUser_toolTip("Estructura: IMF097");


        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadTypeFareCabin'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getBody().mask('Loading...');
                    obj.proxy.extraParams = {beanString: searchParams, dw_excel: false};
                },
                load: function (obj) {
                    Ext.getBody().unmask('Loading...');
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var data = obj.data.items[0].data;
                        console.log(data);

                    }
//                    mePie.setWidthPie();
                }
            }
        });

        Ext.getCmp(prototype.id + '-ADG_GridFareCabin').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ADG_GridFareCabin').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ChartFareTypeCabin').bindStore(storeGridDatas);
    },
    loadFareTypeZona: function () {
        win.lblUser_toolTip("Estructura: IMF097");


        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadTypeFareZone'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getBody().mask('Loading...');
                    obj.proxy.extraParams = {beanString: searchParams, dw_excel: false};
                },
                load: function (obj) {
                    Ext.getBody().unmask('Loading...');
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var data = obj.data.items[0].data;
                        console.log(data);

                    }
//                    mePie.setWidthPie();
                }
            }
        });

        Ext.getCmp(prototype.id + '-ADG_GridFareZona').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ADG_GridFareZona').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ChartFareTypeZona').bindStore(storeGridDatas);
    },
    click_detFareType_colHandler: function (param, metaData, rowNum, colNum, obj2, rowData) {
        this.beanFareType = rowData.data;
        this.paramsFareType.beanString = JSON.stringify(this.beanFareType);
        console.log(this.beanFareType);
        var zona = this.beanFareType.ZONA
        var zonaDesc = this.beanFareType.strDescriptionZone
        this.loadDetTypeFare(zona, zonaDesc);
    },
    loadDetTypeFare: function (zona, zonaDesc) {

        this.showGrid('-BoxDetFare');
        win.lblUser_toolTip("Estructura: IMF097");

        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/loadDetTypeFare'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = meCompare.paramsFareType;
                },
                load: function (obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        console.log(obj.data);
                        var Objtemp = obj.data.items[0].data;
                        if (Objtemp.strDescription1 === '') {
                            Ext.getCmp(prototype.id + '-titDetFare').setText('ZONE : ' + zona + ' - ' + zonaDesc);
                        } else {
                            Ext.getCmp(prototype.id + '-titDetFare').setText('Fare Type : ' + Objtemp.strDescription1);
                        }


                        // -------------------------------------  GRAFICO -----------------------------------------------------------
                        meCompare.dataFareType_chart = Ext.clone(obj.data);
                        meCompare.onChangeTopFareType('', 20, '', '');

                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDetFare').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetFare').setStore(storeGridDatas);
    },
    click_detFareZone_colHandler: function (param, metaData, rowNum, colNum, obj2, rowData) {

        this.beanFareTypeZone = rowData.data;
        this.paramsFareTypeZone.beanString = JSON.stringify(this.beanFareTypeZone);

        this.loadDetTypeFareZona();
    },
    loadDetTypeFareZona: function (data) {

        this.showGrid('-BoxDetFare');
        win.lblUser_toolTip("Estructura: IMF097");

        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/loadDetTypeFareZona'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = meCompare.paramsFareTypeZone;
                },
                load: function (obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        console.log(obj.data);
                        var Objtemp = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-titDetFare').setText('Zone : ' + Objtemp.strDescriptionZone);

                        // -------------------------------------  GRAFICO -----------------------------------------------------------
                        meCompare.dataFareType_chart = Ext.clone(obj.data);
                        meCompare.onChangeTopFareType('', 20, '', '');

                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDetFare').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetFare').setStore(storeGridDatas);
    },
    onChangeTopFareType: function (obj, value, cmp, strFunc) {
        console.log(meCompare.dataFareType_chart);
        console.log(meCompare);
        var data = meCompare.dataFareType_chart.items;
        var lstDataEdit = [];

        for (var i = 0; i < data.length; i++) {
            if (i < value) {
                var AMOUNT = Ext.util.Format.number(data[i].data.AMOUNT, '0,000')
                lstDataEdit.push({strDescription: data[i].data.CITYO + '-' + data[i].data.CITYD, AMOUNT: data[i].data.AMOUNT});
            } else {
                break;
            }
        }


        console.log(lstDataEdit);
        var storeChtSalesAnalysis36MSBC = Ext.create('Ext.data.Store', {
            data: lstDataEdit,
            autoLoad: true
        });

        Ext.getCmp(prototype.id + '-displaySAChart38').bindStore(storeChtSalesAnalysis36MSBC);

    },
    /* ======================= ALLIANCES ====================================*/
    click_detailAlliances_colHandler: function (column, e, row, column, x, rowData) {

        this.beanAllianceDet = {};
        this.beanAllianceDet.beanString = JSON.stringify(rowData.data);

        console.log(this.beanAllianceDet);
        this.loadDetAlliances(this.beanAllianceDet);
    },
    loadDetAlliances: function (searchParams) {
        win.lblUser_toolTip("Estructura: IMF083");


        this.showGrid('-BoxDetAlliances');
        var storeGridDatas = Ext.create('Ext.Praxis.store.screens.GridData', {
            proxy: {
                url: prototype.url + '/loadDetAlliances'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var Objtemp = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-titDetAlliances').setText(Objtemp.strDescription5);
                    }
                }
            }
        });
        global.clear();

        Ext.getCmp(prototype.id + '-GridDetAlliances').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-GridDetAlliances').setStore(storeGridDatas);
    },
    click_detailPaisAlliances_colHandler: function (column, e, row, column, x, rowData) {

        this.beanAllianceDetPais = {};
        this.beanAllianceDetPais.beanString = JSON.stringify(rowData.data);

        console.log(this.beanAllianceDetPais);
        this.loadDetPaisAlliances(this.beanAllianceDetPais);
    },
    loadDetPaisAlliances: function (searchParams) {
        win.lblUser_toolTip("Estructura: IMF082");


        this.showGrid('-BoxDetPaisAlliances');
        var storeGridDatas = Ext.create('Ext.Praxis.store.screens.GridData', {
            proxy: {
                url: prototype.url + '/loadDetPaisAlliances'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var Objtemp = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-titDetPaisAlliances').setText(Objtemp.strDescription5);
                    }
                }
            }
        });
        global.clear();

        Ext.getCmp(prototype.id + '-GridDetPaisAlliances').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-GridDetPaisAlliances').setStore(storeGridDatas);
    },
    click_detailAgenteAlliances_colHandler: function (column, e, row, column, x, rowData) {

        this.beanAllianceDetAgente = {};
        this.beanAllianceDetAgente.beanString = JSON.stringify(rowData.data);

        console.log(this.beanAllianceDetAgente);
        this.loadDetAgenteAlliances(this.beanAllianceDetAgente);
    },
    loadDetAgenteAlliances: function (searchParams) {
        win.lblUser_toolTip("Estructura: IMF082");

        me.panelActual = '-BoxDetAgenteAlliances';
        this.showGrid('-BoxDetAgenteAlliances');
        var storeGridDatas = Ext.create('Ext.Praxis.store.screens.GridData', {
            proxy: {
                url: prototype.url + '/loadDetAgenteAlliances'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-pagginAlliance');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var Objtemp = obj.data.items[0].data;
                        var lblCountry = Ext.getCmp(prototype.id + '-titDetPaisAlliances').text;
                        Ext.getCmp(prototype.id + '-titDetAgenteAlliances').setText(lblCountry + ' ' + Objtemp.strDescription5);
                    }
                }
            }
        });
        global.clear();

        Ext.getCmp(prototype.id + '-GridDetAgenteAlliances').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-GridDetAgenteAlliances').setStore(storeGridDatas);

        this.showPagination_clickHandler();
        Ext.getCmp(prototype.id + '-pagginAlliance').bindStore(storeGridDatas);
    },
    loadCompareSale: function (flag) {
        win.lblUser_toolTip("Estructura: IMF080");

        console.log('loadCompareSale');
        if (flag === 'P') {
            this.showGrid('-boxCompare');
        }

        Ext.Ajax.request({
            url: prototype.url + '/loadCompareSale',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                var lstCompare1 = res.data;
                var lstCompare2 = res.lst2;
                var lstCompare3 = res.lst3;
                var year = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();

                Ext.getCmp(prototype.id + '-lbl1').setText(year + '');
                Ext.getCmp(prototype.id + '-lbl2').setText(year - 1 + '');
                Ext.getCmp(prototype.id + '-lbl3').setText(year - 2 + '');


                var storeData = Ext.create('Ext.data.Store', {
                    data: lstCompare1,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-GridtotalMonth_1').bindStore(storeData);


                var storeData2 = Ext.create('Ext.data.Store', {
                    data: lstCompare2,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-GridtotalMonth_2').bindStore(storeData2);


                var storeData3 = Ext.create('Ext.data.Store', {
                    data: lstCompare3,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-GridtotalMonth_3').bindStore(storeData3);


                //  -------------------------- GRAFICOS --------------------------
                var lstTemp = lstCompare1;

                if (lstCompare1.length <= lstCompare2.length) {
                    lstTemp = lstCompare2;
                }
                if (lstCompare2.length <= lstCompare3.length) {
                    lstTemp = lstCompare3;
                }

                var item = {};
                lstFinal = [];

                for (var t = 0; t < lstTemp.length; t++) {
                    item.month = lstTemp[t].strFormatDate.substring(5, 8);
                    item.year1 = year + '';
                    item.year2 = year - 1 + '';
                    item.year3 = year - 2 + '';

                    item.year1_amount = 0;
                    item.year2_amount = 0;

                    item.year1_coupon = 0;
                    item.year2_coupon = 0;
                    lstFinal.push(item);
                    item = {};
                }


                for (var k = 0; k < lstCompare1.length; k++) {
                    if (lstFinal[k].month === lstCompare1[k].strFormatDate.substring(5, 8)) {
                        lstFinal[k].year1_amount = lstCompare1[k].AMOUNT;
                        lstFinal[k].year1_coupon = lstCompare1[k].CUPONS;

                    }
                }

                for (var t = 0; t < lstCompare2.length; t++) {
                    if (lstFinal[t].month === lstCompare2[t].strFormatDate.substring(5, 8)) {
                        lstFinal[t].year2_amount = lstCompare2[t].AMOUNT;
                        lstFinal[t].year2_coupon = lstCompare2[t].CUPONS;
                    }
                }

                for (var t = 0; t < lstCompare3.length; t++) {
                    if (lstFinal[t].month === lstCompare3[t].strFormatDate.substring(5, 8)) {
                        lstFinal[t].year3_amount = lstCompare3[t].AMOUNT;
                        lstFinal[t].year3_coupon = lstCompare3[t].CUPONS;
                    }
                }

                console.log('----------------- 111111 -----------------');
                console.log(lstFinal);

                var storeDataGraf = Ext.create('Ext.data.Store', {
                    data: lstFinal,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-displaySAChart42').bindStore(storeDataGraf);

            }
        });
    },
    loadCompareSaleDay: function () {

        win.lblUser_toolTip("Estructura: IMF125");

        this.showGrid('-boxCompareday');
        Ext.Ajax.request({
            url: prototype.url + '/loadCompareSaleDay',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                meCompare.loadCompareSale('');

                var lstCompare1 = res.data;
                var lstCompare2 = res.lst2;
                var lstCompare3 = res.lst3;
                var lstCompare4 = res.lst4;

                var year = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();

                Ext.getCmp(prototype.id + '-lbl1d').setText(year + '');
                Ext.getCmp(prototype.id + '-lbl2d').setText(year - 1 + '');
                Ext.getCmp(prototype.id + '-lbl3d').setText(year - 2 + '');
                Ext.getCmp(prototype.id + '-lbl4d').setText(year + "-" + (year - 1));

                // -------------------------------------------------------------------
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstCompare1,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-GridtotalMonth_1day').bindStore(storeData);
//                Ext.getCmp(prototype.id + '-GridtotalMonth_1day').setStore(storeData);

                // -------------------------------------------------------------------
                var storeData2 = Ext.create('Ext.data.Store', {
                    data: lstCompare2,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-GridtotalMonth_2day').bindStore(storeData2);
//                Ext.getCmp(prototype.id + '-GridtotalMonth_2day').setStore(storeData2);
//                
                // -------------------------------------------------------------------
                var storeData3 = Ext.create('Ext.data.Store', {
                    data: lstCompare3,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-GridtotalMonth_3day').bindStore(storeData3);
//                Ext.getCmp(prototype.id + '-GridtotalMonth_3day').setStore(storeData3);


                // -------------------------------------------------------------------
                var storeData4 = Ext.create('Ext.data.Store', {
                    data: lstCompare4,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-GridtotalMonth_4day').bindStore(storeData4);
//                Ext.getCmp(prototype.id + '-GridtotalMonth_4day').setStore(storeData4);


                //  -------------------------- GRAFICOS DAY--------------------------

                console.log('----------------- 222222 -----------------');
                console.log(lstFinal);

                var storeDataGrafDay = Ext.create('Ext.data.Store', {
                    data: lstFinal,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-displaySAChart42_day').bindStore(storeDataGrafDay);

            }
        });
    },
    clickDetSales_colHandler: function (param, column, e, row, column, x, rowData) {
//        console.log(param);

//        Ext.getCmp(field.id).setGroupValue(param);
        this.beanDet = x.record.data;
        this.beanDet.FlagFactor = param;
        this.showGrid('-boxDetDataS');
        console.log(Ext.getCmp(prototype.id + '-rbgpDetail'));
        if (param === 'MIN') {
            Ext.getCmp(prototype.id + '-rbMIN').setValue(true);
        } else if (param === 'MAX') {
            Ext.getCmp(prototype.id + '-rbMAX').setValue(true);
        } else {
            Ext.getCmp(prototype.id + '-rbBEL').setValue(true);
        }

        console.log(this.beanDet);
        this.viewDetSales_colHandler();
    },
    viewDetSales_colHandler: function () {

        this.beanDet.CITYO = Ext.getCmp(prototype.id + '-cmbcCitiesFrom').getValue();
        this.beanDet.CITYD = Ext.getCmp(prototype.id + '-cmbcCitiesTo').getValue();

        this.showPagination_clickHandler();

        var storeGridDatas = Ext.create('Ext.Praxis.store.screens.GridData', {
            proxy: {url: prototype.url + '/searchDetSales'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + me.boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanDet), dw_excel: false};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + me.boxActual).unmask();
                    win.lblUser_toolTip("Estructura: IMF110");

                    if (obj.data.length > 0) {
                        var Objtemp = obj.data.items[0].data;

                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
//                        console.log(pagData);
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        Ext.getCmp(prototype.id + '-titDetSalesS').setText('Sale Date : ' + Objtemp.strFormatDate);


                        var v_storeCities = Ext.getCmp(prototype.id + '-cmbcCitiesFrom').getStore().data.length;
                        if (v_storeCities === 0) {
                            me.obtainCities();
                        }


                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetSalesS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);



    },
    showGrid: function (nameGrid) {

        Ext.getCmp(prototype.id + meSales.boxActual).hide();

        meSales.boxActual = nameGrid;
        meSales.drillDown.push(meSales.boxActual);

        Ext.getCmp(prototype.id + meSales.boxActual).show();

//        console.log('showGrid == ' + me.drillDown);


    },
    imgBack_clickHandler: function () {

        if (meSales.drillDown.length > 1) {
            Ext.getCmp(prototype.id + meSales.boxActual).hide();
            meSales.drillDown.pop();
            meSales.boxActual = meSales.drillDown[meSales.drillDown.length - 1];
            Ext.getCmp(prototype.id + meSales.boxActual).show();

//                this.showGrid(me.drillDown[me.drillDown.length-1]);
            console.log(meSales.boxActual);
            if (meSales.boxActual === '-boxMainData' || meSales.boxActual === '-BoxDDTMCountryofSale' || meSales.boxActual === '-BoxCityOfSale' || meSales.boxActual === '-BoxDetGDS' || meSales.boxActual === '-BoxDetPaisAlliances') {
                this.hidePagination_clickHandler();
            } else if (meSales.boxActual === '-BoxDetGDSAgte') {
                me.panelActual = '-BoxDetGDSAgte';
                var pag = Ext.getCmp(prototype.id + '-pagginGDS');
                var pagData = pag.getPageData();

                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            } else if (meSales.boxActual === '-BoxCabin') {
                me.panelActual = '-BoxCabin';
                var pag = Ext.getCmp(prototype.id + '-pagginCabin');
                var pagData = pag.getPageData();
                this.showPagination_clickHandler();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        }
//        console.log('imgBack_clickHandler == ' + me.drillDown);

    },
    imgExcel_clickHandler: function () {

        console.log('excell');
        console.log(this.searchParams);
//        console.log(this.paramsCountryCity.beanString);
        me.dw_excel = true;
        if (me.boxActual === '-boxMainData') {
            console.log(Ext.getCmp(prototype.id + '-gridData').config.columns.items);
            me.goURLpost('searchTest', this.searchParams, Ext.getCmp(prototype.id + '-gridData').config.columns.items);
        } else if (me.boxActual === '-BoxDDTMCountryofSale') {
            console.log(Ext.getCmp(prototype.id + '-gridCountryofSale').config.columns);
            me.goURLpost('loadDDTpMCountryofSale', this.paramsCountryCity.beanString, Ext.getCmp(prototype.id + '-gridCountryofSale').config.columns);
        } else if (me.boxActual === '-BoxGDS') {
            console.log(Ext.getCmp(prototype.id + '-gridGDS').config.columns);
            me.goURLpost('loadGDS', this.searchParams.beanString, Ext.getCmp(prototype.id + '-gridGDS').config.columns.items);
        } else {
            me.dw_excel = false;
        }
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

        document.body.appendChild(mapForm);


        mapForm.submit();
    },
    showPagination_clickHandler: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        Ext.getCmp(prototype.id + '-lblPagination').show();
    },
    hidePagination_clickHandler: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').hide();
        Ext.getCmp(prototype.id + '-lblPagination').hide();
    },
    obtainCities: function () {

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainCities',
            method: 'POST',
            timeout: 60000000,
//            beforerequest: Ext.getBody().mask('Loading...'),
            params: '',
            success: function (response, options) {
//                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var lstCiudades = res.lstCiudades;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstCiudades,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbcCitiesFrom').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbcCitiesFrom').setValue('');
                Ext.getCmp(prototype.id + '-cmbcCitiesTo').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbcCitiesTo').setValue('');
//                global.clear();
            }
        });

    },
    rgchange: function (field, newvalue, oldvalue, options) {
//        this.beanDet.FlagFactor = param;
//        console.log(field);

        if (oldvalue) {
//            console.log(Ext.getCmp(field.id).getGroupValue());
            this.beanDet.FlagFactor = Ext.getCmp(field.id).getGroupValue();
            this.viewDetSales_colHandler();
        }
//        console.log(this.beanDet);
    },
    dateChange: function (field, newvalue, oldvalue) {
        var V_CDATE = Ext.getCmp(prototype.id + '-txtDateCreate').getValue();

        V_CDATE = Ext.util.Format.date(V_CDATE, 'Ymd');

        console.log(V_CDATE);

        this.beanDet.FECR = V_CDATE;
        console.log(this.beanDet);
        this.viewDetSales_colHandler();
    },
    gridData_VIEWTKT_clickHandler: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.TICKET;
        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
        beanProMasterTicket.IN_SEQ = '00';

        win.displayProMasterTicket(this, 'ABValues', beanProMasterTicket);
    },
    setWidthPie: function () {
        console.log(meSales.boxActual);
        var ancho = Ext.getCmp(prototype.id + meSales.boxActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function () {
        meSales.pagginActual = '';
        switch (me.boxActual) {
            case  '-BoxSalesAgent':
                meSales.pagginActual = '-paggin';
                break;
//            case '-BoxDDTMCountryofSale':
//                me.pagginActual = '-paggin2';
//                break;
//            case '-BoxDDTMDetailbyAgent':
//                me.pagginActual = '-paggin3';
//                break;
//            case '-boxNoMatchData':
//                me.pagginActual = '-paggin4';
//                break;
//            case '-boxUsosData':
//                me.pagginActual = '-paggin5';
//                break;
//            case '-boxDetAvisos':
//                me.pagginActual = '-paggin6';
//                break;
        }
    },
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + meSales.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + meSales.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + meSales.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + meSales.pagginActual);
        pag.moveLast();
    },

    viewMasterTkt: function () {

        prototypeProgram.view = 'screens-dashboard-01-form';
        prototypeProgram.nprog = 'PX00000109';
        prototypeProgram.title = 'Dashboard 1';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};
//        beanProMasterTicket.IN_CIA = data.CCIA;
//        beanProMasterTicket.IN_FORMA = data.FORMA;
//        beanProMasterTicket.IN_SERIE = data.SERIE;
//        beanProMasterTicket.IN_SEQ = data.SEQRO;
        beanProMasterTicket.IN_CIA = '139';
        beanProMasterTicket.IN_FORMA = '3850';
        beanProMasterTicket.IN_SERIE = '642005';
        beanProMasterTicket.IN_SEQ = '00';


        win.displayProMasterTicket(this, 'Dashboard1', beanProMasterTicket);
    }

});
