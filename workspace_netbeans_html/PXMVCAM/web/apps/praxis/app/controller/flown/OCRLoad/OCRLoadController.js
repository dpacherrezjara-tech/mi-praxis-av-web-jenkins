Ext.define('Ext.Praxis.controller.flown.OCRLoad.OCRLoadController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.OCRLoadController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    fecha: new Date(),
    fyear: '', fmonth: '', fday: '',
    tyear: '', tmonth: '', tday: '',
    searchParams: {},
    me:'',
    _path: '',
     setContext: function() {
        me = this;
    },
    // </editor-fold>
    init: function(view) {
        prototype.id = 'OCRLoadForm';
        prototype.url = CONTEXTPATH + '/OCRLoad';
        prototype.widthContenedor = 1000;
        prototype.widthGrid = 659;
        var me = this;
        this.control({
            '#OCRLoadForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#OCRLoadForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#OCRLoadForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            }
        });
    },
    afterRender: function () {
        this.cargarComboBoxes();
        this.setStoreData();
        this.btnClear_click();
        this.btnSearch_click();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear;
        if (obj.getValue()!=='') {
            storeComboDataYear = win.getStoreYear2(false, obj.getValue());

            comboToYear.bindStore(storeComboDataYear);
            comboToYear.setValue(obj.getValue());
        } else {
            storeComboDataYear = win.getStoreYear(true);
            
            comboToYear.bindStore(storeComboDataYear);
            comboToYear.setValue('');
        }
    },
    selectComboFromMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');

        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() > comboToMonth.getValue()) {
                comboToMonth.setValue(obj.getValue());
            }
        }
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
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(true);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        var storeComboDataDay = win.getStoreDays(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);
    },
    // </editor-fold>
    cargarComboBoxes: function() {
        var ciudades = new Array();
//        var paises = new Array();
        var store;
        Ext.Ajax.request({
            url: prototype.url + '/obtainDataCombo',
            method: 'POST',
            timeout: 60000000,
            autoLoad: true,
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                var lstCiudades = res.lstCiudades;
//                var lstPaises = res.lstPaises;
                
                lstCiudades.forEach(function callback(currentValue, index, array) {
                    ciudades.push([currentValue.A1007CTATO, currentValue.A1007NOMBR]);
                });
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'ciudades1', autoLoad: true, data: ciudades, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id + '-cmbCDEPART').bindStore(store);
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'ciudades2', autoLoad: true, data: ciudades, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id + '-cmbCARRIVA').bindStore(store);
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    
    // <editor-fold defaultstate="collapsed" desc="Info">
    onEditClick: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        
        this.winDataEntry('U', rec, store, rowIndex);
    },
    winDataEntry: function(action, rec, store, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.flown.OCRLoadForm.DataEntry', {
            id: 'DataEntryOCRLoadForm',
            params: {
                action: action,
                rec: rec,
                store: store,
                rowIndex: rowIndex
            }
        }).show();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        var msg = this.validarFecha();
        if (msg === '') {
            var txtTKT = Ext.getCmp(prototype.id + '-txtTKT').getValue();
            if (txtTKT !== '') {
                if (txtTKT.length === 13) {
                    this.setFormatParameter(txtTKT);
                    this.setGridData("searchTKT");
                } else {
                    global.Msg({
                        msg: "Ticket number must contain 13 digits."
                    });
                    this.setEnable(true);
                    Ext.getCmp(prototype.id + '-txtTKT').setValue("");
                    Ext.getCmp(prototype.id + '-txtTKT').focus();
                }
            } else {
                this.setFormatParameter("");
                this.setGridData("search");
            }
        } else {
            global.Msg({
                msg: msg
            });
        }
    },
    setEnable: function(b) {
        if (b) {
            Ext.getCmp(prototype.id + '-cmbDateFromYear').enable(true);
            Ext.getCmp(prototype.id + '-cmbDateFromMonth').enable(true);
            Ext.getCmp(prototype.id + '-cmbDateFromDay').enable(true);
            Ext.getCmp(prototype.id + '-cmbDateToYear').enable(true);
            Ext.getCmp(prototype.id + '-cmbDateToMonth').enable(true);
            Ext.getCmp(prototype.id + '-cmbDateToDay').enable(true);

            Ext.getCmp(prototype.id + '-txtFlight').enable(true);
            Ext.getCmp(prototype.id + '-cmbCDEPART').enable(true);
            Ext.getCmp(prototype.id + '-cmbCARRIVA').enable(true);
        } else {
            Ext.getCmp(prototype.id + '-cmbDateFromYear').disable(true);
            Ext.getCmp(prototype.id + '-cmbDateFromMonth').disable(true);
            Ext.getCmp(prototype.id + '-cmbDateFromDay').disable(true);
            Ext.getCmp(prototype.id + '-cmbDateToYear').disable(true);
            Ext.getCmp(prototype.id + '-cmbDateToMonth').disable(true);
            Ext.getCmp(prototype.id + '-cmbDateToDay').disable(true);

            Ext.getCmp(prototype.id + '-txtFlight').disable(true);
            Ext.getCmp(prototype.id + '-cmbCDEPART').disable(true);
            Ext.getCmp(prototype.id + '-cmbCARRIVA').disable(true);
        }
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) option.setVisible(false);
        else option.setVisible(true);
    },
    btnDisplay_click: function() {
        global.Msg({
            msg: 'Option not available.'
        });
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
        this.setEnable(true);
        // <editor-fold defaultstate="collapsed" desc="Clear Combo Date">
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");
//        var mes = new Date().getMonth()+1;
//        if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(new Date().getFullYear());
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
        Ext.getCmp(prototype.id + '-cmbCDEPART').setValue("");
        Ext.getCmp(prototype.id + '-cmbCARRIVA').setValue("");
        Ext.getCmp(prototype.id + '-txtFlight').setValue("");
        Ext.getCmp(prototype.id + '-txtTKT').setValue("");
        // </editor-fold>
        Ext.getCmp(prototype.id + '-txtTKT').focus();
        
        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id + '-gridDetTkt').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridTicket').getStore().removeAll();
        Ext.getCmp(prototype.id + '-lbl-currentPage').setText("0");
        Ext.getCmp(prototype.id + '-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id + '-lbl-total').setText("0");
        Ext.getCmp(prototype.id + '-lbl-currentPage2').setText("0");
        Ext.getCmp(prototype.id + '-lbl-pageCount2').setText("0");
        Ext.getCmp(prototype.id + '-lbl-total2').setText("0");
        // </editor-fold>
        
    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    btnBack_click: function() {
        var heightMenu = 400;
        Ext.getCmp('App-main-region-content-north').setHeight(heightMenu);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options Usos">
    setFormatParameter: function(beanTKT) {
        var cmbCDEPART = Ext.getCmp(prototype.id + '-cmbCDEPART').getValue();
        var cmbCARRIVA = Ext.getCmp(prototype.id + '-cmbCARRIVA').getValue();
        var txtFlight = Ext.getCmp(prototype.id + '-txtFlight').getValue();
        
        if (beanTKT === '') {
            searchParams = {
                yearFrom: fyear,
                monthFrom: fmonth,
                dayFrom: fday,
                yearTo: tyear,
                monthTo: tmonth,
                dayTo: tday,
                CDEPART: cmbCDEPART,
                CARRIVA: cmbCARRIVA,
                NFLIGHT: txtFlight
            };
            _path = prototype.url + '/getXLSX?' +
                'yearFrom=' + searchParams.yearFrom + '&' +
                'monthFrom=' + searchParams.monthFrom + '&' +
                'dayFrom=' + searchParams.dayFrom + '&' +
                'yearTo=' + searchParams.yearTo + '&' +
                'monthTo=' + searchParams.monthTo + '&' +
                'dayTo=' + searchParams.dayTo + '&' +
                'NFLIGHT=' + searchParams.NFLIGHT + '&' +
                'CDEPART=' + searchParams.CDEPART + '&' +
                'CARRIVA=' + searchParams.CARRIVA;
        } else {
            searchParams = {
                IN_TKT: beanTKT
            };
            _path = prototype.url + '/getXLSX?' +
                'IN_TKT=' + searchParams.IN_TKT;
        }
    },
    setGridData: function(value) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.OCRLoad.GridData', {
            proxy: {
                url: prototype.url + '/' + value
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');
                    
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    
                    Ext.getCmp(prototype.id + '-lbl-currentPage2').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount2').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total2').setText(total);
                    
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    } else {
                        if (value === "searchTKT") {
                            Ext.getCmp(prototype.id + '-cmbDateFromYear').disable(true);
                            Ext.getCmp(prototype.id + '-cmbDateFromMonth').disable(true);
                            Ext.getCmp(prototype.id + '-cmbDateFromDay').disable(true);
                            Ext.getCmp(prototype.id + '-cmbDateToYear').disable(true);
                            Ext.getCmp(prototype.id + '-cmbDateToMonth').disable(true);
                            Ext.getCmp(prototype.id + '-cmbDateToDay').disable(true);
                            
                            Ext.getCmp(prototype.id + '-txtFlight').disable(true);
                            Ext.getCmp(prototype.id + '-cmbCDEPART').disable(true);
                            Ext.getCmp(prototype.id + '-cmbCARRIVA').disable(true);
                        }
                    }
                }
            }
        });
        if (value === 'searchTKT') {
            Ext.getCmp(prototype.id + '-boxDetTicket').hide();
            Ext.getCmp(prototype.id + '-boxTKT').show();
            Ext.getCmp(prototype.id + '-gridTicket').bindStore(storeGridDatas);
        } else if (value === 'search') {
            Ext.getCmp(prototype.id + '-boxDetTicket').show();
            Ext.getCmp(prototype.id + '-boxTKT').hide();
            Ext.getCmp(prototype.id + '-gridDetTkt').bindStore(storeGridDatas);
        }
        
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    exportExcel: function() {
        global.getFile(_path);
    },
    // <editor-fold defaultstate="collapsed" desc="validarFecha: function()">
    validarFecha: function() {
        var msg = '';
        
        fyear = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        fmonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        fday = Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        
        tyear = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        tmonth = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        tday = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        
        if(fyear === 'null' || tyear === 'null' || fmonth === 'null' || tmonth === 'null' || fday === 'null' || tday === 'null'){
            msg = 'Date Error. Please call our System Apartment.';
        }else{
            if(fyear !== '' && fmonth === '') {
                if((tyear === '' && tmonth !== '') || (tyear !== '' && tmonth !== '')) {
                    msg = 'The ranges of the Invoice Date should be the same. Example: \n From: Y2006 To: Y2007 (Correct) \n From: Y2006M04 To: Y2007M01 (Correct) \n From: Y2006 To: Y2007M01 (Incorrect) \n From: M06 To: Y2007 (Incorrect) \n From: Y2007M06 To: Y2007M06D15 (Incorrect)';
                }            
            }
            if(fyear === '' && fmonth !== '') {
                if((tyear !== '' && tmonth === '') || (tyear !== '' && tmonth !== '')) {
                        msg = 'The ranges of the Invoice Date should be the same. Example: \n From: Y2006 To: Y2007 (Correct) \n From: Y2006M04 To: Y2007M01 (Correct) \n From: Y2006 To: Y2007M01 (Incorrect) \n From: M06 To: Y2007 (Incorrect)\n From: Y2007M06 To: Y2007M06D15 (Incorrect)';
                }            
            }    

            if(fyear !== '' && fmonth !== '') {
                if((tyear !== '' && tmonth === '') || (tyear === '' && tmonth !== '')) {
                    msg = 'The ranges of the Invoice Date should be the same. Example: \n From: Y2006 To: Y2007 (Correct) \n From: Y2006M04 To: Y2007M01 (Correct) \n From: Y2006 To: Y2007M01 (Incorrect) \n From: M06 To: Y2007 (Incorrect) \n From: Y2007M06 To: Y2007M06D15 (Incorrect)';
                }            
            }

            if(fmonth !== '' && fday === '') {
                if((tmonth === '' && tday !== '') || (tmonth !== '' && tday !== '')) {
                    msg = 'The ranges of the Invoice Date should be the same. Example: \n From: Y2006 To: Y2007 (Correct) \n From: Y2006M04 To: Y2007M01 (Correct) \n From: Y2006 To: Y2007M01 (Incorrect) \n From: M06 To: Y2007 (Incorrect) \n From: Y2007M06 To: Y2007M06D15 (Incorrect)';
                }            
            }
            if(fmonth === '' && fday !== '') {
                if((tmonth !== '' && tday === '') || (tmonth !== '' && tday !== '')) {
                    msg = 'The ranges of the Invoice Date should be the same. Example: \n From: Y2006 To: Y2007 (Correct) \n From: Y2006M04 To: Y2007M01 (Correct) \n From: Y2006 To: Y2007M01 (Incorrect) \n From: M06 To: Y2007 (Incorrect) \n From: Y2007M06 To: Y2007M06D15 (Incorrect)';
                }            
            }

            if(fmonth !== '' && fday !== '') {
                if((tmonth !== '' && tday === '') || (tmonth === '' && tday !== '')) {
                    msg = 'The ranges of the Invoice Date should be the same. Example: \n From: Y2006 To: Y2007 (Correct) \n From: Y2006M04 To: Y2007M01 (Correct) \n From: Y2006 To: Y2007M01 (Incorrect) \n From: M06 To: Y2007 (Incorrect) \n From: Y2007M06 To: Y2007M06D15 (Incorrect)';
                }            
            } 

            if(fday !== '' && tday !== '') {
                if(fmonth === '' || tmonth === '' ) {
                    msg = 'You must choose a month.';
                }else {
                    if(fyear === tyear && fmonth === tmonth && tday < fday){
                        msg = 'The Day To must be greater than Day From.';
                    }
                }
            }

            if(fyear !== '' && tyear !== '') {
                if(tyear < fyear){
                    msg = 'The Year To must be greater than Year From.';
                }
            }

            if(fmonth !== '' && tmonth !== '') {
                if(fyear === tyear && tmonth < fmonth) {
                    msg = 'The Month To must be greater than Month From.';
                }
            }
        }
        return msg;
    },
    // </editor-fold>
    // </editor-fold>
    
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
    
    onValidarChange: function () {
        var list = Ext.getCmp(prototype.id + '-txtTKT').getValue().replace(/\s/g, "").split("");
        var txtTKT = '';
        for (var i = 0; i < list.length; i++) {
            if (this.esNumero(list[i])) {
                txtTKT += list[i];
            }
        }
        Ext.getCmp(prototype.id + '-txtTKT').setValue(txtTKT.substring(0, 13));
    },
    esNumero: function(valor) {
        return valor.toLowerCase() === valor.toUpperCase();
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        Ext.getCmp(prototype.id + '-paggin').moveFirst();
    },
    pagPrevious: function(obj, e) {
        Ext.getCmp(prototype.id + '-paggin').movePrevious();
    },
    pagNext: function(obj, e) {
        Ext.getCmp(prototype.id + '-paggin').moveNext();
    },
    pagLast: function(obj, e) {
        Ext.getCmp(prototype.id + '-paggin').moveLast();
    }
    // </editor-fold>
});
