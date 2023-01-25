Ext.define('Ext.Praxis.controller.sales.CityMasterFile.CityMasterFileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CityMasterFileController',
    me: '',
    bean: {},
    pagData: '',
    _path: '',
    init: function(view) {
        me = this;
        prototype.id = 'CityMasterFileForm';       
        prototype.url = CONTEXTPATH + '/CityMasterFile';
    },
    afterRender: function () {
        this.imgSearch_clickHandler(false);
    },
    cbxFiltro_changeHandler: function(obj , newValue , oldValue , eOpts) {
        Ext.getCmp(prototype.id + '-txtSearch').show();
        Ext.getCmp(prototype.id + '-txtSearch').setValue('');
        Ext.getCmp(prototype.id + '-txtSearch').focus();
        
        var selectedValue = Ext.getCmp(prototype.id + '-cbxFiltro').getValue();
        if(selectedValue === 'CODECIU')  Ext.getCmp(prototype.id+'-txtSearch').inputEl.dom.maxLength=3;
	else if(selectedValue === 'NAME')Ext.getCmp(prototype.id+'-txtSearch').inputEl.dom.maxLength=15;
	else if(selectedValue === 'CODEAERO') Ext.getCmp(prototype.id+'-txtSearch').inputEl.dom.maxLength=3;
	else if(selectedValue === 'CODEPAIS')Ext.getCmp(prototype.id+'-txtSearch').inputEl.dom.maxLength=2;
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.sales.CityMasterFileForm.DataEntry', {
            id: 'DataEntryCityMasterFileForm',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    //<editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(paginacion) {
        var selectedValue = Ext.getCmp(prototype.id + '-cbxFiltro').getValue();
        if(selectedValue === 'CODECIU'){
            this.bean.A1007CTATO = '';
            this.bean.A1007CIUD = Ext.getCmp(prototype.id + '-txtSearch').getValue();
            this.bean.A1007PAIS = '';
            this.bean.A1007NOMCD = '';
        }else if(selectedValue === 'NAME'){
           this.bean.A1007CTATO = '';
           this.bean.A1007CIUD = '';
           this.bean.A1007PAIS = '';
           this.bean.A1007NOMCD = Ext.getCmp(prototype.id + '-txtSearch').getValue();

        }else if(selectedValue === 'CODEAERO'){
           this.bean.A1007CTATO = Ext.getCmp(prototype.id + '-txtSearch').getValue();
           this.bean.A1007CIUD = '';
           this.bean.A1007PAIS = '';
           this.bean.A1007NOMCD = '';

        }else if(selectedValue === 'CODEPAIS'){
           this.bean.A1007CTATO = '';
           this.bean.A1007CIUD = '';
           this.bean.A1007PAIS = Ext.getCmp(prototype.id + '-txtSearch').getValue();
           this.bean.A1007NOMCD = '';
        }
        if(!paginacion){
            this.bean.intCurrentPg = -1;
            this.bean.intTotalPgs = -1;
            this.bean.intTotalRws = -1;
        }
        this.bean.intPageRws = 20;
        this.search(this.bean);
        _path = prototype.url+'/getXLSX?beanString='+JSON.stringify(this.bean);
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) option.setVisible(false);
        else option.setVisible(true);
    },
    btnExcel_click: function(obj, e) {
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
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id+'-cbxFiltro').setValue("CODECIU");
        Ext.getCmp(prototype.id+'-txtSearch').setValue("");
        Ext.getCmp(prototype.id+'-gridData').getStore().removeAll();
        this.imgSearch_clickHandler(false);
    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    btnBack_click: function() {
        global.showMenu();
    },
    //</editor-fold>

    exportExcel: function() {
        global.getFile(_path);
    },
    
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1007");
                    //<editor-fold defaultstate="collapsed" desc="setPaggin">
                    me.pagData = obj.data.items[0].data;
                    
                    var currentPage = Ext.util.Format.number(me.pagData.intCurrentPg, '0,000');
                    var pageCount = Ext.util.Format.number(me.pagData.intTotalPgs, '0,000');
                    var total = Ext.util.Format.number(me.pagData.intTotalRws, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    //</editor-fold>
                    Ext.getCmp(prototype.id + '-boxPaginacion').show();
                    Ext.getCmp(prototype.id + '-pie').show();
                    
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Funciones para la paginacion">
    pagFirst: function(obj, e) {
        this.bean.intCurrentPg = 1;
        if(me.pagData.intTotalPgs !== ''){
            this.bean.intTotalPgs = Number(me.pagData.intTotalPgs);
        }
        if(me.pagData.intTotalRws !== ''){
            this.bean.intTotalRws = Number(me.pagData.intTotalRws);
        }
        this.imgSearch_clickHandler(true);
    },
    pagPrevious: function(obj, e) {
        if (me.pagData.intCurrentPg !== '') {
            var pagAc = Number(me.pagData.intCurrentPg);
            if (pagAc > 1) {
                this.bean.intCurrentPg = pagAc - 1;
            }
        }
        if(me.pagData.intTotalPgs !== ''){
            this.bean.intTotalPgs = Number(me.pagData.intTotalPgs);
        }
        if(me.pagData.intTotalRws != ''){
            this.bean.intTotalRws = Number(me.pagData.intTotalRws);
        }
        this.imgSearch_clickHandler(true);
    },
    pagNext: function(obj, e) {
        if (me.pagData.intCurrentPg !== '' && me.pagData.intTotalPgs !== '') {
            var pagAc = Number(me.pagData.intCurrentPg);
            var pagTo = Number(me.pagData.intTotalPgs);
            if (pagAc < pagTo) {
                this.bean.intCurrentPg = pagAc + 1;
            }
            this.bean.intTotalPgs = pagTo;
        }
        if(me.pagData.intTotalRws !== ''){
            this.bean.intTotalRws = Number(me.pagData.intTotalRws);
        }
        this.imgSearch_clickHandler(true);
    },
    pagLast: function(obj, e) {
        if(me.pagData.intTotalPgs !== ''){
            this.bean.intCurrentPg = Number(me.pagData.intTotalPgs);
            this.bean.intTotalPgs = Number(me.pagData.intTotalPgs);
        }
        if(me.pagData.intTotalRws !== ''){
            this.bean.intTotalRws = Number(me.pagData.intTotalRws);
        }
        this.imgSearch_clickHandler(true);
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.imgSearch_clickHandler(false);
        }
    }
    //</editor-fold>

});
