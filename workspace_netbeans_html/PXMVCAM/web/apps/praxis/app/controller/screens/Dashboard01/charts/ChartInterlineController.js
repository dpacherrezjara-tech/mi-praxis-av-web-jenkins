Ext.define('Ext.Praxis.controller.screens.Dashboard01.charts.ChartInterlineController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChartInterlineController',
    searchParams: {},
    columns2: {},
    bean: {},
    beanWK: {},
    beanDet: {},
    dataObtain_chart: {},
    dataAirline_chart: [],
    gridData_WK_AC: [],
    gridData2AC: [],
    gridDataRatesAC: [],
    storeGridDatas: '',
    meIChart: '',
    dw_excel: false,
    boxActual: '-boxMainData_interline',
    drillDown: [],
    a:0,
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
    colors_WK: [
        '#33bdda',
        '#FAB347',
        '#6baa01',
        '#FF7F00',
        '#025669',
        '#e44a00'
    ],
    _path: '',
    init: function (view) {
        meIChart = this;
        this.setStoreData();
        
    },
    afterRender: function () {

        Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').setValue(new Date().getFullYear());
        
        var mes = new Date().getMonth() + 1;
        if (mes < 10) mes = "0" + mes;
//        Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').setValue(mes);
        Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').setValue("");
//        Ext.getCmp(prototype.id + '-cmbDateMonthTo_IA_Chart').setValue(mes);
        Ext.getCmp(prototype.id + '-cmbDateMonthTo_IA_Chart').setValue("");
        
        Ext.getCmp(prototype.id + '-rbChart_IA').items.items[0].setValue(true);
        Ext.getCmp(prototype.id + '-rbChart_IA').cheked = true;
        Ext.getCmp(prototype.id + '-cmbAirline_INT2').setValue("");
        
        meIChart.inicio();
        
    },
    setStoreData: function () {

        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').bindStore(storeComboDataYear);
        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateMonthTo_IA_Chart').bindStore(storeComboDataMonth);
        this.dataObtain_chart.AIRLINE = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.dataObtain_chart)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                me.lstAIRLINE = res.lstAIRLINE;
                console.log(res);
                var storeDataAirline = Ext.create('Ext.data.Store', {
                    data: me.lstAIRLINE,
                    autoLoad: false
                });
                Ext.getCmp(prototype.id + '-cmbAirline_INT2').bindStore(storeDataAirline);
                Ext.getCmp(prototype.id + '-cmbAirline_INT2').setValue('');

            }
        });
    },
    inicio: function () {
        this.setFormatParameter(a);
        var valueRadio = Ext.getCmp(prototype.id + '-rbChart_IA').getValue().rb;
        if(a === 1){
            valueRadio = 'rbc1_IA';
        }
        console.log(valueRadio);
        console.log(a);
        switch (valueRadio) {
            case 'rbc1_IA':
                a =0;
                Ext.getCmp(prototype.id + '-cmbAirline_INT2').show();
                Ext.getCmp(prototype.id + '-cmbAirline_INT2_2').show();
                
                meIChart.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').getValue();
                meIChart.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthTo_IA_Chart').getValue();
                meIChart.bean.A050AIRLIN = Ext.getCmp(prototype.id + '-cmbAirline_INT2').getValue();
                meIChart.searchParams = JSON.stringify(meIChart.bean);
                console.log(meIChart.bean);
                this.searchInterline();
                break;
            case 'rbc2_IA':
                a = 0;
                Ext.getCmp(prototype.id + '-cmbAirline_INT2').hide();
                Ext.getCmp(prototype.id + '-cmbAirline_INT2_2').hide();
                
                meIChart.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').getValue();
                meIChart.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthTo_IA_Chart').getValue();

                var valueP = Ext.getCmp(prototype.id + '-rbcP').getValue().rb01;
                switch (valueP) {
                    case 'Prime' :
                        meIChart.bean.strEstado = 'P';
                        break;

                    case 'Reject' :
                        meIChart.bean.strEstado = 'R';
                        break;

                }
                meIChart.searchParams = JSON.stringify(meIChart.bean);
                console.log(meIChart.bean);
                this.searchInterlineByAir();
                break;

            case 'rbc3_IA' :
//                this.obtainDataFilter_WK();
                a = 0;
                Ext.getCmp(prototype.id + '-cmbAirline_INT2').hide();
                Ext.getCmp(prototype.id + '-cmbAirline_INT2_2').hide();
                
                var monthSelect = Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').getValue();
//                var mesFrom = parseInt(monthSelect) + 1;
                var mesFrom = monthSelect;
                
//                if (mesFrom < 10) mesFrom = "0" + mesFrom;
                                
//                meIChart.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').getValue();
                meIChart.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + mesFrom;
                
                meIChart.bean.IN_SELECTBY = Ext.getCmp(prototype.id + '-cmbSelectBy_WK').getValue();
                meIChart.bean.IN_TYPEDOC = Ext.getCmp(prototype.id + '-cmbTypeDoc').getValue();
                meIChart.bean.IN_TIPOFECHA = Ext.getCmp(prototype.id + '-cmbFecha').getValue();
                meIChart.bean.IN_AIRLINE = Ext.getCmp(prototype.id + '-cmbAerolinea').getValue();
                meIChart.bean.IN_SOURCE = Ext.getCmp(prototype.id + '-cmbSourceCode').getValue();
                if(meIChart.bean.IN_SOURCE == null){
                    meIChart.bean.IN_SOURCE = "";
                }
                meIChart.searchParams = JSON.stringify(meIChart.bean);
                console.log(meIChart.bean);
                this.search_WK();
                break;
        }
    },
    setFormatParameter: function (a) {

        meIChart.bean = {};
        if(a === 1){
            console.log(a)
            valueRadio = 'rbc1_IA';
        }
//        Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').setValue('')
//        Ext.getCmp(prototype.id + '-cmbDateMonthTo_IA_Chart').setValue('')

        var valueRadio = Ext.getCmp(prototype.id + '-rbChart_IA').getValue().rb;
        console.log(valueRadio);
        switch (valueRadio) {
            case 'rbc1_IA':
                console.log('aquije');
                Ext.getCmp(prototype.id + '-cmbAirline_INT2').show();
                Ext.getCmp(prototype.id + '-cmbAirline_INT2_2').show();
                
                meIChart.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').getValue();
                meIChart.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthTo_IA_Chart').getValue();
                meIChart.bean.A050AIRLIN = Ext.getCmp(prototype.id + '-cmbAirline_INT2').getValue();
                
                break;
            case 'rbc2_IA':
                Ext.getCmp(prototype.id + '-cmbAirline_INT2').hide();
                Ext.getCmp(prototype.id + '-cmbAirline_INT2_2').hide();
                
                meIChart.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').getValue();
                meIChart.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthTo_IA_Chart').getValue();

                var valueP = Ext.getCmp(prototype.id + '-rbcP').getValue().rb01;
                switch (valueP) {
                    case 'Prime' :
                        meIChart.bean.strEstado = 'P';
                        break;

                    case 'Reject' :
                        meIChart.bean.strEstado = 'R';
                        break;

                }

                break;
            case 'rbc3_IA' :
                Ext.getCmp(prototype.id + '-cmbAirline_INT2').hide();
                Ext.getCmp(prototype.id + '-cmbAirline_INT2_2').hide();
                
                var monthSelect = Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').getValue();
//                var mesFrom = parseInt(monthSelect) + 1;
                var mesFrom = monthSelect;
                
//                if (mesFrom < 10) mesFrom = "0" + mesFrom;
                                
//                meIChart.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').getValue();
                meIChart.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + mesFrom;
                
                meIChart.bean.IN_SELECTBY = Ext.getCmp(prototype.id + '-cmbSelectBy_WK').getValue();
                meIChart.bean.IN_TYPEDOC = Ext.getCmp(prototype.id + '-cmbTypeDoc').getValue();
                meIChart.bean.IN_TIPOFECHA = Ext.getCmp(prototype.id + '-cmbFecha').getValue();
                meIChart.bean.IN_AIRLINE = Ext.getCmp(prototype.id + '-cmbAerolinea').getValue();
                meIChart.bean.IN_SOURCE = Ext.getCmp(prototype.id + '-cmbSourceCode').getValue();
                if(meIChart.bean.IN_SOURCE == null){
                    meIChart.bean.IN_SOURCE = "";
                }
                break;

        }
        meIChart.searchParams = JSON.stringify(meIChart.bean);
        console.log(meIChart.bean);

    },
    
    setFormatParameter_WK: function () {

        meIChart.beanWK = {};
       

        meIChart.beanWK.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + '' +  Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').getValue();
        meIChart.beanWK.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateYear_IA_Chart').getValue() + '' + Ext.getCmp(prototype.id + '-cmbDateMonthTo_IA_Chart').getValue();

        
        meIChart.searchParams = JSON.stringify(meIChart.beanWK);
        console.log(meIChart.beanWK);

    },
    
    
//    checkEvent: function (obj, e) {
//        console.log(obj);
//        console.log(e);
//    },
    cbxDateFromMonth_changeHandler_chart: function () {
        Ext.getCmp(prototype.id + '-cmbDateMonthTo_IA_Chart').setValue(Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').getValue());
    },
    onClickSearch: function () {
        this.setFormatParameter();
        console.log('search');
        this.inicio();
    },

    hidePanelGraficos: function () {
        Ext.getCmp(prototype.id + '-boxInt_Month').hide();
        Ext.getCmp(prototype.id + '-boxInt_Airline').hide();
        Ext.getCmp(prototype.id + '-boxInt_WorkProgress').hide();
    },

    onChangeRadioAirline: function (obj, rb_new, rb_old, func) {
        var valueRadio = rb_new.rb;
        this.setFormatParameter();
        this.searchInterlineByAir();

    },

    searchAnalysis: function () {

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchAnalysis'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meIChart.searchParams};
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
    searchInterline: function () {
        a=1;
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchInterline'
            },
            listeners: {
                beforeload: function (obj) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meIChart.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').unmask();                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                        } 
//                        else {
//                            global.Msg({msg: 'Data not found5555555'});
//                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData_INT').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData_INT2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData_INT_TOT').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_01_C').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_01_A').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_02_D').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_02_A').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_03').bindStore(storeGridDatas);
        me.storeGridDatas = storeGridDatas;
    },
    searchInterlineByAir: function () {
        a = 0;
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchInterlineByAir'
            },
            listeners: {
                beforeload: function (obj) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meIChart.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').unmask();                    
                    var res = Ext.JSON.decode(response._response.responseText);

                    if (res.success) {
                        meIChart.dataAirline_chart = res.data;
                        var newArray = [];
                        var newArray2 = [];
                        for (var i = 0; i < meIChart.dataAirline_chart.length; i++) {
                            if (i < 10) {
                                newArray.push(meIChart.dataAirline_chart[i]);
                            }
                        }
                        for (var i = (newArray.length - 1); i >= 0; i--) {
                            newArray2.push(newArray[i]);
                        }

                        var storeDataNew = Ext.create('Ext.data.Store', {
                            data: newArray2,
                            autoLoad: true
                        });
                        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_04').bindStore(storeDataNew);


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
        Ext.getCmp(prototype.id + '-gridDataAIR_P_INT').bindStore(storeGridDatas);



    },
    obtainDataFilter_WK: function () {
      a= 0;  
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/obtainDataFilter_WK'
            },
            listeners: {
                beforeload: function (obj) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meIChart.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').unmask();                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    
                    var listaUsos = res.data;
                    var lstAerolineas = res.lstAerolineas;
                    
                    var storeDataUso = Ext.create('Ext.data.Store', {
                        data: listaUsos,
                        autoLoad: true
                    });
                    
                    var storeDataAero = Ext.create('Ext.data.Store', {
                        data: lstAerolineas,
                        autoLoad: true
                    });

                    Ext.getCmp(prototype.id + '-cmbSourceCode').bindStore(storeDataUso);
                    Ext.getCmp(prototype.id + '-cmbSourceCode').setValue('');
                    
                    Ext.getCmp(prototype.id + '-cmbAerolinea').bindStore(storeDataAero);
                    Ext.getCmp(prototype.id + '-cmbAerolinea').setValue('');
                    
                    meIChart.onClickSearch();
                }
            }
        });
        
        
//        Ext.getCmp(prototype.id + '-gridData_INT').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-gridData_INT2').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-gridData_INT_TOT').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_01_C').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_01_A').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_02_D').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_02_A').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_03').bindStore(storeGridDatas);
        me.storeGridDatas = storeGridDatas;
    },
    
    search_WK: function () {
        a = 0;
        Ext.getCmp(prototype.id + '-byWork_WK').hide();
        Ext.getCmp(prototype.id + '-byWork_WK_AMT').hide();
        
        var cmbSelectBy_WK = Ext.getCmp(prototype.id + '-cmbSelectBy_WK').getValue();
        console.log(cmbSelectBy_WK);
        if(cmbSelectBy_WK === '1'){
            Ext.getCmp(prototype.id + '-byWork_WK').show();
        }else{
//            if(cmbSelectBy_WK === '2'){
            Ext.getCmp(prototype.id + '-byWork_WK_AMT').show();
        }
        
        win.lblUser_toolTip("Estructura: WRF016");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search_WK'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-panelData_WK').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meIChart.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-panelData_WK').unmask();                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    
                    var cmbFecha = Ext.getCmp(prototype.id + '-cmbFecha').getValue();
                    if(cmbFecha === '1'){
                        Ext.getCmp(prototype.id + '-titHorzFecha1').setText('Clearing Date');
                        Ext.getCmp(prototype.id + '-titVertFecha1').setText('Invoice Date');
                        
                        Ext.getCmp(prototype.id + '-titHorzFecha2').setText('Clearing Date');
                        Ext.getCmp(prototype.id + '-titVertFecha2').setText('Invoice Date');
                    }else{
                        Ext.getCmp(prototype.id + '-titHorzFecha1').setText('Invoice Date');
                        Ext.getCmp(prototype.id + '-titVertFecha1').setText('Clearing Date');
                        
                        Ext.getCmp(prototype.id + '-titHorzFecha2').setText('Invoice Date');
                        Ext.getCmp(prototype.id + '-titVertFecha2').setText('Clearing Date');
                    }
                    
                    if(res.data.length > 0){
                        // Agregamos ID de meses
                        Ext.getCmp(prototype.id + '-titFecha6').setText(res.data[0].strFormatDate4);
                        Ext.getCmp(prototype.id + '-titFecha6_AMT').setText(res.data[0].strFormatDate4);
                        
                        Ext.getCmp(prototype.id + '-titFecha5').setText(res.data[0].strDescripcion);
                        Ext.getCmp(prototype.id + '-titFecha5_AMT').setText(res.data[0].strDescripcion);
                        
                        Ext.getCmp(prototype.id + '-titFecha4').setText(res.data[0].strDescripcion1);
                        Ext.getCmp(prototype.id + '-titFecha4_AMT').setText(res.data[0].strDescripcion1);
                        
                        Ext.getCmp(prototype.id + '-titFecha3').setText(res.data[0].strDescripcion2);
                        Ext.getCmp(prototype.id + '-titFecha3_AMT').setText(res.data[0].strDescripcion2);
                        
                        Ext.getCmp(prototype.id + '-titFecha2').setText(res.data[0].strDescripcion3);
                        Ext.getCmp(prototype.id + '-titFecha2_AMT').setText(res.data[0].strDescripcion3);
                        
                        Ext.getCmp(prototype.id + '-titFecha1').setText(res.data[0].strDescripcion4);
                        Ext.getCmp(prototype.id + '-titFecha1_AMT').setText(res.data[0].strDescripcion4);
                    } 
//                    else {
//                        global.Msg({msg: 'Data not found'});
//                    }
                    
                    console.log(res.data);
                    meIChart.gridData_WK_AC = res.data;
                    meIChart.gridData2AC = res.listaData2;
                    meIChart.gridDataRatesAC = res.listaRates;
                    
                    var cmbSelectBy_WK = Ext.getCmp(prototype.id + '-cmbSelectBy_WK').getValue();
                    if(cmbSelectBy_WK === '1'){
//                        with(gridData_SUP){includeInLayout = false; visible = false;}
//                        with(gridData_AMT){includeInLayout = false; visible = false;}
//                        with(gridData2_AMT){includeInLayout = false; visible = false;}
//                        with(gridData_WK){includeInLayout = true; visible = true;}
//                        with(gridData2_WK){includeInLayout = true; visible = true;}
                        
                        
                    }else{
                        
                    }
                    
//                    if(res.listaData2.length > 0 && res.data.listaRates > 0){
                        meIChart.imgChart_WK_clickHandler();
//                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData_WK').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData_WK_AMT').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-gridData_INT_TOT').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-graficLine').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_01_A').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_02_D').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_02_A').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_03').bindStore(storeGridDatas);
//        me.storeGridDatas = storeGridDatas;
    },
    
    imgChart_WK_clickHandler: function () {
        
//        if(vskMainWorkProgress.selectedChild == boxMainData && gridData_SUP.visible==false){}
        
        var cmbSelectBy_WK = Ext.getCmp(prototype.id + '-cmbSelectBy_WK').getValue();
        if(cmbSelectBy_WK === '1'){
            this.change_clickHandler();
        }else{
//            if(boxChart_03.visible==true){
//                StyleGrafic03();
            this.displayWorkProgressChart_03();
//            }else{
//                StyleNormal_02();
//            }
        }
        
    },
    change_clickHandler: function () {
        
        var cmbSelectGrafic = Ext.getCmp(prototype.id + '-cmbSelectGrafic').getValue();
        if(cmbSelectGrafic === '1'){
//            StyleGrafic01();
            this.displayWorkProgressChart_01();
        }
//        else if(cmbSelectGrafic === '2'){
//            this.displayWorkProgressChart_02();
//        }
        
    },
    displayWorkProgressChart_01: function () {
        
        console.log('------ displayWorkProgressChart_01 ');
        
        /*  CHARTS COLUMNS  */
        var lstColumns = meIChart.gridDataRatesAC;  // listaRates
        var lst_beanWP = meIChart.gridData_WK_AC;   // listaData
        
        for (var i = 0; i <= lstColumns.length; i++) {
            if(i === 0){
                lstColumns[i].totNETO = lstColumns[2].totNet1;  // eje Y
                lstColumns[i].strDescripcion = lst_beanWP[0].strDescripcion4.substring(5,8);  // eje X
            }else if(i === 1){
                lstColumns[i].totNETO = lstColumns[2].totNet2;
                lstColumns[i].strDescripcion = lst_beanWP[0].strDescripcion3.substring(5,8);
            }else if(i === 2){
                lstColumns[i].totNETO = lstColumns[2].totNet3;
                lstColumns[i].strDescripcion = lst_beanWP[0].strDescripcion2.substring(5,8);
            }else if(i === 3){
                lstColumns[i].totNETO = lstColumns[2].totNet4;
                lstColumns[i].strDescripcion = lst_beanWP[0].strDescripcion1.substring(5,8);
            }else if(i === 4){
                lstColumns[i].totNETO = lstColumns[2].totNet5;
                lstColumns[i].strDescripcion = lst_beanWP[0].strDescripcion.substring(5,8);
            }else if(i === 5){
                lstColumns[i].totNETO = lstColumns[2].totNet6;
                lstColumns[i].strDescripcion = lst_beanWP[0].strFormatDate4.substring(5,8);
            }
        }
        
        var storeDataColumns = Ext.create('Ext.data.Store', {
            data: lstColumns,
            autoLoad: true
        });        
        Ext.getCmp(prototype.id + '-byWork_WK_barras').bindStore(storeDataColumns);
        
        var lstColumns_temp = lstColumns;
        
        /*  CHARTS LINE  */
//        console.log('--------------- CHARTS LINE ------------------');
//        console.log(lst_beanWP);
        
        for (var i = 0; i <= lstColumns_temp.length; i++) {            
            if(i === 0){
                lstColumns_temp[i].totAud1 = lst_beanWP[0].totAud1;  // eje Y
                lstColumns_temp[i].totRej1 = lst_beanWP[0].totRej1;  // eje Y
                lstColumns_temp[i].strDescripcion = lst_beanWP[0].strDescripcion4.substring(5,8);  // eje X
            }else if(i === 1){
                lstColumns_temp[i].totAud1 = lst_beanWP[0].totAud2;
                lstColumns_temp[i].totRej1 = lst_beanWP[0].totRej2;
                lstColumns_temp[i].strDescripcion = lst_beanWP[0].strDescripcion3.substring(5,8);
            }else if(i === 2){
                lstColumns_temp[i].totAud1 = lst_beanWP[0].totAud3;
                lstColumns_temp[i].totRej1 = lst_beanWP[0].totRej3;
                lstColumns_temp[i].strDescripcion = lst_beanWP[0].strDescripcion2.substring(5,8);
            }else if(i === 3){
                lstColumns_temp[i].totAud1 = lst_beanWP[0].totAud4;
                lstColumns_temp[i].totRej1 = lst_beanWP[0].totRej4;
                lstColumns_temp[i].strDescripcion = lst_beanWP[0].strDescripcion1.substring(5,8);
            }else if(i === 4){
                lstColumns_temp[i].totAud1 = lst_beanWP[0].totAud5;
                lstColumns_temp[i].totRej1 = lst_beanWP[0].totRej5;
                lstColumns_temp[i].strDescripcion = lst_beanWP[0].strDescripcion.substring(5,8);
            }else if(i === 5){
                lstColumns_temp[i].totAud1 = lst_beanWP[0].totAud6;
                lstColumns_temp[i].totRej1 = lst_beanWP[0].totRej6;
                lstColumns_temp[i].strDescripcion = lst_beanWP[0].strFormatDate4.substring(5,8);
            }
        }
                
        var storeDataLine = Ext.create('Ext.data.Store', {
            data: lstColumns_temp,
            autoLoad: true
        });        
        Ext.getCmp(prototype.id + '-graficLine').bindStore(storeDataLine);
        
    },
    
    displayWorkProgressChart_03: function () {
        
//        var beanWP:WRF016Filterwk;
//        beanWP = WRF016Filterwk(gridData_WK_AC.getItemAt(0));
        
        console.log('------ displayWorkProgressChart_03 ');
        
        /*  CHARTS COLUMNS - AMT */
        var lstColumns_AMT = meIChart.gridDataRatesAC;  // listaRates
        var lst_beanWP_AMT = meIChart.gridData_WK_AC;   // listaData
        
        for (var i = 0; i <= lstColumns_AMT.length; i++) {
            if(i === 0){
                lstColumns_AMT[i].totNETO = lst_beanWP_AMT[0].totAud1;  // eje Y
                lstColumns_AMT[i].strDescripcion = lst_beanWP_AMT[0].strDescripcion4.substring(5,8);  // eje X
            }else if(i === 1){
                lstColumns_AMT[i].totNETO = lst_beanWP_AMT[0].totAud2;
                lstColumns_AMT[i].strDescripcion = lst_beanWP_AMT[0].strDescripcion3.substring(5,8);
            }else if(i === 2){
                lstColumns_AMT[i].totNETO = lst_beanWP_AMT[0].totAud3;
                lstColumns_AMT[i].strDescripcion = lst_beanWP_AMT[0].strDescripcion2.substring(5,8);
            }else if(i === 3){
                lstColumns_AMT[i].totNETO = lst_beanWP_AMT[0].totAud4;
                lstColumns_AMT[i].strDescripcion = lst_beanWP_AMT[0].strDescripcion1.substring(5,8);
            }else if(i === 4){
                lstColumns_AMT[i].totNETO = lst_beanWP_AMT[0].totAud5;
                lstColumns_AMT[i].strDescripcion = lst_beanWP_AMT[0].strDescripcion.substring(5,8);
            }else if(i === 5){
                lstColumns_AMT[i].totNETO = lst_beanWP_AMT[0].totAud6;
                lstColumns_AMT[i].strDescripcion = lst_beanWP_AMT[0].strFormatDate4.substring(5,8);
            }
        }
        
        var storeDataColumns_AMT = Ext.create('Ext.data.Store', {
            data: lstColumns_AMT,
            autoLoad: true
        });        
        Ext.getCmp(prototype.id + '-byWork_WK_barras_ATM').bindStore(storeDataColumns_AMT);
        
        
//      ------------------------------------------------------------------------------------------------------------
        
        /*  CHARTS LINE - AMT */
//        console.log('--------------- CHARTS LINE - AMT------------------');
        
    
        for (var i2 = 0; i2 < lst_beanWP_AMT.length; i2++) {            
            lst_beanWP_AMT[i2].totAud1 = (lst_beanWP_AMT[i2].QAUDI>0)? lst_beanWP_AMT[i2].QCUPON*100 /lst_beanWP_AMT[i2].QAUDI :0       // eje Y
            lst_beanWP_AMT[i2].strDescripcion = lst_beanWP_AMT[i2].strFormatDate;                                                       // eje X
        }
                
        var storeDataLine_AMT = Ext.create('Ext.data.Store', {
            data: lst_beanWP_AMT,
            autoLoad: true
        });        
        Ext.getCmp(prototype.id + '-graficLine_ATM').bindStore(storeDataLine_AMT);
        
    },

    onChangeRadio: function (obj, rb_new, rb_old, func) {
        
        var valueRadio = rb_new.rb;
        this.hidePanelGraficos();
        console.log('a');
      //  console.log(a);
        if( this.a === 1){
            valueRadio = 'rbc1_IA';
            this.a=0;
        }
        switch (valueRadio) {
            case 'rbc1_IA':
                Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').setValue("");
                Ext.getCmp(prototype.id + '-boxInt_Month').show();
                this.setFormatParameter();
                this.searchInterline();
                break;
            case 'rbc2_IA':
                Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').setValue("");
                Ext.getCmp(prototype.id + '-boxInt_Airline').show();
                this.setFormatParameter();
                this.searchInterlineByAir();
                break;
            case 'rbc3_IA' :
                var mes = new Date().getMonth()+ 1;
                if (mes < 10) mes = "0" + mes;
                Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').setValue(mes);
//                Ext.getCmp(prototype.id + '-cmbDateMonthFrom_IA_Chart').setValue("05");
                Ext.getCmp(prototype.id + '-boxInt_WorkProgress').show();
                this.llenarCombos();
                this.setFormatParameter();
                
//                this.setFormatParameter_WK();
                this.search_WK();
                break;

        }
    },
    
    llenarCombos: function (obj, rb_new, rb_old, func) {
        
        var cmbFecha = Ext.getCmp(prototype.id + '-cmbFecha');
        cmbFecha.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "By Clearing"],
                ["2", "By Invoice"]
            ]
        }));
        cmbFecha.setValue("1");
        
        var cmbSelectBy_WK = Ext.getCmp(prototype.id + '-cmbSelectBy_WK');
        cmbSelectBy_WK.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Coupon"],
                ["2", "Amount"]
//                ["3", "Tax"]
            ]
        }));
        cmbSelectBy_WK.setValue("1");
        
        var cmbSelectGrafic = Ext.getCmp(prototype.id + '-cmbSelectGrafic');
        cmbSelectGrafic.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Grafic 01"],
                ["2", "Grafic 02"]
            ]
        }));
        cmbSelectGrafic.setValue("1");
        
        var cmbTypeDoc = Ext.getCmp(prototype.id + '-cmbTypeDoc');
        cmbTypeDoc.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["1", "Prime Billing"],
                ["4", "RM"],
                ["9", "Billing Memo"]
            ]
        }));
        cmbTypeDoc.setValue("");
        
        this.obtainDataFilter_WK();
        
    },
    
    onChangeChart_IA_01: function (obj, rb_new, rb_old, func) {

        var valueRadio = rb_new.rb2;
        switch (valueRadio) {
            case 'rbcC_IA':
                Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_01_C').show();
                Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_01_A').hide();
                break;
            case 'rbcG_IA':
                Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_01_C').hide();
                Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_01_A').show();
                break;
        }
    },
    onChangeChart_IA_02: function (obj, rb_new, rb_old, func) {

        var valueRadio = rb_new.rb3;
        switch (valueRadio) {
            case 'rbcD_IA2':
                Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_02_D').show();
                Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_02_A').hide();
                break;
            case 'rbcA_IA2':
                Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_02_D').hide();
                Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_02_A').show();
                break;
        }
    },

    onChangeCKTotal: function (obj, value, old_value) {

        if (value) {
            Ext.getCmp(prototype.id + '-byMonth_01').hide();
            Ext.getCmp(prototype.id + '-byMonth_02').show();
        } else {
            Ext.getCmp(prototype.id + '-byMonth_01').show();
            Ext.getCmp(prototype.id + '-byMonth_02').hide();
        }
    },

    onChangeTopAirline: function (obj, value, cmp, strFunc) {

        var data = meIChart.dataAirline_chart;
        var newArray = [];
        var newArray2 = [];
        for (var i = 0; i < data.length; i++) {
            if (i < value) {
                newArray.push(data[i]);
            }
        }
        for (var i = (newArray.length - 1); i >= 0; i--) {
            newArray2.push(newArray[i]);
        }

        var storeDataNew = Ext.create('Ext.data.Store', {
            data: newArray2,
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-ChtSalesAnalysis_IA_04').bindStore(storeDataNew);

    },
    //To render
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
    },
    onColumnRender_WK: function (sprite, config, data, index) {
        return {
            fillStyle: this.colors_WK[index],
            strokeStyle: index % 2 ? 'none' : 'black',
            opacity: index % 2 ? 1 : 0.5
        };
    },
});
