/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.Consortia.DataEntryConsortiaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        console.log("init");
        prototype.id = 'ConsortiaForm';
        prototype.url = CONTEXTPATH + '/Consortia';
        this.control({
            // -------------------Eventos Genericos --------------------            
            '#ConsortiaForm-de-btnSearch': {
                click: this.btnSearch_click
            },
            '#ConsortiaForm-de-btnClear': {
                click: this.btnClear_click
            },
            '#ConsortiaForm-de-btnExcel': {
                click: this.btnExcel_click
            },
            '#ConsortiaForm-de-btnFilter': {
                click: this.btnFilter_click
            },
            '#ConsortiaForm-de-btnBack': {
                click: this.btnBack_click
            },
            '#ConsortiaForm-de-btn-pag-first': {
                click: this.pagFirst
            },
            '#ConsortiaForm-de-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ConsortiaForm-de-btn-pag-next': {
                click: this.pagNext
            },
            '#ConsortiaForm-de-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#ConsortiaForm-de-cmbOptionTKT': {
                change: this.onChangeSearch
            },
            '#ConsortiaForm-de-BtnSendMailFOB': {
                click: this.onBtnSendMailFOB
            },
            '#ConsortiaForm-de-BtnAcuseFOB': {
                click: this.onBtnAcuseFOB
            }
        });
    },
    afterRender: function(obj, e) {
        console.log("Init");
        this.hideComponent();
        this.setStoreData();
        this.initComponents();
        this.btnSearch_click();
    },
    eventKey: function(e, eOpts) {

        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    hideComponent: function() {
        Ext.getCmp(prototype.id + '-de' + '-labelSearch').hide();
        Ext.getCmp(prototype.id + '-de' + '-cmbOptionTKT').hide();
        Ext.getCmp(prototype.id + '-de' + '-txtTKTNumber').hide();
    },
    initComponents: function() {
        var p = this.view.params;
        var data = p.rec;

        Ext.getCmp(prototype.id + '-de' + '-txtIata').setValue(data.A2444IATA.trim());
        Ext.getCmp(prototype.id + '-de' + '-txtNameIATA').setValue(data.A003KEY3.trim());
        Ext.getCmp(prototype.id + '-de' + '-txtLote').setValue(data.A2444LOTE.trim());
        Ext.getCmp(prototype.id + '-de' + '-txtSource').setValue(data.A2444FUENT.trim());
        Ext.getCmp(prototype.id + '-de' + '-txtPreFac').setValue(data.A2444FENV.trim());
        Ext.getCmp(prototype.id + '-de' + '-txtPreFactura').setValue(data.A2444STAT.trim());
        Ext.getCmp(prototype.id + '-de' + '-txtFacRec').setValue(data.A2444FREC.trim());
        Ext.getCmp(prototype.id + '-de' + '-txtFacturaRecibida').setValue(data.A2444STRC.trim());
        Ext.getCmp(prototype.id + '-de' + '-txtCommission').setValue(Ext.util.Format.number(data.A2444TCOM, '0,000.00'));
        Ext.getCmp(prototype.id + '-de' + '-txtIVA').setValue(Ext.util.Format.number(data.A2444TIVA, '0,000.00'));
        Ext.getCmp(prototype.id + '-de' + '-txtCommIVA').setValue(Ext.util.Format.number(data.A2444TCOMI, '0,000.00'));
        Ext.getCmp(prototype.id + '-de' + '-txtCash').setValue(Ext.util.Format.number(data.A2444TTCAS, '0,000.00'));
        Ext.getCmp(prototype.id + '-de' + '-txtCashComm').setValue(Ext.util.Format.number(data.A2444TCAMC, '0,000.00'));
        Ext.getCmp(prototype.id + '-de' + '-txtFare').setValue(Ext.util.Format.number(data.A2444FARE, '0,000.00'));
        if (data.ACUSE === 'N') {
            Ext.getCmp(prototype.id + '-de' + '-BtnSendMailFOB').setDisabled(false);
        } else {
            Ext.getCmp(prototype.id + '-de' + '-BtnSendMailFOB').setDisabled(true);
        }
        if (data.A2444FACUS.trim() === "" && data.A2444STAT.trim !== 'PENDING') {
            Ext.getCmp(prototype.id + '-de' + '-BtnAcuseFOB').setDisabled(false);
        } else {
            Ext.getCmp(prototype.id + '-de' + '-BtnSendMailFOB').setDisabled(true);
        }
    },
    setStoreData: function() {
        var cmbDate = Ext.getCmp(prototype.id + '-de' + '-cmbOptionTKT');
        cmbDate.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Select"],
                ["2", "Ticket"]
            ]
        }));
        cmbDate.setValue("1");
    },
    onChangeSearch: function(obj, value) {
        switch (value) {
            case '1':
                Ext.getCmp(prototype.id + '-de' + '-txtTKTNumber').hide();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-de' + '-txtTKTNumber').show();
                break;
        }
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        console.log(searchParams);
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {
        var IN_OPCION = '2'; //podria cambiar
        var IN_A2445CCUST = '139';
        var IN_A2445IATA = Ext.getCmp(prototype.id + '-de' + '-txtIata').getValue();
        var IN_A2445LOTE = Ext.getCmp(prototype.id + '-de' + '-txtLote').getValue();
        var IN_TKT = Ext.getCmp(prototype.id + '-de' + '-txtTKTNumber').getValue();

        searchParams = {
            IN_OPCION: IN_OPCION,
            IN_A2445CCUST: IN_A2445CCUST,
            IN_A2445IATA: IN_A2445IATA,
            IN_A2445LOTE: IN_A2445LOTE,
            IN_TKT: IN_TKT
        };

    },
    setGridData: function(obj, val) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.Consortia.GridData', {
            proxy: {
                url: prototype.url + '/loadTicket'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-de' + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-de' + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-de' + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-de' + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-de' + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-de' + '-paggin').bindStore(storeGridDatas);
    },
    onViewDetailClick: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        var data = rowData.data;
        var dataEntry = Ext.create('Ext.Praxis.view.sales.ConsortiaForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                rec: data
            }
        });
        dataEntry.setId(prototype.id + "-dataEntry");
        dataEntry.show();

    },
    btnBack_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-dataEntry').close();
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-de' + '-txtTKTNumber').setValue("");
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
        global.getFile(prototype.url + '/getDetailXLSX?IN_OPCION=' + searchParams.IN_OPCION
                + '&IN_A2445CCUST=' + searchParams.IN_A2445CCUST
                + '&IN_A2445IATA=' + searchParams.IN_A2445IATA
                + '&IN_A2445LOTE=' + searchParams.IN_A2445LOTE
                + '&IN_TKT=' + searchParams.IN_TKT
                );
    },
    btnFilter_click: function(obj) {

        var option = Ext.getCmp(prototype.id + '-de' + '-labelSearch');
        if (option.isVisible()) {
            Ext.getCmp(prototype.id + '-de' + '-labelSearch').hide();
            Ext.getCmp(prototype.id + '-de' + '-cmbOptionTKT').hide();
            Ext.getCmp(prototype.id + '-de' + '-txtTKTNumber').hide();
        } else {
            Ext.getCmp(prototype.id + '-de' + '-labelSearch').show();
            Ext.getCmp(prototype.id + '-de' + '-cmbOptionTKT').show();
            Ext.getCmp(prototype.id + '-de' + '-cmbOptionTKT').setValue("1");
            Ext.getCmp(prototype.id + '-de' + '-txtTKTNumber').hide();
        }
    },
    onBtnSendMailFOB: function() {
        var p = this.view.params;
        var rec = p.rec;
        var sendMailDataEntry = Ext.create('Ext.Praxis.view.sales.ConsortiaForm.SendMailDataEntry', {
            id: prototype.id + '-sendMailDataEntry',
            params: {
                rec: rec
            }
        });
        sendMailDataEntry.setId(prototype.id + "-sendMailDataEntry");
        sendMailDataEntry.show();
    },
    onBtnAcuseFOB: function() {
        var p = this.view.params;
        var rec = p.rec;
        var acuseFOBDataEntry = Ext.create('Ext.Praxis.view.sales.ConsortiaForm.AcuseFOBDataEntry', {
            id: prototype.id + '-acuseFOBDataEntry',
            params: {
                rec: rec
            }
        });
        acuseFOBDataEntry.setId(prototype.id + "-acuseFOBDataEntry");
        acuseFOBDataEntry.show();
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-de' + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-de' + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-de' + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();

    },
    pagLast: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-de' + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    }



});
