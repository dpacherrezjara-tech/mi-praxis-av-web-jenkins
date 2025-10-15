/* global callbackMostrarData */

Ext.define('Ext.Praxis.controller.payments.PaymentSchedule.DataEntryPaymentScheduleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryPaymentScheduleController',
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
        prototype.id = 'PaymentScheduleForm';
        prototype.url = CONTEXTPATH + '/PaymentSchedule';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.listaPaises;
        
        
        
        
//          this.control({
//            //   -------------------Eventos Genericos --------------------
//            '#DataEntryPaymentScheduleForm-xpanel': {
//                afterrender: this.afterRender            
//            }
//
////            //-----------------Eventos Especificos -------------------    
//        });

    },
    
   
    afterRender: function () {
        
 
  ////////////////////////////////////////////////////////////////////////////
 ///////////////////OBETENEMOS EL CBO REUTILZANDO LA LISTA/////////////////////////
 ///////////////////////SOLO SE USA CUANDO ES ALGO QUE NO PUEDE CAMBIAR COMO PAISES//////

        var obtenerLista = Ext.create('Ext.data.Store', {
            data: this.lstCountry,
            autoLoad: true
        });

        Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY').bindStore(obtenerLista);
        Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY').setValue('');
        
       
         
         

        switch (this.actionCode) {
            
           
            case 'I':
//                this.setearCamposClave();
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.mostrarData();
//                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {
                     
        this.setValue('de-txtSAGENT', this.bean.SAGENT);
        this.setValue('de-txtSUBFTE', this.bean.SUBFTE);
        this.setValue('de-cmbSCOUNTRY', this.bean.SCOUNTRY);
        this.setValue('de-txtNAMEAG', this.bean.NAMEAG);
        this.setValue('de-txtTVENTA', this.bean.TVENTA);
        this.setValue('de-txtDFREQPAY', this.bean.DFREQPAY);
        this.setValue('de-txtAGROUPD', this.bean.AGROUPD);
        this.setValue('de-txtFPAGO', this.bean.FPAGO);
        this.setValue('de-txtQTYPAGO', this.bean.QTYPAGO);
        this.setValue('de-txtQTYDPOS', this.bean.QTYDPOS);
        this.setValue('de-txtDIAPAGO', this.bean.DIAPAGO);
        this.setValue('de-txtQTYDPRE', this.bean.QTYDPRE);
        
        
        
        
        
        this.setValue('txtUSUP', this.bean.USUP);
        this.setValue('txtFEUP', this.bean.FEUP);
        this.setValue('txtHOUP', this.bean.HOUP);
        this.setValue('txtUSCR', this.bean.USCR);
        this.setValue('txtFECR', this.bean.FECR);
        this.setValue('txtHOCR', this.bean.HOCR);
        
        

    },
//    obtainData: function () {
//        var cmbStval = Ext.getCmp(prototype.id + '-cmbStval');
//        cmbStval.bindStore(Ext.create('Ext.data.ArrayStore', {
//            autoLoad: false,
//            fields: ['code', 'name'],
//            data: [
//                ["", "none"],
//                ["V", "Vigente"],
//                ["A", "Anulado"]
//            ]
//        }));
//        cmbStval.setValue('');
//
//        var cmbDoc = Ext.getCmp(prototype.id + '-cmbDoc');
//        cmbDoc.bindStore(Ext.create('Ext.data.ArrayStore', {
//            autoLoad: false,
//            fields: ['code', 'name'],
//            data: [
//                ["", "none"],
//                ["S", "Sales"],
//                ["R", "Refund"],
//                ["A", "Adjustment"],
//                ["N", "ADM/NOTA CARGO"]
//            ]
//        }));
//        cmbDoc.setValue('');
//
//    },
  
    llenarData:function(beanTemp){
        
        
        
        beanTemp.SAGENT = this.getValue("de-txtSAGENT");
        beanTemp.SUBFTE = this.getValue("de-txtSUBFTE");
        beanTemp.SCOUNTRY = this.getValue("de-cmbSCOUNTRY");
        beanTemp.NAMEAG = this.getValue("de-txtNAMEAG");
        beanTemp.TVENTA = this.getValue("de-txtTVENTA");
        beanTemp.DFREQPAY = this.getValue("de-txtDFREQPAY");
        beanTemp.AGROUPD = this.getValue("de-txtAGROUPD");
        beanTemp.FPAGO = this.getValue("de-txtFPAGO");
        beanTemp.QTYPAGO = this.getValue("de-txtQTYPAGO");
        beanTemp.DIAPAGO = this.getValue("de-txtDIAPAGO");
        beanTemp.QTYDPOS = this.getValue("de-txtQTYDPOS");
        beanTemp.QTYDPRE = this.getValue("de-txtQTYDPRE");
        
        
        
        
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();
        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        
        
        
   
        
    },
    
    
  

      
      
 ////////////////////////////////////////////////////////////////////////////
 ///////////////////OBETENEMOS CBO DE PAISES DEL MASTER/////////////////////////
 ////////////////////////////////////////////////////////////////////////////
// 
//    obtainData: function () {
//
//        this.dataObtain.COUNTRY = 2;
//
//        Ext.Ajax.request({
//            url: prototype.urlMaster + '/obtainData',
//            method: 'POST',
//            timeout: 60000000,
//            params: {beanString: JSON.stringify(this.dataObtain)},
//            success: function (response, options) {
//                var res = Ext.JSON.decode(response.responseText);
//                console.log(res, 'res PRUEBA FER');
//                if (res.success) {
//
//
//                    this.lstCountry = res.lstCountry;
//
//                    var storeData3 = Ext.create('Ext.data.Store', {
//                        data: this.lstCountry,
//                        autoLoad: true
//                    });
//
//                    var combo = Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY');
//                    combo.bindStore(storeData3);
//
//                    // Esperar a que los datos estén cargados y recién ahí setear y mostrar
//                    Ext.defer(() => {
//                        combo.setValue(this.bean.SCOUNTRY); // ← Setea el país del registro
//                        if (callbackMostrarData)
//                            callbackMostrarData(); // ← Llama mostrarData solo aquí
//                    }, 200);
//                } else {
//                    global.Msg({msg: res.sesion});
//                }
//            }.bind(this)
//        });
//    },
 
 
  ////////////////////////////////////////////////////////////////////////////
 ///////////////////OBETENEMOS CBO DE PAISES DE LA LISTA DE NUESTRA TABLA/////
 ////////////////////////////////////////////////////////////////////////////
 
//   //     obtainData: function() {
// 
//        Ext.Ajax.request({
//            url: prototype.url + '/getPaises',
//            method: 'POST',
//            timeout: 60000000,
//            params: {beanString: JSON.stringify(this.dataObtain)},
//            success: function(response, options) {
//                var res = Ext.JSON.decode(response.responseText);              
//                var lstPaises = res.listaPaises;
//                
//                var storeDataPaises = Ext.create('Ext.data.Store', {
//                    data: lstPaises,
//                    autoLoad: true 
//                });
//                
//                Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY').bindStore(storeDataPaises);
//                
//                console.log("Paises cargados TEST:", storeDataPaises.getData().items);
//                
//                Ext.getCmp(prototype.id + '-cmbSCOUNTRY').setValue('');
//
//            }
//        });
//        
//
//    }, 
// 


 
    // <editor-fold defaultstate="collapsed" desc="Botones">
//    onSaveClick: function (btn) {
//        Ext.Msg.show({
//            title: '.:PRAXIS:.',
//            msg: 'Are you sure to insert ?',
//            buttons: Ext.MessageBox.YESNO,
//            scope: this,
//            icon: Ext.MessageBox.QUESTION,
//            modal: true,
//            fn: function (btn) {
//                if (btn === 'yes') {
//                    var beanTemp = {};
//                    this.llenarData(beanTemp);
//                    var msjResult = this.validacionInsert(beanTemp);
//                    if (msjResult === '') {
//                        beanTemp.option = 'I';
//                        beanTemp.beanString = JSON.stringify(beanTemp);
//                        this.MaintenanceA4169(beanTemp);
//                    } else {
//                        global.Msg({msg: msjResult});
//                    }
//                }
//            }
//        });
//    },
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
                                this.MaintenanceMPF116(beanTemp);
                            }
                        }
                    });
       
    },
//    validateDates: function () {
//        var DATINI = this.getValue("de-txtINI");
//        var DATFIN = this.getValue("de-txtFIN");
//        var msj = '';
//
//        if (DATINI.length === 8 && DATFIN.length === 8) {
//            if (DATFIN < DATINI) {
//                msj = 'Error in dates';
//            }
//        } else {
//            msj = 'Error in date lenghts'
//        }
//
//        return msj;
//    },
    onDeleteClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    beanTemp.option = 'D';
                    beanTemp.beanString = JSON.stringify(this.beanResult);
                    this.MaintenanceA4169(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    

    MaintenanceMPF116: function (beanTemp) {

        Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...');
                
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceMPF116',
            method: 'POST',
            timeout: 60000000,
             params: {
            beanString: Ext.encode(beanTemp)
        },
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
//                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    Ext.getCmp(prototype.id + '-dataEntry').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                } else {
                    global.Msg({msg: 'An error occurred'});
                }
            }
        });
    },


//    validacionInsert: function (beanTemp) {
//        var msjResult = '';
//        let field1 = ''
//        let field2 = ''
//        let field3 = ''
//        if (this.getValue("de-txtCodeTable") === '' /* || this.getValue("de-txtCant1") === '' || this.getValue("de-txtCant2") === '' */ || this.getValue("de-txtCDesc1") === '' || this.getValue("cmbDoc") === '') {
//            if(this.getValue("de-txtCodeTable") === ''){
//                field1 = '<br><b>Table'
//            }
//            if(this.getValue("de-txtCDesc1") === ''){
//                field2 = '<br><b>Description'
//            }
//            if(this.getValue("cmbDoc") === ''){
//                field3 = '<br><b>Document'
//            }
//            msjResult = "You must enter the required field: " + field1 + field2 + field3;
//        }
//        return msjResult;
//    },

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
