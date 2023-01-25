Ext.define('Ext.Praxis.controller.payments.UnmatchedTransactions.DataEntryUnmatchedTransactionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryUnmatchedTransactionsController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function(view) {
        prototype.id = 'UnmatchedTransactionsForm';
        prototype.url = CONTEXTPATH + '/UnmatchedTransactions';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
    },
    afterRender: function() {
        this.obtainData();
        switch (this.actionCode) {
//            case 'I':
//                Ext.getCmp(prototype.id + '-btn-save').show();
//                Ext.getCmp(prototype.id + '-btn-update').hide();
//                Ext.getCmp(prototype.id + '-btn-delete').hide();
//                Ext.getCmp(prototype.id + '-btn-cancel').show();
//                break;
            case 'U':
                this.getData();
//                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                Ext.getCmp(prototype.id + '-btn-imgPrev').show();
                Ext.getCmp(prototype.id + '-btn-imgNext').show();
                break;
        }
    },
    mostrarData: function() {
//        console.log(meDE.beanResult);
        this.setValue('de-txtTicket', this.beanResult.strTicket);
        this.setValue('de-txtSEQ', this.beanResult.SEQ);
        
        if(this.beanResult.TDOC === 'R'){
            this.setValue('de-cmbTDOC', 'Refund');
	}else if(this.beanResult.TDOC === 'S'){
            this.setValue('de-cmbTDOC', 'Sales');
	}
        
//        console.log(this.beanResult.FTE);
        if(this.beanResult.FTE === 'B'){
            this.setValue('de-cmbFTE', 'BSP');
	}else if(this.beanResult.FTE === 'A'){
            this.setValue('de-cmbFTE', 'ARC');
	}else if(this.beanResult.FTE === 'S'){
            this.setValue('de-cmbFTE', 'ASR');
        }
        
//        console.log(this.beanResult.STVAL);
        if(this.beanResult.STVAL === '1'){
            this.setValue('de-cmbSTVAL', 'Match');
	}else if(this.beanResult.STVAL === '2'){
            this.setValue('de-cmbSTVAL', 'Sales without ACCB');
	}else if(this.beanResult.STVAL === '3'){
            this.setValue('de-cmbSTVAL', 'ACCB without Sales');
        }else if(this.beanResult.STVAL === '4'){
            this.setValue('de-cmbSTVAL', 'Match with Differences');
        }else if(this.beanResult.STVAL === '5'){
            this.setValue('de-cmbSTVAL', 'Match with Differences');
        }
        
        this.setValue('de-txtSCARCOD', this.beanResult.SCARCOD);
//        if(this.beanResult.CERROR === "13" || this.beanResult.CERROR === "14"){
//		txtSVFOP.styleName = "CSS0001TextError";
//		txtAVFOP.styleName = "CSS0001TextError";	
//	}else {
//            if(this.beanResult.SCOUNTRY != this.beanResult.ACOUNTRY){
//                    txtSCOUNTRY.styleName = "CSS0001TextError";
//                    txtACOUNTRY.styleName = "CSS0001TextError";
//            }else{
//                    txtSCOUNTRY.styleName = "CSS0001TextInput";
//                    txtACOUNTRY.styleName = "CSS0001TextInput";
//            }
//        }
        this.setValue('de-txtSDATEL', this.beanResult.SDATEL);
//        console.log(this.beanResult.SFLOAD);
	if(this.beanResult.SFLOAD === 'M'){
            this.setValue('de-cmbSFLOAD', 'Manual');
	}else{
            this.setValue('de-cmbSFLOAD', 'Automatic');
	}
        
        this.setValue('de-txtSCOUNTRY', this.beanResult.SCOUNTRY);
        this.setValue('de-txtSAGENT', this.beanResult.SAGENT);
        this.setValue('de-txtSDATE', this.beanResult.SDATE);
        this.setValue('de-txtSPAYMENT', this.beanResult.SPAYMENT);
        this.setValue('de-txtSTCNTR', this.beanResult.STCNTR);
        
        this.setValue('de-txtSVFOP', Ext.util.Format.number(this.beanResult.SVFOP, '0,000.00'));
        this.setValue('de-txtSCURRENCY', this.beanResult.SCURRENCY);
        this.setValue('de-txtSCARDN', this.beanResult.strSCARDN);
        this.setValue('de-txtSDATEXP', this.beanResult.SDATEXP);
        this.setValue('de-txtSAUTHOC', this.beanResult.SAUTHOC);
        this.setValue('de-txtSINVN', this.beanResult.SINVN);
        this.setValue('de-txtSIDATE', this.beanResult.SIDATE);
        this.setValue('de-txtSPNR', this.beanResult.SPNR);
        this.setValue('de-txtTRNCU', this.beanResult.TRNCU);
        
        //ACCB ===================================
        console.log(this.beanResult.AFTE.trim());
	if(this.beanResult.AFTE.trim() === 'X'){
//            this.setText('de-lblACCBTitulo', "ACCB BSP Information");
            Ext.getCmp(prototype.id + '-de-lblACCBTitulo').setText('ACCB BSP Information');
//            lblAFTE.toolTip = "ACCB BSP Type";
	}else if(this.beanResult.AFTE.trim() === 'A'){
//            this.setText('de-lblACCBTitulo', "ACCB ARC Information");
            Ext.getCmp(prototype.id + '-de-lblACCBTitulo').setText('ACCB ARC Information');
//            lblAFTE.toolTip = "ACCB ARC Type";
	}else if(this.beanResult.AFTE.trim() === 'B' || this.beanResult.AFTE.trim() === 'N' || this.beanResult.AFTE.trim() === 'L'){
//            this.setText('de-lblACCBTitulo', "ACCB ASR Information");
            Ext.getCmp(prototype.id + '-de-lblACCBTitulo').setText('ACCB ASR Information');
//            lblAFTE.toolTip = "ACCB ASR Type";
	}
        else{
//            this.setText('de-lblACCBTitulo', "ACCB Information");
            Ext.getCmp(prototype.id + '-de-lblACCBTitulo').setText('ACCB Information');
//            lblAFTE.toolTip = "ACCB Type";
	}
        this.setValue('de-txtACARCOD', this.beanResult.ACARCOD.trim());
        
//        this.setValue('de-lblAFTE', this.beanResult.strDescAFTE.trim());
        this.setValue('de-txtADATEL', this.beanResult.ADATEL.trim());
        
        if(this.beanResult.AFLOAD === 'M'){
            this.setValue('de-cmbAFLOAD', 'Manual');
	}else{
            this.setValue('de-cmbAFLOAD', 'Automatic');
	}
                
        this.setValue('de-txtACOUNTRY', this.beanResult.ACOUNTRY.trim());
        this.setValue('de-txtAAGENT', this.beanResult.AAGENT.trim());
        this.setValue('de-txtADATE', this.beanResult.ADATE.trim());
        this.setValue('de-txtAPAYMENT', this.beanResult.APAYMENT.trim());
        
        this.setValue('de-txtATCNTR', this.beanResult.ATCNTR.trim());
        this.setValue('de-txtAVFOP', Ext.util.Format.number(this.beanResult.AVFOP, '0,000.00'));
        this.setValue('de-txtACURRENCY', this.beanResult.ACURRENCY.trim());
        this.setValue('de-txtACARDN', this.beanResult.ACARDN.trim());
        this.setValue('de-txtADATEXP', this.beanResult.ADATEXP.trim());
        this.setValue('de-txtAAUTHOC', this.beanResult.AAUTHOC.trim());
        this.setValue('de-txtAINVN', this.beanResult.AINVN.trim());
        this.setValue('de-txtAIDATE', this.beanResult.AIDATE.trim());
        this.setValue('de-txtAPNR', this.beanResult.APNR.trim());
        
        if(this.beanResult.strDescMerchn !== ''){
            this.setValue('de-txtMERCHN', this.beanResult.MERCHN.trim() + '-' + this.beanResult.strDescMerchn.trim());
	}else{
            this.setValue('de-txtMERCHN', this.beanResult.MERCHN.trim());
	}
        
        this.setValue('de-txtSEQNUM', this.beanResult.SEQNUM.trim());
        this.setValue('de-txtSEQCOUNT', this.beanResult.SEQCOUNT.trim());
        this.setValue('de-txtComment', this.beanResult.strComment.trim());
        
        //TEF ===================================
        this.setValue('de-txtTDATE', this.beanResult.TDATE.trim());
        this.setValue('de-txtDATEF', this.beanResult.DATEF.trim());
        
        //BANKS ===================================
        this.setValue('de-txtBDATEL', this.beanResult.BDATEL.trim());
        
        if(this.beanResult.BSTVAL === '1'){
            this.setValue('de-cmbBSTVAL', 'Accepted');
	}else if(this.beanResult.BSTVAL === '2'){
            this.setValue('de-cmbBSTVAL', 'Rejected');
	}else if(this.beanResult.BSTVAL === '3'){
            this.setValue('de-cmbBSTVAL', 'Suspect');
	}
        
        this.setValue('de-txtBDATEP', this.beanResult.BDATEP.trim());
        
        if(this.beanResult.BSTVALP === ''){
            this.setValue('de-cmbBSTVALP', 'Pending');
	}else if(this.beanResult.BSTVALP === '1'){
            this.setValue('de-cmbBSTVALP', 'Paid');
	}
        
        if(this.beanResult.FNOBANK === 'B'){
            this.setValue('de-cmbFNOBANK', 'Original Boomers');
	}else if(this.beanResult.FNOBANK === 'A'){
            this.setValue('de-cmbFNOBANK', 'Additional Boomers');
	}else if(this.beanResult.FNOBANK === 'P'){
            this.setValue('de-cmbFNOBANK', 'Paypal');
	}else if(this.beanResult.FNOBANK === 'U'){
            this.setValue('de-cmbFNOBANK', 'UATP');
	}
        
        this.setValue('de-txtDATEC', this.beanResult.DATEC.trim());
        this.setValue('de-txtCREJEC', this.beanResult.CREJEC.trim());
        this.setValue('de-txtError', this.beanResult.CERROR.trim());
        this.setValue('de-txtDescError', this.beanResult.strDescripcion.trim());
        
//        if(this.beanResult.FADYEN === 'Y'){
//            this.setValue('de-chkFADYEN', true);
//	}else{
//            this.setValue('de-chkFADYEN', false);
//	}
        
        this.setValue('de-txtDATEC2', this.beanResult.DATEC2.trim());
        this.setValue('de-txtDATEC3', this.beanResult.DATEC3.trim());

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },
    
    
    obtainData: function() {
        
        var cmbTDOC = Ext.getCmp(prototype.id + '-de-cmbTDOC');
        cmbTDOC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["S", "Sales"],
                ["R", "Refund"],
            ]
        }));
        cmbTDOC.setValue('');
        
        var cmbFTE = Ext.getCmp(prototype.id + '-de-cmbFTE');
        cmbFTE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["B", "BSP"],
                ["A", "ARC"],
                ["S", "ASR"]
            ]
        }));
        cmbFTE.setValue('');
        
        var cmbSTVAL = Ext.getCmp(prototype.id + '-de-cmbSTVAL');
        cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["1", "Match"],
                ["2", "Sales without ACCB"],
                ["3", "ACCB without Sales"],
                ["4", "Match with Differences"],
                ["5", "Match Manual"]
            ]
        }));
        cmbSTVAL.setValue('');
        
        var cmbSFLOAD = Ext.getCmp(prototype.id + '-de-cmbSFLOAD');
        cmbSFLOAD.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["A", "Automatic"],
                ["M", "Manual"]
            ]
        }));
        cmbSFLOAD.setValue('');
        
        var cmbAFLOAD = Ext.getCmp(prototype.id + '-de-cmbAFLOAD');
        cmbAFLOAD.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["A", "Automatic"],
                ["M", "Manual"]
            ]
        }));
        cmbAFLOAD.setValue('');
        
        var cmbFNOBANK = Ext.getCmp(prototype.id + '-de-cmbFNOBANK');
        cmbFNOBANK.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Bank"],
                ["B", "Original Boomers"],
                ["A", "Additional Boomers"],
                ["P", "Paypal"],
                ["U", "UATP"]
            ]
        }));
        cmbFNOBANK.setValue('');
        
        var cmbBSTVAL = Ext.getCmp(prototype.id + '-de-cmbBSTVAL');
        cmbBSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["1", "Accepted"],
                ["2", "Rejected"],
                ["3", "Suspect"]
            ]
        }));
        cmbBSTVAL.setValue('');
        
        var cmbBSTVALP = Ext.getCmp(prototype.id + '-de-cmbBSTVALP');
        cmbBSTVALP.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Pending"],
                ["1", "Paid"]
            ]
        }));
        cmbBSTVALP.setValue('');
        
    },
    
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
//        console.log('llenarData');
//        beanTemp.CODEBANK = this.getValue("de-txtCODEBANK");
//       
//        beanTemp.DOCNUM = this.getValue("txtDOCNUM");
//        if (beanTemp.RATEIVA.trim() === '') {
//            beanTemp.DOCNUM = 0;
//        }
//        beanTemp.USCR = this.getValue("txtUSCR").trim();
//        beanTemp.FECR = this.getValue("txtFECR").trim();
//        beanTemp.HOCR = this.getValue("txtHOCR").trim();
//        beanTemp.USUP = this.getValue("txtUSUP").trim();
//        beanTemp.FEUP = this.getValue("txtFEUP").trim();
//        beanTemp.HOUP = this.getValue("txtHOUP").trim();
//
//        console.log(beanTemp);
    },
    //</editor-fold>
    getData: function() {
        var beanString = JSON.stringify(meDE.bean.data);
        Ext.Ajax.request({
            url: prototype.url + '/searchBean',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
                meDE.beanResult = res.data;
                meDE.mostrarData();
            }
        });
    },

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
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
    },
    //</editor-fold>
    toUpperCase: function(obj, value, opts) {
//        console.log(obj);
//        console.log(value);
//        console.log(opts);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);
//                    console.log('onSaveClick');
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        this.maintenanceBean(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });         
    },
    onUpdateClick: function(btn) {
//        console.log('onUpdateClick');
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update ?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function(btn) {
                        if (btn === 'yes') {
                            var beanTemp = {};
                            this.llenarData(beanTemp);
                            beanTemp.option = 'U';
                            this.maintenanceBean(beanTemp);
                        }
                    }
                });
    },
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
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    beanTemp.option = 'D';
                    this.maintenanceBean(beanTemp);
                }
            }
        });
    },
    onCancelClick: function(btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    maintenanceBean: function(beanTemp) {
//        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/maintenanceBean',
            method: 'POST',
            timeout: 60000000,
            params: beanTemp,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function(response, opts) {
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

    validacionInsert: function(beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtCODEBANK") === '' || this.getValue("de-cmbCOUNTRY") === '' || this.getValue("de-txtCURRENC") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function() {

        Ext.getCmp(prototype.id + '-de-cmbCOUNTRY').setReadOnly(true);
    },
    Habilitarlbl: function() {
        Ext.getCmp(prototype.id + '-lblDescripcion').show();
        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function() {
        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
            Ext.getCmp(prototype.id + '-lbldes').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes').show();
        }
    },
    Habilitarlbl1: function() {
        Ext.getCmp(prototype.id + '-lbldes').hide();
        if (this.getValue("txtCODSOUR") === '') {
            Ext.getCmp(prototype.id + '-lbldes2').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes2').show();
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
//            this.btnSearch_click();
        }
    }
// </editor-fold>
});