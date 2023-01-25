/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryErrorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryErrorController',
    urlWin01: CONTEXTPATH + '/SalesReport',
    bean: {},
    bean2: {},
    beanINI: {},
    /**
     * Constructor
     */

    init: function (view) {
        var me = this;

    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStores();
        Ext.getCmp(prototype.iderr + '-pagginator-01').getCmpPaginator().on('beforechange', this.onPagingBeforeChange01, this);
        this.imgSearch_clickHandler();
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var store = obj.getStore();
        var totRow = store.getCount() !== 0 ? store.totalCount : 0;
        obj.store.proxy.extraParams = {
            beanString: JSON.stringify(this.beanINI),
            totRow: totRow
        };
    },
    imgExcel_clickHandler: function (obj, e) {
        this.imgSearch_clickHandler(true);
    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.iderr + '-gridDataError');
        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: this.urlWin01 + '/loadError/',
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
        Ext.getCmp(prototype.iderr + '-pagginator-01').setStore(store01);

    },

    imgSearch_clickHandler: function (obj, records, eOpts) {
        this.imgSearch_clickChkChange();//SearchReportDetail(this.beanINI, obj === true ? obj : false);
    },
    onCloseClick: function (btn) {
        this.view.close();
    },
    imgSearch_clickChkChange: function () {
        var me = this;
        var p = me.view.params;
        var data = p.data;
        me.bean2.IN_A1724CCUST = data.A1530CCUST;
        me.bean2.IN_A1724GRUPO = data.A1530GRUPO;
        me.bean2.IN_A1724FUENT = data.A1530FUENT;
        this.bean2.pexcel = Ext.getCmp(prototype.iderr + '-pagination').getValue() ? 0 : 1;
        this.SearchReportDetail(me.bean2);
    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        //Ext.getCmp(prototype.iderr + '-btn-search').fireEvent('click', {});//imgSearch_clickHandler
        if (!newValue) {
            this.imgSearch_clickChkChange();
            Ext.getCmp(prototype.iderr + '-pagginator-01').disable();
            Ext.getCmp(prototype.iderr + '-lbl-currentPage').hide();
            Ext.getCmp(prototype.iderr + '-lbl-pageCount').hide();
        } else {
            this.imgSearch_clickChkChange();
            Ext.getCmp(prototype.iderr + '-pagginator-01').enable();
            Ext.getCmp(prototype.iderr + '-lbl-currentPage').show();
            Ext.getCmp(prototype.iderr + '-lbl-pageCount').show();
        }
    },
    SearchReportDetail: function (bean, bExcel) {
        if (bExcel) {
            var me = this;
            me.exportExcel(this.urlWin01 + '/getXLSXdetail?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {

            Ext.getCmp(prototype.iderr + '-gridDataError').getStore().removeAll();
            Ext.getCmp(prototype.iderr + '-gridDataError').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        //Ext.getCmp( prototype.iderr + '-lblRowsTotalADM').setText(records[0].data.page.TOTROW);
                    } else {
                        //Ext.getCmp( prototype.iderr + '-lblRowsTotalADM').setText('0');
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }

                }
            });
        }



    },
    exportExcel: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
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
    onExcelClick: function (obj, e) {
        this.imgSearch_clickHandler();
    },
    onFilterClick: function () {
        var option = Ext.getCmp(prototype.iderr + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    onClickBtnSearch: function () {
        var me = this;
        me.bean2.pexcel = Ext.getCmp(prototype.iderr + '-pagination').getValue() ? 0 : 1;
        this.SearchReportDetail(me.bean2);
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.sales.SalesReportForm.DataDetailEntryError({
            params: {
                rec: rec
            }
        });
        win.show();
    }
});



