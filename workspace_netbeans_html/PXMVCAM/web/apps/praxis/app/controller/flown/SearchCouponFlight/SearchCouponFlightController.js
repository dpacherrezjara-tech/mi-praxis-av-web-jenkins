/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.SearchCouponFlight.SearchCouponFlightController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SearchCouponFlightController',
    fecha: new Date(),
    dateFrom: '',
    dateTo: '',
    me: '',
    searchParams: {},
    setContext: function() {
        me = this;
    },
    init: function(view) {
        prototype.id = 'SearchCouponFlightForm';
        prototype.url = CONTEXTPATH + '/SearchCouponFlight';

        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#SearchCouponFlightForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#SearchCouponFlightForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#SearchCouponFlightForm-btnClear': {
                click: this.btnClear_click
            },
            '#SearchCouponFlightForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#SearchCouponFlightForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#SearchCouponFlightForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#SearchCouponFlightForm-btnBack': {
                click: this.btnBack_click
            },
            '#SearchCouponFlightForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#SearchCouponFlightForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#SearchCouponFlightForm-btn-pag-next': {
                click: this.pagNext
            },
            '#SearchCouponFlightForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#SearchCouponFlightForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#SearchCouponFlightForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            }
            ,
            '#SearchCouponFlightForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#SearchCouponFlightForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#SearchCouponFlightForm-txtCARR': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#SearchCouponFlightForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
            '#SearchCouponFlightForm-cbxStval': {
                select: this.selectCbxStval
            },
            '#SearchCouponFlightForm-txtTKT': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        Ext.getCmp(prototype.id + '-panelDateFilters').hide();
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
        obj.setValue('');
        //obj.setValue('0' + (this.fecha.getMonth() + 1));
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

        var cbxStval = Ext.getCmp(prototype.id + '-cbxStval');
        cbxStval.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["1", "Pending/Without Sale"],
                ["2", "Valued"],
                ["3", "Closed"]
            ]
        }));
        cbxStval.setValue('');
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
        var cbxStval = Ext.getCmp(prototype.id + '-cbxStval');
        var txtCARR = Ext.getCmp(prototype.id + '-txtCARR');
        var txtTKT = Ext.getCmp(prototype.id + '-txtTKT');

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
        var IN_TKT = txtTKT.getValue();
        var IN_STVAL = cbxStval.getValue();
        var IN_CARR = txtCARR.getValue();



        searchParams = {
            IN_TKT: IN_TKT,
            IN_STVAL: IN_STVAL,
            IN_CARR: IN_CARR,
            IN_FECHA_FROM: IN_FECHA_FROM,
            IN_FECHA_TO: IN_FECHA_TO
        };

        console.log("IN_TKT : " + IN_TKT);
        console.log("IN_STVAL : " + IN_STVAL);
        console.log("IN_CARR : " + IN_CARR);
        console.log("IN_FECHA_FROM : " + IN_FECHA_FROM);
        console.log("IN_FECHA_TO : " + IN_FECHA_TO);
    },
    setGridData: function(obj, val) {
        this.setFormatParameter();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.MultilegTable.GridData', {
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
    showTicket: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        console.log('RowData');
        console.log(rowData.data);
        me.viewMasterTkt(rowData.data);
    },
    viewMasterTkt: function(data) {

        prototypeProgram.view = 'flown-search-coupon-flight-form';
        prototypeProgram.nprog = 'PX00000095';
        prototypeProgram.title = 'Search Coupon flight';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = data.CCIA;
        beanProMasterTicket.IN_FORMA = data.FORMA;
        beanProMasterTicket.IN_SERIE = data.SERIE;
        beanProMasterTicket.IN_SEQ = data.SEQRO;

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
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
        var txtCARR = Ext.getCmp(prototype.id + '-txtCARR');
        var cbxStval = Ext.getCmp(prototype.id + '-cbxStval');
        var txtTKT = Ext.getCmp(prototype.id + '-txtTKT');

        yearFrom.setValue(this.fecha.getFullYear());
        var storeComboDataYear = win.getStoreYear2(false, yearFrom.getValue());
        yearTo.bindStore(storeComboDataYear);
        yearTo.setValue(this.fecha.getFullYear());
        monthFrom.setValue('0' + (this.fecha.getMonth() + 1));
        monthTo.setValue('0' + (this.fecha.getMonth() + 1));
        dayFrom.setValue("");
        dayTo.setValue("");
        txtCARR.setValue("");
        cbxStval.setValue("");
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
        global.getFile(prototype.url + '/getXLSX?IN_TKT=' + searchParams.IN_TKT
                + '&IN_STVAL=' + searchParams.IN_STVAL
                + '&IN_CARR=' + searchParams.IN_CARR
                + '&IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM
                + '&IN_FECHA_TO=' + searchParams.IN_FECHA_TO);
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

        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.flown.MultilegTableForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec
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
        global.showMenu();
    }
});
