
Ext.define('Ext.Praxis.controller.salesaudit.MasterTaxdigitsForm.MasterTaxdigitsFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MasterTaxdigitsFormController',

    /**
     * Constructor
     */

    bean: {},

    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresGrids();
        Ext.getCmp(prototype.idMasterTax + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    OnBeforeShow: function () {
        /*
         * Solucion temporal para el reinicio de variables
         */
        prototype.idMasterTax = 'MasterTaxdigitsForm';
        prototype.idDataEntryMasterTax = 'DataEntryMasterTaxdigitsForm';
        prototype.url = CONTEXTPATH + '/MasterTaxdigitsForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.idMasterTax + '-gridDataAC');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idMasterTax + '-store-grid00',
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

        grid00.setStore(store00);

        Ext.getCmp(prototype.idMasterTax + '-pagginator-01').setStore(store00);
    },
    onExcelClick: function (obj, e) {
        this.onSearchClick(true);
    },
    onSearchClick: function (obj, e) {
        var me = this;
        me.bean.VP_CODTAX = Ext.getCmp(prototype.idMasterTax + '-txtCodTax').getValue();
        me.bean.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;

        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idMasterTax + '-gridDataAC').getStore().removeAll();
            Ext.getCmp(prototype.idMasterTax + '-gridDataAC').getStore().loadPage(1, {
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
    onAddClick: function (obj) {
        this.winDataEntry('I', {});
    },
    onEditActionColumnClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'I' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.MasterTaxdigitsForm.DataEntryMasterTaxdigitsForm({
            params: {
                action: action,
                rec: rec
            }
        });
        win.show();
    }
});



