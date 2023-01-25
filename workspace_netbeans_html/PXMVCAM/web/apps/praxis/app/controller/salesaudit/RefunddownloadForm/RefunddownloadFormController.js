
Ext.define('Ext.Praxis.controller.salesaudit.RefunddownloadForm.RefunddownloadFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RefunddownloadFormController',
    bean: {},
    beanProc: {},
    init: function (view) {
        var me = this;

    },

    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        me.setStoresGrids();
        Ext.getCmp(prototype.idRefunddownloadForm + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var cmbcountry = Ext.getCmp(prototype.idRefunddownloadForm + '-cmbcountry');
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    OnBeforeShow: function () {
        /*
         * Solucion temporal para el reinicio de variables
         */

        prototype.idRefunddownloadForm = 'RefunddownloadForm';
        prototype.url = CONTEXTPATH + '/RefunddownloadForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.idRefunddownloadForm + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.idRefunddownloadForm + '-pagginator-01').disable();
            Ext.getCmp(prototype.idRefunddownloadForm + '-lbl-currentPage').hide();
            Ext.getCmp(prototype.idRefunddownloadForm + '-lbl-pageCount').hide();
        } else {
            Ext.getCmp(prototype.idRefunddownloadForm + '-pagginator-01').enable();
            Ext.getCmp(prototype.idRefunddownloadForm + '-lbl-currentPage').show();
            Ext.getCmp(prototype.idRefunddownloadForm + '-lbl-pageCount').show();
        }
    },
    setStoresFilters: function () {
        var cmbtransaction = Ext.getCmp(prototype.idRefunddownloadForm + '-cmbtransaction');

        cmbtransaction.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "2", "name": "EXCH"},
                {"code": "1", "name": "SALE"}
            ]
        }));


    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    onRendererColumn: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.idRefunddownloadForm + '-griddatasale');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRefunddownloadForm + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url:  prototype.url + '/searchRefund/',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);

        Ext.getCmp(prototype.idRefunddownloadForm + '-pagginator-01').setStore(store00);

    },

    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onExcelClick: function (obj, e) {
        this.onSearchClick(true);
    },
    onSearchClick: function (obj, e) {
        var me = this;
        me.bean.VP_OPCION = Ext.getCmp(prototype.idRefunddownloadForm + '-cmbtransaction').getValue();
        me.bean.VP_DATEFROM = Ext.getCmp(prototype.idRefunddownloadForm + '-txtFilterDateFrom').getRawValue();
        me.bean.VP_DATETO = Ext.getCmp(prototype.idRefunddownloadForm + '-txtFilterDateTo').getRawValue();
        if (me.bean.VP_OPCION === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Transaction');
            return;
        }
        if (Ext.String.trim(me.bean.VP_DATEFROM) === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter Date From');
            return;
        }
        if (Ext.String.trim(me.bean.VP_DATETO) === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter Date To');
            return;
        }
        me.bean.pexcel = Ext.getCmp(prototype.idRefunddownloadForm + '-pagination').getValue() ? 0 : 1;

        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSXRFNDSale?beanString=' + encodeURI(JSON.stringify(bean)));

        } else {
            Ext.getCmp(prototype.idRefunddownloadForm + '-griddatasale').getStore().removeAll();
            Ext.getCmp(prototype.idRefunddownloadForm + '-griddatasale').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length === 0) {
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }

                }
            });

        }
    },
    Processing_clickHandler: function (bean, bExcel) {
        var me = this;
        me.beanProc.VP_OPCION = Ext.getCmp(prototype.idRefunddownloadForm + '-cmbtransaction').getValue();
        me.beanProc.VP_DATEFROM = Ext.getCmp(prototype.idRefunddownloadForm + '-txtFilterDateFrom').getRawValue();
        me.beanProc.VP_DATETO = Ext.getCmp(prototype.idRefunddownloadForm + '-txtFilterDateTo').getRawValue();
        var vl_url = '';
        if (me.beanProc.VP_OPCION === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Transaction');
            return;
        }
        if (Ext.String.trim(me.beanProc.VP_DATEFROM) === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter Date From');
            return;
        }
        if (Ext.String.trim(me.beanProc.VP_DATETO) === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter Date To');
            return;
        }
        if (me.beanProc.VP_DATEFROM !== '' && me.beanProc.VP_DATETO !== '') {
            if (Date.parse(Ext.getCmp(prototype.idRefunddownloadForm + '-txtFilterDateFrom').getRawValue()) > Date.parse(Ext.getCmp(prototype.idRefunddownloadForm + '-txtFilterDateTo').getRawValue())) {
                Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');
                return;
            }
        }

        global.Msg({
            msg: 'Are you sure to Processing Data?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.idRefunddownloadForm + '-Contenedor'), {
                        msg: 'Please Wait....'
                    });
                    mask.show();
                    Ext.Ajax.request({
                        url: prototype.url + '/ProcesarRefund/',
                        timeout: 60000000,
                        method: 'POST',
                        params: {beanString: JSON.stringify(me.beanProc)},
                        success: function (response, options) {
                            mask.hide();
                            var res = Ext.JSON.decode(response.responseText);
                            if (res.length !== 0) {
                                if (res[0].data.VL_MENSAJE !== '') {
                                    vp_icon = 1;
                                }
                            }
                            //console.log(res.data);
                            var vp_icon = 0;

                            global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                    if (vp_icon === 1) {
                                        Ext.getCmp(prototype.idRefunddownloadForm + '-Contenedor').getController().onSearchClick();

                                    }


                                }});
                        }
                    });
                }

            }
        });


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
    }
});

