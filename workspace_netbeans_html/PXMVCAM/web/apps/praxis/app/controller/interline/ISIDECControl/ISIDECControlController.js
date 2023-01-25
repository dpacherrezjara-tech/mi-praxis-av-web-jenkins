Ext.define('Ext.Praxis.controller.interline.ISIDECControl.ISIDECControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ISIDECControlController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    bean: {},
    _path: '',
    bean10: {},
    searchParams: {},
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'ISIDECControlForm';
        prototype.url = CONTEXTPATH+'/ISIDECControl';
        prototype.widthContenedor = 1800;
        prototype.widthGrid = 1772;
        prototype.widthGrid2 = 560;
        // </editor-fold>
        this.setStoreData();
    },
    afterRender: function () {
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        this.setValue('cmbDateFromMonth', '');
        this.setValue('cmbDateToMonth', '');
        this.setValue('cmbAirline', '');
        this.setValue('cmbAirline2', '');
        this.imgSearch_clickHandler();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    cbxDateFromYear_changeHandler: function() {
        this.setValue('cmbDateToYear', this.getValue("cmbDateFromYear"));
    },
    cbxDateFromMonth_changeHandler: function() {
        this.setValue('cmbDateToMonth', this.getValue("cmbDateFromMonth"));
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(true);
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
                
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'airlines2', autoLoad: true, data: airlines, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id + '-cmbAirline2').bindStore(store);
            }
        });
        //</editor-fold>
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        
        console.log('imgSearch_clickHandler');
        
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            this.bean.yearFrom = this.getValue("cmbDateFromYear");
            this.bean.monthFrom = this.getValue("cmbDateFromMonth");
            this.bean.yearTo = this.getValue("cmbDateToYear");
            this.bean.monthTo = this.getValue("cmbDateToMonth");
            this.bean.PERNUM = this.getValue("cmbPERNUM");
            this.bean.BNUMBER = this.getValue("txtBNUMBER");
            this.cbxFiltro_clickHandler();
            var beanString = JSON.stringify(this.bean);
            searchParams = {
                beanString: beanString,
                bean: this.bean
            };
            _path = prototype.url+'/getXLSX?' +
                'yearFrom='+this.bean.yearFrom+'&' +
                'monthFrom='+this.bean.monthFrom+'&' +
                'yearTo='+this.bean.yearTo+'&' +
                'monthTo='+this.bean.monthTo+'&' +
                'TTRAN='+this.bean.TTRAN+'&' +
                'PERNUM='+this.bean.PERNUM+'&' +
                'BNUMBER='+this.bean.BNUMBER+'&' +
                'BDAIR='+this.bean.BDAIR+'&' +
                'BAIR='+this.bean.BAIR;
            this.search(this.bean);
        } else if (Ext.getCmp(prototype.id + '-boxMainDataDetail').isVisible()) {
//            this.searchTotalDetail(this.bean10);
        }
        
    },
    search: function(bean) {
        console.log(bean);
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.ISIDECControl.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: SFI010");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id+'-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMainData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    imgFilter_clickHandler: function() {
        var option = Ext.getCmp(prototype.id+'-boxSearchFilter');
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
        this.setValue('cmbPERNUM', '');
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        this.setValue('cmbDateFromMonth', '');
        this.setValue('cmbDateToMonth', '');
        this.setValue('cmbAirline', '');
        this.setValue('cmbAirline2', '');
        this.setValue('cmbPERNUM', '');
    },
    imgBack_clickHandler: function() {
        global.showMenu();
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
    
    cbxFiltro_clickHandler: function() {
        this.bean.TTRAN = this.getValue("cmbTTRAN");
        if(this.bean.TTRAN=='OB'){
            this.bean.BDAIR = this.getValue("cmbAirline");
            this.setValue('cmbAirline2', '');
            Ext.getCmp(prototype.id + '-AD_BDAIR').show();

            Ext.getCmp(prototype.id + '-AD_BAIR').hide();
            Ext.getCmp(prototype.id + '-ADN_BDAIR').show();
            Ext.getCmp(prototype.id + '-ADN_BAIR').hide();
            
            Ext.getCmp(prototype.id + '-HB_BDAIR').show();
            Ext.getCmp(prototype.id + '-HB_BAIR').hide();
       }else if(this.bean.TTRAN=='IB'){
            this.bean.BAIR = this.getValue("cmbAirline2");
            this.setValue('cmbAirline', '');
            Ext.getCmp(prototype.id + '-AD_BAIR').show();
            Ext.getCmp(prototype.id + '-AD_BDAIR').hide();
            Ext.getCmp(prototype.id + '-ADN_BAIR').show();
            Ext.getCmp(prototype.id + '-ADN_BDAIR').hide();
            
            Ext.getCmp(prototype.id + '-HB_BDAIR').hide();
            Ext.getCmp(prototype.id + '-HB_BAIR').show();
        }
    },
    
    exportExcel: function() {
//        global.getFile(_path);
        console.log(searchParams);
        global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
        
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin').moveFirst();
    },
    pagPrevious: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin').movePrevious();
    },
    pagNext: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin').moveNext();
    },
    pagLast: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin').moveLast();
    },
    // </editor-fold>
    
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
