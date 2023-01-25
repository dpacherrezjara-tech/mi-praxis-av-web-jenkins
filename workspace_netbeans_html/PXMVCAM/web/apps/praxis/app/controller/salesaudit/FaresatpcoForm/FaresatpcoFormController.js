
Ext.define('Ext.Praxis.controller.salesaudit.FaresatpcoForm.FaresatpcoFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FaresatpcoFormController',

    /**
     * Constructor
     */

    init: function (view) {
        var me = this;

    },
    bean: {},
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresGrids();

        Ext.getCmp(prototype.idatpcoForm + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    OnBeforeShow: function () {
        prototype.idatpcoForm = 'FaresatpcoForm';
        prototype.idDataEntryRulesFaresatpco = 'DataEntryRulesFaresatpco';
        prototype.idDataEntryFootnoteFaresatpco = 'DataEntryFootnoteFaresatpco';
        prototype.idDataEntryCategoryFaresatpco = 'DataEntryCategoryFaresatpco';
        prototype.idDataEntryRules = 'DataEntryRulesatpco';
        prototype.url = CONTEXTPATH + '/FaresatpcoForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;

    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.idatpcoForm + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.idatpcoForm + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.idatpcoForm + '-pagginator-01').enable();
        }
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.idatpcoForm + '-grid');
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
        grid01.setStore(store01);
        Ext.getCmp(prototype.idatpcoForm + '-pagginator-01').setStore(store01);
    },
    onRuleDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.FaresatpcoForm.DataEntryRulesFaresatpco({
            params: {
                VP_TARNO: Ext.String.trim(rec.get('A2419TARNO1')),
                VP_CXRCO: Ext.String.trim(rec.get('A2419CXRCD')),
                VP_RULNO: Ext.String.trim(rec.get('A2419RULNO')),
                VP_EFF: Ext.getCmp(prototype.idatpcoForm + '-txtFilterDateFrom').getRawValue()
            }
        });
        win.show();
    },
    onFootnoteDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.FaresatpcoForm.DataEntryFootnoteFaresatpco({
            params: {
                VP_TARNO: Ext.String.trim(rec.get('A2419TARNO1')),
                VP_CXRCO: Ext.String.trim(rec.get('A2419CXRCD')),
                VP_FTNT: Ext.String.trim(rec.get('A2419FTNT')),
                VP_EFF: Ext.getCmp(prototype.idatpcoForm + '-txtFilterDateFrom').getRawValue()
            }
        });
        win.show();
    },
    onExcelClick: function (obj, e) {
        this.onSearchClick(true);
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onSearchClick: function (obj, e) {
        var me = this;
        var txtFilterDateTo = Ext.getCmp(prototype.idatpcoForm + '-txtFilterDateFrom').getRawValue();
        var txtOrigin = Ext.getCmp(prototype.idatpcoForm + '-txtOrigin').getValue();
        var txtDestin = Ext.getCmp(prototype.idatpcoForm + '-txtDestin').getValue();
        var txtcarrier = Ext.getCmp(prototype.idatpcoForm + '-txtcarrier').getValue();
        var txtfareclass = Ext.getCmp(prototype.idatpcoForm + '-txtfareclass').getValue();
        if (txtFilterDateTo === '' && txtOrigin === '' && txtDestin === '' && txtcarrier === '') {
            global.Msg({msg: 'Enter Date, Origin, Destin and Carrier'});
            return;
        } else if (txtFilterDateTo === '' && txtOrigin === '' && txtDestin === '') {
            global.Msg({msg: 'Enter Date, Origin and Destin'});
            return;
        } else if (txtFilterDateTo === '' && txtOrigin === '' && txtcarrier === '') {
            global.Msg({msg: 'Enter Date, Origin and Carrier'});
            return;
        } else if (txtFilterDateTo === '' && txtDestin === '' && txtcarrier === '') {
            global.Msg({msg: 'Enter Date, Destin and Carrier'});
            return;
        } else if (txtOrigin === '' && txtDestin === '' && txtcarrier === '') {
            global.Msg({msg: 'Enter Origin, Destin and Carrier'});
            return;
        } else if (txtFilterDateTo === '' && txtDestin === '') {
            global.Msg({msg: 'Enter Date and Destin'});
            return;
        } else if (txtFilterDateTo === '' && txtOrigin === '') {
            global.Msg({msg: 'Enter Date and Origin'});
            return;
        } else if (txtFilterDateTo === '' && txtcarrier === '') {
            global.Msg({msg: 'Enter Date and Carrier'});
            return;
        } else if (txtOrigin === '' && txtDestin === '') {
            global.Msg({msg: 'Enter Origin and Destin'});
            return;
        } else if (txtOrigin === '' && txtcarrier === '') {
            global.Msg({msg: 'Enter Origin and Carrier'});
            return;
        } else if (txtDestin === '' && txtcarrier === '') {
            global.Msg({msg: 'Enter Destin and Carrier'});
            return;
        } else if (txtFilterDateTo === '') {
            global.Msg({msg: 'Enter Date'});
            return;
        } else if (txtOrigin === '') {
            global.Msg({msg: 'Enter Origin'});
            return;
        } else if (txtDestin === '' && txtDestin === '') {
            global.Msg({msg: 'Enter Destin'});
            return;
        } else if (txtcarrier === '') {
            global.Msg({msg: 'Enter Carrier'});
            return;
        }

        me.bean.VP_FROM_FILTER = txtFilterDateTo;
        me.bean.VP_ORIGIN = txtOrigin;
        me.bean.VP_DESTIN = txtDestin;
        me.bean.VP_CARRIER = txtcarrier;
        me.bean.VP_FARECLASS = txtfareclass;
        me.bean.V_PAX = "";
        me.bean.pexcel = Ext.getCmp(prototype.idatpcoForm + '-pagination').getValue() ? 0 : 1;

        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idatpcoForm + '-grid').getStore().removeAll();
            Ext.getCmp(prototype.idatpcoForm + '-grid').getStore().loadPage(1, {
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
    }

});

