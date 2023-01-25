
Ext.define('Ext.Praxis.controller.salesaudit.RulesatpcoForm.RulesatpcoFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RulesatpcoFormController',

    /**
     * Constructor
     */
    bean: {},
    bean2: {},
    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        me.setStoresGrids();

        Ext.getCmp(prototype.idrulesatp + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    OnBeforeShow: function () {
        prototype.idrulesatp = 'RulesatpcoForm';
        prototype.idDataEntryRules = 'DataEntryRulesatpco';
        prototype.url = CONTEXTPATH + '/RulesatpcoForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;

    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.idrulesatp + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.idrulesatp + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.idrulesatp + '-pagginator-01').enable();
        }
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idrulesatp + '-search-type');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Select"},
                {"code": "0", "name": "All Categories"},
                {"code": "1", "name": "Category 01"},
                {"code": "2", "name": "Category 02"},
                {"code": "3", "name": "Category 03"},
                {"code": "4", "name": "Category 04"},
                {"code": "5", "name": "Category 05"},
                {"code": "6", "name": "Category 06"},
                {"code": "7", "name": "Category 07"},
                {"code": "8", "name": "Category 08"},
                {"code": "9", "name": "Category 09"},
                {"code": "10", "name": "Category 10"},
                {"code": "11", "name": "Category 11"},
                {"code": "12", "name": "Category 12"},
                {"code": "13", "name": "Category 13"},
                {"code": "14", "name": "Category 14"},
                {"code": "15", "name": "Category 15"},
                {"code": "16", "name": "Category 16"},
                {"code": "17", "name": "Category 17"},
                {"code": "18", "name": "Category 18"},
                {"code": "19", "name": "Category 19"},
                {"code": "20", "name": "Category 20"},
                {"code": "21", "name": "Category 21"},
                {"code": "22", "name": "Category 22"},
                {"code": "23", "name": "Category 23"},
                {"code": "25", "name": "Category 25"},
                {"code": "26", "name": "Category 26"},
                {"code": "27", "name": "Category 27"},
                {"code": "28", "name": "Category 28"},
                {"code": "29", "name": "Category 29"},
                {"code": "31", "name": "Category 31"},
                {"code": "33", "name": "Category 33"},
                {"code": "35", "name": "Category 35"},
                {"code": "50", "name": "Category 50"}
            ]
        }));


    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.idrulesatp + '-gridData');
        var grid02 = Ext.getCmp(prototype.idrulesatp + '-gridDetalle');
        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/search/',
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
        var store02 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/searchDataTbls/',
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
        grid02.setStore(store02);
        Ext.getCmp(prototype.idrulesatp + '-pagginator-01').setStore(store01);
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onExcelClick: function (obj, e) {
        this.onSearchClick(true);
    },
    onSearchClick: function (obj, e) {
        var me = this;
        var gridDetalle = Ext.getCmp(prototype.idrulesatp + '-gridDetalle');
        gridDetalle.hide();
        var txtsearch = Ext.getCmp(prototype.idrulesatp + '-search-type').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.idrulesatp + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.idrulesatp + '-txtFilterDateTo').getRawValue();
        var txtcarrier = Ext.getCmp(prototype.idrulesatp + '-txtcarrier').getValue();
        if (txtsearch === '') {
            global.Msg({msg: 'SELECT SEARCH BY'});
            return;
        } else {
            if (txtFilterDateFrom === '' && txtFilterDateTo === '' && txtcarrier === '') {
                global.Msg({msg: 'Enter DATE FROM, DATE TO AND CARRIER'});
                return;
            } else if (txtFilterDateFrom === '' && txtFilterDateTo === '') {
                global.Msg({msg: 'Enter DATE FROM AND DATE TO'});
                return;
            } else if (txtFilterDateFrom === '') {
                global.Msg({msg: 'Enter DATE FROM'});
                return;
            } else if (txtFilterDateTo === '') {
                global.Msg({msg: 'Enter DATE TO'});
                return;
            } else if (txtcarrier === '') {
                global.Msg({msg: 'Enter CARRIER'});
                return;
            }
        }

        me.bean.VP_FILTER = txtsearch;
        me.bean.VP_FROM_FILTER = txtFilterDateFrom;
        me.bean.VP_TO_FILTER = txtFilterDateTo;
        me.bean.VP_CARRIER = txtcarrier;
        me.bean.VP_TARNO = "";
        me.bean.VP_RULNO = "";
        me.bean.VP_LOC1 = "";
        me.bean.VP_LOC2 = "";
        me.bean.pexcel = Ext.getCmp(prototype.idrulesatp + '-pagination').getValue() ? 0 : 1;

        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idrulesatp + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.idrulesatp + '-gridData').getStore().loadPage(1, {
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
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },

    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        value = 'And';
        switch (String(record.get('A2393LOGIC'))) {
            case '=':
                value = 'Then';
                break;
            case ':':
                value = 'If';
                break;
            case '/':
                value = 'Or';
                break;
            case '*':
                value = 'Else';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnOnPais: function (value, metaData, record, rowIndex, colIndex, store, view) {
        if (value === 1) {
            value = 'YES';
        } else {
            value = 'NO';
        }
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.idrulesatp + \'-Contenedor\').getController().OnDetail(' + rowIndex + ');">' + value + '</span>'
    },
    OnDetail: function (rowIndex) {
        var me = this;
        var gridDetalle = Ext.getCmp(prototype.idrulesatp + '-gridDetalle');
        gridDetalle.show();

        ///CARGANDO EL DETALLE DE LA GRTILLA 
        var grid = Ext.getCmp(prototype.idrulesatp + '-gridData');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);

        me.bean2.VP_RECTY = rec.data.A2393RECTY;
        me.bean2.VP_ACTIO = rec.data.A2393ACTIO;
        me.bean2.VP_TARNO = rec.data.A2393TARNO1;
        me.bean2.VP_CARRIER = rec.data.A2393CXRCO;
        me.bean2.VP_RULNO = rec.data.A2393RULNO;
        me.bean2.VP_CATNO = rec.data.A2393CATNO;
        me.bean2.VP_SEQNO = rec.data.A2393SEQNO;
        me.bean2.VP_FCLAS = rec.data.A2393FCLAS;
        me.bean2.VP_EFF = rec.data.A2393EFFE1;
        Ext.getCmp(prototype.idrulesatp + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.idrulesatp + '-gridDetalle').getStore().loadPage(1, {
            params: me.bean2,
            callback: function (records, operation, success) {
                if (records.length !== 0) {

                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }
                //Ext.getCmp(prototype.id + '-country').setValue(records[0].data.A3388TOTALPAG);

            }
        });


    },
    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.RulesatpcoForm.DataEntryRulesatpco({
            params: {
                CATNO: rec.get('A2393CATNO')
            }
        });
        win.show();
    }

});

