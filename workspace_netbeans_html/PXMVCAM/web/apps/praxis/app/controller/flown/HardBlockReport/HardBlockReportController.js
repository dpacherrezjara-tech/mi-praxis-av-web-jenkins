Ext.define('Ext.Praxis.controller.flown.HardBlockReport.HardBlockReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HardBlockReportController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    fecha: new Date(),
    me: '',
    setContext: function() {
        me = this;
    },
    searchParams: {},
//    _path: '',
//    _pathDetail: '',
//    _pathDetailByDay: '',
//    _pathDetailBytkt: '',
    // </editor-fold>
    init: function(view) {
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'HardBlockReportForm';
        prototype.url = CONTEXTPATH + '/HardBlockReport';
        prototype.widthContenedor = 1400;
        prototype.widthGrid = 800;
        prototype.widthGridDetail = 1160;
        prototype.widthGridDetailNflight = 1120;
        prototype.widthGridDetailTKT = 1370;
        // </editor-fold>
        win.lblUser_toolTip("Estructura: A1782");
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
        var aerolineas = new Array();
        var store;
        Ext.Ajax.request({
            url: prototype.url + '/obtainDataFilter',
            method: 'POST',
            timeout: 60000000,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstAerolineas = res.lstAerolineas;
                    aerolineas.push(['', 'All']);
                    lstAerolineas.forEach(function callback(currentValue, index, array) {
                        aerolineas.push([array[index].A005KEY, array[index].A005KEY + ' - ' + array[index].A005KEY2]);
                    });
                    store = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'aerolineas', autoLoad: true, data: aerolineas, fields: ['code', 'name']
                    });
                    Ext.getCmp(prototype.id + '-cmbAerolinea').bindStore(store);
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
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
        var storeComboDataYear = win.getStoreYear(false);
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
    onViewDetailPAXClick: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.setFormatParameterDetail(data);
        Ext.getCmp(prototype.id + '-boxMainData').hide();
        Ext.getCmp(prototype.id + '-boxDetailData').show();
        this.setGridDataDetail();
    },
    onViewDetailByDayClick: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.setFormatParameterDetailByDay(data);
        Ext.getCmp(prototype.id + '-boxDetailData').hide();
        Ext.getCmp(prototype.id + '-boxDetailNflightData').show();
        this.setGridDataDetailByDay();
    },
    onViewDetailBytktClick: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.setFormatParameterDetailBytkt(data);
        Ext.getCmp(prototype.id + '-boxDetailNflightData').hide();
        Ext.getCmp(prototype.id + '-boxDetailTKTData').show();
        this.setGridDataDetailBytkt();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-boxSearchFilter');
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
        this.setValue("cmbRevenue", "");
        this.setValue("cmbAerolinea", "");
        // </editor-fold>
//        this.focus("txtTKT");

        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDetailData').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDetailNFData').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDetailTKTData').getStore().removeAll();
//        Ext.getCmp(prototype.id+'-lbl-currentPage').setText("1");
//        Ext.getCmp(prototype.id+'-lbl-pageCount').setText("0");
//        Ext.getCmp(prototype.id+'-lbl-total').setText("0");
        // </editor-fold>
        Ext.getCmp(prototype.id + '-boxDetailTKTData').hide();
        Ext.getCmp(prototype.id + '-boxDetailNflightData').hide();
        Ext.getCmp(prototype.id + '-boxDetailData').hide();
        Ext.getCmp(prototype.id + '-boxMainData').show();
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            global.showMenu();
        } else if (Ext.getCmp(prototype.id + '-boxDetailData').isVisible()) {
            Ext.getCmp(prototype.id + '-boxDetailData').hide();
            Ext.getCmp(prototype.id + '-boxMainData').show();
        } else if (Ext.getCmp(prototype.id + '-boxDetailNflightData').isVisible()) {
            Ext.getCmp(prototype.id + '-boxDetailNflightData').hide();
            Ext.getCmp(prototype.id + '-boxDetailData').show();
        } else if (Ext.getCmp(prototype.id + '-boxDetailTKTData').isVisible()) {
            Ext.getCmp(prototype.id + '-boxDetailTKTData').hide();
            Ext.getCmp(prototype.id + '-boxDetailNflightData').show();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function() {
        searchParams = {};
        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        var fyear = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        var fmonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        var fday = Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        var tyear = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        var tmonth = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        var tday = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        // </editor-fold>

        var cmbAerolinea = this.getValue("cmbAerolinea");
        var cmbRevenue = this.getValue("cmbRevenue");

        searchParams = {
            IN_FECHA_FROM: fyear + fmonth + fday,
            IN_FECHA_TO: tyear + tmonth + tday,
            IN_HB_CIA: cmbAerolinea,
            IN_REV_TYPE: cmbRevenue
        };

//        _path = prototype.url+'/getXLSX?' +
//                'IN_FECHA_FROM='+searchParams.IN_FECHA_FROM+'&' +
//                'IN_FECHA_TO='+searchParams.IN_FECHA_TO+'&' +
//                'IN_HB_CIA='+searchParams.IN_HB_CIA+'&' +
//                'IN_REV_TYPE='+searchParams.IN_REV_TYPE;
    },
    setFormatParameterDetail: function(data) {
        searchParams = {};

        searchParams = {
            PERIOD: data.PERIOD,
            REVFLAG: data.REVFLAG,
            CIAHB: data.CIAHB
        };

//        _pathDetail = prototype.url + '/getXLSXDetail?' +
//                'DFLIGHT=' + searchParams.DFLIGHT + '&' +
//                'IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM + '&' +
//                'IN_FECHA_TO=' + searchParams.IN_FECHA_TO + '&' +
//                'NFLIGHT=' + searchParams.NFLIGHT + '&' +
//                'CARRIER=' + searchParams.CARRIER + '&' +
//                'ORIG=' + searchParams.ORIG + '&' +
//                'DEST=' + searchParams.DEST;
    },
    setFormatParameterDetailByDay: function(data) {
        searchParams = {};

        searchParams = {
            PERIOD: data.PERIOD,
            ORIG: data.ORIG,
            DEST: data.DEST,
            CIAHB: data.CIAHB
        };

//        _pathDetailByDay = prototype.url + '/getXLSXDetailByDay?' +
//                'DFLIGHT=' + searchParams.DFLIGHT + '&' +
//                'IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM + '&' +
//                'IN_FECHA_TO=' + searchParams.IN_FECHA_TO + '&' +
//                'NFLIGHT=' + searchParams.NFLIGHT + '&' +
//                'CARRIER=' + searchParams.CARRIER + '&' +
//                'ORIG=' + searchParams.ORIG + '&' +
//                'DEST=' + searchParams.DEST;
    },
    setFormatParameterDetailBytkt: function(data) {
        searchParams = {};

        searchParams = {
            PERIOD: data.PERIOD,
            ORIG: data.ORIG,
            DEST: data.DEST,
            CIAHB: data.CIAHB,
            NFLIGHT: data.NFLIGHT
        };

//        _pathDetailBytkt = prototype.url + '/getXLSXDetailBytkt?' +
//                'DFLIGHT=' + searchParams.DFLIGHT + '&' +
//                'IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM + '&' +
//                'IN_FECHA_TO=' + searchParams.IN_FECHA_TO + '&' +
//                'NFLIGHT=' + searchParams.NFLIGHT + '&' +
//                'CARRIER=' + searchParams.CARRIER + '&' +
//                'ORIG=' + searchParams.ORIG + '&' +
//                'DEST=' + searchParams.DEST;
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.HardBlockReport.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
    },
    setGridDataDetail: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.HardBlockReport.GridDataDetail', {
            proxy: {
                url: prototype.url + '/searchDetail'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetailData').bindStore(storeGridDatas);
    },
    setGridDataDetailByDay: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.HardBlockReport.GridDataDetailByDay', {
            proxy: {
                url: prototype.url + '/searchDetailNflight'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetailNFData').bindStore(storeGridDatas);
    },
    setGridDataDetailBytkt: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.HardBlockReport.GridDataDetailByTkt', {
            proxy: {
                url: prototype.url + '/searchDetailTKT'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetailTKTData').bindStore(storeGridDatas);
    },
    // </editor-fold>

    exportExcel: function() {
//        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
//            global.getFile(_path);
//        } else if (Ext.getCmp(prototype.id+'-boxDetailData').isVisible()) {
//            global.getFile(_pathDetail);
//        } else if (Ext.getCmp(prototype.id+'-boxDetailNflightData').isVisible()) {
//            global.getFile(_pathDetailByDay);
//        } else if (Ext.getCmp(prototype.id+'-boxDetailTKTData').isVisible()) {
//            global.getFile(_pathDetailBytkt);
//        }
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
//    pagFirst: function(obj, e) {
//        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
//            Ext.getCmp(prototype.id+'-paggin').moveFirst();
//        }
//    },
//    pagPrevious: function(obj, e) {
//        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
//            Ext.getCmp(prototype.id+'-paggin').movePrevious();
//        }
//    },
//    pagNext: function(obj, e) {
//        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
//            Ext.getCmp(prototype.id+'-paggin').moveNext();
//        }
//    },
//    pagLast: function(obj, e) {
//        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
//            Ext.getCmp(prototype.id+'-paggin').moveLast();
//        }
//    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    }
    // </editor-fold>
});
