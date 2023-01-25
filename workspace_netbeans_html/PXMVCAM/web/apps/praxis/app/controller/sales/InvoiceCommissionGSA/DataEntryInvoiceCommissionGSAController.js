Ext.define('Ext.Praxis.controller.sales.InvoiceCommissionGSA.DataEntryInvoiceCommissionGSAController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryInvoiceCommissionGSAController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    paramsTotalPreFactGSA: {},
    msjAlert: '',
    meDE: '',
    // </editor-fold>
    init: function(view) {
        meDE = this;
        this.get_ClearField();
    },
    afterRender: function(){
        this.p = this.view.params;
        switch( this.p.action ){
            case 'U':
                this.mostrarData(this.p.data);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').show();
                Ext.getCmp(prototype.id+'-btn-delete').show();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                Ext.getCmp(prototype.id+'-txtA1826GSA2').setReadOnly(true);
                Ext.getCmp(prototype.id+'-txtA1826NFACT').setReadOnly(true);
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                this.focus('txtA1826GSA2');
                break;
        }
    },
    onValidaCodeGSABlur: function(cmp) {
        var VP_OPTION = 'G';
        var VP_PARAM = cmp.rawValue;
        if(VP_PARAM!=='') this.getPX112S03A1757(VP_OPTION, VP_PARAM);
    },
    onTipo_invoiceChange: function(cmp, newValue) {
        this.setValue('txtA1826LOTE2', '');
        this.setValue('txtA1826FPROC', '');
        this.setValue('txtA1826MONED', '');
        this.setValue('txtA1826TCOM', '0.00');
        this.setValue('txtA1826TCOM_PRE', '0.00');
        this.setValue('txtA1826TCOM_DIF', '0.00');
        this.setValue('txtA1826STATU', '');
        switch (newValue) {
            case 'C':
                Ext.getCmp(prototype.id+'-txtA1826LOTE2').setReadOnly(false);
                Ext.getCmp(prototype.id+'-txtA1826FPROC').setReadOnly(true);
                this.focus('txtA1826LOTE2');
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-txtA1826LOTE2').setReadOnly(false);
                Ext.getCmp(prototype.id+'-txtA1826FPROC').setReadOnly(true);
                this.focus('txtA1826LOTE2');
                break;
            case 'N':
                Ext.getCmp(prototype.id+'-txtA1826LOTE2').setReadOnly(true);
                Ext.getCmp(prototype.id+'-txtA1826FPROC').setReadOnly(false);
                this.focus('txtA1826FPROC');
                break;
        }
    },
    onTotalPrefChange: function(cmp, newValue) {
        this.getTotalPref(newValue);
    },
    onTCOMBlur: function() {
        this.getTotalPref();
    },
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(data) {
        this.setValue('txtA1839RSOC', data.A1839RSOC.trim());
        this.setValue('txtA1826FFACT2', this.parseStringToDate(data.A1826FFACT.trim()));
        this.setValue('txtA1826GSA2', data.A1826GSA.trim());
        this.setValue('txtA1826LOTE2', data.A1826LOTE.trim());
        this.setValue('txtA1826MONED', data.A1826MONED.trim());
        this.setValue('txtA1826NFACT', data.A1826NFACT.trim());
        this.setValue('txtA1826SEQ', data.A1826SEQ.trim());
        this.setValue('txtA1826STATU', data.A1826STATU.trim());
        this.setValue('cbmtipo_invoice', data.TFACTURA);
        // Invoice
        this.setValue('txtA1826TCOM', Ext.util.Format.number(data.A1826TCOM, '0,000.00'));
        // Dtos de pre.factura
        this.getTotalPref();
        
        // <editor-fold defaultstate="collapsed" desc="DATOS DE AUDITORIA">
        this.setValue('USCR', data.A1826REGIS.trim());
        this.setValue('FECR', this.parseStringToDate(data.A1826FREGI.trim()));
        this.setValue('HOCR', data.A1826HREGI.trim());
        this.setValue('USUP', data.A1826REVIS.trim());
        this.setValue('FEUP', this.parseStringToDate(data.A1826FREVI.trim()));
        this.setValue('HOUP', data.A1826HREVI.trim());
        // </editor-fold>
    },
    // </editor-fold>
    
    // Obtiene Datos de Prefactura event:KeyboardEvent
    getTotalPref: function(newValue) {
        this.setFormatParameter(newValue);
        if (this.validaRequiredFields()) {
            // OBTENER DATOS CON EL LOTE
            this.setValue('txtA1826MONED', '');
            this.setValue('txtA1826TCOM_PRE', '0.0');
            this.setValue('txtA1826TCOM_DIF', '0.0');
            var A1826TCOM = Number(this.getValue('txtA1826TCOM').replace(",","").replace(",",""));
            
            if (A1826TCOM!==0) this.getTotalPreFactGSA();
        } else {
            if (this.msjAlert==='') global.Msg({ msg: 'You must enter all required fields.' });
            else global.Msg({ msg: this.msjAlert });
        }
    },
    parseStringToDate: function(fecha, separador) {
        separador = separador === null || separador === undefined ? "/" : "";
        if (fecha.length===8)
            fecha = fecha.substring(0,4)+separador+fecha.substring(4,6)+separador+fecha.substring(6,8);
        return fecha;
    },
    
    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function(newValue) {
        paramsTotalPreFactGSA = {};
        
        newValue = newValue===undefined?'':Ext.util.Format.date(new Date(newValue), 'Ym');
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var txtA1826GSA = this.getValue("txtA1826GSA2").trim();
        var txtA1826LOTE = this.getValue("txtA1826LOTE2").trim();
        var txtA1826FPROC = newValue===''?Ext.util.Format.date(this.getValue("txtA1826FPROC"), 'Ym') : newValue;
        var cbmtipo_invoice = this.getValue("cbmtipo_invoice").trim();
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        paramsTotalPreFactGSA = {
            VP_CCUST: '139',
            VP_GSA: txtA1826GSA,
            VP_LOTE: txtA1826LOTE,
            VP_FPROC_LOTE: txtA1826FPROC,
            VP_TYPE_COMM: cbmtipo_invoice
        };
        // </editor-fold>
    },
    setFormatParameterCRUD: function() {
        paramsTotalPreFactGSA = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var txtA1826GSA = this.getValue("txtA1826GSA2");
        var txtA1826LOTE = this.getValue("txtA1826LOTE2");
        var txtA1826FPROC = Ext.util.Format.date(this.getValue("txtA1826FPROC"), 'Ym');
        var txtA1826MONED = this.getValue("txtA1826MONED");
        var txtA1826TCOM = this.getValue("txtA1826TCOM").replace(",","").replace(",","");
        var txtA1826NFACT = this.getValue("txtA1826NFACT");
        var txtA1826FFACT = Ext.util.Format.date(this.getValue("txtA1826FFACT2"), 'Ymd');
        var txtA1826STATU = this.getValue("txtA1826STATU");
        var txtA1826SEQ = this.getValue("txtA1826SEQ");
        var cbmtipo_invoice = this.getValue("cbmtipo_invoice");
        var cbmPeriod = this.getValue("cbmPeriod");
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        paramsTotalPreFactGSA = {
            VP_A1826CCUST: '139',
            VP_A1826LOTE: txtA1826LOTE,
            VP_A1826GSA: txtA1826GSA,
            VP_A1826FPROC: txtA1826FPROC,
            VP_A1826MONED: txtA1826MONED,
            VP_A1826TCOM: txtA1826TCOM,
            VP_A1826NFACT: txtA1826NFACT,
            VP_A1826FFACT: txtA1826FFACT===null?'':txtA1826FFACT,
            VP_A1826STATU: txtA1826STATU,
            VP_A1826SEQ: txtA1826SEQ,
            VP_A1826TFAC: cbmtipo_invoice,
            VP_A1826TPER: cbmPeriod
        };
        // </editor-fold>
    },
    setFormatParameterDelete: function() {
        paramsTotalPreFactGSA = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var txtA1826GSA = this.getValue("txtA1826GSA2");
        var txtA1826NFACT = this.getValue("txtA1826NFACT");
        var txtA1826SEQ = this.getValue("txtA1826SEQ");
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        paramsTotalPreFactGSA = {
            VP_A1826CCUST: '139',
            VP_A1826LOTE: '',
            VP_A1826GSA: txtA1826GSA,
            VP_A1826FPROC: '',
            VP_A1826MONED: '',
            VP_A1826TCOM: '',
            VP_A1826NFACT: txtA1826NFACT,
            VP_A1826FFACT: '',
            VP_A1826STATU: '',
            VP_A1826SEQ: txtA1826SEQ,
            VP_A1826TFAC: '',
            VP_A1826TPER: ''
        };
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function(btn) {
        this.setFormatParameterCRUD();
        if (this.validaRequiredFieldsCRUD()) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        paramsTotalPreFactGSA.VP_ACTION = 'I';
                        this.setPX144S02A1826();
                    }
                }
            });
        } else {
            if (this.msjAlert === '') global.Msg({msg: 'You must enter all required fields.'});
            else global.Msg({ msg: this.msjAlert});
        }
    },
    onUpdateClick: function(btn) {
        this.setFormatParameterCRUD();
        if (this.validaRequiredFieldsCRUD()) {
            Ext.Msg.show({
                title:'.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                animateTarget: btn,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn){
                    if (btn === 'yes'){
                        paramsTotalPreFactGSA.VP_ACTION = 'U';
                        this.setPX144S02A1826();
                    }
                }
            });
        } else {
            if (this.msjAlert === '') global.Msg({msg: 'You must enter all required fields.'});
            else global.Msg({ msg: this.msjAlert});
        }
    },
    onDeleteClick: function(btn) {
        this.setFormatParameterDelete();
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    paramsTotalPreFactGSA.VP_ACTION = 'D';
                    this.setPX144S02A1826();
                }
            }
        });
    },
    onCancelClick: function(){
        this.view.close();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Ext.Ajax.request">
    // <editor-fold defaultstate="collapsed" desc="getTotalPreFactGSA">
    getTotalPreFactGSA: function() {
        Ext.Ajax.request({
            url: prototype.url+'/getTotalPreFactGSA',
            method: 'POST',
            timeout: 60000000,
            params: paramsTotalPreFactGSA,
//            beforerequest: Ext.getCmp('DataEntryInvoiceCommissionGSAForm').mask('Loading...'),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lst_TotalPreFact = res.lst_TotalPreFactGSA;
                    if (lst_TotalPreFact.length>0) {
                        var data = lst_TotalPreFact[0];
                        meDE.setValue('txtA1826TCOM_PRE', Ext.util.Format.number(data.TOT_COMM_GIVE, '0,000.00'));
                        meDE.setValue('txtA1826MONED', data.MONEDA_PAGO);
                        meDE.set_Calculatedifference();
                    } else {
                        meDE.setValue('txtA1826LOTE2', '');
                        meDE.focus('txtA1826LOTE2');
                        global.Msg({
                            msg: 'Amount Commission Not Found'
                        });
                    }
                } else global.Msg({ msg: res.sesion });
//                Ext.getCmp('DataEntryInvoiceCommissionGSAForm').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
//                Ext.getCmp('DataEntryInvoiceCommissionGSAForm').unmask();
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="getPX112S03A1757">
    getPX112S03A1757: function(VP_OPTION, VP_PARAM) {
        Ext.Ajax.request({
            url: prototype.url+'/getPX112S03A1757',
            method: 'POST',
            timeout: 60000000,
            params: {
                VP_OPTION: VP_OPTION,
                VP_PARAM: VP_PARAM
            },
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstDataVar = res.lstDataVar;
                    if(lstDataVar!==undefined) me.setValue('txtA1839RSOC', lstDataVar);
                    else global.Msg({ msg: 'GSA Code Not Found' });
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="setPX144S02A1826">
    setPX144S02A1826: function() {
        Ext.Ajax.request({
            url: prototype.url+'/setPX144S02A1826',
            method: 'POST',
            timeout: 60000000,
            params: paramsTotalPreFactGSA,
            beforerequest: Ext.getCmp('DataEntryInvoiceCommissionGSAForm').mask('Loading...'),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var MESSAGE = res.MESSAGE;
                    var SQLCODE = Number(res.SQLCODE);
                    global.Msg({ msg: MESSAGE });
                    if(SQLCODE===0) {
                        meDE.onCancelClick();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                    else {
                        meDE.get_ClearField();
                        meDE.focus('txtA1826GSA2');
                    }
                } else global.Msg({ msg: res.sesion });
                Ext.getCmp('DataEntryInvoiceCommissionGSAForm').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp('DataEntryInvoiceCommissionGSAForm').unmask();
            }
        });
    },
    // </editor-fold>
    // </editor-fold>
    
    set_Calculatedifference: function() {
        var A1826CAMCO = Number(this.getValue('txtA1826TCOM').replace(",","").replace(",",""));
        var A1826TCOM_PRE = Number(this.getValue('txtA1826TCOM_PRE').replace(",","").replace(",",""));
        this.setValue('txtA1826TCOM_DIF', Ext.util.Format.number(A1826CAMCO-A1826TCOM_PRE, '0,000.00'));
        this.set_pone_estado();
    },
    set_pone_estado: function() {
        var A1826TCOM_DIF = Number(this.getValue('txtA1826TCOM_DIF').replace(",","").replace(",",""));
//        var A1826CAMCO = Number(this.getValue('txtA1826TCOM').replace(",","").replace(",",""));
//        var A1826TCOM_PRE = Number(this.getValue('txtA1826TCOM_PRE').replace(",","").replace(",",""));
        Ext.getCmp(prototype.id+'-txtA1826STATU').setReadOnly(true);
        if (A1826TCOM_DIF===0) this.setValue('txtA1826STATU', 'A');
        else this.setValue('txtA1826STATU', 'D');
    },
    
    // <editor-fold defaultstate="collapsed" desc="validaRequiredFields">
    validaRequiredFields: function() {
        if (paramsTotalPreFactGSA.VP_TYPE_COMM==='C' || paramsTotalPreFactGSA.VP_TYPE_COMM==='I') {
            if (paramsTotalPreFactGSA.VP_GSA==='' && paramsTotalPreFactGSA.VP_LOTE!=='') {
                console.log("filter 1");
                this.msjAlert = 'Enter GSA Code And Lote number';
                this.focus('txtA1826GSA2');
                return false;
            }
        }
        if (paramsTotalPreFactGSA.VP_TYPE_COMM==='N') {
            if (paramsTotalPreFactGSA.VP_GSA==='') {
                console.log("filter 2");
                this.msjAlert = 'Enter GSA Code ';
                this.focus('txtA1826GSA2');
                return false;
            }
            if (paramsTotalPreFactGSA.VP_FPROC_LOTE==='') {
                console.log("filter 3");
                this.msjAlert = 'Enter Date Process Invoice ';
                this.focus('txtA1826FPROC');
                return false;
            }
        }
        return true;
    },
    validaRequiredFieldsCRUD: function() {
        var A1826TCOM_DIF = Number(this.getValue('txtA1826TCOM_DIF').replace(",","").replace(",",""));
        if (paramsTotalPreFactGSA.VP_A1826GSA==='') {
            this.msjAlert = 'Required Field, GSA Code ';
            this.focus('txtA1826GSA2');
            return false;
        }
        // COMMISION BSP,ASR 
        if (paramsTotalPreFactGSA.VP_A1826TFAC==='C' || paramsTotalPreFactGSA.VP_A1826TFAC==='I') {
            if (paramsTotalPreFactGSA.VP_A1826NFACT==='') {
                this.msjAlert = 'Required Field, Invoice number ';
                this.focus('txtA1826NFACT');
                return false;
            }
            if (paramsTotalPreFactGSA.VP_A1826FFACT==='') {
                this.msjAlert = 'Required Field, Invoice date ';
                this.focus('txtA1826FFACT2');
                return false;
            }
        }
        // INTERLINE COMM
        if (paramsTotalPreFactGSA.VP_A1826TPER==='N') {
            // TMP CONFIRMA COMO SE BUSCA EL PRAXIS.WRF070  NO EXISTE CODE GSA
            if (paramsTotalPreFactGSA.VP_A1826FPROC==='') {
                this.msjAlert = 'Required Field, Date Process Commision ';
                this.focus('txtA1826FFACT2');
                return false;
            }
        }
        if (paramsTotalPreFactGSA.VP_A1826MONED==='') {
            this.msjAlert = 'Required Field, Currency';
            this.focus('txtA1826MONED');
            return false;
        }
        if (A1826TCOM_DIF!==0) {
            this.msjAlert = 'The commission amount is not equal';
            this.focus('txtA1826MONED');
            return false;
        }
        if (Number(paramsTotalPreFactGSA.VP_A1826TCOM)===0) {
            this.msjAlert = 'Enter commission amount';
            this.focus('txtA1826TCOM');
            return false;
        }
        if (paramsTotalPreFactGSA.VP_A1826STATU!=='A') {
            this.msjAlert = 'Invoice status no match';
            return false;
        }
        var temp = Ext.getCmp(prototype.id+'-txtA1826FFACT2').getErrors();
        if (temp.length>0) {
            this.msjAlert = temp[0];
            this.focus('txtA1826FFACT2');
            return false;
        }
        return true;
    },
    // </editor-fold>
    
    get_ClearField: function() {
        this.setValue('txtA1839RSOC', '');
        this.setValue('txtA1826FFACT2', '');
        this.setValue('txtA1826GSA2', '');
        this.setValue('txtA1826LOTE2', '');
        this.setValue('txtA1826MONED', '');
        this.setValue('txtA1826NFACT', '');
        this.setValue('txtA1826SEQ', '');
        this.setValue('txtA1826STATU', '');
        this.setValue('txtA1826TCOM', '0.00');
        this.setValue('txtA1826TCOM_PRE', '0.00');
        this.setValue('txtA1826TCOM_DIF', '0.00');
    },
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});