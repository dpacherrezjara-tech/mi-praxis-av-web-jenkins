Ext.define('Ext.Praxis.controller.payments.MerchantNumber.DataEntryMerchantNumberDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryMerchantNumberDetailController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    merchantSelected: '',
    colIndex: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    beanTemp:  {},
    beanTempMirror:  {},
    // </editor-fold>
    init: function (view) {
        prototype.id = 'MerchantNumberForm';
        prototype.url = CONTEXTPATH + '/MerchantNumber';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.colIndex = this.p.rec.colIndex;
        this.merchantSelected = this.bean.data.CMERCHAN
        console.log(this.bean, 'THIS.BEAN')
        console.log(this.colIndex, 'THIS.COLINDEX')
//        this.lstCountry = this.p.lstCountry;
//        console.log(this.p);
//        this.obtainData();
        //this.dataStatic();
        
    },
//    dataStatic: function () {
//        let miStoreIATA = Ext.create('Ext.data.Store', {
//            fields: ['DSAP', 'ATA', 'CANAL', 'PROCESS', 'COUNTRY', 'descCOUNTRY', 'SOCVENTA', 'MONVENTA', 'PROCENTER'],
//            data: [
//                { DSAP: 'I10990722', ATA: '10990722', CANAL: 'ATO-CTO', PROCESS: 'Punto Propio Presencial', COUNTRY: '', descCOUNTRY: 'UNITED STATES', SOCVENTA: 'AV01', MONVENTA: 'USD', PROCENTER: '1AVMIA17' },
//                { DSAP: 'I10990722', ATA: '10990722', CANAL: 'ATO-CTO', PROCESS: 'Punto Propio Presencial', COUNTRY: '', descCOUNTRY: 'UNITED STATES', SOCVENTA: 'AV01', MONVENTA: 'USD', PROCENTER: '1AVMIA17' },
//                { DSAP: 'I10990722', ATA: '10990722', CANAL: 'ATO-CTO', PROCESS: 'Punto Propio Presencial', COUNTRY: '', descCOUNTRY: 'UNITED STATES', SOCVENTA: 'AV01', MONVENTA: 'USD', PROCENTER: '1AVMIA17' },
//                { DSAP: 'I10990722', ATA: '10990722', CANAL: 'ATO-CTO', PROCESS: 'Punto Propio Presencial', COUNTRY: '', descCOUNTRY: 'UNITED STATES', SOCVENTA: 'AV01', MONVENTA: 'USD', PROCENTER: '1AVMIA17' },
//                { DSAP: 'I10990722', ATA: '10990722', CANAL: 'ATO-CTO', PROCESS: 'Punto Propio Presencial', COUNTRY: '', descCOUNTRY: 'UNITED STATES', SOCVENTA: 'AV01', MONVENTA: 'USD', PROCENTER: '1AVMIA17' },
//                { DSAP: 'I10990722', ATA: '10990722', CANAL: 'ATO-CTO', PROCESS: 'Punto Propio Presencial', COUNTRY: '', descCOUNTRY: 'UNITED STATES', SOCVENTA: 'AV01', MONVENTA: 'USD', PROCENTER: '1AVMIA17' },
//                { DSAP: 'I10990722', ATA: '10990722', CANAL: 'ATO-CTO', PROCESS: 'Punto Propio Presencial', COUNTRY: '', descCOUNTRY: 'UNITED STATES', SOCVENTA: 'AV01', MONVENTA: 'USD', PROCENTER: '1AVMIA17' },
//                { DSAP: 'I10990722', ATA: '10990722', CANAL: 'ATO-CTO', PROCESS: 'Punto Propio Presencial', COUNTRY: '', descCOUNTRY: 'UNITED STATES', SOCVENTA: 'AV01', MONVENTA: 'USD', PROCENTER: '1AVMIA17' },
//                { DSAP: 'I10990722', ATA: '10990722', CANAL: 'ATO-CTO', PROCESS: 'Punto Propio Presencial', COUNTRY: '', descCOUNTRY: 'UNITED STATES', SOCVENTA: 'AV01', MONVENTA: 'USD', PROCENTER: '1AVMIA17' },
//                { DSAP: 'I10990722', ATA: '10990722', CANAL: 'ATO-CTO', PROCESS: 'Punto Propio Presencial', COUNTRY: '', descCOUNTRY: 'UNITED STATES', SOCVENTA: 'AV01', MONVENTA: 'USD', PROCENTER: '1AVMIA17' },
//                { DSAP: 'I10990722', ATA: '10990722', CANAL: 'ATO-CTO', PROCESS: 'Punto Propio Presencial', COUNTRY: '', descCOUNTRY: 'UNITED STATES', SOCVENTA: 'AV01', MONVENTA: 'USD', PROCENTER: '1AVMIA17' },
//                { DSAP: 'I10990722', ATA: '10990722', CANAL: 'ATO-CTO', PROCESS: 'Punto Propio Presencial', COUNTRY: '', descCOUNTRY: 'UNITED STATES', SOCVENTA: 'AV01', MONVENTA: 'USD', PROCENTER: '1AVMIA17' },
//                { DSAP: 'I10990722', ATA: '10990722', CANAL: 'ATO-CTO', PROCESS: 'Punto Propio Presencial', COUNTRY: '', descCOUNTRY: 'UNITED STATES', SOCVENTA: 'AV01', MONVENTA: 'USD', PROCENTER: '1AVMIA17' },
//                { DSAP: 'I10990722', ATA: '10990722', CANAL: 'ATO-CTO', PROCESS: 'Punto Propio Presencial', COUNTRY: '', descCOUNTRY: 'UNITED STATES', SOCVENTA: 'AV01', MONVENTA: 'USD', PROCENTER: '1AVMIA17' },
//            ]
//        })
//        let gridIata = Ext.getCmp(prototype.id + '-gridDataInfoIATAS');
//        gridIata.bindStore(miStoreIATA)
//        
//        let miStoreBank = Ext.create('Ext.data.Store', {
//            fields: ['BANKCODE', 'BANKNAME', 'BANKCOMP', 'DEPCURR', 'ACCNUMBER', 'AUXACCACCO', 'AUXACCACCO'],
//            data: [
//                { BANKCODE: '0270', BANKNAME: 'JPMorgan Chase Bank,', BANKCOMP: 'A500', DEPCURR: 'USD', ACCNUMBER: '581936155', AUXACCACCO: '101463', AUXACCACCO: '1A5US099' },
//                { BANKCODE: '0270', BANKNAME: 'JPMorgan Chase Bank,', BANKCOMP: 'A500', DEPCURR: 'USD', ACCNUMBER: '581936155', AUXACCACCO: '101463', AUXACCACCO: '1A5US099' },
//                { BANKCODE: '0270', BANKNAME: 'JPMorgan Chase Bank,', BANKCOMP: 'A500', DEPCURR: 'USD', ACCNUMBER: '581936155', AUXACCACCO: '101463', AUXACCACCO: '1A5US099' },
//                { BANKCODE: '0270', BANKNAME: 'JPMorgan Chase Bank,', BANKCOMP: 'A500', DEPCURR: 'USD', ACCNUMBER: '581936155', AUXACCACCO: '101463', AUXACCACCO: '1A5US099' },
//                { BANKCODE: '0270', BANKNAME: 'JPMorgan Chase Bank,', BANKCOMP: 'A500', DEPCURR: 'USD', ACCNUMBER: '581936155', AUXACCACCO: '101463', AUXACCACCO: '1A5US099' },
//                { BANKCODE: '0270', BANKNAME: 'JPMorgan Chase Bank,', BANKCOMP: 'A500', DEPCURR: 'USD', ACCNUMBER: '581936155', AUXACCACCO: '101463', AUXACCACCO: '1A5US099' },
//                { BANKCODE: '0270', BANKNAME: 'JPMorgan Chase Bank,', BANKCOMP: 'A500', DEPCURR: 'USD', ACCNUMBER: '581936155', AUXACCACCO: '101463', AUXACCACCO: '1A5US099' },
//                { BANKCODE: '0270', BANKNAME: 'JPMorgan Chase Bank,', BANKCOMP: 'A500', DEPCURR: 'USD', ACCNUMBER: '581936155', AUXACCACCO: '101463', AUXACCACCO: '1A5US099' },
//                { BANKCODE: '0270', BANKNAME: 'JPMorgan Chase Bank,', BANKCOMP: 'A500', DEPCURR: 'USD', ACCNUMBER: '581936155', AUXACCACCO: '101463', AUXACCACCO: '1A5US099' },
//                { BANKCODE: '0270', BANKNAME: 'JPMorgan Chase Bank,', BANKCOMP: 'A500', DEPCURR: 'USD', ACCNUMBER: '581936155', AUXACCACCO: '101463', AUXACCACCO: '1A5US099' },
//                { BANKCODE: '0270', BANKNAME: 'JPMorgan Chase Bank,', BANKCOMP: 'A500', DEPCURR: 'USD', ACCNUMBER: '581936155', AUXACCACCO: '101463', AUXACCACCO: '1A5US099' },
//                { BANKCODE: '0270', BANKNAME: 'JPMorgan Chase Bank,', BANKCOMP: 'A500', DEPCURR: 'USD', ACCNUMBER: '581936155', AUXACCACCO: '101463', AUXACCACCO: '1A5US099' },
//                { BANKCODE: '0270', BANKNAME: 'JPMorgan Chase Bank,', BANKCOMP: 'A500', DEPCURR: 'USD', ACCNUMBER: '581936155', AUXACCACCO: '101463', AUXACCACCO: '1A5US099' },
//                
//            ]
//        }) 
//        let gridBank = Ext.getCmp(prototype.id + '-gridDataInfoBANCOS');
//        gridBank.bindStore(miStoreBank)
//        
//        this.setValue('de-txtMERCHN', '96455739')
//        this.setValue('de-txtSCOUNTRY', '92690113')
//        this.setValue('de-txtSCARCOD', '96455739')
//        this.setValue('de-txtCTABANK', '96455739')
//        this.setValue('de-txtAFBRANCH', '96455739')
//        this.setValue('de-txtACQPROC', 'CREDOMATIC PANAMA')
//        this.setValue('de-txtAPCODE', 'CM')
//        this.setValue('de-txtDOWNREPORT', 'Plataforma Web - GAW / Correo Electronico - Orquestador')
//        this.setValue('de-txtFRANCH1', 'VI')
//        this.setValue('de-txtFRANCH2', 'CA')
//        this.setValue('de-txtFRANCH3', 'DS')
//        this.setValue('de-txtFRANCH4', 'DS')
//        
//    },
    afterRender: function () {
//        console.log('afterRender');
        switch (this.actionCode) {
            case 'I':
                
                Ext.getCmp(prototype.id + '-de-txtMERCHN').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtAFBRANCH').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtDOWNREPORT').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtAPCODE').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtACQPROC').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtFRANCH1').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtFRANCH2').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtFRANCH3').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtFRANCH4').setEditable(true);
                Ext.getCmp(prototype.id + '-CODEBANK').setEditable(true);
                Ext.getCmp(prototype.id + '-BANKNAM').setEditable(true);
                Ext.getCmp(prototype.id + '-BANKCM').setEditable(true);
                Ext.getCmp(prototype.id + '-BANKCUR').setEditable(true);
                Ext.getCmp(prototype.id + '-ACCNUMB').setEditable(true);
                Ext.getCmp(prototype.id + '-ACCNUMA').setEditable(true);
                Ext.getCmp(prototype.id + '-BENCEN').setEditable(true);
                Ext.getCmp(prototype.id + '-DEUSAP').setEditable(true);
                Ext.getCmp(prototype.id + '-SAGENT').setEditable(true);
                Ext.getCmp(prototype.id + '-CANAL').setEditable(true);
                Ext.getCmp(prototype.id + '-PROCES').setEditable(true);
                Ext.getCmp(prototype.id + '-SCOUNTRY').setEditable(true);
                Ext.getCmp(prototype.id + '-SOCIETY').setEditable(true);
                Ext.getCmp(prototype.id + '-SCURRENCY').setEditable(true);
                Ext.getCmp(prototype.id + '-SBENCEN').setEditable(true);
//                Ext.getCmp(prototype.id + '-de-txtMERCHN').setDisabled(false);
                Ext.getCmp(prototype.id + '-btn-save_D').show();
                Ext.getCmp(prototype.id + '-btn-update_D').hide();
                Ext.getCmp(prototype.id + '-btn-delete_D').hide();
                Ext.getCmp(prototype.id + '-btn-cancel_D').show();
                break;
            case 'U':
//                this.getData();
                this.mostrarData();
                
//                this.DeshabilitarCampoClave();
//                Ext.getCmp(prototype.id + '-panelTabMain').hide();
                Ext.getCmp(prototype.id + '-de-txtAFBRANCH_D').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtDOWNREPORT_D').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtAPCODE_D').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtACQPROC_D').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtFRANCH1_D').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtFRANCH2_D').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtFRANCH3_D').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtFRANCH4_D').setEditable(true);
                Ext.getCmp(prototype.id + '-CODEBANK_D').setEditable(true);
                Ext.getCmp(prototype.id + '-BANKNAM_D').setEditable(true);
                Ext.getCmp(prototype.id + '-BANKCM_D').setEditable(true);
                Ext.getCmp(prototype.id + '-BANKCUR_D').setEditable(true);
                Ext.getCmp(prototype.id + '-ACCNUMB_D').setEditable(true);
                Ext.getCmp(prototype.id + '-ACCNUMA_D').setEditable(true);
                Ext.getCmp(prototype.id + '-ACCNUMOLD_D').setEditable(true);
                Ext.getCmp(prototype.id + '-DDISCON_D').setEditable(true);
                Ext.getCmp(prototype.id + '-IDFISCAL_D').setEditable(true);
                Ext.getCmp(prototype.id + '-BENCEN_D').setEditable(true);
                Ext.getCmp(prototype.id + '-DEUSAP_D').setEditable(true);
                Ext.getCmp(prototype.id + '-SAGENT_D').setEditable(true);
                Ext.getCmp(prototype.id + '-CANAL_D').setEditable(true);
                Ext.getCmp(prototype.id + '-PROCES_D').setEditable(true);
                Ext.getCmp(prototype.id + '-SCOUNTRY_D').setEditable(true);
                Ext.getCmp(prototype.id + '-SOCIETY_D').setEditable(true);
                Ext.getCmp(prototype.id + '-SCURRENCY_D').setEditable(true);
                Ext.getCmp(prototype.id + '-SBENCEN_D').setEditable(true);
                Ext.getCmp(prototype.id + '-COSTCEN_D').setEditable(true);
                Ext.getCmp(prototype.id + '-IDFBENEF_D').setEditable(true);
//                Ext.getCmp(prototype.id + '-bankSection').hide();
//                Ext.getCmp(prototype.id + '-iataSection').hide();
//                Ext.getCmp(prototype.id + '-bSection_1').hide();
//                Ext.getCmp(prototype.id + '-bSection_2').hide();
//                Ext.getCmp(prototype.id + '-bSection_3').hide();
//                Ext.getCmp(prototype.id + '-iSection_1').hide();
//                Ext.getCmp(prototype.id + '-iSection_2').hide();
//                Ext.getCmp(prototype.id + '-iSection_3').hide();
                Ext.getCmp(prototype.id + '-btn-save_D').hide();
                Ext.getCmp(prototype.id + '-btn-update_D').show();
                
                if (this.colIndex === 8) {
                    Ext.getCmp(prototype.id + '-btn-delete_D').show();
                    Ext.getCmp(prototype.id + '-de-txtMERCHN_D').setEditable(false);
                } else {
                    Ext.getCmp(prototype.id + '-btn-delete_D').hide();
                    Ext.getCmp(prototype.id + '-de-txtMERCHN_D').setEditable(true);
                }
                
                Ext.getCmp(prototype.id + '-btn-cancel_D').show();
                break;
        }
        Ext.getCmp(prototype.id + '-de-txtDEFFEC').setEditable(false);
        
    },
    mostrarData: function () {
//        console.log(meDE.beanResult);
//        console.log(this.beanResult.CODEREJ);
        this.dataObtain.CARD = 2;
        this.dataObtain.COREP = 2;
        this.dataObtain.CARDEQUIVALENT = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText); 
                console.log(res, 'res')
                if (res.success) {
                    
                    me.lstCountry = res.lstCountry;
                    me.lstBank = res.lstBank;
                    Ext.getCmp(prototype.id + '-de-txtFRANCH1_D').bindStore(
                        Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-de-txtFRANCH2_D').bindStore(
                        Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-de-txtFRANCH3_D').bindStore(
                        Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-de-txtFRANCH4_D').bindStore(
                        Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-de-txtAPCODE_D').bindStore(
                        Ext.create('Ext.data.Store', { data: res.lstProcessor, autoLoad: true}));
                
                    Ext.getCmp(prototype.id + '-de-txtEQUIVALENT_1').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-de-txtEQUIVALENT_2').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-de-txtEQUIVALENT_3').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-de-txtEQUIVALENT_4').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-de-txtEQUIVALENT_5').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-de-txtEQUIVALENT_6').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-de-txtEQUIVALENT_7').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-de-txtEQUIVALENT_8').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-de-txtEQUIVALENT_9').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                
                } else
                    global.Msg({msg: res.sesion});
            }
        });
        console.log('dadsadasdadasdadad',this.bean.data )
        this.setValue('de-txtMERCHN_D', this.bean.data.CMERCHAN)
      
        this.setValue('de-txtAFBRANCH_D', this.bean.data.SUCMERCH)
        this.setValue('de-txtACQPROC_D', this.bean.data.CORE)
        this.setValue('de-txtAPCODE_D', this.bean.data.CODE)
        this.setValue('de-txtDOWNREPORT_D', this.bean.data.DREPORT)
        this.setValue('de-txtFRANCH1_D', this.bean.data.FRANC1)
        this.setValue('de-txtFRANCH2_D', this.bean.data.FRANC2)
        this.setValue('de-txtFRANCH3_D', this.bean.data.FRANC3)
        this.setValue('de-txtFRANCH4_D', this.bean.data.FRANC4)
        
        this.setValue('de-txtEQUIVALENT_1', this.bean.data.EQUIVA1)
        this.setValue('de-txtEQUIVALENT_2', this.bean.data.EQUIVA2)
        this.setValue('de-txtEQUIVALENT_3', this.bean.data.EQUIVA3)
        this.setValue('de-txtEQUIVALENT_4', this.bean.data.EQUIVA4)
        this.setValue('de-txtEQUIVALENT_5', this.bean.data.EQUIVA5)
        this.setValue('de-txtEQUIVALENT_6', this.bean.data.EQUIVA6)
        this.setValue('de-txtEQUIVALENT_7', this.bean.data.EQUIVA7)
        this.setValue('de-txtEQUIVALENT_8', this.bean.data.EQUIVA8)
        this.setValue('de-txtEQUIVALENT_9', this.bean.data.EQUIVA9)
        
        
        //        this.setValue('de-txtFRANCH4_D', this.bean.data.FRANC4)
        this.setValue('CODEBANK_D', this.bean.data.CODEBANK),
        this.setValue('codProccesing', this.bean.data.CODPRO),
        this.setValue('BANKNAM_D', this.bean.data.BANKNAM),
        this.setValue('BANKCM_D', this.bean.data.BANKCM),
        this.setValue('BANKCUR_D', this.bean.data.BANKCUR),
        this.setValue('ACCNUMB_D', this.bean.data.ACCNUMB),
        this.setValue('ACCNUMOLD_D', this.bean.data.ACCNUMOLD),
        this.setValue('DDISCON_D', this.bean.data.DDISCON),
        this.setValue('ACCNUMA_D', this.bean.data.ACCNUMA),
        this.setValue('IDFISCAL_D', this.bean.data.IDFISCAL),
        this.setValue('BENCEN_D', this.bean.data.BENCEN),
        this.setValue('DEUSAP_D', this.bean.data.DEUSAP),
        this.setValue('SAGENT_D', this.bean.data.SAGENT),
        this.setValue('CANAL_D', this.bean.data.CANAL),
        this.setValue('PROCES_D', this.bean.data.PROCES),
        this.setValue('SCOUNTRY_D', this.bean.data.SCOUNTRY),
        this.setValue('SOCIETY_D', this.bean.data.SOCIETY),
        this.setValue('SCURRENCY_D', this.bean.data.SCURRENCY),
        this.setValue('SBENCEN_D', this.bean.data.SBENCEN),
        this.setValue('COSTCEN_D', this.bean.data.COSTCEN),
        this.setValue('IDFBENEF_D', this.bean.data.IDFBENEF),
        
        this.setValue('de-txtDEFFEC', this.bean.data.DEFFEC)
        

        this.setValue('txtUSCR_D', this.bean.data.USCR);
        this.setValue('txtFECR_D', this.bean.data.FECR);
        this.setValue('txtHOCR_D', this.bean.data.HOCR);
        this.setValue('txtUSUP_D', this.bean.data.USUP);
        this.setValue('txtFEUP_D', this.bean.data.FEUP);
        this.setValue('txtHOUP_D', this.bean.data.HOUP);
        this.llenarDataMirror();
//        this.setGridIATA(this.beanResult.MERCHN);
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {
        beanTemp.CMERCHAN = this.bean.data.CMERCHAN
        beanTemp.SUCMERCH = this.bean.data.SUCMERCH
        beanTemp.CODEBANK = this.bean.data.CODEBANK
        beanTemp.ACCNUMB = this.bean.data.ACCNUMB
        beanTemp.SAGENT = this.bean.data.SAGENT
        
        beanTemp.IN_CMERCHAN = this.getValue("de-txtMERCHN_D")
        beanTemp.IN_SUCMERCH = this.getValue("de-txtAFBRANCH_D")
        beanTemp.IN_CODEBANK = this.getValue("CODEBANK_D")
        beanTemp.IN_ACCNUMB = this.getValue("ACCNUMB_D")
        beanTemp.IN_SAGENT = this.getValue("SAGENT_D")
        beanTemp.IN_BANKNAM = this.getValue("BANKNAM_D")
        beanTemp.IN_DREPORT = this.getValue("de-txtDOWNREPORT_D")
        beanTemp.IN_CODE = this.getValue("de-txtAPCODE_D")
        beanTemp.IN_CORE = this.getValue("de-txtACQPROC_D")
        beanTemp.IN_FRANC1 = this.getValue("de-txtFRANCH1_D")
        beanTemp.IN_FRANC2 = this.getValue("de-txtFRANCH2_D")
        beanTemp.IN_FRANC3 = this.getValue("de-txtFRANCH3_D")
        beanTemp.IN_FRANC4 = this.getValue("de-txtFRANCH4_D")
        beanTemp.IN_CODPRO = this.getValue("codProccesing")
        
        beanTemp.IN_EQUIVA1 = this.getValue("de-txtEQUIVALENT_1")
        beanTemp.IN_EQUIVA2 = this.getValue("de-txtEQUIVALENT_2")
        beanTemp.IN_EQUIVA3 = this.getValue("de-txtEQUIVALENT_3")
        beanTemp.IN_EQUIVA4 = this.getValue("de-txtEQUIVALENT_4")
        beanTemp.IN_EQUIVA5 = this.getValue("de-txtEQUIVALENT_5")
        beanTemp.IN_EQUIVA6 = this.getValue("de-txtEQUIVALENT_6")
        beanTemp.IN_EQUIVA7 = this.getValue("de-txtEQUIVALENT_7")
        beanTemp.IN_EQUIVA8 = this.getValue("de-txtEQUIVALENT_8")
        beanTemp.IN_EQUIVA9 = this.getValue("de-txtEQUIVALENT_9")
        
        beanTemp.IN_BANKCM = this.getValue("BANKCM_D")
        beanTemp.IN_BANKCUR = this.getValue("BANKCUR_D")
        beanTemp.IN_ACCNUMOLD = this.getValue("ACCNUMOLD_D")
        beanTemp.IN_DDISCON = this.getValue("DDISCON_D")
        beanTemp.IN_ACCNUMA = this.getValue("ACCNUMA_D")
        beanTemp.IN_IDFISCAL = this.getValue("IDFISCAL_D")
        beanTemp.IN_BENCEN = this.getValue("BENCEN_D")
        beanTemp.IN_DEUSAP = this.getValue("DEUSAP_D")
        beanTemp.IN_CANAL = this.getValue("CANAL_D")
        beanTemp.IN_PROCES = this.getValue("PROCES_D")
        beanTemp.IN_SCOUNTRY = this.getValue("SCOUNTRY_D")
        beanTemp.IN_SOCIETY = this.getValue("SOCIETY_D")
        beanTemp.IN_SCURRENCY = this.getValue("SCURRENCY_D")
        beanTemp.IN_SBENCEN = this.getValue("SBENCEN_D")
        beanTemp.IN_COSTCEN = this.getValue("COSTCEN_D")
        beanTemp.IN_IDFBENEF = this.getValue("IDFBENEF_D")
        beanTemp.USCR = this.getValue("txtUSCR_D").trim();
        beanTemp.FECR = this.getValue("txtFECR_D").trim();
        beanTemp.HOCR = this.getValue("txtHOCR_D").trim();
        beanTemp.USUP = this.getValue("txtUSUP_D").trim();
        beanTemp.FEUP = this.getValue("txtFEUP_D").trim();
        beanTemp.HOUP = this.getValue("txtHOUP_D").trim();

        console.log(beanTemp,'BEANTEMP-NUEVO-MERCHANT')
    },
    llenarDataMirror: function () {
        this.beanTempMirror = {};
        this.beanTempMirror.CMERCHAN = this.bean.data.CMERCHAN
        this.beanTempMirror.SUCMERCH = this.bean.data.SUCMERCH
        this.beanTempMirror.CODEBANK = this.bean.data.CODEBANK
        this.beanTempMirror.ACCNUMB = this.bean.data.ACCNUMB
        this.beanTempMirror.SAGENT = this.bean.data.SAGENT
        
        this.beanTempMirror.IN_CMERCHAN = this.getValue("de-txtMERCHN_D")
        this.beanTempMirror.IN_SUCMERCH = this.getValue("de-txtAFBRANCH_D")
        this.beanTempMirror.IN_CODEBANK = this.getValue("CODEBANK_D")
        this.beanTempMirror.IN_ACCNUMB = this.getValue("ACCNUMB_D")
        this.beanTempMirror.IN_SAGENT = this.getValue("SAGENT_D")
        this.beanTempMirror.IN_BANKNAM = this.getValue("BANKNAM_D")
        this.beanTempMirror.IN_DREPORT = this.getValue("de-txtDOWNREPORT_D")
        this.beanTempMirror.IN_CODE = this.getValue("de-txtAPCODE_D")
        this.beanTempMirror.IN_CORE = this.getValue("de-txtACQPROC_D")
        this.beanTempMirror.IN_FRANC1 = this.getValue("de-txtFRANCH1_D")
        this.beanTempMirror.IN_FRANC2 = this.getValue("de-txtFRANCH2_D")
        this.beanTempMirror.IN_FRANC3 = this.getValue("de-txtFRANCH3_D")
        this.beanTempMirror.IN_FRANC4 = this.getValue("de-txtFRANCH4_D")
        
        this.beanTempMirror.IN_EQUIVA1 = this.getValue("de-txtEQUIVALENT_1")
        this.beanTempMirror.IN_EQUIVA2 = this.getValue("de-txtEQUIVALENT_2")
        this.beanTempMirror.IN_EQUIVA3 = this.getValue("de-txtEQUIVALENT_3")
        this.beanTempMirror.IN_EQUIVA4 = this.getValue("de-txtEQUIVALENT_4")
        this.beanTempMirror.IN_EQUIVA5 = this.getValue("de-txtEQUIVALENT_5")
        this.beanTempMirror.IN_EQUIVA6 = this.getValue("de-txtEQUIVALENT_6")
        this.beanTempMirror.IN_EQUIVA7 = this.getValue("de-txtEQUIVALENT_7")
        this.beanTempMirror.IN_EQUIVA8 = this.getValue("de-txtEQUIVALENT_8")
        this.beanTempMirror.IN_EQUIVA9 = this.getValue("de-txtEQUIVALENT_9")
        this.beanTempMirror.IN_CODPRO = this.getValue("codProccesing")
        
        
        this.beanTempMirror.IN_BANKCM = this.getValue("BANKCM_D")
        this.beanTempMirror.IN_BANKCUR = this.getValue("BANKCUR_D")
        this.beanTempMirror.IN_ACCNUMOLD = this.getValue("ACCNUMOLD_D")
        this.beanTempMirror.IN_DDISCON = this.getValue("DDISCON_D")
        this.beanTempMirror.IN_ACCNUMA = this.getValue("ACCNUMA_D")
        this.beanTempMirror.IN_IDFISCAL = this.getValue("IDFISCAL_D")
        this.beanTempMirror.IN_BENCEN = this.getValue("BENCEN_D")
        this.beanTempMirror.IN_DEUSAP = this.getValue("DEUSAP_D")
        this.beanTempMirror.IN_CANAL = this.getValue("CANAL_D")
        this.beanTempMirror.IN_PROCES = this.getValue("PROCES_D")
        this.beanTempMirror.IN_SCOUNTRY = this.getValue("SCOUNTRY_D")
        this.beanTempMirror.IN_SOCIETY = this.getValue("SOCIETY_D")
        this.beanTempMirror.IN_SCURRENCY = this.getValue("SCURRENCY_D")
        this.beanTempMirror.IN_SBENCEN = this.getValue("SBENCEN_D")
        this.beanTempMirror.IN_COSTCEN = this.getValue("COSTCEN_D")
        this.beanTempMirror.IN_IDFBENEF = this.getValue("IDFBENEF_D")
        this.beanTempMirror.USCR = this.getValue("txtUSCR_D").trim();
        this.beanTempMirror.FECR = this.getValue("txtFECR_D").trim();
        this.beanTempMirror.HOCR = this.getValue("txtHOCR_D").trim();
        this.beanTempMirror.USUP = this.getValue("txtUSUP_D").trim();
        this.beanTempMirror.FEUP = this.getValue("txtFEUP_D").trim();
        this.beanTempMirror.HOUP = this.getValue("txtHOUP_D").trim();

        console.log(this.beanTempMirror,'BEANTEMP-MIRROR')
    },
    getData: function () {
//        console.log('getData');
//        var cmbUNIOPE = Ext.getCmp(prototype.id + '-de-cmbUNIOPE');
//        cmbUNIOPE.bindStore(Ext.create('Ext.data.ArrayStore', {
//            autoLoad: false,
//            fields: ['code', 'name'],
//            data: [
//                ["", "None"],
//                ["1", "Aerovias MX"],
//                ["2", "Aeromexico Cargo"],
//                ["3", "PLM"]
//            ]
//        }));
//        cmbUNIOPE.setValue('');
//        var cmbSTATUS = Ext.getCmp(prototype.id + '-de-cmbSTATUS');
//        cmbSTATUS.bindStore(Ext.create('Ext.data.ArrayStore', {
//            autoLoad: false,
//            fields: ['code', 'name'],
//            data: [
//                ["", "None"],
//                ["0", "Disabled"],
//                ["1", "Enabled"],
//            ]
//        }));
//        cmbSTATUS.setValue('');
//
//        var cmbCANAL = Ext.getCmp(prototype.id + '-de-cmbCANAL');
//        cmbCANAL.bindStore(Ext.create('Ext.data.ArrayStore', {
//            autoLoad: false,
//            fields: ['code', 'name'],
//            data: [
//                ["", "none"],
//                ["ATO", "ATO - Aeropuert"],
//                ["CTO", "CTO - Oficina"],
//                ["CCT", "CCT - Reserva"],
//                ["WEB", "WEB - Web"],
//                ["GSA", "GSA - G.S.Agte"],
//                ["FRA", "FRA - Franquic"],
//            ]
//        }));
//
//        var cmbSCOUNTRY = Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY');
//        cmbSCOUNTRY.bindStore(Ext.create('Ext.data.ArrayStore', {
//            autoLoad: false,
//            fields: ['code', 'name'],
//            data: [
//                ["", "none"],
//                ["US", "US - UNITED STATES"],
//                ["CA", "CA - CANADA"],
//                ["AR", "AR - ARGENTINA"],
//                ["JP", "JP - JAPAN"],
//                ["ES", "ES - SPAIN"],
//                ["MX", "MX - MEXICO"],
//            ]
//        }));


//        var beanString = JSON.stringify(meDE.bean.data);
//        console.log(meDE.bean.data, 'meDE.bean.data')
//        Ext.Ajax.request({
//            url: prototype.url + '/searchCompleteDetail',
//            method: 'POST',
//            timeout: 60000000,
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
//            params: {beanString: beanString},
//            success: function (response, options) {
//                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
//                var resDETAIL = Ext.JSON.decode(response.responseText);
//                console.log(resDETAIL.result, 'watafaaaaaaaaaaaaaaaaaaaaaa')
//                meDE.beanResult = resDETAIL.result;
//                meDE.mostrarData();
//                 
//            }
//        });
        
//        var paramDetailMerchants = {};
//        paramDetailMerchants.beanString = JSON.stringify(meDE.bean.data);
//        console.log('meDE.bean.data', meDE.bean.data)
//        Ext.Ajax.request({
//            url: prototype.url + '/searchMerchants',
//            method: 'POST',
//            timeout: 60000000,
//            params: paramDetailMerchants,
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
//            success: function (response, opts) {
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
//                var resMerchant = Ext.JSON.decode(response.responseText);
//                console.log(resBank, 'res');
//                if (resMerchant.success) {
//                    console.log(resBank.data, 'res.data')
//                    //llenar grilla gridDataInfoScan
//                    var storeDataMerchant = Ext.create('Ext.data.Store', {
//                        data: resMerchant.data,
//                        autoLoad: true
//                    });
//                    Ext.getCmp(prototype.id + '-gridDataInfoMerchant').bindStore(storeDataMerchant);
//                } else {
//                    global.Msg({msg: resMerchant.Mensaje});
//                }
//            },
//            failure: function (response, opts) {
//                console.log('server-side failure with status code ' + response.status);
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
//            }
//        });
         
//        var paramDetailBanks = {};
//        paramDetailBanks.beanString = JSON.stringify(meDE.bean.data);
//        console.log('meDE.bean.data', meDE.bean.data)
//        Ext.Ajax.request({
//            url: prototype.url + '/searchBanks',
//            method: 'POST',
//            timeout: 60000000,
//            params: paramDetailBanks,
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
//            success: function (response, opts) {
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
//                var resBank = Ext.JSON.decode(response.responseText);
//                console.log(resBank, 'res');
//                if (resBank.success) {
//                    console.log(resBank.data, 'res.data')
//                    //llenar grilla gridDataInfoScan
//                    var storeDataBank = Ext.create('Ext.data.Store', {
//                        data: resBank.data,
//                        autoLoad: true
//                    });
//                    Ext.getCmp(prototype.id + '-gridDataInfoBANCOS').bindStore(storeDataBank);
//                } else {
//                    global.Msg({msg: resBank.Mensaje});
//                }
//            },
//            failure: function (response, opts) {
//                console.log('server-side failure with status code ' + response.status);
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
//            }
//        });
//        
//        var paramDetailIatas = {};
//        paramDetailIatas.beanString = JSON.stringify(meDE.bean.data);
//        console.log('meDE.bean.data', meDE.bean.data)
//        console.log('MUESTRA EL PARAMS ');
//        console.log(paramDetailIatas, 'paramDetailIatas' );
//        Ext.Ajax.request({
//            url: prototype.url + '/searchIATAS',
//            method: 'POST',
//            timeout: 60000000,
//            params: paramDetailIatas,
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
//            success: function (response, opts) {
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
//                var resIata = Ext.JSON.decode(response.responseText);
//                console.log(resIata, 'res');
//                if (resIata.success) {
//                    console.log(resIata.data, 'resIata.data')
//                    //llenar grilla gridDataInfoScan
//                    var storeDataIatas = Ext.create('Ext.data.Store', {
//                        data: resIata.data,
//                        autoLoad: true
//                    });
//                    Ext.getCmp(prototype.id + '-gridDataInfoIATAS').bindStore(storeDataIatas);
//                } else {
//                    global.Msg({msg: resIata.Mensaje});
//                }
//            },
//            failure: function (response, opts) {
//                console.log('server-side failure with status code ' + response.status);
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
//            }
//        });
    },
    onViewIATAClick: function( grid, rowIndex, colIndex, item, e, record ){

    },
    onViewBANKClick: function ( grid, rowIndex, colIndex, item, e, record ){
        
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        this.setValue('txtCODSOUR', '');
        this.setValue('txtDESSOU', '');
        this.setValue('txtGRUSOR', '');
        this.setValue('txtstrGRUSOR', '');
        Ext.getCmp(prototype.id + '-lblDescripcion').setText('');
        Ext.getCmp(prototype.id + '-lblDescripcion2').setText('');
        this.setValue('txtUSCR', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSUP', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
        //this.setValue('-de-cmbUNIOPE', '');
    },
    //</editor-fold>
    toUpperCase: function (obj, value, opts) {
//        console.log(obj);
//        console.log(value);
//        console.log(opts);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick_D: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);

                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        this.MaintenanceA2354(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick_D: function (btn) {
        console.log('onUpdateClick');
        console.log(this.colIndex)
        if (this.colIndex === 8) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                buttons: Ext.MessageBox.YESNO,
                //scope: this,
                //animateTarget: btn,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {

                        var beanTemp = {};
                        var msjResult = meDE.validacionUpdate(beanTemp);
                        if (msjResult === '') {
                            meDE.llenarData(beanTemp);

                            beanTemp.option = 'U';
                            meDE.MaintenanceA2354(beanTemp);
                        } else {
                            global.Msg({msg: msjResult});
                        }
                    }
                }
            });
        } else if (this.colIndex === 10) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                buttons: Ext.MessageBox.YESNO,
                //scope: this,
                //animateTarget: btn,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {

                        var beanTemp = {};
                        var msjResult = meDE.validacionInsertHistorico(beanTemp);
                        if (msjResult === '') {
                            meDE.llenarData(beanTemp);

                            beanTemp.option = 'U';
                            meDE.MaintenanceHistoric(beanTemp);
                        } else {
                            global.Msg({msg: msjResult});
                        }
                    }
                }
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to create Merchant?',
                buttons: Ext.MessageBox.YESNO,
                //scope: this,
                //animateTarget: btn,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {

                        var beanTemp = {};
                        var msjResult = meDE.validacionCreateMirror(beanTemp);
                        if (msjResult === '') {
                            meDE.llenarData(beanTemp);
                            beanTemp.option = 'U';
                            meDE.MaintenanceMirror(beanTemp);
                        } else {
                            global.Msg({msg: msjResult});
                        }
                    }
                }
            });
        }
    },
    validacionCreateMirror: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtMERCHN_D").trim() === '') {
            msjResult = "The field Merchant Nbr. cannot be left empty";
        }
        if (this.getValue("de-txtAFBRANCH_D").trim() === '') {
            msjResult = "The field Branch Affiliate cannot be left empty";
        }
        if (this.getValue("CODEBANK_D").trim() === '') {
            msjResult = "The field Bank Code cannot be left empty";
        }
        if (this.getValue("ACCNUMB_D").trim() === '') {
            msjResult = "The field Acc. Number cannot be left empty";
        }
        if (this.getValue("SAGENT_D").trim() === '') {
            msjResult = "The field IATA cannot be left empty";
        }
        return msjResult;
    },
    onDeleteClick_D: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    beanTemp.option = 'D';
                    this.MaintenanceA2354(beanTemp);
                }
            }
        });
    },
    onCancelClick_D: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceA2354: function (beanTemp) {
//        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA2354',
            method: 'POST',
            timeout: 60000000,
//            params: beanTemp,
            params: {beanString: beanString, option: beanTemp.option},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryDetail').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryDetail').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntryDetail').unmask();
                    Ext.getCmp(prototype.id + '-dataEntryDetail').close();
                    Ext.getCmp(prototype.id + '-dataEntry').close();
//                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                } else
                    global.Msg({msg: ''});
            }
        });
    },
    //</editor-fold>

    validacionInsert: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtMERCHN") === '') {
            msjResult = "You must enter the required field.";
        }
        if (this.getValue("de-txtMERCHP") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    validacionUpdate: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtMERCHN_D").trim() === '') {
            msjResult = "The field Merchant Nbr. cannot be left empty";
        }
        if (this.getValue("de-txtAFBRANCH_D").trim() === '') {
            msjResult = "The field Branch Affiliate cannot be left empty";
        }
        if (this.getValue("CODEBANK_D").trim() === '') {
            msjResult = "The field Bank Code cannot be left empty";
        }
        if (this.getValue("ACCNUMB_D").trim() === '') {
            msjResult = "The field Acc. Number cannot be left empty";
        }
        if (this.getValue("SAGENT_D").trim() === '') {
            msjResult = "The field IATA cannot be left empty";
        }
        return msjResult;
        
    },
    validacionInsertHistorico: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtMERCHN_D").trim() === '') {
            msjResult = "The field Merchant Nbr. cannot be left empty";
        }
        if (this.getValue("de-txtAFBRANCH_D").trim() === '') {
            msjResult = "The field Branch Affiliate cannot be left empty";
        }
        if (this.getValue("CODEBANK_D").trim() === '') {
            msjResult = "The field Bank Code cannot be left empty";
        }
        if (this.getValue("ACCNUMB_D").trim() === '') {
            msjResult = "The field Acc. Number cannot be left empty";
        }
        if (this.getValue("SAGENT_D").trim() === '') {
            msjResult = "The field IATA cannot be left empty";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {
        Ext.getCmp(prototype.id + '-de-txtMERCHN').setEditable(false);
        Ext.getCmp(prototype.id + '-de-txtNameCTRY').setReadOnly(true);
    },
    Habilitarlbl: function () {
        Ext.getCmp(prototype.id + '-lblDescripcion').show();
        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function () {
        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
            Ext.getCmp(prototype.id + '-lbldes').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes').show();
        }
    },
    Habilitarlbl1: function () {
        Ext.getCmp(prototype.id + '-lbldes').hide();
        if (this.getValue("txtCODSOUR") === '') {
            Ext.getCmp(prototype.id + '-lbldes2').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes2').show();
        }
    },
    getIATAList: function () {

        var lstIATA = []; // empty array
        var storeIATA = Ext.getCmp(prototype.id + '-gridIATA').getStore();
        var selIATA = storeIATA.getRange();

        Ext.each(selIATA, function (item) {
            var Obj = {
                CIATA: item.get('CIATA'),
            };
            lstIATA.push(Obj);
        }, this);

        console.log(lstIATA);
        var a = [];
        var data = [];
        for (var vi = 0; vi < lstIATA.length; ++vi) {
            // console.log(lstFOPVta[vi]);
            if (a.indexOf(String(lstIATA[vi].CIATA)) < 0) {
                a.push(String(lstIATA[vi].CIATA));

                data.push({
                    CIATA: String(lstIATA[vi].CIATA)
                })
            } else {
                data[a.indexOf(String(lstIATA[vi].CIATA))].CIATA = String(lstIATA[vi].CIATA);
            }
        }
        console.log(data);
        return data;
    },
    addIATA: function () {
        if (Ext.getCmp(prototype.id + '-txtIATA').getValue() !== '') {
            var beanTemp = {};
            beanTemp.changeIATA = true;
            var store_gridIATA = Ext.getCmp(prototype.id + '-gridIATA').getStore();
            var new_IATA = Ext.getCmp(prototype.id + '-txtIATA').getValue()

            Ext.Ajax.request({
                url: prototype.url + '/validateIATA',
                method: 'POST',
                timeout: 60000000,
//            params: beanTemp,
                params: {IATA: new_IATA},
                beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
                success: function (response, opts) {
                    Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                    var res = Ext.JSON.decode(response.responseText);
                    console.log(res);
                    if (res.total > 0) {
                        meDE.insertIATA(store_gridIATA, res.data[0]);
                    } else {
                        global.Msg({msg: 'Not Found / No Travel Agency'});
                    }

                }
            });

        } else {
            global.Msg({msg: 'Registro vacío'});
        }
    },
    insertIATA: function (store_gridIATA, objIATA) {
        var dataRow = {};
        var duplicado = false;
        if (store_gridIATA.data.length > 0) {
            for (var i = 0; i < store_gridIATA.data.length; i++) {
                var dataRow1 = store_gridIATA.data.items[i];
                if (dataRow1.data.CIATA === this.getValue("txtIATA")) {
                    duplicado = true;
                }
            }
            if (!duplicado) {
                dataRow = store_gridIATA.data.items[store_gridIATA.data.length - 1 ].copy();
                dataRow.id = 'ItrecordIATA' + Math.random();
                dataRow.data.CIATA = this.getValue("txtIATA");
                dataRow.data.strDESCRIP = objIATA.A003KEY1;
                dataRow.data.SCOUNTRY = objIATA.A003PAIS;
                dataRow.data.CANAL = objIATA.A003CANAL;
            }
        } else {
            dataRow.id = 'ItrecordIATA';
            dataRow.CIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
            dataRow.strDESCRIP = objIATA.A003KEY1;
            dataRow.SCOUNTRY = objIATA.A003PAIS;
            dataRow.CANAL = objIATA.A003CANAL;
        }

        console.log(dataRow);
        if (!duplicado) {
            store_gridIATA.add(dataRow);
            Ext.getCmp(prototype.id + '-gridIATA').getView().refresh();
            this.clearIATA();
        } else {
            global.Msg({msg: 'Registro duplicado'});
        }
        console.log(store_gridIATA.data.length);
    },
    removeIATA: function (record) {
        var store_gridIATA = Ext.getCmp(prototype.id + '-gridIATA').getStore();
        var rowIndex = store_gridIATA.indexOf(record);
        store_gridIATA.removeAt(rowIndex);

        var beanTemp = {};
        beanTemp.changeIATA = true;
        Ext.getCmp(prototype.id + '-gridIATA').getView().refresh();
        console.log(store_gridIATA.data.length);
    },
    clearIATA: function () {
        Ext.getCmp(prototype.id + '-txtIATA').setValue('');
    },
    setGridIATA: function (MERCHN) {

        Ext.Ajax.request({
            url: prototype.url + '/searchIATA',
            method: 'POST',
            timeout: 60000000,
//            params: beanTemp,
            params: {MERCHN: MERCHN},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                var storeData = Ext.create('Ext.data.Store', {
                    data: res.data,
                    autoLoad: true
                });

                Ext.getCmp(prototype.id + '-gridIATA').bindStore(storeData);

            }
        });
    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
//            this.btnSearch_click();
        }
    },
// </editor-fold>
    MaintenanceMirror: function (beanTemp) {
        var beanString = JSON.stringify(beanTemp);
        var oldBeanString = JSON.stringify(this.beanTempMirror);
        console.log(beanString,'beanString');
        console.log(oldBeanString,'oldBeanString');
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceMirror',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString, option: beanTemp.option, oldBeanString: oldBeanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryDetail').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryDetail').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntryDetail').unmask();
                    Ext.getCmp(prototype.id + '-dataEntryDetail').close();
                    Ext.getCmp(prototype.id + '-dataEntry').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                } else
                    global.Msg({msg: ''});
            }
        });
    },
    MaintenanceHistoric: function (beanTemp) {
        var beanString = JSON.stringify(beanTemp);
        console.log(beanString,beanTemp.option, meDE.merchantSelected)
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceHistoric',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString, option: beanTemp.option, merchant: meDE.merchantSelected},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryDetail').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryDetail').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntryDetail').unmask();
                    Ext.getCmp(prototype.id + '-dataEntryDetail').close();
                    Ext.getCmp(prototype.id + '-dataEntry').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                } else
                    global.Msg({msg: ''});
            }
        });
    }
});