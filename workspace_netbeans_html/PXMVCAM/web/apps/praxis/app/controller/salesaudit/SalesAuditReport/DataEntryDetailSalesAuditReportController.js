    Ext.define('Ext.Praxis.controller.salesaudit.SalesAuditReport.DataEntryDetailSalesAuditReportController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryDetailSalesAuditReportController',
    CCUST: '', CIA: '', FORMA: '', SERIE: '', SEQ: '', CUPON: '', TRNCU: '', FUENTE: '', AGENT: '',
    beanCOP: {},
    lstResumen: new Array(),
    beanADM: {},
    lstComponent: new Array(),
    lstComponentUsed: new Array(),
    lstComponentOld: new Array(),
    lstTax: new Array(),
    lstItinerary: new Array(),
    TYPE: '',
    init: function(view) {
    },
    afterRender: function(){
        if(this.TYPE !== undefined && this.TYPE !== ''){
            win.getCmp('1-btnReview').hide();
	}else{
            win.getCmp('1-btnReview').show();
	}
//	this.clearFields();
	win.setValue('1-txtFrmaSerie', this.CIA+this.FORMA+this.SERIE);
	win.setValue('1-txtSeq', this.SEQ);
	win.setValue('1-txtCupon', this.CUPON);
	win.setValue('1-txtTRNCU', this.TRNCU);
	win.setValue('1-txtGrupo', this.GRUPO);
	win.setValue('1-txtAgent', this.AGENT);
	win.setValue('1-txtFecVta', this.FVENT);
	win.setValue('1-txtIT', this.IT);
	win.setValue('1-txtTIDoc', this.TDOC);
	win.setText('1-NUMBERTKT', this.CIA+"-"+this.FORMA+"-"+this.SERIE);
        win.setText('1-IssuedBy', 'AEROMEXICO');
	
	this.beanCOP = {};
		
	this.beanCOP.VP_CIA = this.CIA;
	this.beanCOP.VP_FRMSRIE = this.FORMA+this.SERIE	;
	this.beanCOP.VP_SEQ = this.SEQ ;
	this.beanCOP.VP_TRNCU = this.TRNCU;
	this.beanCOP.VP_CUPON = this.CUPON ;
	this.beanCOP.A1672AGENT = this.AGENT;
        
	this.loadTicketComponent(this.beanCOP);
    },
    //<editor-fold defaultstate="collapsed" desc="loadTicketComponent">
    loadTicketComponent: function (beanCOP) {
        var me1 = this;
        Ext.Ajax.request({
            url: prototype.url+'/loadTicketComponent',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanCOP)},
            beforerequest: Ext.getCmp('DataEntryDetailSalesAuditReportForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryDetailSalesAuditReportForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me1.lstComponent = res.lstComponent;
                    Ext.getCmp(prototype.id+'-1-gridComponentOld').bindStore(
                        Ext.create("Ext.Praxis.store.salesAudit.GridData", { data: me1.lstComponent })
                    );
                    Ext.getCmp(prototype.id+'-1-gridComp').bindStore(
                        Ext.create("Ext.Praxis.store.salesAudit.GridData", { data: me1.lstComponent })
                    );
                    me1.lstComponentUsed = res.lstComponentUsed;
                    Ext.getCmp(prototype.id+'-1-gridFCRfndUsed').bindStore(
                        Ext.create("Ext.Praxis.store.salesAudit.GridData", { data: me1.lstComponentUsed })
                    );
                    me1.lstComponentOld = res.lstComponentOld;
                    Ext.getCmp(prototype.id+'-1-gridComponentOLD').bindStore(
                        Ext.create("Ext.Praxis.store.salesAudit.GridData", { data: me1.lstComponentOld })
                    );
                    me1.lstTax = res.lstTax;
                    me1.lstItinerary = res.lstItinerary;
                    Ext.getCmp(prototype.id+'-1-gridComponent2').bindStore(
                        Ext.create("Ext.Praxis.store.salesAudit.GridData", { data: me1.lstItinerary })
                    );
                    me1.beanADM = res.beanADM;
                    
                    me1.lstResumen = new Array();
                    me1.lstResumen.push({'Concepto': 'Fare', 'Difference' : me1.beanADM.A1672FADIF , 'Airline' : me1.beanADM.A1672FMORI , 'Agent' : me1.beanADM.A1672FAORI});
                    me1.lstResumen.push({'Concepto': 'Q', 'Difference' : me1.beanADM.A1672QDIF , 'Airline' : me1.beanADM.A1672QMORI , 'Agent' : me1.beanADM.A1672QORIG});
                    me1.lstResumen.push({'Concepto': 'Tax', 'Difference' : me1.beanADM.A1672TXDIF , 'Airline' : me1.beanADM.A1672TXMIA , 'Agent' : me1.beanADM.A1672TXAGT});
                    me1.lstResumen.push({'Concepto': 'Commission', 'Difference' : me1.beanADM.A1672CODIF , 'Airline' : me1.beanADM.A1672COMIA , 'Agent' : me1.beanADM.A1672COAGT});
                    me1.lstResumen.push({'Concepto': 'Over Comm', 'Difference' : me1.beanADM.A1672SCDIF , 'Airline' : me1.beanADM.A1672SCMIA , 'Agent' : me1.beanADM.A1672SCAGT});
                    me1.lstResumen.push({'Concepto': 'Tax On Comm', 'Difference' : me1.beanADM.A1672OVDIF , 'Airline' : me1.beanADM.A1672OVMIA , 'Agent' : me1.beanADM.A1672OVAGT});
                    me1.lstResumen.push({'Concepto': 'Net'+" ("+me1.beanADM.A1672MONTT+") ", 'Difference' : me1.beanADM.A1672TTDIF , 'Airline' : me1.beanADM.A1672TTMIA , 'Agent' : me1.beanADM.A1672TTAGT});
                    Ext.getCmp(prototype.id+'-1-gridComponent').bindStore(
                        Ext.create("Ext.Praxis.store.salesAudit.GridData", { data: me1.lstResumen })
                    );
                    
                    me1.setFields ();
    
//                    me1.displayFacsimil();
    
                    var file = {};
                    var file2 = {};
                    if(me1.lstComponent.length > 0){
                        win.focus('1-gridComponent');
                        file = me1.lstComponent[0];
                    }else{
                        global.Msg({msg: 'Data not found'});
                    }	
                    if(me1.lstTax.length > 0){
                        file2 = me1.lstTax[0];
                        var totAir = 0; 
                        var totAgt = 0; 
                        var totDif = 0; 
                        var totUse = 0; 
                        var totVta = 0; 	
                        for(var i=0;i<me1.lstTax.length;i++){
                            totAir += me1.lstTax[i].A1673TXMIA;
                            totAgt += me1.lstTax[i].A1673TXORI;
                            totDif += me1.lstTax[i].A1673TXDIF;
                            totUse += me1.lstTax[i].A1673TXUSE;
                            totVta += me1.lstTax[i].A1673TXVTA;
                        }
                        /*TotTaxMia.text = formatDblNumber.format(totAir).toString() ;
                        TotTaxAgt.text = formatDblNumber.format(totAgt).toString() ;
                        TotTaxDif.text = formatDblNumber.format(totDif).toString() ;
                        TotTaxSale.text = formatDblNumber.format(totVta).toString() ;
                        TotTaxUsed.text = formatDblNumber.format(totUse).toString() ;
                        TotTaxMia2.text = formatDblNumber.format(totAir).toString() ;
                        TotTaxAgt2.text = formatDblNumber.format(totAgt).toString() ;
                        TotTaxDif2.text = formatDblNumber.format(totDif).toString() ; NOVO*/
                    }else{
                        global.Msg({msg: 'Taxes not Found.'});
                    }
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryDetailSalesAuditReportForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    lnkDownload_clickHandler: function () {
        if(win.getValue('1-txtRUTAF') !== '' && win.getValue('1-txtNAMEF') !== ''){
            var bean = {};
            bean.A2537RUTAF = win.getValue('1-txtRUTAF').trim();
            bean.A2537NAMEF = win.getValue('1-txtNAMEF').trim();
            console.log("this.download(bean);");
//            this.download(bean);
	}
    },
    btnCancel_clickHandler: function(){
        this.view.close();
    },
    setFields: function () {
        win.setValue('1-txtUser', this.beanADM.A1672UASIG);
        win.setValue('1-txtUDate', this.beanADM.A1672FASIG);
        win.setValue('1-txtUserAudit', this.beanADM.A1672REVIS);
        win.setValue('1-txtFRevis', this.beanADM.A1672FREVI);
        win.setValue('1-txtRUTAF', this.beanADM.A1672RUTAF);
        win.setValue('1-txtNAMEF', this.beanADM.A1672NAMEF);
        
        win.setValue('1-txtGrupo', this.beanADM.A1672GRUPO);
//        txtERROR.toolTip = beanADM.A1672ERROR;
        win.setValue('1-txtERROR', this.beanADM.A1672ERROR);
        
        win.setValue('1-txtFecVta', this.beanADM.A1672FVENT);
        win.setValue('1-txtCiuVta', this.beanADM.A1672CTYVT);
        win.setValue('1-txtPaiVta', this.beanADM.A1672PAIVT);
        win.setValue('1-txtCiuUso', this.beanADM.A1672CTYEM);
        win.setValue('1-txtPaiUso', this.beanADM.A1672PAIEM);
        win.setValue('1-txtTPax', this.beanADM.A1672TPAX);
        win.setValue('1-txtFare', this.beanADM.A1672TARTK);
        win.setValue('1-txtCur', this.beanADM.A1672CURRENCY);
        win.setValue('1-txtNUC', this.beanADM.A1672NUC);
        win.setValue('1-txtROE', this.beanADM.A1672ROE);
        win.setValue('1-txtPlus', this.beanADM.A1672PLUS);
        win.setValue('1-txtSOver', this.beanADM.A1672SOVER);
        win.setValue('1-txtRate', this.beanADM.A1672TCAMB);
        win.setValue('1-txtIT', this.beanADM.A1672CODIT);
        win.setValue('1-txtTIDoc', this.beanADM.A1672TDOC);
        win.setValue('1-txtEquiv', this.beanADM.A1672EQVTK);
        win.setValue('1-txtEquivCur', this.beanADM.A1672MONET);
        win.setValue('1-txtADC', this.beanADM.A1672ADC);
        win.setText('1-txtSRC', this.beanADM.A1672FUENT);
        win.setValue('1-txtSOURCE', this.beanADM.A1672FUENT);
        win.setValue('1-txtChannel', this.beanADM.A1672CANAL);
        win.setValue('1-txtOrigTrnx', this.beanADM.A1672TRNCO);
        win.setValue('1-txtOrigDate', this.beanADM.A1672FECSL);
        win.setValue('1-txtOrigAgency', this.beanADM.A1672IATAV);
        win.setValue('1-txtOrigSource', this.beanADM.A1672FUENV);
        win.setValue('1-txtRType', this.beanADM.A1672TRF);
        win.setValue('1-txtEType', this.beanADM.A1672TRF);
        win.setValue('1-txtA1672FPROC', this.beanADM.A1672FPROC);
        win.setValue('1-txtEMDReal', this.beanADM.A1672TKCNX);
        
        if(this.beanADM.A1672CODWA!==''){
//            txtWaiver.toolTip = this.beanADM.A1672CODWA;
            win.setValue('1-txtWaiver', this.beanADM.A1672CODWA);
	}
        
        win.setValue('1-txtReverdate', this.beanADM.A1672FRESV);
        win.setValue('1-txtBSR', this.beanADM.A1672BSR.toFixed(2));
        win.setValue('1-txtIT', this.beanADM.A1672CODIT);
        win.getCmp('1-imgTicket').hide();
        
        win.getCmp('1-boxComponentUsed').hide();
        if(this.beanADM.A1672FCMI==='X'){
            win.setValue('1-txtFCMI', 'A');
	}else{
            win.setValue('1-txtFCMI', 'M');
	}
        if(this.beanADM.A1672TRNCU === 'RFND'){
	    win.getCmp('1-txtChargeName').show();
	    win.getCmp('1-txtCharge1').show();
	    win.getCmp('1-txtCharge2').show();
	    win.getCmp('1-boxComponentUsed').show();
	    win.getCmp('1-txtPenaltyName').show();
	    
            win.setValue('1-txtCURAIR', this.beanADM.A1672MONTT);
            win.setValue('1-txtFareAIR', parseInt(this.beanADM.A1672TARTK).toFixed(2));
            win.setValue('1-txtCurAIR', this.beanADM.A1672MONTT);
            win.setValue('1-txtEquivAIR', parseInt(this.beanADM.A1672EQVTK).toFixed(2));
            win.setValue('1-txtEquivCurAIR', this.beanADM.A1672MONET);
            win.setValue('1-txtCharge1', parseInt(this.beanADM.A1672CHAMI).toFixed(2));
            win.setValue('1-txtCharge2', this.beanADM.A1672MDAAD);
            win.setValue('1-txtPenalty1', parseInt(this.beanADM.A1672PNTMI).toFixed(2));
            win.setValue('1-txtPenalty2', this.beanADM.A1672MONTT);
		
            win.setValue('1-txtTktOrig', this.CIA + this.FORMA + this.SERIE);
            win.setValue('1-txtAgentOrig', this.AGENT);
            win.setValue('1-txtFecUsoOrig', this.beanADM.A1672FECSL);
            win.setValue('1-txtQty', this.beanADM.A1672QTYTK);
            win.setValue('1-txtPlace', this.beanADM.A1672CEMIO);
            
            win.getCmp('1-lblEType').hide();
            win.getCmp('1-txtEType').hide();
            win.getCmp('1-lblRType').show();
            win.getCmp('1-txtRType').show();
	    
            win.getCmp('1-txtYQPAYNAME').hide();
            win.getCmp('1-txtYRPAYNAME').hide();
            win.getCmp('1-txtYQPAY2').hide();
            win.getCmp('1-txtYRPAY1').hide();
            win.getCmp('1-txtYRPAY2').hide();

            win.getCmp('1-Component0').hide();
            win.getCmp('1-lblReverdate').hide();
            win.getCmp('1-txtReverdate').hide();
            win.getCmp('1-IRLINECOMPONE').hide();
//            tnvMain.getTabAt(1).visible = false;
            win.getCmp('1-Component2').hide();

            win.getCmp('1-lstComponent_RFND').show();
            win.getCmp('1-lstComponent_SALES').hide();

            if(this.beanADM.A1672TRNCO==='EXCH'){
                win.getCmp('1-OLD_FARE_COMPONENT').show();
            }else{
                win.getCmp('1-OLD_FARE_COMPONENT').hide();
            }
	 }else {
            if (this.beanADM.A1672TRNCU === 'EXCH'){
                win.setValue('1-txtCurBalance', this.beanADM.A1672MONTT);
                win.setValue('1-txtFareBalance', this.beanADM.A1672FAREN.toFixed(2));
                win.setValue('1-txtFareOldBalance', this.beanADM.A1672FAOLD.toFixed(2));
                win.setValue('1-txtADCBalance', parseInt(this.beanADM.A1672ADC).toFixed(2));
                
                win.setValue('1-txtCURAIRLE', this.beanADM.A1672MONTT);
                win.setValue('1-txtFareAIRLE', this.beanADM.A1672FAREN.toFixed(2));
                win.setValue('1-txtFareOldAIRLE', this.beanADM.A1672FAOLD.toFixed(2));
                win.setValue('1-txtADCAIRLE', parseInt(this.beanADM.A1672ADC).toFixed(2));
                
                win.setValue('1-txtCURAIR', this.beanADM.A1672MOTAI);
                win.setValue('1-txtFareAIR', this.beanADM.A1672TARAI.toFixed(2));
                win.setValue('1-txtCurAIR', this.beanADM.A1672MOTAI);
                win.setValue('1-txtEquivAIR', this.beanADM.A1672EQVAI.toFixed(2));
                
                win.setValue('1-txtEquivCurAIR', this.beanADM.A1672MOEAI);
                win.setValue('1-txtYQPAY1', this.beanADM.A1672YQPGM.toFixed(2));
                win.setValue('1-txtYQPAY2', this.beanADM.A1672MOTAI);
                win.setValue('1-txtYRPAY1', this.beanADM.A1672YRPGM.toFixed(2));
                win.setValue('1-txtYRPAY2', this.beanADM.A1672MOTAI);
                win.setValue('1-txtCharge1', parseInt(this.beanADM.A1672CHAMI).toFixed(2));
                win.setValue('1-txtCharge2', this.beanADM.A1672MDAAD);
                win.setValue('1-txtPenalty1', this.beanADM.A1672PNTMI.toFixed(2));
                win.setValue('1-txtPenalty2', this.beanADM.A1672MONTT);
                
                win.setValue('1-txtFarePENAL', this.beanADM.A1672PNTMI.toFixed(2));
                win.setValue('1-txtCURAPENAL', this.beanADM.A1672MOTAI);
                win.setValue('1-txtTktOrig', this.CIA + this.FORMA + this.SERIE);
                win.setValue('1-txtAgentOrig', this.AGENT);
                win.setValue('1-txtFecUsoOrig', this.beanADM.A1672FECSL);
                win.setValue('1-txtQty', this.beanADM.A1672QTYTK);
                win.setValue('1-txtPlace', this.beanADM.A1672CEMIO);
                
//                tnvMain.getTabAt(1).visible = false;
                win.getCmp('1-boxComponentUsed').hide();
                
                win.getCmp('1-OLD_FARE_COMPONENT').show();
                win.getCmp('1-Component0').show();
                win.getCmp('1-lblReverdate').show();
                win.getCmp('1-txtReverdate').show();
                win.getCmp('1-IRLINECOMPONE').show();
                win.getCmp('1-lblEType').show();
                win.getCmp('1-txtEType').show();
                win.getCmp('1-lblRType').hide();
                win.getCmp('1-txtRType').hide();
            }else {
                win.getCmp('1-txtYQPAYNAME').show();
                win.getCmp('1-txtYRPAYNAME').show();
                win.getCmp('1-txtYQPAY2').show();
                win.getCmp('1-txtYRPAY1').show();
                win.getCmp('1-txtYRPAY2').show();
                
                win.getCmp('1-lblEType').hide();
                win.getCmp('1-txtEType').hide();
                win.getCmp('1-lblRType').hide();
                win.getCmp('1-txtRType').hide();
                
                win.setValue('1-txtCURAIR', this.beanADM.A1672MOTAI);
                win.setValue('1-txtFareAIR', this.beanADM.A1672TARAI.toFixed(2));
                win.setValue('1-txtCurAIR', this.beanADM.A1672MOTAI);
                win.setValue('1-txtEquivAIR', this.beanADM.A1672EQVAI.toFixed(2));
                win.setValue('1-txtEquivCurAIR', this.beanADM.A1672MOEAI);
                win.setValue('1-txtYQPAY1', this.beanADM.A1672YQPGM.toFixed(2));
                win.setValue('1-txtYQPAY2', this.beanADM.A1672MOTAI);
                win.setValue('1-txtYRPAY1', this.beanADM.A1672YRPGM.toFixed(2));
                win.setValue('1-txtYRPAY2', this.beanADM.A1672MOTAI);
                
                win.getCmp('1-txtCharge1').hide();
                win.getCmp('1-txtCharge2').hide();
                win.getCmp('1-OLD_FARE_COMPONENT').hide();
                win.getCmp('1-IRLINECOMPONE').hide();
//                tnvMain.getTabAt(1).visible = false;
                win.getCmp('1-Component2').hide();
                win.getCmp('1-txtChargeName').hide();
                win.getCmp('1-txtPenaltyName').hide();
                win.getCmp('1-txtPenalty1').hide();
                win.getCmp('1-txtPenalty2').hide();
                win.getCmp('1-lstComponent_RFND').hide();
                win.getCmp('1-lstComponent_SALES').show();
                
                win.setValue('1-txtCharge1', '');
                win.setValue('1-txtCharge2', '');
                win.setValue('1-txtPenalty1', '');
                win.setValue('1-txtPenalty2', '');
            }
	 }
    },
});