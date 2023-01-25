Ext.define('Ext.Praxis.controller.flown.AccountingMasterFlown.AccountingMasterFlownController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterFlownController',
    searchParams: {},
    storeComboBox: {},
    me: '',
    setContext: function () {
        me = this;
    },
    init: function(view) {
        prototype.id = 'AccountingMasterFlownForm';
        prototype.url = CONTEXTPATH + '/AccountingMasterFlown';

        var me = this;
        this.control({
            '#AccountingMasterFlownForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AccountingMasterFlownForm-btnClear': {
                click: this.btnClear_click
            },
            '#AccountingMasterFlownForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AccountingMasterFlownForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#AccountingMasterFlownForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#AccountingMasterFlownForm-btnBack': {
                click: this.btnBack_click
            },
            '#AccountingMasterFlownForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AccountingMasterFlownForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AccountingMasterFlownForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AccountingMasterFlownForm-btn-pag-last': {
                click: this.pagLast
            }
        });
    },
    afterRender: function() {
        this.setStoreCombos("1");
        this.setStoreCombos("2");
        this.setStoreCombos("3");
        this.btnClear_click();
        this.btnSearch_click();
    },
    setStoreCombos: function(tipo) {
        var combo, value;
        switch (tipo) {
            case '1':
                combo = "cmbDocumentType";
                value = "loadDocumentType";
                break;
            case '2':
                combo = "cmbCtaType";
                value = "loadAccountType";
                break;
            case '3':
                combo = "cmbCategory";
                value = "loadCategory";
                break;
        }
        Ext.Ajax.request({
            url: prototype.url + '/' + value,
            method: 'POST',
            timeout: 60000000,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var data = res.data;

                var lst = new Array();
                lst.push(['', 'ALL']);
                switch (tipo) {
                    case '1':
                        for (var k in data)
                            lst.push([data[k].A1740TITRA, data[k].A1740TITRA]);
                        break;
                    case '2':
                        for (var k in data)
                            lst.push([data[k].A1740TIPO, data[k].A1740TIPODESC]);
                        break;
                    case '3':
                        for (var k in data)
                            lst.push([data[k].A1740CATEG, data[k].A1740CATEG]);
                        break;
                }
                var storeComboBox = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'data',
                    autoLoad: false,
                    data: lst,
                    fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id + '-' + combo).bindStore(storeComboBox);
            }
        });
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {
        var documentType = Ext.getCmp(prototype.id + '-cmbDocumentType').getValue();
        var ctaType = Ext.getCmp(prototype.id + '-cmbCtaType').getValue();
        var category = Ext.getCmp(prototype.id + '-cmbCategory').getValue();
        searchParams = {
            documentType: documentType,
            ctaType: ctaType,
            category: category
        };
    },
    setGridData: function(obj, val) {
        console.log("searchParams.documentType : " + searchParams.documentType);
        console.log("searchParams.ctaType : " + searchParams.ctaType);
        console.log("searchParams.category : " + searchParams.category);
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.AccountingMasterFlown.GridData', {
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
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
//    eventKey: function(e, eOpts) {
//
//        if (eOpts.getKey() === 13) {
//            this.btnSearch_click();
//        }
//    }
//    ,
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbDocumentType').select("");
        Ext.getCmp(prototype.id + '-cmbCtaType').select("");
        Ext.getCmp(prototype.id + '-cmbCategory').select("");
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
        global.getFile(prototype.url + '/getXLSX?documentType=' + searchParams.documentType + '&ctaType=' + searchParams.ctaType + '&category=' + searchParams.category);
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
    btnAdd_click: function(obj, e) {
        this.winDataEntry('I');
    },
    /**
     * Metodos usados para editar
     * */
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.flown.AccountingMasterFlownForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec
            }
        }).show();

    },
    btnBack_click: function(obj, e) {
        var heightMenu = 400;
        Ext.getCmp('App-main' + '-region-content-north').setHeight(heightMenu);
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
