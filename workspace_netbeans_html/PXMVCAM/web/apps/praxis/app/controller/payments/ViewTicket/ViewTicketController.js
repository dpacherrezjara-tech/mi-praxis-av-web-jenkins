/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.ViewTicket.ViewTicketController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ViewTicketController',
    fecha: new Date(),
    paginTem: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    strTipo: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function (view) {
        prototype.id = 'ViewTicketForm';
        prototype.url = CONTEXTPATH + '/ViewTicket';
        me = this;
        me.gridActual = '-gridData';
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ViewTicketForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ViewTicketForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ViewTicketForm-btnClear': {
                click: this.btnClear_click
            },
            '#ViewTicketForm-btnExcel': {
                //click: this.btnExcel_click
                click: this.exportExcel
            },
            '#ViewTicketForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ViewTicketForm-btnBack': {
                click: this.btnBack_click
            },
            //-----------------Eventos Especificos -------------------            
            '#ViewTicketForm-cmbDate': {
                change: this.onChangeSearch
            },
            '#ViewTicketForm-cmbTransaction': {
                change: this.onChangeTransaction
            },
            '#ViewTicketForm-cmbSource': {
                change: this.onChangeSource
            }
        });
    },
    xpanel_afterrender: function (obj, e) {
        this.setStoreData();
    },
    setStoreData: function () {
        var cmbDate = Ext.getCmp(prototype.id + '-cmbDate');
        cmbDate.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["1", "Ticket"],
            ]
        }));
        cmbDate.setValue("1");
    },
    onChangeSearch: function (obj, value) {
        me.searchParams = {};
    },
    btnSearch_click: function (obj, e) {
        this.setFormatParameter();

        this.setGridData(obj, e);

//        var msj = this.validParams();
//        if (msj === '') {
//            this.setGridData(obj, e);
//        } else {
//            global.Msg({
//                msg: msj
//            });
//        }
    },
    validParams: function () {
        var msj = '';
        var params = searchParams;

        return msj;
    },
    setFormatParameter: function () {
        var TICKET = Ext.getCmp(prototype.id + '-txtCia').getValue().trim() + Ext.getCmp(prototype.id + '-txtTicket').getValue().trim();
        searchParams = {
            TICKET: TICKET,
        };
    },
    setGridData: function (obj, val) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-regionCenterGrid01').mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-regionCenterGrid01').unmask();  
                    if (obj.data.length == 1) {
                        var bean = obj.data.items[0].data;
                        //Ext.getCmp(prototype.id + '-txtTICKET').setValue(Ext.util.Format.number(bean.TICKET, '0,000'));
                        Ext.getCmp(prototype.id + '-txtTICKET').setValue(bean.TICKET);
                        Ext.getCmp(prototype.id + '-txtSAGENT').setValue(bean.SAGENT);
                        Ext.getCmp(prototype.id + '-txtMERCHNC').setValue(bean.MERCHNC);
                        Ext.getCmp(prototype.id + '-txtSDATE').setValue(bean.SDATE);
                        Ext.getCmp(prototype.id + '-txtSCOUNTRY').setValue(bean.SCOUNTRY);
                        Ext.getCmp(prototype.id + '-txtSPNR').setValue(bean.SPNR);
                        Ext.getCmp(prototype.id + '-txtTDOC').setValue(bean.TDOC);
                        Ext.getCmp(prototype.id + '-txtSCARCOD').setValue(bean.SCARCOD);
                        Ext.getCmp(prototype.id + '-txtSCARDN').setValue(bean.SCARDN);
                        Ext.getCmp(prototype.id + '-txtSAUTHOC').setValue(bean.SAUTHOC);
                        Ext.getCmp(prototype.id + '-txtSDATEXP').setValue(bean.SDATEXP);
                        Ext.getCmp(prototype.id + '-txtINSTPAY').setValue(bean.INSTPAY);
                        Ext.getCmp(prototype.id + '-txtINSTPLA').setValue(bean.INSTPLA);
                        Ext.getCmp(prototype.id + '-txtSCURRENCY').setValue(bean.SCURRENCY);
                        
                        Ext.getCmp(prototype.id + '-txtSVFOP').setValue(Ext.util.Format.number(bean.SVFOP, '0,000.00'));
                        Ext.getCmp(prototype.id + '-txtAFARE').setValue(Ext.util.Format.number(bean.AFARE, '0,000.00'));
                        Ext.getCmp(prototype.id + '-txtATAX').setValue(Ext.util.Format.number(bean.ATAX, '0,000.00'));
                        Ext.getCmp(prototype.id + '-txtAIVA').setValue(Ext.util.Format.number(bean.AIVA, '0,000.00'));
                        Ext.getCmp(prototype.id + '-txtTOTAL').setValue(Ext.util.Format.number(bean.TOTAL, '0,000.00'));
                        
                        Ext.getCmp(prototype.id + '-txtSTVAL').setValue(bean.STVAL);
                        Ext.getCmp(prototype.id + '-txtDATEC').setValue(bean.DATEC);
                        
                        Ext.getCmp(prototype.id + '-txtUSCR').setValue(bean.USCR);
                        Ext.getCmp(prototype.id + '-txtFECR').setValue(bean.FECR);
                        Ext.getCmp(prototype.id + '-txtHOCR').setValue(bean.HOCR);
                        Ext.getCmp(prototype.id + '-txtPGMCR').setValue(bean.PGMCR);
                        Ext.getCmp(prototype.id + '-txtUSUP').setValue(bean.USUP);
                        Ext.getCmp(prototype.id + '-txtFEUP').setValue(bean.FEUP);
                        Ext.getCmp(prototype.id + '-txtHOUP').setValue(bean.HOUP);
                        Ext.getCmp(prototype.id + '-txtPGMUP').setValue(bean.PGMUP);
                    } else {
                        if (obj.data.length <= 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else if (obj.data.length > 1) {
                            global.Msg({
                                msg: 'Too many Tickets.'
                            });
                        } else {
                            global.Msg({
                                msg: 'Error'
                            });
                        }

                    }
                }
            }
        });
        global.clear();

        this.clearField();
    },
    setData: function (bean) {

    },
    onEditClick: function (obj, metaData, rowNum, column, obj2, rowData) {

    },
    btnBack_click: function (obj, e) {
        global.showMenu();
    },
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cmbDate').setValue("1");
        Ext.getCmp(prototype.id + '-txtCia').setValue('');
        Ext.getCmp(prototype.id + '-txtTicket').setValue('');
    },
    clearField: function () {

    },
    btnExcel_click: function (obj, e) {

    },
    exportExcel: function () {

    },
    exportExcel2: function (_path) {

    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    }
});