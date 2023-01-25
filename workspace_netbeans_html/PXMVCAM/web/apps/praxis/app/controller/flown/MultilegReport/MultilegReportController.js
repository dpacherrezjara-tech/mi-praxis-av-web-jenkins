Ext.define('Ext.Praxis.controller.flown.MultilegReport.MultilegReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MultilegReportController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    fecha: new Date(),
    searchParams: {},
    searchParamsUppdate: {},
    _path: '',
    _pathDetail: '',
    _pathDetTicket: '',
    me: '',
    NPROG: 'PX00000087',
    // </editor-fold>
    setContext: function() {
        me = this;
    },
    init: function(view) {
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'MultilegReportForm';
        prototype.url = CONTEXTPATH + '/MultilegReport';
        prototype.widthContenedor = 1340;
        prototype.widthGrid = 850 ;
        prototype.widthGridDetail = 1252;
        prototype.widthGridDetTicket = 1305;
        prototype.widthGridDetTicketA1897 = 1330;
        // </editor-fold>
        win.lblUser_toolTip("Estructura: A1786");
        this.control({
        });
    },
    afterRender: function() {
        this.setStoreData();
        this.btnClear_click();
        this.btnSearch_click();
        this.validateProgram(Ext.getCmp(prototype.id + '-col-update'),'PX00000087', 'M');
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
    onViewDetailClick: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.setFormatParameterDetail(data);
        Ext.getCmp(prototype.id + '-boxMainData').hide();
        Ext.getCmp(prototype.id + '-boxDetailData').show();
        this.setGridDataSearchDetail();
    },
    onUpdateCarrierA1897: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.setFormatParameterDetUpdate(data);
        this.updateTicketA1897();
    },
    onViewDetTicketClick: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        console.log(data.FLAGLEG);
        this.setFormatParameterDetTicket(data);
        Ext.getCmp(prototype.id + '-boxDetailData').hide();
        Ext.getCmp(prototype.id + '-boxDetTicket').show();
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        this.setGridDataSearchDetTicket(data);
    },
    onViewDetTicketA1897Click: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        console.log(data.FLAGLEG);
        if (data.FLAGLEG === 'S') {
            this.setFormatParameterDetTicketA1897(data);
            Ext.getCmp(prototype.id + '-boxDetTicket').hide();
            Ext.getCmp(prototype.id + '-boxDetTicketA1897').show();
            this.setGridDataSearchDetTicketA1897();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridDataSearch();
        Ext.getCmp(prototype.id + '-boxDetTicketA1897').hide();
        Ext.getCmp(prototype.id + '-boxDetTicket').hide();
        Ext.getCmp(prototype.id + '-boxDetailData').hide();
        Ext.getCmp(prototype.id + '-boxMainData').show();
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
        // <editor-fold defaultstate="collapsed" desc="Clear Combo Date">
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");
        var mes = new Date().getMonth() + 1;
        if (mes < 10)
            mes = "0" + mes;
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(mes);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(mes);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(new Date().getFullYear());
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
        Ext.getCmp(prototype.id + '-txtFlight').setValue("");
        Ext.getCmp(prototype.id + '-lblTitDetTkt').setText('');
        // </editor-fold>
        this.focus("txtFlight");

        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDataDetail').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDetTkt1').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDetTktA1897').getStore().removeAll();
        Ext.getCmp(prototype.id + '-lbl-currentPage').setText("1");
        Ext.getCmp(prototype.id + '-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id + '-lbl-total').setText("0");
        Ext.getCmp(prototype.id + '-lbl-currentPage2').setText("1");
        Ext.getCmp(prototype.id + '-lbl-pageCount2').setText("0");
        Ext.getCmp(prototype.id + '-lbl-total2').setText("0");
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="show">
        Ext.getCmp(prototype.id + '-boxPaginacion').hide();
        Ext.getCmp(prototype.id + '-boxDetTicketA1897').hide();
        Ext.getCmp(prototype.id + '-boxDetTicket').hide();
        Ext.getCmp(prototype.id + '-boxDetailData').hide();
        Ext.getCmp(prototype.id + '-boxMainData').show();
        // </editor-fold>
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            var heightMenu = 400;
            Ext.getCmp('App-main-region-content-north').setHeight(heightMenu);
        } else if (Ext.getCmp(prototype.id + '-boxDetailData').isVisible()) {
            Ext.getCmp(prototype.id + '-boxDetailData').hide();
            Ext.getCmp(prototype.id + '-boxMainData').show();
        } else if (Ext.getCmp(prototype.id + '-boxDetTicket').isVisible()) {
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
            Ext.getCmp(prototype.id + '-boxDetTicket').hide();
            Ext.getCmp(prototype.id + '-lblTitDetTkt').setText('');
            Ext.getCmp(prototype.id + '-boxDetailData').show();
        } else if (Ext.getCmp(prototype.id + '-boxDetTicketA1897').isVisible()) {
            Ext.getCmp(prototype.id + '-boxDetTicketA1897').hide();
            Ext.getCmp(prototype.id + '-boxDetTicket').show();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function() {
        searchParams = {};

        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var txtFlight = this.getValue("txtFlight");

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
            IN_CARRIER: "",
            IN_QTYLEG: txtFlight
        };

        _path = prototype.url + '/getXLSX?' +
                'IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM + '&' +
                'IN_FECHA_TO=' + searchParams.IN_FECHA_TO + '&' +
                'IN_CARRIER=' + searchParams.IN_CARRIER + '&' +
                'IN_QTYLEG=' + searchParams.IN_QTYLEG;
        // </editor-fold>
    },
    setFormatParameterDetUpdate: function(data) {
        searchParamsUppdate = {};
        bean = {};
        bean.DFLIGHT = data.DFLIGHT;
        bean.NFLIGHT = data.NFLIGHT;
        bean.ORIG = data.ORIG;
        bean.DEST = data.DEST;

        var beanString = JSON.stringify(bean);
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParamsUppdate = {
            beanString: beanString
        };

    },
    setFormatParameterDetail: function(data) {
        searchParams = {};

        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            DFLIGHT: data.DFLIGHT,
            IN_FECHA_FROM: data.IN_FECHA_FROM,
            IN_FECHA_TO: data.IN_FECHA_TO,
            NFLIGHT: data.NFLIGHT,
            CARRIER: data.CARRIER,
            ORIG: data.ORIG,
            DEST: data.DEST
        };

        _pathDetail = prototype.url + '/getXLSXDetail?' +
                'DFLIGHT=' + searchParams.DFLIGHT + '&' +
                'IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM + '&' +
                'IN_FECHA_TO=' + searchParams.IN_FECHA_TO + '&' +
                'NFLIGHT=' + searchParams.NFLIGHT + '&' +
                'CARRIER=' + searchParams.CARRIER + '&' +
                'ORIG=' + searchParams.ORIG + '&' +
                'DEST=' + searchParams.DEST;
        // </editor-fold>
    },
    setFormatParameterDetTicket: function(data) {
        searchParams = {};

        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            strTipo: '',
            DFLIGHT: data.strDescripcion3,
            FOPERZUL: data.FOPERZUL,
            NFLIGHT: data.strDescripcion5,
            CDEPART: data.ORIGL,
            CARRIVA: data.DESTL,
            CARRI: data.CARRIER,
            FLAGLEG: data.FLAGLEG
        };

        _pathDetTicket = prototype.url + '/getXLSXDetTicket?' +
                'strTipo=' + searchParams.strTipo + '&' +
                'DFLIGHT=' + searchParams.DFLIGHT + '&' +
                'FOPERZUL=' + searchParams.FOPERZUL + '&' +
                'NFLIGHT=' + searchParams.NFLIGHT + '&' +
                'CDEPART=' + searchParams.CDEPART + '&' +
                'CARRIVA=' + searchParams.CARRIVA + '&' +
                'CARRI=' + searchParams.CARRI;
        // </editor-fold>
    },
    setFormatParameterDetTicketA1897: function(data) {
        searchParams = {};

        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            DFLIGHT: data.DFLIGHT,
            CCIA: data.CCIA,
            FORMA: data.FORMA,
            SERIE: data.SERIE,
            CUPON: data.CUPON
        };

//        _pathDetTicketA1897 = prototype.url + '/getXLSXDetTicketA1897?' +
//                'yearFrom=' + searchParams.yearFrom + '&' +
//                'monthFrom=' + searchParams.monthFrom + '&' +
//                'dayFrom=' + searchParams.dayFrom + '&' +
//                'yearTo=' + searchParams.yearTo + '&' +
//                'monthTo=' + searchParams.monthTo + '&' +
//                'dayTo=' + searchParams.dayTo + '&' +
//                'DFLIGHT=' + searchParams.DFLIGHT + '&' +
//                'IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM + '&' +
//                'IN_FECHA_TO=' + searchParams.IN_FECHA_TO + '&' +
//                'NFLIGHT=' + searchParams.NFLIGHT + '&' +
//                'CDEPART=' + searchParams.CDEPART + '&' +
//                'CARRIVA=' + searchParams.CARRIVA + '&' +
//                'KMS=' + searchParams.KMS;
        // </editor-fold>
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridDataSearch: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.MultilegReport.GridData', {
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
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
    },
    updateTicketA1897: function() {
        
        Ext.Ajax.request({
            url: prototype.url + '/updateA1897',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString:searchParamsUppdate},
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var msj = res.mensaje;
                
                global.Msg({
                    msg: msj
                });
                
            }
        });
    },    
    setGridDataSearchDetail: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.MultilegReport.GridDataDetail', {
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
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
    },
    setGridDataSearchDetTicket: function(data) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.MultilegReport.GridDataDetTicket1', {
            proxy: {
                url: prototype.url + '/searchDetTicket'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    } else {
                        Ext.getCmp(prototype.id + '-lblTitDetTkt').setText(
                                'Flight Date: ' + data.strDescripcion3 + ' - ' +
                                'Flight Nbr: ' + data.strDescripcion5 + ' - ' +
                                'Departure: ' + data.ORIGL + ' - ' +
                                'Arrival: ' + data.DESTL);
                        console.log(obj.data.items);
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetTkt1').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataSearchDetTicketA1897: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.MultilegReport.GridDataDetTicketA1897', {
            proxy: {
                url: prototype.url + '/searchA1897'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    // <editor-fold defaultstate="collapsed" desc="paggin2">
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage2').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount2').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total2').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetTktA1897').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    // </editor-fold>

    exportExcel: function() {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            global.getFile(_path);
        } else if (Ext.getCmp(prototype.id + '-boxDetailData').isVisible()) {
            global.getFile(_pathDetail);
        } else if (Ext.getCmp(prototype.id + '-boxDetTicket').isVisible()) {
            global.getFile(_pathDetTicket);
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
        if (Ext.getCmp(prototype.id + '-boxDetTicket').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        } else if (Ext.getCmp(prototype.id + '-boxDetTicketA1897').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin2').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxDetTicket').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        } else if (Ext.getCmp(prototype.id + '-boxDetTicketA1897').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin2').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxDetTicket').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        } else if (Ext.getCmp(prototype.id + '-boxDetTicketA1897').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin2').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxDetTicket').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        } else if (Ext.getCmp(prototype.id + '-boxDetTicketA1897').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin2').moveLast();
        }
    },
    // </editor-fold>

    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    validateAccess: function(info, opcion) {
        var bolRtn = false;
        switch (opcion)
        {
            case "A":
                if (info.PERMA === "Y")
                    bolRtn = true;
                break;
            case "L":
                if (info.PERML === "Y" || info.PERMC === "Y" || info.PERMM === "Y" || info.PERME === "Y")
                    bolRtn = true;
                break;
            case "C":
                if (info.PERMC === "Y")
                    bolRtn = true;
                break;
            case "M":
                if (info.PERMM === "Y")
                    bolRtn = true;
                break;
            case "E":
                if (info.PERME === "Y")
                    bolRtn = true;
                break;
            case "X":
                if (info.PERMX === "Y")
                    bolRtn = true;
                break;
        }

        return bolRtn;
    },
    //<editor-fold defaultstate="collapsed" desc="validateProgram">
    validateProgram: function(cmp, nprog, opcion) {
//        console.log('------- validateProgram ---------');
//        console.log('------- nprog ' + nprog);
//        console.log('------- opcion  ' +opcion);
        Ext.Ajax.request({
            url: prototype.urlMaster + '/validateUserProgramAccess',
            method: 'POST',
            timeout: 60000000,
            params: {nprog: nprog || ''},
            success: function(response, opts) {
//                console.log(response);
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var matrix = res.matrix;
                    console.log('---');
                    console.log(matrix);
                    var visible = me.validateAccess(matrix, opcion);
                    console.log('---2');
                    console.log(visible);
                    if (visible){
                        cmp.show();
                        Ext.getCmp(prototype.id + '-gridData').setWidth(850);
                    }else{
                        cmp.hide();
                        Ext.getCmp(prototype.id + '-gridData').setWidth(800);
                    }    
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    }
});
