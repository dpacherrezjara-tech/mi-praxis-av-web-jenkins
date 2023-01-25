
Ext.define('Ext.Praxis.controller.salesaudit.EmailcatalogReportForm.EmailcatalogReportFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EmailcatalogReportFormController',

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
        me.setStoresFilters();
        me.setStoresGrids();
        Ext.getCmp(prototype.idEmailca + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    OnBeforeShow: function () {
        /*
         * Solucion temporal para el reinicio de variables
         */
        prototype.idEmailca = 'EmailcatalogReportForm';
       prototype.idEmailcaDataEn = 'DataEntryEmailcatalogReportForm';
        prototype.url = CONTEXTPATH + '/EmailcatalogReportForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    imgExcel_clickHandler: function (obj, e) {
        this.onSearchClick(true);
    },
    setStoresFilters: function () {
        var cmbStatus = Ext.getCmp(prototype.idEmailca + '-CmbStatus');

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "A", "name": "ACTIVE"},
                {"code": "E", "name": "INACTIVE"}
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
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3903FLAG'))) {
            case 'E':
                value = 'red';
                break;
            case 'A':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.idEmailca + '-grid');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idEmailca + '-store-grid00',
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

        Ext.getCmp(prototype.idEmailca + '-pagginator-01').setStore(store00);
    },
    onSearchClick: function (obj, e) {
        var me = this;
        me.bean.IN_IATA = Ext.getCmp(prototype.idEmailca + '-txtIATA').getValue();
        me.bean.IN_STATUS = Ext.getCmp(prototype.idEmailca + '-CmbStatus').getValue();
        me.bean.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;

        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idEmailca + '-grid').getStore().removeAll();
            Ext.getCmp(prototype.idEmailca + '-grid').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length === 0) {
                        var Objtemp = records[0].data;
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
        var win = new Ext.Praxis.view.salesaudit.EmailcatalogReportForm.DataEntryEmailcatalogReportForm({
            params: {
                action: action,
                rec: rec
            }
        });
        win.show();
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch(String(record.get('A3903FLAG'))){
            case 'A': color = '#F5A9F2'; value = 'ACTIVE'; break;
            case 'E': color = '#FF0000'; value = 'Void'; break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    }
});

