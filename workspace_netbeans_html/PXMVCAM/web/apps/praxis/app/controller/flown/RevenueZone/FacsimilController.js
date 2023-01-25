/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.flown.RevenueZone.FacsimilController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-FacsimilController',
    url: CONTEXTPATH + '/RevenueZone',
    id: prototype.id + '-facsimil',
    param: {},
    recF: {},
    /**
     * Constructor
     */
    init: function(view) {

    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        console.log("URL : " + this.url);
        this.param = this.view.params;
        recF = this.param.beanFaximil;
        this.getDataInputsFacsimil();
        this.view.setHeight(this.view.getHeight());
    }
    ,
    getDataInputsFacsimil: function() {
        // var recF = this.param.beanFaximil;

        switch (recF.FUENTE) {
            case "ARC":
                Ext.getCmp(prototype.id + '-f-lblFuente').setText("ARC");
                Ext.getCmp(prototype.id + '-f-lblFuente2').setText("ARC");
                break;
            case "ASR":
                Ext.getCmp(prototype.id + '-f-lblFuente').setText("ASR");
                Ext.getCmp(prototype.id + '-f-lblFuente2').setText("ASR");
                break;
            default:
                Ext.getCmp(prototype.id + '-f-lblFuente').setText("BSP");
                Ext.getCmp(prototype.id + '-f-lblFuente2').setText("BSP");
                break;
        }

        Ext.getCmp(prototype.id + '-f-lblPais').setText(recF.COUNTRY.trim());
        Ext.getCmp(prototype.id + '-f-lblNomAer').setText(recF.strNomAero.trim());
        Ext.getCmp(prototype.id + '-f-lblAgente').setText(recF.AGTN.trim());
        Ext.getCmp(prototype.id + '-f-lblNomAgente').setText(recF.strNombreAgente.trim());
        // Ext.getCmp(prototype.id + '-f-lblDirAgente').setText(recF.lblDirAgente.trim());
        Ext.getCmp(prototype.id + '-f-txtPeriod').setValue(recF.periodo.trim());
        Ext.getCmp(prototype.id + '-f-txtOrigDest').setValue(recF.TODC.substring(0, 3) + ' - ' + recF.TODC.substring(3));
        Ext.getCmp(prototype.id + '-f-txtTicket').setValue(recF.TDNR.substring(0, 3) + ' - ' + recF.TDNR.substring(3));
        Ext.getCmp(prototype.id + '-f-txtTicket').setValue(recF.TDNR.substring(0, 3) + ' - ' + recF.TDNR.substring(3));
        Ext.getCmp(prototype.id + '-f-txtEndors').setValue(recF.ENRS);
        if (recF.ENRS.trim() !== "")
            var tip = Ext.create('Ext.tip.ToolTip', {
                target: prototype.id + '-f-txtEndors',
                html: '' + recF.ENRS.trim()
            });
        Ext.getCmp(prototype.id + '-f-txtDateIssue').setValue(recF.DAIS);
        Ext.getCmp(prototype.id + '-f-txtIssExc').setValue(recF.strIssExc);
        Ext.getCmp(prototype.id + '-f-txtPassenger').setValue(recF.PXNM);
        Ext.getCmp(prototype.id + '-f-txtFareCal').setValue(recF.FRCA);
        Ext.getCmp(prototype.id + '-f-txtORIN').setValue(recF.ORIN);
        Ext.getCmp(prototype.id + '-f-txtTourC').setValue(recF.TOUR);
        var storeGridDetFac = Ext.create('Ext.data.Store', {
            data: recF.lstReg63,
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-f-gridDetFac').bindStore(storeGridDetFac);
        if (recF.lstReg63.length > 0) {
            Ext.getCmp(prototype.id + '-f-txtBookRef').setValue(recF.lstReg63[0].RBKD);
        }


        var Fare = recF.FARE.trim();
        var EqFare = recF.EQFR.trim();
        var Total = recF.TOTL.trim();
        var mon = '';
        var amt = '';
        //Fare ================================================
        if (Fare !== '') {
            for (var f = 0; f < Fare.length; f++) {
                if (isNaN(Fare.substring(f, f + 1))) {//Si no es un numero               
                    mon += Fare.substring(f, f + 1);
                } else {
                    amt += Fare.substring(f, f + 1);
                }
            }
            Ext.getCmp(prototype.id + '-f-txtFareCurr').setValue(mon);
            if (recF.FUENTE.trim() === 'ARC' || recF.FUENTE.trim() === 'A') {
                Ext.getCmp(prototype.id + '-f-txtFareCurr').setValue(recF.CUTP1);
            }
            Ext.getCmp(prototype.id + '-f-txtFare').setValue(Ext.util.Format.number(amt, '0,000.00'));
        }

        //Eq.Fare =============================================
        if (EqFare !== '') {

            var dig2 = EqFare.substring(0, 1);
            if (dig2 !== '1' && dig2 !== '2' && dig2 !== '3' && dig2 !== '4' && dig2 !== '5'
                    && dig2 !== '6' && dig2 !== '7' && dig2 !== '8' && dig2 !== '9') {
                Ext.getCmp(prototype.id + '-f-txtEquivFaCurr').setValue(EqFare.substring(0, 3));
                Ext.getCmp(prototype.id + '-f-txtEquivFa').setValue(Ext.util.Format.number(EqFare.substring(3), '0,000.00'));

            } else {
                Ext.getCmp(prototype.id + '-f-txtEquivFa').setValue(Ext.util.Format.number(EqFare, '0,000.00'));
            }

        }

        //Armando Los Taxes ============================
        var lstTaxes = recF.lstTaxes;
        var Tax1 = '';
        var esC = false;
        var cur = '';
        var monto = '';
        var tax = '';
        for (var i = 0; i < lstTaxes.length; i++) {
            Tax1 = lstTaxes[i].trim();
            monto = '';
            cur = '';
            tax = '';
            for (var x = 0; x < Tax1.length; x++) {
                if (Tax1.substring(x, x + 1) !== ' ') {
                    if (isNaN(Tax1.substring(x, x + 1))) {
                        if (x === 0) {
                            esC = true;
                        }
                        if (esC) {
                            cur += Tax1.substring(x, x + 1);
                        } else {
                            tax += Tax1.substring(x, x + 1);
                        }
                    } else {
                        monto += Tax1.substring(x, x + 1);
                        esC = false;
                    }
                }
            }
            if (i === 0) {
                var text = 'Tax 1: ' + cur + ' ' + Ext.util.Format.number(monto, '0,000.00') + ' ' + tax;
                Ext.getCmp(prototype.id + '-f-txtTaxes').setValue(text);
            } else {
                var text = Ext.getCmp(prototype.id + '-f-txtTaxes').getValue();
                text = text + '\nTax ' + (i + 1) + ': ' + cur + ' ' + Ext.util.Format.number(monto, '0,000.00') + ' ' + tax;
                Ext.getCmp(prototype.id + '-f-txtTaxes').setValue(text);
            }
        }

        //Total ==================================================
        if (Total !== '') {

            var dig6 = Total.substring(0, 1);
            if (dig6 !== '1' && dig6 !== '2' && dig6 !== '3' && dig6 !== '4' && dig6 !== '5'
                    && dig6 !== '6' && dig6 !== '7' && dig6 !== '8' && dig6 !== '9') {
                Ext.getCmp(prototype.id + '-f-txtTotalCurr').setValue(Total.substring(0, 3));
                Ext.getCmp(prototype.id + '-f-txtTotal').setValue(Ext.util.Format.number(Total.substring(3), '0,000.00'));
            } else {
                if (recF.FUENTE.trim() === 'ARC' || recF.FUENTE.trim() === 'A') {
                    Ext.getCmp(prototype.id + '-f-txtTotalCurr').setValue(recF.CUTP1);
                }
                Ext.getCmp(prototype.id + '-f-txtTotal').setValue(Ext.util.Format.number(Total, '0,000.00'));
            }
        }
        Ext.getCmp(prototype.id + '-f-txtFormPay').setValue(recF.FPIN);
        Ext.getCmp(prototype.id + '-f-txtCash').setValue(recF.strCash);
        Ext.getCmp(prototype.id + '-f-txtCredit').setValue(recF.strCredit);
        // Ext.getCmp(prototype.id + '-f-lblVD').setText(recF.strVD);
        // Ext.getCmp(prototype.id + '-f-lblOthers').setText(recF.strOthers);
        Ext.getCmp(prototype.id + '-f-txtCIA').setValue(recF.TDNR.substring(0, 3));
        Ext.getCmp(prototype.id + '-f-txtFS').setValue(recF.TDNR.substring(3));
        Ext.getCmp(prototype.id + '-f-txtCK').setValue(recF.CDGT);
        Ext.getCmp(prototype.id + '-f-txtConj').setValue(recF.strConjuncion);
        Ext.getCmp(prototype.id + '-f-txtCOBL').setValue(recF.COBL);

    },
    onBtnNucRoe: function() {
        global.Msg({
            msg: 'Under Construction'
        });
    },
    onBtnTUA: function() {
        global.Msg({
            msg: 'Under Construction'
        });
    },
    onBtnFareBasis: function() {
        global.Msg({
            msg: 'Under Construction'
        });
    }
//    ,
//    IxC: function() {
//        
//        Ext.getCmp(prototype.id + '-f-txtA020KEY').setValue(recF.COBL);
//        txtA020KEY.text = app.trim(beanA020.A020NROPRT);
//        //txtTicket.text = app.trim(beanA020.strTicket).substring(0, 3) + ' ' + app.trim(beanA020.strTicket).substring(3, 13) + ' ' + app.trim(beanA020.strTicket).substring(13);
//        txtA020GRUPO.text = app.trim(beanA020.A020GRUPO);
//        txtA728AIRFAC.text = app.trim(beanA728.A728AIRFAC);
//        txtA020SUFECH.text = app.trim(beanA020.A020SUFECH);
//        txtA728FECVTA.text = app.trim(beanA728.A728FECVTA);
//        txtA728FVLO1.text = app.trim(beanA728.A728FVLO1);
//        txtA020FRECHA.text = app.trim(beanA020.A020FRECHA);
//        txtA020SDATE.text = app.trim(beanA020.A020SDATE);
//        txtA728CTYEMI.text = app.trim(beanA728.A728CTYEMI);
//        txtA728CTYVTA.text = app.trim(beanA728.A728CTYVTA);
//        txtA728CODIT.text = app.trim(beanA728.A728CODIT);
//        txtA020RMSN.text = app.trim(beanA020.A020RMSN);
//        txtA020USER.text = app.trim(beanA020.A020USER);
//        txtA728ATBP.text = formatDblNumber.format(beanA728.A728ATBP);
//        txtA728MDAATB.text = app.trim(beanA728.A728MDAATB);
//        if (beanA728.A728IPLUS == 'S') {
//            setComboBoxItem(cmbA728IPLUS, 'Si');
//        } else if (beanA728.A728IPLUS == 'N') {
//            setComboBoxItem(cmbA728IPLUS, 'No');
//        } else {
//            setComboBoxItem(cmbA728IPLUS, '');
//        }
//        txtA728CPLUSS.text = formatDblNumber.format(beanA728.A728CPLUSS);
//        //================================================
//        txtA020TCALC.text = app.trim(beanA020.A020TCALC);
//        txtA020TARIFA.text = formatDblNumber.format(beanA020.A020TARIFA);
//        txtA020FAREUS.text = formatDblNumber.format(beanA020.A020FAREUS);
//        txtA020QSEG.text = formatDblNumber.format(beanA020.A020QSEG);
//        txtA728CODTAX.text = app.trim(beanA728.A728CODTAX);
//        txtA728TDESC.text = app.trim(beanA728.A728TDESC);
//        txtA728PORDES.text = formatDblNumber.format(beanA728.A728PORDES);
//        txtA728CSOVER.text = formatDblNumber.format(beanA728.A728CSOVER);
//        txtA728QSOVER.text = formatDblNumber.format(beanA728.A728QSOVER);
//        txtA020ACEPTA.text = formatDblNumber.format(beanA020.A020ACEPTA);
//        txtA020COMISP.text = formatDblNumber.format(beanA020.A020COMISP);
//        txtA050TUA.text = formatDblNumber.format(beanA020.A050TUA);
//        txtA728SECDS.text = app.trim(beanA728.A728SECOR) + ' - ' + app.trim(beanA728.A728SECDS);
//        txtA728RUTORG.text = app.trim(beanA728.A728RUTORG);
//        txtA728FBASE1.text = app.trim(beanA728.A728FBASE1);
//        txtA728LOHO.text = app.trim(beanA728.A728LOHO);
//        txtA020NETO.text = formatDblNumber.format(beanA020.A020NETO);
//
//        gridRoutingAC = lista;
//        gridData.dataProvider = gridRoutingAC;
//    }



});


