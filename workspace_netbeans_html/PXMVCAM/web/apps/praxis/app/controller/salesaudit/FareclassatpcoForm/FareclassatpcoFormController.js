
Ext.define('Ext.Praxis.controller.salesaudit.FareclassatpcoForm.FareclassatpcoFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FareclassatpcoFormController',

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

        Ext.getCmp(prototype.idFareclas + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    OnBeforeShow: function () {
        prototype.idFareclas = 'FareclassatpcoForm';
        prototype.url = CONTEXTPATH + '/FareclassatpcoForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;

    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.idFareclas + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.idFareclas + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.idFareclas + '-pagginator-01').enable();
        }
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.idFareclas + '-gridData');
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
        Ext.getCmp(prototype.idFareclas + '-pagginator-01').setStore(store01);
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idFareclas + '-search-type');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Select"},
                {"code": "1", "name": "Date Effective"},
                {"code": "2", "name": "Carrier"},
                {"code": "3", "name": "Fare Class"}
            ]
        }));


    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var txtFilterDateFrom = Ext.getCmp(prototype.idFareclas + '-txtFilterDateFrom');
        var txtcarrier = Ext.getCmp(prototype.idFareclas + '-txtcarrier');
        var txtfareclass = Ext.getCmp(prototype.idFareclas + '-txtfareclass');
        var txtTarrif = Ext.getCmp(prototype.idFareclas + '-txtTarrif');
        var txtRule = Ext.getCmp(prototype.idFareclas + '-txtRule');
        switch (String(obj.getValue())) {
            case '1':
                txtFilterDateFrom.show();
                txtcarrier.show();
                txtfareclass.show();
                txtTarrif.hide();
                txtRule.hide();
                break;
            case '2':
                txtFilterDateFrom.hide();
                txtcarrier.show();
                txtfareclass.hide();
                txtTarrif.show();
                txtRule.show();
                break;
            case '3':
                txtFilterDateFrom.hide();
                txtcarrier.show();
                txtfareclass.show();
                txtTarrif.hide();
                txtRule.hide();
                break;
            case '':
                txtFilterDateFrom.hide();
                txtcarrier.hide();
                txtfareclass.hide();
                txtTarrif.hide();
                txtRule.hide();
                break;
        }

    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    imgExcel_clickHandler: function (obj, e) {
        this.onSearchClick(true);
    },
    onSearchClick: function (obj, e) {
        var me = this;
        var search = Ext.getCmp(prototype.idFareclas + '-search-type').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.idFareclas + '-txtFilterDateFrom').getRawValue();
        var txtcarrier = Ext.getCmp(prototype.idFareclas + '-txtcarrier').getValue();
        var txtfareclass = Ext.getCmp(prototype.idFareclas + '-txtfareclass').getValue();
        var txtTarrif = Ext.getCmp(prototype.idFareclas + '-txtTarrif').getValue();
        var txtRule = Ext.getCmp(prototype.idFareclas + '-txtRule').getValue();
        switch (search)
        {
            case '':
                {
                    global.Msg({msg: 'Enter the required fields'});
                    return;
                }
                break;
            case '1':
                if (txtFilterDateFrom === '') {
                    global.Msg({msg: 'Enter Date'});
                    return;
                }
                break;
            case '2':
                if (txtcarrier === '') {
                    global.Msg({msg: 'Enter Carrier'});
                    return;
                }
                break;
            case '3':
                if (txtfareclass === '') {
                    global.Msg({msg: 'Enter Fare Class'});
                    return;
                }
                break;
        }

        me.bean.VP_FILTER = search;
        me.bean.VP_FROM_FILTER = txtFilterDateFrom;
        me.bean.VP_CARRIER = txtcarrier;
        me.bean.VP_CARRIER1 = txtcarrier;
        me.bean.VP_CARRIER2 = txtcarrier;
        me.bean.VP_TARRIF = txtTarrif;
        me.bean.VP_FARECLASS = txtfareclass;
        me.bean.VP_FARECLASS1 = txtfareclass;
        me.bean.VP_RULE = txtRule;
        me.bean.pexcel = Ext.getCmp(prototype.idFareclas + '-pagination').getValue() ? 0 : 1;

        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idFareclas + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.idFareclas + '-gridData').getStore().loadPage(1, {
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

