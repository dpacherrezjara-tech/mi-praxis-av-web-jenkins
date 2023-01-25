/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.AccountedAmountsInvoiced.AccountedAmountsInvoicedController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountedAmountsInvoicedController',
    flightNumber: '',
    carrier: '',
    searchParams: {},
    me: '',
    setContext: function () {
        me = this;
    },
    init: function(view) {
        prototype.id = 'AccountedAmountsInvoicedForm';
        prototype.url = CONTEXTPATH + '/AccountedAmountsInvoiced';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#AccountedAmountsInvoicedForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#AccountedAmountsInvoicedForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AccountedAmountsInvoicedForm-btnClear': {
                click: this.btnClear_click
            },
            '#AccountedAmountsInvoicedForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AccountedAmountsInvoicedForm-btnBack': {
                click: this.btnBack_click
            },
            '#AccountedAmountsInvoicedForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#AccountedAmountsInvoicedForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AccountedAmountsInvoicedForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AccountedAmountsInvoicedForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AccountedAmountsInvoicedForm-btn-pag-last': {
                click: this.pagLast
            }

        });
    },
    xpanel_afterrender: function(obj, e) {
        //this.btnSearch_click();
        this.setStoreData();//Cloud9
    },
    setStoreData: function() {
        var cbxType = Ext.getCmp(prototype.id + '-cbxType');
        cbxType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["1", "All"],
                ["2", "Differences"]
            ]}));
        cbxType.setValue("1");
    },
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {
        var IN_A2559CCUST = '139';
        var IN_FINI = Ext.getCmp(prototype.id + '-txtDateFrom').getValue();
        var IN_FFIN = Ext.getCmp(prototype.id + '-txtDateTo').getValue();
        var IN_A2559MODO = Ext.getCmp(prototype.id + '-cbxType').getValue();
        var IN_PARAM;

        IN_FFIN = Ext.util.Format.date(IN_FFIN, 'Ymd');
        IN_FINI = Ext.util.Format.date(IN_FINI, 'Ymd');
        IN_PARAM = IN_FINI + IN_FFIN;
        searchParams = {
            IN_A2559CCUST: IN_A2559CCUST,
            IN_FINI: IN_FINI,
            IN_FFIN: IN_FFIN,
            IN_A2559MODO: IN_A2559MODO,
            IN_PARAM: IN_PARAM
        };
        console.log("-------------Parametros enviados-----------");
        console.log("IN_A2559CCUST : " + searchParams.IN_A2559CCUST);
        console.log("IN_FINI : " + searchParams.IN_FINI);
        console.log("IN_FFIN : " + searchParams.IN_FFIN);
        console.log("IN_A2559MODO : " + searchParams.IN_A2559MODO);
        console.log("IN_PARAM : " + searchParams.IN_PARAM);
        console.log("-------------------------------------------");
    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.AccountedAmountsInvoiced.GridData', {
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
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtDateTo').setValue('');
        Ext.getCmp(prototype.id + '-cbxType').setValue('1');
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
        this.setParams();
        global.getFile(prototype.url + '/getXLSX?IN_A2559CCUST=' + searchParams.IN_A2559CCUST
                + '&IN_FINI=' + searchParams.IN_FINI
                + '&IN_FFIN=' + searchParams.IN_FFIN
                + '&IN_A2559MODO=' + searchParams.IN_A2559MODO
                + '&IN_PARAM=' + searchParams.IN_PARAM
                );
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
    btnBack_click: function(obj, e) {
        global.showMenu();
    },
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
    }
});
