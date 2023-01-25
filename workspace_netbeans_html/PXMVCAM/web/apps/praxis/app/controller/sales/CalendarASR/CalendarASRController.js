Ext.define('Ext.Praxis.controller.sales.CalendarASR.CalendarASRController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CalendarASRController',
    searchParams: {},
    fecha: new Date(),
    init: function(view) {
        prototype.id = 'CalendarASRForm';       
        prototype.url = CONTEXTPATH + '/CalendarASR';
        prototype.widthContenedor = 850;
        prototype.widthGrid = 626;
       
        var me = this;
        this.control({
            '#CalendarASRForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CalendarASRForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CalendarASRForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CalendarASRForm-btn-pag-last': {
                click: this.pagLast
            },
            '#CalendarASRForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CalendarASRForm-btnFilter': {
                click: this.btnFilter_click
            },
////            '#CalendarASRForm-btnDisplay': {
////                click: this.btnDisplay_click
////            },
            '#CalendarASRForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CalendarASRForm-btnClear': {
                click: this.btnClear_click
            },
            '#CalendarASRForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#CalendarASRForm-btnBack': {
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

        var storeComboDataMonth = win.getStoreMonth(false);
        Ext.getCmp(prototype.id + '-cbxDateMonth').bindStore(storeComboDataMonth);
    },
    setFormatParameter: function() {
        var cbxDateYear = Ext.getCmp(prototype.id + '-cbxDateYear');
        var cbxDateMonth = Ext.getCmp(prototype.id + '-cbxDateMonth');

        var date= cbxDateYear.getValue() + cbxDateMonth.getValue();
        
        searchParams = {
            IN_A1528FPRO: date
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
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.CalendarASR.GridData', {
            proxy: {
                url: prototype.url + '/searchASR'
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
        var year = Ext.getCmp(prototype.id + '-cbxDateYear');
        var month = Ext.getCmp(prototype.id + '-cbxDateMonth');

        year.setValue(this.fecha.getFullYear());
        month.setValue("01");
    },
    onAutoGenerarClick: function() {
        var IN_YEAR = Ext.getCmp(prototype.id+'-cbxDateYear').getValue();
        Ext.Ajax.request({
            url: prototype.url + '/ProcCalendarASR',
            method: 'POST',
            timeout: 60000000,
            params: {
                IN_YEAR: IN_YEAR
            },
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.intResult;

                global.Msg({
                    msg: msg
                });
            }
        });
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
        global.getFile(prototype.url + '/getXLSX?IN_A1528FPRO=' + searchParams.IN_A1528FPRO);
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
        Ext.create('Ext.Praxis.view.sales.CalendarASRForm.DataEntry', {
            id: 'DataEntryCalendarASRForm',
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
