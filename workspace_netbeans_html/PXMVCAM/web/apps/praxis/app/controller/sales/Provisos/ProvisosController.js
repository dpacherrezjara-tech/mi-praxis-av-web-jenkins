Ext.define('Ext.Praxis.controller.sales.Provisos.ProvisosController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProvisosController',
    searchParams: {},
    init: function(view) {
        prototype.id = 'ProvisosForm';       
        prototype.url = CONTEXTPATH + '/Provisos';
       
        var me = this;
        this.control({
        });
    },
    afterRender: function () {
        this.btnClear_click();
        this.btnSearch_click();
    },
    setFormatParameter: function() {
        var txtA856LINAER = Ext.getCmp(prototype.id + '-txtA856LINAER').getValue();
        var txtA856VIGDES = Ext.getCmp(prototype.id + '-txtA856VIGDES').getValue();
        var txtA856CLASE = Ext.getCmp(prototype.id + '-txtA856CLASE').getValue();
        var txtA856TIPTAR = Ext.getCmp(prototype.id + '-txtA856TIPTAR').getValue();
        var txtA856TRADES = Ext.getCmp(prototype.id + '-txtA856TRADES').getValue();
        var txtA856TRAHAS = Ext.getCmp(prototype.id + '-txtA856TRAHAS').getValue();
        
        searchParams = {
            IN_A856LINAER: txtA856LINAER,
            IN_A856VIGDES: txtA856VIGDES,
            IN_A856CLASE: txtA856CLASE,
            IN_A856TIPTAR: txtA856TIPTAR,
            IN_A856TRADES: txtA856TRADES,
            A856TRAHAS: txtA856TRAHAS
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
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.Provisos.GridData', {
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
        Ext.getCmp(prototype.id + '-gridCalendarBSP').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id+'-txtA856LINAER').setValue("");
        Ext.getCmp(prototype.id+'-txtA856VIGDES').setValue("");
        Ext.getCmp(prototype.id+'-txtA856CLASE').setValue("");
        Ext.getCmp(prototype.id+'-txtA856TIPTAR').setValue("");
        Ext.getCmp(prototype.id+'-txtA856TRADES').setValue("");
        Ext.getCmp(prototype.id+'-txtA856TRAHAS').setValue("");
        Ext.getCmp(prototype.id+'-txtA856LINAER').focus();
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
        global.getFile(prototype.url + '/getXLSX?IN_A856LINAER=' + searchParams.IN_A856LINAER + '&IN_A856VIGDES=' + searchParams.IN_A856VIGDES + '&IN_A856TIPTAR=' + searchParams.IN_A856TIPTAR + '&IN_A856CLASE=' + searchParams.IN_A856CLASE + '&IN_A856TRADES=' + searchParams.IN_A856TRADES + '&A856TRAHAS=' + searchParams.A856TRAHAS);
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
//        Ext.create('Ext.Praxis.view.sales.ProvisosForm.DataEntry', {
//            id: 'DataEntryProvisosForm',
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
