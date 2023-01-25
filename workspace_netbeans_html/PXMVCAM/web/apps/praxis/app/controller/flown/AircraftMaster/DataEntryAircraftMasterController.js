Ext.define('Ext.Praxis.controller.flown.AircraftMaster.DataEntryAircraftMasterController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAircraftMasterController',
    meEntry: '',
    p: {},
    beanTMP: {},
    init: function(view){
        meEntry = this;
    },
    afterRender: function(){
        this.p = this.view.params;
        switch( this.p.actionCode ){
            case 'I':
                this.HabilitarCampoClave();
                this.limpiarData();
                Ext.getCmp(prototype.id+'-btnSave').show();
                Ext.getCmp(prototype.id+'-btnUpdate').hide();
                Ext.getCmp(prototype.id+'-btnDelete').hide();
                break;
            case 'U':
                this.DeshabilitarCampoClave();
                this.mostrarData();
                Ext.getCmp(prototype.id+'-btnSave').hide();
                Ext.getCmp(prototype.id+'-btnUpdate').show();
                Ext.getCmp(prototype.id+'-btnDelete').show();
                break;
        }
        global.AccessControlMaganer();
    },
    HabilitarCampoClave: function() {
        Ext.getCmp(prototype.id+'-txtEQUIPO').setReadOnly(false);
        Ext.getCmp(prototype.id+'-txtNUMERO').setReadOnly(false);
        Ext.getCmp(prototype.id+'-txtMATRICULA').setReadOnly(false);
        Ext.getCmp(prototype.id+'-txtMODELO').setReadOnly(false);
    },
    DeshabilitarCampoClave: function() {
        Ext.getCmp(prototype.id+'-txtEQUIPO').setReadOnly(true);
        Ext.getCmp(prototype.id+'-txtNUMERO').setReadOnly(true);
        Ext.getCmp(prototype.id+'-txtMATRICULA').setReadOnly(true);
        Ext.getCmp(prototype.id+'-txtMODELO').setReadOnly(true);
    },
    //<editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(){
        var p = this.view.params;
        rec = p.rec;
        Ext.getCmp(prototype.id+'-txtEQUIPO').setValue(rec.get('EQUIPO'));
        Ext.getCmp(prototype.id+'-txtMODELO').setValue(rec.get('MODELO'));
        Ext.getCmp(prototype.id+'-txtNUMERO').setValue(rec.get('NUMERO'));
        Ext.getCmp(prototype.id+'-txtMATRICULA').setValue(rec.get('MATRIC'));
        Ext.getCmp(prototype.id+'-txtCARRIER').setValue(rec.get('CARRIER'));
        Ext.getCmp(prototype.id+'-txtTURBINA').setValue(rec.get('TURBINA'));
        Ext.getCmp(prototype.id+'-txtTIPO').setValue(rec.get('TIPO'));
        Ext.getCmp(prototype.id+'-txtHORAVLO').setValue(rec.get('HORAVLO'));
        Ext.getCmp(prototype.id+'-cmbESTADO').setValue(rec.get('ESTADO'));
        Ext.getCmp(prototype.id+'-txtTOTMILL').setValue(rec.get('TOTMILL'));
        Ext.getCmp(prototype.id+'-txtTOTGALO').setValue(rec.get('TOTGALO'));
        Ext.getCmp(prototype.id+'-txtTOTCARG').setValue(rec.get('TOTCARG'));
        Ext.getCmp(prototype.id+'-txtPAXF').setValue(rec.get('PAXF'));
        Ext.getCmp(prototype.id+'-txtPAXJ').setValue(rec.get('PAXJ'));
        Ext.getCmp(prototype.id+'-txtPAXY').setValue(rec.get('PAXY'));
        Ext.getCmp(prototype.id+'-txtPAX').setValue(rec.get('PAX'));
        Ext.getCmp(prototype.id+'-txtFECHA').setValue(rec.get('FECHA'));
        Ext.getCmp(prototype.id+'-txtFECHAOP').setValue(rec.get('FECHAOP'));
        Ext.getCmp(prototype.id+'-txtFECINICO').setValue(rec.get('FECINICO'));
        Ext.getCmp(prototype.id+'-txtFECFINCO').setValue(rec.get('FECFINCO'));
        Ext.getCmp(prototype.id+'-txtCOSCOMB').setValue(rec.get('COSCOMB'));
        Ext.getCmp(prototype.id+'-txtCOSCARGO').setValue(rec.get('COSCARGO'));
        Ext.getCmp(prototype.id+'-txtCOSNAV').setValue(rec.get('COSNAV'));
        Ext.getCmp(prototype.id+'-txtCOSATERR').setValue(rec.get('COSATERR'));
        Ext.getCmp(prototype.id+'-txtCOSESTAC').setValue(rec.get('COSESTAC'));
        Ext.getCmp(prototype.id+'-txtCOSTRIPU').setValue(rec.get('COSTRIPU'));
        Ext.getCmp(prototype.id+'-txtCOSOTROS').setValue(rec.get('COSOTROS'));
        Ext.getCmp(prototype.id+'-txtPESO').setValue(rec.get('PESO'));
        Ext.getCmp(prototype.id+'-txtPESOMAX').setValue(rec.get('PESOMAX'));
        Ext.getCmp(prototype.id+'-txtUSCR').setValue(rec.get('USCR'));
        Ext.getCmp(prototype.id+'-txtFECR').setValue(rec.get('FECR'));
        Ext.getCmp(prototype.id+'-txtHOCR').setValue(rec.get('HOCR'));
        Ext.getCmp(prototype.id+'-txtUSUP').setValue(rec.get('USUP'));
        Ext.getCmp(prototype.id+'-txtFEUP').setValue(rec.get('FEUP'));
        Ext.getCmp(prototype.id+'-txtHOUP').setValue(rec.get('HOUP'));
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function(){
        Ext.getCmp(prototype.id+'-txtEQUIPO').setValue('');
        Ext.getCmp(prototype.id+'-txtNUMERO').setValue('');
        Ext.getCmp(prototype.id+'-txtMATRICULA').setValue('');
        Ext.getCmp(prototype.id+'-txtMODELO').setValue('');
        //1
        Ext.getCmp(prototype.id+'-txtTURBINA').setValue('');
        Ext.getCmp(prototype.id+'-txtTIPO').setValue('');
        Ext.getCmp(prototype.id+'-txtHORAVLO').setValue('');
        Ext.getCmp(prototype.id+'-cmbESTADO').setValue('');
        Ext.getCmp(prototype.id+'-txtTOTMILL').setValue('');
        Ext.getCmp(prototype.id+'-txtTOTGALO').setValue('');
        Ext.getCmp(prototype.id+'-txtTOTCARG').setValue('');
        Ext.getCmp(prototype.id+'-txtPAXF').setValue('');
        Ext.getCmp(prototype.id+'-txtPAXJ').setValue('');
        Ext.getCmp(prototype.id+'-txtPAXY').setValue('');
        Ext.getCmp(prototype.id+'-txtPAX').setValue('');
        Ext.getCmp(prototype.id+'-txtFECHA').setValue('');
        Ext.getCmp(prototype.id+'-txtFECHAOP').setValue('');
        Ext.getCmp(prototype.id+'-txtFECFINCO').setValue('');
        Ext.getCmp(prototype.id+'-txtCOSCOMB').setValue('');
        Ext.getCmp(prototype.id+'-txtCOSCARGO').setValue('');
        Ext.getCmp(prototype.id+'-txtCOSNAV').setValue('');
        Ext.getCmp(prototype.id+'-txtCOSATERR').setValue('');
        Ext.getCmp(prototype.id+'-txtCOSESTAC').setValue('');
        Ext.getCmp(prototype.id+'-txtCOSTRIPU').setValue('');
        Ext.getCmp(prototype.id+'-txtCOSOTROS').setValue('');
        //2
        Ext.getCmp(prototype.id+'-txtUSCR').setValue('');
        Ext.getCmp(prototype.id+'-txtFECR').setValue('');
        Ext.getCmp(prototype.id+'-txtHOCR').setValue('');
        Ext.getCmp(prototype.id+'-txtUSUP').setValue('');
        Ext.getCmp(prototype.id+'-txtFEUP').setValue('');
        Ext.getCmp(prototype.id+'-txtHOUP').setValue('');
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="button">
    btnSave_clickHandler: function(btn){
        Ext.Msg.show({
            title:'.:PRAXIS:.',
            msg: 'Are you sure to insert?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: meEntry,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn){
                if (btn === 'ok'){
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);
                    if(msjResult === ''){
                        me.MaintenanceA1702(beanTemp, 'I');
                    }else{
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    btnUpdate_clickHandler: function(btn) {
        var p = this.view.params;
        Ext.Msg.show({
            title:'.:PRAXIS:.',
            msg: 'Are you sure to update?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: meEntry,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn){
                if (btn === 'ok'){
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    me.MaintenanceA1702(beanTemp, 'U');
                }
            }
        });
    },
    btnDelete_clickHandler: function(btn) {
        var p = this.view.params;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: meEntry,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    me.MaintenanceA1702(this.view.params.rec.data, 'U');
                }
            }
        });
    },
    btnCancel_clickHandler: function(btn){
        this.view.close();
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
        beanTemp.EQUIPO   = Ext.getCmp(prototype.id+'-txtEQUIPO').getValue();
	beanTemp.MODELO   = Ext.getCmp(prototype.id+'-txtMODELO').getValue();
	beanTemp.NUMERO   = Ext.getCmp(prototype.id+'-txtNUMERO').getValue();
	beanTemp.MATRIC   = Ext.getCmp(prototype.id+'-txtMATRICULA').getValue();
	beanTemp.HORAVLO  = Number(Ext.getCmp(prototype.id+'-txtHORAVLO').getValue());
	beanTemp.TOTMILL  = Number(Ext.getCmp(prototype.id+'-txtTOTMILL').getValue());
	beanTemp.TOTGALO  = Number(Ext.getCmp(prototype.id+'-txtTOTGALO').getValue());
	beanTemp.TOTCARG  = Number(Ext.getCmp(prototype.id+'-txtTOTCARG').getValue());
	
	beanTemp.ESTADO = Ext.getCmp(prototype.id+'-cmbESTADO').getValue();
	
	beanTemp.PAX      = Number(Ext.getCmp(prototype.id+'-txtPAX').getValue());
	beanTemp.PAXF     = Number(Ext.getCmp(prototype.id+'-txtPAXF').getValue());
	beanTemp.PAXJ     = Number(Ext.getCmp(prototype.id+'-txtPAXJ').getValue());
	beanTemp.PAXY     = Number(Ext.getCmp(prototype.id+'-txtPAXY').getValue());
	beanTemp.TURBINA  = Number(Ext.getCmp(prototype.id+'-txtTURBINA').getValue());
	beanTemp.FECHA    = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtFECHA').getValue(), 'Ymd');
	beanTemp.TIPO     = Ext.getCmp(prototype.id+'-txtTIPO').getValue();
	beanTemp.FECHAOP  = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtFECHAOP').getValue(), 'Ymd');
	beanTemp.FECINICO = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtFECINICO').getValue(), 'Ymd');
	beanTemp.FECFINCO = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtFECFINCO').getValue(), 'Ymd');
	beanTemp.CARRIER  = Ext.getCmp(prototype.id+'-txtCARRIER').getValue();
	
	beanTemp.PESO     = Number(Ext.getCmp(prototype.id+'-txtPESO').getValue());
	beanTemp.PESOMAX  = Number(Ext.getCmp(prototype.id+'-txtPESOMAX').getValue());
	
	beanTemp.COSCOMB  = Number(Ext.getCmp(prototype.id+'-txtCOSCOMB').getValue());
	beanTemp.COSCARGO = Number(Ext.getCmp(prototype.id+'-txtCOSCARGO').getValue());
	beanTemp.COSNAV   = Number(Ext.getCmp(prototype.id+'-txtCOSNAV').getValue());
	beanTemp.COSATERR = Number(Ext.getCmp(prototype.id+'-txtCOSATERR').getValue());
	beanTemp.COSESTAC = Number(Ext.getCmp(prototype.id+'-txtCOSESTAC').getValue());
	beanTemp.COSTRIPU = Number(Ext.getCmp(prototype.id+'-txtCOSTRIPU').getValue());
	beanTemp.COSOTROS = Number(Ext.getCmp(prototype.id+'-txtCOSOTROS').getValue());
	
	
	beanTemp.USCR = Ext.getCmp(prototype.id+'-txtUSCR').getValue();
	beanTemp.FECR = Ext.getCmp(prototype.id+'-txtFECR').getValue();
	beanTemp.HOCR = Ext.getCmp(prototype.id+'-txtHOCR').getValue();
	beanTemp.USUP = Ext.getCmp(prototype.id+'-txtUSUP').getValue();
	beanTemp.FEUP = Ext.getCmp(prototype.id+'-txtFEUP').getValue();
	beanTemp.HOUP = Ext.getCmp(prototype.id+'-txtHOUP').getValue();
    },
    //</editor-fold>
    validacionInsert: function(beanTemp) {
        var msjResult = '';
	if(beanTemp.EQUIPO === '' || beanTemp.MODELO === '' || beanTemp.NUMERO === '' || beanTemp.MATRIC === '' ){
            msjResult = "You must enter all required fields.";
	}
	return  msjResult;
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    }
});