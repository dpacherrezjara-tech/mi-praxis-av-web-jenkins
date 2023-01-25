Ext.define('Ext.Praxis.controller.plm.MasterClassifications.MasterClassificationsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MasterClassificationsController',
    bean: {},
    NPROG: '',
    init: function(view) {
    },
    afterRender: function () {
        this.imgSearch_clickHandler();
    },
    //<editor-fold defaultstate="collapsed" desc="onViewClick">
    gridData_act1_clickHandler: function (column, e, row, column, x, rowData) {
        var bean = x.record.data;
        var DataEntry = Ext.create('Ext.Praxis.view.plm.MasterClassificationsForm.DataEntry', { id: 'DataEntryMasterClassificationsForm' });
        var controller = DataEntry.getController();
        controller.bean = bean;
        controller.actionCode = 'U';
        DataEntry.show();
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        this.bean.IN_A3379CLASI = win.getValue('txtCode');
        this.search(this.bean);
    },
    imgFilter_clickHandler: function(obj) {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    imgExcel_clickHandler: function(obj, e) {
        this.bean.IN_A3379CLASI = win.getValue('txtCode');
        _path = prototype.url+'/getXLSX?beanString='+encodeURI(JSON.stringify(this.bean));
        this.exportExcel(_path);
    },
    imgAdd_clickHandler: function () {
        var DataEntry = Ext.create('Ext.Praxis.view.plm.MasterClassificationsForm.DataEntry', { id: 'DataEntryMasterClassificationsForm' });
        var controller = DataEntry.getController();
        controller.actionCode = 'I';
        DataEntry.show();
    },
    imgClear_clickHandler: function(obj, e) {
        win.setValue('txtCode', '');
        this.imgSearch_clickHandler();
    },
    imgBack_clickHandler: function() {
        global.showMenu();
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.plm.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    win.lblUser_toolTip("Estructura: A3379");
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {   
                        if (obj.data.length === 0) {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
    },
    //</editor-fold>
    
    exportExcel: function(_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
    },
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    }
    // </editor-fold>
});
