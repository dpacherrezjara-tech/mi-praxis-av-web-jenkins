Ext.define('Ext.Praxis.controller.sales.AirlineMasterFile.AirlineMasterFileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AirlineMasterFileController',
    searchParams: {},
    init: function(view) {
        prototype.id = 'AirlineMasterFileForm';       
        prototype.url = CONTEXTPATH + '/AirlineMasterFile';
       
        var me = this;
        this.control({
            '#AirlineMasterFileForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AirlineMasterFileForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AirlineMasterFileForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AirlineMasterFileForm-btn-pag-last': {
                click: this.pagLast
            },
            '#AirlineMasterFileForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AirlineMasterFileForm-btnFilter': {
                click: this.btnFilter_click
            },
////            '#AirlineMasterFileForm-btnDisplay': {
////                click: this.btnDisplay_click
////            },
            '#AirlineMasterFileForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AirlineMasterFileForm-btnClear': {
                click: this.btnClear_click
            },
            '#AirlineMasterFileForm-btnAdd': {
                click: this.btnAdd_click
            }
            ,
            '#AirlineMasterFileForm-btnBack': {
                click: this.btnBack_click
            }
        });
    },
    afterRender: function () {
        this.btnClear_click();
        this.btnSearch_click();
    },
    onCmbOpcionChange: function(obj , newValue , oldValue , eOpts) {
        Ext.getCmp(prototype.id+'-txtCampo').setValue("");
        
        var selectedValue = Ext.getCmp(prototype.id + '-cmbOpcion').getValue();
        
        switch (selectedValue) {
            case "N":
                Ext.getCmp(prototype.id + '-txtCampo').maxLength = 40;
                Ext.getCmp(prototype.id + '-txtCampo').show();
                Ext.getCmp(prototype.id + '-txtCampo').setWidth(280);
                Ext.getCmp(prototype.id+'-txtCampo').focus();
                break;
            case "C":
            case "A":
                Ext.getCmp(prototype.id + '-txtCampo').maxLength = 3;
                Ext.getCmp(prototype.id + '-txtCampo').show();
                Ext.getCmp(prototype.id + '-txtCampo').setWidth(70);
                Ext.getCmp(prototype.id+'-txtCampo').focus();
                break;
            default:
                Ext.getCmp(prototype.id + '-txtCampo').hide();
//                Ext.getCmp(prototype.id + '-txtCampo').setWidth(70);
        }
    },
    setFormatParameter: function() {
        var strValor = Ext.getCmp(prototype.id + '-txtCampo').getValue();
        var selectedValue = Ext.getCmp(prototype.id + '-cmbOpcion').getValue();
        var strCampo;
        
        switch (selectedValue) {
            case "N":
                strCampo = "A005KEY2";
                break;
            case "A":
                strCampo = "A005KEY1";
                break;
            default:
                strCampo = "A005KEY";
        }
        searchParams = {
            strCampo: strCampo,
            strValor: strValor
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
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.AirlineMasterFile.GridData', {
            proxy: {
                url: prototype.url + '/loadSearch'
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
        Ext.getCmp(prototype.id + '-gridaARILINE').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id+'-cmbOpcion').setValue("");
        Ext.getCmp(prototype.id+'-txtCampo').setValue("");
//        Ext.getCmp(prototype.id+'-txtCampo').focus();
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
        global.getFile(prototype.url + '/getXLSX?strCampo=' + searchParams.strCampo + '&strValor=' + searchParams.strValor);
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
        Ext.create('Ext.Praxis.view.sales.AirlineMasterFileForm.DataEntry', {
            id: 'DataEntryAirlineMasterFileForm',
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
