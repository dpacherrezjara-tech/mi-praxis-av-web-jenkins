/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.AccountingMasterTNU.AccountingMasterTNUController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterTNUController',
    fecha: new Date(),
    searchParams: {},
    init: function(view) {
        console.log('1)  APPLICATION AccountingMasterTNUController - CONTROLLER AccountingMasterTNUController  - INIT');
        prototype.id = 'AccountingMasterTNUForm';
        prototype.url = CONTEXTPATH + '/AccountingMasterTNU';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#AccountingMasterTNUForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#AccountingMasterTNUForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AccountingMasterTNUForm-btnClear': {
                click: this.btnClear_click
            },
            '#AccountingMasterTNUForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AccountingMasterTNUForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#AccountingMasterTNUForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#AccountingMasterTNUForm-btnBack': {
                click: this.btnBack_click
            },
            '#AccountingMasterTNUForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AccountingMasterTNUForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AccountingMasterTNUForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AccountingMasterTNUForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#AccountingMasterTNUForm-cmbSearchBy': {
                change: this.selectcmbSearchBy
            }

        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        Ext.getCmp(prototype.id + '-cboDocType').show();
        Ext.getCmp(prototype.id + '-cboIVACode').hide();
        this.btnSearch_click();
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function() {

        var cmbSearch = Ext.getCmp(prototype.id + '-cmbSearchBy');
        cmbSearch.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Document Type"],
                ["2", "IVA Code"]
            ]
        }));
        cmbSearch.setValue("1");

        var cboDocType = Ext.getCmp(prototype.id + '-cboDocType');
        cboDocType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["TKT", "TKT"],
                ["RFN", "RFN"]
            ]
        }));
        cboDocType.setValue("");

        var cboIVACode = Ext.getCmp(prototype.id + '-cboIVACode');
        cboIVACode.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["MX", "Multicurrency (MX)"],
                ["XO", "Origin (XO)"]
            ]
        }));
        cboIVACode.setValue("");

    },
    selectcmbSearchBy: function(obj) {

        var opt = obj.getValue();
        switch (opt) {
            case '1':
                Ext.getCmp(prototype.id + '-cboDocType').show();
                Ext.getCmp(prototype.id + '-cboIVACode').hide();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-cboDocType').hide();
                Ext.getCmp(prototype.id + '-cboIVACode').show();
                break;
        }

    }
    ,
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {

        var IN_TIPO = Ext.getCmp(prototype.id + '-cmbSearchBy').getValue();
        var IN_A1833TDOC = Ext.getCmp(prototype.id + '-cboDocType').getValue();
        var IN_A1833CODIV = Ext.getCmp(prototype.id + '-cboIVACode').getValue();

        searchParams = {
            IN_TIPO: IN_TIPO,
            IN_A1833TDOC: IN_A1833TDOC,
            IN_A1833CODIV: IN_A1833CODIV
        };

        console.log("IN_TIPO : " + IN_TIPO);
        console.log("IN_A1833TDOC : " + IN_A1833TDOC);
        console.log("IN_A1833CODIV : " + IN_A1833CODIV);

    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.AccountingMasterTNU.GridData', {
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
    eventKey: function(e, eOpts) {

        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    }
    ,
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbSearchBy').setValue('1');
        Ext.getCmp(prototype.id + '-cboDocType').setValue('');
        Ext.getCmp(prototype.id + '-cboIVACode').setValue('');
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
        this.setParams();

        global.getFile(prototype.url + '/getXLSX?IN_TIPO=' + searchParams.IN_TIPO
                + '&IN_A1833TDOC=' + searchParams.IN_A1833TDOC
                + '&IN_A1833CODIV=' + searchParams.IN_A1833CODIV

                );
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
    /**
     * Metodos usados para el CRUD
     * */
    btnAdd_click: function(obj, e) {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);

    },
    winDataEntry: function(action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        all = all === null || all === undefined ? {} : all;
        rowIndex = rowIndex === null || rowIndex === undefined ? {} : rowIndex;

        Ext.create('Ext.Praxis.view.sales.AccountingMasterTNUForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                all: all,
                rowIndex: rowIndex
            }
        }).show();

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
    },
    btnBack_click: function(obj, e) {
        var heightMenu = 400;
        Ext.getCmp('App-main' + '-region-content-north').setHeight(heightMenu);
    }
});
