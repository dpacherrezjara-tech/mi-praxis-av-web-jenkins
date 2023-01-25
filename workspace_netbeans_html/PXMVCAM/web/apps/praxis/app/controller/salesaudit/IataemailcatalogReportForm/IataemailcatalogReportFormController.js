
Ext.define('Ext.Praxis.controller.salesaudit.IataemailcatalogReportForm.IataemailcatalogReportFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.IataemailcatalogReportFormController',

    /**
     * Constructor
     */

    bean: {},
    beancountry: {},

    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setObtenerCombo();
        me.setStoresFilters();
        me.setStoresGrids();
        Ext.getCmp(prototype.idIataemail + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    setObtenerCombo: function () {
        var cmbCountry = Ext.getCmp(prototype.idIataemail + '-txtCountry');
        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idIataemail + '-Contenedor'), {
            msg: 'Please Wait....'
        });
        mask.show();
        var me = this;
        Ext.Ajax.request({
            url: prototype.url2 + '/loadCombo/',
            timeout: 60000000,
            method: 'POST',
            //params: this.beanTMP,
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                 mask.hide();
                cmbCountry.setStore(res.lstCountry);
                me.beancountry = res.lstCountry;
                me.onSearchClick();

            }
        });
    },
    OnBeforeShow: function () {
        /*
         * Solucion temporal para el reinicio de variables
         */
        prototype.idIataemail = 'IataemailcatalogReportForm';
        prototype.idEmailcatalog = 'IataemailcatalogReportForm';
        prototype.url = CONTEXTPATH + '/IataemailcatalogReportForm';
        prototype.url2 = CONTEXTPATH + '/ADMManualForm';
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
        var cmbStatus = Ext.getCmp(prototype.idIataemail + '-CmbStatus');

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
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.idIataemail + '-grid');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idIataemail + '-store-grid00',
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

        Ext.getCmp(prototype.idIataemail + '-pagginator-01').setStore(store00);
    },
    onSearchClick: function (obj, e) {
        var me = this;
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.idIataemail + '-txtCountry').getValue();
        me.bean.IN_ZONE = '';//Ext.getCmp(prototype.idIataemail + '-txtZone').getValue();
        me.bean.IN_STATUS = Ext.getCmp(prototype.idIataemail + '-CmbStatus').getValue();
        me.bean.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;

        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idIataemail + '-grid').getStore().removeAll();
            Ext.getCmp(prototype.idIataemail + '-grid').getStore().loadPage(1, {
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
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
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
        var win = new Ext.Praxis.view.salesaudit.IataemailcatalogReportForm.DataEntryIataemailcatalogReportForm({
            params: {
                action: action,
                rec: rec,
                reccountry: this.beancountry
            }
        });
        win.show();
    },
    onRendererColumnhabilitado: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A3948FLAG'))) {
            case 'A':
                color = '#F5A9F2';
                value = 'ACTIVE';
                break;
            case 'E':
                color = '#FF0000';
                value = 'Void';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    onRendererColumnhabiliBI: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        //Ext.String.trim  
        switch (String(Ext.String.trim(record.get('A3948BILLI')))) {
            case 'true':
                color = '#81F7BE';
                value = 'SI';
                break;
            case 'false':
                color = '#F2F5A9';
                value = 'NO';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";             
        return value;
    },
    onRendererColumnhabiliDAI: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        //Ext.String.trim
        switch (String(Ext.String.trim(record.get('A3948DAILY')))) {
            case 'true':
                color = '#81F7BE';
                value = 'SI';
                break;
            case 'false':
                color = '#F2F5A9';
                value = 'NO';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    onRendererColumnhabiliCSE: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        //Ext.String.trim
        switch (String(Ext.String.trim(record.get('A3948CSETT')))) {
            case 'true':
                color = '#81F7BE';
                value = 'SI';
                break;
            case 'false':
                color = '#F2F5A9';
                value = 'NO';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    onRendererColumnhabiliOpe: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        //Ext.String.trim
        switch (String(Ext.String.trim(record.get('A3948OPERA')))) {
            case 'true':
                color = '#81F7BE';
                value = 'SI';
                break;
            case 'false':
                color = '#F2F5A9';
                value = 'NO';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    onRendererColumnhabiliAge: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        //Ext.String.trim
        switch (String(Ext.String.trim(record.get('A3948AGENC')))) {
            case 'true':
                color = '#81F7BE';
                value = 'SI';
                break;
            case 'false':
                color = '#F2F5A9';
                value = 'NO';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    onRendererColumnhabilicompa: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(Ext.String.trim(record.get('A3948COMPA')))) {
            case 'true':
                color = '#81F7BE';
                value = 'SI';
                break;
            case 'false':
                color = '#F2F5A9';
                value = 'NO';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    onRendererColumnhabiliNocompa: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(Ext.String.trim(record.get('A3948NCOMP')))) {
            case 'true':
                color = '#81F7BE';
                value = 'SI';
                break;
            case 'false':
                color = '#F2F5A9';
                value = 'NO';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
     onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A3948FLAG'))) {
            case 'A':
                color = '#F5A9F2';
                value = 'ACTIVE';
                break;
            case 'E':
                color = '#FF0000';
                value = 'Void';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    }
});

