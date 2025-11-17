/* global callbackMostrarData */

Ext.define('Ext.Praxis.controller.payments.BankReconciliation.DataEntryPendingBankReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryPendingBankReconciliationController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanTemp: {},
    beanResult: {},
    
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    copia: '',
    // </editor-fold>
    init: function (view) {
        prototype.id = 'BankReconciliationForm';
        prototype.url = CONTEXTPATH + '/BankReconciliation';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.listaPaises;
        
        
        
        

    },
    
   
    afterRender: function () {
        
        console.log("FERNADNO TORRES");
        console.log('Datos recibidos del registro:', this.bean);
        
 
  ////////////////////////////////////////////////////////////////////////////
 ///////////////////OBETENEMOS EL CBO REUTILZANDO LA LISTA/////////////////////////
 ///////////////////////SOLO SE USA CUANDO ES ALGO QUE NO PUEDE CAMBIAR COMO PAISES//////

        var obtenerLista = Ext.create('Ext.data.Store', {
//            data: this.lstCountry,
            autoLoad: true
        });

//        Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY').bindStore(obtenerLista);
//        Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY').setValue('');
//        
       
         
         

        switch (this.actionCode) {
            
           
            case 'I':

                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.mostrarData();

                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {
        
         var statusTxt = '';
         var conceptTxt = '';
         var adjtTxt = '';
                     

        switch (this.bean.O_STATUS) {
            case '3':
            case 3:
                statusTxt = 'Pending';
                break;
            default:
                statusTxt = 'Match';
        }
        this.setValue('txtSTATUSMPF199', statusTxt);


            
        switch ((this.bean.O_CONCEPT || '').trim()) {
            case 'P':
                conceptTxt = 'Positive';
                break;
            case 'N':
                conceptTxt = 'Negative';
                break;
            case 'X':
                conceptTxt = 'No Billing';
                break;
            case 'A':
                conceptTxt = 'Adjustment';
                break;
            case 'M':
                conceptTxt = 'Automatic';
                break;
            case 'C':
                conceptTxt = 'Compensation';
                break;
            default:
                conceptTxt = '';
        }
        this.setValue('txtCONCEPTMPF199', conceptTxt);

        
        switch ((this.bean.O_TADJ || '').trim()) {
             case 'N':
                adjtTxt = 'Non Remmitance';
                break;
            case 'R':
                adjtTxt = 'Recovery';
                break;
            case 'U':
                adjtTxt = 'Uncleared';
                break;
            case 'E':
                adjtTxt = 'Excess';
                break;
            case 'S':
                adjtTxt = 'Short';
                break;
            default:
                conceptTxt = '';
            
        }
        this.setValue('txtATYPEMPF199', adjtTxt);
        
        this.setValue('txtAGENTMPF199', this.bean.O_SAGENT);
        this.setValue('txtVALUEDATEMPF199', this.bean.O_ADATE);
        this.setValue('txtCONSOLMPF199', this.bean.O_SCONSOL);
        this.setValue('txtCURRENCYMPF199', this.bean.O_SCURRENCY);
        this.setValue('txtNETOMPF199', this.bean.O_NETO);
        this.setValue('txtIPAYMPF199', this.bean.O_PAYAMOU);
        this.setValue('txtSTARTMPF199', this.bean.O_STRDATE);
        this.setValue('txtENDMPF199', this.bean.O_ENDDATE);
        this.setValue('txtREFEMPF199', this.bean.O_REFERENCE);
        this.setValue('txtCOMMENTSMPF199', this.bean.O_COMMENTS);
        
      
        
        
        
        
        this.setValue('txtUSUP', this.bean.O_USUP);
        this.setValue('txtFEUP', this.bean.O_FEUP);
        this.setValue('txtHOUP', this.bean.O_HOUP);
        this.setValue('txtUSCR', this.bean.O_USCR);
        this.setValue('txtFECR', this.bean.O_FECR);
        this.setValue('txtHOCR', this.bean.O_HOCR);
        
        

    },

  
    llenarData:function(beanTemp){
        
        
        beanTemp.O_CCUST = this.bean.O_CCUST;
        beanTemp.O_ADATE = this.bean.O_ADATE;
        beanTemp.O_SCOUNTRY = this.bean.O_SCOUNTRY;
        beanTemp.O_SAGENT = this.getValue("txtAGENTMPF199");
        beanTemp.O_SCURRENCY = this.bean.O_SCURRENCY;
        beanTemp.O_CBATCH = this.bean.O_CBATCH;
        beanTemp.O_SEQ = this.bean.O_SEQ;
        beanTemp.O_NSAGENT = this.bean.O_SAGENT;
        
        
        
        
        
        beanTemp.O_USUP = this.getValue("txtUSUP").trim();
        beanTemp.O_FEUP = this.getValue("txtFEUP").trim();
        beanTemp.O_HOUP = this.getValue("txtHOUP").trim();
        beanTemp.O_USCR = this.getValue("txtUSCR").trim();
        beanTemp.O_FECR = this.getValue("txtFECR").trim();
        beanTemp.O_HOCR = this.getValue("txtHOCR").trim();
        
        
        
   
        
    },
    
    
  

      
      
    onUpdateClick: function (btn) {
//        var msj = this.validateDates();

//        if (msj === '') {
            Ext.Msg.show(
                    {
                        title: '.:PRAXIS:.',
                        msg: 'Are you sure to Update?',
                        buttons: Ext.MessageBox.YESNO,
                        scope: this,
                        animateTarget: btn,
                        icon: Ext.MessageBox.QUESTION,
                        modal: true,
                        fn: function (btn) {
                            if (btn === 'yes') {
                                var beanTemp = {};
                                this.llenarData(beanTemp);
                                beanTemp.option = 'U';
//                                beanTemp.beanString = JSON.stringify(beanTemp);
                                this.MaintenanceMPF199(beanTemp);
                            }
                        }
                    });
       
    },

//    onDeleteClick: function (btn) {
//        Ext.Msg.show({
//            title: '.:PRAXIS:.',
//            msg: 'Are you sure to delete ?',
//            buttons: Ext.MessageBox.YESNO,
//            scope: this,
//            icon: Ext.MessageBox.QUESTION,
//            modal: true,
//            fn: function (btn) {
//                if (btn === 'yes') {
//                    var beanTemp = {};
//                    beanTemp.option = 'D';
//                    beanTemp.beanString = JSON.stringify(this.beanResult);
//                    this.MaintenanceA4169(beanTemp);
//                }
//            }
//        });
//    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    

    MaintenanceMPF199: function (beanTemp) {

        Ext.getCmp(prototype.id + '-dataEntryPending').mask('Loading...');
                
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceMPF199',
            method: 'POST',
            timeout: 60000000,
             params: {
            beanString: Ext.encode(beanTemp)
        },
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryPending').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
//                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    
                    Ext.getCmp('BankReconciliationForm-dataEntryPending').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                } else {
                    global.Msg({msg: 'An error occurred'});
                }
            }
        });
    },




    DeshabilitarCampoClave: function () {
//        Ext.getCmp(prototype.id + '-DEtxtUSERNAME').setReadOnly(true);
//        Ext.getCmp(prototype.id + '-cmbTYPE').setReadOnly(true);
    },


    Habilitarlbl: function () {
//        Ext.getCmp(prototype.id + '-lblDescripcion').show();
//        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
//        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function () {
//        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
//            Ext.getCmp(prototype.id + '-lbldes').hide();
//        } else {
//            Ext.getCmp(prototype.id + '-lbldes').show();
//        }
    },
    Habilitarlbl1: function () {
//        Ext.getCmp(prototype.id + '-lbldes').hide();
//        if (this.getValue("txtCODSOUR") == '') {
//            Ext.getCmp(prototype.id + '-lbldes2').hide();
//        } else {
//            Ext.getCmp(prototype.id + '-lbldes2').show();
//        }
    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    
    
    
    getValue: function (id) {
        console.log('VALIDAR ACA',prototype.id + '-' + id);
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
//            this.btnSearch_click();
        }
    }
// </editor-fold>
});
    