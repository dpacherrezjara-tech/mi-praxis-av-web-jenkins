/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.FOB.DataEntryFOBController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        //console.log("init");
        prototype.id = 'FOBForm';
        prototype.url = CONTEXTPATH + '/FOB';
        this.control({
            // -------------------Eventos Genericos --------------------            
            '#FOBForm-de-btnSearch': {
                click: this.btnSearch_click
            },
            '#FOBForm-de-btnClear': {
                click: this.btnClear_click
            },
            '#FOBForm-de-btnExcel': {
                click: this.btnExcel_click
            },
            '#FOBForm-de-btnFilter': {
                click: this.btnFilter_click
            },
            '#FOBForm-de-btnBack': {
                click: this.btnBack_click
            },
            '#FOBForm-de-btn-pag-first': {
                click: this.pagFirst
            },
            '#FOBForm-de-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#FOBForm-de-btn-pag-next': {
                click: this.pagNext
            },
            '#FOBForm-de-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#FOBForm-de-cmbOptionTKT': {
                change: this.onChangeSearch
            },
            '#FOBForm-de-BtnSendMailFOB': {
                click: this.onBtnSendMailFOB
            },
            '#FOBForm-de-BtnAcuseFOB': {
                click: this.onBtnAcuseFOB
            }
        });
    },
    afterRender: function(obj, e) {
        //console.log("Init");
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
        //Ext.getCmp(prototype.id + '-de' + '-labelSearch').hide();
        Ext.getCmp(prototype.id + '-de' + '-cmbOptionTKT').hide();
        Ext.getCmp(prototype.id + '-de' + '-txtTKTNumber').hide();
    },
    initComponents: function() {
        var p = this.view.params;
        var data = p.rec;

        Ext.getCmp(prototype.id + '-de' + '-txtIata').setValue(data.A1728IATA.trim());
        Ext.getCmp(prototype.id + '-de' + '-txtNameIATA').setValue(data.A003KEY3.trim());
        Ext.getCmp(prototype.id + '-de' + '-txtLote').setValue(data.A1728LOTE.trim());
        Ext.getCmp(prototype.id + '-de' + '-txtSource').setValue(data.A1728FUENT.trim());
        Ext.getCmp(prototype.id + '-de' + '-txtPreFac').setValue(data.A1728FENV.trim());
        Ext.getCmp(prototype.id + '-de' + '-txtPreFactura').setValue(data.A1728STAT.trim());
        Ext.getCmp(prototype.id + '-de' + '-txtFacRec').setValue(data.A1728FREC.trim());
        Ext.getCmp(prototype.id + '-de' + '-txtFacturaRecibida').setValue(data.A1728STRC.trim());
        Ext.getCmp(prototype.id + '-de' + '-txtCommission').setValue(Ext.util.Format.number(data.A1728TCOM, '0,000.00'));
        Ext.getCmp(prototype.id + '-de' + '-txtIVA').setValue(Ext.util.Format.number(data.A1728TIVA, '0,000.00'));
        Ext.getCmp(prototype.id + '-de' + '-txtCommIVA').setValue(Ext.util.Format.number(data.A1728TCOMI, '0,000.00'));
        Ext.getCmp(prototype.id + '-de' + '-txtCash').setValue(Ext.util.Format.number(data.A1728TTCAS, '0,000.00'));
        Ext.getCmp(prototype.id + '-de' + '-txtCashComm').setValue(Ext.util.Format.number(data.A1728TCAMC, '0,000.00'));
        Ext.getCmp(prototype.id + '-de' + '-txtFare').setValue(Ext.util.Format.number(data.A1728FARE, '0,000.00'));
        if (data.ACUSE === 'N') {
            Ext.getCmp(prototype.id + '-de' + '-BtnSendMailFOB').setDisabled(false);
        } else {
            Ext.getCmp(prototype.id + '-de' + '-BtnSendMailFOB').setDisabled(true);
        }
        if (data.A1728FACUS.trim() === "" && data.A1728STAT.trim !== 'PENDING') {
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
//        console.log(searchParams);
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {
        var IN_OPCION = '2'; //podria cambiar
        var IN_A1729CCUST = '139';
        var IN_A1729IATA = Ext.getCmp(prototype.id + '-de' + '-txtIata').getValue();
        var IN_A1729LOTE = Ext.getCmp(prototype.id + '-de' + '-txtLote').getValue();
        var IN_TKT = Ext.getCmp(prototype.id + '-de' + '-txtTKTNumber').getValue();

        searchParams = {
            IN_OPCION: IN_OPCION,
            IN_A1729CCUST: IN_A1729CCUST,
            IN_A1729IATA: IN_A1729IATA,
            IN_A1729LOTE: IN_A1729LOTE,
            IN_TKT: IN_TKT
        };
        //console.log(searchParams);

    },
    setGridData: function(obj, val) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.FOB.GridData', {
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
        var dataEntry = Ext.create('Ext.Praxis.view.sales.FOBForm.DataEntry', {
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
                + '&IN_A1729CCUST=' + searchParams.IN_A1729CCUST
                + '&IN_A1729IATA=' + searchParams.IN_A1729IATA
                + '&IN_A1729LOTE=' + searchParams.IN_A1729LOTE
                + '&IN_TKT=' + searchParams.IN_TKT
                );
    },
    btnFilter_click: function(obj) {
        //var option = Ext.getCmp(prototype.id + '-de' + '-labelSearch');
        var option = Ext.getCmp(prototype.id + '-de' + '-cmbOptionTKT');        
        if (option.isVisible()) {
            //Ext.getCmp(prototype.id + '-de' + '-labelSearch').hide();
            Ext.getCmp(prototype.id + '-de' + '-cmbOptionTKT').hide();
            Ext.getCmp(prototype.id + '-de' + '-txtTKTNumber').hide();
        } else {
            //Ext.getCmp(prototype.id + '-de' + '-labelSearch').show();
            Ext.getCmp(prototype.id + '-de' + '-cmbOptionTKT').show();
            Ext.getCmp(prototype.id + '-de' + '-cmbOptionTKT').setValue("2");
            Ext.getCmp(prototype.id + '-de' + '-txtTKTNumber').show();
            Ext.getCmp(prototype.id + '-de-txtTKTNumber').focus();
            this.onChangeSearch();
        }
        
    },
    onBtnSendMailFOB: function() {
        var p = this.view.params;
        var rec = p.rec;
        var sendMailDataEntry = Ext.create('Ext.Praxis.view.sales.FOBForm.SendMailDataEntry', {
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
        var acuseFOBDataEntry = Ext.create('Ext.Praxis.view.sales.FOBForm.AcuseFOBDataEntry', {
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
    },
//    cmbOptionTKT_clickHandler:function(){
//        //console.log('*************');        
//        Ext.getCmp(prototype.id + '-de-txtTKTNumber').focus();         
//    },
    txtTKTNumber_onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }

});
