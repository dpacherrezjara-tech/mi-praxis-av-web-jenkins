Ext.define('Ext.Praxis.controller.interline.InterlineAnalysis.InterlineAnalysisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InterlineAnalysisController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    bean: {},
    bean30: {},
    _path: '',
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'InterlineAnalysisForm';
        prototype.url = CONTEXTPATH + '/InterlineAnalysis';
        // </editor-fold>
        this.setStoreData();
    },
    afterRender: function() {
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        this.setValue('cmbDateFromMonth', '');
        this.setValue('cmbDateToMonth', '');
        this.setValue('cmbAirline', '');
        this.setValue('cmbSource', '');
        this.imgSearch_clickHandler();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    cbxDateFromYear_changeHandler: function() {
        this.setValue('cmbDateToYear', this.getValue("cmbDateFromYear"));
    },
    cbxDateFromMonth_changeHandler: function() {
        this.setValue('cmbDateToMonth', this.getValue("cmbDateFromMonth"));
    },
    cbxDateFromDay_changeHandler: function() {
        this.setValue('cmbDateToDay', this.getValue("cmbDateFromDay"));
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(true);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        //<editor-fold defaultstate="collapsed" desc="obtainDataCombo">
        Ext.Ajax.request({
            url: prototype.url + '/obtainDataCombo',
            method: 'POST',
            timeout: 60000000,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstAirlines = res.lstAirlines;
                var airlines = new Array();
                airlines.push(['', 'All']);
                lstAirlines.forEach(function callback(currentValue, index, array) {
                    airlines.push([currentValue.A005KEY, currentValue.A005KEY + ' - ' + currentValue.A005KEY2]);
                });
                var store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'airlines', autoLoad: true, data: airlines, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id + '-cmbAirline').bindStore(store);

                var lstSource = res.lstSource;
                var sources = new Array();
                sources.push(['', 'All']);
                lstSource.forEach(function callback(currentValue, index, array) {
                    sources.push([currentValue.CODSOUR, currentValue.CODSOUR + ' - ' + currentValue.DESSOU]);
                });
                var store2 = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'sources', autoLoad: true, data: sources, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id + '-cmbSource').bindStore(store2);
            }
        });
        //</editor-fold>
    },
    // </editor-fold>
    btn_SourceCode: function(cmp, value) {
        if (value) {
            this.setValue('cmbSource', '90');
            Ext.getCmp(prototype.id + '-cmbSource').show();
            this.search_Filtro(this.bean30);
            this.bean30.SOURCOD = this.getValue("cmbSource");
            this.searchSourceCode(this.bean30);
        } else {
            Ext.getCmp(prototype.id + '-cmbSource').hide();
            this.imgClear_clickHandler();
            this.search_Filtro(this.bean);
            this.search(this.bean);
        }
    },
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function(bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.InterlineAnalysis.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: SFI040");
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    } else {
                        Ext.getCmp(prototype.id + '-HD_CURRENTYEAR').setText(String(me.bean.yearFrom));
                        Ext.getCmp(prototype.id + '-HD_LASTYEAR').setText(String(me.bean.yearFrom - 1));
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataP1').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataP2').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchSourceCode">
    searchSourceCode: function(bean30) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.InterlineAnalysis.GridData', {
            proxy: {
                url: prototype.url + '/searchSourceCode'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean30;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: SFI030");
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    } else {
                        Ext.getCmp(prototype.id + '-HD_CURRENTYEAR').setText(String(me.bean.yearFrom));
                        Ext.getCmp(prototype.id + '-HD_LASTYEAR').setText(String(me.bean.yearFrom - 1));
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataP1').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataP2').bindStore(storeGridDatas);
    },
    //</editor-fold>

    search_Filtro: function(obj) {
        obj.yearFrom = this.getValue("cmbDateFromYear");
        obj.monthFrom = this.getValue("cmbDateFromMonth");
        obj.yearTo = this.getValue("cmbDateToYear");
        obj.monthTo = this.getValue("cmbDateToMonth");
        obj.dayFrom = '';
        obj.dayTo = '';
        obj.PERNUM = this.getValue("cmbPERNUM");
        obj.BAIR = this.getValue("cmbAirline");
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        if (this.getValue("btn")) {
            this.search_Filtro(this.bean30);
            this.bean30.SOURCOD = this.getValue("cmbSource");
            this.searchSourceCode(this.bean30);
        } else {
            this.search_Filtro(this.bean);
            this.search(this.bean);
        }
    },
    imgFilter_clickHandler: function() {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    imgExcel_clickHandler: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    imgClear_clickHandler: function(obj, e) {
        this.setValue('cmbSource', '');
    },
    imgChart_clickHandler: function() {
    },
    imgBack_clickHandler: function() {
        global.showMenu();
    },
    imFavo_clickHandler: function(cmp) {
        var url = "resources/img/botones/";
        if (cmp.icon === url + "addFav2.png") {
            cmp.setIcon(url + "delFav.png");
            Ext.getCmp(prototype.id + '-imgType').setTooltip("Delete Favorite");
            global.Msg({msg: 'Menu is added to favorite'});
//            this.insertFavoriteMenu(this.bean2149);	
        } else if (cmp.icon === url + "delFav.png") {
            cmp.setIcon(url + "addFav2.png");
            Ext.getCmp(prototype.id + '-imgType').setTooltip("Add Favorite");
            global.Msg({msg: 'Menu is Remove to favorite'});
//            this.deleteFavoriteMenu(this.bean2149);
        }
    },
    // </editor-fold>

    exportExcel: function() {

        var value = Ext.getCmp(prototype.id + '-btn').getValue();
        var tipo = '';
        var beanString = '';

        if (value) {
            this.search_Filtro(this.bean30);
            this.bean30.SOURCOD = this.getValue("cmbSource");
            tipo = '1';
            beanString = JSON.stringify(this.bean30);

        } else {
            this.search_Filtro(this.bean);
            tipo = '2';
            beanString = JSON.stringify(this.bean);

        }
        var strEncode = encodeURI(prototype.url + '/getXLSX?beanString=' + beanString+'&tipo='+tipo);
        global.getFile(strEncode);
    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    }
    // </editor-fold>
});
