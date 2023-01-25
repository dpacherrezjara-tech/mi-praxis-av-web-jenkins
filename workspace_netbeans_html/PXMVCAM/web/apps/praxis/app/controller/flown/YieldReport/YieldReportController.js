Ext.define('Ext.Praxis.controller.flown.YieldReport.YieldReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.YieldReportController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    fecha: new Date(),
    searchParams: {},
    _path: '',
    me: '',
    _pathDetail: '',
    // </editor-fold>
    setContext: function() {
        me = this;
    },
    init: function(view) {
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'YieldReportForm';
        prototype.url = CONTEXTPATH + '/YieldReport';
        prototype.widthContenedor = 1400;
        prototype.widthGrid = 930;
        prototype.widthGridDetail = 1380;
        // </editor-fold>
        win.lblUser_toolTip("Estructura: A1784");
        this.control({
        });
    },
    afterRender: function() {
        this.cargarComboBoxes();
        this.setStoreData();
        this.btnClear_click();
        this.btnSearch_click();
    },
    cargarComboBoxes: function() {
        var ciudades = new Array();
//        var paises = new Array();
        var store;
        Ext.Ajax.request({
            url: prototype.url + '/obtainDataCombo',
            method: 'POST',
            timeout: 60000000,
            autoLoad: true,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstCiudades = res.lstCiudades;
//                var lstPaises = res.lstPaises;

                lstCiudades.forEach(function callback(currentValue, index, array) {
                    ciudades.push([currentValue.A1007CTATO, currentValue.A1007NOMBR]);
                });
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'ciudades', autoLoad: true, data: ciudades, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id + '-cmbCDEPART').bindStore(store);
                Ext.getCmp(prototype.id + '-cmbCARRIVA').bindStore(store);
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    onFromYearChange: function(combo, newValue, oldValue, eOpts) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        if (newValue !== '') {
            if (newValue > comboToYear.getValue()) {
                comboToYear.setValue(newValue);
            }
            if (this.getValue("cmbDateFromMonth") === '02') {
                var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay');
                var store = win.getStoreDays2(true, newValue, 1);
                comboFromDay.bindStore(store);
                comboFromDay.setValue('');
            }
        } else {
            comboToYear.setValue(newValue);
            comboToMonth.setValue(newValue);
        }
    },
    onToYearChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        if (newValue !== '') {
            if (comboFromYear.getValue() !== '') {
                if (newValue < comboFromYear.getValue()) {
                    comboFromYear.setValue(newValue);
                }
            } else
                comboFromYear.setValue(newValue);
            if (this.getValue("cmbDateToMonth") === '02') {
                var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
                var store = win.getStoreDays2(true, newValue, 1);
                comboToDay.bindStore(store);
                comboToDay.setValue('');
            }
        } else {
            comboFromYear.setValue(newValue);
        }
    },
    onFromMonthChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        if (newValue !== '') {
            var store = win.getStoreDays2(true, this.getValue("cmbDateFromYear"), Number(newValue) - 1);
            comboFromDay.bindStore(store);
            comboFromDay.setValue('');

            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) {
                if (newValue > comboToMonth.getValue()) {
                    comboToMonth.setValue(newValue);
                }
            }
        } else {
            comboToMonth.setValue(newValue);
            comboFromDay.setValue(newValue);
        }
    },
    onToMonthChange: function(combo, newValue, oldValue, eOpts) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (newValue !== '') {
            var store = win.getStoreDays2(true, this.getValue("cmbDateToYear"), Number(newValue) - 1);
            comboToDay.bindStore(store);
            comboToDay.setValue('');

            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) {
                if (comboFromMonth.getValue() !== '') {
                    if (newValue < comboFromMonth.getValue()) {
                        comboFromMonth.setValue(newValue);
                    }
                } else
                    comboFromMonth.setValue(newValue);
            }
        } else {
            comboFromMonth.setValue(newValue);
            comboToDay.setValue(newValue);
        }
    },
    onFromDayChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        if (newValue !== '') {
            if (comboFromMonth.getValue() === '') {
                comboFromMonth.setValue("01");
                comboFromDay.setValue(newValue);
            }
        } else {
            comboToDay.setValue(newValue);
        }
    },
    onToDayChange: function(combo, newValue, oldValue, eOpts) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        if (newValue !== '') {
            if (comboToMonth.getValue() === '') {
                comboToMonth.setValue("01");
                comboToDay.setValue(newValue);
            }
        } else {
            comboFromDay.setValue(newValue);
        }
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(true);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        var days = new Array();
        days.push(['', 'All']);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(
                Ext.create('Ext.data.ArrayStore', {
                    autoLoad: true,
                    data: days,
                    fields: ['code', 'name']
                })
                );
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(
                Ext.create('Ext.data.ArrayStore', {
                    autoLoad: true,
                    data: days,
                    fields: ['code', 'name']
                })
                );
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Info">
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    onViewDetailClick: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.setFormatParameterDetail(data);
        Ext.getCmp(prototype.id + '-boxSummary').hide();
        Ext.getCmp(prototype.id + '-boxDetail').show();
        this.setGridDataSearchDetail();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridDataSearch();
        Ext.getCmp(prototype.id + '-boxDetail').hide();
        Ext.getCmp(prototype.id + '-boxSummary').show();
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.setVisible(false);
        else
            option.setVisible(true);
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
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("04");
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(new Date().getFullYear());

        Ext.getCmp(prototype.id + '-cmbCDEPART').setValue("");
        Ext.getCmp(prototype.id + '-cmbCARRIVA').setValue("");
        Ext.getCmp(prototype.id + '-txtFlight').setValue("");

        Ext.getCmp(prototype.id + '-gridSummary').getStore().removeAll();
        Ext.getCmp(prototype.id + '-lbl-currentPage').setText("1");
        Ext.getCmp(prototype.id + '-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id + '-lbl-total').setText("0");

        Ext.getCmp(prototype.id + '-gridDetail').getStore().removeAll();
        Ext.getCmp(prototype.id + '-lbl-currentPage2').setText("1");
        Ext.getCmp(prototype.id + '-lbl-pageCount2').setText("0");
        Ext.getCmp(prototype.id + '-lbl-total2').setText("0");

        Ext.getCmp(prototype.id + '-boxDetail').hide();
        Ext.getCmp(prototype.id + '-boxSummary').show();
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id + '-boxSummary').isVisible()) {
            var heightMenu = 400;
            Ext.getCmp('App-main-region-content-north').setHeight(heightMenu);
        } else if (Ext.getCmp(prototype.id + '-boxDetail').isVisible()) {
            Ext.getCmp(prototype.id + '-boxDetail').hide();
            Ext.getCmp(prototype.id + '-boxSummary').show();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameterDetail: function(data) {
        searchParams = {};

        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var fyear = data.IN_FECHA_FROM.substring(0, 4) === null ? '' : data.IN_FECHA_FROM.substring(0, 4);
        var fmonth = data.IN_FECHA_FROM.substring(4, 6) === null ? '' : data.IN_FECHA_FROM.substring(4, 6);
        var fday = data.IN_FECHA_FROM.substring(6, 8) === null ? '' : data.IN_FECHA_FROM.substring(6, 8);

        var tyear = data.IN_FECHA_TO.substring(0, 4) === null ? '' : data.IN_FECHA_TO.substring(0, 4);
        var tmonth = data.IN_FECHA_TO.substring(4, 6) === null ? '' : data.IN_FECHA_TO.substring(4, 6);
        var tday = data.IN_FECHA_TO.substring(6, 8) === null ? '' : data.IN_FECHA_TO.substring(6, 8);
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
        var cmbCDEPART = this.getValue("cmbCDEPART");
        var cmbCARRIVA = this.getValue("cmbCARRIVA");
        var NFLIGHT = this.getValue("txtFlight");
        var cmbStatus = this.getValue("cmbStatus");
        var cmbCountry = this.getValue("cmbCountry");

        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        var fyear = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        var fmonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        var fday = Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        var tyear = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        var tmonth = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        var tday = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        // </editor-fold>
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            IN_FECHA_FROM: fyear + fmonth + fday,
            IN_FECHA_TO: tyear + tmonth + tday,
            NFLIGHT: NFLIGHT,
            STVAL: cmbStatus,
            PSVVTA: cmbCountry,
            CDEPART: cmbCDEPART,
            CARRIVA: cmbCARRIVA
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
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.YieldReport.GridData', {
            proxy: {
                url: prototype.url + '/search'
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
        Ext.getCmp(prototype.id + '-gridSummary').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataSearchDetail: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.YieldReport.GridDataDetail', {
            proxy: {
                url: prototype.url + '/showDetail'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage2').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount2').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total2').setText(total);

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    // </editor-fold>
    exportExcel: function() {
        if (Ext.getCmp(prototype.id + '-boxSummary').isVisible()) {
            global.getFile(_path);
        } else if (Ext.getCmp(prototype.id + '-boxDetail').isVisible()) {
            global.getFile(_pathDetail);
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Filters Usos">
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxSummary').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        } else if (Ext.getCmp(prototype.id + '-boxDetail').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin2').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxSummary').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        } else if (Ext.getCmp(prototype.id + '-boxDetail').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin2').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxSummary').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        } else if (Ext.getCmp(prototype.id + '-boxDetail').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin2').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxSummary').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        } else if (Ext.getCmp(prototype.id + '-boxDetail').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin2').moveLast();
        }
    },
    // </editor-fold>

    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    }
});
