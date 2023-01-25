Ext.define('Ext.Praxis.controller.sales.AccountingMasterPagaTodo.AccountingMasterPagaTodoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterPagaTodoController',
    searchParams: {},
    init: function(view) {
        prototype.id = 'AccountingMasterPagaTodoForm';
        prototype.url = CONTEXTPATH + '/AccountingMasterPagaTodo';
        prototype.widthContenedor = 1300;
        prototype.widthGrid = 1289;
        
        var me = this;
        this.control({
            '#AccountingMasterPagaTodoForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AccountingMasterPagaTodoForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AccountingMasterPagaTodoForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AccountingMasterPagaTodoForm-btn-pag-last': {
                click: this.pagLast
            },
            '#AccountingMasterPagaTodoForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AccountingMasterPagaTodoForm-btnFilter': {
                click: this.btnFilter_click
            },
//////            '#AccountingMasterPagaTodoForm-btnDisplay': {
//////                click: this.btnDisplay_click
//////            },
            '#AccountingMasterPagaTodoForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AccountingMasterPagaTodoForm-btnClear': {
                click: this.btnClear_click
            },
            '#AccountingMasterPagaTodoForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#AccountingMasterPagaTodoForm-btnBack': {
                click: this.btnBack_click
            }
        });
    },
    afterRender: function () {
        this.btnClear_click();
        this.btnSearch_click();
    },
    onCmbSourceChange: function() {
        var option = Ext.getCmp(prototype.id + '-cbxSource').getValue();
        var bVisible = option === "1" ? true : false;
        if (bVisible) {
            Ext.getCmp(prototype.id + '-cboFOPCode').show();
            Ext.getCmp(prototype.id + '-txtPTCardNumber').hide();
            
            Ext.getCmp(prototype.id+'-txtCta').focus();
        } else {
            Ext.getCmp(prototype.id + '-cboFOPCode').hide();
            Ext.getCmp(prototype.id + '-txtPTCardNumber').show();
            
            Ext.getCmp(prototype.id+'-txtPTCardNumber').focus();
        }
    },
    setFormatParameter: function() {
        var cbxSource = Ext.getCmp(prototype.id + '-cbxSource').getValue();
        var cboFOPCode = Ext.getCmp(prototype.id + '-cboFOPCode').getValue();
        var txtPTCardNumber = Ext.getCmp(prototype.id + '-txtPTCardNumber').getValue();
        var txtCta = Ext.getCmp(prototype.id + '-txtCta').getValue();
        var txtSubCta = Ext.getCmp(prototype.id + '-txtSubCta').getValue();
        
        searchParams = {
            IN_FILTRO: cbxSource,
            IN_A1835FOPID: cboFOPCode,
            IN_A1835TARPT: txtPTCardNumber,
            A1835CUENT: txtCta,
            A1835SUBCT: txtSubCta
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
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.AccountingMasterPagaTodo.GridData', {
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
        Ext.getCmp(prototype.id+'-cbxSource').setValue("1");
        Ext.getCmp(prototype.id+'-cboFOPCode').setValue("");
        Ext.getCmp(prototype.id+'-txtPTCardNumber').setValue("");
        Ext.getCmp(prototype.id+'-txtCta').setValue("");
        Ext.getCmp(prototype.id+'-txtSubCta').setValue("");
//        var store = Ext.getCmp(prototype.id + '-gridData').getStore();
//        store.removeAll();
        Ext.getCmp(prototype.id+'-txtCta').focus();
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
        global.getFile(prototype.url + '/getXLSX?IN_FILTRO=' + searchParams.IN_FILTRO + 
                '&IN_A1835FOPID=' + searchParams.IN_A1835FOPID + 
                '&IN_A1835TARPT=' + searchParams.IN_A1835TARPT + 
                '&A1835CUENT=' + searchParams.A1835CUENT + 
                '&A1835SUBCT=' + searchParams.A1835SUBCT);
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
        Ext.create('Ext.Praxis.view.sales.AccountingMasterPagaTodoForm.DataEntry', {
            id: 'DataEntryAccountingMasterPagaTodoForm',
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
