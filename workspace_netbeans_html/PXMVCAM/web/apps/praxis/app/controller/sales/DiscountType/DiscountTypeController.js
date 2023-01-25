Ext.define('Ext.Praxis.controller.sales.DiscountType.DiscountTypeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DiscountTypeController',
    searchParams: {},
    init: function(view) {
        prototype.id = 'DiscountTypeForm';
        prototype.url = CONTEXTPATH + '/DiscountType';
        prototype.widthContenedor = 600;
        prototype.widthGrid = 460;
       
        var me = this;
        this.control({
            '#DiscountTypeForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#DiscountTypeForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#DiscountTypeForm-btn-pag-next': {
                click: this.pagNext
            },
            '#DiscountTypeForm-btn-pag-last': {
                click: this.pagLast
            },
            '#DiscountTypeForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#DiscountTypeForm-btnFilter': {
                click: this.btnFilter_click
            },
////            '#DiscountTypeForm-btnDisplay': {
////                click: this.btnDisplay_click
////            },
            '#DiscountTypeForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#DiscountTypeForm-btnClear': {
                click: this.btnClear_click
            },
//            '#DiscountTypeForm-btnAdd': {
//                click: this.btnAdd_click
//            },
            '#DiscountTypeForm-btnBack': {
                click: this.btnBack_click
            }
        });
    },
    afterRender: function () {
        this.btnClear_click();
        this.btnSearch_click();
    },
    onSearchByChange: function(obj , newValue , oldValue , eOpts) {
        Ext.getCmp(prototype.id+'-txtType').setValue("");
        var selectedValue = Ext.getCmp(prototype.id + '-cbxSearchBy').getValue();
        
        switch (selectedValue) {
            case "DEFAULT":
                Ext.getCmp(prototype.id + '-boxSearchFilterPK').show();
                Ext.getCmp(prototype.id+'-txtType').focus();
                break;
            default:
                Ext.getCmp(prototype.id + '-boxSearchFilterPK').hide();
        }
    },
    setFormatParameter: function() {
        var selectedValue = Ext.getCmp(prototype.id + '-cbxSearchBy').getValue();
        var IN_TFILTER = "", IN_A864TIPO = "";
        
        if (selectedValue === '') {
            selectedValue = 'DEFAULT';
        }
        
        switch (selectedValue) {
            case "DEFAULT":
                IN_TFILTER = "1";
                IN_A864TIPO = Ext.getCmp(prototype.id + '-txtType').getValue();
                break;
        }
        
        searchParams = {
            IN_TFILTER: IN_TFILTER,
            IN_A864TIPO: IN_A864TIPO
        };
    },
//    btnDisplay_click: function() {
//        global.Msg({
//            msg: 'Option not available.'
//        });
//    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    setGridData: function(obj, val) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.DiscountType.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id+'-cbxSearchBy').setValue("");
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
    exportExcel: function() {
        this.setFormatParameter();
        global.getFile(prototype.url + '/getXLSX?IN_TFILTER=' + searchParams.IN_TFILTER + 
                '&IN_A864TIPO=' + searchParams.IN_A864TIPO);
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) option.setVisible(false);
        else option.setVisible(true);
    },
    btnBack_click: function() {
        var heightMenu = 400;
        Ext.getCmp('App-main-region-content-north').setHeight(heightMenu);
    },
//    btnAdd_click: function() {
//        this.winDataEntry('I');
//    },
//    onEditClick: function(grid, rowIndex, colIndex) {
//        var rec = grid.getStore().getAt(rowIndex);
//        this.winDataEntry('U', rec);
//    },
//    winDataEntry: function(action, rec) {
//        action = action === null || action === undefined ? 'U' : action;
//        rec = rec === null || rec === undefined ? {} : rec;
//        Ext.create('Ext.Praxis.view.sales.DiscountTypeForm.DataEntry', {
//            id: 'DataEntryDiscountTypeForm',
//            params: {
//                action: action,
//                rec: rec
//            }
//        }).show();
//
//    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();

    },
    pagLast: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    }
});
