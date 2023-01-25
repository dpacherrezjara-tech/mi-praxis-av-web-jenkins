/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.FptfAirline.FptfAirlineController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FptfAirlineController',
    fecha: new Date(),
    searchParams: {},
    init: function(view) {
        console.log('1)  APPLICATION FptfAirline  - CONTROLLER FptfAirline- INIT');
        prototype.id = 'FptfAirlineForm';
        prototype.url = CONTEXTPATH + '/FptfAirline';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#FptfAirlineForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#FptfAirlineForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#FptfAirlineForm-btnClear': {
                click: this.btnClear_click
            },
            '#FptfAirlineForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#FptfAirlineForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#FptfAirlineForm-btnBack': {
                click: this.btnBack_click
            },
            '#FptfAirlineForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#FptfAirlineForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#FptfAirlineForm-btn-pag-next': {
                click: this.pagNext
            },
            '#FptfAirlineForm-btn-pag-last': {
                click: this.pagLast
            }
            //-----------------Eventos Especificos -------------------
            ,
            '#FptfAirlineForm-cmbSearchType': {
                change: this.selectcmbSearchType
            },
            '#FptfAirlineForm-txtForm': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        Ext.getCmp(prototype.id + '-cmbSearchType').setValue("");
        Ext.getCmp(prototype.id + '-txtForm').hide();
        this.btnSearch_click();
    },
    selectcmbSearchType: function(obj) {

        var opt = obj.getValue();
        if (opt === 'F') {
            Ext.getCmp(prototype.id + '-txtForm').show();
        } else {
            Ext.getCmp(prototype.id + '-txtForm').hide();
        }

    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function() {
        var cmbSearch = Ext.getCmp(prototype.id + '-cmbSearchType');
        cmbSearch.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Selected"],
                ["F", "Form"]
            ]
        }));
    }
    ,
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {


        var IN_VALOR = Ext.getCmp(prototype.id + '-txtForm').getValue();
        var IN_CAMPO = 'A004FORMA';

        searchParams = {
            IN_VALOR: IN_VALOR,
            IN_CAMPO: IN_CAMPO
        };

        console.log("IN_VALOR : " + IN_VALOR);
        console.log("IN_CAMPO : " + IN_CAMPO);


    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.FptfAirline.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(pagData.currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pagData.pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(pagData.total);
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

        Ext.getCmp(prototype.id + '-cmbSearchType').setValue('');
        Ext.getCmp(prototype.id + '-txtForm').setValue('');       

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
        global.getFile(prototype.url + '/getXLSX?IN_VALOR=' + searchParams.IN_VALOR + '&IN_CAMPO=' + searchParams.IN_CAMPO);
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

    getDataEntryTAXRATD: function(dv, record, item, index, e) {
        var data = dv.dataSource.data.items[item].data;
        console.log(data);
        Ext.create('Ext.Praxis.view.sales.TAXRATDForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                data: data
            }
        }).show();

    },
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

        Ext.create('Ext.Praxis.view.sales.FptfAirlineForm.DataEntry', {
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
