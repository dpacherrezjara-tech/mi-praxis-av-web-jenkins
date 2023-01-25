Ext.define('Ext.Praxis.controller.flown.AircraftMaster.AircraftMasterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AircraftMasterController',
    bean: {},
    searchParams: {},
    _path: '',
    me: '',
    setContext: function () {
        me = this;
    },
    init: function(view) {
        me = this;
        prototype.id = 'AircraftMasterForm';
        prototype.url = CONTEXTPATH + '/AircraftMaster';
    },
    afterRender: function () {
        this.onSearchClick();
    },
    cbxFiltro_clickHandler: function( obj , newValue , oldValue , eOpts){
        this.setValue('txtCampo', '');
        var selectedValue = this.getValue("cbxFiltro");
        Ext.getCmp(prototype.id + '-txtCampo').show();
        if(selectedValue ===''){
            Ext.getCmp(prototype.id + '-txtCampo').hide();
	}else if(selectedValue ==='EQUIPO'){
            Ext.getCmp(prototype.id+'-txtCampo').inputEl.dom.maxLength=6;
	}else if(selectedValue ==='MODELO'){
            Ext.getCmp(prototype.id+'-txtCampo').inputEl.dom.maxLength=10;
	}else if(selectedValue ==='MATRIC'){
            Ext.getCmp(prototype.id+'-txtCampo').inputEl.dom.maxLength=15;
	}
        this.onSearchClick();
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.flown.AircraftMasterForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                actionCode: action,
                rec: rec
            }
        }).show();
    },
    //<editor-fold defaultstate="collapsed" desc="Options">
    onSearchClick: function(obj, e) {
        this.bean.IN_VALORTXT = Ext.getCmp(prototype.id + '-txtCampo').getValue();
	this.bean.IN_TIPOTXT = Ext.getCmp(prototype.id + '-cbxFiltro').getValue();
        
        this.search(this.bean);
    },
    onFilterClick: function(obj) {
        var cmp = Ext.getCmp(prototype.id + '-contentFilter');
        if(cmp.isVisible()) {
            Ext.getCmp(prototype.id + '-contentFilter').hide();
        } else {
            Ext.getCmp(prototype.id + '-contentFilter').show();
        }
    },
    onDisplayClick: function() {
    },
    onExcelClick: function(obj, e) {
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
    onClearClick: function(obj, e) {
    },
    onAddClick: function(obj, e) {
        this.winDataEntry('I');
    },
    onBackClick: function() {
        global.showMenu();
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.AircraftMaster.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1702");
                    
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        _path = prototype.url+'/getXLSX?' +
            'IN_VALORTXT='+bean.IN_VALORTXT+'&' +
            'IN_TIPOTXT='+bean.IN_TIPOTXT;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1702">
    MaintenanceA1702: function(beanTemp, strOption) {
        Ext.Ajax.request({
            url: prototype.url+'/MaintenanceA1702',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanTemp), strOption: strOption},
            success: function(response, opts){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msj = res.Mensaje;
                    global.Msg({ msg: msj });
                    me.search(me.bean);
                    meEntry.btnCancel_clickHandler();
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
