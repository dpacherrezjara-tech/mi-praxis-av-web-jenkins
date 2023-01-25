Ext.define('Ext.Praxis.controller.sales.PanicValue.PanicValueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PanicValueController',
    searchParams: {},
    init: function(view) {
        prototype.id = 'PanicValueForm';
        prototype.url = CONTEXTPATH + '/PanicValue';
        prototype.widthContenedor = 900;
        prototype.widthGrid = 829;
       
        var me = this;
        this.control({
            '#PanicValueForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#PanicValueForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#PanicValueForm-btn-pag-next': {
                click: this.pagNext
            },
            '#PanicValueForm-btn-pag-last': {
                click: this.pagLast
            },
            '#PanicValueForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#PanicValueForm-btnFilter': {
                click: this.btnFilter_click
            },
////            '#PanicValueForm-btnDisplay': {
////                click: this.btnDisplay_click
////            },
            '#PanicValueForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#PanicValueForm-btnClear': {
                click: this.btnClear_click
            },
//            '#PanicValueForm-btnAdd': {
//                click: this.btnAdd_click
//            },
            '#PanicValueForm-btnBack': {
                click: this.btnBack_click
            }
        });
    },
    afterRender: function () {
        this.btnClear_click();
        this.btnSearch_click();
    },
    onCmbOpcionChange: function(obj , newValue , oldValue , eOpts) {
        var selectedValue = Ext.getCmp(prototype.id + '-cmbOpcion').getValue();
        switch (selectedValue) {
            case "1":
                Ext.getCmp(prototype.id + '-txtCampo').setValue("");
                Ext.getCmp(prototype.id + '-txtCampo').inputEl.dom.maxLength=3;
                Ext.getCmp(prototype.id + '-txtCampo').show();
                Ext.getCmp(prototype.id + '-txtCampo').focus();
                break;
            case "2":
                Ext.getCmp(prototype.id + '-txtCampo').setValue("");
                Ext.getCmp(prototype.id + '-txtCampo').inputEl.dom.maxLength=8;
                Ext.getCmp(prototype.id + '-txtCampo').show();
                Ext.getCmp(prototype.id + '-txtCampo').focus();
                break;
            default:
                Ext.getCmp(prototype.id + '-txtCampo').hide();
        }
    },
    setFormatParameter: function() {
        var selectedValue = Ext.getCmp(prototype.id + '-cmbOpcion').getValue();
        var txtCampo = Ext.getCmp(prototype.id + '-txtCampo').getValue();
        var IN_OPCION, IN_TREGI = "", IN_FREGIS = "";
        switch (selectedValue) {
            case "1":
                IN_OPCION = "1";
                IN_TREGI = txtCampo;
                break;
            case "2":
                IN_OPCION = "2";
                IN_FREGIS = txtCampo;
                break;
            default:
                IN_OPCION = "1";
                break;
        }
        
        searchParams = {
            IN_OPCION: IN_OPCION,
            IN_TREGI: IN_TREGI,
            IN_FREGIS: IN_FREGIS
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
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.PanicValue.GridData', {
            proxy: {
                url: prototype.url + '/loadSearch'
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
        Ext.getCmp(prototype.id + '-gridPanicValue').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id+'-cmbOpcion').setValue("");
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
        global.getFile(prototype.url + '/getXLSX?IN_OPCION=' + searchParams.IN_OPCION + 
                '&IN_TREGI=' + searchParams.IN_TREGI + 
                '&IN_FREGIS=' + searchParams.IN_FREGIS);
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
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.sales.PanicValueForm.DataEntry', {
            id: 'DataEntryPanicValueForm',
            params: {
                action: action,
                rec: rec
            }
        }).show();

    },
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
