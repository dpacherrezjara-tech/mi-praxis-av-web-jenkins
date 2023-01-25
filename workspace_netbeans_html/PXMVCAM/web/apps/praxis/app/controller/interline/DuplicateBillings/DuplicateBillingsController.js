Ext.define('Ext.Praxis.controller.interline.DuplicateBillings.DuplicateBillingsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DuplicateBillingsController',
//    me: '',
//    childs: '',
//    stack: [],
    bean: {},
//    _path: '',
    init: function(view) {
//        this.childs = Ext.getCmp(prototype.id+'-boxConsultas').items.items;
        this.setStoreData();
        this.obtainDataFilter();
    },
    afterRender: function () {
        this.initDate();
        win.setValue('cmbSourceCode', '');
//        this.imgSearch_clickHandler();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    initDate: function () {
        win.setValue('cmbDateFromYear', new Date().getFullYear());
        win.setValue('cmbDateToYear', new Date().getFullYear());
        var mes = new Date().getMonth()+1;
        if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').setValue(mes);
        Ext.getCmp(prototype.id+'-cmbDateToMonth').setValue(mes);
        Ext.getCmp(prototype.id+'-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id+'-cmbDateToDay').setValue('');
    },
    cbxDateFromYear_changeHandler: function() {
        win.setValue('cmbDateToYear', win.getValue("cmbDateFromYear"));
    },
    cbxDateFromMonth_changeHandler: function() {
        win.setValue('cmbDateToMonth', win.getValue("cmbDateFromMonth"));
    },
    cbxDateFromDay_changeHandler: function() {
        win.setValue('cmbDateToDay', win.getValue("cmbDateFromDay"));
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
    changeTipoFecha: function () {
        if (win.getValue("cmbFecha") === 2) {
            Ext.getCmp(prototype.id+'-cmbDateFromDay').show();
            Ext.getCmp(prototype.id+'-cmbDateToDay').show();
        } else {
            Ext.getCmp(prototype.id+'-cmbDateFromDay').hide();
            Ext.getCmp(prototype.id+'-cmbDateToDay').hide();
        }
    },
//    txtCia_keyDownHandler: function ( obj , e , eOpts) {
//        switch (e.getKey()) {
//            case 13:
//                if (win.getValue("txtCia").length < 3 && win.getValue("txtCia") !== '') {
//                    win.setValue('txtCia', this.fillZeros(3, win.getValue("txtCia")));
//                }
//                this.imgSearch_clickHandler();
//                break;
//        }
//    },
    txtPeriod_keyDownHandler: function ( obj , e , eOpts) {
        switch (e.getKey()) {
            case 13:
                if (win.getValue("txtPeriod").length === 1) {
                    win.setValue('txtPeriod', this.fillZeros(2, win.getValue("txtPeriod")));
                }
                this.imgSearch_clickHandler();
                break;
        }
    },
//    gridData_act1_clickHandler: function (column, e, row, column, x, rowData) {
//        var data = x.record.data;
//        this.SearchA020(data);
//    },
    viewProrate: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var nroprt = data.A020KEY;
        
        prototypeProgram.view = 'interline-duplicate-billings-form';
        prototypeProgram.nprog = 'PX00000195';
        prototypeProgram.title = 'Duplicate Billings';
        prototypeProgram.modulo = ''; 
        
        win.displayBwrProrrateo(this, 'InterDup', nroprt);
//        this.post_to_url(CONTEXTPATH+'/Home?'
//           +'strMod=InterCorreo&'
//           +'nroprt='+nroprt
//           +'#program-prorrateo-form', {}, 'post', 'ProrrateoForm');
    },
//    post_to_url: function(path, params, method, id) {
//        method = method || "post";
//
//        var form = document.createElement("form");
//        form.setAttribute("method", method);
//        form.setAttribute("action", path);
//        form.setAttribute("id", id);
//
//        document.body.appendChild(form);
//        form.submit();
//    },

    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        this.bean.IN_TIPOFECHA = win.getValue("cmbFecha");
	this.bean.IN_FECHA_FROM = win.getValue("cmbDateFromYear")+win.getValue("cmbDateFromMonth");
	this.bean.IN_FECHA_TO = win.getValue("cmbDateToYear")+win.getValue("cmbDateToMonth");
        
	if(win.getValue("cmbFecha") === 2){
            this.bean.IN_FECHA_FROM = this.bean.IN_FECHA_FROM+win.getValue("cmbDateFromDay");
            this.bean.IN_FECHA_TO = this.bean.IN_FECHA_TO+win.getValue("cmbDateToDay");
	}
	this.bean.IN_CODOBO = win.getValue("txtPeriod");
	this.bean.IN_STATUS = win.getValue("cmbSourceCode");
	
	this.search(this.bean);
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
        win.setValue('txtPeriod', '');
        win.setValue('cmbFecha', 1);
        this.initDate();
        this.changeTipoFecha();
    },
    imgChart_clickHandler: function() {
    },
    imgBack_clickHandler: function() {
        global.showMenu();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="obtainDataFilter">
    obtainDataFilter: function () {
        Ext.Ajax.request({
            url: prototype.url+'/obtainDataFilter',
            method: 'POST',
            timeout: 60000000,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var listaUsos = res.listaUsos;
                    var usos = new Array();
                    usos.push(['', 'All']);
                    listaUsos.forEach(function callback(currentValue, index, array) {
                        usos.push([currentValue.A051KEY2, currentValue.A051KEY2 + ' - ' + currentValue.A051DESCR1]);
                    });
                    var store = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'usos', autoLoad: true, data: usos, fields: ['code', 'name']
                    });
                    Ext.getCmp(prototype.id+'-cmbSourceCode').bindStore(store);
                    
                    me.imgSearch_clickHandler();
                } else global.Msg({msg: res.sesion});
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A020");
                    
                    if (obj.data.length > 0) {
                        win.visible('boxPaginacion', true);
                        
                        //<editor-fold defaultstate="collapsed" desc="setPaggin">
                        var pagData = Ext.getCmp(prototype.id+'-paggin').getPageData();

                        var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                        var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                        var total = Ext.util.Format.number(pagData.total, '0,000');

                        Ext.getCmp(prototype.id+'-lbl-currentPage').setText(currentPage);
                        Ext.getCmp(prototype.id+'-lbl-pageCount').setText(pageCount);
                        Ext.getCmp(prototype.id+'-lbl-total').setText(total);
                        //</editor-fold>
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    
    exportExcel: function() {
//        global.getFile(_path);
        global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(this.bean)));
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
    
    fillZeros: function (size, value) {
        for(var i = value.length; i < size; i++){
            value = '0'+value;
        }
        return value;
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.imgSearch_clickHandler();
        }
    }
});
