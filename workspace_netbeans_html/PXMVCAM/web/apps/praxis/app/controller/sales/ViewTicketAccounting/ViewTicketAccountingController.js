/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.ViewTicketAccounting.ViewTicketAccountingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ViewTicketAccountingController',
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
        prototype.id = 'ViewTicketAccountingForm';
        prototype.url = CONTEXTPATH + '/ViewTicketAccounting';
        me = this;
        me.gridActual = '-gridData';
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ViewTicketAccountingForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ViewTicketAccountingForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ViewTicketAccountingForm-btnClear': {
                click: this.btnClear_click
            },
            '#ViewTicketAccountingForm-btnExcel': {
                //click: this.btnExcel_click
                click: this.exportExcel
            },
            '#ViewTicketAccountingForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ViewTicketAccountingForm-btnBack': {
                click: this.btnBack_click
            },
            //-----------------Eventos Especificos -------------------            
            '#ViewTicketAccountingForm-cmbDate': {
                change: this.onChangeSearch
            },
            '#ViewTicketAccountingForm-cmbTransaction': {
                change: this.onChangeTransaction
            },
            '#ViewTicketAccountingForm-cmbSource': {
                change: this.onChangeSource
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtCia').hide();
        Ext.getCmp(prototype.id + '-txtTicket').hide();
        Ext.getCmp(prototype.id + '-txtCupon1').hide();
        Ext.getCmp(prototype.id + '-txtCupon2').hide();
        Ext.getCmp(prototype.id + '-txtCupon3').hide();
        Ext.getCmp(prototype.id + '-txtCupon4').hide();
        Ext.getCmp(prototype.id + '-txtSeq').hide();
        Ext.getCmp(prototype.id + '-txtSeqTran').hide();
        Ext.getCmp(prototype.id + '-txtFPRDA_FROM').hide();
        Ext.getCmp(prototype.id + '-txtFPRDA_TO').hide();
        Ext.getCmp(prototype.id + '-cmbSource').hide();
        Ext.getCmp(prototype.id + '-cmbTransaction').hide();
        Ext.getCmp(prototype.id + '-rbgCtlStpro').hide();
        Ext.getCmp(prototype.id + '-txtTotalTran').hide();
        Ext.getCmp(prototype.id + '-txtMessage').hide();
        Ext.getCmp(prototype.id + '-txtPais').hide();
        Ext.getCmp(prototype.id + '-cmbChannel').hide();
        this.setStoreData();
        //this.btnSearch_click();
    },
    setStoreData: function() {
        var cmbMode = Ext.getCmp(prototype.id + '-cmbMode');
        cmbMode.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "View Ticket"],
                ["2", "Cierre de Grupo"],
                ["3", "Contabilidad"]
            ]
        }));
        cmbMode.setValue("1");
        var cmbDate = Ext.getCmp(prototype.id + '-cmbDate');
        cmbDate.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["1", "Ticket"],
                ["2", "Processing Date"],
                ["3", "Transaction"]
            ]
        }));
        cmbDate.setValue("");
        var cmbSource = Ext.getCmp(prototype.id + '-cmbSource');
        cmbSource.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["ARC", "ARC"],
                ["BSP", "BSP"],
                ["ASR", "ASR"],
                ["MAN", "MAN"]
            ]
        }));
        cmbSource.setValue("");
        var cmbTransaction = Ext.getCmp(prototype.id + '-cmbTransaction');
        cmbTransaction.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["SALE", "SALE"],
                ["EXCH", "EXCH"],
                ["RFND", "RFND"],
                ["MEMO", "ADM/ACM"]
            ]
        }));
        cmbTransaction.setValue("SALE");
        var cmbChannel = Ext.getCmp(prototype.id + '-cmbChannel');
        cmbChannel.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["ATO", "ATO"],
                ["CCT", "CCT"],
                ["CTO", "CTO"],
                ["INP", "INP"],
                ["INT", "INT"],
                ["GSA", "GSA"],
                ["WEB", "WEB"],
                ["ROB", "ROB"],
                ["FRA", "FRA"]
            ]
        }));
        cmbChannel.setValue("");
    },
    onChangeTransaction: function(obj, value) {
        var opt = Ext.getCmp(prototype.id + '-cmbDate').getValue();
        if (opt === '1') {
            if (value === 'RFND') {
                Ext.getCmp(prototype.id + '-txtCupon1').show();
                Ext.getCmp(prototype.id + '-txtCupon2').show();
                Ext.getCmp(prototype.id + '-txtCupon3').show();
                Ext.getCmp(prototype.id + '-txtCupon4').show();
                return;
            }
        }
        Ext.getCmp(prototype.id + '-txtCupon1').hide();
        Ext.getCmp(prototype.id + '-txtCupon2').hide();
        Ext.getCmp(prototype.id + '-txtCupon3').hide();
        Ext.getCmp(prototype.id + '-txtCupon4').hide();

    },
    onChangeSource: function(obj, value) {
        Ext.getCmp(prototype.id + '-txtPais').hide();
        Ext.getCmp(prototype.id + '-cmbChannel').hide();
        if (value === 'BSP') {
            Ext.getCmp(prototype.id + '-txtPais').show();
            return;
        }
        if (value === 'ASR') {
            Ext.getCmp(prototype.id + '-cmbChannel').show();
            return;
        }
    },
    onChangeSearch: function(obj, value) {
        me.searchParams = {};
        Ext.getCmp(prototype.id + '-cmbTransaction').setValue('SALE');
        Ext.getCmp(prototype.id + '-cmbSource').setValue('');
        Ext.getCmp(prototype.id + '-txtCia').setValue('139');
        Ext.getCmp(prototype.id + '-txtTicket').setValue('');
        Ext.getCmp(prototype.id + '-txtSeq').setValue('00');
        Ext.getCmp(prototype.id + '-txtSeqTran').setValue('');
        Ext.getCmp(prototype.id + '-txtFPRDA_FROM').setValue('');
        Ext.getCmp(prototype.id + '-txtFPRDA_TO').setValue('');
        Ext.getCmp(prototype.id + '-txtTotalTran').setValue('');
        Ext.getCmp(prototype.id + '-txtMessage').setValue('');
        Ext.getCmp(prototype.id + '-txtCupon1').setValue('');
        Ext.getCmp(prototype.id + '-txtCupon2').setValue('');
        Ext.getCmp(prototype.id + '-txtCupon3').setValue('');
        Ext.getCmp(prototype.id + '-txtCupon4').setValue('');
        Ext.getCmp(prototype.id + '-txtPais').setValue('');
        Ext.getCmp(prototype.id + '-cmbChannel').setValue('');
        switch (value) {
            case '':
                Ext.getCmp(prototype.id + '-txtCia').hide();
                Ext.getCmp(prototype.id + '-txtTicket').hide();
                Ext.getCmp(prototype.id + '-txtSeq').hide();
                Ext.getCmp(prototype.id + '-txtSeqTran').hide();
                Ext.getCmp(prototype.id + '-txtFPRDA_FROM').hide();
                Ext.getCmp(prototype.id + '-txtFPRDA_TO').hide();
                Ext.getCmp(prototype.id + '-cmbSource').hide();
                Ext.getCmp(prototype.id + '-cmbTransaction').hide();
                Ext.getCmp(prototype.id + '-rbgCtlStpro').hide();
                Ext.getCmp(prototype.id + '-txtTotalTran').hide();
                Ext.getCmp(prototype.id + '-txtMessage').hide();
                Ext.getCmp(prototype.id + '-txtCupon1').hide();
                Ext.getCmp(prototype.id + '-txtCupon2').hide();
                Ext.getCmp(prototype.id + '-txtCupon3').hide();
                Ext.getCmp(prototype.id + '-txtCupon4').hide();
                Ext.getCmp(prototype.id + '-txtPais').hide();
                Ext.getCmp(prototype.id + '-cmbChannel').hide();
                Ext.getCmp(prototype.id + '-panelLista').hide();
                Ext.getCmp(prototype.id + '-gridData2').setWidth(1750);
                break;
            case '1':
                Ext.getCmp(prototype.id + '-txtCia').show();
                Ext.getCmp(prototype.id + '-txtTicket').show();
                Ext.getCmp(prototype.id + '-txtSeq').show();
                Ext.getCmp(prototype.id + '-txtSeqTran').hide();
                Ext.getCmp(prototype.id + '-txtFPRDA_FROM').hide();
                Ext.getCmp(prototype.id + '-txtFPRDA_TO').hide();
                Ext.getCmp(prototype.id + '-cmbSource').hide();
                Ext.getCmp(prototype.id + '-cmbTransaction').show();
                Ext.getCmp(prototype.id + '-rbgCtlStpro').hide();
                Ext.getCmp(prototype.id + '-txtTotalTran').hide();
                Ext.getCmp(prototype.id + '-txtMessage').hide();
                Ext.getCmp(prototype.id + '-txtCupon1').hide();
                Ext.getCmp(prototype.id + '-txtCupon2').hide();
                Ext.getCmp(prototype.id + '-txtCupon3').hide();
                Ext.getCmp(prototype.id + '-txtCupon4').hide();
                Ext.getCmp(prototype.id + '-txtPais').hide();
                Ext.getCmp(prototype.id + '-cmbChannel').hide();
                Ext.getCmp(prototype.id + '-panelLista').hide();
                Ext.getCmp(prototype.id + '-gridData2').setWidth(1750);
                break;
            case '2':
                Ext.getCmp(prototype.id + '-txtCia').hide();
                Ext.getCmp(prototype.id + '-txtTicket').hide();
                Ext.getCmp(prototype.id + '-txtSeq').hide();
                Ext.getCmp(prototype.id + '-txtSeqTran').hide();
                Ext.getCmp(prototype.id + '-txtFPRDA_FROM').show();
                Ext.getCmp(prototype.id + '-txtFPRDA_TO').show();
                Ext.getCmp(prototype.id + '-cmbSource').show();
                Ext.getCmp(prototype.id + '-cmbTransaction').show();
                Ext.getCmp(prototype.id + '-rbgCtlStpro').show();
                Ext.getCmp(prototype.id + '-txtTotalTran').show();
                Ext.getCmp(prototype.id + '-txtMessage').hide();
                Ext.getCmp(prototype.id + '-txtCupon1').hide();
                Ext.getCmp(prototype.id + '-txtCupon2').hide();
                Ext.getCmp(prototype.id + '-txtCupon3').hide();
                Ext.getCmp(prototype.id + '-txtCupon4').hide();
                Ext.getCmp(prototype.id + '-txtPais').hide();
                Ext.getCmp(prototype.id + '-cmbChannel').hide();
                Ext.getCmp(prototype.id + '-panelLista').show();
                Ext.getCmp(prototype.id + '-gridData2').setWidth(1350);
                break;
            case '3':
                Ext.getCmp(prototype.id + '-txtCia').hide();
                Ext.getCmp(prototype.id + '-txtTicket').hide();
                Ext.getCmp(prototype.id + '-txtSeq').hide();
                Ext.getCmp(prototype.id + '-txtSeqTran').show();
                Ext.getCmp(prototype.id + '-txtFPRDA_FROM').show();
                Ext.getCmp(prototype.id + '-txtFPRDA_TO').show();
                Ext.getCmp(prototype.id + '-cmbSource').show();
                Ext.getCmp(prototype.id + '-cmbTransaction').show();
                Ext.getCmp(prototype.id + '-rbgCtlStpro').show();
                Ext.getCmp(prototype.id + '-txtTotalTran').show();
                Ext.getCmp(prototype.id + '-txtMessage').hide();
                Ext.getCmp(prototype.id + '-txtCupon1').hide();
                Ext.getCmp(prototype.id + '-txtCupon2').hide();
                Ext.getCmp(prototype.id + '-txtCupon3').hide();
                Ext.getCmp(prototype.id + '-txtCupon4').hide();
                Ext.getCmp(prototype.id + '-txtPais').hide();
                Ext.getCmp(prototype.id + '-cmbChannel').hide();
                Ext.getCmp(prototype.id + '-panelLista').show();
                Ext.getCmp(prototype.id + '-gridData2').setWidth(1350);
                break;
        }
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        var msj = this.validParams();
        if (msj === '') {
            this.setGridData(obj, e);
        } else {
            global.Msg({
                msg: msj
            });
        }
    },
    validParams: function() {
        var msj = '';
        var params = searchParams;
        if (params.FLAG === '1') {
            if (params.TRANSACTION === '') {
                msj = 'Selected Transaction';
                return msj;
            }
            if (params.TKT.length < 13) {
                msj = 'Enter a Valid Ticket';
                return msj;
            }
            if (params.SEQ.length < 2) {
                msj = 'Enter a Valid Sequence';
                return msj;
            }         
        }
        else {
            if (params.FLAG === '2' || params.FLAG === '3') {
                if (params.FROM.length !== 8) {
                    msj = 'Selected Date From';
                    return msj;
                }
                if (params.TO.length !== 8) {
                    msj = 'Selected Date To';
                    return msj;
                }
                if (params.FUENTE === 'BSP') {
                    me.searchParams.PAIS = Ext.getCmp(prototype.id + '-txtPais').getValue();
                }
                if (params.FUENTE === 'ASR') {
                    me.searchParams.CHANNEL = Ext.getCmp(prototype.id + '-cmbChannel').getValue();
                }
                if (params.TRANSACTION === '') {
                    msj = 'Selected Transaction';
                    return msj;
                }
                if (params.FLAG === '3') {
                    if (Ext.getCmp(prototype.id + '-txtSeqTran').getValue() === '') {
                        msj = 'Enter the Sequence Transaction';
                        return msj;
                    } else {
                        me.searchParams.SEQTRAN = Ext.getCmp(prototype.id + '-txtSeqTran').getValue();
                    }
                }
            }
        }
        return msj;
    },
    setFormatParameter: function() {
        var AIRLINE = '139';
        var MODE = Ext.getCmp(prototype.id + '-cmbMode').getValue();
        var TRANSACTION = Ext.getCmp(prototype.id + '-cmbTransaction').getValue();
        var TKT = Ext.getCmp(prototype.id + '-txtCia').getValue().trim() + Ext.getCmp(prototype.id + '-txtTicket').getValue().trim();
        var SEQ = Ext.getCmp(prototype.id + '-txtSeq').getValue();
        var CUPON1 = Ext.getCmp(prototype.id + '-txtCupon1').getValue();
        var CUPON2 = Ext.getCmp(prototype.id + '-txtCupon2').getValue();
        var CUPON3 = Ext.getCmp(prototype.id + '-txtCupon3').getValue();
        var CUPON4 = Ext.getCmp(prototype.id + '-txtCupon4').getValue();
        var FROM = Ext.getCmp(prototype.id + '-txtFPRDA_FROM').getValue();
        var TO = Ext.getCmp(prototype.id + '-txtFPRDA_TO').getValue();
        var FUENTE = Ext.getCmp(prototype.id + '-cmbSource').getValue();
        var PAIS = '';
        var CHANNEL = Ext.getCmp(prototype.id + '-cmbChannel').getValue();
        var STERROR = Ext.getCmp(prototype.id + '-rbgCtlStpro').lastValue.rb;
        var FLAG = Ext.getCmp(prototype.id + '-cmbDate').getValue();
        var SEQTRAN = 0;
        if (FLAG === '3') {
            SEQTRAN = Ext.getCmp(prototype.id + '-txtSeqTran').getValue();
        }

        FROM = Ext.util.Format.date(FROM, 'Ymd');
        TO = Ext.util.Format.date(TO, 'Ymd');
        if (MODE === '1') {
            MODE = 'VIEW ACCU';
        }
        if (MODE === '2') {
            MODE = 'PRO10253';
        }
        if (MODE === '3') {
            MODE = '';
        }

        searchParams = {
            AIRLINE: AIRLINE,
            MODE: MODE,
            TRANSACTION: TRANSACTION,
            TKT: TKT,
            SEQ: SEQ,
            CUPON1: CUPON1,
            CUPON2: CUPON2,
            CUPON3: CUPON3,
            CUPON4: CUPON4,
            FROM: FROM,
            TO: TO,
            FUENTE: FUENTE,
            PAIS: PAIS,
            CHANNEL: CHANNEL,
            STERROR: STERROR,
            FLAG: FLAG,
            SEQTRAN: SEQTRAN
        };
    },
    setGridData: function(obj, val) {
        if (searchParams.FLAG === '1') {
            var storeGridDatas = Ext.create('Ext.Praxis.store.sales.ViewTicketAccounting.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
                        console.log(obj.data.length === 0);
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var bean = obj.data.items[0].data;
                            me.setData(bean);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridData2').bindStore(storeGridDatas);
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.sales.ViewTicketAccounting.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
                        if(obj.data.length > 0){
                            var bean = obj.data.items[0].data;
                            if(bean.TRNCU==='NULO'){
                                Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
                            }else{
                                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(obj.data.length, '0,000'));
                            }
                            Ext.getCmp(prototype.id + '-txtTotalTran').setValue(Ext.util.Format.number(bean.QTY, '0,000'));
                            if(bean.ERR==='1'){
                                global.Msg({
                                    msg: bean.MSJ.toString()
                                });
                            }
                        }else{
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });
            global.clear();
            
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            this.clearField();
        }
    },
    setData: function(bean) {
        if (searchParams.FLAG === '1') {
            Ext.getCmp(prototype.id + '-txtGRUPO').setValue(bean.GRUPO.trim());
            Ext.getCmp(prototype.id + '-txtSTGRUPO').setValue(bean.STATUS.trim());
            Ext.getCmp(prototype.id + '-txtSOURCE').setValue(bean.FUENTE.trim());
            Ext.getCmp(prototype.id + '-txtCOUNTRY').setValue(bean.PAIS.trim());
            Ext.getCmp(prototype.id + '-txtSUBSOURCE').setValue(bean.SUBFUENTE.trim());
            Ext.getCmp(prototype.id + '-txtCURRENCY').setValue(bean.MONEDA.trim());
            Ext.getCmp(prototype.id + '-txtIATA').setValue(bean.IATA.trim());
            Ext.getCmp(prototype.id + '-txtPNR').setValue(bean.PNR.trim());
            Ext.getCmp(prototype.id + '-txtTRNN').setValue(bean.TRANSACTION.trim());
            Ext.getCmp(prototype.id + '-txtCIATKT').setValue(bean.TKT.substr(0, 3));
            Ext.getCmp(prototype.id + '-txtTKT').setValue(bean.TKT.substr(3, 10));
            Ext.getCmp(prototype.id + '-txtSQ').setValue(bean.SEQ);
            if(bean.ERROR==='1'){
                Ext.getCmp(prototype.id + '-txtMessage').show();
                Ext.getCmp(prototype.id + '-txtMessage').setValue(bean.CODERROR + '-' + bean.MENSAJE);
                //txtMessage.setStyle('backgroundColor', '#F4FA58');
                Ext.getCmp(prototype.id + '-txtMessage').setStyle('background-color','#F4FA58');//setFieldStyle
            }else if(bean.ERROR==='2'){
                Ext.getCmp(prototype.id + '-txtMessage').show();
                Ext.getCmp(prototype.id + '-txtMessage').setValue(bean.CODERROR + '-' + bean.MENSAJE);
                //txtMessage.setStyle('backgroundColor', '#FF8166');
                Ext.getCmp(prototype.id + '-txtMessage').setStyle('background-color','#FF8166');
            }else if(bean.MENSAJE.trim()==='TICKET VOID'){
                Ext.getCmp(prototype.id + '-txtMessage').show();
                Ext.getCmp(prototype.id + '-txtMessage').setValue(bean.MENSAJE);
                //txtMessage.setStyle('backgroundColor', '#F4FA58');
                Ext.getCmp(prototype.id + '-txtMessage').setStyle('background-color','#F4FA58');
                //if(lstData!=null)lstData.removeAll();
            }else{
                Ext.getCmp(prototype.id + '-txtMessage').hide();
                Ext.getCmp(prototype.id + '-txtMessage').setValue('');
            }
        }
    },    
    onEditClick: function(obj, metaData, rowNum, column, obj2, rowData) {
        var data = rowData.data;

        if (data.TICKET !== undefined) {
            searchParams.AIRLINE = '139';
            //searchParams.MODE = searchParams.MODE;
            if (searchParams.MODE === '1') {
                searchParams.MODE = 'VIEW_ACCOU';
            }
            if (searchParams.MODE === '2') {
                searchParams.MODE = 'PRO10253';
            }
            if (searchParams.MODE === '3') {
                searchParams.MODE = '';
            }
            searchParams.TRANSACTION = data.TRNCU;
            searchParams.TKT = data.TICKET;
            searchParams.SEQ = data.SQ;
            searchParams.CUPON1 = data.CUPONES.substr(0, 1);
            searchParams.CUPON2 = data.CUPONES.substr(1, 1);
            searchParams.CUPON3 = data.CUPONES.substr(2, 1);
            searchParams.CUPON4 = data.CUPONES.substr(3, 1);
            searchParams.FLAG = '1';
            searchParams.STERROR = '';
            searchParams.SEQTRAN = 0;
            this.setGridData();
        }     
    },
    btnBack_click: function(obj, e) {
        if (me.drillDown.length > 0) {
            me.gridActual = me.drillDown.pop();
            this.showGridActual();
            this.getPaggin();
            var pag = Ext.getCmp(prototype.id + me.pagginActual);
            var pagData = pag.getPageData();
            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
            Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
        } else {
            global.showMenu();
        }
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbDate').setValue("");
        Ext.getCmp(prototype.id + '-cmbMode').setValue("1");
        Ext.getCmp(prototype.id + '-txtCia').setValue('');
        Ext.getCmp(prototype.id + '-txtTicket').setValue('');
        Ext.getCmp(prototype.id + '-txtSeq').setValue('');
        Ext.getCmp(prototype.id + '-txtSeqTran').setValue('');
        Ext.getCmp(prototype.id + '-txtFPRDA_FROM').setValue('');
        Ext.getCmp(prototype.id + '-txtFPRDA_TO').setValue('');
        Ext.getCmp(prototype.id + '-cmbSource').setValue('');
        //Ext.getCmp(prototype.id + '-rbgCtlStpro').;
        Ext.getCmp(prototype.id + '-txtTotalTran').setValue('');
        Ext.getCmp(prototype.id + '-txtMessage').setValue('');
        Ext.getCmp(prototype.id + '-txtCupon1').setValue('');
        Ext.getCmp(prototype.id + '-txtCupon2').setValue('');
        Ext.getCmp(prototype.id + '-txtCupon3').setValue('');
        Ext.getCmp(prototype.id + '-txtCupon4').setValue('');
        Ext.getCmp(prototype.id + '-txtPais').setValue('');
        Ext.getCmp(prototype.id + '-cmbChannel').setValue('');

        Ext.getCmp(prototype.id + '-cmbTransaction').setValue('SALE');
        Ext.getCmp(prototype.id + '-cmbSource').setValue('');
        Ext.getCmp(prototype.id + '-txtGRUPO').setValue("");
        Ext.getCmp(prototype.id + '-txtSTGRUPO').setValue("");
        Ext.getCmp(prototype.id + '-txtSOURCE').setValue("");
        Ext.getCmp(prototype.id + '-txtSUBSOURCE').setValue("");
        Ext.getCmp(prototype.id + '-txtCOUNTRY').setValue("");
        Ext.getCmp(prototype.id + '-txtCURRENCY').setValue("");
        Ext.getCmp(prototype.id + '-txtIATA').setValue("");
        Ext.getCmp(prototype.id + '-txtPNR').setValue("");
        Ext.getCmp(prototype.id + '-txtTRNN').setValue("");
        Ext.getCmp(prototype.id + '-txtCIATKT').setValue("");
        Ext.getCmp(prototype.id + '-txtTKT').setValue("");
        Ext.getCmp(prototype.id + '-txtSQ').setValue("");

    },
    clearField: function() {
        Ext.getCmp(prototype.id + '-txtGRUPO').setValue("");
        Ext.getCmp(prototype.id + '-txtSTGRUPO').setValue("");
        Ext.getCmp(prototype.id + '-txtSOURCE').setValue("");
        Ext.getCmp(prototype.id + '-txtSUBSOURCE').setValue("");
        Ext.getCmp(prototype.id + '-txtCOUNTRY').setValue("");
        Ext.getCmp(prototype.id + '-txtCURRENCY').setValue("");
        Ext.getCmp(prototype.id + '-txtIATA').setValue("");
        Ext.getCmp(prototype.id + '-txtPNR').setValue("");
        Ext.getCmp(prototype.id + '-txtTRNN').setValue("");
        Ext.getCmp(prototype.id + '-txtCIATKT').setValue("");
        Ext.getCmp(prototype.id + '-txtTKT').setValue("");
        Ext.getCmp(prototype.id + '-txtSQ').setValue("");
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
        //me.setFormatParameter;
        switch (me.gridActual) {
            case  '-gridData':
                 me.exportExcel2(prototype.url + '/getDetailXLSX?beanString=' + encodeURI(JSON.stringify(searchParams)));
               /* global.getFile(prototype.url + '/getXLSX?IN_A1879CCUST=' + me.searchParams.IN_A1879CCUST
                        + '&IN_A1879FECHA=' + me.searchParams.IN_A1879FECHA
                        + '&IN_A1879PERIO=' + me.searchParams.IN_A1879PERIO);*/
            
                break;
            case '-gridDataDetail':
                me.exportExcel2(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(searchParams)));
                /*global.getFile(prototype.url + '/getDetailXLSX?IN_A1879CCUST=' + me.paramsDetail.IN_A1879CCUST
                        + '&IN_A1879FECHA=' + me.paramsDetail.IN_A1879FECHA
                        + '&IN_A1879PERIO=' + me.paramsDetail.IN_A1879PERIO
                        + '&IN_A1879LOTE=' + me.paramsDetail.IN_A1879LOTE
                        + '&IN_A1879MONED=' + me.paramsDetail.IN_A1879MONED
                        );*/
                break;
//            case '-gridDataDetail2':
//                global.getFile(prototype.url + '/getDetail2XLSX?IN_A1878CCUST=' + me.paramsDetail.IN_A1878CCUST
//                        + '&IN_A1878MONED=' + me.paramsDetail.IN_A1878MONED
//                        + '&IN_A1878TITU=' + me.paramsDetail.IN_A1878TITU
//                        + '&IN_A1878FPRO=' + me.paramsDetail.IN_A1878FPRO
//                        + '&IN_A1878CIAF=' + me.paramsDetail.IN_A1878CIAF
//                        + '&IN_A1878UNID=' + me.paramsDetail.IN_A1878UNID
//                        + '&IN_A1878CECO=' + me.paramsDetail.IN_A1878CECO
//                        + '&IN_A1878UBICA=' + me.paramsDetail.IN_A1878UBICA
//                        + '&IN_A1878CUENT=' + me.paramsDetail.IN_A1878CUENT
//                        + '&IN_A1878SUBCU=' + me.paramsDetail.IN_A1878SUBCU
//                        + '&IN_A1878EQUI=' + me.paramsDetail.IN_A1878EQUI
//                        + '&IN_A1878ICIA=' + me.paramsDetail.IN_A1878ICIA
//                        );
//                break;
        }
    },
    exportExcel2: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
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