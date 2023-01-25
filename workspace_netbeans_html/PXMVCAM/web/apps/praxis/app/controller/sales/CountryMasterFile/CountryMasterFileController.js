/**
 * 
 */
Ext.define('Ext.Praxis.controller.sales.CountryMasterFile.CountryMasterFileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CountryMasterFileController',
    searchParams: {},
    init: function(view) {
        prototype.id = 'CountryMasterFileForm';       
        prototype.url = CONTEXTPATH + '/CountryMasterFile';
       
        var me = this;
        this.control({
            '#CountryMasterFileForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CountryMasterFileForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CountryMasterFileForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CountryMasterFileForm-btn-pag-last': {
                click: this.pagLast
            },
            '#CountryMasterFileForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CountryMasterFileForm-btnFilter': {
                click: this.btnFilter_click
            },
//            '#CountryMasterFileForm-btnDisplay': {
//                click: this.btnDisplay_click
//            },
            '#CountryMasterFileForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CountryMasterFileForm-btnClear': {
                click: this.btnClear_click
            },
            '#CountryMasterFileForm-btnAdd': {
                click: this.btnAdd_click
            }
            ,
            '#CountryMasterFileForm-btnBack': {
                click: this.btnBack_click
            }
        });
    },
    afterRender: function () {
        this.btnClear_click();
        Ext.getCmp(prototype.id+'-txtCampo').focus();
    },
    onCmbFiltroChange: function(obj , newValue , oldValue , eOpts) {
        Ext.getCmp(prototype.id+'-txtCampo').setValue("");
        Ext.getCmp(prototype.id+'-txtCampo').focus();
        
        var selectedValue = Ext.getCmp(prototype.id + '-cbxFiltro').getValue();
        
        switch (selectedValue) {
            case "CU":
                Ext.getCmp(prototype.id+'grid_header_01').setText("Currency Alpha");
                Ext.getCmp(prototype.id+'grid_header_04').hide();
                Ext.getCmp(prototype.id + '-txtCampo').setWidth(56);
                Ext.getCmp(prototype.id + '-txtCampo').maxLength = 3;
                Ext.getCmp(prototype.id + 'grid_header_02').setWidth(290);
                Ext.getCmp(prototype.id + 'grid_header_05').setWidth(290);
                break;
            case "NAME":
                Ext.getCmp(prototype.id+'grid_header_01').setText("Country Code");
                Ext.getCmp(prototype.id+'grid_header_04').setText("Currency Alpha");
                Ext.getCmp(prototype.id+'grid_header_04').show();
                Ext.getCmp(prototype.id + '-txtCampo').setWidth(250);
                Ext.getCmp(prototype.id + '-txtCampo').maxLength = 40;
                Ext.getCmp(prototype.id + 'grid_header_02').setWidth(215);
                Ext.getCmp(prototype.id + 'grid_header_05').setWidth(215);
                break;
            case "CO":
                Ext.getCmp(prototype.id+'grid_header_01').setText("Country Code");
                Ext.getCmp(prototype.id+'grid_header_04').setText("Currency Alpha");
                Ext.getCmp(prototype.id+'grid_header_04').show();
                Ext.getCmp(prototype.id + '-txtCampo').setWidth(56);
                Ext.getCmp(prototype.id + '-txtCampo').maxLength = 2;
                Ext.getCmp(prototype.id + 'grid_header_02').setWidth(215);
                Ext.getCmp(prototype.id + 'grid_header_05').setWidth(215);
                break;
        }
        this.btnSearch_click();
    },
    setFormatParameter: function() {
        var strValor = Ext.getCmp(prototype.id + '-txtCampo').getValue();
        var selectedValue = Ext.getCmp(prototype.id + '-cbxFiltro').getValue();
        var strCampo;
        var strName;
        
        switch (selectedValue) {
            case "CU":
                strCampo = "CURRENCY";
                strName = "";
                break;
            case "NAME":
                strCampo = "OTHERS";
                strName = "CONAME";
                break;
            case "CO":
                strCampo = "COUNTRYS";
                strName = "";
                break;
        }
        searchParams = {
            strValor: strValor,
            strCampo: strCampo,
            strName: strName
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
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.CountryMasterFile.GridData', {
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
        Ext.getCmp(prototype.id + '-gridCalendarBSP').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id+'-cbxFiltro').setValue("CU");
        Ext.getCmp(prototype.id+'-txtCampo').setValue("");
        Ext.getCmp(prototype.id+'-txtCampo').focus();
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
        global.getFile(prototype.url + '/getXLSX?strValor=' + searchParams.strValor + '&strCampo=' + searchParams.strCampo + '&strName=' + searchParams.strName);
    }
    ,
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
        var selectedValue = Ext.getCmp(prototype.id + '-cbxFiltro').getValue();
        this.winDataEntry(selectedValue, 'I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var selectedValue = Ext.getCmp(prototype.id + '-cbxFiltro').getValue();
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry(selectedValue, 'U', rec);
    },
    winDataEntry: function(selectedValue, action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
//        selectedValue = selectedValue === null || selectedValue === undefined ? "CU" : selectedValue;
        Ext.create('Ext.Praxis.view.sales.CountryMasterFileForm.DataEntry', {
            id: 'DataEntryCountryMasterFileForm',
            params: {
                action: action,
                rec: rec,
                selectedValue: selectedValue
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
