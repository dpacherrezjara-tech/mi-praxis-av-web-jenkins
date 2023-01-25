Ext.define('Ext.Praxis.controller.sales.BundlesReport.BundlesReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BundlesReportController',
    searchParams: {},
    init: function(view) {
        prototype.id = 'BundlesReportForm';
        prototype.url = CONTEXTPATH + '/BundlesReport';
        prototype.widthContenedor = 1100;
        prototype.widthGrid = 1070;
       
        var me = this;
        this.control({
            '#BundlesReportForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#BundlesReportForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#BundlesReportForm-btn-pag-next': {
                click: this.pagNext
            },
            '#BundlesReportForm-btn-pag-last': {
                click: this.pagLast
            },
            '#BundlesReportForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#BundlesReportForm-btnFilter': {
                click: this.btnFilter_click
            },
////            '#BundlesReportForm-btnDisplay': {
////                click: this.btnDisplay_click
////            },
            '#BundlesReportForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#BundlesReportForm-btnClear': {
                click: this.btnClear_click
            },
//            '#BundlesReportForm-btnAdd': {
//                click: this.btnAdd_click
//            },
            '#BundlesReportForm-btnBack': {
                click: this.btnBack_click
            }
        });
    },
    afterRender: function () {
        this.btnClear_click();
        this.btnSearch_click();
    },
    onTypeFilterChange: function(obj , newValue , oldValue , eOpts) {
        var selectedValue = Ext.getCmp(prototype.id + '-cmbTypeFilter').getValue();
        
        switch (selectedValue) {
            case "1":
                Ext.getCmp(prototype.id + '-HBox_Option01').show();
                Ext.getCmp(prototype.id+'-txtTicket').focus();
                break;
            default:
                Ext.getCmp(prototype.id + '-HBox_Option01').hide();
        }
    },
    setFormatParameter: function() {
        var cmbTypeFilter = Ext.getCmp(prototype.id + '-cmbTypeFilter').getValue();
//        var A2540CIA = Ext.getCmp(prototype.id + '-').getValue();
        var txtTicket = Ext.getCmp(prototype.id + '-txtTicket').getValue();
        
        searchParams = {
            IN_TFILTER: cmbTypeFilter,
            A2540CIA: "139",
            IN_TKT: txtTicket
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
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.BundlesReport.GridData', {
            proxy: {
                url: prototype.url + '/searchReport'
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
        Ext.getCmp(prototype.id + '-gridData02').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id+'-txtTicket').setValue("");
        Ext.getCmp(prototype.id+'-cmbTypeFilter').setValue("");
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
                '&A2540CIA=' + searchParams.A2540CIA + 
                '&IN_TKT=' + searchParams.IN_TKT);
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
//        Ext.create('Ext.Praxis.view.sales.BundlesReportForm.DataEntry', {
//            id: 'DataEntryBundlesReportForm',
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
