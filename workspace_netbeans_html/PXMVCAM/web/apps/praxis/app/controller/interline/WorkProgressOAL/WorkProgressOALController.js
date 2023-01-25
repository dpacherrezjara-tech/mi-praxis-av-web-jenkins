Ext.define('Ext.Praxis.controller.interline.WorkProgressOAL.WorkProgressOALController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.WorkProgressOALController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    beanVCR: {},
    beanAll: {},
    bean: {},
    _path: '',
    _pathVCR: '',
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'WorkProgressOALForm';
        prototype.url = CONTEXTPATH+'/WorkProgressOAL';
        // </editor-fold>
        this.setStoreData();
    },
    afterRender: function () {
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        var mes = new Date().getMonth()+1;
        if(mes < 10) mes = "0"+mes;
        this.setValue('cmbDateFromMonth', mes);
        this.setValue('cmbDateToMonth', mes);
        this.setValue('cmbDateFromDay', '');
        this.setValue('cmbDateToDay', '');
        this.setValue('cmbOAL', 'OAL');
    },
    ChangeCheckVCR: function(cmp, value) {
        if (this.getValue("chkVCR")) {
            this.imgSearchVCR_clickHandler();
            Ext.getCmp(prototype.id + '-cmbOAL').hide();
            Ext.getCmp(prototype.id + '-btnExport').hide();
            Ext.getCmp(prototype.id + '-seletit').hide();
        } else {
            Ext.getCmp(prototype.id + '-cmbOAL').show();
            Ext.getCmp(prototype.id + '-btnExport').show();
            Ext.getCmp(prototype.id + '-seletit').show();
            if (this.getValue("cmbOAL") == '') {
                this.imgSearch_clickHandlerAll();
            } else {
                this.imgSearch_clickHandler();
            }
        }
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

        var storeComboDataMonth = win.getStoreMonth(false);
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-cmbDateToMonth').bindStore(storeComboDataMonth);

        var storeComboDataDay = win.getStoreDays(true);
        Ext.getCmp(prototype.id+'-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id+'-cmbDateToDay').bindStore(storeComboDataDay);
    },
    // </editor-fold>
    imgSwap_clickHandler: function() {
        Ext.getCmp(prototype.id + '-Box1').setVisible(!Ext.getCmp(prototype.id + '-Box1').isVisible());
        Ext.getCmp(prototype.id + '-Box2').setVisible(!Ext.getCmp(prototype.id + '-Box2').isVisible());
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    ChangeVista_clickHandler: function(obj, e) {
        if (this.getValue("chkVCR")) {
            this.imgSearchVCR_clickHandler();
        } else {
            if (this.getValue("cmbOAL") == 'ALL') {
                this.imgSearch_clickHandlerAll();
            } else {
                this.imgSearch_clickHandler();
            }
        }
    },
    imgSearchVCR_clickHandler: function() {
        this.beanVCR.IN_FECHA_FROM = this.getValue("cmbDateFromYear") + this.getValue("cmbDateFromMonth") + this.getValue("cmbDateFromDay");
        this.beanVCR.IN_FECHA_TO = this.getValue("cmbDateToYear") + this.getValue("cmbDateToMonth") + this.getValue("cmbDateToDay");
        _pathVCR = prototype.url+'/getXLSXVCR?' +
            'IN_FECHA_FROM='+this.beanVCR.IN_FECHA_FROM+'&' +
            'IN_FECHA_TO='+this.beanVCR.IN_FECHA_TO;
        
        this.searchVCR(this.beanVCR);
    },
    imgSearch_clickHandlerAll: function() {
        this.beanAll.IN_FECHA_FROM = this.getValue("cmbDateFromYear") + this.getValue("cmbDateFromMonth") + this.getValue("cmbDateFromDay");
        this.beanAll.IN_FECHA_TO = this.getValue("cmbDateToYear") + this.getValue("cmbDateToMonth") + this.getValue("cmbDateToDay");
        this.search_2(this.beanAll);
    },
    imgSearch_clickHandler: function() {
        this.bean.IN_FECHA_FROM = this.getValue("cmbDateFromYear") + this.getValue("cmbDateFromMonth") + this.getValue("cmbDateFromDay");
        this.bean.IN_FECHA_TO = this.getValue("cmbDateToYear") + this.getValue("cmbDateToMonth") + this.getValue("cmbDateToDay");
        _path = prototype.url+'/getXLSX?' +
            'IN_FECHA_FROM='+this.bean.IN_FECHA_FROM+'&' +
            'IN_FECHA_TO='+this.bean.IN_FECHA_TO;
        
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
    },
    imgBack_clickHandler: function() {
        global.showMenu();
    },
    // </editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="searchVCR">
    searchVCR: function(beanVCR) {
        Ext.getCmp(prototype.id + '-boxMainData').hide();
        Ext.getCmp(prototype.id + '-boxMainDataVCR').show();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.WorkProgressOAL.GridData', {
            proxy: {
                url: prototype.url+'/searchVCR'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = beanVCR;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1692");
                    if (obj.data.length === 0) {
                        Ext.getCmp(prototype.id + '-pie').hide();
                        global.Msg({ msg: 'Data not found' });
                    } else {
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
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMainDataVCR').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function(bean) {
        Ext.getCmp(prototype.id + '-boxMainData').show();
        Ext.getCmp(prototype.id + '-boxMainDataVCR').hide();
        Ext.Ajax.request({
            url: prototype.url+'/search',
            method: 'POST',
            timeout: 60000000,
            params: bean,
            beforerequest: Ext.getCmp(prototype.id + '-Box1').mask('Loading...'),
            success: function(response, opts){
                Ext.getCmp(prototype.id + '-Box1').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    win.lblUser_toolTip("Estructura: A1692");
                    var listaData = res.listaData;
                    var storeGridData = Ext.create("Ext.Praxis.store.interline.WorkProgressOAL.GridData", { data: listaData });
                    Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-gridData2').bindStore(storeGridData);
                    
                    var lstTotal = res.lstTotal;
                    var storeGridData2 = Ext.create("Ext.Praxis.store.interline.WorkProgressOAL.GridData", { data: lstTotal });
                    Ext.getCmp(prototype.id + '-gridDataTot').bindStore(storeGridData2);
                    Ext.getCmp(prototype.id + '-gridDataTot2').bindStore(storeGridData2);
                    if (storeGridData.data.length === 0) {
                        global.Msg({ msg: 'Data not found' });
                    } else {
                        if (storeGridData.data.length > 24) {
                            Ext.getCmp(prototype.id + '-scroll_adg').show();
                            Ext.getCmp(prototype.id + '-scroll_adg2').show();
                        } else {
                            Ext.getCmp(prototype.id + '-scroll_adg').hide();
                            Ext.getCmp(prototype.id + '-scroll_adg2').hide();
                        }
                        Ext.getCmp(prototype.id + '-boxPaginacion').hide();
                        Ext.getCmp(prototype.id + '-pie').hide();
                    }
                    global.clear();
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp(prototype.id + '-Box1').unmask();
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="search_2">
    search_2: function(beanAll) {
        Ext.getCmp(prototype.id + '-boxMainData').show();
        Ext.getCmp(prototype.id + '-boxMainDataVCR').hide();
        Ext.Ajax.request({
            url: prototype.url+'/search_2',
            method: 'POST',
            timeout: 60000000,
            params: beanAll,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            success: function(response, opts){
                Ext.getCmp(prototype.id + '-gridData').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    win.lblUser_toolTip("Estructura: A1692");
                    var listaData = res.listaData;
                    var storeGridData = Ext.create("Ext.Praxis.store.interline.WorkProgressOAL.GridData", { data: listaData });
                    Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridData);
                    Ext.getCmp(prototype.id + '-gridData2').bindStore(storeGridData);
                    
                    var lstTotal = res.lstTotal;
                    var storeGridData2 = Ext.create("Ext.Praxis.store.interline.WorkProgressOAL.GridData", { data: lstTotal });
                    Ext.getCmp(prototype.id + '-gridDataTot').bindStore(storeGridData2);
                    Ext.getCmp(prototype.id + '-gridDataTot2').bindStore(storeGridData2);
                    
                    if (storeGridData.data.length === 0) {
                        global.Msg({ msg: 'Data not found' });
                    } else {
                        if (storeGridData.data.length > 24) {
                            Ext.getCmp(prototype.id + '-scroll_adg').show();
                            Ext.getCmp(prototype.id + '-scroll_adg2').show();
                        } else {
                            Ext.getCmp(prototype.id + '-scroll_adg').hide();
                            Ext.getCmp(prototype.id + '-scroll_adg2').hide();
                        }
                        Ext.getCmp(prototype.id + '-boxPaginacion').hide();
                        Ext.getCmp(prototype.id + '-pie').hide();
                    }
                    global.clear();
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp(prototype.id + '-gridData').unmask();
            }
        });
    },
    //</editor-fold>
    
    exportExcel: function() {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            global.getFile(_path);
        } else if (Ext.getCmp(prototype.id + '-boxMainDataVCR').isVisible()) {
            global.getFile(_pathVCR);
        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainDataVCR').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainDataVCR').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainDataVCR').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainDataVCR').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveLast();
        }
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
