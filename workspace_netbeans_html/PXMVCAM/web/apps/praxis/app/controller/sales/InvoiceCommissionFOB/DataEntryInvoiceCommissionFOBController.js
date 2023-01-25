/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.InvoiceCommissionFOB.DataEntryInvoiceCommissionFOBController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/InvoiceCommissionFOB',
    lblPreffixOld: '',
    /**
     * Constructor
     */
    init: function(view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        this.get_ClearField();
        var p = this.view.params;
        switch (p.action) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-save').show();
                this.handlerEvent_EditInput(false);
                Ext.getCmp(prototype.id + '-txtA1757IATA').focus();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                this.handlerEvent_EditInput(true);
                break;
        }
    },
    handlerEvent_EditInput: function(bflag){
        Ext.getCmp(prototype.id + '-txtA1757IATA').setReadOnly(bflag); 
        Ext.getCmp(prototype.id + '-txtA1757NFACT').setReadOnly(bflag); 
        Ext.getCmp(prototype.id + '-txtA1757INDAP').setReadOnly(bflag); 
    },
    getDataInputs: function() {
        var p = this.view.params;
        var data = p.rec.data;
//        console.log(data);
        Ext.getCmp(prototype.id + '-txtA003KEY3').setValue(data.A003KEY3.trim());
        Ext.getCmp(prototype.id + '-de-txtA1757FFACT').setValue(data.A1757FFACT);
        Ext.getCmp(prototype.id + '-txtA1757IATA').setValue(data.A1757IATA.trim());
        Ext.getCmp(prototype.id + '-de-txtA1757LOTE').setValue(data.A1757LOTE.trim());
        Ext.getCmp(prototype.id + '-txtA1757MONED').setValue(data.A1757MONED.trim());
        Ext.getCmp(prototype.id + '-txtA1757NFACT').setValue(data.A1757NFACT.trim());
        Ext.getCmp(prototype.id + '-txtA1757SEQ').setValue(data.A1757SEQ.trim());
        Ext.getCmp(prototype.id + '-txtA1757INDAP').setValue(data.A1757INDAP.trim());
        Ext.getCmp(prototype.id + '-txtA1757STATU').setValue(data.A1757STATU.trim());
        // Invoice        
        Ext.getCmp(prototype.id + '-txtA1757CAMCO').setValue(Ext.util.Format.number(data.A1757CAMCO, '0,000.00')); //COLHDG('MONTO CASH - COM')
        Ext.getCmp(prototype.id + '-txtA1757COMIV').setValue(Ext.util.Format.number(data.A1757COMIV, '0,000.00')); //COLHDG('MONTO COMM + IVA')
        Ext.getCmp(prototype.id + '-txtA1757COMM').setValue(Ext.util.Format.number(data.A1757COMM, '0,000.00')); //COLHDG('MONTO COMISION')
        Ext.getCmp(prototype.id + '-txtA1757IVA').setValue(Ext.util.Format.number(data.A1757IVA, '0,000.00')); //COLHDG('MONTO IVA')
        Ext.getCmp(prototype.id + '-txtA1757TCASH').setValue(Ext.util.Format.number(data.A1757TCASH, '0,000.00')); //COLHDG('TOTAL CASH')		
        // Pre-Invoice		
        Ext.getCmp(prototype.id + '-txtA1757CAMCO_P').setValue(Ext.util.Format.number(data.A1728TCAMC, '0,000.00')); //COLHDG('MONTO CASH - COM') 
        Ext.getCmp(prototype.id + '-txtA1757COMIV_P').setValue(Ext.util.Format.number(data.A1728TCOMI, '0,000.00')); //COLHDG('MONTO CASH - COM') 
        Ext.getCmp(prototype.id + '-txtA1757COMM_P').setValue(Ext.util.Format.number(data.A1728TCOM, '0,000.00')); //COLHDG('MONTO CASH - COM') 
        Ext.getCmp(prototype.id + '-txtA1757IVA_P').setValue(Ext.util.Format.number(data.A1728TIVA, '0,000.00')); //COLHDG('TOTAL IVA     ')
        Ext.getCmp(prototype.id + '-txtA1757TCASH_P').setValue(Ext.util.Format.number(data.A1728TTCAS, '0,000.00')); //COLHDG('TOTAL CASH')
//        // Invoice Summary
        this.getTotalPref();

        // Difference ( PRE_FACT - INVOICE )
        Ext.getCmp(prototype.id + '-txtA1757CAMCO_D').setValue(Ext.util.Format.number((data.A1757CAMCO - data.A1728TCAMC), '0,000.00')); //COLHDG('MONTO CASH - COM') 
        Ext.getCmp(prototype.id + '-txtA1757COMIV_D').setValue(Ext.util.Format.number((data.A1757COMIV - data.A1728TCOMI), '0,000.00')); //COLHDG('MONTO CASH - COM') 
        Ext.getCmp(prototype.id + '-txtA1757COMM_D').setValue(Ext.util.Format.number((data.A1757COMM - data.A1728TCOM), '0,000.00')); //COLHDG('MONTO CASH - COM') 
        Ext.getCmp(prototype.id + '-txtA1757IVA_D').setValue(Ext.util.Format.number((data.A1757IVA - data.A1728TIVA), '0,000.00')); //COLHDG('MONTO CASH - COM') 
        Ext.getCmp(prototype.id + '-txtA1757TCASH_D').setValue(Ext.util.Format.number((data.A1757TCASH - data.A1728TTCAS), '0,000.00')); //COLHDG('MONTO CASH - COM') 

        // DATOS DE AUDITORIA
        Ext.getCmp(prototype.id + '-txtA1757REGIS').setValue(data.A1757REGIS);
        Ext.getCmp(prototype.id + '-txtA1757FREGI').setValue(data.A1757FREGI);
        Ext.getCmp(prototype.id + '-txtA1757HREGI').setValue(data.A1757HREGI);
        Ext.getCmp(prototype.id + '-txtA1757REVIS').setValue(data.A1757REVIS);
        Ext.getCmp(prototype.id + '-txtA1757FREVI').setValue(data.A1757FREVI);
        Ext.getCmp(prototype.id + '-txtA1757HREVI').setValue(data.A1757HREVI);
        Ext.getCmp(prototype.id + '-txtA1757FREGI').setValue(data.A1757FREGI.substr(0, 4) + '/' + data.A1757FREGI.substr(4, 2) + '/' + data.A1757FREGI.substr(6, 2));
        Ext.getCmp(prototype.id + '-txtA1757HREGI').setValue(data.A1757HREGI.substr(0, 2) + ':' + data.A1757HREGI.substr(2, 2) + ':' + data.A1757HREGI.substr(3, 2));
    },
    getDataEntryValues: function(strOption) {

        var VP_ACTION = strOption;
        var VP_A1757CCUST = '139';
        var VP_A1757LOTE = Ext.getCmp(prototype.id + '-de-txtA1757LOTE').getValue();
        var VP_A1757IATA = Ext.getCmp(prototype.id + '-txtA1757IATA').getValue();
        var VP_A1757FPROC = '';
        var VP_A1757MONED = Ext.getCmp(prototype.id + '-txtA1757MONED').getValue();
        var VP_A1757COMM = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757COMM').getValue().replace(",", "").replace(",", ""));
        var VP_A1757IVA = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757IVA').getValue().replace(",", "").replace(",", ""));
        
        var VP_A1757COMIV = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757COMIV').getValue().replace(",", "").replace(",", ""));
        
        var VP_A1757TCASH = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757TCASH').getValue().replace(",", "").replace(",", ""));
        var VP_A1757CAMCO = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757CAMCO').getValue().replace(",", "").replace(",", ""));
        var VP_A1757NFACT = Ext.getCmp(prototype.id + '-txtA1757NFACT').getValue().trim();
        var VP_A1757FFACT = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-txtA1757FFACT').getValue(), 'Ymd');
        var VP_A1757STATU = Ext.getCmp(prototype.id + '-txtA1757STATU').getValue();
        var VP_A1757SEQ = Ext.getCmp(prototype.id + '-txtA1757SEQ').getValue();
        var VP_A1757INDAP = Ext.getCmp(prototype.id + '-txtA1757INDAP').getValue();
        return {
            VP_ACTION: VP_ACTION,
            VP_A1757CCUST: VP_A1757CCUST,
            VP_A1757LOTE: VP_A1757LOTE,
            VP_A1757IATA: VP_A1757IATA,
            VP_A1757FPROC: VP_A1757FPROC,
            VP_A1757MONED: VP_A1757MONED,
            VP_A1757COMM: VP_A1757COMM,
            VP_A1757IVA: VP_A1757IVA,
            
            VP_A1757COMIV: VP_A1757COMIV,
            
            VP_A1757TCASH: VP_A1757TCASH,
            VP_A1757CAMCO: VP_A1757CAMCO,
            VP_A1757NFACT: VP_A1757NFACT,
            VP_A1757FFACT: VP_A1757FFACT,
            VP_A1757STATU: VP_A1757STATU,
            VP_A1757SEQ: VP_A1757SEQ,
            VP_A1757INDAP: VP_A1757INDAP
        };
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);
        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        }
        else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "I";
                        this.crud();
                    }
                }
            });
        }
    },
    crud: function() {
        var p = this.view.params;
        var strOption = p.action;
        Ext.Ajax.request({
            url: this.url + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            beforerequest: Ext.getCmp(prototype.id + '-DataEntryInvoiceCommissionFOBForm').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
//                console.log(objRtn);
                Ext.getCmp(prototype.id + '-DataEntryInvoiceCommissionFOBForm').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: 1,
                    fn: function() {
                        //exito
                        Ext.getCmp(prototype.id + '-DataEntryInvoiceCommissionFOBForm').close();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    onUpdateClick: function(btn) {


        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);
        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        }
        else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                scope: this,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "U";
                        this.crud();
                    }
                }
            });
        }
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
                    this.view.params.action = "D";
                    this.crud();
                }
            }
        });
    },
    onCancelClick: function(btn) {
        Ext.getCmp(prototype.id + '-DataEntryInvoiceCommissionFOBForm').close();
    },
    get_ValidaCodeIATA: function() {
        var iata = Ext.getCmp(prototype.id + '-txtA1757IATA').getValue();
        if (iata !== '') {
            Ext.Ajax.request({
                url: this.url + '/validarCodigoIATA',
                method: 'POST',
                timeout: 60000000,
                beforerequest: Ext.getCmp(prototype.id + '-DataEntryInvoiceCommissionFOBForm').mask('Loading...', ''),
                params: {
                    VP_OPTION: 'A',
                    VP_PARAM: iata
                },
                success: function(response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var result = res.result;
                    Ext.getCmp(prototype.id + '-DataEntryInvoiceCommissionFOBForm').unmask('Loading...', '');
                    if (result === '') {
                        global.Msg({
                            msg: 'IATA Code Not Found'
                        });
                    } else {
                        Ext.getCmp(prototype.id + '-txtA003KEY3').setValue(result);
                    }
                }
            });
        }

    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onFocusNumberfield:function( obj, error, eOpts) {
        obj.selectText();
    },   
    validateForm: function(params) {
//        console.log(params);
        var mensaje = "";
        if (params.VP_A1757IATA === '') {
            mensaje = 'Required Field, IATA Code ';
            Ext.getCmp(prototype.id + '-txtA1757IATA').focus();
            return mensaje;
        }
        if (params.VP_A1757NFACT === '') {
            mensaje = 'Required Field, Invoice number  ';
            Ext.getCmp(prototype.id + '-txtA1757NFACT').focus();
            return mensaje;
        }
        if (params.VP_A1757FFACT === '') {
            mensaje = 'Required Field, Invoice date   ';
            Ext.getCmp(prototype.id + '-de-txtA1757FFACT').focus();
            return mensaje;
        }
        if (params.VP_A1757MONED === '') {
            mensaje = 'Required Field, Currency';
            Ext.getCmp(prototype.id + '-txtA1757MONED').focus();
            return mensaje;
        }
        if (params.VP_A1757COMM === 0) {
            mensaje = 'Enter Commission Amount';
            Ext.getCmp(prototype.id + '-txtA1757COMM').focus();
            return mensaje;
        }
        if (params.VP_A1757INDAP === '') {
            mensaje = 'Required Field, Invoice aplication';
            Ext.getCmp(prototype.id + '-txtA1757INDAP').focus();
            return mensaje;
        }

        if (params.VP_A1757STATU === 'D'/*beanMant.VP_A1757STATU != 'A' && beanMant.VP_A1757INDAP != 'C' */) {
            mensaje = 'Invalid Status for Invoice';
            return mensaje;
        }
        return mensaje;
    },
//    Obtiene Datos de Prefactura event:KeyboardEvent
    getTotalPref: function() {
        //console.log(isValid);        
        var VL_A1757INDAP = Ext.getCmp(prototype.id + '-txtA1757INDAP').getValue();
        var VL_A1757COMM = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757COMM').getValue().replace(",", "").replace(",", ""));
        var VL_A1757IVA = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757IVA').getValue().replace(",", "").replace(",", ""));
        var VL_A1728IATA = Ext.getCmp(prototype.id + '-txtA1757IATA').getValue();
        var VL_A1728LOTE = Ext.getCmp(prototype.id + '-de-txtA1757LOTE').getValue();
        if (VL_A1757IVA == 0 && VL_A1757COMM == 0) {            
            return;
        };
        
        if (VL_A1728IATA == '' && VL_A1728LOTE != '') {
             Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Enter IATA Code or Lote Number',
                scope: this,
                buttons: 1,
                icon: Ext.MessageBox.WARNING,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {  
                        Ext.getCmp(prototype.id + '-txtA1757IATA').focus();
                    }
                }
            });                           
            return;
        }
        if (VL_A1757INDAP == ''){                                                
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Enter Invoice Application',
                scope: this,
                buttons: 1,
                icon: Ext.MessageBox.WARNING,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') { 
                        this.limpiar_valore_pref();
                        Ext.getCmp(prototype.id + '-txtA1757INDAP').focus();
                    }
                }
            });            
            return;
        }
        var p = this.view.params;           
        
        Ext.Ajax.request({
            url: this.url + '/getTotalPreFact',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-DataEntryInvoiceCommissionFOBForm').mask('Loading...', ''),
            params: {
                VP_A1728CCUST: '139',
                VP_A1728IATA: VL_A1728IATA,
                VP_A1728LOTE: VL_A1728LOTE
            },
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-DataEntryInvoiceCommissionFOBForm').unmask('Loading...', '');
                var res = Ext.JSON.decode(response.responseText);
                var result = res.objRtn;
//                console.log(result);
//                console.log('************');
//                console.log(result[0]);
//                console.log(result.objRtn);       
                    var A1757INDAP = Ext.getCmp(prototype.id + '-txtA1757INDAP').getValue();                
                    if (result.length > 0){            
                        Ext.getCmp(prototype.id + '-txtA1757CAMCO_P').setValue(Ext.util.Format.number(( result[0].A1728TCAMC), '0,000.00')); //COLHDG('MONTO CASH - COM')                         
                        Ext.getCmp(prototype.id + '-txtA1757COMIV_P').setValue(Ext.util.Format.number(( result[0].A1728TCOMI), '0,000.00')); //COLHDG('MONTO COMM + IVA')
                        Ext.getCmp(prototype.id + '-txtA1757COMM_P').setValue(Ext.util.Format.number(( result[0].A1728TCOM), '0,000.00')); //COLHDG('TOTAL COMISION')                        
                        Ext.getCmp(prototype.id + '-txtA1757IVA_P').setValue(Ext.util.Format.number(( result[0].A1728TIVA), '0,000.00')); //COLHDG('TOTAL IVA     ')           
                        Ext.getCmp(prototype.id + '-txtA1757TCASH_P').setValue(Ext.util.Format.number(( result[0].A1728TTCAS), '0,000.00')); //COLHDG('TOTAL CASH')       
                        Ext.getCmp(prototype.id + '-txtA1757MONED').setValue( result[0].A1728MDARV );              
                        
                    // SUMARY FACTURAS                                                
                        if (p.action == 'I'){
                            // Total Cash: Jalar de Prefactura, Solo cuando es Un Nuevo Registro, si es edicion Mostrar del a1757 lo Registrado
                            if (A1757INDAP == 'C') 
                            Ext.getCmp(prototype.id + '-txtA1757TCASH').setValue(Ext.util.Format.number(( result[0].A1728TTCAS), '0,000.00'));                       
                            else Ext.getCmp(prototype.id + '-txtA1757TCASH').setValue('0.00');                                                                        
                            
                            Ext.getCmp(prototype.id + '-txtA1757COMM_IN').setValue(Ext.util.Format.number(( result[0].A1757COMM), '0,000.00')); // TOTAL COMISION
                            Ext.getCmp(prototype.id + '-txtA1757IVA_IN').setValue(Ext.util.Format.number(( result[0].A1757IVA), '0,000.00'));// TOTAL IVA
                            Ext.getCmp(prototype.id + '-txtA1757COMIV_IN').setValue(Ext.util.Format.number(( result[0].A1757COMIV), '0,000.00'));// MONTO COMM + IVA
                            Ext.getCmp(prototype.id + '-txtA1757CAMCO_IN').setValue(Ext.util.Format.number(( result[0].A1757CAMCO), '0,000.00'));// MONTO CASH - TOTAL COMM <= (A1757COMM+A1757IVA)
                            Ext.getCmp(prototype.id + '-txtA1757TCASH_IN').setValue(Ext.util.Format.number(( result[0].A1757TCASH), '0,000.00'));// MONTO TOTAL CASH                                        
                            
                            } else{
                                //var beanTemp:PX112S02A1757Filter = new PX112S02A1757Filter();                                    
                                var VL_A1757COMM = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757COMM').getValue().replace(",", "").replace(",", ""));
                                var VL_A1757IVA = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757IVA').getValue().replace(",", "").replace(",", ""));                                    
                                var VL_A1757COMIV  = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757COMIV').getValue().replace(",", "").replace(",", ""));                                                                                                            
                                var VL_A1757TCASH  = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757TCASH').getValue().replace(",", "").replace(",", ""));                                   
                                var VL_A1757CAMCO  = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757CAMCO').getValue().replace(",", "").replace(",", ""));                                     
                                // PRE-INVOICE
                                Ext.getCmp(prototype.id + '-txtA1757COMM_IN').setValue(Ext.util.Format.number(( result[0].A1757COMM - VL_A1757COMM ), '0,000.00'));// TOTAL COMISION
                                Ext.getCmp(prototype.id + '-txtA1757IVA_IN').setValue(Ext.util.Format.number(( result[0].A1757IVA - VL_A1757IVA ), '0,000.00'));// TOTAL IVA
                                Ext.getCmp(prototype.id + '-txtA1757COMIV_IN').setValue(Ext.util.Format.number(( result[0].A1757COMIV - VL_A1757COMIV ), '0,000.00'));// MONTO COMM + IVA
                                Ext.getCmp(prototype.id + '-txtA1757TCASH_IN').setValue(Ext.util.Format.number(( result[0].A1757TCASH - VL_A1757TCASH ), '0,000.00'));// MONTO CASH - TOTAL COMM(A1757COMM+A1757IVA)	                                    
                                Ext.getCmp(prototype.id + '-txtA1757CAMCO_IN').setValue(Ext.util.Format.number(( result[0].A1757CAMCO - VL_A1757CAMCO ), '0,000.00'));// MONTO TOTAL CASH	 
            
                            }                             
                            //fireEvent>>set_Calculatedifference();
                            Ext.getCmp(prototype.id + '-btnCalculatedifference').fireEvent('click', {});                        
                    }else{
                            //alert('Data Pre-Invoice Not Found'); 
                            Ext.Msg.show({
                                title: '.:PRAXIS:.',
                                msg: 'Data Pre-Invoice Not Found',
                                scope: this,
                                buttons: 1,
                                icon: Ext.MessageBox.WARNING,
                                modal: true,
                                fn: function(btn) {
                                    if (btn === 'ok') {  
                                        Ext.getCmp(prototype.id + '-de-txtA1757LOTE').setValue('');
                                        Ext.getCmp(prototype.id + '-de-txtA1757LOTE').focus();   
                                    }
                                }
                            });
                                         
                    }
            }
        });
    },
    get_ClearField: function(){ 
         Ext.getCmp(prototype.id + '-txtA003KEY3').setValue('');
         Ext.getCmp(prototype.id + '-txtA1757CAMCO').setValue('0.00');
         Ext.getCmp(prototype.id + '-txtA1757IVA').setValue('0.00');
         Ext.getCmp(prototype.id + '-txtA1757COMIV').setValue('0.00');
         Ext.getCmp(prototype.id + '-txtA1757COMM').setValue('0.00');
         Ext.getCmp(prototype.id + '-txtA1757TCASH').setValue('0.00');
         Ext.getCmp(prototype.id + '-de-txtA1757FFACT').setValue('');
         Ext.getCmp(prototype.id + '-txtA1757FREGI').setValue('');
         Ext.getCmp(prototype.id + '-txtA1757STATU').setValue('');         
         Ext.getCmp(prototype.id + '-txtA1757FREVI').setValue('');
         Ext.getCmp(prototype.id + '-txtA1757HREGI').setValue('');
         Ext.getCmp(prototype.id + '-txtA1757HREVI').setValue('');         
         Ext.getCmp(prototype.id + '-txtA1757IATA').setValue('');
         Ext.getCmp(prototype.id + '-de-txtA1757LOTE').setValue('');
         Ext.getCmp(prototype.id + '-txtA1757MONED').setValue('');
         Ext.getCmp(prototype.id + '-txtA1757NFACT').setValue('');         
         Ext.getCmp(prototype.id + '-txtA1757REGIS').setValue('');
         Ext.getCmp(prototype.id + '-txtA1757REVIS').setValue('');
         Ext.getCmp(prototype.id + '-txtA1757SEQ').setValue('00');
         Ext.getCmp(prototype.id + '-txtA1757INDAP').setValue('');         
         // Dtos de pre.factura	
         Ext.getCmp(prototype.id + '-txtA1757CAMCO_P').setValue('0.00'); 
         Ext.getCmp(prototype.id + '-txtA1757COMIV_P').setValue('0.00');
         Ext.getCmp(prototype.id + '-txtA1757COMM_P').setValue('0.00');
         Ext.getCmp(prototype.id + '-txtA1757IVA_P').setValue('0.00');
         Ext.getCmp(prototype.id + '-txtA1757TCASH_P').setValue('0.00');
         // Invoice Summary				
         Ext.getCmp(prototype.id + '-txtA1757CAMCO_IN').setValue('0.00'); 
         Ext.getCmp(prototype.id + '-txtA1757COMIV_IN').setValue('0.00');
         Ext.getCmp(prototype.id + '-txtA1757COMM_IN').setValue('0.00');
         Ext.getCmp(prototype.id + '-txtA1757IVA_IN').setValue('0.00');
         Ext.getCmp(prototype.id + '-txtA1757TCASH_IN').setValue('0.00');
         // Difference ( PRE_FACT - INVOICE )
         Ext.getCmp(prototype.id + '-txtA1757CAMCO_D').setValue('0.00'); 
         Ext.getCmp(prototype.id + '-txtA1757COMIV_D').setValue('0.00');
         Ext.getCmp(prototype.id + '-txtA1757COMM_D').setValue('0.00');
         Ext.getCmp(prototype.id + '-txtA1757IVA_D').setValue('0.00');
         Ext.getCmp(prototype.id + '-txtA1757TCASH_D').setValue('0.00');
         
    },
    limpiar_valore_pref: function(){  
        Ext.getCmp(prototype.id + '-txtA1757CAMCO').setValue('0.00');
        Ext.getCmp(prototype.id + '-txtA1757IVA').setValue('0.00');
        Ext.getCmp(prototype.id + '-txtA1757COMIV').setValue('0.00');
        Ext.getCmp(prototype.id + '-txtA1757COMM').setValue('0.00');
        Ext.getCmp(prototype.id + '-txtA1757TCASH').setValue('0.00');        
        // Dtos de pre.factura				
        Ext.getCmp(prototype.id + '-txtA1757CAMCO_P').setValue('0.00');
        Ext.getCmp(prototype.id + '-txtA1757COMIV_P').setValue('0.00');
        Ext.getCmp(prototype.id + '-txtA1757COMM_P').setValue('0.00');
        Ext.getCmp(prototype.id + '-txtA1757IVA_P').setValue('0.00');
        Ext.getCmp(prototype.id + '-txtA1757TCASH_P').setValue('0.00');        
        // Invoice Summary				
        Ext.getCmp(prototype.id + '-txtA1757CAMCO_IN').setValue('0.00');
        Ext.getCmp(prototype.id + '-txtA1757COMIV_IN').setValue('0.00');
        Ext.getCmp(prototype.id + '-txtA1757COMM_IN').setValue('0.00');
        Ext.getCmp(prototype.id + '-txtA1757IVA_IN').setValue('0.00');
        Ext.getCmp(prototype.id + '-txtA1757TCASH_IN').setValue('0.00');        
        // Difference ( PRE_FACT - INVOICE )
        Ext.getCmp(prototype.id + '-txtA1757CAMCO_D').setValue('0.00');
        Ext.getCmp(prototype.id + '-txtA1757COMIV_D').setValue('0.00');
        Ext.getCmp(prototype.id + '-txtA1757COMM_D').setValue('0.00');
        Ext.getCmp(prototype.id + '-txtA1757IVA_D').setValue('0.00');
        Ext.getCmp(prototype.id + '-txtA1757TCASH_D').setValue('0.00');
    },
    setEnabledMontoCash: function(){
        // LIMPIAR PARA NUEVA BUSQUEDA
        //console.log('setEnabledMontoCash');
        this.limpiar_valore_pref();
        var A1757INDAP  = Ext.getCmp(prototype.id + '-txtA1757INDAP').getValue();
        switch(A1757INDAP){
                case "C": break;
                case "S":
                Ext.getCmp(prototype.id + '-txtA1757TCASH').setReadOnly(true);
                Ext.getCmp(prototype.id + '-txtA1757TCASH').setValue('0.00');
                break;
        }
    },
    set_Calculatedifference:function(){
        //console.log('set_Calculatedifference');
        // solo cuando es nuevo
        //if ( actionCode != App.DE_ACT_INSERT)
        //return;                
        var A1757COMM = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757COMM').getValue().replace(",", "").replace(",", ""));
        var A1757IVA = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757IVA').getValue().replace(",", "").replace(",", "")); 
        var A1757TCASH = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757TCASH').getValue().replace(",", "").replace(",", "")); 
        var A1757COMIV = Ext.Number.parseFloat(A1757COMM + A1757IVA); 
        Ext.getCmp(prototype.id + '-txtA1757COMIV').setValue( Ext.util.Format.number(A1757COMIV, '0,000.00'));        
        // CASH - COMM.
        var A1757CAMCO =  Ext.Number.parseFloat( A1757TCASH - A1757COMIV);
        Ext.getCmp(prototype.id + '-txtA1757CAMCO').setValue( Ext.util.Format.number(A1757CAMCO, '0,000.00'));        
        
        // PRE_FACTURA 
        var A1757CAMCO_P = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757CAMCO_P').getValue().replace(",", "").replace(",", "")); 
        var A1757COMIV_P = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757COMIV_P').getValue().replace(",", "").replace(",", "")); 
        var A1757COMM_P = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757COMM_P').getValue().replace(",", "").replace(",", "")); 
        var A1757IVA_P = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757IVA_P').getValue().replace(",", "").replace(",", "")); 
        var A1757TCASH_P = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757TCASH_P').getValue().replace(",", "").replace(",", ""));
        // INV_SUMMARY 
        var A1757CAMCO_IN = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757CAMCO_IN').getValue().replace(",", "").replace(",", ""));  
        var A1757COMIV_IN = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757COMIV_IN').getValue().replace(",", "").replace(",", ""));  
        var A1757COMM_IN = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757COMM_IN').getValue().replace(",", "").replace(",", "")); 
        var A1757IVA_IN = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757IVA_IN').getValue().replace(",", "").replace(",", "")); 
        var A1757TCASH_IN = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757TCASH_IN').getValue().replace(",", "").replace(",", ""));
        //Difference (PRE_FACT - INVOICE)
        Ext.getCmp(prototype.id + '-txtA1757CAMCO_D').setValue( Ext.util.Format.number( Ext.Number.parseFloat((A1757CAMCO + A1757CAMCO_IN) - A1757CAMCO_P), '0,000.00'));        
        Ext.getCmp(prototype.id + '-txtA1757COMIV_D').setValue( Ext.util.Format.number( Ext.Number.parseFloat((A1757COMIV + A1757COMIV_IN) - A1757COMIV_P), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA1757COMM_D').setValue( Ext.util.Format.number( Ext.Number.parseFloat((A1757COMM + A1757COMM_IN) - A1757COMM_P), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA1757IVA_D').setValue( Ext.util.Format.number( Ext.Number.parseFloat((A1757IVA + A1757IVA_IN) - A1757IVA_P), '0,000.00'));
        Ext.getCmp(prototype.id + '-txtA1757TCASH_D').setValue( Ext.util.Format.number( Ext.Number.parseFloat((A1757TCASH + A1757TCASH_IN) - A1757TCASH_P), '0,000.00'));                
        this.set_pone_estado();
    },
    set_pone_estado: function(){
        var A1757STATU_00= ""; 
        var A1757CAMCO_D = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757CAMCO_D').getValue().replace(",", "").replace(",", "")); 
        var A1757COMIV_D = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757COMIV_D').getValue().replace(",", "").replace(",", "")); 
        var A1757COMM_D  = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757COMM_D').getValue().replace(",", "").replace(",", "")); 
        var A1757IVA_D 	 = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757IVA_D').getValue().replace(",", "").replace(",", "")); 
        var A1757TCASH_D = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757TCASH_D').getValue().replace(",", "").replace(",", ""));         
        //var A1757INDAP   = Ext.getCmp(prototype.id + '-txtA1757TCASH_D').getValue().trim();             
        var A1757INDAP   = Ext.getCmp(prototype.id + '-txtA1757INDAP').getValue().trim();             
        var A1757TCASH_P = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757TCASH_P').getValue().replace(",", "").replace(",", "")); 
        var A1757CAMCO_P = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-txtA1757CAMCO_P').getValue().replace(",", "").replace(",", ""));         
        var p = this.view.params;
        if ( p.action == 'U' )return;
        
        if ( A1757CAMCO_D + A1757COMIV_D + A1757COMM_D + A1757IVA_D + A1757TCASH_D == 0 ){
                A1757STATU_00 = 'A';
                Ext.getCmp(prototype.id + '-txtA1757STATU').setReadOnly(true);                
        }else{
//                
//             Validar que exista un importe cash (Pre-factura) mayor a cero.
//             Validar que exista un diferencia negativa (Pre-factura) entre el cash y la comisión.
//               
                if( A1757INDAP == 'C' && ( A1757TCASH_P > 0 && A1757CAMCO_P < 0 )  ){
                      A1757STATU_00 = 'P';
                }else A1757STATU_00 = 'D';
                Ext.getCmp(prototype.id + '-txtA1757STATU').setReadOnly(false);                
        }     
        Ext.getCmp(prototype.id + '-txtA1757STATU').setValue(A1757STATU_00);        
    }
    
});


