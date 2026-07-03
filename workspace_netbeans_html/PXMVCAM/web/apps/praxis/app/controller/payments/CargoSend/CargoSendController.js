Ext.define('Ext.Praxis.controller.payments.CargoSend.CargoSendController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CargoSendController',
    fecha: new Date(),
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    paramsObtainData: {},
    init: function (view) {
        me = this;
        prototype.id = 'CargoSendForm';
        prototype.url = CONTEXTPATH + '/CargoSend';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataDetail';
        prototypeProgram.view = 'payments-BSP-file-download';
        prototypeProgram.nprog = 'PX00001032';
        prototypeProgram.title = 'Downloaded Cash Files';
        prototypeProgram.modulo = '';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        // <editor-fold defaultstate="collapsed" desc="Eventos Genericos">
        this.control({
            '#CargoSendForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#CargoSendForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CargoSendForm-btnGenerateReport': {
                click: this.btnGenerateReport_click
            },
            '#CargoSendForm-btnClear': {
                click: this.btnClear_click
            },
            '#CargoSendForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CargoSendForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#CargoSendForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#CargoSendForm-btnBack': {
                click: this.btnBack_click
            },
            '#CargoSendForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CargoSendForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CargoSendForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CargoSendForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#CargoSendForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#CargoSendForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#CargoSendForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
            '#CargoSendForm-cmbDateFromYearARC': {
                select: this.selectComboFromYearARC
            },
            '#CargoSendForm-cmbDateFromMonthARC': {
                select: this.selectComboFromMonthARC
            },
            '#CargoSendForm-cmbDateFromDayARC': {
                select: this.selectComboFromDayARC
            },
             '#CargoSendForm-cmbDateFromYearICCS': {
                select: this.selectComboFromYearICCS
            },
            '#CargoSendForm-cmbDateFromMonthICCS': {
                select: this.selectComboFromMonthICCS
            },
            '#CargoSendForm-cmbDateFromDayICCS': {
                select: this.selectComboFromDayICCS
            },
        });
        // </editor-fold>
    },
    onEditCargoSend: function (column, e, row, colIndex, x, rowData) {
        var data = rowData.data;
        Ext.create('Ext.Praxis.view.payments.CargoSendForm.DataEntryEditCargoSend', {
            params: {
                SREPID:   data.SREPID   || '',
                NAMEFILE: data.NAMEFILE || '',
                STVAL:    (data.STVAL   || '0').trim()
            }
        }).show();
    },
    onDownloadReportBySREPID: function (column, e, row, colIndex, x, rowData) {
        var srepid   = (rowData.data.SREPID   || '').trim();
        var namefile = (rowData.data.NAMEFILE  || '').toUpperCase();
        if (!srepid) {
            Ext.Msg.alert('.:PRAXIS:.', 'No hay ID de reporte para descargar.');
            return;
        }
        var endpoint = (namefile.indexOf('PSE') !== -1)
            ? '/downloadReportPSE'
            : '/downloadReportMPS717';
        window.open(prototype.url + endpoint + '?srepid=' + encodeURIComponent(srepid), '_blank');
    },
    btnGenerateReport_click: function () {
        Ext.create('Ext.Praxis.view.payments.CargoSendForm.DataEntryCargoSend', {
            params: {}
        }).show();
    },

    xpanel_afterrender: function () {
        me.obtainData();
        me.btnSearch_click();
    },
    obtainData: function () {
        var fechaActual = me.fecha || new Date();

        var yearActual = fechaActual.getFullYear();

        var monthActual = (fechaActual.getMonth() + 1).toString().padStart(2, '0');

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");

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
        
        Ext.getCmp(prototype.id + '-cmbDateFromYearICCS').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateToYearICCS').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateFromMonthICCS').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonthICCS').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDayICCS').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDayICCS').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYearICCS').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateToYearICCS').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthICCS').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateToMonthICCS').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateFromDayICCS').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDayICCS').setValue("");

        this.paramsObtainData.COUNTRY = 2;
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

                var storeData3 = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
                global.clear();
            }
        });

    },
    btnSearch_click: function (obj, e) {
        me = this;

        let seg = Ext.getCmp(prototype.id + '-segViewMode');
        let selected = seg.getValue();
        this.drillDown = [];

        if (selected === 0) {
            Ext.getCmp(prototype.id + '-panelBSP').setVisible(true);
            Ext.getCmp(prototype.id + '-panelARC').setVisible(false);
            Ext.getCmp(prototype.id + '-panelICCS').setVisible(false);
            this.setFormatParameter();
            this.setGridData();
        } else if (selected === 1) {
            Ext.getCmp(prototype.id + '-panelBSP').setVisible(false);
            Ext.getCmp(prototype.id + '-panelICCS').setVisible(false);
            Ext.getCmp(prototype.id + '-panelARC').setVisible(true);
            this.setFormatParameterARC();
            this.setGridDataARC();
        } else {
            Ext.getCmp(prototype.id + '-panelBSP').setVisible(false);
            Ext.getCmp(prototype.id + '-panelARC').setVisible(false);
            Ext.getCmp(prototype.id + '-panelICCS').setVisible(true);
            this.setFormatParameterICCS();
            this.setGridDataICCS();
        }
    },
    setFormatParameter: function () {
        me.bean = {};

        // Settlement From
        me.bean.IN_FECHA_FROM = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue()
                );

        // Settlement To
        me.bean.IN_FECHA_TO = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateToYear').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue()
                );

        // Additional
        me.bean.IN_SOCIETY = Ext.getCmp(prototype.id + '-typeSociety').getValue() || '';
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue() || '';
        me.bean.IN_FILE_NAME = Ext.getCmp(prototype.id + '-txtINameFile').getValue() || '';
        me.bean.IN_OPTION = Ext.getCmp(prototype.id + '-cmbInputDate').getValue() || '';
        me.bean.IN_STVAL    = Ext.getCmp(prototype.id + '-cmbStval').getValue();
        me.bean.IN_TYPEDOC  = Ext.getCmp(prototype.id + '-cmbTypedoc').getValue();
        me.bean.IN_COUNTRY  = Ext.getCmp(prototype.id + '-cmbCountryFilter').getValue();

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
    setFormatParameterARC: function () {
        me.bean = {};

        // Settlement From
        me.bean.IN_FECHA_FROM = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateFromYearARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromMonthARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromDayARC').getValue()
                );

        // Settlement To
        me.bean.IN_FECHA_TO = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateToYearARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToMonthARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToDayARC').getValue()
                );

        // Additional
        me.bean.IN_SOCIETY = Ext.getCmp(prototype.id + '-typeSocietyARC').getValue() || '';
        me.bean.IN_COMAND = Ext.getCmp(prototype.id + '-cmbComand').getValue() || '';
        me.bean.IN_FILE_NAME = Ext.getCmp(prototype.id + '-txtINameFileARC').getValue() || '';
        me.bean.IN_OPTION = Ext.getCmp(prototype.id + '-cmbInputDateARC').getValue() || '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'searchParamsARC');
    },
    setGridDataARC: function () {
        win.lblUser_toolTip("Estructura: MPF218");
        me.panelActual = '-panelGridDataARC';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchARC'
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
    onViewCSVARC: function (column, e, row, colIndex, x, rowData) {
        let data = rowData.data;
        const filename = data.NAMEFILE;

        if (!filename) {
            Ext.Msg.alert('Error', 'No se encontró el nombre del archivo.');
            return;
        }

        const imageUrl = prototype.url
                + '/getARCImage'
                + '?filename=' + encodeURIComponent(filename);

        Ext.create('Ext.window.Window', {
            title: 'ARC Image Viewer',
            modal: true,
            width: 1300,
            height: 800,
            layout: 'fit',
            items: [{
                    xtype: 'panel',
                    autoScroll: true,
                    bodyStyle: 'background:#000;',
                    items: [{
                            xtype: 'image',
                            src: imageUrl,
                            style: {
                                display: 'block',
                                transform: 'scale(1.4)', // 🔍 nivel de zoom
                                transformOrigin: 'top left', // 🎯 foco arriba izquierda
                                margin: '0'
                            }
                        }]
                }],
            buttons: [{
                    text: 'Close',
                    handler: function (btn) {
                        btn.up('window').close();
                    }
                }]
        }).show();

    },
    onDownloadCSVARC: function (column, e, row, colIndex, x, rowData) {
        let data = rowData.data;

        const datePed = data.PEDARC;
        let filename = data.NAMEFILE; 

        if (!datePed || !filename) {
            Ext.Msg.alert(
                    'Error',
                    'Faltan parámetros para la descarga (Date PED, File Name).'
                    );
            return;
        }

        // PEDARC = YY/MM/DD
        const parts = datePed.split('/');

        if (parts.length !== 3) {
            Ext.Msg.alert('Error', 'Formato de fecha PED inválido: ' + datePed);
            return;
        }

        const year = '20' + parts[0];

        if (!filename.toLowerCase().endsWith('.txt')) {
            filename += '.txt';
        }
        const url = prototype.url + '/getTXTARC'
                + '?year=' + encodeURIComponent(year)
                + '&filename=' + encodeURIComponent(filename);

        console.log('Solicitando:', url);

        global.getFile(url);
    },
    setFormatParameterICCS: function () {
        me.bean = {};

        // Settlement From
        me.bean.IN_FECHA_FROM = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateFromYearICCS').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromMonthICCS').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromDayICCS').getValue()
                );

        // Settlement To
        me.bean.IN_FECHA_TO = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateToYearICCS').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToMonthICCS').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToDayICCS').getValue()
                );

        // Additional
        me.bean.IN_SOCIETY = Ext.getCmp(prototype.id + '-typeSocietyICCS').getValue() || '';
        me.bean.IN_FILE_NAME = Ext.getCmp(prototype.id + '-txtINameFileICCS').getValue() || '';
        me.bean.IN_OPTION = Ext.getCmp(prototype.id + '-cmbInputDateICCS').getValue() || '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'searchParamsARC');
    },
    setGridDataICCS: function () {
        win.lblUser_toolTip("Estructura: MPF304");
        me.panelActual = '-panelGridDataICCS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchICCS'
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
        Ext.getCmp(prototype.id + '-gridDataDetailICCS').bindStore(storeGridDatas);
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
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(searchParams.beanString));
                break;
            case  '-panelGridDataARC':
                global.getFile(prototype.url + '/getXLSXARC?beanString=' + encodeURI(searchParams.beanString));
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
    onDownloadFile: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                var resultByte = res.bytes;
                var bytes = new Uint8Array(resultByte); // pass your byte response to this constructor
                var blob = new Blob([bytes], {type: "application/png"});// change resultByte to bytes

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = me.fileName;
                link.click();
            }
        });

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
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridDataARC':
                me.pagginActual = '-paggin';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
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
    
    
    selectComboFromYearICCS: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYearICCS');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromDayICCS');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonthICCS');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthICCS');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromMonthICCS: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthICCS');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboFromDayARC: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDayICCS');
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
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
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

            case '-panelGridDataICCS': // NUEVO: ICCS
                console.log('ZIP ICCS permitido');
                url = prototype.url + '/getBulkCSVIccs';
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
    updateFilesICCS: function () {
        var me = this;
        
        // Bloqueamos la grilla para que el usuario espere (Ajusta el ID si tu grilla se llama distinto)
        var grid = Ext.getCmp(prototype.id + '-xpanel');
        if (grid) {
            grid.mask('Escaneando archivos en red, por favor espere...');
        }

        Ext.Ajax.request({
            url: prototype.url + '/scanICCSFiles',
            method: 'POST',
            timeout: 600000, 
            success: function (response, options) {
                if (grid) {
                    grid.unmask();
                }
                
                var res = Ext.JSON.decode(response.responseText);

                if (res.success) {
                    Ext.Msg.alert('Proceso Completado', res.message + '<br><br><b>Archivos nuevos registrados:</b> ' + res.totalProcesados);
                    
                    // Opcional: Aquí puedes llamar a tu función de búsqueda para que la grilla se recargue sola
                    // me.onSearch(); 
                } else {
                    // Si el Java mandó success: false por algún catch
                    Ext.Msg.alert('Atención', res.message);
                }
            },
            failure: function (response, options) {
                if (grid) {
                    grid.unmask();
                }
                Ext.Msg.alert('Error', 'Ocurrió un problema de comunicación con el servidor.');
            }
        });
    },
    onDownloadICCS: function (column, e, row, colIndex, x, rowData) {
        let data = rowData.data;
        const ccust = data.CCUST;
        const filename = data.NAMEFILE;
        const yearFile = data.YEARFILE; 

        if (!ccust || !filename || !yearFile) {
            Ext.Msg.alert('Error', 'Faltan parámetros para la descarga (Customer, Filename o Year).');
            return;
        }

        const url = prototype.url + '/getCSVIccs' 
                + '?ccust=' + encodeURIComponent(ccust)
                + '&filename=' + encodeURIComponent(filename)
                + '&yearFile=' + encodeURIComponent(yearFile);

        console.log('Solicitando:', url);

        global.getFile(url);
    }
}
);