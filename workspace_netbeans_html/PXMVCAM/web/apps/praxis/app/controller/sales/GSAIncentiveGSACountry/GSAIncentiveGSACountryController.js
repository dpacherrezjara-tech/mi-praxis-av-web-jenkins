/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.GSAIncentiveGSACountry.GSAIncentiveGSACountryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GSAIncentiveGSACountryController',
    fecha: new Date(),
    paginTem: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    strTipo: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'GSAIncentiveGSACountryForm';
        prototype.url = CONTEXTPATH + '/GSAIncentiveGSACountry';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#GSAIncentiveGSACountryForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#GSAIncentiveGSACountryForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#GSAIncentiveGSACountryForm-btnClear': {
                click: this.btnClear_click
            },
            '#GSAIncentiveGSACountryForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#GSAIncentiveGSACountryForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#GSAIncentiveGSACountryForm-btnBack': {
                click: this.btnBack_click
            },
            '#GSAIncentiveGSACountryForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#GSAIncentiveGSACountryForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#GSAIncentiveGSACountryForm-btn-pag-next': {
                click: this.pagNext
            },
            '#GSAIncentiveGSACountryForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#GSAIncentiveGSACountryForm-cmbOpcion': {
                change: this.onChangeSearch
            }

        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        this.btnSearch_click();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }
    ,
    setStoreData: function() {
        var cmbOpcion = Ext.getCmp(prototype.id + '-cmbOpcion');
        cmbOpcion.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["GSA", "GSA"]
            ]
        }));
        cmbOpcion.setValue("");
    },
    onChangeSearch: function(obj, value) {

        switch (value) {
            case 'GSA':
                Ext.getCmp(prototype.id + '-txtFilterGSA').show();
                Ext.getCmp(prototype.id + '-txtFilterArea').show();
                Ext.getCmp(prototype.id + '-txtFilterCountry').show();
                break;

                break;
            default:
                Ext.getCmp(prototype.id + '-txtFilterGSA').hide();
                Ext.getCmp(prototype.id + '-txtFilterArea').hide();
                Ext.getCmp(prototype.id + '-txtFilterCountry').hide();
                break;
        }
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);

    },
    setFormatParameter: function() {
        var opcion = Ext.getCmp(prototype.id + '-cmbOpcion').getValue();
        var IN_TFILTER = '';
        var IN_GSA = '';
        var IN_PAIS = '';
        var IN_AREA = '';

        if (opcion === 'GSA') {
            IN_TFILTER = '1';
            IN_GSA = Ext.getCmp(prototype.id + '-txtFilterGSA').getValue().toUpperCase();
            IN_PAIS = Ext.getCmp(prototype.id + '-txtFilterCountry').getValue().toUpperCase();
            IN_AREA = Ext.getCmp(prototype.id + '-txtFilterArea').getValue().toUpperCase();
        } else {
            IN_TFILTER = '0';
        }

        searchParams = {
            IN_TFILTER: IN_TFILTER,
            IN_GSA: IN_GSA,
            IN_PAIS: IN_PAIS,
            IN_AREA: IN_AREA
        };
        console.log(searchParams);

    },
    setGridData: function(obj, val) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GSAIncentiveGSACountry.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    console.log(pagData);
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
        global.clear();
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);

    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.sales.GSAIncentiveGSACountryForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    btnBack_click: function(obj, e) {
        global.showMenu();
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtFilterGSA').setValue("");
        Ext.getCmp(prototype.id + '-txtFilterArea').setValue("");
        Ext.getCmp(prototype.id + '-txtFilterCountry').setValue("");
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
        global.getFile(prototype.url + '/getXLSX?IN_TFILTER=' + searchParams.IN_TFILTER
                + '&IN_GSA=' + searchParams.IN_GSA
                + '&IN_PAIS=' + searchParams.IN_PAIS
                + '&IN_AREA=' + searchParams.IN_AREA);
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
