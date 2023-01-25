/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryErrorDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryErrorDetailController',
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
        Ext.getCmp(prototype.ideterr + '-pagginator-01').getCmpPaginator().on('beforechange', this.onPagingBeforeChange01, this);
        this.imgSearch_clickHandler();
    },
    onClickBtnSearch: function () {
        var me = this;
        me.bean2.pexcel = Ext.getCmp(prototype.ideterr + '-pagination').getValue() ? 0 : 1;
        this.SearchReportDetail(me.bean2);
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
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
        var grid01 = Ext.getCmp(prototype.ideterr + '-gridDetailError');
        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: this.urlWin01 + '/detailloadError/',
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
        Ext.getCmp(prototype.ideterr + '-pagginator-01').setStore(store01);

    },
    imgSearch_clickHandler: function (obj, records, eOpts) {
        this.imgSearch_clickChkChange();
        //this.SearchReportDetail(this.beanINI, obj === true ? obj : false);
    },
    onCloseClick: function (btn) {
        this.view.close();
    },
    imgSearch_clickChkChange: function () {
        var me = this;
        var rec = me.view.params.rec;
        me.bean2.IN_OPCION = "1",
                me.bean2.Grupo = rec.data.A1724GRUPO;
        me.bean2.Transaction = rec.data.A1724TRANS;
        me.bean2.TError = rec.data.A1272COD;
        me.bean2.Document = '';
        this.bean2.pexcel = Ext.getCmp(prototype.ideterr + '-pagination').getValue() ? 0 : 1;
        this.SearchReportDetail(me.bean2);
    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        //Ext.getCmp(prototype.ideterr + '-btn-search').fireEvent('click', {});//imgSearch_clickHandler
        if (!newValue) {
            this.imgSearch_clickChkChange();
            Ext.getCmp(prototype.ideterr + '-pagginator-01').disable();
            Ext.getCmp(prototype.ideterr + '-lbl-currentPage').hide();
            Ext.getCmp(prototype.ideterr + '-lbl-pageCount').hide();
        } else {
            this.imgSearch_clickChkChange();
            Ext.getCmp(prototype.ideterr + '-pagginator-01').enable();
            Ext.getCmp(prototype.ideterr + '-lbl-currentPage').show();
            Ext.getCmp(prototype.ideterr + '-lbl-pageCount').show();
        }
    },
    SearchReportDetail: function (bean, bExcel) {
        if (bExcel) {
            var me = this;
            me.exportExcel(this.urlWin01 + '/getXLSXdetail?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {

            Ext.getCmp(prototype.ideterr + '-gridDetailError').getStore().removeAll();
            Ext.getCmp(prototype.ideterr + '-gridDetailError').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        //Ext.getCmp( prototype.ideterr + '-lblRowsTotalADM').setText(records[0].data.page.TOTROW);
                    } else {
                        //Ext.getCmp( prototype.ideterr + '-lblRowsTotalADM').setText('0');
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
        var option = Ext.getCmp(prototype.ideterr + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        rec = rec === null || rec === undefined ? {} : rec;
        switch (Ext.String.trim(rec.data.A720TRNCU)) {
            case "SALE":
            case "EXCH":
                var dataEntryTkt = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryTkt', {
                    id: prototype.idGr + '-dataEntryTkt',
                    params: {
                        rec: rec
                    }
                });
                dataEntryTkt.show();
                break;
            case "RFND":
                var dataEntryRfnd = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryRfnd', {
                    id: prototype.idRfnd + '-dataEntryRfnd',
                    params: {
                        rec: rec
                    }
                });
                dataEntryRfnd.show();
                break;
            default:
                var dataEntryAdm = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryAdm', {
                    id: prototype.idAdm + '-dataEntryAdm',
                    params: {
                        rec: rec
                    }
                });
                dataEntryAdm.show();
                break;
        }
    }
});



