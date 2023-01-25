/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.AccountingMasterUATP.AccountingMasterUATPController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterUATPController',
    fecha: new Date(),
    searchParams: {},
    init: function(view) {
        console.log('1)  APPLICATION AccountingMasterUATPController - CONTROLLER AccountingMasterUATPController  - INIT');
        prototype.id = 'AccountingMasterUATPForm';
        prototype.url = CONTEXTPATH + '/AccountingMasterUATP';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#AccountingMasterUATPForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#AccountingMasterUATPForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AccountingMasterUATPForm-btnClear': {
                click: this.btnClear_click
            },
            '#AccountingMasterUATPForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AccountingMasterUATPForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#AccountingMasterUATPForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#AccountingMasterUATPForm-btnBack': {
                click: this.btnBack_click
            },
            '#AccountingMasterUATPForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AccountingMasterUATPForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AccountingMasterUATPForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AccountingMasterUATPForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#AccountingMasterUATPForm-txtCliente': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#AccountingMasterUATPForm-txtCta': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#AccountingMasterUATPForm-txtSubCta': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#AccountingMasterUATPForm-txtNumber': {
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
                ["CCAM", "CCAM"],
                ["UATP", "UATP"],
                ["BOOM", "BOOM"]

            ]
        }));
        cmbSearch.setValue("");

        var cboMode = Ext.getCmp(prototype.id + '-cboMode');
        cboMode.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["A", "All"],
                ["", "Counted"],
                ["C", "Credit"]


            ]
        }));
        cboMode.setValue("A");

    }
    ,
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {

        var A1820CCUST = '139';
        var IN_FILTRO = Ext.getCmp(prototype.id + '-cmbSearchBy').getValue();
        var A1820CLIEN = Ext.getCmp(prototype.id + '-txtCliente').getValue();
        var A1820TCUAT = Ext.getCmp(prototype.id + '-txtNumber').getValue();
        var A1820CTA = Ext.getCmp(prototype.id + '-txtCta').getValue();
        var A1820SCTA = Ext.getCmp(prototype.id + '-txtSubCta').getValue();
        var A1820MODO = Ext.getCmp(prototype.id + '-cboMode').getValue();


        searchParams = {
            A1820CCUST: A1820CCUST,
            IN_FILTRO: IN_FILTRO,
            A1820CLIEN: A1820CLIEN,
            A1820TCUAT: A1820TCUAT,
            A1820CTA: A1820CTA,
            A1820SCTA: A1820SCTA,
            A1820MODO: A1820MODO

        };

        console.log("A1820CCUST : " + A1820CCUST);
        console.log("IN_FILTRO : " + IN_FILTRO);
        console.log("A1820CLIEN : " + A1820CLIEN);
        console.log("A1820TCUAT : " + A1820TCUAT);
        console.log("A1820CTA : " + A1820CTA);
        console.log("A1820SCTA : " + A1820SCTA);
        console.log("A1820MODO : " + A1820MODO);




    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.AccountingMasterUATP.GridData', {
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
        Ext.getCmp(prototype.id + '-txtCliente').setValue('');
        Ext.getCmp(prototype.id + '-txtNumber').setValue('');
        Ext.getCmp(prototype.id + '-txtCta').setValue('');
        Ext.getCmp(prototype.id + '-txtSubCta').setValue('');
        Ext.getCmp(prototype.id + '-cboMode').setValue("A");        

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



        global.getFile(prototype.url + '/getXLSX?A1820CCUST=' + searchParams.A1820CCUST
                + '&IN_FILTRO=' + searchParams.IN_FILTRO
                + '&A1820CLIEN=' + searchParams.A1820CLIEN
                + '&A1820TCUAT=' + searchParams.A1820TCUAT
                + '&A1820CTA=' + searchParams.A1820CTA
                + '&A1820SCTA=' + searchParams.A1820SCTA
                + '&A1820MODO=' + searchParams.A1820MODO
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

        Ext.create('Ext.Praxis.view.sales.AccountingMasterUATPForm.DataEntry', {
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
