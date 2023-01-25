/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.discharges.ObservedCoupons.ObservedCouponsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ObservedCouponsController',
    fecha: new Date(),
    paginActual: '',
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'ObservedCouponsForm';
        prototype.url = CONTEXTPATH + '/ObservedCoupons';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ObservedCouponsForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ObservedCouponsForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ObservedCouponsForm-btnClear': {
                click: this.btnClear_click
            },
            '#ObservedCouponsForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ObservedCouponsForm-btnBack': {
                click: this.btnBack_click
            },
            '#ObservedCouponsForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ObservedCouponsForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ObservedCouponsForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ObservedCouponsForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ObservedCouponsForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            

            '#ObservedCouponsForm-cmbDate': {
                change: this.changeCmbDate
            },
            '#ObservedCouponsForm-txtTicket': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
//      this.btnSearch_click();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function() {
        var cmbDate = Ext.getCmp(prototype.id + '-cmbDate');
        cmbDate.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                //["1", "Accounting Date"],
                ["2", "Issue Date"],
                ["3", "Ticket"]
            ]
        }));
        cmbDate.setValue("");
    },
    changeCmbDate: function(obj, value) {
        this.clearFields();
        this.hideComponents();
        switch (value) {
            case '1':
            case '2':
                Ext.getCmp(prototype.id + '-txtFDesde').show();
                Ext.getCmp(prototype.id + '-txtFHasta').show();
                break;
            case '3':
                Ext.getCmp(prototype.id + '-txtTicket').show();
                break;
        }
    },
    hideComponents: function() {
        Ext.getCmp(prototype.id + '-txtFDesde').hide();
        Ext.getCmp(prototype.id + '-txtFHasta').hide();
        Ext.getCmp(prototype.id + '-txtTicket').hide();
    },
    btnSearch_click: function(obj, e) {
        //this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {
        var IN_OPCION = Ext.getCmp(prototype.id + '-cmbDate').getValue();
        var IN_FECHAFROM = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFDesde').getValue(), 'Ymd');
        var IN_FECHATO = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFHasta').getValue(), 'Ymd');
        var IN_TKT = Ext.getCmp(prototype.id + '-txtTicket').getValue();
        
        searchParams = {
            IN_OPCION: IN_OPCION,
            IN_FECHAFROM: IN_FECHAFROM,
            IN_FECHATO: IN_FECHATO,
            IN_TKT: IN_TKT
        };
        //console.log(searchParams);
    },
    setGridData: function(obj, val) {
        win.lblUser_toolTip("Estructura: A3963");
        this.setFormatParameter();

        var storeGridDatas = Ext.create('Ext.Praxis.store.discharges.GridData', {
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
    btnBack_click: function(obj, e) {
        global.showMenu();
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbDate').setValue('');
        this.clearFields();
    },
    clearFields: function() {
        Ext.getCmp(prototype.id + '-txtFDesde').setValue('');
        Ext.getCmp(prototype.id + '-txtFHasta').setValue('');
        Ext.getCmp(prototype.id + '-txtTicket').setValue('');
    },
    btnExcel_click: function(obj, e) {
        //this.setFormatParameter();
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
        global.getFile(prototype.url + '/getXLSX?IN_OPCION=' + searchParams.IN_OPCION
                + '&IN_FECHAFROM=' + searchParams.IN_FECHAFROM
                + '&IN_FECHATO=' + searchParams.IN_FECHATO
                + '&IN_TKT=' + searchParams.IN_TKT
                );
    },
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