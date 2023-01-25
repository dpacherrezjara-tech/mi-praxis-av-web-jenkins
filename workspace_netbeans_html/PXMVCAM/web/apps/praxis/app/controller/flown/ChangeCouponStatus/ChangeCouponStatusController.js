/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.ChangeCouponStatus.ChangeCouponStatusController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChangeCouponStatusController',
    fecha: new Date(),
    dateFrom: '',
    dateTo: '',
    searchParams: {},
    me: '',
    setContext: function () {
        me = this;
    },
    init: function(view) {
        prototype.id = 'ChangeCouponStatusForm';
        prototype.url = CONTEXTPATH + '/ChangeCouponStatus';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ChangeCouponStatusForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ChangeCouponStatusForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ChangeCouponStatusForm-btnClear': {
                click: this.btnClear_click
            },
            '#ChangeCouponStatusForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ChangeCouponStatusForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ChangeCouponStatusForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ChangeCouponStatusForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ChangeCouponStatusForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ChangeCouponStatusForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#ChangeCouponStatusForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear
            },
            '#ChangeCouponStatusForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth
            },
            '#ChangeCouponStatusForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
            '#ChangeCouponStatusForm-txtFlight': {
                keyup: this.eventKey,
                focusleave: this.onFocusLeave
            },
            '#ChangeCouponStatusForm-chkLog': {
                change: this.checkEvent
            }

        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();

    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onFocusLeave: function(obj) {
        var flightNum = Ext.getCmp(prototype.id + '-txtFlight');
        if (flightNum.getValue().length >= 1) {
            while (flightNum.getValue().length < 4) {
                flightNum.setValue('0' + flightNum.getValue());
            }
        }
    },
    checkEvent: function(obj, e) {
        this.btnSearch_click();
    },
    // ---------- Eventos de consistencia de los combos---------------
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function(obj) {
        obj.setValue('0' + (this.fecha.getMonth() + 1));
    },
    selectComboFromDay: function(obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-filter-cmbSTVAL').bindStore(Ext.create('Ext.data.ArrayStore',
                {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["", "All"],
                        ["1", "Pending/Without Sale"],
                        ["2", "Valued"],
                        ["4", "Posted"]
                    ]
                }));
        Ext.getCmp(prototype.id + '-filter-cmbSTVAL').setValue('');
        Ext.Ajax.request({
            url: prototype.url + '/loadData',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...', ''),
            params: {},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var ciudades = res.dataCiudades;
                var storeCiudades = Ext.create('Ext.data.Store', {
                    data: ciudades,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCDEPART').bindStore(storeCiudades);
                Ext.getCmp(prototype.id + '-cmbCARRIVA').bindStore(storeCiudades);
                Ext.getCmp(prototype.id + '-gridData').unmask();
                //me.btnSearch_click();
            }
        });
    }
    ,
    btnSearch_click: function(obj, e) {
        var txtFlight = Ext.getCmp(prototype.id + '-txtFlight');
        while (txtFlight.getValue().length < 4) {
            txtFlight.setValue('0' + txtFlight.getValue());
        }
        this.setGridData(obj, e);
    },
    selectCbxStval: function(obj, e) {
        this.btnSearch_click();
    }
    ,
    setFormatParameter: function() {

        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var CDEPART = Ext.getCmp(prototype.id + '-cmbCDEPART').getValue();
        var CARRIVA = Ext.getCmp(prototype.id + '-cmbCARRIVA').getValue();
        var NFLIGHT = Ext.getCmp(prototype.id + '-txtFlight').getValue();
        var strTicket = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        var STVAL = Ext.getCmp(prototype.id + '-filter-cmbSTVAL').getValue();
        if (dayFrom.getValue() === null || dayFrom.getValue() === '') {
            dayFrom.setValue('');
            dayTo.setValue('');
        } else {
            if (dayTo.getValue() === null || dayTo.getValue() === '') {
                dayTo.setValue(31);
            }
        }

        if (CDEPART === null) {
            CDEPART = '';
        }
        if (CARRIVA === null) {
            CARRIVA = '';
        }


        searchParams = {
            yearFrom: yearFrom.getValue(),
            monthFrom: monthFrom.getValue(),
            dayFrom: dayFrom.getValue(),
            yearTo: yearTo.getValue(),
            monthTo: monthTo.getValue(),
            dayTo: dayTo.getValue(),
            CDEPART: CDEPART,
            CARRIVA: CARRIVA,
            NFLIGHT: NFLIGHT,
            strTicket: strTicket,
            STVAL: STVAL
        };
        console.log("yearFrom : " + yearFrom.getValue());
        console.log("monthFrom : " + monthFrom.getValue());
        console.log("dayFrom : " + dayFrom.getValue());
        console.log("yearTo : " + yearTo.getValue());
        console.log("monthTo : " + monthTo.getValue());
        console.log("dayTo : " + dayTo.getValue());
        console.log("CDEPART : " + CDEPART);
        console.log("CARRIVA : " + CARRIVA);
        console.log("NFLIGHT : " + NFLIGHT);
        console.log("strTicket : " + strTicket);
        console.log("STVAL : " + STVAL);
        console.log("Log : " + Ext.getCmp(prototype.id + '-chkLog').getValue());
    },
    setGridData: function(obj, val) {
        this.setFormatParameter();

        var txtFlight = Ext.getCmp(prototype.id + '-txtFlight').getValue();
        var txtTKT = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        var check = Ext.getCmp(prototype.id + '-chkLog').getValue();

        if (check) {
            console.log("LLamar a searchLogReport");
            Ext.getCmp(prototype.id + '-gridDataLog').show();
            Ext.getCmp(prototype.id + '-gridData').hide();

            var storeGridDatas = Ext.create('Ext.Praxis.store.flown.ChangeCouponStatus.GridData', {
                proxy: {
                    url: prototype.url + '/searchLogReport'
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
            Ext.getCmp(prototype.id + '-gridDataLog').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);



        } else {
            Ext.getCmp(prototype.id + '-gridDataLog').hide();
            Ext.getCmp(prototype.id + '-gridData').show();
            if (txtFlight.trim() === '' && txtTKT.trim() === '') {
                global.Msg({
                    msg: 'Enter Flight Number.'
                });
            } else {

                var storeGridDatas = Ext.create('Ext.Praxis.store.flown.ChangeCouponStatus.GridData', {
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
            }
        }




//        console.log("URL : " + prototype.url + '/search');
//    
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    }
    ,
    btnClear_click: function(obj, e) {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var cmbCDEPART = Ext.getCmp(prototype.id + '-cmbCDEPART');
        var cmbCARRIVA = Ext.getCmp(prototype.id + '-cmbCARRIVA');
        var txtFlight = Ext.getCmp(prototype.id + '-txtFlight');
        var txtTKT = Ext.getCmp(prototype.id + '-txtTKT');
        var cmbSTVAL = Ext.getCmp(prototype.id + '-filter-cmbSTVAL');
        Ext.getCmp(prototype.id + '-chkLog').setValue(false);

        yearFrom.setValue(this.fecha.getFullYear());
        monthFrom.setValue('0' + (this.fecha.getMonth() + 1));
        dayFrom.setValue("");
        dayTo.setValue("");
        cmbCDEPART.setValue("");
        cmbCARRIVA.setValue("");
        cmbSTVAL.setValue("");
        txtFlight.setValue("");
        txtTKT.setValue("");
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
        var check = Ext.getCmp(prototype.id + '-chkLog').getValue();

        if (!check) {
            global.getFile(prototype.url + '/getXLSX?yearFrom=' + searchParams.yearFrom
                    + '&monthFrom=' + searchParams.monthFrom
                    + '&dayFrom=' + searchParams.dayFrom
                    + '&yearTo=' + searchParams.yearTo
                    + '&monthTo=' + searchParams.monthTo
                    + '&dayTo=' + searchParams.dayTo
                    + '&CDEPART=' + searchParams.CDEPART
                    + '&CARRIVA=' + searchParams.CARRIVA
                    + '&strTicket=' + searchParams.strTicket
                    + '&STVAL=' + searchParams.STVAL
                    + '&NFLIGHT=' + searchParams.NFLIGHT);
        } else {

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
                console.log(beanConsTkt);
                var dataEntry = Ext.create('Ext.Praxis.view.flown.ChangeCouponStatusForm.DataEntry', {
                    id: prototype.id + '-dataEntry',
                    params: {
                        action: action,
                        beanConsTkt: beanConsTkt,
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
