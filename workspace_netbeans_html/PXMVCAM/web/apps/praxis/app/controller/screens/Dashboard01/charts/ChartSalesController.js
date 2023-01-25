Ext.define('Ext.Praxis.controller.screens.Dashboard01.charts.ChartSalesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChartSalesController',
    searchParams: {},
    columns2: {},
    beanChart: {},
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
    meSChart: '',
    dw_excel: false,
    boxActual: '-boxPrincipalSales',
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
        meSChart = this;
        this.setStoreData();

    },
    afterRender: function () {

        Ext.getCmp(prototype.id + '-cmbDateYear_Chart').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateMonthFrom_Chart').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateMonthTo_Chart').setValue("");
        meSChart.inicio();

        Ext.getCmp(prototype.id + '-Box_Chart_Sales').items.items[0].setValue(true);

    },
    setStoreData: function () {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);

        Ext.getCmp(prototype.id + '-cmbDateYear_Chart').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateMonthFrom_Chart').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateMonthTo_Chart').bindStore(storeComboDataMonth);
    },
    inicio: function () {
//        console.clear();
        this.setFormatParameter();
        var valueRadio = Ext.getCmp(prototype.id + '-Box_Chart_Sales').getValue().rb;

        switch (valueRadio) {
            case 'rbc6':   //Total
                this.loadTotalControlTotalChart();
                break;
            case 'rbc2':   //Channels
                this.loadChannelsChart();
                break;
            case 'rbc1' :  //On/Off
                this.search();
                break;
            case 'rbc3' :  //Countries
//                this.loadCountryOfSale();
                break;
            case 'rbc4' :  //Cabin                
                this.loadCabinChart();
                break;
            case 'rbc5' :  //Cabin
                this.loadAgentChart_3();
                break;
        }
    },
    setFormatParameter: function () {

        meSChart.beanChart = {};
        meSChart.beanChart_F = {};

        meSChart.beanChart.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateYear_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthFrom_Chart').getValue();
        meSChart.beanChart.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateYear_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthTo_Chart').getValue();

        meSChart.beanChart_F.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateYear_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthFrom_Chart').getValue();
        meSChart.beanChart_F.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateYear_Chart').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonthTo_Chart').getValue();

        meSChart.searchParams = JSON.stringify(meSChart.beanChart);
        console.log(meSChart.beanChart);


        var beanStringOfSale = JSON.stringify(meSChart.beanChart);
        searchParamsCountryOfSale = {
            beanString: beanStringOfSale,
            bean: meSChart.beanChart
        };

        console.log(searchParamsCountryOfSale);

    },
    cbxDateFromMonth_changeHandler_chart: function () {
        Ext.getCmp(prototype.id + '-cmbDateMonthTo_Chart').setValue(Ext.getCmp(prototype.id + '-cmbDateMonthFrom_Chart').getValue());
    },
    onClickSearch: function () {
        this.inicio();
    },
    hidePanelGraficos: function () {
        Ext.getCmp(prototype.id + '-boxSal_Total').hide();
        Ext.getCmp(prototype.id + '-boxSal_Channels_1').hide();
        Ext.getCmp(prototype.id + '-boxSal_Channels_2').hide();
        Ext.getCmp(prototype.id + '-boxSal_OnOff').hide();
        Ext.getCmp(prototype.id + '-boxSal_OnOff_2').hide();
        Ext.getCmp(prototype.id + '-boxSal_Cabin_1').hide();
        Ext.getCmp(prototype.id + '-boxSal_Cabin_2').hide();
        Ext.getCmp(prototype.id + '-boxSal_Countries_1').hide();
        Ext.getCmp(prototype.id + '-boxSal_Countries_2').hide();
        Ext.getCmp(prototype.id + '-boxSal_Agent').hide();
        Ext.getCmp(prototype.id + '-boxSal_Agent_Used').hide();
    },
    loadCountryOfSale: function () {

        console.log(searchParamsCountryOfSale);

        win.lblUser_toolTip("Estructura: IMF081");
        Ext.Ajax.request({
            url: prototype.url + '/loadCountryOfSale',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: searchParamsCountryOfSale, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                var storeData = Ext.create('Ext.data.Store', {
                    data: res.data,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridCountrys').bindStore(storeData);
                Ext.getCmp(prototype.id + '-gridCountrys_S').bindStore(storeData);

                // ------------------ GRAFICOS -------------------------

                var lstPie = [];
                var item = {};

                for (var i = 0; i < 5; i++) {
                    item = res.data[i];
                    item.CLASS = item.COUNTRY_NAME + " , " + Ext.util.Format.number(item.Perc1, '0,000.00') + '%';
                    item.COMENTARIO = item.COUNTRY_NAME + " , " + Ext.util.Format.number(item.Perc2, '0,000.00') + '%';
                    lstPie.push(item);
                    item = {};
                }

                console.log(lstPie);
                
                // -------------------------------- PIE 1 ----------------------------------------------------------------------------------------
                
                var lstTot_pie = [];
                var item_pie = {};
                var amount = 0;
                for (var j = 0; j < lstPie.length; j++) {

                    item_pie = lstPie[j];

                    if(lstPie[j].Perc1 < 5){
                        amount = amount + lstPie[j].Perc1;

                        if(j == lstPie.length - 1){
                            
                            item_pie.CLASS = "Others, " + Ext.util.Format.number(amount, '0,000.00') + '%';
//                            item_pie.COMENTARIO = item_pie.COUNTRY_NAME + " , " + Ext.util.Format.number(item_pie.Perc2, '0,000.00') + '%';
                            lstTot_pie.push(item_pie);
                        }
                    }else{
                        item_pie.CLASS = item_pie.COUNTRY_NAME + ", " + Ext.util.Format.number(item_pie.Perc1, '0,000.00') + '%';
                        lstTot_pie.push(item_pie);
                    }

                }
                
                // ---------------------------- PIE 2 ---------------------------------------------------------------------------------------------
                
                var lstTot_pie2 = [];
                var item_pie2 = {};
                var amount2 = 0;
                for (var j = 0; j < lstPie.length; j++) {

                    item_pie2 = lstPie[j];

                    if(lstPie[j].Perc2 < 5){
                        amount2 = amount2 + lstPie[j].Perc2;

                        if(j == lstPie.length - 1){
                            
                            item_pie2.COMENTARIO = "Others, " + Ext.util.Format.number(amount2, '0,000.00') + '%';
                            lstTot_pie2.push(item_pie2);
                        }
                    }else{
                        item_pie2.COMENTARIO = item_pie2.COUNTRY_NAME + " , " + Ext.util.Format.number(item_pie2.Perc2, '0,000.00') + '%';
                        lstTot_pie2.push(item_pie2);
                    }

                }
                
                
                console.log(lstTot_pie2);
                
                var storeDataPie_M = Ext.create('Ext.data.Store', {
                    data: lstTot_pie,
                    autoLoad: true
                });
                
                var storeDataPie_M2 = Ext.create('Ext.data.Store', {
                    data: lstTot_pie2,
                    autoLoad: true
                });
                
                var storeDataPie = Ext.create('Ext.data.Store', {
                    data: lstPie,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-displaySAChart17').bindStore(storeDataPie_M);
                Ext.getCmp(prototype.id + '-displaySAChart18').bindStore(storeDataPie_M2);

                Ext.getCmp(prototype.id + '-displaySAChart19').bindStore(storeDataPie);


                // -------------------------------------  GRAFICO -----------------------------------------------------------
                console.log(res.data);
                meSChart.dataRoute_chart = Ext.clone(res.data);
                meSChart.onChangeTopCountries('', 20, '', '');



            }
        });
    },
    loadTotalControlTotalChart: function () {

        win.lblUser_toolTip("Estructura: IMF077");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadTotalControlTotalChart'
            },
            listeners: {
                beforeload: function (obj) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meSChart.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').unmask();                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                            var lstTot_Temp = [];
                            var lstTot_pie = [];
                            var item_t = {};
                            var item_pie = {};
                            var amount = 0;
                            
                            me.lstTotales = res.lstTotales;
                            for (var i = 0; i < me.lstTotales.length; i++) {
                                me.lstTotales[i].totQKMS = 100;
                                var label = me.lstTotales[i].TYPE;
                                if (label === 'SALE') {
                                    label = 'SALES';
                                }
                                me.lstTotales[i].VENDOR = label + ', ' + Ext.util.Format.number(me.lstTotales[i].Perc2, '0,000.00') + '%';
                                
                                
                                // ------------------------------------------------------------------------------------------------------
                                item_t = me.lstTotales[i];
                                
                                var value = parseFloat(Ext.util.Format.number(item_t.Perc2, '0,000.00'));
                                if( value > 5 ){
                                    lstTot_Temp.push(item_t);
                                }else{
                                    item_t.TYPE = 'OTHERS';
                                    lstTot_Temp.push(item_t);
                                }
                                item_t = {};
                            }
                            
                            for (var j = 0; j < lstTot_Temp.length; j++) {

                                item_pie = lstTot_Temp[j];
                                lstTot_Temp[j].totQKMS = 100;
                                
                                if(lstTot_Temp[j].TYPE === 'OTHERS'){
                                    amount = amount + lstTot_Temp[j].Perc2;
                                    
                                    if(j == lstTot_Temp.length - 1){
                                        item_pie.Perc2 = amount;
                                        item_pie.VENDOR = lstTot_Temp[j].TYPE + ', ' + Ext.util.Format.number(amount, '0,000.00') + '%';
                                        lstTot_pie.push(item_pie);
                                    }
                                }else{
                                    item_pie.VENDOR = item_pie.TYPE + ', ' + Ext.util.Format.number(item_pie.Perc2, '0,000.00') + '%';
                                    lstTot_pie.push(item_pie);
                                }
                            
                            }
//                            console.log(lstTot_pie);
                        
                            //<editor-fold defaultstate="collapsed" desc=" ---------- Grafic ----------">
                            me.lstTotalesGraf = res.data;
                            console.log(me.lstTotalesGraf);
                            var pivot = [];
                            var existe;
                            for (var i = 0; i < me.lstTotalesGraf.length; i++) {
                                existe = false;
                                for (var j = 0; j < pivot.length; j++) {
                                    if (pivot[j].mes === me.lstTotalesGraf[i].strFormatDate) {
                                        existe = true;
                                        switch (me.lstTotalesGraf[i].TYPE) {
                                            case 'ACMS':
                                                pivot[j].ACMS = me.lstTotalesGraf[i].CUPONS;
                                                break;
                                            case 'ADMS':
                                                pivot[j].ADMS = me.lstTotalesGraf[i].CUPONS;
                                                break;
                                            case 'EXCH':
                                                pivot[j].EXCH = me.lstTotalesGraf[i].CUPONS;
                                                break;
                                            case 'RFND':
                                                pivot[j].RFND = me.lstTotalesGraf[i].CUPONS;
                                                break;
                                            case 'SALE':
                                                pivot[j].SALE = me.lstTotalesGraf[i].CUPONS;
                                                break;
                                        }
                                    }
                                }
                                if (!existe) {
                                    var items = {mes: me.lstTotalesGraf[i].strFormatDate,
                                        ACMS: '0',
                                        ADMS: '0',
                                        EXCH: '0',
                                        RFND: '0',
                                        SALE: '0'
                                    };
                                    switch (me.lstTotalesGraf[i].TYPE) {
                                        case 'ACMS':
                                            items.ACMS = me.lstTotalesGraf[i].CUPONS;
                                            break;
                                        case 'ADMS':
                                            items.ADMS = me.lstTotalesGraf[i].CUPONS;
                                            break;
                                        case 'EXCH':
                                            items.EXCH = me.lstTotalesGraf[i].CUPONS;
                                            break;
                                        case 'RFND':
                                            items.RFND = me.lstTotalesGraf[i].CUPONS;
                                            break;
                                        case 'SALE':
                                            items.SALE = me.lstTotalesGraf[i].CUPONS;
                                            break;
                                    }
                                    pivot.push(items);
                                }

                            }
                        //</editor-fold>    
                            
                            var storeDataTotales_pie = Ext.create('Ext.data.Store', {
                                data: lstTot_pie,
                                autoLoad: true
                            });

                            var storeDataTotales = Ext.create('Ext.data.Store', {
                                data: me.lstTotales,
                                autoLoad: true
                            });
                            var storeDataPivot = Ext.create('Ext.data.Store', {
                                data: pivot,
                                autoLoad: true
                            });

                            Ext.getCmp(prototype.id + '-gridData_boxChart6_Tot').bindStore(storeDataTotales);
                            Ext.getCmp(prototype.id + '-displaySAChart33').bindStore(storeDataTotales_pie);
                            Ext.getCmp(prototype.id + '-displaySAChart40').bindStore(storeDataTotales);
                            Ext.getCmp(prototype.id + '-displaySAChart32').bindStore(storeDataPivot);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData_boxChart6').bindStore(storeGridDatas);
        me.storeGridDatas = storeGridDatas;
    },
    loadChannelsChart: function () {

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadChannelsChart'
            },
            listeners: {
                beforeload: function (obj) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meSChart.searchParams};
                },
                load: function (obj, obj2, success, response, obj5) {
//                    Ext.getCmp(prototype.id + '-boxPrincipal').unmask();                    
                    var res = Ext.JSON.decode(response._response.responseText);

                    console.log(res.data); //lstDataChannelsTotal
                    console.log(res.lstDataChannelsByDate); //lstDataChannelsByDate
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;

                            var storeChannelsByDate = Ext.create('Ext.data.Store', {
                                data: res.lstDataChannelsByDate,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-displaySAChart20').bindStore(storeChannelsByDate);
                            Ext.getCmp(prototype.id + '-displaySAChart20_2').bindStore(storeChannelsByDate);

                            // ------------------------------------- 1er GRAFICO -----------------------------------------------------------

                            var lstDataEdit = res.data;
                            for (var i = 0; i < lstDataEdit.length; i++) {
                                lstDataEdit[i].LABEL = lstDataEdit[i].strDescription + ',  ' + Ext.util.Format.number(lstDataEdit[i].CUPONS_PERCENT, '0,000.00') + '%';
                                lstDataEdit[i].LABEL2 = lstDataEdit[i].strDescription + ',  ' + Ext.util.Format.number(lstDataEdit[i].AMOUNT_PERCENT, '0,000.00') + '%';
                            }

                            var storeChannelChart15 = Ext.create('Ext.data.Store', {
                                data: lstDataEdit,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-displaySAChart15').bindStore(storeChannelChart15);
                            Ext.getCmp(prototype.id + '-displaySAChart16').bindStore(storeChannelChart15);

                            // ------------------------------------- 2do GRAFICO -----------------------------------------------------------


                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData_boxChart2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData_boxChart2_2').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-displaySAChart15').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-displaySAChart16').bindStore(storeGridDatas);
    },
    loadCabinChart: function () {
        //win.lblUser_toolTip("Estructura: IMF097");
        console.log('loadCabinChart');
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadCabinChart'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getBody().mask('Loading...');
                    obj.proxy.extraParams = {beanString: meSChart.searchParams, dw_excel: false};
                },
                load: function (obj) {
                    Ext.getBody().unmask('Loading...');
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var data = obj.data.items[0].data;
                        console.log(data);
                        var totals = [];
                        var item = {};

                        item.CUPON = data.TOTCUPON_F;
                        item.AMOUNT = data.TOTAMOUNT_F;
                        item.LABEL = 'Offline';
                        item.LABEL_C_PER = 'Offline, ' + Ext.util.Format.number(data.TOTCUPON_F_PER, '0,000.00') + '%';
                        item.LABEL_A_PER = 'Offline, ' + Ext.util.Format.number(data.TOTAMOUNT_F_PER, '0,000.00') + '%';
                        totals.push(item);

                        item = {};
                        item.CUPON = data.TOTCUPON_J;
                        item.AMOUNT = data.TOTAMOUNT_J;
                        item.LABEL = 'Business';
                        item.LABEL_C_PER = 'Business, ' + Ext.util.Format.number(data.TOTCUPON_J_PER, '0,000.00') + '%';
                        item.LABEL_A_PER = 'Business, ' + Ext.util.Format.number(data.TOTAMOUNT_J_PER, '0,000.00') + '%';
                        totals.push(item);

                        item = {};
                        item.CUPON = data.TOTCUPON_Y;
                        item.AMOUNT = data.TOTAMOUNT_Y;
                        item.LABEL = 'Economy';
                        item.LABEL_C_PER = 'Economy, ' + Ext.util.Format.number(data.TOTCUPON_Y_PER, '0,000.00') + '%';
                        item.LABEL_A_PER = 'Economy, ' + Ext.util.Format.number(data.TOTAMOUNT_Y_PER, '0,000.00') + '%';
                        totals.push(item);

                        var storeData1 = Ext.create('Ext.data.Store', {
                            data: totals,
                            autoLoad: true
                        });

                        Ext.getCmp(prototype.id + '-ChartCabin1').bindStore(storeData1);
                        Ext.getCmp(prototype.id + '-ChartCabin1_amount').bindStore(storeData1);

                    }
//                    mePie.setWidthPie();
                }
            }
        });

        Ext.getCmp(prototype.id + '-gridDataCabin_boxChart1').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataCabin_boxChart1').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataCabin_boxChart2').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displaySaleCabinChart01').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displaySaleCabinChart01_amount').bindStore(storeGridDatas);
        //Sale vs Used        
        Ext.getCmp(prototype.id + '-gridDataCabin_boxChart3').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataCabin_boxChart3').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataCabin_boxChart3_amount').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataCabin_boxChart3_amount').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displaySaleCabinChart02').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-displaySaleCabinChart02_amount').bindStore(storeGridDatas);
    },
    rbChangeType_tc: function () {

        var rbg_Type_tc = Ext.getCmp(prototype.id + '-radiogroupType_tc').getValue().rbgType_tc;
        var rbg_Type_tc2 = Ext.getCmp(prototype.id + '-radiogroupType_tc2').getValue().rbgType_tc2;

        switch (rbg_Type_tc) {
            case 'C':
                Ext.getCmp(prototype.id + '-ChartCabin1').setVisible(true);
                Ext.getCmp(prototype.id + '-ChartCabin1_amount').setVisible(false);
                Ext.getCmp(prototype.id + '-displaySaleCabinChart01').setVisible(true);
                Ext.getCmp(prototype.id + '-displaySaleCabinChart01_amount').setVisible(false);
                break;
            case 'A':
                Ext.getCmp(prototype.id + '-ChartCabin1').setVisible(false);
                Ext.getCmp(prototype.id + '-ChartCabin1_amount').setVisible(true);
                Ext.getCmp(prototype.id + '-displaySaleCabinChart01').setVisible(false);
                Ext.getCmp(prototype.id + '-displaySaleCabinChart01_amount').setVisible(true);
                break;
        }
        
        switch (rbg_Type_tc2) {
            case 'C':
                Ext.getCmp(prototype.id + '-displaySaleCabinChart02').setVisible(true);
                Ext.getCmp(prototype.id + '-displaySaleCabinChart02_amount').setVisible(false);
                Ext.getCmp(prototype.id + '-gridDataCabin_boxChart3').setVisible(true);
                Ext.getCmp(prototype.id + '-gridDataCabin_boxChart3_amount').setVisible(false);
                break;
            case 'A':
                Ext.getCmp(prototype.id + '-displaySaleCabinChart02').setVisible(false);
                Ext.getCmp(prototype.id + '-displaySaleCabinChart02_amount').setVisible(true);
                Ext.getCmp(prototype.id + '-gridDataCabin_boxChart3').setVisible(false);
                Ext.getCmp(prototype.id + '-gridDataCabin_boxChart3_amount').setVisible(true);
                break;
        }
    },
    search: function () {

        Ext.Ajax.request({
            url: prototype.url + '/searchTest',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: meSChart.searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                var lstDataGrid = res.lstData[1]; //P_SALES_PER_MONTH_DATA
                var storeDataGrid = Ext.create('Ext.data.Store', {
                    data: lstDataGrid,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridData_boxChart1').bindStore(storeDataGrid);
                Ext.getCmp(prototype.id + '-gridData_boxChart1_2').bindStore(storeDataGrid);
                Ext.getCmp(prototype.id + '-gridData_boxChart2_S').bindStore(storeDataGrid);

//                 ----------------------------- Totales  GRID ----------------------------------------------
//                var totGrid = res.lstData[0][0]; //P_SALES_PER_MONTH_TOTALS
//                
//                Ext.getCmp(prototype.id + '-totQTY').setText(Ext.util.Format.number(totGrid.TOTAL_CUPONS, '0,000'));
//                Ext.getCmp(prototype.id + '-totQTY_ON').setText(Ext.util.Format.number(totGrid.TOTAL_CUPONS_ON, '0,000'));
//                Ext.getCmp(prototype.id + '-totQTY_OFF').setText(Ext.util.Format.number(totGrid.TOTAL_CUPONS_OFF, '0,000'));

//                // ------------------------------------------ 1er Grafico ------------------------------------------------------ //
//                
                var totals = res.lstData[0];
                totals[0].LABEL = 'Total ON, ' + Ext.util.Format.number(totals[0].CUPONS_ON_PERCENT, '0,000.00') + '%';
                totals[0].LABEL_AMOUNT = 'Total ON, ' + Ext.util.Format.number(totals[0].AMOUNT_ON_PERCENT, '0,000.00') + '%';

                var item = {};
                item.CUPONS_ON_PERCENT = totals[0].CUPONS_OFF_PERCENT;
                item.AMOUNT_ON_PERCENT = totals[0].AMOUNT_OFF_PERCENT;
                item.LABEL = 'Total OFF, ' + Ext.util.Format.number(item.CUPONS_ON_PERCENT, '0,000.00') + '%';
                item.LABEL_AMOUNT = 'Total OFF, ' + Ext.util.Format.number(item.AMOUNT_ON_PERCENT, '0,000.00') + '%';
                totals.push(item);

                var storeData1er = Ext.create('Ext.data.Store', {
                    data: totals,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-displaySAChart11').bindStore(storeData1er);
                Ext.getCmp(prototype.id + '-displaySAChart13').bindStore(storeData1er);


                // --------------------------------------------- 3er Grafico --------------------------------------------------  //

                for (var i = 0; i < lstDataGrid.length; i++) {
                    lstDataGrid[i].DESstrFormatDate = lstDataGrid[i].strFormatDate.substring(5);
                }
                var storeDataEdi = Ext.create('Ext.data.Store', {
                    data: lstDataGrid,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-displaySAChart01').bindStore(storeDataEdi);
                Ext.getCmp(prototype.id + '-displaySAChart14').bindStore(storeDataEdi);
            }
        });
    },
    chooseChart_clickHandler: function (obj, rb_new, rb_old, func) {

        var valueRadio = rb_new.rb;
        this.hidePanelGraficos();
        this.setFormatParameter();

        switch (valueRadio) {
            case 'rbc6':    //Total
                Ext.getCmp(prototype.id + '-boxSal_Total').show();
                this.loadTotalControlTotalChart();
                break;
            case 'rbc2':    //Channels
                Ext.getCmp(prototype.id + '-boxSal_Channels_1').show();
                this.loadChannelsChart();
                break;
            case 'rbc1':    //On/Off
                Ext.getCmp(prototype.id + '-boxSal_OnOff').show();
                this.search();
                break;
            case 'rbc3':    //Countries
                Ext.getCmp(prototype.id + '-boxSal_Countries_1').show();
                this.loadCountryOfSale();
                break;
            case 'rbc4':    //Cabin
                Ext.getCmp(prototype.id + '-boxSal_Cabin_1').show();
                this.loadCabinChart();
                break;
            case 'rbc5':    //Agent
                Ext.getCmp(prototype.id + '-boxSal_Agent').show();
                this.loadAgentChart_3();
                break;
        }
    },
    changeArray_clickHandler: function (obj, value, old_value) {

        if (value) {
            Ext.getCmp(prototype.id + '-gridData_boxChart6').hide();
            Ext.getCmp(prototype.id + '-gridData_boxChart6_Tot').show();
        } else {
            Ext.getCmp(prototype.id + '-gridData_boxChart6').show();
            Ext.getCmp(prototype.id + '-gridData_boxChart6_Tot').hide();
        }
    },
    chooseUSO_clickHandler: function (obj, value, old_value) {

        var valueRadio = Ext.getCmp(prototype.id + '-Box_Chart_Sales').getValue().rb;

        if (valueRadio === 'rbc2') {
            if (value) {
                Ext.getCmp(prototype.id + '-boxSal_Channels_1').hide();
                Ext.getCmp(prototype.id + '-boxSal_Channels_2').show();
            } else {
                Ext.getCmp(prototype.id + '-boxSal_Channels_1').show();
                Ext.getCmp(prototype.id + '-boxSal_Channels_2').hide();
            }
        } else if (valueRadio === 'rbc1') {
            if (value) {
                Ext.getCmp(prototype.id + '-boxSal_OnOff').hide();
                Ext.getCmp(prototype.id + '-boxSal_OnOff_2').show();
            } else {
                Ext.getCmp(prototype.id + '-boxSal_OnOff').show();
                Ext.getCmp(prototype.id + '-boxSal_OnOff_2').hide();
            }
        } else if (valueRadio === 'rbc3') {
            if (value) {
                this.loadChannelsChart();
                Ext.getCmp(prototype.id + '-boxSal_Countries_1').hide();
                Ext.getCmp(prototype.id + '-boxSal_Countries_2').show();
            } else {
                console.log('111');
                Ext.getCmp(prototype.id + '-boxSal_Countries_1').show();
                Ext.getCmp(prototype.id + '-boxSal_Countries_2').hide();
            }
        } else if (valueRadio === 'rbc4') {
            if (value) {
                Ext.getCmp(prototype.id + '-boxSal_Cabin_1').hide();
                Ext.getCmp(prototype.id + '-boxSal_Cabin_2').show();
            } else {
                Ext.getCmp(prototype.id + '-boxSal_Cabin_1').show();
                Ext.getCmp(prototype.id + '-boxSal_Cabin_2').hide();
            }
        } else if (valueRadio === 'rbc5') {
            if (value) {
                Ext.getCmp(prototype.id + '-boxSal_Agent').hide();
                Ext.getCmp(prototype.id + '-boxSal_Agent_Used').show();
            } else {
                Ext.getCmp(prototype.id + '-boxSal_Agent').show();
                Ext.getCmp(prototype.id + '-boxSal_Agent_Used').hide();
            }
        }
    },
    onChangeTopCountries: function (obj, value, cmp, strFunc) {

        console.log('onChangeTopCountries');
        console.log(meSChart.dataRoute_chart);
        var data = meSChart.dataRoute_chart;
        var lstDataEdit = [];

        console.log('---->');
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            if (i < value) {
                var CUPONS = Ext.util.Format.number(data[i].CUPONS, '0,000')
                var CUPON_F = Ext.util.Format.number(data[i].CUPON_F, '0,000')
                lstDataEdit.push({strDescription: data[i].COUNTRY_NAME, CUPONS: data[i].CUPONS, CUPON_F: data[i].CUPON_F});
            } else {
                break;
            }

        }

        console.log(lstDataEdit);
        var storeTopCountries = Ext.create('Ext.data.Store', {
            data: lstDataEdit,
            autoLoad: true
        });

        Ext.getCmp(prototype.id + '-displaySAChart28').bindStore(storeTopCountries);

    },
    loadAgentChart_3: function () {
        win.lblUser_toolTip("Estructura: IMF077");

//        this.showGrid('-boxSal_Agent_Used');

        var storeGridDatas = Ext.create('Ext.Praxis.store.screens.GridData', {
            proxy: {
                url: prototype.url + '/loadAgentChart_3'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: meSChart.searchParams}
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
                        // -------------------------------------  GRAFICO -----------------------------------------------------------
                        meSChart.lstAgent_chart = Ext.clone(obj.data);
                        meSChart.onChangeTopAgent('', 10, '', '');
                        meSChart.onChangeTopAgentBar('', 10, '', '');
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataAgentChart').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataAgentChart').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataAgentChart_S').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataAgentChart_S').setStore(storeGridDatas);


    },
    onChangeTopAgent: function (obj, value, cmp, strFunc) {

        var data = meSChart.lstAgent_chart.items;

        var lstDataEdit = [];

        for (var i = 0; i < data.length; i++) {
            if (i < value) {
                var AMOUNT = Ext.util.Format.number(data[i].data.AMOUNT, '0,000')
                lstDataEdit.push({strDescription: data[i].data.strDescription1, AMOUNT: data[i].data.AMOUNT});
            } else {
                break;
            }

        }

        console.log(lstDataEdit);
        var storeChtSalesAnalysis24_PC = Ext.create('Ext.data.Store', {
            data: lstDataEdit,
            autoLoad: true
        });

        Ext.getCmp(prototype.id + '-ChtSalesAnalysis24_PC').bindStore(storeChtSalesAnalysis24_PC);

    },
    onChangeTopAgentBar: function (obj, value, cmp, strFunc) {

        var data = meSChart.lstAgent_chart.items;

        var lstDataEdit = [];
        var newArrayDesc = [];

        for (var i = 0; i < data.length; i++) {
            if (i < value) {
                var AMOUNT = Ext.util.Format.number(data[i].data.AMOUNT, '0,000')
                lstDataEdit.push({strDescription: data[i].data.strDescription1, AMOUNT: data[i].data.AMOUNT, AMOUNTF: data[i].data.AMOUNTF});
            } else {
                break;
            }

        }

        for (var i = (lstDataEdit.length - 1); i >= 0; i--) {
            newArrayDesc.push(lstDataEdit[i]);
        }

        console.log(lstDataEdit);
        var storeChtSalesAnalysis30MSBC = Ext.create('Ext.data.Store', {
            data: newArrayDesc,
            autoLoad: true
        });

        Ext.getCmp(prototype.id + '-ChtSalesAnalysis30MSBC').bindStore(storeChtSalesAnalysis30MSBC);

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
    }
});
