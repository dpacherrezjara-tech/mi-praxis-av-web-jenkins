/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.ProvisosText.ProvisosTextController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProvisosTextController',
    flightNumber: '',
    carrier: '',
    searchParams: {},
    init: function(view) {
        console.log('1)  APPLICATION PROVISOS TEXT - CONTROLLERPROVISOS TEXT - INIT');
        prototype.id = 'ProvisosTextForm';
        prototype.url = CONTEXTPATH + '/ProvisosText';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ProvisosTextForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#ProvisosTextForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ProvisosTextForm-btnClear': {
                click: this.btnClear_click
            },
            '#ProvisosTextForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ProvisosTextForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ProvisosTextForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#ProvisosTextForm-btnBack': {
                click: this.btnBack_click
            },
            '#ProvisosTextForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ProvisosTextForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ProvisosTextForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ProvisosTextForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------           
            ,
            '#ProvisosTextForm-txtAairline': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#ProvisosTextForm-txtValidForm': {
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
    }
    ,
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {
        var IN_A823LINAER = Ext.getCmp(prototype.id + '-txtAairline').getValue();
        var IN_A823VIGDES = Ext.getCmp(prototype.id + '-txtValidForm').getValue();
        searchParams = {
            IN_A823LINAER: IN_A823LINAER,
            IN_A823VIGDES: IN_A823VIGDES
        };
        console.log("-------------Parametros enviados-----------");
        console.log("txtAairline : " + searchParams.IN_A823LINAER);
        console.log("txtValidForm : " + searchParams.IN_A823VIGDES);
        console.log("-------------------------------------------");
    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/searchProvisosText');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.ProvisosText.GridData', {
            proxy: {
                url: prototype.url + '/searchProvisosText'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

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
        Ext.getCmp(prototype.id + '-txtAairline').setValue('');
        Ext.getCmp(prototype.id + '-txtValidForm').setValue('');

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
        global.getFile(prototype.url + '/getXLSX?IN_A823LINAER=' + searchParams.IN_A823LINAER + '&IN_A823VIGDES=' + searchParams.IN_A823VIGDES);
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

        Ext.create('Ext.Praxis.view.flown.CatalogueFlightForm.DataEntry', {
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
