/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.DataIntegrity.DataIntegrityController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataIntegrityController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanSubmission: {},
    beanSummary: {},
    beanSettlement: {},
    beanTransaction: {},
    beanPricing: {},
    beanDay: {},
    beanMerchant: {},
    beanBankS: {},
    beanDayByS: {},
    beanMerchantByS: {},
    beanByMerchant: {},
    beanSettlementTktsDetail: {},
    beanFilterSettlement: {},
    bean_warning: {},
    bean_ErrorCodesRecSett: {},
    bean_ErrorCodesRecSumm: {},
    optionCheck: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    reg99: 0,
    me: '',
    searchParams: {},
    paramsDetail: {},
    paramsDetailSummary: {},
    paramsDetailTaxes: {},
    paramsDetailChargeback: {},
    paramsDetailSubmission: {},
    paramsDetailTransaction: {},
    paramsDetailDetTktSettlement: {},
    paramsDetailPricing: {},
    searchParamsMainSettlement: {},
    searchParamsXlsMainSettlement: {},
    paramsDetailSettlement: {},
    paramsDetailDetSettlement: {},
    searchParamsFilterSettlement: {},
    dataObtain: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'DataIntegrityForm';
        prototype.url = CONTEXTPATH + '/DataIntegrity';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#DataIntegrityForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#DataIntegrityForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#DataIntegrityForm-btnClear': {
                click: this.btnClear_click
            },
            '#DataIntegrityForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#DataIntegrityForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#DataIntegrityForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#DataIntegrityForm-btnEmail': {
                click: this.btnEmail_click
            },
            '#DataIntegrityForm-btnBack': {
                click: this.btnBack_click
            },
            '#DataIntegrityForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#DataIntegrityForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#DataIntegrityForm-btn-pag-next': {
                click: this.pagNext
            },
            '#DataIntegrityForm-btn-pag-last': {
                click: this.pagLast
            },
            '#DataIntegrityForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#DataIntegrityForm-cmbDateFromMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#DataIntegrityForm-cmbDateToMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#DataIntegrityForm-cmbDateFromDay': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromDay
            },
            '#DataIntegrityForm-checkSettlement': {
                change: this.checkEvent
            },
        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
        this.btnSearch_click();
    },
    eventKey: function (e, eOpts) {
        /*if (eOpts.getKey() === 13) {
         this.btnSearch_click();
         }*/
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    obtainData: function () {

        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        //month = '05';

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');

        var cmbDateSel = Ext.getCmp(prototype.id + '-cmbDateSel');
        cmbDateSel.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["PRDA", "Processing Date"],
                ["PAYDATE", "Payment Date"]
            ]
        }));
        cmbDateSel.setValue("PRDA");
    },
    setFormatParameter: function () {
        me.bean = {};

        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue(); //+ Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();// + Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        me.bean.IN_DATETYPE = Ext.getCmp(prototype.id + '-cmbDateSel').getValue();

        console.log(me.bean);
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
        this.setGridDataMainSummary();
    },
    setGridDataMainSummary: function () {
        win.lblUser_toolTip("Estructura: MPF102");
        me.panelActual = '-boxMainSummary';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchMainSummary'
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
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var data = obj.data.items[0].data;
//                        console.log(obj);
                        if (data.IN_DATETYPE === "PAYDATE") {
                            Ext.getCmp(prototype.id + '-msDate').setText('Payment');
                        } else {
                            Ext.getCmp(prototype.id + '-msDate').setText('Processing');
                        }

                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMainSummary').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataMainSummary').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    onGridDetDaySummary: function (column, e, row, column, x, rowData) {

        var data = x.record.data;
        me.bean = {};
        me.bean.IN_FECHA = data.strFecFiltro;
        me.bean.IN_DATETYPE = data.IN_DATETYPE;
        me.bean.SCOUNTRY = data.SCOUNTRY;
        me.bean.SCURRENCY = data.SCURRENCY;

        console.log(me.bean);
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        this.setGridDataDaySummary(searchParams);
    },
    setGridDataDaySummary: function (searchParams) {
        win.lblUser_toolTip("Estructura: MPF102");

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDaySummary';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDaySummary'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var data = obj.data.items[0].data;
//                        console.log(obj);
                        if (data.IN_DATETYPE === "PAYDATE") {
                            Ext.getCmp(prototype.id + '-msDateDay').setText('Payment');
                        } else {
                            Ext.getCmp(prototype.id + '-msDateDay').setText('Processing');
                        }

                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDaySummary').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-gridDataDaySummary').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);

    },
    onGridDetSummaryMPF101: function (column, e, row, column, x, rowData) {

        var data = x.record.data;
        me.bean = {};
        me.bean.IN_FECHA = data.strFecFiltro;
        me.bean.IN_DATETYPE = data.IN_DATETYPE;
        me.bean.SCOUNTRY = data.SCOUNTRY;
        me.bean.SCURRENCY = data.SCURRENCY;

        console.log(me.bean);
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        this.setGridDataDaySummaryMPF101(searchParams);
    },
    setGridDataDaySummaryMPF101: function (searchParams) {
        win.lblUser_toolTip("Estructura: MPF101");

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDaySummaryMPF101';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDaySummaryMPF101'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    var pag = Ext.getCmp(prototype.id + '-paggin3');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var data = obj.data.items[0].data;
//                        console.log(obj);
                        if (data.IN_DATETYPE === "PAYDATE") {
                            Ext.getCmp(prototype.id + '-msDateDayMPF101').setText('Payment');
                        } else {
                            Ext.getCmp(prototype.id + '-msDateDayMPF101').setText('Processing');
                        }

                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDaySummaryMPF101').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-gridDataDaySummary').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);

    },
    onGridDetSummaryMerchant: function (column, e, row, column, x, rowData) {

        var data = x.record.data;
        me.bean = {};
        me.bean.IN_FECHA = data.strFecFiltro;
        me.bean.IN_DATETYPE = data.IN_DATETYPE;
        me.bean.SCOUNTRY = data.SCOUNTRY;
        me.bean.SCURRENCY = data.SCURRENCY;
        me.bean.MERCHNC = data.MERCHNC;

        console.log(me.bean);
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        this.setGridDataDaySummaryMerchant(searchParams);
    },
    setGridDataDaySummaryMerchant: function (searchParams) {
        win.lblUser_toolTip("Estructura: MPF101");

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDaySummaryMerchant';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDaySummaryMerchant'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    var pag = Ext.getCmp(prototype.id + '-paggin4');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var data = obj.data.items[0].data;
//                        console.log(obj);
                        if (data.IN_DATETYPE === "PAYDATE") {
                            Ext.getCmp(prototype.id + '-msDateDayMerchant').setText('Payment');
                        } else {
                            Ext.getCmp(prototype.id + '-msDateDayMerchant').setText('Processing');
                        }

                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDaySummaryMerchant').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-gridDataDaySummary').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);

    },
    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function () {

    },
    btnBack_click: function (obj, e) {
        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.setWidthPie();
            this.getPaggin();
            if (me.pagginActual !== '') {
                console.log(me.pagginActual);
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
        /*Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
         Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
         Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
         Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
         Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
         Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');*/

    },
    btnExcel_click: function (obj, e) {

        //this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
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
        }
    },
    exportExcel: function () {
        this.setFormatParameter();
        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-boxMainSummary':
                global.getFile(prototype.url + '/getXLSXMainSummary?beanString=' + searchParams.beanString);
                break;
            case  '-boxDaySummary':
                global.getFile(prototype.url + '/getXLSXDaySummary?beanString=' + searchParams.beanString);
                break;
        }
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {

        console.log(me.panelActual);
        if (me.panelActual === '-boxMainSummary' || me.panelActual === '-boxDaySummary' || me.panelActual === '-boxDaySummaryMPF101' || me.panelActual === '-boxDaySummaryMerchant') {
            var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
            Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
            Ext.getCmp(prototype.id + '-pie').setVisible(true);
        } else {
            Ext.getCmp(prototype.id + '-pie').setVisible(false);
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case '-boxMainSummary':
                me.pagginActual = '-paggin';
                break;
            case '-boxDaySummary':
                me.pagginActual = '-paggin2';
                break;
            case '-boxDaySummaryMPF101':
                me.pagginActual = '-paggin3';
                break;
            case '-boxDaySummaryMerchant':
                me.pagginActual = '-paggin4';
                break;
        }
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