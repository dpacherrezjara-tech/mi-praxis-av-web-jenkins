/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.AccountingMasterCCAM.AccountingMasterCCAMController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterCCAMController',
    fecha: new Date(),
    searchParams: {},
    init: function(view) {
        console.log('1)  APPLICATION AccountingMasterCCAMController - CONTROLLER AccountingMasterCCAMController  - INIT');
        prototype.id = 'AccountingMasterCCAMForm';
        prototype.url = CONTEXTPATH + '/AccountingMasterCCAM';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#AccountingMasterCCAMForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#AccountingMasterCCAMForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AccountingMasterCCAMForm-btnClear': {
                click: this.btnClear_click
            },
            '#AccountingMasterCCAMForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AccountingMasterCCAMForm-btnBack': {
                click: this.btnBack_click
            },
            '#AccountingMasterCCAMForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#AccountingMasterCCAMForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#AccountingMasterCCAMForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AccountingMasterCCAMForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AccountingMasterCCAMForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AccountingMasterCCAMForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#AccountingMasterCCAMForm-txtCliente': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#AccountingMasterCCAMForm-txtModo': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#AccountingMasterCCAMForm-txtCAN': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#AccountingMasterCCAMForm-txtCta': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#AccountingMasterCCAMForm-txtSubCta': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#AccountingMasterCCAMForm-txtNumber': {
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

        var cmbSearch = Ext.getCmp(prototype.id + '-cmbSearchBy');
        cmbSearch.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["GL", "GL"],
                ["AR", "AR"]

            ]
        }));
        cmbSearch.setValue("");

    }
    ,
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {

        var IN_A1819CCUST = '139';
        var IN_A1819TIPO = Ext.getCmp(prototype.id + '-cmbSearchBy').getValue();
        var IN_A1819CLIEN = Ext.getCmp(prototype.id + '-txtCliente').getValue();
        var IN_A1819MODO = Ext.getCmp(prototype.id + '-txtModo').getValue();
        var A1819TACC = Ext.getCmp(prototype.id + '-txtNumber').getValue();
        var A1819NATU = Ext.getCmp(prototype.id + '-txtCAN').getValue();
        var A1819CTA = Ext.getCmp(prototype.id + '-txtCta').getValue();
        var A1819SCTA = Ext.getCmp(prototype.id + '-txtSubCta').getValue();


        searchParams = {
            IN_A1819CCUST: IN_A1819CCUST,
            IN_A1819TIPO: IN_A1819TIPO,
            IN_A1819CLIEN: IN_A1819CLIEN,
            IN_A1819MODO: IN_A1819MODO,
            A1819TACC: A1819TACC,
            A1819NATU: A1819NATU,
            A1819CTA: A1819CTA,
            A1819SCTA: A1819SCTA
        };

        console.log("IN_A1819CCUST : " + IN_A1819CCUST);
        console.log("IN_A1819TIPO : " + IN_A1819TIPO);
        console.log("IN_A1819CLIEN : " + IN_A1819CLIEN);
        console.log("IN_A1819MODO : " + IN_A1819MODO);
        console.log("A1819TACC : " + A1819TACC);
        console.log("A1819NATU : " + A1819NATU);
        console.log("A1819CTA : " + A1819CTA);
        console.log("A1819SCTA : " + A1819SCTA);



    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.AccountingMasterCCAM.GridData', {
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

        Ext.getCmp(prototype.id + '-cmbSearchBy').setValue('');
        Ext.getCmp(prototype.id + '-txtCliente').setValue('');
        Ext.getCmp(prototype.id + '-txtModo').setValue('');
        Ext.getCmp(prototype.id + '-txtNumber').setValue('');
        Ext.getCmp(prototype.id + '-txtCAN').setValue('');
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


        global.getFile(prototype.url + '/getXLSX?IN_A1819CCUST=' + searchParams.IN_A1819CCUST
                + '&IN_A1819TIPO=' + searchParams.IN_A1819TIPO
                + '&IN_A1819CLIEN=' + searchParams.IN_A1819CLIEN
                + '&IN_A1819MODO=' + searchParams.IN_A1819MODO
                + '&A1819TACC=' + searchParams.A1819TACC
                + '&A1819NATU=' + searchParams.A1819NATU
                + '&A1819CTA=' + searchParams.A1819CTA
                + '&A1819SCTA=' + searchParams.A1819SCTA
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

        Ext.create('Ext.Praxis.view.sales.AccountingMasterCCAMForm.DataEntry', {
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
