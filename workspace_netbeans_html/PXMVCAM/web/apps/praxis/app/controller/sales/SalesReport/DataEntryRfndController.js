/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryRfndController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.idRfnd + '-dataEntryRfndController',
    url: CONTEXTPATH + '/SalesReport',
    url2: CONTEXTPATH + '/RfndMaintenance',
    meDET: '',
    seq: '',
    modo: '',
    exch: '',
    locCurr: '',
    revCurr: 'USD',
    fare: 0,
    cant: 0,
    validador: 0,
    paramsDET: {},
    paramsProrrate: {},
    /**
     * Constructor
     */
    init: function (view) {
        meDET = this;
        prototype.ProrrateoNew = {
            id: 'ScrProrrateoNewForm',
            url: CONTEXTPATH + '/ScrProrrateoNew'
        };
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */

    afterRender: function () {
        this.setStoresGrids();//zpp
        this.getDataInputs();
    },
    setStoresGrids: function () {
        var gridDetCpn = Ext.getCmp(prototype.idRfnd + '-det-gridDetCpn');
        var gridEMD = Ext.getCmp(prototype.idRfnd + '-det-gridEMD');

        var storeDetCpn = Ext.create('Ext.data.Store', {
            storeId: prototype.idRfnd + '-store-gridDetCpn'
        });
        var storeEMD = Ext.create('Ext.data.Store', {
            storeId: prototype.idRfnd + '-store-gridEMD'
        });

        gridDetCpn.setStore(storeDetCpn);
        gridEMD.setStore(storeEMD);
    },
    getDataInputs: function () {
        var p = this.view.params;
        var bean = p.rec.data;
        var modo = p.modo;
        meDET.modo = p.modo;
        meDET.exch = p.exchrate;//Ext.getCmp(prototype.idGr + '-de-lblExchangeRate').getValue();
        meDET.locCurr = p.locCurr;//Ext.getCmp(prototype.idGr + '-de-lblCurrency').getValue();
        Ext.getCmp(prototype.idRfnd + '-det-gridDetCpn').getStore().removeAll();
        Ext.getCmp(prototype.idRfnd + '-det-gridEMD').getStore().removeAll();
        if(modo==='I'){
            Ext.getCmp(prototype.idRfnd + '-det-lblCia').setValue("139");
            Ext.getCmp(prototype.idRfnd + '-det-lblCia').setReadOnly(false);
            Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').setReadOnly(false);
            Ext.getCmp(prototype.idRfnd + '-det-lblDocType').setValue("TKTT");
            Ext.getCmp(prototype.idRfnd + '-det-lblDocType').setReadOnly(false);
            Ext.getCmp(prototype.idRfnd + '-det-lblTransaction').setValue("RFND");
            Ext.getCmp(prototype.idRfnd + '-det-lblExchangeRate').setValue(meDET.exch);
            Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').setValue(meDET.locCurr);
            Ext.getCmp(prototype.idRfnd + '-det-lblGroup').setValue(Ext.getCmp(prototype.idGr + '-de-lblGroup').getValue());
            Ext.getCmp(prototype.idRfnd + '-det-lblFileId').setValue(Ext.getCmp(prototype.idGr + '-de-lblIdFile').getValue());
            Ext.getCmp(prototype.idRfnd + '-det-lblSource').setValue(Ext.getCmp(prototype.idGr + '-de-lblSource').getValue() + '-' + Ext.getCmp(prototype.idGr + '-de-lblCountry').getValue());
            Ext.getCmp(prototype.idRfnd + '-det-lblFareCur').setValue(meDET.locCurr);
            Ext.getCmp(prototype.idRfnd + '-det-lblFare').setValue(Ext.util.Format.number(0, '0,000.00'));
            Ext.getCmp(prototype.idRfnd + '-det-lblIssueDate').setValue(this.hoyFecha());
            Ext.getCmp(prototype.idRfnd + '-det-lblFARE2Cur').setValue(meDET.locCurr);
            Ext.getCmp(prototype.idRfnd + '-det-lblFARE2').setValue(Ext.util.Format.number(0, '0,000.00'));
            Ext.getCmp(prototype.idRfnd + '-det-panelGridEMD').hide();
            meDET.seq = '';
        }else{
            if(modo==='R'){
                Ext.getCmp(prototype.idRfnd + '-btnUpdateItinerary').hide();
                Ext.getCmp(prototype.idRfnd + '-btnSave').hide();
                Ext.getCmp(prototype.idRfnd + '-btnDelete').hide();
                Ext.getCmp(prototype.idRfnd + '-btnUpdateItinerary').hide();
                Ext.getCmp(prototype.idRfnd + '-btnADD').hide();
                Ext.getCmp(prototype.idRfnd + '-btnADDEmd').hide();
            }
            var IN_AIRLIN = bean.A713AIRLIN;
            var IN_CIA = bean.A713CIA;
            var IN_FORMA = bean.DOCUMENTO.substr(0, 4);
            var IN_SERIE = bean.DOCUMENTO.substr(4, 6);
            var A713SEQ = bean.A713SEQ;
            meDET.seq = A713SEQ;
            meDET.paramsDET = {
                IN_AIRLIN: IN_AIRLIN,
                IN_CIA: IN_CIA,
                IN_FORMA: IN_FORMA,
                IN_SERIE: IN_SERIE,
                A713SEQ: A713SEQ
            };
            Ext.Ajax.request({
                //url: prototype.url + '/loadTicketDataEntryRfnd',
                url: this.url + '/loadTicketDataEntryRfnd',
                method: 'POST',
                timeout: 60000000,
                params: meDET.paramsDET,
                beforerequest: Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').mask('Loading...', ''),
                success: function (response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var lstRFND = res.lstRFND;
                    //var lstRFNDGrilla = res.lstRFNDGrilla;
                    var lstRFNDGrilla = res.lstRFND;
                    meDET.setValues(lstRFND, lstRFNDGrilla);
                    // Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').unmask('Loading...', '');
                }
            });
        }
    },
    onFocus: function (id) {
        Ext.getCmp(prototype.idRfnd + id).focus();
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onBlurValueCurrency: function (field) {
        meDET.validador = 0;
        if (field.getValue().length !== 3) {
            meDET.validador = 1;
        }else{
            var monedas = ['MXN','USD','EUR','GBP','PEN','COP','JPY','CNY','CLP','ARS','BRL'];
            if(monedas.indexOf(field.getValue()) === -1){
                this.validaCurrency(field.getValue());
            }
        }
        if (meDET.validador === 1){
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Currency', function(btn, text){
                if (btn === 'ok'){
                    meDET.onFocus('-det-lblFareCur');
                }
            });
        }
    },
    onBlurValueCity: function (field) {
        if (field.getValue().trim()!=='' && field.getValue().length !==3 ) {
            global.Msg({
                msg: 'Invalid City'
            });
        }
    },
    onBlurValueVuelo: function (field) {
        var valueValid = '00000';
        var resultado = valueValid + field.getValue();
        resultado = resultado.substring(resultado.length - valueValid.length);
        if (field.getValue().trim() === "0OPEN" || field.getValue().trim() === "0VOID" || field.getValue().trim() === "OPEN" || field.getValue().trim() === "VOID" || field.getValue().trim() === "CLOSE"){
            field.setValue(resultado);
        }else{
            if(this.tiene_numeros(field.getValue())===1){
                field.setValue(resultado);
            }else{
                field.setValue(valueValid);
            }
        }
    },
    onBlurTDoc: function (field) {
        if (field.getValue().substr(0, 3) === 'EMD') {
            Ext.getCmp(prototype.idRfnd + '-det-panelGridEMD').show();
        } else {
            Ext.getCmp(prototype.idRfnd + '-det-panelGridEMD').hide();
            Ext.getCmp(prototype.idRfnd + '-det-gridEMD').getStore().removeAll();
        }
        var grid05 = Ext.getCmp(prototype.idRfnd + '-det-gridEMD');
        alert(grid05.getStore().getCount());
    },
    onBlurValueFecha: function (field) {
        meDET.validador = 0;
        if (field.getValue().length < 8) {
            meDET.validador = 1;
        } else {
            if (parseInt(field.getValue().substr(4, 2)) < 1 || parseInt(field.getValue().substr(4, 2)) > 12) {
                meDET.validador = 1;
            } else if (parseInt(field.getValue().substr(6, 2)) < 1 || parseInt(field.getValue().substr(6, 2)) > 31) {
                meDET.validador = 1;
            }
            if (parseInt(field.getValue().substr(4, 2)) === 2 && parseInt(field.getValue().substr(6, 2)) > 29) {
                meDET.validador = 1;
            }
        }
        if (meDET.validador === 1) {
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Date', function (btn, text) {
                if (btn === 'ok') {
                    meDET.onFocus('-det-lblIssueDate');
                }
            });
        }
        if (this.hoyFecha()<field.getValue()){
            meDET.validador = 1;
            Ext.Msg.alert('.: PRAXIS :.', 'Issue Date cannot be greater than system date', function(btn, text){
                if (btn === 'ok'){
                    meDET.onFocus('-det-lblIssueDate');
                }
            });
        }
    },
    hoyFecha: function () {
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1;
        var yyyy = hoy.getFullYear();
        dd = this.addZero(dd);
        mm = this.addZero(mm);
        return yyyy + mm + dd;
    },
    addZero: function (i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    },
    onBlurValueFechaVuelo: function (field) {
        meDET.validador = 0;
        if (field.getValue().trim() === "0OPEN" || field.getValue().trim() === "0VOID" || field.getValue().trim() === "OPEN" || field.getValue().trim() === "VOID" || field.getValue().trim() === "CLOSE"){
            return;
        }
        if (field.getValue().length < 8) {
            meDET.validador = 1;
        } else {
            if (parseInt(field.getValue().substr(4, 2)) < 1 || parseInt(field.getValue().substr(4, 2)) > 12) {
                meDET.validador = 1;
            } else if (parseInt(field.getValue().substr(6, 2)) < 1 || parseInt(field.getValue().substr(6, 2)) > 31) {
                meDET.validador = 1;
            }
            if (parseInt(field.getValue().substr(4, 2)) === 2 && parseInt(field.getValue().substr(6, 2)) > 29) {
                meDET.validador = 1;
            }
        }
        if (meDET.validador === 1) {
            global.Msg({
                msg: 'Invalid Flight Date'
            });
        }
    },
    onBlurValueCia: function (field) {
        meDET.validador = 0;
        if (field.getValue().length !== 3) {
            meDET.validador = 1;
        }
        if (meDET.validador === 1){
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Cia', function(btn, text){
                if (btn === 'ok'){
                    meDET.onFocus('-det-lblCia');
                }
            });
        }
    },
    onBlurValueTicket: function (field) {
        meDET.validador = 0;
        if (field.getValue().length !== 10) {
            meDET.validador = 1;
        }
        if (meDET.validador === 1){
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Document', function(btn, text){
                if (btn === 'ok'){
                    meDET.onFocus('-det-lblDocumento');
                }
            });
        }
    },
    onBlurValueIata: function (field) {
        meDET.validador = 0;
        if (field.getValue().length !== 8) {
            meDET.validador = 1;
        }else{
            this.validaIata(field.getValue());
        }
        if (meDET.validador === 1){
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Iata', function(btn, text){
                if (btn === 'ok'){
                    meDET.onFocus('-det-lblIata');
                }
            });
        }
    },
    tiene_numeros: function (texto) {
        var numeros="0123456789";
        for(i=0; i<texto.length; i++){
           if (numeros.indexOf(texto.charAt(i),0)===-1){
              return 0;
           }
        }
        return 1;
    },
    onAmountRenderer: function (field) {
        field.setValue(field.getValue().replace(new RegExp(',', 'g'), ''));
        field.setValue(Ext.util.Format.number(field.getValue(), '0,000.00'));
        switch (field.id) {
            case 'SalesReportFormRfnd-det-lblFare':
                Ext.getCmp(prototype.idRfnd + '-det-lblFARE2Cur').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue());
                if(parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblEQV').getValue().replace(new RegExp(',', 'g'), ''))===0 ||
                   isNaN(parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblEQV').getValue().replace(new RegExp(',', 'g'), ''))) === true){
                    Ext.getCmp(prototype.idRfnd + '-det-lblFARE2').setValue(field.getValue());
                }else{
                    Ext.getCmp(prototype.idRfnd + '-det-lblFARE2').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblEQV').getValue());
                }
                break;
            case 'SalesReportFormRfnd-det-lblEQV':
                Ext.getCmp(prototype.idRfnd + '-det-lblFARE2Cur').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue());
                if(parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblEQV').getValue().replace(new RegExp(',', 'g'), ''))===0 ||
                   isNaN(parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblEQV').getValue().replace(new RegExp(',', 'g'), ''))) === true){
                    Ext.getCmp(prototype.idRfnd + '-det-lblEQVCur').setValue('');
                    Ext.getCmp(prototype.idRfnd + '-det-lblFARE2').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblFare').getValue());
                }else{
                    Ext.getCmp(prototype.idRfnd + '-det-lblEQVCur').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue());
                    Ext.getCmp(prototype.idRfnd + '-det-lblFARE2').setValue(field.getValue());
                }
                break;
            case 'SalesReportFormRfnd-det-lblDiscount':
                if(parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblDiscount').getValue().replace(new RegExp(',', 'g'), ''))===0 ||
                   isNaN(parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblDiscount').getValue().replace(new RegExp(',', 'g'), ''))) === true){
                    Ext.getCmp(prototype.idRfnd + '-det-lblDiscountCur').setValue('');
                }else{
                    Ext.getCmp(prototype.idRfnd + '-det-lblDiscountCur').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue());
                }
                break;
            case 'SalesReportFormRfnd-det-lblCOMMISION1':
                if(parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISION1').getValue().replace(new RegExp(',', 'g'), ''))===0 ||
                   isNaN(parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISION1').getValue().replace(new RegExp(',', 'g'), ''))) === true){
                    Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONCur1').setValue('');
                    Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONRate1').setValue('');
                }else{
                    Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONCur1').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue());
                }
                break;
            case 'SalesReportFormRfnd-det-lblCOMMISION2':
                if(parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISION2').getValue().replace(new RegExp(',', 'g'), ''))===0 ||
                   isNaN(parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISION2').getValue().replace(new RegExp(',', 'g'), ''))) === true){
                    Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONCur2').setValue('');
                    Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONRate2').setValue('');
                }else{
                    Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONCur2').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue());
                }
                break;
            case 'SalesReportFormRfnd-det-lblTAXCOMMISSION1':
                if(parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSION1').getValue().replace(new RegExp(',', 'g'), ''))===0 ||
                   isNaN(parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSION1').getValue().replace(new RegExp(',', 'g'), ''))) === true){
                    Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSIONCur1').setValue('');
                    Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSIONRate1').setValue('');
                }else{
                    Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSIONCur1').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue());
                }
                break;
            /*default:
              console.log('Lo lamentamos, por el momento no disponemos de ' + field.id + '.');*/
        }
    },
    onTipoRenderer: function (field) {
        meDET.validador = 0;
        if (field.getValue().trim()!=='' && field.getValue().length < 2) {
            meDET.validador = 1;
            global.Msg({
                msg: 'Invalid Code'
            });
            return;
        } else {
            switch (field.id) {
                case 'SalesReportFormRfnd-det-lblFOPCode1':
                    if(Ext.getCmp(prototype.idRfnd + '-det-lblFOPCode1').getValue().trim()!==''){
                        Ext.getCmp(prototype.idRfnd + '-det-lblFOPCur1').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue());
                    }else{
                        Ext.getCmp(prototype.idRfnd + '-det-lblFOPCur1').setValue('');
                        Ext.getCmp(prototype.idRfnd + '-det-lblCardType1').setValue('');
                        Ext.getCmp(prototype.idRfnd + '-det-lblRefNumber1').setValue('');
                        Ext.getCmp(prototype.idRfnd + '-det-lblFOP1').setValue('');
                    }
                    break;
                case 'SalesReportFormRfnd-det-lblFOPCode2':
                    if(Ext.getCmp(prototype.idRfnd + '-det-lblFOPCode2').getValue().trim()!==''){
                        Ext.getCmp(prototype.idRfnd + '-det-lblFOPCur2').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue());
                    }else{
                        Ext.getCmp(prototype.idRfnd + '-det-lblFOPCur2').setValue('');
                        Ext.getCmp(prototype.idRfnd + '-det-lblCardType2').setValue('');
                        Ext.getCmp(prototype.idRfnd + '-det-lblRefNumber2').setValue('');
                        Ext.getCmp(prototype.idRfnd + '-det-lblFOP2').setValue('');
                    }
                    break;
                case 'SalesReportFormRfnd-det-lblTAXCode1':
                    if(Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode1').getValue().trim()!==''){
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur1').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue());
                    }else{
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur1').setValue('');
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAX1').setValue('');
                        Ext.getCmp(prototype.idRfnd + '-det-lblPFC1').setValue('');
                    }
                    break;
                case 'SalesReportFormRfnd-det-lblTAXCode2':
                    if(Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode2').getValue().trim()!==''){
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur2').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue());
                    }else{
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur2').setValue('');
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAX2').setValue('');
                        Ext.getCmp(prototype.idRfnd + '-det-lblPFC2').setValue('');
                    }
                    break;
                case 'SalesReportFormRfnd-det-lblTAXCode3':
                    if(Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode3').getValue().trim()!==''){
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur3').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue());
                    }else{
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur3').setValue('');
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAX3').setValue('');
                        Ext.getCmp(prototype.idRfnd + '-det-lblPFC3').setValue('');
                    }
                    break;
                case 'SalesReportFormRfnd-det-lblTAXCode4':
                    if(Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode4').getValue().trim()!==''){
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur4').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue());
                    }else{
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur4').setValue('');
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAX4').setValue('');
                        Ext.getCmp(prototype.idRfnd + '-det-lblPFC4').setValue('');
                    }
                    break;
                /*default:
                  console.log('Lo lamentamos, por el momento no disponemos de ' + field.id + '.');*/
            }
        }
    },
    setValues: function (lstRFND, lstRFNDGrilla) {
        var file;
        if (lstRFND.length > 0) {
            file = lstRFND[0];
            Ext.getCmp(prototype.idRfnd + '-det-lblCia').setValue(file.A713CIAI.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').setValue(file.A713FORMAI.trim() + file.A713SERIEI.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblDigito').setValue(file.A713DCHEQ.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblTransaction').setValue(file.A713TRNCU.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblDocType').setValue(file.A713TDOC.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblConjuction').setValue(file.A713FLAG.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblBoleto').setValue(Ext.util.Format.number(file.A713NSEQ, '0,000'));
            Ext.getCmp(prototype.idRfnd + '-det-lblTotBoleto').setValue(Ext.util.Format.number(file.A713CTKTC, '0,000'));
            Ext.getCmp(prototype.idRfnd + '-det-lblTransactionNbr').setValue(file.A713TRNN);
            Ext.getCmp(prototype.idRfnd + '-det-lblSeq').setValue(file.A713TRNSQ);
            Ext.getCmp(prototype.idRfnd + '-det-lblIata').setValue(file.A713AGENTE.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblTourCode').setValue(file.A713CODIT.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblFareCur').setValue(file.A713MONEDA.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblEQVCur').setValue(file.A713MDAPAG.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblDiscountCur').setValue(file.A713MDDS.trim());
            // Ext.getCmp(prototype.idRfnd + '-det-lblQCur').setValue(file.A713MDATQ.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblExchangeRate').setValue(meDET.exch);
            Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').setValue(meDET.locCurr);
            Ext.getCmp(prototype.idRfnd + '-det-lblGroup').setValue(file.A713GRUPO);
            Ext.getCmp(prototype.idRfnd + '-det-lblFileId').setValue(file.A713IDFIL);
            Ext.getCmp(prototype.idRfnd + '-det-lblFare').setValue(Ext.util.Format.number(file.A713TARIFA, '0,000.00'));
            Ext.getCmp(prototype.idRfnd + '-det-lblEQV').setValue(Ext.util.Format.number(file.A713TRFPAG, '0,000.00'));
            Ext.getCmp(prototype.idRfnd + '-det-lblDiscount').setValue(Ext.util.Format.number(file.A713VDSCT, '0,000.00'));
            //Ext.getCmp(prototype.idRfnd + '-det-lblQ').setValue(Ext.util.Format.number(file.A713TQ, '0,000.00'));
            if (file.ERRORDESC.trim() !== '' && file.A713STAT !== '1' && file.A713STAT !== '4') {
                Ext.getCmp(prototype.idRfnd + '-det-lblError').setText(file.ERRORDESC.trim());
            } else {
                Ext.getCmp(prototype.idRfnd + '-det-lblError').setText('');
            }
            if (file.A713ORIG === 'A')
                file.A713ORIG = 'ARC';
            if (file.A713ORIG === 'B')
                file.A713ORIG = 'BSP';
            if (file.A713ORIG === 'S')
                file.A713ORIG = 'ASR';
            if (file.A713ORIG === 'M')
                file.A713ORIG = 'MAN';
            Ext.getCmp(prototype.idRfnd + '-det-lblSource').setValue(file.A713ORIG.trim() + '-' + file.A713PAIS.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblIssueDate').setValue(file.A713FECVTA.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblAuthorityNumber').setValue(file.TICKETAUTH.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblFARE2Cur').setValue(file.A713MDAFA.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblFARE2').setValue(Ext.util.Format.number(file.A713FARE, '0,000.00'));
            meDET.fare = file.A713FARE;
            Ext.getCmp(prototype.idRfnd + '-det-lblVoucherReason').setValue(file.A713VRIC.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblFFOP').setValue(file.A713FLAGTN.trim());
            if (file.A713TDOC.substr(0, 3) === 'EMD') {
                Ext.getCmp(prototype.idRfnd + '-det-panelGridEMD').show();
                meDET.loadEMD(file);
            } else {
                Ext.getCmp(prototype.idRfnd + '-det-panelGridEMD').hide();
            }
            Ext.getCmp(prototype.idRfnd + '-det-lblTicket1').getEl().update(/*file.A713CIAI + */file.A713FORMAI + file.A713SERIEI);
            Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_1').setValue(file.A713CUPON1.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_1').setValue(file.A713CUPON2.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_1').setValue(file.A713CUPON3.trim());
            Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_1').setValue(file.A713CUPON4.trim());
            
            var status = meDET.modo==='R'?'CLOSED':Ext.String.trim(Ext.getCmp(prototype.idGr + '-de-lblStatus').getValue());
            if(file.A713ORIG.trim()!=='MAN' || status==='CLOSED'){
                Ext.getCmp(prototype.idRfnd + '-det-gridDetCpn-delete').hide();
                Ext.getCmp(prototype.idRfnd + '-det-panelGridEMD-delete').hide();
                Ext.getCmp(prototype.idRfnd + '-btnADD').hide();
                Ext.getCmp(prototype.idRfnd + '-btnADDEmd').hide();
            }
            meDET.llenarGrillaRFND(lstRFNDGrilla);

            var IN_TIPOCAP = meDET.modo==='R'?'A':Ext.getCmp(prototype.idGr + '-de-lblCapture').getValue().substr(0, 1);
            var IN_ERROR = Ext.getCmp(prototype.idRfnd + '-det-lblError').text;
            paramsProrrate = {
                IN_TIPOCAP: IN_TIPOCAP,
                IN_AIRLIN: file.A713AIRLIN,
                IN_GRUPO: file.A713GRUPO,
                IN_CIA: file.A713CIAI,
                IN_FORMA: file.A713FORMAI,
                IN_SERIE: file.A713SERIEI,
                IN_SEQ: file.A713SEQ,
                IN_FTE: file.A713ORIG,
                IN_TRX: file.A713TRNCU,
                IN_EDITABLE: meDET.modo==='R'?false:true,
                IN_TCAMB: meDET.exch,
                IN_REVENUE: meDET.revCurr,
                IN_STATUS: meDET.modo==='R'?'CLOSED':Ext.String.trim(Ext.getCmp(prototype.idGr + '-de-lblStatus').getValue()),
                IN_ERROR: IN_ERROR,
                IN_TDOC: Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblDocType').getValue()),
                IN_ISSUEDATE: file.A713FECVTA,
                IN_CUPON1: Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_1').getValue(),
                IN_CUPON2: Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_1').getValue(),
                IN_CUPON3: Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_1').getValue(),
                IN_CUPON4: Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_1').getValue(),
                IN_FORCE: '',
                IN_IDFIL: file.A713IDFIL
            };

            meDET.cargarTotales();
        }else{
            Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').unmask('Loading...', '');
        }
    },
    cargarTotales: function () {
        Ext.Ajax.request({
            //url: prototype.url + '/loadTotalesRfnd',
            url: this.url + '/loadTotalesRfnd',
            method: 'POST',
            timeout: 60000000,
            params: {
                A713CIAI: Ext.getCmp(prototype.idRfnd + '-det-lblCia').getValue(),
                A713FORMAI: Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().substr(0, 4),
                A713SERIEI: Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().substr(4, 6),
                A713SEQ: meDET.seq
            },
            //beforerequest: Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstTotRfnd = res.lstTotRfnd;
                if (lstTotRfnd.length > 0) {
                    var file2 = lstTotRfnd[0];
                    Ext.getCmp(prototype.idRfnd + '-det-lblFOPCur').setValue(file2.FOPCUR.trim());
                    Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur').setValue(file2.TAXCUR.trim());
                    Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONCur').setValue(file2.COMMCUR.trim());
                    Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSIONCur').setValue(file2.TAXCOMMCUR.trim());
                    Ext.getCmp(prototype.idRfnd + '-det-lblFOP').setValue(Ext.util.Format.number(file2.FOP, '0,000.00'));
                    Ext.getCmp(prototype.idRfnd + '-det-lblTAX').setValue(Ext.util.Format.number(file2.TAX, '0,000.00'));
                    Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISION').setValue(Ext.util.Format.number(file2.COMM, '0,000.00'));
                    Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSION').setValue(Ext.util.Format.number(file2.TAXCOMM, '0,000.00'));

                    //Ext.getCmp(prototype.id01 + '-txtFAREAero').getValue().replace(new RegExp(',', 'g'), '');
                    //Ext.getCmp(prototype.idRfnd + '-det-lblFARE2').setValue(Ext.util.Format.number(file.A713FARE, '0,000.00'));
                    //alert("Suma New 100:" + ((meDET.fare*100 + file2.TAX*100)/100));
                    //alert("Calculo:" + file2.FOP - (parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblFARE2').getValue().replace(new RegExp(',', 'g'), '')) + file2.TAX)));
                    //if ((file2.FOP - (parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblFARE2').getValue().replace(new RegExp(',', 'g'), '')) + file2.TAX)) !== 0) {
                    if ((file2.FOP - ((meDET.fare * 100 + file2.TAX * 100) / 100)) !== 0) {
                        Ext.getCmp(prototype.idRfnd + '-det-lblUnbalance').show();
                    } else {
                        Ext.getCmp(prototype.idRfnd + '-det-lblUnbalance').hide();
                    }
                    meDET.limpiarRubros();
                    meDET.loadRubros();
                }
                // Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').unmask('Loading...', '');
            }
        });
    },
    llenarGrillaRFND: function (lstRFNDGrilla) {
        var fileGrilla;
        if (lstRFNDGrilla.length > 0) {
            var storeData = Ext.create('Ext.data.Store', {
                data: lstRFNDGrilla,
                autoLoad: true
            });
            Ext.getCmp(prototype.idRfnd + '-det-gridDetCpn').bindStore(storeData);

            fileGrilla = lstRFNDGrilla[0];
            meDET.revCurr = fileGrilla.A713MDARV.trim();
            Ext.getCmp(prototype.idRfnd + '-det-lblTotalCpnCur').setValue(fileGrilla.A713MDARV.trim());
            //Ext.getCmp(prototype.idRfnd + '-det-lblTotalQCur').setValue(fileGrilla.A713MDARV);
            //Ext.getCmp(prototype.idRfnd + '-det-lblTotalYQCur').setValue(fileGrilla.A713MDARV);

            var totalCpn = 0.00;
            var totalQ = 0.00;
            //var totalYQ:Number = 0.00;
            var ticket = fileGrilla.TICKET;
            for (var i = 0; i < lstRFNDGrilla.length; i++) {
                totalCpn = totalCpn + lstRFNDGrilla[i].CPN;
                totalQ = totalQ + lstRFNDGrilla[i].Q;
                //totalYQ =  totalYQ + S0007A713Filter(lstRFNDGrilla.getItemAt(i)).YQ;
                //if (lstRFNDGrilla[i].TICKET !== ticket) {
                if (i === 4) {
                    ticket = lstRFNDGrilla[i].TICKET;
                    Ext.getCmp(prototype.idRfnd + '-det-lblTicket2').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_2').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_2').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_2').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_2').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblTicket2').getEl().update(ticket.substr(3, 10).trim());
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_2').setValue(lstRFNDGrilla[i].A713CUPON1.trim());
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_2').setValue(lstRFNDGrilla[i].A713CUPON2.trim());
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_2').setValue(lstRFNDGrilla[i].A713CUPON3.trim());
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_2').setValue(lstRFNDGrilla[i].A713CUPON4.trim());
                }
                if (i === 8) {
                    ticket = lstRFNDGrilla[i].TICKET;
                    Ext.getCmp(prototype.idRfnd + '-det-lblTicket3').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_3').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_3').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_3').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_3').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblTicket3').getEl().update(ticket.substr(3, 10).trim());
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_3').setValue(lstRFNDGrilla[i].A713CUPON1.trim());
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_3').setValue(lstRFNDGrilla[i].A713CUPON2.trim());
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_3').setValue(lstRFNDGrilla[i].A713CUPON3.trim());
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_3').setValue(lstRFNDGrilla[i].A713CUPON4.trim());
                }
            }
            Ext.getCmp(prototype.idRfnd + '-det-lblTotalCpn').setValue(Ext.util.Format.number(totalCpn, '0,000.00'));
            Ext.getCmp(prototype.idRfnd + '-det-lblTotalQ').setValue(Ext.util.Format.number(totalQ, '0,000.00'));
            Ext.getCmp(prototype.idRfnd + '-det-lblTotalYQ').setValue(Ext.util.Format.number(fileGrilla.A713TYQRV, '0,000.00'));
            Ext.getCmp(prototype.idRfnd + '-det-lblTotalIVA').setValue(Ext.util.Format.number(fileGrilla.A713TIVRV, '0,000.00'));
            Ext.getCmp(prototype.idRfnd + '-det-lblTotalCOM').setValue(Ext.util.Format.number(fileGrilla.A713TCOMRV, '0,000.00'));
            Ext.getCmp(prototype.idRfnd + '-det-lblTotalOVERCOM').setValue(Ext.util.Format.number(fileGrilla.A713TSCMRV, '0,000.00'));
        }
    },
    loadEMD: function (file) {
        Ext.Ajax.request({
            //url: prototype.url + '/loadEMDRfnd',
            url: this.url + '/loadEMDRfnd',
            method: 'POST',
            timeout: 60000000,
            params: {
                A713CIAI: file.A713CIAI,
                A713FORMAI: file.A713FORMAI,
                A713SERIEI: file.A713SERIEI,
                A713SEQ: file.A713SEQ
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstEMDRfnd = res.lstEMDRfnd;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstEMDRfnd,
                    autoLoad: true
                });
                Ext.getCmp(prototype.idRfnd + '-det-gridEMD').bindStore(storeData);
            }
        });
    },
    limpiarRubros: function () {
        // FOP
        Ext.getCmp(prototype.idRfnd + '-det-lblFOPCode1').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblCardType1').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblRefNumber1').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblFOPCur1').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblFOP1').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblFEXP1').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblCAPL1').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblCORRLFOP1').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblFOPCode2').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblCardType2').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblRefNumber2').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblFOPCur2').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblFOP2').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblFEXP2').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblCAPL2').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblCORRLFOP2').setValue('');
        // TAX
        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode1').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur1').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblPFC1').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblTAX1').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode2').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur2').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblPFC2').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblTAX2').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode3').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur3').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblPFC3').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblTAX3').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode4').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur4').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblPFC4').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblTAX4').setValue('');
        // COMM
        Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONRate1').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONCur1').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISION1').setValue('');
        // TAXCOMM
        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSIONCode1').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSIONRate1').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSIONCur1').setValue('');
        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSION1').setValue('');
    },
    loadRubros: function () {
        Ext.Ajax.request({
            //url: prototype.url + '/loadRubrosRfnd',
            url: this.url + '/loadRubrosRfnd',
            method: 'POST',
            timeout: 60000000,
            params: {
                A713CIAI: Ext.getCmp(prototype.idRfnd + '-det-lblCia').getValue(),
                A713FORMAI: Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().substr(0, 4),
                A713SERIEI: Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().substr(4, 6),
                A713SEQ: meDET.seq
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstTKT_FOP = res.lstTKT_FOP;
                var lstTKT_TAX = res.lstTKT_TAX;
                var lstTKT_COMM = res.lstTKT_COMM;
                var lstTKT_TAXCOMM = res.lstTKT_TAXCOMM;
                var lstTKT_FC = res.lstTKT_FC;
                var lstTKT_FCR = res.lstTKT_FCR;

                var file1;
                var file2;
                var file3;
                var file4;
                var file5;
                var file6;

                Ext.getCmp(prototype.idRfnd + '-det-lblRemmittance').setValue('0.00');
                Ext.getCmp(prototype.idRfnd + '-det-lblFOPOther').setValue('0.00');
                var fopother = 0.00;
                for (var y = 0; y < lstTKT_FOP.length; y++) {
                    file1 = lstTKT_FOP[y];
                    if (file1.A1731CORRL === "01") {
                        Ext.getCmp(prototype.idRfnd + '-det-lblFOPCode1').setValue(file1.A1731CFOP.trim());
                        Ext.getCmp(prototype.idRfnd + '-det-lblCardType1').setValue(file1.A1731TTARJ.trim());
                        Ext.getCmp(prototype.idRfnd + '-det-lblRefNumber1').setValue(file1.A1731NREF.trim());
                        Ext.getCmp(prototype.idRfnd + '-det-lblFOPCur1').setValue(file1.A1731MFOP.trim());
                        Ext.getCmp(prototype.idRfnd + '-det-lblFOP1').setValue(Ext.util.Format.number(file1.A1731VFOP, '0,000.00'));
                        Ext.getCmp(prototype.idRfnd + '-det-lblFEXP1').setValue(file1.A1731FEXP);
                        Ext.getCmp(prototype.idRfnd + '-det-lblCAPL1').setValue(file1.A1731CAPL);
                        Ext.getCmp(prototype.idRfnd + '-det-lblCORRLFOP1').setValue(file1.A1731CORRL);
                    }
                    if (file1.A1731CORRL === "02") {
                        Ext.getCmp(prototype.idRfnd + '-det-lblFOPCode2').setValue(file1.A1731CFOP.trim());
                        Ext.getCmp(prototype.idRfnd + '-det-lblCardType2').setValue(file1.A1731TTARJ.trim());
                        Ext.getCmp(prototype.idRfnd + '-det-lblRefNumber2').setValue(file1.A1731NREF.trim());
                        Ext.getCmp(prototype.idRfnd + '-det-lblFOPCur2').setValue(file1.A1731MFOP.trim());
                        Ext.getCmp(prototype.idRfnd + '-det-lblFOP2').setValue(Ext.util.Format.number(file1.A1731VFOP, '0,000.00'));
                        Ext.getCmp(prototype.idRfnd + '-det-lblFEXP2').setValue(file1.A1731FEXP);
                        Ext.getCmp(prototype.idRfnd + '-det-lblCAPL2').setValue(file1.A1731CAPL);
                        Ext.getCmp(prototype.idRfnd + '-det-lblCORRLFOP2').setValue(file1.A1731CORRL);
                    }
                    if (file1.A1731CORRL !== "01" && file1.A1731CORRL !== "02" && file1.A1731TFOP !== "EX") {
                        fopother += file1.A1731VFOP;
                    }
                    if (fopother !== 0) {
                        Ext.getCmp(prototype.idRfnd + '-det-lblFopOtherCur').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblFOPCur1').getValue());
                        Ext.getCmp(prototype.idRfnd + '-det-lblFOPOther').setValue(Ext.util.Format.number(fopother, '0,000.00'));
                    }
                    if (file1.A1731CFOP === "CA" && Ext.getCmp(prototype.idRfnd + '-det-lblRemmittanceCur').getValue().trim() === '') {
                        Ext.getCmp(prototype.idRfnd + '-det-lblRemmittanceCur').setValue(file1.A1731MNETR.trim());
                        Ext.getCmp(prototype.idRfnd + '-det-lblRemmittance').setValue(Ext.util.Format.number(file1.A1731VNETR, '0,000.00'));
                    }
                }

                Ext.getCmp(prototype.idRfnd + '-det-lblTAXOther').setValue('0.00');
                var taxother = 0.00;
                for (var y = 0; y < lstTKT_TAX.length; y++) {
                    file2 = lstTKT_TAX[y];
                    if (file2.A1732CORRL === "01") {
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode1').setValue(file2.A1732CTAX.trim());
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur1').setValue(file2.A1732MTAX.trim());
                        Ext.getCmp(prototype.idRfnd + '-det-lblPFC1').setValue(file2.A1732APFC.trim());
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAX1').setValue(Ext.util.Format.number(file2.A1732VTAX, '0,000.00'));
                    }
                    if (file2.A1732CORRL === "02") {
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode2').setValue(file2.A1732CTAX);
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur2').setValue(file2.A1732MTAX);
                        Ext.getCmp(prototype.idRfnd + '-det-lblPFC2').setValue(file2.A1732APFC);
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAX2').setValue(Ext.util.Format.number(file2.A1732VTAX, '0,000.00'));
                    }
                    if (file2.A1732CORRL === "03") {
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode3').setValue(file2.A1732CTAX);
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur3').setValue(file2.A1732MTAX);
                        Ext.getCmp(prototype.idRfnd + '-det-lblPFC3').setValue(file2.A1732APFC);
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAX3').setValue(Ext.util.Format.number(file2.A1732VTAX, '0,000.00'));
                    }
                    if (file2.A1732CORRL === "04") {
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode4').setValue(file2.A1732CTAX);
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur4').setValue(file2.A1732MTAX);
                        Ext.getCmp(prototype.idRfnd + '-det-lblPFC4').setValue(file2.A1732APFC);
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAX4').setValue(Ext.util.Format.number(file2.A1732VTAX, '0,000.00'));
                    }
                    if (file2.A1732CORRL !== "01" && file2.A1732CORRL !== "02" && file2.A1732CORRL !== "03" && file2.A1732CORRL !== "04") {
                        taxother += file2.A1732VTAX;
                    }
                    if (taxother !== 0) {
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXOtherCur').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblTAXCur1').getValue());
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXOther').setValue(Ext.util.Format.number(taxother, '0,000.00'));
                    }
                }

                Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONOther').setValue('0.00');
                var commother = 0.00;
                var commcur = '';
                for (var y = 0; y < lstTKT_COMM.length; y++) {
                    file3 = lstTKT_COMM[y];
                    if (file3.A1733TIPO === "CS") {
                        if (Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONCur1').getValue().trim() === '') {
                            Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONRate1').setValue(Ext.util.Format.number(file3.A1733RATE, '0,000.00'));
                            Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONCur1').setValue(file3.A1733MCOM);
                            Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISION1').setValue(Ext.util.Format.number(file3.A1733VCOM, '0,000.00'));
                            commcur = file3.A1733MCOM;
                        } else {
                            commother += file3.A1733VCOM;
                        }
                    }
                    if (file3.A1733TIPO === "CO") {
                        if (Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONCur2').getValue().trim() === '') {
                            Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONRate2').setValue(Ext.util.Format.number(file3.A1733RATE, '0,000.00'));
                            Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONCur2').setValue(file3.A1733MCOM);
                            Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISION2').setValue(Ext.util.Format.number(file3.A1733VCOM, '0,000.00'));
                            commcur = file3.A1733MCOM;
                        } else {
                            commother += file3.A1733VCOM;
                        }
                    }
                    if (commother !== 0) {
                        Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONCurOther').setValue(commcur);
                        Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISIONOther').setValue(Ext.util.Format.number(commother, '0,000.00'));
                    }
                }

                Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSIONOther').setValue('0.00');
                var taxcommother = 0.00;
                for (var y = 0; y < lstTKT_TAXCOMM.length; y++) {
                    file4 = lstTKT_TAXCOMM[y];
                    if (file4.A1734CORRL === "01") {
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSIONCode1').setValue(file4.A1734CTCOM);
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSIONRate1').setValue(Ext.util.Format.number(file4.A1734RATE, '0,000.00'));
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSIONCur1').setValue(file4.A1734MTXC);
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSION1').setValue(Ext.util.Format.number(file4.A1734VTXC, '0,000.00'));
                    }
                    if (file4.A1734CORRL !== "01") {
                        taxcommother += file4.A1734VTXC;
                    }
                    if (taxcommother !== 0) {
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSIONOtherCur').setValue(Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSIONCur1').getValue());
                        Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSIONOther').setValue(Ext.util.Format.number(taxcommother, '0,000.00'));
                    }
                }

                if (lstTKT_FC.length > 0) {
                    var strTexto = '';
                    for (var j = 0; j < lstTKT_FC.length; j++) {
                        file5 = lstTKT_FC[j];
                        strTexto += file5.A1735FRCA;
                    }
                    Ext.getCmp(prototype.idRfnd + '-det-lblReference').setValue(strTexto);
                }

                if (lstTKT_FCR.length > 0) {
                    var strTexto2 = '';
                    for (var k = 0; k < lstTKT_FCR.length; k++) {
                        file6 = lstTKT_FCR[k];
                        strTexto2 += file6.A1735FRCA;
                    }
                    Ext.getCmp(prototype.idRfnd + '-det-lblRelated').setValue(strTexto2);
                }
                Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').unmask('Loading...', '');
            }
        });
    },
    onFareCalc: function (obj) {
        var lblDocumento = Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().trim();
        var action = meDET.modo==='R'?'CLOSED':Ext.getCmp(prototype.idGr+ '-de-lblStatus').getValue().trim();
        if (lblDocumento !== '') {
            var win = new Ext.Praxis.view.sales.SalesReportForm.DataEntryFareCalcRfnd({
                params: {
                    params: meDET.paramsDET,
                    action:action
                }
            });
            win.show();
            /*var DataEntryFareCalcRfnd = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryFareCalcRfnd', {
                id: prototype.idRfnd + '-DataEntryFareCalcRfnd',
                params: paramsDET
            });
            DataEntryFareCalcRfnd.show();*/
        }
    },
    onFacsimil: function () {
        /*if(Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().trim() !== ''){
         var params = {};
         
         var bean104 = {};
         bean104.FUENTE = Ext.getCmp(prototype.idRfnd + '-det-lblSource').getValue().trim().substr(0,3);
         bean104.TDNR = Ext.getCmp(prototype.idRfnd + '-det-lblCia').getValue().trim() + Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().trim();
         bean104.AGTN = Ext.getCmp(prototype.idRfnd + '-det-lblIata').getValue().trim();
         
         params.bean = bean104;
         params.typeModal = 'FACSIMIL';
         Ext.create('Ext.Praxis.view.screens.ScrProrrateoNewForm', {
         id: 'ScrProrrateoNewForm',
         params: params
         }).show();
         }*/

        prototype.idFacsimil = prototype.idRfnd + 'compFacsimil';
        var viewFacsimil = Ext.create('Ext.Praxis.view.program.ProFacsimilForm.FacsimilNew', {
            id: prototype.idRfnd + '-facsimilComponent',
            params: paramsProrrate
        });
        viewFacsimil.show();
    },
    onProrrate: function () {
        /*if(Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().trim() !== ''){
         var params = {};
         
         var bean104 = {};
         bean104.FUENTE = Ext.getCmp(prototype.idRfnd + '-det-lblSource').getValue().trim().substr(0,3);
         bean104.TDNR = Ext.getCmp(prototype.idRfnd + '-det-lblCia').getValue().trim() + Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().trim();
         bean104.AGTN = Ext.getCmp(prototype.idRfnd + '-det-lblIata').getValue().trim();
         
         params.bean = bean104;
         params.strVoid = '';//this.gloA720TKVOID;
         params.typeModal = 'PRORATE';
         Ext.create('Ext.Praxis.view.screens.ScrProrrateoNewForm', {
         id: 'ScrProrrateoNewForm',
         params: params
         }).show();
         }*/
        prototype.idProrrate = prototype.idRfnd + 'compProrrate';
        var viewProrate = Ext.create('Ext.Praxis.view.program.ProrrateoForm.ProrrateoNew', {
            id: prototype.idRfnd + '-widget-prorratewin',
            params: paramsProrrate
        });
        //viewProrate.setParam(paramsProrrate);
        viewProrate.show();
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onClickBtnUpdateItinerary: function () {
        if (Ext.getCmp(prototype.idGr + '-de-lblStatus').getValue() === 'CLOSED') {
            global.Msg({
                msg: "The group is readonly"
            });
        } else {
            if(Ext.getCmp(prototype.idRfnd + '-det-lblCia').getValue().length!==3){
                Ext.Msg.alert('.: PRAXIS :.', 'Invalid Cia', function(btn, text){
                    if (btn === 'ok'){
                        meDET.onFocus('-det-lblCia');
                    }
                });
                return;
            }
            if(Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().length!==10){
                Ext.Msg.alert('.: PRAXIS :.', 'Invalid Document', function(btn, text){
                    if (btn === 'ok'){
                        meDET.onFocus('-det-lblDocumento');
                    }
                });
                return;
            }
            var VP_AIRLINE = meDET.paramsDET.IN_AIRLIN;
            var VP_CIA = Ext.getCmp(prototype.idRfnd + '-det-lblCia').getValue();
            var VP_FORMA = Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().substr(0, 4);
            var VP_SERIE = Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().substr(4, 6);
            var paramsUpd = {
                VP_AIRLINE: VP_AIRLINE,
                VP_CIA: VP_CIA,
                VP_FORMA: VP_FORMA,
                VP_SERIE: VP_SERIE,
                A713SEQ: meDET.seq
            };
            Ext.Msg.show({
                title: '.:PRAXISAM:.',
                msg: 'Are you sure to add an existing itinerary from sale?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        Ext.Ajax.request({
                            url: this.url2 + '/updateItinerary',
                            method: 'POST',
                            timeout: 60000000,
                            //params: paramsUpd,
                            params: {beanString: JSON.stringify(paramsUpd)},
                            beforerequest: Ext.getCmp(prototype.idRfnd + '-DataEntryRfnd-center').mask('Loading...', ''),
                            success: function (response, options) {
                                var res = Ext.JSON.decode(response.responseText);
                                //console.log(res);
                                //var data = res.objRtn;
                                var msj = res.data.dbException.MESSAGE;
                                var sqlCode = res.data.dbException.SQLCODE;
                                if (sqlCode !== '0') {
                                    global.Msg({
                                        msg: msj
                                    });
                                } else {
                                    global.Msg({
                                        msg: msj,
                                        icon: 1,
                                        fn: function () {
                                            Ext.Ajax.request({
                                                //url: prototype.url + '/loadTicketDataEntryRfnd',
                                                url: this.url + '/loadTicketDataEntryRfnd',
                                                method: 'POST',
                                                timeout: 60000000,
                                                params: meDET.paramsDET,
                                                //beforerequest: Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').mask('Loading...', ''),
                                                success: function (response, options) {
                                                    var res = Ext.JSON.decode(response.responseText);
                                                    var lstRFNDGrilla = res.lstRFNDGrilla;
                                                    meDET.llenarGrillaRFND(lstRFNDGrilla);
                                                }
                                            });
                                        }
                                    });
                                }
                                Ext.getCmp(prototype.idRfnd + '-DataEntryRfnd-center').unmask('Loading...', '');
                            }
                        });
                    }
                }
            });
        }
    },
    onClickBtnDelete: function () {
        if (Ext.getCmp(prototype.idGr + '-de-lblStatus').getValue() === 'CLOSED') {
            global.Msg({
                msg: "The group is readonly"
            });
        } else {
            if (Ext.getCmp(prototype.idGr + '-de-lblCapture').getValue().substr(0, 1) !== 'M') {
                global.Msg({
                    msg: "You can't delete ticket"
                });
            } else {
                if(Ext.getCmp(prototype.idRfnd + '-det-lblCia').getValue().length!==3){
                    Ext.Msg.alert('.: PRAXIS :.', 'Invalid Cia', function(btn, text){
                        if (btn === 'ok'){
                            meDET.onFocus('-det-lblCia');
                        }
                    });
                    return;
                }
                if(Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().length!==10){
                    Ext.Msg.alert('.: PRAXIS :.', 'Invalid Document', function(btn, text){
                        if (btn === 'ok'){
                            meDET.onFocus('-det-lblDocumento');
                        }
                    });
                    return;
                }
                if (Ext.getCmp(prototype.idRfnd + '-det-lblCia').getValue().trim() === '' || Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().trim() === '') {
                    global.Msg({
                        msg: "Incorrect document number"
                    });
                } else {
                    var VP_AIRLINE = meDET.paramsDET.IN_AIRLIN;
                    var VP_CIA = Ext.getCmp(prototype.idRfnd + '-det-lblCia').getValue();
                    var VP_FORMA = Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().substr(0, 4);
                    var VP_SERIE = Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().substr(4, 6);
                    var paramsDlt = {
                        VP_AIRLINE: VP_AIRLINE,
                        VP_CIA: VP_CIA,
                        VP_FORMA: VP_FORMA,
                        VP_SERIE: VP_SERIE,
                        A713SEQ: meDET.seq
                    };
                    Ext.Msg.show({
                        title: '.:PRAXISAM:.',
                        msg: 'Are you sure to delete document?',
                        buttons: Ext.MessageBox.YESNO,
                        scope: this,
                        icon: Ext.MessageBox.QUESTION,
                        modal: true,
                        fn: function (btn) {
                            if (btn === 'yes') {
                                Ext.Ajax.request({
                                    url: this.url2 + '/deleteTKT',
                                    method: 'POST',
                                    timeout: 60000000,
                                    //params: paramsDlt,
                                    params: {beanString: JSON.stringify(paramsDlt)},
                                    beforerequest: Ext.getCmp(prototype.idRfnd + '-DataEntryRfnd-center').mask('Loading...', ''),
                                    success: function (response, options) {
                                        Ext.getCmp(prototype.idRfnd + '-DataEntryRfnd-center').unmask('Loading...', '');
                                        var res = Ext.JSON.decode(response.responseText);
                                        var msj = res.data.dbException.MESSAGE;
                                        var sqlCode = res.data.dbException.SQLCODE;
                                        if (sqlCode !== '0') {
                                            global.Msg({
                                                msg: msj
                                            });
                                        } else {
                                            global.Msg({
                                                msg: msj,
                                                icon: 1,
                                                fn: function () {
                                                    this.view.close();
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        }
    },
    onAddCouponClickEmd: function () {
        if (Ext.getCmp(prototype.idGr + '-de-lblStatus').getValue() === 'CLOSED') {
            global.Msg({
                msg: "The ticket is readonly"
            });
        } else {
            var grid03 = Ext.getCmp(prototype.idRfnd + '-det-gridEMD');
            var regs3 = grid03.getStore().getCount();
            var beanDatosEmd = {};
            var ticket = Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue();
            beanDatosEmd.TKTEMD = Ext.getCmp(prototype.idRfnd + '-det-lblCia').getValue() + ticket;
            beanDatosEmd.CUPONEMD = regs3 + 1;
            if ((regs3 + 1) > 4){
                beanDatosEmd.CUPONEMD = 4;
            }
            beanDatosEmd.RFIC = '';
            beanDatosEmd.RFIS = '';
            grid03.getStore().add(beanDatosEmd);
            if(regs3===0){
                /* zpp var storeData3 = Ext.create('Ext.data.Store', {
                    data: beanDatosEmd,
                    autoLoad: true
                });
                Ext.getCmp(prototype.idRfnd + '-det-gridEMD').bindStore(storeData3);*/
                var gridEMD = Ext.getCmp(prototype.idRfnd + '-det-gridEMD');
                        gridEMD.getStore().add(beanDatosEmd);
            }
        }
    },
    onAddCouponClick: function () {
        if (Ext.getCmp(prototype.idGr + '-de-lblStatus').getValue() === 'CLOSED') {
            global.Msg({
                msg: "The ticket is readonly"
            });
        } else {
            var gridCpn = Ext.getCmp(prototype.idRfnd + '-det-gridDetCpn');
            var regCpn = gridCpn.getStore().getCount();
            var beanDatos = {};
            var ticket = '';
            if (regCpn >= 0 && regCpn < 4) {
                ticket = Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue();
                Ext.getCmp(prototype.idRfnd + '-det-lblTicket1').getEl().update(ticket);
            } else if (regCpn >= 4 && regCpn < 8) {
                var inttkt = Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().substr(2, 8);
                ticket = parseInt(inttkt) + 1;
                var valueValid = '00000000';
                var resultado = valueValid + ticket;
                resultado = resultado.substring(resultado.length - valueValid.length);
                ticket = Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().substr(0, 2) + resultado;
                if (regCpn === 4) {
                    Ext.getCmp(prototype.idRfnd + '-det-lblTicket2').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_2').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_2').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_2').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_2').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblTicket2').getEl().update(ticket);
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_2').setValue('');
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_2').setValue('');
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_2').setValue('');
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_2').setValue('');
                }
            } else {
                var inttkt = Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().substr(2, 8);
                ticket = parseInt(inttkt) + 2;
                var valueValid = '00000000';
                var resultado = valueValid + ticket;
                resultado = resultado.substring(resultado.length - valueValid.length);
                ticket = Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().substr(0, 2) + resultado;
                if (regCpn === 8) {
                    Ext.getCmp(prototype.idRfnd + '-det-lblTicket3').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_3').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_3').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_3').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_3').show();
                    Ext.getCmp(prototype.idRfnd + '-det-lblTicket3').getEl().update(ticket);
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_3').setValue('');
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_3').setValue('');
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_3').setValue('');
                    Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_3').setValue('');
                }
            }
            beanDatos.TICKET = Ext.getCmp(prototype.idRfnd + '-det-lblCia').getValue() + ticket;
            beanDatos.CUPON = regCpn + 1;
            beanDatos.CONEX = '';
            beanDatos.ORIGEN = '';
            beanDatos.DESTINO = '';
            beanDatos.CARRIER = 'AM';
            beanDatos.CLASE = '';
            beanDatos.FLIGHT = '';
            beanDatos.DFLIGHT = '';
            beanDatos.CARRIEROPE = 'AM';
            beanDatos.FLIGHTOPE = '';
            beanDatos.FAREBASIS = '';
            beanDatos.CPNCUR = meDET.revCurr;
            beanDatos.CPN = 0.00;
            beanDatos.Q = 0.00;
            beanDatos.YQ = 0.00;
            beanDatos.IVA = 0.00;
            beanDatos.COMM_G = 0.00;
            beanDatos.SCOMM = 0.00;
            beanDatos.CPNLOC = 0.00;
            beanDatos.USED = '';
            gridCpn.getStore().add(beanDatos);
            if(regCpn===0){
                /*zpp var storeData1 = Ext.create('Ext.data.Store', {
                    data: beanDatos,
                    autoLoad: true
                });
                Ext.getCmp(prototype.idRfnd + '-det-gridDetCpn').bindStore(storeData1);*/
                   var grid01 = Ext.getCmp(prototype.idRfnd + '-det-gridDetCpn');
                        grid01.getStore().add(beanDatos);
            }
        }
    },
    onRemoveCouponClickEmd: function (grid, rowIndex, colIndex) {
        var status = (meDET.modo==='R'?'CLOSED':Ext.getCmp(prototype.idGr + '-de-lblStatus').getValue());
        if (status === 'CLOSED') {
            global.Msg({
                msg: "The ticket is readonly"
            });
        } else {
            global.Msg({
                msg: 'Delete Coupon?',
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {
                        grid.getStore().removeAt(rowIndex);
                    }
                }
            });
        }
    },
    onRemoveCouponClick: function (grid, rowIndex, colIndex) {
        var status = (meDET.modo==='R'?'CLOSED':Ext.getCmp(prototype.idGr + '-de-lblStatus').getValue());
        if (status === 'CLOSED') {
            global.Msg({
                msg: "The ticket is readonly"
            });
        } else {
            global.Msg({
                msg: 'Delete Coupon?',
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {
                        grid.getStore().removeAt(rowIndex);
                        var regs = grid.getStore().getCount();
                        if (regs <= 4) {
                            Ext.getCmp(prototype.idRfnd + '-det-lblTicket2').hide();
                            Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_2').hide();
                            Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_2').hide();
                            Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_2').hide();
                            Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_2').hide();
                            Ext.getCmp(prototype.idRfnd + '-det-lblTicket2').getEl().update('');
                            Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_2').setValue('');
                            Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_2').setValue('');
                            Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_2').setValue('');
                            Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_2').setValue('');
                        }
                        if (regs <= 8) {
                            Ext.getCmp(prototype.idRfnd + '-det-lblTicket3').hide();
                            Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_3').hide();
                            Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_3').hide();
                            Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_3').hide();
                            Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_3').hide();
                            Ext.getCmp(prototype.idRfnd + '-det-lblTicket3').getEl().update('');
                            Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_3').setValue('');
                            Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_3').setValue('');
                            Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_3').setValue('');
                            Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_3').setValue('');
                        }
                        for (var i = 0; i < regs; i++) {
                            var obj = grid.getStore().getAt(i);
                            obj.set('CUPON', i + 1);
                        }
                    }
                }
            });
        }
    },
    onDelivery: function () {
        var bean = {};
        bean.TDNR = Ext.getCmp(prototype.idRfnd + '-det-lblCia').getValue().trim() + Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().trim();
        bean.FUENTE = Ext.getCmp(prototype.idRfnd + '-det-lblSource').getValue().trim().substr(0, 3);
        if (bean.TDNR !== '' && bean.FUENTE !== '') {
            bean.A720TKVOID = '';//this.gloA720TKVOID;
            this.searchDelivery(bean);
        }
    },
    searchDelivery: function (bean) {
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url + '/searchDeliveryRFND',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var texto = res.strTextoBSP;
                    if (texto !== '') {
                        Ext.create('Ext.Praxis.view.screens.CtrlDeliveryOrigForm', {
                            id: 'CtrlDeliveryOrigForm',
                            params: {
                                strTexto: texto,
                                strVoid: ''//me1.gloA720TKVOID
                            }
                        }).show();
                    }else{
                        if (Ext.getCmp(prototype.idRfnd + '-det-lblConjuction').getValue() === 'C'){
                            var ticket = '';
                            var inttkt = Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().substr(2, 8);
                            ticket = parseInt(inttkt) + 1;
                            var valueValid = '00000000';
                            var resultado = valueValid + ticket;
                            resultado = resultado.substring(resultado.length - valueValid.length);
                            ticket = Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().substr(0, 2) + resultado;
                            bean.TDNR = Ext.getCmp(prototype.idRfnd + '-det-lblCia').getValue().trim() + ticket;
                            Ext.Ajax.request({
                                url: prototype.ProrrateoNew.url + '/searchDeliveryRFND',
                                method: 'POST',
                                timeout: 60000000,
                                params: {beanString: JSON.stringify(bean)},
                                success: function (response, opts) {
                                    var res = Ext.JSON.decode(response.responseText);
                                    if (res.success) {
                                        var texto = res.strTextoBSP;
                                        if (texto !== '') {
                                            Ext.create('Ext.Praxis.view.screens.CtrlDeliveryOrigForm', {
                                                id: 'CtrlDeliveryOrigForm',
                                                params: {
                                                    strTexto: texto,
                                                    strVoid: ''//me1.gloA720TKVOID
                                                }
                                            }).show();
                                        }
                                    } else
                                        global.Msg({msg: res.sesion});
                                },
                                failure: function (response, opts) {
                                    console.log('server-side failure with status code ' + response.status);
                                }
                            });
                        }
                    }
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    onChangeTab: function (obj) {
        var idTab = obj.id;
        meDET.cant++;
        if (Ext.getCmp(idTab).getActiveTab().id === 'SalesReportFormRfnd-det-tabProrrateo' && meDET.cant === 1) {
            Ext.getCmp(prototype.idRfnd + '-widget-prorrate').setParam(paramsProrrate);
        }
    },
    onClickSearchFOP: function (obj) {
        var lblFOP = Ext.getCmp(prototype.idRfnd + '-det-lblFOP').getValue().trim();
        var lblDocumento = Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().trim();
        if(Ext.getCmp(prototype.idRfnd + '-det-lblCia').getValue().length!==3){
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Cia', function(btn, text){
                if (btn === 'ok'){
                    meDET.onFocus('-det-lblCia');
                }
            });
            return;
        }
        if(Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().length!==10){
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Document', function(btn, text){
                if (btn === 'ok'){
                    meDET.onFocus('-det-lblDocumento');
                }
            });
            return;
        }
        var action = (meDET.modo==='R'?'CLOSED':Ext.getCmp(prototype.idGr+ '-de-lblStatus').getValue().trim());
        //console.log(meDET.paramsDET);
        if (lblFOP !== '' && lblFOP.text !== '0.00' && lblDocumento !== '') {
            var win = new Ext.Praxis.view.sales.SalesReportForm.DataEntryFOPRfnd({
                params: {
                    params: meDET.paramsDET,
                    action:action
                }
            });
            win.show();
        }
    },
    onClickSearchTAX: function (obj) {
        var lblTAX = Ext.getCmp(prototype.idRfnd + '-det-lblTAX').getValue().trim();
        var lblDocumento = Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().trim();
        if(Ext.getCmp(prototype.idRfnd + '-det-lblCia').getValue().length!==3){
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Cia', function(btn, text){
                if (btn === 'ok'){
                    meDET.onFocus('-det-lblCia');
                }
            });
            return;
        }
        if(Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().length!==10){
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Document', function(btn, text){
                if (btn === 'ok'){
                    meDET.onFocus('-det-lblDocumento');
                }
            });
            return;
        }
        var action = (meDET.modo==='R'?'CLOSED':Ext.getCmp(prototype.idGr+ '-de-lblStatus').getValue().trim());
        if (lblTAX !== '' && lblTAX.text !== '0.00' && lblDocumento !== '') {
            var win = new Ext.Praxis.view.sales.SalesReportForm.DataEntryTAXRfnd({
                params: {
                    params: meDET.paramsDET,
                    action:action
                }
            });
            win.show();
        }
    },
    onClickSearchCOMM: function (obj) {
        var lblCOMM = Ext.getCmp(prototype.idRfnd + '-det-lblCOMMISION').getValue().trim();
        var lblDocumento = Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().trim();
        if(Ext.getCmp(prototype.idRfnd + '-det-lblCia').getValue().length!==3){
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Cia', function(btn, text){
                if (btn === 'ok'){
                    meDET.onFocus('-det-lblCia');
                }
            });
            return;
        }
        if(Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().length!==10){
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Document', function(btn, text){
                if (btn === 'ok'){
                    meDET.onFocus('-det-lblDocumento');
                }
            });
            return;
        }
        var action = (meDET.modo==='R'?'CLOSED':Ext.getCmp(prototype.idGr+ '-de-lblStatus').getValue().trim());
        if (lblCOMM !== '' && lblCOMM.text !== '0.00' && lblDocumento !== '') {
            var win = new Ext.Praxis.view.sales.SalesReportForm.DataEntryCOMMRfnd({
                params: {
                    params: meDET.paramsDET,
                    action:action
                }
            });
            win.show();
            /*var DataEntryCOMMRfnd = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryCOMMRfnd', {
                id: prototype.idRfnd + '-dataEntyCOMMRfnd',
                params: paramsDET
            });
            DataEntryCOMMRfnd.show();*/
        }
    },
    onClickSearchTAXCOMM: function (obj) {
        var lblTAXCOMM = Ext.getCmp(prototype.idRfnd + '-det-lblTAXCOMMISSION').getValue().trim();
        var lblDocumento = Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().trim();
        if(Ext.getCmp(prototype.idRfnd + '-det-lblCia').getValue().length!==3){
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Cia', function(btn, text){
                if (btn === 'ok'){
                    meDET.onFocus('-det-lblCia');
                }
            });
            return;
        }
        if(Ext.getCmp(prototype.idRfnd + '-det-lblDocumento').getValue().length!==10){
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Document', function(btn, text){
                if (btn === 'ok'){
                    meDET.onFocus('-det-lblDocumento');
                }
            });
            return;
        }
        var action = (meDET.modo==='R'?'CLOSED':Ext.getCmp(prototype.idGr+ '-de-lblStatus').getValue().trim());
        if (lblTAXCOMM !== '' && lblTAXCOMM.text !== '0.00' && lblDocumento !== '') {
            var win = new Ext.Praxis.view.sales.SalesReportForm.DataEntryTAXCOMMRfnd({
                params: {
                    params: meDET.paramsDET,
                    action:action
                }
            });
            win.show();
            /*var DataEntryTAXCOMMRfnd = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryTAXCOMMRfnd', {
                id: prototype.idRfnd + '-dataEntyTAXCOMMRfnd',
                params: paramsDET
            });
            DataEntryTAXCOMMRfnd.show();*/
        }
    },
    validacionGeneral: function () {
        meDET.validador = 0;
        var tarifaCur = Ext.getCmp(prototype.idRfnd + '-det-lblFareCur').getValue().trim();
        var equivalentCur = Ext.getCmp(prototype.idRfnd + '-det-lblEQVCur').getValue().trim();
        if(tarifaCur === equivalentCur){
            meDET.validador = 1;
            Ext.Msg.alert('.: PRAXIS :.', 'Same Currency (Fare and Equivalent)', function(btn, text){
                if (btn === 'ok'){
                    meDET.onFocus('-det-lblFareCur');
                }
            });
            return;
        }
        if(equivalentCur === '' && tarifaCur !== meDET.locCurr){
            meDET.validador = 1;
            Ext.Msg.alert('.: PRAXIS :.', 'Different Currency (Fare vs Group)', function(btn, text){
                if (btn === 'ok'){
                    meDET.onFocus('-det-lblFareCur');
                }
            });
            return;
        }
        /*else if(equivalentCur !== '' && equivalentCur.length < 3){
            meDET.validador = 1;
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Currency (Equivalent)', function(btn, text){
                if (btn === 'ok'){
                    meDET.onFocus('-det-lblEQVCur');
                }
            });
            return;
        }else if(discountCur !== '' && discountCur.length < 3){
            meDET.validador = 1;
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Currency (Discount)', function(btn, text){
                if (btn === 'ok'){
                    meDET.onFocus('-det-lblDiscountCur');
                }
            });
            return;
        }*/
        var grid01 = Ext.getCmp(prototype.idRfnd + '-det-gridDetCpn');
        var regs = grid01.getStore().getCount();
        if(regs === 0){
            meDET.validador = 1;
            global.Msg({
                msg: "Please, enter Routing"
            });
            return;
        }
        var cupon1_1 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_1').getValue().trim();
        var cupon2_1 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_1').getValue().trim();
        var cupon3_1 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_1').getValue().trim();
        var cupon4_1 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_1').getValue().trim();
        
        var cupon1_2 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_2').getValue().trim();
        var cupon2_2 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_2').getValue().trim();
        var cupon3_2 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_2').getValue().trim();
        var cupon4_2 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_2').getValue().trim();
        
        var cupon1_3 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_3').getValue().trim();
        var cupon2_3 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_3').getValue().trim();
        var cupon3_3 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_3').getValue().trim();
        var cupon4_3 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_3').getValue().trim();
        if(regs>=1 && regs<=4){
            if(cupon1_1 === '' && cupon2_1 === '' && cupon3_1 === '' && cupon4_1 === ''){
                meDET.validador = 1;
                global.Msg({
                    msg: "Please, enter coupon number"
                });
                return;
            }
        }
        if(regs>=5 && regs<=8){
            if(cupon1_1 === '' && cupon2_1 === '' && cupon3_1 === '' && cupon4_1 === '' &&
               cupon1_2 === '' && cupon2_2 === '' && cupon3_2 === '' && cupon4_2 === ''){
                meDET.validador = 1;
                global.Msg({
                    msg: "Please, enter coupon number"
                });
                return;
            }
        }
        if(regs>=9 && regs<=12){
            if(cupon1_1 === '' && cupon2_1 === '' && cupon3_1 === '' && cupon4_1 === '' &&
               cupon1_2 === '' && cupon2_2 === '' && cupon3_2 === '' && cupon4_2 === '' &&
               cupon1_3 === '' && cupon2_3 === '' && cupon3_3 === '' && cupon4_3 === ''){
                meDET.validador = 1;
                global.Msg({
                    msg: "Please, enter coupon number"
                });
                return;
            }
        }
        if(regs>12){
            meDET.validador = 1;
            global.Msg({
                msg: "Please, Contact System Area"
            });
            return;
        }
        if(grid01.getStore().getAt(0).data.CARRIER==='' || grid01.getStore().getAt(0).data.CARRIER==='**' || grid01.getStore().getAt(0).data.CARRIER==='..'){
            meDET.validador = 1;
            global.Msg({
                msg: "Invalid Carrier in first coupon"
            });
            return;
        }
        var tdoc = Ext.getCmp(prototype.idRfnd + '-det-lblDocType').getValue().trim();
        if(Ext.getCmp(prototype.idRfnd + '-det-lblFOPCur1').getValue().trim() === '' && tdoc!=='VOID'){
            meDET.validador = 1;
            global.Msg({
                msg: "Please, enter FOP Information"
            });
            return;
        }
        var ciuAnterior = '';
        for(var i = 0; i < regs; i++){
            var obj = grid01.getStore().getAt(i).data;
            if(tdoc.substr(0, 3) === 'TKT'){
                if(obj.ORIGEN!==ciuAnterior && i>0){
                    meDET.validador = 1;
                    global.Msg({
                        msg: "Non-consecutive Itinerary"
                    });
                    break;
                }
                ciuAnterior = obj.DESTINO;
            }
            if(obj.ORIGEN===obj.DESTINO && obj.ORIGEN!==''){
                meDET.validador = 1;
                global.Msg({
                    msg: "Repeated sector. Not valid"
                });
                break;
            }
            if((obj.ORIGEN==='' && obj.DESTINO!=='') || (obj.ORIGEN!=='' && obj.DESTINO==='')){
                meDET.validador = 1;
                global.Msg({
                    msg: "Invalid Sector"
                });
                break;
            }
            if(obj.ORIGEN==='' && obj.DESTINO===''){
                if(tdoc==='EMDS' || tdoc==='VOU'){
                    if(obj.CARRIER===''){
                        meDET.validador = 1;
                        global.Msg({
                            msg: "Please, enter carrier"
                        });
                        break;
                    }
                }else{
                    meDET.validador = 1;
                    global.Msg({
                        msg: "Invalid Sector"
                    });
                    break;
                }
            }
            var ciudades = ['MEX','MTY','GDL','CUN','ACA','TLC','VER','MID','AGU','BJX','CME','CJS','TIJ','HMO','QRO','TAP','VSA','ZCL','ZIH',
                'SEA','MIA','CHI','SFO','DFW','DEN','BOS','LAS','LAX','HOU','EWR','NYC','JFK','WAS','PHL','DTT','SAC','SJC','ORL',
                'YVR','HAV','GUA','PAN','UIO','MED','BOG','SAO','GRU','EZE','BUE','SCL','LIM','LON','AMS','PAR','CDG','BCN','MAD','TYO','SEL','ICN'];
            if(obj.ORIGEN!=='' && ciudades.indexOf(obj.ORIGEN) === -1){
                this.validaCity(obj.ORIGEN);
                if (meDET.validador === 1){
                    break;
                }
            }
            if(obj.DESTINO!=='' && ciudades.indexOf(obj.DESTINO) === -1){
                this.validaCity(obj.DESTINO);
                if (meDET.validador === 1){
                    break;
                }
            }
            if(obj.CARRIER===''){
                meDET.validador = 1;
                global.Msg({
                    msg: "Invalid Carrier"
                });
                break;
            }
            var carrier = ['AM','VW','5D','DL','UA','AS','BA','CM','7H','AF','AA','LA','BW','AV','**','..'];
            if(carrier.indexOf(obj.CARRIER) === -1){
                this.validaCarrier(obj.CARRIER);
                if (meDET.validador === 1){
                    break;
                }
            }
            if(obj.FAREBASIS.trim()==='' && obj.CARRIER!=='**' && obj.CARRIER!=='..'){
                meDET.validador = 1;
                global.Msg({
                    msg: "F.Basis in blank"
                });
                break;
            }
        }
        if (meDET.validador === 1){
            return;
        }
        this.validaCuponItinerario(regs,cupon2_1,cupon3_1,cupon4_1,cupon1_2,cupon2_2,cupon3_2,cupon4_2,cupon1_3,cupon2_3,cupon3_3,cupon4_3);
        if (meDET.validador === 1){
            return;
        }
        if(tdoc.substr(0, 3) === 'EMD'){
            this.validaEMD(tdoc);
            if (meDET.validador === 1){
                return;
            }
        }
        if(tdoc!=='VOID'){
            this.validaFOP(tdoc);
            if (meDET.validador === 1){
                return;
            }
            this.validaTAX(tdoc);
            if (meDET.validador === 1){
                return;
            }
        }
    },
    validaCuponItinerario: function(tot,cupon2_1,cupon3_1,cupon4_1,cupon1_2,cupon2_2,cupon3_2,cupon4_2,cupon1_3,cupon2_3,cupon3_3,cupon4_3){
        if((tot===1 && (cupon2_1 !== '' || cupon3_1 !== '' || cupon4_1 !== '')) ||
           (tot===2 && (cupon3_1 !== '' || cupon4_1 !== '')) ||
           (tot===3 && (cupon4_1 !== '')) ||
           (tot===4 && (cupon1_2 !== '' || cupon2_2 !== '' || cupon3_2 !== '' || cupon4_2 !== '')) ||
           (tot===5 && (cupon2_2 !== '' || cupon3_2 !== '' || cupon4_2 !== '')) ||
           (tot===6 && (cupon3_2 !== '' || cupon4_2 !== '')) ||
           (tot===7 && (cupon4_2 !== '')) ||
           (tot===8 && (cupon1_3 !== '' || cupon2_3 !== '' || cupon3_3 !== '' || cupon4_3 !== '')) ||
           (tot===9 && (cupon2_3 !== '' || cupon3_3 !== '' || cupon4_3 !== '')) ||
           (tot===10 && (cupon3_3 !== '' || cupon4_3 !== '')) ||
           (tot===11 && (cupon4_3 !== ''))){
            meDET.validador = 1;
            global.Msg({
                msg: "Coupon doesn't exist in itinerary"
            });
            return;
        }
    },
    validaEMD: function(tdoc){
        var grid02 = Ext.getCmp(prototype.idRfnd + '-det-gridEMD');
        var regs2 = grid02.getStore().getCount();
        console.log("emd: "+regs2);
        if(regs2 === 0){
            meDET.validador = 1;
            global.Msg({
                msg: "Please, complete EMD information"
            });
            return;
        }
        var rficAnterior = '';
        for(var x = 0; x < regs2; x++){
            var obj = grid02.getStore().getAt(x).data;
            if(obj.RFIC!==rficAnterior && x>0){
                meDET.validador = 1;
                global.Msg({
                    msg: "The RFIC has to be the same"
                });
                break;
            }
            rficAnterior = obj.RFIC;
            if(obj.RFIC.trim()==='' || obj.RFIS.trim()===''){
                meDET.validador = 1;
                global.Msg({
                    msg: "RFIC/RFIS in blank"
                });
                break;
            }
            console.log("rfic: "+obj.RFIC);
            this.validaTipoEMD(obj.RFIC,obj.RFIS,tdoc);
            if (meDET.validador === 1){
                break;
            }
        }
    },
    validaFOP: function(tdoc){
        if(tdoc!=='CANX'){
            if(Ext.getCmp(prototype.idRfnd + '-det-lblFOPCode1').getValue().trim()===''){
                meDET.validador = 1;
                Ext.Msg.alert('.: PRAXIS :.', 'Please, enter FOP information', function(btn, text){
                    if (btn === 'ok'){
                        meDET.onFocus('-det-lblFOPCode1');
                    }
                });
                return;
            }
            var codefop = Ext.getCmp(prototype.idRfnd + '-det-lblFOPCode1').getValue();
            var ttarj = Ext.getCmp(prototype.idRfnd + '-det-lblCardType1').getValue();
            var ntarj = Ext.getCmp(prototype.idRfnd + '-det-lblRefNumber1').getValue();
            var tfop = parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblFOP1').getValue().replace(new RegExp(',', 'g'), ''));
            this.validacamposFOP(codefop,ttarj,ntarj,tfop,1);
            
            codefop = Ext.getCmp(prototype.idRfnd + '-det-lblFOPCode2').getValue();
            ttarj = Ext.getCmp(prototype.idRfnd + '-det-lblCardType2').getValue();
            ntarj = Ext.getCmp(prototype.idRfnd + '-det-lblRefNumber2').getValue();
            tfop = parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblFOP2').getValue().replace(new RegExp(',', 'g'), ''));
            if(codefop!=='' || ttarj!=='' || ntarj!=='' || isNaN(tfop)!==true){
                this.validacamposFOP(codefop,ttarj,ntarj,tfop,2);
            }
        }
    },
    validaTAX: function(tdoc){
        if(tdoc!=='CANX'){
            if(Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode1').getValue().trim()!==''){
                if(Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode1').getValue().length < 2){
                    meDET.validador = 1;
                    Ext.Msg.alert('.: PRAXIS :.', 'Invalid Code', function(btn, text){
                        if (btn === 'ok'){
                            meDET.onFocus('-det-lblTAXCode1');
                        }
                    });
                    return;
                }
                var ctax = Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode1').getValue().trim();
                var pfc = Ext.getCmp(prototype.idRfnd + '-det-lblPFC1').getValue().trim();
                var ttax = parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblTAX1').getValue().replace(new RegExp(',', 'g'), ''));
                this.validacamposTAX(ctax,pfc,ttax,1);
            }
            if(Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode2').getValue().trim()!==''){
                if(Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode2').getValue().length < 2){
                    meDET.validador = 1;
                    Ext.Msg.alert('.: PRAXIS :.', 'Invalid Code', function(btn, text){
                        if (btn === 'ok'){
                            meDET.onFocus('-det-lblTAXCode2');
                        }
                    });
                    return;
                }
                var ctax = Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode2').getValue().trim();
                var pfc = Ext.getCmp(prototype.idRfnd + '-det-lblPFC2').getValue();
                var ttax = parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblTAX2').getValue().replace(new RegExp(',', 'g'), ''));
                this.validacamposTAX(ctax,pfc,ttax,2);
            }
            if(Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode3').getValue().trim()!==''){
                if(Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode3').getValue().length < 2){
                    meDET.validador = 1;
                    Ext.Msg.alert('.: PRAXIS :.', 'Invalid Code', function(btn, text){
                        if (btn === 'ok'){
                            meDET.onFocus('-det-lblTAXCode3');
                        }
                    });
                    return;
                }
                var ctax = Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode3').getValue().trim();
                var pfc = Ext.getCmp(prototype.idRfnd + '-det-lblPFC3').getValue();
                var ttax = parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblTAX3').getValue().replace(new RegExp(',', 'g'), ''));
                this.validacamposTAX(ctax,pfc,ttax,3);
            }
            if(Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode4').getValue().trim()!==''){
                if(Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode4').getValue().length < 2){
                    meDET.validador = 1;
                    Ext.Msg.alert('.: PRAXIS :.', 'Invalid Code', function(btn, text){
                        if (btn === 'ok'){
                            meDET.onFocus('-det-lblTAXCode4');
                        }
                    });
                    return;
                }
                var ctax = Ext.getCmp(prototype.idRfnd + '-det-lblTAXCode4').getValue().trim();
                var pfc = Ext.getCmp(prototype.idRfnd + '-det-lblPFC4').getValue();
                var ttax = parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblTAX4').getValue().replace(new RegExp(',', 'g'), ''));
                this.validacamposTAX(ctax,pfc,ttax,4);
            }
        }
    },
    validacamposFOP: function(codefop,ttarj,ntarj,tfop,op){
        if (tfop===0 || isNaN(tfop)===true) {
            meDET.validador = 1;
            Ext.Msg.alert('.: PRAXIS :.', 'Please, enter Amount', function(btn, text){
                if (btn === 'ok'){
                    if(op===1){
                        meDET.onFocus('-det-lblFOP1');
                    }else{
                        meDET.onFocus('-det-lblFOP2');
                    }
                }
            });
            return;
        }
        if(codefop.trim()===''){
            meDET.validador = 1;
            Ext.Msg.alert('.: PRAXIS :.', 'Please, enter FOP information', function(btn, text){
                if (btn === 'ok'){
                    if(op===1){
                        meDET.onFocus('-det-lblFOPCode1');
                    }else{
                        meDET.onFocus('-det-lblFOPCode2');
                    }
                }
            });
            return;
        }
        if (codefop === 'CA') {
            if(op===1){
                Ext.getCmp(prototype.idRfnd + '-det-lblCardType1').setValue('');
                Ext.getCmp(prototype.idRfnd + '-det-lblRefNumber1').setValue('');
            }else{
                Ext.getCmp(prototype.idRfnd + '-det-lblCardType2').setValue('');
                Ext.getCmp(prototype.idRfnd + '-det-lblRefNumber2').setValue('');
            }
        }
        if (codefop === 'CC') {
            if (ttarj === '') {
                meDET.validador = 1;
                Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card you must enter the card type', function(btn, text){
                    if (btn === 'ok'){
                        if(op===1){
                            meDET.onFocus('-det-lblCardType1');
                        }else{
                            meDET.onFocus('-det-lblCardType2');
                        }
                    }
                });
                return;
            }
            if (ntarj === '') {
                meDET.validador = 1;
                Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card, you must enter the card number', function(btn, text){
                    if (btn === 'ok'){
                        if(op===1){
                            meDET.onFocus('-det-lblRefNumber1');
                        }else{
                            meDET.onFocus('-det-lblRefNumber2');
                        }
                    }
                });
                return;
            }
            var captura = (meDET.modo==='R'?'A':Ext.getCmp(prototype.idGr + '-de-lblCapture').getValue().substr(0, 1));
            if(captura==='M'){
                // VISA/MASTERCARD (16 caracteres)
                if(ttarj==='VI' || ttarj==='MC' || ttarj==='CA' || ttarj==='DC' || ttarj==='IK' || ttarj==='BA'){
                    if(!(this.tiene_numeros(ntarj.substr(0, 6))===1 && (ntarj.substr(6, 6)==='******' || ntarj.substr(6, 6)==='XXXXXX') && this.tiene_numeros(ntarj.substr(12, 4))===1)){
                        meDET.validador = 1;
                        Ext.Msg.alert('.: PRAXIS :.', 'Invalid card number', function(btn, text){
                            if (btn === 'ok'){
                                if(op===1){
                                    meDET.onFocus('-det-lblRefNumber1');
                                }else{
                                    meDET.onFocus('-det-lblRefNumber2');
                                }
                            }
                        });
                        return;
                    }
                }//AMERICAN EXPRESS (15 caracteres)
                else if(ttarj==='AX'){
                    if(!(this.tiene_numeros(ntarj.substr(0, 6))===1 && (ntarj.substr(6, 5)==='******' || ntarj.substr(6, 5)==='XXXXXX') && this.tiene_numeros(ntarj.substr(11, 4))===1)){
                        meDET.validador = 1;
                        Ext.Msg.alert('.: PRAXIS :.', 'Invalid card number', function(btn, text){
                            if (btn === 'ok'){
                                if(op===1){
                                    meDET.onFocus('-det-lblRefNumber1');
                                }else{
                                    meDET.onFocus('-det-lblRefNumber2');
                                }
                            }
                        });
                        return;
                    }
                }
            }
            if (ntarj.length < 15) {
                meDET.validador = 1;
                Ext.Msg.alert('.: PRAXIS :.', 'Invalid card number', function(btn, text){
                    if (btn === 'ok'){
                        if(op===1){
                            meDET.onFocus('-det-lblRefNumber1');
                        }else{
                            meDET.onFocus('-det-lblRefNumber2');
                        }
                    }
                });
                return;
            }
        }
    },
    validacamposTAX: function(ctax,pfc,ttax,op){
        if ((ctax==='XF' || pfc!=='') && pfc.length<3) {
            meDET.validador = 1;
            Ext.Msg.alert('.: PRAXIS :.', 'Please, enter Airport', function(btn, text){
                if (btn === 'ok'){
                    if(op===1){
                        meDET.onFocus('-det-lblPFC1');
                    }else if(op===2){
                        meDET.onFocus('-det-lblPFC2');
                    }else if(op===3){
                        meDET.onFocus('-det-lblPFC3');
                    }else{
                        meDET.onFocus('-det-lblPFC4');
                    }
                }
            });
            return;
        }
        if (ttax===0 || isNaN(ttax)===true) {
            meDET.validador = 1;
            Ext.Msg.alert('.: PRAXIS :.', 'Please, enter Amount', function(btn, text){
                if (btn === 'ok'){
                    if(op===1){
                        meDET.onFocus('-det-lblTAX1');
                    }else if(op===2){
                        meDET.onFocus('-det-lblTAX2');
                    }else if(op===3){
                        meDET.onFocus('-det-lblTAX3');
                    }else{
                        meDET.onFocus('-det-lblTAX4');
                    }
                }
            });
            return;
        }
    },
    validaCurrency: function(currency){
        Ext.Ajax.request({
            async: false,
            //url: prototype.url + '/loadA006',
            url: this.url + '/loadA006',
            method: 'POST',
            timeout: 60000000,
            params: {
                A006KEY: currency
            },
            beforerequest: Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.objA006.A006RES === 0) {
                    meDET.validador = 1;
                    /*global.Msg({
                        msg: "Invalid Currency: " + currency
                    });*/
                }
                Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').unmask('Loading...', '');
            }
        });
    },
    validaIata: function(iata){
        Ext.Ajax.request({
            async: false,
            //url: prototype.url + '/loadA003',
            url: this.url + '/loadA003',
            method: 'POST',
            timeout: 60000000,
            params: {
                A003KEY: iata,
                A003PSALF: Ext.getCmp(prototype.idRfnd + '-det-lblSource').getValue().substr(4, 2)
            },
            beforerequest: Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lst = res.lst;
                if (lst.length === 0) {
                    meDET.validador = 1;
                    /*global.Msg({
                        msg: "Agency code not found: " + iata + ", in country:" + Ext.getCmp(prototype.idRfnd + '-det-lblSource').getValue().substr(4, 2)
                    });*/
                }
                Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').unmask('Loading...', '');
            }
        });
    },
    validaTipoEMD: function(rfic,rfis,tdoc){
        Ext.Ajax.request({
            async: false,
            //url: prototype.url + '/loadA1772',
            url: this.url + '/loadA1772',
            method: 'POST',
            timeout: 60000000,
            params: {
                A1772RFIC: rfic,
                A1772SUBCD: rfis
            },
            beforerequest: Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.objA1772.A1772EMD.trim() === '') {
                    meDET.validador = 1;
                    global.Msg({
                        msg: "RFIC/RFIS not found"
                    });
                }else{
                   if ((res.objA1772.A1772EMD).length < 4) {
                       meDET.validador = 1;
                       global.Msg({
                           msg: "EMD Type in blank"
                       });
                   }else{
                       if(res.objA1772.A1772EMD!==tdoc){
                            meDET.validador = 1;
                            global.Msg({
                                msg: "Different EMD Type with Doc. Type"
                            }); 
                       }
                   }
                }
                Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').unmask('Loading...', '');
            }
        });
    },
    validaCity: function(city){
        Ext.Ajax.request({
            async: false,
            //url: prototype.url + '/loadA1007',
            url: this.url + '/loadA1007',
            method: 'POST',
            timeout: 60000000,
            params: {
                A1007CTATO: city
            },
            beforerequest: Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.objA1007.A1007RES === 0) {
                    meDET.validador = 1;
                    global.Msg({
                        msg: "Invalid City: " + city
                    });
                }
                Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').unmask('Loading...', '');
            }
        });
    },
    validaCarrier: function(carrier){
        Ext.Ajax.request({
            async: false,
            //url: prototype.url + '/loadA005',
            url: this.url + '/loadA005',
            method: 'POST',
            timeout: 60000000,
            params: {
                A005KEY1: carrier
            },
            beforerequest: Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.objA005.A005RES === 0) {
                    meDET.validador = 1;
                    global.Msg({
                        msg: "Invalid Carrier: " + carrier
                    });
                }
                Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').unmask('Loading...', '');
            }
        });
    },
    onClickBtnSave: function(){
        if (Ext.getCmp(prototype.idGr + '-de-lblStatus').getValue() === 'CLOSED') {
            global.Msg({
                msg: "The ticket is readonly"
            });
        } else {
            var me = this;
            me.onBlurValueCia(Ext.getCmp(prototype.idRfnd + '-det-lblCia'));
            if (meDET.validador !== 0){
                return;
            }
            me.onBlurValueTicket(Ext.getCmp(prototype.idRfnd + '-det-lblDocumento'));
            if (meDET.validador !== 0){
                return;
            }
            me.onBlurValueFecha(Ext.getCmp(prototype.idRfnd + '-det-lblIssueDate'));
            if (meDET.validador !== 0) {
                return;
            }
            me.onBlurValueIata(Ext.getCmp(prototype.idRfnd + '-det-lblIata'));
            if (meDET.validador !== 0){
                return;
            }
            me.onBlurValueCurrency(Ext.getCmp(prototype.idRfnd + '-det-lblFareCur'));
            if (meDET.validador !== 0){
                return;
            }
            me.validacionGeneral();
            if (meDET.validador !== 0){
                return;
            }
            console.log(meDET.validador);
            //Para EMDS actualizar valores de prorrateo
            //Actualizar A713FARE con el valor de Tarifa o Equivalente
            var lstCupones = {};
            var lstEmd = {};
            var paramsGuardar = {};
            var lst = new Array();
            for (var i = 0; i < Ext.getCmp(prototype.idRfnd + '-det-gridDetCpn').getStore().data.length; i++) {
                var bean = Ext.getCmp(prototype.idRfnd + '-det-gridDetCpn').getStore().data.items[i].data;
                var beantkt = {};
                beantkt.TICKET = bean.TICKET;
                beantkt.CUPON = bean.CUPON;
                beantkt.CONEX = bean.CONEX;
                beantkt.ORIGEN = bean.ORIGEN;
                beantkt.DESTINO = bean.DESTINO;
                beantkt.CARRIER = bean.CARRIER;
                beantkt.CLASE = bean.CLASE;
                beantkt.FLIGHT = bean.FLIGHT;
                beantkt.DFLIGHT = bean.DFLIGHT;
                beantkt.FAREBASIS = bean.FAREBASIS;
                if(i<4){
                    beantkt.CUPON1 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_1').getValue();
                    beantkt.CUPON2 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_1').getValue();
                    beantkt.CUPON3 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_1').getValue();
                    beantkt.CUPON4 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_1').getValue();
                }
                if(i>=4 && i<8){
                    beantkt.CUPON1 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_2').getValue();
                    beantkt.CUPON2 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_2').getValue();
                    beantkt.CUPON3 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_2').getValue();
                    beantkt.CUPON4 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_2').getValue();
                }
                if(i>=8){
                    beantkt.CUPON1 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn1_3').getValue();
                    beantkt.CUPON2 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn2_3').getValue();
                    beantkt.CUPON3 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn3_3').getValue();
                    beantkt.CUPON4 = Ext.getCmp(prototype.idRfnd + '-det-lblCpn4_3').getValue();
                }
                lst.push(beantkt);
            }
            lstCupones.A713 = lst;
            paramsGuardar.VP_AIRLINE = meDET.paramsDET.IN_AIRLIN;
            paramsGuardar.VP_CIA = meDET.paramsDET.IN_CIA;
            paramsGuardar.VP_FORMA = meDET.paramsDET.IN_FORMA;
            paramsGuardar.VP_SERIE = meDET.paramsDET.IN_SERIE;
            paramsGuardar.VP_SEQ = meDET.paramsDET.A713SEQ;
            
            paramsGuardar.A713DCHEQ = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblDigito').getValue());
            paramsGuardar.A713TRNCU = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblTransaction').getValue());
            paramsGuardar.A713TDOC = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblDocType').getValue());
            paramsGuardar.A713TRNN = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblTransactionNbr').getValue());
            paramsGuardar.A713TRNSQ = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblSeq').getValue());
            paramsGuardar.A713AGENTE = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblIata').getValue());
            paramsGuardar.A713CODIT = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblTourCode').getValue());
            paramsGuardar.A713MONEDA = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblFareCur').getValue());
            paramsGuardar.A713TARIFA = 0;
            if(!isNaN(parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblFare').getValue().replace(new RegExp(',', 'g'), '')))){
                paramsGuardar.A713TARIFA = parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblFare').getValue().replace(new RegExp(',', 'g'), ''));
            }
            paramsGuardar.A713MDAPAG = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblEQVCur').getValue());
            paramsGuardar.A713TRFPAG = 0;
            if(!isNaN(parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblEQV').getValue().replace(new RegExp(',', 'g'), '')))){
                paramsGuardar.A713TRFPAG = parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblEQV').getValue().replace(new RegExp(',', 'g'), ''));
            }
            paramsGuardar.A713MDDS = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblDiscountCur').getValue());
            paramsGuardar.A713VDSCT = 0;
            if(!isNaN(parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblDiscount').getValue().replace(new RegExp(',', 'g'), '')))){
                paramsGuardar.A713VDSCT = parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblDiscount').getValue().replace(new RegExp(',', 'g'), ''));
            }
            paramsGuardar.A713GRUPO = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblGroup').getValue());
            paramsGuardar.A713IDFIL = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblFileId').getValue());
            if (Ext.getCmp(prototype.idRfnd + '-det-lblSource').getValue().substr(0, 3) === 'ARC')
                paramsGuardar.A713ORIG = 'A';
            if (Ext.getCmp(prototype.idRfnd + '-det-lblSource').getValue().substr(0, 3) === 'BSP')
                paramsGuardar.A713ORIG = 'B';
            if (Ext.getCmp(prototype.idRfnd + '-det-lblSource').getValue().substr(0, 3) === 'ASR')
                paramsGuardar.A713ORIG = 'S';
            if (Ext.getCmp(prototype.idRfnd + '-det-lblSource').getValue().substr(0, 3) === 'MAN')
                paramsGuardar.A713ORIG = 'M';
            paramsGuardar.A713PAIS = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblSource').getValue().substr(4, 2));
            paramsGuardar.A713FECVTA = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblIssueDate').getValue());
            paramsGuardar.TICKETAUTH = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblAuthorityNumber').getValue());
            paramsGuardar.A713MDAFA = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblFARE2Cur').getValue());
            paramsGuardar.A713FARE = 0;
            if(!isNaN(parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblFARE2').getValue().replace(new RegExp(',', 'g'), '')))){
                paramsGuardar.A713FARE = parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblFARE2').getValue().replace(new RegExp(',', 'g'), ''));
            }
            paramsGuardar.A713TCAMB = 0;
            if(!isNaN(parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblExchangeRate').getValue().replace(new RegExp(',', 'g'), '')))){
                paramsGuardar.A713TCAMB = parseFloat(Ext.getCmp(prototype.idRfnd + '-det-lblExchangeRate').getValue().replace(new RegExp(',', 'g'), ''));
            }
            paramsGuardar.REFERENCE = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblReference').getValue());
            paramsGuardar.RELATED = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblRelated').getValue());
            
            var lst2 = new Array();
            if(paramsGuardar.A713TDOC.substr(0, 3) === 'EMD'){
                for (var i = 0; i < Ext.getCmp(prototype.idRfnd + '-det-gridEMD').getStore().data.length; i++) {
                    var beanemd = Ext.getCmp(prototype.idRfnd + '-det-gridEMD').getStore().data.items[i].data;
                    var beantktemd = {};
                    beantktemd.TKTEMD = beanemd.TKTEMD;
                    beantktemd.CUPONEMD = beanemd.CUPONEMD;
                    beantktemd.RFIC = beanemd.RFIC;
                    beantktemd.RFIS = beanemd.RFIS;
                    lst2.push(beantktemd);
                }
            }
            lstEmd.A713EMD = lst2;
            
            var mask = new Ext.LoadMask(Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd'), {
                msg: 'Please Wait....'
            });
            mask.show();
            Ext.Ajax.request({
                url: this.url2 + '/maintenanceRfnd',
                timeout: 60000000,
                method: 'POST',
                params: {beanString: JSON.stringify(paramsGuardar),
                    beanlstCupones: JSON.stringify(lstCupones),
                    beanlstEmd: JSON.stringify(lstEmd)
                },
                success: function (response, options) {
                    mask.hide();
                    var res = Ext.JSON.decode(response.responseText);
                    var vp_icon = 0;
                    if (res.data === 'RECORD INSERTED') {
                        vp_icon = 1;
                    }
                    global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                        if (vp_icon === 1) {
                            me.getDataInputs();
                            //Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').getController().cargarTotales();
                        }
                    }});
                }
            });
        }
    }
});