Ext.define('Ext.Praxis.controller.flown.FlightClassification.FlightClassificationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FlightClassificationController',
    searchParams: {},
    init: function(view) {
        prototype.id = 'FlightClassificationForm';
        prototype.url = CONTEXTPATH + '/FlightClassification';
        prototype.widthContenedor = 650;
        prototype.widthGrid = 564;
       
        var me = this;
        this.control({
            '#FlightClassificationForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#FlightClassificationForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#FlightClassificationForm-btn-pag-next': {
                click: this.pagNext
            },
            '#FlightClassificationForm-btn-pag-last': {
                click: this.pagLast
            },
            '#FlightClassificationForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#FlightClassificationForm-btnFilter': {
                click: this.btnFilter_click
            },
////            '#FlightClassificationForm-btnDisplay': {
////                click: this.btnDisplay_click
////            },
            '#FlightClassificationForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#FlightClassificationForm-btnClear': {
                click: this.btnClear_click
            },
//            '#FlightClassificationForm-btnAdd': {
//                click: this.btnAdd_click
//            },
            '#FlightClassificationForm-btnBack': {
                click: this.btnBack_click
            }
        });
    },
    afterRender: function () {
        this.btnClear_click();
        this.btnSearch_click();
    },
    setFormatParameter: function() {
        var IN_A051KEY1 = "IF"; // Ext.getCmp(prototype.id + '-txtIN_A051KEY1').getValue();
        
        searchParams = {
            IN_A051KEY1: IN_A051KEY1
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
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.FlightClassification.GridData', {
            proxy: {
                url: prototype.url + '/searchMicelania'
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
        Ext.getCmp(prototype.id + '-gridlstMicelaniaRep').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id+'-txtIN_A051KEY1').setValue("");
        Ext.getCmp(prototype.id+'-txtIN_A051KEY1').focus();
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
        global.getFile(prototype.url + '/getXLSX?IN_A051KEY1=' + searchParams.IN_A051KEY1);
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
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.flown.FlightClassificationForm.DataEntry', {
            id: 'DataEntryFlightClassificationForm',
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
