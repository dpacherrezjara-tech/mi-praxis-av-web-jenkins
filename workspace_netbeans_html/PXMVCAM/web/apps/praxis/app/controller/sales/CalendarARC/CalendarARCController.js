Ext.define('Ext.Praxis.controller.sales.CalendarARC.CalendarARCController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CalendarARCController',
    searchParams: {},
    fecha: new Date(),
    init: function(view) {
        prototype.id = 'CalendarARCForm';       
        prototype.url = CONTEXTPATH + '/CalendarARC';
        prototype.widthContenedor = 1040;
        prototype.widthGrid = 891;
       
        var me = this;
        this.control({
            '#CalendarARCForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CalendarARCForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CalendarARCForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CalendarARCForm-btn-pag-last': {
                click: this.pagLast
            },
            '#CalendarARCForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CalendarARCForm-btnFilter': {
                click: this.btnFilter_click
            },
////            '#CalendarARCForm-btnDisplay': {
////                click: this.btnDisplay_click
////            },
            '#CalendarARCForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CalendarARCForm-btnClear': {
                click: this.btnClear_click
            },
            '#CalendarARCForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#CalendarARCForm-btnBack': {
                click: this.btnBack_click
            }
        });
    },
    afterRender: function () {
        this.setStoreData();
        this.btnClear_click();
        this.btnSearch_click();
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cbxDateYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cbxDateMonth').bindStore(storeComboDataMonth);
    },
    setFormatParameter: function() {
        var cbxDateYear = Ext.getCmp(prototype.id + '-cbxDateYear');
        var cbxDateMonth = Ext.getCmp(prototype.id + '-cbxDateMonth');

        this.date= cbxDateYear.getValue() + cbxDateMonth.getValue();
        
        var selectedValue = Ext.getCmp(prototype.id + '-cbxSearchBy').getValue();
        
        searchParams = {
            IN_TFILTER: selectedValue,
            IN_A1527PPED: this.date
        };
    },
////    btnDisplay_click: function() {
////        global.Msg({
////            msg: 'Option not available.'
////        });
////    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    setGridData: function(obj, val) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.CalendarARC.GridData', {
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
        var search = Ext.getCmp(prototype.id + '-cbxSearchBy');
        var year = Ext.getCmp(prototype.id + '-cbxDateYear');
        var month = Ext.getCmp(prototype.id + '-cbxDateMonth');

        search.setValue("1");
        year.setValue(this.fecha.getFullYear());
        month.setValue("");
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
                '&IN_A1527PPED=' + searchParams.IN_A1527PPED);
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
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.sales.CalendarARCForm.DataEntry', {
            id: 'DataEntryCalendarARCForm',
            params: {
                action: action,
                rec: rec
            }
        }).show();

    },
//    onUpperValue: function(field, newValue, oldValue){
//        field.setValue(newValue.toUpperCase());
//    },
//    onTextKeypress: function( obj , e , eOpts){
//        if ( e.getKey() === e.ENTER ){
//            this.btnSearch_click();
//        }
//    },
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
