Ext.define('Ext.Praxis.controller.flown.FlightConciliation.DataEntryFlightConciliationController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryFlightConciliationController',
    p: '',
    meEntry: '',
    STVAL: '',
//    msjResult: '',
//    beanOption: {},
    beanCons: {},
    FUNCION: '',
    NPROG: 'PX00000095',
    init: function(view) {
        meEntry = this;
        this.p = this.view.params;
    },
    afterRender: function(){
        //Ext.getCmp(prototype.id+'-txtDESCRIP-label').hide();
        //Ext.getCmp(prototype.id+'-txtDESCRIP').hide();
        switch( this.p.actionCode ){
            case 'V':
                this.mostrarData(this.p.bean);
                if (this.p.msj.trim() !== '') {
                    global.Msg({msg: this.p.msj});
                } else {
                    if(this.FUNCION === 'UPDATE'){
                        Ext.Msg.show({
                            title: '.:PRAXIS:.',
                            msg: 'Are you sure to update ?',
                            buttons: Ext.MessageBox.OKCANCEL,
                            scope: this,
                            icon: Ext.MessageBox.QUESTION,
                            modal: true,
                            fn: function(btn) {
                                if (btn === 'ok') {
                                    me.executeOption(this.p.bean, 'U', 'DataEntryFlightConciliationForm');
                                    //Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                } else {
                                    this.STVAL = '';
                                }
                            }
                        });
                    }else if(this.FUNCION === 'INSERT'){
                        Ext.Msg.show({
                            title: '.:PRAXIS:.',
                            msg: 'Are you sure to insert ?',
                            buttons: Ext.MessageBox.OKCANCEL,
                            scope: this,
                            icon: Ext.MessageBox.QUESTION,
                            modal: true,
                            fn: function(btn) {
                                if (btn === 'ok') {
                                    me.executeOption(this.p.bean, 'I', 'DataEntryFlightConciliationForm');
                                }
                            }
                        });
                    }
                }
                break;
            case 'I':
                this.limpiarData();
                me.validateProgram(Ext.getCmp(prototype.id+'-btn-save'), meEntry.NPROG, 'C');
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                this.cambiarEstadoDatosClave('Habilitar');
                break;
            case 'U':
                this.limpiarData();
                this.mostrarData(this.p.bean);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                me.validateProgram(Ext.getCmp(prototype.id+'-btn-update'), meEntry.NPROG, 'M');
                me.validateProgram(Ext.getCmp(prototype.id+'-btn-delete'), meEntry.NPROG, 'E');
                this.cambiarEstadoDatosClave('Deshabilitar');
                break;
        }
    },
    ValidarSuma: function (){
        var cant1 = 0;
        var cant2 = 0;
        var cant3 = 0;
        var cant4 = 0;
        var QCPNOD = 0;
        cant1 = parseInt(Ext.getCmp(prototype.id+"-txtQCPTRA").getValue(""));
        cant2 = parseInt(Ext.getCmp(prototype.id+"-txtQCPAD").getValue(""));
        cant3 = parseInt(Ext.getCmp(prototype.id+"-txtQCPCHD").getValue(""));
        cant4 = parseInt(Ext.getCmp(prototype.id+"-txtQCPINF").getValue(""));
        
        QCPNOD = (String(cant1 + cant2 + cant3 + cant4));
        Ext.getCmp(prototype.id+"-txtQCPNOD").setValue(QCPNOD);
    },
    cambiarEstadoDatosClave: function (accion) {
        if(accion === 'Habilitar'){
            Ext.getCmp(prototype.id+'-txtDFLIGHT').setReadOnly(false);
            Ext.getCmp(prototype.id+'-txtNFLIGHT').setReadOnly(false);
            Ext.getCmp(prototype.id+'-txtCDEPART').setReadOnly(false);
            Ext.getCmp(prototype.id+'-txtCARRIVA').setReadOnly(false);
            Ext.getCmp(prototype.id+'-txtCARRI').setReadOnly(false);
            Ext.getCmp(prototype.id+'-txtQCPNOD').setReadOnly(false);
	} else{
            Ext.getCmp(prototype.id+'-txtDFLIGHT').setReadOnly(true);
            Ext.getCmp(prototype.id+'-txtNFLIGHT').setReadOnly(true);
            Ext.getCmp(prototype.id+'-txtCDEPART').setReadOnly(true);
            Ext.getCmp(prototype.id+'-txtCARRIVA').setReadOnly(true);
            Ext.getCmp(prototype.id+'-txtCARRI').setReadOnly(false);
            Ext.getCmp(prototype.id+'-txtQCPNOD').setReadOnly(false);
	}
    },
    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        Ext.getCmp(prototype.id+"-cmbSTVAL").setValue("2");
        Ext.getCmp(prototype.id+'-txtCARRI').setValue('');
        Ext.getCmp(prototype.id+'-cmbFFLOW').setValue(null);
        Ext.getCmp(prototype.id+'-txtFSENDSS').setValue('');
        Ext.getCmp(prototype.id+'-txtCDEPART').setValue('');
        Ext.getCmp(prototype.id+'-txtCARRIVA').setValue('');
        new Ext.create('Ext.tip.ToolTip', {
            target: prototype.id+'-txtCDEPART',
            html: ''
        });
        new Ext.create('Ext.tip.ToolTip', {
            target: prototype.id+'-txtCARRIVA',
            html: ''
        });
        Ext.getCmp(prototype.id+'-txtZONE').setValue('');
        Ext.getCmp(prototype.id+'-txtNFLIGHT').setValue('');
        Ext.getCmp(prototype.id+'-txtDFLIGHT').setValue('');
        Ext.getCmp(prototype.id+'-txtNPLANE').setValue('');
        
        Ext.getCmp(prototype.id+'-txtLEGSEQ').setValue('');
        Ext.getCmp(prototype.id+'-cmbFSTASS').setValue('');
        Ext.getCmp(prototype.id+'-cmbTOPER').setValue(null);
        Ext.getCmp(prototype.id+'-txtFOPERZUL').setValue('');
        Ext.getCmp(prototype.id+'-txtFSENDOD').setValue('');
        Ext.getCmp(prototype.id+'-txtQCPNOD').setValue('0');
        Ext.getCmp(prototype.id+'-cmbFSTAOD').setValue('');
        Ext.getCmp(prototype.id+'-txtFSENDVC').setValue('');
        Ext.getCmp(prototype.id+'-txtQCPNVC').setValue('0');
        
        Ext.getCmp(prototype.id+'-txtQCPNMA').setValue('0');
        Ext.getCmp(prototype.id+'-txtQCPNTOT').setValue('0');
        Ext.getCmp(prototype.id+'-txtQCPNOCR').setValue('0');
        Ext.getCmp(prototype.id+'-cmbFSTAVC').setValue('');
        Ext.getCmp(prototype.id+'-txtFSENDFI').setValue('');
        Ext.getCmp(prototype.id+'-txtQCPNFI').setValue('0');
        Ext.getCmp(prototype.id+'-txtQCPNFRE').setValue('0');
        Ext.getCmp(prototype.id+'-txtQCPTRA').setValue('0');
        Ext.getCmp(prototype.id+'-txtQCPAD').setValue('0');
        Ext.getCmp(prototype.id+'-txtQCPCHD').setValue('0');
        Ext.getCmp(prototype.id+'-txtQCPINF').setValue('0');
        Ext.getCmp(prototype.id+'-cmbFSTAFI').setValue('');
        
        Ext.getCmp(prototype.id+'-txtFCLOSE').setValue('');
        Ext.getCmp(prototype.id+'-txtQCPNVAL').setValue('0');
        Ext.getCmp(prototype.id+'-cmbFSTAPO').setValue(null);
        
        Ext.getCmp(prototype.id+'-txtLOCDEP').setValue('');
        Ext.getCmp(prototype.id+'-txtLOCARR').setValue('');
        Ext.getCmp(prototype.id+'-txtUTCDEP').setValue('');
        Ext.getCmp(prototype.id+'-txtUTCARR').setValue('');
        
        Ext.getCmp(prototype.id+'-USCR').setValue('');
        Ext.getCmp(prototype.id+'-FECR').setValue('');
        Ext.getCmp(prototype.id+'-HOCR').setValue('');
        Ext.getCmp(prototype.id+'-USUP').setValue('');
        Ext.getCmp(prototype.id+'-FEUP').setValue('');
        Ext.getCmp(prototype.id+'-HOUP').setValue('');
        
        Ext.getCmp(prototype.id+'-cmbFSTASS').enable(true);
        Ext.getCmp(prototype.id+'-cmbFSTAOD').enable(true);
        Ext.getCmp(prototype.id+'-cmbFSTAVC').enable(true);
        Ext.getCmp(prototype.id+'-cmbFSTAFI').enable(true);
        Ext.getCmp(prototype.id+'-cmbFSTAPO').enable(true);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(bean) {
        if (this.STVAL !== "") {
            Ext.getCmp(prototype.id+'-cmbSTVAL').setValue(this.STVAL);
        } else {
            Ext.getCmp(prototype.id+"-cmbSTVAL").setValue(bean.STVAL);
        }
        Ext.getCmp(prototype.id+"-txtCARRI").setValue(bean.CARRI);
        Ext.getCmp(prototype.id+"-cmbFMulti").setValue(bean.FMULTI.trim());
        Ext.getCmp(prototype.id+"-cmbFFLOW").setValue(bean.FFLOW);
        Ext.getCmp(prototype.id+"-txtFSENDSS").setValue(bean.FSENDSS);
        Ext.getCmp(prototype.id+"-txtCDEPART").setValue(bean.CDEPART);
        Ext.getCmp(prototype.id+"-txtCARRIVA").setValue(bean.CARRIVA);
        new Ext.create('Ext.tip.ToolTip', {
            target: prototype.id+'-txtCDEPART',
            html: bean.strDescCDEPART
        });
        new Ext.create('Ext.tip.ToolTip', {
            target: prototype.id+'-txtCARRIVA',
            html: bean.strDescCARRIVA
        });
        Ext.getCmp(prototype.id+"-txtNFLIGHT").setValue(bean.NFLIGHT);
        Ext.getCmp(prototype.id+"-txtZONE").setValue(bean.ZONE);
        Ext.getCmp(prototype.id+"-txtLEGSEQ").setValue(bean.LEGSEQ);
        Ext.getCmp(prototype.id+"-txtDFLIGHT").setValue(bean.DFLIGHT);
        Ext.getCmp(prototype.id+"-txtNPLANE").setValue(bean.NPLANE);
        Ext.getCmp(prototype.id+"-cmbFSTASS").setValue(bean.FSTASS);
        if (bean.FSTASS === '') {
            Ext.getCmp(prototype.id+"-cmbFSTASS").enable(true);
        } else if (bean.FSTASS === '1') {
            Ext.getCmp(prototype.id+"-cmbFSTASS").disable(true);
        }
        Ext.getCmp(prototype.id+"-cmbTOPER").setValue(bean.TOPER);
        Ext.getCmp(prototype.id+"-txtFOPERZUL").setValue(bean.FOPERZUL);
        Ext.getCmp(prototype.id+"-txtFSENDOD").setValue(bean.FSENDOD);
        Ext.getCmp(prototype.id+"-txtQCPNOD").setValue(bean.QCPNOD);
        Ext.getCmp(prototype.id+"-cmbFSTAOD").setValue(bean.FSTAOD);
        if (bean.FSTAOD === '') {
            Ext.getCmp(prototype.id+"-cmbFSTAOD").enable(true);
        } else if (bean.FSTAOD === '1') {
            Ext.getCmp(prototype.id+"-cmbFSTAOD").disable(true);
        }
        Ext.getCmp(prototype.id+"-txtDESCRIP").setValue(bean.strDescripcion.substring(0,50).trim());
        Ext.getCmp(prototype.id+"-txtDESCRIP2").setValue(bean.strDescripcion.substring(50,100).trim());
        Ext.getCmp(prototype.id+"-txtFSENDVC").setValue(bean.FSENDVC);
        Ext.getCmp(prototype.id+"-txtQCPNVC").setValue(bean.QCPNVC);
        Ext.getCmp(prototype.id+"-txtQCPNMA").setValue(bean.QCPNMA);
        Ext.getCmp(prototype.id+"-txtQCPNTOT").setValue(bean.QCPNTOT);
        Ext.getCmp(prototype.id+"-txtQCPNOCR").setValue(bean.QCPNOCR);
        Ext.getCmp(prototype.id+"-txtQCPTRA").setValue(bean.QCPTRA);
        Ext.getCmp(prototype.id+"-txtQCPAD").setValue(bean.QCPAD);
        Ext.getCmp(prototype.id+"-txtQCPCHD").setValue(bean.QCPCHD);
        Ext.getCmp(prototype.id+"-txtQCPINF").setValue(bean.QCPINF);
        Ext.getCmp(prototype.id+"-cmbFSTAVC").setValue(bean.FSTAVC);
        /*if (bean.FSTAVC === '') {
            Ext.getCmp(prototype.id+"-cmbFSTAVC").enable(true);
        } else if (bean.FSTAVC === '1') {
            Ext.getCmp(prototype.id+"-cmbFSTAVC").disable(true);
        }*/
        Ext.getCmp(prototype.id+"-txtFCLOSE").setValue(bean.FCLOSE);
        Ext.getCmp(prototype.id+"-txtQCPNVAL").setValue(bean.QCPNVAL);
        Ext.getCmp(prototype.id+"-cmbFSTAPO").setValue(bean.FSTAPO);
        
        Ext.getCmp(prototype.id+"-txtLOCDEP").setValue(bean.LOCDEP);
        Ext.getCmp(prototype.id+"-txtLOCARR").setValue(bean.LOCARR);
        Ext.getCmp(prototype.id+"-txtUTCDEP").setValue(bean.UTCDEP);
        Ext.getCmp(prototype.id+"-txtUTCARR").setValue(bean.UTCARR);
        
        Ext.getCmp(prototype.id+"-txtFSENDFI").setValue(bean.FSENDFI);
        Ext.getCmp(prototype.id+"-txtQCPNFI").setValue(bean.QCPNFI);
        Ext.getCmp(prototype.id+"-txtQCPNFRE").setValue(bean.QCPNFRE);
        
        Ext.getCmp(prototype.id+"-cmbFSTAFI").setValue(bean.FSTAFI);
        /*if (bean.FSTAFI === '') {
            Ext.getCmp(prototype.id+"-cmbFSTAFI").enable(true);
        } else if (bean.FSTAVC === '1') {
            Ext.getCmp(prototype.id+"-cmbFSTAFI").disable(true);
        }*/
        
        Ext.getCmp(prototype.id+'-USCR').setValue(bean.USCR);
        Ext.getCmp(prototype.id+'-FECR').setValue(bean.FECR);
        Ext.getCmp(prototype.id+'-HOCR').setValue(bean.HOCR);
        Ext.getCmp(prototype.id+'-USUP').setValue(bean.USUP);
        Ext.getCmp(prototype.id+'-FEUP').setValue(bean.FEUP);
        Ext.getCmp(prototype.id+'-HOUP').setValue(bean.HOUP);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="button">
    btnInsert_clickHandler: function(btn) {
        this.FUNCION = 'INSERT';
        var beanOption = {};
        this.llenarData(beanOption, "I");
        var msjResult = this.validacionUpdate(beanOption);
        if(msjResult === ''){
            me.validFlight(beanOption, "I", this.p.rowIndex, false, 'DataEntryFlightConciliationForm');
	}else{
            global.Msg({msg: msjResult});
	}
    },
    btnUpdate_clickHandler: function () {
        this.FUNCION = 'UPDATE';
        var beanOption = {};
        this.llenarData(beanOption, "U");
        var msjResult = this.validacionUpdate(beanOption);
        
        if(beanOption.STVAL === '3' && Ext.getCmp(prototype.id+'-txtQCPNOD').getValue().replace(',','') !==  Ext.getCmp(prototype.id+'-txtQCPNTOT').getValue().replace(',','') 
		&& Ext.getCmp(prototype.id+'-txtDESCRIP').getValue().trim() === ''){
            Ext.getCmp(prototype.id+'-txtDESCRIP-label').show();
            Ext.getCmp(prototype.id+'-txtDESCRIP').show();
            global.Msg({msg: 'You must enter a description on Qty Coupons '});
	}else if(beanOption.STVAL === '4' && Ext.getCmp(prototype.id+'-txtDESCRIP').getValue().trim() === ''){
            Ext.getCmp(prototype.id+'-txtDESCRIP-label').show();
            Ext.getCmp(prototype.id+'-txtDESCRIP').show();
	    global.Msg({msg: 'You must enter a description on Qty Coupons '});
	}else{
            if(msjResult === ''){
                this.STVAL = beanOption.STVAL;
                me.validFlight(beanOption, "U", this.p.rowIndex, false, 'DataEntryFlightConciliationForm');
            }else{
                global.Msg({msg: msjResult});
            }
        }
    },
    btnDelete_clickHandler: function () {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    var beanOption = {};
                    //Llenando los valores ingresados por el usuario =======
                    beanOption.CCUST = this.p.bean.CCUST;
                    beanOption.DFLIGHT = this.p.bean.DFLIGHT;
                    beanOption.NFLIGHT = this.p.bean.NFLIGHT;
                    beanOption.CDEPART = this.p.bean.CDEPART;
                    beanOption.CARRIVA = this.p.bean.CARRIVA;
                    //beanOption.LEGSEQ = bean.LEGSEQ;

                    if(beanOption.DFLIGHT !== '' && beanOption.NFLIGHT !== '' && beanOption.CDEPART !== '' && beanOption.CARRIVA !== ''){
                        me.executeOption(beanOption, 'D', 'DataEntryFlightConciliationForm');
                    }else{
                        global.Msg({msg: 'An error has ocurred. Please contact our System Department'});
                    }
                }
            }
        });
    },
    onPrevClick: function() {
        var lista = this.p.lista;
        var rowIndex = this.p.rowIndex;
        if (this.p.rowIndex > 0) {
            var bean = lista.getAt(rowIndex - 1).data;
            me.searchBean(bean, rowIndex - 1, false, 'DataEntryFlightConciliationForm');
        }
    },
    onNextClick: function() {
        var lista = this.p.lista;
        var rowIndex = this.p.rowIndex;
        if (this.p.rowIndex < 19) {
            var bean = lista.getAt(rowIndex+1).data;
            me.searchBean(bean, rowIndex+1, false, 'DataEntryFlightConciliationForm');
        }
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    //</editor-fold>

    validacionUpdate: function(beanOption) {
        console.log(beanOption);
        var haySSIM = false, hayODS = false, hayVCR = false, hayVFI = false;
        var msjResult = '';
        //================== VALIDACIÓN =========================================
	//=======================================================================
	//Es obligatorio ingresar los datos de cabecera =========================
	if(beanOption.DFLIGHT !== '' && beanOption.NFLIGHT !== '' && beanOption.CDEPART !== '' && beanOption.CARRIVA !== ''
	 	&& beanOption.CARRI !== '' && beanOption.STVAL !== ''){
            // <editor-fold defaultstate="collapsed" desc="Errores">
            var errors = Ext.getCmp(prototype.id+'-txtDFLIGHT').getErrors();//Devuelve un arreglo
            if (errors.length>0) {
                msjResult = 'Invalid Flight Date.';
            }
            if (Ext.getCmp(prototype.id+'-txtNFLIGHT').getErrors().length>0) {
                msjResult = 'Invalid Flight Number.';
            }
            if (Ext.getCmp(prototype.id+'-txtCDEPART').getErrors().length>0) {
                msjResult = 'Invalid Departure City.';
            }
            if (Ext.getCmp(prototype.id+'-txtCARRIVA').getErrors().length>0) {
                msjResult = 'Invalid Arrival City.';
            }
            if (Ext.getCmp(prototype.id+'-txtCARRI').getErrors().length>0) {
                msjResult = 'Invalid Carrier.';
            }
            if (Ext.getCmp(prototype.id+'-txtLEGSEQ').getErrors().length>0) {
                msjResult = 'Invalid Leg Sequence.';
            }
            if (Ext.getCmp(prototype.id+'-txtFSENDSS').getErrors().length>0) {
                msjResult = 'Invalid SSIM Received Date.';
            }
            if (Ext.getCmp(prototype.id+'-txtFSENDOD').getErrors().length>0) {
                msjResult = 'Invalid ODS Received Date.';
            }
            if (Ext.getCmp(prototype.id+'-txtFOPERZUL').getErrors().length>0) {
                msjResult = 'Invalid Zulu Date.';
            }
            if (Ext.getCmp(prototype.id+'-txtFSENDVC').getErrors().length>0) {
                msjResult = 'Invalid VCR Received Date.';
            }
            if (Ext.getCmp(prototype.id+'-txtQCPNVC').getErrors().length>0) {
                msjResult = 'Invalid VCR quantity coupons.';
            }
            if (Ext.getCmp(prototype.id+'-txtQCPNTOT').getErrors().length>0) {
                msjResult = 'Invalid Total quantity coupons.';
            }
            if (Ext.getCmp(prototype.id+'-txtQCPNOCR').getErrors().length>0) {
                msjResult = 'Invalid OCR quantity coupons.';
            }
            if (Ext.getCmp(prototype.id+'-txtQCPTRA').getErrors().length>0) {
                msjResult = 'Invalid in Transit quantity coupons.';
            }
            if (Ext.getCmp(prototype.id+'-txtFSENDFI').getErrors().length>0) {
                msjResult = 'Invalid Physical File Received Date.';
            }
            if (Ext.getCmp(prototype.id+'-txtQCPNFI').getErrors().length>0) {
                msjResult = 'Invalid Physical File quantity coupons.';
            }
            if (Ext.getCmp(prototype.id+'-txtQCPNFRE').getErrors().length>0) {
                msjResult = 'Invalid Physical File quantity coupons NR.';
            }
            // </editor-fold>
            if(msjResult === ''){
                //Validación SSIM =========================================================
                if(beanOption.FFLOW !== '' && beanOption.FSENDSS !== ''
                    && beanOption.NPLANE !== '' && beanOption.FSTASS !== ''){
                    //Todos los campos 
                    haySSIM = true;
                }else if(beanOption.FFLOW !== '' && beanOption.FSENDSS !== ''
                    && beanOption.NPLANE !== '' && beanOption.FSTASS === ''){
                    msjResult = "The Flag SSIM can not be 'Stand By'.";
                }else if(beanOption.FFLOW === '' && beanOption.FSENDSS === ''
                        && beanOption.NPLANE === '' && beanOption.FSTASS !== ''){
                    msjResult = "The Flag SSIM  must be 'Stand By' or you must enter all fields of SSIM File.";
                }
                
                if(msjResult === ''){
                    //Validación ODS =======================================================
                    if(beanOption.FSENDOD !== '' && beanOption.QCPNOD > 0 && beanOption.FSTAOD !== ''){
                        hayODS = true;
                    }else if(beanOption.FSENDOD !== '' && beanOption.QCPNOD > 0 && beanOption.FSTAOD === ''){
                        msjResult = "The Flag ODS can not be 'Stand By'.";
                    }else if(beanOption.FSENDOD === '' && beanOption.QCPNOD <= 0 && beanOption.FSTAOD !== ''){
                        msjResult = "The Flag ODS must be 'Stand By' or you must enter all fields of ODS File.";
                    }
                }
                
                if(msjResult === ''){
                    //Validación VCR ========================================================
                    if(beanOption.FSENDVC !== '' && beanOption.QCPNVC > 0 && beanOption.FSTAVC !== ''){
                        hayVCR = true;
                    }else if(beanOption.FSENDVC !== '' && beanOption.QCPNVC > 0 && beanOption.FSTAVC === ''){
                        msjResult = "The Flag VCR can not be 'Stand By'.";
                    }else if(beanOption.FSENDVC === '' && beanOption.QCPNVC <= 0 && beanOption.FSTAVC !== ''){
                        msjResult = "The Flag VCR  must be 'Stand By' or you must enter all fields of VCR File.";
                    }
                }
                
                if(msjResult === ''){
                    //Validación physical ===================================================
                    if(beanOption.FSENDFI !== '' && beanOption.QCPNFI > 0 && beanOption.QCPNFRE > 0 && beanOption.FSTAFI !== ''){
                        hayVFI = true;
                    }else if(beanOption.FSENDFI !== '' && beanOption.QCPNFI > 0 && beanOption.QCPNFRE > 0 && beanOption.FSTAFI === ''){
                        msjResult = "The Physical Flight Manifest Flag can not be 'Stand By'.";
                    }else if(beanOption.FSENDFI === '' && beanOption.QCPNFI <= 0 && beanOption.QCPNFRE <= 0 && beanOption.FSTAFI !== ''){
                        //Cuando todos los campos son vacío y el estado es 'Received'
                        msjResult = "The Physical Flight Manifest Flag must be 'Stand By' or you must enter all fields of physical File.";
                    }
                }
                if(msjResult === ''){
                    var fechaHoy = win.getFechaFormat();
                    
                    if(beanOption.FSENDOD !== '' && Number(beanOption.FSENDOD) < Number(beanOption.DFLIGHT)){
                        msjResult = "ODS Received Date has to be higher or equal than Flight Date.";
                    }else if(beanOption.FSENDOD !== '' && Number(beanOption.FSENDOD) > Number(fechaHoy)){
                        msjResult = "ODS Received Date cannot be higher than Current Date.";
                    }else if(beanOption.FSENDVC !== '' && Number(beanOption.FSENDVC) < Number(beanOption.DFLIGHT)){
                        msjResult = "VCR Received Date has to be higher or equal than Flight Date.";
                    }else if(beanOption.FSENDVC !== '' && Number(beanOption.FSENDVC) > Number(fechaHoy)){
                        msjResult = "VCR Received Date cannot be higher than Current Date.";
                    }else if(beanOption.FSENDFI !== '' && Number(beanOption.FSENDFI) < Number(beanOption.DFLIGHT)){
                        msjResult = "Physical File Received Date has to be higher or equal than Flight Date.";
                    }else if(beanOption.FSENDFI !== '' && Number(beanOption.FSENDFI) > Number(fechaHoy)){
                        msjResult = "Physical File Received Date cannot be higher than Current Date.";
                    }

                    if(beanOption.FFLOW === 'X' && (beanOption.FSENDOD !== '' || beanOption.QCPNOD > 0 || beanOption.FSTAOD !== ''
                        || beanOption.FSENDVC !== '' || beanOption.QCPNVC > 0 || beanOption.QCPNOAL > 0 || beanOption.QCPNMA > 0 
                        || beanOption.FSTAVC !== '' || beanOption.FSENDFI !== '' || beanOption.QCPNOCR > 0 || beanOption.QCPNTOT > 0 
                        || beanOption.QCPNFI > 0 || beanOption.QCPNFRE > 0 || beanOption.FSTAFI !== '')){
                        msjResult = "If Flag Flown is 'Canceled' then ODS, VCR and Physical Flight Manifest Information must be empty and Status 'Stand By'.";
                    }
                }
                
                if(msjResult === '' && this.p.actionCode !== 'I'){
                    //Validando si se han modificado los campos del Manifiesto de Vuelo
                    if(this.p.bean.FSENDFI.trim() !== beanOption.FSENDFI.trim() || this.p.bean.QCPNFI !== beanOption.QCPNFI || this.p.bean.QCPNFRE !== beanOption.QCPNFRE
                        || this.p.bean.FSTAFI.trim() !== beanOption.FSTAFI.trim()){

                        //Si el usuario modificó sólo los datos del manifiesto de vuelo físico entonces NO debe obligar a que cierre el vuelo
                        //De lo contrario si debe validarlo			
                        if(this.p.bean.CARRI.trim() !== beanOption.CARRI.trim() || this.p.bean.LEGSEQ.trim() !== beanOption.LEGSEQ.trim()
                            || this.p.bean.FSENDSS.trim() !== beanOption.FSENDSS.trim() || this.p.bean.NPLANE.trim() !== beanOption.NPLANE.trim()
                            || this.p.bean.FSTASS.trim() !== beanOption.FSTASS.trim() || this.p.bean.FFLOW.trim() !== beanOption.FFLOW.trim()
                            || this.p.bean.FSENDOD.trim() !== beanOption.FSENDOD.trim() || this.p.bean.FOPERZUL.trim() !== beanOption.FOPERZUL.trim()
                            || this.p.bean.QCPTRA !== beanOption.QCPTRA || this.p.bean.FSTAOD.trim() !== beanOption.FSTAOD.trim()
                            || this.p.bean.FSTAVC.trim() !== beanOption.FSTAVC.trim()){
                            if(!haySSIM && !hayODS && !hayVCR && !hayVFI){
                                msjResult = "You must enter information about one of the files.";
                            }else if(beanOption.FFLOW === 'U' && !haySSIM && (!hayODS || !hayVCR || !hayVFI)){
                                msjResult = "You must enter information of ODS, VCR and Physical Files.";
                            }else if(beanOption.FFLOW === 'U' && !haySSIM && hayODS && hayVCR && hayVFI && beanOption.STVAL === '2'){
                                msjResult = "The Status must be Closed";
                            }else if(haySSIM && hayODS && hayVCR && hayVFI && beanOption.STVAL === '2'){
                                msjResult = "The Status must be Closed";
                            }else if(haySSIM && hayODS && hayVCR && hayVFI && beanOption.QCPNOD !== beanOption.QCPNVC){
                                msjResult = "Quantity Cpns ODS must be the same than VCR Cpns.";
                            }
                        }
                    }
                }
            }
        } else {
            msjResult = "You must enter all required fields.";
        }
        return msjResult;
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanOption, strOption) {
        if (strOption !== 'I') {
            beanOption.CCUST = this.p.bean.CCUST;
        }
        beanOption.STVAL = this.getValue('cmbSTVAL');
        beanOption.FMULTI = this.getValue('cmbFMulti');
        if (beanOption.STVAL==='4') {
            beanOption.FCLOFO = '2';//Se guarda directamente en el Procedure
        }
        beanOption.CARRI = this.getValue('txtCARRI').trim();
        beanOption.FFLOW = this.getValue('cmbFFLOW');
        beanOption.FSENDSS = Ext.util.Format.date(this.getValue('txtFSENDSS'), 'Ymd');
        beanOption.CDEPART = this.getValue('txtCDEPART').trim();
        beanOption.CARRIVA = this.getValue('txtCARRIVA').trim();
        beanOption.NFLIGHT = this.getValue('txtNFLIGHT').trim();
        beanOption.DFLIGHT = Ext.util.Format.date(this.getValue('txtDFLIGHT'), 'Ymd');
        beanOption.NPLANE = this.getValue('txtNPLANE').trim();
        beanOption.ZONE = this.getValue('txtZONE').trim();
        beanOption.LEGSEQ = this.getValue('txtLEGSEQ').trim();
        beanOption.FSTASS = this.getValue('cmbFSTASS');
        beanOption.TOPER = this.getValue('cmbTOPER');
        beanOption.FOPERZUL = Ext.util.Format.date(this.getValue('txtFOPERZUL'), 'Ymd');
        beanOption.FSENDOD = Ext.util.Format.date(this.getValue('txtFSENDOD'), 'Ymd');
        
        beanOption.LOCDEP = this.getValue('txtLOCDEP').trim();
        beanOption.LOCARR = this.getValue('txtLOCARR').trim();
        beanOption.UTCDEP = this.getValue('txtUTCDEP').trim();
        beanOption.UTCARR = this.getValue('txtUTCARR').trim();
        
        if (this.getValue("txtQCPNOD").trim() !== '') {
            beanOption.QCPNOD = Number(this.getValue('txtQCPNOD').replace(',', '').trim());
        } else {
            beanOption.QCPNOD = 0;
        }
        if(beanOption.STVAL === '5'){
            beanOption.FSTAOD = '3';//Cancelado
        }else{
            beanOption.FSTAOD = this.getValue('cmbFSTAOD');
        }
        beanOption.strDescripcion = this.getValue('txtDESCRIP').padEnd(50, ' ') + this.getValue('txtDESCRIP2').padEnd(50, ' ');
        beanOption.FSENDVC = Ext.util.Format.date(this.getValue('txtFSENDVC'), 'Ymd');
        if (this.getValue("txtQCPNVC").trim() !== '') {
            beanOption.QCPNVC = Number(this.getValue('txtQCPNVC').replace(',', '').trim());
        } else {
            beanOption.QCPNVC = 0;
        }
        if (this.getValue("txtQCPNMA").trim() !== '') {
            beanOption.QCPNMA = Number(this.getValue('txtQCPNMA').replace(',', '').trim());
        } else {
            beanOption.QCPNMA = 0;
        }
        if (this.getValue("txtQCPNOCR").trim() !== '') {
            beanOption.QCPNOCR = Number(this.getValue('txtQCPNOCR').replace(',', '').trim());
        } else {
            beanOption.QCPNOCR = 0;
        }
        if (this.getValue("txtQCPNTOT").trim() !== '') {
            beanOption.QCPNTOT = Number(this.getValue('txtQCPNTOT').replace(',', '').trim());
        } else {
            beanOption.QCPNTOT = beanOption.QCPNVC+beanOption.QCPNMA+beanOption.QCPNOCR;
        }
        if (this.getValue("txtQCPTRA").trim() !== '') {
            beanOption.QCPTRA = Number(this.getValue('txtQCPTRA').replace(',', '').trim());
        } else {
            beanOption.QCPTRA = 0;
        }
        if (this.getValue("txtQCPAD").trim() !== '') {
            beanOption.QCPAD = Number(this.getValue('txtQCPAD').replace(',', '').trim());
        } else {
            beanOption.QCPAD = 0;
        }
        if (this.getValue("txtQCPCHD").trim() !== '') {
            beanOption.QCPCHD = Number(this.getValue('txtQCPCHD').replace(',', '').trim());
        } else {
            beanOption.QCPCHD = 0;
        }
        if (this.getValue("txtQCPINF").trim() !== '') {
            beanOption.QCPINF = Number(this.getValue('txtQCPINF').replace(',', '').trim());
        } else {
            beanOption.QCPINF = 0;
        }
        beanOption.FSTAVC = this.getValue('cmbFSTAVC');
        console.log(beanOption.FSTAVC);
        beanOption.FSENDFI = Ext.util.Format.date(this.getValue('txtFSENDFI'), 'Ymd');
        console.log(beanOption.FSENDFI);
        if (this.getValue("txtQCPNFI").trim() !== '') {
            beanOption.QCPNFI = Number(this.getValue('txtQCPNFI').replace(',', '').trim());
        } else {
            beanOption.QCPNFI = 0;
        }
        if (this.getValue("txtQCPNFRE").trim() !== '') {
            console.log(beanOption.QCPNFRE);
            beanOption.QCPNFRE = Number(this.getValue('txtQCPNFRE').replace(',', '').trim());
        } else {
            beanOption.QCPNFRE = 0;
        }
        beanOption.FSTAFI = this.getValue('cmbFSTAFI');
        beanOption.FCLOSE = this.getValue('txtFCLOSE').trim();
        beanOption.QCPNVAL = Number(this.getValue('txtQCPNVAL').replace(',', '').trim());
        beanOption.FSTAPO = this.getValue('cmbFSTAPO');
    },
    //</editor-fold>
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).focus();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    }
});