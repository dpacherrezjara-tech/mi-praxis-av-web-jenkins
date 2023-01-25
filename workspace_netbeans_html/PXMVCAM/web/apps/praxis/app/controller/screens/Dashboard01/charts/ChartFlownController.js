Ext.define('Ext.Praxis.controller.screens.Dashboard01.charts.ChartFlownController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChartFlownController',
    searchParams: {},
    searchParamsB: {},
    columns2: {},
    beanChart: {},
    fecha: new Date(),
    beanChart_F: {},
    beanDet: {},
    dataObtain_chart: {},
    searchParamsCountryOfSale: {},
    dataRoute_chart: [],
    dataAirline_chart: [],
    lstAgent_chart: [],
    lstTotales: [],
    lstTotalesGraf: [],
    storeGridDatas: '',
    meFChart: '',
    cara: 0,
    dw_excel: false,
    boxActual: '-boxMainDataFA',
    drillDown: [],
    colors: [
        '#8ca640',
        '#974144',
        '#4091ba',
        '#8e658e',
        '#3b8d8b',
        '#b86465',
        '#d2af69',
        '#6e8852',
        '#3dcc7e',
        '#a6bed1',
        '#cbaa4b',
        '#998baa'
    ],
    _path: '',
    init: function (view) {
        meFChart = this;
        this.setStoreData();

    },
    afterRender: function () {
        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        Ext.getCmp(prototype.id + '-cmbDateYear_Chart').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbFADateFromYear1').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateMonthFrom_Chart').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateMonthTo_Chart').setValue("");
        Ext.getCmp(prototype.id + '-cmbFADateFromMonth1').setValue("");
        Ext.getCmp(prototype.id + '-cmbFADateToMonth1').setValue("");
        meFChart.inicio();
//        Ext.getCmp(prototype.id + '-Box_Chart_Flown').items.items[0].setValue(true);
    },
    setStoreData: function () {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbFADateFromYear1').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbFADateFromYear1').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbFADateFromMonth1').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbFADateToMonth1').bindStore(storeComboDataMonth);
    },
    inicio: function () {
        this.setFormatParameter();
        console.log(this.cara);
        switch (this.cara) {
            case 1:
                this.loadFlownChartMonth();
                break;
            case 2:
                this.loadFlownChartOnOff();
                break;
            case 3:
                this.loadFlownChartByZone();
                break;    
        }
    },
    inicio2: function () {
        this.setFormatParameter();
        this.cara = 1;
        this.loadFlownChartMonth();
    },
    setFormatParameter: function () {

        meFChart.beanChartFM = {};
        console.log(this.cara);
        meFChart.beanChartFM.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbFADateFromYear1').getValue() + Ext.getCmp(prototype.id + '-cmbFADateFromMonth1').getValue();
        meFChart.beanChartFM.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbFADateFromYear1').getValue() + Ext.getCmp(prototype.id + '-cmbFADateToMonth1').getValue();
        meFChart.beanChartFM.IN_FECHA_FROMB = (Ext.getCmp(prototype.id + '-cmbFADateFromYear1').getValue() - 1) + Ext.getCmp(prototype.id + '-cmbFADateFromMonth1').getValue();
        meFChart.beanChartFM.IN_FECHA_TOB = (Ext.getCmp(prototype.id + '-cmbFADateFromYear1').getValue() - 1) + Ext.getCmp(prototype.id + '-cmbFADateToMonth1').getValue();
        meFChart.beanChartFM.MESES = Ext.getCmp(prototype.id + '-cmbFADateToMonth1').getValue() - Ext.getCmp(prototype.id + '-cmbFADateFromMonth1').getValue();
        if (meFChart.beanChartFM.MESES === 0 && Ext.getCmp(prototype.id + '-cmbFADateToMonth1').getValue() === "" && Ext.getCmp(prototype.id + '-cmbFADateFromMonth1').getValue() === "") {
            meFChart.beanChartFM.MESES = 12;
        } else {
            meFChart.beanChartFM.MESES += 1;
        }
        if(this.cara === 3){
            meFChart.beanChartFM.MESES = 11;
        }
        meFChart.searchParams = JSON.stringify(meFChart.beanChartFM);
        console.log(meFChart.beanChartFM);
    },
    cbxDateFromMonth_changeHandler_chart: function () {
        Ext.getCmp(prototype.id + '-cmbFADateToMonth1').setValue(Ext.getCmp(prototype.id + '-cmbFADateFromMonth1').getValue());
    },
    onClickSearch: function () {
        this.inicio();
        console.log('onClickSearch');
    },
    hidePanelGraficos: function () {
        Ext.getCmp(prototype.id + '-boxFlownByMonth').hide();
        Ext.getCmp(prototype.id + '-boxFlownOnOff').hide();
        Ext.getCmp(prototype.id + '-boxFlownByZone').hide();
    },
    chooseChart_clickHandler: function (obj, rb_new, rb_old, func) {
        var valueRadio = rb_new.rb;
        this.hidePanelGraficos();
        this.setFormatParameter();
        console.log(this.cara);
        switch (valueRadio) {
            case 'MO':   
                Ext.getCmp(prototype.id + '-boxFlownByMonth').show();
                this.cara = 1;
                this.loadFlownChartMonth();
                break;
            case 'NF':    
                Ext.getCmp(prototype.id + '-boxFlownOnOff').show();
                this.cara = 2;
                this.loadFlownChartOnOff();
                break;
            case 'ZN':    
                Ext.getCmp(prototype.id + '-boxFlownByZone').show();
                this.cara = 3;
                this.loadFlownChartByZone();
                break;    
        }
    },
    loadFlownChartMonth: function () {
        console.log('loadFlownChartMonth');
        win.lblUser_toolTip("Estructura: A1791");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchFlownByMonth'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: meFChart.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {               
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                            console.log(res.data.length);
                            
                            var lstTot_piePB = [];
                            var item_pie1PB = {};
                            for (var k = 0; k < res.data.length; k++){
                                item_pie1PB.VCPNB = res.data[k].VCPNB;
                                item_pie1PB.strValueB = res.data[k].strValueB;
                                lstTot_piePB.push(item_pie1PB);
                                item_pie1PB = {};
                            }
                            console.log(lstTot_piePB);
                             var storeDataTotales_piePB = Ext.create('Ext.data.Store', {
                                data: lstTot_piePB,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-displayFlownMonthPieBack').bindStore(storeDataTotales_piePB);
                           
                           var lstTot_pieP = [];
                            var item_pie1P = {};
                            for (var k = 0; k < res.data.length; k++){
                                item_pie1P.VCPN = res.data[k].VCPN;
                                item_pie1P.strValue = res.data[k].strValue;
                                lstTot_pieP.push(item_pie1P);
                                item_pie1P = {};
                            }
                            console.log(lstTot_pieP);
                             var storeDataTotales_pieP = Ext.create('Ext.data.Store', {
                                data: lstTot_pieP,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-displayFlownMonthPieNow').bindStore(storeDataTotales_pieP);
                           
                            Ext.getCmp(prototype.id + '-displayFlownMonthPieNow').setTitle('<center style="font-size:16px;"> Flown Total Amount USD - ' + obj.strYear + '</center>');
                            Ext.getCmp(prototype.id + '-displayFlownMonthPieBack').setTitle('<center style="font-size:16px;"> Flown Total Amount USD - ' + obj.strYearB + '</center>');
                            
                            var vsy = '<a style="color:#209938;">' + obj.strYear + '</a>'
                            var vsyb = '<a style="color:#1c50c9;">' + obj.strYearB + '</a>'
                            var vs = vsyb + ' vs ' + vsy;
                            Ext.getCmp(prototype.id + '-displayFlownMonthBared').setTitle('<center style="font-size:16px;"> Flown Total Amount USD - ' + vs + '</center>');
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData_FlownMonthBack').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData_FlownMonthNow').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displayFlownMonthBared').bindStore(storeGridDatas);
        me.storeGridDatas = storeGridDatas;

    },
    loadFlownChartOnOff: function () {
        console.log('loadFlownChartOnOff');
        win.lblUser_toolTip("Estructura: A1793");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchFlownOnOff'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: meFChart.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {                
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res.data);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;

                            var lstTot_pie = [];
                            var lstTotalesPie = [];
                            var item_pie1 = {};
                            var item_pie2 = {};
                            lstTotalesPie = res.data[0];
                            item_pie1.AngleBNF = lstTotalesPie.TOVCPNONB; 
                            lstTot_pie.push(item_pie1);
                            item_pie2.AngleBNF = lstTotalesPie.TOVCPNOALB; 
                            lstTot_pie.push(item_pie2);
                            
                            var lstTot_pieNF = [];
                            var lstTotalesPieNF = [];
                            var item_pie1NF = {};
                            var item_pie2NF = {};
                            lstTotalesPieNF = res.data[0];
                            item_pie1NF.AngleNF = lstTotalesPieNF.TOVCPNON; 
                            lstTot_pieNF.push(item_pie1NF);
                            item_pie2NF.AngleNF = lstTotalesPieNF.TOVCPNOAL; 
                            lstTot_pieNF.push(item_pie2NF);
                        
                            var storeDataTotales_pie = Ext.create('Ext.data.Store', {
                                data: lstTot_pie,
                                autoLoad: true
                            });
                             var storeDataTotales_pieNF = Ext.create('Ext.data.Store', {
                                data: lstTot_pieNF,
                                autoLoad: true
                            });

                            Ext.getCmp(prototype.id + '-displayFlownOnOffPieBack').bindStore(storeDataTotales_pie);
                            Ext.getCmp(prototype.id + '-displayFlownOnOffPieNow').bindStore(storeDataTotales_pieNF);


                            Ext.getCmp(prototype.id + '-displayFlownOnOffPieNow').setTitle('<center style="font-size:16px;"> Flown Total ' + obj.strYear + ' Amount USD - On vs Off </center>');
                            Ext.getCmp(prototype.id + '-displayFlownOnOffPieBack').setTitle('<center style="font-size:16px;"> Flown Total ' + obj.strYearB + ' Amount USD - On vs Off </center>');
                            
                            var vsy = '<a style="color:#209938;">' + obj.strYear + '</a>'
                            var vsyb = '<a style="color:#1c50c9;">' + obj.strYearB + '</a>'
                            var vs = vsyb + ' vs ' + vsy;
                            Ext.getCmp(prototype.id + '-displayFlownOnOffBared').setTitle('<center style="font-size:16px;"> Flown Total Amount USD - ' + vs + '</center>');
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData_FlownOnOffNow').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData_FlownOnOffBack').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displayFlownOnOffBared').bindStore(storeGridDatas);
        me.storeGridDatas = storeGridDatas;
    },
    loadFlownChartByZone: function () {
        console.log('loadFlownChartOnOff');
        win.lblUser_toolTip("Estructura: A1793");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchFlownByZone'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: meFChart.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {                
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res.data);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;

//                            var lstTot_pie = [];
//                            var lstTotalesPie = [];
//                            var item_pie1 = {};
//                            var item_pie2 = {};
//                            lstTotalesPie = res.data[0];
//                            item_pie1.AngleBNF = lstTotalesPie.TOVCPNONB; 
//                            lstTot_pie.push(item_pie1);
//                            item_pie2.AngleBNF = lstTotalesPie.TOVCPNOALB; 
//                            lstTot_pie.push(item_pie2);
//                            
//                            var lstTot_pieNF = [];
//                            var lstTotalesPieNF = [];
//                            var item_pie1NF = {};
//                            var item_pie2NF = {};
//                            lstTotalesPieNF = res.data[0];
//                            item_pie1NF.AngleNF = lstTotalesPieNF.TOVCPNON; 
//                            lstTot_pieNF.push(item_pie1NF);
//                            item_pie2NF.AngleNF = lstTotalesPieNF.TOVCPNOAL; 
//                            lstTot_pieNF.push(item_pie2NF);
//                        
//                            var storeDataTotales_pie = Ext.create('Ext.data.Store', {
//                                data: lstTot_pie,
//                                autoLoad: true
//                            });
//                             var storeDataTotales_pieNF = Ext.create('Ext.data.Store', {
//                                data: lstTot_pieNF,
//                                autoLoad: true
//                            });

//                            Ext.getCmp(prototype.id + '-displayFlownOnOffPieBack').bindStore(storeDataTotales_pie);
//                            Ext.getCmp(prototype.id + '-displayFlownOnOffPieNow').bindStore(storeDataTotales_pieNF);
//
//
                            Ext.getCmp(prototype.id + '-displayFlownByZonePieBack').setTitle('<center style="font-size:16px;"> Flown By Zone - ' + obj.strYearB + '</center>');
                            Ext.getCmp(prototype.id + '-displayFlownByZonePieNow').setTitle('<center style="font-size:16px;"> Flown By Zone - ' + obj.strYear + '</center>');
                            Ext.getCmp(prototype.id + '-displayFlownByZoneLine').setTitle('<center style="font-size:20px;"> Pasenger By Market </center>');
                            
//                            var vsy = '<a style="color:#209938;">' + obj.strYear + '</a>'
//                            var vsyb = '<a style="color:#1c50c9;">' + obj.strYearB + '</a>'
//                            var vs = vsyb + ' vs ' + vsy;
//                            Ext.getCmp(prototype.id + '-displayFlownOnOffBared').setTitle('<center style="font-size:16px;"> Flown Total Amount USD - ' + vs + '</center>');
                            Ext.getCmp(prototype.id + '-yearBack').setText('Year ' + obj.strYearB);
                            Ext.getCmp(prototype.id + '-yearNow').setText('Year ' + obj.strYear);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData_FlownByZoneBack').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData_FlownByZoneNow').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData_FlownByZones').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displayFlownByZonePieBack').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displayFlownByZonePieNow').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displayFlownByZoneLine').bindStore(storeGridDatas);
        me.storeGridDatas = storeGridDatas;
    },
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnRender: function (sprite, config, data, index) {
        return {
            fillStyle: this.colors[index],
            strokeStyle: index % 2 ? 'none' : 'black',
            opacity: index % 2 ? 1 : 0.5
        };
    }
});
