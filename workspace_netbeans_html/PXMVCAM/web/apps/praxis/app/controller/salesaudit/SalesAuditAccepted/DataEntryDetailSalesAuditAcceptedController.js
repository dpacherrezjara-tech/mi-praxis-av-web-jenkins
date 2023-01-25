
Ext.define('Ext.Praxis.controller.salesaudit.SalesAuditAccepted.DataEntryDetailSalesAuditAcceptedController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryDetailSalesAuditAcceptedController',
    urlWin01:  CONTEXTPATH + '/SalesAuditAccepted',
    bean: {},
    beanTKT: {},
    beanTKTORI: {},
    beanData: {},
    /**
     * Constructor
     */

    init: function (view) {
        var me = this;
        //this.urlWin01 = Ext.String.trim(this.view.params.url01);

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStoresGrids();
        this.cargaDatos();
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id1 + '-gridComponent3');
        var grid02 = Ext.getCmp(prototype.id1 + '-gridComponent');
        var grid03 = Ext.getCmp(prototype.id1 + '-gridComponent2');

        var grid04 = Ext.getCmp(prototype.id1 + '-gridComp');
        var grid05 = Ext.getCmp(prototype.id1 + '-gridComponentOldSALES');
        var grid06 = Ext.getCmp(prototype.id1 + '-gridComponentOldRFND');
        var grid07 = Ext.getCmp(prototype.id1 + '-gridComponentOLD');
        var grid08 = Ext.getCmp(prototype.id1 + '-gridFCRfndUsed');
        var grid09 = Ext.getCmp(prototype.id1 + '-gridComponentOLD2');




        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id1 + '-store-grid01'
        });

        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.id1 + '-store-grid02'
        });

        var store03 = Ext.create('Ext.data.Store', {
            storeId: prototype.id1 + '-store-grid03'
        });

        var store04 = Ext.create('Ext.data.Store', {
            storeId: prototype.id1 + '-store-grid04'
        });
        var store05 = Ext.create('Ext.data.Store', {
            storeId: prototype.id1 + '-store-grid05'
        });
        var store06 = Ext.create('Ext.data.Store', {
            storeId: prototype.id1 + '-store-grid06'
        });
        var store07 = Ext.create('Ext.data.Store', {
            storeId: prototype.id1 + '-store-grid07'
        });
        var store08 = Ext.create('Ext.data.Store', {
            storeId: prototype.id1 + '-store-grid08'
        });
        var store09 = Ext.create('Ext.data.Store', {
            storeId: prototype.id1 + '-store-grid09'
        });

        grid01.setStore(store01);
        grid02.setStore(store02);
        grid03.setStore(store03);
        grid04.setStore(store04);
        grid05.setStore(store05);
        grid06.setStore(store06);
        grid07.setStore(store07);
        grid08.setStore(store08);
        grid09.setStore(store09);
    },
    cargaDatos: function () {
        Ext.getCmp(prototype.id1 + '-txtIssuedBy').setValue('AEROMEXICO');
        var me = this;
        rec = me.view.params.rec;
        me.beanData = rec;
        Ext.getCmp(prototype.id1 + '-txtTicket').setValue(rec.get('A1672CIA') + "" + rec.get('A1672FORMA') + "" + rec.get('A1672SERIE'));//setValue(Ext.String.trim(rec.get('strTicket')));
        Ext.getCmp(prototype.id1 + '-txtSeq').setValue(rec.get('A1672SEQ'));
        Ext.getCmp(prototype.id1 + '-txtCoupons').setValue(rec.get('A1672CUPON'));
        Ext.getCmp(prototype.id1 + '-txtTrnx').setValue(rec.get('A1672TRNCU'));
        Ext.getCmp(prototype.id1 + '-txtGroup').setValue(rec.get('A1672GRUPO'));
        Ext.getCmp(prototype.id1 + '-txtAgency').setValue(rec.get('A1672AGENT'));
        Ext.getCmp(prototype.id1 + '-txtSaleDate').setValue(rec.get('A1672FVENT'));
        Ext.getCmp(prototype.id1 + '-txtIT').setValue(rec.get('A1672ITIN'));
        Ext.getCmp(prototype.id1 + '-txtDocType').setValue(rec.get('A1672TDOC'));
        Ext.getCmp(prototype.id1 + '-txtNUMBERTKT').setText(rec.get('A1672CIA') + "-" + rec.get('A1672FORMA') + "" + rec.get('A1672SERIE'));

        me.bean.VP_CIA = rec.get('A1672CIA');
        me.bean.VP_FRMSRIE = rec.get('A1672FORMA') + "" + rec.get('A1672SERIE');
        me.bean.VP_SEQ = rec.get('A1672SEQ');
        me.bean.VP_IDFILE=rec.get('A1672IDFIL');
        me.bean.VP_TRNCU = rec.get('A1672TRNCU');
        me.bean.VP_CUPON = rec.get('A1672CUPON');
        me.bean.A1672AGENT = rec.get('A1672AGENT');
        me.bean.A1672FUENT = rec.get('A1672FUENT');

        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id1 + '-Contenedor'), {
            msg: 'Please Wait....'
        });
        mask.show();
        Ext.Ajax.request({
            url: me.urlWin01 + '/loadTicketComponent/',
            params: {beanString: JSON.stringify(me.bean)},
            success: function (response, options) { //records, operation, success
                mask.hide();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {

                    Ext.getCmp(prototype.id1 + '-txtExchType').hide();
                    Ext.getCmp(prototype.id1 + '-txtRefundType').hide();
                    Ext.getCmp(prototype.id1 + '-gridComponent2').getStore().removeAll();
                    Ext.getCmp(prototype.id1 + '-gridComponent2').getStore().loadData(res.lstItinerary);
                    Ext.getCmp(prototype.id1 + '-gridComp').getStore().removeAll();
                    Ext.getCmp(prototype.id1 + '-gridComp').getStore().loadData(res.lstComponent);
                    Ext.getCmp(prototype.id1 + '-gridComponentOldSALES').getStore().removeAll();
                    Ext.getCmp(prototype.id1 + '-gridComponentOldSALES').getStore().loadData(res.lstComponent);
                    Ext.getCmp(prototype.id1 + '-gridComponentOldRFND').getStore().removeAll();
                    Ext.getCmp(prototype.id1 + '-gridComponentOldRFND').getStore().loadData(res.lstComponent);

                    Ext.getCmp(prototype.id1 + '-gridComponentOLD').getStore().removeAll();
                    Ext.getCmp(prototype.id1 + '-gridComponentOLD').getStore().loadData(res.lstComponentOld);

                    Ext.getCmp(prototype.id1 + '-gridFCRfndUsed').getStore().removeAll();
                    Ext.getCmp(prototype.id1 + '-gridFCRfndUsed').getStore().loadData(res.lstComponentUsed);

                    Ext.getCmp(prototype.id1 + '-gridComponentOLD2').getStore().removeAll();
                    Ext.getCmp(prototype.id1 + '-gridComponentOLD2').getStore().loadData(res.lstComponentOld);

                    var GridgridComponent = new Array();

                    GridgridComponent.push({"VP_OPTION": 'Fare', "A1672FADIF": res.beanADM.A1672FADIF, "A1672FMORI": res.beanADM.A1672FMORI, "A1672FAORI": res.beanADM.A1672FAORI},
                            {"VP_OPTION": 'Q', "A1672FADIF": res.beanADM.A1672QDIF, "A1672FMORI": res.beanADM.A1672QMORI, "A1672FAORI": res.beanADM.A1672QORIG},
                            {"VP_OPTION": 'Tax', "A1672FADIF": res.beanADM.A1672TXDIF, "A1672FMORI": res.beanADM.A1672TXMIA, "A1672FAORI": res.beanADM.A1672TXAGT},
                            {"VP_OPTION": 'Commission', "A1672FADIF": res.beanADM.A1672CODIF, "A1672FMORI": res.beanADM.A1672COMIA, "A1672FAORI": res.beanADM.A1672COAGT},
                            {"VP_OPTION": 'Over Comm', "A1672FADIF": res.beanADM.A1672SCDIF, "A1672FMORI": res.beanADM.A1672SCMIA, "A1672FAORI": res.beanADM.A1672SCAGT},
                            {"VP_OPTION": 'Tax On Comm', "A1672FADIF": res.beanADM.A1672OVDIF, "A1672FMORI": res.beanADM.A1672OVMIA, "A1672FAORI": res.beanADM.A1672OVAGT},
                            {"VP_OPTION": 'Net' + " (" + res.beanADM.A1672MONTT + ") ", "A1672FADIF": res.beanADM.A1672TTDIF, "A1672FMORI": res.beanADM.A1672TTMIA, "A1672FAORI": res.beanADM.A1672TTAGT}
                            );
                    Ext.getCmp(prototype.id1 + '-gridComponent').getStore().removeAll();
                    Ext.getCmp(prototype.id1 + '-gridComponent').getStore().loadData(GridgridComponent);
                    //para el delivery
                    var strRestrict = '';
                    for (var i = 0; i < res.lstFaximil.lstReg46Restrict.length; i++) {
                        strRestrict += Ext.String.trim(String(res.lstFaximil.lstReg46Restrict[i]));
                    }
                    Ext.getCmp(prototype.id1 + '-txtEndors').setValue(Ext.String.trim(strRestrict));
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtEndors',
                        html: '' + Ext.String.trim(strRestrict)
                    });
                    var strOrigIssue = '';
                    for (var e = 0; e < res.lstFaximil.lstReg46OrigIssue.length; e++) {
                        strOrigIssue += Ext.String.trim(String(res.lstFaximil.lstReg46OrigIssue[e]));
                    }
                    Ext.getCmp(prototype.id1 + '-txtORIN').setValue(Ext.String.trim(strOrigIssue));
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtORIN',
                        html: '' + Ext.String.trim(strOrigIssue)
                    });

                    Ext.getCmp(prototype.id1 + '-txtOriginDesti').setValue(Ext.String.trim(res.lstFaximil.TODC)); //cambiar es la ruta
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtOriginDesti',
                        html: '' + Ext.String.trim(res.lstFaximil.TODC)
                    });

                    Ext.getCmp(prototype.id1 + '-txtDatePlace').setValue(Ext.String.trim(res.lstFaximil.DAIS));
                    console.log(res.lstFaximil.strIssExc);
                    
                    if (res.lstFaximil.strIssExc !== '') {
                        Ext.getCmp(prototype.id1 + '-txtIssExc').setText(Ext.String.trim(res.lstFaximil.strIssExc.substring(2, 16)));
                    } else {
                        Ext.getCmp(prototype.id1 + '-txtIssExc').setText("");
                    }
                    Ext.getCmp(prototype.id1 + '-txtPassenger').setValue(Ext.String.trim(res.lstFaximil.PXNM));
                    //console.log(res.lstFaximil);

                    var strFC = '';
                    for (var a = 0; a < res.lstFaximil.lstFC.length; a++) {
                        strFC += Ext.String.trim(String(res.lstFaximil.lstFC[a]));
                    }
                    Ext.getCmp(prototype.id1 + '-txtFareCal').setValue(Ext.String.trim(strFC));
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtFareCal',
                        html: '' + Ext.String.trim(res.lstFaximil.strFC)
                    });
                    Ext.getCmp(prototype.id1 + '-txtTourC').setValue(Ext.String.trim(res.lstFaximil.TOUR));
                    Ext.getCmp(prototype.id1 + '-txtPNR').setValue(Ext.String.trim(res.lstFaximil.PNRR));
                    Ext.getCmp(prototype.id1 + '-txtAgentF').setValue(Ext.String.trim(res.lstFaximil.AGTN));

                    Ext.getCmp(prototype.id1 + '-gridComponent3').getStore().removeAll();
                    Ext.getCmp(prototype.id1 + '-gridComponent3').getStore().loadData(res.lstFaximil.lstReg63);

                    Ext.getCmp(prototype.id1 + '-txtFareC').setValue(Ext.String.trim(res.lstFaximil.CUTP1) + "" + Ext.util.Format.number(res.lstFaximil.FARE, '0,000.00'));

                    if (res.lstFaximil.EQFR.substring(3) > 0) {
                        if (Ext.String.trim(res.lstFaximil.EQFR.substring(0, 3)).length > 0) {
                            Ext.getCmp(prototype.id1 + '-txtEquivFa').setValue(Ext.String.trim(res.lstFaximil.EQFR.substring(0, 3)) + '' + Ext.util.Format.number(res.lstFaximil.EQFR.substring(3), '0,000.00'));
                        } else {
                            Ext.getCmp(prototype.id1 + '-txtEquivFa').setValue(Ext.String.trim(res.lstFaximil.CUTP1) + '' + Ext.util.Format.number(res.lstFaximil.EQFR.substring(3), '0,000.00'));
                        }
                    } else {
                        Ext.getCmp(prototype.id1 + '-txtEquivFa').setValue('');
                    }
                    if (Ext.String.trim(Ext.getCmp(prototype.id1 + '-txtEquivFa').getValue().substring(0, 3)).length > 0 > 0) {
                        Ext.getCmp(prototype.id1 + '-txtTotal').setValue(Ext.String.trim(Ext.getCmp(prototype.id1 + '-txtEquivFa').getValue().substring(0, 3)) + '' + Ext.util.Format.number(res.lstFaximil.TOTL, '0,000.00'));
                    } else {
                        Ext.getCmp(prototype.id1 + '-txtTotal').setValue(Ext.String.trim(res.lstFaximil.CUTP1) + '' + Ext.util.Format.number(res.lstFaximil.TOTL, '0,000.00'));
                    }
                    var strTax = '';
                    var inTotalTax = 0;
                    var TotalTax = 0;
                    for (var iTax = 0; iTax < res.lstFaximil.lstTaxes.length; iTax++) {
                        strTax += Ext.String.trim(String(res.lstFaximil.lstTaxes[iTax])) + '\n';
                         var arrayDeCadenas = String(res.lstFaximil.lstTaxes[iTax]).split(' ');
                         inTotalTax=parseFloat(arrayDeCadenas[1]);
                         TotalTax = TotalTax + inTotalTax;
                    }
                    Ext.getCmp(prototype.id1 + '-txtTaxes').setValue(strTax);
                    if(TotalTax !==0){
                        if(Ext.String.trim(res.beanADM.A1672MONET) !==''){
                            Ext.getCmp(prototype.id1 + '-txtTotal').setValue(Ext.String.trim(res.beanADM.A1672MONET) +" "+ Ext.util.Format.number(TotalTax, '0,000.00'));
                        }else{
                            Ext.getCmp(prototype.id1 + '-txtTotal').setValue(Ext.String.trim(res.beanADM.A1672CURRENCY) +" "+ Ext.util.Format.number(TotalTax, '0,000.00'));
                        }
                    }

                    var strFOP = '';
                    for (var iFop = 0; iFop < res.lstFaximil.lstFOP.length; iFop++) {
                        strFOP += Ext.String.trim(String(res.lstFaximil.lstFOP[iFop])) + '\n';
                    }
                    Ext.getCmp(prototype.id1 + '-txtFormPay').setValue(strFOP);
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtFormPay',
                        html: '' + Ext.String.trim(strFOP)
                    });

                    Ext.getCmp(prototype.id1 + '-txtEsConjunto').setValue(Ext.String.trim(res.lstFaximil.strEsCjn));
                    if (Ext.String.trim(res.lstFaximil.strEsCjn) === 'C') {
                        Ext.getCmp(prototype.id1 + '-txtEsConjunto').setValue(Ext.String.trim(res.lstFaximil.strEsCjn) + ' ' + Ext.String.trim(res.lstFaximil.strConjuncion));
                    }




                    //fin el delivery

                    Ext.getCmp(prototype.id1 + '-gridComponentOldRFND').hide();
                    Ext.getCmp(prototype.id1 + '-txtAssignedto').setValue(Ext.String.trim(res.beanADM.A1672UASIG));
                    Ext.getCmp(prototype.id1 + '-txtAssignedDate').setValue(Ext.String.trim(res.beanADM.A1672FASIG));
                    Ext.getCmp(prototype.id1 + '-txtAuditedby').setValue(Ext.String.trim(res.beanADM.A1672REVIS));
                    Ext.getCmp(prototype.id1 + '-txtAuditedDate').setValue(Ext.String.trim(res.beanADM.A1672FREVI));
                    //res.beanADM.A1672RUTAF res.beanADM.A1672NAMEF
                    Ext.getCmp(prototype.id1 + '-txtGroup').setValue(Ext.String.trim(res.beanADM.A1672GRUPO));
                    Ext.getCmp(prototype.id1 + '-txtError').setValue(Ext.String.trim(res.beanADM.A1672ERROR));
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtError',
                        html: '' + Ext.String.trim(res.beanADM.A1672ERROR)
                    });
                    
                    Ext.getCmp(prototype.id1 + '-txtTktOrig').setValue(Ext.String.trim(res.beanADM.A1672CIAOR +""+ res.beanADM.A1672FOROR +""+res.beanADM.A1672SEROR));
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtTktOrig',
                        html: '' + Ext.String.trim(res.beanADM.A1672CIAOR +""+ res.beanADM.A1672FOROR +""+res.beanADM.A1672SEROR)
                    });
                    Ext.getCmp(prototype.id1 + '-txtSaleDate').setValue(Ext.String.trim(res.beanADM.A1672FVENT));
                    Ext.getCmp(prototype.id1 + '-txtSaleCity').setValue(Ext.String.trim(res.beanADM.A1672CTYVT));
                    Ext.getCmp(prototype.id1 + '-txtPaiVta').setValue(Ext.String.trim(res.beanADM.A1672PAIVT));
                    Ext.getCmp(prototype.id1 + '-txtIssueCity').setValue(Ext.String.trim(res.beanADM.A1672CTYEM));
                    Ext.getCmp(prototype.id1 + '-txtPaiUso').setValue(Ext.String.trim(res.beanADM.A1672PAIEM));
                    Ext.getCmp(prototype.id1 + '-txtPaxCity').setValue(Ext.String.trim(res.beanADM.A1672TPAX));
                    Ext.getCmp(prototype.id1 + '-txtFARE').setValue(Ext.util.Format.number(res.beanADM.A1672TARTK, '0,000.00'));
                    Ext.getCmp(prototype.id1 + '-txtCur').setValue(Ext.String.trim(res.beanADM.A1672CURRENCY));
                    Ext.getCmp(prototype.id1 + '-txtNUC').setValue(Ext.String.trim(res.beanADM.A1672NUC));
                    Ext.getCmp(prototype.id1 + '-txtROE').setValue(Ext.String.trim(res.beanADM.A1672ROE));
                    Ext.getCmp(prototype.id1 + '-txtPlus').setValue(Ext.String.trim(res.beanADM.A1672PLUS));
                    Ext.getCmp(prototype.id1 + '-txtSOver').setValue(Ext.String.trim(res.beanADM.A1672SOVER));
                    // prototype.id1 + '-txtSOver2',
                    Ext.getCmp(prototype.id1 + '-txtRate').setValue(Ext.String.trim(res.beanADM.A1672TCAMB));
                    Ext.getCmp(prototype.id1 + '-txtIT').setValue(Ext.String.trim(res.beanADM.A1672CODIT));
                    Ext.getCmp(prototype.id1 + '-txtDocType').setValue(Ext.String.trim(res.beanADM.A1672TDOC));
                    Ext.getCmp(prototype.id1 + '-txtEquiv').setValue(Ext.util.Format.number(res.beanADM.A1672EQVTK, '0,000.00'));
                    Ext.getCmp(prototype.id1 + '-txtEquivCur').setValue(Ext.String.trim(res.beanADM.A1672MONET));
                    Ext.getCmp(prototype.id1 + '-txtADC').setValue(Ext.util.Format.number(res.beanADM.A1672ADC, '0,000.00'));
                    Ext.getCmp(prototype.id1 + '-txtSRC').setValue(Ext.String.trim(res.beanADM.A1672FUENT));
                    Ext.getCmp(prototype.id1 + '-txtSource').setValue(Ext.String.trim(res.beanADM.A1672FUENT));
                    Ext.getCmp(prototype.id1 + '-txtChannel').setValue(Ext.String.trim(res.beanADM.A1672CANAL));
                    Ext.getCmp(prototype.id1 + '-lblOrigTrnx').setValue(Ext.String.trim(res.beanADM.A1672TRNCO));
                    Ext.getCmp(prototype.id1 + '-txtOrigDate').setValue(Ext.String.trim(res.beanADM.A1672FECSL));
                    Ext.getCmp(prototype.id1 + '-txtOrigAgency').setValue(Ext.String.trim(res.beanADM.A1672IATAV));
                    Ext.getCmp(prototype.id1 + '-txtOrigSource').setValue(Ext.String.trim(res.beanADM.A1672FUENV));
                    Ext.getCmp(prototype.id1 + '-txtRefundType').setValue(Ext.String.trim(res.beanADM.A1672TRF));
                    Ext.getCmp(prototype.id1 + '-txtExchType').setValue(Ext.String.trim(res.beanADM.A1672TRF));
                    //res.beanADM.A1672FPROC
                    Ext.getCmp(prototype.id1 + '-txtEMDReal').setValue(Ext.String.trim(res.beanADM.A1672TKCNX));
                    Ext.getCmp(prototype.id1 + '-txtWaiver2').setValue(Ext.String.trim(res.beanADM.A1672CODWA));
                    Ext.getCmp(prototype.id1 + '-txtReverdate').setValue(Ext.String.trim(res.beanADM.A1672FRESV));
                    Ext.getCmp(prototype.id1 + '-txtBSR').setValue(Ext.String.trim(res.beanADM.A1672BSR));
                    Ext.getCmp(prototype.id1 + '-txtIT').setValue(Ext.String.trim(res.beanADM.A1672CODIT));
                    Ext.getCmp(prototype.id1 + '-txtFCMI').setValue(Ext.String.trim(res.beanADM.A1672FCMI));
                    Ext.getCmp(prototype.id1 + '-txtComment').setValue(Ext.String.trim(res.beanADM.A1672COMEN));
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtComment',
                        html: '' + Ext.String.trim(res.beanADM.A1672COMEN)
                    });
                    Ext.getCmp(prototype.id1 + '-txtCommentMIA').setValue(Ext.String.trim(res.beanADM.A1672CMBPO));
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtCommentMIA',
                        html: '' + Ext.String.trim(res.beanADM.A1672CMBPO)
                    });
                    Ext.getCmp(prototype.id1 + '-txtFareType').setValue(Ext.String.trim(res.beanADM.A1672TIPOF));

                    if (res.beanADM.A1672TRNCU === 'RFND') {
                        Ext.getCmp(prototype.id1 + '-txtCharge1').hide();
                        Ext.getCmp(prototype.id1 + '-txtCharge2').hide();
                        Ext.getCmp(prototype.id1 + '-txtPenalty1').hide();
                        Ext.getCmp(prototype.id1 + '-txtPenalty2').hide();
                        Ext.getCmp(prototype.id1 + '-txtCURAIR').setValue(Ext.String.trim(res.beanADM.A1672MONTT));
                        Ext.getCmp(prototype.id1 + '-txtFareAIR').setValue(Ext.util.Format.number(res.beanADM.A1672TARTK, '0,000.00'));
                        Ext.getCmp(prototype.id1 + '-txtCurAIR').setValue(Ext.String.trim(res.beanADM.A1672MONTT));
                        Ext.getCmp(prototype.id1 + '-txtEquivAIR').setValue(Ext.util.Format.number(res.beanADM.A1672EQVTK, '0,000.00'));
                        Ext.getCmp(prototype.id1 + '-txtEquivCurAIR').setValue(Ext.String.trim(res.beanADM.A1672MONET));
                        Ext.getCmp(prototype.id1 + '-txtCharge1').setValue(Ext.util.Format.number(res.beanADM.A1672CHAMI, '0,000.00'));
                        Ext.getCmp(prototype.id1 + '-txtCharge2').setValue(Ext.String.trim(res.beanADM.A1672MDAAD));
                        Ext.getCmp(prototype.id1 + '-txtPenalty1').setValue(Ext.util.Format.number(res.beanADM.A1672PNTMI, '0,000.00'));
                        Ext.getCmp(prototype.id1 + '-txtPenalty2').setValue(Ext.String.trim(res.beanADM.A1672MONTT));
                        //Ext.getCmp(prototype.id1 + '-txtTktOrig').setValue(Ext.String.trim(rec.get('A1672CIA') + "" + rec.get('A1672FORMA') + "" + rec.get('A1672SERIE')));

                       // Ext.getCmp(prototype.id1 + '-txtAgentOrig').setValue(Ext.String.trim(rec.get('A1672AGENT')));
                        Ext.getCmp(prototype.id1 + '-txtAgentOrig').setValue(Ext.String.trim(rec.get('A1672AGENT')));
                        var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtAgentOrig',
                        html: '' + Ext.String.trim(rec.get('A1672AGENT'))
                    });
                        Ext.getCmp(prototype.id1 + '-txtFecUsoOrig').setValue(Ext.String.trim(res.beanADM.A1672FECSL));
                        Ext.getCmp(prototype.id1 + '-txtQty').setValue(Ext.String.trim(res.beanADM.A1672QTYTK));
                        Ext.getCmp(prototype.id1 + '-txtPlace').setValue(Ext.String.trim(res.beanADM.A1672CEMIO));

                        Ext.getCmp(prototype.id1 + '-txtRefundType').show();
                        Ext.getCmp(prototype.id1 + '-gridComponentOldRFND').show();
                        Ext.getCmp(prototype.id1 + '-gridComponentOldSALES').hide();
                        Ext.getCmp(prototype.id1 + '-txtExchType').hide();
                        Ext.getCmp(prototype.id1 + '-txtYQPAY1').hide();
                        Ext.getCmp(prototype.id1 + '-txtYQPAY2').hide();
                        Ext.getCmp(prototype.id1 + '-txtYRPAY1').hide();
                        Ext.getCmp(prototype.id1 + '-txtYRPAY2').hide();
                        //Ext.getCmp(prototype.id1 + '-txtReverdate').hide();
                        Ext.getCmp(prototype.id1 + '-gridComponentOldSALES').hide();
                        if (res.beanADM.A1672TRNCO === 'EXCH') {
                            //Ext.getCmp(prototype.id1 + '-priciComponentOLD').show();
                            Ext.getCmp(prototype.id1 + '-gridComponentOLD').show();
                        } else {
                            //Ext.getCmp(prototype.id1 + '-priciComponentOLD').hide();
                            Ext.getCmp(prototype.id1 + '-gridComponentOLD').hide();
                        }
                    } else {
                        //Ext.getCmp(prototype.id1 + '-txtTktOrig').setValue(Ext.String.trim(rec.get('A1672CIA') + "" + rec.get('A1672FORMA') + "" + rec.get('A1672SERIE')));
                        Ext.getCmp(prototype.id1 + '-txtAgentOrig').setValue(Ext.String.trim(rec.get('A1672AGENT')));
                        Ext.getCmp(prototype.id1 + '-txtFecUsoOrig').setValue(Ext.String.trim(res.beanADM.A1672FECSL));
                        Ext.getCmp(prototype.id1 + '-txtQty').setValue(Ext.String.trim(res.beanADM.A1672QTYTK));
                        Ext.getCmp(prototype.id1 + '-txtPlace').setValue(Ext.String.trim(res.beanADM.A1672CEMIO));

                        if (Ext.String.trim(res.beanADM.A1672TRNCU) === 'EXCH') {

                            Ext.getCmp(prototype.id1 + '-txtCURAIR').setValue(Ext.String.trim(res.beanADM.A1672MOTAI));
                            Ext.getCmp(prototype.id1 + '-txtFareAIR').setValue(Ext.util.Format.number(res.beanADM.A1672TARAI, '0,000.00'));
                            Ext.getCmp(prototype.id1 + '-txtCurAIR').setValue(Ext.String.trim(res.beanADM.A1672MOTAI));
                            Ext.getCmp(prototype.id1 + '-txtEquivAIR').setValue(Ext.util.Format.number(res.beanADM.A1672EQVAI, '0,000.00'));
                            Ext.getCmp(prototype.id1 + '-txtEquivCurAIR').setValue(Ext.String.trim(res.beanADM.A1672MOEAI));
                            Ext.getCmp(prototype.id1 + '-txtYQPAY1').setValue(Ext.util.Format.number(res.beanADM.A1672YQPGM, '0,000.00'));
                            Ext.getCmp(prototype.id1 + '-txtYQPAY2').setValue(Ext.String.trim(res.beanADM.A1672MOTAI));
                            Ext.getCmp(prototype.id1 + '-txtYRPAY1').setValue(Ext.util.Format.number(res.beanADM.A1672YRPGM, '0,000.00'));
                            Ext.getCmp(prototype.id1 + '-txtYRPAY2').setValue(Ext.String.trim(res.beanADM.A1672MOTAI));
                            Ext.getCmp(prototype.id1 + '-txtCharge1').setValue(Ext.util.Format.number(res.beanADM.A1672CHAMI, '0,000.00'));
                            Ext.getCmp(prototype.id1 + '-txtCharge2').setValue(Ext.String.trim(res.beanADM.A1672MDAAD));
                            Ext.getCmp(prototype.id1 + '-txtPenalty1').setValue(Ext.util.Format.number(res.beanADM.A1672PNTMI, '0,000.00'));
                            Ext.getCmp(prototype.id1 + '-txtPenalty2').setValue(Ext.String.trim(res.beanADM.A1672MONTT));
                            Ext.getCmp(prototype.id1 + '-txtFarePENAL').setValue(Ext.util.Format.number(res.beanADM.A1672PNTMI, '0,000.00'));
                            Ext.getCmp(prototype.id1 + '-txtCURAPENAL').setValue(Ext.String.trim(res.beanADM.A1672MOTAI));

                            //Ext.getCmp(prototype.id1 + '-priciComponentOLD').show();
                            Ext.getCmp(prototype.id1 + '-txtReverdate').show();
                            Ext.getCmp(prototype.id1 + '-Principal_FARECOMPONENTUSED').hide();
                            Ext.getCmp(prototype.id1 + '-txtExchType').show();
                            Ext.getCmp(prototype.id1 + '-txtRefundType').hide();

                        } else {
                            Ext.getCmp(prototype.id1 + '-txtYQPAY1').show();
                            Ext.getCmp(prototype.id1 + '-txtYQPAY2').show();
                            Ext.getCmp(prototype.id1 + '-txtYRPAY1').show();
                            Ext.getCmp(prototype.id1 + '-txtYRPAY2').show();

                            Ext.getCmp(prototype.id1 + '-txtCURAIR').setValue(Ext.String.trim(res.beanADM.A1672MOTAI));
                            Ext.getCmp(prototype.id1 + '-txtFareAIR').setValue(Ext.util.Format.number(res.beanADM.A1672TARAI, '0,000.00'));
                            Ext.getCmp(prototype.id1 + '-txtEquivAIR').setValue(Ext.util.Format.number(res.beanADM.A1672EQVAI, '0,000.00'));
                            Ext.getCmp(prototype.id1 + '-txtEquivCurAIR').setValue(Ext.String.trim(res.beanADM.A1672MOEAI));
                            Ext.getCmp(prototype.id1 + '-txtYQPAY1').setValue(Ext.util.Format.number(res.beanADM.A1672YQPGM, '0,000.00'));
                            Ext.getCmp(prototype.id1 + '-txtYQPAY2').setValue(Ext.String.trim(res.beanADM.A1672MOTAI));
                            Ext.getCmp(prototype.id1 + '-txtYRPAY1').setValue(Ext.util.Format.number(res.beanADM.A1672YRPGM, '0,000.00'));
                            Ext.getCmp(prototype.id1 + '-txtYRPAY2').setValue(Ext.String.trim(res.beanADM.A1672MOTAI));

                            Ext.getCmp(prototype.id1 + '-txtCharge1').hide();
                            Ext.getCmp(prototype.id1 + '-txtCharge2').hide();
                            Ext.getCmp(prototype.id1 + '-priciComponentOLD').hide();
                            Ext.getCmp(prototype.id1 + '-txtPenalty1').hide();
                            Ext.getCmp(prototype.id1 + '-txtPenalty2').hide();

                            Ext.getCmp(prototype.id1 + '-gridComponentOldSALES').show();
                            Ext.getCmp(prototype.id1 + '-gridComponentOldRFND').hide();
                        }
                    }
                    //Ext.getCmp().setValue();


                    //console.log();
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }
                /*if(res.data.length > 0){
                 Ext.getCmp(prototype.id4 + '-gridSeguimieto').getStore().loadData(res.data);
                 }else{
                 global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                 }});
                 }*/
            }
        });

    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onDetailBoxClick: function (grid, rowIndex, colIndex) {
        var dato = grid.getStore().getAt(rowIndex);
        var me = this;
        rec = me.view.params.rec;
        rec = rec === null || rec === undefined ? {} : rec;
        if (dato.data.VP_OPTION === 'Tax') {
            var win = new Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsTaxes({
                params: {
                    rec: rec,
                    url01: me.urlWin01
                }
            });
            win.show();
        }
        if (dato.data.VP_OPTION === 'Commission') {
            var win = new Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsCommis({
                params: {
                    type: 'CS',
                    rec: rec,
                    url01: me.urlWin01
                }
            });
            win.show();
        }
        if (dato.data.VP_OPTION === 'Over Comm') {
            var win = new Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsCommis({
                params: {
                    type: 'CO',
                    rec: rec,
                    url01: me.urlWin01
                }
            });
            win.show();
        }
        if (dato.data.VP_OPTION === 'Tax On Comm') {
            var win = new Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsTaxOnComi({
                params: {
                    rec: rec,
                    url01: me.urlWin01
                }
            });
            win.show();
        }

    },
    onDeliveryBtnClick: function () {
        var me = this;
        rec = me.view.params.rec;
        var win = new Ext.Praxis.view.screens.CtrlDeliveryAudiForm({
            params: {
                TDNR: rec.get('A1672CIA') + "" + rec.get('A1672FORMA') + "" + rec.get('A1672SERIE'),
                FTE: rec.get('A1672FUENT'),
                IDFIL: rec.get('A1672IDFIL'),
                TRNCU: Ext.getCmp(prototype.id1 + '-txtTrnx').getValue()
            }
        });
        win.show();
    },
    onTicketReasonsBtnClick: function () {
        var me = this;
        rec = me.view.params.rec;
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsReason({
            params: {
                rec: rec,
                url01: me.urlWin01
            }
        });
        win.show();
    },
    ontFOPBtnClick: function () {
        var me = this;
        rec = me.view.params.rec;
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsFOP({
            params: {
                rec: rec,
                url01: me.urlWin01
            }
        });
        win.show();
    },
    onHistorialBtnClick: function () {
        var me = this;
        rec = me.view.params.rec;
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsHistorialTKT({
            params: {
                rec: rec,
                url01: me.urlWin01
            }
        });
        win.show();
    },
    onPDIClick: function () {
        var me = this;
        rec = me.view.params.rec;
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsPDI({
            params: {
                rec: rec,
                url01: me.urlWin01
            }
        });
        win.show();
    },
    onCloseClick: function (btn) {
        this.view.close();
    },
    onIssExcClick: function (field) {
        var me = this;
        var campo = '';
        if (field === '1') {
            campo = Ext.getCmp(prototype.id1 + '-txtIssExc').getEl().dom.innerHTML;
        }
        if (field === '2') {
            campo = Ext.getCmp(prototype.id1 + '-txtIssExc2').getEl().dom.innerHTML;
        }
        if (field === '3') {
            campo = Ext.getCmp(prototype.id1 + '-txtIssExc3').getEl().dom.innerHTML;
        }

        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id1 + '-Contenedor'), {
            msg: 'Please Wait....'
        });
        mask.show();
        me.beanTKT.VP_FRMSRIE = campo;
        me.beanTKT.A1672PAIVT = Ext.getCmp(prototype.id1 + '-txtPaiVta').getValue();
        me.beanTKT.A1672AGENT = Ext.getCmp(prototype.id1 + '-txtAgentF').getValue();
        me.beanTKT.A1672FUENT = Ext.getCmp(prototype.id1 + '-txtSRC').getValue();
        me.beanTKT.A1672IDFIL = rec.get('A1672IDFIL');

        Ext.Ajax.request({
            url: me.urlWin01 + '/loadASRFacsimilProrate/',
            params: {beanString: JSON.stringify(me.beanTKT)},
            success: function (response, options) { //records, operation, success
                mask.hide();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                     Ext.getCmp(prototype.id1 + '-txtupdateTKTOri').show();
                    //para el delivery
                    var strRestrict = '';
                    for (var i = 0; i < res.lstFaximil.lstReg46Restrict.length; i++) {
                        strRestrict += Ext.String.trim(String(res.lstFaximil.lstReg46Restrict[i]));
                    }
                    Ext.getCmp(prototype.id1 + '-txtEndors').setValue(Ext.String.trim(strRestrict));
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtEndors',
                        html: '' + Ext.String.trim(strRestrict)
                    });
                    var strOrigIssue = '';
                    for (var e = 0; e < res.lstFaximil.lstReg46OrigIssue.length; e++) {
                        strOrigIssue += Ext.String.trim(String(res.lstFaximil.lstReg46OrigIssue[e]));
                    }
                    Ext.getCmp(prototype.id1 + '-txtORIN').setValue(Ext.String.trim(strOrigIssue));
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtORIN',
                        html: '' + Ext.String.trim(strOrigIssue)
                    });

                    Ext.getCmp(prototype.id1 + '-txtOriginDesti').setValue(Ext.String.trim(res.lstFaximil.TODC)); //cambiar es la ruta
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtOriginDesti',
                        html: '' + Ext.String.trim(res.lstFaximil.TODC)
                    });

                    Ext.getCmp(prototype.id1 + '-txtDatePlace').setValue(Ext.String.trim(res.lstFaximil.DAIS));
                    
                    console.log(res.lstFaximil.strIssExc);
                    if (res.lstFaximil.strIssExc !== '') {
                        Ext.getCmp(prototype.id1 + '-txtIssExc').setText(Ext.String.trim(res.lstFaximil.strIssExc.substring(2, 16)));
                    } else {
                        Ext.getCmp(prototype.id1 + '-txtIssExc').setText("");
                    }
                    Ext.getCmp(prototype.id1 + '-txtPassenger').setValue(Ext.String.trim(res.lstFaximil.PXNM));
                    //console.log(res.lstFaximil);

                    var strFC = '';
                    for (var a = 0; a < res.lstFaximil.lstFC.length; a++) {
                        strFC += Ext.String.trim(String(res.lstFaximil.lstFC[a]));
                    }
                    Ext.getCmp(prototype.id1 + '-txtFareCal').setValue(Ext.String.trim(strFC));
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtFareCal',
                        html: '' + Ext.String.trim(res.lstFaximil.strFC)
                    });
                    Ext.getCmp(prototype.id1 + '-txtTourC').setValue(Ext.String.trim(res.lstFaximil.TOUR));
                    Ext.getCmp(prototype.id1 + '-txtPNR').setValue(Ext.String.trim(res.lstFaximil.PNRR));
                    Ext.getCmp(prototype.id1 + '-txtAgentF').setValue(Ext.String.trim(res.lstFaximil.AGTN));

                    Ext.getCmp(prototype.id1 + '-gridComponent3').getStore().removeAll();
                    Ext.getCmp(prototype.id1 + '-gridComponent3').getStore().loadData(res.lstFaximil.lstReg63);

                    Ext.getCmp(prototype.id1 + '-txtFareC').setValue(Ext.String.trim(res.lstFaximil.CUTP1) + "" + Ext.util.Format.number(res.lstFaximil.FARE, '0,000.00'));

                    if (res.lstFaximil.EQFR.substring(3) > 0) {
                        if (Ext.String.trim(res.lstFaximil.EQFR.substring(0, 3)).length > 0) {
                            Ext.getCmp(prototype.id1 + '-txtEquivFa').setValue(Ext.String.trim(res.lstFaximil.EQFR.substring(0, 3)) + '' + Ext.util.Format.number(res.lstFaximil.EQFR.substring(3), '0,000.00'));
                        } else {
                            Ext.getCmp(prototype.id1 + '-txtEquivFa').setValue(Ext.String.trim(res.lstFaximil.CUTP1) + '' + Ext.util.Format.number(res.lstFaximil.EQFR.substring(3), '0,000.00'));
                        }
                    } else {
                        Ext.getCmp(prototype.id1 + '-txtEquivFa').setValue('');
                    }
                    if (Ext.String.trim(Ext.getCmp(prototype.id1 + '-txtEquivFa').getValue().substring(0, 3)).length > 0 > 0) {
                        Ext.getCmp(prototype.id1 + '-txtTotal').setValue(Ext.String.trim(Ext.getCmp(prototype.id1 + '-txtEquivFa').getValue().substring(0, 3)) + '' + Ext.util.Format.number(res.lstFaximil.TOTL, '0,000.00'));
                    } else {
                        Ext.getCmp(prototype.id1 + '-txtTotal').setValue(Ext.String.trim(res.lstFaximil.CUTP1) + '' + Ext.util.Format.number(res.lstFaximil.TOTL, '0,000.00'));
                    }
                    var strTax = '';
                    for (var iTax = 0; iTax < res.lstFaximil.lstTaxes.length; iTax++) {
                        strTax += Ext.String.trim(String(res.lstFaximil.lstTaxes[iTax])) + '\n';
                    }
                    Ext.getCmp(prototype.id1 + '-txtTaxes').setValue(strTax);

                    var strFOP = '';
                    for (var iFop = 0; iFop < res.lstFaximil.lstFOP.length; iFop++) {
                        strFOP += Ext.String.trim(String(res.lstFaximil.lstFOP[iFop])) + '\n';
                    }
                    Ext.getCmp(prototype.id1 + '-txtFormPay').setValue(strFOP);
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtFormPay',
                        html: '' + Ext.String.trim(strFOP)
                    });

                    Ext.getCmp(prototype.id1 + '-txtEsConjunto').setValue(Ext.String.trim(res.lstFaximil.strEsCjn));
                    if (Ext.String.trim(res.lstFaximil.strEsCjn) === 'C') {
                        Ext.getCmp(prototype.id1 + '-txtEsConjunto').setValue(Ext.String.trim(res.lstFaximil.strEsCjn) + ' ' + Ext.String.trim(res.lstFaximil.strConjuncion));
                    }

                    //console.log(res.beanFaximil);
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }
            }
        });

    },
    onTKTOrigiClick: function () {
        var me = this;
        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id1 + '-Contenedor'), {
            msg: 'Please Wait....'
        });
        mask.show();
        var TKTORI= Ext.getCmp(prototype.id1 + '-txtNUMBERTKT').getEl().dom.innerHTML;
        me.beanTKTORI.VP_FRMSRIE = TKTORI.replace('-','') ;
        me.beanTKTORI.A1672PAIVT = Ext.getCmp(prototype.id1 + '-txtPaiVta').getValue();
        me.beanTKTORI.A1672AGENT = Ext.getCmp(prototype.id1 + '-txtAgentF').getValue();
        me.beanTKTORI.A1672FUENT = Ext.getCmp(prototype.id1 + '-txtSRC').getValue();

        Ext.Ajax.request({
            url: me.urlWin01 + '/loadASRFacsimilProrate/',
            params: {beanString: JSON.stringify(me.beanTKTORI)},
            success: function (response, options) { //records, operation, success
                mask.hide();
                Ext.getCmp(prototype.id1 + '-txtupdateTKTOri').hide();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    //para el delivery
                    var strRestrict = '';
                    for (var i = 0; i < res.lstFaximil.lstReg46Restrict.length; i++) {
                        strRestrict += Ext.String.trim(String(res.lstFaximil.lstReg46Restrict[i]));
                    }
                    Ext.getCmp(prototype.id1 + '-txtEndors').setValue(Ext.String.trim(strRestrict));
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtEndors',
                        html: '' + Ext.String.trim(strRestrict)
                    });
                    var strOrigIssue = '';
                    for (var e = 0; e < res.lstFaximil.lstReg46OrigIssue.length; e++) {
                        strOrigIssue += Ext.String.trim(String(res.lstFaximil.lstReg46OrigIssue[e]));
                    }
                    Ext.getCmp(prototype.id1 + '-txtORIN').setValue(Ext.String.trim(strOrigIssue));
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtORIN',
                        html: '' + Ext.String.trim(strOrigIssue)
                    });

                    Ext.getCmp(prototype.id1 + '-txtOriginDesti').setValue(Ext.String.trim(res.lstFaximil.TODC)); //cambiar es la ruta
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtOriginDesti',
                        html: '' + Ext.String.trim(res.lstFaximil.TODC)
                    });

                    Ext.getCmp(prototype.id1 + '-txtDatePlace').setValue(Ext.String.trim(res.lstFaximil.DAIS));
                    if (res.lstFaximil.strIssExc !== '') {
                        Ext.getCmp(prototype.id1 + '-txtIssExc').setText(Ext.String.trim(res.lstFaximil.strIssExc.substring(2, 16)));
                    } else {
                        Ext.getCmp(prototype.id1 + '-txtIssExc').setText("");
                    }
                    Ext.getCmp(prototype.id1 + '-txtPassenger').setValue(Ext.String.trim(res.lstFaximil.PXNM));
                    //console.log(res.lstFaximil);

                    var strFC = '';
                    for (var a = 0; a < res.lstFaximil.lstFC.length; a++) {
                        strFC += Ext.String.trim(String(res.lstFaximil.lstFC[a]));
                    }
                    Ext.getCmp(prototype.id1 + '-txtFareCal').setValue(Ext.String.trim(strFC));
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtFareCal',
                        html: '' + Ext.String.trim(res.lstFaximil.strFC)
                    });
                    Ext.getCmp(prototype.id1 + '-txtTourC').setValue(Ext.String.trim(res.lstFaximil.TOUR));
                    Ext.getCmp(prototype.id1 + '-txtPNR').setValue(Ext.String.trim(res.lstFaximil.PNRR));
                    Ext.getCmp(prototype.id1 + '-txtAgentF').setValue(Ext.String.trim(res.lstFaximil.AGTN));

                    Ext.getCmp(prototype.id1 + '-gridComponent3').getStore().removeAll();
                    Ext.getCmp(prototype.id1 + '-gridComponent3').getStore().loadData(res.lstFaximil.lstReg63);

                    Ext.getCmp(prototype.id1 + '-txtFareC').setValue(Ext.String.trim(res.lstFaximil.CUTP1) + "" + Ext.util.Format.number(res.lstFaximil.FARE, '0,000.00'));

                    if (res.lstFaximil.EQFR.substring(3) > 0) {
                        if (Ext.String.trim(res.lstFaximil.EQFR.substring(0, 3)).length > 0) {
                            Ext.getCmp(prototype.id1 + '-txtEquivFa').setValue(Ext.String.trim(res.lstFaximil.EQFR.substring(0, 3)) + '' + Ext.util.Format.number(res.lstFaximil.EQFR.substring(3), '0,000.00'));
                        } else {
                            Ext.getCmp(prototype.id1 + '-txtEquivFa').setValue(Ext.String.trim(res.lstFaximil.CUTP1) + '' + Ext.util.Format.number(res.lstFaximil.EQFR.substring(3), '0,000.00'));
                        }
                    } else {
                        Ext.getCmp(prototype.id1 + '-txtEquivFa').setValue('');
                    }
                    if (Ext.String.trim(Ext.getCmp(prototype.id1 + '-txtEquivFa').getValue().substring(0, 3)).length > 0 > 0) {
                        Ext.getCmp(prototype.id1 + '-txtTotal').setValue(Ext.String.trim(Ext.getCmp(prototype.id1 + '-txtEquivFa').getValue().substring(0, 3)) + '' + Ext.util.Format.number(res.lstFaximil.TOTL, '0,000.00'));
                    } else {
                        Ext.getCmp(prototype.id1 + '-txtTotal').setValue(Ext.String.trim(res.lstFaximil.CUTP1) + '' + Ext.util.Format.number(res.lstFaximil.TOTL, '0,000.00'));
                    }
                    var strTax = '';
                    for (var iTax = 0; iTax < res.lstFaximil.lstTaxes.length; iTax++) {
                        strTax += Ext.String.trim(String(res.lstFaximil.lstTaxes[iTax])) + '\n';
                    }
                    Ext.getCmp(prototype.id1 + '-txtTaxes').setValue(strTax);

                    var strFOP = '';
                    for (var iFop = 0; iFop < res.lstFaximil.lstFOP.length; iFop++) {
                        strFOP += Ext.String.trim(String(res.lstFaximil.lstFOP[iFop])) + '\n';
                    }
                    Ext.getCmp(prototype.id1 + '-txtFormPay').setValue(strFOP);
                    var tip = Ext.create('Ext.tip.ToolTip', {
                        target: prototype.id1 + '-txtFormPay',
                        html: '' + Ext.String.trim(strFOP)
                    });

                    Ext.getCmp(prototype.id1 + '-txtEsConjunto').setValue(Ext.String.trim(res.lstFaximil.strEsCjn));
                    if (Ext.String.trim(res.lstFaximil.strEsCjn) === 'C') {
                        Ext.getCmp(prototype.id1 + '-txtEsConjunto').setValue(Ext.String.trim(res.lstFaximil.strEsCjn) + ' ' + Ext.String.trim(res.lstFaximil.strConjuncion));
                    }

                    //console.log(res.beanFaximil);
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }
            }
        });
    }

});

