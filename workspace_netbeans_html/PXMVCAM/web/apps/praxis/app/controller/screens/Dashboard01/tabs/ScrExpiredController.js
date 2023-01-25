Ext.define('Ext.Praxis.controller.screens.Dashboard01.tabs.ScrExpiredController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrExpiredController',
    searchParams: {},
    columns2: {},
    bean: {},
    beanDet: {},
    beanExpiredDetail: {},
    meExpired: '',
    dw_excel: false,
    boxActual: '-boxMainData_expired',
    drillDown: [],
    _path: '',
    init: function (view) {
        meExpired = this;
        meExpired.drillDown.push(meExpired.boxActual);
    },
    afterRender: function () {
        console.log(" -- Expired - AfterRender -----");

    },
    inicio: function () {
        console.clear();
        this.setFormatParameter();

        //Ext.getCmp(prototype.id + '-boxMainData_interline').hide();
        //Ext.getCmp(prototype.id + '-boxInt_Month_1').show();
        this.searchExpired();

    },
    setFormatParameter: function () {

        meExpired.bean = {};

        meExpired.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear_EXP').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth_EXP').getValue();
        meExpired.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear_EXP').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth_EXP').getValue();
        meExpired.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry_EXP').getValue() + '';

        meExpired.searchParams = JSON.stringify(meExpired.bean);
        console.log(meExpired.bean);
    },
    checkEvent: function (obj, e) {
        console.log(obj);
        console.log(e);
    },
    searchExpired: function () {

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchExpired'
            },
            listeners: {
                beforeload: function (obj) {
//                    Ext.getCmp(prototype.id + '-boxMainData_expired').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meExpired.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
//                    Ext.getCmp(prototype.id + '-boxMainData_expired').unmask();
                    win.lblUser_toolTip("Estructura: IMF117");

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
        Ext.getCmp(prototype.id + '-gridData_expired').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData_expired').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displayExpiredChartxxxx').bindStore(storeGridDatas);
    },
    GridExpiredDetail_colHandler: function (column, e, row, column, x, rowData) {
        this.beanExpiredDetail = {};
        this.beanExpiredDetail.beanString = JSON.stringify(rowData.data);

        console.log(this.beanExpiredDetail);
        this.loadExpiredDetail(this.beanExpiredDetail);
    },
    loadExpiredDetail: function (searchParams) {
        me.panelActual = '-boxMainData_expiredDetail';
        this.showGrid('-boxMainData_expiredDetail');
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchExpiredDetail'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxMainData_expiredDetail').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-boxMainData_expiredDetail').unmask();
                    win.lblUser_toolTip("Estructura: IMF117");
                    console.log(response)
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                            Ext.getCmp(prototype.id + '-ExpiredDetailTitle').setText("Accounting Date: " + obj.strFormatDate);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData_expiredDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData_expiredDetail').setStore(storeGridDatas);        
    },
    //To render
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    showGrid: function (nameGrid) {
        Ext.getCmp(prototype.id + meExpired.boxActual).hide();

        meExpired.boxActual = nameGrid;
        meExpired.drillDown.push(meExpired.boxActual);

        Ext.getCmp(prototype.id + meExpired.boxActual).show();
    },
    imgBack_clickHandler: function () {
        if (meExpired.drillDown.length > 1) {
            Ext.getCmp(prototype.id + meExpired.boxActual).hide();
            meExpired.drillDown.pop();
            meExpired.boxActual = meExpired.drillDown[meExpired.drillDown.length - 1];
            Ext.getCmp(prototype.id + meExpired.boxActual).show();
            console.log(meExpired.boxActual);
        }
    },
});
