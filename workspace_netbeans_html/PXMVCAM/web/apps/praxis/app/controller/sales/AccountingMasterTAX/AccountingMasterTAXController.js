Ext.define('Ext.Praxis.controller.sales.AccountingMasterTAX.AccountingMasterTAXController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterTAXController',
    searchParams: {},
    init: function(view) {
        prototype.id = 'AccountingMasterTAXForm';
        prototype.url = CONTEXTPATH + '/AccountingMasterTAX';
        prototype.widthContenedor = 1500;
        prototype.widthGrid = 1459;
        
        var me = this;
        this.control({
            '#AccountingMasterTAXForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AccountingMasterTAXForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AccountingMasterTAXForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AccountingMasterTAXForm-btn-pag-last': {
                click: this.pagLast
            },
            '#AccountingMasterTAXForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AccountingMasterTAXForm-btnFilter': {
                click: this.btnFilter_click
            },
//////            '#AccountingMasterTAXForm-btnDisplay': {
//////                click: this.btnDisplay_click
//////            },
            '#AccountingMasterTAXForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AccountingMasterTAXForm-btnClear': {
                click: this.btnClear_click
            },
            '#AccountingMasterTAXForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#AccountingMasterTAXForm-btnBack': {
                click: this.btnBack_click
            }
        });
    },
    afterRender: function () {
        this.cargarComboBoxes();
        this.btnClear_click();
        this.btnSearch_click();
    },
    cargarComboBoxes: function () {
        var country = new Array(), tax = new Array(), currency = new Array();
        var store;
        Ext.Ajax.request({
            url: prototype.url + '/loadCombo',
            method: 'POST',
            timeout: 60000000,
//            params: searchParams,
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                var lstCountry = res.lstCountry;
                var lstTax = res.lstTax;
                var lstCurrency = res.lstCurrency;
                
                country.push(['', 'All']);
                lstCountry.forEach(function callback(currentValue, index, array) {
                    country.push([currentValue.A051KEY2, currentValue.A051DESCR1]);
                });
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'country', autoLoad: true, data: country, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id+'-cmbCountry').bindStore(store);
                
                tax.push(['', 'All']);
                lstTax.forEach(function callback(currentValue, index, array) {
                    tax.push([currentValue.A051DESCR1, currentValue.A051DESCR1]);
                });
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'tax', autoLoad: true, data: tax, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id+'-cmbTAX').bindStore(store);
                
                currency.push(['', 'All']);
                lstCurrency.forEach(function callback(currentValue, index, array) {
                    currency.push([currentValue.A006MONEDA, currentValue.A006MONEDA]);
                });
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'currency', autoLoad: true, data: currency, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id+'-cmbCurrency').bindStore(store);
            }
        });
    },
    setFormatParameter: function() {
        var IN_A1741TIPO = Ext.getCmp(prototype.id + '-Brw_cmbA1741TIPO').getValue();
        var IN_A1741PAIS = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        var IN_A1741MONED = Ext.getCmp(prototype.id + '-cmbCurrency').getValue();
        var IN_A1741CODE = Ext.getCmp(prototype.id + '-cmbTAX').getValue();
        var A1741CTA = Ext.getCmp(prototype.id + '-txtCta').getValue();
        var A1741SCTA = Ext.getCmp(prototype.id + '-txtSubCta').getValue();
        var A1741CTRL = Ext.getCmp(prototype.id + '-cboControlled').getValue();
        
        searchParams = {
            IN_A1741PAIS: IN_A1741PAIS,
            IN_A1741MONED: IN_A1741MONED,
            IN_A1741CODE: IN_A1741CODE,
            IN_A1741TIPO: IN_A1741TIPO,
            A1741CTA: A1741CTA,
            A1741SCTA: A1741SCTA,
            A1741CTRL: A1741CTRL
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
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.AccountingMasterTAX.GridData', {
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
        Ext.getCmp(prototype.id+'-cmbCountry').setValue("");
        Ext.getCmp(prototype.id+'-cmbCurrency').setValue("");
        Ext.getCmp(prototype.id+'-cmbTAX').setValue("");
        Ext.getCmp(prototype.id+'-Brw_cmbA1741TIPO').setValue("");
        Ext.getCmp(prototype.id+'-txtCta').setValue("");
        Ext.getCmp(prototype.id+'-txtSubCta').setValue("");
        var store = Ext.getCmp(prototype.id + '-gridData').getStore();
        store.removeAll();
        Ext.getCmp(prototype.id+'-cboControlled').setValue("");
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
        global.getFile(prototype.url + '/getXLSX?IN_A1741PAIS=' + searchParams.IN_A1741PAIS + 
                '&IN_A1741MONED=' + searchParams.IN_A1741MONED + 
                '&IN_A1741CODE=' + searchParams.IN_A1741CODE + 
                '&IN_A1741TIPO=' + searchParams.IN_A1741TIPO + 
                '&A1741CTA=' + searchParams.A1741CTA + 
                '&A1741SCTA=' + searchParams.A1741SCTA + 
                '&A1741CTRL=' + searchParams.A1741CTRL);
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
        Ext.create('Ext.Praxis.view.sales.AccountingMasterTAXForm.DataEntry', {
            id: 'DataEntryAccountingMasterTAXForm',
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
