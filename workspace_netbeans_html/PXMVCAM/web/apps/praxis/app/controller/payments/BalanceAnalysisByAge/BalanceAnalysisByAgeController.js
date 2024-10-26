
Ext.define('Ext.Praxis.controller.payments.BalanceAnalysisByAge.BalanceAnalysisByAgeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BalanceAnalysisByAgeController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    reg99: 0,
    me: '',
    dup: '',
    typeBean: '',
    searchParams: {},
    searchParams2: {},
    paramsDetail: {},
    paramsObtainData: {},
    paramsTKT: {},
    dataObtain: {},
    beanTKT: {},
    bean_detail: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'BalanceAnalysisByAgeForm';
        prototype.url = CONTEXTPATH + '/BalanceAnalysisByAge';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-boxSumaryMonthData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#BalanceAnalysisByAgeForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#BalanceAnalysisByAgeForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#BalanceAnalysisByAgeForm-btnClear': {
                click: this.btnClear_click
            },
            '#BalanceAnalysisByAgeForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#BalanceAnalysisByAgeForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#BalanceAnalysisByAgeForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#BalanceAnalysisByAgeForm-btnBack': {
                click: this.btnBack_click
            },
            '#BalanceAnalysisByAgeForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#BalanceAnalysisByAgeForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#BalanceAnalysisByAgeForm-btn-pag-next': {
                click: this.pagNext
            },
            '#BalanceAnalysisByAgeForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#BalanceAnalysisByAgeForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#BalanceAnalysisByAgeForm-cmbDateToYear': {
                select: this.selectComboToYear
            },
            '#BalanceAnalysisByAgeForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#BalanceAnalysisByAgeForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
        });
    },
    xpanel_afterrender: function (obj, e) {
        this.setStoreData();
        this.getDataAudit();
        this.obtainData();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        console.log(storeComboDataYear, 'comboToYear')
        console.log(comboToYear, 'comboToYear')
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboToYear: function (obj) {
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        if (comboToYear.getValue() < comboFromYear.getValue()) {
            comboFromYear.setValue(comboToYear.getValue());
        }
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromMonth: function (obj) {
        console.log(obj, 'obj from month')
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function (obj) {
        console.log(obj, 'obj to month')
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },

    //<editor-fold defaultstate="collapsed" desc="setStoreData">
    setStoreData: function () {
        var month = this.fecha.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");


    },
    getDataAudit: function (){
        
        Ext.Ajax.request({
            url: prototype.url + '/getDataAudit',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                beanString: JSON.stringify({})
            },
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res.result, 'res.result')
                console.log(res.result.MESSAGE, 'res.result.MESSAGE')
                if(res.result.MESSAGE.includes('YES')){
                    Ext.getCmp(prototype.id + '-txtFECR').setValue(res.result.FECR)
                    Ext.getCmp(prototype.id + '-txtHOCR').setValue(res.result.HOCR) 
                } else{
                    Ext.getCmp(prototype.id + '-txtFECR').setValue('')
                    Ext.getCmp(prototype.id + '-txtHOCR').setValue('') 
                }
                
                
              
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getBody().unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    obtainData: function () {

        this.paramsObtainData.BANK = 2;
        this.paramsObtainData.COUNTRY = 2;
        this.paramsObtainData.CARD = 2;
        
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);


                me.lstBank = res.lstBank;
                me.lstCard = res.lstCard;
                me.lstCountry = res.lstCountry;

                var storeData = Ext.create('Ext.data.Store', {
                    data: me.lstBank,
                    autoLoad: true
                });

                var storeData3 = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
                global.clear();
                me.btnSearch_click();
            }
        });


    },

    setFormatParameter: function () {
        me.bean = {};
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtAGENCY').getValue();
        me.bean.IN_PERCENTAGE = Ext.getCmp(prototype.id + '-cmbPercentage').getValue();

        console.log(me.bean, 'me.bean primer parameter')
        var beanString = JSON.stringify(me.bean);
        searchParams2 = {
            beanString: beanString,
            bean: me.bean
        };
    },
    setFormatParameter2: function () {
        me.bean = {};
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtAGENCY').getValue();
        me.bean.IN_PERCENTAGE = Ext.getCmp(prototype.id + '-cmbPercentage').getValue();
        me.bean.IN_CANAL = Ext.getCmp(prototype.id + '-cmbSource').getValue();
        me.bean.IN_CUTDAYS = Ext.getCmp(prototype.id + '-txtCUTDAYS').getValue();
        me.bean.IN_TOP = Ext.getCmp(prototype.id + '-cmbTOP').getValue();
       

        console.log(me.bean, 'me.bean segundo parameter')
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },

    btnSearch_click: function (obj, e) {

        let panelReportDay = Ext.getCmp(prototype.id + '-boxPendingData')
        let panelMain = Ext.getCmp(prototype.id + '-boxMainData')
        let panelSumaryMonth = Ext.getCmp(prototype.id + '-boxSumaryMonthData')
        let panelSumaryCanal = Ext.getCmp(prototype.id + '-boxSumaryCanalData')
        let panelSumaryCompany = Ext.getCmp(prototype.id + '-boxSumaryCompanyData')
        if (panelReportDay.isVisible()) {
            me.typeBean = 'S' //Search
            this.setFormatParameter2();
            this.setGridReportDay();
        } else if(panelMain.isVisible()) {
            this.setFormatParameter();
            this.setGridData();
        } else if(panelSumaryMonth.isVisible()) {
            this.setFormatParameter2();
            this.setGridSumaryMonth();
        } else if(panelSumaryCanal.isVisible()) {
            this.setFormatParameter2();
            this.setGridSumaryCanal();
        } else if(panelSumaryCompany.isVisible()) {
            this.setFormatParameter2();
            this.setGridSumaryCompany();
        }
    },

    isVacio: function (elemento) {
        if (elemento.getValue() === '') {
            return true;
        } else {
            return false;
        }
    },

    onReportDayPending: function () {
        let panelReportDay = Ext.getCmp(prototype.id + '-boxPendingData')
        let panelMain = Ext.getCmp(prototype.id + '-boxMainData')
        if (!panelReportDay.isVisible()) {
            this.setFormatParameter2();
            this.setGridReportDay()
            panelReportDay.show()
            panelMain.hide()
        } else {
            panelReportDay.hide()
            me.panelActual = '-boxMainData';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.setFormatParameter();
            this.setGridData()
            panelMain.show()
        }
    },
    
    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPF117");
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function (obj) {
//                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams2;
                    },
                    load: function (obj) {
//                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
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
                            var data = obj.data.items[0].data;
                            console.log(data);
                        }
                        me.setWidthPie();
                    }
                },remoteSort: true
            });
            global.clear();
            let tittleCountry = Ext.getCmp(prototype.id + '-cmbCountry').getValue() === '' ? 'All Countries' : Ext.getCmp(prototype.id + '-cmbCountry').getRawValue();
            let tittleDate = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() === Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() ? Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() : Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + ' - ' + Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
            Ext.getCmp(prototype.id + '-lblTittleGrid').setText(tittleDate + ' | ' + tittleCountry)

            Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    setGridSumaryMonth: function () {
        win.lblUser_toolTip("Estructura: MPF118");
        me.panelActual = '-boxSumaryMonthData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchRM'
                }, listeners: {
                    beforeload: function (obj) {

                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj, obj2, success, response, obj5) {
                        var pag = Ext.getCmp(prototype.id + '-paggin3');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        
                        // ------------------ GRAFICOS -------------------------

                        var item = {};
                        var item2 = {};
                        var totals = [];
                        var charts = [];
                        console.log(obj.data.items, 'obj.data.items')
                        if(obj.data.items.length > 0){
                            item2.Perc2 = obj.data.items[0].data.totSVFOPUSDPENDING;
                            var pending = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDPENDING, '0,000');
                            item2.VENDOR = pending;
                            totals.push(item2);

                            item.Perc2 = obj.data.items[0].data.totSVFOPUSDP;
                            var Paid = "Paid:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDP, '0,000');
                            item.VENDOR = Paid;
                            totals.push(item);
                        }else{
                            totals.push({})
                        }
                        

                        var storeData1er = Ext.create('Ext.data.Store', {
                            data: totals,
                            autoLoad: true
                        });
                        Ext.getCmp(prototype.id + '-displayPolar2').bindStore(storeData1er);

                        var res = Ext.JSON.decode(response._response.responseText);
                        
                        
                        if ( res.data2.length > 0 ){
                            for (let i = res.data2.length - 1; i >= 0; i--) {
                                let AMOUNT = res.data2[i].SVFOPUSDPENDING;
                                let SAGENT = res.data2[i].SAGENT;
                                let CANAL = res.data2[i].CANAL;
                                charts.push({strDescription: SAGENT+ ' - ' + CANAL , AMOUNT: AMOUNT});
                            }
                        
//                            for (let i = 0 ;i < res.data2.length; i++) {
//                                let AMOUNT = res.data2[i].SVFOPUSDPENDING;
//                                let SAGENT = res.data2[i].SAGENT;
//                                let CANAL = res.data2[i].CANAL;
//                                charts.push({strDescription: SAGENT + '-' + CANAL , AMOUNT: AMOUNT});
//                            }
                        }else{
                                charts.push({strDescription: 'Not found'  , AMOUNT: 1});
                        }
                        
                        

                        var storeData1ercharts = Ext.create('Ext.data.Store', {
                            data: charts,
                            autoLoad: true
                        });
                        
                        Ext.getCmp(prototype.id + '-displayGraf2').bindStore(storeData1ercharts);

                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            
                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();

            Ext.getCmp(prototype.id + '-gridSumaryMonthData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        }
    },
    setGridSumaryCanal: function () {
        win.lblUser_toolTip("Estructura: MPF118");
        me.panelActual = '-boxSumaryCanalData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchRC'
                }, listeners: {
                    beforeload: function (obj) {

                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj, obj2, success, response, obj5) {
                        var pag = Ext.getCmp(prototype.id + '-paggin4');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        
                        // ------------------ GRAFICOS -------------------------

                        var item = {};
                        var item2 = {};
                        var totals = [];
                        var charts = [];
                        console.log(obj.data.items, 'obj.data.items')
                        if(obj.data.items.length > 0){
                            item2.Perc2 = obj.data.items[0].data.totSVFOPUSDPENDING;
                            var pending = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDPENDING, '0,000');
                            item2.VENDOR = pending;
                            totals.push(item2);

                            item.Perc2 = obj.data.items[0].data.totSVFOPUSDP;
                            var Paid = "Paid:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDP, '0,000');
                            item.VENDOR = Paid;
                            totals.push(item);
                        }else{
                            totals.push({})
                        }
                        

                        var storeData1er = Ext.create('Ext.data.Store', {
                            data: totals,
                            autoLoad: true
                        });
                        Ext.getCmp(prototype.id + '-displayPolar3').bindStore(storeData1er);

                        var res = Ext.JSON.decode(response._response.responseText);
                        
                        
                        if ( res.data2.length > 0 ){
                            for (let i = res.data2.length - 1; i >= 0; i--) {
                                let AMOUNT = res.data2[i].SVFOPUSDPENDING;
//                                let SAGENT = res.data2[i].SAGENT;
                                let CANAL = res.data2[i].CANAL;
                                charts.push({strDescription: CANAL , AMOUNT: AMOUNT});
                            }
                        
//                            for (let i = 0 ;i < res.data2.length; i++) {
//                                let AMOUNT = res.data2[i].SVFOPUSDPENDING;
//                                let SAGENT = res.data2[i].SAGENT;
//                                let CANAL = res.data2[i].CANAL;
//                                charts.push({strDescription: SAGENT + '-' + CANAL , AMOUNT: AMOUNT});
//                            }
                        }else{
                                charts.push({strDescription: 'Not found'  , AMOUNT: 1});
                        }
                        
                        

                        var storeData1ercharts = Ext.create('Ext.data.Store', {
                            data: charts,
                            autoLoad: true
                        });
                        
                        Ext.getCmp(prototype.id + '-displayGraf3').bindStore(storeData1ercharts);

                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            
                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();

            Ext.getCmp(prototype.id + '-gridSumaryCanalData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
        }
    },
    setGridSumaryCompany: function () {
        win.lblUser_toolTip("Estructura: MPF118");
        me.panelActual = '-boxSumaryCompanyData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchRP'
                }, listeners: {
                    beforeload: function (obj) {

                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj, obj2, success, response, obj5) {
                        var pag = Ext.getCmp(prototype.id + '-paggin5');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        
                        // ------------------ GRAFICOS -------------------------

                        var item = {};
                        var item2 = {};
                        var totals = [];
                        var charts = [];
                        console.log(obj.data.items, 'obj.data.items')
                        if(obj.data.items.length > 0){
                            item2.Perc2 = obj.data.items[0].data.totSVFOPUSDPENDING;
                            var pending = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDPENDING, '0,000');
                            item2.VENDOR = pending;
                            totals.push(item2);

                            item.Perc2 = obj.data.items[0].data.totSVFOPUSDP;
                            var Paid = "Paid:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDP, '0,000');
                            item.VENDOR = Paid;
                            totals.push(item);
                        }else{
                            totals.push({})
                        }
                        

                        var storeData1er = Ext.create('Ext.data.Store', {
                            data: totals,
                            autoLoad: true
                        });
                        Ext.getCmp(prototype.id + '-displayPolar4').bindStore(storeData1er);

                        var res = Ext.JSON.decode(response._response.responseText);
                        let strCCUST = {
                            134: 'AVIANCA',
                            133: 'LACSA',
                            202: 'TACA',
                            547: 'AEROGAL',
                        }
                        
                        if ( res.data2.length > 0 ){
                            for (let i = res.data2.length - 1; i >= 0; i--) {
                                let AMOUNT = res.data2[i].SVFOPUSDPENDING;
                                let CCUST = res.data2[i].CCUST;
                                charts.push({strDescription: strCCUST[CCUST] , AMOUNT: AMOUNT});
                            }
                        
//                            for (let i = 0 ;i < res.data2.length; i++) {
//                                let AMOUNT = res.data2[i].SVFOPUSDPENDING;
//                                let SAGENT = res.data2[i].SAGENT;
//                                let CANAL = res.data2[i].CANAL;
//                                charts.push({strDescription: SAGENT + '-' + CANAL , AMOUNT: AMOUNT});
//                            }
                        }else{
                                charts.push({strDescription: 'Not found'  , AMOUNT: 1});
                        }
                        
                        

                        var storeData1ercharts = Ext.create('Ext.data.Store', {
                            data: charts,
                            autoLoad: true
                        });
                        
                        Ext.getCmp(prototype.id + '-displayGraf4').bindStore(storeData1ercharts);

                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            
                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();

            Ext.getCmp(prototype.id + '-gridSumaryCompanyData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
        }
    },
    setGridReportDay: function () {
        win.lblUser_toolTip("Estructura: MPF118");
        me.panelActual = '-boxPendingData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchRD'
                }, listeners: {
                    beforeload: function (obj) {

                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj, obj2, success, response, obj5) {
                        var pag = Ext.getCmp(prototype.id + '-paggin2');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        // ------------------ GRAFICOS -------------------------

                        var item = {};
                        var item2 = {};
                        var totals = [];
                        var charts = [];
                        console.log(obj.data.items, 'obj.data.items')
                        if(obj.data.items.length > 0){
                            item2.Perc2 = obj.data.items[0].data.totSVFOPUSDPENDING;
                            var pending = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDPENDING, '0,000');
                            item2.VENDOR = pending;
                            totals.push(item2);

                            item.Perc2 = obj.data.items[0].data.totSVFOPUSDP;
                            var Paid = "Paid:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDP, '0,000');
                            item.VENDOR = Paid;
                            totals.push(item);
                        }else{
                            totals.push({})
                        }
                        

                        var storeData1er = Ext.create('Ext.data.Store', {
                            data: totals,
                            autoLoad: true
                        });
                        Ext.getCmp(prototype.id + '-displayPolar').bindStore(storeData1er);

                        var res = Ext.JSON.decode(response._response.responseText);
                        
                        
                        if ( res.data2.length > 0 ){
                            for (let i = 0; i < res.data2.length; i++) {

                                let AMOUNT = res.data2[i].SVFOPUSD;
                                let SAGENT = res.data2[i].SAGENT;
                                let SDATE = res.data2[i].SDATE;
                                charts.push({strDescription: SAGENT + "\n" +SDATE , AMOUNT: AMOUNT});
                            }
                        }else{
                                charts.push({strDescription: 'Not found'  , AMOUNT: 1});
                        }
                        
                        

                        var storeData1ercharts = Ext.create('Ext.data.Store', {
                            data: charts,
                            autoLoad: true
                        });
                        
                        Ext.getCmp(prototype.id + '-displayGraf').bindStore(storeData1ercharts);
                        
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            
//                            if(me.typeBean == 'D'){
//                                console.log('drilldown')
//                                Ext.getCmp(prototype.id + '-lblTittleGrid2').setText(obj.data.items[0].data.strFormatDate + ' | ' + obj.data.items[0].data.SAGENT + ' | ' + obj.data.items[0].data.CANAL)
//                            }else {
                                console.log('search')
                                let tittleCountry = Ext.getCmp(prototype.id + '-cmbCountry').getValue() === '' ? 'All Countries' : Ext.getCmp(prototype.id + '-cmbCountry').getRawValue();
                                let tittleDate = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() === Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() ? Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() : Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + ' - ' + Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
                                Ext.getCmp(prototype.id + '-lblTittleGrid2').setText(tittleDate + ' - ' + tittleCountry)
//                            }

                        }
                         me.setWidthPie();
                    }
                }
            });
            global.clear();
            
            
            Ext.getCmp(prototype.id + '-gridPendingData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    onGridReportDay: function (column, e, row, column, x, rowData) {
        me.bean = {};
        me.bean.IN_FECHA_FROM = x.record.data.SDATE
        me.bean.IN_SCOUNTRY = x.record.data.SCOUNTRY
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        me.drillDown.push(me.panelActual);
        me.typeBean = 'D' // DRILL DOWN
        this.setGridReportDay();
    },
    
    clickColumn: function (ct, column, e, t, eOpts) {
        me.bean = {};
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtAGENCY').getValue();
        me.bean.IN_PERCENTAGE = Ext.getCmp(prototype.id + '-cmbPercentage').getValue();
        me.bean.IN_CANAL = Ext.getCmp(prototype.id + '-cmbSource').getValue();
        me.bean.IN_CUTDAYS = Ext.getCmp(prototype.id + '-txtCUTDAYS').getValue();
        me.bean.IN_TOP = Ext.getCmp(prototype.id + '-cmbTOP').getValue();

        switch (column.dataIndex) {
                case 'PERCPENDING':
                    me.bean.IN_TYPEPERC = 'S'
                    break;
                case 'PERCPAID':
                    me.bean.IN_TYPEPERC = 'P'
                    break;
                case 'SVFOPUSDP':
                    me.bean.IN_TYPEPERC = 'A'
                    break;
                case 'SVFOPUSDPENDING':
                    me.bean.IN_TYPEPERC = 'N'
                    break;
                
            }
        if(Ext.getCmp(prototype.id + '-hidePENDING').isVisible()){
            me.bean.IN_ORDER = 'ASC'
            Ext.getCmp(prototype.id + '-hidePENDING').hide()
        }else{
            me.bean.IN_ORDER = 'DESC'
            Ext.getCmp(prototype.id + '-hidePENDING').show()
        }
        
        

        console.log(me.bean, 'me.bean')
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        if( me.panelActual == '-boxSumaryMonthData' ){
            this.setGridSumaryMonth();
        }else if( me.panelActual == '-boxPendingData' ) {
            me.typeBean = 'S' // SEARCH
            this.setGridReportDay();
            
        }else if (me.panelActual == '-boxSumaryCanalData' ){
            this.setGridSumaryCanal();
        }else if( me.panelActual == '-boxSumaryCompanyData' ){
            this.setGridSumaryCompany();
        }
        
            
        
    },
    rgChangeReport: function (field, newValue, oldValue){
        console.log(newValue, 'newValue')
        if(newValue.opcion == '1'){
            this.setFormatParameter2();
            this.setGridSumaryMonth();
            Ext.getCmp(prototype.id + '-btn-TW').hide()
            Ext.getCmp(prototype.id + '-cmbTOP').show()
            Ext.getCmp(prototype.id + '-lblTOP').show()
        }else if(newValue.opcion == '2'){
            me.typeBean = 'S' // SEARCH
            this.setFormatParameter2();
            this.setGridReportDay();
            Ext.getCmp(prototype.id + '-btn-TW').show()
            Ext.getCmp(prototype.id + '-cmbTOP').hide()
            Ext.getCmp(prototype.id + '-lblTOP').hide()
        } else if(newValue.opcion == '3'){
            this.setFormatParameter2();
            this.setGridSumaryCanal()
            Ext.getCmp(prototype.id + '-btn-TW').hide()
            Ext.getCmp(prototype.id + '-cmbTOP').hide()
            Ext.getCmp(prototype.id + '-lblTOP').hide()
        } else if ( newValue.opcion == '4' ){
            this.setFormatParameter2();
            this.setGridSumaryCompany()
            Ext.getCmp(prototype.id + '-btn-TW').hide()
            Ext.getCmp(prototype.id + '-cmbTOP').hide()
            Ext.getCmp(prototype.id + '-lblTOP').hide()
        }
    },
    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },

    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry
            }
        }).show();
    },

    btnBack_click: function (obj, e) {

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
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

    },
    btnExcel_click: function (obj, e) {
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function () {

        switch (me.panelActual) {
            case  '-boxPendingData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(searchParams.beanString));
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contFilter');
        if (option.isVisible(option)) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {

        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-boxMainData':
                me.pagginActual = '-paggin';
                break;
            case  '-boxPendingData':
                me.pagginActual = '-paggin2';
                break;
            case  '-boxSumaryMonthData':
                me.pagginActual = '-paggin3';
                break;
            case  '-boxSumaryCanalData':
                me.pagginActual = '-paggin4';
                break;
            case  '-boxSumaryCompanyData':
                me.pagginActual = '-paggin5';
                break;
        }
    },

    /*     
     * Funciones para la paginacion     
     */

    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }
}
);