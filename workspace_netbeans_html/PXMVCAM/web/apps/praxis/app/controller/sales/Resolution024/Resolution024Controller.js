/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.Resolution024.Resolution024Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Resolution024Controller',
    fecha: new Date(),
    searchParams: {},
    init: function(view) {
        console.log('1)  APPLICATION RESOLUTION 024 - CONTROLLER RESOLUTION 024  - INIT');
        prototype.id = 'Resolution024Form';
        prototype.url = CONTEXTPATH + '/Resolution024';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#Resolution024Form-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#Resolution024Form-btnSearch': {
                click: this.btnSearch_click
            },
            '#Resolution024Form-btnClear': {
                click: this.btnClear_click
            },
            '#Resolution024Form-btnExcel': {
                click: this.btnExcel_click
            },
            '#Resolution024Form-btnFilter': {
                click: this.btnFilter_click
            },
            '#Resolution024Form-btnAdd': {
                click: this.btnAdd_click
            },
            '#Resolution024Form-btnBack': {
                click: this.btnBack_click
            },
            '#Resolution024Form-btn-pag-first': {
                click: this.pagFirst
            },
            '#Resolution024Form-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#Resolution024Form-btn-pag-next': {
                click: this.pagNext
            },
            '#Resolution024Form-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#Resolution024Form-cmbSearchType': {
                select: this.selectcmbSearchType
            },
            '#Resolution024Form-txtCountry': {
                keyup: this.eventKey,
                change: this.onUpperValue

            },
            '#Resolution024Form-txtCurrency': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#Resolution024Form-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#Resolution024Form-cmbDateToYear': {
                afterrender: this.afterRenderYear
            }
            ,
            '#Resolution024Form-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#Resolution024Form-cmbDateToMonth': {
                select: this.selectComboToMonth
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        Ext.getCmp(prototype.id + '-cmbSearchType').setValue("CO");
        Ext.getCmp(prototype.id + '-txtCountry').show();
        Ext.getCmp(prototype.id + '-txtCurrency').hide();
        this.btnSearch_click();
    },
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
//    afterRenderMonth: function(obj) {
//        obj.setValue('0' + (this.fecha.getMonth() + 1));
//    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function(obj) {

        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());

    },
    selectComboToMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');


        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectcmbSearchType: function(obj) {

        var opt = obj.getValue();
        switch (opt) {
            case 'CO':

                Ext.getCmp(prototype.id + '-txtCountry').setValue("");
                Ext.getCmp(prototype.id + '-txtCountry').show();
                Ext.getCmp(prototype.id + '-txtCurrency').hide();
                break;
            case 'CU':

                Ext.getCmp(prototype.id + '-txtCurrency').setValue("");
                Ext.getCmp(prototype.id + '-txtCountry').hide();
                Ext.getCmp(prototype.id + '-txtCurrency').show();
                break;
        }

    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function() {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataYear2 = win.getStoreYear2(false, this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear2);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);


        var cmbSearch = Ext.getCmp(prototype.id + '-cmbSearchType');
        cmbSearch.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["CO", "Country"],
                ["CU", "Currency"]
            ]
        }));
    }
    ,
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var currency = Ext.getCmp(prototype.id + '-txtCurrency');
        var country = Ext.getCmp(prototype.id + '-txtCountry');
        var option = Ext.getCmp(prototype.id + '-cmbSearchType');


        var dateFrom = yearFrom.getValue() + monthFrom.getValue();
        var dateTo = yearTo.getValue() + monthTo.getValue();
        var optionTx = option.getValue();
        var strCampo = "";
        var strValor = "";
        if (optionTx === "CO") {
            strCampo = "A881PAIS";
            strValor = country.getValue();
        } else {
            strCampo = "A881MONEDA";
            strValor = currency.getValue();
        }

        searchParams = {
            dateFrom: dateFrom,
            dateTo: dateTo,
            strCampo: strCampo,
            strValor: strValor,
            option: optionTx
        };

        console.log("DateFrom : " + dateFrom);
        console.log("DateTo : " + dateTo);
        console.log("strCampo : " + strCampo);
        console.log("strValor : " + strValor);

    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.Resolution024.GridData', {
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

        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');


        yearFrom.setValue(this.fecha.getFullYear());
        var storeComboDataYear = win.getStoreYear2(false, yearFrom.getValue());
        yearTo.bindStore(storeComboDataYear);
        yearTo.setValue(this.fecha.getFullYear());
        monthFrom.setValue('0' + (this.fecha.getMonth() + 1));
        monthTo.setValue('0' + (this.fecha.getMonth() + 1));

        Ext.getCmp(prototype.id + '-txtCountry').setValue('');
        Ext.getCmp(prototype.id + '-txtCurrency').setValue('');

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

        global.getFile(prototype.url + '/getXLSX?dateFrom=' + searchParams.dateFrom + '&strCampo=' + searchParams.strCampo + '&dateTo=' + searchParams.dateTo + '&strValor=' + searchParams.strValor);
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

        Ext.create('Ext.Praxis.view.sales.Resolution024Form.DataEntry', {
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
