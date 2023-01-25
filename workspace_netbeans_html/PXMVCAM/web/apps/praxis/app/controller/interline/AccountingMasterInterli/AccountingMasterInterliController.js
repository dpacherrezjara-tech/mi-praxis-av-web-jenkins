Ext.define('Ext.Praxis.controller.interline.AccountingMasterInterli.AccountingMasterInterliController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterInterliController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    bean: {},
    objPermiso: {},
    _path: '',
    PERMISO: false,
    // </editor-fold>
    init: function (view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'AccountingMasterInterliForm';
        prototype.url = CONTEXTPATH + '/AccountingMasterInterli';
        prototype.widthContenedor = 1480;
        prototype.widthGrid = 1430;
        // </editor-fold>
    },
    afterRender: function () {
        this.btnSearch_click();
        this.verificarPermisos('PX00000210');
    },
    verificarPermisos: function(nprog) {
//        var me1 = this;
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

    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function (obj, e) {
        this.bean.IN_A1740TITRA = this.getValue("txtDocumentType");
        this.bean.IN_A1740TIPO = this.getValue("cmbCtaType");
        this.bean.A1740SUBTI = this.getValue("txtSubType");
        this.bean.A1740CATEG = this.getValue("txtCategory");
        this.bean.A1740CTA = this.getValue("txtCta");
        this.bean.A1740SCTA = this.getValue("txtSubCta");
        _path = prototype.url + '/getXLSX?' +
                'IN_A1740TITRA=' + this.bean.IN_A1740TITRA + '&' +
                'IN_A1740TIPO=' + this.bean.IN_A1740TIPO + '&' +
                'A1740SUBTI=' + this.bean.A1740SUBTI + '&' +
                'A1740CATEG=' + this.bean.A1740CATEG + '&' +
                'A1740CTA=' + this.bean.A1740CTA + '&' +
                'A1740SCTA=' + this.bean.A1740SCTA;

        this.search(this.bean);
    },
    search: function (bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.AccountingMasterInterli.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj) {
                    //<editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    //</editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnClear_click: function (obj, e) {
        this.setValue('txtDocumentType', '');
        this.setValue('cmbCtaType', '');
        this.setValue('txtSubType', '');
        this.setValue('txtCategory', '');
        this.setValue('txtCta', '');
        this.setValue('txtSubCta', '');
    },
    btnExcel_click: function (obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    btnAdd_click: function (obj, e) {
        this.winDataEntry('A');
    },
    btnBack_click: function () {
        global.showMenu();
    },
    imFavo_clickHandler: function (cmp) {
        var url = "resources/img/botones/";
        if (cmp.icon === url + "addFav2.png") {
            cmp.setIcon(url + "delFav.png");
            Ext.getCmp(prototype.id + '-imgType').setTooltip("Delete Favorite");
            global.Msg({msg: 'Menu is added to favorite'});
//            this.insertFavoriteMenu(this.bean2149);	
        } else if (cmp.icon === url + "delFav.png") {
            cmp.setIcon(url + "addFav2.png");
            Ext.getCmp(prototype.id + '-imgType').setTooltip("Add Favorite");
            global.Msg({msg: 'Menu is Remove to favorite'});
//            this.deleteFavoriteMenu(this.bean2149);
        }
    },
    //</editor-fold>

    exportExcel: function () {
        global.getFile(_path);
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var data = grid.getStore().getAt(rowIndex).data;
        this.winDataEntry('M', data);
    },
    winDataEntry: function (action, data) {
        
        action = action === null || action === undefined ? 'M' : action;
        data = data === null || data === undefined ? {} : data;
                
        Ext.create('Ext.Praxis.view.interline.AccountingMasterInterliForm.DataEntry', {
            id: 'DataEntryAccountingMasterInterliForm',
            params: {
                action: action,
                bean: data,
                objPermiso: me.objPermiso
            }
        }).show();

    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function (obj, e) {
        Ext.getCmp(prototype.id + '-paggin').moveFirst();
    },
    pagPrevious: function (obj, e) {
        Ext.getCmp(prototype.id + '-paggin').movePrevious();
    },
    pagNext: function (obj, e) {
        Ext.getCmp(prototype.id + '-paggin').moveNext();
    },
    pagLast: function (obj, e) {
        Ext.getCmp(prototype.id + '-paggin').moveLast();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});
