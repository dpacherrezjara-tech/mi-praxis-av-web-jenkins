Ext.define('Ext.Praxis.controller.interline.ClearingHouse.ClearingHouseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ClearingHouseController',
    me: '',
    childs: '',
    bean: {},
    bean93: {},
//    _path: '',
    init: function(view) {
        me = this;
        prototype.id = 'ClearingHouseForm';
        prototype.url = CONTEXTPATH+'/ClearingHouse';
        this.childs = Ext.getCmp(prototype.id + '-boxConsultas').items.items;
        this.setStoreData();
    },
    afterRender: function () {
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        this.setValue('cmbDateFromMonth', '');
        this.setValue('cmbDateToMonth', '');
        this.setValue('cmbAirline', '');
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
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id+'-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id+'-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-cmbDateToMonth').bindStore(storeComboDataMonth);
        
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
            }
        });
        //</editor-fold>
    },
    // </editor-fold>
    viewDetCia: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.bean93=data;
	this.drillDownByCia(this.bean93);
    },

    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        var msg = this.validarFecha();
        if(msg === ''){
            this.bean.yearFrom = this.getValue("cmbDateFromYear");
            this.bean.monthFrom = this.getValue("cmbDateFromMonth");
            this.bean.yearTo = this.getValue("cmbDateToYear");
            this.bean.monthTo = this.getValue("cmbDateToMonth");

            this.bean.CCIA = this.getValue("cmbAirline");
            this.bean.CURRENP = 'USD';//String(cmbCurrency.selectedItem.data);
            this.bean.PERNUM = this.getValue("cmbPeriod");
            
            this.search(this.bean);
        } else {
            global.Msg({ msg: msg});
        }
    },
    imgFilter_clickHandler: function() {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) option.hide();
        else option.show();
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
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        this.setValue('cmbDateFromMonth', '');
        this.setValue('cmbDateToMonth', '');
        this.setValue('cmbAirline', '');
    },
    imgBack_clickHandler: function() {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            global.showMenu();
        } else if (Ext.getCmp(prototype.id + '-boxDetCia').isVisible()) {
            global.selectedChild(this.childs, prototype.id + '-boxMainData');
//            Ext.getCmp(prototype.id + '-gridDetCIA').setText('');
        }
    },
    imFavo_clickHandler: function (cmp) {
        var url = "resources/img/botones/";
        if (cmp.icon === url + "addFav2.png") {
            cmp.setIcon(url + "delFav.png");
            Ext.getCmp(prototype.id + '-imgType').setTooltip("Delete Favorite");
            global.Msg({ msg: 'Menu is added to favorite'});
//            this.insertFavoriteMenu(this.bean2149);	
        } else if (cmp.icon === url + "delFav.png") {
            cmp.setIcon(url + "addFav2.png");
            Ext.getCmp(prototype.id + '-imgType').setTooltip("Add Favorite");
            global.Msg({ msg: 'Menu is Remove to favorite'});
//            this.deleteFavoriteMenu(this.bean2149);
        }
    },
    // </editor-fold>
    
    exportExcel: function() {
//        global.getFile(_path);
    },
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function(bean) {
        global.selectedChild(this.childs, prototype.id + '-boxMainData');
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.ClearingHouse.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: IMF093(F1) - IMF092(F2) - IMF091(F3)");
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="drillDownByCia">
    drillDownByCia: function(bean93) {
        global.selectedChild(this.childs, prototype.id + '-boxDetCia');
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.ClearingHouse.GridData', {
            proxy: {
                url: prototype.url + '/drillDownByCia'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean93;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: IMF093(F1) - IMF092(F2) - IMF091(F3)");
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                        var title = 'Invoice Date: ' + data.strFormatDate + '    Period: ' + data.PERNUM + '    Currency: ' + data.CURRENP;
                        Ext.getCmp(prototype.id + '-gridDetCIA').setTitle('<center>' + title + '</center>');
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetCIA').bindStore(storeGridDatas);
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="validarFecha">
    validarFecha: function() {
        var msg = '';
        
        var fyear = this.getValue("cmbDateFromYear");
        var fmonth = this.getValue("cmbDateFromMonth");
        var tyear = this.getValue("cmbDateToYear");
        var tmonth = this.getValue("cmbDateToMonth");

        if(fyear === null || tyear === null || fmonth === null || tmonth === null){
            msg = 'Date Error. Please call our System Apartment.';
        }else{
            if(fyear != '' && fmonth == '') {
                if((tyear == '' && tmonth != '') || (tyear != '' && tmonth != '')) {
                        msg = 'The ranges of the Flight Date should be the same. Example: \n From: Y2013 To: Y2014 (Correct) \n From: Y2013M04 To: Y2014M01 (Correct) \n From: Y2013 To: Y2014M01 (Incorrect) \n From: M06 To: Y2014 (Incorrect) \n From: Y2014M06 To: Y2014M06D15 (Incorrect)';
                }            
            }
            if(fyear == '' && fmonth != '') {
                if((tyear != '' && tmonth == '') || (tyear != '' && tmonth != '')) {
                        msg = 'The ranges of the Flight Date should be the same. Example: \n From: Y2013 To: Y2014 (Correct) \n From: Y2013M04 To: Y2014M01 (Correct) \n From: Y2013 To: Y2014M01 (Incorrect) \n From: M06 To: Y2014 (Incorrect)\n From: Y2014M06 To: Y2014M06D15 (Incorrect)';
                }            
            }    

            if(fyear != '' && fmonth != '') {
                if((tyear != '' && tmonth == '') || (tyear == '' && tmonth != '')) {
                        msg = 'The ranges of the Flight Date should be the same. Example: \n From: Y2013 To: Y2014 (Correct) \n From: Y2013M04 To: Y2014M01 (Correct) \n From: Y2013 To: Y2014M01 (Incorrect) \n From: M06 To: Y2014 (Incorrect) \n From: Y2014M06 To: Y2014M06D15 (Incorrect)';
                }            
            }

            if(fyear != '' && tyear != ''){
                if(tyear < fyear){
                    msg = 'The Year To must be greater than Year From.';
                }                            
            }

            if(fmonth != '' && tmonth != ''){
                if(fyear == tyear && tmonth < fmonth){
                    msg = 'The Month To must be greater than Month From.';
                }                            
            }
        }
        return msg;
    },
    //</editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.imgSearch_clickHandler();
        }
    }
    // </editor-fold>
});
