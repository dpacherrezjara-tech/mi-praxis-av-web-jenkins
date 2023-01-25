/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.PaymentNotificationReport.PaymentNotificationReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PaymentNotificationReportController',
    fecha: new Date(),
    paginTem: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    strTipo: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'PaymentNotificationReportForm';
        prototype.url = CONTEXTPATH + '/PaymentNotificationReport';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#PaymentNotificationReportForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#PaymentNotificationReportForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#PaymentNotificationReportForm-btnClear': {
                click: this.btnClear_click
            },
            '#PaymentNotificationReportForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#PaymentNotificationReportForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#PaymentNotificationReportForm-btnBack': {
                click: this.btnBack_click
            },
            '#PaymentNotificationReportForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#PaymentNotificationReportForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#PaymentNotificationReportForm-btn-pag-next': {
                click: this.pagNext
            },
            '#PaymentNotificationReportForm-btn-pag-last': {
                click: this.pagLast
            }
            //-----------------Eventos Especificos -------------------            
            

        });
    },
    xpanel_afterrender: function(obj, e) {

        this.setStoreData();
        this.btnSearch_click();
    },
    eventKey: function(e, eOpts) {

        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }
    ,
    setStoreData: function() {
        var cboStatus = Ext.getCmp(prototype.id + '-cboStatus');
        cboStatus.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["P", "Paid"],
                ["N", "Non paid"]
            ]
        }));
        cboStatus.setValue("");
    },
    onChangeSearch: function(obj, value) {

        switch (value) {
            case '1':
                Ext.getCmp(prototype.id + '-txtA1874CODEA').show();
                Ext.getCmp(prototype.id + '-txtA1874IATA').hide();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-txtA1874CODEA').hide();
                Ext.getCmp(prototype.id + '-txtA1874IATA').show();
                break;
            default:
                Ext.getCmp(prototype.id + '-txtA1874CODEA').hide();
                Ext.getCmp(prototype.id + '-txtA1874IATA').hide();
                break;
        }
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);

    },
    setFormatParameter: function() {

        var IN_IATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        var IN_REFER = Ext.getCmp(prototype.id + '-txtRefCode').getValue();
        var IN_LOTE = Ext.getCmp(prototype.id + '-txtBatchID').getValue();
        var IN_FPAG = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtPDate').getValue(), 'Ymd');

        searchParams = {
            IN_IATA: IN_IATA,
            IN_REFER: IN_REFER,
            IN_LOTE: IN_LOTE,
            IN_FPAG: IN_FPAG
        };

    },
    setGridData: function(obj, val) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.PaymentNotificationReport.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    console.log(pagData);
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
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);

    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.sales.PaymentNotificationReportForm.DataEntry', {
            id: prototype.id + '-DataEntryPaymentNotificationReportForm',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    btnBack_click: function(obj, e) {
        global.showMenu();
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtIATA').setValue("");
        Ext.getCmp(prototype.id + '-txtRefCode').setValue("");
        Ext.getCmp(prototype.id + '-txtBatchID').setValue("");
        Ext.getCmp(prototype.id + '-txtPDate').setValue("");

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
        global.getFile(prototype.url + '/getXLSX?IN_IATA=' + searchParams.IN_IATA
                + '&IN_REFER=' + searchParams.IN_REFER
                + '&IN_FPAG=' + searchParams.IN_FPAG
                + '&IN_LOTE=' + searchParams.IN_LOTE);


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
