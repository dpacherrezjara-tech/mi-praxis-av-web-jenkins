/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.ADJUses.DataEntryADJUsesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryADJUsesController',
    url: CONTEXTPATH + '/ADJUses',
    paramsDE: {},

    /**
     * Constructor
     */
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var p = this.view.params;
        this.setStoreData();
        switch (p.action) {
            case 'I':
                Ext.getCmp(prototype.idDetailADJUsesForm + '-btn-save').show();
                break;
            case 'U':
                this.getDataInputs();
                this.disableComponents();
                Ext.getCmp(prototype.idDetailADJUsesForm + '-btn-save').hide();
                Ext.getCmp(prototype.idDetailADJUsesForm + '-btn-delete').hide();
                break;
        }

    },
    setStoreData: function () {
        var cmbTRx = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-cmbTRx');
        cmbTRx.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["0", "Select"],
                ["1", "Sale"],
                ["2", "Exch"],
                ["3", "Rfnd"],
                ["5", "Flown"],
                ["6", "Excp"],
                ["7", "Rfcp"],
                ["8", "IXP"],
                ["9", "DISC"]
            ]
        }));
        cmbTRx.setValue("0");
        var cmbTYPEUSE = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-cmbTYPEUSE');
        cmbTYPEUSE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["0", "Select"],
                ["AA0001", "Used Coupon Annulment"],
                ["AA0002", "Duplicated Coupon Reversion"],
                ["AA0004", "ADD  Used"]
            ]
        }));
        cmbTYPEUSE.setValue("0");
        var cmbTYUSEASS = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-cmbTYUSEASS');
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
    changeCmbTRx: function (obj, val) {
        switch (val) {
            case '0':
                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').hide();
                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon2').hide();
                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon3').hide();
                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon4').hide();
                break;
            default:
                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').show();
                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon2').show();
                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon3').show();
                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon4').show();

        }
    },
    getDataInputs: function () {

        var p = this.view.params;
        var data = p.rec.data;
        paramsDE = {
            VP_FILTER: '5',
            VP_CIA: data.A2024CIA,
            VP_FORMA: data.A2024FORMA,
            VP_SERIE: data.A2024SERIE,
            A2024CORRL: data.SEQ,
            A2024SEQ: '',
            VP_GRUPO: data.A2024CUPON
        };

        Ext.Ajax.request({
            url: prototype.url + '/loadTicketEdit',
            method: 'POST',
            timeout: 60000000,
            params: paramsDE,
            beforerequest: Ext.getCmp(prototype.idDetailADJUsesForm + '-DataEntryContenedor').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var listaData = res.data;
                if (listaData.length > 0) {
                    var item = listaData[0];
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtTicket').setValue(item.A2024FORMA + '' + item.A2024SERIE);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txaReference').setValue(item.A2024DESCRIP);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTtarjeta').setValue(item.A2024TTARJ);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblNtarjeta').setValue(item.A2024NTARJ);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblRfig').setValue(item.A2024RFIC);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblRfis').setValue(item.A2024RFIS);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblVRic').setValue(item.A2024VRICOC);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblFsale').setValue(item.A2024FECVTA);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblIATA').setValue(item.A2024AGENT);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblGroup').setValue(item.GRUPO);
                    //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTdoc').setValue(item.A2024TDOC);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtAffectation').setValue(item.A2024IATAUSU);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTRNC').setValue(item.A2024TRNC);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCrtBy').setValue(item.A2024USRIN);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblDate').setValue(item.A2024FECIN);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-TKTREFE').setValue(item.REFE);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtSeq').setValue(item.A2024SEQ);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-TKTSEQ').setValue(item.TKTSEQ);

                    switch (item.A2024CUPON) {
                        case '1':
                            Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').setValue(item.A2024CUPON);
                            break;
                        case '2':
                            Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon2').setValue(item.A2024CUPON);
                            break;
                        case '3':
                            Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon3').setValue(item.A2024CUPON);
                            break;
                        case '4':
                            Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon4').setValue(item.A2024CUPON);
                            break;
                    }
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-cmbTYPEUSE').setValue(item.VP_TypeUse);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblFBASIS').setValue(item.FBASIS);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-Commision').setValue(item.ESTA_TNU);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-cmbTYUSEASS').setValue((" " + item.VP_TypeVoid + " ").trim());
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-cmbTRx').setValue(item.VP_TTRAX);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCurrency').setValue(item.A1541MDAVE);
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCurrencyREV').setValue(item.A1541MREVE);


                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblAmount').setValue(Ext.util.Format.number(item.A1541VCPVE, '0,000.00'));
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCommision').setValue(Ext.util.Format.number(item.A1541LCMVE, '0,000.00'));
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblSCommision').setValue(Ext.util.Format.number(item.A1541LSCMV, '0,000.00'));
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblYQ').setValue(Ext.util.Format.number(item.A1541LYQVE, '0,000.00'));
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTC').setValue(Ext.util.Format.number(item.A1541TCRVE, '0,000.00'));
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblAmountREV').setValue(Ext.util.Format.number(item.A1541VCPRV, '0,000.00'));
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCommisionREV').setValue(Ext.util.Format.number(item.A1541RCMVE, '0,000.00'));
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblSCommisionREV').setValue(Ext.util.Format.number(item.A1541RSCMV, '0,000.00'));
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblYQREV').setValue(Ext.util.Format.number(item.A1541RYQVE, '0,000.00'));
                    //para nuevos procesos

                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-ORIGEN').setValue(item.ORI.trim());
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DESTINO').setValue(item.DESTI.trim());
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-CARRIER').setValue(item.CARR.trim());
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-FLIGHT').setValue(item.NVLO.trim());
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountLoc').setValue(Ext.util.Format.number(item.AMOUNT, '0,000.00'));
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountRev').setValue(Ext.util.Format.number(item.AMOUNTRV, '0,000.00'));
                    Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DATE').setValue(item.TKTDATE.trim());



                } else {
                    global.Msg({
                        msg: 'Data not found.'
                    });
                }

                Ext.getCmp(prototype.idDetailADJUsesForm + '-DataEntryContenedor').unmask('Loading...', '');

            }
        });
    },
    disableComponents: function () {
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txaReference').setReadOnly(true);
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCia').setReadOnly(true);
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtTicket').setReadOnly(true);
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').setReadOnly(true);
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon2').setReadOnly(true);
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon3').setReadOnly(true);
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon4').setReadOnly(true);
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtAffectation').setReadOnly(true);
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCrtBy').setReadOnly(true);
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-cmbTRx').setDisabled(true);
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-cmbTYPEUSE').setDisabled(true);
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-cmbTYUSEASS').setDisabled(true);
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-TKTREFE').setReadOnly(true);
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-TKTSEQ').setReadOnly(true);

        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-panelCorrecData1').hide();
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-panelCorrecData2').hide();
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-panelCorrecData3').hide();
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-panelCorrecData4').hide();
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-panelOptions').hide();

    },
    getDataEntryValues: function (strOption) {

        var CUPON = '';
        var txtCia = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCia').getValue().trim();
        var txtTicket = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtTicket').getValue().trim();
        var txtCupon1 = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').getValue().trim();
        var txtCupon2 = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon2').getValue().trim();
        var txtCupon3 = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon3').getValue().trim();
        var txtCupon4 = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon4').getValue().trim();
        var opt = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-cmbTRx').getValue().trim();

        var txtORIGEN = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-ORIGEN').getValue().trim();
        var txtDESTINO = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DESTINO').getValue().trim();
        var txtCARRIER = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-CARRIER').getValue().trim();
        var txtFLIGHT = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-FLIGHT').getValue().trim();
        var txtAmountLoc = parseFloat(Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountLoc').getValue().replace(new RegExp(',', 'g'), ''));
        var txtAmountRev = parseFloat(Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountRev').getValue().replace(new RegExp(',', 'g'), ''));

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
        var TTarjeta = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblFareCurrency').getValue().trim();
        var NTarjeta = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblEqFarePaidCurrency').getValue().trim();
        var RFic = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCommisionCurrency').getValue().trim();
        var RFis = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTax1Code').getValue().trim();
        var VRic = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTax2Code').getValue().trim();
        var FSale = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTax3Code').getValue().trim();
        var IATA = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTotalAmountCurrency').getValue().trim();
        var CARRIER = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCARRIERNEW').getValue().trim();
        var CurrencyLocal = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCurrencyNEW').getValue().trim();

        var AmountLocal = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblAmountNEW').getValue().trim();
        if (AmountLocal === '') {
            AmountLocal = 0;
        }
        var CommisionLocal = parseFloat(Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCommisionNEW').getValue().replace(new RegExp(',', 'g'), ''));// Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCommisionNEW').getValue().trim();
        if (CommisionLocal === '') {
            CommisionLocal = 0;
        }
        var SCommisionLocal = parseFloat(Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblSCommisionNEW').getValue().replace(new RegExp(',', 'g'), ''));//Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblSCommisionNEW').getValue().trim();
        if (SCommisionLocal === '') {
            SCommisionLocal = 0;
        }
        var YQLocal = parseFloat(Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblYQNEW').getValue().replace(new RegExp(',', 'g'), ''));//Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblYQNEW').getValue().trim();
        if (YQLocal === '') {
            YQLocal = 0;
        }
        var TCRev = parseFloat(Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTCNEW').getValue().replace(new RegExp(',', 'g'), ''));//Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTCNEW').getValue().trim();
        if (TCRev === '') {
            TCRev = 0;
        }
        var AmountRev = parseFloat(Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblAmountREVNEW').getValue().replace(new RegExp(',', 'g'), ''));//Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblAmountREVNEW').getValue().trim();
        if (AmountRev === '') {
            AmountRev = 0;
        }
        var CurrencyRev = parseFloat(Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCurrencyREVNEW').getValue().replace(new RegExp(',', 'g'), ''));//Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCurrencyREVNEW').getValue().trim();
        if (CurrencyRev === '') {
            CurrencyRev = 0;
        }
        var CommisionRev = parseFloat(Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCommisionREVNEW').getValue().replace(new RegExp(',', 'g'), ''));//Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCommisionREVNEW').getValue().trim();
        if (CommisionRev === '') {
            CommisionRev = 0;
        }
        var SCommisionRev = parseFloat(Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblSCommisionREVNEW').getValue().replace(new RegExp(',', 'g'), ''));//Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblSCommisionREVNEW').getValue().trim();
        if (SCommisionRev === '') {
            SCommisionRev = 0;
        }
        var YQRev = parseFloat(Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblYQREVNEW').getValue().replace(new RegExp(',', 'g'), ''));//Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblYQREVNEW').getValue().trim();
        if (YQRev === '') {
            YQRev = 0;
        }
        var CREDIT = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTFOPNEW').getValue().trim();
        var FBASIS = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblFBASISE').getValue().trim();
        var lblGroup = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblGroup').getValue().trim();
        var lblTRNC = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTRNC').getValue().trim();
        var lblDate = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblDate').getValue().trim();
        // var txtFilterSeq = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtFilterSeq').getValue().trim();
        var txtFilterSeq = '';
        var VP_TypeUse = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-cmbTYPEUSE').getValue().trim();
        var VP_TypeVoid = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-cmbTYUSEASS').getValue().trim();
        var txaReference = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txaReference').getValue().trim();
        var lblTicketcia = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTicketcia').getValue().trim();
        var lblTicketNEW = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTicketNEW').getValue().trim();
        var TKTREFE = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-TKTREFE').getValue().trim();
        var TKTSEQ = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-TKTSEQ').getValue().trim();
        var TKTDATE = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DATE').getValue().trim();
        var txtAffectation = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtAffectation').getValue().trim(); //Completar con ceros hasta llegar a 8
        txtAffectation = global.fillZero(txtAffectation, 8);
        var VP_TNU = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-Commision').getValue();
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
            TKTSEQ: TKTSEQ,
            ORI: txtORIGEN,
            DESTI: txtDESTINO,
            CARR: txtCARRIER,
            NVLO: txtFLIGHT,
            AMOUNT: txtAmountLoc,
            AMOUNTRV: txtAmountRev,
            TKTDATE: TKTDATE

        };
    },
    onBtnSearch: function () {

        var msj = this.validateFields();
        var limp = '';
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
                beforerequest: Ext.getCmp(prototype.idDetailADJUsesForm + '-DataEntryContenedor').mask('Loading...', ''),
                success: function (response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var listaData = res.data;
                    if (listaData.length > 0) {
                        var item = listaData[0];
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTtarjeta').setValue(item.A720FBST1);
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblNtarjeta').setValue(item.A720SUBPA1);
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblRfig').setValue(item.A720RFIC);
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblRfis').setValue(item.A720MDATC);
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblVRic').setValue(item.A720NSTOCK);
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblFsale').setValue(item.A720FECVTA);
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblIATA').setValue(item.A720NBDA1);
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblGroup').setValue(item.A720GRUPO);
                        //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTdoc').setValue(item.A2024TDOC);
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblIATATrx').setValue(item.A720AGENTE);
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblDate').setValue(item.A720FVLO3);
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCurrency').setValue(item.A1541MDAVE);
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCommisionREV').setValue(item.A1541RCMVE);
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DATE').setValue(item.A720FECVTA);


                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblAmount').setValue(Ext.util.Format.number(item.A1541VCPVE, '0,000.00'));
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCommision').setValue(Ext.util.Format.number(item.A1541LCMVE, '0,000.00'));
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblSCommision').setValue(Ext.util.Format.number(item.A1541LSCMV, '0,000.00'));
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblYQ').setValue(Ext.util.Format.number(item.A1541LYQVE, '0,000.00'));
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTC').setValue(Ext.util.Format.number(item.A1541TCRVE, '0,000.00'));
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblAmountREV').setValue(Ext.util.Format.number(item.A1541VCPRV, '0,000.00'));
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCommisionREV').setValue(Ext.util.Format.number(item.A1541RCMVE, '0,000.00'));
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblSCommisionREV').setValue(Ext.util.Format.number(item.A1541RSCMV, '0,000.00'));
                        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblYQREV').setValue(Ext.util.Format.number(item.A1541RYQVE, '0,000.00'));
                        ///
                        var cmbTRx = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-cmbTRx').getValue();
                        if (cmbTRx === '1' || cmbTRx === '2' || cmbTRx === '3') {
                            if (Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').getValue() === '1') {
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-ORIGEN').setValue(item.A720RUTA0.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DESTINO').setValue(item.A720RUTA1.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-CARRIER').setValue(item.A720CARRA1.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-FLIGHT').setValue(item.A720NVLO1.trim());
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountLoc').setValue();
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountRev').setValue();
                            }
                            if (Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').getValue() === '2') {
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-ORIGEN').setValue(item.A720RUTA1.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DESTINO').setValue(item.A720RUTA2.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-CARRIER').setValue(item.A720CARRA2.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-FLIGHT').setValue(item.A720NVLO2.trim());
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountLoc').setValue();
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountRev').setValue();
                            }
                            if (Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').getValue() === '3') {
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-ORIGEN').setValue(item.A720RUTA2.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DESTINO').setValue(item.A720RUTA3.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-CARRIER').setValue(item.A720CARRA3.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-FLIGHT').setValue(item.A720NVLO3.trim());
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountLoc').setValue();
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountRev').setValue();
                            }
                            if (Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').getValue() === '4') {
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-ORIGEN').setValue(item.A720RUTA3.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DESTINO').setValue(item.A720RUTA4.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-CARRIER').setValue(item.A720CARRA4.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-FLIGHT').setValue(item.A720NVLO4.trim());
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountLoc').setValue();
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountRev').setValue();
                            }
                        } else if (cmbTRx === '5') {
                            Ext.getCmp(prototype.idDetailADJUsesForm + '-de-ORIGEN').setValue(item.A720RUTA1.trim());
                            Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DESTINO').setValue(item.A720RUTA2.trim());
                            Ext.getCmp(prototype.idDetailADJUsesForm + '-de-CARRIER').setValue(item.A720CARRA2.trim());
                            Ext.getCmp(prototype.idDetailADJUsesForm + '-de-FLIGHT').setValue(item.A720NVLO2.trim());
                            //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountLoc').setValue();
                            //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountRev').setValue();
                        } else if (cmbTRx === '6') {
                            if (Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').getValue() === '1') {
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-ORIGEN').setValue(item.A720RUTA0.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DESTINO').setValue(item.A720RUTA1.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-CARRIER').setValue(item.A720CARRA1.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-FLIGHT').setValue(item.A720NVLO1.trim());
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountLoc').setValue();
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountRev').setValue();
                            }
                            if (Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').getValue() === '2') {
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-ORIGEN').setValue(item.A720RUTA1.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DESTINO').setValue(item.A720RUTA2.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-CARRIER').setValue(item.A720CARRA2.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-FLIGHT').setValue(item.A720NVLO2.trim());
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountLoc').setValue();
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountRev').setValue();
                            }
                            if (Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').getValue() === '3') {
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-ORIGEN').setValue(item.A720RUTA2.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DESTINO').setValue(item.A720RUTA3.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-CARRIER').setValue(item.A720CARRA3.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-FLIGHT').setValue(item.A720NVLO3.trim());
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountLoc').setValue();
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountRev').setValue();
                            }
                            if (Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').getValue() === '4') {
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-ORIGEN').setValue(item.A720RUTA3.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DESTINO').setValue(item.A720RUTA4.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-CARRIER').setValue(item.A720CARRA4.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-FLIGHT').setValue(item.A720NVLO4.trim());
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountLoc').setValue();
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountRev').setValue();
                            }
                        } else if (cmbTRx === '7') {
                            if (Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').getValue() === '1') {
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-ORIGEN').setValue(item.A720RUTA0.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DESTINO').setValue(item.A720RUTA1.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-CARRIER').setValue(item.A720CARRA1.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-FLIGHT').setValue(item.A720NVLO1.trim());
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountLoc').setValue();
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountRev').setValue();
                            }
                            if (Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').getValue() === '2') {
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-ORIGEN').setValue(item.A720RUTA1.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DESTINO').setValue(item.A720RUTA2.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-CARRIER').setValue(item.A720CARRA2.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-FLIGHT').setValue(item.A720NVLO2.trim());
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountLoc').setValue();
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountRev').setValue();
                            }
                            if (Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').getValue() === '3') {
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-ORIGEN').setValue(item.A720RUTA2.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DESTINO').setValue(item.A720RUTA3.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-CARRIER').setValue(item.A720CARRA3.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-FLIGHT').setValue(item.A720NVLO3.trim());
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountLoc').setValue();
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountRev').setValue();
                            }
                            if (Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').getValue() === '4') {
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-ORIGEN').setValue(item.A720RUTA3.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DESTINO').setValue(item.A720RUTA4.trim());
                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-CARRIER').setValue(item.A720CARRA4.trim());

                                Ext.getCmp(prototype.idDetailADJUsesForm + '-de-FLIGHT').setValue(item.A720NVLO4.trim());
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountLoc').setValue();
                                //Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountRev').setValue();
                            }
                        } else if (cmbTRx === '8') {
                            Ext.getCmp(prototype.idDetailADJUsesForm + '-de-ORIGEN').setValue('');
                            Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DESTINO').setValue('');
                            Ext.getCmp(prototype.idDetailADJUsesForm + '-de-CARRIER').setValue('');
                            Ext.getCmp(prototype.idDetailADJUsesForm + '-de-FLIGHT').setValue('');
                            Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountLoc').setValue('0');
                            Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountRev').setValue('0');
                        }


                    } else {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                        limp = 'Data not found.';
                    }

                    Ext.getCmp(prototype.idDetailADJUsesForm + '-DataEntryContenedor').unmask('Loading...', '');

                }
            });
        }
        if (limp === 'Data not found.') {
            this.onBtnClear();
        }

    },
    validateFields: function () {
        var opt = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-cmbTRx').getValue();
        var txtCia = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCia').getValue();
        var txtTicket = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtTicket').getValue();
        var txtCupon1 = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').getValue();
        var txtCupon2 = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon2').getValue();
        var txtCupon3 = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon3').getValue();
        var txtCupon4 = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon4').getValue();
        var txtSeq = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtSeq').getValue();
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
    validateFieldsInsert: function () {

        var opt = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-cmbTRx').getValue();
        var txtCia = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCia').getValue();
        var txtTicket = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtTicket').getValue();
        var txaReference = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txaReference').getValue();
        var TKTREFE = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-TKTREFE').getValue();
        var TKTSEQ = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-TKTSEQ').getValue();
        var txtCupon1 = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').getValue().trim();
        var txtCupon2 = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon2').getValue().trim();
        var txtCupon3 = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon3').getValue().trim();
        var txtCupon4 = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon4').getValue().trim();

        var txtORIGEN = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-ORIGEN').getValue().trim();
        var txtDESTINO = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DESTINO').getValue().trim();
        var txtCARRIER = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-CARRIER').getValue().trim();
        var txtAmountLoc = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountLoc').getValue().trim();
        var txtAmountRev = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-AmountRev').getValue().trim();
        var cmbTYPEUSE = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-cmbTYPEUSE').getValue().trim();
        var txtDATE = Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DATE').getValue();

        /* if(opt==='' && cmbTYPEUSE==='AA0004'){
         
         }*/
        if (txtDATE.trim() === '') {
            msj = 'Enter DATE USES';
            return msj;
        }
        var msj = '';

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

        if (txtORIGEN.trim() === '') {
            msj = 'Enter Ori';
            return msj;
        }
        if (txtDESTINO.trim() === '') {
            msj = 'Enter Des';
            return msj;
        }
        if (txtCARRIER.trim() === '') {
            msj = 'Enter CARRIER';
            return msj;
        }
        if (parseFloat(txtAmountLoc.replace(new RegExp(',', 'g'), '')) === 0 ||
                isNaN(parseFloat(txtAmountLoc.replace(new RegExp(',', 'g'), ''))) === true) {
            msj = 'Enter Amount Loc';
            return msj;
        }
        if (parseFloat(txtAmountRev.replace(new RegExp(',', 'g'), '')) === 0 ||
                isNaN(parseFloat(txtAmountRev.replace(new RegExp(',', 'g'), ''))) === true) {
            msj = 'Enter Amount Rev';
            return msj;
        }

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
        return msj;
    },
    onSaveClick: function () {


        var msj = this.validateFieldsInsert();
        if (msj.trim() !== '') {
            global.Msg({
                msg: msj
            });
        } else {

            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.crud();
                    }
                }
            });
        }
    },
    crud: function () {

        Ext.Ajax.request({
            url: this.url + '/loadSave_datos',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(),
            beforerequest: Ext.getCmp(prototype.idDetailADJUsesForm + '-DataEntry-center').mask('Loading...', ''),
            success: function (response, options) {
                Ext.getCmp(prototype.idDetailADJUsesForm + '-DataEntry-center').unmask('Loading...', '');
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
                        fn: function () {
                            //exito
                            Ext.getCmp(prototype.idDetailADJUsesForm + '-DataEntryContenedor').close();
                            Ext.getCmp(prototype.idADJUsesForm + '-contenedor-form').fireEvent('click', {});
                        }
                    });
                }
            }
        });
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onBtnClear: function () {

        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-cmbTRx').setValue('0');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCia').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtTicket').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon1').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon2').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon3').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtCupon4').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-txtSeq').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTtarjeta').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblNtarjeta').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblRfig').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblRfis').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblVRic').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblFsale').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblIATA').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblGroup').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblIATATrx').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblDate').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCurrency').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCommisionREV').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblAmount').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCommision').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblSCommision').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblYQ').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblTC').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblAmountREV').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblCommisionREV').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblSCommisionREV').setValue('');
         Ext.getCmp(prototype.idDetailADJUsesForm + '-de-lblYQREV').setValue('');
        Ext.getCmp(prototype.idDetailADJUsesForm + '-de-DATE').setValue('');
    },
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.idDetailADJUsesForm + '-DataEntryContenedor').close();
    }


});


