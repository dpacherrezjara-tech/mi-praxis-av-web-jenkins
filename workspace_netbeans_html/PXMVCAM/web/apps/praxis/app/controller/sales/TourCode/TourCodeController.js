Ext.define('Ext.Praxis.controller.sales.TourCode.TourCodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TourCodeController',
    searchParams: {},
    init: function(view) {
        prototype.id = 'TourCodeForm';
        prototype.url = CONTEXTPATH + '/TourCode';
        prototype.widthContenedor = 910;
        prototype.widthGrid = 889;
       
        var me = this;
        this.control({
            '#TourCodeForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#TourCodeForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#TourCodeForm-btn-pag-next': {
                click: this.pagNext
            },
            '#TourCodeForm-btn-pag-last': {
                click: this.pagLast
            },
            '#TourCodeForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#TourCodeForm-btnFilter': {
                click: this.btnFilter_click
            },
////            '#TourCodeForm-btnDisplay': {
////                click: this.btnDisplay_click
////            },
            '#TourCodeForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#TourCodeForm-btnClear': {
                click: this.btnClear_click
            },
//            '#TourCodeForm-btnAdd': {
//                click: this.btnAdd_click
//            },
            '#TourCodeForm-btnBack': {
                click: this.btnBack_click
            }
        });
    },
    afterRender: function () {
        this.btnClear_click();
        this.btnSearch_click();
    },
    onTypeFilterChange: function(obj , newValue , oldValue , eOpts) {
        var selectedValue = Ext.getCmp(prototype.id + '-cmbOpcion').getValue();
        
        switch (selectedValue) {
            case "IT":
                Ext.getCmp(prototype.id + '-txtCampo').show();
                Ext.getCmp(prototype.id + '-txtCampo').setValue("");
                Ext.getCmp(prototype.id + '-txtCampo').focus();
                break;
            default:
                Ext.getCmp(prototype.id + '-txtCampo').hide();
        }
    },
    setFormatParameter: function() {
        var selectedValue = Ext.getCmp(prototype.id + '-cmbOpcion').getValue();
        var IN_VALOR = Ext.getCmp(prototype.id + '-txtCampo').getValue();
        var IN_CAMPO = "";
        
        switch (selectedValue) {
            case "IT":
                IN_CAMPO = "CODEIT";
                break;
            default:
                IN_CAMPO = "CODEIT";
        }
        
        searchParams = {
            IN_CAMPO: IN_CAMPO,
            IN_VALOR: IN_VALOR
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
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.TourCode.GridData', {
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
        Ext.getCmp(prototype.id + '-gridTourCode').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id+'-cmbOpcion').setValue("IT");
    },
    btnExcel_click: function(obj, e) {
        global.Msg({
            msg: 'Option not available.'
        });
//        Ext.Msg.show({
//            title: '.:PRAXIS:.',
//            msg: 'Download Excel ?',
//            buttons: Ext.MessageBox.OKCANCEL,
//            scope: this,
//            icon: Ext.MessageBox.QUESTION,
//            modal: true,
//            fn: function(btn) {
//                if (btn === 'ok') {
//                    this.exportExcel();
//                }
//            }
//        });
    },
    exportExcel: function() {
        this.setFormatParameter();
        global.getFile(prototype.url + '/getXLSX?VP_A1772SUBCD=' + searchParams.VP_A1772SUBCD + '&VP_A1772RFIC=' + searchParams.VP_A1772RFIC);
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
        
    },
    btnBack_click: function() {
        
    },
//    btnAdd_click: function() {
//        this.winDataEntry('I');
//    },
    onEditClick: function(grid, rowIndex, colIndex) {
        global.Msg({
            msg: 'Option not available.'
        });
//        var rec = grid.getStore().getAt(rowIndex);
//        this.winDataEntry('U', rec);
    },
//    winDataEntry: function(action, rec) {
//        action = action === null || action === undefined ? 'U' : action;
//        rec = rec === null || rec === undefined ? {} : rec;
//        Ext.create('Ext.Praxis.view.sales.TourCodeForm.DataEntry', {
//            id: 'DataEntryTourCodeForm',
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
