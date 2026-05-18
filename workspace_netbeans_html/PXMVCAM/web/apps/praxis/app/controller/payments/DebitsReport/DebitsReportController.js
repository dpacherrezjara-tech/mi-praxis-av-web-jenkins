Ext.define('Ext.Praxis.controller.payments.DebitsReport.DebitsReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DebitsReportController',
    fecha: new Date(),
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    lstCurrencies: [],
    lstProcessor: [],
    lstBank: [],
    lstDEBTYPE: [],
    lstCOMMENTS: [],
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    paramsObtainData: {},
    init: function (view) {
        me = this;
        prototype.id = 'DebitsReportForm';
        prototype.url = CONTEXTPATH + '/DebitsReport';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataDetail';
        prototypeProgram.view = 'payments-BSP-file-download';
        prototypeProgram.nprog = 'PX00001032';
        prototypeProgram.title = 'Downloaded Cash Files';
        prototypeProgram.modulo = '';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        // <editor-fold defaultstate="collapsed" desc="Eventos Genericos">
        this.control({
            '#DebitsReportForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#DebitsReportForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#DebitsReportForm-btnClear': {
                click: this.btnClear_click
            },
            '#DebitsReportForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#DebitsReportForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#DebitsReportForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#DebitsReportForm-btnBack': {
                click: this.btnBack_click
            },
            '#DebitsReportForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#DebitsReportForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#DebitsReportForm-btn-pag-next': {
                click: this.pagNext
            },
            '#DebitsReportForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#DebitsReportForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#DebitsReportForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#DebitsReportForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
            '#DebitsReportForm-cmbDateFromYearARC': {
                select: this.selectComboFromYearARC
            },
            '#DebitsReportForm-cmbDateFromMonthARC': {
                select: this.selectComboFromMonthARC
            },
            '#DebitsReportForm-cmbDateFromDayARC': {
                select: this.selectComboFromDayARC
            },
        });
        // </editor-fold>
    },
    xpanel_afterrender: function () {
        me.obtainData();
//        me.btnSearch_click();
    },
    obtainData: function () {
        var fechaActual = me.fecha || new Date();

        // Año actual (ya está bien como número)
        var yearActual = fechaActual.getFullYear();

        // Mes actual CONVERTIDO a string de 2 dígitos
        var monthActual = (fechaActual.getMonth() + 1).toString().padStart(2, '0');

        // Bind stores
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(win.getStoreDays(true));

        // Asignar valores (año como número, mes como string de 2 dígitos)
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");

        // Lo mismo para combos ARC
        Ext.getCmp(prototype.id + '-cmbDateFromYearARC').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateToYearARC').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateFromMonthARC').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonthARC').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDayARC').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDayARC').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYearARC').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateToYearARC').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthARC').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateToMonthARC').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateFromDayARC').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDayARC').setValue("");

        this.paramsObtainData.CURRENCY = 2;
        this.paramsObtainData.COUNTRY = 2;
        this.paramsObtainData.BANK = 2;
        this.paramsObtainData.IN_PF122CODPR = 2;
        this.paramsObtainData.DEBTYPE = 2;
        this.paramsObtainData.COMMENTS = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {

                var res = Ext.JSON.decode(response.responseText);
                me.lstCountry = res.lstCountry;
                me.lstCurrencies = res.lstCurrencies;
                me.lstBank = res.lstBank;
                me.lstProcessor = res.listaProcesadores;
                me.lstDEBTYPE = res.lstDEBTYPE;
                me.lstCOMMENTS = res.lstCOMMENTS;

                var storeData3 = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
                Ext.getCmp(prototype.id + '-cmbCountryARC').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbCountryARC').setValue('');

                var storeData4 = Ext.create('Ext.data.Store', {
                    data: me.lstCurrencies,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCurrency').bindStore(storeData4);
                Ext.getCmp(prototype.id + '-cmbCurrency').setValue('');


                var storeData5 = Ext.create('Ext.data.Store', {
                    data: me.lstBank,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbBank').bindStore(storeData5);
                Ext.getCmp(prototype.id + '-cmbBank').setValue('');

                console.log(me.lstProcessor, 'me.lstProcessor')
                var storeDataProcessor = Ext.create('Ext.data.Store', {
                    data: me.lstProcessor,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCOREP').bindStore(storeDataProcessor);
                Ext.getCmp(prototype.id + '-cmbCOREP').setValue('');

                var storeDataDebtype = Ext.create('Ext.data.Store', {
                    data: me.lstDEBTYPE,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbDEBTYPE').bindStore(storeDataDebtype);
                Ext.getCmp(prototype.id + '-cmbDEBTYPE').setValue('');

                var storeDataComments = Ext.create('Ext.data.Store', {
                    fields: ['CODE', 'NAME'],
                    data: me.lstCOMMENTS,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbBPOCOMMENT').bindStore(storeDataComments);
                Ext.getCmp(prototype.id + '-cmbBPOCOMMENT').setValue('');


                global.clear();
            }
        });

    },
    btnSearch_click: function (obj, e) {
        let fs = Ext.getCmp(prototype.id + '-titleFieldsetBSP');
        let fsARC = Ext.getCmp(prototype.id + '-titleFieldsetARC');
        let selectedBy = Ext.getCmp(prototype.id + '-cmbInputDate').getValue();
        let selectedByARC = Ext.getCmp(prototype.id + '-cmbInputDateARC').getValue();

        if (selectedBy === 'S') {
            fs.setTitle('<span style="color:#1a4d8f;font-weight:bold;">DATE CREATE</span>');
        } else if (selectedBy === 'U') {
            fs.setTitle('<span style="color:#1a4d8f;font-weight:bold;">UPLOAD</span>');
        }

        if (selectedByARC === 'P') {
            fsARC.setTitle('<span style="color:#1a4d8f;font-weight:bold;">ADATE</span>');
        } else if (selectedByARC === 'U') {
            fsARC.setTitle('<span style="color:#1a4d8f;font-weight:bold;">UPLOAD</span>');
        }

        let seg = Ext.getCmp(prototype.id + '-segViewMode');
        let selected = seg.getValue();
        this.drillDown = [];

        if (selected === 0) {
            Ext.getCmp(prototype.id + '-panelBSP').setVisible(true);
            Ext.getCmp(prototype.id + '-panelARC').setVisible(false);
            this.setFormatParameter();

            let optionDoctype = Ext.getCmp(prototype.id + '-filterDoctype').getValue();

            if (optionDoctype === 'C') {
                this.setGridDataChargueback();
            } else if (optionDoctype === 'R') {
                this.setGridDataRefund();
            } else if (optionDoctype === 'A') {
                this.setGridDataAcredit();
            }

        } else if (selected === 1) {
            Ext.getCmp(prototype.id + '-panelBSP').setVisible(false);
            Ext.getCmp(prototype.id + '-panelARC').setVisible(true);
            this.setFormatParameterARC();
            this.setGridDataARC();
        }
    },
    setFormatParameter: function () {
        var valSociety = Ext.getCmp(prototype.id + '-typeSociety').getValue();
        me.bean = {};
        me.bean.IN_OPTION = Ext.getCmp(prototype.id + '-cmbInputDate').getValue() || '';
        me.bean.IN_FECHA_FROM = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue()
                );
        me.bean.IN_FECHA_TO = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateToYear').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue()
                );
        me.bean.IN_SOCIETY = Ext.isArray(valSociety) ? valSociety.join(',') : (valSociety || '');
        me.bean.IN_TDOC = Ext.getCmp(prototype.id + '-filterDoctype').getValue() || '';
        me.bean.IN_STATUS = Ext.getCmp(prototype.id + '-cmbStatus').getValue() || '';
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue() || '';
        me.bean.IN_SCURRENCY = Ext.getCmp(prototype.id + '-cmbCurrency').getValue() || '';
        me.bean.IN_NETO = Ext.getCmp(prototype.id + '-txtNETO').getValue() || '';
        me.bean.IN_SCARCOD = Ext.getCmp(prototype.id + '-txtCardType').getValue() || '';
        me.bean.IN_SCARDN6 = Ext.getCmp(prototype.id + '-filterScardn1').getValue() || '';
        me.bean.IN_SCARDN4 = Ext.getCmp(prototype.id + '-filterScardn2').getValue() || '';
        me.bean.IN_SAUTHOC = Ext.getCmp(prototype.id + '-filterSauthoc').getValue() || '';
        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-filterSagent').getValue() || '';
        me.bean.IN_TICKET = Ext.getCmp(prototype.id + '-filterTicket').getValue() || '';
        me.bean.IN_PNR = Ext.getCmp(prototype.id + '-filterPnr').getValue() || '';
        me.bean.IN_REFUNDVENTA = Ext.getCmp(prototype.id + '-cmbRembolsoCintaVenta').getValue() || '';
        me.bean.IN_ID = Ext.getCmp(prototype.id + '-filterIDDEB').getValue() || '';
        me.bean.IN_IDDEBCONCEPT = Ext.getCmp(prototype.id + '-filterIDDEBCONCEPT').getValue() || '';
        me.bean.IN_CVS = Ext.getCmp(prototype.id + '-filterCasoCVS').getValue() || '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'searchParams');
    },
    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPF218");
        me.panelActual = '-panelGridDataDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    setGridDataChargueback: function () {
        win.lblUser_toolTip("Estructura: MPF076");
        me.panelActual = '-panelGridDataDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchChargeback'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        this.getPaggin();
    },
    setGridDataRefund: function () {
        win.lblUser_toolTip("Estructura: MPF075");
        me.panelActual = '-panelGridDataRefund';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchRefund'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataRefund').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        this.getPaggin();
    },
    setGridDataAcredit: function () {
        win.lblUser_toolTip("Estructura: MPF077");
        me.panelActual = '-panelGridDataAcredit';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchAcredit'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataAcredit').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        this.getPaggin();
    },
    setFormatParameterARC: function () {
        me.bean = {};
        me.bean.IN_OPTION = Ext.getCmp(prototype.id + '-cmbInputDateARC').getValue() || '';
        me.bean.IN_FECHA_FROM = me.buildDate(Ext.getCmp(prototype.id + '-cmbDateFromYearARC').getValue(), Ext.getCmp(prototype.id + '-cmbDateFromMonthARC').getValue(), Ext.getCmp(prototype.id + '-cmbDateFromDayARC').getValue());
        me.bean.IN_FECHA_TO = me.buildDate(Ext.getCmp(prototype.id + '-cmbDateToYearARC').getValue(), Ext.getCmp(prototype.id + '-cmbDateToMonthARC').getValue(), Ext.getCmp(prototype.id + '-cmbDateToDayARC').getValue());
        me.bean.IN_CCUST = Ext.getCmp(prototype.id + '-typeSocietyARC').getValue() || '';
        me.bean.IN_CODPRO = Ext.getCmp(prototype.id + '-cmbCOREP').getValue() || '';
        me.bean.IN_DEBTYPE = Ext.getCmp(prototype.id + '-cmbDEBTYPE').getValue() || '';
        me.bean.IN_CODEBANK = Ext.getCmp(prototype.id + '-cmbBank').getValue() || '';
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountryARC').getValue() || '';
        me.bean.IN_BANDOC = Ext.getCmp(prototype.id + '-txtBANDOC').getValue() || '';
        me.bean.IN_REFERENCE = Ext.getCmp(prototype.id + '-txtreference').getValue() || '';
        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-filterSagentARC').getValue() || '';
        me.bean.IN_IDACCOUNTING = Ext.getCmp(prototype.id + '-txtIDAccounting').getValue() || '';
        me.bean.IN_SCARDN6 = Ext.getCmp(prototype.id + '-filterScardn1ARC').getValue() || '';
        me.bean.IN_SCARDN4 = Ext.getCmp(prototype.id + '-filterScardn2ARC').getValue() || '';
        me.bean.IN_SAUTHOC = Ext.getCmp(prototype.id + '-filterSauthocARC').getValue() || '';
        me.bean.IN_FASE1 = Ext.getCmp(prototype.id + '-cmbF1').getValue() || '';
        me.bean.IN_FASE2 = Ext.getCmp(prototype.id + '-cmbF2').getValue() || '';
        me.bean.IN_BPOC = Ext.getCmp(prototype.id + '-cmbBPOCOMMENT').getValue() || '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'searchParamsARC');
    },
    setGridDataARC: function () {
        win.lblUser_toolTip("Estructura: MPF060, MPF101");
        me.panelActual = '-panelGridDataARC';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchStatus'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailARC').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    btnExcel_click: function (obj, e) {
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
    },
    exportExcel: function () {
        switch (me.panelActual) {
            case  '-panelGridDataDetail':
                global.getFile(prototype.url + '/getXLSXChargeback?beanString=' + encodeURI(searchParams.beanString));
                break;
            case  '-panelGridDataRefund':
                global.getFile(prototype.url + '/getXLSXRefund?beanString=' + encodeURI(searchParams.beanString));
                break;
            case  '-panelGridDataAcredit':
                global.getFile(prototype.url + '/getXLSXAcredit?beanString=' + encodeURI(searchParams.beanString));
                break;
            case  '-panelGridDataARC':
                global.getFile(prototype.url + '/getXLSXStatus?beanString=' + encodeURI(searchParams.beanString));
                break;
            default:
                global.Msg({msg: 'Under Construction'});
        }
    },
    buildDate: function (y, m, d) {
        // Convertir a string y limpiar
        y = String(y || '').trim();
        m = String(m || '').trim();
        d = String(d || '').trim();

        if (!y)
            return '';

        // Asegurar que mes tenga 2 dígitos si existe
        if (m) {
            m = m.padStart(2, '0');
            // Asegurar que día tenga 2 dígitos si existe
            if (d) {
                d = d.padStart(2, '0');
            }
        }

        return y + m + d;
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        console.log(me.panelActual, 'me.panelActual')
        switch (me.panelActual) {
            case  '-panelGridDataDetail':
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                Ext.getCmp(prototype.id + '-panelHeight').setHeight(590);
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridDataRefund':
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                Ext.getCmp(prototype.id + '-panelHeight').setHeight(590);
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridDataAcredit':
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                Ext.getCmp(prototype.id + '-panelHeight').setHeight(590);
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridDataARC':
                me.pagginActual = '-paggin';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                Ext.getCmp(prototype.id + '-panelHeight').setHeight(650);
                me.pagginActual = '-paggin';
                break;
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginacion ">
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {
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
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    selectComboFromYearARC: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYearARC');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYearARC');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonthARC');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthARC');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromMonthARC: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthARC');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboFromDayARC: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDayARC');
        comboToDay.setValue(obj.getValue());
    },
    getPeriodoYYYYMM: function (strFormatDate) {
        if (!strFormatDate)
            return null;

        let [anio, mesTxt] = strFormatDate.split('-');
        const meses = {
            Jan: '01', Feb: '02', Mar: '03', Apr: '04',
            May: '05', Jun: '06', Jul: '07', Aug: '08',
            Sep: '09', Oct: '10', Nov: '11', Dec: '12'
        };
        return anio + (meses[mesTxt] || '00');
    },
    onUpperValue: function (obj, e, eOpts) {
        let value = obj.getValue().toUpperCase();
        obj.setValue(value);
    },
    setWidthPie: function () {
//        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
//        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
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
    // </editor-fold>
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onDownloadCSV: function (column, e, row, colIndex, x, rowData) {
        let data = rowData.data;
        const country = data.COUNTRY;
        const dateSett = data.DATESETT;
        const customer = data.CUSTOMER;
        const filename = data.NAMEFILE;

        if (!country || !dateSett || !customer) {
            Ext.Msg.alert('Error', 'Faltan parámetros para la descarga (Country, Customer o Settlement Date).');
            return;
        }

        const url = prototype.url + '/getCSV'
                + '?country=' + encodeURIComponent(country)
                + '&dateSett=' + encodeURIComponent(dateSett)
                + '&customer=' + encodeURIComponent(customer)
                + '&filename=' + encodeURIComponent(filename);

        console.log('Solicitando:', url);

        global.getFile(url);
    },
    onDownloadAllCSV: function () {
        let me = this;
        let url = null;

        switch (me.panelActual) {

            case '-panelGridDataDetail': // BSP
                console.log('ZIP BSP permitido');
                url = prototype.url + '/getBulkCSV';
                break;

            case '-panelGridDataARC': // ARC
                console.log('ZIP ARC permitido');
                url = prototype.url + '/getBulkTXTARC';
                break;

            default:
                global.Msg({msg: 'Under Construction'});
                return;
        }

        if (!searchParams || !searchParams.beanString) {
            Ext.Msg.alert(
                    "Error",
                    "Debe realizar una búsqueda antes de descargar."
                    );
            return;
        }

        console.log("Solicitando ZIP con filtros:", searchParams);
        console.log("Endpoint:", url);

        me.getFileByPost(url, {
            beanString: searchParams.beanString
        });
    },
    getFileByPost: function (url, params) {
        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", url);
        form.setAttribute("target", "_blank");

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);
                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
        form.remove();
    },
    onChangeDoctype: function (combo, newValue, oldValue) {

        var cmpAutorizacion = Ext.getCmp(prototype.id + '-filterSauthoc');
        var cmpAgent = Ext.getCmp(prototype.id + '-filterSagent');
        var cmpTicket = Ext.getCmp(prototype.id + '-filterTicket');
        var cmpPnr = Ext.getCmp(prototype.id + '-filterPnr');
        var cmpRembolsoCintaVenta = Ext.getCmp(prototype.id + '-cmbRembolsoCintaVenta');
        var cmpIDDEB = Ext.getCmp(prototype.id + '-filterIDDEB');
        var cmpIDDEBCONCEPT = Ext.getCmp(prototype.id + '-filterIDDEBCONCEPT');
        var cmpCasoCVS = Ext.getCmp(prototype.id + '-filterCasoCVS');

        cmpAutorizacion.hide();
        cmpAgent.hide();
        cmpTicket.hide();
        cmpPnr.hide();
        cmpRembolsoCintaVenta.hide();
        cmpIDDEB.hide();
        cmpIDDEBCONCEPT.hide();
        cmpCasoCVS.hide();

        if (newValue === 'S') {
        } else if (newValue === 'D') {
        } else if (newValue === 'R') {
            cmpRembolsoCintaVenta.show();
            cmpPnr.show();
            cmpAutorizacion.show();
            cmpAgent.show();
            cmpTicket.show();
        } else if (newValue === 'C') {
            cmpIDDEB.show();
            cmpIDDEBCONCEPT.show();
        } else {
            cmpCasoCVS.show();
            cmpPnr.show();
            cmpAutorizacion.show();
            cmpAgent.show();
        }
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var idcDeb = rec.get('IDCDEB');
        var ccust = rec.get('CCUST');

        var storeBPOComments = Ext.create('Ext.data.Store', {
            fields: ['CODE', 'NAME'],
            data: me.lstCOMMENTS,
            autoLoad: true
        });

        var doAssignAjax = function (action, commentCode, commentText) {
            var params = {
                IN_ACTION: action,
                CCUST: ccust,
                IDCDEB: idcDeb,
                COMMENT_CODE: commentCode
            };

            Ext.Ajax.request({
                url: prototype.url + '/assignComment', // Endpoint que crearemos en Java
                method: 'POST',
                params: {
                    beanString: JSON.stringify(params)
                },
                success: function (response) {
                    var res = Ext.JSON.decode(response.responseText);
                    if (res.success) {
                        global.Msg({msg: res.msg, icon: 1});

                        // Actualizamos visualmente la grilla principal
                        if (action === 'A') {
                            rec.set('SAUTHOC', commentText); // Asumiendo que SAUTHOC muestra el comentario BPO
                        } else if (action === 'D') {
                            rec.set('SAUTHOC', ''); // Limpiamos la celda
                        }
                        rec.commit();

                        winAssignComment.close();
                    } else {
                        global.Msg({msg: 'Error: ' + res.msg, icon: 3});
                    }
                },
                failure: function () {
                    global.Msg({msg: 'Error de conexión con el servidor.', icon: 3});
                }
            });
        };

        // 3. Dibujamos la ventana
        var winAssignComment = Ext.create('Ext.window.Window', {
            title: 'Asignar Comentario a Liquidación',
            id: prototype.id + '-winAssignComment',
            width: 480,
            autoHeight: true,
            modal: true,
            resizable: false,
            layout: 'vbox',
            bodyPadding: 15,
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'IDCDEB',
                    labelWidth: 100,
                    width: '100%',
                    value: idcDeb,
                    readOnly: true,
                    fieldStyle: 'background-color: #e8e8e8; color: #333; font-weight: bold;'
                },
                {
                    xtype: 'combobox',
                    id: prototype.id + '-cmbBPOComment',
                    fieldLabel: 'Comentario BPO',
                    labelWidth: 100,
                    width: '100%',
                    margin: '15 0 0 0',
                    store: storeBPOComments,
                    displayField: 'NAME',
                    valueField: 'CODE',
                    emptyText: 'Seleccione un comentario...',
                    queryMode: 'local',
                    forceSelection: true,
                    allowBlank: false
                }
            ],
            buttons: [
                {
                    text: 'Quitar Comentario',
                    iconCls: 'prx-icon-delete',
                    style: 'background: #d9534f; border-color: white; color: white;', // Rojo para resaltar que elimina
                    handler: function () {
                        Ext.Msg.confirm('Confirmar', '¿Está seguro de quitar el comentario a esta liquidación?', function (btn) {
                            if (btn === 'yes') {
                                // Enviamos 'D' (Quitar), código vacío y texto vacío
                                doAssignAjax('D', '', '');
                            }
                        });
                    }
                },
                '->', // Este espaciador empuja los siguientes botones hacia la derecha
                {
                    text: 'Asignar',
                    iconCls: 'prx-icon-save',
                    style: 'background: #6C87A8; border-color: white; color: white;',
                    handler: function () {
                        var cmb = Ext.getCmp(prototype.id + '-cmbBPOComment');

                        if (!cmb.isValid()) {
                            global.Msg({msg: 'Por favor, seleccione un comentario de la lista.', icon: 2});
                            return;
                        }

                        var selectedCode = cmb.getValue();
                        var selectedText = cmb.getRawValue();

                        // Enviamos 'A' (Asignar) con los datos del combo
                        doAssignAjax('A', selectedCode, selectedText);
                    }
                },
                {
                    text: 'Cancelar',
                    handler: function () {
                        winAssignComment.close();
                    }
                }
            ]
        });

        winAssignComment.show();
    },
    onCreateComment: function () {
        var me = this;

        var storeComments = Ext.create('Ext.data.Store', {
            fields: ['CODE', 'NAME'],
            data: me.lstCOMMENTS,
            autoLoad: true
        });

        var doManageCommentAjax = function (action, code, description, recordToUpdateOrRemove) {
            var params = {
                IN_ACTION: action,
                CODIGO: code,
                DESCRIPTC: description
            };

            Ext.Ajax.request({
                url: prototype.url + '/manageComment',
                method: 'POST',
                params: {
                    beanString: JSON.stringify(params)
                },
                success: function (response) {
                    var res = Ext.JSON.decode(response.responseText);
                    if (res.success) {
                        global.Msg({msg: 'Operación realizada con éxito.', icon: 1});

                        if (action === 'I') {
                            Ext.getCmp(prototype.id + '-txtNewComment').setValue('');
                            storeComments.add({CODE: res.newCode, NAME: description});
                        } else if (action === 'U' && recordToUpdateOrRemove) {
                            recordToUpdateOrRemove.set('NAME', description);
                            recordToUpdateOrRemove.commit();
                        } else if (action === 'D' && recordToUpdateOrRemove) {
                            storeComments.remove(recordToUpdateOrRemove);
                        }
                    } else {
                        global.Msg({msg: 'Error: ' + res.msg, icon: 3});
                    }
                },
                failure: function () {
                    global.Msg({msg: 'Error de conexión con el servidor.', icon: 3});
                }
            });
        };

        var winComment = Ext.create('Ext.window.Window', {
            title: 'Manage Comments',
            id: prototype.id + '-winManageComments',
            width: 650,
            height: 400,
            modal: true,
            resizable: false,
            layout: 'vbox',
            bodyPadding: 10,
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    margin: '0 0 10 0',
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtNewComment',
                            emptyText: 'Escriba un nuevo comentario aquí...',
                            flex: 1,
                            margin: '0 10 0 0',
                            allowBlank: false
                        },
                        {
                            xtype: 'button',
                            text: 'Crear',
                            iconCls: 'prx-icon-add',
                            style: 'background: #6C87A8; border-color: white; color:white',
                            handler: function () {
                                var txtInput = Ext.getCmp(prototype.id + '-txtNewComment');
                                var textVal = txtInput.getValue();

                                if (textVal.trim() === '') {
                                    global.Msg({msg: 'Por favor, ingrese un comentario válido.'});
                                    return;
                                }

                                doManageCommentAjax('I', '', textVal, null);
                            }
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridComments',
                    width: '100%',
                    flex: 1,
                    columnLines: true,
                    store: storeComments,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: false
                        },
                        items: [
                            {
                                text: '<span style="color:white;font-weight:bold;">Code</span>',
                                dataIndex: 'CODE',
                                width: 60,
                                align: 'center',
                                style: 'padding:2px; background: #6C87A8;border-color:white'
                            },
                            {
                                text: '<span style="color:white;font-weight:bold;">Description</span>',
                                dataIndex: 'NAME',
                                flex: 1,
                                style: 'padding:2px; background: #6C87A8;border-color:white'
                            },
                            {
                                xtype: 'actioncolumn',
                                text: '<span style="color:white;font-weight:bold;">Acciones</span>',
                                width: 80,
                                align: 'center',
                                style: 'padding:2px; background: #6C87A8;border-color:white',
                                items: [
                                    {
                                        iconCls: 'prx-icon-edit',
                                        tooltip: 'Editar',
                                        handler: function (grid, rowIndex, colIndex) {
                                            var rec = grid.getStore().getAt(rowIndex);

                                            Ext.Msg.prompt('Editar Comentario', 'Modifique la descripción:', function (btn, text) {
                                                if (btn === 'ok' && text.trim() !== '') {
                                                    doManageCommentAjax('U', rec.get('CODE'), text.trim(), rec);
                                                }
                                            }, this, false, rec.get('NAME'));
                                        }
                                    },
                                    {
                                        xtype: 'tbspacer', width: 10
                                    },
                                    {
                                        iconCls: 'prx-icon-delete',
                                        tooltip: 'Eliminar',
                                        handler: function (grid, rowIndex, colIndex) {
                                            var rec = grid.getStore().getAt(rowIndex);

                                            Ext.Msg.confirm('Confirmar', '¿Está seguro de eliminar este comentario?', function (btn) {
                                                if (btn === 'yes') {
                                                    doManageCommentAjax('D', rec.get('CODE'), rec.get('NAME'), rec);
                                                }
                                            });
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        });

        winComment.show();
    }
}
);