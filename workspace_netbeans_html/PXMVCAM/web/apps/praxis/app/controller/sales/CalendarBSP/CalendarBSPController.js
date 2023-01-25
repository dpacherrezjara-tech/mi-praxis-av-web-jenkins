Ext.define('Ext.Praxis.controller.sales.CalendarBSP.CalendarBSPController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CalendarBSPController',
    searchParams: {},
    fecha: new Date(),
    init: function(view) {
        prototype.id = 'CalendarBSPForm';       
        prototype.url = CONTEXTPATH + '/CalendarBSP';
        prototype.widthContenedor = 1040;
        prototype.widthGrid = 934;
       
        var me = this;
        this.control({
            '#CalendarBSPForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CalendarBSPForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CalendarBSPForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CalendarBSPForm-btn-pag-last': {
                click: this.pagLast
            },
            '#CalendarBSPForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CalendarBSPForm-btnFilter': {
                click: this.btnFilter_click
            },
////            '#CalendarBSPForm-btnDisplay': {
////                click: this.btnDisplay_click
////            },
            '#CalendarBSPForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CalendarBSPForm-btnClear': {
                click: this.btnClear_click
            },
            '#CalendarBSPForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#CalendarBSPForm-btnBack': {
                click: this.btnBack_click
            }
        });
    },
    afterRender: function () {
        this.setStoreData();
//        this.btnClear_click();
//        this.btnSearch_click();
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cbxDateYear').bindStore(storeComboDataYear);
    },
    setFormatParameter: function() {
        var cbxDateYear = Ext.getCmp(prototype.id + '-cbxDateYear').getValue();
        var IN_A1529ISOC = Ext.getCmp(prototype.id + '-IN_A1529ISOC').getValue();
        
        searchParams = {
            IN_A1529ISOC: IN_A1529ISOC,
            IN_A1529ANIO: cbxDateYear
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
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.CalendarBSP.GridData', {
            proxy: {
                url: prototype.url + '/searchBSP'
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
    onCloneCalendarClick: function() {
        var IN_A1529ISOC = Ext.getCmp(prototype.id+'-IN_A1529ISOC').getValue();
        var IN_A1529ANIO = Ext.getCmp(prototype.id+'-cbxDateYear').getValue();
        this.winDataEntryClone(IN_A1529ISOC, IN_A1529ANIO);
    },
    winDataEntryClone: function(ISOC, ANIO) {
        Ext.create('Ext.Praxis.view.sales.CalendarBSPForm.DataEntryClone', {
            id: 'DataEntryCloneCalendarBSPForm',
            params: {
                IN_A1529ISOC: ISOC,
                IN_A1529ANIO: ANIO
            }
        }).show();
    },
    btnClear_click: function(obj, e) {
        var year = Ext.getCmp(prototype.id + '-cbxDateYear');

        year.setValue(this.fecha.getFullYear());
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
        global.getFile(prototype.url + '/getXLSX?IN_A1529ISOC=' + searchParams.IN_A1529ISOC +
                '&IN_A1529ANIO=' + searchParams.IN_A1529ANIO);
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
        Ext.create('Ext.Praxis.view.sales.CalendarBSPForm.DataEntry', {
            id: 'DataEntryCalendarBSPForm',
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
