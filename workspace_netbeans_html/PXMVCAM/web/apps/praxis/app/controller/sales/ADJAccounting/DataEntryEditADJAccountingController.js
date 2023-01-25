/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.ADJAccounting.DataEntryEditADJAccountingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryEditController',
    url: CONTEXTPATH + '/ADJAccounting',
    paramsDE: {},
    /**
     * Constructor
     */
    init: function(view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        var p = this.view.params;
        this.setStoreData();
        this.getDataInputs();
    },
    setStoreData: function() {
        var cmbTypeBusq = Ext.getCmp(prototype.id + '-de-cmbTypeBusq');
        cmbTypeBusq.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["0", "Select"],
                ["1", "Accounting Adjustment"],
                ["2", "Use Adjustment"]

            ]
        }));
        cmbTypeBusq.setValue("0");

        var cmbTRx = Ext.getCmp(prototype.id + '-de-cmbTRx');
        cmbTRx.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["1", "Sale"],
                ["2", "Exch"],
                ["3", "Rfnd"],
                ["4", "Adm/Acm"],
                ["5", "Flown"],
                ["6", "Excp"],
                ["7", "Rfcp"],
                ["8", "IXP"],
                ["9", "DISC"],
                ["10", "IXC Prime"],
                ["11", "IXC Rejections"],
                ["13", "EMD-Flown"]
            ]
        }));
        cmbTRx.setValue("");
        var cmbTYPEUSE = Ext.getCmp(prototype.id + '-de-cmbTYPEUSE');
        cmbTYPEUSE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["0", "Select"],
                ["AA0001", "Used Coupon Annulment"],
                ["AA0002", "Duplicated Coupon Reversion"]
            ]
        }));
        cmbTYPEUSE.setValue("0");
        var cmbTYUSEASS = Ext.getCmp(prototype.id + '-de-cmbTYUSEASS');
        cmbTYUSEASS.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["99", "Select"],
                ["0", "NO"],
                ["1", "SI"]
            ]
        }));
        cmbTYUSEASS.setValue("99");
    },
    getDataInputs: function() {

        var p = this.view.params;
        var data = p.rec.data;
        paramsDE = {
            VP_FILTER: '4',
            VP_CIA: data.A2024CIA,
            VP_FORMA: data.A2024FORMA,
            VP_SERIE: data.A2024SERIE,
            A2024CORRL: data.SEQ,
            A2024SEQ: data.A2024SEQ,
            VP_GRUPO: data.A2024CUPON,
            A2024ESTADO: data.A2024ESTADO
        };

        Ext.Ajax.request({
            url: prototype.url + '/loadTicketEdit',
            method: 'POST',
            timeout: 60000000,
            params: paramsDE,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryEdit').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var listaData = res.data;
                if (listaData.length > 0) {
                    var storeData = Ext.create('Ext.data.Store', {
                        data: listaData,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-de-gridCorrectData').bindStore(storeData);

                    var TotalDebit = 0;
                    var TotalCredit = 0;
                    var TotalDebitUSD = 0;
                    var TotalCreditUSD = 0;

                    for (var i = 0; i < listaData.length; i++) {
                        var item = listaData[i];
                        TotalDebit = TotalDebit + item.A2024DEBLOC;//DEBIT
                        TotalCredit = TotalCredit + item.A2024CRELOC;// CREDIT                         
                        TotalDebitUSD = TotalDebitUSD + item.A2024DEBREV;// debit
                        TotalCreditUSD = TotalCreditUSD + item.A2024CREREV; //credit
                    }

                    Ext.getCmp(prototype.id + '-de-lblA1716ACTIGL6').setText(Ext.util.Format.number(TotalDebit, '0,000.00'));
                    Ext.getCmp(prototype.id + '-de-lblA1716PASIGL6').setText(Ext.util.Format.number(TotalCredit, '0,000.00'));
                    Ext.getCmp(prototype.id + '-de-lblA1716TOTALGL6').setText(Ext.util.Format.number(TotalDebitUSD, '0,000.00'));
                    Ext.getCmp(prototype.id + '-de-lblA1716SALDO6').setText(Ext.util.Format.number(TotalCreditUSD, '0,000.00'));


                    var item = listaData[0];
                    console.log(item);
                    Ext.getCmp(prototype.id + '-de-txtTicket').setValue(item.A2024FORMA + '' + item.A2024SERIE);
                    Ext.getCmp(prototype.id + '-de-txaReference').setValue(item.A2024DESCRIP);
                    Ext.getCmp(prototype.id + '-de-lblTtarjeta').setValue(item.A2024TTARJ);
                    Ext.getCmp(prototype.id + '-de-lblNtarjeta').setValue(item.A2024NTARJ);
                    Ext.getCmp(prototype.id + '-de-lblRfig').setValue(item.A2024RFIC);
                    Ext.getCmp(prototype.id + '-de-lblRfis').setValue(item.A2024RFIS);
                    Ext.getCmp(prototype.id + '-de-lblVRic').setValue(item.A2024VRICOC);
                    Ext.getCmp(prototype.id + '-de-lblFsale').setValue(item.A2024FECVTA);
                    Ext.getCmp(prototype.id + '-de-lblIATA').setValue(item.A2024AGENT);
                    Ext.getCmp(prototype.id + '-de-lblGroup').setValue(item.GRUPO);
                    //Ext.getCmp(prototype.id + '-de-lblTdoc').setValue(item.A2024TDOC);
                    Ext.getCmp(prototype.id + '-de-txtAffectation').setValue(item.A2024IATAUSU);
                    Ext.getCmp(prototype.id + '-de-lblTRNC').setValue(item.A2024TRNC);
                    Ext.getCmp(prototype.id + '-de-txtCrtBy').setValue(item.A2024USRIN);
                    Ext.getCmp(prototype.id + '-de-lblPROCESSDATE').setValue(item.A2024FECIN);
                    Ext.getCmp(prototype.id + '-de-txtCupon1s').setValue(item.A2024CUPON);
                    Ext.getCmp(prototype.id + '-de-TKTREFE').setValue(item.REFE);
                    Ext.getCmp(prototype.id + '-de-TKTSEQ').setValue(item.TKTSEQ);
                    Ext.getCmp(prototype.id + '-de-lblCARRIER').setValue(item.A2024SFUEN);



                    Ext.getCmp(prototype.id + '-de-cmbTYPEUSE').setValue(item.VP_TypeUse);
                    Ext.getCmp(prototype.id + '-de-lblFBASIS').setValue(item.FBASIS);
                    Ext.getCmp(prototype.id + '-de-Commision').setValue(item.ESTA_TNU);
                    console.log((" " + item.VP_TypeVoid + " ").trim());
                    Ext.getCmp(prototype.id + '-de-cmbTYUSEASS').setValue((" " + item.VP_TypeVoid + " ").trim());
                    Ext.getCmp(prototype.id + '-de-cmbTRx').setValue(item.VP_TTRAX);
                    Ext.getCmp(prototype.id + '-de-lblCurrency').setValue(item.A1541MDAVE);
                    Ext.getCmp(prototype.id + '-de-lblCurrencyREV').setValue(item.A1541MREVE);


                    Ext.getCmp(prototype.id + '-de-lblAmount').setValue(Ext.util.Format.number(item.A1541VCPVE, '0,000.00'));
                    Ext.getCmp(prototype.id + '-de-lblCommision').setValue(Ext.util.Format.number(item.A1541LCMVE, '0,000.00'));
                    Ext.getCmp(prototype.id + '-de-lblSCommision').setValue(Ext.util.Format.number(item.A1541LSCMV, '0,000.00'));
                    Ext.getCmp(prototype.id + '-de-lblYQ').setValue(Ext.util.Format.number(item.A1541LYQVE, '0,000.00'));
                    Ext.getCmp(prototype.id + '-de-lblTC').setValue(Ext.util.Format.number(item.A1541TCRVE, '0,000.00'));
                    Ext.getCmp(prototype.id + '-de-lblAmountREV').setValue(Ext.util.Format.number(item.A1541VCPRV, '0,000.00'));
                    Ext.getCmp(prototype.id + '-de-lblCommisionREV').setValue(Ext.util.Format.number(item.A1541RCMVE, '0,000.00'));
                    Ext.getCmp(prototype.id + '-de-lblSCommisionREV').setValue(Ext.util.Format.number(item.A1541RSCMV, '0,000.00'));
                    Ext.getCmp(prototype.id + '-de-lblYQREV').setValue(Ext.util.Format.number(item.A1541RYQVE, '0,000.00'));
                    Ext.getCmp(prototype.id + '-de-Commision').setValue(data.ESTA_TNU);

                    if (option2 === '5' || option2 === '13') {

                    }

                    var option = data.VP_TPCMBO;
                    var option2 = data.VP_TTRAX;

                    if (option === '1') {
                        Ext.getCmp(prototype.id + '-de-cmbTypeBusq').setValue('1');
                        Ext.getCmp(prototype.id + '-de-panelCombos').hide();
                        Ext.getCmp(prototype.id + '-de-panelCorrecDataLoc').show();
                        Ext.getCmp(prototype.id + '-de-panelCorrecDataLocLabel').show();
                        Ext.getCmp(prototype.id + '-de-panelOriginalDataRevLabel').show();
                        Ext.getCmp(prototype.id + '-de-panelOriginalDataRev').show();
                        Ext.getCmp(prototype.id + '-de-carrielLabel').show();
                        Ext.getCmp(prototype.id + '-de-lblCARRIER').show();

                    } else {
                        Ext.getCmp(prototype.id + '-de-cmbTypeBusq').setValue('2');
                        Ext.getCmp(prototype.id + '-de-panelCombos').show();

                        Ext.getCmp(prototype.id + '-de-carrielLabel').show();
                        Ext.getCmp(prototype.id + '-de-lblCARRIER').show();

                        if (option2 === '5' || option2 === '13') {
                            Ext.getCmp(prototype.id + '-de-panelCorrecDataLoc').hide();
                            Ext.getCmp(prototype.id + '-de-panelCorrecDataLocLabel').hide();
                            Ext.getCmp(prototype.id + '-de-panelOriginalDataRevLabel').show();
                            Ext.getCmp(prototype.id + '-de-panelOriginalDataRev').show();
                        } else {
                            Ext.getCmp(prototype.id + '-de-panelCorrecDataLoc').show();
                            Ext.getCmp(prototype.id + '-de-panelCorrecDataLocLabel').show();
                            Ext.getCmp(prototype.id + '-de-panelOriginalDataRevLabel').show();
                            Ext.getCmp(prototype.id + '-de-panelOriginalDataRev').show();
                        }
                    }




                } else {
                    global.Msg({
                        msg: 'Data not found.'
                    });
                }

                Ext.getCmp(prototype.id + '-dataEntryEdit').unmask('Loading...', '');

            }
        });
    },
    disableComponents: function() {
        Ext.getCmp(prototype.id + '-de-txaReference').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCia').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtTicket').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCupon1').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCupon2').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCupon3').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCupon4').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtAffectation').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCrtBy').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-cmbTRx').setDisabled(true);
        Ext.getCmp(prototype.id + '-de-cmbTYPEUSE').setDisabled(true);
        Ext.getCmp(prototype.id + '-de-cmbTYUSEASS').setDisabled(true);
        Ext.getCmp(prototype.id + '-de-TKTREFE').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-TKTSEQ').setReadOnly(true);

        Ext.getCmp(prototype.id + '-de-panelCorrecData1').hide();
        Ext.getCmp(prototype.id + '-de-panelCorrecData2').hide();
        Ext.getCmp(prototype.id + '-de-panelCorrecData3').hide();
        Ext.getCmp(prototype.id + '-de-panelCorrecData4').hide();
        Ext.getCmp(prototype.id + '-de-panelOptions').hide();

    },
    getDataEntryValues: function(strOption) {

        var CUPON = '';
        var txtCia = Ext.getCmp(prototype.id + '-de-txtCia').getValue().trim();
        var txtTicket = Ext.getCmp(prototype.id + '-de-txtTicket').getValue().trim();
        var txtCupon1 = Ext.getCmp(prototype.id + '-de-txtCupon1').getValue().trim();
        var txtCupon2 = Ext.getCmp(prototype.id + '-de-txtCupon2').getValue().trim();
        var txtCupon3 = Ext.getCmp(prototype.id + '-de-txtCupon3').getValue().trim();
        var txtCupon4 = Ext.getCmp(prototype.id + '-de-txtCupon4').getValue().trim();
        var opt = Ext.getCmp(prototype.id + '-de-cmbTRx').getValue().trim();



        if (txtCupon1 !== '' && txtCupon2 === '' && txtCupon3 === '' && txtCupon4 === '') {
            CUPON = txtCupon1;
        }
        if (txtCupon1 === '' && txtCupon2 !== '' && txtCupon3 === '' && txtCupon4 === '') {
            CUPON = txtCupon2;
        }
        if (txtCupon1 === '' && txtCupon2 === '' && txtCupon3 !== '' && txtCupon4 === '') {
            CUPON = txtCupon3;
        }
        if (txtCupon1 === '' && txtCupon2 === '' && txtCupon3 === '' && txtCupon4 !== '') {
            CUPON = txtCupon4;
        }
        var TTarjeta = Ext.getCmp(prototype.id + '-de-lblFareCurrency').getValue().trim();
        var NTarjeta = Ext.getCmp(prototype.id + '-de-lblEqFarePaidCurrency').getValue().trim();
        var RFic = Ext.getCmp(prototype.id + '-de-lblCommisionCurrency').getValue().trim();
        var RFis = Ext.getCmp(prototype.id + '-de-lblTax1Code').getValue().trim();
        var VRic = Ext.getCmp(prototype.id + '-de-lblTax2Code').getValue().trim();
        var FSale = Ext.getCmp(prototype.id + '-de-lblTax3Code').getValue().trim();
        var IATA = Ext.getCmp(prototype.id + '-de-lblTotalAmountCurrency').getValue().trim();
        var CARRIER = Ext.getCmp(prototype.id + '-de-lblCARRIERNEW').getValue().trim();
        var CurrencyLocal = Ext.getCmp(prototype.id + '-de-lblCurrencyNEW').getValue().trim();

        var AmountLocal = Ext.getCmp(prototype.id + '-de-lblAmountNEW').getValue().trim();
        if (AmountLocal === '') {
            AmountLocal = 0;
        }
        var CommisionLocal = Ext.getCmp(prototype.id + '-de-lblCommisionNEW').getValue().trim();
        if (CommisionLocal === '') {
            CommisionLocal = 0;
        }
        var SCommisionLocal = Ext.getCmp(prototype.id + '-de-lblSCommisionNEW').getValue().trim();
        if (SCommisionLocal === '') {
            SCommisionLocal = 0;
        }
        var YQLocal = Ext.getCmp(prototype.id + '-de-lblYQNEW').getValue().trim();
        if (YQLocal === '') {
            YQLocal = 0;
        }
        var TCRev = Ext.getCmp(prototype.id + '-de-lblTCNEW').getValue().trim();
        if (TCRev === '') {
            TCRev = 0;
        }
        var AmountRev = Ext.getCmp(prototype.id + '-de-lblAmountREVNEW').getValue().trim();
        if (AmountRev === '') {
            AmountRev = 0;
        }
        var CurrencyRev = Ext.getCmp(prototype.id + '-de-lblCurrencyREVNEW').getValue().trim();
        if (CurrencyRev === '') {
            CurrencyRev = 0;
        }
        var CommisionRev = Ext.getCmp(prototype.id + '-de-lblCommisionREVNEW').getValue().trim();
        if (CommisionRev === '') {
            CommisionRev = 0;
        }
        var SCommisionRev = Ext.getCmp(prototype.id + '-de-lblSCommisionREVNEW').getValue().trim();
        if (SCommisionRev === '') {
            SCommisionRev = 0;
        }
        var YQRev = Ext.getCmp(prototype.id + '-de-lblYQREVNEW').getValue().trim();
        if (YQRev === '') {
            YQRev = 0;
        }
        var CREDIT = Ext.getCmp(prototype.id + '-de-lblTFOPNEW').getValue().trim();
        var FBASIS = Ext.getCmp(prototype.id + '-de-lblFBASISE').getValue().trim();
        var lblGroup = Ext.getCmp(prototype.id + '-de-lblGroup').getValue().trim();
        var lblTRNC = Ext.getCmp(prototype.id + '-de-lblTRNC').getValue().trim();
        var lblDate = Ext.getCmp(prototype.id + '-de-lblDate').getValue().trim();
        // var txtFilterSeq = Ext.getCmp(prototype.id + '-de-txtFilterSeq').getValue().trim();
        var txtFilterSeq = '';
        var VP_TypeUse = Ext.getCmp(prototype.id + '-de-cmbTYPEUSE').getValue().trim();
        var VP_TypeVoid = Ext.getCmp(prototype.id + '-de-cmbTYUSEASS').getValue().trim();
        var txaReference = Ext.getCmp(prototype.id + '-de-txaReference').getValue().trim();
        var lblTicketcia = Ext.getCmp(prototype.id + '-de-lblTicketcia').getValue().trim();
        var lblTicketNEW = Ext.getCmp(prototype.id + '-de-lblTicketNEW').getValue().trim();
        var TKTREFE = Ext.getCmp(prototype.id + '-de-TKTREFE').getValue().trim();
        var TKTSEQ = Ext.getCmp(prototype.id + '-de-TKTSEQ').getValue().trim();
        var txtAffectation = Ext.getCmp(prototype.id + '-de-txtAffectation').getValue().trim(); //Completar con ceros hasta llegar a 8
        txtAffectation = global.fillZero(txtAffectation, 8);
        var VP_TNU = Ext.getCmp(prototype.id + '-de-Commision').getValue();
        if (VP_TNU) {
            VP_TNU = '1';
        } else {
            VP_TNU = '0';
        }


        return {
            VP_FILTER: opt,
            CIA: txtCia,
            FORMA: txtTicket.substring(0, 4),
            SERIE: txtTicket.substring(4, 10),
            A2024GRUPO: lblGroup,
            A2024TRNC: lblTRNC,
            A2024FECIN: lblDate,
            A2024TTARJ: TTarjeta,
            A2024NTARJ: NTarjeta,
            A2024RFIC: RFic,
            A2024RFIS: RFis,
            A2024VRICOC: VRic,
            A2024FECVTA: FSale,
            A2024AGENT: IATA,
            A2024SFUEN: CARRIER,
            A1541VCPVE: AmountLocal,
            A1541MDAVE: CurrencyLocal,
            A1541LCMVE: CommisionLocal,
            A1541LSCMV: SCommisionLocal,
            A1541LYQVE: YQLocal,
            A1541TCRVE: TCRev,
            A1541VCPRV: AmountRev,
            A1541MREVE: CurrencyRev,
            A1541RCMVE: CommisionRev,
            A1541RSCMV: SCommisionRev,
            A1541RYQVE: YQRev,
            SEQ: txtFilterSeq,
            VP_TypeUse: VP_TypeUse,
            VP_TypeVoid: VP_TypeVoid,
            A2024DESCRIP: txaReference,
            A2024IATAUSU: txtAffectation,
            A1531TFOP: CREDIT,
            CIANEW: lblTicketcia,
            FORMANEW: lblTicketNEW.substring(0, 4),
            SERIENEW: lblTicketNEW.substring(4, 10),
            VP_TPCMBO: '3',
            A2024CUPON: CUPON,
            ESTA_TNU: VP_TNU,
            FBASIS: FBASIS,
            REFE: TKTREFE,
            TKTSEQ: TKTSEQ

        };
    },
    onBtnSearch: function() {

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
            });
        } else {
            Ext.Ajax.request({
                url: prototype.url + '/loadTicket',
                method: 'POST',
                timeout: 60000000,
                params: paramsDE,
                beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...', ''),
                success: function(response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var listaData = res.data;
                    if (listaData.length > 0) {
                        var item = listaData[0];
                        console.log(item);

                        Ext.getCmp(prototype.id + '-de-lblTtarjeta').setValue(item.A720FBST1);
                        Ext.getCmp(prototype.id + '-de-lblNtarjeta').setValue(item.A720SUBPA1);
                        Ext.getCmp(prototype.id + '-de-lblRfig').setValue(item.A720RFIC);
                        Ext.getCmp(prototype.id + '-de-lblRfis').setValue(item.A720MDATC);
                        Ext.getCmp(prototype.id + '-de-lblVRic').setValue(item.A720NSTOCK);
                        Ext.getCmp(prototype.id + '-de-lblFsale').setValue(item.A720FECVTA);
                        Ext.getCmp(prototype.id + '-de-lblIATA').setValue(item.A720NBDA1);
                        Ext.getCmp(prototype.id + '-de-lblGroup').setValue(item.A720GRUPO);
                        //Ext.getCmp(prototype.id + '-de-lblTdoc').setValue(item.A2024TDOC);
                        Ext.getCmp(prototype.id + '-de-lblIATATrx').setValue(item.A720AGENTE);
                        Ext.getCmp(prototype.id + '-de-lblDate').setValue(item.A720FVLO3);
                        Ext.getCmp(prototype.id + '-de-lblCurrency').setValue(item.A1541MDAVE);
                        Ext.getCmp(prototype.id + '-de-lblCommisionREV').setValue(item.A1541RCMVE);




                        Ext.getCmp(prototype.id + '-de-lblAmount').setValue(Ext.util.Format.number(item.A1541VCPVE, '0,000.00'));
                        Ext.getCmp(prototype.id + '-de-lblCommision').setValue(Ext.util.Format.number(item.A1541LCMVE, '0,000.00'));
                        Ext.getCmp(prototype.id + '-de-lblSCommision').setValue(Ext.util.Format.number(item.A1541LSCMV, '0,000.00'));
                        Ext.getCmp(prototype.id + '-de-lblYQ').setValue(Ext.util.Format.number(item.A1541LYQVE, '0,000.00'));
                        Ext.getCmp(prototype.id + '-de-lblTC').setValue(Ext.util.Format.number(item.A1541TCRVE, '0,000.00'));
                        Ext.getCmp(prototype.id + '-de-lblAmountREV').setValue(Ext.util.Format.number(item.A1541VCPRV, '0,000.00'));
                        Ext.getCmp(prototype.id + '-de-lblCommisionREV').setValue(Ext.util.Format.number(item.A1541RCMVE, '0,000.00'));
                        Ext.getCmp(prototype.id + '-de-lblSCommisionREV').setValue(Ext.util.Format.number(item.A1541RSCMV, '0,000.00'));
                        Ext.getCmp(prototype.id + '-de-lblYQREV').setValue(Ext.util.Format.number(item.A1541RYQVE, '0,000.00'));

                    } else {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }

                    Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...', '');

                }
            });
        }


    },
    validateFields: function() {
        var opt = Ext.getCmp(prototype.id + '-de-cmbTRx').getValue();
        var txtCia = Ext.getCmp(prototype.id + '-de-txtCia').getValue();
        var txtTicket = Ext.getCmp(prototype.id + '-de-txtTicket').getValue();
        var txtCupon1 = Ext.getCmp(prototype.id + '-de-txtCupon1').getValue();
        var txtCupon2 = Ext.getCmp(prototype.id + '-de-txtCupon2').getValue();
        var txtCupon3 = Ext.getCmp(prototype.id + '-de-txtCupon3').getValue();
        var txtCupon4 = Ext.getCmp(prototype.id + '-de-txtCupon4').getValue();
        var txtSeq = Ext.getCmp(prototype.id + '-de-txtSeq').getValue();
        var CUPON = '';
        var msj = '';
        if (opt === '0') {
            msj = 'SELECT TRANSATION';
            return msj;
        }
        if (txtCia.trim() === '') {
            msj = 'Enter Cia';
            return msj;
        }
        if (txtTicket.trim() === '') {
            msj = 'Enter Cia';
            return msj;
        }
        if (opt === '5' || opt === '6' || opt === '7' || opt === '8' || opt === '9') {
            if (txtCupon1 !== '' && txtCupon2 !== '' && txtCupon3 !== '' && txtCupon4 !== '') {
                msj = 'Enter One Cupon';
                return msj;
            }
            if (txtCupon1 === '' && txtCupon2 !== '' && txtCupon3 !== '' && txtCupon4 !== '') {
                msj = 'Enter One Cupon';
                return msj;
            }
            if (txtCupon1 !== '' && txtCupon2 === '' && txtCupon3 !== '' && txtCupon4 !== '') {
                msj = 'Enter One Cupon';
                return msj;
            }
            if (txtCupon1 !== '' && txtCupon2 !== '' && txtCupon3 === '' && txtCupon4 !== '') {
                msj = 'Enter One Cupon';
                return msj;
            }
            if (txtCupon1 !== '' && txtCupon2 !== '' && txtCupon3 !== '' && txtCupon4 === '') {
                msj = 'Enter One Cupon';
                return msj;
            }
            if (txtCupon1 === '' && txtCupon2 === '' && txtCupon3 === '' && txtCupon4 === '') {
                msj = 'Enter One Cupon';
                return msj;
            }
            if (txtCupon1 !== '' && txtCupon2 !== '' && txtCupon3 === '' && txtCupon4 === '') {
                msj = 'Enter One Cupon';
                return msj;
            }
            if (txtCupon1 !== '' && txtCupon2 === '' && txtCupon3 !== '' && txtCupon4 === '') {
                msj = 'Enter One Cupon';
                return msj;
            }
            if (txtCupon1 !== '' && txtCupon2 === '' && txtCupon3 === '' && txtCupon4 !== '') {
                msj = 'Enter One Cupon';
                return msj;
            }

            if (txtCupon1 === '' && txtCupon2 !== '' && txtCupon3 !== '' && txtCupon4 === '') {
                msj = 'Enter One Cupon';
                return msj;
            }
            if (txtCupon1 !== '' && txtCupon2 !== '' && txtCupon3 === '' && txtCupon4 !== '') {
                msj = 'Enter One Cupon';
                return msj;
            }
            if (txtCupon1 === '' && txtCupon2 === '' && txtCupon3 !== '' && txtCupon4 !== '') {
                msj = 'Enter One Cupon';
                return msj;
            }
            if (txtCupon1 === '' && txtCupon2 !== '' && txtCupon3 === '' && txtCupon4 !== '') {
                msj = 'Enter One Cupon';
                return msj;
            }

            if (txtCupon1 !== '' && txtCupon2 === '' && txtCupon3 === '' && txtCupon4 === '') {
                CUPON = txtCupon1;
            }
            if (txtCupon1 === '' && txtCupon2 !== '' && txtCupon3 === '' && txtCupon4 === '') {
                CUPON = txtCupon2;
            }
            if (txtCupon1 === '' && txtCupon2 === '' && txtCupon3 !== '' && txtCupon4 === '') {
                CUPON = txtCupon3;
            }
            if (txtCupon1 === '' && txtCupon2 === '' && txtCupon3 === '' && txtCupon4 !== '') {
                CUPON = txtCupon4;
            }
        }

        paramsDE = {
            strOption: opt,
            A720CIA: txtCia,
            A720FORMA: txtTicket.substring(0, 4),
            A720SERIE: txtTicket.substring(4, 10),
            A720SEQ: txtSeq,
            A720CARRIER: CUPON
        };
        return msj;
    },
    validateFieldsInsert: function() {

        var opt = Ext.getCmp(prototype.id + '-de-cmbTRx').getValue();
        var txtCia = Ext.getCmp(prototype.id + '-de-txtCia').getValue();
        var txtTicket = Ext.getCmp(prototype.id + '-de-txtTicket').getValue();
        var txaReference = Ext.getCmp(prototype.id + '-de-txaReference').getValue();
        var TKTREFE = Ext.getCmp(prototype.id + '-de-TKTREFE').getValue();
        var TKTSEQ = Ext.getCmp(prototype.id + '-de-TKTSEQ').getValue();
        var txtCupon1 = Ext.getCmp(prototype.id + '-de-txtCupon1').getValue().trim();
        var txtCupon2 = Ext.getCmp(prototype.id + '-de-txtCupon2').getValue().trim();
        var txtCupon3 = Ext.getCmp(prototype.id + '-de-txtCupon3').getValue().trim();
        var txtCupon4 = Ext.getCmp(prototype.id + '-de-txtCupon4').getValue().trim();
        var msj = '';

        console.log(txtCupon1);
        console.log(txtCupon2);
        console.log(txtCupon3);
        console.log(txtCupon4);

        if (txtCia.trim() === '') {
            msj = 'Enter Cia';
            return msj;
        }
        if (txtTicket.trim() === '') {
            msj = 'Enter Ticket';
            return msj;
        }
        if (txaReference.trim() === '') {
            msj = 'Enter Justification';
            return msj;
        }
        if (opt === '6') {
            if (TKTREFE.trim() === '') {
                msj = 'You must enter the reference TKT ';
                return msj;
            }
            if (TKTSEQ.trim() === '') {
                msj = 'You must enter the reference sequence TKT  ';
                return msj;
            }
        }
        if (txtCupon1 !== '' && txtCupon2 !== '' && txtCupon3 !== '' && txtCupon4 !== '') {
            console.log("1");
            msj = 'Enter One Cupon';
            return msj;
        }
        if (txtCupon1 === '' && txtCupon2 !== '' && txtCupon3 !== '' && txtCupon4 !== '') {
            console.log("2");
            msj = 'Enter One Cupon';
            return msj;
        }
        if (txtCupon1 !== '' && txtCupon2 === '' && txtCupon3 !== '' && txtCupon4 !== '') {
            console.log("3");
            msj = 'Enter One Cupon';
            return msj;
        }
        if (txtCupon1 !== '' && txtCupon2 !== '' && txtCupon3 === '' && txtCupon4 !== '') {
            console.log("4");
            msj = 'Enter One Cupon';
            return msj;
        }
        if (txtCupon1 !== '' && txtCupon2 !== '' && txtCupon3 !== '' && txtCupon4 === '') {
            console.log("5");
            msj = 'Enter One Cupon';
            return msj;
        }
        if (txtCupon1 === '' && txtCupon2 === '' && txtCupon3 === '' && txtCupon4 === '') {
            console.log("6");
            msj = 'Enter One Cupon';
            return msj;
        }
        if (txtCupon1 !== '' && txtCupon2 !== '' && txtCupon3 === '' && txtCupon4 === '') {
            console.log("7");
            msj = 'Enter One Cupon';
            return msj;
        }
        if (txtCupon1 !== '' && txtCupon2 === '' && txtCupon3 !== '' && txtCupon4 === '') {
            console.log("8");
            msj = 'Enter One Cupon';
            return msj;
        }
        if (txtCupon1 !== '' && txtCupon2 === '' && txtCupon3 === '' && txtCupon4 !== '') {
            console.log("9");
            msj = 'Enter One Cupon';
            return msj;
        }

        if (txtCupon1 === '' && txtCupon2 !== '' && txtCupon3 !== '' && txtCupon4 === '') {
            console.log("10");
            msj = 'Enter One Cupon';
            return msj;
        }
        if (txtCupon1 !== '' && txtCupon2 !== '' && txtCupon3 === '' && txtCupon4 !== '') {
            console.log("11");
            msj = 'Enter One Cupon';
            return msj;
        }
        if (txtCupon1 === '' && txtCupon2 === '' && txtCupon3 !== '' && txtCupon4 !== '') {
            console.log("12");
            msj = 'Enter One Cupon';
            return msj;
        }
        if (txtCupon1 === '' && txtCupon2 !== '' && txtCupon3 === '' && txtCupon4 !== '') {
            console.log("13");
            msj = 'Enter One Cupon';
            return msj;
        }

        return msj;
    },
    onSaveClick: function() {


        var msj = this.validateFieldsInsert();
        if (msj.trim() !== '') {
            global.Msg({
                msg: msj
            });
        }
        else {
            console.log(this.getDataEntryValues());

            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.crud();
                    }
                }
            });
        }
    },
    crud: function() {

        Ext.Ajax.request({
            url: this.url + '/loadSave_datos',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(),
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...', ''),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...', '');
                var res = Ext.JSON.decode(response.responseText);
                var data = res.data;
                var msj = data.dbException.MESSAGE;
                var sqlCode = data.dbException.SQLCODE;

                if (sqlCode !== '0') {
                    global.Msg({
                        msg: msj

                    });
                } else {
                    global.Msg({
                        msg: msj,
                        icon: 1,
                        fn: function() {
                            //exito
                            Ext.getCmp(prototype.id + '-dataEntry').close();
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        }
                    });
                }
            }
        });
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onBtnClear: function() {

        Ext.getCmp(prototype.id + '-de-cmbTRx').setValue('0');
        Ext.getCmp(prototype.id + '-de-txtCia').setValue('');
        Ext.getCmp(prototype.id + '-de-txtTicket').setValue('');
        Ext.getCmp(prototype.id + '-de-txtCupon1').setValue('');
        Ext.getCmp(prototype.id + '-de-txtCupon2').setValue('');
        Ext.getCmp(prototype.id + '-de-txtCupon3').setValue('');
        Ext.getCmp(prototype.id + '-de-txtCupon4').setValue('');
        Ext.getCmp(prototype.id + '-de-txtSeq').setValue('');
        Ext.getCmp(prototype.id + '-de-lblTtarjeta').setValue('');
        Ext.getCmp(prototype.id + '-de-lblNtarjeta').setValue('');
        Ext.getCmp(prototype.id + '-de-lblRfig').setValue('');
        Ext.getCmp(prototype.id + '-de-lblRfis').setValue('');
        Ext.getCmp(prototype.id + '-de-lblVRic').setValue('');
        Ext.getCmp(prototype.id + '-de-lblFsale').setValue('');
        Ext.getCmp(prototype.id + '-de-lblIATA').setValue('');
        Ext.getCmp(prototype.id + '-de-lblGroup').setValue('');
        Ext.getCmp(prototype.id + '-de-lblIATATrx').setValue('');
        Ext.getCmp(prototype.id + '-de-lblDate').setValue('');
        Ext.getCmp(prototype.id + '-de-lblCurrency').setValue('');
        Ext.getCmp(prototype.id + '-de-lblCommisionREV').setValue('');
        Ext.getCmp(prototype.id + '-de-lblAmount').setValue('');
        Ext.getCmp(prototype.id + '-de-lblCommision').setValue('');
        Ext.getCmp(prototype.id + '-de-lblSCommision').setValue('');
        Ext.getCmp(prototype.id + '-de-lblYQ').setValue('');
        Ext.getCmp(prototype.id + '-de-lblTC').setValue('');
        Ext.getCmp(prototype.id + '-de-lblAmountREV').setValue('');
        Ext.getCmp(prototype.id + '-de-lblCommisionREV').setValue('');
        Ext.getCmp(prototype.id + '-de-lblSCommisionREV').setValue('');
        Ext.getCmp(prototype.id + '-de-lblYQREV').setValue('');
    },
    onCancelClick: function(btn) {
        Ext.getCmp(prototype.id + '-dataEntry').close();
    }


});


