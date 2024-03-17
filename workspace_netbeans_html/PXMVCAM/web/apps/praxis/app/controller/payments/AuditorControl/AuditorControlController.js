/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.AuditorControl.AuditorControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AuditorControlController',
    fecha: new Date(),
    objA3096: {},
    bean: {},
    beanTicket: {},
    beanProcessDay: {},
    loadDate: '',
    searchParams: {},
    searchParamsAsig: {},
    paramsProcessDay: {},
    me: '',
    drillDown: [],
    panelActual: '-boxMainData',
    pagginActual: '-paggin',
    user: '',
    dw_excel: false,
    dataObtain: {},
    init: function (view) {
        console.log('2-) CONTROLLER -  Auditor Control - INIT');
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#AuditorControlForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#AuditorControlForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AuditorControlForm-btnClear': {
                click: this.btnClear_click
            },
            '#AuditorControlForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AuditorControlForm-btnBack': {
                click: this.btnBack_click
            },
            '#AuditorControlForm-btnCPP': {
                click: this.btnCPP_click
            },
            '#AuditorControlForm-chkBsplink': {
                change: this.onChangeProcess
            },
            '#AuditorControlForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#AuditorControlForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#AuditorControlForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            },
            '#AuditorControlForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth
            },
            '#AuditorControlForm-cmbDateFromDay': {
                afterrender: this.afterRenderDay,
                select: this.selectComboFromDay
            },
            '#AuditorControlForm-cmbDateToDay': {
                afterrender: this.afterRenderDay
            },
            '#AuditorControlForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AuditorControlForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AuditorControlForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AuditorControlForm-btn-pag-last': {
                click: this.pagLast
            }
        });

    },
    init_this: function() {
        me = this;
    },
    xpanel_afterrender: function (obj, e) {
        win.lblUser_toolTip(" ");
        this.setStoreData();
        this.btnSearch_click();
        console.log('consoleaaaaaa')
    },
    afterRenderYear: function (obj) {
        obj.setValue(me.fecha.getFullYear());
    },
    afterRenderMonth: function(obj) {
        var month = me.fecha.getMonth() + 1;
        console.log(month);
//        if (month < 9) {
//            obj.setValue('0' + month);
//        } else {
            obj.setValue((month));
//        }

    },
    afterRenderDay: function (obj) {
        obj.setValue('');
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
    selectComboFromDay: function(obj) {
        var cmbDateToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        cmbDateToDay.setValue(obj.getValue());
    },
    setStoreData: function () {
        
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('')
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('')
        
        
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        var storeComboPlaca = Ext.create('Ext.data.ArrayStore', {
            storeId: 'filter',
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "Audit Date"],
//                ["AS", "Assignment Date"]
            ]
        });
        Ext.getCmp(prototype.id + '-cmbFECHA').bindStore(storeComboPlaca);
        Ext.getCmp(prototype.id + '-cmbFECHA').setValue('');
        this.obtainData()
//        var cmbAuditor = Ext.getCmp(prototype.id + '-cmbAuditor');
//        cmbAuditor.bindStore(Ext.create('Ext.data.ArrayStore', {
//            autoLoad: false,
//            fields: ['code', 'name'],
//            data: [
//                ["", "All"],
//                ["SAP52", "JSOLANO"]
////                ["YOLANDAQ", "YOLANDAQ"],
////                ["ROSSANAR", "ROSSANAR"],
////                ["AOTERO", "AOTERO"],
////                ["WMARTINEZ", "WMARTINEZ"],
////                ["JNAUPAS", "JNAUPAS"],
////                ["DINAA", "DINAA"]
//            ]
//        }));
//        cmbAuditor.setValue("");  

    },
    obtainData: function () {

        this.dataObtain.UAUDITS = 1;         
        
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText); 
                console.log(res, 'res')
                if (res.success) {
                    
                    me.lstUaudits = res.lstUaudits;
                    Ext.getCmp(prototype.id + '-cmbAuditor').bindStore(
                        Ext.create('Ext.data.Store', {data: res.lstUaudits, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-cmbAuditor').setValue('');   
                    
                 
                    me.btnSearch_click();
                } else
                    global.Msg({msg: res.sesion});
            }
        });
    },
    btnSearch_click: function (obj, e) {
        
        var chkBsplink = Ext.getCmp(prototype.id + '-chkBsplink').getValue();
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        
//        if(chkBsplink){
//            if(monthFrom !== monthTo || monthFrom === '' || monthTo === ''){
//                global.Msg({msg: 'Solo se permite un mes'});
//            }else{
//                this.setGridDataProcess();
//            }
//        }else{
//            var TFECHA = Ext.getCmp(prototype.id + '-cmbFECHA').getValue();
//            if(TFECHA === 'AS'){
//                this.setFormatParameterAsig();
//                this.searchByAsigDateMonth();
//    //            this.searchByAsigDate();
//            }else{
//                this.setFormatParameter();
//                this.search();
//            }
//        }
        
        this.setFormatParameter();
        this.search();
        console.log('Holaaaaa infierno')

    },
//    btnClear_click: function (obj, e) {
//        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
//        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
//        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
//        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
////        Ext.getCmp(prototype.id + '-cmbPlaca').setValue('');
//    },
//    
//    setFormatParameterProcess: function (option) {
//        me.bean = {};
//
//        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
//        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
//        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
//        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
//        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
//        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
//        var auditor = Ext.getCmp(prototype.id + '-cmbAuditor').getValue();
//        if (monthFrom !== '') {
//            if (monthFrom < 10) {
//                monthFrom = '0' + (monthFrom);
//            }
//        }
//        if (monthTo !== '') {
//            if (monthTo < 10) {
//                monthTo = '0' + (monthTo);
//            }
//        }
//
//        if (dayFrom !== '') {
//            if (dayFrom < 10) {
//                dayFrom = '0' + (dayFrom);
//            }
//        }
//        if (dayTo !== '') {
//            if (dayTo < 10) {
//                dayTo = '0' + (dayTo);
//            }
//        }
//
//        me.bean.IN_DATEFROM = yearFrom + '' + monthFrom + '' + dayFrom;
//        me.bean.IN_DATETO = yearTo + '' + monthTo + '' + dayTo;
//        me.bean.IN_USEAC = auditor;
//
//        var beanString = JSON.stringify(me.bean);
//
//        var params = {
//            beanString: beanString,
//            bean: me.bean,
//        };
////        console.log(me.bean);
//        return params;
//    },
    setFormatParameter: function (option) {

        me.bean = {};
        
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        var auditor = Ext.getCmp(prototype.id + '-cmbAuditor').getValue();
        if (monthFrom !== '') {
            if (monthFrom < 10) {
                monthFrom = '0' + (monthFrom);
            }
        }
        if (monthTo !== '') {
            if (monthTo < 10) {
                monthTo = '0' + (monthTo);
            }
        }

        if (dayFrom !== '') {
            if (dayFrom < 10) {
                dayFrom = '0' + (dayFrom);
            }
        }
        if (dayTo !== '') {
            if (dayTo < 10) {
                dayTo = '0' + (dayTo);
            }
        }

        me.bean.IN_DATEFROM = yearFrom + '' + monthFrom + '' + dayFrom;
        me.bean.IN_DATETO = yearTo + '' + monthTo + '' + dayTo;
        me.bean.IN_USEAC = auditor;

        var beanString = JSON.stringify(me.bean);

        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
//        console.log(searchParams);
        console.log(searchParams, 'searchParams finallllllllllllllllllllllllll')
    },
//    setFormatParameterAsig: function (option) {
//
//        me.bean = {};
//        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
//        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
//        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
//        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
//        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
//        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
//        var TFECHA = Ext.getCmp(prototype.id + '-cmbFECHA').getValue();
//        var auditor = Ext.getCmp(prototype.id + '-cmbAuditor').getValue();
//        if (monthFrom !== '') {
//            if (monthFrom < 10) {
//                monthFrom = '0' + (monthFrom);
//            }
//        }
//        if (monthTo !== '') {
//            if (monthTo < 10) {
//                monthTo = '0' + (monthTo);
//            }
//        }
//
//        if (dayFrom !== '') {
//            if (dayFrom < 10) {
//                dayFrom = '0' + (dayFrom);
//            }
//        }
//        if (dayTo !== '') {
//            if (dayTo < 10) {
//                dayTo = '0' + (dayTo);
//            }
//        }
//
//        me.bean.IN_DATEFROM = yearFrom + '' + monthFrom + '' + dayFrom;
//        me.bean.IN_DATETO = yearTo + '' + monthTo + '' + dayTo;
//        me.bean.TFECHA = TFECHA;
//        me.bean.IN_USEAC = auditor;
//
//        var beanString = JSON.stringify(me.bean);
//
//        searchParamsAsig = {
//            bean: me.bean,
//            beanString: beanString
//        };
////        console.log(searchParamsAsig);
//    },
//    
    search: function () {
        this.showGrid('-boxMainData');
        win.lblUser_toolTip("Estructura: MPF100");
        console.log('entraaaaaaaaaaa al search')
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    console.log(obj.data, 'obj.data.length')
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }else{
                        console.log(obj.data);
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        console.log('pagData', pagData)
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                me.setWidthPie();
                }
                
            }
        });
        console.log('storeGridDatas', storeGridDatas)
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
//    searchByAsigDateMonth: function () {
//        this.showGrid('-boxMainDataAsigMonth');
//        win.lblUser_toolTip("Estructura: CPF030");
//        var storeGridDatas = Ext.create('Ext.Praxis.store.GridData', {
//            proxy: {
//                url: prototype.url + '/searchByAsigDateMonth'
//            }, listeners: {
//                beforeload: function (obj) {
//                    obj.proxy.extraParams = searchParamsAsig;
//                },
//                load: function (obj) {
//                    if (obj.data.length === 0) {
//                        global.Msg({
//                            msg: 'Data not found.'
//                        });
//                    }else{
//                        console.log(obj.data);
//                        var pag = Ext.getCmp(prototype.id + '-paggin5');
//                        var pagData = pag.getPageData();
//                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//                    }
//                }
//            }
//        });
//
//        Ext.getCmp(prototype.id + '-gridDataAsigMonth').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
//
//    },
//    onSearchByAsigDate: function(objCmp, objHtml, rowNum, colNum, rowData, rowCmp) {
//        var data = rowData.record.data;
//        var paramsDetail = {};
//        data.IN_UASIG = data.UASIG;
////        console.log(data);
//        paramsDetail.beanString = JSON.stringify(data);
//        paramsDetail.tipo = '';
//        this.searchByAsigDate(paramsDetail);
//    },
//    onSearchByAsigDateAll: function(objCmp, objHtml, rowNum, colNum, rowData, rowCmp) {
//        var data = rowData.record.data;
//        var paramsDetail = {};
//        data.IN_UASIG = '';
////        console.log(data);
//        paramsDetail.beanString = JSON.stringify(data);
//        paramsDetail.tipo = 'All';
//        this.searchByAsigDate(paramsDetail);
//    },
//    searchByAsigDate: function (paramsDetail) {
//        
//        this.showGrid('-boxMainDataAsig');
//        win.lblUser_toolTip("Estructura: CPF030");
//        
//        var storeGridDatas = Ext.create('Ext.Praxis.store.GridData', {
//            proxy: {
//                url: prototype.url + '/searchByAsigDate'
//            }, listeners: {
//                beforeload: function (obj) {
//                    obj.proxy.extraParams = paramsDetail;
//                },
//                load: function (obj) {
//                    if (obj.data.length === 0) {
//                        global.Msg({
//                            msg: 'Data not found.'
//                        });
//                    }else{
//                        console.log(obj.data);
//                        var data = obj.data.items[0].data;
//                        var usuario = ''; 
//                        if(paramsDetail.tipo === ''){
//                            usuario = '    -    User Asig.: ' + data.UASIG;
//                        }
//                        Ext.getCmp(prototype.id + '-gridDataAsig').setTitle('<center style="font-size:12px;">Assignment Date : ' + data.IN_FASIG + usuario + '    - Tot. Audited: ' + data.totAUDITADOS + '    - Tot. Pending: ' + data.totPENDING + '</center>');
//
//                        var pag = Ext.getCmp(prototype.id + '-paggin6');
//                        var pagData = pag.getPageData();
//                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//                    }
//                }
//            }
//        });
//        Ext.getCmp(prototype.id + '-gridDataAsig').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
//
//    },
//    
    onSetGridDataDetailAll: function(objCmp, objHtml, rowNum, colNum, rowData, rowCmp) {
        var data = rowData.record.data;
        if(data.TQMATCH == 0){
            return false
        }
        console.log(data, 'data')
        var paramsDetail = {};
        paramsDetail.beanString = JSON.stringify(data);
        this.searchDataDetailAll(paramsDetail);
    },
    searchDataDetailAll: function(paramsDetail) {
        
        this.showGrid('-boxMainDataDetailAll');
        win.lblUser_toolTip("Estructura: MPF100");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDataDetailAll'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = paramsDetail;
                },
                load: function(obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }else{
                        
                        var data = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-gridDataDetailAll').setTitle('<center style="font-size:12px;">Process Date : ' + data.SDATE + '    -    User: ' + data.UAUDIT + '    - Produced: ' + data.totPRODUS + '    - Tot. Production: ' + data.TOTALASIG + '</center>');
                        
                        var pag = Ext.getCmp(prototype.id + '-paggin4');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                    me.setWidthPie();
                }
            }
        });
//            global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailAll').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
    },
//    
//    onSetGridDataDetail: function(objCmp, objHtml, rowNum, colNum, rowData, rowCmp) {
//        var data = rowData.record.data;
//        var paramsDetail = {};
////        console.log(data);
//        paramsDetail.beanString = JSON.stringify(data);
//        this.searchDataDetail(paramsDetail);
//    },
//    searchDataDetail: function(paramsDetail) {
//        
//        this.showGrid('-boxMainDataDetail');
//        win.lblUser_toolTip("Estructura: CPF031");
//        var storeGridDatas = Ext.create('Ext.Praxis.store.GridData', {
//            proxy: {
//                url: prototype.url + '/searchDataDetail'
//            }, listeners: {
//                beforeload: function(obj) {
//                    obj.proxy.extraParams = paramsDetail;
//                },
//                load: function(obj) {
//                    if (obj.data.length === 0) {
//                        global.Msg({
//                            msg: 'Data not found.'
//                        });
//                    }else{
//                        var data = obj.data.items[0].data;
//                        Ext.getCmp(prototype.id + '-gridDataDetail').setTitle('<center style="font-size:12px;">Process Date : ' + data.FECHAP + '    -    User: ' + data.USEAC + '    - Produced: ' + data.totPRODUS + '    - Tot. Production: ' + data.totTOTALP + '</center>');
//
//                        var pag = Ext.getCmp(prototype.id + '-paggin2');
//                        var pagData = pag.getPageData();
//                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//                    }
//                }
//            }
//        });
////            global.clear();
//        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
//    },
//    
    onSetGridDataDetailDay: function(objCmp, objHtml, rowNum, colNum, rowData, rowCmp) {
        
        var data = rowData.record.data;
        var flag = '';
        var paramsDetailDay = {};
        
        if(colNum === 0){
            flag = 'ALL';
        }else{
            flag = '';
        }
        
        paramsDetailDay.beanString = JSON.stringify(data);
        paramsDetailDay.flag = flag;
        this.searchDataDetailDay(paramsDetailDay);
       
    },
    searchDataDetailDay: function(paramsDetailDay) {
        
//        console.log(paramsDetailDay);
        this.showGrid('-boxMainDataDetailDay');
        win.lblUser_toolTip("Estructura: MPF100");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDataDetailDay'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = paramsDetailDay;
                },
                load: function(obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }else{
                        var data = obj.data.items[0].data;
                       
//                        if(paramsDetailDay.flag === ''){
                            Ext.getCmp(prototype.id + '-gridDataDetailDay').setTitle('<center style="font-size:12px;">Process Date : ' + data.FASIG + '    -    User: ' + data.UAUDIT + '    - Produced: ' + data.page.TOTROW +'</center>');
//                        }else{
//                            console.log('wadafaaaa')
//                            Ext.getCmp(prototype.id + '-gridDataDetailDay').setTitle('<center style="font-size:12px;">Process Date : ' + data.subFECAC + '    -    User: ' + data.USEAC + '    - Produced: ' + data.page.TOTROW +'</center>');
//                        }
                        
                        var pag = Ext.getCmp(prototype.id + '-paggin3');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                    me.setWidthPie();
                }
                
            }
        });
//            global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailDay').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        
    },
//    
//    onChangeProcess: function(cpm, currentValue, lastValue) {
//
//        var panelMain = Ext.getCmp(prototype.id + '-vskMain');
//        var panelProcess = Ext.getCmp(prototype.id + '-panelProcess');
//
//        panelMain.setVisible(!panelMain.isVisible());
//        panelProcess.setVisible(!panelProcess.isVisible());
//        
//        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
//        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
//        
//        if (currentValue) {
//            if(monthFrom !== monthTo || monthFrom === '' || monthTo === ''){
//                global.Msg({msg: 'Solo se permite un mes'});
//            }else{
//                this.setGridDataProcess();
//            }
//        }else{
//            this.btnSearch_click();
//        }
//    },
//    setGridDataProcess: function() {
//        this.showGrid('-panelMainProcess');
//        Ext.getCmp(prototype.id + '-gridDataProcess').setWidth(1300);
//        var parameters = this.setFormatParameterProcess();
//        var storeGridData = Ext.create('Ext.Praxis.store.GridData', {
//            proxy: {
////                url: prototype.url + '/searchProcess'
//                url: prototype.url + '/searchProcess_1'
//            }, listeners: {
//                beforeload: function(obj) {
//                    obj.proxy.extraParams = parameters;
//                },
//                load: function(obj) {
//                    console.log(obj.data);
//                    if (obj.data.length === 0) {
//                        global.Msg({
//                            msg: 'Data not found.'
//                        });
//                    } else {
////                        var lst = obj.data;
////                        var porcTot;
////                        for (var i = 0; i < lst.length; i++) {
////                            porcTot = lst.items[i].data.totDIA / lst.items[i].data.longTotDIA;
////                            porcTot = porcTot.toFixed(2) + '%';
////                            console.log(porcTot);
////                        }
//                        
//                        var dateFrom = parameters.bean.IN_DATEFROM.substr(0,6);
//                        Ext.getCmp(prototype.id + '-gridDataProcess').setTitle('<center style="font-size:12px;">Audit Date : ' + dateFrom  + '</center>');
//                        
//                        me.hidenComponent();
//                        
//                        var diaInicial = Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
//                        var diaFinal = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
//                        var strdia = '';
//                        var ancho = 270;
//                                                
//                        if(diaInicial === '' || diaFinal === ''){
//                            diaInicial = 1;
//                            diaFinal = 31;   
//                        }
//                        for (var i = diaInicial; i <= diaFinal; i++) {
//                            ancho = ancho + 170;
//                            if(i<10){
//                                strdia = '-dia0' + i;
//                            }else{
//                                strdia = '-dia' + i;
//                            }
//                            Ext.getCmp(prototype.id + strdia).show();
//                            
////                            console.log(strdia.substr(4,2));
//                            
////                            switch(dateFrom){
////                                case '202012':
////                                    if(strdia.substr(4,2) === '08'){
////                                        Ext.getCmp(prototype.id + strdia).getEl().setStyle('background', '#FF0000');
////                                    };
////                                    if(strdia.substr(4,2) === '25'){
////                                        Ext.getCmp(prototype.id + strdia).getEl().setStyle('background', '#FF0000');
////                                    };
////                                    if(strdia.substr(4,2) === '31'){
////                                        Ext.getCmp(prototype.id + strdia).getEl().setStyle('background', '#FF0000');
////                                    }
////                                    break;
//////                                case '202012':
////                            }
//                        }
//                        if(diaFinal - diaInicial < 6){
//                            Ext.getCmp(prototype.id + '-gridDataProcess').setWidth(ancho);
//                        }
//                    }
////                    me.setWidthPie();
//                }
//            }
//        });
////        Ext.getCmp(prototype.id + '-gridDataProcess').bindStore(storeGridData);
//        Ext.getCmp(prototype.id + '-gridDataProcess').setStore(storeGridData);
//    },
//    hidenComponent: function(){
//        Ext.getCmp(prototype.id + '-dia01').hide();
//        Ext.getCmp(prototype.id + '-dia02').hide();
//        Ext.getCmp(prototype.id + '-dia03').hide();
//        Ext.getCmp(prototype.id + '-dia04').hide();
//        Ext.getCmp(prototype.id + '-dia05').hide();
//        Ext.getCmp(prototype.id + '-dia06').hide();
//        Ext.getCmp(prototype.id + '-dia07').hide();
//        Ext.getCmp(prototype.id + '-dia08').hide();
//        Ext.getCmp(prototype.id + '-dia09').hide();
//        Ext.getCmp(prototype.id + '-dia10').hide();
//        Ext.getCmp(prototype.id + '-dia11').hide();
//        Ext.getCmp(prototype.id + '-dia12').hide();
//        Ext.getCmp(prototype.id + '-dia13').hide();
//        Ext.getCmp(prototype.id + '-dia14').hide();
//        Ext.getCmp(prototype.id + '-dia15').hide();
//        Ext.getCmp(prototype.id + '-dia16').hide();
//        Ext.getCmp(prototype.id + '-dia17').hide();
//        Ext.getCmp(prototype.id + '-dia18').hide();
//        Ext.getCmp(prototype.id + '-dia19').hide();
//        Ext.getCmp(prototype.id + '-dia20').hide();
//        Ext.getCmp(prototype.id + '-dia21').hide();
//        Ext.getCmp(prototype.id + '-dia22').hide();
//        Ext.getCmp(prototype.id + '-dia23').hide();
//        Ext.getCmp(prototype.id + '-dia24').hide();
//        Ext.getCmp(prototype.id + '-dia25').hide();
//        Ext.getCmp(prototype.id + '-dia26').hide();
//        Ext.getCmp(prototype.id + '-dia27').hide();
//        Ext.getCmp(prototype.id + '-dia28').hide();
//        Ext.getCmp(prototype.id + '-dia29').hide();
//        Ext.getCmp(prototype.id + '-dia30').hide();
//        Ext.getCmp(prototype.id + '-dia31').hide();
//    },
//    
//    onProcessDay: function(objCmp, objHtml, rowNum, colNum, rowData, rowCmp, value,a,b,c,d) {
//                    
//        var data = rowData.record.data;
//        paramsProcessDay = {};        
//        var strDia = colNum - 1;
//        var IN_FECAC = '';
//        var strDia = '';
//        
////        console.log(colNum);
//        switch(colNum){
//            case 2 : strDia = Ext.getCmp(prototype.id + '-d01').config.text; break;
//            case 3 : strDia = Ext.getCmp(prototype.id + '-d02').config.text; break;
//            case 4 : strDia = Ext.getCmp(prototype.id + '-d03').config.text; break;
//            case 5 : strDia = Ext.getCmp(prototype.id + '-d04').config.text; break;
//            case 6 : strDia = Ext.getCmp(prototype.id + '-d05').config.text; break;
//            case 7 : strDia = Ext.getCmp(prototype.id + '-d06').config.text; break;
//            case 8 : strDia = Ext.getCmp(prototype.id + '-d07').config.text; break;
//            case 9 : strDia = Ext.getCmp(prototype.id + '-d08').config.text; break;
//            case 10 : strDia = Ext.getCmp(prototype.id + '-d09').config.text; break;
//            case 11 : strDia = Ext.getCmp(prototype.id + '-d10').config.text; break;
//            case 12 : strDia = Ext.getCmp(prototype.id + '-d11').config.text; break;
//            case 13 : strDia = Ext.getCmp(prototype.id + '-d12').config.text; break;
//            case 14 : strDia = Ext.getCmp(prototype.id + '-d13').config.text; break;
//            case 15 : strDia = Ext.getCmp(prototype.id + '-d14').config.text; break;
//            case 16 : strDia = Ext.getCmp(prototype.id + '-d15').config.text; break;
//            case 17 : strDia = Ext.getCmp(prototype.id + '-d16').config.text; break;
//            case 18 : strDia = Ext.getCmp(prototype.id + '-d17').config.text; break;
//            case 19 : strDia = Ext.getCmp(prototype.id + '-d18').config.text; break;
//            case 20 : strDia = Ext.getCmp(prototype.id + '-d19').config.text; break;
//            case 21 : strDia = Ext.getCmp(prototype.id + '-d20').config.text; break;
//            case 22 : strDia = Ext.getCmp(prototype.id + '-d21').config.text; break;
//            case 23 : strDia = Ext.getCmp(prototype.id + '-d22').config.text; break;
//            case 24 : strDia = Ext.getCmp(prototype.id + '-d23').config.text; break;
//            case 25 : strDia = Ext.getCmp(prototype.id + '-d24').config.text; break;
//            case 26 : strDia = Ext.getCmp(prototype.id + '-d25').config.text; break;
//            case 27 : strDia = Ext.getCmp(prototype.id + '-d26').config.text; break;
//            case 28 : strDia = Ext.getCmp(prototype.id + '-d27').config.text; break;
//            case 29 : strDia = Ext.getCmp(prototype.id + '-d28').config.text; break;
//            case 30 : strDia = Ext.getCmp(prototype.id + '-d29').config.text; break;
//            case 31 : strDia = Ext.getCmp(prototype.id + '-d30').config.text; break;
//            case 32 : strDia = Ext.getCmp(prototype.id + '-d31').config.text; break;
//        }
//        
//        console.log(strDia);
//                
//        IN_FECAC = data.IN_DATEFROM.substr(0,6) + strDia;
//        
//        if(data.USEAC.trim() === ''){
//            this.beanProcessDay.USEAC = 'vacio';
//        }else{
//            this.beanProcessDay.USEAC = data.USEAC.trim();
//        }
//        this.beanProcessDay.FECAC = IN_FECAC;
//        
////        console.log(this.beanProcessDay);
//        
//        this.paramsProcessDay.beanString = JSON.stringify(this.beanProcessDay);
//        this.searchProcessDay(paramsProcessDay);
//    },
//    searchProcessDay: function(paramsProcessDay) {
//        
//        this.showGrid('-boxProcessDay');
//        win.lblUser_toolTip("Estructura: CPF030");
//        var storeGridDatas = Ext.create('Ext.Praxis.store.GridData', {
//            proxy: {
//                url: prototype.url + '/searchProcessDay'
//            }, listeners: {
//                beforeload: function(obj) {
////                    obj.proxy.extraParams = paramsProcessDay;
//                    obj.proxy.extraParams = {beanString: me.paramsProcessDay.beanString, dw_excel: false};
//                },
//                load: function(obj) {
//                    if (obj.data.length === 0) {
//                        global.Msg({
//                            msg: 'Data not found.'
//                        });
//                    }else{
//                        var pag = Ext.getCmp(prototype.id + '-paggin10');
//                        var pagData = pag.getPageData();
//                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//                        
//                        var data = obj.data.items[0].data;
//                        console.log(data);
//                        Ext.getCmp(prototype.id + '-gridProcessDay').setTitle('<center style="font-size:12px;">User: ' + data.USEAC + '  -  Audit Date : ' + data.FECAC + '  -  Produced: ' + pagData.total + ' </center>');
//                    }
//                    me.setWidthPie();
//                }
//            }
//        });
////            global.clear();
//        Ext.getCmp(prototype.id + '-gridProcessDay').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin10').bindStore(storeGridDatas);
//    },
//    
//    btnExcel_click: function (obj, e) {
//        
//        Ext.Msg.show({
//            title: '.:AVIANCA:.',
//            msg: 'Download Excel ?',
//            buttons: Ext.MessageBox.OKCANCEL,
//            scope: this,
//            icon: Ext.MessageBox.QUESTION,
//            modal: true,
//            fn: function (btn) {
//                if (btn === 'ok') {
//                    this.exportExcel();
//                }
//            }
//        });
//        
//    },
//    exportExcel: function () {
//        
//        console.log(me.panelActual);
//        if(me.panelActual === '-panelMainProcess'){
//            var parameters = this.setFormatParameterProcess();
//            console.log(me.panelActual);
//            switch (me.panelActual) {
//                case  '-panelMainProcess':
//                    global.getFile(prototype.url + '/getXLSX?beanString=' + parameters.beanString);
//                    break;
//            }
//        }else{
//            me.dw_excel = true;
//            if (me.panelActual === '-boxProcessDay') {
//                console.log(Ext.getCmp(prototype.id + '-gridProcessDay').config.columns.items);
//                me.goURLpost('searchProcessDay', this.paramsProcessDay.beanString, Ext.getCmp(prototype.id + '-gridProcessDay').config.columns.items);
//            } else {
//                me.dw_excel = false;
//            }
//        }
//    },
//    
//    goURLpost: function(method, parms, columns) {
//
//        var js_columns = JSON.stringify(columns);
//        var mapForm = document.createElement("form");
//        mapForm.target = "_blank";
//        mapForm.method = "POST"; // or "post" if appropriate
//        mapForm.action = prototype.url + '/' + method + '?dw_excel=true';
//        var mapInput = document.createElement("input");
//        mapInput.type = "text";
//        mapInput.name = "beanString";
//        mapInput.value = parms;
//        mapForm.appendChild(mapInput);
//        var mapInput = document.createElement("input");
//        mapInput.type = "text";
//        mapInput.name = "columns";
//        mapInput.value = js_columns;
//        mapForm.appendChild(mapInput);
//        document.body.appendChild(mapForm);
//        mapForm.submit();
//    },
//    
//    
    showGrid: function (nameGrid) {

        me.drillDown.push(me.panelActual);
        Ext.getCmp(prototype.id + me.panelActual).hide();

        me.panelActual = nameGrid;
//        console.log(me.panelActual);
        Ext.getCmp(prototype.id + me.panelActual).show();

    },
    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            Ext.getCmp(prototype.id + me.panelActual).hide();
            me.panelActual = me.drillDown.pop();
            Ext.getCmp(prototype.id + me.panelActual).show();
            me.setWidthPie();
            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        }
    },
//    
//    btnCPP_click: function (obj, e) {
// 
//        Ext.MessageBox.show({
//            title: 'Execute Log',
//            msg: 'Are you sure to execute Process?',
//            buttons: Ext.MessageBox.OKCANCEL,
//            icon: Ext.MessageBox.WARNING,
//            fn: function (btn) {
//                if (btn === 'ok') {
//                    me.executeCPP();
//                }
//            }
//        });
//    },
//    executeCPP: function () {
//        this.setFormatParameter();
//        var beanString = JSON.stringify(me.bean);
// 
//        Ext.Ajax.request({
//            url: prototype.url + '/executeCPP',
//            method: 'POST',
//            timeout: 60000000,
//            params: {
//                beanString: beanString
//            },
//            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
//            success: function (response, options) {
//                var res = Ext.JSON.decode(response.responseText);
//                global.Msg({msg: res.msjResult});
//                Ext.getCmp(prototype.id + '-contentInfo').unmask();
//            },
//            failure: function (response, opts) {
//                console.log('server-side failure with status code ' + response.status);
////                setTimeout(function () {
//                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
//                    global.Msg({msg: 'Error'});
////                }, 25000);
// 
//            }
//        });
// 
//
//    },
    
    setWidthPie: function () {
        
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
//        if (me.panelActual === '-boxProcessDay') {
//            Ext.getCmp(prototype.id + '-boxPag').setVisible(true);
//        } else {
            Ext.getCmp(prototype.id + '-boxPag').setWidth(ancho);
            Ext.getCmp(prototype.id + '-boxPag').setVisible(true);
//        }
    },
    
    getPaggin: function() {
        me.pagginActual = '';
        console.log(me.panelActual )
        switch (me.panelActual) {
            case  '-boxMainData':
                me.pagginActual = '-paggin';
                break;
            case  '-boxMainDataDetail':
                me.pagginActual = '-paggin2';
                break;
            case  '-boxMainDataDetailDay':
                me.pagginActual = '-paggin3';
                break;
            case  '-boxMainDataDetailAll':
                me.pagginActual = '-paggin4';
                break;
            case  '-boxMainDataAsigMonth':
                me.pagginActual = '-paggin5';
                break;
            case  '-boxMainDataAsig':
                me.pagginActual = '-paggin6';
                break;
            case  '-boxProcessDay':
                me.pagginActual = '-paggin10';
                break;
        }
    },
    
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
    }
    
    
});