/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.PercentCommissionFOB.PercentCommissionFOBController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PercentCommissionFOBController',
    fecha: new Date(),
    drillDown: [],
    gridActual: '',
    tabActual: prototype.id + 'panel1',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'PercentCommissionFOBForm';
        prototype.url = CONTEXTPATH + '/PercentCommissionFOB';
        tabActual = prototype.id + '-panel1';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#PercentCommissionFOBForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#PercentCommissionFOBForm-tabPanel': {
                tabchange: this.changePanel
            },
            //---- Primera barra de opciones            
            '#PercentCommissionFOBForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#PercentCommissionFOBForm-btnClear': {
                click: this.btnClear_click
            },
            '#PercentCommissionFOBForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#PercentCommissionFOBForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#PercentCommissionFOBForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#PercentCommissionFOBForm-btnBack': {
                click: this.btnBack_click
            },
            '#PercentCommissionFOBForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#PercentCommissionFOBForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#PercentCommissionFOBForm-btn-pag-next': {
                click: this.pagNext
            },
            '#PercentCommissionFOBForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#PercentCommissionFOBForm-cmbDate': {
                change: this.onChangeSearch
            },
            '#PercentCommissionFOBForm-txtAgreement': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#PercentCommissionFOBForm-txtCommission': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            //---- Segunda barra de opciones            
            '#PercentCommissionFOBForm-btnSearch2': {
                click: this.btnSearch_click
            },
            '#PercentCommissionFOBForm-btnClear2': {
                click: this.btnClear_click
            },
            '#PercentCommissionFOBForm-btnExcel2': {
                click: this.btnExcel_click
            },
            '#PercentCommissionFOBForm-btnFilter2': {
                click: this.btnFilter_click2
            },
            '#PercentCommissionFOBForm-btnAdd2': {
                click: this.btnAdd_click
            },
            '#PercentCommissionFOBForm-btnBack2': {
                click: this.btnBack_click
            },
            '#PercentCommissionFOBForm-btn-pag-first2': {
                click: this.pagFirst2
            },
            '#PercentCommissionFOBForm-btn-pag-previous2': {
                click: this.pagPrevious2
            },
            '#PercentCommissionFOBForm-btn-pag-next2': {
                click: this.pagNext2
            },
            '#PercentCommissionFOBForm-btn-pag-last2': {
                click: this.pagLast2
            },
            //-----------------Eventos Especificos -------------------            
            '#PercentCommissionFOBForm-CbmFilterEx': {
                change: this.onChangeSearch2
            },
            '#PercentCommissionFOBForm-txtA1874CODEA': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#PercentCommissionFOBForm-txtA1874IATA': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.hideComponents();
        this.setStoreData();
        this.btnSearch_click();
    },
    hideComponents: function() {
        Ext.getCmp(prototype.id + '-txtAgreement').hide();
        Ext.getCmp(prototype.id + '-txtCommission').hide();
        Ext.getCmp(prototype.id + '-txtA1874CODEA').hide();
        Ext.getCmp(prototype.id + '-txtA1874IATA').hide();
    },
    changePanel: function(tabPanel, newTab, oldTab) {
        this.tabActual = newTab.id;
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
        var cmbDate = Ext.getCmp(prototype.id + '-cmbDate');
        cmbDate.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["1", "Code"],
                ["2", "% Commission"]
            ]
        }));
        cmbDate.setValue("");
        var CbmFilterEx = Ext.getCmp(prototype.id + '-CbmFilterEx');
        CbmFilterEx.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["1", "Agreement"],
                ["2", "IATA"]
            ]
        }));
        CbmFilterEx.setValue("");
    },
    onChangeSearch: function(obj, value) {

        switch (value) {
            case '1':
                Ext.getCmp(prototype.id + '-txtAgreement').show();
                Ext.getCmp(prototype.id + '-txtCommission').hide();
                Ext.getCmp(prototype.id + '-txtAgreement').focus();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-txtAgreement').hide();
                Ext.getCmp(prototype.id + '-txtCommission').show();
                Ext.getCmp(prototype.id + '-txtCommission').focus();
                break;
            default:
                Ext.getCmp(prototype.id + '-txtAgreement').hide();
                Ext.getCmp(prototype.id + '-txtCommission').hide();
                break;
        }
    },
    onChangeSearch2: function(obj, value) {

        switch (value) {
            case '1':
                Ext.getCmp(prototype.id + '-txtA1874CODEA').show();
                Ext.getCmp(prototype.id + '-txtA1874IATA').hide();
                Ext.getCmp(prototype.id + '-txtA1874CODEA').focus();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-txtA1874CODEA').hide();
                Ext.getCmp(prototype.id + '-txtA1874IATA').show();
                Ext.getCmp(prototype.id + '-txtA1874IATA').focus();
                break;
            default:
                Ext.getCmp(prototype.id + '-txtA1874CODEA').hide();
                Ext.getCmp(prototype.id + '-txtA1874IATA').hide();
                break;
        }
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        //console.log(this.tabActual);
        if (this.tabActual === prototype.id + 'panel1') {
            this.setGridData(obj, e);
        } else {
            this.setGridData2(obj, e);
        }
    },
    setFormatParameter: function() {

        var IN_A1742CCUST = '139';
        var IN_A1742CODEA = Ext.getCmp(prototype.id + '-txtAgreement').getValue().trim();
        var IN_A1742COMM = Ext.getCmp(prototype.id + '-txtCommission').getValue().trim();

        if (IN_A1742COMM === '') {
            IN_A1742COMM = '-1';
        }

        var VP_A1874CCUST = '139';
        var VP_A1874CODEA = Ext.getCmp(prototype.id + '-txtA1874CODEA').getValue().trim();
        var VP_A1874IATA = Ext.getCmp(prototype.id + '-txtA1874IATA').getValue().trim();

        searchParams = {
            IN_A1742CCUST: IN_A1742CCUST,
            IN_A1742CODEA: IN_A1742CODEA,
            IN_A1742COMM: IN_A1742COMM,
            VP_A1874CCUST: VP_A1874CCUST,
            VP_A1874CODEA: VP_A1874CODEA,
            VP_A1874IATA: VP_A1874IATA
        };

    },
    setGridData: function(obj, val) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.PercentCommissionFOB.GridData', {
            proxy: {
                url: prototype.url + '/search'
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
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridData2: function(obj, val) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.PercentCommissionFOB.GridData', {
            proxy: {
                url: prototype.url + '/search2'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage2').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount2').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total2').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData2').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-gridData2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
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


        if (this.tabActual === prototype.id + 'panel1') {
            Ext.create('Ext.Praxis.view.sales.PercentCommissionFOBForm.DataEntry', {
                id: prototype.id + '-DataEntryPercentCommissionFOBForm',
                params: {
                    action: action,
                    rec: rec
                }
            }).show();
        } else {
            Ext.create('Ext.Praxis.view.sales.PercentCommissionFOBForm.DataEntry2', {
                id: prototype.id + '-DataEntryPercentCommissionFOBForm2',
                params: {
                    action: action,
                    rec: rec
                }
            }).show();
        }


    },
    btnBack_click: function(obj, e) {
        global.showMenu();
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtAgreement').setValue("");
        Ext.getCmp(prototype.id + '-txtCommission').setValue("");
        Ext.getCmp(prototype.id + '-txtA1874CODEA').setValue("");
        Ext.getCmp(prototype.id + '-txtA1874IATA').setValue("");
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
        if (this.tabActual === prototype.id + 'panel1') {
            global.getFile(prototype.url + '/getXLSX?IN_A1742CCUST=' + searchParams.IN_A1742CCUST
                    + '&IN_A1742CODEA=' + searchParams.IN_A1742CODEA
                    + '&IN_A1742COMM=' + searchParams.IN_A1742COMM);
        } else {
            global.getFile(prototype.url + '/getXLSX2?VP_A1874CCUST=' + searchParams.VP_A1874CCUST
                    + '&VP_A1874CODEA=' + searchParams.VP_A1874CODEA
                    + '&VP_A1874IATA=' + searchParams.VP_A1874IATA);
        }
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
    btnFilter_click2: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter2');
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
    },
    pagFirst2: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin2');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious2: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin2');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext2: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin2');
        var pagData = pag.getPageData();
        pag.moveNext();

    },
    pagLast2: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin2');
        var pagData = pag.getPageData();
        pag.moveLast();
    }




});
