Ext.define('Ext.Praxis.controller.payments.SalesReconciliation.DataEntryTicketSalesReconciliationController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryTicketSalesReconciliationController',
    bean: {},
    lista: {},
    lstCards: [],
    actionCode: '',
    msj: '',
//    beanCons: {},
//    FUNCION: '',
//    recalculoVuelo: '',
    init: function(view) {
    },
    afterRender: function(){
        switch( this.actionCode ){
            case 'V':
                this.mostrarData();
                if (this.msj.trim() !== '') {
                    global.Msg({msg: this.msj});
                } else {
                }
                break;
            case 'I':
                this.limpiarData();
                break;
            case 'U':
                this.limpiarData();
                this.mostrarData();
                break;
            case 'S':
                this.limpiarData();
                this.mostrarData();
                break;
        }
    },
    limpiarData: function () {
    },
    
    //<editor-fold defaultstate="collapsed" desc="button">
    onPrevClick: function() {
    },
    onNextClick: function() {
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function() {
        var res = '';
        win.setValue('2-txtSCARCOD', this.bean.SCARCOD.trim()+" - "+this.bean.strSDescCard.trim());
        Ext.create('Ext.tip.ToolTip', {
            target: prototype.id+'-2-txtSCARCOD',
            html: this.bean.SCARCOD.trim()+" - "+this.bean.strSDescCard.trim()
        });
        
        win.setValue('2-txtACARCOD', this.bean.ACARCOD.trim()+" - "+this.bean.strADescCard.trim());
        Ext.create('Ext.tip.ToolTip', {
            target: prototype.id+'-2-txtACARCOD',
            html: this.bean.ACARCOD.trim()+" - "+this.bean.strADescCard.trim()
        });
        
        win.setValue('2-txtTicket', this.bean.strTicket.trim());
        win.setValue("2-txtSEQ", this.bean.SEQ.trim());
        win.setValue('2-cmbTDOC', this.bean.TDOC);
        win.setValue('2-cmbFTE', this.bean.FTE);
        win.setValue('2-cmbSTVAL', this.bean.STVAL);
        //<editor-fold defaultstate="collapsed" desc="style Error">
//        if(bean.CERROR == "13" || bean.CERROR == "14"){
//		txtSVFOP.styleName = "CSS0001TextError";
//		txtAVFOP.styleName = "CSS0001TextError";
//			
//	}else {
//		if(bean.SCOUNTRY != bean.ACOUNTRY){
//			txtSCOUNTRY.styleName = "CSS0001TextError";
//			txtACOUNTRY.styleName = "CSS0001TextError";
//		}else{
//			txtSCOUNTRY.styleName = "CSS0001TextInput";
//			txtACOUNTRY.styleName = "CSS0001TextInput";
//		}
//		if(bean.SAGENT != bean.AAGENT){
//			txtSAGENT.styleName = "CSS0001TextError";
//			txtAAGENT.styleName = "CSS0001TextError";
//		}else{
//			txtSAGENT.styleName = "CSS0001TextInput";
//			txtAAGENT.styleName = "CSS0001TextInput";
//		}
//		if(bean.SDATE != bean.ADATE){
//			txtSDATE.styleName = "CSS0001TextError";
//			txtADATE.styleName = "CSS0001TextError";
//		}else{
//			txtSDATE.styleName = "CSS0001TextInput";
//			txtADATE.styleName = "CSS0001TextInput";
//		}
//		if(bean.SPAYMENT != bean.APAYMENT){
//			txtSPAYMENT.styleName = "CSS0001TextError";
//			txtAPAYMENT.styleName = "CSS0001TextError";
//		}else{
//			txtSPAYMENT.styleName = "CSS0001TextInput";
//			txtAPAYMENT.styleName = "CSS0001TextInput";
//		}
//		if(bean.SCARCOD != bean.SCARCOD){
//			txtSCARCOD.styleName = "CSS0001TextError";
//			txtACARCOD.styleName = "CSS0001TextError";
//		}else{
//			txtSCARCOD.styleName = "CSS0001TextInput";
//			txtACARCOD.styleName = "CSS0001TextInput";
//		}
//		if(bean.STCNTR != bean.ATCNTR){
//			txtSTCNTR.styleName = "CSS0001TextError";
//			txtATCNTR.styleName = "CSS0001TextError";
//		}else{
//			txtSTCNTR.styleName = "CSS0001TextInput";
//			txtATCNTR.styleName = "CSS0001TextInput";
//		}
//		if(bean.SVFOP != bean.AVFOP){
//			txtSVFOP.styleName = "CSS0001TextError";
//			txtAVFOP.styleName = "CSS0001TextError";
//		}else{
//			txtSVFOP.styleName = "CSS0001TextInput";
//			txtAVFOP.styleName = "CSS0001TextInput";
//		}
//		if(bean.SCURRENCY != bean.ACURRENCY){
//			txtSCURRENCY.styleName = "CSS0001TextError";
//			txtACURRENCY.styleName = "CSS0001TextError";
//		}else{
//			txtSCURRENCY.styleName = "CSS0001TextInput";
//			txtACURRENCY.styleName = "CSS0001TextInput";
//		}
//		res = obtenerTarjeta(app.trim(bean.strSCARDN), app.trim(bean.ACARDN));
//		if(res == "1"){
//			txtSCARDN.styleName = "CSS0001TextInput";
//			txtACARDN.styleName = "CSS0001TextInput";
//		}else{
//			txtSCARDN.styleName = "CSS0001TextError";
//			txtACARDN.styleName = "CSS0001TextError";
//		}
//		if(bean.SCARCOD == "AX"){
//			txtSCARDN.maxChars = 15;
//			txtACARDN.maxChars = 15;
//		}else{
//			txtSCARDN.maxChars = 16;
//			txtACARDN.maxChars = 16;
//		}
//		if(bean.SDATEXP != bean.ADATEXP){
//			txtSDATEXP.styleName = "CSS0001TextError";
//			txtADATEXP.styleName = "CSS0001TextError";
//		}else{
//			txtSDATEXP.styleName = "CSS0001TextInput";
//			txtADATEXP.styleName = "CSS0001TextInput";
//		}
//		if(bean.SAUTHOC != bean.AAUTHOC){
//			txtSAUTHOC.styleName = "CSS0001TextError";
//			txtAAUTHOC.styleName = "CSS0001TextError";
//		}else{
//			txtSAUTHOC.styleName = "CSS0001TextInput";
//			txtAAUTHOC.styleName = "CSS0001TextInput";
//		}
//		if(bean.SINVN != bean.AINVN){
//			txtSINVN.styleName = "CSS0001TextError";
//			txtAINVN.styleName = "CSS0001TextError";
//		}else{
//			txtSINVN.styleName = "CSS0001TextInput";
//			txtAINVN.styleName = "CSS0001TextInput";
//		}
//		if(bean.SIDATE != bean.AIDATE){
//			txtSIDATE.styleName = "CSS0001TextError";
//			txtAIDATE.styleName = "CSS0001TextError";
//		}else{
//			txtSIDATE.styleName = "CSS0001TextInput";
//			txtAIDATE.styleName = "CSS0001TextInput";
//		}
//		if(bean.SPNR != bean.APNR){
//			txtSPNR.styleName = "CSS0001TextError";
//			txtAPNR.styleName = "CSS0001TextError";
//		}else{
//			txtSPNR.styleName = "CSS0001TextInput";
//			txtAPNR.styleName = "CSS0001TextInput";
//		}
//	}
        //</editor-fold>
        
        //SALES ===================================
        win.setValue('2-txtSDATEL', this.bean.SDATEL.trim());
        win.setValue('2-cmbSFLOAD', this.bean.SFLOAD==="M"?this.bean.SFLOAD:"A");
        win.setValue('2-txtSCOUNTRY', this.bean.SCOUNTRY.trim());
        win.setValue("2-txtSAGENT", this.bean.SAGENT.trim());
        win.setValue('2-txtSDATE', this.bean.SDATE.trim());
        win.setValue("2-txtSPAYMENT", this.bean.SPAYMENT.trim());
        win.setValue("2-txtSTCNTR", this.bean.STCNTR.trim());
        win.setValue('2-txtSVFOP', win.formatDblNumber(this.bean.SVFOP));
        win.setValue('2-txtSCURRENCY', this.bean.SCURRENCY.trim());
        win.setValue('2-txtSCARDN', this.bean.strSCARDN.trim());
        win.setValue('2-txtSDATEXP', this.bean.SDATEXP.trim());
        win.setValue("2-txtSAUTHOC", this.bean.SAUTHOC.trim());
        win.setValue('2-txtSINVN', this.bean.SINVN.trim());
        win.setValue("2-txtSIDATE", this.bean.SIDATE.trim());
        win.setValue("2-txtSPNR", this.bean.SPNR.trim());
        win.setValue("2-txtTRNCU", this.bean.TRNCU.trim());
        //ACCB ===================================
        if(this.bean.AFTE.trim() === 'X'){
            win.setText('2-lblACCBTitulo', 'ACCB BSP Information');
            Ext.create('Ext.tip.ToolTip', {
                target: prototype.id+'-2-lblAFTE',
                html: "ACCB BSP Type"
            });
	}else if(this.bean.AFTE.trim() === 'A'){
            win.setText('2-lblACCBTitulo', 'ACCB ARC Information');
            Ext.create('Ext.tip.ToolTip', {
                target: prototype.id+'-2-lblAFTE',
                html: "ACCB ARC Type"
            });
	}else if(this.bean.AFTE.trim() === 'B' || this.bean.AFTE.trim() === 'N' || this.bean.AFTE.trim() === 'L'){
            win.setText('2-lblACCBTitulo', 'ACCB ASR Information');
            Ext.create('Ext.tip.ToolTip', {
                target: prototype.id+'-2-lblAFTE',
                html: "ACCB ASR Type"
            });
	}else{
            win.setText('2-lblACCBTitulo', 'ACCB Information');
            Ext.create('Ext.tip.ToolTip', {
                target: prototype.id+'-2-lblAFTE',
                html: "ACCB Type"
            });
	}
        win.setText('2-lblAFTE', this.bean.strDescAFTE.trim());
        win.setValue('2-txtADATEL', this.bean.ADATEL.trim());
        win.setValue('2-cmbAFLOAD', this.bean.AFLOAD==="M"?this.bean.AFLOAD:"A");
        win.setValue('2-txtACOUNTRY', this.bean.ACOUNTRY.trim());
        win.setValue('2-txtAAGENT', this.bean.AAGENT.trim());
        win.setValue('2-txtADATE', this.bean.ADATE.trim());
        win.setValue('2-txtAPAYMENT', this.bean.APAYMENT.trim());
        win.setValue('2-txtATCNTR', this.bean.ATCNTR.trim());
        win.setValue('2-txtAVFOP', win.formatDblNumber(this.bean.AVFOP));
        win.setValue('2-txtACURRENCY', this.bean.ACURRENCY.trim());
        win.setValue('2-txtACARDN', this.bean.ACARDN.trim());
        win.setValue('2-txtADATEXP', this.bean.ADATEXP.trim());
        win.setValue('2-txtAAUTHOC', this.bean.AAUTHOC.trim());
        win.setValue('2-txtAINVN', this.bean.AINVN.trim());
        win.setValue('2-txtAIDATE', this.bean.AIDATE.trim());
        win.setValue('2-txtAPNR', this.bean.APNR.trim());
	if(this.bean.strDescMerchn.trim() !== ''){
            win.setValue('2-txtMERCHN', this.bean.MERCHN.trim()+' - '+this.bean.strDescMerchn.trim());
	}else{
            win.setValue('2-txtMERCHN', this.bean.MERCHN.trim());
	}
        win.setValue('2-txtSEQNUM', this.bean.SEQNUM.trim());
        win.setValue('2-txtSEQCOUNT', this.bean.SEQCOUNT.trim());
        win.setValue('2-txtComment', this.bean.strComment.trim());
	//TEF ===================================
        win.setValue('2-txtTDATE', this.bean.TDATE.trim());
        win.setValue('2-txtDATEF', this.bean.DATEF.trim());
	//BANKS ===================================
        win.setValue('2-txtBDATEL', this.bean.BDATEL.trim());
        win.setValue('2-cmbBSTVAL', this.bean.BSTVAL);
        win.setValue('2-txtBDATEP', this.bean.BDATEP.trim());
        win.setValue('2-cmbBSTVALP', this.bean.BSTVALP);
        win.setValue('2-cmbFNOBANK', this.bean.FNOBANK);
	
        win.setValue('2-txtDATEC', this.bean.DATEC.trim());
        win.setValue('2-txtCREJEC', this.bean.CREJEC.trim());
        win.setValue('2-txtError', this.bean.CERROR.trim());
        win.setValue('2-txtDescError', this.bean.strDescripcion.trim());
	
	if(this.bean.FADYEN == 'Y'){
            win.setValue('2-chkFADYEN', true);
//            chkFADYEN.setStyle('color', '#128b1b');
	}else{
            win.setValue('2-chkFADYEN', false);
//            chkFADYEN.setStyle('color', '#0B333C');
	}
        win.setValue('2-txtDATEC2', this.bean.DATEC2.trim());
        win.setValue('2-txtDATEC3', this.bean.DATEC3.trim());
	
        win.setValue('2-txtUSCR', this.bean.USCR.trim());
        win.setValue('2-txtFECR', this.bean.FECR.trim());
        win.setValue('2-txtHOCR', this.bean.HOCR.trim());
        win.setValue('2-txtUSUP', this.bean.USUP.trim());
        win.setValue('2-txtFEUP', this.bean.FEUP.trim());
        win.setValue('2-txtHOUP', this.bean.HOUP.trim());
    },
    //</editor-fold>
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    }
});