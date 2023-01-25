Ext.define('Ext.Praxis.controller.screens.ScrTKTController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrTKTController',
    VP_DOCUMENTO: '',
    VP_DOCUMENTO_PARENT: '',
    VP_CIA: '',
    VP_SEQ: '',
    actionCode: 'V',
    QTY: 0,
    OP: 0,
    strVoid: '',
    lstTKT: new Array(),
    lstTOT: new Array(),
    beanTKT: {},
    exchangerate: '',
    localcur: '',
    PRORRATEFLAG: 'SALE',
    beanPro: {},
    typeModal: '',
    MODAL_FACSIMIL: 'FACSIMIL',
    MODAL_PRORATE: 'PRORATE',
    modBack: '',
    fuente: '',
    listaTkts: new Array(),
    strVTR: '',
    strTCNR:'',
    gloCcust: '',
    lstAGTN: new Array(),
    gridCpnDataAC: new Array(),
    beanProrrate: {},
    init: function(view) {
        prototype.TKT = {
            id: 'ScrTKTForm',
            url: CONTEXTPATH+'/ScrTKT'
        };
        prototype.ProrrateoNew = {
            id: 'ScrProrrateoNewForm',
            url: CONTEXTPATH+'/ScrProrrateoNew'
        };
    },
    afterRender: function() {
        this.limpiarData();
        this.limpiarDataGrilla();
        this.QTY = 0;
        this.OP = '0';
        if(this.strVoid === 'V'){
//            idImageTKT.addChild(imageTKT);
//            with(imageTKT){x=0; y=0}
        }else{
//            idImageTKT.addChild(imageTKT);
//            idImageTKT.removeChild(imageTKT);
        }
        this.execSearch();
    },
    startDisplay: function(filter, back, lista, displayFilter) {
        Ext.getCmp(prototype.TKT.id+'-TicketPadre').setText(filter.TDNR);
        switch(this.typeModal){
            case this.MODAL_PRORATE:
                Ext.getCmp(prototype.TKT.id+'-boxProrrateInformation').show();
                Ext.getCmp(prototype.TKT.id+'-boxCpnInfo').show();
                break;
            case this.MODAL_FACSIMIL:
                Ext.getCmp(prototype.TKT.id+'-boxProrrateInformation').hide();
                Ext.getCmp(prototype.TKT.id+'-boxCpnInfo').hide();
                break;
        }
        this.modBack = back;
        this.fuente = filter.FUENTE.trim();
        if(lista !== null){
            this.listaTkts = lista;
        }
        Ext.getCmp(prototype.TKT.id+'-boxFilterControl').setVisible(displayFilter);
        if(filter !== null){
            this.imgClear_clickHandler();
            var backop =back.substr(0,8);
            if(filter.FUENTE.trim() === 'A' || filter.FUENTE.trim() === 'ARC'){
                if(back.substr(0,8) === 'SALE_RFN'){
                    if(back.substr(8) === '0'){
                        this.searchARC(filter);
                        this.searchA713(filter.TDNR);
                    }
                } else if(back.substr(0,8) === 'SALE_TKT'){
                    if(back.substr(8) === '0'){
                        this.searchARC(filter);
                        //this.searchA720(filter.TDNR,this.strVTR);
                        if(this.PRORRATEFLAG == 'EXCHANGE'){
                                this.searchA730(filter.TDNR,filter.TCNR);
                        }else{
                                this.searchA720(filter.TDNR,this.strVTR);
                        }
                    }
                } else this.searchARC(filter);
            }else if(filter.FUENTE.trim() === 'ASR' || filter.FUENTE.trim() === 'S'){
                if(back.substr(0,8) === 'SALE_RFN'){
                    if(back.substr(8) === '0'){
                        this.searchASR(filter);
                        this.searchA713(filter.TDNR);
                    }
                }
                else if(back.substr(0,8) === 'SALE_TKT'){
                    if(back.substr(8) === '0'){
                        this.searchASR(filter);
                        //this.searchA720(filter.TDNR,this.strVTR);
                        if(this.PRORRATEFLAG == 'EXCHANGE'){
                                this.searchA730(filter.TDNR,filter.TCNR);
                        }else{
                                this.searchA720(filter.TDNR,this.strVTR);
                        }
                    }
                }
                else this.searchASR(filter);
            }else if(filter.FUENTE.trim() === 'BSP' || filter.FUENTE.trim() === 'B'){
                if(back.substr(0,8) === 'SALE_RFN'){
                    if(back.substr(8) === '0'){
                        this.searchBSP(filter);
                        this.searchA713(filter.TDNR);
                    }
                }
                else if(back.substr(0,8) === 'SALE_TKT'){
                    if(back.substr(8) === '0'){
                        this.searchBSP(filter);
                        //this.searchA720(filter.TDNR,this.strVTR);
                        if(this.PRORRATEFLAG == 'EXCHANGE'){
                                this.searchA730(filter.TDNR,filter.TCNR);
                        }else{
                                this.searchA720(filter.TDNR,this.strVTR);
                        }
                    }
                }
                else this.searchBSP(filter);
            }else{
                this.searchARC(filter);
                this.searchA720(filter.TDNR,this.strVTR);
            }
        }
    },
    btnDelivery_clickHandler: function() {
        this.beanProrrate.TDNR = Ext.getCmp(prototype.TKT.id + '-TicketPadre').text;
	if(this.modBack.substr(0,8) === 'SALE_RFN'){
            if(this.beanProrrate.TDNR !== '' && this.beanProrrate.FUENTE !== ''){
                this.searchDeliveryRFND(this.beanProrrate);
            }
	}
	else{
            if(this.beanProrrate.TDNR !== '' && this.beanProrrate.FUENTE !== ''){
                this.searchDelivery(this.beanProrrate);
            }
	}
    },
    tab_clickHandler: function () {
        var tabPanel = Ext.getCmp(prototype.TKT.id+'-tabMain');
        var activeTab = tabPanel.getActiveTab();
        var activeTabIndex = tabPanel.items.indexOf(activeTab);
        switch (activeTab.id) {
            case prototype.TKT.id+'-tabSale':
                this.PRORRATEFLAG = 'SALE';
                break;
            case prototype.TKT.id+'-boxProrrate':
                if(this.VP_DOCUMENTO_PARENT===''){
                    this.beanPro.FUENTE = Ext.getCmp(prototype.TKT.id+'-lblSource').getValue().trim().substr(0, 3);
                    this.beanPro.TDNR = (Ext.getCmp(prototype.TKT.id+'-lblCia').getValue().replace(" ","") + Ext.getCmp(prototype.TKT.id+'-lblDocumento').getValue().replace(" ","")).trim();
                    this.beanPro.AGTN = Ext.getCmp(prototype.TKT.id+'-lblIata').getValue().replace(" ","").trim();
                    this.typeModal = 'PRORATE';
                    this.startDisplay(this.beanPro,'SALE_TKT'+this.OP,null,true);
                }
                else
                {
                    this.PRORRATEFLAG = 'EXCHANGE';
                    this.beanPro.FUENTE = Ext.getCmp(prototype.TKT.id+'-lblSource').getValue().trim().substr(0, 3);
                    this.beanPro.TDNR = (Ext.getCmp(prototype.TKT.id+'-lblCia').getValue().replace(" ","") + Ext.getCmp(prototype.TKT.id+'-lblDocumento').getValue().replace(" ","")).trim();
                    this.beanPro.TCNR = this.strTCNR;
                    this.beanPro.AGTN = Ext.getCmp(prototype.TKT.id+'-lblIata').getValue().replace(" ","").trim();
                    this.typeModal = 'PRORATE';
                    this.startDisplay(this.beanPro,'SALE_TKT'+this.OP,null,true);
                }
                this.QTY += 1;
                if(this.QTY === 1) this.OP = '0';
                else this.OP = '1';
                break;
        }
    },
    tab_viewticket_clickHandler: function () {
        /*var tabPanel = Ext.getCmp(prototype.TKT.id+'-tabMain');
        var activeTab = tabPanel.getActiveTab();
        activeTab.id = prototype.TKT.id+'-boxProrrate';
        var activeTabIndex = 1; // tabPanel.items.indexOf(activeTab);        
        this.PRORRATEFLAG = 'EXCHANGE';
        this.beanPro.FUENTE = Ext.getCmp(prototype.TKT.id+'-lblSource').getValue().trim().substr(0, 3);
        this.beanPro.TDNR = (Ext.getCmp(prototype.TKT.id+'-lblCia').getValue().replace(" ","") + Ext.getCmp(prototype.TKT.id+'-lblDocumento').getValue().replace(" ","")).trim();
        this.beanPro.TCNR = this.strTCNR;
        this.beanPro.AGTN = Ext.getCmp(prototype.TKT.id+'-lblIata').getValue().replace(" ","").trim();
        this.typeModal = 'PRORATE';
        this.startDisplay(this.beanPro,'SALE_TKT'+this.OP,null,true);

        this.QTY += 1;
        if(this.QTY === 1) this.OP = '0';
        else this.OP = '1';*/
                
    },
    limpiarData: function () {
        this.lstTKT = new Array();
        Ext.getCmp(prototype.TKT.id+'-lblCia').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblDocumento').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblDigito').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblTransaction').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblDocType').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblConjuction').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblBoleto').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblTotBoleto').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblTransactionNbr').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblSeq').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblIata').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblTourCode').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblFareCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblFare').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblEQVCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblEQV').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblDiscountCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblDiscount').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblQCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblQ').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblExchangeRate').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblLocalCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblGroup').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblIdFile').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblError').setText('');
        Ext.getCmp(prototype.TKT.id+'-lblError').hide();
        Ext.getCmp(prototype.TKT.id+'-lblSource').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblIssueDate').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblPax').setValue('');
//        Ext.getCmp(prototype.TKT.id+'-lblRFIC').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblType').setValue('');
//        Ext.getCmp(prototype.TKT.id+'-lblFFOP').setValue('');
//        Ext.getCmp(prototype.TKT.id+'-lblVoucherReason').setValue('');
        
        Ext.getCmp(prototype.TKT.id+'-lblFARE2Cur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblFARE2').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblADCCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblADC').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblORIGINALCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblORIGINAL').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblORIGINALCOMCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblORIGINALCOM').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblORIGINALOVERCOMCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblORIGINALOVERCOM').setValue('');
        
        Ext.getCmp(prototype.TKT.id+'-lblPAXDIFFCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblPAXDIFF').setValue('');
        
        Ext.getCmp(prototype.TKT.id+'-lblFOPCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblFOP').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblTAXCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblTAX').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblCOMMISIONCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblCOMMISION').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblTAXCOMMISSIONCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblTAXCOMMISSION').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblRemmittanceCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblRemmittance').setValue('');
        
        Ext.getCmp(prototype.TKT.id+'-lblTAXCOMMISSIONCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblTAXCOMMISSION').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblRemmittanceCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblRemmittance').setValue('');
        
//        Ext.getCmp(prototype.TKT.id+'-lblRegist').setText('');
//        Ext.getCmp(prototype.TKT.id+'-lblFRegist').setText('');
//        Ext.getCmp(prototype.TKT.id+'-lblRevisa').setText('');
//        Ext.getCmp(prototype.TKT.id+'-lblFRevis').setText('');
//        
//        gridExchange.includeInLayout = false;
//        gridExchange.visible = false;
//        boxEMD.visible = false;
//        boxEMD.includeInLayout = false;
//        boxTotal.includeInLayout = false;
//        boxTotal.visible = false;
    },
    limpiarDataGrilla: function () {
        Ext.getCmp(prototype.TKT.id+'-gridDetCpn').getStore().removeAll();
        Ext.getCmp(prototype.TKT.id+'-lblTotalCpnCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblTotalQCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblTotalYQCur').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblTotalCpn').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblTotalQ').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblTotalYQ').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblTotalCOM').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblTotalOVERCOM').setValue('');
    },
    execSearch: function () {
        if(this.VP_DOCUMENTO.length > 0){
            this.beanTKT.IN_AIRLIN = '139';
            this.beanTKT.IN_CIA  =  this.VP_CIA;
            this.beanTKT.IN_FORMA = this.VP_DOCUMENTO.substr(0,4);
            this.beanTKT.IN_SERIE = this.VP_DOCUMENTO.substr(4,6);
            this.beanTKT.A720SEQ = this.VP_SEQ;
            this.loadTicket(this.beanTKT);
        }else{
            this.limpiarData();
            this.limpiarDataGrilla();
        }
    },
    imgClear_clickHandler: function (bean) {
        this.limpiarDatosFacsimil();
	//Colocando campos del A720 ========================
        Ext.getCmp(prototype.TKT.id+'-txtREGIST').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtFREGIS').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtREVISA').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtFREVIS').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtGRUPO').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtA1530STPRO').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtORIG').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtCNJ').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtPRO').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtMONREG').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtFECVTA').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtCIUVTA').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtPAIVTA').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtCIUEMI').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtPAIEMI').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtCOMMIS').setValue('0');
        Ext.getCmp(prototype.TKT.id+'-txtMDACOM').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtPORCOM').setValue('0');
        Ext.getCmp(prototype.TKT.id+'-txtCODIT').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtINITRA').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtTAJUST').setValue('0');
        Ext.getCmp(prototype.TKT.id+'-txtTAJUSQ').setValue('0');
        Ext.getCmp(prototype.TKT.id+'-txtTARIFA').setValue('0');
        Ext.getCmp(prototype.TKT.id+'-txtMONEDA').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtTRFPAG').setValue('0');
        Ext.getCmp(prototype.TKT.id+'-txtMDAPAG').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtTRFNUC').setValue('0');
        Ext.getCmp(prototype.TKT.id+'-txtROE').setValue('0');
        Ext.getCmp(prototype.TKT.id+'-txtCPLUSS').setValue('0');
        Ext.getCmp(prototype.TKT.id+'-txtCSOVER').setValue('0');
        Ext.getCmp(prototype.TKT.id+'-txtQSOVER').setValue('0');
        Ext.getCmp(prototype.TKT.id+'-txtFEXCH').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtNRPRT').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtCURR').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtFARECOBL').setValue('0');
        Ext.getCmp(prototype.TKT.id+'-txtPAGO').setValue('0');
        Ext.getCmp(prototype.TKT.id+'-txtPGCURR').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtFareCal').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtMDAFRC').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtRATE').setValue('0.000000');
        Ext.getCmp(prototype.TKT.id+'-txtTourC').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtSTAT').setValue('');
	
//	gridCpnDataAC = null;
    },
    limpiarDatosFacsimil: function () {
        Ext.getCmp(prototype.TKT.id+'-txtPNR').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblAgente').setText('');
        Ext.getCmp(prototype.TKT.id+'-lblNomAgente').setText('');
        Ext.getCmp(prototype.TKT.id+'-lblDirAgente').setText('');
        Ext.getCmp(prototype.TKT.id+'-txtOrigDest').setValue('');
//	celEndors.toolTip = '';
        Ext.getCmp(prototype.TKT.id+'-txtEndors').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtDateIssue').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtIssExc').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtPassenger').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtFareCal').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtFare').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtEquivFa').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtTaxes').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtTotal').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtFormPay').setValue('');
        Ext.getCmp(prototype.TKT.id+'-lblTicket').setText('');
        Ext.getCmp(prototype.TKT.id+'-txtConj').setValue('');
        Ext.getCmp(prototype.TKT.id+'-txtORIN').setValue('');
        Ext.getCmp(prototype.TKT.id+'-btnDelivery').setText('<strong style="color:white">Delivery</b>');
	
//	grid63DataAC = null;
    },
    
    //<editor-fold defaultstate="collapsed" desc="button">
    btnFareCalc_clickHandler: function () {
        if(Ext.getCmp(prototype.TKT.id+'-lblDocumento').getValue().trim() !== ''){	
            var beanRecord = {};
            beanRecord.IN_AIRLIN = '139';
            beanRecord.IN_CIA = Ext.getCmp(prototype.TKT.id+'-lblCia').getValue().trim();//VP_CIA;
            beanRecord.IN_FORMA = Ext.getCmp(prototype.TKT.id+'-lblDocumento').getValue().trim().substr(0,4);//VP_DOCUMENTO.substr(0,4);
            beanRecord.IN_SERIE = Ext.getCmp(prototype.TKT.id+'-lblDocumento').getValue().trim().substr(4,6);//VP_DOCUMENTO.substr(4,6);
            beanRecord.A1721SEQ = this.VP_SEQ;
            var CtrlTktFCForm = Ext.create('Ext.Praxis.view.screens.CtrlTktFCForm', { id: 'CtrlTktFCForm' });
            var controller = CtrlTktFCForm.getController();
            controller.bean = beanRecord;
            controller.actionCode = 'V';
            CtrlTktFCForm.show();
        }
    },
    btnFacsimil_clickHandler: function () {
        if(Ext.getCmp(prototype.TKT.id+'-lblDocumento').getValue() !== ''){
            var bean104 = {};
            bean104.FUENTE = Ext.getCmp(prototype.TKT.id+'-lblSource').getValue().trim().substr(0, 3);
            bean104.TDNR = (Ext.getCmp(prototype.TKT.id+'-lblCia').getValue().replace(" ","") + Ext.getCmp(prototype.TKT.id+'-lblDocumento').getValue().replace(" ","")).trim();
            bean104.AGTN = (Ext.getCmp(prototype.TKT.id+'-lblIata').getValue().replace(" ","")).trim();
            
            var params = {};
            params.strVTR = 'CF';
            params.typeModal = 'FACSIMIL';
            params.bean = bean104;
            Ext.create('Ext.Praxis.view.screens.ScrProrrateoNewForm', {
                id: 'ScrProrrateoNewForm',
                params: params
            }).show();
//            twScrProrrateoNew.setVTR('CF');
//            twScrProrrateoNew.setModal(ScrProrrateo.MODAL_FACSIMIL);
//            twScrProrrateoNew.startDisplay(bean104,'SALE_TKT0',null,true); 
        }
    },
    btnDeliveryTKT_clickHandler: function () {
        this.beanProrrate.TDNR = (Ext.getCmp(prototype.TKT.id+'-lblCia').getValue().replace(" ","")+Ext.getCmp(prototype.TKT.id+'-lblDocumento').getValue().replace(" ","")).trim();
        this.beanProrrate.FUENTE = Ext.getCmp(prototype.TKT.id+'-lblSource').getValue().trim().substr(0, 3);
        if(this.beanProrrate.TDNR !== '' && this.beanProrrate.FUENTE !== ''){
            this.searchDelivery(this.beanProrrate);
        }
    },
    btnBalance_clickHandler: function () {
        if(Ext.getCmp(prototype.TKT.id+'-lblDocumento').getValue().trim() !== ''){
            var beanBalance = {};
            beanBalance.IN_AIRLIN = '139';
            beanBalance.IN_CIA = Ext.getCmp(prototype.TKT.id+'-lblCia').getValue().trim();
            beanBalance.IN_FORMA = Ext.getCmp(prototype.TKT.id+'-lblDocumento').getValue().trim().substr(0,4);
            beanBalance.IN_SERIE = Ext.getCmp(prototype.TKT.id+'-lblDocumento').getValue().trim().substr(4,6);
            beanBalance.A1730SQ720 = this.VP_SEQ;
            console.log(beanBalance);
            var CtrlTktBalanceForm = Ext.create('Ext.Praxis.view.program.CtrlTktBalanceForm', { id: 'CtrlTktBalanceForm' });
            var controller = CtrlTktBalanceForm.getController();
            controller.bean = beanBalance;
            controller.actionCode = 'V';
            CtrlTktBalanceForm.show();
        }
    },
    //</editor-fold>

    
    //<editor-fold defaultstate="collapsed" desc="result">
    onResultSearch: function (res) {
        this.beanProrrate = res.beanFacProrrateo;
        this.gloCcust = res.ccust;
        if (this.beanProrrate !== undefined) {
            if(this.beanProrrate.strError === '0' || this.beanProrrate.strError.trim() === ''){
                if(this.beanProrrate.TRNC === 'VOID' || this.beanProrrate.TRNC === 'CANX' || this.beanProrrate.TRNC === 'N   ' || this.strVoid === 'V'){
                    this.strVoid = 'V';
//                                idFacsimil.addChild(image);
//				with(image){x=0; y=0}
                } else {
                    this.strVoid = '';
//                                idFacsimil.addChild(image);
//                                idFacsimil.removeChild(image);
                }
                Ext.getCmp(prototype.TKT.id+'-lblErrorProrrate').setValue('');
                Ext.getCmp(prototype.TKT.id+'-lblErrorProrrate').hide();
                Ext.getCmp(prototype.TKT.id+'-TicketCompanion').setText(this.beanProrrate.strCompanion.trim());
                if(this.beanProrrate.FUENTE.trim() === 'ARC' || this.beanProrrate.FUENTE.trim() === 'A'){
                    if(this.modBack.substr(0,8) === 'SALE_RFN') win.lblUser_toolTip("Estructuras: A1347/A713/A003");
                    else win.lblUser_toolTip("Estructuras: A1347/A720/A003");
                    Ext.getCmp(prototype.TKT.id+'-lblFuente').setText('ARC');
                    Ext.getCmp(prototype.TKT.id+'-btnDelivery').setText('<strong style="color:white">ARC Delivery</b>');
                }else if(this.beanProrrate.FUENTE.trim() === 'ASR' || this.beanProrrate.FUENTE.trim() === 'S'){
                    if(this.modBack.substr(0,8) === 'SALE_RFN') win.lblUser_toolTip("Estructuras: A1536/A713/A003");
                    else win.lblUser_toolTip("Estructuras: A1536/A720/A003");
                    Ext.getCmp(prototype.TKT.id+'-lblFuente').setText('ASR');
                    Ext.getCmp(prototype.TKT.id+'-btnDelivery').setText('<strong style="color:white">ASR Delivery</b>');
                } else{
                    if(this.modBack.substr(0,8) === 'SALE_RFN') win.lblUser_toolTip("Estructuras: A1348/A713/A003");
                    win.lblUser_toolTip("Estructuras: A1348/A720/A003");
                    Ext.getCmp(prototype.TKT.id+'-lblFuente').setText('BSP');
                    Ext.getCmp(prototype.TKT.id+'-btnDelivery').setText('<strong style="color:white">BSP Delivery</b>');
                }
                Ext.getCmp(prototype.TKT.id+'-lblPais').setText(this.beanProrrate.COUNTRY);
                Ext.getCmp(prototype.TKT.id+'-txtOrigDest').setValue(this.beanProrrate.TODC.substring(0, 3)+' - '+this.beanProrrate.TODC.substring(3));
                //Armando Endorsements/Restrictions============================
                var lstReg46Restrict = this.beanProrrate.lstReg46Restrict;
                var strRestrict = '';
                for (var i = 0; i < lstReg46Restrict.length; i++) {
                    strRestrict += lstReg46Restrict[i].trim();
                }
                new Ext.create('Ext.tip.ToolTip', {
                    target: prototype.TKT.id+'-txtEndors',
                    html: strRestrict
                });
                Ext.getCmp(prototype.TKT.id+'-txtEndors').setValue(strRestrict);
                //End Endorsements/Restrictions
                //Armando Original Issue ============================
                var lstReg46OrigIssue = this.beanProrrate.lstReg46OrigIssue;
                var strOrigIssue = '';
                for (var i46 = 0; i46 < lstReg46OrigIssue.length; i46++) {
                    strOrigIssue += lstReg46OrigIssue[i46].trim();
                }
                Ext.getCmp(prototype.TKT.id+'-txtORIN').setValue(strOrigIssue);
                //End Original Issue
                Ext.getCmp(prototype.TKT.id+'-txtDateIssue').setValue(this.parseStringToDate(this.beanProrrate.DAIS));
                Ext.getCmp(prototype.TKT.id+'-txtIssExc').setValue(this.beanProrrate.strIssExc);
                Ext.getCmp(prototype.TKT.id+'-txtPassenger').setValue(this.beanProrrate.PXNM);
                //Armando Fare Calc ============================
                var lstFC = this.beanProrrate.lstFC;
                var strFC = '';
                for (var iFC = 0; iFC < lstFC.length; iFC++) {
                    strFC += lstFC[iFC].trim();// +'\n';
                }
                Ext.getCmp(prototype.TKT.id+'-txtFareCal').setValue(strFC);
                //End FC
                Ext.getCmp(prototype.TKT.id+'-txtTourC').setValue(this.beanProrrate.TOUR);
                Ext.getCmp(prototype.TKT.id+'-txtPNR').setValue(this.beanProrrate.PNRR);
                Ext.getCmp(prototype.TKT.id+'-gridDetFac').bindStore(
                    Ext.create("Ext.Praxis.store.flown.GridData", { data: this.beanProrrate.lstReg63 })
                );
                //Armando TAX/Fare ============================
                Ext.getCmp(prototype.TKT.id+'-txtFare').setValue(this.beanProrrate.CUTP1+' '+Ext.util.Format.number(this.beanProrrate.FARE, '0,000.00'));
                if(Number(this.beanProrrate.EQFR.substring(3))>0){
                    if(this.beanProrrate.EQFR.substring(0, 3).trim().length>0) Ext.getCmp(prototype.TKT.id+'-txtEquivFa').setValue(this.beanProrrate.EQFR.substring(0, 3)+' '+Ext.util.Format.number(this.beanProrrate.EQFR.substring(3), '0,000.00'));
                    else Ext.getCmp(prototype.TKT.id+'-txtEquivFa').setValue(this.beanProrrate.CUTP1+' '+Ext.util.Format.number(this.beanProrrate.EQFR.substring(3), '0,000.00'));
                }else Ext.getCmp(prototype.TKT.id+'-txtEquivFa').setValue('');
                if(Ext.getCmp(prototype.TKT.id+'-txtEquivFa').getValue().substring(0,3).trim().length>0) Ext.getCmp(prototype.TKT.id+'-txtTotal').setValue(Ext.getCmp(prototype.TKT.id+'-txtEquivFa').getValue().substring(0,3)+' '+Ext.util.Format.number(this.beanProrrate.TOTL, '0,000.00'));
                else Ext.getCmp(prototype.TKT.id+'-txtTotal').setValue(this.beanProrrate.CUTP1+' '+Ext.util.Format.number(this.beanProrrate.TOTL.substring(3), '0,000.00'));
                var lstTaxes = this.beanProrrate.lstTaxes;
                var strTax = '';
                for (var iTax = 0; iTax < lstTaxes.length; iTax++) {
                    strTax += lstTaxes[iTax].trim() +'\n';
                }
                Ext.getCmp(prototype.TKT.id+'-txtTaxes').setValue(strTax);
                //End Tax/Fare
                //Armando FOP ============================
                var lstFOP = this.beanProrrate.lstFOP;
                var strTexto = '';
                for (var iFop = 0; iFop < lstFOP.length; iFop++) {
                    strTexto += lstFOP[iFop].trim() +'\n';
                }
                Ext.getCmp(prototype.TKT.id+'-txtFormPay').setValue(strTexto);
                //End FC
                Ext.getCmp(prototype.TKT.id+'-lblTicket').setText(this.beanProrrate.TDNR.substring(0, 3)+'  '+this.beanProrrate.TDNR.substring(3)+'  '+this.beanProrrate.CDGT);

                if(this.beanProrrate.strEsCjn === 'C'){
                    var cant = Ext.getCmp(prototype.TKT.id+'-TicketCompanion').text.length/13;
                    if(Ext.getCmp(prototype.TKT.id+'-TicketCompanion').text.substring((cant*13)-13,cant*13) === this.beanProrrate.TDNR) Ext.getCmp(prototype.TKT.id+'-imgNext').hide();
                    else Ext.getCmp(prototype.TKT.id+'-imgNext').show();
                    if(Ext.getCmp(prototype.TKT.id+'-TicketCompanion').text.substring(0,13) === this.beanProrrate.TDNR) Ext.getCmp(prototype.TKT.id+'-imgPrev').hide();
                    else Ext.getCmp(prototype.TKT.id+'-imgPrev').show();
                }else{
                    if(this.beanProrrate.strFinCjn === 'N') Ext.getCmp(prototype.TKT.id+'-imgNext').show();
                    else Ext.getCmp(prototype.TKT.id+'-imgNext').hide();
                    if(this.beanProrrate.TDNR === Ext.getCmp(prototype.TKT.id+'-TicketPadre').text) Ext.getCmp(prototype.TKT.id+'-imgPrev').hide();
                    else Ext.getCmp(prototype.TKT.id+'-imgPrev').show();
                }
                Ext.getCmp(prototype.TKT.id+'-EsConjunto').setText(this.beanProrrate.strEsCjn);
                if(Ext.getCmp(prototype.TKT.id+'-EsConjunto').text === 'C'){
                    Ext.getCmp(prototype.TKT.id+'-lblCnj').setText('COMPANION TICKETS');
                    Ext.getCmp(prototype.TKT.id+'-txtConj').setValue(this.beanProrrate.strConjuncion);
                }else{
                    if(this.beanProrrate.TDNR === Ext.getCmp(prototype.TKT.id+'-TicketPadre').text){
                        Ext.getCmp(prototype.TKT.id+'-lblCnj').setText('CONJUNTION TICKETS');
                        Ext.getCmp(prototype.TKT.id+'-txtConj').setValue(this.beanProrrate.strConjuncion);
                    }
                }
                if(this.beanProrrate.TDNR.trim() === Ext.getCmp(prototype.TKT.id+'-TicketPadre').text) this.searchAgent(this.beanProrrate.AGTN);
            } else {
                Ext.getCmp(prototype.TKT.id+'-lblError').setValue(this.beanProrrate.strMsj);
                Ext.getCmp(prototype.TKT.id+'-lblError').show();
                Ext.getCmp(prototype.TKT.id+'-gridDetFac').bindStore(
                    Ext.create("Ext.Praxis.store.flown.GridData", { data: this.beanProrrate.lstReg63 })
                );
            }
        }
    },
    onResultSearchA720: function (res) {
        this.lstRest = res.beanRest;
        if(this.lstRest.length > 0){
            Ext.getCmp(prototype.TKT.id+'-gridDetCpn').focus();
            var beanA720 = this.lstRest[0];
            Ext.getCmp(prototype.TKT.id+'-txtREGIST').setValue(beanA720.A720REGIST);
            Ext.getCmp(prototype.TKT.id+'-txtFREGIS').setValue(beanA720.A720FREGIS);
            Ext.getCmp(prototype.TKT.id+'-txtREVISA').setValue(beanA720.A720REVISA);
            Ext.getCmp(prototype.TKT.id+'-txtFREVIS').setValue(beanA720.A720FREVIS);
            Ext.getCmp(prototype.TKT.id+'-txtGRUPO').setValue(beanA720.A720GRUPO);
            new Ext.create('Ext.tip.ToolTip', {
                target: prototype.TKT.id+'-txtGRUPO',
                html: beanA720.strOthers
            });
            Ext.getCmp(prototype.TKT.id+'-txtA1530STPRO').setValue(beanA720.A1530STPRO);
            Ext.getCmp(prototype.TKT.id+'-txtORIG').setValue(beanA720.A720ORIG);
            Ext.getCmp(prototype.TKT.id+'-txtCNJ').setValue(beanA720.A720FLAG+beanA720.A720CTKTC);
            Ext.getCmp(prototype.TKT.id+'-txtPRO').setValue(beanA720.A720PRO);
            Ext.getCmp(prototype.TKT.id+'-txtMONREG').setValue(beanA720.A720MONREG);
            Ext.getCmp(prototype.TKT.id+'-txtFECVTA').setValue(beanA720.A720FECVTA);
            Ext.getCmp(prototype.TKT.id+'-txtCIUVTA').setValue(beanA720.A720CIUVTA);
            Ext.getCmp(prototype.TKT.id+'-txtPAIVTA').setValue(beanA720.A720PAIVTA);
            Ext.getCmp(prototype.TKT.id+'-txtCIUEMI').setValue(beanA720.A720CIUEMI);
            Ext.getCmp(prototype.TKT.id+'-txtPAIEMI').setValue(beanA720.A720PAIEMI);
            Ext.getCmp(prototype.TKT.id+'-txtCOMMIS').setValue(Ext.util.Format.number(beanA720.A720TTCOMM, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtMDACOM').setValue(beanA720.A720MDACOM);
            Ext.getCmp(prototype.TKT.id+'-txtPORCOM').setValue(Ext.util.Format.number(beanA720.A720PORCOM, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtCODIT').setValue(beanA720.A720CODIT);
            Ext.getCmp(prototype.TKT.id+'-txtINITRA').setValue(beanA720.A720INITRA);
            Ext.getCmp(prototype.TKT.id+'-txtTAJUST').setValue(Ext.util.Format.number(beanA720.A720TAJUST, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtTAJUSQ').setValue(Ext.util.Format.number(beanA720.A720TAJUSQ, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtTARIFA').setValue(Ext.util.Format.number(beanA720.A720TARIFA, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtMONEDA').setValue(beanA720.A720MONEDA);
            Ext.getCmp(prototype.TKT.id+'-txtTRFPAG').setValue(Ext.util.Format.number(beanA720.A720TRFPAG, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtMDAPAG').setValue(beanA720.A720MDAPAG);
            Ext.getCmp(prototype.TKT.id+'-txtTRFNUC').setValue(Ext.util.Format.number(beanA720.A720TRFNUC, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtROE').setValue(Ext.util.Format.number(beanA720.A720ROE, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtCPLUSS').setValue(Ext.util.Format.number(beanA720.A720CPLUSS, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtCSOVER').setValue(Ext.util.Format.number(beanA720.A720TTSCMM, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtQSOVER').setValue(Ext.util.Format.number(beanA720.A720QSOVER, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtFEXCH').setValue(beanA720.A1345FEXCH);
            Ext.getCmp(prototype.TKT.id+'-txtCURR').setValue(beanA720.A1345CURR);
            Ext.getCmp(prototype.TKT.id+'-txtFARECOBL').setValue(Ext.util.Format.number(beanA720.A1345FARE, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtPAGO').setValue(Ext.util.Format.number(beanA720.A1345PAGO, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtPGCURR').setValue(beanA720.A1345PGCUR);
            Ext.getCmp(prototype.TKT.id+'-txtRATE').setValue(Ext.util.Format.number(beanA720.A1526RATE, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtSTAT').setValue(beanA720.A720STAT);
            new Ext.create('Ext.tip.ToolTip', {
                target: prototype.TKT.id+'-txtSTAT',
                html: beanA720.strOthers
            });
            Ext.getCmp(prototype.TKT.id+'-gridDetCpn').getStore().removeAll();
            Ext.getCmp(prototype.TKT.id+'-gridDetCpnCTS').getStore().removeAll();
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
            Ext.getCmp(prototype.TKT.id+'-gridDetCpnProrrate').bindStore(
                Ext.create("Ext.Praxis.store.flown.GridData", { data: this.gridCpnDataAC })
            );
            Ext.getCmp(prototype.TKT.id+'-gridDetCpnCTS').bindStore(
                Ext.create("Ext.Praxis.store.flown.GridData", { data: this.gridCpnDataAC })
            );
            //</editor-fold>
            if(this.gloCcust === '13*'){
                if(this.p.typeModal !== this.MODAL_FACSIMIL){
                    Ext.getCmp(prototype.TKT.id+'-boxCpnInfo').hide();
                }
                Ext.getCmp(prototype.TKT.id+'-boxCpnInfoCTS').show();
            }else{
                Ext.getCmp(prototype.TKT.id+'-boxCpnInfoCTS').hide();
                if(this.typeModal !== this.MODAL_FACSIMIL){
                    Ext.getCmp(prototype.TKT.id+'-boxCpnInfo').show();
                }
            }
        }
    },
    
    onResultSearchA730: function (res) {
        this.lstRest = res.beanRest;
        if(this.lstRest.length > 0){
            Ext.getCmp(prototype.TKT.id+'-gridDetCpn').focus();
            var beanA720 = this.lstRest[0];
            Ext.getCmp(prototype.TKT.id+'-txtREGIST').setValue(beanA720.A720REGIST);
            Ext.getCmp(prototype.TKT.id+'-txtFREGIS').setValue(beanA720.A720FREGIS);
            Ext.getCmp(prototype.TKT.id+'-txtREVISA').setValue(beanA720.A720REVISA);
            Ext.getCmp(prototype.TKT.id+'-txtFREVIS').setValue(beanA720.A720FREVIS);
            Ext.getCmp(prototype.TKT.id+'-txtGRUPO').setValue(beanA720.A720GRUPO);
            new Ext.create('Ext.tip.ToolTip', {
                target: prototype.TKT.id+'-txtGRUPO',
                html: beanA720.strOthers
            });
            Ext.getCmp(prototype.TKT.id+'-txtA1530STPRO').setValue(beanA720.A1530STPRO);
            Ext.getCmp(prototype.TKT.id+'-txtORIG').setValue(beanA720.A720ORIG);
            Ext.getCmp(prototype.TKT.id+'-txtCNJ').setValue(beanA720.A720FLAG+beanA720.A720CTKTC);
            Ext.getCmp(prototype.TKT.id+'-txtPRO').setValue(beanA720.A720PRO);
            Ext.getCmp(prototype.TKT.id+'-txtMONREG').setValue(beanA720.A720MONREG);
            Ext.getCmp(prototype.TKT.id+'-txtFECVTA').setValue(beanA720.A720FECVTA);
            Ext.getCmp(prototype.TKT.id+'-txtCIUVTA').setValue(beanA720.A720CIUVTA);
            Ext.getCmp(prototype.TKT.id+'-txtPAIVTA').setValue(beanA720.A720PAIVTA);
            Ext.getCmp(prototype.TKT.id+'-txtCIUEMI').setValue(beanA720.A720CIUEMI);
            Ext.getCmp(prototype.TKT.id+'-txtPAIEMI').setValue(beanA720.A720PAIEMI);
            Ext.getCmp(prototype.TKT.id+'-txtCOMMIS').setValue(Ext.util.Format.number(beanA720.A720TTCOMM, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtMDACOM').setValue(beanA720.A720MDACOM);
            Ext.getCmp(prototype.TKT.id+'-txtPORCOM').setValue(Ext.util.Format.number(beanA720.A720PORCOM, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtCODIT').setValue(beanA720.A720CODIT);
            Ext.getCmp(prototype.TKT.id+'-txtINITRA').setValue(beanA720.A720INITRA);
            Ext.getCmp(prototype.TKT.id+'-txtTAJUST').setValue(Ext.util.Format.number(beanA720.A720TAJUST, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtTAJUSQ').setValue(Ext.util.Format.number(beanA720.A720TAJUSQ, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtTARIFA').setValue(Ext.util.Format.number(beanA720.A720TARIFA, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtMONEDA').setValue(beanA720.A720MONEDA);
            Ext.getCmp(prototype.TKT.id+'-txtTRFPAG').setValue(Ext.util.Format.number(beanA720.A720TRFPAG, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtMDAPAG').setValue(beanA720.A720MDAPAG);
            Ext.getCmp(prototype.TKT.id+'-txtTRFNUC').setValue(Ext.util.Format.number(beanA720.A720TRFNUC, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtROE').setValue(Ext.util.Format.number(beanA720.A720ROE, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtCPLUSS').setValue(Ext.util.Format.number(beanA720.A720CPLUSS, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtCSOVER').setValue(Ext.util.Format.number(beanA720.A720TTSCMM, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtQSOVER').setValue(Ext.util.Format.number(beanA720.A720QSOVER, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtFEXCH').setValue(beanA720.A1345FEXCH);
            Ext.getCmp(prototype.TKT.id+'-txtCURR').setValue(beanA720.A1345CURR);
            Ext.getCmp(prototype.TKT.id+'-txtFARECOBL').setValue(Ext.util.Format.number(beanA720.A1345FARE, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtPAGO').setValue(Ext.util.Format.number(beanA720.A1345PAGO, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtPGCURR').setValue(beanA720.A1345PGCUR);
            Ext.getCmp(prototype.TKT.id+'-txtRATE').setValue(Ext.util.Format.number(beanA720.A1526RATE, '0,000.00'));
            Ext.getCmp(prototype.TKT.id+'-txtSTAT').setValue(beanA720.A720STAT);
            new Ext.create('Ext.tip.ToolTip', {
                target: prototype.TKT.id+'-txtSTAT',
                html: beanA720.strOthers
            });
            Ext.getCmp(prototype.TKT.id+'-gridDetCpn').getStore().removeAll();
            Ext.getCmp(prototype.TKT.id+'-gridDetCpnCTS').getStore().removeAll();
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
            Ext.getCmp(prototype.TKT.id+'-gridDetCpnProrrate').bindStore(
                Ext.create("Ext.Praxis.store.flown.GridData", { data: this.gridCpnDataAC })
            );
            Ext.getCmp(prototype.TKT.id+'-gridDetCpnCTS').bindStore(
                Ext.create("Ext.Praxis.store.flown.GridData", { data: this.gridCpnDataAC })
            );
            //</editor-fold>
            if(this.gloCcust === '13*'){
                if(this.p.typeModal !== this.MODAL_FACSIMIL){
                    Ext.getCmp(prototype.TKT.id+'-boxCpnInfo').hide();
                }
                Ext.getCmp(prototype.TKT.id+'-boxCpnInfoCTS').show();
            }else{
                Ext.getCmp(prototype.TKT.id+'-boxCpnInfoCTS').hide();
                if(this.typeModal !== this.MODAL_FACSIMIL){
                    Ext.getCmp(prototype.TKT.id+'-boxCpnInfo').show();
                }
            }
        }
    },
    
    onResultSearchAgent: function (res) {
        this.lstAGTN = res.beanAGTN;
        if (this.lstAGTN.length > 0) {
            this.beanA720 = this.lstAGTN[0];
            Ext.getCmp(prototype.TKT.id+'-lblNomAer').setText(this.beanA720.strNomAero);
            Ext.getCmp(prototype.TKT.id+'-lblAgente').setText(this.beanA720.AGTN);
            Ext.getCmp(prototype.TKT.id+'-lblNomAgente').setText(this.beanA720.strNombreAgente);
            Ext.getCmp(prototype.TKT.id+'-lblDirAgente').setText(this.beanA720.strDirecAgente);
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
    
    // <editor-fold defaultstate="collapsed" desc="loadTicket">
    loadTicket: function (beanTKT) {
        var me01 = this;
        Ext.Ajax.request({
            url: prototype.TKT.url+'/loadTicket',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanTKT)},
            beforerequest: Ext.getCmp('ScrTKTForm').mask('Loading...'),
            success: function(response, options){
                Ext.getCmp('ScrTKTForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me01.lstTKT = res.lstTKT;
                    me01.lstTKTGrilla = res.lstTKTGrilla;
                    
                    var gridDetCpn = Ext.getCmp(prototype.TKT.id + '-gridDetCpn');      
                    var storeDetCpn = Ext.create('Ext.data.Store', {
                       storeId: prototype.TKT.id + '-store-gridDetCpn'
                    });

                    gridDetCpn.setStore(storeDetCpn);                                                
                    Ext.getCmp(prototype.TKT.id + '-gridDetCpn').getStore().loadData(me01.lstTKTGrilla);
                        
                    var file = {};
                    var fileGrilla = {};
                    if(me01.lstTKT.length > 0){
                        file = me01.lstTKT[0];
                        Ext.getCmp(prototype.TKT.id+'-lblCia').setValue(file.A720CIAI);
                        Ext.getCmp(prototype.TKT.id+'-lblDocumento').setValue(file.A720FORMAI + file.A720SERIEI);
                        Ext.getCmp(prototype.TKT.id+'-lblDigito').setValue(file.A720DCHEQ);
                        Ext.getCmp(prototype.TKT.id+'-lblTransaction').setValue(file.A720TRNCU);
                        Ext.getCmp(prototype.TKT.id+'-lblDocType').setValue(file.A720TDOC);
                        Ext.getCmp(prototype.TKT.id+'-lblConjuction').setValue(file.A720FLAG);
                        Ext.getCmp(prototype.TKT.id+'-lblBoleto').setValue(win.formatLngNumber(file.A720NSEQ));
                        Ext.getCmp(prototype.TKT.id+'-lblTotBoleto').setValue(win.formatLngNumber(file.A720CTKTC));
                        Ext.getCmp(prototype.TKT.id+'-lblTransactionNbr').setValue(file.A720TRNN);
                        Ext.getCmp(prototype.TKT.id+'-lblSeq').setValue(file.A720TRNSQ);
                        Ext.getCmp(prototype.TKT.id+'-lblIata').setValue(file.A720AGENTE);
                        Ext.getCmp(prototype.TKT.id+'-lblTourCode').setValue(file.A720CODIT);
                        Ext.getCmp(prototype.TKT.id+'-lblFareCur').setValue(file.A720MONEDA);
                        Ext.getCmp(prototype.TKT.id+'-lblFare').setValue(win.formatDblNumber(file.A720TARIFA));
                        Ext.getCmp(prototype.TKT.id+'-lblEQVCur').setValue(file.A720MDAPAG);
                        Ext.getCmp(prototype.TKT.id+'-lblEQV').setValue(win.formatDblNumber(file.A720TRFPAG));
                        Ext.getCmp(prototype.TKT.id+'-lblDiscountCur').setValue(file.A720MDDS);
                        Ext.getCmp(prototype.TKT.id+'-lblDiscount').setValue(win.formatDblNumber(file.A720VDSCT));
                        Ext.getCmp(prototype.TKT.id+'-lblQCur').setValue(file.A720MDATQ);
                        Ext.getCmp(prototype.TKT.id+'-lblQ').setValue(win.formatDblNumber(file.A720TQ));
                        Ext.getCmp(prototype.TKT.id+'-lblExchangeRate').setValue(me01.exchangerate);
                        Ext.getCmp(prototype.TKT.id+'-lblLocalCur').setValue(me01.localcur);
                        Ext.getCmp(prototype.TKT.id+'-lblGroup').setValue(file.A720GRUPO);
                        Ext.getCmp(prototype.TKT.id+'-lblIdFile').setValue(file.A720IDFIL);
                        if(file.ERRORDESC!=='' && file.A720STAT!=='1' && file.A720STAT!=='4'){
                            Ext.getCmp(prototype.TKT.id+'-lblError').setText(file.ERRORDESC);
                            Ext.getCmp(prototype.TKT.id+'-lblError').show();
                        }else{
                            Ext.getCmp(prototype.TKT.id+'-lblError').setText('');
                            Ext.getCmp(prototype.TKT.id+'-lblError').hide();
                        }
                        if(file.A720ORIG==='A') file.A720ORIG ='ARC';
                        if(file.A720ORIG==='B') file.A720ORIG ='BSP';
                        if(file.A720ORIG==='S') file.A720ORIG ='ASR';
                        Ext.getCmp(prototype.TKT.id+'-lblSource').setValue(file.A720ORIG + '-' + file.A720PAIS);
                        Ext.getCmp(prototype.TKT.id+'-lblIssueDate').setValue(file.A720FECVTA);
                        Ext.getCmp(prototype.TKT.id+'-lblPax').setValue(file.A720PAX.trim());
                        Ext.getCmp(prototype.TKT.id+'-lblType').setValue(file.A720TPAX);
//                        Ext.getCmp(prototype.TKT.id+'-lblFFOP').setValue(file.A720FLAGTN);
//                        Ext.getCmp(prototype.TKT.id+'-lblVoucherReason').setValue(file.A720VRIC);
                        
                        Ext.getCmp(prototype.TKT.id+'-lblFARE2Cur').setValue(file.A720MDAFA);
                        Ext.getCmp(prototype.TKT.id+'-lblFARE2').setValue(win.formatDblNumber(file.A720FARE));
                        Ext.getCmp(prototype.TKT.id+'-lblADCCur').setValue(file.A720MDAAD);
                        Ext.getCmp(prototype.TKT.id+'-lblADC').setValue(win.formatDblNumber(file.A720ADC));
                        Ext.getCmp(prototype.TKT.id+'-lblORIGINALCur').setValue(file.A720MDAOR);
                        Ext.getCmp(prototype.TKT.id+'-lblORIGINAL').setValue(win.formatDblNumber(file.A720ORIGEX));
                        Ext.getCmp(prototype.TKT.id+'-lblORIGINALCOMCur').setValue(file.A720MDAOR);
                        Ext.getCmp(prototype.TKT.id+'-lblORIGINALCOM').setValue(win.formatDblNumber(file.A720ORCMEX));
                        Ext.getCmp(prototype.TKT.id+'-lblORIGINALOVERCOMCur').setValue(file.A720MDAOR);
                        Ext.getCmp(prototype.TKT.id+'-lblORIGINALOVERCOM').setValue(win.formatDblNumber(file.A720ORSCEX));

                        Ext.getCmp(prototype.TKT.id+'-lblPAXDIFFCur').setValue(file.A720MDADF);
                        Ext.getCmp(prototype.TKT.id+'-lblPAXDIFF').setValue(win.formatDblNumber(file.A720DIFPX));

                        if(Ext.getCmp(prototype.TKT.id+'-lblTransaction').getValue() === 'EXCH'){
                            Ext.getCmp(prototype.TKT.id+'-btnBalance').show();
//                            Ext.getCmp(prototype.TKT.id+'-gridExchange').show();
//                            Ext.getCmp(prototype.TKT.id+'-boxTotal').show();
                        }else{
                            Ext.getCmp(prototype.TKT.id+'-btnBalance').hide();
//                            Ext.getCmp(prototype.TKT.id+'-gridExchange').hide();
//                            Ext.getCmp(prototype.TKT.id+'-boxTotal').hide();
                        }

                        if(Ext.getCmp(prototype.TKT.id+'-lblDocType').getValue().trim().substr(0,2)==='MV' || Ext.getCmp(prototype.TKT.id+'-lblDocType').getValue().trim().substr(0,2)==='MD' || (file.A720ORIG==='BSP' && file.A720FORMAI.substr(0,3)==='218')){
//                            RFIC.visible = true;
//                            lblRFIC.visible = true;
//                            lblRFIC.text = app.trim(file.A720RFIC);
                        }else{
//                            RFIC.visible = false;
//                            lblRFIC.visible = false;
                        }

                        if(Ext.getCmp(prototype.TKT.id+'-lblTransaction').getValue() === 'EXCH') me01.loadExchange(file);

//                        boxEMD.visible = false;
                        if(Ext.getCmp(prototype.TKT.id+'-lblDocType').getValue().trim().substr(0,3)==='EMD'){
//                            boxEMD.visible = true;
                            me01.loadEMD(file);
                        }
                        if(Ext.getCmp(prototype.TKT.id+'-lblDocType').getValue().trim().substr(0,2)==='MV' || Ext.getCmp(prototype.TKT.id+'-lblDocType').getValue().trim().substr(0,2)==='MD' || (file.A720ORIG ==='BSP' && Ext.getCmp(prototype.TKT.id+'-lblDocType').getValue().trim().substr(0,3)==='218') || Ext.getCmp(prototype.TKT.id+'-lblDocType').getValue().trim()==='EMD' || Ext.getCmp(prototype.TKT.id+'-lblDocType').getValue().trim()==='EMDS'){
//                            tbMain.getTabAt(1).setVisible(false);
                        }else{
//                            tbMain.getTabAt(1).setVisible(true);
                        }
//                        lblRegist.text = app.trim(file.A720REGIST);
//                        lblFRegist.text = app.trim(file.A720FREGIS);
//                        lblRevisa.text = app.trim(file.A720REVISA);
//                        lblFRevis.text = app.trim(file.A720FREVIS);
                        me01.loadTotales(file);
                    }
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                Ext.getCmp('ScrTKTForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="loadExchange">
    loadExchange: function (filter) {
        var me02 = this;
        Ext.Ajax.request({
            url: prototype.TKT.url+'/loadExchange',
            method: 'POST',
            timeout: 60000000,
            params: {
                A720CIAI: filter.A720CIAI,
                A720FORMAI: filter.A720FORMAI,
                A720SERIEI: filter.A720SERIEI,
                A720SEQ: filter.A720SEQ
            },
            beforerequest: Ext.getCmp('ScrTKTForm').mask('Loading...'),
            success: function(response, options){
                Ext.getCmp('ScrTKTForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me02.lstEXCH = res.lstEXCH;                    
                    var file;
                    if(me02.lstEXCH.length > 0){                        
                        file = me02.lstEXCH[0];
                        var gridEMD = Ext.getCmp(prototype.TKT.id + '-gridEMD');      
                        var storeEMD = Ext.create('Ext.data.Store', {
                            storeId: prototype.TKT.id + '-store-gridEMD'
                        });

                        gridEMD.setStore(storeEMD);                                                
                        Ext.getCmp(prototype.TKT.id + '-gridEMD').getStore().loadData(me02.lstEXCH);
//                        Ext.getCmp(prototype.TKT.id+'-lblTotalExchCur').setValue(file.A730MONREG);
                        var totalExch = 0.00;
                        for(var i = 0;i<me02.lstEXCH.length;i++){
                            totalExch =  totalExch + me02.lstEXCH[i].VALUE;
                        }
//                        Ext.getCmp(prototype.TKT.id+'-lblTotalExch').setValue(win.formatDblNumber(totalExch));
                    }else{
//                        Ext.getCmp(prototype.TKT.id+'-lblTotalExchCur').setValue('');
//                        Ext.getCmp(prototype.TKT.id+'-lblTotalExch').setValue('0.00');
                    }
                    //alert('PARENT: '+ this.VP_DOCUMENTO_PARENT);
                    //if(this.VP_DOCUMENTO_PARENT!='')
                         //me02.tab_viewticket_clickHandler();
                    //this.VP_DOCUMENTO_PARENT = '';
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                Ext.getCmp('ScrTKTForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="loadTotales">
    loadTotales: function (filter) {
        var me03 = this;
        Ext.Ajax.request({
            url: prototype.TKT.url+'/loadTotales',
            method: 'POST',
            timeout: 60000000,
            params: {
                A720CIAI: filter.A720CIAI,
                A720FORMAI: filter.A720FORMAI,
                A720SERIEI: filter.A720SERIEI,
                A720SEQ: filter.A720SEQ
            },
            beforerequest: Ext.getCmp('ScrTKTForm').mask('Loading...'),
            success: function(response, options){
                Ext.getCmp('ScrTKTForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me03.lstTOT = res.lstTOT;
                    var file;
                    if(me03.lstTOT.length > 0){
                        file = me03.lstTOT[0];
                        Ext.getCmp(prototype.TKT.id+'-lblFOPCur').setValue(file.FOPCUR);
                        Ext.getCmp(prototype.TKT.id+'-lblFOP').setValue(win.formatDblNumber(file.FOP));
                        Ext.getCmp(prototype.TKT.id+'-lblTAXCur').setValue(file.TAXCUR);
                        Ext.getCmp(prototype.TKT.id+'-lblTAX').setValue(win.formatDblNumber(file.TAX));
                        Ext.getCmp(prototype.TKT.id+'-lblCOMMISIONCur').setValue(file.COMMCUR);
                        Ext.getCmp(prototype.TKT.id+'-lblCOMMISION').setValue(win.formatDblNumber(file.COMM));
                        Ext.getCmp(prototype.TKT.id+'-lblTAXCOMMISSIONCur').setValue(file.TAXCOMMCUR);
                        Ext.getCmp(prototype.TKT.id+'-lblTAXCOMMISSION').setValue(win.formatDblNumber(file.TAXCOMM));
                    }else{
                        Ext.getCmp(prototype.TKT.id+'-lblFOPCur').setValue('');
                        Ext.getCmp(prototype.TKT.id+'-lblFOP').setValue('');
                        Ext.getCmp(prototype.TKT.id+'-lblTAXCur').setValue('');
                        Ext.getCmp(prototype.TKT.id+'-lblTAX').setValue('');
                        Ext.getCmp(prototype.TKT.id+'-lblCOMMISIONCur').setValue('');
                        Ext.getCmp(prototype.TKT.id+'-lblCOMMISION').setValue('');
                        Ext.getCmp(prototype.TKT.id+'-lblTAXCOMMISSIONCur').setValue('');
                        Ext.getCmp(prototype.TKT.id+'-lblTAXCOMMISSION').setValue('');
                    }
//                    me03.loadRubros(Ext.getCmp(prototype.TKT.id+'-lblCia').getValue().trim(),Ext.getCmp(prototype.TKT.id+'-lblDocumento').getValue().trim().substr(0,4), Ext.getCmp(prototype.TKT.id+'-lblDocumento').getValue().trim().substr(4,6) , me03.VP_SEQ );
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                Ext.getCmp('ScrTKTForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // </editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchBSP">
    searchBSP: function (filter) {
        var meEle1 = this;
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url+'/searchBSP',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(filter)},
            beforerequest: Ext.getCmp(prototype.TKT.id+'-boxProrrate').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle1.onResultSearch(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp(prototype.TKT.id+'-boxProrrate').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp(prototype.TKT.id+'-boxProrrate').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchA720">
    searchA720: function (TDNR, strVTR) {
        var meEle2 = this;
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url+'/searchA720',
            method: 'POST',
            timeout: 60000000,
            params: {TDNR: TDNR, strVTR: strVTR},
            beforerequest: Ext.getCmp(prototype.TKT.id+'-boxProrrate').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle2.onResultSearchA720(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp(prototype.TKT.id+'-boxProrrate').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp(prototype.TKT.id+'-boxProrrate').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    ////<editor-fold defaultstate="collapsed" desc="searchA730">
    searchA730: function (TDNR, TCNR) {
        var meEle2 = this;
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url+'/searchA730',
            method: 'POST',
            timeout: 60000000,
            params: {TDNR: TDNR, TCNR: TCNR},
            beforerequest: Ext.getCmp(prototype.TKT.id+'-boxProrrate').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle2.onResultSearchA730(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp(prototype.TKT.id+'-boxProrrate').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp(prototype.TKT.id+'-boxProrrate').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchAgent">
    searchAgent: function (AGTN) {
        var meEle6 = this;
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url+'/searchAgent',
            method: 'POST',
            timeout: 60000000,
            params: {AGTN: AGTN},
            beforerequest: Ext.getCmp(prototype.TKT.id+'-boxProrrate').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle6.onResultSearchAgent(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp(prototype.TKT.id+'-boxProrrate').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp(prototype.TKT.id+'-boxProrrate').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchARC">
    searchARC: function (bean) {
        var meEle3 = this;
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url+'/searchARC',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp(prototype.TKT.id+'-boxProrrate').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle3.onResultSearch(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp(prototype.TKT.id+'-boxProrrate').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp(prototype.TKT.id+'-boxProrrate').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchA713">
    searchA713: function (TDNR) {
        var meEle4 = this;
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url+'/searchA713',
            method: 'POST',
            timeout: 60000000,
            params: {TDNR: TDNR, Seq: ""},
            beforerequest: Ext.getCmp(prototype.TKT.id+'-boxProrrate').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle4.onResultSearchA720(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp(prototype.TKT.id+'-boxProrrate').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp(prototype.TKT.id+'-boxProrrate').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchASR">
    searchASR: function (bean) {
        var meEle5 = this;
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url+'/searchASR',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp(prototype.TKT.id+'-boxProrrate').mask('Loading...'),
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle5.onResultSearch(res);
                } else global.Msg({msg: res.sesion});
                Ext.getCmp(prototype.TKT.id+'-boxProrrate').unmask();
            },
            failure: function (response, opts) {
                Ext.getCmp(prototype.TKT.id+'-boxProrrate').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDeliveryRFND">
    searchDeliveryRFND: function (bean) {
        var meEle7 = this;
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
        var meEle8 = this;
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url + '/searchDelivery',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    meEle8.onResultSearchDelivery(res);
                } else global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    parseStringToDate: function(fecha, separador) {
        separador = separador === null || separador === undefined ? "/" : "";
        if (fecha.length===8)
            fecha = fecha.substring(0,4)+separador+fecha.substring(4,6)+separador+fecha.substring(6,8);
        return fecha;
    }
});