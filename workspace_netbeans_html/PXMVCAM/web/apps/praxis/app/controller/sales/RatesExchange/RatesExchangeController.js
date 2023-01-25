/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.RatesExchange.RatesExchangeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RatesExchangeController',
    flightNumber: '',
    carrier: '',
    searchParams: {},
    init: function(view) {
        console.log('1)  APPLICATION RatesExchangeController - RatesExchangeController - INIT');
        prototype.id = 'RatesExchangeForm';
        prototype.url = CONTEXTPATH + '/RatesExchange';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#RatesExchangeForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#RatesExchangeForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#RatesExchangeForm-btnClear': {
                click: this.btnClear_click
            },
            '#RatesExchangeForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#RatesExchangeForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#RatesExchangeForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#RatesExchangeForm-btnBack': {
                click: this.btnBack_click
            },
            '#RatesExchangeForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#RatesExchangeForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#RatesExchangeForm-btn-pag-next': {
                click: this.pagNext
            },
            '#RatesExchangeForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------           
            ,
            '#RatesExchangeForm-txt_1_1': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#RatesExchangeForm-txt_1_2': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#RatesExchangeForm-txt_1_3': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#RatesExchangeForm-txt_2_1': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#RatesExchangeForm-txt_2_2': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#RatesExchangeForm-txt_2_3': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#RatesExchangeForm-txt_3_1': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#RatesExchangeForm-txt_3_2': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#RatesExchangeForm-txt_3_3': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#RatesExchangeForm-txt_3_4': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#RatesExchangeForm-txt_4_1': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#RatesExchangeForm-txt_4_2': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#RatesExchangeForm-txt_4_3': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#RatesExchangeForm-txt_4_4': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#RatesExchangeForm-cmbSearchType': {
                change: this.cmbChange
            },
            '#RatesExchangeForm-cboFilter': {
                change: this.cmbChange
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        this.hidePanels();
        Ext.getCmp(prototype.id + '-filterPanel_01').show();


        this.btnSearch_click();

    },
    hidePanels: function() {
        Ext.getCmp(prototype.id + '-filterPanel_01').hide();
        Ext.getCmp(prototype.id + '-filterPanel_02').hide();
        Ext.getCmp(prototype.id + '-filterPanel_03').hide();
        Ext.getCmp(prototype.id + '-filterPanel_04').hide();
    },
    hideTables: function() {
        Ext.getCmp(prototype.id + '-grid_01').hide();
        Ext.getCmp(prototype.id + '-grid_02').hide();
        Ext.getCmp(prototype.id + '-grid_03').hide();
        Ext.getCmp(prototype.id + '-grid_04').hide();

    }
    ,
    clearTxt: function() {
        Ext.getCmp(prototype.id + '-txt_1_1').setValue('');
        Ext.getCmp(prototype.id + '-txt_1_2').setValue('');
        Ext.getCmp(prototype.id + '-txt_1_3').setValue('');
        Ext.getCmp(prototype.id + '-txt_2_1').setValue('');
        Ext.getCmp(prototype.id + '-txt_2_2').setValue('');
        Ext.getCmp(prototype.id + '-txt_2_3').setValue('');
        Ext.getCmp(prototype.id + '-txt_3_1').setValue('');
        Ext.getCmp(prototype.id + '-txt_3_2').setValue('');
        Ext.getCmp(prototype.id + '-txt_3_3').setValue('');
        Ext.getCmp(prototype.id + '-txt_3_4').setValue('');
        Ext.getCmp(prototype.id + '-txt_4_1').setValue('');
        Ext.getCmp(prototype.id + '-txt_4_2').setValue('');
        Ext.getCmp(prototype.id + '-txt_4_3').setValue('');
        Ext.getCmp(prototype.id + '-txt_4_4').setValue('');
    }
    ,
    cmbChange: function() {
        this.hidePanels();
        this.clearTxt();
        var opt1 = Ext.getCmp(prototype.id + '-cmbSearchType').getValue();
        var opt2 = Ext.getCmp(prototype.id + '-cboFilter').getValue();

        switch (opt2) {
            case '1': //Currency
                switch (opt1) {
                    case 'A018':
                        Ext.getCmp(prototype.id + '-btnAdd').hide();
                        Ext.getCmp(prototype.id + '-filterPanel_01').show();
                        break;
                    case 'A110':
                        Ext.getCmp(prototype.id + '-btnAdd').hide();
                        Ext.getCmp(prototype.id + '-filterPanel_01').show();
                        break;
                    case 'A1343':
                        Ext.getCmp(prototype.id + '-btnAdd').hide();
                        Ext.getCmp(prototype.id + '-filterPanel_03').show();
                        break;
                    case 'A1526':
                        Ext.getCmp(prototype.id + '-btnAdd').show();
                        Ext.getCmp(prototype.id + '-filterPanel_03').show();
                        break;
                    case 'A4061':
                        Ext.getCmp(prototype.id + '-btnAdd').hide();
                        Ext.getCmp(prototype.id + '-filterPanel_03').show();
                        break;
                }
                break;
            case '2': //Date
                switch (opt1) {
                    case 'A018':
                        Ext.getCmp(prototype.id + '-btnAdd').hide();
                        Ext.getCmp(prototype.id + '-filterPanel_02').show();
                        break;
                    case 'A110':
                        Ext.getCmp(prototype.id + '-btnAdd').hide();
                        Ext.getCmp(prototype.id + '-filterPanel_02').show();
                        break;
                    case 'A1343':
                        Ext.getCmp(prototype.id + '-btnAdd').hide();
                        Ext.getCmp(prototype.id + '-filterPanel_04').show();
                        break;
                    case 'A1526':
                        Ext.getCmp(prototype.id + '-btnAdd').show();
                        Ext.getCmp(prototype.id + '-filterPanel_04').show();
                        break;
                    case 'A4061':
                        Ext.getCmp(prototype.id + '-btnAdd').hide();
                        Ext.getCmp(prototype.id + '-filterPanel_04').show();
                        break;
                }
                break;
        }

    },
    setStoreData: function() {

        var cmbSearch = Ext.getCmp(prototype.id + '-cmbSearchType');
        cmbSearch.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["A018", "IATA Rate"],
                ["A110", "IATA Variation"],
                ["A1343", "BSR Rate"],
                ["A1526", "AM Rate"],
                ["A4061", "AM Filtc"]
            ]
        }));
        cmbSearch.setValue('A018');

        var cboFilter = Ext.getCmp(prototype.id + '-cboFilter');
        cboFilter.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Currency"],
                ["2", "Date"]
            ]
        }));
        cboFilter.setValue('1');
        cmbSearch.setValue('A018');
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }
    ,
    btnSearch_click: function(obj, e) {
        this.setParams();
        var opt1 = Ext.getCmp(prototype.id + '-cmbSearchType').getValue();
        var opt2 = Ext.getCmp(prototype.id + '-cboFilter').getValue();
        var msg = "";
        if (opt1 === 'A1343' || opt1 === 'A1526' || opt1 === 'A4061') {
            if (opt2 === '1') {
                if (searchParams.currencyFrom.length === 0 || searchParams.currencyTo.length === 0) {
                    msg = 'Please enter Currency From and Currency To';
                }
            } else if (searchParams.dateFrom.length < 6 || searchParams.dateTo.length < 6) {
                msg = 'Please enter a valid Date';
            }
        }

        if (msg === '') {
            this.setGridData(obj, e);
        } else {
            global.Msg({
                msg: msg
            });
        }


    },
    setParams: function() {

        var dateFrom;
        var dateTo;
        var currencyFrom;
        var currencyTo;

        var opt1 = Ext.getCmp(prototype.id + '-cmbSearchType').getValue();
        var opt2 = Ext.getCmp(prototype.id + '-cboFilter').getValue();

        switch (opt2) {
            case '1': //Currency
                switch (opt1) {
                    case 'A018':
                        currencyFrom = Ext.getCmp(prototype.id + '-txt_1_1').getValue();
                        currencyTo = '';
                        dateFrom = Ext.getCmp(prototype.id + '-txt_1_2').getValue();
                        dateTo = Ext.getCmp(prototype.id + '-txt_1_3').getValue();
                        break;
                    case 'A110':
                        currencyFrom = Ext.getCmp(prototype.id + '-txt_1_1').getValue();
                        currencyTo = '';
                        dateFrom = Ext.getCmp(prototype.id + '-txt_1_2').getValue();
                        dateTo = Ext.getCmp(prototype.id + '-txt_1_3').getValue();
                        break;
                    case 'A1343':
                        currencyFrom = Ext.getCmp(prototype.id + '-txt_3_1').getValue();
                        currencyTo = Ext.getCmp(prototype.id + '-txt_3_2').getValue();
                        dateFrom = Ext.getCmp(prototype.id + '-txt_3_3').getValue();
                        dateTo = Ext.getCmp(prototype.id + '-txt_3_4').getValue();
                        break;
                    case 'A1526':
                        currencyFrom = Ext.getCmp(prototype.id + '-txt_3_1').getValue();
                        currencyTo = Ext.getCmp(prototype.id + '-txt_3_2').getValue();
                        dateFrom = Ext.getCmp(prototype.id + '-txt_3_3').getValue();
                        dateTo = Ext.getCmp(prototype.id + '-txt_3_4').getValue();
                        break;
                    case 'A4061':
                        currencyFrom = Ext.getCmp(prototype.id + '-txt_3_1').getValue();
                        currencyTo = Ext.getCmp(prototype.id + '-txt_3_2').getValue();
                        dateFrom = Ext.getCmp(prototype.id + '-txt_3_3').getValue();
                        dateTo = Ext.getCmp(prototype.id + '-txt_3_4').getValue();
                        break;
                }
                break;
            case '2': //Date
                switch (opt1) {
                    case 'A018':
                        currencyFrom = Ext.getCmp(prototype.id + '-txt_2_3').getValue();
                        currencyTo = '';
                        dateFrom = Ext.getCmp(prototype.id + '-txt_2_1').getValue();
                        dateTo = Ext.getCmp(prototype.id + '-txt_2_2').getValue();
                        break;
                    case 'A110':
                        currencyFrom = Ext.getCmp(prototype.id + '-txt_2_3').getValue();
                        currencyTo = '';
                        dateFrom = Ext.getCmp(prototype.id + '-txt_2_1').getValue();
                        dateTo = Ext.getCmp(prototype.id + '-txt_2_2').getValue();
                        break;
                    case 'A1343':
                        currencyFrom = Ext.getCmp(prototype.id + '-txt_4_3').getValue();
                        currencyTo = Ext.getCmp(prototype.id + '-txt_4_4').getValue();
                        dateFrom = Ext.getCmp(prototype.id + '-txt_4_1').getValue();
                        dateTo = Ext.getCmp(prototype.id + '-txt_4_2').getValue();
                        break;
                    case 'A1526':
                        currencyFrom = Ext.getCmp(prototype.id + '-txt_4_3').getValue();
                        currencyTo = Ext.getCmp(prototype.id + '-txt_4_4').getValue();
                        dateFrom = Ext.getCmp(prototype.id + '-txt_4_1').getValue();
                        dateTo = Ext.getCmp(prototype.id + '-txt_4_2').getValue();
                        break;
                    case 'A4061':
                        currencyFrom = Ext.getCmp(prototype.id + '-txt_4_3').getValue();
                        currencyTo = Ext.getCmp(prototype.id + '-txt_4_4').getValue();
                        dateFrom = Ext.getCmp(prototype.id + '-txt_4_1').getValue();
                        dateTo = Ext.getCmp(prototype.id + '-txt_4_2').getValue();
                        break;
                }
                break;
        }

        console.log("currencyFrom : " + currencyFrom);
        console.log("currencyTo : " + currencyTo);
        console.log("dateFrom : " + dateFrom);
        console.log("dateTo : " + dateTo);

        searchParams = {
            currencyFrom: currencyFrom,
            currencyTo: currencyTo,
            dateFrom: dateFrom,
            dateTo: dateTo,
            IN_TIPO_TABLA: opt1,
            IN_TIPO: opt2,
            IN_CURR_FROM: currencyFrom,
            IN_CURR_TO: currencyTo,
            IN_DATE: dateFrom,
            IN_DATE_2: dateTo
        };
        console.log("-------------Parametros enviados-----------");
        console.log("IN_TIPO : " + searchParams.IN_TIPO);
        console.log("IN_CURR_FROM : " + searchParams.IN_CURR_FROM);
        console.log("IN_CURR_FROM : " + searchParams.IN_CURR_FROM);
        console.log("IN_CURR_TO : " + searchParams.IN_CURR_TO);
        console.log("IN_DATE : " + searchParams.IN_DATE);
        console.log("IN_DATE_2 : " + searchParams.IN_DATE_2);
        console.log("-------------------------------------------");
    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.RatesExchange.GridData', {
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
        this.hideTables();
        var opt1 = Ext.getCmp(prototype.id + '-cmbSearchType').getValue();
        var grid;
        switch (opt1) {
            case 'A018':
                grid = Ext.getCmp(prototype.id + '-grid_01');
                break;
            case 'A110':
                grid = Ext.getCmp(prototype.id + '-grid_02');
                break;
            case 'A1343':
                grid = Ext.getCmp(prototype.id + '-grid_03');
                break;
            case 'A1526':
                grid = Ext.getCmp(prototype.id + '-grid_04');
                break;
            case 'A4061':
                grid = Ext.getCmp(prototype.id + '-grid_05');
                break;
        }

        grid.bindStore(storeGridDatas);
        grid.show();
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    eventKey: function(e, eOpts) {

        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    }
    ,
    btnClear_click: function(obj, e) {
        this.clearTxt();
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
        global.getFile(prototype.url + '/getXLSX?IN_TIPO_TABLA='
                + searchParams.IN_TIPO_TABLA
                + '&IN_TIPO=' + searchParams.IN_TIPO
                + '&IN_CURR_FROM=' + searchParams.IN_CURR_FROM
                + '&IN_CURR_TO=' + searchParams.IN_CURR_TO
                + '&IN_DATE=' + searchParams.IN_DATE
                + '&IN_DATE_2=' + searchParams.IN_DATE_2);
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

        Ext.create('Ext.Praxis.view.sales.RatesExchangeForm.DataEntry', {
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
