/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.flown.CouponsError.DataEntryCouponsErrorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/CouponsError',
    id: prototype.id + '-controller',
    p: {},
    existAirport: false,
    aux: false,
    texto: '',
    me: '',
    /**
     * Constructor
     */
    init: function(view) {
        me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        console.log("URL : " + this.url);
        this.p = this.view.params;
        this.setStoreData();

        switch (this.p.action) {
            case 'I':
                break;
            case 'U':
                this.getDataInputs();
                this.view.setHeight(this.view.getHeight());
                break;
        }
    }
    ,
    setStoreData: function() {
        var cmbFTE = Ext.getCmp(prototype.id + '-cmbFTE');
        var cmbSTORG = Ext.getCmp(prototype.id + '-cmbSTORG');
        var cmbSTVAL = Ext.getCmp(prototype.id + '-cmbSTVAL');
        var cmbSTCON = Ext.getCmp(prototype.id + '-cmbSTCON');
        var cmbTOPUS = Ext.getCmp(prototype.id + '-cmbTOPUS');
        var cmbFVAL = Ext.getCmp(prototype.id + '-cmbFVAL');

        cmbFVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["1", "ISR/Sales Value"],
                ["2", "Average Value"]
            ]}));
        cmbTOPUS.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["D", "Domestic"],
                ["I", "International"]
            ]}));
        cmbSTCON.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["1", "Posted"],
                ["2", "Provisional Post"],
                ["3", "Reverse"],
                ["4", "Accounting Reverse"]
            ]}));

        cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["0", "Hard Block"],
                ["1", "Pending/Without Sale"],
                ["2", "Valued"],
                ["3", "Closed"]
            ]}));


        cmbFTE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["B", "BSP"],
                ["A", "ARC"],
                ["S", "ASR"],
                ["T", "TCN"]

            ]}));

        cmbSTORG.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["1", "Interline"],
                ["2", "Online"]
            ]}));
    }

    ,
    onUpdateClick: function(btn) {
        //var p = this.view.params;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to update ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.p.action = "U";
                    this.crud();
                }
            }
        });
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
                    this.p.action = "D";
                    this.crud();
                }
            }
        });
    }
    ,
    onSaveClick: function(btn) {
        var NFLIGHT = Ext.getCmp(prototype.id + '-flightNumberOpe').getValue();
        var CARRIER = Ext.getCmp(prototype.id + '-carrierOpe').getValue();
        var NFLIGMKT = Ext.getCmp(prototype.id + '-flightNumberMar').getValue();
        var CARRIMKT = Ext.getCmp(prototype.id + '-carrierMar').getValue();
        var NFLIGHTH = Ext.getCmp(prototype.id + '-flightNumberHar').getValue();
        var CARRIERH = Ext.getCmp(prototype.id + '-carrierHar').getValue();
        var FREQ = Ext.getCmp(prototype.id + '-frecuency').getValue();
        var EQUIPO = Ext.getCmp(prototype.id + '-equipment').getValue();
        var TOPER = Ext.getCmp(prototype.id + '-cmbOperator').getValue();
        var TFLIGH = Ext.getCmp(prototype.id + '-cmbFlight').getValue();



        if (TFLIGH === null) {
            TFLIGH = '';
        } else {
            if (TFLIGH === 'Scheduled' || TFLIGH === 'J') {
                TFLIGH = 'J';
            } else if (TFLIGH === 'Charter' || TFLIGH === 'C') {
                TFLIGH = 'C';
            } else {
                TFLIGH = '';
            }
        }
        if (TOPER === null) {
            TOPER = '';
        } else {
            if (TOPER === 'International' || TOPER === 'I') {
                TOPER = 'I';
            } else if (TOPER === 'Domestic' || TOPER === 'D') {
                TOPER = 'D';
            } else {
                TOPER = '';
            }
        }
        if (NFLIGHT.trim() === '' || CARRIER.trim() === '' || NFLIGMKT.trim() === '' || CARRIMKT.trim() === '') {
            global.Msg({
                msg: 'You must enter all required fields.',
                fn: function() {
                }
            });
        } else {
            if (CARRIER.trim().length < 2 || CARRIMKT.trim().length < 2) {
                global.Msg({
                    msg: 'It requires you to enter a Carrier.',
                    fn: function() {
                    }
                });
            } else {

                Ext.Msg.show({
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to insert?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function(btn) {
                        if (btn === 'yes') {
                            this.p.action = "I";
                            this.crud();
                        }
                    }
                });

            }
        }


//        if (fDate === null) {
//            global.Msg({
//                msg: 'You must enter the Flight date.',
//                fn: function() {
//                    Ext.getCmp(prototype.id + '-flightDate').focus(true);
//                }
//            });
//        } else if (fNumber === '') {
//            global.Msg({
//                msg: 'You must enter the Flight Number',
//                fn: function() {
//                    Ext.getCmp(prototype.id + '-flightNumber').focus(true);
//                }
//            });
//        } else if (origin === '') {
//            global.Msg({
//                msg: 'You must enter the Departure Airport.',
//                fn: function() {
//                    Ext.getCmp(prototype.id + '-origin').focus(true);
//                }
//            });
//        } else if (destination === '') {
//            global.Msg({
//                msg: 'You must enter the Arrival Airport..',
//                fn: function() {
//                    Ext.getCmp(prototype.id + '-destination').focus(true);
//                }
//            });
//        } else {
//
//            Ext.Msg.show({
//                title: '.:PRAXIS:.',
//                msg: 'Are you sure to insert?',
//                buttons: Ext.MessageBox.YESNO,
//                scope: this,
//                icon: Ext.MessageBox.QUESTION,
//                modal: true,
//                fn: function(btn) {
//                    if (btn === 'yes') {
//                        this.view.params.action = "I";
//                        this.crud();
//                    }
//                }
//            });
//
//        }
    }
    ,
    crud: function() {

        var rec = this.p.rec;
        var strOption = this.p.action;

        console.log('opcion : ' + strOption);
        Ext.Ajax.request({
            url: this.url + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.msg;
                if (msg === 'DUPLICATED KEY, VERIY!') {
                    global.Msg({
                        msg: msg,
                        icon: 2,
                        fn: function() {
                        }
                    });
                } else {
                    global.Msg({
                        msg: msg,
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
    }
    ,
    getDataEntryValues: function(strOption) {


        var NFLIGHT = Ext.getCmp(prototype.id + '-flightNumberOpe').getValue();
        var CARRIER = Ext.getCmp(prototype.id + '-carrierOpe').getValue();
        var NFLIGMKT = Ext.getCmp(prototype.id + '-flightNumberMar').getValue();
        var CARRIMKT = Ext.getCmp(prototype.id + '-carrierMar').getValue();
        var NFLIGHTH = Ext.getCmp(prototype.id + '-flightNumberHar').getValue();
        var CARRIERH = Ext.getCmp(prototype.id + '-carrierHar').getValue();
        var FREQ = Ext.getCmp(prototype.id + '-frecuency').getValue();
        var EQUIPO = Ext.getCmp(prototype.id + '-equipment').getValue();
        var TOPER = Ext.getCmp(prototype.id + '-cmbOperator').getValue();
        var TFLIGH = Ext.getCmp(prototype.id + '-cmbFlight').getValue();

        console.log("--------->TFLIGH : " + TFLIGH);
        if (TFLIGH === null) {
            TFLIGH = '';
        } else {
            if (TFLIGH === 'Scheduled' || TFLIGH === 'J') {
                TFLIGH = 'J';
            } else if (TFLIGH === 'Charter' || TFLIGH === 'C') {
                TFLIGH = 'C';
            } else {
                TFLIGH = '';
            }
        }

        console.log("--------->TOPER : " + TOPER);
        if (TOPER === null) {
            TOPER = '';
        } else {
            if (TOPER === 'International' || TOPER === 'I') {
                TOPER = 'I';
            } else if (TOPER === 'Domestic' || TOPER === 'D') {
                TOPER = 'D';
            } else {
                TOPER = '';
            }
        }
        console.log("Parametros a pasar : ");
        console.log("NFLIGHT : " + NFLIGHT);
        console.log("CARRIER : " + CARRIER);
        console.log("NFLIGMKT : " + NFLIGMKT);
        console.log("CARRIMKT : " + CARRIMKT);
        console.log("NFLIGHTH : " + NFLIGHTH);
        console.log("CARRIERH : " + CARRIERH);
        console.log("FREQ : " + FREQ);
        console.log("TOPER : " + TOPER);
        console.log("NFLIGHT : " + TFLIGH);


        return {
            strOption: strOption,
            NFLIGHT: NFLIGHT,
            CARRIER: CARRIER,
            NFLIGMKT: NFLIGMKT,
            CARRIMKT: CARRIMKT,
            NFLIGHTH: NFLIGHTH,
            CARRIERH: CARRIERH,
            FREQ: FREQ,
            EQUIPO: EQUIPO,
            TOPER: TOPER,
            TFLIGH: TFLIGH
        };

    }
    ,
    onCancelClick: function(btn) {
        Ext.getCmp(prototype.id + '-dataEntry').close();
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    getDataInputs: function() {
        var rec = this.p.beanConsTkt;

        Ext.getCmp(prototype.id + '-txtTicket').setValue(rec.strTicket.trim());
        Ext.getCmp(prototype.id + '-txtDCHEQ').setValue(rec.DCHEQ.trim());
        Ext.getCmp(prototype.id + '-txtSEQ').setValue(rec.SEQ.trim());
        Ext.getCmp(prototype.id + '-txtFCONT').setValue(rec.FCONT.trim());
        Ext.getCmp(prototype.id + '-txtCDEPART').setValue(rec.CDEPART.trim());

        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.id + '-txtCDEPART',
            html: '' + rec.strDescCDEPART.trim()
        });

        Ext.getCmp(prototype.id + '-txtCARRIVA').setValue(rec.CARRIVA.trim());
        var tip2 = Ext.create('Ext.tip.ToolTip', {
            target: prototype.id + '-txtCARRIVA',
            html: rec.strDescCARRIVA.trim()
        });

        Ext.getCmp(prototype.id + '-txtZONE').setValue(rec.ZONA.trim());
        Ext.getCmp(prototype.id + '-txtNFLIGHT').setValue(rec.NFLIGHT.trim());
        Ext.getCmp(prototype.id + '-txtDFLIGHT').setValue(rec.DFLIGHT.trim());
        Ext.getCmp(prototype.id + '-txtNPLANE').setValue(rec.NPLANE.trim());
        Ext.getCmp(prototype.id + '-txtLEGSEQ').setValue(rec.LEGSEQ.trim());
        Ext.getCmp(prototype.id + '-cmbSTORG').setValue(rec.STORG.trim());
        Ext.getCmp(prototype.id + '-cmbSTVAL').setValue(rec.STVAL.trim());
        Ext.getCmp(prototype.id + '-cmbFVAL').setValue(rec.FVAL.trim());
        Ext.getCmp(prototype.id + '-cmbSTCON').setValue(rec.STCON.trim());
        Ext.getCmp(prototype.id + '-cmbFTE').setValue(rec.FTE.trim());
        Ext.getCmp(prototype.id + '-cmbTOPUS').setValue(rec.TOPUS.trim());

        Ext.getCmp(prototype.id + '-txtCARR').setValue(rec.CARR.trim());
        Ext.getCmp(prototype.id + '-txtCABI').setValue(rec.CABI.trim());
        Ext.getCmp(prototype.id + '-txtCLAS').setValue(rec.CLAS.trim());
        Ext.getCmp(prototype.id + '-txtFBASE').setValue(rec.FBASE.trim());
        Ext.getCmp(prototype.id + '-txtCFF').setValue(rec.CFF.trim());
        Ext.getCmp(prototype.id + '-txtVCPN').setValue(rec.VCPN);
        Ext.getCmp(prototype.id + '-txtMDACP').setValue(rec.MDACP.trim());
        Ext.getCmp(prototype.id + '-txtCOMISI').setValue(rec.COMISI);
        Ext.getCmp(prototype.id + '-txtVTAX').setValue(rec.VTAX);



        Ext.getCmp(prototype.id + '-USCR').setValue(rec.USCR);
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.FECR);
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.HOCR);
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.USUP);
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.FEUP);
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.HOUP);

    },
    onBackClickDataEntry: function() {
        var all = this.p.all;
        var rec;
        var rowIndex = this.p.rowIndex;
        if (this.p.rowIndex > 0) {
            rec = all.data.getAt(rowIndex - 1).data;


            Ext.Ajax.request({
                url: prototype.url + '/searchBeanTkt',
                method: 'POST',
                timeout: 60000000,
                beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
                params: {
                    strTicket: rec.strTicket.replace(" ", '').replace(" ", '')
                },
                success: function(response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var beanConsTkt = res.beanConsTkt;
                    var msjVal = res.msjVal;

                    me.p = {action: "U", beanConsTkt: beanConsTkt, msjVal: msjVal, all: all, rowIndex: rowIndex - 1};
                    me.getDataInputs();
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                }
            });

        }
    },
    onNextClickDataEntry: function() {
        console.log("Click en next");
        var all = this.p.all;
        var rec;
        var rowIndex = this.p.rowIndex;

        if (this.p.rowIndex < 19) {
            rec = all.data.getAt(rowIndex + 1).data;


            Ext.Ajax.request({
                url: prototype.url + '/searchBeanTkt',
                method: 'POST',
                timeout: 60000000,
                beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
                params: {
                    strTicket: rec.strTicket.replace(" ", '').replace(" ", '')
                },
                success: function(response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var beanConsTkt = res.beanConsTkt;
                    var msjVal = res.msjVal;

                    me.p = {action: "U", beanConsTkt: beanConsTkt, msjVal: msjVal, all: all, rowIndex: rowIndex + 1};
                    me.getDataInputs();
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                }
            });
        }
    },
    onFacsimilClick: function() {
        var rec = this.p.beanConsTkt;

        var facsimilParams = {
            FUENTE: rec.strFuente.trim(),
            TDNR: rec.CCIA + rec.FORMA + rec.SERIE,
            CPUI: rec.CUPON,
            COUNTRY: rec.PSVVTA,
            HRED: rec.FVTA,
            strVTR: '',
            strFuente: '',
            typeModal: '',
            listaReg63: '',
            back: '',
            TicketPadre: ''
        };

        if (rec.CCIA === '139') {
            facsimilParams.strVTR = 'VTR';
            facsimilParams.typeModal = 'PRORATE';
            facsimilParams.listaReg63 = '';
            facsimilParams.back = 'SALE_TKT0';
            facsimilParams.TicketPadre = facsimilParams.TDNR;
            this.searchProrrateo(facsimilParams);

        } else {

            Ext.Ajax.request({
                url: prototype.url + '/searchFacsimil',
                method: 'POST',
                timeout: 60000000,
                beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
                params: facsimilParams,
                success: function(response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var beanFaximil = res.beanFaximil;
                    var facsimil = Ext.create('Ext.Praxis.view.flown.CouponsErrorForm.Facsimil', {
                        id: prototype.id + '-facsimil',
                        params: {
                            beanFaximil: beanFaximil
                        }
                    });
                    facsimil.setId(prototype.id + "-facsimil");
                    facsimil.show();
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                }
            });
        }
    },
    searchProrrateo: function(facsimilParams) {

        var urls = this.obtenerUrls(facsimilParams);
        var URL1 = CONTEXTPATH + '/Prorrateo/' + urls.url1;
        var URL2 = CONTEXTPATH + '/Prorrateo/' + urls.url2;
        var paramsProrrateo = {
            beanFacProrrateo: "",
            beanRest: "",
            facsimilParams: facsimilParams
        };

        Ext.Ajax.request({
            url: URL1,
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: facsimilParams,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var beanFacProrrateo = res.beanFacProrrateo;
                paramsProrrateo.beanFacProrrateo = beanFacProrrateo;
                if (urls.url2 !== "") {
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    Ext.Ajax.request({
                        url: URL2,
                        method: 'POST',
                        timeout: 60000000,
                        beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
                        params: facsimilParams,
                        success: function(response, options) {
                            var res = Ext.JSON.decode(response.responseText);
                            var beanRest = res.beanRest;
                            paramsProrrateo.beanRest = beanRest;
                            Ext.getCmp(prototype.id + '-dataEntry').unmask();
                            var prorrateo = Ext.create('Ext.Praxis.view.flown.CouponsErrorForm.Prorrateo', {
                                id: prototype.id + '-prorrateo',
                                params: {
                                    paramsProrrateo: paramsProrrateo
                                }
                            });
                            prorrateo.setId(prototype.id + "-prorrateo");
                            prorrateo.show();
                            Ext.getCmp(prototype.id + '-dataEntry').unmask();
                        }
                    });
                } else {
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    var prorrateo = Ext.create('Ext.Praxis.view.flown.CouponsErrorForm.Prorrateo', {
                        id: prototype.id + '-prorrateo',
                        params: {
                            paramsProrrateo: paramsProrrateo
                        }
                    });
                    prorrateo.setId(prototype.id + "-prorrateo");
                    prorrateo.show();

                }

            }
        });



        console.log("URL 1 : " + urls.url1);
        console.log("URL 2 : " + urls.url2);

    },
    obtenerUrls: function(facsimilParams) {

        var urlProrrateo1 = '';
        var urlProrrateo2 = '';
        var fuente = facsimilParams.FUENTE;
        var back = facsimilParams.back;
        var backSub = back.substr(0, 8);
        var backSub2 = back.substr(8);

        console.log("fuente : " + fuente);
        console.log("back : " + back);
        console.log("backSub : " + backSub);
        console.log("backSub2 : " + backSub2);

        if (fuente.trim() === 'A' || fuente.trim() === 'ARC') {
            if (backSub === 'SALE_RFN') {
                if (backSub2 === '0') {
                    urlProrrateo1 = 'searchARC';
                    urlProrrateo2 = 'searchA713';
                }
            }
            else if (backSub === 'SALE_TKT') {
                if (backSub2 === '0') {
                    urlProrrateo1 = 'searchARC';
                    urlProrrateo2 = 'searchA720';
                }
            }
            else {
                urlProrrateo1 = 'searchARC';
                urlProrrateo2 = '';
            }
        } else {
            if (fuente.trim() === 'ASR' || fuente.trim() === 'S') {
                if (backSub === 'SALE_RFN') {
                    if (backSub2 === '0') {
                        urlProrrateo1 = 'searchASR';
                        urlProrrateo2 = 'searchA713';
                    }
                }
                else if (backSub === 'SALE_TKT') {
                    if (backSub2 === '0') {
                        urlProrrateo1 = 'searchASR';
                        urlProrrateo2 = 'searchA720';
                    }

                }
                else {
                    urlProrrateo1 = 'searchASR';
                    urlProrrateo2 = '';
                }
            } else {
                if (fuente.trim() === 'BSP' || fuente.trim() === 'B') {
                    if (backSub === 'SALE_RFN') {
                        if (backSub2 === '0') {
                            urlProrrateo1 = 'searchBSP';
                            urlProrrateo2 = 'searchA713';
                        }
                    }
                    else if (backSub === 'SALE_TKT') {
                        if (backSub2 === '0') {
                            urlProrrateo1 = 'searchBSP';
                            urlProrrateo2 = 'searchA720';
                        }
                    }
                    else {
                        urlProrrateo1 = 'searchBSP';
                        urlProrrateo2 = '';
                    }
                } else {
                    urlProrrateo1 = 'searchARC';
                    urlProrrateo2 = 'searchA720';
                }
            }
        }
        return {
            url1: urlProrrateo1,
            url2: urlProrrateo2
        };
    }



});


