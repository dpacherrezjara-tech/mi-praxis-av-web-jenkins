Ext.define('Ext.Praxis.controller.sales.RegionsMasterFile.RegionsMasterFileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RegionsMasterFileController',
    searchParams: {},
    init: function(view) {
        prototype.id = 'RegionsMasterFileForm';       
        prototype.url = CONTEXTPATH + '/RegionsMasterFile';
        var me = this;
        this.control({
        });
    },
    afterRender: function () {
        this.btnClear_click();
        this.btnSearch_click();
    },
    onCmbFiltroChange: function(obj , newValue , oldValue , eOpts) {
        
        var selectedValue = Ext.getCmp(prototype.id + '-cbxFiltro').getValue();
        
        switch (selectedValue) {
            case "1":
                Ext.getCmp(prototype.id + '-lbTipo').show();
                Ext.getCmp(prototype.id + '-cbxTipo').show();
                Ext.getCmp(prototype.id + '-lbCodigo').show();
                Ext.getCmp(prototype.id + '-txtCodigo').show();
                
                Ext.getCmp(prototype.id + '-lbCodPais').hide();
                Ext.getCmp(prototype.id + '-txtCodPais').hide();
                
                Ext.getCmp(prototype.id + '-txtCodigo').setValue("");
                Ext.getCmp(prototype.id+'-txtCodigo').focus();
                break;
            case "2":
                Ext.getCmp(prototype.id + '-lbTipo').hide();
                Ext.getCmp(prototype.id + '-cbxTipo').hide();
                Ext.getCmp(prototype.id + '-lbCodigo').hide();
                Ext.getCmp(prototype.id + '-txtCodigo').hide();
                
                Ext.getCmp(prototype.id + '-lbCodPais').show();
                Ext.getCmp(prototype.id + '-txtCodPais').show();
                
                Ext.getCmp(prototype.id + '-txtCodPais').setValue("");
                Ext.getCmp(prototype.id+'-txtCodPais').focus();
                break;
        }
    },
    setFormatParameter: function() {
        var selectedValue = Ext.getCmp(prototype.id + '-cbxFiltro').getValue();
        var strOption = selectedValue;
        var strParam1;
        var strParam2;
        
        switch (selectedValue) {
            case "1":
                strParam1 = Ext.getCmp(prototype.id + '-cbxTipo').getValue();
                strParam2 = Ext.getCmp(prototype.id + '-txtCodigo').getValue();
                break;
            case "2":
                strParam1 = "";
                strParam2 = Ext.getCmp(prototype.id + '-txtCodPais').getValue();
                break;
        }
        searchParams = {
            strOption: strOption,
            strParam1: strParam1,
            strParam2: strParam2
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
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.RegionsMasterFile.GridData', {
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
        Ext.getCmp(prototype.id+'-cbxFiltro').setValue("1");
        Ext.getCmp(prototype.id+'-cbxTipo').setValue("");
        Ext.getCmp(prototype.id+'-txtCodigo').setValue("");
        Ext.getCmp(prototype.id+'-txtCodigo').focus();
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
        global.getFile(prototype.url + '/getXLSX?strOption=' + searchParams.strOption + '&strParam1=' + searchParams.strParam1 + '&strParam2=' + searchParams.strParam2);
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
        Ext.create('Ext.Praxis.view.sales.RegionsMasterFileForm.DataEntry', {
            id: 'DataEntryRegionsMasterFileForm',
            params: {
                action: action,
                rec: rec
            }
        }).show();

    },
    
    // <editor-fold defaultstate="collapsed" desc="Filters Usos">
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        Ext.getCmp(prototype.id + '-paggin').moveFirst();
    },
    pagPrevious: function(obj, e) {
        Ext.getCmp(prototype.id + '-paggin').movePrevious();
    },
    pagNext: function(obj, e) {
        Ext.getCmp(prototype.id + '-paggin').moveNext();
    },
    pagLast: function(obj, e) {
        Ext.getCmp(prototype.id + '-paggin').moveLast();
    }
    // </editor-fold>
});
