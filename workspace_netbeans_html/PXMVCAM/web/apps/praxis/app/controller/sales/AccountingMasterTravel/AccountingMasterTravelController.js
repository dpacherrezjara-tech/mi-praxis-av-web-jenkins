/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.AccountingMasterTravel.AccountingMasterTravelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterTravelController',
    fecha: new Date(),
    searchParams: {},
    init: function(view) {
        console.log('1)  APPLICATION AccountingMasterTravelController - CONTROLLER AccountingMasterTravelController  - INIT');
        prototype.id = 'AccountingMasterTravelForm';
        prototype.url = CONTEXTPATH + '/AccountingMasterTravel';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#AccountingMasterTravelForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#AccountingMasterTravelForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AccountingMasterTravelForm-btnClear': {
                click: this.btnClear_click
            },
            '#AccountingMasterTravelForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AccountingMasterTravelForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#AccountingMasterTravelForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#AccountingMasterTravelForm-btnBack': {
                click: this.btnBack_click
            },
            '#AccountingMasterTravelForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AccountingMasterTravelForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AccountingMasterTravelForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AccountingMasterTravelForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#AccountingMasterTravelForm-txtType': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#AccountingMasterTravelForm-txtAgent': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#AccountingMasterTravelForm-txtCta': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#AccountingMasterTravelForm-txtSubCta': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.btnSearch_click();
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {

        var IN_A1838CCUST = '139';
        var IN_A1838TIPO = Ext.getCmp(prototype.id + '-txtType').getValue();
        var IN_A1838AGENT = Ext.getCmp(prototype.id + '-txtAgent').getValue();
        var A1838CUENT = Ext.getCmp(prototype.id + '-txtCta').getValue();
        var A1838SUBCT = Ext.getCmp(prototype.id + '-txtSubCta').getValue();

        searchParams = {
            IN_A1838CCUST: IN_A1838CCUST,
            IN_A1838TIPO: IN_A1838TIPO,
            IN_A1838AGENT: IN_A1838AGENT,
            A1838CUENT: A1838CUENT,
            A1838SUBCT: A1838SUBCT
        };

        console.log("IN_A1838CCUST : " + IN_A1838CCUST);
        console.log("IN_A1838TIPO : " + IN_A1838TIPO);
        console.log("IN_A1838AGENT : " + IN_A1838AGENT);
        console.log("A1838CUENT : " + A1838CUENT);
        console.log("A1838SUBCT : " + A1838SUBCT);
    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.AccountingMasterTravel.GridData', {
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
        Ext.getCmp(prototype.id + '-txtType').setValue('');
        Ext.getCmp(prototype.id + '-txtAgent').setValue('');
        Ext.getCmp(prototype.id + '-txtCta').setValue('');
        Ext.getCmp(prototype.id + '-txtSubCta').setValue('');
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

        global.getFile(prototype.url + '/getXLSX?IN_A1838CCUST=' + searchParams.IN_A1838CCUST
                + '&IN_A1838TIPO=' + searchParams.IN_A1838TIPO
                + '&IN_A1838AGENT=' + searchParams.IN_A1838AGENT
                + '&A1838CUENT=' + searchParams.A1838CUENT
                + '&A1838SUBCT=' + searchParams.A1838SUBCT
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

        Ext.create('Ext.Praxis.view.sales.AccountingMasterTravelForm.DataEntry', {
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
