/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.AccountingCalendar.AccountingCalendarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingCalendarController',
    url: CONTEXTPATH + '/AccountingCalendar',
    fecha: new Date(),
    dateFrom: '',
    dateTo: '',
    beanActual: '',
    searchParams: {},
    me: '',
    setContext: function () {
        me = this;
    },
    init: function(view) {
        console.log('1)  APPLICATION ACCOUNTIN CALENDAR - CONTROLLER ACOUNTING CALENDAR - INIT');
        prototype.id = 'AccountingCalendarForm';
        //prototype.id01 = 'DataEntryAircraftMasterForm';
        prototype.url = CONTEXTPATH + '/AccountingCalendar';

        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#AccountingCalendarForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#AccountingCalendarForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AccountingCalendarForm-btnClear': {
                click: this.btnClear_click
            },
            '#AccountingCalendarForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AccountingCalendarForm-btnFilter': {
                click: this.btnFilter_click
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#AccountingCalendarForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#AccountingCalendarForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            }
            ,
            '#AccountingCalendarForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#AccountingCalendarForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#AccountingCalendarForm-btnSaveStatus': {
                click: this.selectBtnSave
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        console.log("AfeterRender");
        this.setStoreData();
        // this.btnSearch_click();

    },
    // ---------- Eventos de consistencia de los combos---------------
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function(obj) {
        obj.setValue('');
    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    }
    ,
    selectComboFromMonth: function(obj) {

        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');


        comboToMonth.setValue(obj.getValue());
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
    selectBtnSave: function() {
        this.setFormatParameter();
        var cmbStatus = Ext.getCmp(prototype.id + '-cmbStatus');
        console.log("---> " + cmbStatus.getValue());

        if (cmbStatus.getValue() !== 'C') {
            global.Msg({                
                msg: 'Status must be "Closed".'
            });
        } else if (Ext.getCmp(prototype.id + '-currentPeriod').getValue() === '') {
            global.Msg({
                msg: 'Data not found.'
            });
        } else {

            Ext.Ajax.request({
                url: prototype.url + '/cerrarFecha',
                method: 'POST',
                timeout: 60000000,
                params: searchParams,
                success: function(response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var data1 = res.data;


                    beanActual = res.perActual;
                    storeGridDatas = Ext.create('Ext.Praxis.store.flown.AccountingCalendar.GridData', {
                        data: res.data
                    });
                    Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
                    if (data1.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                        Ext.getCmp(prototype.id + '-currentPeriod').setValue('');
                    } else {
                        if (me.beanActual !== '') {
                            if (me.beanActual.STATUS === 'Open' || me.beanActual.STATUS === '0') {
                                Ext.getCmp(prototype.id + '-cmbStatus').setReadOnly(false);
                                Ext.getCmp(prototype.id + '-btnSaveStatus').show();
                            } else {
                                Ext.getCmp(prototype.id + '-cmbStatus').setReadOnly(true);
                                Ext.getCmp(prototype.id + '-btnSaveStatus').hide();
                            }
                        }

                        Ext.getCmp(prototype.id + '-currentPeriod').setValue(me.beanActual.DPERIOD);
                        Ext.getCmp(prototype.id + '-cmbStatus').setValue(me.beanActual.STATUS);
                        global.Msg({
                            msg: res.msj
                        });
                    }
                }
            });
        }





    }
    ,
    setStoreData: function() {
        console.log("Asignandovalores al combo");
        var cmbStatus = Ext.getCmp(prototype.id + '-cmbStatus');
        cmbStatus.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["A", "Open"],
                ["C", "Closed"]
            ]
        }));

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataYear2 = win.getStoreYear2(false, this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear2);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

    }
    ,
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');


//        var DPERIOD='';
//        var TPOREG ='';
//        var LASTD ='';
//        var STATUS = '';
//        
        if (this.beanActual) {
            console.log("Bean actual 1: " + this.beanActual);
        } else {
            console.log("Bean actual 2: " + this.beanActual);
        }

        var DPERIOD = this.beanActual.DPERIOD;
        var TPOREG = '00';
        var LASTD = this.beanActual.LASTD;
        var STATUS = this.beanActual.STATUS;

        this.dateFrom = yearFrom.getValue() + monthFrom.getValue();
        this.dateTo = yearTo.getValue() + monthTo.getValue();


        searchParams = {
            dateFrom: this.dateFrom.trim(),
            dateTo: this.dateTo.trim(),
            DPERIOD: DPERIOD,
            TPOREG: TPOREG,
            LASTD: LASTD,
            STATUS: STATUS
        };
    },
    setGridData: function(obj, val) {
        this.setFormatParameter();
        console.log("URL : " + prototype.url + '/search');

        var data1;
        var storeGridDatas;
        Ext.Ajax.request({
            url: prototype.url + '/search',
            method: 'POST',
            timeout: 60000000,
            params: searchParams,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                me.beanActual = res.perActual;
                data1 = res.data;
                storeGridDatas = Ext.create('Ext.Praxis.store.flown.AccountingCalendar.GridData', {
                    data: res.data
                });
                Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
                if (data1.length === 0) {
                    global.Msg({
                        msg: 'Data not found.'
                    });
                    Ext.getCmp(prototype.id + '-currentPeriod').setValue('');
                } else {
                    if (me.beanActual !== '') {
                        if (me.beanActual.STATUS === 'Open' || me.beanActual.STATUS === '0') {
                            Ext.getCmp(prototype.id + '-cmbStatus').setReadOnly(false);
                            Ext.getCmp(prototype.id + '-btnSaveStatus').show();
                        } else {
                            Ext.getCmp(prototype.id + '-cmbStatus').setReadOnly(true);
                            Ext.getCmp(prototype.id + '-btnSaveStatus').hide();
                        }
                    }

                    Ext.getCmp(prototype.id + '-currentPeriod').setValue(me.beanActual.DPERIOD);
                    Ext.getCmp(prototype.id + '-cmbStatus').setValue(me.beanActual.STATUS);
                }
            }
        });
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
        monthFrom.setValue('');
        monthTo.setValue('');
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
        global.getFile(prototype.url + '/getXLSX?dateFrom=' + searchParams.dateFrom + '&dateTo=' + searchParams.dateTo);
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    }
});
