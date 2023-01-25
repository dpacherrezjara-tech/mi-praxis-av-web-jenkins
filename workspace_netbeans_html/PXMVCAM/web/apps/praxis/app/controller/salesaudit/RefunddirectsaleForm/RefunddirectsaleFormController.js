
Ext.define('Ext.Praxis.controller.salesaudit.RefunddirectsaleForm.RefunddirectsaleFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RefunddirectsaleFormController',

    /**
     * Constructor
     */

    bean: {},
    beanProc: {},
    init: function (view) {
        var me = this;

    },
 
    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        me.setStoresGrids();
        Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var cmbcountry = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-cmbcountry');
        var grid00 = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-gridsale');
        var grid01 = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-gridexch1');
        var grid02 = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-gridexch2');
        if (obj.getValue() === "1" || obj.getValue() === "2" || obj.getValue() === "3") {
            cmbcountry.show();

        } else {
            cmbcountry.hide();
        }



        if (obj.getValue() === "1") {
            grid00.show();
            grid01.hide();
            grid02.hide();

        } else if (obj.getValue() === "2") {
            grid00.hide();
            grid01.show();
            grid02.hide();

        } else if (obj.getValue() === "3") {
            grid00.hide();
            grid01.hide();
            grid02.show();
        } else {
            grid00.hide();
            grid01.hide();
            grid02.hide();
        }
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    OnBeforeShow: function () {
        /*
         * Solucion temporal para el reinicio de variables
         */

        prototype.idRefunddirectsale = 'RefunddirectsaleForm';
        prototype.url = CONTEXTPATH + '/RefunddirectsaleForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.idRefunddirectsale + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.idRefunddirectsale + '-pagginator-01').disable();
            Ext.getCmp(prototype.idRefunddirectsale + '-lbl-currentPage').hide();
            Ext.getCmp(prototype.idRefunddirectsale + '-lbl-pageCount').hide();
        } else {
            Ext.getCmp(prototype.idRefunddirectsale + '-pagginator-01').enable();
            Ext.getCmp(prototype.idRefunddirectsale + '-lbl-currentPage').show();
            Ext.getCmp(prototype.idRefunddirectsale + '-lbl-pageCount').show();
        }
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-search-type');
        var cmbcountry = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-cmbcountry');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "SALE"},
                {"code": "2", "name": "EXCH1"},
                {"code": "3", "name": "EXCH2"}
            ]
        }));


        cmbcountry.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "AR", "name": "AR"},
                {"code": "BR", "name": "BR"},
                {"code": "CR", "name": "CR"},
                {"code": "GT", "name": "GT"},
                {"code": "HN", "name": "HN"},
                {"code": "NI", "name": "NI"}

            ]
        }));


    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbStatusAfterRender2: function (obj) {
        obj.setValue('AR');
    },
    onRendererColumn: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-gridsale');
        var grid01 = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-gridexch1');
        var grid02 = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-gridexch2');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRefunddirectsale + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/search',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRefunddirectsale + '-store-grid01',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/searchExch1',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRefunddirectsale + '-store-grid02',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/searchExch2',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);
        grid01.setStore(store01);
        grid02.setStore(store02);

        Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-pagginator-01').setStore(store00);
        Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-pagginator-01').setStore(store01);
        Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-pagginator-01').setStore(store02);

    },

    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onExcelClick: function (obj, e) {
        this.onSearchClick(true);
    },
    onSearchClick: function (obj, e) {
        var me = this;
        me.bean.VP_OPCION = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-search-type').getValue();
        me.bean.VP_PAIS = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-cmbcountry').getValue();
        me.bean.VP_DATEFROM = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-txtFilterDateFrom').getRawValue();
        me.bean.VP_DATETO = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-txtFilterDateTo').getRawValue();
        if (me.bean.VP_OPCION === '1') {
            me.bean.VP_TYPE = 'SALE';
        } else if (me.bean.VP_OPCION === '1') {
            me.bean.VP_TYPE = 'EXCH';
        } else {
            me.bean.VP_TYPE = 'EXCH';
        }
        me.bean.pexcel = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-pagination').getValue() ? 0 : 1;

        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            if (bean.VP_OPCION === '1') {
                me.exportExcel(prototype.url + '/getXLSXSale?beanString=' + encodeURI(JSON.stringify(bean)));
            } else if (bean.VP_OPCION === '2') {
                me.exportExcel(prototype.url + '/getXLSXExch1?beanString=' + encodeURI(JSON.stringify(bean)));
            } else {
                me.exportExcel(prototype.url + '/getXLSXExch2?beanString=' + encodeURI(JSON.stringify(bean)));
            }

        } else {

            Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-gridsale').getStore().removeAll();
            Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-gridexch1').getStore().removeAll();
            Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-gridexch2').getStore().removeAll();
            if (bean.VP_OPCION === '1') {
                Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-gridsale').getStore().loadPage(1, {
                    params: bean,
                    callback: function (records, operation, success) {
                        if (records.length === 0) {
                            global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                                }});

                        }

                    }
                });
            } else if (bean.VP_OPCION === '2') {
                Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-gridexch1').getStore().loadPage(1, {
                    params: bean,
                    callback: function (records, operation, success) {
                        if (records.length === 0) {
                            global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                                }});

                        }

                    }
                });
            } else {
                Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-gridexch2').getStore().loadPage(1, {
                    params: bean,
                    callback: function (records, operation, success) {
                        if (records.length === 0) {
                            global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                                }});

                        }

                    }
                });
            }



        }
    },
    Processing_clickHandler: function (bean, bExcel) {
        var me = this;
        me.beanProc.VP_OPCION = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-search-type').getValue();
        me.beanProc.VP_PAIS = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-cmbcountry').getValue();
        me.beanProc.VP_DATEFROM = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-txtFilterDateFrom').getRawValue();
        me.beanProc.VP_DATETO = Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-txtFilterDateTo').getRawValue();
        var vl_url = '';
        if (me.beanProc.VP_OPCION === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Processing By');
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
            if (Date.parse(Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-txtFilterDateFrom').getRawValue()) > Date.parse(Ext.getCmp(prototype.idRefunddirectsaleLoadticket + '-txtFilterDateTo').getRawValue())) {
                Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');
                return;
            }
        }

        if (me.beanProc.VP_OPCION === '1') {
            me.beanProc.VP_TYPE = 'SALE';
            vl_url = '/ProcesarSale/';

        } else if (me.beanProc.VP_OPCION === '1') {
            me.beanProc.VP_TYPE = 'EXCH';
            vl_url = '/ProcesarExch1/';
        } else {
            me.beanProc.VP_TYPE = 'EXCH';
            vl_url = '/ProcesarExch2/';
        }
        global.Msg({
            msg: 'Are you sure to Processing Data?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.idRefunddirectsale + '-Contenedor'), {
                        msg: 'Please Wait....'
                    });
                    mask.show();
                    Ext.Ajax.request({
                        url: prototype.url + vl_url,
                        timeout: 60000000,
                        method: 'POST',
                        params: {beanString: JSON.stringify(me.beanProc)},
                        success: function (response, options) {
                            mask.hide();
                            var res = Ext.JSON.decode(response.responseText);
                            //console.log(res.data);
                            var vp_icon = 0;
                            if (res.data === 'RECORD INSERTED') {
                                vp_icon = 1;
                            }
                            global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                    if (vp_icon === 1) {
                                        Ext.getCmp(prototype.idRefunddirectsale + '-Contenedor').getController().onSearchClick();

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

