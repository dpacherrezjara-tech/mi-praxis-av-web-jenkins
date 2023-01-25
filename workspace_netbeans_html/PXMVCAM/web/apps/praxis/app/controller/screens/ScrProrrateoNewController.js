Ext.define('Ext.Praxis.controller.screens.ScrProrrateoNewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrProrrateoNewController',
    meEle: "",
    p: '',
    bean: {},
    modBack: '',
    fuente: '',
    strVTR: '',
    gloCcust: '',
    strVoid: '',
    listaTkts: new Array(),
    lstRest: new Array(),
    gridCpnDataAC: new Array(),
    MODAL_FACSIMIL: 'FACSIMIL',
    MODAL_PRORATE: 'PRORATE',
    lstAGTN: new Array(),
    beanA720: {},
    beanA020: {},
    init: function(view) {
        meEle = this;
        this.p = view.params;
        prototype.ProrrateoNew = {
            id: 'ScrProrrateoNewForm',
            url: CONTEXTPATH+'/ScrProrrateoNew'
        };
    },
    afterRender: function() {
        this.startDisplay(this.p.bean,'SALE_TKT0',null,true);
//            this.getDataInputsProrrateo();
    },
    startDisplay: function(filter, back, lista, displayFilter) {
        console.log('filter');
        console.log(filter);
        Ext.getCmp(prototype.ProrrateoNew.id+'-boxClosexx').hide();
        Ext.getCmp(prototype.ProrrateoNew.id+'-btnClosexx').hide();
        if(this.p.strVTR === 'CF'){
            Ext.getCmp(prototype.ProrrateoNew.id+'-boxClosexx').show();
            Ext.getCmp(prototype.ProrrateoNew.id+'-btnClosexx').show();
        }
        Ext.getCmp(prototype.ProrrateoNew.id+'-TicketPadre').setText(filter.TDNR);
        switch(this.p.typeModal){
            case this.MODAL_PRORATE:
                Ext.getCmp(prototype.ProrrateoNew.id+'-boxProrrateInformation').show();
                Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetCpn').show();
                Ext.getCmp(prototype.ProrrateoNew.id+'-dockedItems').show();
//                this.view.width = 1130;
//                this.view.height = 740;
                break;
            case this.MODAL_FACSIMIL:
                Ext.getCmp(prototype.ProrrateoNew.id+'-boxProrrateInformation').hide();
                Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetCpn').hide();
                Ext.getCmp(prototype.ProrrateoNew.id+'-dockedItems').hide();
//                this.view.width = 1110;
//                this.view.height = 520;
                break;
        }
        this.modBack = back;
        this.fuente = filter.FUENTE.trim();
        if(lista !== null){
            this.listaTkts = lista;
        }
        Ext.getCmp(prototype.ProrrateoNew.id+'-boxFilterControl').setVisible(displayFilter);
        if(filter !== undefined){
            this.imgClear_clickHandler();
            var backop =back.substr(0,8);
            if(filter.FUENTE == "ISR"){
                    this.searchISR(filter);
                    this.searchA720(filter.TDNR,this.p.strVTR);
            }
            else{
                if(filter.FUENTE.trim() === 'A' || filter.FUENTE.trim() === 'ARC'){
                    if(back.substr(0,8) === 'SALE_RFN'){
                        if(back.substr(8) === '0'){
                            this.searchARC(filter);
                            this.searchA713(filter.TDNR);
                        }
                        else this.ResultAgain();
                    }
                    else if(back.substr(0,8) === 'SALE_TKT'){
                        if(back.substr(8) === '0'){
                            this.searchARC(filter);
                            this.searchA720(filter.TDNR,this.p.strVTR);
                        }
                        else this.ResultAgain();
                    }
                    else this.searchARC(filter);
                }else if(filter.FUENTE.trim() === 'ASR' || filter.FUENTE.trim() === 'S'){
                    if(back.substr(0,8) === 'SALE_RFN'){
                        if(back.substr(8) === '0'){
                            this.searchASR(filter);
                            this.searchA713(filter.TDNR);
                        }
                        else this.ResultAgain();
                    }
                    else if(back.substr(0,8) === 'SALE_TKT'){
                        if(back.substr(8) === '0'){
                            this.searchASR(filter);
                            this.searchA720(filter.TDNR,this.p.strVTR);
                        }
                        else this.ResultAgain();
                    }
                    else this.searchASR(filter);
                }else if(filter.FUENTE.trim() === 'BSP' || filter.FUENTE.trim() === 'B'){
                    if(back.substr(0,8) === 'SALE_RFN'){
                        if(back.substr(8) === '0'){
                            this.searchBSP(filter);
                            this.searchA713(filter.TDNR);
                        }
                        else this.ResultAgain();
                    }
                    else if(back.substr(0,8) === 'SALE_TKT'){
                        if(back.substr(8) === '0'){
                            this.searchBSP(filter);
                            this.searchA720(filter.TDNR,this.p.strVTR);
                        }
                        else this.ResultAgain();
                    }
                    else this.searchBSP(filter);
                }else{
                    this.searchARC(filter);
                    this.searchA720(filter.TDNR,this.p.strVTR);
                }
            }
        }
    },
    //<editor-fold defaultstate="collapsed" desc="result">
    onResultSearch: function (res) {
        this.bean = res.beanFacProrrateo;
        console.log(this.bean);
        this.gloCcust = res.ccust;
        if (this.bean !== undefined) {
            if(this.bean.strError === '0' || this.bean.strError.trim() === ''){
                if(this.bean.TRNC === 'VOID' || this.bean.TRNC === 'CANX' || this.bean.TRNC === 'N   '){
                    this.strVoid = 'V';
//                                idFacsimil.addChild(image);
//				with(image){x=0; y=0}
                } else {
                    this.strVoid = '';
//                                idFacsimil.addChild(image);
//                                idFacsimil.removeChild(image);
                }
                Ext.getCmp(prototype.ProrrateoNew.id+'-lblError').setValue('');
                Ext.getCmp(prototype.ProrrateoNew.id+'-lblError').hide();
                Ext.getCmp(prototype.ProrrateoNew.id+'-TicketCompanion').setText(this.bean.strCompanion.trim());
                if(this.bean.FUENTE.trim() === 'ARC' || this.bean.FUENTE.trim() === 'A'){
                    if(this.modBack.substr(0,8) === 'SALE_RFN') win.lblUser_toolTip("Estructuras: A1347/A713/A003");
                    else win.lblUser_toolTip("Estructuras: A1347/A720/A003");
                    Ext.getCmp(prototype.ProrrateoNew.id+'-lblFuente').setText('ARC');
                    Ext.getCmp(prototype.ProrrateoNew.id+'-btnDelivery').setText('<strong style="color:white">ARC Delivery</b>');
                }else if(this.bean.FUENTE.trim() === 'ASR' || this.bean.FUENTE.trim() === 'S'){
                    if(this.modBack.substr(0,8) === 'SALE_RFN') win.lblUser_toolTip("Estructuras: A1536/A713/A003");
                    else win.lblUser_toolTip("Estructuras: A1536/A720/A003");
                    Ext.getCmp(prototype.ProrrateoNew.id+'-lblFuente').setText('ASR');
                    Ext.getCmp(prototype.ProrrateoNew.id+'-btnDelivery').setText('<strong style="color:white">ASR Delivery</b>');
                } else{
                    if(this.modBack.substr(0,8) === 'SALE_RFN') win.lblUser_toolTip("Estructuras: A1348/A713/A003");
                    win.lblUser_toolTip("Estructuras: A1348/A720/A003");
                    Ext.getCmp(prototype.ProrrateoNew.id+'-lblFuente').setText('BSP');
                    Ext.getCmp(prototype.ProrrateoNew.id+'-btnDelivery').setText('<strong style="color:white">BSP Delivery</b>');
                }
                Ext.getCmp(prototype.ProrrateoNew.id+'-lblPais').setText(this.bean.COUNTRY);
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtOrigDest').setValue(this.bean.TODC.substring(0, 3)+' - '+this.bean.TODC.substring(3));
                //Armando Endorsements/Restrictions============================
                var lstReg46Restrict = this.bean.lstReg46Restrict;
                var strRestrict = '';
                for (var i = 0; i < lstReg46Restrict.length; i++) {
                    strRestrict += lstReg46Restrict[i].trim();
                }
                new Ext.create('Ext.tip.ToolTip', {
                    target: prototype.ProrrateoNew.id+'-txtEndors',
                    html: strRestrict
                });
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtEndors').setValue(strRestrict);
                //End Endorsements/Restrictions
                //Armando Original Issue ============================
                var lstReg46OrigIssue = this.bean.lstReg46OrigIssue;
                var strOrigIssue = '';
                for (var i46 = 0; i46 < lstReg46OrigIssue.length; i46++) {
                    strOrigIssue += lstReg46OrigIssue[i46].trim();
                }
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtORIN').setValue(strOrigIssue);
                //End Original Issue
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtDateIssue').setValue(this.parseStringToDate(this.bean.DAIS));
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtIssExc').setValue(this.bean.strIssExc);
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtPassenger').setValue(this.bean.PXNM);
                //Armando Fare Calc ============================
                var lstFC = this.bean.lstFC;
                var strFC = '';
                for (var iFC = 0; iFC < lstFC.length; iFC++) {
                    strFC += lstFC[iFC].trim();// +'\n';
                }
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtFareCal').setValue(strFC);
                //End FC
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtTourC').setValue(this.bean.TOUR);
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtPNR').setValue(this.bean.PNRR);
                Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetFac').bindStore(
                    Ext.create("Ext.Praxis.store.flown.GridData", { data: this.bean.lstReg63 })
                );
                //Armando TAX/Fare ============================
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtFare').setValue(this.bean.CUTP1+' '+this.bean.FARE);
                if(Number(this.bean.EQFR.substring(3))>0){
                    if(this.bean.EQFR.substring(0, 3).trim().length>0) Ext.getCmp(prototype.ProrrateoNew.id+'-txtEquivFa').setValue(this.bean.EQFR.substring(0, 3)+' '+this.bean.EQFR.substring(3));
                    else Ext.getCmp(prototype.ProrrateoNew.id+'-txtEquivFa').setValue(this.bean.CUTP1+' '+this.bean.EQFR.substring(3));
                }else Ext.getCmp(prototype.ProrrateoNew.id+'-txtEquivFa').setValue('');
                if(Ext.getCmp(prototype.ProrrateoNew.id+'-txtEquivFa').getValue().substring(0,3).trim().length>0) Ext.getCmp(prototype.ProrrateoNew.id+'-txtTotal').setValue(Ext.getCmp(prototype.ProrrateoNew.id+'-txtEquivFa').getValue().substring(0,3)+' '+this.bean.TOTL);
                else Ext.getCmp(prototype.ProrrateoNew.id+'-txtTotal').setValue(this.bean.CUTP1+' '+this.bean.TOTL);
                var lstTaxes = this.bean.lstTaxes;
                var strTax = '';
                for (var iTax = 0; iTax < lstTaxes.length; iTax++) {
                    strTax += lstTaxes[iTax].trim() +'\n';
                }
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtTaxes').setValue(strTax);
                //End Tax/Fare
                //Armando FOP ============================
                var lstFOP = this.bean.lstFOP;
                var strTexto = '';
                for (var iFop = 0; iFop < lstFOP.length; iFop++) {
                    strTexto += lstFOP[iFop].trim() +'\n';
                }
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtFormPay').setValue(strTexto);
                //End FC
                Ext.getCmp(prototype.ProrrateoNew.id+'-lblTicket').setText(this.bean.TDNR.substring(0, 3)+'  '+this.bean.TDNR.substring(3)+'  '+this.bean.CDGT);

                if(this.bean.strEsCjn === 'C'){
                    var cant = Ext.getCmp(prototype.ProrrateoNew.id+'-TicketCompanion').text.length/13;
                    if(Ext.getCmp(prototype.ProrrateoNew.id+'-TicketCompanion').text.substring((cant*13)-13,cant*13) === this.bean.TDNR) Ext.getCmp(prototype.ProrrateoNew.id+'-imgNext').hide();
                    else Ext.getCmp(prototype.ProrrateoNew.id+'-imgNext').show();
                    if(Ext.getCmp(prototype.ProrrateoNew.id+'-TicketCompanion').text.substring(0,13) === this.bean.TDNR) Ext.getCmp(prototype.ProrrateoNew.id+'-imgPrev').hide();
                    else Ext.getCmp(prototype.ProrrateoNew.id+'-imgPrev').show();
                }else{
                    if(this.bean.strFinCjn === 'N') Ext.getCmp(prototype.ProrrateoNew.id+'-imgNext').show();
                    else Ext.getCmp(prototype.ProrrateoNew.id+'-imgNext').hide();
                    if(this.bean.TDNR.trim() === Ext.getCmp(prototype.ProrrateoNew.id+'-TicketPadre').text) Ext.getCmp(prototype.ProrrateoNew.id+'-imgPrev').hide();
                    else Ext.getCmp(prototype.ProrrateoNew.id+'-imgPrev').show();
                }
                Ext.getCmp(prototype.ProrrateoNew.id+'-EsConjunto').setText(this.bean.strEsCjn);
                if(Ext.getCmp(prototype.ProrrateoNew.id+'-EsConjunto').text === 'C'){
                    Ext.getCmp(prototype.ProrrateoNew.id+'-lblCnj').setText('COMPANION TICKETS');
                    Ext.getCmp(prototype.ProrrateoNew.id+'-txtConj').setValue(this.bean.strConjuncion);
                }else{
                    if(this.bean.TDNR.trim() === Ext.getCmp(prototype.ProrrateoNew.id+'-TicketPadre').text){
                        Ext.getCmp(prototype.ProrrateoNew.id+'-lblCnj').setText('CONJUNTION TICKETS');
                        Ext.getCmp(prototype.ProrrateoNew.id+'-txtConj').setValue(this.bean.strConjuncion);
                    }
                }
                if(this.bean.TDNR.trim() === Ext.getCmp(prototype.ProrrateoNew.id+'-TicketPadre').text) this.searchAgent(this.bean.AGTN);
            } else {
                Ext.getCmp(prototype.ProrrateoNew.id+'-lblError').setValue(this.bean.strMsj);
                Ext.getCmp(prototype.ProrrateoNew.id+'-lblError').show();
                Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetFac').bindStore(
                    Ext.create("Ext.Praxis.store.flown.GridData", { data: this.bean.lstReg63 })
                );
            }
        }
    },
    onResultSearchA720: function (res) {
        console.log(res.beanRest);
        this.lstRest = res.beanRest;
        if(this.lstRest.length > 0){
            Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetCpn').focus();
            var beanA720 = this.lstRest[0];
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtREGIST').setValue(beanA720.A720REGIST);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtFREGIS').setValue(beanA720.A720FREGIS);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtREVISA').setValue(beanA720.A720REVISA);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtFREVIS').setValue(beanA720.A720FREVIS);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtGRUPO').setValue(beanA720.A720GRUPO);
            new Ext.create('Ext.tip.ToolTip', {
                target: prototype.ProrrateoNew.id+'-txtGRUPO',
                html: beanA720.strOthers
            });
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtA1530STPRO').setValue(beanA720.A1530STPRO);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtORIG').setValue(beanA720.A720ORIG);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtCNJ').setValue(beanA720.A720FLAG+beanA720.A720CTKTC);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtPRO').setValue(beanA720.A720PRO);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtMONREG').setValue(beanA720.A720MONREG);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtFECVTA').setValue(beanA720.A720FECVTA);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtCIUVTA').setValue(beanA720.A720CIUVTA);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtPAIVTA').setValue(beanA720.A720PAIVTA);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtCIUEMI').setValue(beanA720.A720CIUEMI);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtPAIEMI').setValue(beanA720.A720PAIEMI);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtCOMMIS').setValue(Ext.util.Format.number(beanA720.A720TTCOMM, '0,000.00'));
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtMDACOM').setValue(beanA720.A720MDACOM);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtPORCOM').setValue(Ext.util.Format.number(beanA720.A720PORCOM, '0,000.00'));
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtCODIT').setValue(beanA720.A720CODIT);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtINITRA').setValue(beanA720.A720INITRA);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtTAJUST').setValue(Ext.util.Format.number(beanA720.A720TAJUST, '0,000.00'));
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtTAJUSQ').setValue(Ext.util.Format.number(beanA720.A720TAJUSQ, '0,000.00'));
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtTARIFA').setValue(Ext.util.Format.number(beanA720.A720TARIFA, '0,000.00'));
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtMONEDA').setValue(beanA720.A720MONEDA);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtTRFPAG').setValue(Ext.util.Format.number(beanA720.A720TRFPAG, '0,000.00'));
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtMDAPAG').setValue(beanA720.A720MDAPAG);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtTRFNUC').setValue(Ext.util.Format.number(beanA720.A720TRFNUC, '0,000.00'));
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtROE').setValue(Ext.util.Format.number(beanA720.A720ROE, '0,000.00'));
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtCPLUSS').setValue(Ext.util.Format.number(beanA720.A720CPLUSS, '0,000.00'));
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtCSOVER').setValue(Ext.util.Format.number(beanA720.A720TTSCMM, '0,000.00'));
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtQSOVER').setValue(Ext.util.Format.number(beanA720.A720QSOVER, '0,000.00'));
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtFEXCH').setValue(beanA720.A1345FEXCH);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtCURR').setValue(beanA720.A1345CURR);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtFARECOBL').setValue(Ext.util.Format.number(beanA720.A1345FARE, '0,000.00'));
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtPAGO').setValue(Ext.util.Format.number(beanA720.A1345PAGO, '0,000.00'));
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtPGCURR').setValue(beanA720.A1345PGCUR);
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtRATE').setValue(Ext.util.Format.number(beanA720.A1526RATE, '0,000.00'));
            Ext.getCmp(prototype.ProrrateoNew.id+'-txtSTAT').setValue(beanA720.A720STAT);
            new Ext.create('Ext.tip.ToolTip', {
                target: prototype.ProrrateoNew.id+'-txtSTAT',
                html: beanA720.strOthers
            });
            Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetCpn').getStore().removeAll();
            Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetCpnCTS').getStore().removeAll();
            var tmpValue = 0;
            var difValue = 0;
            var intTARIFA;
            var obj = {};
            var objRow = {};
            var objRowPar = {};
            //<editor-fold defaultstate="collapsed" desc="gridDetCpnCTS">
            var listaRout = beanA720.lstRegA720;
            this.gridCpnDataAC = new Array();
            for (var i = 0; i < listaRout.length; i++) {
                objRowPar = listaRout[i];
                objRow = {};
                objRow.A720CONEX = objRowPar.A720CONEX;
                objRow.A720RUTAO = objRowPar.A720RUTAO;
                objRow.A720RUTAD = objRowPar.A720RUTAD;
                objRow.A720CARRA = objRowPar.A720CARRA;
                objRow.A720NVLO = objRowPar.A720NVLO;
                objRow.A720FVLO = objRowPar.A720FVLO;
                objRow.A720BOOKI = objRowPar.A720BOOKI;
                objRow.A720CLASE = objRowPar.A720CLASE;
                objRow.A720FBUSO = objRowPar.A720FBUSO;
                objRow.A720FARE = objRowPar.A720FARE;
                objRow.A720TFARE = objRowPar.A720TFARE;
                objRow.A720SS = objRowPar.A720SS;
                objRow.A720VALOR = objRowPar.A720VALOR;
                objRow.A720QIN = objRowPar.A720QIN;
                objRow.A720YQ = objRowPar.A720YQ;
                objRow.A720VLSRP = objRowPar.A720VLSRP;
                objRow.A720VLMPA = objRowPar.A720VLMPA;
                objRow.A720ACUE = objRowPar.A720ACUE;
                objRow.A720ISC = objRowPar.A720ISC;
                objRow.A720AJUST = objRowPar.A720AJUST;
                objRow.A720ACUEO = objRowPar.A720ACUEO;
                objRow.A720FACT = objRowPar.A720FACT;
                objRow.A720PPRO = objRowPar.A720PPRO;
                objRow.A720PROV = objRowPar.A720PROV;
                objRow.A720PRRCM = objRowPar.A720PRRCM;
                objRow.A720PRSCM = objRowPar.A720PRSCM;
                objRow.PRORAT_LOCAL_CUR = (objRow.A720VALOR / beanA720.A720TCAMB);
                tmpValue += objRow.PRORAT_LOCAL_CUR;
                if(i === (listaRout.length - 1)){
                    intTARIFA = (beanA720["A720TRFPAG"] > 0) ? beanA720["A720TRFPAG"] : beanA720["A720TARIFA"];
                    if(beanA720["A720TRNCU"] === 'SALE'){
                        if(tmpValue > intTARIFA){
                            difValue = tmpValue - intTARIFA;
                            objRow["PRORAT_LOCAL_CUR"] -= difValue;
                        }else if(tmpValue < intTARIFA){
                            difValue = intTARIFA - tmpValue;
                            objRow["PRORAT_LOCAL_CUR"] += difValue;
                        }
                    }else{
                        if(tmpValue > intTARIFA){
                            difValue = tmpValue - intTARIFA;
                            objRow["PRORAT_LOCAL_CUR"] -= difValue;
                        }else if(tmpValue < intTARIFA){
                            difValue = intTARIFA - tmpValue;
                            objRow["PRORAT_LOCAL_CUR"] += difValue;
                        }
                    }
                }
                objRow.A720LYQ = objRowPar["A720LYQ"];
                objRow.A720LIV = objRowPar["A720LIV"];
                this.gridCpnDataAC.push(objRow);
            }
            Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetCpnCTS').bindStore(
                Ext.create("Ext.Praxis.store.flown.GridData", { data: this.gridCpnDataAC })
            );
            Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetCpn').bindStore(
                Ext.create("Ext.Praxis.store.flown.GridData", { data: this.gridCpnDataAC })
            );
            //</editor-fold>
            if(this.gloCcust === '13*'){
                if(this.p.typeModal !== this.MODAL_FACSIMIL){
                    Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetCpn').hide();
                }
                Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetCpnCTS').show();
            }else{
                Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetCpnCTS').hide();
                if(this.p.typeModal !== this.MODAL_FACSIMIL){
                    Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetCpn').show();
                }
            }
        }
    },
    onResultSearchAgent: function (res) {
        this.lstAGTN = res.beanAGTN;
        if (this.lstAGTN.length > 0) {
            this.beanA720 = this.lstAGTN[0];
            Ext.getCmp(prototype.ProrrateoNew.id+'-lblNomAer').setText(this.beanA720.strNomAero);
            Ext.getCmp(prototype.ProrrateoNew.id+'-lblAgente').setText(this.beanA720.AGTN);
            Ext.getCmp(prototype.ProrrateoNew.id+'-lblNomAgente').setText(this.beanA720.strNombreAgente);
            Ext.getCmp(prototype.ProrrateoNew.id+'-lblDirAgente').setText(this.beanA720.strDirecAgente);
        }
    },
    onResultSearchDelivery: function (res) {
        var texto = res.strTextoBSP;
        if(texto !== ''){
            Ext.create('Ext.Praxis.view.screens.CtrlDeliveryOrigForm', {
                id: 'CtrlDeliveryOrigForm',
                params: {
                    strTexto: texto,
                    strVoid: this.strVoid
                }
            }).show();
	}
    },
    //</editor-fold>
    ResultAgain: function () {
        if(this.bean !== undefined){
            if(this.bean.strError === '0' || this.bean.strError.trim() === ''){
                if(this.bean.TRNC === 'VOID' || this.bean.TRNC === 'CANX' || this.bean.TRNC === 'N   '){
//                        idFacsimil.addChild(image);
//                        with(image){x=0; y=0}
                }else{
//                        idFacsimil.addChild(image);
//                        idFacsimil.removeChild(image);
                }
                Ext.getCmp(prototype.ProrrateoNew.id+'-lblError').setValue('');
                Ext.getCmp(prototype.ProrrateoNew.id+'-lblError').hide();
                Ext.getCmp(prototype.ProrrateoNew.id+'-TicketCompanion').setText(this.bean.strCompanion.trim());
                if(this.bean.FUENTE.trim() === 'ARC' || this.bean.FUENTE.trim() === 'A'){
                    if(this.modBack.substr(0,8) === 'SALE_RFN') win.lblUser_toolTip("Estructuras: A1347/A713/A003");
                    else win.lblUser_toolTip("Estructuras: A1347/A720/A003");
                    Ext.getCmp(prototype.ProrrateoNew.id+'-lblFuente').setText('ARC');
                    Ext.getCmp(prototype.ProrrateoNew.id+'-btnDelivery').setText('<strong style="color:white">ARC Delivery</b>');
                }else if(this.bean.FUENTE.trim() === 'ASR' || this.bean.FUENTE.trim() === 'S'){
                    if(this.modBack.substr(0,8) === 'SALE_RFN') win.lblUser_toolTip("Estructuras: A1536/A713/A003");
                    else win.lblUser_toolTip("Estructuras: A1536/A720/A003");
                    Ext.getCmp(prototype.ProrrateoNew.id+'-lblFuente').setText('ASR');
                    Ext.getCmp(prototype.ProrrateoNew.id+'-btnDelivery').setText('<strong style="color:white">ASR Delivery</b>');
                } else{
                    if(this.modBack.substr(0,8) === 'SALE_RFN') win.lblUser_toolTip("Estructuras: A1348/A713/A003");
                    win.lblUser_toolTip("Estructuras: A1348/A720/A003");
                    Ext.getCmp(prototype.ProrrateoNew.id+'-lblFuente').setText('BSP');
                    Ext.getCmp(prototype.ProrrateoNew.id+'-btnDelivery').setText('<strong style="color:white">BSP Delivery</b>');
                }
                Ext.getCmp(prototype.ProrrateoNew.id+'-lblPais').setText(this.bean.COUNTRY);
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtOrigDest').setValue(this.bean.TODC.substring(0, 3)+' - '+this.bean.TODC.substring(3));
                //Armando Endorsements/Restrictions============================
                var lstReg46Restrict = ArrayCollection(this.bean.lstReg46Restrict);
                var strRestrict = '';
                for(var i=0;i<lstReg46Restrict.length;i++){
                    strRestrict += lstReg46Restrict[i].trim();
                } 
                new Ext.create('Ext.tip.ToolTip', {
                    target: prototype.ProrrateoNew.id+'-txtEndors',
                    html: strRestrict
                });
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtEndors').setValue(strRestrict);
                //End Endorsements/Restrictions
                //Armando Original Issue ============================
                var lstReg46OrigIssue = this.bean.lstReg46OrigIssue;
                var strOrigIssue = '';
                for(var i46=0;i46<lstReg46OrigIssue.length;i46++){
                    strOrigIssue += lstReg46OrigIssue[i46].trim();
                }
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtORIN').setValue(strOrigIssue);
                //End Original Issue
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtDateIssue').setValue(this.parseStringToDate(this.bean.DAIS));
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtIssExc').setValue(this.bean.strIssExc);
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtPassenger').setValue(this.bean.PXNM);
                //Armando Fare Calc ============================
                var lstFC = this.bean.lstFC;
                var strFC = '';
                for(var iFC=0;iFC<lstFC.length;iFC++){
                    strFC += lstFC[iFC].trim();// +'\n';
                }
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtFareCal').setValue(strFC);
                //End FC
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtTourC').setValue(this.bean.TOUR);
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtPNR').setValue(this.bean.PNRR);
                Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetFac').bindStore(
                    Ext.create("Ext.Praxis.store.flown.GridData", { data: this.bean.lstReg63 })
                );
                //Armando TAX/Fare ============================
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtFare').setValue(this.bean.CUTP1+' '+this.bean.FARE);
                if(Number(this.bean.EQFR.substring(3))>0){
                    if(this.bean.EQFR.substring(0, 3).trim().length>0) Ext.getCmp(prototype.ProrrateoNew.id+'-txtEquivFa').setValue(this.bean.EQFR.substring(0, 3)+' '+this.bean.EQFR.substring(3));
                    else Ext.getCmp(prototype.ProrrateoNew.id+'-txtEquivFa').setValue(this.bean.CUTP1+' '+this.bean.EQFR.substring(3));
                }else Ext.getCmp(prototype.ProrrateoNew.id+'-txtEquivFa').setValue('');
                if(Ext.getCmp(prototype.ProrrateoNew.id+'-txtEquivFa').getValue().substring(0,3).trim().length>0) Ext.getCmp(prototype.ProrrateoNew.id+'-txtTotal').setValue(Ext.getCmp(prototype.ProrrateoNew.id+'-txtEquivFa').getValue().substring(0,3)+' '+this.bean.TOTL);
                else Ext.getCmp(prototype.ProrrateoNew.id+'-txtTotal').setValue(this.bean.CUTP1+' '+Ext.util.Format.number(this.bean.TOTL, '0,000.00'));
                var lstTaxes = this.bean.lstTaxes;
                var strTax = '';
                for(var iTax=0;iTax<lstTaxes.length;iTax++){
                    strTax += lstTaxes[iTax].trim() +'\n';
                }
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtTaxes').setValue(strTax);
                //End Tax/Fare
                //Armando FOP ============================
                var lstFOP = this.bean.lstFOP;
                var strTexto = '';
                for(var iFop=0;iFop<lstFOP.length;iFop++){
                    strTexto += lstFOP[iFop].trim() +'\n';
                }
                Ext.getCmp(prototype.ProrrateoNew.id+'-txtFormPay').setValue(strTexto);
                //End FC
                Ext.getCmp(prototype.ProrrateoNew.id+'-lblTicket').setText(this.bean.TDNR.substring(0, 3)+'  '+this.bean.TDNR.substring(3)+'  '+this.bean.CDGT);
                if(this.bean.strEsCjn === 'C'){
                    var cant = Ext.getCmp(prototype.ProrrateoNew.id+'-TicketCompanion').text.length/13;
                    if(Ext.getCmp(prototype.ProrrateoNew.id+'-TicketCompanion').text.substring((cant*13)-13,cant*13) === this.bean.TDNR) Ext.getCmp(prototype.ProrrateoNew.id+'-imgNext').hide();
                    else Ext.getCmp(prototype.ProrrateoNew.id+'-imgNext').show();
                    if(Ext.getCmp(prototype.ProrrateoNew.id+'-TicketCompanion').text.substring(0,13) === this.bean.TDNR) Ext.getCmp(prototype.ProrrateoNew.id+'-imgPrev').hide();
                    else Ext.getCmp(prototype.ProrrateoNew.id+'-imgPrev').show();
                }else{
                    if(this.bean.strFinCjn === 'N') Ext.getCmp(prototype.ProrrateoNew.id+'-imgNext').show();
                    else Ext.getCmp(prototype.ProrrateoNew.id+'-imgNext').hide();
                    if(this.bean.TDNR === Ext.getCmp(prototype.ProrrateoNew.id+'-TicketPadre').text) Ext.getCmp(prototype.ProrrateoNew.id+'-imgPrev').hide();
                    else Ext.getCmp(prototype.ProrrateoNew.id+'-imgPrev').show();
                }
                Ext.getCmp(prototype.ProrrateoNew.id+'-EsConjunto').setText(this.bean.strEsCjn);
                if(Ext.getCmp(prototype.ProrrateoNew.id+'-EsConjunto').text === 'C'){
                    Ext.getCmp(prototype.ProrrateoNew.id+'-lblCnj').setText('COMPANION TICKETS');
                    Ext.getCmp(prototype.ProrrateoNew.id+'-txtConj').setValue(this.bean.strConjuncion);
                }else{
                    if(this.bean.TDNR === Ext.getCmp(prototype.ProrrateoNew.id+'-TicketPadre').text){
                        Ext.getCmp(prototype.ProrrateoNew.id+'-lblCnj').setText('CONJUNTION TICKETS');
                        Ext.getCmp(prototype.ProrrateoNew.id+'-txtConj').setValue(this.bean.strConjuncion);
                    }
                }
            }else{
                Ext.getCmp(prototype.ProrrateoNew.id+'-lblError').setValue(this.bean.strMsj);
                Ext.getCmp(prototype.ProrrateoNew.id+'-lblError').show();
            }
        }
        
    },
    
    //<editor-fold defaultstate="collapsed" desc="searchBSP">
    searchBSP: function (filter) {
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url+'/searchBSP',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(filter)},
            beforerequest: Ext.getCmp('ScrProrrateoNewForm').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle.onResultSearch(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp('ScrProrrateoNewForm').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp('ScrProrrateoNewForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchA720">
    searchA720: function (TDNR, strVTR) {
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url+'/searchA720',
            method: 'POST',
            timeout: 60000000,
            params: {TDNR: TDNR, strVTR: strVTR},
            beforerequest: Ext.getCmp('ScrProrrateoNewForm').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle.onResultSearchA720(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp('ScrProrrateoNewForm').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp('ScrProrrateoNewForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchAgent">
    searchAgent: function (AGTN) {
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url+'/searchAgent',
            method: 'POST',
            timeout: 60000000,
            params: {AGTN: AGTN},
            beforerequest: Ext.getCmp('ScrProrrateoNewForm').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle.onResultSearchAgent(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp('ScrProrrateoNewForm').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp('ScrProrrateoNewForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchISR">
    searchISR: function (bean) {
        console.log('searchISR');
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url+'/searchISR',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp('ScrProrrateoNewForm').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle.onResultSearch(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp('ScrProrrateoNewForm').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp('ScrProrrateoNewForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchARC">
    searchARC: function (bean) {
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url+'/searchARC',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp('ScrProrrateoNewForm').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle.onResultSearch(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp('ScrProrrateoNewForm').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp('ScrProrrateoNewForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchA713">
    searchA713: function (TDNR) {
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url+'/searchA713',
            method: 'POST',
            timeout: 60000000,
            params: {TDNR: TDNR, Seq: ""},
            beforerequest: Ext.getCmp('ScrProrrateoNewForm').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle.onResultSearchA720(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp('ScrProrrateoNewForm').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp('ScrProrrateoNewForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchASR">
    searchASR: function (bean) {
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url+'/searchASR',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp('ScrProrrateoNewForm').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle.onResultSearch(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp('ScrProrrateoNewForm').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp('ScrProrrateoNewForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDeliveryRFND">
    searchDeliveryRFND: function (bean) {
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url + '/searchDeliveryRFND',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    
                } else global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDelivery">
    searchDelivery: function (bean) {
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url + '/searchDelivery',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle.onResultSearchDelivery(res);
                } else global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="button">
    btnMasterIndex_clickHandler: function () {
        this.beanA020.TDNR = Ext.getCmp(prototype.ProrrateoNew.id + '-TicketPadre').text;
        console.log('beanA020');
        console.log(this.beanA020);
        if(this.beanA020.TDNR !== '' ){
            var SrcMasterIndexForm = Ext.create('Ext.Praxis.view.screens.SrcMasterIndexForm', { id: 'SrcMasterIndexForm' });
            var controller = SrcMasterIndexForm.getController();
            controller.bean = this.beanA020;
            controller.actionCode = 'S';
            SrcMasterIndexForm.show();
        }
    },
    btnDelivery_clickHandler: function() {
        this.bean.TDNR = Ext.getCmp(prototype.ProrrateoNew.id + '-TicketPadre').text;
	if(this.modBack.substr(0,8) === 'SALE_RFN'){
            if(this.bean.TDNR !== '' && this.bean.FUENTE !== ''){
                this.searchDeliveryRFND(this.bean);
            }
	}
	else{
            if(this.bean.TDNR !== '' && this.bean.FUENTE !== ''){
                this.searchDelivery(this.bean);
            }
	}
    },
    onBtnPrev: function() {
//        var bean = this.paramsProrrateo.beanFacProrrateo;
//        var listBeanA720 = this.paramsProrrateo.beanRest;
//        var params = this.paramsProrrateo.facsimilParams;
//        var beanA720 = {};
//
//
//
//        var TicketCompanion = '';
//        var cant;
//        var lblTicket = Ext.getCmp(prototype.ProrrateoNew.id+'-lblTicket').text;
//        lblTicket = lblTicket.substr(0, 3)+lblTicket.substr(5, 10);
//        TicketCompanion = bean.strCompanion.trim();
//
//        if (bean.strEsCjn === 'C') {
//            cant = TicketCompanion.text.length / 13;
//            for (var i = 0; i < cant; i++) {
//                if (TicketCompanion.substr(0+(i * 13), 13+(i * 13)) === lblTicket) {
//                    params.TDNR = TicketCompanion.text.substr(0+((i - 1) * 13), 13+((i - 1) * 13));
//                    console.log("params.TDNR"+params.TDNR);
//                }
//            }
//        }
//        else {
//            var ticket = lblTicket - 1;
//            if (lblTicket !== params.TicketPadre) {
//                params.TDNR = ticket;//+ '                 '+bean.strEsCjn+params.TicketPadre;
//            }
//            else {
//                params.TDNR = ticket+'';
//            }
//            var url = '';
//            if (params.TDNR !== '' || params.TDNR.length >= 13) {
//                //limpiarDatosFacsimilConj();
//                if (params.FUENTE.trim() === 'A' || params.FUENTE.trim() === 'ARC') {
//                    url = 'searchARC';
//                } else if (params.FUENTE.trim() === 'ASR' || params.FUENTE.trim() === 'S') {
//                    url = 'searchASR';
//                } else if (params.FUENTE.trim() === 'BSP' || params.FUENTE.trim() === 'B') {
//                    url = 'searchBSP';
//                } else
//                    url = 'searchARC';
//            }
//
//            var URL1 = CONTEXTPATH+'/Prorrateo/'+url;
//            var URL2 = CONTEXTPATH+'/Prorrateo/'+'searchA720';
//            var paramsProrrateo = {
//                beanFacProrrateo: "",
//                beanRest: "",
//                facsimilParams: params
//            };
//
//            Ext.Ajax.request({
//                url: URL1,
//                method: 'POST',
//                timeout: 60000000,
//                beforerequest: Ext.getCmp(prototype.ProrrateoNew.id+'-prorrateo').mask('Loading...'),
//                params: params,
//                success: function(response, options) {
//                    var res = Ext.JSON.decode(response.responseText);
//                    var beanFacProrrateo = res.beanFacProrrateo;
//                    paramsProrrateo.beanFacProrrateo = beanFacProrrateo;
//
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-prorrateo').unmask();
//                    Ext.Ajax.request({
//                        url: URL2,
//                        method: 'POST',
//                        timeout: 60000000,
//                        beforerequest: Ext.getCmp(prototype.ProrrateoNew.id+'-prorrateo').mask('Loading...'),
//                        params: params,
//                        success: function(response, options) {
//                            var res = Ext.JSON.decode(response.responseText);
//                            var beanRest = res.beanRest;
//                            paramsProrrateo.beanRest = beanRest;
//                            Ext.getCmp(prototype.ProrrateoNew.id+'-prorrateo').unmask();
//                            meEle.getDataInputsProrrateo(paramsProrrateo);
//                            Ext.getCmp(prototype.ProrrateoNew.id+'-prorrateo').unmask();
//                        }
//                    });
//
//
//                }
//            });
//        }
    },
    onBtnNext: function() {
//        var bean = this.paramsProrrateo.beanFacProrrateo;
//        var listBeanA720 = this.paramsProrrateo.beanRest;
//        var params = this.paramsProrrateo.facsimilParams;
//        var beanA720 = {};
//
//
//
//        var TicketCompanion = '';
//        var cant;
//        var lblTicket = Ext.getCmp(prototype.ProrrateoNew.id+'-lblTicket').text;
//        lblTicket = lblTicket.substr(0, 3)+lblTicket.substr(5, 10);
//        TicketCompanion = bean.strCompanion.trim();
//
//        if (bean.strEsCjn === 'C') {
//            cant = TicketCompanion.text.length / 13;
//            for (var i = 0; i < cant; i++) {
//                if (TicketCompanion.substr(0+(i * 13), 13+(i * 13)) === lblTicket) {
//                    params.TDNR = TicketCompanion.text.substr(0+((i - 1) * 13), 13+((i - 1) * 13));
//                    console.log("params.TDNR"+params.TDNR);
//                }
//            }
//        }
//        else {
//            var ticket = lblTicket+1;
//            if (lblTicket !== params.TicketPadre) {
//                params.TDNR = ticket;//+ '                 '+bean.strEsCjn+params.TicketPadre;
//            }
//            else {
//                params.TDNR = ticket+'';
//            }
//            var url = '';
//            if (params.TDNR !== '' || params.TDNR.length >= 13) {
//                //limpiarDatosFacsimilConj();
//                if (params.FUENTE.trim() === 'A' || params.FUENTE.trim() === 'ARC') {
//                    url = 'searchARC';
//                } else if (params.FUENTE.trim() === 'ASR' || params.FUENTE.trim() === 'S') {
//                    url = 'searchASR';
//                } else if (params.FUENTE.trim() === 'BSP' || params.FUENTE.trim() === 'B') {
//                    url = 'searchBSP';
//                } else
//                    url = 'searchARC';
//            }
//
//            var URL1 = CONTEXTPATH+'/Prorrateo/'+url;
//            var URL2 = CONTEXTPATH+'/Prorrateo/'+'searchA720';
//            var paramsProrrateo = {
//                beanFacProrrateo: "",
//                beanRest: "",
//                facsimilParams: params
//            };
//
//            Ext.Ajax.request({
//                url: URL1,
//                method: 'POST',
//                timeout: 60000000,
//                beforerequest: Ext.getCmp(prototype.ProrrateoNew.id+'-prorrateo').mask('Loading...'),
//                params: params,
//                success: function(response, options) {
//                    var res = Ext.JSON.decode(response.responseText);
//                    var beanFacProrrateo = res.beanFacProrrateo;
//                    paramsProrrateo.beanFacProrrateo = beanFacProrrateo;
//
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-prorrateo').unmask();
//                    Ext.Ajax.request({
//                        url: URL2,
//                        method: 'POST',
//                        timeout: 60000000,
//                        beforerequest: Ext.getCmp(prototype.ProrrateoNew.id+'-prorrateo').mask('Loading...'),
//                        params: params,
//                        success: function(response, options) {
//                            var res = Ext.JSON.decode(response.responseText);
//                            var beanRest = res.beanRest;
//                            paramsProrrateo.beanRest = beanRest;
//                            Ext.getCmp(prototype.ProrrateoNew.id+'-prorrateo').unmask();
//                            meEle.getDataInputsProrrateo(paramsProrrateo);
//                            Ext.getCmp(prototype.ProrrateoNew.id+'-prorrateo').unmask();
//                        }
//                    });
//
//
//                }
//            });
//        }
    },
    imgClear_clickHandler: function () {
        this.limpiarDatosFacsimil();
        //Colocando campos del A720 ========================
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtREGIST').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtFREGIS').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtREVISA').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtFREVIS').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtGRUPO').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtA1530STPRO').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtORIG').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtCNJ').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtPRO').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtMONREG').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtFECVTA').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtCIUVTA').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtPAIVTA').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtCIUEMI').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtPAIEMI').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtCOMMIS').setValue('0');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtMDACOM').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtPORCOM').setValue('0');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtCODIT').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtINITRA').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtTAJUST').setValue('0');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtTAJUSQ').setValue('0');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtTARIFA').setValue('0');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtMONEDA').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtTRFPAG').setValue('0');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtMDAPAG').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtTRFNUC').setValue('0');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtROE').setValue('0');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtCPLUSS').setValue('0');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtCSOVER').setValue('0');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtQSOVER').setValue('0');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtFEXCH').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtNRPRT').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtCURR').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtFARECOBL').setValue('0');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtPAGO').setValue('0');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtPGCURR').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtFareCal').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtMDAFRC').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtRATE').setValue('0.000000');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtTourC').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtSTAT').setValue('');
        
        Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetCpnCTS').getStore().removeAll();
        Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetCpn').getStore().removeAll();
    },
    btnClose_clickHandler: function() {
        this.view.close();
    },
    //</editor-fold>
    limpiarDatosFacsimil: function () {
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtPNR').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-lblAgente').setText('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-lblNomAgente').setText('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-lblDirAgente').setText('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtOrigDest').setValue('');
        new Ext.create('Ext.tip.ToolTip', {
            target: prototype.ProrrateoNew.id+'-txtEndors',
            html: ''
        });
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtEndors').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtDateIssue').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtIssExc').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtPassenger').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtFareCal').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtFare').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtEquivFa').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtTaxes').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtTotal').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtFormPay').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-lblTicket').setText('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtConj').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-txtORIN').setValue('');
        Ext.getCmp(prototype.ProrrateoNew.id+'-btnDelivery').setText('<strong style="color:white">Delivery</b>');
    },
    //<editor-fold defaultstate="collapsed" desc="comment">
//    getDataBeanA720: function(listBeanA720) {
//        var beanA720 = {};
//        if (listBeanA720 !== '') {
//            this.lstRest = listBeanA720;
//            if (listBeanA720.length > 0) {
//
//                beanA720 = listBeanA720[0];
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtREGIST').setValue(beanA720.A720REGIST);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtFREGIS').setValue(beanA720.A720FREGIS);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtREVISA').setValue(beanA720.A720REVISA);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtFREVIS').setValue(beanA720.A720FREVIS);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtGRUPO').setValue(beanA720.A720GRUPO);
//                if (beanA720.strOthers !== "") {
//                    var tip = Ext.create('Ext.tip.ToolTip', {
//                        target: prototype.ProrrateoNew.id+'-txtGRUPO',
//                        html: ''+beanA720.strOthers.trim()
//                    });
//                }
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtA1530STPRO').setValue(beanA720.A1530STPRO);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtORIG').setValue(beanA720.txtORIG);
//
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtCNJ').setValue(beanA720.A720FLAG+beanA720.A720CTKTC);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtPRO').setValue(beanA720.A720PRO);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtMONREG').setValue(beanA720.A720MONREG);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtFECVTA').setValue(beanA720.A720FECVTA);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtCIUVTA').setValue(beanA720.A720CIUVTA);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtPAIVTA').setValue(beanA720.A720PAIVTA);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtCIUEMI').setValue(beanA720.A720CIUEMI);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtPAIEMI').setValue(beanA720.A720PAIEMI);
//
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtCOMMIS').setValue(Ext.util.Format.number(beanA720.A720TTCOMM, '0,000.00'));
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtMDACOM').setValue(beanA720.A720MDACOM);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtPORCOM').setValue(Ext.util.Format.number(beanA720.A720PORCOM, '0,000.00'));
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtCODIT').setValue(beanA720.A720CODIT);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtINITRA').setValue(beanA720.A720INITRA);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtTAJUST').setValue(Ext.util.Format.number(beanA720.A720TAJUST, '0,000.00'));
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtTAJUSQ').setValue(Ext.util.Format.number(beanA720.A720TAJUSQ, '0,000.00'));
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtTARIFA').setValue(Ext.util.Format.number(beanA720.A720TARIFA, '0,000.00'));
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtMONEDA').setValue(beanA720.A720MONEDA);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtTRFPAG').setValue(Ext.util.Format.number(beanA720.A720TRFPAG, '0,000.00'));
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtMDAPAG').setValue(beanA720.A720MDAPAG);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtTRFNUC').setValue(Ext.util.Format.number(beanA720.A720TRFNUC, '0,000.00'));
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtROE').setValue(Ext.util.Format.number(beanA720.A720ROE, '0,000.00'));
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtCPLUSS').setValue(Ext.util.Format.number(beanA720.A720CPLUSS, '0,000.00'));
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtCSOVER').setValue(Ext.util.Format.number(beanA720.A720TTSCMM, '0,000.00'));
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtQSOVER').setValue(Ext.util.Format.number(beanA720.A720QSOVER, '0,000.00'));
//
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtFEXCH').setValue(beanA720.A1345FEXCH);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtCURR').setValue(beanA720.A1345CURR);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtFARECOBL').setValue(Ext.util.Format.number(beanA720.A1345FARE, '0,000.00'));
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtPAGO').setValue(Ext.util.Format.number(beanA720.A1345PAGO, '0,000.00'));
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtRATE').setValue(Ext.util.Format.number(beanA720.A1526RATE, '0,000.00000'));
//
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtSTAT').setValue(beanA720.A720STAT);
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtPGCURR').setValue(beanA720.A1345PGCUR);
//
//                if (beanA720.strOthers !== "") {
//                    var tip = Ext.create('Ext.tip.ToolTip', {
//                        target: prototype.ProrrateoNew.id+'-txtSTAT',
//                        html: ''+beanA720.strOthers.trim()
//                    });
//                }
//
//
//                var dataGridCpn = [];
//                var tmpValue = 0;
//                var difValue = 0;
//                var intTARIFA;
//                var listaRout = beanA720.lstRegA720;
//                var rowListaRout = {};
//
//                for (var i = 0; i < listaRout.length; i++) {
//                    rowListaRout = listaRout[i];
//                    rowListaRout.PRORAT_LOCAL_CUR = rowListaRout.A720VALOR / beanA720.A720TCAMB;
//                    tmpValue = tmpValue+rowListaRout.PRORAT_LOCAL_CUR;
//
//                    if (i === (listaRout.length - 1)) {
//                        intTARIFA = beanA720.A720TRFPAG > 0 ? beanA720.A720TRFPAG : beanA720.A720TARIFA;
//                        if (beanA720.A720TRNCU === 'SALE') {
//                            if (tmpValue > intTARIFA) {
//                                difValue = tmpValue - intTARIFA;
//                                rowListaRout.PRORAT_LOCAL_CUR = rowListaRout.PRORAT_LOCAL_CUR - difValue;
//
//                            } else if (tmpValue < intTARIFA) {
//                                difValue = intTARIFA - tmpValue;
//                                rowListaRout.PRORAT_LOCAL_CUR = rowListaRout.PRORAT_LOCAL_CUR+difValue;
//                            }
//                        } else {
//                            if (tmpValue > intTARIFA) {
//                                difValue = tmpValue - intTARIFA;
//                                rowListaRout.PRORAT_LOCAL_CUR = rowListaRout.PRORAT_LOCAL_CUR - difValue;
//                            } else if (tmpValue < intTARIFA) {
//                                difValue = intTARIFA - tmpValue;
//                                rowListaRout.PRORAT_LOCAL_CUR = rowListaRout.PRORAT_LOCAL_CUR+difValue;
//                            }
//                        }
//                    }
//
//
//                    dataGridCpn.push(rowListaRout);
//                }
//
//                var storeGridCpn = Ext.create('Ext.data.Store', {
//                    data: dataGridCpn,
//                    autoLoad: true
//                });
//                Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetCpn').bindStore(storeGridCpn);
//            }
//        }
//    },
//    getDataInputsProrrateo: function(paramsPro) {
//        if (paramsPro === undefined) {
//            this.paramsProrrateo = this.param.paramsProrrateo;
//        } else {
//            console.log(paramsPro);
//            this.paramsProrrateo = paramsPro;
//        }
//
//        var bean = this.paramsProrrateo.beanFacProrrateo;
//        var listBeanA720 = this.paramsProrrateo.beanRest;
//        var params = this.paramsProrrateo.facsimilParams;
//        var beanA720 = {};
//
//
//        var strVoid = '';
//        var lblError = '';
//        var TicketCompanion = '';
//        var lblPais = '';
//        var toolTip = '';
//        var TicketPadre = params.TicketPadre;
//
//        if (bean.strError.trim() === '0' || bean.strError.trim() === '') {
//            if (bean.TRNC === 'VOID' || bean.TRNC === 'CANX' || bean.TRNC === 'N   ') {
//                strVoid = 'V';
//            } else {
//                strVoid = '';
//            }
//            lblError = '';
////                lblError.visible = false;
//            TicketCompanion = bean.strCompanion.trim();
//            if (bean.FUENTE.trim() === 'ARC' || bean.FUENTE.trim() === 'A') {
//                if (params.back.substr(0, 8) === 'SALE_RFN') {
//                    toolTip = 'Estructuras: A1347/A713/A003';
//                } else {
//                    toolTip = 'Estructuras: A1347/A720/A003';
//                }
//                Ext.getCmp(prototype.ProrrateoNew.id+'-lblFuente').setText("ARC");
//                Ext.getCmp(prototype.ProrrateoNew.id+'-btnDelivery').setText('<strong style="color:white">ARC Delivery</b>');
//            } else if (bean.FUENTE.trim() === 'ASR' || bean.FUENTE.trim() === 'S') {
//                if (params.back.substr(0, 8) === 'SALE_RFN') {
//                    toolTip = 'Estructuras: A1536/A713/A003';
//                } else {
//                    toolTip = 'Estructuras: A1536/A720/A003';
//                }
//                Ext.getCmp(prototype.ProrrateoNew.id+'-lblFuente').setText("ASR");
//                Ext.getCmp(prototype.ProrrateoNew.id+'-btnDelivery').setText('<strong style="color:white">ASR Delivery</b>');
//            } else {
//                if (bean.FUENTE.trim() === 'SALE_RFN') {
//                    toolTip = 'Estructuras: A1348/A713/A003';
//                } else {
//                    toolTip = 'Estructuras: A1348/A720/A003';
//                }
//                Ext.getCmp(prototype.ProrrateoNew.id+'-lblFuente').setText("BSP");
//                Ext.getCmp(prototype.ProrrateoNew.id+'-btnDelivery').setText('<strong style="color:white">BSP Delivery</b>');
//            }
//            lblPais = bean.COUNTRY.trim();
//            Ext.getCmp(prototype.ProrrateoNew.id+'-txtOrigDest').setValue(bean.TODC.substring(0, 3)+' - '+bean.TODC.substring(3));
//            //Armando Endorsements/Restrictions============================
//            var lstReg46Restrict = bean.lstReg46Restrict;
//            var strRestrict = '';
//            for (var i = 0; i < lstReg46Restrict.length; i++) {
//                strRestrict = strRestrict+lstReg46Restrict[i];
//            }
//            if (strRestrict !== "") {
//                var tip = Ext.create('Ext.tip.ToolTip', {
//                    target: prototype.ProrrateoNew.id+'-txtEndors',
//                    html: ''+strRestrict.trim()
//                });
//            }
//            Ext.create('Ext.tip.ToolTip', {
//                target: prototype.ProrrateoNew.id+'-imgPrev',
//                html: 'Conj - Prev'
//            });
//            Ext.create('Ext.tip.ToolTip', {
//                target: prototype.ProrrateoNew.id+'-imgNext',
//                html: 'Conj - Next'
//            });
//
//            Ext.getCmp(prototype.ProrrateoNew.id+'-txtEndors').setValue(strRestrict);
//            //End Endorsements/Restrictions
//            //Armando Original Issue ============================
//            var lstReg46OrigIssue = bean.lstReg46OrigIssue;
//            var strOrigIssue = '';
//            for (var i46 = 0; i46 < lstReg46OrigIssue.length; i46++) {
//                strOrigIssue = strOrigIssue+lstReg46OrigIssue[i46].trim();
//            }
//            Ext.getCmp(prototype.ProrrateoNew.id+'-txtORIN').setValue(strOrigIssue);
//            //End Original Issue
//            Ext.getCmp(prototype.ProrrateoNew.id+'-txtDateIssue').setValue(bean.DAIS);
//            Ext.getCmp(prototype.ProrrateoNew.id+'-txtIssExc').setValue(bean.strIssExc);
//            Ext.getCmp(prototype.ProrrateoNew.id+'-txtPassenger').setValue(bean.PXNM);
//            //Armando Fare Calc ============================
//            var lstFC = bean.lstFC;
//            var strFC = '';
//            for (var iFC = 0; iFC < lstFC.length; iFC++) {
//                strFC = strFC+lstFC[iFC].trim(); // +'\n';
//            }
//            Ext.getCmp(prototype.ProrrateoNew.id+'-txtFareCal').setValue(strFC);
//            //End FC
//            Ext.getCmp(prototype.ProrrateoNew.id+'-txtTourC').setValue(bean.TOUR);
//            Ext.getCmp(prototype.ProrrateoNew.id+'-txtPNR').setValue(bean.PNRR);
//            var storeGridDetFac = Ext.create('Ext.data.Store', {
//                data: bean.lstReg63,
//                autoLoad: true
//            });
//            Ext.getCmp(prototype.ProrrateoNew.id+'-gridDetFac').bindStore(storeGridDetFac);
//            //Armando TAX/Fare ============================
//            Ext.getCmp(prototype.ProrrateoNew.id+'-txtFare').setValue(bean.CUTP1+' '+Ext.util.Format.number(bean.FARE, '0,000.00'));
//            if (parseFloat(bean.EQFR.substring(3)) > 0) {
//                if (bean.EQFR.substring(0, 3).trim().length > 0) {
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-txtEquivFa').setValue(bean.EQFR.substring(0, 3)+' '+Ext.util.Format.number(bean.EQFR.substring(3), '0,000.00'));
//                } else {
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-txtEquivFa').setValue(bean.CUTP1+' '+Ext.util.Format.number(bean.EQFR.substring(3), '0,000.00'));
//                }
//            } else {
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtEquivFa').setValue("");
//            }
//
//            if (Ext.getCmp(prototype.ProrrateoNew.id+'-txtEquivFa').getValue().trim().substring(0, 3).length > 0) {
//
//                if (Ext.util.Format.number(bean.TOTL, '0,000.00').trim() === '') {
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-txtTotal').setValue(bean.TOTL);
//                } else {
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-txtTotal').setValue(Ext.getCmp(prototype.ProrrateoNew.id+'-txtEquivFa').getValue().trim().substring(0, 3)+' '+Ext.util.Format.number(bean.TOTL.substring(3).trim(), '0,000.00'));
//                }
//            } else {
//                if (Ext.util.Format.number(bean.TOTL, '0,000.00').trim() === '') {
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-txtTotal').setValue(bean.CUTP1+' '+Ext.util.Format.number(bean.TOTL.substring(3).trim(), '0,000.00'));
//                } else {
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-txtTotal').setValue(bean.CUTP1+' '+Ext.util.Format.number(bean.TOTL, '0,000.00'));
//                }
//
//            }
//
//            var lstTaxes = bean.lstTaxes;
//            var strTax = '';
//            for (var iTax = 0; iTax < lstTaxes.length; iTax++) {
//                strTax = strTax+lstTaxes[iTax].trim()+'\n';
//            }
//            Ext.getCmp(prototype.ProrrateoNew.id+'-txtTaxes').setValue(strTax);
//            //End Tax/Fare
//            //Armando FOP ============================
//            var lstFOP = bean.lstFOP;
//            var strTexto = '';
//            for (var iFop = 0; iFop < lstFOP.length; iFop++) {
//                strTexto = strTexto+lstFOP[iFop].trim()+'\n';
//            }
//            Ext.getCmp(prototype.ProrrateoNew.id+'-txtFormPay').setValue(strTexto);
//            //End FC
//            Ext.getCmp(prototype.ProrrateoNew.id+'-lblTicket').setText(bean.TDNR.substring(0, 3)+'  '+bean.TDNR.substring(3)+'  '+bean.CDGT);
//            if (bean.strEsCjn === 'C') {
//                var cant = TicketCompanion.length / 13;
//                if (TicketCompanion.substring((cant * 13) - 13, cant * 13) === bean.TDNR) {
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-imgNext').hide();
//                } else {
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-imgNext').show();
//                }
//                if (TicketCompanion.substring(0, 13) === bean.TDNR) {
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-imgPrev').hide();
//                }
//                else {
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-imgPrev').show();
//                }
//            } else {
//                if (bean.strFinCjn === 'N') {
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-imgNext').show();
//                } else {
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-imgNext').hide();
//                }
//                if (bean.TDNR === TicketPadre) {
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-imgPrev').hide();
//                }
//                else {
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-imgPrev').show();
//                }
//            }
//
//            var EsConjunto = bean.strEsCjn;
//            if (EsConjunto === 'C') {
//                Ext.getCmp(prototype.ProrrateoNew.id+'-lblCnj').setText("COMPANION TICKETS");
//                Ext.getCmp(prototype.ProrrateoNew.id+'-txtConj').setValue(bean.strConjuncion);
//            } else {
//                if (bean.TDNR === TicketPadre) {
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-lblCnj').setText("CONJUNTION TICKETS");
//                    Ext.getCmp(prototype.ProrrateoNew.id+'-txtConj').setValue(bean.strConjuncion);
//
//                }
//            }
//            if (bean.TDNR.trim() === TicketPadre) {
//                var URL = CONTEXTPATH+'/Prorrateo/searchAgent';
//                Ext.Ajax.request({
//                    url: URL,
//                    method: 'POST',
//                    timeout: 60000000,
//                    beforerequest: Ext.getCmp(prototype.ProrrateoNew.id+'-prorrateo').mask('Loading...'),
//                    params: {
//                        AGNT: bean.AGTN
//                    },
//                    success: function(response, options) {
//                        var res = Ext.JSON.decode(response.responseText);
//                        var beanAGTN = res.beanAGTN;
//
//                        if (beanAGTN !== null) {
//                            if (beanAGTN.length > 0) {
//                                var agente = beanAGTN[0];
//                                Ext.getCmp(prototype.ProrrateoNew.id+'-lblNomAer').setText(agente.strNomAero);
//                                Ext.getCmp(prototype.ProrrateoNew.id+'-lblAgente').setText(agente.AGTN);
//                                Ext.getCmp(prototype.ProrrateoNew.id+'-lblNomAgente').setText(agente.strNombreAgente);
//                                Ext.getCmp(prototype.ProrrateoNew.id+'-lblDirAgente').setText(agente.strDirecAgente);
//
//
//                            }
//                        }
//                        Ext.getCmp(prototype.ProrrateoNew.id+'-prorrateo').unmask('Loading...');
//                    }
//                });
//            }
//        } else {
//            //lblError.text = bean.strMsj;
//            //  lblError.visible = true;
//            //grid63DataAC = bean.lstReg63;
//        }
//        this.getDataBeanA720(listBeanA720);
////       
//    },
    //</editor-fold>
    parseStringToDate: function(fecha, separador) {
        separador = separador === null || separador === undefined ? "/" : "";
        if (fecha.length===8)
            fecha = fecha.substring(0,4)+separador+fecha.substring(4,6)+separador+fecha.substring(6,8);
        return fecha;
    }
});