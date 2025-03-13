Ext.define('Ext.Praxis.controller.payments.MerchantNumber.DataEntryMerchantNumberController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryMerchantNumberController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
//    beanTemp:  {},
    // </editor-fold>
    init: function (view) {
        prototype.id = 'MerchantNumberForm';
        prototype.url = CONTEXTPATH + '/MerchantNumber';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;

    },
    afterRender: function () {
        switch (this.actionCode) {
            case 'I':

                this.dataObtain.CARD = 2;
                this.dataObtain.COREP = 2;
                this.dataObtain.CARDEQUIVALENT = 2;

                Ext.Ajax.request({
                    url: prototype.urlMaster + '/obtainData',
                    method: 'POST',
                    timeout: 60000000,
                    params: {beanString: JSON.stringify(this.dataObtain)},
                    success: function (response, options) {
                        var res = Ext.JSON.decode(response.responseText);
                        console.log(res, 'res')
                        if (res.success) {

                            me.lstCountry = res.lstCountry;
                            me.lstBank = res.lstBank;
                            Ext.getCmp(prototype.id + '-de-txtFRANCH1').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtFRANCH2').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtFRANCH3').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtFRANCH4').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtAPCODE').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstProcessor, autoLoad: true}));


                            Ext.getCmp(prototype.id + '-de-txtEquivalent1').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtEquivalent2').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtEquivalent3').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtEquivalent4').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtEquivalent5').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtEquivalent6').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtEquivalent7').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtEquivalent8').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtEquivalent9').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));

                        } else
                            global.Msg({msg: res.sesion});
                    }
                });
                Ext.getCmp(prototype.id + '-de-txtFRANCH1').setValue('')
                
                Ext.getCmp(prototype.id + '-de-txtFRANCH2').setValue('')
                Ext.getCmp(prototype.id + '-de-txtFRANCH3').setValue('')
                Ext.getCmp(prototype.id + '-de-txtFRANCH4').setValue('')
                Ext.getCmp(prototype.id + '-de-txtAPCODE').setValue('')

                Ext.getCmp(prototype.id + '-de-txtEquivalent1').setValue('')
                Ext.getCmp(prototype.id + '-de-txtEquivalent2').setValue('')
                Ext.getCmp(prototype.id + '-de-txtEquivalent3').setValue('')
                Ext.getCmp(prototype.id + '-de-txtEquivalent4').setValue('')
                Ext.getCmp(prototype.id + '-de-txtEquivalent5').setValue('')
                Ext.getCmp(prototype.id + '-de-txtEquivalent6').setValue('')
                Ext.getCmp(prototype.id + '-de-txtEquivalent7').setValue('')
                Ext.getCmp(prototype.id + '-de-txtEquivalent8').setValue('')
                Ext.getCmp(prototype.id + '-de-txtEquivalent9').setValue('')

                Ext.getCmp(prototype.id + '-panelTabMain').hide();
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
                Ext.getCmp(prototype.id + '-ACCNUMOLD').setEditable(true);
                Ext.getCmp(prototype.id + '-DDISCON').setEditable(true);
                Ext.getCmp(prototype.id + '-ACCNUMA').setEditable(true);
                Ext.getCmp(prototype.id + '-IDFISCAL').setEditable(true);
                Ext.getCmp(prototype.id + '-BENCEN').setEditable(true);
                Ext.getCmp(prototype.id + '-DEUSAP').setEditable(true);
                Ext.getCmp(prototype.id + '-SAGENT').setEditable(true);
                Ext.getCmp(prototype.id + '-CANAL').setEditable(true);
                Ext.getCmp(prototype.id + '-PROCES').setEditable(true);
                Ext.getCmp(prototype.id + '-SCOUNTRY').setEditable(true);
                Ext.getCmp(prototype.id + '-SOCIETY').setEditable(true);
                Ext.getCmp(prototype.id + '-SCURRENCY').setEditable(true);
                Ext.getCmp(prototype.id + '-SBENCEN').setEditable(true);
                Ext.getCmp(prototype.id + '-COSTCEN').setEditable(true);
                Ext.getCmp(prototype.id + '-IDFBENEF').setEditable(true);
//                Ext.getCmp(prototype.id + '-de-txtMERCHN').setDisabled(false);
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.getData();

                this.dataObtain.CARD = 2;
                this.dataObtain.COREP = 2;
                this.dataObtain.CARDEQUIVALENT = 2;

                Ext.Ajax.request({
                    url: prototype.urlMaster + '/obtainData',
                    method: 'POST',
                    timeout: 60000000,
                    params: {beanString: JSON.stringify(this.dataObtain)},
                    success: function (response, options) {
                        var res = Ext.JSON.decode(response.responseText);
                        console.log(res, 'res')
                        if (res.success) {

                            me.lstCountry = res.lstCountry;
                            me.lstBank = res.lstBank;
                            Ext.getCmp(prototype.id + '-de-txtFRANCH1').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtFRANCH2').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtFRANCH3').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtFRANCH4').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtAPCODE').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstProcessor, autoLoad: true}));


                            Ext.getCmp(prototype.id + '-de-txtEquivalent1').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtEquivalent2').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtEquivalent3').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtEquivalent4').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtEquivalent5').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtEquivalent6').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtEquivalent7').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtEquivalent8').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));
                            Ext.getCmp(prototype.id + '-de-txtEquivalent9').bindStore(
                                    Ext.create('Ext.data.Store', {data: res.lstCardEquivalent, autoLoad: true}));

                        } else
                            global.Msg({msg: res.sesion});
                    }
                });
//                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-de-txtMERCHN').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtAFBRANCH').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtDOWNREPORT').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtAPCODE').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtACQPROC').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtFRANCH1').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtFRANCH2').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtFRANCH3').setEditable(true);
                Ext.getCmp(prototype.id + '-de-txtFRANCH4').setEditable(true);
                Ext.getCmp(prototype.id + '-bankSection').hide();
                Ext.getCmp(prototype.id + '-iataSection').hide();
                Ext.getCmp(prototype.id + '-bSection_1').hide();
                Ext.getCmp(prototype.id + '-bSection_2').hide();
                Ext.getCmp(prototype.id + '-bSection_3').hide();
                Ext.getCmp(prototype.id + '-bSection_4').hide();
                Ext.getCmp(prototype.id + '-iSection_1').hide();
                Ext.getCmp(prototype.id + '-iSection_2').hide();
                Ext.getCmp(prototype.id + '-iSection_3').hide();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {

        this.dataObtain.CARD = 2;
        this.dataObtain.COREP = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res, 'res')
                if (res.success) {

                    me.lstCountry = res.lstCountry;
                    me.lstBank = res.lstBank;
                    Ext.getCmp(prototype.id + '-de-txtFRANCH1').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-de-txtFRANCH2').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-de-txtFRANCH3').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-de-txtFRANCH4').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-de-txtAPCODE').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstProcessor, autoLoad: true}));
                } else
                    global.Msg({msg: res.sesion});
            }
        });
        console.log('dadsadasdadasdadad', meDE.beanResult)
        this.setValue('de-txtMERCHN', meDE.beanResult.CMERCHAN)

        this.setValue('de-txtAFBRANCH', meDE.beanResult.SUCMERCH)
        this.setValue('de-txtACQPROC', meDE.beanResult.CORE)
        this.setValue('de-txtAPCODE', meDE.beanResult.CODE)
        this.setValue('de-txtDOWNREPORT', meDE.beanResult.DREPORT)
        this.setValue('de-txtFRANCH1', meDE.beanResult.FRANC1)
        this.setValue('de-txtFRANCH2', meDE.beanResult.FRANC2)
        this.setValue('de-txtFRANCH3', meDE.beanResult.FRANC3)
        this.setValue('de-txtFRANCH4', meDE.beanResult.FRANC4)
        
        
        this.setValue('de-txtEquivalent1', meDE.beanResult.EQUIVA1)
        this.setValue('de-txtEquivalent2', meDE.beanResult.EQUIVA2)
        this.setValue('de-txtEquivalent3', meDE.beanResult.EQUIVA3)
        this.setValue('de-txtEquivalent4', meDE.beanResult.EQUIVA4)
        this.setValue('de-txtEquivalent5', meDE.beanResult.EQUIVA5)
        this.setValue('de-txtEquivalent6', meDE.beanResult.EQUIVA6)
        this.setValue('de-txtEquivalent7', meDE.beanResult.EQUIVA7)
        this.setValue('de-txtEquivalent8', meDE.beanResult.EQUIVA8)
        this.setValue('de-txtEquivalent9', meDE.beanResult.EQUIVA9)

        this.setValue('txtUSCR', meDE.beanResult.USCR);
        this.setValue('txtFECR', meDE.beanResult.FECR);
        this.setValue('txtHOCR', meDE.beanResult.HOCR);
        this.setValue('txtUSUP', meDE.beanResult.USUP);
        this.setValue('txtFEUP', meDE.beanResult.FEUP);
        this.setValue('txtHOUP', meDE.beanResult.HOUP);

//        this.setGridIATA(this.beanResult.MERCHN);
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {
        console.log('llenarData');
        beanTemp.CMERCHAN = this.getValue("de-txtMERCHN")
        beanTemp.SUCMERCH = this.getValue("de-txtAFBRANCH")
        beanTemp.DREPORT = this.getValue("de-txtDOWNREPORT")
        beanTemp.CODE = this.getValue("de-txtAPCODE")
        beanTemp.CORE = this.getValue("de-txtACQPROC")
        beanTemp.FRANC1 = this.getValue("de-txtFRANCH1")
        beanTemp.FRANC2 = this.getValue("de-txtFRANCH2")
        beanTemp.FRANC3 = this.getValue("de-txtFRANCH3")
        beanTemp.FRANC4 = this.getValue("de-txtFRANCH4")
        
        beanTemp.IN_EQUIVA1 = this.getValue("de-txtEquivalent1")
        beanTemp.IN_EQUIVA2 = this.getValue("de-txtEquivalent2")
        beanTemp.IN_EQUIVA3 = this.getValue("de-txtEquivalent3")
        beanTemp.IN_EQUIVA4 = this.getValue("de-txtEquivalent4")
        beanTemp.IN_EQUIVA5 = this.getValue("de-txtEquivalent5")
        beanTemp.IN_EQUIVA6 = this.getValue("de-txtEquivalent6")
        beanTemp.IN_EQUIVA7 = this.getValue("de-txtEquivalent7")
        beanTemp.IN_EQUIVA8 = this.getValue("de-txtEquivalent8")
        beanTemp.IN_EQUIVA9 = this.getValue("de-txtEquivalent9")
        
        beanTemp.CODEBANK = this.getValue("CODEBANK")
        beanTemp.BANKNAM = this.getValue("BANKNAM")
        beanTemp.BANKCM = this.getValue("BANKCM")
        beanTemp.BANKCUR = this.getValue("BANKCUR")
        beanTemp.ACCNUMB = this.getValue("ACCNUMB")
        beanTemp.ACCNUMOLD = this.getValue("ACCNUMOLD")
        beanTemp.DDISCON = this.getValue("DDISCON")
        beanTemp.ACCNUMA = this.getValue("ACCNUMA")
        beanTemp.IDFISCAL = this.getValue("IDFISCAL")
        beanTemp.BENCEN = this.getValue("BENCEN")
        beanTemp.DEUSAP = this.getValue("DEUSAP")
        beanTemp.SAGENT = this.getValue("SAGENT")
        beanTemp.CANAL = this.getValue("CANAL")
        beanTemp.PROCES = this.getValue("PROCES")
        beanTemp.SCOUNTRY = this.getValue("SCOUNTRY")
        beanTemp.SOCIETY = this.getValue("SOCIETY")
        beanTemp.SCURRENCY = this.getValue("SCURRENCY")
        beanTemp.SBENCEN = this.getValue("SBENCEN")
        beanTemp.COSTCEN = this.getValue("COSTCEN")
        beanTemp.IDFBENEF = this.getValue("IDFBENEF")

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();

    },
    getData: function () {
        if (meDE.bean.data.CMERCHAN === '') {
            meDE.bean.data.CMERCHAN = '0';
        }

        if (meDE.bean.data.SUCMERCH === '') {
            meDE.bean.data.SUCMERCH = '0';
        }

        console.log(this.bean.data, 'this.bean')
        console.log('antes al llamado')
        console.log(prototype.url, 'prototype.url dataentry')
        var beanString = JSON.stringify(meDE.bean.data);
        console.log(beanString, 'beanString')
        console.log(meDE.bean.data, 'meDE.bean.data')
        Ext.Ajax.request({
            url: prototype.url + '/searchCompleteDetail',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                console.log('dentro del llamada')
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var resDETAIL = Ext.JSON.decode(response.responseText);
                console.log(resDETAIL.result, 'watafaaaaaaaaaaaaaaaaaaaaaa')
                meDE.beanResult = resDETAIL.result;
                meDE.mostrarData();

            },
            failure: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
                console.error('Request failed:', response.statusText);
                // Maneja el error de acuerdo a tus necesidades
            }
        });
        console.log('después del llamado')

        var paramDetailMerchants = {};
        paramDetailMerchants.beanString = JSON.stringify(meDE.bean.data);
        console.log('meDE.bean.data', meDE.bean.data)
        Ext.Ajax.request({
            url: prototype.url + '/searchMerchants',
            method: 'POST',
            timeout: 60000000,
            params: paramDetailMerchants,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
                var resMerchant = Ext.JSON.decode(response.responseText);
                console.log(resMerchant, 'res');
                if (resMerchant.success) {
                    console.log(resMerchant.data, 'res.data')
                    //llenar grilla gridDataInfoScan
                    var storeDataMerchant = Ext.create('Ext.data.Store', {
                        data: resMerchant.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoMerchant').bindStore(storeDataMerchant);
                } else {
                    global.Msg({msg: resMerchant.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });

        var paramDetailBanks = {};
        paramDetailBanks.beanString = JSON.stringify(meDE.bean.data);
        console.log('meDE.bean.data', meDE.bean.data)
        Ext.Ajax.request({
            url: prototype.url + '/searchBanks',
            method: 'POST',
            timeout: 60000000,
            params: paramDetailBanks,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
                var resBank = Ext.JSON.decode(response.responseText);
                console.log(resBank, 'res');
                if (resBank.success) {
                    console.log(resBank.data, 'res.data')
                    //llenar grilla gridDataInfoScan
                    var storeDataBank = Ext.create('Ext.data.Store', {
                        data: resBank.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoBANCOS').bindStore(storeDataBank);
                } else {
                    global.Msg({msg: resBank.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });

        var paramDetailIatas = {};
        paramDetailIatas.beanString = JSON.stringify(meDE.bean.data);
        console.log('meDE.bean.data', meDE.bean.data)
        console.log('MUESTRA EL PARAMS ');
        console.log(paramDetailIatas, 'paramDetailIatas');
        Ext.Ajax.request({
            url: prototype.url + '/searchIATAS',
            method: 'POST',
            timeout: 60000000,
            params: paramDetailIatas,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
                var resIata = Ext.JSON.decode(response.responseText);
                console.log(resIata, 'res');
                if (resIata.success) {
                    console.log(resIata.data, 'resIata.data')
                    //llenar grilla gridDataInfoScan
                    var storeDataIatas = Ext.create('Ext.data.Store', {
                        data: resIata.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridDataInfoIATAS').bindStore(storeDataIatas);
                } else {
                    global.Msg({msg: resIata.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },
    onViewMerchClick: function (grid, rowIndex, colIndex, item, e, record) {
        var rec = grid.getStore().getAt(rowIndex);
        console.log('llega al view')
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        console.log('llega antes del create')
        Ext.create('Ext.Praxis.view.payments.MerchantNumberForm.DataEntryDetail', {
            id: prototype.id + '-dataEntryDetail',
            params: {
                action: action,
                rec: rec
            }
        }).show();
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
    onSaveClick: function (btn) {
        console.log("CLICK SAVE WADAFA")
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
                        this.MaintenanceMPF109(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
        console.log('onUpdateClick');
        Ext.Msg.show(
                {
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
//                                meDE.llenarData(beanTemp);

                                beanTemp.option = 'U';
                                meDE.MaintenanceA2354(beanTemp);
                            } else {
                                global.Msg({msg: msjResult});
                            }
                        }
                    }
                });
    },
    onDeleteClick: function (btn) {
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
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceMPF109: function (beanTemp) {
//        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceMPF109',
            method: 'POST',
            timeout: 60000000,
//            params: beanTemp,
            params: {beanString: beanString, option: beanTemp.option},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    Ext.getCmp(prototype.id + '-dataEntry').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
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
        if (this.getValue("de-txtAFBRANCH") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    validacionUpdate: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtMERCHN").trim() === '') {
            msjResult = "The field Merchant Payment cannot be left empty";
        }
        if (this.getValue("de-txtAFBRANCH").trim() === '') {
            msjResult = "The field Merchant Payment cannot be left empty";
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
    }
// </editor-fold>


});