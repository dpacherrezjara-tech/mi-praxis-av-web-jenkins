Ext.define('Ext.Praxis.controller.sales.AccountingMasterClient.AccountingMasterClientController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterClientController',
    searchParams: {},
    gridDataSource: new Array(),
    _path: '',
    me: '',
    setContext: function() {
        me = this;
    },
    init: function() {
        me = this;
        prototype.id = 'AccountingMasterClientForm';
        prototype.url = CONTEXTPATH + '/AccountingMasterClient';
    },
    afterRender: function () {
        this.loadCombo();
        Ext.getCmp(prototype.id+'-cboCountry').setValue("");
        Ext.getCmp(prototype.id+'-cboType').setValue("");
        Ext.getCmp(prototype.id+'-cboCurrency').setValue("");
        Ext.getCmp(prototype.id+'-cboSubFu').setValue("");
        Ext.getCmp(prototype.id+'-cboFP').setValue("");
    },
    //<editor-fold defaultstate="collapsed" desc="loadCombo">
    loadCombo: function () {
        Ext.Ajax.request({
            url: prototype.url + '/loadCombo',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask(),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                Ext.getBody().unmask();
                
                var lstCountry = res.lstCountry;
                //<editor-fold defaultstate="collapsed" desc="cboCountry">
                var country = new Array();
                country.push(['', 'All']);
                lstCountry.forEach(function callback(currentValue, index, array) {
                    country.push([currentValue.A051KEY2, currentValue.A051DESCR1]);
                });
                var store1 = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'country', autoLoad: true, data: country, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id+'-cboCountry').bindStore(store1);
                //</editor-fold>

                var lstTypeCC = res.lstTypeCC;
                //<editor-fold defaultstate="collapsed" desc="cboType">
                var type = new Array();
                type.push(['', 'All']);
                lstTypeCC.forEach(function callback(currentValue, index, array) {
                    type.push([currentValue.A051KEY2, currentValue.A051KEY2]);
                });
                var store2 = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'type', autoLoad: true, data: type, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id+'-cboType').bindStore(store2);
                //</editor-fold>
                
                var lstCurrency = res.lstCurrency;
                //<editor-fold defaultstate="collapsed" desc="cboCurrency">
                var currency = new Array();
                currency.push(['', 'All']);
                lstCurrency.forEach(function callback(currentValue, index, array) {
                    if (currentValue.A006MONEDA.trim().length === 0) {
                        currency.push([null, '&nbsp;']);
                    } else {
                        currency.push([currentValue.A006MONEDA, currentValue.A006MONEDA]);
                    }
                });
                var store3 = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'currency', autoLoad: true, data: currency, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id+'-cboCurrency').bindStore(store3);
                //</editor-fold>

                var lstSubFu = res.lstSubFu;
                //<editor-fold defaultstate="collapsed" desc="cboSubFu">
                var subfu = new Array();
                subfu.push(['', 'All']);
                lstSubFu.forEach(function callback(currentValue, index, array) {
                    if (array[index].trim().length === 0) {
                        subfu.push([null, '&nbsp;']);
                    } else {
                        subfu.push([array[index], array[index]]);
                    }
                });
                var store4 = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'subfu', autoLoad: true, data: subfu, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id+'-cboSubFu').bindStore(store4);
                //</editor-fold>

                var lstFP = res.lstFP;
                //<editor-fold defaultstate="collapsed" desc="cboFP">
                var fp = new Array();
                fp.push(['', 'All']);
                lstFP.forEach(function callback(currentValue, index, array) {
                    fp.push([array[index], array[index]]);
                });
                var store5 = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'fp', autoLoad: true, data: fp, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id+'-cboFP').bindStore(store5);
                //</editor-fold>
            }
        });
    },
    //</editor-fold>
    
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.sales.AccountingMasterClientForm.DataEntry', {
            id: 'DataEntryAccountingMasterClientForm',
            params: {
                action: action,
                rec: rec
            }
        }).show();

    },
    //<editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.search();
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id+'-cbxSource').setValue("");
        Ext.getCmp(prototype.id+'-txtClient').setValue("");
        Ext.getCmp(prototype.id+'-txtIATA').setValue("");
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
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    btnBack_click: function() {
        global.showMenu();
    },
    //</editor-fold>
    
    setFormatParameter: function() {
        var IN_A1736FUENTE = Ext.getCmp(prototype.id + '-cbxSource').getValue();
        var IN_A1736PAIS = Ext.getCmp(prototype.id + '-cboCountry').getValue();
        var IN_A1736MONEDA = Ext.getCmp(prototype.id + '-cboCurrency').getValue();
        var IN_A1736TIPO = Ext.getCmp(prototype.id + '-cboType').getValue();
        var IN_A1736SUBFU = Ext.getCmp(prototype.id + '-cboSubFu').getValue();
        var IN_A1736FP = Ext.getCmp(prototype.id + '-cboFP').getValue();
        var A1736CLIEN = Ext.getCmp(prototype.id + '-txtClient').getValue();
        var A1736IATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        
        searchParams = {
            IN_A1736CCUST: '139',
            IN_A1736FUENTE: IN_A1736FUENTE,
            IN_A1736PAIS: IN_A1736PAIS,
            IN_A1736TIPO: IN_A1736TIPO,
            IN_A1736MONEDA: IN_A1736MONEDA,
            IN_A1736SUBFU: IN_A1736SUBFU,
            IN_A1736FP: IN_A1736FP,
            A1736CLIEN: A1736CLIEN,
            A1736IATA: A1736IATA
        };
    },
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.AccountingMasterClient.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(searchParams)};
                },
                load: function(obj) {
                    //<editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    //</editor-fold>
                    me.gridDataSource = obj.data.items;
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
        _path = prototype.url + '/getXLSX?beanString=' + JSON.stringify(searchParams);
    },
    //</editor-fold>
    exportExcel: function() {
        global.getFile(_path);
    },
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
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});