Ext.define('Ext.Praxis.controller.screens.Dashboard01.tabs.ScrEMDController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrEMDController',
    searchParams: {},
    paramsDetail: {},
    columns2: {},
    bean: {},
    beanDet: {},
    beanByDay: {},
    meEMD: '',
    dw_excel: false,
    boxActual: '-boxMainData_EMD',
    drillDown: [],
    _path: '',
    init: function(view) {
        meEMD = this;
        meEMD.drillDown.push(meEMD.boxActual);
    },
    afterRender: function() {
        console.log(" -- Interline - AfterRender -----");

    },
    inicio: function() {
        console.log('entro');
        console.log(prototype.url);
//        console.clear();
        if (Ext.getCmp(prototype.id + '-boxMainData_EMD').isVisible()) {
            Ext.getCmp(prototype.id + '-boxMainData_USE').setVisible(false);
        } else {
            Ext.getCmp(prototype.id + '-boxMainData_USE').setVisible(true);
        }
        this.setFormatParameter();
        this.searchEMD();

    },
    setFormatParameter: function() {

        meEMD.bean = {};

        meEMD.bean.IN_TIPO_FEC = Ext.getCmp(prototype.id + '-cmbDate').getValue();
        meEMD.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear_EMD').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth_EMD').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay_EMD').getValue();
        meEMD.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear_EMD').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth_EMD').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay_EMD').getValue();
//        meEMD.bean.strYearF = Ext.getCmp(prototype.id + '-cmbDateFromYear_INT').getValue() + '';
//        meEMD.bean.strYearT = Ext.getCmp(prototype.id + '-cmbDateToYear_INT').getValue() + '';
//        meEMD.bean.strMonthF = Ext.getCmp(prototype.id + '-cmbDateFromMonth_INT').getValue() + '';
//        meEMD.bean.strMonthT = Ext.getCmp(prototype.id + '-cmbDateToMonth_INT').getValue() + '';

        meEMD.searchParams = JSON.stringify(meEMD.bean);

        console.log(meEMD.bean);

    },
    checkEvent: function(obj, e) {
        console.log(obj);
        console.log(e);
    },
    rbgReport_clickHandler: function() {
        var tipoReporte = Ext.getCmp(prototype.id + '-rbgStatus').getValue().rbgStatus;
        console.log(tipoReporte);
        if (tipoReporte === 'rbUSE') {
            Ext.getCmp(prototype.id + '-boxMainData_EMD').setVisible(false);
            Ext.getCmp(prototype.id + '-boxMainData_USE').setVisible(true);

        } else {
            Ext.getCmp(prototype.id + '-boxMainData_EMD').setVisible(true);
            Ext.getCmp(prototype.id + '-boxMainData_USE').setVisible(false);
        }
        this.searchEMD();
    },
    searchAnalysis: function() {

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchAnalysis'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meEMD.searchParams};
                },
                load: function(obj, obj2, success, response, obj5) {
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
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData_interline').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataP1_interline').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataP2_interline').bindStore(storeGridDatas);

    },
    searchInterline: function() {

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchInterline'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meEMD.searchParams};
                },
                load: function(obj, obj2, success, response, obj5) {
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
    searchEMD: function() {

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchEMD'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-boxMainData_EMD').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meEMD.searchParams};
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-boxMainData_EMD').unmask();
                    win.lblUser_toolTip("Estructura: IMF053");

                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                            var headerColumn = Ext.getCmp(prototype.id + '-columnName01');
                            var headerColumn2 = Ext.getCmp(prototype.id + '-columnName02');
                            if (obj.IN_TIPO_FEC === '2') {
                                headerColumn.setText("Accounting");
                                headerColumn2.setText("Accounting");
                            } else {
                                headerColumn.setText("Sale");
                                headerColumn2.setText("Sale");
                            }

                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData_EMD').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData_USE').bindStore(storeGridDatas);


    },
    imgByDay_clickHandler: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        meEMD.drillDown.push(me.boxActual);
        meEMD.boxActual = '-panelGridDetDay';
//        global.selectedChild(meEMD.childs, prototype.id + meEMD.boxActual);

        this.beanByDay.IN_TIPO_FEC = rowData.data.IN_TIPO_FEC;
        this.beanByDay.strFecha = rowData.data.strFecha;
        this.beanByDay.strFormatDate = rowData.data.strFormatDate;


        meEMD.paramsDetail.beanString = JSON.stringify(this.beanByDay);
        console.log(this.beanByDay);
        //this.setGridDataByDay();
    },
    setGridDataByDay: function() {
        console.log('Entro');
        win.lblUser_toolTip("Estructura: IMF053");
        me.panelActual = '-boxMainDetailData_EMD';
//        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDayEMD'
            }, listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-gridDetailData_EMD').mask('Loading...');
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    Ext.getCmp(prototype.id + '-gridDetailData_EMD').unmask();
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-gridDetailData_EMD').setTitle('<center style="font-size:12px;">' + bean.strFormatDate + '</center>');

                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDetailData_EMD').bindStore(storeGridDatas);
    },
    //To render
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
});
