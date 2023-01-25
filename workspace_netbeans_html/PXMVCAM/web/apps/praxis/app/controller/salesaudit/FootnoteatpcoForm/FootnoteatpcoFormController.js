
Ext.define('Ext.Praxis.controller.salesaudit.FootnoteatpcoForm.FootnoteatpcoFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FootnoteatpcoFormController',

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

        Ext.getCmp(prototype.idFootnoteatpco + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    OnBeforeShow: function () {

        prototype.idDataEntryRules = 'DataEntryRulesatpco';
        prototype.idFootnoteatpco = 'FootnoteatpcoForm';
        prototype.url = CONTEXTPATH + '/FootnoteatpcoForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;

    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.idFootnoteatpco + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.idFootnoteatpco + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.idFootnoteatpco + '-pagginator-01').enable();
        }
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idFootnoteatpco + '-search-type');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Select"},
                {"code": "0", "name": "All Categories"},
                {"code": "3", "name": "Category 03"},
                {"code": "11", "name": "Category 11"},
                {"code": "14", "name": "Category 14"},
                {"code": "15", "name": "Category 15"},
                {"code": "23", "name": "Category 23"}                
            ]
        }));


    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.idFootnoteatpco + '-gridData');
        var grid02 = Ext.getCmp(prototype.idFootnoteatpco + '-gridDetalle');
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
        Ext.getCmp(prototype.idFootnoteatpco + '-pagginator-01').setStore(store01);
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
        var gridDetalle = Ext.getCmp(prototype.idFootnoteatpco + '-gridDetalle');
        gridDetalle.hide();
        var txtsearch = Ext.getCmp(prototype.idFootnoteatpco + '-search-type').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.idFootnoteatpco + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.idFootnoteatpco + '-txtFilterDateTo').getRawValue();
        var txtcarrier = Ext.getCmp(prototype.idFootnoteatpco + '-txtcarrier').getValue();
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
        me.bean.VP_FTNT = "";
        me.bean.VP_LOC1 = "";
        me.bean.VP_LOC2 = "";
        me.bean.pexcel = Ext.getCmp(prototype.idFootnoteatpco + '-pagination').getValue() ? 0 : 1;
        
        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idFootnoteatpco + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.idFootnoteatpco + '-gridData').getStore().loadPage(1, {
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
        switch (String(record.get('A2468INTBLS'))) {
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
        return '<span onclick="Ext.getCmp(prototype.idFootnoteatpco + \'-Contenedor\').getController().OnDetail(' + rowIndex + ');">' + value + '</span>'
    },
    OnDetail: function (rowIndex) {
        var me = this;
        var gridDetalle = Ext.getCmp(prototype.idFootnoteatpco + '-gridDetalle');
        gridDetalle.show();

        ///CARGANDO EL DETALLE DE LA GRTILLA 
        var grid = Ext.getCmp(prototype.idFootnoteatpco + '-gridData');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);

        me.bean2.VP_RECTY = rec.data.A2468RECTY;
        me.bean2.VP_ACTIO = rec.data.A2468ACTIO;
        me.bean2.VP_TARNO = rec.data.A2468TARNO1;
        me.bean2.VP_CARRIER = rec.data.A2468CXRCO;
        me.bean2.VP_FTNT = rec.data.A2468FTNT;
        me.bean2.VP_CATNO = rec.data.A2468CATNO;
        me.bean2.VP_SEQNO = rec.data.A2468SEQNO;
        me.bean2.VP_EFF = rec.data.A2468EFF1;
        Ext.getCmp(prototype.idFootnoteatpco + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.idFootnoteatpco + '-gridDetalle').getStore().loadPage(1, {
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
                CATNO: rec.get('A2468CATNO')
            }
        });
        win.show();
    }

});

