/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.BsplinkReportsStatistics.DetailBsplinkReportsStatisticsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailBsplinkReportsStatisticsController',
    bean: {},
    bean2: {},
    beanINI: {},
    urlWin01: '',
    /**
     * Constructor
     */

    init: function(view) {
        var me = this;        

    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        this.setStores();
        Ext.getCmp(prototype.id2 + '-pagginator-01').getCmpPaginator().on('beforechange', this.onPagingBeforeChange01, this);
        this.imgSearch_clickHandler();
    },
    onPagingBeforeChange01: function(obj, page, opts) {
        var store = obj.getStore();
        var totRow = store.getCount() != 0 ? store.totalCount : 0;
        obj.store.proxy.extraParams = {
            beanString: JSON.stringify(this.beanINI),
            totRow: totRow
        };
    },
    imgExcel_clickHandler: function(obj, e) {
        this.imgSearch_clickHandler(true);
    },
    setStores: function() {
        var grid01 = Ext.getCmp(prototype.id2 + '-gridData');
        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: this.urlWin01 + '/SearchReportDetail/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            //autoLoad: true,
            pageSize: 20
        });
        grid01.setStore(store01);
        /**
         * Se asigna data stores a paginadores
         */
        Ext.getCmp(prototype.id2 + '-pagginator-01').setStore(store01);

    },
    initial_date: function(data, ComboBy,Currency,url) {
        this.urlWin01 = Ext.String.trim(url);
        this.beanINI.IN_OPTION = ComboBy;
        this.beanINI.IN_A3389FAPPI = data.A3389FAPPI;
        this.beanINI.IN_A3389FAUTHORISE = "";
        this.beanINI.IN_A3389REJECT = "";
        this.beanINI.IN_A3389PENDING = "";
        this.beanINI.IN_A3389MDA = Currency;
        this.beanINI.IN_A3389PAIS = data.A3389PAIS;
        this.beanINI.IN_A3389IATA = data.A3389IATA;
        this.beanINI.IN_A3389REGAS = data.A3389REGAS;
        this.beanINI.pexcel = Ext.getCmp(prototype.id2 + '-pagination').getValue() ? 0 : 1;
    },
    initial_authorise: function(data, ComboBy,Currency,url) {
         this.urlWin01 = Ext.String.trim(url);
        this.beanINI.IN_OPTION = ComboBy;
        this.beanINI.IN_A3389FAPPI = data.A3389FAPPI;
        this.beanINI.IN_A3389FAUTHORISE = "F";
        this.beanINI.IN_A3389REJECT = "";
        this.beanINI.IN_A3389PENDING = "";
        this.beanINI.IN_A3389MDA = Currency;
        this.beanINI.IN_A3389PAIS = data.A3389PAIS;
        this.beanINI.IN_A3389IATA = data.A3389IATA;
        this.beanINI.IN_A3389REGAS = data.A3389REGAS;
        this.beanINI.pexcel = Ext.getCmp(prototype.id2 + '-pagination').getValue() ? 0 : 1;
        //this.imgSearch_clickHandler();
    },
    searchform_reject: function(data, ComboBy,Currency,url) {
         this.urlWin01 = Ext.String.trim(url);
        this.beanINI.IN_OPTION = ComboBy;
        this.beanINI.IN_A3389FAPPI = data.A3389FAPPI;
        this.beanINI.IN_A3389FAUTHORISE = "";
        this.beanINI.IN_A3389REJECT = "R";
        this.beanINI.IN_A3389PENDING = "";
        this.beanINI.IN_A3389MDA = Currency;
        this.beanINI.IN_A3389PAIS = data.A3389PAIS;
        this.beanINI.IN_A3389IATA = data.A3389IATA;
        this.beanINI.IN_A3389REGAS = data.A3389REGAS;
        this.beanINI.pexcel = Ext.getCmp(prototype.id2 + '-pagination').getValue() ? 0 : 1;
        //this.imgSearch_clickHandler();
    },
    searchform_pending: function(data, ComboBy,Currency,url) {
        this.urlWin01 = Ext.String.trim(url);
        this.beanINI.IN_OPTION = ComboBy;
        this.beanINI.IN_A3389FAPPI = data.A3389FAPPI;
        this.beanINI.IN_A3389FAUTHORISE = "";
        this.beanINI.IN_A3389REJECT = "";
        this.beanINI.IN_A3389PENDING = "P";
        this.beanINI.IN_A3389MDA = Currency;
        this.beanINI.IN_A3389PAIS = data.A3389PAIS;
        this.beanINI.IN_A3389IATA = data.A3389IATA;
        this.beanINI.IN_A3389REGAS = data.A3389REGAS;
        this.beanINI.pexcel = Ext.getCmp(prototype.id2 + '-pagination').getValue() ? 0 : 1;
        //this.imgSearch_clickHandler();
    },
    imgSearch_clickHandler: function(obj, records, eOpts) {
        this.SearchReportDetail(this.beanINI, obj === true ? obj : false);
    },
    onCloseClick: function(btn) {
        this.view.close();
    },
    imgSearch_clickChkChange: function() {
        this.bean2.IN_OPTION = this.beanINI.IN_OPTION;
        this.bean2.IN_A3389FAPPI = this.beanINI.IN_A3389FAPPI;
        this.bean2.IN_A3389FAUTHORISE = this.beanINI.IN_A3389FAUTHORISE;
        this.bean2.IN_A3389REJECT = this.beanINI.IN_A3389REJECT;
        this.bean2.IN_A3389PENDING = this.beanINI.IN_A3389PENDING;
        this.bean2.IN_A3389MDA = this.beanINI.IN_A3389MDA;
        this.bean2.IN_A3389PAIS = this.beanINI.IN_A3389PAIS;
        this.bean2.IN_A3389IATA = this.beanINI.IN_A3389IATA;
        this.bean2.IN_A3389REGAS = this.beanINI.IN_A3389REGAS;
        this.bean2.pexcel = Ext.getCmp(prototype.id2 + '-pagination').getValue() ? 0 : 1;
         this.SearchReportDetail(this.bean2); 
    },
    onPaginationChkChange: function(obj, newValue, oldValue, eOpts) {
        //Ext.getCmp(prototype.id2 + '-btn-search').fireEvent('click', {});//imgSearch_clickHandler
        if (!newValue) {
            this.imgSearch_clickChkChange();
            Ext.getCmp(prototype.id2 + '-pagginator-01').disable();
            Ext.getCmp(prototype.id2 + '-lbl-currentPage').hide();
            Ext.getCmp(prototype.id2 + '-lbl-pageCount').hide();
        } else {
            this.imgSearch_clickChkChange();
            Ext.getCmp(prototype.id2 + '-pagginator-01').enable();
            Ext.getCmp(prototype.id2 + '-lbl-currentPage').show();
            Ext.getCmp(prototype.id2 + '-lbl-pageCount').show();
        }
    },
    SearchReportDetail: function(bean, bExcel) {
        if (bExcel) {
            me.exportExcel(this.urlWin01 + '/getXLSXdetail?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {

            Ext.getCmp(prototype.id2 + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.id2 + '-gridData').getStore().loadPage(1, {
                params: {
                    beanString: JSON.stringify(bean)
                            //beanString: bean

                }, callback: function(records, operation, success) {
                    /*if (records.length !== 0) {
                    } else {
                        global.Msg({msg: "Data not found.", icon: 2, fn: function() {
                            }});

                    }*/

                }
            });
        }



    },
    exportExcel: function(_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
    },
    onExcelClick: function(obj, e) {
        this.imgSearch_clickHandler();
    },
    onFilterClick: function() {
        var option = Ext.getCmp(prototype.id2 + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    onRendererColumntdAttr: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value
    }
});



