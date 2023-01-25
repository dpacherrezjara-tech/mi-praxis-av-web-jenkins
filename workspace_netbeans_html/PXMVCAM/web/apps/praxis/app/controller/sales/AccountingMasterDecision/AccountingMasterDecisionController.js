/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.AccountingMasterDecision.AccountingMasterDecisionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterDecisionController',
    fecha: new Date(),
    searchParams: {},
    init: function(view) {
        console.log('1)  APPLICATION AccountingMasterDecisionController - CONTROLLER AccountingMasterDecisionController  - INIT');
        prototype.id = 'AccountingMasterDecisionForm';
        prototype.url = CONTEXTPATH + '/AccountingMasterDecision';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#AccountingMasterDecisionForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#AccountingMasterDecisionForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AccountingMasterDecisionForm-btnClear': {
                click: this.btnClear_click
            },
            '#AccountingMasterDecisionForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AccountingMasterDecisionForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#AccountingMasterDecisionForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#AccountingMasterDecisionForm-btnBack': {
                click: this.btnBack_click
            },
            '#AccountingMasterDecisionForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AccountingMasterDecisionForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AccountingMasterDecisionForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AccountingMasterDecisionForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#AccountingMasterDecisionForm-txtCIA': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }


        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        this.btnSearch_click();
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function() {

        var cbxFP = Ext.getCmp(prototype.id + '-cbxFP');
        cbxFP.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["CA", "CASH"],
                ["CC", "CREDIT CARD"]

            ]
        }));
        cbxFP.setValue("");

        var cbxSource = Ext.getCmp(prototype.id + '-cbxSource');
        cbxSource.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["ARC", "ARC"],
                ["BSP", "BSP"],
                ["ASR", "ASR"]
            ]
        }));
        cbxSource.setValue("");

    }
    ,
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {

        var IN_A1834CCUST = '139';
        var IN_A1834FP = Ext.getCmp(prototype.id + '-cbxFP').getValue();
        var IN_A1834FUENT = Ext.getCmp(prototype.id + '-cbxSource').getValue();
        var IN_A1834CIAOP = Ext.getCmp(prototype.id + '-txtCIA').getValue();
        var IN_A1834SUBFU = ''; //Actualmente no se muestra el valor

        searchParams = {
            IN_A1834CCUST: IN_A1834CCUST,
            IN_A1834FP: IN_A1834FP,
            IN_A1834FUENT: IN_A1834FUENT,
            IN_A1834CIAOP: IN_A1834CIAOP,
            IN_A1834SUBFU: IN_A1834SUBFU

        };

        console.log("IN_A1834CCUST : " + IN_A1834CCUST);
        console.log("IN_A1834FP : " + IN_A1834FP);
        console.log("IN_A1834FUENT : " + IN_A1834FUENT);
        console.log("IN_A1834CIAOP : " + IN_A1834CIAOP);
        console.log("IN_A1834SUBFU : " + IN_A1834SUBFU);

    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.AccountingMasterDecision.GridData', {
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
        Ext.getCmp(prototype.id + '-cbxFP').setValue('');
        Ext.getCmp(prototype.id + '-cbxSource').setValue('');
        Ext.getCmp(prototype.id + '-txtCIA').setValue('');


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

        global.getFile(prototype.url + '/getXLSX?IN_A1834CCUST=' + searchParams.IN_A1834CCUST
                + '&IN_A1834FP=' + searchParams.IN_A1834FP
                + '&IN_A1834FUENT=' + searchParams.IN_A1834FUENT
                + '&IN_A1834CIAOP=' + searchParams.IN_A1834CIAOP
                + '&IN_A1834SUBFU=' + searchParams.IN_A1834SUBFU
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

        Ext.create('Ext.Praxis.view.sales.AccountingMasterDecisionForm.DataEntry', {
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
