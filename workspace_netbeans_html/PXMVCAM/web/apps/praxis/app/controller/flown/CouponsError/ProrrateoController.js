/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.flown.CouponsError.ProrrateoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-ProrrateoController',
    url: CONTEXTPATH + '/CouponsError',
    id: prototype.id + '-prorrateo',
    paramsProrrateo: {},
    lstRest: {},
    recP: {},
    meCou: '',
    /**
     * Constructor
     */
    init: function(view) {
        meCou = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        this.param = this.view.params;
        this.getDataInputsProrrateo();
        this.view.setHeight(this.view.getHeight());
    },
    getDataBeanA720: function(listBeanA720) {
        var beanA720 = {};
        if (listBeanA720 !== '') {
            this.lstRest = listBeanA720;
            if (listBeanA720.length > 0) {

                beanA720 = listBeanA720[0];
                Ext.getCmp(prototype.id + '-txtREGIST').setValue(beanA720.A720REGIST);
                Ext.getCmp(prototype.id + '-txtFREGIS').setValue(beanA720.A720FREGIS);
                Ext.getCmp(prototype.id + '-txtREVISA').setValue(beanA720.A720REVISA);
                Ext.getCmp(prototype.id + '-txtFREVIS').setValue(beanA720.A720FREVIS);
                Ext.getCmp(prototype.id + '-txtGRUPO').setValue(beanA720.A720GRUPO);
                if (beanA720.strOthers !== "") {
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id + '-txtGRUPO',
                        html: '' + beanA720.strOthers.trim()
                    });
                }
                Ext.getCmp(prototype.id + '-txtA1530STPRO').setValue(beanA720.A1530STPRO);
                Ext.getCmp(prototype.id + '-txtORIG').setValue(beanA720.txtORIG);

                Ext.getCmp(prototype.id + '-txtCNJ').setValue(beanA720.A720FLAG + beanA720.A720CTKTC);
                Ext.getCmp(prototype.id + '-txtPRO').setValue(beanA720.A720PRO);
                Ext.getCmp(prototype.id + '-txtMONREG').setValue(beanA720.A720MONREG);
                Ext.getCmp(prototype.id + '-txtFECVTA').setValue(beanA720.A720FECVTA);
                Ext.getCmp(prototype.id + '-txtCIUVTA').setValue(beanA720.A720CIUVTA);
                Ext.getCmp(prototype.id + '-txtPAIVTA').setValue(beanA720.A720PAIVTA);
                Ext.getCmp(prototype.id + '-txtCIUEMI').setValue(beanA720.A720CIUEMI);
                Ext.getCmp(prototype.id + '-txtPAIEMI').setValue(beanA720.A720PAIEMI);

                Ext.getCmp(prototype.id + '-txtCOMMIS').setValue(Ext.util.Format.number(beanA720.A720TTCOMM, '0,000.00'));
                Ext.getCmp(prototype.id + '-txtMDACOM').setValue(beanA720.A720MDACOM);
                Ext.getCmp(prototype.id + '-txtPORCOM').setValue(Ext.util.Format.number(beanA720.A720PORCOM, '0,000.00'));
                Ext.getCmp(prototype.id + '-txtCODIT').setValue(beanA720.A720CODIT);
                Ext.getCmp(prototype.id + '-txtINITRA').setValue(beanA720.A720INITRA);
                Ext.getCmp(prototype.id + '-txtTAJUST').setValue(Ext.util.Format.number(beanA720.A720TAJUST, '0,000.00'));
                Ext.getCmp(prototype.id + '-txtTAJUSQ').setValue(Ext.util.Format.number(beanA720.A720TAJUSQ, '0,000.00'));
                Ext.getCmp(prototype.id + '-txtTARIFA').setValue(Ext.util.Format.number(beanA720.A720TARIFA, '0,000.00'));
                Ext.getCmp(prototype.id + '-txtMONEDA').setValue(beanA720.A720MONEDA);
                Ext.getCmp(prototype.id + '-txtTRFPAG').setValue(Ext.util.Format.number(beanA720.A720TRFPAG, '0,000.00'));
                Ext.getCmp(prototype.id + '-txtMDAPAG').setValue(beanA720.A720MDAPAG);
                Ext.getCmp(prototype.id + '-txtTRFNUC').setValue(Ext.util.Format.number(beanA720.A720TRFNUC, '0,000.00'));
                Ext.getCmp(prototype.id + '-txtROE').setValue(Ext.util.Format.number(beanA720.A720ROE, '0,000.00'));
                Ext.getCmp(prototype.id + '-txtCPLUSS').setValue(Ext.util.Format.number(beanA720.A720CPLUSS, '0,000.00'));
                Ext.getCmp(prototype.id + '-txtCSOVER').setValue(Ext.util.Format.number(beanA720.A720TTSCMM, '0,000.00'));
                Ext.getCmp(prototype.id + '-txtQSOVER').setValue(Ext.util.Format.number(beanA720.A720QSOVER, '0,000.00'));

                Ext.getCmp(prototype.id + '-txtFEXCH').setValue(beanA720.A1345FEXCH);
                Ext.getCmp(prototype.id + '-txtCURR').setValue(beanA720.A1345CURR);
                Ext.getCmp(prototype.id + '-txtFARECOBL').setValue(Ext.util.Format.number(beanA720.A1345FARE, '0,000.00'));
                Ext.getCmp(prototype.id + '-txtPAGO').setValue(Ext.util.Format.number(beanA720.A1345PAGO, '0,000.00'));
                Ext.getCmp(prototype.id + '-txtRATE').setValue(Ext.util.Format.number(beanA720.A1526RATE, '0,000.00'));

                Ext.getCmp(prototype.id + '-txtSTAT').setValue(beanA720.A720STAT);
                Ext.getCmp(prototype.id + '-txtPGCURR').setValue(beanA720.A1345PGCUR);

                if (beanA720.strOthers !== "") {
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id + '-txtSTAT',
                        html: '' + beanA720.strOthers.trim()
                    });
                }


                var dataGridCpn = [];
                var tmpValue = 0;
                var difValue = 0;
                var intTARIFA;
                var listaRout = beanA720.lstRegA720;
                var rowListaRout = {};

                for (var i = 0; i < listaRout.length; i++) {
                    rowListaRout = listaRout[i];
                    rowListaRout.PRORAT_LOCAL_CUR = rowListaRout.A720VALOR / beanA720.A720TCAMB;
                    tmpValue = tmpValue + rowListaRout.PRORAT_LOCAL_CUR;

                    if (i === (listaRout.length - 1)) {
                        intTARIFA = beanA720.A720TRFPAG > 0 ? beanA720.A720TRFPAG : beanA720.A720TARIFA;
                        if (beanA720.A720TRNCU === 'SALE') {
                            if (tmpValue > intTARIFA) {
                                difValue = tmpValue - intTARIFA;
                                rowListaRout.PRORAT_LOCAL_CUR = rowListaRout.PRORAT_LOCAL_CUR - difValue;

                            } else if (tmpValue < intTARIFA) {
                                difValue = intTARIFA - tmpValue;
                                rowListaRout.PRORAT_LOCAL_CUR = rowListaRout.PRORAT_LOCAL_CUR + difValue;
                            }
                        } else {
                            if (tmpValue > intTARIFA) {
                                difValue = tmpValue - intTARIFA;
                                rowListaRout.PRORAT_LOCAL_CUR = rowListaRout.PRORAT_LOCAL_CUR - difValue;
                            } else if (tmpValue < intTARIFA) {
                                difValue = intTARIFA - tmpValue;
                                rowListaRout.PRORAT_LOCAL_CUR = rowListaRout.PRORAT_LOCAL_CUR + difValue;
                            }
                        }
                    }


                    dataGridCpn.push(rowListaRout);
                }

                var storeGridCpn = Ext.create('Ext.data.Store', {
                    data: dataGridCpn,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridDetCpn').bindStore(storeGridCpn);
            }
        }



    }
    ,
    getDataInputsProrrateo: function() {
        this.paramsProrrateo = this.param.paramsProrrateo;
        console.log(this.paramsProrrateo);

        var bean = this.paramsProrrateo.beanFacProrrateo;
        var listBeanA720 = this.paramsProrrateo.beanRest;
        var params = this.paramsProrrateo.facsimilParams;
        var beanA720 = {};


        var strVoid = '';
        var lblError = '';
        var TicketCompanion = '';
        var lblPais = '';
        var toolTip = '';
        var TicketPadre = params.TicketPadre;

        if (bean.strError.trim() === '0' || bean.strError.trim() === '') {
            if (bean.TRNC === 'VOID' || bean.TRNC === 'CANX' || bean.TRNC === 'N   ') {
                strVoid = 'V';
            } else {
                strVoid = '';
            }
            lblError = '';
//                lblError.visible = false;
            TicketCompanion = bean.strCompanion.trim();
            if (bean.FUENTE.trim() === 'ARC' || bean.FUENTE.trim() === 'A') {
                if (params.back.substr(0, 8) === 'SALE_RFN') {
                    toolTip = 'Estructuras: A1347/A713/A003';
                } else {
                    toolTip = 'Estructuras: A1347/A720/A003';
                }
                Ext.getCmp(prototype.id + '-lblFuente').setText("ARC");
                Ext.getCmp(prototype.id + '-btnDelivery').setText('<b style="color:white">ARC Delivery</b>');
            } else if (bean.FUENTE.trim() === 'ASR' || bean.FUENTE.trim() === 'S') {
                if (params.back.substr(0, 8) === 'SALE_RFN') {
                    toolTip = 'Estructuras: A1536/A713/A003';
                } else {
                    toolTip = 'Estructuras: A1536/A720/A003';
                }
                Ext.getCmp(prototype.id + '-lblFuente').setText("ASR");
                Ext.getCmp(prototype.id + '-btnDelivery').setText('<b style="color:white">ASR Delivery</b>');
            } else {
                if (bean.FUENTE.trim() === 'SALE_RFN') {
                    toolTip = 'Estructuras: A1348/A713/A003';
                } else {
                    toolTip = 'Estructuras: A1348/A720/A003';
                }
                Ext.getCmp(prototype.id + '-lblFuente').setText("BSP");
                Ext.getCmp(prototype.id + '-btnDelivery').setText('<b style="color:white">BSP Delivery</b>');
            }
            lblPais = bean.COUNTRY.trim();
            Ext.getCmp(prototype.id + '-txtOrigDest').setValue(bean.TODC.substring(0, 3) + ' - ' + bean.TODC.substring(3));
            //Armando Endorsements/Restrictions============================
            var lstReg46Restrict = bean.lstReg46Restrict;
            var strRestrict = '';
            for (var i = 0; i < lstReg46Restrict.length; i++) {
                strRestrict = strRestrict + lstReg46Restrict[i];
            }
            if (strRestrict !== "") {
                var tip = Ext.create('Ext.tip.ToolTip', {
                    target: prototype.id + '-txtEndors',
                    html: '' + strRestrict.trim()
                });
            }
            Ext.create('Ext.tip.ToolTip', {
                target: prototype.id + '-imgPrev',
                html: 'Conj - Prev'
            });
            Ext.create('Ext.tip.ToolTip', {
                target: prototype.id + '-imgNext',
                html: 'Conj - Next'
            });

            Ext.getCmp(prototype.id + '-txtEndors').setValue(strRestrict);
            //End Endorsements/Restrictions
            //Armando Original Issue ============================
            var lstReg46OrigIssue = bean.lstReg46OrigIssue;
            var strOrigIssue = '';
            for (var i46 = 0; i46 < lstReg46OrigIssue.length; i46++) {
                strOrigIssue = strOrigIssue + lstReg46OrigIssue[i46].trim();
            }
            Ext.getCmp(prototype.id + '-txtORIN').setValue(strOrigIssue);
            //End Original Issue
            Ext.getCmp(prototype.id + '-txtDateIssue').setValue(bean.DAIS);
            Ext.getCmp(prototype.id + '-txtIssExc').setValue(bean.strIssExc);
            Ext.getCmp(prototype.id + '-txtPassenger').setValue(bean.PXNM);
            //Armando Fare Calc ============================
            var lstFC = bean.lstFC;
            var strFC = '';
            for (var iFC = 0; iFC < lstFC.length; iFC++) {
                strFC = strFC + lstFC[iFC].trim(); // +'\n';
            }
            Ext.getCmp(prototype.id + '-txtFareCal').setValue(strFC);
            //End FC
            Ext.getCmp(prototype.id + '-txtTourC').setValue(bean.TOUR);
            Ext.getCmp(prototype.id + '-txtPNR').setValue(bean.PNRR);
            var storeGridDetFac = Ext.create('Ext.data.Store', {
                data: bean.lstReg63,
                autoLoad: true
            });
            Ext.getCmp(prototype.id + '-gridDetFac').bindStore(storeGridDetFac);
            //Armando TAX/Fare ============================
            Ext.getCmp(prototype.id + '-txtFare').setValue(bean.CUTP1 + ' ' + Ext.util.Format.number(bean.FARE, '0,000.00'));
            if (parseFloat(bean.EQFR.substring(3)) > 0) {
                if (bean.EQFR.substring(0, 3).trim().length > 0) {
                    Ext.getCmp(prototype.id + '-txtEquivFa').setValue(bean.EQFR.substring(0, 3) + ' ' + Ext.util.Format.number(bean.EQFR.substring(3), '0,000.00'));
                } else {
                    Ext.getCmp(prototype.id + '-txtEquivFa').setValue(bean.CUTP1 + ' ' + Ext.util.Format.number(bean.EQFR.substring(3), '0,000.00'));
                }
            } else {
                Ext.getCmp(prototype.id + '-txtEquivFa').setValue("");
            }
            if (Ext.getCmp(prototype.id + '-txtEquivFa').getValue().trim().substring(0, 3).length > 0) {

                if (Ext.util.Format.number(bean.TOTL, '0,000.00').trim() === '') {
                    Ext.getCmp(prototype.id + '-txtTotal').setValue(Ext.getCmp(prototype.id + '-txtEquivFa').getValue().trim().substring(0, 3) + ' ' + Ext.util.Format.number(bean.TOTL.substring(3).trim(), '0,000.00'));
                    // Ext.getCmp(prototype.id + '-txtTotal').setValue(bean.TOTL);
                } else {
                    Ext.getCmp(prototype.id + '-txtTotal').setValue(Ext.getCmp(prototype.id + '-txtEquivFa').getValue().trim().substring(0, 3) + ' ' + Ext.util.Format.number(bean.TOTL.trim(), '0,000.00'));
                }
            } else {
                if (Ext.util.Format.number(bean.TOTL, '0,000.00').trim() === '') {
                    Ext.getCmp(prototype.id + '-txtTotal').setValue(bean.CUTP1 + ' ' + Ext.util.Format.number(bean.TOTL.substring(3).trim(), '0,000.00'));
                } else {
                    Ext.getCmp(prototype.id + '-txtTotal').setValue(bean.CUTP1 + ' ' + Ext.util.Format.number(bean.TOTL, '0,000.00'));
                }

            }

            var lstTaxes = bean.lstTaxes;
            var strTax = '';
            for (var iTax = 0; iTax < lstTaxes.length; iTax++) {
                strTax = strTax + lstTaxes[iTax].trim() + '\n';
            }
            Ext.getCmp(prototype.id + '-txtTaxes').setValue(strTax);
            //End Tax/Fare
            //Armando FOP ============================
            var lstFOP = bean.lstFOP;
            var strTexto = '';
            for (var iFop = 0; iFop < lstFOP.length; iFop++) {
                strTexto = strTexto + lstFOP[iFop].trim() + '\n';
            }
            Ext.getCmp(prototype.id + '-txtFormPay').setValue(strTexto);
            //End FC
            Ext.getCmp(prototype.id + '-lblTicket').setText(bean.TDNR.substring(0, 3) + '  ' + bean.TDNR.substring(3) + '  ' + bean.CDGT);
            if (bean.strEsCjn === 'C') {
                var cant = TicketCompanion.length / 13;
                if (TicketCompanion.substring((cant * 13) - 13, cant * 13) === bean.TDNR) {
                    Ext.getCmp(prototype.id + '-imgNext').hide();
                } else {
                    Ext.getCmp(prototype.id + '-imgNext').show();
                }
                if (TicketCompanion.substring(0, 13) === bean.TDNR) {
                    Ext.getCmp(prototype.id + '-imgPrev').hide();
                }
                else {
                    Ext.getCmp(prototype.id + '-imgPrev').show();
                }
            } else {
                if (bean.strFinCjn === 'N') {
                    Ext.getCmp(prototype.id + '-imgNext').show();
                } else {
                    Ext.getCmp(prototype.id + '-imgNext').hide();
                }
                if (bean.TDNR === TicketPadre) {
                    Ext.getCmp(prototype.id + '-imgPrev').hide();
                }
                else {
                    Ext.getCmp(prototype.id + '-imgPrev').show();
                }
            }

            var EsConjunto = bean.strEsCjn;
            if (EsConjunto === 'C') {
                Ext.getCmp(prototype.id + '-lblCnj').setText("COMPANION TICKETS");
                Ext.getCmp(prototype.id + '-txtConj').setValue(bean.strConjuncion);
            } else {
                if (bean.TDNR === TicketPadre) {
                    Ext.getCmp(prototype.id + '-lblCnj').setText("CONJUNTION TICKETS");
                    Ext.getCmp(prototype.id + '-txtConj').setValue(bean.strConjuncion);

                }
            }
            if (bean.TDNR.trim() === TicketPadre) {
                var URL = CONTEXTPATH + '/Prorrateo/searchAgent';
                Ext.Ajax.request({
                    url: URL,
                    method: 'POST',
                    timeout: 60000000,
                    beforerequest: Ext.getCmp(prototype.id + '-prorrateo').mask('Loading...'),
                    params: {
                        AGNT: bean.AGTN
                    },
                    success: function(response, options) {
                        var res = Ext.JSON.decode(response.responseText);
                        var beanAGTN = res.beanAGTN;
                        console.log(beanAGTN);
                        if (beanAGTN !== null) {
                            if (beanAGTN.length > 0) {
                                var agente = beanAGTN[0];
                                Ext.getCmp(prototype.id + '-lblNomAer').setText(agente.strNomAero);
                                Ext.getCmp(prototype.id + '-lblAgente').setText(agente.AGTN);
                                Ext.getCmp(prototype.id + '-lblNomAgente').setText(agente.strNombreAgente);
                                Ext.getCmp(prototype.id + '-lblDirAgente').setText(agente.strDirecAgente);


                            }
                        }
                        Ext.getCmp(prototype.id + '-prorrateo').unmask('Loading...');
                    }
                });
            }
        } else {
            //lblError.text = bean.strMsj;
            //  lblError.visible = true;
            //grid63DataAC = bean.lstReg63;
        }
        this.getDataBeanA720(listBeanA720);
//       
    },
    onBtnDelivery: function() {
        var URL = CONTEXTPATH + '/Prorrateo/searchDelivery';
        var params = this.paramsProrrateo.facsimilParams;
        Ext.Ajax.request({
            url: URL,
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-prorrateo').mask('Loading...'),
            params: params,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var strTextoBSP = res.strTextoBSP;


                var delivery = Ext.create('Ext.Praxis.view.flown.CouponsErrorForm.DeliveryInformation', {
                    id: prototype.id + '-deliveryInformation',
                    params: {
                        strTextoBSP: strTextoBSP
                    }
                });
                delivery.setId(prototype.id + "-deliveryInformation");
                delivery.show();
                Ext.getCmp(prototype.id + '-prorrateo').unmask();
            }
        });



    },
    onBtnPrev: function() {
        var bean = this.paramsProrrateo.beanFacProrrateo;
        var listBeanA720 = this.paramsProrrateo.beanRest;
        var params = this.paramsProrrateo.facsimilParams;
        var beanA720 = {};



        var TicketCompanion = '';
        var cant;
        var lblTicket = Ext.getCmp(prototype.id + '-lblTicket').text;
        lblTicket = lblTicket.substr(0, 3) + lblTicket.substr(5, 10);
        TicketCompanion = bean.strCompanion.trim();

        if (bean.strEsCjn === 'C') {
            cant = TicketCompanion.text.length / 13;
            for (var i = 0; i < cant; i++) {
                if (TicketCompanion.substr(0 + (i * 13), 13 + (i * 13)) === lblTicket) {
                    params.TDNR = TicketCompanion.text.substr(0 + ((i - 1) * 13), 13 + ((i - 1) * 13));
                    console.log("params.TDNR" + params.TDNR);
                }
            }
        }
        else {
            var ticket = lblTicket - 1;
            if (lblTicket !== params.TicketPadre) {
                params.TDNR = ticket;//+ '                 ' + bean.strEsCjn + params.TicketPadre;
            }
            else {
                params.TDNR = ticket + '';
            }
            var url = '';
            if (params.TDNR !== '' || params.TDNR.length >= 13) {
                //limpiarDatosFacsimilConj();
                if (params.FUENTE.trim() === 'A' || params.FUENTE.trim() === 'ARC') {
                    url = 'searchARC';
                } else if (params.FUENTE.trim() === 'ASR' || params.FUENTE.trim() === 'S') {
                    url = 'searchASR';
                } else if (params.FUENTE.trim() === 'BSP' || params.FUENTE.trim() === 'B') {
                    url = 'searchBSP';
                } else
                    url = 'searchARC';
            }

            var URL1 = CONTEXTPATH + '/Prorrateo/' + url;
            var URL2 = CONTEXTPATH + '/Prorrateo/' + 'searchA720';
            var paramsProrrateo = {
                beanFacProrrateo: "",
                beanRest: "",
                facsimilParams: params
            };

            Ext.Ajax.request({
                url: URL1,
                method: 'POST',
                timeout: 60000000,
                beforerequest: Ext.getCmp(prototype.id + '-prorrateo').mask('Loading...'),
                params: params,
                success: function(response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var beanFacProrrateo = res.beanFacProrrateo;
                    paramsProrrateo.beanFacProrrateo = beanFacProrrateo;

                    Ext.getCmp(prototype.id + '-prorrateo').unmask();
                    Ext.Ajax.request({
                        url: URL2,
                        method: 'POST',
                        timeout: 60000000,
                        beforerequest: Ext.getCmp(prototype.id + '-prorrateo').mask('Loading...'),
                        params: params,
                        success: function(response, options) {
                            var res = Ext.JSON.decode(response.responseText);
                            var beanRest = res.beanRest;
                            paramsProrrateo.beanRest = beanRest;
                            Ext.getCmp(prototype.id + '-prorrateo').unmask();
                            meCou.getDataInputsProrrateo(paramsProrrateo);
                            Ext.getCmp(prototype.id + '-prorrateo').unmask();
                        }
                    });


                }
            });

        }


    },
    onBtnNext: function() {
        var bean = this.paramsProrrateo.beanFacProrrateo;
        var listBeanA720 = this.paramsProrrateo.beanRest;
        var params = this.paramsProrrateo.facsimilParams;
        var beanA720 = {};



        var TicketCompanion = '';
        var cant;
        var lblTicket = Ext.getCmp(prototype.id + '-lblTicket').text;
        lblTicket = lblTicket.substr(0, 3) + lblTicket.substr(5, 10);
        TicketCompanion = bean.strCompanion.trim();

        if (bean.strEsCjn === 'C') {
            cant = TicketCompanion.text.length / 13;
            for (var i = 0; i < cant; i++) {
                if (TicketCompanion.substr(0 + (i * 13), 13 + (i * 13)) === lblTicket) {
                    params.TDNR = TicketCompanion.text.substr(0 + ((i - 1) * 13), 13 + ((i - 1) * 13));
                    console.log("params.TDNR" + params.TDNR);
                }
            }
        }
        else {
            var ticket = lblTicket + 1;
            if (lblTicket !== params.TicketPadre) {
                params.TDNR = ticket;//+ '                 ' + bean.strEsCjn + params.TicketPadre;
            }
            else {
                params.TDNR = ticket + '';
            }
            var url = '';
            if (params.TDNR !== '' || params.TDNR.length >= 13) {
                //limpiarDatosFacsimilConj();
                if (params.FUENTE.trim() === 'A' || params.FUENTE.trim() === 'ARC') {
                    url = 'searchARC';
                } else if (params.FUENTE.trim() === 'ASR' || params.FUENTE.trim() === 'S') {
                    url = 'searchASR';
                } else if (params.FUENTE.trim() === 'BSP' || params.FUENTE.trim() === 'B') {
                    url = 'searchBSP';
                } else
                    url = 'searchARC';
            }

            var URL1 = CONTEXTPATH + '/Prorrateo/' + url;
            var URL2 = CONTEXTPATH + '/Prorrateo/' + 'searchA720';
            var paramsProrrateo = {
                beanFacProrrateo: "",
                beanRest: "",
                facsimilParams: params
            };

            Ext.Ajax.request({
                url: URL1,
                method: 'POST',
                timeout: 60000000,
                beforerequest: Ext.getCmp(prototype.id + '-prorrateo').mask('Loading...'),
                params: params,
                success: function(response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var beanFacProrrateo = res.beanFacProrrateo;
                    paramsProrrateo.beanFacProrrateo = beanFacProrrateo;

                    Ext.getCmp(prototype.id + '-prorrateo').unmask();
                    Ext.Ajax.request({
                        url: URL2,
                        method: 'POST',
                        timeout: 60000000,
                        beforerequest: Ext.getCmp(prototype.id + '-prorrateo').mask('Loading...'),
                        params: params,
                        success: function(response, options) {
                            var res = Ext.JSON.decode(response.responseText);
                            var beanRest = res.beanRest;
                            paramsProrrateo.beanRest = beanRest;
                            Ext.getCmp(prototype.id + '-prorrateo').unmask();
                            meCou.getDataInputsProrrateo(paramsProrrateo);
                            Ext.getCmp(prototype.id + '-prorrateo').unmask();
                        }
                    });


                }
            });

        }

    }








});


