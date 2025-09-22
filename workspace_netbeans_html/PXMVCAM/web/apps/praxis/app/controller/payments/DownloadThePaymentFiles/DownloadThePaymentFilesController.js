
Ext.define('Ext.Praxis.controller.payments.DownloadThePaymentFiles.DownloadThePaymentFilesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DownloadThePaymentFilesController',
    childs: '5',
    bean: '',
    paginActual: '',
    gridActual: '',
    panelActual: '',
    reg99: 0,
    me: '',

    dup: '',
    searchParams: {},
    beanDownload: {},
    dataGrid: [],
    beanTMP: {},
    beanEXCEL: {},

    init: function (view) {
        me = this;
        prototype.id = 'DownloadThePaymentFilesForm';
        prototype.url = CONTEXTPATH + '/DownloadThePaymentFiles';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#DownloadThePaymentFilesForm-xpanel': {
                afterrender: me.xpanel_afterrender
            },
            '#DownloadThePaymentFilesForm-btnSearch': {
                click: this.onSearchClick
            },
            '#DownloadThePaymentFilesForm-btnClear': {
                click: this.btnClear_click
            },
            '#DownloadThePaymentFilesForm-btnExcel': {
                click: this.btnExcel_click
            }
        });
    },

    xpanel_afterrender: function (obj, e) {
        this.obtainData();
        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.onSearchClick();
        }
    },

    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },

    obtainData: function () {
        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        var CmbTypeprocesa = Ext.getCmp(prototype.id + '-CmbTypeprocesa');

        //
        cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "System date"],
                ["2", "Execution date"]
            ]
        }));
        cmbFecFiltro.setValue("1");
        //
        CmbTypeprocesa.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "ALL"],
                ["PSE", "PSE"],
                ["CRDO", "Credomatic"],
                ["WOIQ", "Worldpay IQ"],
                ["ECAD", "Elavon CAD"],
                ["EEUR", "Elavon EUR"],
                ["PBDI", "PB-DINERS"],
                ["PBPV", "PB-PVA"],
                ["SAFE", "SAFETYPAY"],
                ["CODE", "CODENSA"]
            ]
        }));
        CmbTypeprocesa.setValue("");
        //
        var grid01 = Ext.getCmp(prototype.id + '-gridDataMain');
        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/DowloadFilesPayment/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            //autoLoad: true,
            pageSize: 25
        });
        grid01.setStore(store01);
        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store01);     

    },
    onCmbSearchChange: function (obj, records, eOpts) {
        if (obj.getValue() === "1" || obj.getValue() === "2") {
            Ext.getCmp(prototype.id + '-txtFilterDateFrom').show();
            Ext.getCmp(prototype.id + '-txtFilterDateTo').show();
        } else {
            Ext.getCmp(prototype.id + '-txtFilterDateFrom').show();
            Ext.getCmp(prototype.id + '-txtFilterDateTo').show();
        }
    },
    onRendererColumnOnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A4719ESTAT'))) {
            case 'P':
                value = 'yellow';
                break;
            case 'D':
                value = 'silver';
                break;
            case 'N':
                value = 'silver';
                break;
            case 'A':
                value = 'green';
                break;
            case 'C':
                value = 'orange';
                break;
            case 'F':
                value = 'mediumpurple';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    onSearchClick: function (btn) {
        var me = this;
        var grid01 = Ext.getCmp(prototype.id + '-gridDataMain');
        var store01 = grid01.getStore();
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var CmbTypeprocesa = Ext.getCmp(prototype.id + '-CmbTypeprocesa').getValue();
        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();

        me.beanTMP.IN_OPTION = cmbFecFiltro;
        me.beanTMP.IN_TYPEPROCES = CmbTypeprocesa;
        me.beanTMP.IN_DATETO = txtFilterDateTo;
        me.beanTMP.IN_DATEFROM = txtFilterDateFrom;
        store01.loadPage(1, {
            params: me.beanTMP,
            callback: function (records, operation, success) {

            }
        });
    },
    btnExcel_click: function (obj, e) {
        var me = this;
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue();
        var CmbTypeprocesa = Ext.getCmp(prototype.id + '-CmbTypeprocesa').getValue();
        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();

        if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) !== '' &&
                Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) !== '') {
            if (this.compareDate(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue(), Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue())) {
                Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');
                return;
            }
        }
        me.beanEXCEL.IN_OPTION = cmbFecFiltro;
        me.beanEXCEL.IN_TYPEPROCES = CmbTypeprocesa;
        me.beanEXCEL.IN_DATETO = txtFilterDateTo;
        me.beanEXCEL.IN_DATEFROM = txtFilterDateFrom;

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(me.beanEXCEL)));
                }
            }
        });
    },

    setFormatParameter: function () {
        me.bean = {};

        me.bean.IN_DATE_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        me.bean.IN_DATE_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        //me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        //me.bean.IN_SPAYMENT = Ext.getCmp(prototype.id + '-cmbSPAYMENT').getValue();
        me.bean.IN_TKT = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        me.bean.IN_ADMNUM = Ext.getCmp(prototype.id + '-txtADMNUM').getValue();
//        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtSAGENT').getValue();
//        me.bean.IN_SAUTHOC = Ext.getCmp(prototype.id + '-txtSAUTHOC').getValue();
//        me.bean.IN_SPNR = Ext.getCmp(prototype.id + '-txtSPNR').getValue().trim();
//        me.bean.IN_SCARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue().trim();
//        me.bean.IN_SCARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue().trim();


        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        console.log(searchParams, 'searchParamss');

    },

    btnSearch_click: function (obj, e) {
        this.setFormatParameter();  //obtengo los Parametros
        if (Ext.getCmp(prototype.id + '-txtTKT').getValue() != '' || Ext.getCmp(prototype.id + '-txtADMNUM').getValue() != '') {
            this.setGridDataDetail()
        } else {
            this.setGridData();
        }
    },
    setGridData: function () {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataMain'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        win.lblUser_toolTip("Estructura: MPF100");
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'  //ES LA RUTA // CONECTO AL JAVA
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
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

                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataMain').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },

    setGridDataDetail: function () {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDet'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        win.lblUser_toolTip("Estructura: MPF100");
        me.setWidthPie();

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetail'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                        var pag = Ext.getCmp(prototype.id + '-paggin5');
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
                            Ext.getCmp(prototype.id + '-gridDataDet').setTitle('<center style="font-size:11px;">' + data.strTitulo + '</center>');
//                            win.setText('lblTittleByDayS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDet').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
        }
    },

    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams =  me.beanTM;
    },
    viewDataEntry_clickHandler: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        if (Ext.String.trim(rec.data.A4719ESTAT) === 'A') {
            var type = '';
            if (Ext.String.trim(rec.data.A4719TYPE) === 'PBPV') {
                type = 'PRODUBANCO/ECUADOR/PVA';
            } else if (Ext.String.trim(rec.data.A4719TYPE) === 'PSE') {
                type = 'PSE';
            } else if (Ext.String.trim(rec.data.A4719TYPE) === 'CRDO') {
                type = 'CREDOMATIC';
            } else if (Ext.String.trim(rec.data.A4719TYPE) === 'PBDI') {
                type = 'PRODUBANCO/ECUADOR/Diners';
            } else if (Ext.String.trim(rec.data.A4719TYPE) === 'WOIQ') {
                type = 'WPIQ';
            } else if (Ext.String.trim(rec.data.A4719TYPE) === 'CODE') {
                type = 'CODE';
            } else if (Ext.String.trim(rec.data.A4719TYPE) === 'SAFE') {
                type = 'SAFE';
            } else {
                type = Ext.String.trim(rec.data.A4719TYPE);
            }




            me.beanDownload.IN_DATETO = rec.data.A4719FCARG;
            me.beanDownload.IN_TYPEPROCES = rec.data.A4719TYPE;
            me.beanDownload.IN_PROCESADOR = type;
            me.exportFiles(prototype.url + '/DownloadFiles_python?beanString=' + encodeURI(JSON.stringify(me.beanDownload)));
        } else {
            Ext.Msg.alert('.: PRAXIS :.', 'The process status must be completed in order to perform the download.');
            return;
        }

    },
    exportFiles: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Files zip ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
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
        Ext.getCmp(prototype.id + '-CmbTypeprocesa').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-cmbFecFiltro').setValue('1');
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        if (ancho > 650) {
            Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        } else {
            Ext.getCmp(prototype.id + '-pie').setWidth(800);
        }
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridDataMain':
                me.pagginActual = '-paggin';
                break;
        }
    },
    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        obj.setValue('01');
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
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