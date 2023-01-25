/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.Forecast.ForecastController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ForecastController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    bean_2: '',
    beanDay: {},
    beanDetTran: {},
    beanDetCard: {},
    beanBank: {},
    beanTkt: {},
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    reg99: 0,
    me: '',
    searchParams: {},
    searchParams_2: {},
    paramsDetail: {},
    dataObtain: {},
    dataGrid: [],
    colors: [
        '#8ca640',
        '#974144',
        '#4091ba',
        '#8e658e',
        '#3b8d8b',
        '#40F09A',
        '#d2af69',
        '#6e8852',
        '#3dcc7e',
        '#a6bed1',
        '#cbaa4b',
        '#998baa'
    ],
    init: function(view) {
        me = this;
        prototype.id = 'ForecastForm';
        prototype.url = CONTEXTPATH + '/Forecast';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        prototypeProgram.view = 'flown-forecast-form';
        prototypeProgram.nprog = 'PX00000551';
        prototypeProgram.title = 'Forecast';
        prototypeProgram.modulo = '';

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#ForecastForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ForecastForm-btnSearch': {
                click: this.rbChangeType
            },
            '#ForecastForm-btnClear': {
                click: this.btnClear_click
            },
            '#ForecastForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ForecastForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ForecastForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#ForecastForm-btnBack': {
                click: this.btnBack_click
            },
            '#ForecastForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ForecastForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ForecastForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ForecastForm-btn-pag-last': {
                click: this.pagLast
            },
            '#ForecastForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#ForecastForm-cmbDateFromMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#ForecastForm-cmbDateToMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            }

        });
    },
    xpanel_afterrender: function(obj, e) {
        this.obtainData();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    obtainData: function() {

        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);


        /*var cmbTReg = Ext.getCmp(prototype.id + '-cmbTReg');
         cmbTReg.bindStore(Ext.create('Ext.data.ArrayStore', {
         autoLoad: false,
         fields: ['code', 'name'],
         data: [
         ["0", "Flown Real Contab."],
         ["1", "Flown Pend/Contab"],
         ["2", "Flown Future"]
         ]
         }));
         cmbTReg.setValue("0");*/

        this.dataObtain.BANK = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.dataObtain)},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);

                var lstBank = res.lstBank;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstBank,
                    autoLoad: true
                });
                //Ext.getCmp(prototype.id + '-cmbBank').bindStore(storeData);
                //Ext.getCmp(prototype.id + '-cmbBank').setValue('');
                me.btnSearch_click();
            }
        });
    },
    setFormatParameter: function() {
        me.bean = {};

        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();

        //me.bean.IN_TREG = Ext.getCmp(prototype.id + '-cmbTReg').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    setFormatParameterForYear: function(year) {
        me.bean = {};

        me.bean.IN_YEAR = year;

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    setFormatParameterForPreviousYear: function(year) {
        me.bean_2 = {};

        me.bean_2.IN_YEAR = year;

        var beanString = JSON.stringify(me.bean_2);
        searchParams_2 = {
            beanString: beanString,
            bean: me.bean_2
        };
    },
    rbChangeType: function() {
        Ext.getCmp(prototype.id + '-radiogroupForecast').hide();

        var selectedValue = Ext.getCmp(prototype.id + '-radiogroupType').getValue().rbgType;
        console.log(selectedValue);
        switch (selectedValue) {
            case 'F':
                Ext.getCmp(prototype.id + '-chkMarketByLevel').setVisible(false);
                Ext.getCmp(prototype.id + '-cmbSummaryType').setVisible(false);
                this.setFormatParameter();
                this.setGridData();
                break;
            case 'I':
                Ext.getCmp(prototype.id + '-chkMarketByLevel').setVisible(false);
                Ext.getCmp(prototype.id + '-cmbSummaryType').setVisible(false);
                this.setFormatParameter();
                this.setGridDataItinerary();
                break;
            case 'FC':
                Ext.getCmp(prototype.id + '-chkMarketByLevel').setVisible(false);
                Ext.getCmp(prototype.id + '-cmbSummaryType').setVisible(false);
                Ext.getCmp(prototype.id + '-radiogroupForecast').show();
                this.onChangeRadioForecast();
                //this.setFormatParameter();
                //this.setGridDataForecast();                
                break;
            case 'AZ':
                Ext.getCmp(prototype.id + '-chkMarketByLevel').setVisible(true);
                Ext.getCmp(prototype.id + '-chkMarketByLevel').setValue(false);
                Ext.getCmp(prototype.id + '-cmbSummaryType').setVisible(false);
                this.setFormatParameter();
                this.setGridDataAmountByZones();
                this.setGridDataAmountByMarket();
                break;
            case 'YY':
                Ext.getCmp(prototype.id + '-chkMarketByLevel').setVisible(false);
                Ext.getCmp(prototype.id + '-cmbSummaryType').setVisible(true);
                me.panelActual = '-panelGridDataRevenueByYear';
                global.selectedChild(me.childs, prototype.id + me.panelActual);
                this.setGridDataRevenueByCurrentYear();
                this.setGridDataRevenueByPreviousYear();
                this.setGridDataRevenueByYearGraphic();
                this.setGridDataRevenueByYearBalance();
                this.setGridDataRevenueByPreviousYearGeneral();
                this.setGridDataRevenueByCurrentYearGeneral();
                break;
                /*case 'FZ':
                 this.setFormatParameter();
                 this.setGridDataForecastZones();
                 break;*/
        }
    },
    onChangeRadioForecast: function() {
        var selectedValue = Ext.getCmp(prototype.id + '-radiogroupForecast').getValue().rbgTypeForecast;
        switch (selectedValue) {
            case 'FC':
                Ext.getCmp(prototype.id + '-chkMarketByLevel').setVisible(false);
                Ext.getCmp(prototype.id + '-cmbSummaryType').setVisible(false);
                this.setFormatParameter();
                this.setGridDataForecast();
                this.setGridDataForecastTotals();
                break;
            case 'FP':
                Ext.getCmp(prototype.id + '-chkMarketByLevel').setVisible(false);
                Ext.getCmp(prototype.id + '-cmbSummaryType').setVisible(false);
                this.setFormatParameter();
                this.setGridDataForecastPercentage();
                break;
            case 'FZ':
                Ext.getCmp(prototype.id + '-chkMarketByLevel').setVisible(false);
                Ext.getCmp(prototype.id + '-cmbSummaryType').setVisible(false);
                this.setFormatParameter();
                this.setGridDataForecastZones();
                break;
            case 'FD':
                Ext.getCmp(prototype.id + '-chkMarketByLevel').setVisible(false);
                Ext.getCmp(prototype.id + '-cmbSummaryType').setVisible(false);
                this.setFormatParameter();
                this.setGridDataFareDetail();
                break;
        }
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    setGridData: function() {
        win.lblUser_toolTip("Estructura: IMF140");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                            var data = obj.data.items[0].data;
                    }
//                        me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMain').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataMain').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataItinerary: function() {
        win.lblUser_toolTip("Estructura: IMF141");
        me.panelActual = '-panelGridDataItinerary';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchItinerary'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                            var data = obj.data.items[0].data;
                    }
//                        me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataItinerary').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataItinerary').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataForecast: function() {
        win.lblUser_toolTip("Estructura: IMF140");
        me.panelActual = '-panelGridDataForecast';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchForecast'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                            var data = obj.data.items[0].data;
                    }
//                        me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataForecast').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataForecast').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataForecastTotals: function() {
        win.lblUser_toolTip("Estructura: IMF140");
        //me.panelActual = '-panelGridDataForecast';
        //global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchForecastTotals'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        //console.log(obj.data);
//                            var data = obj.data.items[0].data;
                    }
//                        me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataForecastTotals').setTitle('<center style="font-size:12px;">' + 'Forecast Totals' + ' </center>');
        Ext.getCmp(prototype.id + '-gridDataForecastTotals').bindStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-gridDataForecast').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataForecastZones: function() {
        win.lblUser_toolTip("Estructura: IMF140");
        me.panelActual = '-panelGridDataForecastZones';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchForecastZones'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                            var data = obj.data.items[0].data;
                    }
//                        me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataForecastZones').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataForecastZones').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataFareDetail: function() {
        win.lblUser_toolTip("Estructura: IMF072");
        me.panelActual = '-panelGridDataFareDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchForecastCouponDetail'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin6');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                            var data = obj.data.items[0].data;
                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataFareDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataFareDetail').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
    },
    setGridDataForecastPercentage: function() {
        win.lblUser_toolTip("Estructura: IMF140/IMF141");
        me.panelActual = '-panelGridDataForecastPercentage';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        console.log(prototype.url)
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchPercentage'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                            var data = obj.data.items[0].data;
                    }
//                        me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataForecastPercentage').bindStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-gridDataForecast').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataAmountByZones: function() {
        win.lblUser_toolTip("Estructura: IMF140");
        me.panelActual = '-panelGridDataAmountByZones';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchAmountByZones'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                            var data = obj.data.items[0].data;
                    }
//                        me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataAmountByZones').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataAmountByZones').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displaySAChart01').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displaySAChart02').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataAmountByMarket: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchAmountByMarket'
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
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataAmountByMarket').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataAmountByMarket').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displaySAChart03').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displaySAChart04').bindStore(storeGridDatas);
    },
    btnSearch_MarketByLevel: function() {
        this.setFormatParameter();
        if (Ext.getCmp(prototype.id + '-chkMarketByLevel').getValue() === false) {
            Ext.getCmp(prototype.id + '-panelGridDataMarketInGeneral').setVisible(false);
            this.setGridDataAmountByZones();
            this.setGridDataAmountByMarket();
            return
        }

        win.lblUser_toolTip("Estructura: IMF140");
        me.panelActual = '-panelGridDataMarketInGeneral';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.setGridDataMarketFirstLevel();
        this.setGridDataMarketSecondLevel();

    },
    setGridDataMarketFirstLevel: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchForecastByMarketFirstLevel'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                            var data = obj.data.items[0].data;
                    }
//                        me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMarketFirstLevel').setTitle('<center style="font-size:12px;">' + 'First Level' + ' </center>');
        Ext.getCmp(prototype.id + '-gridDataMarketFirstLevel').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataMarketFirstLevel').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataMarketSecondLevel: function() {
        //Ext.getCmp(prototype.id + '-panelPNR').setVisible(false);

        var test = {};

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchForecastByMarketSecondLevel'
            }, listeners: {
                beforeload: function(obj) {
//                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, response, obj5) {
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetMarket = res.data;
                        if (gridDetMarket.length > 0) {
                            var data = {};
                            data = gridDetMarket[0];
                            //Ext.getCmp(prototype.id + '-panelGridDataByRefNbr').setTitle('<center style="font-size:12px;">' + ' Sale Date : ' + data.SDATE + ' - Reference Number: ' + data.REFNBR + ' - Status: ' + data.estadoTitulo + ' </center>');
                            //Colocando los totales
                            var lstInternational = res.lstInternational;
                            /*var international = new Array();
                             
                             lstInternational.forEach(function callback(currentValue, index, array) {
                             international.push([currentValue.ZONA, currentValue.QTYPAX, currentValue.VCPNUSD, currentValue.VCPNMXN, currentValue.VPROUSD, currentValue.VPROMXN, currentValue.totQTYPAX, currentValue.totVCPNUSD, currentValue.totVCPNMXN, currentValue.totVPROUSD, currentValue.totVPROMXN]);
                             });
                             var store = Ext.create('Ext.data.ArrayStore', {
                             storeId: 'international', autoLoad: true, data: international, fields: ['ZONA', 'QTYPAX', 'VCPNUSD', 'VCPNMXN', 'VPROUSD', 'VPROMXN', 'totQTYPAX', 'totVCPNUSD', 'totVCPNMXN', 'totVPROUSD', 'totVPROMXN']
                             });*/

                            var store = Ext.create('Ext.data.Store', {
                                data: lstInternational,
                                autoLoad: true
                            });

                            console.log(lstInternational);
                            Ext.getCmp(prototype.id + '-gridDataMarketSecondLevelInternational').bindStore(store);
                            //Ext.getCmp(prototype.id + '-gridDataMarketSecondLevelInternational').setStore(store);
                            Ext.getCmp(prototype.id + '-displaySAChart06').bindStore(store);

                        } else {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }

                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-panelGridDataMarketSecondLevel').setTitle('<center style="font-size:12px;">' + 'Second Level' + ' </center>');
        Ext.getCmp(prototype.id + '-gridDataMarketSecondLevelDomestic').setTitle('<center style="font-size:12px;">' + 'Domestic Market' + ' </center>');
        Ext.getCmp(prototype.id + '-gridDataMarketSecondLevelInternational').setTitle('<center style="font-size:12px;">' + 'International Market' + ' </center>');
        Ext.getCmp(prototype.id + '-gridDataMarketSecondLevelDomestic').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displaySAChart05').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataMarketSecondLevelDomestic').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataRevenueByCurrentYear: function() {
        var year = new Date().getFullYear();
        this.setFormatParameterForYear(year);
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchForecastRevenueByYear'
            }, listeners: {
                beforeload: function(obj) {
//                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, response, obj5) {
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetMarket = res.data;
                        if (gridDetMarket.length > 0) {
                            var data = {};
                            data = gridDetMarket[0];
                            var lstInternational = res.lstInternational;

                            var store = Ext.create('Ext.data.Store', {
                                data: lstInternational,
                                autoLoad: true
                            });

                            console.log(lstInternational);
                            Ext.getCmp(prototype.id + '-gridDataByCurrentYearInternationalUSD').bindStore(store);
                            //Ext.getCmp(prototype.id + '-gridDataByCurrentYearInternationalMXN').bindStore(store);
                        } else {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }

                }
            }
        });

        var months = new Array();
        months.push(['January'], ['February'], ['March'], ['April'], ['May'], ['June'], ['July'], ['August'], ['September'], ['October'], ['November'], ['December']);

        var storeMonths = Ext.create('Ext.data.ArrayStore', {
            storeId: 'months', autoLoad: true, data: months, fields: ['NAME']
        });
        Ext.getCmp(prototype.id + '-gridMonths_1').bindStore(storeMonths);

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataByCurrentYearDomesticUSD').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataByCurrentYearDomesticUSD').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-gridDataByCurrentYearDomesticMXN').bindStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-gridDataByCurrentYearDomesticMXN').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-panelDataCurrentYearUSD').setTitle('<center style="font-size:12px;">' + year + ' </center>');
        //Ext.getCmp(prototype.id + '-panelDataCurrentYearMXN').setTitle('<center style="font-size:12px;">' + year + ' </center>');
    },
    setGridDataRevenueByPreviousYear: function() {
        var prev_year = new Date().getFullYear() - 1;
        console.log(prev_year)
        this.setFormatParameterForPreviousYear(prev_year);
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchForecastRevenueByYear'
            }, listeners: {
                beforeload: function(obj) {
//                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');

                    obj.proxy.extraParams = searchParams_2;
                },
                load: function(obj, obj2, success, response, obj5) {
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetMarket = res.data;
                        if (gridDetMarket.length > 0) {
                            var data = {};
                            data = gridDetMarket[0];
                            var lstInternational = res.lstInternational;

                            var store = Ext.create('Ext.data.Store', {
                                data: lstInternational,
                                autoLoad: true
                            });

                            console.log(lstInternational);
                            Ext.getCmp(prototype.id + '-gridDataByPreviousYearInternationalUSD').bindStore(store);
                            //Ext.getCmp(prototype.id + '-gridDataByPreviousYearInternationalMXN').bindStore(store);
                        } else {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }

                }
            }
        });

        /*var months = new Array();
         months.push(['January'], ['February'], ['March'], ['April'], ['May'], ['June'], ['July'], ['August'], ['September'], ['October'], ['November'], ['December']);
         
         var storeMonths = Ext.create('Ext.data.ArrayStore', {
         storeId: 'months', autoLoad: true, data: months, fields: ['NAME']
         });
         Ext.getCmp(prototype.id + '-gridMonths_2').bindStore(storeMonths);*/

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataByPreviousYearDomesticUSD').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataByPreviousYearDomesticUSD').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-gridDataByPreviousYearDomesticMXN').bindStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-gridDataByPreviousYearDomesticMXN').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-panelDataPreviousYearUSD').setTitle('<center style="font-size:12px;">' + prev_year + ' </center>');
        //Ext.getCmp(prototype.id + '-panelDataPreviousYearMXN').setTitle('<center style="font-size:12px;">' + prev_year + ' </center>');
    },
    setGridDataRevenueByYearGraphic: function() {
        var year = new Date().getFullYear();
        this.setFormatParameterForYear(year);
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchForecastRevenueByYearGraphics'
            }, listeners: {
                beforeload: function(obj) {
//                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, response, obj5) {
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetMarket = res.data;
                        if (gridDetMarket.length > 0) {

                        } else {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }

                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-displaySAChart07').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displaySAChart08').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displaySAChart09').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displaySAChart10').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displaySAChart11').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displaySAChart12').bindStore(storeGridDatas);
        // Ext.getCmp(prototype.id + '-gridDataByCurrentYearDomesticMXN').bindStore(storeGridDatas);
    },
    setGridDataRevenueByYearBalance: function() {
        var year = new Date().getFullYear();
        this.setFormatParameterForYear(year);
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchForecastRevenueByYearBalance'
            }, listeners: {
                beforeload: function(obj) {
//                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, response, obj5) {
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetMarket = res.data;
                        if (gridDetMarket.length > 0) {

                        } else {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }

                }
            }
        });

        global.clear();
        console.log(storeGridDatas);
        Ext.getCmp(prototype.id + '-panelDataBalanceByYear').setTitle('<center style="font-size:12px;">' + 'Balance' + '</center>');
        Ext.getCmp(prototype.id + '-gridDataBalanceByYear').bindStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-').bindStore(storeGridDatas);
        // Ext.getCmp(prototype.id + '-gridDataByCurrentYearDomesticMXN').bindStore(storeGridDatas);
    },
    setGridDataRevenueByCurrentYearGeneral: function() {
        var year = new Date().getFullYear();
        this.setFormatParameterForYear(year);
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchForecastRevenueByYearGeneral'
            }, listeners: {
                beforeload: function(obj) {
//                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, response, obj5) {
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetMarket = res.data;
                        if (gridDetMarket.length > 0) {

                        } else {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }

                }
            }
        });

        global.clear();
        console.log(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataByCurrentYearGeneral').bindStore(storeGridDatas);
    },
    setGridDataRevenueByPreviousYearGeneral: function() {
        var prev_year = new Date().getFullYear() - 1;
        console.log(prev_year)
        this.setFormatParameterForPreviousYear(prev_year);
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchForecastRevenueByYearGeneral'
            }, listeners: {
                beforeload: function(obj) {
//                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = searchParams_2;
                },
                load: function(obj, obj2, success, response, obj5) {
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetMarket = res.data;
                        if (gridDetMarket.length > 0) {

                        } else {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }

                }
            }
        });

        global.clear();
        console.log(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataByPreviousYearGeneral').bindStore(storeGridDatas);
    },
    cbxSummaryType_changeHandler: function() {

        var value = Ext.getCmp(prototype.id + '-cmbSummaryType').getValue();

        switch (value) {
            case 'G':
                //Grillas
                //Previous
                Ext.getCmp(prototype.id + '-gridDataByPreviousYearDomesticUSD').setVisible(false);
                Ext.getCmp(prototype.id + '-gridDataByPreviousYearInternationalUSD').setVisible(false);
                Ext.getCmp(prototype.id + '-gridDataByPreviousYearGeneral').setVisible(true);
                //Current
                Ext.getCmp(prototype.id + '-gridDataByCurrentYearDomesticUSD').setVisible(false);
                Ext.getCmp(prototype.id + '-gridDataByCurrentYearInternationalUSD').setVisible(false);
                Ext.getCmp(prototype.id + '-gridDataByCurrentYearGeneral').setVisible(true);
                //Balance
                Ext.getCmp(prototype.id + '-DataDomesticBalanceByYear').setVisible(false);
                Ext.getCmp(prototype.id + '-DataInternationalBalanceByYear').setVisible(false);
                Ext.getCmp(prototype.id + '-DataGeneralBalanceByYear').setVisible(true);
                //Graficos                
                Ext.getCmp(prototype.id + '-panelGraphicDomestic').setVisible(false);
                Ext.getCmp(prototype.id + '-panelGraphicInternational').setVisible(false);
                Ext.getCmp(prototype.id + '-panelGraphicGeneral').setVisible(true);

                break;
            case 'I':
                //Previous
                Ext.getCmp(prototype.id + '-gridDataByPreviousYearDomesticUSD').setVisible(false);
                Ext.getCmp(prototype.id + '-gridDataByPreviousYearInternationalUSD').setVisible(true);
                Ext.getCmp(prototype.id + '-gridDataByPreviousYearGeneral').setVisible(false);
                //Current
                Ext.getCmp(prototype.id + '-gridDataByCurrentYearDomesticUSD').setVisible(false);
                Ext.getCmp(prototype.id + '-gridDataByCurrentYearInternationalUSD').setVisible(true);
                Ext.getCmp(prototype.id + '-gridDataByCurrentYearGeneral').setVisible(false);
                //Balance
                Ext.getCmp(prototype.id + '-DataDomesticBalanceByYear').setVisible(false);
                Ext.getCmp(prototype.id + '-DataInternationalBalanceByYear').setVisible(true);
                Ext.getCmp(prototype.id + '-DataGeneralBalanceByYear').setVisible(false);
                //Graficos                
                Ext.getCmp(prototype.id + '-panelGraphicDomestic').setVisible(false);
                Ext.getCmp(prototype.id + '-panelGraphicInternational').setVisible(true);
                Ext.getCmp(prototype.id + '-panelGraphicGeneral').setVisible(false);
                break;
            case 'D':
                //Previous
                Ext.getCmp(prototype.id + '-gridDataByPreviousYearDomesticUSD').setVisible(true);
                Ext.getCmp(prototype.id + '-gridDataByPreviousYearInternationalUSD').setVisible(false);
                Ext.getCmp(prototype.id + '-gridDataByPreviousYearGeneral').setVisible(false);
                //Current
                Ext.getCmp(prototype.id + '-gridDataByCurrentYearDomesticUSD').setVisible(true);
                Ext.getCmp(prototype.id + '-gridDataByCurrentYearInternationalUSD').setVisible(false);
                Ext.getCmp(prototype.id + '-gridDataByCurrentYearGeneral').setVisible(false);
                //Balance
                Ext.getCmp(prototype.id + '-DataDomesticBalanceByYear').setVisible(true);
                Ext.getCmp(prototype.id + '-DataInternationalBalanceByYear').setVisible(false);
                Ext.getCmp(prototype.id + '-DataGeneralBalanceByYear').setVisible(false);
                //Graficos                
                Ext.getCmp(prototype.id + '-panelGraphicDomestic').setVisible(true);
                Ext.getCmp(prototype.id + '-panelGraphicInternational').setVisible(false);
                Ext.getCmp(prototype.id + '-panelGraphicGeneral').setVisible(false);
                break;
        }

    },
    onGridDetDay: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetDay';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDay.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDay.strYearFrom = rowData.data.strYearFrom;
        this.beanDay.strYearTo = rowData.data.strYearTo;
        this.beanDay.strMonthFrom = rowData.data.strMonthFrom;
        this.beanDay.strMonthTo = rowData.data.strMonthTo;

        this.beanDay.BDATEP = rowData.data.BDATEP;
        this.beanDay.IN_CODEBANK = rowData.data.IN_CODEBANK;
        this.beanDay.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDay.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDay.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanDay.strFormatDate = rowData.data.strFormatDate;

        me.paramsDetail.beanString = JSON.stringify(this.beanDay);
//        console.log(this.beanDay);
        this.setGridDataDetDay();
    },
    setGridDataDetDay: function() {

        win.lblUser_toolTip("Estructura: A2345");
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetDay'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = me.paramsDetail;
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
                            var data = obj.data.items[0].data;
                            Ext.getCmp(prototype.id + '-gridDetDay').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDay').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    onGridDetTran: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        var cant = 0;
        switch (columnNum) {
            case 2 :
                rowData.data.IN_STVAL = '1';
                cant = rowData.data.QMATCH;
                break;
            case 4 :
                rowData.data.IN_STVAL = '2';
                cant = rowData.data.QLIQUI;
                break;
            case 6 :
                rowData.data.IN_STVAL = '3';
                cant = rowData.data.QBANK;
                break;
            case 8 :
                rowData.data.IN_STVAL = '4';
                cant = rowData.data.QDIFF;
                break;
        }
//
        if (cant > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxDetTran';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanDetTran.strFecFiltro = rowData.data.strFecFiltro;
            this.beanDetTran.BDATEP = rowData.data.BDATEP;
            this.beanDetTran.IN_CODEBANK = rowData.data.IN_CODEBANK;
            this.beanDetTran.IN_MERCHN = rowData.data.IN_MERCHN;
            this.beanDetTran.IN_STVAL = rowData.data.IN_STVAL;

            this.beanDetTran.strYearFrom = rowData.data.strYearFrom;
            this.beanDetTran.strYearTo = rowData.data.strYearTo;
            this.beanDetTran.strMonthFrom = rowData.data.strMonthFrom;
            this.beanDetTran.strMonthTo = rowData.data.strMonthTo;

//            me.paramsDetail.beanString = JSON.stringify(this.beanDetTran);
//            console.log(this.beanDetTran);
            this.setGridDetTran();

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setParamsDetail: function() {
        var paramsDetail = {};
        paramsDetail.beanString = JSON.stringify(this.beanDetTran);
        return paramsDetail;
    },
    setGridDetTran: function() {
        win.lblUser_toolTip("Estructura: A2345");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetTrans'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = me.setParamsDetail();
                    },
                    load: function(obj) {
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
                            Ext.getCmp(prototype.id + '-gridDetTran').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');

                            Ext.getCmp(prototype.id + '-lblTotT_QTYTRAN').setText(Ext.util.Format.number(data.totQTYTRAN, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotT_SVFOP').setText(Ext.util.Format.number(data.totSVFOP, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotT_MONBTCRE1').setText(Ext.util.Format.number(data.totMONBTCRE1, '0,000'));
//                            Ext.getCmp(prototype.id + '-lblTotT_RATCNAC1').setText(Ext.util.Format.number(data.totRATCNAC1, '0,000'));

                            Ext.getCmp(prototype.id + '-lblTotT_COMITCRE1').setText(Ext.util.Format.number(data.totCOMITCRE1, '0,000.00'));
                            Ext.getCmp(prototype.id + '-lblTotT_IVACRE1').setText(Ext.util.Format.number(data.totIVACRE1, '0,000.00'));
                            Ext.getCmp(prototype.id + '-lblTotT_MONBTDEB1').setText(Ext.util.Format.number(data.totMONBTDEB1, '0,000'));
//                            Ext.getCmp(prototype.id + '-lblTotT_RATDNAC1').setText(Ext.util.Format.number(data.totRATDNAC1, '0,000'));

                            Ext.getCmp(prototype.id + '-lblTotT_COMITDEB1').setText(Ext.util.Format.number(data.totCOMITDEB1, '0,000.00'));
                            Ext.getCmp(prototype.id + '-lblTotT_IVADEB1').setText(Ext.util.Format.number(data.totIVADEB1, '0,000.00'));
                            Ext.getCmp(prototype.id + '-lblTotT_MONBTEXT1').setText(Ext.util.Format.number(data.totMONBTEXT1, '0,000'));
//                            Ext.getCmp(prototype.id + '-lblTotT_RATCEXT1').setText(Ext.util.Format.number(data.totRATCEXT1, '0,000'));

                            Ext.getCmp(prototype.id + '-lblTotT_COMITEXT1').setText(Ext.util.Format.number(data.totCOMITEXT1, '0,000.00'));
                            Ext.getCmp(prototype.id + '-lblTotT_IVAEXT1').setText(Ext.util.Format.number(data.totIVAEXT1, '0,000.00'));

                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetTran').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        }
    },
    onGridDetCard: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        var cant = 0;
        switch (columnNum) {
            case 2 :
                rowData.data.IN_STVAL = '';
                cant = 1;
                break;
            case 9 :
                rowData.data.IN_STVAL = 'C';
                cant = rowData.data.COMITCRE1;
                break;
            case 13 :
                rowData.data.IN_STVAL = 'D';
                cant = rowData.data.COMITDEB1;
                break;
            case 17 :
                rowData.data.IN_STVAL = 'F';
                cant = rowData.data.COMITEXT1;
                break;
        }

        if (cant !== 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxDetCard';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanDetCard.strFecFiltro = rowData.data.strFecFiltro;
            this.beanDetCard.BDATEP = rowData.data.BDATEP;
            this.beanDetCard.CODEBANK = rowData.data.CODEBANK;
            this.beanDetCard.MERCHN = rowData.data.MERCHN;
            this.beanDetCard.DATEF = rowData.data.DATEF;
            this.beanDetCard.IN_STVAL = rowData.data.IN_STVAL;
            this.beanDetCard.strTitulo = rowData.data.strTitulo;
            this.beanDetCard.strBCard1 = rowData.data.strDescBank;

            this.beanDetCard.strYearFrom = rowData.data.strYearFrom;
            this.beanDetCard.strYearTo = rowData.data.strYearTo;
            this.beanDetCard.strMonthFrom = rowData.data.strMonthFrom;
            this.beanDetCard.strMonthTo = rowData.data.strMonthTo;

            me.paramsDetail.beanString = JSON.stringify(this.beanDetCard);
//            console.log(this.beanDetTran);
            this.setGridDetCard();

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridDetCard: function() {
        win.lblUser_toolTip("Estructura: A2290");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetCard'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function(obj) {
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
                            Ext.getCmp(prototype.id + '-gridDetCard').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetCard').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
        }
    },
    onGridDetTkt: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        var flagStatus = '';

        if (rowData.data.lngQTYDOC > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxDetTicket';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            if (rowData.data.IN_STVAL !== "" || rowData.data.IN_BSTVAL !== "") {
                flagStatus = 'S';
            } else {
                flagStatus = '';
            }

            this.beanTkt.FCONC = rowData.data.FCONC;
            this.beanTkt.TDOC = rowData.data.TDOC;
            this.beanTkt.SDATE = rowData.data.SDATE;
            this.beanTkt.SCOUNTRY = rowData.data.SCOUNTRY;
            this.beanTkt.TDOC = rowData.data.TDOC;
            this.beanTkt.CODEBANK = rowData.data.CODEBANK;
            this.beanTkt.SCARCOD = rowData.data.SCARCOD;
            this.beanTkt.SCARDN = rowData.data.SCARDN;
            this.beanTkt.SAUTHOC = rowData.data.SAUTHOC;
            this.beanTkt.SVFOP = rowData.data.SVFOP;
            this.beanTkt.SEQNUM = rowData.data.SEQNUM;
            this.beanTkt.NUMREF = rowData.data.NUMREF;

            this.beanTkt.strDescCard = rowData.data.strDescCard;
            this.beanTkt.strFormatDate = rowData.data.strFormatDate;
            this.beanTkt.strDescCountry = rowData.data.strDescCountry;
            this.beanTkt.IN_SDATE = rowData.data.IN_SDATE;
            this.beanTkt.IN_TDOC = rowData.data.IN_TDOC;
            this.beanTkt.IN_PAYMENT = rowData.data.IN_PAYMENT;
            this.beanTkt.IN_CARDN = rowData.data.IN_CARDN;
            this.beanTkt.IN_CARDC = rowData.data.IN_CARDC;
            this.beanTkt.NUMREF = rowData.data.NUMREF;
            this.beanTkt.strTitulo = rowData.data.strTitulo;
            this.beanTkt.FTE = rowData.data.FTE;

            this.beanTkt.BAID = rowData.data.BAID;

            me.paramsDetail.beanString = JSON.stringify(this.beanTkt);
            this.setGridDetTkt();
        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridDetTkt: function() {
        win.lblUser_toolTip("Estructura: A2290");
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetTicket'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function(obj) {
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

                            Ext.getCmp(prototype.id + '-gridDetTicket').setTitle('<center style="font-size:12px;">' + data.strTitulo + ' - CC Nbr: ' + data.ACARDN + '</center>');
                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetTicket').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
        }
    },
    imgByTDOC_clickHandler: function() {
//        this.btnSearch_click();
    },
    gridData_VIEWTKT_clickHandler: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.TICKET;
        var beanProMasterTicket = {};
//        
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 13);
        //beanProMasterTicket.IN_SEQ = '00';

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'Forecast', beanProMasterTicket);
    },
    validateFields: function() {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.ForecastForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry
            }
        }).show();
    },
    btnBack_click: function(obj, e) {
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
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        //Ext.getCmp(prototype.id + '-cmbTReg').setValue('');
        //Ext.getCmp(prototype.id + '-cmbBank').setValue('');
        Ext.getCmp(prototype.id + '-txtMerchant').setValue('');
    },
    btnExcel_click: function(obj, e) {

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download File ?',
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

        this.setFormatParameter();
        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            case  '-panelGridDataItinerary':
                global.getFile(prototype.url + '/getXLSXItinerary?beanString=' + searchParams.beanString);
                break;
            case  '-panelGridDataForecast':
                global.getFile(prototype.url + '/getXLSXForecast?beanString=' + searchParams.beanString);
                break;
            case  '-panelGridDataForecastPercentage':
                global.getFile(prototype.url + '/getXLSXForecastPercentage?beanString=' + searchParams.beanString);
                break;
            case  '-panelGridDataForecastZones':
                global.getFile(prototype.url + '/getXLSXForecastZones?beanString=' + searchParams.beanString);
                break;
            case  '-panelGridDataAmountByZones':
                global.getFile(prototype.url + '/getXLSXAmountByZones?beanString=' + searchParams.beanString);
                break;
            case  '-panelGridDataFareDetail':
                global.getFile(prototype.url + '/getTXTForecastCouponDetail?beanString=' + searchParams.beanString);
                break;
//            case  '-boxDetTicket':
//                global.getFile(prototype.url + '/getXLSXTicket?beanString=' + me.paramsDetail.beanString);
//                break;
        }
    },
    btnFilter_click: function(obj) {

        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function() {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        if (me.panelActual === '-panelGridData' || me.panelActual === '-boxDetDay') {
            Ext.getCmp(prototype.id + '-pie').setVisible(false);
        } else {
            Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
            Ext.getCmp(prototype.id + '-pie').setVisible(true);
        }
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case '-boxDetDay':
                me.pagginActual = '-paggin2';
                break;
            case '-boxDetTran':
                me.pagginActual = '-paggin3';
                break;
            case '-boxDetCard':
                me.pagginActual = '-paggin4';
                break;
            case '-boxDetTicket':
                me.pagginActual = '-paggin5';
                break;
            case '-panelGridDataFareDetail':
                me.pagginActual = '-paggin6';
                break;
        }
    },
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function(obj) {
        obj.setValue('01');
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
    /*     
     * Funciones para la paginacion     
     */
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
    },
    getInt: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnRender: function(sprite, config, data, index) {
        return {
            fillStyle: this.colors[index],
            strokeStyle: index % 2 ? 'none' : 'black',
            opacity: index % 2 ? 1 : 0.5
        };
    }

}
);