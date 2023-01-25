Ext.define('Ext.Praxis.controller.sales.AccountingMasterSales.AccountingMasterSalesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterSalesController',
    searchParams: {},
    init: function(view) {
        prototype.id = 'AccountingMasterSalesForm';
        prototype.url = CONTEXTPATH + '/AccountingMasterSales';
        prototype.widthContenedor = 1500;
        prototype.widthGrid = 1459;
       
        var me = this;
        this.control({
            '#AccountingMasterSalesForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AccountingMasterSalesForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AccountingMasterSalesForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AccountingMasterSalesForm-btn-pag-last': {
                click: this.pagLast
            },
            '#AccountingMasterSalesForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AccountingMasterSalesForm-btnFilter': {
                click: this.btnFilter_click
            },
////            '#AccountingMasterSalesForm-btnDisplay': {
////                click: this.btnDisplay_click
////            },
            '#AccountingMasterSalesForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AccountingMasterSalesForm-btnClear': {
                click: this.btnClear_click
            },
            '#AccountingMasterSalesForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#AccountingMasterSalesForm-btnBack': {
                click: this.btnBack_click
            }
        });
    },
    afterRender: function () {
        this.btnClear_click();
        this.btnSearch_click();
    },
    setFormatParameter: function() {
        var IN_A1740TITRA = Ext.getCmp(prototype.id + '-txtDocumentType').getValue();
        var IN_A1740TIPO = Ext.getCmp(prototype.id + '-cmbCtaType').getValue();
        var A1740SUBTI = Ext.getCmp(prototype.id + '-txtSubType').getValue();
        var A1740CATEG = Ext.getCmp(prototype.id + '-txtCategory').getValue();
        var A1740CTA = Ext.getCmp(prototype.id + '-txtCta').getValue();
        var A1740SCTA = Ext.getCmp(prototype.id + '-txtSubCta').getValue();
        
        searchParams = {
            IN_A1740TITRA: IN_A1740TITRA,
            IN_A1740TIPO: IN_A1740TIPO,
            A1740SUBTI: A1740SUBTI,
            A1740CATEG: A1740CATEG,
            A1740CTA: A1740CTA,
            A1740SCTA: A1740SCTA
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
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.AccountingMasterSales.GridData', {
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
        Ext.getCmp(prototype.id+'-txtDocumentType').setValue("");
        Ext.getCmp(prototype.id+'-cmbCtaType').setValue("");
        Ext.getCmp(prototype.id+'-txtSubType').setValue("");
        Ext.getCmp(prototype.id+'-txtCategory').setValue("");
        Ext.getCmp(prototype.id+'-txtCta').setValue("");
        Ext.getCmp(prototype.id+'-txtSubCta').setValue("");
        Ext.getCmp(prototype.id+'-txtDocumentType').focus();
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
        global.getFile(prototype.url + '/getXLSX?IN_A1740TITRA=' + searchParams.IN_A1740TITRA + 
                '&IN_A1740TIPO=' + searchParams.IN_A1740TIPO + 
                '&A1740SUBTI=' + searchParams.A1740SUBTI + 
                '&A1740CATEG=' + searchParams.A1740CATEG + 
                '&A1740CTA=' + searchParams.A1740CTA + 
                '&A1740SCTA=' + searchParams.A1740SCTA);
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
        Ext.create('Ext.Praxis.view.sales.AccountingMasterSalesForm.DataEntry', {
            id: 'DataEntryAccountingMasterSalesForm',
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
