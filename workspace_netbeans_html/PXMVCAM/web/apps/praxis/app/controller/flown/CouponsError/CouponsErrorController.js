/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.CouponsError.CouponsErrorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CouponsErrorController',
    fecha: new Date(),
    dateFrom: '',
    dateTo: '',
    searchParams: {},
    me: '',
    setContext: function () {
        me = this;
    },
    init: function(view) {
        prototype.id = 'CouponsErrorForm';
        prototype.url = CONTEXTPATH + '/CouponsError';

        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#CouponsErrorForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#CouponsErrorForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CouponsErrorForm-btnClear': {
                click: this.btnClear_click
            },
            '#CouponsErrorForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CouponsErrorForm-btnFilter': {
                click: this.btnFilter_click
            },           
            '#CouponsErrorForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CouponsErrorForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CouponsErrorForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CouponsErrorForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#CouponsErrorForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#CouponsErrorForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            },
            '#CouponsErrorForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#CouponsErrorForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#CouponsErrorForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
            '#CouponsErrorForm-txtFlight': {
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
    // ---------- Eventos de consistencia de los combos---------------
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function(obj) {
        obj.setValue('0' + (this.fecha.getMonth() + 1));
    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    }
    ,
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
    selectComboFromDay: function(obj) {

        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());

    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataYear2 = win.getStoreYear2(false, this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear2);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        var storeComboDataDay = win.getStoreDays(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);



        Ext.Ajax.request({
            url: prototype.url + '/loadData',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...', ''),
            params: {},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var ciudades = res.dataCiudades;
                var paises = res.dataPaises;


                var storePaises = Ext.create('Ext.data.Store', {
                    data: paises,
                    autoLoad: true
                });
                var storeCiudades = Ext.create('Ext.data.Store', {
                    data: ciudades,
                    autoLoad: true
                });


                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storePaises);
                Ext.getCmp(prototype.id + '-cmbCDEPART').bindStore(storeCiudades);
                Ext.getCmp(prototype.id + '-cmbCARRIVA').bindStore(storeCiudades);
                Ext.getCmp(prototype.id + '-gridData').unmask();
            }
        });

    }
    ,
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    selectCbxStval: function(obj, e) {
        this.btnSearch_click();
    }
    ,
    setFormatParameter: function() {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var PSVVTA = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        var CDEPART = Ext.getCmp(prototype.id + '-cmbCDEPART').getValue();
        var CARRIVA = Ext.getCmp(prototype.id + '-cmbCARRIVA').getValue();
        var NFLIGHT = Ext.getCmp(prototype.id + '-txtFlight').getValue();

        if (dayFrom.getValue() === null || dayFrom.getValue() === '') {
            dayFrom.setValue('');
            dayTo.setValue('');
        } else {
            if (dayTo.getValue() === null || dayTo.getValue() === '') {
                dayTo.setValue(31);
            }
        }
        var IN_FECHA_FROM = yearFrom.getValue() + monthFrom.getValue() + dayFrom.getValue();
        var IN_FECHA_TO = yearTo.getValue() + monthTo.getValue() + dayTo.getValue();

        if (PSVVTA === null) {
            PSVVTA = '';
        }
        if (CDEPART === null) {
            CDEPART = '';
        }
        if (CARRIVA === null) {
            CARRIVA = '';
        }


        searchParams = {
            IN_FECHA_FROM: IN_FECHA_FROM,
            IN_FECHA_TO: IN_FECHA_TO,
            PSVVTA: PSVVTA,
            CDEPART: CDEPART,
            CARRIVA: CARRIVA,
            NFLIGHT: NFLIGHT
        };

//        console.log("IN_FECHA_FROM : " + IN_FECHA_FROM);
//        console.log("IN_FECHA_TO : " + IN_FECHA_TO);
//        console.log("PSVVTA : " + PSVVTA);
//        console.log("CDEPART : " + CDEPART);
//        console.log("CARRIVA : " + CARRIVA);
//        console.log("NFLIGHT : " + NFLIGHT);
    },
    setGridData: function(obj, val) {
        this.setFormatParameter();
//        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.CouponsError.GridData', {
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
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var cmbCountry = Ext.getCmp(prototype.id + '-cmbCountry');
        var cmbCDEPART = Ext.getCmp(prototype.id + '-cmbCDEPART');
        var cmbCARRIVA = Ext.getCmp(prototype.id + '-cmbCARRIVA');
        var txtFlight = Ext.getCmp(prototype.id + '-txtFlight');

        yearFrom.setValue(this.fecha.getFullYear());
        var storeComboDataYear = win.getStoreYear2(false, yearFrom.getValue());
        yearTo.bindStore(storeComboDataYear);
        yearTo.setValue(this.fecha.getFullYear());
        monthFrom.setValue('0' + (this.fecha.getMonth() + 1));
        monthTo.setValue('0' + (this.fecha.getMonth() + 1));
        dayFrom.setValue("");
        dayTo.setValue("");
        cmbCountry.setValue("");
        cmbCDEPART.setValue("");
        cmbCARRIVA.setValue("");
        txtFlight.setValue("");
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
        this.setFormatParameter();
        global.getFile(prototype.url + '/getXLSX?IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM
                + '&IN_FECHA_TO=' + searchParams.IN_FECHA_TO
                + '&PSVVTA=' + searchParams.PSVVTA
                + '&CDEPART=' + searchParams.CDEPART
                + '&CARRIVA=' + searchParams.CARRIVA
                + '&NFLIGHT=' + searchParams.NFLIGHT);
    }
    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-panelDateFilters');

        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
   
    /**
     * Metodos usados para editar
     * */
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);
    },
    winDataEntry: function(action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        all = all === null || all === undefined ? {} : all;

        var strTicket = rec.data.strTicket.replace(" ", '').replace(" ", '');

        Ext.Ajax.request({
            url: prototype.url + '/searchBeanTkt',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: {
                strTicket: strTicket
            },
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var beanConsTkt = res.beanConsTkt;
                var msjVal = res.msjVal;

                console.log(beanConsTkt);
                console.log(msjVal);

                var dataEntry = Ext.create('Ext.Praxis.view.flown.CouponsErrorForm.DataEntry', {
                    id: prototype.id + '-dataEntry',
                    params: {
                        action: action,
                        beanConsTkt: beanConsTkt,
                        msjVal: msjVal,
                        all: all,
                        rowIndex: rowIndex
                    }
                });
                dataEntry.setId(prototype.id + "-dataEntry");
                dataEntry.show();
                Ext.getCmp(prototype.id + '-gridData').unmask();
            }
        });



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
