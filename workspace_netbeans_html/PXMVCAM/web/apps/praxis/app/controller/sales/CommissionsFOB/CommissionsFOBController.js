/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.CommissionsFOB.CommissionsFOBController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CommissionsFOBController',
    fecha: new Date(),
    paginTem: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    strTipo: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'CommissionsFOBForm';
        prototype.url = CONTEXTPATH + '/CommissionsFOB';
        me = this;
        me.gridActual = '-gridData';
        this.control({
            // -------------------Eventos Genericos --------------------
            '#CommissionsFOBForm-xpanel': {
                //afterrender: this.xpanel_afterrender
            },
            '#CommissionsFOBForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CommissionsFOBForm-btnClear': {
                click: this.btnClear_click
            },
            '#CommissionsFOBForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CommissionsFOBForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#CommissionsFOBForm-btnBack': {
                click: this.btnBack_click
            },
            '#CommissionsFOBForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CommissionsFOBForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CommissionsFOBForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CommissionsFOBForm-btn-pag-last': {
                click: this.pagLast
            }
            //-----------------Eventos Especificos -------------------            
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.showGridActual();
        this.btnSearch_click();
    },
    showGridActual: function() {
        this.hideAllGrid();
        switch (me.gridActual) {
            case  '-gridData':
                Ext.getCmp(prototype.id + '-pie').show();
                break;
            case '-gridDataDetail':
                Ext.getCmp(prototype.id + '-pie').hide();
                break;
        }

        Ext.getCmp(prototype.id + this.gridActual).show();
    },
    hideAllGrid: function() {
        Ext.getCmp(prototype.id + '-gridData').hide();
        Ext.getCmp(prototype.id + '-gridDataDetail').hide();
    },
    btnSearch_click: function(obj, e) {

        this.setFormatParameter();

        me.drillDown = [];
        me.gridActual = '-gridData';
        this.showGridActual();
        this.setGridData(obj, e);


    },
    setFormatParameter: function() {

        var IN_A1880CCUST = '139';
        var IN_A1880FECHA = Ext.getCmp(prototype.id + '-txtDate').getValue();
        IN_A1880FECHA = Ext.util.Format.date(IN_A1880FECHA, 'Ymd');

        searchParams = {
            IN_A1880CCUST: IN_A1880CCUST,
            IN_A1880FECHA: IN_A1880FECHA
        };
//        console.log("IN_A1880CCUST : " + IN_A1880CCUST);
//        console.log("IN_A1880FECHA : " + IN_A1880FECHA);
    },
    setGridData: function(obj, val) {
        
        //alert("cargando datos");

        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.CommissionsFOB.GridData', {
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
    setGridDataDetail: function() {

        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.CommissionsFOB.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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

    },
    onSetGridDataDetail: function(obj, metaData, rowNum, column, obj2, rowData) {

        me.drillDown.push(me.gridActual);
        me.gridActual = '-gridDataDetail';
        this.showGridActual();
        var data = rowData.data;
        var A1880FFACT = data.A1880FFACT.replace('/', '').replace('/', '');

        me.paramsDetail = {
            IN_A1881CCUST: data.A1880CCUST,
            IN_A1881NFACT: data.A1880NFACT,
            IN_A1881FECHA: A1880FFACT
        };

        this.setGridDataDetail();

    },
    btnBack_click: function(obj, e) {

        if (me.drillDown.length > 0) {
            me.gridActual = me.drillDown.pop();
            this.showGridActual();
            this.getPaggin();
            var pag = Ext.getCmp(prototype.id + me.pagginActual);
            var pagData = pag.getPageData();
            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
            Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
        } else {
            global.showMenu();
        }
    }, 
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtDate').setValue("");
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

        switch (me.gridActual) {
            case  '-gridData':
                global.getFile(prototype.url + '/getXLSX?IN_A1880CCUST=' + searchParams.IN_A1880CCUST
                        + '&IN_A1880FECHA=' + searchParams.IN_A1880FECHA);
                break;

            case '-gridDataDetail':
                global.getFile(prototype.url + '/getDetailXLSX?IN_A1881CCUST=' + me.paramsDetail.IN_A1881CCUST
                        + '&IN_A1881NFACT=' + me.paramsDetail.IN_A1881NFACT
                        + '&IN_A1881FECHA=' + me.paramsDetail.IN_A1881FECHA
                        );
                break;
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
    /*     
     * Funciones para la paginacion     
     */
    getPaggin: function() {
        switch (me.gridActual) {
            case  '-gridData':
                me.pagginActual = '-paggin';
                break;
            case '-gridDataDetail':
                me.pagginActual = '-paggin2';
                break;
        }
    },
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
    }
});
