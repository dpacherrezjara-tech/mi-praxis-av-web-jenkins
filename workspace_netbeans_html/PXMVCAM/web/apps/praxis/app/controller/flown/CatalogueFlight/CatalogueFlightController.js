/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.CatalogueFlight.CatalogueFlightController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CatalogueFlightController',
    flightNumber: '',
    carrier: '',
    searchParams: {},
    me: '',
    setContext: function () {
        me = this;
    },
    init: function(view) {
        console.log('1)  APPLICATION CATALOGUE OF FLIGHT - CONTROLLER CATALOGUE OF FLIGHT - INIT');
        prototype.id = 'CatalogueFlightForm';
        prototype.url = CONTEXTPATH + '/CatalogueFlight';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#CatalogueFlightForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#CatalogueFlightForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CatalogueFlightForm-btnClear': {
                click: this.btnClear_click
            },
            '#CatalogueFlightForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CatalogueFlightForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#CatalogueFlightForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#CatalogueFlightForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CatalogueFlightForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CatalogueFlightForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CatalogueFlightForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#CatalogueFlightForm-cmbSearchType': {
                select: this.selectcmbSearchType
            },
            '#CatalogueFlightForm-txtNFLIGHT': {
                keyup: this.eventKey,
                change: this.onUpperValue,
                focusleave: this.onFocusLeave
            },
            '#CatalogueFlightForm-txtCARRIER': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();

        Ext.getCmp(prototype.id + '-cmbSearchType').setValue(1);
        this.btnSearch_click();

    },
    selectcmbSearchType: function(obj) {

        var opt = obj.getValue();
        switch (opt) {
            case '1':
              
                Ext.getCmp(prototype.id + '-txtCARRIER').setValue("");

                break;
            case '2':
               
                Ext.getCmp(prototype.id + '-txtNFLIGHT').setValue("");
                break;
        }

    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onFocusLeave: function(obj) {
        var flightNum = Ext.getCmp(prototype.id + '-txtNFLIGHT');
        if (flightNum.getValue().length >= 1) {
            while (flightNum.getValue().length < 4) {
                flightNum.setValue('0' + flightNum.getValue());
            }
        }
    },
    setStoreData: function() {
        var cmbSearch = Ext.getCmp(prototype.id + '-cmbSearchType');
        cmbSearch.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Operator"],
                ["2", "Marketing"]
            ]
        }));
    }
    ,
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {
        var flightNumber = Ext.getCmp(prototype.id + '-txtNFLIGHT').getValue();
        var carrier = Ext.getCmp(prototype.id + '-txtCARRIER').getValue();
        var inType = Ext.getCmp(prototype.id + '-cmbSearchType').getValue();
        searchParams = {
            inType: inType,
            flightNumber: flightNumber,
            carrier: carrier
        };
        console.log("-------------Parametros enviados-----------");
        console.log("flightNumber : " + searchParams.flightNumber);
        console.log("carrier : " + searchParams.carrier);
        console.log("inType : " + searchParams.inType);
        console.log("-------------------------------------------");
    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.CatalogueFlight.GridData', {
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
        Ext.getCmp(prototype.id + '-txtNFLIGHT').setValue('');
        Ext.getCmp(prototype.id + '-txtCARRIER').setValue('');

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
        global.getFile(prototype.url + '/getXLSX?inType=' + searchParams.inType + '&flightNumber=' + searchParams.flightNumber + '&carrier=' + searchParams.carrier);
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
    }
});
