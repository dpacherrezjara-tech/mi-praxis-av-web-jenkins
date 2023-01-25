Ext.define('Ext.Praxis.controller.screens.Dashboard01.tabs.ScrInterlineController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrInterlineController',

    searchParams: {},
    columns2: {},
    bean: {},
    beanDet: {},
    meInterline: '',
    dw_excel: false,
    boxActual: '-boxMainData_interline',
    drillDown: [],
    _path: '',

    init: function (view) {
        meInterline = this;
        meInterline.drillDown.push(meInterline.boxActual);
    },
    afterRender: function () {
        console.log(" -- Interline - AfterRender -----");

    },
    inicio: function () {
        console.clear();
        this.setFormatParameter();

        if (meInterline.bean.strOption === 'C') {
            Ext.getCmp(prototype.id + '-boxMainData_interline').hide();
            Ext.getCmp(prototype.id + '-boxInt_Month_1').show();
            this.searchInterline();
        } else {
            Ext.getCmp(prototype.id + '-boxMainData_interline').show();
            Ext.getCmp(prototype.id + '-boxInt_Month_1').hide();
            this.searchAnalysis();
        }


    },
    setFormatParameter: function () {

        meInterline.bean = {};

        meInterline.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear_INT').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth_INT').getValue();
        meInterline.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear_INT').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth_INT').getValue();
        meInterline.bean.strYearF = Ext.getCmp(prototype.id + '-cmbDateFromYear_INT').getValue() + '';
        meInterline.bean.strYearT = Ext.getCmp(prototype.id + '-cmbDateToYear_INT').getValue() + '';
        meInterline.bean.strMonthF = Ext.getCmp(prototype.id + '-cmbDateFromMonth_INT').getValue() + '';
        meInterline.bean.strMonthT = Ext.getCmp(prototype.id + '-cmbDateToMonth_INT').getValue() + '';
        meInterline.bean.IN_PERIOD = Ext.getCmp(prototype.id + '-cmbPERNUM_INT').getValue();
        meInterline.bean.A050AIRLIN = Ext.getCmp(prototype.id + '-cmbAirline_INT').getValue();
//        meInterline.bean.A050AIRLIN = '';
        meInterline.bean.strOption = '';

        var value = Ext.getCmp(prototype.id + '-cbCollection').getValue();
        if (value) {
            meInterline.bean.strOption = 'C';
        }
        meInterline.searchParams = JSON.stringify(meInterline.bean);

        console.log(meInterline.bean);

    },
    checkEvent: function (obj, e) {
        console.log(obj);
        console.log(e);
    },
    searchAnalysis: function () {

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchAnalysis'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meInterline.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-boxPrincipal').unmask();
                    win.lblUser_toolTip("Estructura: SFI040");

                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;

                            Ext.getCmp(prototype.id + '-HD_CURRENTYEAR').setText(obj.yearTo);
                            Ext.getCmp(prototype.id + '-HD_LASTYEAR').setText((parseInt(obj.yearFrom) - 1) + '');
                           
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else{
                        global.Msg({msg: res.sesion});
                    } 
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData_interline').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataP1_interline').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataP2_interline').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ChtExchangeMB_01112').bindStore(storeGridDatas);
    },

    searchInterline: function () {

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchInterline'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meInterline.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-boxPrincipal').unmask();
                    win.lblUser_toolTip("Estructura: A2654");

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
        Ext.getCmp(prototype.id + '-gridData_INT_1').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData_INT_2').bindStore(storeGridDatas);
        

    },

   
    //To render
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },

});
