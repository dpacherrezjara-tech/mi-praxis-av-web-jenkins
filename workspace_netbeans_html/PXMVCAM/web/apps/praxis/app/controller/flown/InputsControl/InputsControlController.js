/* 
  To change this license header, choose License Headers in Project Properties.
  To change this template file, choose Tools | Templates
  and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.InputsControl.InputsControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InputsControlController',
    fecha: new Date(),
    dateFrom: '',
    dateTo: '',
    bean: '',
    searchParams: {},
    searchParams_M: {},
    params: {},
    me: '',
    setContext: function() {
        me = this;
    },
    init: function(view) {
        prototype.id = 'InputsControlForm';
        prototype.url = CONTEXTPATH + '/InputsControl';

        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#InputsControlForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#InputsControlForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#InputsControlForm-btnClear': {
                click: this.btnClear_click
            },
            '#InputsControlForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#InputsControlForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#InputsControlForm-btnBack': {
                click: this.btnBack_click
            },
            '#InputsControlForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#InputsControlForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#InputsControlForm-btn-pag-next': {
                click: this.pagNext
            },
            '#InputsControlForm-btn-pag-last': {
                click: this.pagLast
            },

            //-----------------Eventos Especificos -------------------
            '#InputsControlForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#InputsControlForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            },
            '#InputsControlForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#InputsControlForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#InputsControlForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
            '#InputsControlForm-cmbView': {
                change: this.changeCmbView
            },
            '#InputsControlForm-cmbSource': {
                change: this.changeCmbSource
            },
            '#InputsControlForm-cmbYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboYear
            }
        });
    },
    xpanel_afterrender: function(obj, e) {

        this.setStoreData();
        Ext.getCmp(prototype.id + '-pie').hide();
        Ext.getCmp(prototype.id + '-contentFilter3').hide();
//        this.btnSearch_click();

    },
    // ---------- Eventos de consistencia de los combos---------------
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function(obj) {
        var month = this.fecha.getMonth() + 1;
        if (month <= 9) {
            obj.setValue('0' + month);
        } else {
            obj.setValue((month));
        }
    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboYear: function(obj) {
        //this.btnSearch_click();
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
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataYear2 = win.getStoreYear2(false, this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear2);


        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        var storeComboDataDay = win.getStoreDays(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        var cmbView = Ext.getCmp(prototype.id + '-cmbView');
        cmbView.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["D", "Detail"],
                ["C", "Calendar"]
            ]}));
        cmbView.setValue('D');
        var cmbSource = Ext.getCmp(prototype.id + '-cmbSource');
        cmbSource.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["SSIM", "SSIM"],
                ["ODS", "ODS"],
                //["OCR", "OCR"],
                ["EMD", "EMD"],
//                ["EMDN", "EMD Delta"],
                ["VCR", "VCR"],
                ["VCRJ", "VCRJ"],
                ["ISR", "TCN (ISR)"]
//                ["SISI", "SIS IB"],
//                ["SISO", "SIS OB"]


            ]}));
        cmbSource.setValue('SSIM');
        
//        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
//        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
//        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
//        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
//        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
//        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
//
//
//        if (dayFrom.getValue() === null || dayFrom.getValue() === '') {
//            dayFrom.setValue('');
//            dayTo.setValue('');
//        } else {
//            if (dayTo.getValue() === null || dayTo.getValue() === '') {
//                dayTo.setValue(31);
//            }
//        }
//        
//        me.bean = {}
//        me.bean.IN_FECHA_FROM = yearFrom.getValue() + monthFrom.getValue() + dayFrom.getValue();
//        me.bean.IN_FECHA_TO = yearTo.getValue() + monthTo.getValue() + dayTo.getValue();
//        
////        console.log(me.bean);
//
//        
//        var programas = new Array()
//        Ext.Ajax.request({
//            url: prototype.url + '/obtainDataCombo',
//            method: 'POST',
//            timeout: 60000000,
//            params: {beanString: JSON.stringify(me.bean)},
//            success: function (response, options) {
//                var res = Ext.JSON.decode(response.responseText);
//                if (res.success) {
//                    
//                    var lstProgramas = res.lstProgramas;
//                    programas.push({FUENTE: 'All'});
//                    
//                    lstProgramas.forEach(function callback(currentValue, index, array) {
//                        programas.push({FUENTE : currentValue.FUENTE});
//                    });
//                    
//                    var storeData = Ext.create('Ext.data.Store', {
//                        data: programas,
//                        autoLoad: true,
//                        fields: ['code', 'name']
//                    });
//
//                    Ext.getCmp(prototype.id + '-cmbPrograma').bindStore(storeData);
//                    Ext.getCmp(prototype.id + '-cmbPrograma').setValue('All');
//                    
//                } else {
//                    global.Msg({msg: res.sesion});
//                }
//            },
//            failure: function (response, opts) {
//                console.log('server-side failure with status code ' + response.status);
//            }
//        });

    },
    changeCmbView: function(obj) {
        var panelGrid = Ext.getCmp(prototype.id + '-infoGrids');
        var panelCalendar = Ext.getCmp(prototype.id + '-infoCalendar');
        var option = obj.getValue();

        if (option === 'D') {
            panelGrid.show();
            panelCalendar.hide();
        } else if (option === 'C') {
            panelGrid.hide();
            panelCalendar.show();
        }

        this.btnSearch_click();
    },
    changeCmbSource: function(obj) {
        this.btnSearch_click();
    },
    /*
    
    btnSearch_click: function(obj, e) {
        console.log("Boton Search");
        var view = Ext.getCmp(prototype.id + '-cmbView').getValue();
        var source = Ext.getCmp(prototype.id + '-cmbSource').getValue();


        switch (view) {
            case 'D':
                Ext.getCmp(prototype.id + '-contentFilter3').hide();
                Ext.getCmp(prototype.id + '-contentFilter').show();
                this.hideAllGrid();
                this.setFormatParameter();
                Ext.getCmp(prototype.id + '-pie').hide();

                switch (source) {
                    case 'OCR':
                        this.setGridDataMainOCR(obj, e);
                        break;

                    case 'SISI':
                        this.setGridDataMainA1686IDEC(obj, e);
                        break;

                    case 'SISO':
                        this.setGridDataMainA1686IDEC(obj, e);
                        break;

                    case 'EMDN':
                        this.setGridDataMainEMDDelta(obj, e);
                        break;

                    default:
                        this.setGridDataMainA1686(obj, e);
                        break;
                }

                break;
            case 'C':
                console.log('mostrar el calendario');
                Ext.getCmp(prototype.id + '-contentFilter3').show();
                Ext.getCmp(prototype.id + '-contentFilter').hide();
                this.setCalendar();
                break;
        }

        global.clear();

    },
    
    */
    
    setFormatParameterNew: function() {
        
        me.bean = {}
        
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');


        if (dayFrom.getValue() === null || dayFrom.getValue() === '') {
            dayFrom.setValue('');
            dayTo.setValue('');
        } else {
            if (dayTo.getValue() === null || dayTo.getValue() === '') {
                dayTo.setValue(31);
            }
        }
        
        me.bean.IN_FECHA_FROM = yearFrom.getValue() + monthFrom.getValue() + dayFrom.getValue();
        me.bean.IN_FECHA_TO = yearTo.getValue() + monthTo.getValue() + dayTo.getValue();
        
        me.bean.IN_FUENTE = Ext.getCmp(prototype.id + '-cmbSource').getValue();
        me.bean.MENSA = Ext.getCmp(prototype.id + '-cmbPrograma').getValue();
        
        me.bean.IN_TIPOFECHA = 1;
        
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
        
        console.log(searchParams);
        
    },
    btnSearch_click: function(obj, e) {
        
        this.setFormatParameterNew();
        
        var chkLOG = Ext.getCmp(prototype.id + '-chkLOG').getValue();
        var cmbView = Ext.getCmp(prototype.id + '-cmbView').getValue();
        var cmbSource = Ext.getCmp(prototype.id + '-cmbSource').getValue();
        var cmbPrograma = Ext.getCmp(prototype.id + '-cmbPrograma').getValue();
        
        if(cmbPrograma === 'All'){
            cmbPrograma = '';
        }
                
        if(chkLOG){
            me.bean.MENSA = cmbPrograma;
            
            var beanString = JSON.stringify(me.bean);
            searchParams = {
                bean: me.bean,
                beanString: beanString
            };

            console.log(searchParams);
            
            this.searchLOGSA1910(me.bean);
        }else{
            me.bean.MENSA = '';
            if(cmbView === 'D'){
                if(cmbSource ===' OCR'){
//                    this.searchA1686_OCR(me.bean);
                }else{
                    this.searchA1686(me.bean);
                }
            }else{
                Ext.getCmp(prototype.id + '-contentFilter3').show();
                Ext.getCmp(prototype.id + '-contentFilter').hide();
                this.setCalendar();
            }
        }
        

        global.clear();

    },
    searchA1686: function(obj, val) {
        this.hideAllGrid();
        Ext.getCmp(prototype.id + '-gridDataMainA1686').show();
        console.log(searchParams);
        searchParams_M = searchParams;
        
        Ext.Ajax.request({
            url: prototype.url + '/searchA1686',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridDataMainA1686').mask('Loading...'),
            params: searchParams,
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-gridDataMainA1686').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                
                if(res.User === 'SAP01' || res.User === 'SAP43' || res.User === 'SAP48' || res.User === 'SAP07' || res.User === 'SAP12'
                || res.User === 'ADM2' || res.User === 'OPER2' || res.User === 'OPER3' || res.User === 'OPER6' || res.User === 'OPER7' || res.User === 'OPER9'){
                    Ext.getCmp(prototype.id + '-chkLOG').show();
                }else{
                    Ext.getCmp(prototype.id + '-chkLOG').hide();
                }
                
                var data = res.data;
                
                if(data.length === 0){
                    global.Msg({msg: 'Data not found.'});
                    Ext.getCmp(prototype.id + '-gridDataMainA1686').hide();
                } else {
                    Ext.getCmp(prototype.id + '-gridDataMainA1686').show();
                    var storeData = Ext.create('Ext.data.Store', {
                        data: data,
                        autoLoad: true
                    });

                    Ext.getCmp(prototype.id + '-gridDataMainA1686').bindStore(storeData);
                }

//                if (obj.data.length === 0) {
//                    global.Msg({msg: 'Data not found.'});
//                }else{
//
//                    var fuente = Ext.getCmp(prototype.id + '-cmbSource').getValue();
//                    console.log(fuente);
//
//                    if(fuente === 'ODS'){
//                        Ext.getCmp(prototype.id + '-errorMain').setText('Duplicate');
//                    }else{
//                        Ext.getCmp(prototype.id + '-errorMain').setText('Error');
//                    }
//                }
            }
        });
        
    
    /*
        var storeMainA1686 = Ext.create('Ext.Praxis.store.flown.InputControl.GridDataMainA1686', {
            proxy: {
                url: prototype.url + '/searchA1686'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var foot = Ext.getCmp(prototype.id + '-pie');
//                    pag.hide();
//                    foot.hide();
                    console.log(obj);
                    
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    }else{
                        
                        var fuente = Ext.getCmp(prototype.id + '-cmbSource').getValue();
                        console.log(fuente);
                        
                        if(fuente === 'ODS'){
                            Ext.getCmp(prototype.id + '-errorMain').setText('Duplicate');
                        }else{
                            Ext.getCmp(prototype.id + '-errorMain').setText('Error');
                        }
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMainA1686').bindStore(storeMainA1686);
    */

    },
    
    searchLOGSA1910: function(obj, val) {
        win.lblUser_toolTip("Estructura: A1910");
        this.hideAllGrid();
        Ext.getCmp(prototype.id + '-gridDataLOG').show();

        var storeMainA1686 = Ext.create('Ext.Praxis.store.flown.InputControl.GridDataMainA1686', {
            proxy: {
                url: prototype.url + '/searchLOGSA1910'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    }else{
                        
//                        console.log(obj.data);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataLOG').bindStore(storeMainA1686);

    },
    
    setFormatParameter: function() {

        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var view = Ext.getCmp(prototype.id + '-cmbView');
        var source = Ext.getCmp(prototype.id + '-cmbSource');


        if (dayFrom.getValue() === null || dayFrom.getValue() === '') {
            dayFrom.setValue('');
            dayTo.setValue('');
        } else {
            if (dayTo.getValue() === null || dayTo.getValue() === '') {
                dayTo.setValue(31);
            }
        }

        this.dateFrom = yearFrom.getValue() + monthFrom.getValue() + dayFrom.getValue();
        this.dateTo = yearTo.getValue() + monthTo.getValue() + dayTo.getValue();


        searchParams = {
            tipoFecha: 1,
            dateFrom: this.dateFrom,
            dateTo: this.dateTo,
            view: view.getValue(),
            source: source.getValue()
        };

    },
    setGridDataMainA1686: function(obj, val) {
        this.setFormatParameter();
        this.hideAllGrid();
        Ext.getCmp(prototype.id + '-gridDataMainA1686').show();


        var storeMainA1686 = Ext.create('Ext.Praxis.store.flown.InputControl.GridDataMainA1686', {
            proxy: {
                url: prototype.url + '/searchA1686'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var foot = Ext.getCmp(prototype.id + '-pie');
                    pag.hide();
                    foot.hide();

                    if (obj.data.length === 0) {

                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }else{
                        var fuente = Ext.getCmp(prototype.id + '-cmbSource').getValue();
                        
                        if(fuente === 'ODS'){
                            Ext.getCmp(prototype.id + '-errorMain').setText('Duplicate');
                        }else{
                            Ext.getCmp(prototype.id + '-errorMain').setText('Error');
                        }
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMainA1686').bindStore(storeMainA1686);

    },
    setGridDataMainOCR: function(obj, val) {
        this.setFormatParameter();
        this.hideAllGrid();
        Ext.getCmp(prototype.id + '-gridMainDataOCR').show();


        var storeMainA1690 = Ext.create('Ext.Praxis.store.flown.InputControl.GridDataMainA1686', {
            proxy: {
                url: prototype.url + '/searchMainOCR'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var foot = Ext.getCmp(prototype.id + '-pie');
                    pag.hide();
                    foot.hide();

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridMainDataOCR').bindStore(storeMainA1690);

    },
    setGridDataMainEMDDelta: function(obj, val) {
        this.setFormatParameter();
        this.hideAllGrid();
        Ext.getCmp(prototype.id + '-gridDataMainEMDDelta').show();


        var storeMainA2735 = Ext.create('Ext.Praxis.store.flown.InputControl.GridDataMainA1686', {
            proxy: {
                url: prototype.url + '/searchA1686'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var foot = Ext.getCmp(prototype.id + '-pie');
                    pag.hide();
                    foot.hide();

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMainEMDDelta').bindStore(storeMainA2735);

    },
    setGridDataMainA1686IDEC: function(obj, val) {
        this.setFormatParameter();
        this.hideAllGrid();
        Ext.getCmp(prototype.id + '-gridDataMainA1686IDEC').show();


        var storeMainA1686 = Ext.create('Ext.Praxis.store.flown.InputControl.GridDataMainA1686', {
            proxy: {
                url: prototype.url + '/searchA1686'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var foot = Ext.getCmp(prototype.id + '-pie');
                    pag.hide();
                    foot.hide();

                    if (obj.data.length === 0) {

                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMainA1686IDEC').bindStore(storeMainA1686);

    },
    setGridDataA1686Formateados: function(dv, record, item, index, e) {
        var data = dv.dataSource.data.items[item].data;
        console.log(data);
        params = {
            IN_TIPOFECHA: data.IN_TIPOFECHA,
            FECHA: data.FECHA,
            FUENTE: data.FUENTE,
            HOCR: data.HOCR,
            QRECOR: data.QRECOR,
            QRECERR: data.QRECERR
        };

        this.hideAllGrid();
        var storeA1686Formateados = Ext.create('Ext.Praxis.store.flown.InputControl.GridDataMainA1686', {
            proxy: {
                url: prototype.url + '/searchA1686Formateados'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = params;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var foot = Ext.getCmp(prototype.id + '-pie');
                    pag.hide();
                    foot.hide();

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }else{
                        
                        var fuente = Ext.getCmp(prototype.id + '-cmbSource').getValue();
                        
                        if(fuente === 'ODS'){
                            Ext.getCmp(prototype.id + '-id_error').setText('Duplicate');
                        }else{
                            Ext.getCmp(prototype.id + '-id_error').setText('Error');
                        }
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataA1686Formateados').bindStore(storeA1686Formateados);
        Ext.getCmp(prototype.id + '-gridDataA1686Formateados').show();


    },
    setGridProcDateData: function(dv, record, item, index, e) {
        var data = dv.dataSource.data.items[item].data;
        params = {
            IN_TIPOFECHA: data.IN_TIPOFECHA,
            FECHA: data.FECHA,
            HOCR: data.HOCR,
            FUENTE: data.FUENTE,
            strFormatDate4: data.strFormatDate4
        };

        this.hideAllGrid();
        var storeA1686Formateados = Ext.create('Ext.Praxis.store.flown.InputControl.GridDataMainA1686', {
            proxy: {
                url: prototype.url + '/searchA1686ProcDateData'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = params;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var foot = Ext.getCmp(prototype.id + '-pie');
                    pag.hide();
                    foot.hide();
                    
                    var cmbSource = Ext.getCmp(prototype.id + '-cmbSource').getValue();
                    console.log(cmbSource);
                    if (cmbSource === 'ISR'){
                        Ext.getCmp(prototype.id + '-flightDate').setText('Processing <br> Date');
                    } else {
                        Ext.getCmp(prototype.id + '-flightDate').setText('Flight <br> Date');
                    }
                    
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridProcDateData').bindStore(storeA1686Formateados);
        Ext.getCmp(prototype.id + '-titleProcDate').setHtml("<strong style=\"color:#000;\">Processing Date " + data.strFormatDate4 + "</strong> ");
        Ext.getCmp(prototype.id + '-panelGridProcDateData').show();


    },
    
    setErrores: function(dv, record, item, index, e) {
        
        
        var data = dv.dataSource.data.items[item].data;
        console.log(data);
        
        if(data.QRECERR > 0){
        
            var src = Ext.getCmp(prototype.id + '-cmbSource').getValue();
            if(src === 'ODS' || src === 'SSIM' || src === 'EMD'){
                console.log('...');
            }else{
                if(data.FUENTE === 'VCRJ'){
                    this.setErroresVCRJ(data.FECHA, data.FUENTE, data.DPRDA, data.DTRANS, data.FECR, data.HOCR);
                }else{
                    this.setGridDataA1696Errores(data.FECHA, data.HOCR, data.FUENTE);
                }
            }
        }
    },
    
    setErroresVCRJ: function(FECHA, FUENTE, DPRDA, DTRANS, FECR, HOCR) {
        
        params = {
            FECHA: FECHA,
            FUENTE: FUENTE,
            DPRDA: DPRDA,
            DTRANS: DTRANS,
            FECR: FECR,
            HOCR: HOCR
        };
        
        console.log(params);

        this.hideAllGrid();
        var storeErrorVCRJ = Ext.create('Ext.Praxis.store.flown.InputControl.GridDataMainA1686', {
            proxy: {
                url: prototype.url + '/searchErrorVCRJ'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = params;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var foot = Ext.getCmp(prototype.id + '-pie');
                    pag.hide();
                    foot.hide();
                    
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataErrorVCRJ').bindStore(storeErrorVCRJ);
        Ext.getCmp(prototype.id + '-gridDataErrorVCRJ').show();

    },
    
    setGridDataA1696Errores: function(FECHA, HOCR, FUENTE ) {
        
        
        params = {
            FECHA: FECHA,
            HOCR: HOCR,
            FUENTE: FUENTE
        };

        console.log(" --->FECHA : " + params.FECHA);
        console.log(" --->FUENTE : " + params.FUENTE);
        console.log(" --->HOCR : " + params.HOCR);

        this.hideAllGrid();
        var storeA1698Errores = Ext.create('Ext.Praxis.store.flown.InputControl.GridDataMainA1686', {
            proxy: {
                url: prototype.url + '/searchA1696Errores'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = params;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var foot = Ext.getCmp(prototype.id + '-pie');
                    pag.hide();
                    foot.hide();

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataA1696Errores').bindStore(storeA1698Errores);
        Ext.getCmp(prototype.id + '-gridDataA1696Errores').show();


    },
    setGridDataA1687: function(dv, record, item, index, e) {
        var data = dv.dataSource.data.items[item].data;
        params = {
            FECHA: data.FECHA
        };


        var storeDataA1687 = Ext.create('Ext.Praxis.store.flown.InputControl.GridDataMainA1686', {
            proxy: {
                url: prototype.url + '/searchA1687'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = params;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(pagData.currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pagData.pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(pagData.total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataA1687').bindStore(storeDataA1687);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeDataA1687);
        Ext.getCmp(prototype.id + '-titleA1687').setHtml("<strong style=\"color:#000;\">Processing Date " + data.strFormatDate3 + "</strong> ");
        Ext.getCmp(prototype.id + '-panelGridDataA1687').show();
        Ext.getCmp(prototype.id + '-pie').show();


    },
    setGridDataA1688: function(dv, record, item, index, e) {
        var data = dv.dataSource.data.items[item].data;
        params = {
            FECHA: data.FECHA,
            HOCR: data.HOCR
        };
        
        console.log(params);

        var storeDataA1688 = Ext.create('Ext.Praxis.store.flown.InputControl.GridDataMainA1686', {
            proxy: {
                url: prototype.url + '/searchA1688'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = params;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(pagData.currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pagData.pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(pagData.total);

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataA1688').bindStore(storeDataA1688);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeDataA1688);
        Ext.getCmp(prototype.id + '-titleA1688').setHtml("<strong style=\"color:#000;\">Processing Date " + data.strFormatDate3 + "</strong> ");
        Ext.getCmp(prototype.id + '-panelGridDataA1688').show();
        Ext.getCmp(prototype.id + '-pie').show();


    },
    setGridDataA1689: function(dv, record, item, index, e) {
        var data = dv.dataSource.data.items[item].data;
        params = {
            FECHA: data.FECHA
        };


        var storeDataA1689 = Ext.create('Ext.Praxis.store.flown.InputControl.GridDataMainA1686', {
            proxy: {
                url: prototype.url + '/searchA1689'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = params;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(pagData.currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pagData.pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(pagData.total);

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataA1689').bindStore(storeDataA1689);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeDataA1689);
        Ext.getCmp(prototype.id + '-titleA1689').setHtml("<strong style=\"color:#000;\">Processing Date " + data.strFormatDate3 + "</strong> ");
        Ext.getCmp(prototype.id + '-panelGridDataA1689').show();
        Ext.getCmp(prototype.id + '-pie').show();


    },
    setGridDataA1413: function(dv, record, item, index, e) {
        var data = dv.dataSource.data.items[item].data;
        console.log(data);
        params = {
            FECHA: data.FECHA,
            FECR: data.FECR,
            HOCR: data.HOCR,
            FUENTE: data.FUENTE,
            strFormatDate: data.strFormatDate,
            strFormatDate4: data.strFormatDate4
        };


        var storeDataA1413 = Ext.create('Ext.Praxis.store.flown.InputControl.GridDataMainA1686', {
            proxy: {
                url: prototype.url + '/searchA1413'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = params;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(pagData.currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pagData.pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(pagData.total);

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataA1413').bindStore(storeDataA1413);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeDataA1413);
        Ext.getCmp(prototype.id + '-titleA1413').setHtml("<strong style=\"color:#000;\">Processing Date " + data.strFormatDate3 + "</strong> ");
        Ext.getCmp(prototype.id + '-panelGridDataA1413').show();
        Ext.getCmp(prototype.id + '-pie').show();


    },
    setGridDataA1419: function(dv, record, item, index, e) {
        var data = dv.dataSource.data.items[item].data;
        params = {
            FECHA: data.FECHA
        };


        var storeDataA1419 = Ext.create('Ext.Praxis.store.flown.InputControl.GridDataMainA1686', {
            proxy: {
                url: prototype.url + '/searchA1419'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = params;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(pagData.currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pagData.pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(pagData.total);

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataA1419').bindStore(storeDataA1419);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeDataA1419);
        Ext.getCmp(prototype.id + '-titleA1419').setHtml("<strong style=\"color:#000;\">Processing Date " + data.strFormatDate3 + "</strong> ");
        Ext.getCmp(prototype.id + '-panelGridDataA1419').show();
        Ext.getCmp(prototype.id + '-pie').show();


    },
    setGridDataA1690: function(dv, record, item, index, e) {
        this.hideAllGrid();
        var data = dv.dataSource.data.items[item].data;
        params = {
            FECHA: data.FECHA
        };


        var storeDataA1690 = Ext.create('Ext.Praxis.store.flown.InputControl.GridDataMainA1686', {
            proxy: {
                url: prototype.url + '/searchA1690'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = params;
                },
                load: function(obj) {
                    var data = obj.data.items[0].data;
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
//                    var header1;
//                    var header2;
//                    var strGrupos;
//                    if (data.GrupoMin.trim() !== '') {
//                        strGrupos = 'Grupos del ' + data.GrupoMin + '  al  ' + data.GrupoMax;
//                    }
//
//                    header1 = strGrupos + '<pre style="display:inline">&#09;&#09;</pre>' + ' Total  OCR  ' + data.totOCR + '<pre style="display:inline">&#09;&#09;</pre>AM : ' + data.totAM + '   OAL :  ' + data.totOAL;
//                    header2 = 'Total  IxC  <pre style="display:inline">&#09;</pre>' + data.totIXC;


//                    Ext.getCmp(prototype.id + '-gridDataA1690-header').setText(header1);
//                    Ext.getCmp(prototype.id + '-gridDataA1690-header2').setText(header2);
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(pagData.currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pagData.pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(pagData.total);
                    Ext.getCmp(prototype.id + '-titleA1690').setHtml("<strong style=\"color:#000;text-align:center\">Processing Date " + data.strFormatDate3 + "</strong> ");

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataA1690').bindStore(storeDataA1690);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeDataA1690);
        //Ext.getCmp(prototype.id + '-titleA1690').setHtml("<strong style=\"color:#000;\">Processing Date " + data.strFormatDate3 + "</strong> ");
        Ext.getCmp(prototype.id + '-panelGridDataA1690').show();
        Ext.getCmp(prototype.id + '-pie').show();


    },
    setGridDataA2735: function(dv, record, item, index, e) {
        this.hideAllGrid();
        var data = dv.dataSource.data.items[item].data;
        var IN_ERROR;
        console.log("Index : " + index);

        if (index === 6) {
            IN_ERROR = '';
        }
        if (index === 7) {
            IN_ERROR = '1';
        }
        if (index === 8) {
            IN_ERROR = '2';
        }

        params = {
            FECHA: data.FECHA,
            IN_ERROR: IN_ERROR
        };
        console.log(params.FECHA);
        console.log(params.IN_ERROR);

        var storeDataA2735 = Ext.create('Ext.Praxis.store.flown.InputControl.GridDataMainA1686', {
            proxy: {
                url: prototype.url + '/searchA2735'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = params;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(pagData.currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pagData.pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(pagData.total);

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataA2735').bindStore(storeDataA2735);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeDataA2735);
        Ext.getCmp(prototype.id + '-gridDataA2735').show();
        Ext.getCmp(prototype.id + '-pie').show();


    },
    setGridDataByFlightDate: function(dv, record, item, index, e) {
        
        var data = dv.dataSource.data.items[item].data;
        
        if(data.QRECORG > 0){
        
            this.hideAllGrid();

            params = {
                FUENTE: data.FUENTE
            };
            switch (params.FUENTE) {
                case 'SSIM':
                    this.setGridDataA1687(dv, record, item, index, e);
                    break;

                case 'ODS':
                    this.setGridDataA1688(dv, record, item, index, e);
                    break;

                case 'EMD':
                    this.setGridDataA1689(dv, record, item, index, e);
                    break;

                case 'VCR':
                    this.setGridDataA1413(dv, record, item, index, e);
                    break;

                case 'VCRJ':
                    this.setGridDataA1413(dv, record, item, index, e);
                    break;

                case 'ISR':
                    this.setGridDataA1419(dv, record, item, index, e);
                    break;
            }
        }

    },    
    initCalendar: function() {
        var anio = Ext.getCmp(prototype.id + '-cmbYear').getValue();
        var dias = ["7", "1", "2", "3", "4", "5", "6"];
        var mes;
        var dt2;
        var init, totalDays, fin, day;
        var colorFlag;


        for (var m = 1; m <= 12; m++) {
//                    console.log('mex: ' + m );
            var panelmes = Ext.getCmp(prototype.id +'panel'+ (m < 10 ? '0' : '') + m);
            panelmes.removeAll(true);
        }
        console.log('comienza cracion');
        for (var i = 1; i <= 12; i++) {
            if (i < 10) {
                mes = '0' + i;
            } else {
                mes = '' + i + '';
            }
            dt2 = new Date(mes + ' 01' + ', ' + anio + ' 12:00:00');
            totalDays = new Date(anio, mes, 0).getDate();
            init = dias[dt2.getUTCDay()];
            fin = parseInt(totalDays) + parseInt(init);
            day = 1;
            
            var panelmes = Ext.getCmp(prototype.id +'panel'+ (i < 10 ? '0' : '') + i);
            panelmes.suspendLayout = true;
            for (var n = init; n < fin; n++) {
//                if (n % 7 === 1) {
//                    colorFlag = '#D6D6D6';
//                } else {
//                    if (i % 2 !== 0) {
//                        colorFlag = '#65C3E5';
//                    } else {
//                        colorFlag = '#2e6bf4';
//                    }
//                }
//                Ext.getCmp(prototype.id + '-lblDay_' + i + '_' + (parseInt(n))).setText(day);
//                Ext.getCmp(prototype.id + '-lblDay_' + i + '_' + (parseInt(n))).setStyle('backgroundColor', '#ffffff');
//                Ext.getCmp(prototype.id + '-lblDay_' + i + '_' + (parseInt(n))).setStyle('color', '#000000');
//                Ext.getCmp(prototype.id + 'gdiFlag_' + i + '_' + (parseInt(n))).setStyle('backgroundColor', colorFlag);
                
                    
                    
                    if(n === init){
                        for (var c = 1; c < init; c++) {
                            var v_label2 = new Ext.form.Label({text: '',backgroundColor:'#D6D6D6'});
                            panelmes.add( v_label2);
                        }
                        
                    }
                    
                    var fday = (day < 10 ? '0' : '') + day;
                    var v_id = 'lbl'+anio+''+mes+''+ fday ;
                    var v_label = new Ext.form.Label({
                                        id:v_id , text: day,backgroundColor:'#ffffff',color:'#000000'
                                    });
                    panelmes.add( v_label);
                
//                    console.log('mex: ' + i + ' dia : ' + n);
                day++;
            }
        }
        console.log('termina cracion-----------****');
        Ext.getCmp(prototype.id +'panel05').suspendLayout = false;
        Ext.getCmp(prototype.id +'panel05').updateLayout();
    },
    
    setCalendar: function() {
        console.log("Estamos en SetCalendar");
//        this.setClearCalendar();


        var aux = true;
        var source = Ext.getCmp(prototype.id + '-cmbSource').getValue();
        var anio = Ext.getCmp(prototype.id + '-cmbYear').getValue();
        
        Ext.getCmp(prototype.id + '-lbl-year').setText(anio);

        Ext.Ajax.request({
            url: prototype.url + '/searchCalendar',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                tipoFecha: '1',
                dateFrom: anio,
                source: source
            },
            success: function(response, options) {
                if (aux) {
                    me.initCalendar();
                    var res = Ext.JSON.decode(response.responseText);
                    res = res.data;
                    var dato = 0;
                    var dias = ["7", "1", "2", "3", "4", "5", "6"];
                    var colorFlag;
                    var dia, mes, anio, mesf;


                    for (var i = 0; i < res.length; i++) {
                        dia = res[i].fecha.substring(6, 8);
                        mes = res[i].fecha.substring(4, 6);
                        anio = res[i].fecha.substring(0, 4);
                        mesf = (new Date(mes + ' ' + dia + ', ' + anio + ' 12:00:00').getMonth() + 1).toString();

                        var dt = new Date(mes + ' ' + dia + ', ' + anio + ' 12:00:00');
                        var color = res[i].strFormatDate === 'ROJO' ? '#ff0000' : '#00ff00';


                        if (mesf % 2 !== 0) {
                            colorFlag = '#65C3E5';
                        } else {
                            colorFlag = '#2e6bf4';
                        }
                        
//                        console.log('fecha : ' + res[i].fecha + ' date: ' + dt +  ' getUTC : ' + dias[dt.getUTCDay()] );
                        
//                        if(mes ==='01'){
                            if(source === 'VCR'){
                                if(res[i].fecha < '20210301'){
                                    Ext.getCmp('lbl' + res[i].fecha).setStyle('backgroundColor', color);
                                    Ext.getCmp('lbl' + res[i].fecha).setStyle('color', '#000000');
                                }   
                            }else{
                                Ext.getCmp('lbl' + res[i].fecha).setStyle('backgroundColor', color);
                                Ext.getCmp('lbl' + res[i].fecha).setStyle('color', '#000000');
                            }
//                        }
                        
//                        Ext.getCmp(prototype.id + 'gdiFlag_' + mesf + '_' + dato).setStyle('backgroundColor', colorFlag);
//                        if (dia === '01') {
//                            dato = dias[dt.getUTCDay()];
//
//                            Ext.getCmp(prototype.id + '-lblDay_' + mesf + '_' + dato).setText(dia);
//                            Ext.getCmp(prototype.id + '-lblDay_' + mesf + '_' + dato).setStyle('backgroundColor', color);
//                            Ext.getCmp(prototype.id + '-lblDay_' + mesf + '_' + dato).setStyle('color', '#000000');
//                            Ext.getCmp(prototype.id + 'gdiFlag_' + mesf + '_' + dato).setStyle('backgroundColor', colorFlag);
//
//                            
////                            console.log('if** -->' + prototype.id + '-lblDay_' + dato + ' = ' + dia);
//
//                        } else{
//                            
//                            Ext.getCmp(prototype.id + '-lblDay_' + mesf + '_' + (parseInt(dato) + parseInt(dia) - 1)).setText(dia);
//                            Ext.getCmp(prototype.id + '-lblDay_' + mesf + '_' + (parseInt(dato) + parseInt(dia) - 1)).setStyle('backgroundColor', color);
//                            Ext.getCmp(prototype.id + '-lblDay_' + mesf + '_' + (parseInt(dato) + parseInt(dia) - 1)).setStyle('color', '#000000');
//                            Ext.getCmp(prototype.id + 'gdiFlag_' + mesf + '_' + (parseInt(dato) + parseInt(dia) - 1)).setStyle('backgroundColor', colorFlag);
//
////                            console.log('else -->'+ ' dato :'+ dato + ' dia : ' + dia + ' == ' + prototype.id + '-lblDay_' + mesf + '_' + (parseInt(dato) + parseInt(dia) - 1) + ' = ' + dia);
//                        }

                        


                    }
                    aux = false;
                }
                Ext.getBody().unmask();
            }
        });
        console.log("Salimos de SetCalendar");

    }
    ,
    setClearCalendar: function() {
//        for (var i = 1; i <= 42; i++) {
//            for (var j = 1; j <= 12; j++) {
//                Ext.getCmp(prototype.id + '-lblDay_' + j + '_' + i).Aplicando estilos genericossetText('.');
//                Ext.getCmp(prototype.id + '-lblDay_' + j + '_' + i).setStyle('backgroundColor', '#E5ECEF');
//                Ext.getCmp(prototype.id + '-lblDay_' + j + '_' + i).setStyle('color', '#E5ECEF');
//                Ext.getCmp(prototype.id + 'gdiFlag_' + j + '_' + i).setStyle('backgroundColor', '#E5ECEF');
//
//            }
//        }
    }
    ,
    btnClear_click: function(obj, e) {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');


        yearFrom.setValue(this.fecha.getFullYear());
        var storeComboDataYear = win.getStoreYear2(false, yearFrom.getValue());
        yearTo.bindStore(storeComboDataYear);
        yearTo.setValue(this.fecha.getFullYear());
        monthFrom.setValue('0' + (this.fecha.getMonth() + 1));
        monthTo.setValue('0' + (this.fecha.getMonth() + 1));
        dayFrom.setValue("");
        dayTo.setValue("");

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
    exportExcel: function() {
        this.setFormatParameter();
        console.log("Antes de la llamada");
        var boxMainA1686 = Ext.getCmp(prototype.id + '-gridDataMainA1686');
        var boxMainA1686IDEC = Ext.getCmp(prototype.id + '-gridDataMainA1686IDEC');
        var boxMainA1690 = Ext.getCmp(prototype.id + '-gridMainDataOCR');
        var boxMainEMDDelta = Ext.getCmp(prototype.id + '-gridDataMainEMDDelta');

        var boxA1686Formateados = Ext.getCmp(prototype.id + '-gridDataA1686Formateados');
        var boxA1686ProcDateData = Ext.getCmp(prototype.id + '-panelGridProcDateData');
        var boxA1696Errores = Ext.getCmp(prototype.id + '-gridDataA1696Errores');
        var boxAErrorVCRJ = Ext.getCmp(prototype.id + '-gridDataErrorVCRJ');
        var boxA1690 = Ext.getCmp(prototype.id + '-panelGridDataA1690');
        var boxA2735 = Ext.getCmp(prototype.id + '-gridDataA2735');


        var boxA1687 = Ext.getCmp(prototype.id + '-panelGridDataA1687');
        var boxA1688 = Ext.getCmp(prototype.id + '-panelGridDataA1688');
        var boxA1689 = Ext.getCmp(prototype.id + '-panelGridDataA1689');
        var boxA1413 = Ext.getCmp(prototype.id + '-panelGridDataA1413');
        var boxA1419 = Ext.getCmp(prototype.id + '-panelGridDataA1419');

        if (!boxMainA1686.hidden) {
            
            console.log('waaaaaa');
            console.log(searchParams_M);
            
            global.getFile(prototype.url + '/GetXLSXA1686?beanString=' + searchParams_M.beanString);
            
//            global.getFile(prototype.url + '/GetXLSXA1686?tipoFecha=' + searchParams.tipoFecha
//                    + '&dateFrom=' + searchParams.dateFrom
//                    + '&dateTo=' + searchParams.dateTo
//                    + '&source=' + searchParams.source);
        }
        if (!boxA1686ProcDateData.hidden) {
            global.getFile(prototype.url + '/GetXLSXProcDate?IN_TIPOFECHA=' + params.IN_TIPOFECHA
                    + '&FECHA=' + params.FECHA
                    + '&HOCR=' + params.HOCR
                    + '&FUENTE=' + params.FUENTE);
        }
        if (!boxA1687.hidden) {
            global.getFile(prototype.url + '/GetXLSA1687?FECHA=' + params.FECHA);
        }

        if (!boxA1686Formateados.hidden) {
            global.getFile(prototype.url + '/GetXLSXA1686Formateados?IN_TIPOFECHA=' + params.IN_TIPOFECHA
                    + '&FECHA=' + params.FECHA
                    + '&FUENTE=' + params.FUENTE
                    + '&HOCR=' + params.HOCR
                    + '&QRECOR=' + params.QRECOR
                    + '&QRECERR=' + params.QRECERR);
        }
        if (!boxA1696Errores.hidden) {
            global.getFile(prototype.url + '/GetXLSXA1696Errores?FECHA=' + params.FECHA
                    + '&HOCR=' + params.HOCR
                    + '&FUENTE=' + params.FUENTE);
        }
        if (!boxAErrorVCRJ.hidden) {
            global.getFile(prototype.url + '/GetXLSX6ErrorVCRJ?FECHA=' + params.FECHA
                    + '&FUENTE=' + params.FUENTE
                    + '&DPRDA=' + params.DPRDA
                    + '&DTRANS=' + params.DTRANS
                    + '&FECR=' + params.FECR
                    + '&HOCR=' + params.HOCR
            );
        }
        if (!boxA1688.hidden) {
            global.getFile(prototype.url + '/GetXLSA1688?FECHA=' + params.FECHA
                    + '&HOCR=' + params.HOCR
            );
        }

        if (!boxA1689.hidden) {
            global.getFile(prototype.url + '/GetXLSA1689?FECHA=' + params.FECHA);
        }

        if (!boxA1413.hidden) {
            global.getFile(prototype.url + '/GetXLSA1413?FECHA=' + params.FECHA
                    + '&FECR=' + params.FECR
                    + '&HOCR=' + params.HOCR
                    + '&FUENTE=' + params.FUENTE
                    + '&strFormatDate4=' + params.strFormatDate4
                    + '&strFormatDate=' + params.strFormatDate
            );
        }
        if (!boxA1419.hidden) {
            global.getFile(prototype.url + '/GetXLSA1419?FECHA=' + params.FECHA);
        }

        if (!boxMainA1686IDEC.hidden) {
            global.getFile(prototype.url + '/GetXLSXA1686?tipoFecha=' + searchParams.tipoFecha
                    + '&dateFrom=' + searchParams.dateFrom
                    + '&dateTo=' + searchParams.dateTo
                    + '&source=' + searchParams.source);
        }
        if (!boxMainEMDDelta.hidden) {
            global.getFile(prototype.url + '/GetXLSXA1686?tipoFecha=' + searchParams.tipoFecha
                    + '&dateFrom=' + searchParams.dateFrom
                    + '&dateTo=' + searchParams.dateTo
                    + '&source=' + searchParams.source);
        }
        if (!boxA2735.hidden) {
            global.getFile(prototype.url + '/GetXLSA2735?FECHA=' + params.FECHA
                    + '&IN_ERROR=' + params.IN_ERROR);
        }

        if (!boxMainA1690.hidden) {
            global.getFile(prototype.url + '/GetXLSXMain1690?tipoFecha=' + searchParams.tipoFecha
                    + '&dateFrom=' + searchParams.dateFrom
                    + '&dateTo=' + searchParams.dateTo
                    + '&source=' + searchParams.source);
        }

        if (!boxA1690.hidden) {
            global.getFile(prototype.url + '/GetXLSXA1690?FECHA=' + params.FECHA);
        }

    }
    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    btnBack_click: function() {
        var boxMainA1686 = Ext.getCmp(prototype.id + '-gridDataMainA1686');
        var boxMainA1686IDEC = Ext.getCmp(prototype.id + '-gridDataMainA1686IDEC');
        var boxMainA1690 = Ext.getCmp(prototype.id + '-gridMainDataOCR');
        var boxMainEMDDelta = Ext.getCmp(prototype.id + '-gridDataMainEMDDelta');

        var boxA1686Formateados = Ext.getCmp(prototype.id + '-gridDataA1686Formateados');
        var boxA1686ProcDateData = Ext.getCmp(prototype.id + '-panelGridProcDateData');
        var boxA1696Errores = Ext.getCmp(prototype.id + '-gridDataA1696Errores');
        var boxErrorVCRJ = Ext.getCmp(prototype.id + '-gridDataErrorVCRJ');
        var boxA1690 = Ext.getCmp(prototype.id + '-panelGridDataA1690');
        var boxA2735 = Ext.getCmp(prototype.id + '-gridDataA2735');
//        var boxLogA1910 = Ext.getCmp(prototype.id + '-gridDataLOG');

        var boxA1687 = Ext.getCmp(prototype.id + '-panelGridDataA1687');
        var boxA1688 = Ext.getCmp(prototype.id + '-panelGridDataA1688');
        var boxA1689 = Ext.getCmp(prototype.id + '-panelGridDataA1689');
        var boxA1413 = Ext.getCmp(prototype.id + '-panelGridDataA1413');
        var boxA1419 = Ext.getCmp(prototype.id + '-panelGridDataA1419');

        Ext.getCmp(prototype.id + '-pie').hide();

        if (!boxA1686Formateados.hidden) {
            this.hideAllGrid();
            boxMainA1686.show();
            return;
        }
        if (!boxA1686ProcDateData.hidden) {

            this.hideAllGrid();
            boxMainA1686.show();
            return;
        }
        if (!boxA1696Errores.hidden) {

            this.hideAllGrid();
            boxA1686Formateados.show();
            return;
        }
        
        if (!boxErrorVCRJ.hidden) {

            this.hideAllGrid();
            boxA1686Formateados.show();
            return;
        }

        if (!boxA1687.hidden) {

            this.hideAllGrid();
            boxA1686ProcDateData.show();
            return;
        }
        if (!boxA1688.hidden) {

            this.hideAllGrid();
            boxA1686ProcDateData.show();
            return;
        }
        if (!boxA1689.hidden) {

            this.hideAllGrid();
            boxA1686ProcDateData.show();
            return;
        }
        if (!boxA1413.hidden) {

            this.hideAllGrid();
            boxA1686ProcDateData.show();
            return;
        }
        if (!boxA1419.hidden) {

            this.hideAllGrid();
            boxA1686ProcDateData.show();
            return;
        }
        if (!boxA1690.hidden) {

            this.hideAllGrid();
            boxMainA1690.show();
            return;
        }
        if (!boxA2735.hidden) {

            this.hideAllGrid();
            boxMainEMDDelta.show();
            return;
        }
//        if (!boxLogA1910.hidden) {
//
//            this.hideAllGrid();
//            boxMainA1686.show();
//            return;
//        }

    },
    hideAllGrid: function() {

        Ext.getCmp(prototype.id + '-gridDataMainA1686').hide();
        Ext.getCmp(prototype.id + '-gridDataMainA1686IDEC').hide();
        Ext.getCmp(prototype.id + '-gridMainDataOCR').hide();
        Ext.getCmp(prototype.id + '-gridDataA1686Formateados').hide();
        Ext.getCmp(prototype.id + '-panelGridProcDateData').hide();
        Ext.getCmp(prototype.id + '-gridDataErrorVCRJ').hide();
        Ext.getCmp(prototype.id + '-gridDataA1696Errores').hide();
        Ext.getCmp(prototype.id + '-panelGridDataA1687').hide();
        Ext.getCmp(prototype.id + '-panelGridDataA1688').hide();
        Ext.getCmp(prototype.id + '-panelGridDataA1689').hide();
        Ext.getCmp(prototype.id + '-panelGridDataA1413').hide();
        Ext.getCmp(prototype.id + '-panelGridDataA1419').hide();
        Ext.getCmp(prototype.id + '-gridMainDataOCR').hide();
        Ext.getCmp(prototype.id + '-panelGridDataA1690').hide();
        Ext.getCmp(prototype.id + '-gridDataMainEMDDelta').hide();
        Ext.getCmp(prototype.id + '-gridDataA2735').hide();
        Ext.getCmp(prototype.id + '-gridDataLOG').hide();

    }
    ,
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();

    },
    pagLast: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    },
    
    ChangechkLOG: function(checkboxfield, newValue, oldValue, eOpts) {
        
        if(newValue){
            Ext.getCmp(prototype.id + '-cmbPrograma').show();
            this.obtainDataCombo();
        }else{
            Ext.getCmp(prototype.id + '-cmbPrograma').hide();
            this.btnSearch_click();
        }
        
    },
    
    obtainDataCombo: function(){
        
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');


        if (dayFrom.getValue() === null || dayFrom.getValue() === '') {
            dayFrom.setValue('');
            dayTo.setValue('');
        } else {
            if (dayTo.getValue() === null || dayTo.getValue() === '') {
                dayTo.setValue(31);
            }
        }
        
        me.bean = {}
        me.bean.IN_FECHA_FROM = yearFrom.getValue() + monthFrom.getValue() + dayFrom.getValue();
        me.bean.IN_FECHA_TO = yearTo.getValue() + monthTo.getValue() + dayTo.getValue();
        
        var programas = new Array()
        Ext.Ajax.request({
            url: prototype.url + '/obtainDataCombo',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(me.bean)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    
                    var lstProgramas = res.lstProgramas;
                    programas.push({FUENTE: 'All'});
                    
                    lstProgramas.forEach(function callback(currentValue, index, array) {
                        programas.push({FUENTE : currentValue.FUENTE});
                    });
                    
                    var storeData = Ext.create('Ext.data.Store', {
                        data: programas,
                        autoLoad: true,
                        fields: ['code', 'name']
                    });

                    Ext.getCmp(prototype.id + '-cmbPrograma').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-cmbPrograma').setValue('All');
                    
                } else {
                    global.Msg({msg: res.sesion});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
        
        this.btnSearch_click();
        
    }
    
    
});
