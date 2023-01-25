Ext.define('Ext.Praxis.controller.salesaudit.Iva.IvaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.IvaController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    childs: '',
    stack: [],
    bean: {},
    _path: '',
    // </editor-fold>
    init: function(view) {
        me = this;
        this.childs = Ext.getCmp(prototype.id + '-boxConsultas').items.items;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'IvaForm';
        prototype.url = CONTEXTPATH+'/Iva';
        // </editor-fold>
    },
    afterRender: function () {
        this.imgSearch_clickHandler();
    },
    OnBeforeShow: function () {
        prototype.id = 'IvaForm';
        prototype.url = CONTEXTPATH+'/Iva';
        prototype.widthContenedor = 1200;
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var data = store.getAt(rowIndex).data;
        this.winDataEntry('U', data);
    },
    winDataEntry: function(action, data) {
        action = action === null || action === undefined ? 'U' : action;
        data = data === null || data === undefined ? {} : data;
        Ext.create('Ext.Praxis.view.salesaudit.IvaForm.DataEntry', {
            id: 'DataEntryIvaForm',
            params: {
                actionCode: action,
                bean: data
            }
        }).show();
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        var ComboBy = this.getValue("cmbType");
        
        this.bean.VP_OPCION='';
        this.bean.VP_CODPAIS='';
        
        if (this.getValue("txtCampo") === '') {
            this.bean.VP_OPCION='';
        } else {
            this.bean.VP_OPCION='C'
            this.bean.VP_CODPAIS = this.getValue("txtCampo");
        }
        this.bean.VP_PAIS = ComboBy;
        this.search(this.bean);
        _path = prototype.url+'/getXLSX?' +
            'beanString='+JSON.stringify(this.bean);
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
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    imgBack_clickHandler: function() {
        global.showMenu();
    },
    // </editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.salesAudit.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A2664");
                    
                    me.selectedChild('boxMainData', 'paggin', false);
                    
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
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
            
            var width = 0, wt;
            var boxChild = Ext.getCmp(prototype.id + '-' + boxId).items.items;
            for (var i = 0; i < boxChild.length; i++) {
                wt = boxChild[i].getWidth();
                if (wt > width) {
                    width = wt;
                }
            }
            Ext.getCmp(prototype.id + '-pie').setWidth(width);
        }
    },
    peek: function () {
        return this.stack[this.stack.length - 1];
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
