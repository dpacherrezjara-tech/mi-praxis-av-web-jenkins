Ext.define('Ext.Praxis.controller.flown.FlightConciliation.DataEntryTicketFlightConciliationController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryTicketFlightConciliationController',
    meEntryTick: '',
    p: {},
    bean: {},
    beanCons: {},
    FUNCION: '',
    NPROG: 'PX00000095',
    recalculoVuelo: '',
    apagar: '',
    init: function(view) {
        meEntryTick = this;
        this.p = this.view.params;
        console.log(this.p);
    },
    afterRender: function(){
        switch( this.p.actionCode ){
            case 'V':
                this.mostrarData(this.p.bean);
                if (this.p.msj !== '') {
                    global.Msg({msg: this.p.msj});
                } else {
                    if (this.p.soloValidar === 'false') {
                        if(this.FUNCION === 'UPDATE'){
                            Ext.Msg.show({
                                title: '.:PRAXIS:.',
                                msg: 'Are you sure to update?',
                                buttons: Ext.MessageBox.OKCANCEL,
                                scope: this,
                                icon: Ext.MessageBox.QUESTION,
                                modal: true,
                                fn: function(btn) {
                                    if (btn === 'ok') {
                                        me.executeOptionTkt(this.p.bean, 'U', this.recalculoVuelo);
                                    }
                                }
                            });
                        }else if(this.FUNCION === 'INSERT'){
                            Ext.Msg.show({
                                title: '.:PRAXIS:.',
                                msg: 'Are you sure to insert?',
                                buttons: Ext.MessageBox.OKCANCEL,
                                scope: this,
                                icon: Ext.MessageBox.QUESTION,
                                modal: true,
                                fn: function(btn) {
                                    if (btn === 'ok') {
                                        me.executeOptionTkt(this.p.bean, 'I', '');
                                    }
                                }
                            });
                        }
                    }
                }
                break;
            case 'I':
                this.limpiarData();
                me.validateProgram(Ext.getCmp(prototype.id+'-btn-save'), meEntryTick.NPROG, 'C');
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                this.cambiarEstadoDatosClave('Habilitar');
                break;
            case 'U':
                this.limpiarData();
                this.mostrarData(this.p.bean);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                me.validateProgram(Ext.getCmp(prototype.id+'-btn-update'), meEntryTick.NPROG, 'M');
                me.validateProgram(Ext.getCmp(prototype.id+'-btn-delete'), meEntryTick.NPROG, 'E');
                this.cambiarEstadoDatosClave('Deshabilitar');
                break;
            case 'S':
                this.limpiarData();
                this.mostrarData(this.p.bean);
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                break;
        }
    },
    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        Ext.getCmp(prototype.id + '-txtTicket').setValue("");
        Ext.getCmp(prototype.id + '-txtDCHEQ').setValue("");
        Ext.getCmp(prototype.id + '-txtSEQ').setValue("");
        Ext.getCmp(prototype.id + '-txtFCONT').setValue("");
        Ext.getCmp(prototype.id + '-txtID').setValue("");
        Ext.getCmp(prototype.id + '-txtCDEPART').setValue("");
        Ext.getCmp(prototype.id + '-txtCARRIVA').setValue("");
        Ext.getCmp(prototype.id + '-txtZONE').setValue("");
        Ext.getCmp(prototype.id + '-txtNFLIGHT').setValue("");
        Ext.getCmp(prototype.id + '-txtDFLIGHT').setValue("");
        Ext.getCmp(prototype.id + '-txtFOPERZUL').setValue("");
        Ext.getCmp(prototype.id + '-txtNPLANE').setValue("");
        Ext.getCmp(prototype.id + '-txtLEGSEQ').setValue("");
        Ext.getCmp(prototype.id + '-txtFDUP').setValue("");
        Ext.getCmp(prototype.id + '-cmbFTE').setValue("");
        Ext.getCmp(prototype.id + '-cmbSTORG').setValue("");
        Ext.getCmp(prototype.id + '-cmbSTVAL').setValue("");
        Ext.getCmp(prototype.id + '-cmbFVAL').setValue("");
        Ext.getCmp(prototype.id + '-cmbSTCON').setValue("");
        Ext.getCmp(prototype.id + '-cmbFINVO').setValue("");
        Ext.getCmp(prototype.id + '-cmbFload').setValue("");
        Ext.getCmp(prototype.id + '-txtCDOC').setValue("");
        Ext.getCmp(prototype.id + '-cmbTDOC').setValue("");
        Ext.getCmp(prototype.id + '-txtPSVVTA').setValue("");
        Ext.getCmp(prototype.id + '-txtAGTIA').setValue("");
        Ext.getCmp(prototype.id + '-txtFVTA').setValue("");
        Ext.getCmp(prototype.id + '-cmbTVTA').setValue("");
        Ext.getCmp(prototype.id + '-cmbTPAX').setValue("");
        Ext.getCmp(prototype.id + '-cmbTOPUS').setValue("");
        Ext.getCmp(prototype.id + '-txtCARR').setValue("");
        Ext.getCmp(prototype.id + '-txtCABI').setValue("");
        Ext.getCmp(prototype.id + '-txtCLAS').setValue("");
        Ext.getCmp(prototype.id + '-txtFBASE').setValue("");
        Ext.getCmp(prototype.id + '-txtVCPN').setValue("0");
        Ext.getCmp(prototype.id + '-txtVCPN0').setValue("0");
        Ext.getCmp(prototype.id + '-txtVCPN16').setValue("0");
        Ext.getCmp(prototype.id + '-cmbMDACP').setValue("");
        Ext.getCmp(prototype.id + '-txtCOMISI').setValue("0");
        Ext.getCmp(prototype.id + '-txtVTAX').setValue("0");
        Ext.getCmp(prototype.id + '-txtVCPMX').setValue("0");
        Ext.getCmp(prototype.id + '-txtUSCR').setValue("");
        Ext.getCmp(prototype.id + '-txtFECR').setValue("");
        Ext.getCmp(prototype.id + '-txtHOCR').setValue("");
        Ext.getCmp(prototype.id + '-txtUSUP').setValue("");
        Ext.getCmp(prototype.id + '-txtFEUP').setValue("");
        Ext.getCmp(prototype.id + '-txtHOUP').setValue("");
        this.recalculoVuelo = "";
        Ext.getCmp(prototype.id + '-txtFECVAL').setValue("");
        Ext.getCmp(prototype.id + '-txtVYQ').setValue("0");
        Ext.getCmp(prototype.id + '-txtVYQ0').setValue("0");
        Ext.getCmp(prototype.id + '-txtVYQ16').setValue("0");
    },
    //</editor-fold>
    btnFacsimil_clickHandler: function() {
        var bean104 = {};
        bean104.FUENTE = this.p.bean.strFuente;
        if(this.p.bean.CPN_Billed>1){
            bean104.TDNR =this.p.bean.CCIA + this.p.bean.FORMA + this.p.bean.SERIE+'                  '+this.p.bean.monthTo;
	}else{
            bean104.TDNR = this.p.bean.CCIA + this.p.bean.FORMA + this.p.bean.SERIE;
	}
        bean104.CPUI = this.p.bean.CUPON;
	bean104.COUNTRY = this.p.bean.PSVVTA;
	bean104.HRED = this.p.bean.FVTA;
	bean104.DPROCE = this.p.bean.DFLIGHT;
        console.log(bean104);
        if(this.p.bean.CCIA === '139'){
            var params = {};
            params.bean = bean104;
            if(this.p.bean.FVAL==='3'){
                params.strVTR = 'OLD';
            }else{
                params.strVTR = 'VTR';
            }
            Ext.create('Ext.Praxis.view.screens.ScrProrrateoNewForm', {
                id: 'ScrProrrateoNewForm',
                params: params
            }).show();
        } else {
            this.viewProrate(bean104);
//            Ext.create('Ext.Praxis.view.program.ProFacsimilForm.ProFacsimilForm', {
//                id: 'ProFacsimilForm',
//                params: {
//                    data: bean104
//                }
//            }).show();
//            me.post_to_url(CONTEXTPATH + '/Home?'
//                + 'data=' + JSON.stringify(bean104) + '&'
//                + 'backBox=' + this.p.boxActual + '&'
//                + 'ticket=' + Ext.getCmp(prototype.id+'-txtTicket').getValue()+ '&'
//                + 'back=FlightConciliation&'
////                + 'lblTitleReporte="Facsimil Information"'
//                + '#program-pro-facsimil-form', {}, 'post', 'ProFacsimilForm');
        }
    },
    viewProrate: function(bean104) {
           
        prototypeProgram.view = 'flown-flight-conciliation-form';
        prototypeProgram.nprog = 'PX00000095';
        prototypeProgram.title = 'Flight Conciliation';
        prototypeProgram.modulo = '';
        
        win.displayProFacsimilSearch(me, bean104,'FlightConciliation');
        this.view.close();
    },
    buscarDatosVenta: function(textfield, newValue, oldValue) {
        if (this.p.actionCode === 'I') {
            this.onValidarChange();
            var txtTicket = Ext.getCmp(prototype.id + '-txtTicket').getValue();
            if (txtTicket.length === 14) {
                var beanOption = {};
                this.llenarData(beanOption);
                beanOption.CCIA = txtTicket.substring(0, 3);
                beanOption.FORMA = txtTicket.substring(3, 7);
                beanOption.SERIE = txtTicket.substring(7, 13);
                beanOption.CUPON = txtTicket.substring(13, 14);
                me.buscarDatosVenta(beanOption);
            }
        }
    },
    onValidarChange: function() {
        var list = Ext.getCmp(prototype.id + '-txtTicket').getValue().replace(/\s/g, "").split("");
        var txtTicket = '';
        for (var i = 0; i < list.length; i++) {
            if (this.esNumero(list[i])) {
                txtTicket += list[i];
            }
        }
        Ext.getCmp(prototype.id + '-txtTicket').setValue(txtTicket.substring(0, 14));
    },
    esNumero: function(valor) {
        return valor.toLowerCase() === valor.toUpperCase();
    },
    
    //<editor-fold defaultstate="collapsed" desc="button">
    onSaveClick: function(btn) {
        this.FUNCION = 'INSERT';
        var beanOption = {};
        this.llenarData(beanOption);
        this.recalculoVuelo = '';
        
        if(beanOption.strTicket.length === 14){
            beanOption.CCIA = Ext.getCmp(prototype.id + '-txtTicket').getValue().trim().substring(0, 3);
            beanOption.FORMA = Ext.getCmp(prototype.id + '-txtTicket').getValue().trim().substring(3, 7);
            beanOption.SERIE = Ext.getCmp(prototype.id + '-txtTicket').getValue().trim().substring(7, 13);
            beanOption.CUPON = Ext.getCmp(prototype.id + '-txtTicket').getValue().trim().substring(13, 14);

            var msjResult = this.validacionUpdate(beanOption);
            if(msjResult === ''){
                me.validTicket(beanOption, 'false');//false(VALIDA E INSERTA)
            }else{
                global.Msg({msg: msjResult});
            }
	}else{
            global.Msg({msg: 'Airline tickets have 14-digit identification numbers. [CCIA(3)FORM(4)SERIE(6)COUPON(1)]'});
	}
    },
    onUpdateClick: function(btn) {
        this.FUNCION = 'UPDATE';
        var beanOption = {};
        this.llenarData(beanOption);
        beanOption.strTicket = this.p.bean.strTicket;
	beanOption.CCIA = this.p.bean.CCIA;
	beanOption.FORMA = this.p.bean.FORMA;
	beanOption.SERIE = this.p.bean.SERIE;
	beanOption.CUPON = this.p.bean.CUPON;
        
        var msjResult = this.validacionUpdate(beanOption);
        if(msjResult === ''){
            //Valida si se cambió el vuelo 
            if(this.p.bean.NFLIGHT !== beanOption.NFLIGHT || this.p.bean.CDEPART !== beanOption.CDEPART
                     || this.p.bean.CARRIVA !== beanOption.CARRIVA){
                this.recalculoVuelo = 'Y' + this.p.bean.DFLIGHT + this.p.bean.NFLIGHT + this.p.bean.CDEPART + this.p.bean.CARRIVA;
            }
            me.validTicket(beanOption, 'false');//false(VALIDA Y MODIFICA)
        }else{
            this.recalculoVuelo = '';
            global.Msg({msg: msjResult});
        }
    },
    onDeleteClick: function(btn) {
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
                    beanOption.strTicket = this.p.bean.strTicket;
                    beanOption.CCIA = this.p.bean.CCIA;
                    beanOption.FORMA = this.p.bean.FORMA;
                    beanOption.SERIE = this.p.bean.SERIE;
                    beanOption.CUPON = this.p.bean.CUPON;
                    beanOption.SEQ = this.p.bean.SEQ;
                    beanOption.DFLIGHT = this.p.bean.DFLIGHT;
                    beanOption.NFLIGHT = this.p.bean.NFLIGHT;
                    beanOption.CDEPART = this.p.bean.CDEPART;
                    beanOption.CARRIVA = this.p.bean.CARRIVA;

                    if(beanOption.strTicket !== ''){
                        me.executeOptionTkt(beanOption, 'D', '');
                    }else{
                        global.Msg({msg: 'An error has ocurred. Please contact our System Department'});
                    }
                    this.recalculoVuelo = '';
                }
            }
        });
    },
    onPrevClick: function() {
        var rowIndex = this.p.rowIndex;
        if (rowIndex > 0) {
            var data = this.p.lista.getAt(rowIndex - 1).data;
            me.searchBeanTkt(data.strTicket.replace(' ', '').replace(' ', ''), data.SEQ, rowIndex - 1, this.p.lista, "DataEntryTicketFlightConciliationForm", false);
        }
    },
    onNextClick: function() {
        var rowIndex = this.p.rowIndex;
        if (rowIndex < this.p.lista.data.length - 1) {
            var data = this.p.lista.getAt(rowIndex + 1).data;
            me.searchBeanTkt(data.strTicket.replace(' ', '').replace(' ', ''), data.SEQ, rowIndex + 1, this.p.lista, "DataEntryTicketFlightConciliationForm", false);
        }
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(bean) {
        this.setValue("txtTicket", bean.strTicket.replace(' ', '').replace(' ', ''));
        this.setValue("txtDCHEQ", bean.DCHEQ);
        if (bean.SEQ === '') {
            this.setValue("txtSEQ", '00');
        } else {
            this.setValue("txtSEQ", bean.SEQ);
        }
//        if (bean.SEQRO === '') {
//            this.setValue("txtSEQRO", '00');
//        } else {
            this.setValue("txtSEQRO", bean.SEQRO);
//        }
        this.setValue("txtFCONT", bean.FCONT);
        this.setValue("txtID", bean.IDCON);
        this.setValue("txtCDEPART", bean.CDEPART);
        Ext.create('Ext.tip.ToolTip', {
            target: prototype.id+'-txtCDEPART',
            html: bean.strDescCDEPART
        });
        this.setValue("txtCARRIVA", bean.CARRIVA);
        Ext.create('Ext.tip.ToolTip', {
            target: prototype.id+'-txtCARRIVA',
            html: bean.strDescCARRIVA
        });
        this.setValue("txtZONE", bean.ZONA);
        this.setValue("txtNFLIGHT", bean.NFLIGHT);
        this.setValue("txtDFLIGHT", bean.DFLIGHT);
        this.setValue("txtFOPERZUL", bean.FOPERZUL);
        this.setValue("txtNPLANE", bean.NPLANE);
        this.setValue("txtLEGSEQ", bean.LEGSEQ);
        this.setValue("txtFDUP", bean.FDUP);
        if (bean.CCIA !== '139') {
            this.setValue("cmbSTORG", "1");
        } else if(bean.CCIA === '139') {
            this.setValue("cmbSTORG", "2");
        }
        this.setValue("cmbSTVAL", bean.STVAL);
        this.setValue("cmbFload", bean.FLOAD);
        this.setValue("cmbFINVO", bean.FINVO);
        this.setValue("cmbFVAL", bean.FVAL);
        this.setValue("cmbSTCON", bean.STCON);
        this.setValue("cmbFTE", bean.FTE);
        //Sales Information ==============================
        this.setValue("txtCDOC", bean.CDOC);
        this.setValue("cmbTDOC", bean.TDOC);
        this.setValue("txtPSVVTA", bean.PSVVTA);
        Ext.create('Ext.tip.ToolTip', {
            target: prototype.id+'-txtPSVVTA',
            html: bean.strDescPSVVTA
        });
        this.setValue("txtAGTIA", bean.AGTIA);
        this.setValue("txtFVTA", bean.FVTA);
        this.setValue("cmbTVTA", bean.TVTA);
        this.setValue("cmbTPAX", bean.TPAX);
        this.setValue("cmbTOPUS", bean.TOPUS);
        this.setValue("txtCARR", bean.CARR);
        this.setValue("txtCABI", bean.CABI);
        this.setValue("txtCLAS", bean.CLAS);
        this.setValue("txtFBASE", bean.FBASE);
        this.setValue("txtVCPN", this.getFormatNumber(bean.VCPN));
        this.setValue("txtVCPN0", this.getFormatNumber(bean.VCPN0));
        this.setValue("txtVCPN16", this.getFormatNumber(bean.VCPN16));
        this.setValue("cmbMDACP", bean.MDACP);
        this.setValue("txtCOMISI", this.getFormatNumber(bean.COMISI));
        this.setValue("txtVTAX", this.getFormatNumber(bean.VTAX));
        this.setValue("txtVCPMX", this.getFormatNumber(bean.VCPMX));
        this.setValue("txtQTYPAX", bean.QTYPAX);
        
        this.setValue("txtUSCR", bean.USCR);
        this.setValue("txtFECR", bean.FECR);
        this.setValue("txtHOCR", bean.HOCR);
        this.setValue("txtUSUP", bean.USUP);
        this.setValue("txtFEUP", bean.FEUP);
        this.setValue("txtHOUP", bean.HOUP);
        
        this.setValue("txtFECVAL", bean.FECVAL);
        this.setValue("txtVYQ", this.getFormatNumber(bean.VYQ));
        this.setValue("txtVYQ0", this.getFormatNumber(bean.VYQ0));
        this.setValue("txtVYQ16", this.getFormatNumber(bean.VYQ16));
        
        //Sólo son editables si la información que viene es vacía (A pedido de Javier Toledo)
        if(bean.CDOC === '' && bean.TDOC === '' && bean.PSVVTA === ''
		&& bean.AGTIA === '' && bean.FVTA === '' && bean.TVTA === '' 
		&& bean.TPAX === ''){
            Ext.getCmp(prototype.id+'-txtCDOC').setReadOnly(false);
            Ext.getCmp(prototype.id+'-cmbTDOC').enable(true);
            Ext.getCmp(prototype.id+'-txtPSVVTA').setReadOnly(false);
            Ext.getCmp(prototype.id+'-txtAGTIA').setReadOnly(false);
            Ext.getCmp(prototype.id+'-txtFVTA').setReadOnly(false);
            Ext.getCmp(prototype.id+'-cmbTVTA').enable(true);
            Ext.getCmp(prototype.id+'-cmbTPAX').enable(true);
        } else {
            Ext.getCmp(prototype.id+'-txtCDOC').setReadOnly(true);
            Ext.getCmp(prototype.id+'-cmbTDOC').disable(true);
            Ext.getCmp(prototype.id+'-txtPSVVTA').setReadOnly(true);
            Ext.getCmp(prototype.id+'-txtAGTIA').setReadOnly(true);
            Ext.getCmp(prototype.id+'-txtFVTA').setReadOnly(true);
            Ext.getCmp(prototype.id+'-cmbTVTA').disable(true);
            Ext.getCmp(prototype.id+'-cmbTPAX').disable(true);
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanOption) {
        //Llenando los valores ingresados por el usuario =======
        beanOption.strTicket = this.getValue("txtTicket");
	//Status
        if (this.p.actionCode==='I') {
            beanOption.STVAL = '1';
            this.setValue("cmbSTVAL", "1");
            beanOption.FVAL = '';
            beanOption.STCON = '';
        } else {
            beanOption.STVAL = this.getValue("cmbSTVAL");
            beanOption.FVAL = this.getValue("cmbFVAL");
            beanOption.STCON = this.getValue("cmbSTCON");
        }
        beanOption.FCONT = this.getValue('txtFCONT');
        beanOption.IDCON = this.getValue('txtID');
	//Valida el origen según la CIA.
        var cia = beanOption.strTicket.substring(0, 3);
        if(cia === '139'){
            beanOption.STORG = '2';
            this.setValue("cmbSTORG", "2");
	}else{
            beanOption.STORG = '1';
            this.setValue("cmbSTORG", "1");
	}
	//Si la secuencia está en blanco (Insert), coloca x defecto '00'
        if(this.getValue("txtSEQ") === ''){
            beanOption.SEQ = '00';
	}else{
            beanOption.SEQ = this.getValue("txtSEQ");
	}
        beanOption.DCHEQ = this.getValue("txtDCHEQ");
        beanOption.CDEPART = this.getValue("txtCDEPART");
        beanOption.CARRIVA = this.getValue("txtCARRIVA");
        beanOption.ZONA = this.getValue("txtZONE");
        beanOption.NFLIGHT = this.fillZeros(4, this.getValue("txtNFLIGHT"));
        beanOption.DCHEQ = this.getValue("txtDCHEQ");
        beanOption.DFLIGHT = Ext.util.Format.date(this.getValue("txtDFLIGHT"), 'Ymd');
        beanOption.FOPERZUL = Ext.util.Format.date(this.getValue("txtFOPERZUL"), 'Ymd');
        beanOption.NPLANE = this.getValue("txtNPLANE");
        beanOption.LEGSEQ = this.getValue("txtLEGSEQ");
        beanOption.FDUP = this.getValue("txtFDUP");
        beanOption.FTE = this.getValue("cmbFTE");
        beanOption.CDOC = this.getValue("txtCDOC");
        beanOption.TDOC = this.getValue("cmbTDOC");
        beanOption.FINVO = this.getValue("cmbFINVO");
        if (this.getValue("cmbTDOC")==='F') {
            if (this.getValue("txtQTYPAX")!=='') {
                beanOption.QTYPAX = this.getValue("txtQTYPAX").replace(',', '');
            } else {
                beanOption.QTYPAX = 0;
            }
        }
        beanOption.PSVVTA = this.getValue("txtPSVVTA");
        beanOption.AGTIA = this.getValue("txtAGTIA");
        beanOption.FVTA = Ext.util.Format.date(this.getValue("txtFVTA"), 'Ymd');
        beanOption.TVTA = this.getValue("cmbTVTA");
        beanOption.TPAX = this.getValue("cmbTPAX");
        beanOption.TOPUS = this.getValue("cmbTOPUS")===null?"":this.getValue("cmbTOPUS");
        beanOption.CARR = this.getValue("txtCARR");
        beanOption.CABI = this.getValue("txtCABI");
        beanOption.CLAS = this.getValue("txtCLAS");
        beanOption.FBASE = this.getValue("txtFBASE");
        if (this.getValue("txtVCPN")!=='') {
            beanOption.VCPN = this.getValue("txtVCPN").replace(',', '');
        } else {
            beanOption.VCPN = 0;
        }
        if (this.getValue("txtVCPN0")!=='') {
            beanOption.VCPN0 = this.getValue("txtVCPN0").replace(',', '');
        } else {
            beanOption.VCPN0 = 0;
        }
        if (this.getValue("txtVCPN16")!=='') {
            beanOption.VCPN16 = this.getValue("txtVCPN16").replace(',', '');
        } else {
            beanOption.VCPN16 = 0;
        }
        beanOption.MDACP = this.getValue("cmbMDACP");
        if (this.getValue("txtCOMISI")!=='') {
            beanOption.COMISI = this.getValue("txtCOMISI").replace(',', '');
        } else {
            beanOption.COMISI = 0;
        }
        if (this.getValue("txtVTAX")!=='') {
            beanOption.VTAX = this.getValue("txtVTAX").replace(',', '');
        } else {
            beanOption.VTAX = 0;
        }
        if (this.getValue("txtVCPMX")!=='') {
            beanOption.VCPMX = this.getValue("txtVCPMX").replace(',', '');
        } else {
            beanOption.VCPMX = 0;
        }
        if (this.getValue("txtVYQ")!=='') {
            beanOption.VYQ = this.getValue("txtVYQ").replace(',', '');
        } else {
            beanOption.VYQ = 0;
        }
        if (this.getValue("txtVYQ0")!=='') {
            beanOption.VYQ0 = this.getValue("txtVYQ0").replace(',', '');
        } else {
            beanOption.VYQ0 = 0;
        }
        if (this.getValue("txtVYQ16")!=='') {
            beanOption.VYQ16 = this.getValue("txtVYQ16").replace(',', '');
        } else {
            beanOption.VYQ16 = 0;
        }
        beanOption.FECVAL = this.getValue("txtFECVAL");
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="cambiarEstadoDatosClave">
    cambiarEstadoDatosClave: function (accion) {
        if(accion === 'Habilitar'){
            Ext.getCmp(prototype.id + '-txtTicket').setReadOnly(false);
            //Sales Information
            Ext.getCmp(prototype.id + '-txtCDOC').setReadOnly(false);
            Ext.getCmp(prototype.id + '-cmbTDOC').enable(true);
            Ext.getCmp(prototype.id + '-txtPSVVTA').setReadOnly(false);
            Ext.getCmp(prototype.id + '-txtAGTIA').setReadOnly(false);
            Ext.getCmp(prototype.id + '-txtFVTA').enable(true);
            Ext.getCmp(prototype.id + '-txtFVTA').setReadOnly(false);
            Ext.getCmp(prototype.id + '-cmbTVTA').enable(true);
            Ext.getCmp(prototype.id + '-cmbTPAX').enable(true);
            
            Ext.getCmp(prototype.id + '-txtVCPN').setReadOnly(true);
            Ext.getCmp(prototype.id + '-cmbMDACP').disable(true);
            Ext.getCmp(prototype.id + '-txtCOMISI').setReadOnly(true);
            Ext.getCmp(prototype.id + '-txtVTAX').setReadOnly(true);
            Ext.getCmp(prototype.id + '-txtFECVAL').setReadOnly(true);
            Ext.getCmp(prototype.id + '-txtVYQ').setReadOnly(true);
            Ext.getCmp(prototype.id + '-txtVYQ0').setReadOnly(true);
            Ext.getCmp(prototype.id + '-txtVYQ16').setReadOnly(true);
            
            Ext.getCmp(prototype.id + '-txtVCPN0').setReadOnly(true);
            Ext.getCmp(prototype.id + '-txtVCPN16').setReadOnly(true);
        } else {
            Ext.getCmp(prototype.id + '-txtTicket').setReadOnly(true);
            
            Ext.getCmp(prototype.id + '-txtVCPN').setReadOnly(false);
            Ext.getCmp(prototype.id + '-cmbMDACP').enable(true);
            Ext.getCmp(prototype.id + '-txtCOMISI').setReadOnly(false);
            Ext.getCmp(prototype.id + '-txtVTAX').setReadOnly(false);
            Ext.getCmp(prototype.id + '-txtFECVAL').setReadOnly(false);
            Ext.getCmp(prototype.id + '-txtVYQ').setReadOnly(false);
            Ext.getCmp(prototype.id + '-txtVYQ0').setReadOnly(false);
            Ext.getCmp(prototype.id + '-txtVYQ16').setReadOnly(false);
            
            Ext.getCmp(prototype.id + '-txtVCPN0').setReadOnly(false);
            Ext.getCmp(prototype.id + '-txtVCPN16').setReadOnly(false);
        }
    },
    //</editor-fold>
    validacionUpdate: function(beanOption) {
        var msjResult = '';
        //================== VALIDACIÓN =========================================
        //=======================================================================
        //Comprobando que los campos obligatorios sean ingresados
	if(beanOption.strTicket !== '' && beanOption.DCHEQ !== ''
            && beanOption.CDEPART !== '' && beanOption.CARRIVA !== ''
            && beanOption.NFLIGHT !== '' && beanOption.DFLIGHT !== ''
            && beanOption.CABI !== '' && beanOption.CLAS !== ''
            && beanOption.FBASE !== ''){
            // <editor-fold defaultstate="collapsed" desc="Errores">
            var errors = Ext.getCmp(prototype.id+'-txtTicket').getErrors();//Devuelve un arreglo
            if (errors.length>0) {
                msjResult = 'Invalid Ticket Number.';
            }
            if (Ext.getCmp(prototype.id+'-txtDCHEQ').getErrors().length>0) {
                msjResult = 'Invalid Check Digit.';
            }
            if (Ext.getCmp(prototype.id+'-txtCDEPART').getErrors().length>0) {
                msjResult = 'Invalid Departure City.';
            }
            if (Ext.getCmp(prototype.id+'-txtCARRIVA').getErrors().length>0) {
                msjResult = 'Invalid Arrival City.';
            }
            if (Ext.getCmp(prototype.id+'-txtDFLIGHT').getErrors().length>0) {
                msjResult = 'Invalid Flight Date.';
            }
            if (Ext.getCmp(prototype.id+'-txtNFLIGHT').getErrors().length>0) {
                msjResult = 'Invalid Flight Number.';
            }
            if (Ext.getCmp(prototype.id+'-txtCABI').getErrors().length>0) {
                msjResult = 'Invalid Cabin.';
            }
            if (Ext.getCmp(prototype.id+'-txtCLAS').getErrors().length>0) {
                msjResult = 'Invalid Class.';
            }
            if (Ext.getCmp(prototype.id+'-txtFBASE').getErrors().length>0) {
                msjResult = 'Invalid Fare Basis.';
            }
            if (Ext.getCmp(prototype.id+'-txtVCPN').getErrors().length>0) {
                msjResult = 'Invalid Amount value.';
            }
            if (Ext.getCmp(prototype.id+'-txtCOMISI').getErrors().length>0) {
                msjResult = 'Invalid Commission value.';
            }
            if (Ext.getCmp(prototype.id+'-txtVTAX').getErrors().length>0) {
                msjResult = 'Invalid TAX value.';
            }
            if (Ext.getCmp(prototype.id+'-txtFVTA').getErrors().length>0) {
                msjResult = 'Invalid Sales Date.';
            }
            if (Ext.getCmp(prototype.id+'-txtFOPERZUL').getErrors().length>0) {
                msjResult = 'Invalid ZULU Date.';
            }
            // </editor-fold>
            if (msjResult === "") {
                try {
                    if(this.getValue("txtFVTA").getTime() > this.getValue("txtDFLIGHT").getTime()){
                        msjResult= "Sales Date cannot be higher than Flight Date";
                    }else{
                        var fechaHoy = new Date().getTime();
                        if(this.getValue("txtFVTA").getTime() > fechaHoy){
                            msjResult= "Sales Date cannot be higher than Current Date";						
                        }
                        if(this.getValue("txtDFLIGHT").getTime() > fechaHoy){
                            msjResult= "Flight Date cannot be higher than Current Date";						
                        }
                        if(beanOption.TDOC === 'F' && beanOption.QTYPAX === 0){
                            msjResult= "You must enter a Qty Pax.";
                        }
                    }
                } catch(e) {
                    if (e instanceof TypeError) {
                        var fechaHoy = new Date().getTime();
                        if(this.getValue("txtDFLIGHT").getTime() > fechaHoy){
                            msjResult= "Flight Date cannot be higher than Current Date";						
                        }
                        if(beanOption.TDOC === 'F' && beanOption.QTYPAX === 0){
                            msjResult= "You must enter a Qty Pax.";
                        }
                    }
                }
            }
        } else {
            // <editor-fold defaultstate="collapsed" desc="Campos vacíos">
            if (beanOption.strTicket==="") {
                msjResult= 'A Ticket number is required.';
            }
            if (beanOption.DCHEQ==="") {
                msjResult= 'A Check Digit is required.';
            }
            if (beanOption.CDEPART==="") {
                msjResult= 'A Departure City is required.';
            }
            if (beanOption.CARRIVA==="") {
                msjResult= 'An Arrival City is required.';
            }
            if (beanOption.NFLIGHT==="") {
                msjResult= 'A Flight Number is required.';
            }
            if (beanOption.DFLIGHT==="") {
                msjResult= 'A Flight Date is required.';
            }
            if (beanOption.CABI==="") {
                msjResult= 'Cabin field is required.';
            }
            if (beanOption.CLAS==="") {
                msjResult= 'Class field is required.';
            }
            if (beanOption.FBASE==="") {
                msjResult= 'Fare Basis field is required.';
            }
            // </editor-fold>
        }
        return msjResult;
    },
    getFormatNumber: function(txt) {
        return Ext.util.Format.number(txt, '0,000.00');
    },
    fillZeros: function(size, value) {
        for(var i = value.length; i < size; i++){
            value = '0' + value;
        }
        return value;
    },
    setEditable: function(id, b) {
        Ext.getCmp(prototype.id+'-'+id).setReadOnly(!b);
    },
    setEnabled: function(id, b) {
        if(b) Ext.getCmp(prototype.id+'-'+id).enable(true);
        else Ext.getCmp(prototype.id+'-'+id).disable(true);
    },
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    }
    // </editor-fold>
});