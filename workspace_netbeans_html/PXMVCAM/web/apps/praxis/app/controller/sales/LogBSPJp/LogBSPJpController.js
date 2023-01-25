/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.LogBSPJp.LogBSPJpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LogBSPJpController',
    fecha: new Date(),
    paginActual: '',
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'LogBSPJpForm';
        prototype.url = CONTEXTPATH + '/LogBSPJp';
        me = this;
        this.control({            
            '#LogBSPJpForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#LogBSPJpForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#LogBSPJpForm-btnClear': {
                click: this.btnClear_click
            },
            '#LogBSPJpForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#LogBSPJpForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#LogBSPJpForm-btnBack': {
                click: this.btnBack_click
            },
            '#LogBSPJpForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#LogBSPJpForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#LogBSPJpForm-btn-pag-next': {
                click: this.pagNext
            },
            '#LogBSPJpForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#LogBSPJpForm-txtCountry': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#LogBSPJpForm-txtCurrency': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        //this.btnSearch_click();
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
                ["1", "Processing Date"]
            ]
        }));
        cmbDate.setValue("1");
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {
        var IN_FECHAFROM = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFDesde').getValue(), 'Ymd');
        var IN_FECHATO = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFHasta').getValue(), 'Ymd');
        var IN_PAIS = Ext.getCmp(prototype.id + '-txtCountry').getValue();
        var IN_MONEDA = Ext.getCmp(prototype.id + '-txtCurrency').getValue();


        searchParams = {
            IN_FECHAFROM: IN_FECHAFROM,
            IN_FECHATO: IN_FECHATO,
            IN_PAIS: IN_PAIS,
            IN_MONEDA: IN_MONEDA
        };
        console.log(searchParams);
    },
    setGridData: function(obj, val) {
        win.lblUser_toolTip("Estructura: A1845");
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
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
                        Ext.getCmp(prototype.id + '-txtFare').setValue('');
                        Ext.getCmp(prototype.id + '-txtComm').setValue('');
                        Ext.getCmp(prototype.id + '-txtFareAdj').setValue('');
                        Ext.getCmp(prototype.id + '-txtCommAdj').setValue('');
                    } else {
                        var data = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-txtFare').setValue(Ext.util.Format.number(data.SUMFARE, '0,000.00'));
                        Ext.getCmp(prototype.id + '-txtComm').setValue(Ext.util.Format.number(data.SUMCOMM, '0,000.00'));
                        Ext.getCmp(prototype.id + '-txtFareAdj').setValue(Ext.util.Format.number(data.SUMFAREADJ, '0,000.00'));
                        Ext.getCmp(prototype.id + '-txtCommAdj').setValue(Ext.util.Format.number(data.SUMCOMMADJ, '0,000.00'));
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
        Ext.getCmp(prototype.id + '-txtFDesde').setValue('');
        Ext.getCmp(prototype.id + '-txtFHasta').setValue('');
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
        this.setFormatParameter();

        global.getFile(prototype.url + '/getXLSX?IN_FECHAFROM=' + searchParams.IN_FECHAFROM
                + '&IN_FECHATO=' + searchParams.IN_FECHATO
                + '&IN_PAIS=' + searchParams.IN_PAIS
                + '&IN_MONEDA=' + searchParams.IN_MONEDA
                );
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
