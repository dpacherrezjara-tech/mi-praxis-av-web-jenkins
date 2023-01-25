Ext.define('Ext.Praxis.controller.interline.IndustrySalesRecord.IndustrySalesRecordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.IndustrySalesRecordController',
    me: '',
    childs: '',
    stack: [],
    bean: {},
//    _path: '',
    init: function(view) {
        me = this;
        prototype.id = 'IndustrySalesRecordForm';
        prototype.url = CONTEXTPATH+'/IndustrySalesRecord';
        this.childs = Ext.getCmp(prototype.id + '-boxConsultas').items.items;
        this.setStoreData();
    },
    afterRender: function () {
        this.initDate();
        this.imgSearch_clickHandler();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    initDate: function () {
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        var mes = new Date().getMonth()+1;
        if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id+'-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id+'-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id+'-cmbDateToDay').setValue('');
    },
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

        var storeComboDataMonth = win.getStoreDays(true);
        Ext.getCmp(prototype.id+'-cmbDateFromDay').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-cmbDateToDay').bindStore(storeComboDataMonth);
    },
    // </editor-fold>
    Change_CheckBox: function () {
        if (this.getValue("chk_ByCupon")) Ext.getCmp(prototype.id + '-cmbFecha').enable(true);
        else Ext.getCmp(prototype.id + '-cmbFecha').disable(true);
        
        if (!this.getValue("chk_ByCupon")) {
            this.setValue('cmbFecha', 1);
        }
        this.imgSearch_clickHandler();
    },

    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        this.Fill_Zeros();
	this.bean.IN_FECHA_FROM = this.getValue("cmbDateFromYear") + this.getValue("cmbDateFromMonth") + this.getValue("cmbDateFromDay");
	this.bean.IN_FECHA_TO = this.getValue("cmbDateToYear") + this.getValue("cmbDateToMonth") + this.getValue("cmbDateToDay");
	this.bean.IN_CIA = this.getValue("txtCia");
	this.bean.IN_OAL = this.getValue("chk_OAL");
	this.bean.IN_BILLING = this.getValue("chk_BILLED");
        this.bean.IN_BYCUPON = this.getValue("chk_ByCupon");
        this.bean.IN_TIPOFECHA = this.getValue("cmbFecha");
	
        if (this.getValue("chk_ByCupon")) {
            this.searchA1884(this.bean);
        } else {
            this.search(this.bean);
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
        this.setValue('txtCia', '');
        this.initDate();
    },
    imgChart_clickHandler: function() {
    },
    imgBack_clickHandler: function() {
        global.showMenu();
    },
    // </editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean) {
        global.selectedChild(this.childs, 'boxMainData');
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1798");
                    
                    if (obj.data.length > 0) {
                        if (me.peek() === undefined) {
                            me.selectedChild('boxMainData', 'paggin');
                        } else {
                            if (!me.peek().includes('boxMainData')) {
                                me.selectedChild('boxMainData', 'paggin');
                            }
                            else {
                                me.selectedChild('boxMainData', 'paggin', false);
                            }
                        }
                        if (me.getValue("chk_OAL")) {
                            Ext.getCmp(prototype.id + '-gridData2').show();
                            Ext.getCmp(prototype.id + '-gridData').hide();
                        } else {
                            Ext.getCmp(prototype.id + '-gridData').show();
                            Ext.getCmp(prototype.id + '-gridData2').hide();
                        }
                    } else {
                        me.Hide_Pag();
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchA1884">
    searchA1884: function (bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchA1884'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1884");
                    
                    if (me.peek() === undefined) {
                        me.selectedChild('boxA1884Data', 'paggin2');
                    } else {
                        if (!me.peek().includes('boxA1884Data')) me.selectedChild('boxA1884Data', 'paggin2');
                        else me.selectedChild('boxA1884Data', 'paggin2', false);
                    }
                    
                    if (obj.data.length === 0) {
                        me.Hide_Pag();
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataA1884').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    //</editor-fold>

    Fill_Zeros: function () {
        if (this.getValue("txtCia").length < 3 && this.getValue("txtCia") !== '') {
            this.setValue('txtCia', this.fillZeros(3, this.getValue("txtCia")));
        }
    },
    exportExcel: function() {
//        global.getFile(_path);
    },
    Show_Pag: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        Ext.getCmp(prototype.id + '-pie').show();
    },
    Hide_Pag: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').hide();
        Ext.getCmp(prototype.id + '-pie').hide();
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (this.peek().includes("boxMainData")) {
            Ext.getCmp(prototype.id+'-paggin').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (this.peek().includes("boxMainData")) {
            Ext.getCmp(prototype.id+'-paggin').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (this.peek().includes("boxMainData")) {
            Ext.getCmp(prototype.id+'-paggin').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (this.peek().includes("boxMainData")) {
            Ext.getCmp(prototype.id+'-paggin').moveLast();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function (boxId, pagginId, add) {
        global.selectedChild(this.childs, prototype.id + '-' + boxId);
        add = add === null || add === undefined ? true : add;
        if(add) this.stack.push(prototype.id + '-' + boxId);
        
        if (pagginId === null || pagginId === undefined || pagginId.length === 0) {
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
            Ext.getCmp(prototype.id + '-pie').hide();
        } else {
            //<editor-fold defaultstate="collapsed" desc="setPaggin">
            var pagData = Ext.getCmp(prototype.id + '-' + pagginId).getPageData();
            
            var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
            var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
            var total = Ext.util.Format.number(pagData.total, '0,000');

            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
            Ext.getCmp(prototype.id + '-lbl-total').setText(total);
            //</editor-fold>
            Ext.getCmp(prototype.id + '-boxPaginacion').show();
            Ext.getCmp(prototype.id + '-pie').show();
            
//            var width = 0, wt;
            var boxChild = Ext.getCmp(prototype.id + '-' + boxId).items.items;
            console.log(boxChild);
//            for (var i = 0; i < boxChild.length; i++) {
//                if (boxChild[i].isVisible()) {
//                    wt = boxChild[i].getWidth();
//                    if (wt > width) {
//                        width = wt;
//                    }
//                }
//            }
//            Ext.getCmp(prototype.id + '-pie').setWidth(width);
        }
    },
    peek: function () {
        return this.stack[this.stack.length - 1];
    },
    fillZeros: function (size, value) {
        for(var i = value.length; i < size; i++){
            value = '0' + value;
        }
        return value;
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
