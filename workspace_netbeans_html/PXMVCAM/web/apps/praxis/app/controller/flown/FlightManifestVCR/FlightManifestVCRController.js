/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.FlightManifestVCR.FlightManifestVCRController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FlightManifestVCRController',
    fecha: new Date(),
    paginTem: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    setContext: function() {
        me = this;
    },
    init: function(view) {
        prototype.id = 'FlightManifestVCRForm';
        prototype.url = CONTEXTPATH + '/FlightManifestVCR';
        me = this;

        this.control({
            // -------------------Eventos Genericos --------------------
            '#FlightManifestVCRForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#FlightManifestVCRForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#FlightManifestVCRForm-btnClear': {
                click: this.btnClear_click
            },
            '#FlightManifestVCRForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#FlightManifestVCRForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#FlightManifestVCRForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#FlightManifestVCRForm-btnBack': {
                click: this.btnBack_click
            },
            '#FlightManifestVCRForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#FlightManifestVCRForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#FlightManifestVCRForm-btn-pag-next': {
                click: this.pagNext
            },
            '#FlightManifestVCRForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#FlightManifestVCRForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#FlightManifestVCRForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            },
            '#FlightManifestVCRForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#FlightManifestVCRForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#FlightManifestVCRForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
            '#FlightManifestVCRForm-cmbMANI': {
                select: this.selectCmbMANI
            },
            '#FlightManifestVCRForm-cmbSTVAL': {
                select: this.selectCmbSTVAL
            },
            '#FlightManifestVCRForm-txtFlight': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }

        });
    },
    xpanel_afterrender: function(obj, e) {


        Ext.getCmp(prototype.id + '-regionCenterGrid01').show();
        Ext.getCmp(prototype.id + '-regionCenterGrid02').hide();
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
        var month = this.fecha.getMonth() + 1;
        if (month < 9) {
            obj.setValue('0' + month);
        } else {
            obj.setValue((month));
        }
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

        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");

        var cmbMANI = Ext.getCmp(prototype.id + '-cmbMANI');
        cmbMANI.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["e", "All"],
                ["2", "Received"],
                ["", "Stand By"]
            ]}));
        cmbMANI.setValue('e');

        var cmbSTVAL = Ext.getCmp(prototype.id + '-cmbSTVAL');
        cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["0", "Match"],
                ["1", "VCR"],
                ["2", "Flight Manifest"]
            ]}));
        cmbSTVAL.setValue('');
        cmbSTVAL.hide();

    }
    ,
    btnSearch_click: function(obj, e) {
        var regionCenterGrid02 = Ext.getCmp(prototype.id + '-regionCenterGrid02');

        if (regionCenterGrid02.isVisible()) {
            this.setGridDataDetail(obj, e);
        } else {
            this.setGridData(obj, e);

        }

    },
    selectCmbMANI: function(obj, e) {
        this.btnSearch_click();
    },
    selectCmbSTVAL: function(obj, e) {
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
        var IN_NFLIGHT = Ext.getCmp(prototype.id + '-txtFlight').getValue();
        var IN_FVAL = Ext.getCmp(prototype.id + '-cmbMANI').getValue();

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



        searchParams = {
            IN_FECHA_FROM: IN_FECHA_FROM,
            IN_FECHA_TO: IN_FECHA_TO,
            IN_NFLIGHT: IN_NFLIGHT,
            IN_FVAL: IN_FVAL
        };

//        console.log("IN_FECHA_FROM : " + IN_FECHA_FROM);
//        console.log("IN_FECHA_TO : " + IN_FECHA_TO);
//        console.log("IN_NFLIGHT : " + IN_NFLIGHT);
//        console.log("IN_FVAL : " + IN_FVAL);

    },
    setGridData: function(obj, val) {
        this.setFormatParameter();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.FlightManifestVCR.GridData', {
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
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataDetail: function(obj, val) {

        console.log("URL : " + prototype.url + '/searchDetail');
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.FlightManifestVCR.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {
                        IN_STVAL: Ext.getCmp(prototype.id + '-cmbSTVAL').getValue(),
                        DFLIGHT: me.paramsDetail.DFLIGHT,
                        NFLIGHT: me.paramsDetail.NFLIGHT
                    };
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage2').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount2').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total2').setText(total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    onSetGridDataDetail: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        Ext.getCmp(prototype.id + '-regionCenterGrid01').hide();
        Ext.getCmp(prototype.id + '-regionCenterGrid02').show();
        Ext.getCmp(prototype.id + '-cmbMANI').hide();
        Ext.getCmp(prototype.id + '-cmbSTVAL').show();


        var data = rowData.data;
        var IN_STVAL = '';
        if (columnNum === 0) {
            IN_STVAL = '';
        } else if (columnNum === 4) {
            IN_STVAL = '2';
        }
        me.paramsDetail = {
            IN_STVAL: IN_STVAL,
            DFLIGHT: data.DFLIGHT,
            NFLIGHT: data.NFLIGHT
        };



        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.FlightManifestVCR.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage2').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount2').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total2').setText(total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);


    }
    ,
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    btnBack_click: function(obj, e) {
        var regionCenterGrid01 = Ext.getCmp(prototype.id + '-regionCenterGrid01');
        var regionCenterGrid02 = Ext.getCmp(prototype.id + '-regionCenterGrid02');

        if (regionCenterGrid02.isVisible()) {
            regionCenterGrid01.show();
            regionCenterGrid02.hide();
        } else {
            global.showMenu();
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
        var txtFlight = Ext.getCmp(prototype.id + '-txtFlight');
        var cmbMANI = Ext.getCmp(prototype.id + '-cmbMANI');

        yearFrom.setValue(this.fecha.getFullYear());
        var storeComboDataYear = win.getStoreYear2(false, yearFrom.getValue());
        yearTo.bindStore(storeComboDataYear);
        yearTo.setValue(this.fecha.getFullYear());
        monthFrom.setValue('0' + (this.fecha.getMonth() + 1));
        monthTo.setValue('0' + (this.fecha.getMonth() + 1));
        dayFrom.setValue("");
        dayTo.setValue("");
        txtFlight.setValue("");
        cmbMANI.setValue("e");
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

        var regionCenterGrid02 = Ext.getCmp(prototype.id + '-regionCenterGrid02');

        if (regionCenterGrid02.isVisible()) {
            global.getFile(prototype.url + '/getDetailXLSX?IN_STVAL=' + Ext.getCmp(prototype.id + '-cmbSTVAL').getValue()
                    + '&DFLIGHT=' + me.paramsDetail.DFLIGHT
                    + '&IN_NFLIGHT=' + searchParams.IN_NFLIGHT
                    + '&NFLIGHT=' + me.paramsDetail.NFLIGHT);
        } else {
            this.setFormatParameter();
            global.getFile(prototype.url + '/getXLSX?IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM
                    + '&IN_FECHA_TO=' + searchParams.IN_FECHA_TO
                    + '&IN_NFLIGHT=' + searchParams.IN_NFLIGHT
                    + '&IN_FVAL=' + searchParams.IN_FVAL);
        }
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
    btnAdd_click: function(obj, e) {
        this.winDataEntry('I');
    },
    /**
     * Metodos usados para editar
     * */
    onEditClick: function(grid, rowIndex, colIndex) {


        var ruta = '';
        var apend = '';
        var rec = grid.getStore().getAt(rowIndex);
        var date = rec.get('DFLIGHT').substring(0, 6);
        var fileName = '' + rec.get('RFIC');

        if (fileName.trim() !== '') {
            var tdate = '201709';

            if (date >= tdate) {
                apend = rec.get('DFLIGHT').substring(0, 4) + '/' + global.getMonthAbrev(rec.get('DFLIGHT').substring(4, 6).toUpperCase()).toUpperCase() + '/' + fileName;
            } else {
                apend = rec.get('DFLIGHT').substring(0, 4) + '/' + 'MANIF-ENV-' + rec.get('DFLIGHT').substring(6, 8) + global.getMonthAbrev(rec.get('DFLIGHT').substring(4, 6).toUpperCase()) + '_LOAD' + '/' + fileName;
            }
            ruta = 'file://10.0.0.87/am/INSUMOS-FLOWN/FLIGHT-MANIFIEST/' + apend;

            global.getFile(prototype.url + '/dowload?ruta=' + ruta
                    + '&fileName=' + rec.get('RFIC').trim());
        } else {
            global.Msg({
                msg: 'File not found.'
            });
        }

    },
    winDataEntry: function(action, rec, all, rowIndex) {


        var dataEntry = Ext.create('Ext.Praxis.view.flown.FlightManifestVCRForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
//                        action: action,
//                        beanConsTkt: beanConsTkt,
//                        msjVal: msjVal,
//                        all: all,
//                        rowIndex: rowIndex
            }
        });
        dataEntry.setId(prototype.id + "-dataEntry");
        dataEntry.show();
//        action = action === null || action === undefined ? 'U' : action;
//        rec = rec === null || rec === undefined ? {} : rec;
//        all = all === null || all === undefined ? {} : all;
//
//        var strTicket = rec.data.strTicket.replace(" ", '').replace(" ", '');
//
//        Ext.Ajax.request({
//            url: prototype.url + '/searchBeanTkt',
//            method: 'POST',
//            timeout: 60000000,
//            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
//            params: {
//                strTicket: strTicket
//            },
//            success: function(response, options) {
//                var res = Ext.JSON.decode(response.responseText);
//                var beanConsTkt = res.beanConsTkt;
//                var msjVal = res.msjVal;
//
//                console.log(beanConsTkt);
//                console.log(msjVal);
//
//                var dataEntry = Ext.create('Ext.Praxis.view.flown.FlightManifestVCRForm.DataEntry', {
//                    id: prototype.id + '-dataEntry',
//                    params: {
//                        action: action,
//                        beanConsTkt: beanConsTkt,
//                        msjVal: msjVal,
//                        all: all,
//                        rowIndex: rowIndex
//                    }
//                });
//                dataEntry.setId(prototype.id + "-dataEntry");
//                dataEntry.show();
//                Ext.getCmp(prototype.id + '-gridData').unmask();
//            }
//        });



    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        if (Ext.getCmp(prototype.id + '-regionCenterGrid02').isVisible()) {
            pag = Ext.getCmp(prototype.id + '-paggin2');
        }


        pag.moveFirst();
    },
    pagPrevious: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        if (Ext.getCmp(prototype.id + '-regionCenterGrid02').isVisible()) {
            pag = Ext.getCmp(prototype.id + '-paggin2');
        }

        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        if (Ext.getCmp(prototype.id + '-regionCenterGrid02').isVisible()) {
            pag = Ext.getCmp(prototype.id + '-paggin2');
        }

        pag.moveNext();

    },
    pagLast: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        if (Ext.getCmp(prototype.id + '-regionCenterGrid02').isVisible()) {
            pag = Ext.getCmp(prototype.id + '-paggin2');
        }
        pag.moveLast();
    }
});
