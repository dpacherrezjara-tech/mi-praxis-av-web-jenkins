/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.interline.Exchange.ExchangeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ExchangeController',
    fecha: new Date(),
    childs: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        me = this;
        prototype.id = 'ExchangeForm';
        prototype.url = CONTEXTPATH + '/Exchange';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
            // -------------------Eventos Genericos --------------------
            '#ExchangeForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ExchangeForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ExchangeForm-btnClear': {
                click: this.btnClear_click
            },
            '#ExchangeForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ExchangeForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ExchangeForm-btnBack': {
                click: this.btnBack_click
            },
            '#ExchangeForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ExchangeForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ExchangeForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ExchangeForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#ExchangeForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#ExchangeForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#ExchangeForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#ExchangeForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        this.btnSearch_click();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function(obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboFromDay: function(obj) {
        var cmbDateToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        cmbDateToDay.setValue(obj.getValue());
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

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");


        var cmbFacturado = Ext.getCmp(prototype.id + '-cmbFacturado');
        cmbFacturado.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["Y", "Invoice"],
                ["N", "Not Invoice"]
            ]
        }));
        cmbFacturado.setValue("");

    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {
        var bean = {};

        bean.yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        bean.monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        bean.dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        bean.yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        bean.monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        bean.dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        bean.IN_CIA = Ext.getCmp(prototype.id + '-txtCia').getValue();
        bean.strOption = Ext.getCmp(prototype.id + '-cmbFacturado').getValue();

        bean.IN_FECHA_FROM = bean.yearFrom + bean.monthFrom + bean.dayFrom;
        bean.IN_FECHA_TO = bean.yearTo + bean.monthTo + bean.dayTo;

        var beanString = JSON.stringify(bean);
        searchParams = {
            beanString: beanString
        };
    },
    setGridData: function(obj, val) {
        win.lblUser_toolTip("Estructura: A730");
        me.setWidthPie();
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
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
                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

        }
    },
    validateFields: function() {
        var msj = '';
        return msj;
    },
    btnBack_click: function(obj, e) {

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
    btnClear_click: function(obj, e) {

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbFacturado').setValue('');
        Ext.getCmp(prototype.id + '-txtCia').setValue('');

    },
    btnExcel_click: function(obj, e) {

        this.setFormatParameter();
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
                fn: function(btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function() {
        this.setFormatParameter();
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(searchParams.beanString));
                break;
//            case '-panelGridDataByCia':
//                global.getFile(prototype.url + '/getXLSXCia?beanString=' + me.paramsDetail.beanString);
//                break;
//            case '-panelGridDataByReason':
//                global.getFile(prototype.url + '/getXLSXReason?beanString=' + me.paramsDetail.beanString);
//                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function() {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-panelPie').setWidth(ancho);
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
//            case '-panelGridDataByCia':
//                me.pagginActual = '-paggin2';
//                break;
//            case '-panelGridDataByReason':
//                me.pagginActual = '-paggin3';
//                break;
        }
    }
    ,
    /*     
     * Funciones para la paginacion     
     */

    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor1: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#E6FFE6;';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getStringColor1: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:center;background:#E6FFE6;';
        return value;
    },
    getDoubleColor2: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#E0F0FF;';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getStringColor2: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:center;background:#E0F0FF;';
        return value;
    }


});
