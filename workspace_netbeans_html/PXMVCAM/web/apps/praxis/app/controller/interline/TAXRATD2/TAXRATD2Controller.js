Ext.define('Ext.Praxis.controller.interline.TAXRATD2.TAXRATD2Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TAXRATD2Controller',
    me: '',
    childs: '',
    bean: {},
    beanA1202: {},
    searchParams: {},
    _path: '',
    init: function(view) {
        me = this;
        prototype.id = 'TAXRATD2Form';
        prototype.url = CONTEXTPATH+'/TAXRATD2';
        this.childs = Ext.getCmp(prototype.id + '-boxConsultas').items.items;
        this.setStoreData();
    },
    afterRender: function () {
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        var mes = new Date().getMonth()+1;
        if(mes < 10) mes = "0"+mes;
        this.setValue('cmbDateFromMonth', mes);
        this.setValue('cbxSearchBy', '');
        this.imgSearch_clickHandler();
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id+'-cmbDateFromYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(false);
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').bindStore(storeComboDataMonth);
    },
    cbxSearchBy_changeHandler: function() {
        var txt_code = '';
        switch (this.getValue("cbxSearchBy")) {
            case '1':
                Ext.getCmp(prototype.id + '-lblSearchCode').setText("TAX Code: ");
                Ext.getCmp(prototype.id + '-txt_code').show();
                Ext.getCmp(prototype.id + '-hb_fecha').hide();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-lblSearchCode').setText("Country Code: ");
                Ext.getCmp(prototype.id + '-txt_code').show();
                Ext.getCmp(prototype.id + '-hb_fecha').hide();
                break;
            case '3':
                Ext.getCmp(prototype.id + '-lblSearchCode').setText("Sale Code: ");
                Ext.getCmp(prototype.id + '-txt_code').hide();
                Ext.getCmp(prototype.id + '-hb_fecha').show();
                break;
            default:
                Ext.getCmp(prototype.id + '-lblSearchCode').setText('');
                Ext.getCmp(prototype.id + '-txt_code').hide();
                break;
        }
        if (Ext.getCmp(prototype.id + '-boxDetailA1141').isVisible() || this.getValue("cbxSearchBy") == '3') {
            this.imgSearch_clickHandler();
        }
    },
    viewDetailByCountry: function(column, e, row, column, x, rowData) {
        
        this.beanA1202.IN_DATE = '';
        this.beanA1202.IN_CODCITY = '';
        
        this.beanA1202 = x.record.data;
        if(this.beanA1202.A1202INTER == 'Y'){
            console.log(this.beanA1202);
            this.searchDetail(this.beanA1202);
        }else{
            console.log('Feriado');
        }
    },
    viewDetail: function(column, e, row, column, x, rowData) {
        this.bean = x.record.data;
        Ext.create('Ext.Praxis.view.interline.TAXRATD2Form.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                data: this.bean
            }
        }).show();
    },
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {        
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible() || Ext.getCmp(prototype.id + '-boxDetailA1141').isVisible()) {
            var selectedValue = this.getValue("cbxSearchBy");
            this.bean.IN_TFILTER = selectedValue;
            this.bean.IN_A1202PAITA = selectedValue == "1" ? this.getValue("txt_code") : "";
            this.bean.IN_A1202CODTA = selectedValue == "2" ? this.getValue("txt_code") : "";
            this.bean.IN_DATE = this.getValue("cmbDateFromYear") + this.getValue("cmbDateFromMonth");
            
            var beanString = JSON.stringify(this.bean);
            searchParams = {
                beanString: beanString,
                bean: this.bean
            };
            
            this.f_Buscar(this.bean);
        } else if(Ext.getCmp(prototype.id + '-boxDetailData').isVisible()) {
            this.beanA1202.IN_DATE = this.getValue("txt_Date");
            this.beanA1202.IN_CODCITY = this.getValue("txt_CityCod");
            
            this.searchDetail(this.beanA1202);
        }
    },
    f_Buscar: function(bean) {
        if (this.getValue("cbxSearchBy") == '3') {
            this.searchDetailA1141(bean);
        } else {
            this.search(bean);
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
        this.setValue('cbxSearchBy', '');
        this.cleanFilter();
    },
    cleanFilter: function() {
        Ext.getCmp(prototype.id + '-lblSearchCode').setText('');
        this.setValue('txt_code', '');
        Ext.getCmp(prototype.id + '-txt_code').hide();
    },
    imgBack_clickHandler: function() {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            global.showMenu();
        } else if (Ext.getCmp(prototype.id + '-boxDetailData').isVisible()) {
            this.selectedChild('boxMainData');
            this.setValue('txt_CityCod', '');
            this.setValue('txt_Date', '');
            Ext.getCmp(prototype.id + '-hbox_filter2').hide();
            Ext.getCmp(prototype.id + '-hbox_filter1').show();
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
    
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function(bean) {
        console.log(bean);
        this.selectedChild('boxMainData');
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.TAXRATD2.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1202");
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
                    Ext.getCmp(prototype.id + '-boxPaginacion').show();
                    Ext.getCmp(prototype.id + '-pie').show();
                    Ext.getCmp(prototype.id + '-pie2').hide();
                    if (obj.data.length === 0) {
                        global.Msg({ msg: 'Data not found' });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetailA1141">
    searchDetailA1141: function(bean) {
        this.selectedChild('boxDetailA1141');
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.TAXRATD2.GridData', {
            proxy: {
                url: prototype.url+'/searchDetailA1141'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1141");
                    Ext.getCmp(prototype.id + '-boxPaginacion').hide();
                    Ext.getCmp(prototype.id + '-pie').hide();
                    Ext.getCmp(prototype.id + '-pie2').hide();
                    if (obj.data.length === 0) {
                        global.Msg({ msg: 'Data not found' });
                    } else {
                        var obj = obj.data.items[0].data;
//                        Ext.getCmp(prototype.id + '-gridDetailA1141Data').setText('TUA AM - Mes '+ obj.strFormatDate2);
                        Ext.getCmp(prototype.id + '-gridDetailA1141Data').setTitle('<center style="font-size:12px;">' + 'TUA AM - Mes ' + obj.strFormatDate2 + '</center>');
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridDetailA1141Data').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-gridDetailA1141Data').setStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetail">
    searchDetail: function(beanA1202) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.TAXRATD2.GridData', {
            proxy: {
                url: prototype.url+'/searchDetail'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = beanA1202;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1224");
                    // <editor-fold defaultstate="collapsed" desc="paggin2">
                    var pag = Ext.getCmp(prototype.id+'-paggin2');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage2').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount2').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total2').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({ msg: 'Data not found' });
                    } else {
                        me.selectedChild('boxDetailData');
                        Ext.getCmp(prototype.id + '-boxPaginacion').show();
                        Ext.getCmp(prototype.id + '-pie').hide();
                        Ext.getCmp(prototype.id + '-pie2').show();
                        var obj = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-gridDetailData').setTitle('<center style="font-size:12px;"> Month : '+ obj.strFormatDate4
                        +'&nbsp; &nbsp; &nbsp;' +' Country : ' + obj.A1224CID +'&nbsp; &nbsp; &nbsp;'+' TAX : '+ obj.A1224TID +'-'+obj.strDescripcion2 + '</center>');
                        Ext.getCmp(prototype.id + '-hbox_filter2').show();
                        Ext.getCmp(prototype.id + '-hbox_filter1').hide();
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridDetailData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin2').bindStore(storeGridDatas);
    },
    //</editor-fold>
    exportExcel: function() {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
//            global.getFile(_path);
            global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
        } else if (Ext.getCmp(prototype.id + '-boxDetailA1141').isVisible()) {
            global.getFile(prototype.url + '/getXLSX_Detail?beanString=' + searchParams.beanString);
        } else if (Ext.getCmp(prototype.id + '-boxWRF014Data').isVisible()) {
//            global.getFile(_pathWRF014);
        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveFirst();
        }else if (Ext.getCmp(prototype.id+'-boxDetailData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin2').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').movePrevious();
        }else if (Ext.getCmp(prototype.id+'-boxDetailData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin2').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveNext();
        }else if (Ext.getCmp(prototype.id+'-boxDetailData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin2').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveLast();
        }else if (Ext.getCmp(prototype.id+'-boxDetailData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin2').moveLast();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function(box) {
        box = prototype.id + '-' + box;
        var b;
        for (var i = 0; i < this.childs.length; i++) {
            b = this.childs[i];
            if (b.id === box) b.show();
            else b.hide();
        }
    },
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
