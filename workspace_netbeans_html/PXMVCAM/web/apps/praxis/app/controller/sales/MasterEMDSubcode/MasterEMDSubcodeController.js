Ext.define('Ext.Praxis.controller.sales.MasterEMDSubcode.MasterEMDSubcodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MasterEMDSubcodeController',
    searchParams: {},
    init: function(view) {
        prototype.id = 'MasterEMDSubcodeForm';
        prototype.url = CONTEXTPATH + '/MasterEMDSubcode';
        prototype.widthContenedor = 1100;
        prototype.widthGrid = 979;
       
        var me = this;
        this.control({
            '#MasterEMDSubcodeForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#MasterEMDSubcodeForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#MasterEMDSubcodeForm-btn-pag-next': {
                click: this.pagNext
            },
            '#MasterEMDSubcodeForm-btn-pag-last': {
                click: this.pagLast
            },
            '#MasterEMDSubcodeForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#MasterEMDSubcodeForm-btnFilter': {
                click: this.btnFilter_click
            },
////            '#MasterEMDSubcodeForm-btnDisplay': {
////                click: this.btnDisplay_click
////            },
            '#MasterEMDSubcodeForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#MasterEMDSubcodeForm-btnClear': {
                click: this.btnClear_click
            },
            '#MasterEMDSubcodeForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#MasterEMDSubcodeForm-btnBack': {
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
                Ext.getCmp(prototype.id + '-pnlSUBCD').show();
                Ext.getCmp(prototype.id + '-pnlRFIC').hide();
                Ext.getCmp(prototype.id+'-txtA1772SUBCD').focus();
                break;
            case "2":
                Ext.getCmp(prototype.id + '-pnlSUBCD').hide();
                Ext.getCmp(prototype.id + '-pnlRFIC').show();
                Ext.getCmp(prototype.id+'-txtA1772RFIC').focus();
                break;
        }
    },
    setFormatParameter: function() {
        var txtA1772SUBCD = Ext.getCmp(prototype.id + '-txtA1772SUBCD').getValue();
        var txtA1772RFIC = Ext.getCmp(prototype.id + '-txtA1772RFIC').getValue();
        
        searchParams = {
            VP_A1772SUBCD: txtA1772SUBCD,
            VP_A1772RFIC: txtA1772RFIC
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
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.MasterEMDSubcode.GridData', {
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
        Ext.getCmp(prototype.id + '-gridData02').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id+'-cmbTypeFilter').setValue("1");
        Ext.getCmp(prototype.id+'-txtA1772SUBCD').setValue("");
        Ext.getCmp(prototype.id+'-txtA1772RFIC').setValue("");
        Ext.getCmp(prototype.id+'-txtA1772SUBCD').focus();
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
        global.getFile(prototype.url + '/getXLSX?VP_A1772SUBCD=' + searchParams.VP_A1772SUBCD + '&VP_A1772RFIC=' + searchParams.VP_A1772RFIC);
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
        Ext.create('Ext.Praxis.view.sales.MasterEMDSubcodeForm.DataEntry', {
            id: 'DataEntryMasterEMDSubcodeForm',
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
