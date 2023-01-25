/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Ext.Praxis.controller.interline.SISAccountRM.SISAccountRMController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SISAccountRMController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    fecha: new Date(),
    searchParams: {},
    _path: '',
    _pathDetail: '',
    // </editor-fold>
    init: function(view) {
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'SISAccountRMForm';
        prototype.url = CONTEXTPATH+'/SISAccountRM';
//        prototype.widthContenedor = 1400;
//        prototype.widthGrid = 930;
//        prototype.widthGridDetail = 1380;
        // </editor-fold>
        win.lblUser_toolTip("Estructura: SFI021");
        this.control({
        });
    },
    afterRender: function () {
        this.cargarComboBoxes();
        this.setStoreData();
        this.btnClear_click();
        this.btnSearch_click();
    },
    cargarComboBoxes: function() {
        
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainDataAirline',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: '',
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var lstData = res.lstData;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstData,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbAirline').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbAirline').setValue('');
                global.clear();
//                me.btnSearch_click();
            }
        });
        
        
//        var airlines = new Array();
////        var paises = new Array();
//        var store;
//        Ext.Ajax.request({
//            url: prototype.url + '/obtainDataCombo',
//            method: 'POST',
//            timeout: 60000000,
//            autoLoad: true,
//            success: function(response, options){
//                var res = Ext.JSON.decode(response.responseText);
//                var lstAirlines = res.lstAirlines;
////                var lstPaises = res.lstPaises;
//                
//                lstAirlines.forEach(function callback(currentValue, index, array) {
//                    airlines.push([currentValue.A005KEY, currentValue.A005KEY2]);
//                });
//                store = Ext.create('Ext.data.ArrayStore', {
//                    storeId: 'airlines', autoLoad: true, data: airlines, fields: ['code', 'name']
//                });
//                Ext.getCmp(prototype.id + '-cmbAirline').bindStore(store);
//            },
//            failure: function(response, opts) {
//                console.log('server-side failure with status code ' + response.status);
//            }
//        });
    },
    
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    onFromYearChange: function(combo, newValue, oldValue, eOpts) {
        var comboToYear = Ext.getCmp(prototype.id+'-cmbDateToYear');
        var comboToMonth = Ext.getCmp(prototype.id+'-cmbDateToMonth');
        if (newValue!=='') {
            if (newValue > comboToYear.getValue()) {
                comboToYear.setValue(newValue);
            }
        } else {
            comboToYear.setValue(newValue);
            comboToMonth.setValue(newValue);
        }
    },
    onToYearChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromYear = Ext.getCmp(prototype.id+'-cmbDateFromYear');
        if (newValue!=='') {
            if (comboFromYear.getValue()!=='') {
                if (newValue < comboFromYear.getValue()) {
                    comboFromYear.setValue(newValue);
                }
            } else comboFromYear.setValue(newValue);
        } else {
            comboFromYear.setValue(newValue);
        }
    },
    onFromMonthChange: function(combo, newValue, oldValue, eOpts) {
        var comboToMonth = Ext.getCmp(prototype.id+'-cmbDateToMonth');
        if (newValue!=='') {
            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) {
                if (newValue > comboToMonth.getValue()) {
                    comboToMonth.setValue(newValue);
                }
            }
        } else {
            comboToMonth.setValue(newValue);
        }
    },
    onToMonthChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromMonth = Ext.getCmp(prototype.id+'-cmbDateFromMonth');
        if (newValue!=='') {
            
            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) {
                if (comboFromMonth.getValue()!=='') {
                    if (newValue < comboFromMonth.getValue()) {
                        comboFromMonth.setValue(newValue);
                    }
                } else comboFromMonth.setValue(newValue);
            }
        } else {
            comboFromMonth.setValue(newValue);
        }
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(true);
        Ext.getCmp(prototype.id+'-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id+'-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-cmbDateToMonth').bindStore(storeComboDataMonth);

    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Info">
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    onViewDetailClick: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.setFormatParameterDetail(data);
        //Ext.getCmp(prototype.id+'-boxMainData').hide();
        //Ext.getCmp(prototype.id+'-boxDetail').show();
        this.setGridDataSearchDetail();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridDataSearch();
        //Ext.getCmp(prototype.id+'-boxDetail').hide();
        //Ext.getCmp(prototype.id+'-boxMainData').show();
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) option.setVisible(false);
        else option.setVisible(true);
    },
    btnExcel_click: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
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
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id+'-cmbDateFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id+'-cmbDateToYear').setValue(new Date().getFullYear());
        
        Ext.getCmp(prototype.id + '-cmbAirline').setValue("");

        Ext.getCmp(prototype.id+'-gridSummary').getStore().removeAll();
        Ext.getCmp(prototype.id+'-lbl-currentPage').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total').setText("0");
        
        /*Ext.getCmp(prototype.id+'-gridDetail').getStore().removeAll();
        Ext.getCmp(prototype.id+'-lbl-currentPage2').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount2').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total2').setText("0");
        
        Ext.getCmp(prototype.id+'-boxDetail').hide();*/
        Ext.getCmp(prototype.id+'-boxMainData').show();
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            var heightMenu = 400;
            Ext.getCmp('App-main-region-content-north').setHeight(heightMenu);
        } /*else if (Ext.getCmp(prototype.id+'-boxDetail').isVisible()) {
            Ext.getCmp(prototype.id+'-boxDetail').hide();
            Ext.getCmp(prototype.id+'-boxMainData').show();
        }*/
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameterDetail: function(data) {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var fyear = data.IN_FECHA_FROM.substring(0,4)===null?'':data.IN_FECHA_FROM.substring(0,4);
        var fmonth = data.IN_FECHA_FROM.substring(4,6)===null?'':data.IN_FECHA_FROM.substring(4,6);
        var fday = data.IN_FECHA_FROM.substring(6,8)===null?'':data.IN_FECHA_FROM.substring(6,8);
        
        var tyear = data.IN_FECHA_TO.substring(0,4)===null?'':data.IN_FECHA_TO.substring(0,4);
        var tmonth = data.IN_FECHA_TO.substring(4,6)===null?'':data.IN_FECHA_TO.substring(4,6);
        var tday = data.IN_FECHA_TO.substring(6,8)===null?'':data.IN_FECHA_TO.substring(6,8);
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            yearFrom: fyear,
            monthFrom: fmonth,
            dayFrom: fday,
            yearTo: tyear,
            monthTo: tmonth,
            dayTo: tday,
            DFLIGHT: data.DFLIGHT,
            IN_FECHA_FROM: data.IN_FECHA_FROM,
            IN_FECHA_TO: data.IN_FECHA_TO,
            NFLIGHT: data.NFLIGHT,
            CDEPART: data.CDEPART,
            CARRIVA: data.CARRIVA,
            KMS: data.KMS
        };
        
        _pathDetail = prototype.url + '/getXLSXDetail?' +
                'yearFrom=' + searchParams.yearFrom + '&' +
                'monthFrom=' + searchParams.monthFrom + '&' +
                'dayFrom=' + searchParams.dayFrom + '&' +
                'yearTo=' + searchParams.yearTo + '&' +
                'monthTo=' + searchParams.monthTo + '&' +
                'dayTo=' + searchParams.dayTo + '&' +
                'DFLIGHT=' + searchParams.DFLIGHT + '&' +
                'IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM + '&' +
                'IN_FECHA_TO=' + searchParams.IN_FECHA_TO + '&' +
                'NFLIGHT=' + searchParams.NFLIGHT + '&' +
                'CDEPART=' + searchParams.CDEPART + '&' +
                'CARRIVA=' + searchParams.CARRIVA + '&' +
                'KMS=' + searchParams.KMS;
        // </editor-fold>
    },
    setFormatParameter: function() {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var cmbAirline = this.getValue("cmbAirline");
        var cmbFindBy = this.getValue("cmbFindBy");
        var cmbPERNUM = this.getValue("cmbPERNUM");
        
        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        var fyear = Ext.getCmp(prototype.id+'-cmbDateFromYear').getValue();
        var fmonth = Ext.getCmp(prototype.id+'-cmbDateFromMonth').getValue();
        
        var tyear = Ext.getCmp(prototype.id+'-cmbDateToYear').getValue();
        var tmonth = Ext.getCmp(prototype.id+'-cmbDateToMonth').getValue();
        // </editor-fold>
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            IN_FECHA_FROM: fyear+fmonth,
            IN_FECHA_TO: tyear+tmonth,
            
            yearFrom: fyear,
            yearTo: tyear,
            dayFrom: '',
            monthFrom: fmonth,
            monthTo: tmonth,
            dayTo: '',
            
            cmbPERNUM: cmbPERNUM,
            cmbFindBy: cmbFindBy,
            cmbAirline: cmbAirline
        };
        
        _path = prototype.url + '/getXLSX?' +
                'IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM + '&' +
                'IN_FECHA_TO=' + searchParams.IN_FECHA_TO + '&' +
                'NFLIGHT=' + searchParams.NFLIGHT + '&' +
                'STVAL=' + searchParams.STVAL + '&' +
                'PSVVTA=' + searchParams.PSVVTA + '&' +
                'CDEPART=' + searchParams.CDEPART + '&' +
                'CARRIVA=' + searchParams.CARRIVA;
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridDataSearch: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.SISAccountRM.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridSummary').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    /*setGridDataSearchDetail: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.YieldReport.GridDataDetail', {
            proxy: {
                url: prototype.url+'/showDetail'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    var pag = Ext.getCmp(prototype.id+'-paggin2');
                    var pagData = pag.getPageData();
                    
                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage2').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount2').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total2').setText(total);
                    
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id+'-gridDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin2').bindStore(storeGridDatas);
    },*/
    // </editor-fold>
    exportExcel: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            global.getFile(_path);
        } /*else if (Ext.getCmp(prototype.id+'-boxDetail').isVisible()) {
            global.getFile(_pathDetail);
        }*/
    },

    // <editor-fold defaultstate="collapsed" desc="Filters Usos">
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        } /*else if (Ext.getCmp(prototype.id + '-boxDetail').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin2').moveFirst();
        }*/
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        } /*else if (Ext.getCmp(prototype.id + '-boxDetail').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin2').movePrevious();
        }*/
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        } /*else if (Ext.getCmp(prototype.id + '-boxDetail').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin2').moveNext();
        }*/
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        } /*else if (Ext.getCmp(prototype.id + '-boxDetail').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin2').moveLast();
        }*/
    },
    // </editor-fold>
    
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    }
    
});

