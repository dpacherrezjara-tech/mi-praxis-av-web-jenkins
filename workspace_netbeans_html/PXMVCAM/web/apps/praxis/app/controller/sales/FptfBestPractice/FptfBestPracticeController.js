/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.FptfBestPractice.FptfBestPracticeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FptfBestPracticeController',
    fecha: new Date(),
    searchParams: {},
    init: function(view) {
        console.log('1)  APPLICATION FptfBestPractice - CONTROLLER FptfBestPractice   - INIT');
        prototype.id = 'FptfBestPracticeForm';
        prototype.url = CONTEXTPATH + '/FptfBestPractice';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#FptfBestPracticeForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#FptfBestPracticeForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#FptfBestPracticeForm-btnClear': {
                click: this.btnClear_click
            },
            '#FptfBestPracticeForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#FptfBestPracticeForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#FptfBestPracticeForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#FptfBestPracticeForm-btnBack': {
                click: this.btnBack_click
            },
            '#FptfBestPracticeForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#FptfBestPracticeForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#FptfBestPracticeForm-btn-pag-next': {
                click: this.pagNext
            },
            '#FptfBestPracticeForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------

            '#FptfBestPracticeForm-txtForm': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#FptfBestPracticeForm-txtSource': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#FptfBestPracticeForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#FptfBestPracticeForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            }
            ,
            '#FptfBestPracticeForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#FptfBestPracticeForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#FptfBestPracticeForm-rbgSearch': {
                change: this.selectRbgSearch
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        console.log(".......");
        this.setStoreData();
        Ext.getCmp(prototype.id + '-txtForm').show();
        Ext.getCmp(prototype.id + '-txtSource').hide();
        this.btnSearch_click();
    },
    afterRenderYear: function(obj) {
        obj.setValue("");
    },
    afterRenderMonth: function(obj) {
        obj.setValue("");
    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(true, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');

        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() > comboToMonth.getValue()) {
                comboToMonth.setValue(obj.getValue());
            }
        }
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
    selectRbgSearch: function(obj) {

        console.log(obj.getValue().rb);
        var option = obj.getValue().rb;
        switch (option) {
            case 'FUENTE':
                Ext.getCmp(prototype.id + '-txtForm').setValue("");
                Ext.getCmp(prototype.id + '-txtSource').setValue("");
                Ext.getCmp(prototype.id + '-txtForm').hide();
                Ext.getCmp(prototype.id + '-txtSource').show();
                break;
            case 'FORMA':
                Ext.getCmp(prototype.id + '-txtSource').setValue("");
                Ext.getCmp(prototype.id + '-txtForm').setValue("");
                Ext.getCmp(prototype.id + '-txtForm').show();
                Ext.getCmp(prototype.id + '-txtSource').hide();
                break;
        }

    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function() {

        var storeComboDataYear = win.getStoreYear(true);
        var storeComboDataYear2 = win.getStoreYear2(true, this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);



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
        var form = Ext.getCmp(prototype.id + '-txtForm');
        var source = Ext.getCmp(prototype.id + '-txtSource');
        var option = Ext.getCmp(prototype.id + '-rbgSearch');
        option = option.getValue().rb;

        var dateFrom = yearFrom.getValue() + monthFrom.getValue();
        var dateTo = yearTo.getValue() + monthTo.getValue();

        var A722FORMA = form.getValue();
        var A722FTEVTA = source.getValue();


        searchParams = {
            dateFrom: dateFrom,
            dateTo: dateTo,
            A722FORMA: A722FORMA,
            A722FTEVTA: A722FTEVTA

        };

        console.log("DateFrom : " + dateFrom);
        console.log("DateTo : " + dateTo);
        console.log("A722FORMA : " + A722FORMA);
        console.log("A722FTEVTA : " + A722FTEVTA);

    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.FptfBestPractice.GridData', {
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


        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');

        Ext.getCmp(prototype.id + '-txtForm').setValue('');
        Ext.getCmp(prototype.id + '-txtSource').setValue('');

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

        global.getFile(prototype.url + '/getXLSX?dateFrom=' + searchParams.dateFrom + '&A722FORMA=' + searchParams.A722FORMA + '&dateTo=' + searchParams.dateTo + '&A722FTEVTA=' + searchParams.A722FTEVTA);
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
    getDataEntryBestPractice: function(dv, record, item, index, e) {
        var data = dv.dataSource.data.items[item].data;
        Ext.Ajax.request({
            url: prototype.url + '/searchByCode',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                A722FDESDE: data.A722FDESDE,
                A722FHASTA: data.A722FHASTA,
                A722FORMA: data.A722FORMA,
                A722FTEVTA: data.A722FTEVTA,
                A722TFORM3: data.A722TFORM3,
                A722UFORMA: data.A722UFORMA,
                A722EMTCUP: data.A722EMTCUP

            },
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                res = res.data;
                Ext.create('Ext.Praxis.view.sales.FptfBestPracticeForm.DataEntry', {
                    id: prototype.id + '-dataEntry',
                    params: {
                        data: res
                    }
                }).show();

                Ext.getBody().unmask();
            }
        });








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

        Ext.create('Ext.Praxis.view.sales.FptfBestPractice.DataEntry', {
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
