Ext.define('Ext.Praxis.controller.salesaudit.NumberingRangesADM.NumberingRangesADMController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.NumberingRangesADMController',
    bean: {},
    NPROG: '',
    init: function(view) {
    },
    afterRender: function () {
        this.imgSearch_clickHandler();
    },
    OnBeforeShow: function () {
        prototype.id = 'NumberingRangesADM';
        prototype.url = CONTEXTPATH+'/NumberingRangesADM';
        prototype.widthContenedor = 1200;
    },
    //<editor-fold defaultstate="collapsed" desc="onViewClick">
    gridData_act1_clickHandler: function (column, e, row, column, x, rowData) {
        var bean = x.record.data;
        var DataEntry = Ext.create('Ext.Praxis.view.salesaudit.NumberingRangesADMForm.DataEntry', { id: 'DataEntryNumberingRangesADMForm' });
        var controller = DataEntry.getController();
        controller.beanBrow = bean;
        controller.actionCode = 'U';
        DataEntry.show();
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        this.bean.VP_OPCION='';
        this.bean.VP_PAIS='';
	if(win.getValue('txtCampo')===''){
            this.bean.VP_OPCION='';
	}else {
            this.bean.VP_OPCION='P'
            this.bean.VP_PAIS = win.getValue('txtCampo');
	}
        this.search(this.bean);
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    btnExcel_click: function(obj, e) {
        if(win.getValue('txtCampo')===''){
            this.bean.VP_OPCION='';
        }else {
            this.bean.VP_OPCION='P'
            this.bean.VP_PAIS = win.getValue('txtCampo');
        }
        _path = prototype.url+'/getXLSX?beanString='+encodeURI(JSON.stringify(this.bean));
        this.exportExcel(_path);
    },
    imgAdd_clickHandler: function () {
        var DataEntry = Ext.create('Ext.Praxis.view.salesaudit.NumberingRangesADMForm.DataEntry', { id: 'DataEntryNumberingRangesADMForm' });
        var controller = DataEntry.getController();
        controller.actionCode = 'I';
        controller.filtro = win.getValue('txtCampo').trim();
        DataEntry.show();
    },
    imgClear_clickHandler: function(obj, e) {
        win.setValue('txtCampo', '');
        win.removeAll('gridData');
    },
    //</editor-fold>
    
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
                load: function (obj, obj2, success, response, obj5) {
                    win.lblUser_toolTip("Estructura: A2563");
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        me.selectedChild('boxMainData');
//                        
                        if (obj.data.length === 0) {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
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
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        this.getPaggin(prototype.id+'-boxMainData').moveFirst();
    },
    pagPrevious: function(obj, e) {
        this.getPaggin(prototype.id+'-boxMainData').movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin(prototype.id+'-boxMainData').moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin(prototype.id+'-boxMainData').moveLast();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function(box) {
        win.selectedChild('vskDataGrid', box);
        var paggin = this.getPaggin(prototype.id+'-'+box);
        if (paggin === null) {
            win.visible('boxPaginacion', false);
            win.visible('boxPagDetail', false);
        } else {
            //<editor-fold defaultstate="collapsed" desc="setPaggin">
            var pagData = paggin.getPageData();
            
            var currentPage = win.formatLngNumber(pagData.currentPage);
            var pageCount = win.formatLngNumber(pagData.pageCount);
            var total = win.formatLngNumber(pagData.total);
            
            win.setText('lblPagActual', currentPage);
            win.setText('lblPagTotal', pageCount);
            win.setText('lblRowsTotal', total);
            //</editor-fold>
            win.visible('boxPaginacion', true);
            win.visible('boxPagDetail', true);

            var width = 0, wt;
            var boxChild = Ext.getCmp(prototype.id+'-'+box).items.items;
            for (var i = 0; i < boxChild.length; i++) {
                wt = boxChild[i].getWidth();
                if (wt > width) {
                    width = wt;
                }
            }
            Ext.getCmp(prototype.id+'-boxPagDetail').setWidth(width);
        }
    },
    getPaggin: function(box) {
        switch (box) {
            case prototype.id+'-boxMainData': return Ext.getCmp(prototype.id + '-paggin');
            default: return null;
        }
    },
//    onValidarChange: function(cmp, value) {
//        var list = cmp.getValue().replace(/\s/g, "").split("");
//        var txt = '';
//        for (var i = 0; i < list.length; i++) {
//            if (list[i].toLowerCase() === list[i].toUpperCase()) {
//                txt += list[i];
//            }
//        }
//        cmp.setValue(txt.substring(0, 13));
//        if (cmp.getValue() === '') {
//            this.habilitarFiltros();
//        }
//    },
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
