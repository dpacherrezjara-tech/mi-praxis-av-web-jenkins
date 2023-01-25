/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.AccountingSupplier.AccountingSupplierController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingSupplierController',
    fecha: new Date(),
    searchParams: {},
    init: function(view) {
        console.log('1)  APPLICATION AccountingSupplier - CONTROLLER AccountingSupplier  - INIT');
        prototype.id = 'AccountingSupplierForm';
        prototype.url = CONTEXTPATH + '/AccountingSupplier';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#AccountingSupplierForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#AccountingSupplierForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AccountingSupplierForm-btnClear': {
                click: this.btnClear_click
            },
            '#AccountingSupplierForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AccountingSupplierForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#AccountingSupplierForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#AccountingSupplierForm-btnBack': {
                click: this.btnBack_click
            },
            '#AccountingSupplierForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AccountingSupplierForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AccountingSupplierForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AccountingSupplierForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#AccountingSupplierForm-cmbSearchBy': {
                change: this.selectcmbSearchBy
            },
            '#AccountingSupplierForm-txtSearchBy': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }


        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();

        Ext.getCmp(prototype.id + '-cmbSearchBy').setValue("1");
        Ext.getCmp(prototype.id + '-cmbSearchType').setValue("");
        Ext.getCmp(prototype.id + '-txtSearchBy').hide();
        this.btnSearch_click();
    },
    selectcmbSearchBy: function(obj) {

        var opt = obj.getValue();
        switch (opt) {
            case '1':
                Ext.getCmp(prototype.id + '-cmbSearchType').show();
                Ext.getCmp(prototype.id + '-txtSearchBy').hide();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-cmbSearchType').hide();
                Ext.getCmp(prototype.id + '-txtSearchBy').show();
                break;
        }

    },
    selectcmbSearchType: function(obj) {

        var opt = obj.getValue();
        switch (opt) {
            case 'BSP':
                Ext.getCmp(prototype.id + '-txtSearchType').hide();
                break;
            case 'ASR':
                Ext.getCmp(prototype.id + '-txtSearchType').show();
                break;
            case 'ARC':
                Ext.getCmp(prototype.id + '-txtSearchType').hide();
                break;
        }

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
                ["1", "Type"],
                ["2", "Supplier Num"]

            ]
        }));

        var cmbSearchType = Ext.getCmp(prototype.id + '-cmbSearchType');
        cmbSearchType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["03", "CONNECT"],
                ["06", "FRANCHISE OPERATOR"],
                ["08", "SISTEM"],
                ["09", "CARGO"],
                ["37", "CENTRO DE SERVICIOS COMPARTIDOS"]

            ]
        }));
    }
    ,
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {

        var cmbSearchType = Ext.getCmp(prototype.id + '-cmbSearchType').getValue();
        var cmbSearchBy = Ext.getCmp(prototype.id + '-cmbSearchBy').getValue();
        var textSearchBy = Ext.getCmp(prototype.id + '-txtSearchBy').getValue();


        var IN_A1806TIPOC = cmbSearchType;
        var IN_A1806NUM = textSearchBy;
        var IN_A1806CCUST = '139';



        searchParams = {
            IN_A1806TIPOC: IN_A1806TIPOC,
            IN_A1806NUM: IN_A1806NUM,
            IN_A1806CCUST: IN_A1806CCUST

        };

        console.log("IN_A1806TIPOC : " + IN_A1806TIPOC);
        console.log("IN_A1806NUM : " + IN_A1806NUM);
        console.log("IN_A1806CCUST : " + IN_A1806CCUST);


    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.AccountingSupplier.GridData', {
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
        Ext.getCmp(prototype.id + '-txtSearchBy').setValue('');
        Ext.getCmp(prototype.id + '-cmbSearchType').setValue('');
     


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

        global.getFile(prototype.url + '/getXLSX?IN_A1806TIPOC=' + searchParams.IN_A1806TIPOC + '&IN_A1806NUM=' + searchParams.IN_A1806NUM + '&IN_A1806CCUST=' + searchParams.IN_A1806CCUST);
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
        this.winDataEntry('I');  },
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

        Ext.create('Ext.Praxis.view.sales.AccountingSupplierForm.DataEntry', {
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
