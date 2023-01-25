/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.salesaudit.ITBulk.DataEntryITBulkController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/ITBulk',
    A2536ID: '',
    A2536KEY: '',
    meDe: '',
    A2537KEY: '',
    A2537ID: '',
    params: '',
    /**
     * Constructor
     */
    init: function(view) {
        meDe = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        var p = this.view.params;
        this.setStoreData();
        switch (p.action) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-save').show();
                break;
            case 'U':
                this.setNoEditableComponent();
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                break;
        }


    },
    setStoreData: function() {

        var cmbType = Ext.getCmp(prototype.id + '-de-cmbType');
        cmbType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""]
            ]
        }));
        cmbType.setValue('');
        var cmbIT = Ext.getCmp(prototype.id + '-de-cmbIT');
        cmbIT.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "ACCOUNT CODE"],
                ["2", "IT"],
                ["3", "WAIVER &FAVOR"],
                ["4", "DESCUENTOS"]
            ]
        }));
        cmbIT.setValue('1');


    },
    setNoEditableComponent: function() {
        Ext.getCmp(prototype.id + '-de-lblid').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblfam').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-cmbIT').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-cmbType').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-cmbIT').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblseq').setReadOnly(true);

        Ext.getCmp(prototype.id + '-de-lbltcode').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbleffrom').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblefuntil').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblscountry').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblcomme').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbltow').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblsrcindi').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblsource').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbldstindi').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbldstino').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblbookingclass').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblbin').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblchanl').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblsubchn').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblbookdafr').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblbookdto').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblsaledfrom').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblsaledto').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbldflighf').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbldflightt').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblcarrier').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblapplicble').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblgds').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblpssgrtype').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblblckfrom').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblblckto').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblacco').setReadOnly(true);


        Ext.getCmp(prototype.id + '-de-lbltcodeITw').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblRBDw').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbleffromitw').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblefuntilitw').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblsalefromw').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblscountryitw').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblissuew').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblagencyw').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbltickow').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblappdatew').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblfbasw').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblapprobew').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblvariablecow').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblaprovingarw').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblcodew').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblcommeitw').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbldiscupw').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbloww').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbloriginindw').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbloriginw').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbldestindicaw').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbldestinw').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbloriginalrouw').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblsolic').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblfarew').setReadOnly(true);



        Ext.getCmp(prototype.id + '-de-lbltcodeIT').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblRBD').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblstpv').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbleffromit').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblcurrency').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblapp').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblefuntilit').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblfare').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblblckfromit').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblscountryit').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblsalefrom').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblbkto').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblagency').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblsaleto').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblpxtype').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblappdate').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbldateflfr').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblcntryex').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblappcom').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbldateflightto').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblperdisc').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblpercom').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbltraveltype').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblnpax').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblapprobe').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblcarrierit').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblmaxstay').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblaprovingar').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblappfligh').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblit2').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblcommeit').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblgdsit').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblcance').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblow').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblissue').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblCHGCAR').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbloriginind').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblpnr').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblcurrencychan').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblorigin').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbltaxes').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbldeparturetime').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbldestindica').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblequival').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblarrivaltime').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbldestin').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblcurren').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lbloriginalrou').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblseason').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblminstay').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblcurtaxes').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblq').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-lblsinq').setReadOnly(true);

    },
    getDataInputs: function() {

        var p = this.view.params;
        var data = p.rec.data;
        var data2 = p.rec.data2;

        Ext.getCmp(prototype.id + '-de-lblid').setValue(data2.A2644ID);
        Ext.getCmp(prototype.id + '-de-lblfam').setValue(data2.A2644FAMI);
        Ext.getCmp(prototype.id + '-de-cmbIT').setValue(data2.A2644SFAMI);
        Ext.getCmp(prototype.id + '-de-cmbType').setValue(data2.A2644TIPO);
        Ext.getCmp(prototype.id + '-de-cmbIT').setValue(data2.A2644SFAMI);
        Ext.getCmp(prototype.id + '-de-lblseq').setValue(data2.A2644SEQ);

        Ext.getCmp(prototype.id + '-de-lbltcode').setValue(data.A2643TCODE);
        Ext.getCmp(prototype.id + '-de-lbleffrom').setValue(data.A2643VIGD);
        Ext.getCmp(prototype.id + '-de-lblefuntil').setValue(data.A2643VIGH);
        Ext.getCmp(prototype.id + '-de-lblscountry').setValue(data.A2643VENTP);
        Ext.getCmp(prototype.id + '-de-lblcomme').setValue(data.A2643COMEN);
        Ext.getCmp(prototype.id + '-de-lbltow').setValue(data.A2643OWRT);
        Ext.getCmp(prototype.id + '-de-lblsrcindi').setValue(data.A2643IORIG);
        Ext.getCmp(prototype.id + '-de-lblsource').setValue(data.A2643ORIG);
        Ext.getCmp(prototype.id + '-de-lbldstindi').setValue(data.A2643IDEST);
        Ext.getCmp(prototype.id + '-de-lbldstino').setValue(data.A2643DEST);
        Ext.getCmp(prototype.id + '-de-lblbookingclass').setValue(data.A2643BOOK);
        Ext.getCmp(prototype.id + '-de-lblbin').setValue(data.A2643BIN);
        Ext.getCmp(prototype.id + '-de-lblchanl').setValue(data.A2643CANAL);
        Ext.getCmp(prototype.id + '-de-lblsubchn').setValue(data.A2643SCANA);
        Ext.getCmp(prototype.id + '-de-lblbookdafr').setValue(data.A2643FRESD);
        Ext.getCmp(prototype.id + '-de-lblbookdto').setValue(data.A2643FRESH);
        Ext.getCmp(prototype.id + '-de-lblsaledfrom').setValue(data.A2643FVEND);
        Ext.getCmp(prototype.id + '-de-lblsaledto').setValue(data.A2643FVENH);
        Ext.getCmp(prototype.id + '-de-lbldflighf').setValue(data.A2643FVUED);
        Ext.getCmp(prototype.id + '-de-lbldflightt').setValue(data.A2643FVUEH);
        Ext.getCmp(prototype.id + '-de-lblcarrier').setValue(data.A2643CXR);
        Ext.getCmp(prototype.id + '-de-lblapplicble').setValue(data.A2643VAAPL);
        Ext.getCmp(prototype.id + '-de-lblgds').setValue(data.A2643GDS);
        Ext.getCmp(prototype.id + '-de-lblpssgrtype').setValue(data.A2643TPSJ);
        Ext.getCmp(prototype.id + '-de-lblblckfrom').setValue(data.A2643BDSD);
        Ext.getCmp(prototype.id + '-de-lblblckto').setValue(data.A2643BHST);
        Ext.getCmp(prototype.id + '-de-lblacco').setValue(data.A2643ACCO);


        Ext.getCmp(prototype.id + '-de-lbltcodeITw').setValue(data.A2643TCODE);
        Ext.getCmp(prototype.id + '-de-lblRBDw').setValue(data.A2643BOOK);
        Ext.getCmp(prototype.id + '-de-lbleffromitw').setValue(data.A2643VIGD);
        Ext.getCmp(prototype.id + '-de-lblefuntilitw').setValue(data.A2643VIGH);
        Ext.getCmp(prototype.id + '-de-lblsalefromw').setValue(data.A2643FVEND);
        Ext.getCmp(prototype.id + '-de-lblscountryitw').setValue(data.A2643VENTP);
        Ext.getCmp(prototype.id + '-de-lblissuew').setValue(data.A2643IEMI);
        Ext.getCmp(prototype.id + '-de-lblagencyw').setValue(data.A2643AGEN);
        Ext.getCmp(prototype.id + '-de-lbltickow').setValue(data.A2643TKT);
        Ext.getCmp(prototype.id + '-de-lblappdatew').setValue(data.A2643FSOLI);
        Ext.getCmp(prototype.id + '-de-lblfbasw').setValue(data.A2643FBASI);
        Ext.getCmp(prototype.id + '-de-lblapprobew').setValue(data.A2643AUTO);
        Ext.getCmp(prototype.id + '-de-lblvariablecow').setValue(data.A2643SVARI);
        Ext.getCmp(prototype.id + '-de-lblaprovingarw').setValue(data.A2643AAUT);
        Ext.getCmp(prototype.id + '-de-lblcodew').setValue(data.A2643CODIG);
        Ext.getCmp(prototype.id + '-de-lblcommeitw').setValue(data.A2643COMEN);
        Ext.getCmp(prototype.id + '-de-lbldiscupw').setValue(data.A2643DSUPF);
        Ext.getCmp(prototype.id + '-de-lbloww').setValue(data.A2643OWRT);
        Ext.getCmp(prototype.id + '-de-lbloriginindw').setValue(data.A2643IORIG);
        Ext.getCmp(prototype.id + '-de-lbloriginw').setValue(data.A2643ORIG);
        Ext.getCmp(prototype.id + '-de-lbldestindicaw').setValue(data.A2643IDEST);
        Ext.getCmp(prototype.id + '-de-lbldestinw').setValue(data.A2643DEST);
        Ext.getCmp(prototype.id + '-de-lbloriginalrouw').setValue(data.A2643RUTO);
        Ext.getCmp(prototype.id + '-de-lblsolic').setValue(data.A2643SOLI);
        Ext.getCmp(prototype.id + '-de-lblfarew').setValue(data.A2643FARE);



        Ext.getCmp(prototype.id + '-de-lbltcodeIT').setValue(data.A2643TCODE);
        Ext.getCmp(prototype.id + '-de-lblRBD').setValue(data.A2643BOOK);
        Ext.getCmp(prototype.id + '-de-lblstpv').setValue(data.A2643STOP);
        Ext.getCmp(prototype.id + '-de-lbleffromit').setValue(data.A2643VIGD);
        Ext.getCmp(prototype.id + '-de-lblcurrency').setValue(data.A2643MONE);
        Ext.getCmp(prototype.id + '-de-lblapp').setValue(data.A2643CAPP);
        Ext.getCmp(prototype.id + '-de-lblefuntilit').setValue(data.A2643VIGH);
        Ext.getCmp(prototype.id + '-de-lblfare').setValue(data.A2643FARE);
        Ext.getCmp(prototype.id + '-de-lblblckfromit').setValue(data.A2643BDSD);
        Ext.getCmp(prototype.id + '-de-lblscountryit').setValue(data.A2643VENTP);
        Ext.getCmp(prototype.id + '-de-lblsalefrom').setValue(data.A2643FVEND);
        Ext.getCmp(prototype.id + '-de-lblbkto').setValue(data.A2643BHST);
        Ext.getCmp(prototype.id + '-de-lblagency').setValue(data.A2643AGEN);
        Ext.getCmp(prototype.id + '-de-lblsaleto').setValue(data.A2643FVUEH);
        Ext.getCmp(prototype.id + '-de-lblpxtype').setValue(data.A2643TPSJ);
        Ext.getCmp(prototype.id + '-de-lblappdate').setValue(data.A2643FSOLI);
        Ext.getCmp(prototype.id + '-de-lbldateflfr').setValue(data.A2643FVUED);
        Ext.getCmp(prototype.id + '-de-lblcntryex').setValue(data.A2643EPAIS);
        Ext.getCmp(prototype.id + '-de-lblappcom').setValue(data.A2643COMIS);
        Ext.getCmp(prototype.id + '-de-lbldateflightto').setValue(data.A2643FVUEH);
        Ext.getCmp(prototype.id + '-de-lblperdisc').setValue(data.A2643PDES);
        Ext.getCmp(prototype.id + '-de-lblpercom').setValue(data.A2643PCOMI);
        Ext.getCmp(prototype.id + '-de-lbltraveltype').setValue(data.A2643TIPVJ);
        Ext.getCmp(prototype.id + '-de-lblnpax').setValue(data.A2643NPAX);
        Ext.getCmp(prototype.id + '-de-lblapprobe').setValue(data.A2643AUTO);
        Ext.getCmp(prototype.id + '-de-lblcarrierit').setValue(data.A2643CXR);
        Ext.getCmp(prototype.id + '-de-lblmaxstay').setValue(data.A2643EMAX);
        Ext.getCmp(prototype.id + '-de-lblaprovingar').setValue(data.A2643AAUT);
        Ext.getCmp(prototype.id + '-de-lblappfligh').setValue(data.A2643VAAPL);
        Ext.getCmp(prototype.id + '-de-lblit2').setValue(data.A2643IT2);
        Ext.getCmp(prototype.id + '-de-lblcommeit').setValue(data.A2643COMEN);
        Ext.getCmp(prototype.id + '-de-lblgdsit').setValue(data.A2643GDS);
        Ext.getCmp(prototype.id + '-de-lblcance').setValue(data.A2643CGRUP);
        Ext.getCmp(prototype.id + '-de-lblow').setValue(data.A2643OWRT);
        Ext.getCmp(prototype.id + '-de-lblissue').setValue(data.A2643IEMI);
        Ext.getCmp(prototype.id + '-de-lblCHGCAR').setValue(data.A2643CCCAM);
        Ext.getCmp(prototype.id + '-de-lbloriginind').setValue(data.A2643IORIG);
        Ext.getCmp(prototype.id + '-de-lblpnr').setValue(data.A2643PNR);
        Ext.getCmp(prototype.id + '-de-lblcurrencychan').setValue(data.A2643MCCCA);
        Ext.getCmp(prototype.id + '-de-lblorigin').setValue(data.A2643ORIG);
        Ext.getCmp(prototype.id + '-de-lbltaxes').setValue(data.A2643TAXE);
        Ext.getCmp(prototype.id + '-de-lbldeparturetime').setValue(data.A2643HSALI);
        Ext.getCmp(prototype.id + '-de-lbldestindica').setValue(data.A2643IDEST);
        Ext.getCmp(prototype.id + '-de-lblequival').setValue(data.A2643FEQU);
        Ext.getCmp(prototype.id + '-de-lblarrivaltime').setValue(data.A2643HLLEG);
        Ext.getCmp(prototype.id + '-de-lbldestin').setValue(data.A2643DEST);
        Ext.getCmp(prototype.id + '-de-lblcurren').setValue(data.A2643MFEQ);
        Ext.getCmp(prototype.id + '-de-lbloriginalrou').setValue(data.A2643RUTO);
        Ext.getCmp(prototype.id + '-de-lblseason').setValue(data.A2643SEASO);
        Ext.getCmp(prototype.id + '-de-lblminstay').setValue(data.A2643EMIN);
        Ext.getCmp(prototype.id + '-de-lblcurtaxes').setValue(data.A2643TMND);
        Ext.getCmp(prototype.id + '-de-lblq').setValue(data.A2643Q);
        Ext.getCmp(prototype.id + '-de-lblsinq').setValue(data.A2643FSINQ);

    },
    getDataEntryValues: function(strOption) {

        meDe.bean = {};
        meDe.bean.VP_OPCION = strOption;
        meDe.bean.A2644ID = Ext.getCmp(prototype.id + '-de-lblid').getValue();
        meDe.bean.A2644FAMI = "1";

        meDe.bean.A2644SFAMI = Ext.getCmp(prototype.id + '-de-cmbIT').getValue();
        meDe.bean.A2644TIPO = Ext.getCmp(prototype.id + '-de-cmbType').getValue();

//        indiceBean = evaluarIndice();
//        Alert.show("indice resultante" + indiceBean);
//        beanMantca.A2644INDIC = indiceBean;


        //DETALLE
        meDe.beanA2643ID = Ext.getCmp(prototype.id + '-de-lblid').getValue();
        meDe.beanA2643TCODE = Ext.getCmp(prototype.id + '-de-lbltcode').getValue();
        meDe.beanA2643VIGD = Ext.getCmp(prototype.id + '-de-lbleffromit').getValue();
        meDe.beanA2643VIGH = Ext.getCmp(prototype.id + '-de-lblefuntilit').getValue();
        meDe.beanA2643VENTP = Ext.getCmp(prototype.id + '-de-lblscountry').getValue();
        meDe.beanA2643AGEN = Ext.getCmp(prototype.id + '-de-lblagency').getValue();
        meDe.beanA2643FSOLI = Ext.getCmp(prototype.id + '-de-lblappdate').getValue();
        meDe.beanA2643COMIS = Ext.getCmp(prototype.id + '-de-lblappcom').getValue();
        meDe.beanA2643PCOMI = Ext.getCmp(prototype.id + '-de-lblpercom').getValue();
        meDe.beanA2643ID = Ext.getCmp(prototype.id + '-de-lblid').getValue();
        meDe.beanA2643TCODE = Ext.getCmp(prototype.id + '-de-lbltcode').getValue();
        meDe.beanA2643VIGD = Ext.getCmp(prototype.id + '-de-lbleffromit').getValue();
        meDe.beanA2643VIGH = Ext.getCmp(prototype.id + '-de-lblefuntilit').getValue();
        meDe.beanA2643VENTP = Ext.getCmp(prototype.id + '-de-lblscountryit').getValue();
        meDe.beanA2643AGEN = Ext.getCmp(prototype.id + '-de-lblagency').getValue();
        meDe.beanA2643FSOLI = Ext.getCmp(prototype.id + '-de-lblappdate').getValue();
        meDe.beanA2643COMIS = Ext.getCmp(prototype.id + '-de-lblappcom').getValue();
        meDe.beanA2643PCOMI = Ext.getCmp(prototype.id + '-de-lblpercom').getValue();

        meDe.beanA2643SOLI = Ext.getCmp(prototype.id + '-de-lblsolic').getValue();
        meDe.beanA2643AUTO = Ext.getCmp(prototype.id + '-de-lblapprobe').getValue();
        meDe.beanA2643AAUT = Ext.getCmp(prototype.id + '-de-lblaprovingar').getValue();
        meDe.beanA2643COMEN = Ext.getCmp(prototype.id + '-de-lblcommeit').getValue();
        meDe.beanA2643OWRT = Ext.getCmp(prototype.id + '-de-lblow').getValue();
        meDe.beanA2643IORIG = Ext.getCmp(prototype.id + '-de-lbloriginind').getValue();
        meDe.beanA2643ORIG = Ext.getCmp(prototype.id + '-de-lblorigin').getValue();
        meDe.beanA2643IDEST = Ext.getCmp(prototype.id + '-de-lbldestindica').getValue();
        meDe.beanA2643DEST = Ext.getCmp(prototype.id + '-de-lbldestin').getValue();
        meDe.beanA2643RUTO = Ext.getCmp(prototype.id + '-de-lbloriginalrou').getValue();
        meDe.beanA2643BOOK = Ext.getCmp(prototype.id + '-de-lblRBD').getValue();
        meDe.beanA2643ACCO = Ext.getCmp(prototype.id + '-de-lblacco').getValue();
        meDe.beanA2643FBASI = Ext.getCmp(prototype.id + '-de-lblfbasw').getValue();
        meDe.beanA2643MONE = Ext.getCmp(prototype.id + '-de-lblcurrency').getValue();
        meDe.beanA2643FSINQ = Ext.getCmp(prototype.id + '-de-lblsinq').getValue();
        meDe.beanA2643Q = Ext.getCmp(prototype.id + '-de-lblq').getValue();


        meDe.beanA2643FARE = Ext.getCmp(prototype.id + '-de-lblfare').getValue();
        meDe.beanA2643BIN = Ext.getCmp(prototype.id + '-de-lblbin').getValue();
        meDe.beanA2643CANAL = Ext.getCmp(prototype.id + '-de-lblchanl').getValue();
        meDe.beanA2643SCANA = Ext.getCmp(prototype.id + '-de-lblsubchn').getValue();
        meDe.beanA2643FRESD = Ext.getCmp(prototype.id + '-de-lblbookdafr').getValue();
        meDe.beanA2643FRESH = Ext.getCmp(prototype.id + '-de-lblbookdto').getValue();
        meDe.beanA2643FVEND = Ext.getCmp(prototype.id + '-de-lblsaledfrom').getValue();
        meDe.beanA2643FVENH = Ext.getCmp(prototype.id + '-de-lblsaledto').getValue();
        meDe.beanA2643FVUED = Ext.getCmp(prototype.id + '-de-lbldateflfr').getValue();
        meDe.beanA2643FVUEH = Ext.getCmp(prototype.id + '-de-lbldateflightto').getValue();
        meDe.beanA2643TIPVJ = Ext.getCmp(prototype.id + '-de-lbltraveltype').getValue();
        meDe.beanA2643CXR = Ext.getCmp(prototype.id + '-de-lblcarrierit').getValue();

        meDe.beanA2643VAAPL = Ext.getCmp(prototype.id + '-de-lblappfligh').getValue();
        meDe.beanA2643GDS = Ext.getCmp(prototype.id + '-de-lblgds').getValue();
        meDe.beanA2643IEMI = Ext.getCmp(prototype.id + '-de-lblissuew').getValue();
        meDe.beanA2643PNR = Ext.getCmp(prototype.id + '-de-lblpnr').getValue();
        meDe.beanA2643TAXE = Ext.getCmp(prototype.id + '-de-lbltaxes').getValue();


        meDe.beanA2643TMND = Ext.getCmp(prototype.id + '-de-lblcurtaxes').getValue();
        meDe.beanA2643FEQU = Ext.getCmp(prototype.id + '-de-lblequival').getValue();
        meDe.beanA2643MFEQ = Ext.getCmp(prototype.id + '-de-lblcurren').getValue();
        meDe.beanA2643SEASO = Ext.getCmp(prototype.id + '-de-lblseason').getValue();
        meDe.beanA2643STOP = Ext.getCmp(prototype.id + '-de-lblstpv').getValue();
        meDe.beanA2643TPSJ = Ext.getCmp(prototype.id + '-de-lblpxtype').getValue();
        meDe.beanA2643EPAIS = Ext.getCmp(prototype.id + '-de-lblcntryex').getValue();

        meDe.beanA2643BDSD = Ext.getCmp(prototype.id + '-de-lblblckfromit').getValue();
        meDe.beanA2643BHST = Ext.getCmp(prototype.id + '-de-lblbkto').getValue();
        meDe.beanA2643PDES = Ext.getCmp(prototype.id + '-de-lblperdisc').getValue();
        meDe.beanA2643CAPP = Ext.getCmp(prototype.id + '-de-lblapp').getValue();
        meDe.beanA2643NPAX = Ext.getCmp(prototype.id + '-de-lblnpax').getValue();
        meDe.beanA2643TKT = Ext.getCmp(prototype.id + '-de-lbltickow').getValue();
        meDe.beanA2643EMIN = Ext.getCmp(prototype.id + '-de-lblminstay').getValue();
        meDe.beanA2643EMAX = Ext.getCmp(prototype.id + '-de-lblmaxstay').getValue();
        meDe.beanA2643IT2 = Ext.getCmp(prototype.id + '-de-lblit2').getValue();
        meDe.beanA2643CGRUP = Ext.getCmp(prototype.id + '-de-lblcance').getValue();
        meDe.beanA2643CCCAM = Ext.getCmp(prototype.id + '-de-lblCHGCAR').getValue();
        meDe.beanA2643MCCCA = Ext.getCmp(prototype.id + '-de-lblcurrencychan').getValue();


        meDe.beanA2643SVARI = Ext.getCmp(prototype.id + '-de-lblvariablecow').getValue();
        meDe.beanA2643HSALI = Ext.getCmp(prototype.id + '-de-lbldeparturetime').getValue();
        meDe.beanA2643HLLEG = Ext.getCmp(prototype.id + '-de-lblarrivaltime').getValue();
        meDe.beanA2643CODIG = Ext.getCmp(prototype.id + '-de-lblcodew').getValue();
        meDe.beanA2643DSUPF = Ext.getCmp(prototype.id + '-de-lbldiscupw').getValue();


        var beanString = JSON.stringify(meDe.bean);
        meDe.params = {
            bean: meDe.bean,
            beanString: beanString
        };

        return meDe.params;
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);

        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        }
        else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "I";
                        this.crud();
                    }
                }
            });
        }
    },
    crud: function() {
        var p = this.view.params;
        var strOption = p.action;

        Ext.Ajax.request({
            url: this.url + '/mantenimientoITNetas',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                console.log(objRtn);
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: 1,
                    fn: function() {
                        //exito
                        Ext.getCmp(prototype.id + '-dataEntry').close();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    onUpdateClick: function(btn) {


        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);

        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        }
        else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                scope: this,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "U";
                        this.crud();
                    }
                }
            });
        }
    }
    ,
    onDeleteClick: function(btn) {

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.view.params.action = "D";

                    this.crud();
                }
            }
        });
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    validateForm: function(params) {
        params = params.bean;


        var mensaje = "";


        if (params.A2644ID === '') {
            mensaje = 'Required Field, ID';
            Ext.getCmp(prototype.id + '-de-lblid').focus();
            return mensaje;
        }

        return mensaje;

    }


});


