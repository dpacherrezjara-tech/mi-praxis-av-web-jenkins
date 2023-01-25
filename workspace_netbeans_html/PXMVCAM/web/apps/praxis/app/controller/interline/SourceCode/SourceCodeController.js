Ext.define('Ext.Praxis.controller.interline.SourceCode.SourceCodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SourceCodeController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    bean: {},
    _path: '',
    objPermiso: {},
    PERMISO: false,
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'SourceCodeForm';
        prototype.url = CONTEXTPATH+'/SourceCode';
        prototype.widthContenedor = 1000;
        prototype.widthGrid = 900;
        // </editor-fold>
    },
    afterRender: function () {
        this.imgSearch_clickHandler();
        this.verificarPermisos('PX00000188');
    },
    verificarPermisos: function(nprog) {
        Ext.Ajax.request({
            url: prototype.urlMaster+'/validateUserProgramAccess',
            method: 'POST',
            timeout: 60000000,
            params: {nprog: nprog || ''},
            success: function(response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.objPermiso = res.matrix;
                } else global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var data = store.getAt(rowIndex).data;
        this.searchCompleteDetail(data);
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        this.bean.CODSOUR = "";
        this.bean.GRUSOR = this.getValue("cmbPERNUM");
        _path = prototype.url+'/getXLSX?' +
            'CODSOUR='+this.bean.CODSOUR+'&' +
            'GRUSOR='+this.bean.GRUSOR;
        
        this.search(this.bean);
    },
    search: function(bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.SourceCode.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1852");
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
        this.setValue('cmbPERNUM', '');
    },
    btnAdd_click: function() {
        this.loadlst1852();
    },
    imgBack_clickHandler: function() {
        global.showMenu();
    },
    // </editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="searchCompleteDetail">
    searchCompleteDetail: function(data) {
        Ext.Ajax.request({
            url: prototype.url+'/searchCompleteDetail',
            method: 'POST',
            timeout: 60000000,
            params: data,
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            success: function(response, opts){
                Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');
                win.lblUser_toolTip("Estructura: A1852");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstA1852 = res.loadlst1852;
                    var objA1852 = res.listaCompleteDetail;
                    if (objA1852!=null) {
                        Ext.create('Ext.Praxis.view.interline.SourceCodeForm.DataEntry', {
                            id: 'DataEntrySourceCodeForm',
                            params: {
                                bean: objA1852,
                                lstA1852: lstA1852,
                                actionCode: 'M',
                                objPermiso: me.objPermiso
                            }
                        }).show();
                    } else global.Msg({ msg: 'Data not found' });
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="loadlst1852">
    loadlst1852: function() {
        Ext.Ajax.request({
            url: prototype.url+'/loadlst1852',
            method: 'POST',
            timeout: 60000000,
            success: function(response, opts){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstA1852 = res.loadlst1852;
                    Ext.create('Ext.Praxis.view.interline.SourceCodeForm.DataEntry', {
                        id: 'DataEntrySourceCodeForm',
                        params: {
                            bean: {},
                            lstA1852: lstA1852,
                            actionCode: 'A',
                            objPermiso: me.objPermiso
                        }
                    }).show();
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>

    exportExcel: function() {
        global.getFile(_path);
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
