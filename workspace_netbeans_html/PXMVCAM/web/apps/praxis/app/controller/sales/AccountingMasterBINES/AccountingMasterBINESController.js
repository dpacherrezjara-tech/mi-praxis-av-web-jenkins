/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.AccountingMasterBINES.AccountingMasterBINESController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterBINESController',
    fecha: new Date(),
    requires: [
        'Ext.Praxis.controller.main.MainController',
    ],
    controller: 'MainController',
    searchParams: {},
    init: function(view) {
        console.log('1)  APPLICATION AccountingMasterBINESController - CONTROLLER AccountingMasterBINESController  - INIT');
        prototype.id = 'AccountingMasterBINESForm';
        prototype.url = CONTEXTPATH + '/AccountingMasterBINES';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#AccountingMasterBINESForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#AccountingMasterBINESForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AccountingMasterBINESForm-btnClear': {
                click: this.btnClear_click
            },
            '#AccountingMasterBINESForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AccountingMasterBINESForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#AccountingMasterBINESForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#AccountingMasterBINESForm-btnBack': {
                click: this.btnBack_click
            },
            '#AccountingMasterBINESForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AccountingMasterBINESForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AccountingMasterBINESForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AccountingMasterBINESForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#AccountingMasterBINESForm-cmbSearchBy': {
                select: this.selectcmbSearchBy
            },
            '#AccountingMasterBINESForm-txtPreffix': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }


        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        Ext.getCmp(prototype.id + '-cboBrand').hide();
        Ext.getCmp(prototype.id + '-cboNature').hide();
        Ext.getCmp(prototype.id + '-cboBank').hide();
        Ext.getCmp(prototype.id + '-txtPreffix').show();
        this.btnSearch_click();
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function() {

        var cmbSearchBy = Ext.getCmp(prototype.id + '-cmbSearchBy');
        cmbSearchBy.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Prefix"],
                ["2", "Bank"]
            ]
        }));
        cmbSearchBy.setValue("1");

        var cboBrand = Ext.getCmp(prototype.id + '-cboBrand');
        cboBrand.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["CARNET", "CARNET"],
                ["MASTERCARD", "MASTERCARD"],
                ["PRIVADA", "PRIVADA"],
                ["VISA", "VISA"]
            ]
        }));
        cboBrand.setValue("");

        var cboNature = Ext.getCmp(prototype.id + '-cboNature');
        cboNature.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["DÉBITO", "DÉBITO"],
                ["CRÉDITO", "CRÉDITO"]
            ]
        }));
        cboNature.setValue("");

        var storeComboDatas = Ext.create('Ext.Praxis.store.sales.AccountingMasterBINES.FilterBank', {
            proxy: {
                url: prototype.url + '/getBank'
            }
        });
        Ext.getCmp(prototype.id + '-cboBank').bindStore(storeComboDatas);
        Ext.getCmp(prototype.id + '-cboBank').setValue("All");

    },
    selectcmbSearchBy: function(obj) {

        var opt = obj.getValue();
        switch (opt) {
            case '1':
                Ext.getCmp(prototype.id + '-cboBrand').hide();
                Ext.getCmp(prototype.id + '-cboNature').hide();
                Ext.getCmp(prototype.id + '-cboBank').hide();
                Ext.getCmp(prototype.id + '-txtPreffix').show();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-cboBrand').show();
                Ext.getCmp(prototype.id + '-cboNature').show();
                Ext.getCmp(prototype.id + '-cboBank').show();
                Ext.getCmp(prototype.id + '-txtPreffix').hide();
                break;
        }

    }
    ,
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {


        var IN_CODIGO = Ext.getCmp(prototype.id + '-txtPreffix').getValue();
        var IN_BANCO = Ext.getCmp(prototype.id + '-cboBank').getValue();
        var IN_NATURALEZA = Ext.getCmp(prototype.id + '-cboNature').getValue();
        var IN_MARCA = Ext.getCmp(prototype.id + '-cboBrand').getValue();

        if (IN_BANCO === 'All') {
            IN_BANCO = '';
        }

        searchParams = {
            IN_CODIGO: IN_CODIGO,
            IN_BANCO: IN_BANCO,
            IN_NATURALEZA: IN_NATURALEZA,
            IN_MARCA: IN_MARCA

        };

        console.log("IN_CODIGO : " + IN_CODIGO);
        console.log("IN_BANCO : " + IN_BANCO);
        console.log("IN_NATURALEZA : " + IN_NATURALEZA);
        console.log("IN_MARCA : " + IN_MARCA);




    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.AccountingMasterBINES.GridData', {
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
        Ext.getCmp(prototype.id + '-txtPreffix').setValue("");
        Ext.getCmp(prototype.id + '-cboBank').setValue("All");
        Ext.getCmp(prototype.id + '-cboNature').setValue("");
        Ext.getCmp(prototype.id + '-cboBrand').setValue("");
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


        global.getFile(prototype.url + '/getXLSX?IN_CODIGO=' + searchParams.IN_CODIGO
                + '&IN_BANCO=' + searchParams.IN_BANCO
                + '&IN_NATURALEZA=' + searchParams.IN_NATURALEZA
                + '&IN_MARCA=' + searchParams.IN_MARCA

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
    btnBack_click: function(obj, e) {
        var heightMenu = 400;
        Ext.getCmp('App-main' + '-region-content-north').setHeight(heightMenu);
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

        Ext.create('Ext.Praxis.view.sales.AccountingMasterBINESForm.DataEntry', {
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
    }
});
