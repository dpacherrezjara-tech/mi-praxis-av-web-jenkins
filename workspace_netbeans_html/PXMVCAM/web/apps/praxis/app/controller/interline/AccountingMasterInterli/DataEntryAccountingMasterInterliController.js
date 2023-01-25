Ext.define('Ext.Praxis.controller.interline.AccountingMasterInterli.DataEntryAccountingMasterInterliController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAccountingMasterInterliController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    PERMISO: false,
    bean: {},
    // </editor-fold>
    init: function(view) {
        meDE = this;
        var p = this.view.params;
        this.actionCode = p.action;
        this.bean = p.bean;
        this.objPermiso = p.objPermiso;
    },
    afterRender: function() {
        meDE.PERMISO = win.validateAccess(this.objPermiso, this.actionCode);
        
        Ext.getCmp(prototype.id + '-btn-save').hide();
        Ext.getCmp(prototype.id + '-btn-update').hide();
        Ext.getCmp(prototype.id + '-btn-delete').hide();
        switch (this.actionCode) {
            case 'A':
                if(meDE.PERMISO){
                    Ext.getCmp(prototype.id + '-btn-save').show();
                }
                break;
            case 'M':
                if(meDE.PERMISO){
                    Ext.getCmp(prototype.id + '-btn-update').show();
                    Ext.getCmp(prototype.id + '-btn-delete').show();
                }
                this.mostrarData();
                break;
        }
        this.focus('txtA1740TITRA');
        // global.AccessControlMaganer();
    },
    Handler_Change_DocumentType: function() {
        var TypeDocument = this.getValue("txtA1740TITRA");
        switch (TypeDocument) {
            case 'EMD':
                Ext.getCmp(prototype.id + '-label_required01').show();
                Ext.getCmp(prototype.id + '-label_required02').show();
                Ext.getCmp(prototype.id + '-label_required03').show();
                break;
            case 'MPD':
                Ext.getCmp(prototype.id + '-label_required01').show();
                Ext.getCmp(prototype.id + '-label_required02').show();
                Ext.getCmp(prototype.id + '-label_required03').hide();
                break;
            default:
                Ext.getCmp(prototype.id + '-label_required01').show();
                Ext.getCmp(prototype.id + '-label_required02').hide();
                Ext.getCmp(prototype.id + '-label_required03').hide();
                break;
        }
    },
    //<editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function(btn) {
        if (this.validaRequiredFields()) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        var beanOption = {};
                        this.llenarData(beanOption);
                        beanOption.strOption = 'I';
                        this.Maintance(beanOption);
                    }
                }
            });
        } else {
            global.Msg({ msg: 'Insert fields required.'});
        }
    },
    onUpdateClick: function(btn) {
        if (this.validaRequiredFields()) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        var beanOption = {};
                        this.llenarData(beanOption);
                        beanOption.strOption = 'U';
                        this.Maintance(beanOption);
                    }
                }
            });
        } else {
            global.Msg({ msg: 'Insert fields required.'});
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
                    var beanOption = {};
                    this.llenarData(beanOption);
                    beanOption.strOption = 'D';
                    this.Maintance(beanOption);
                }
            }
        });
    },
    onCancelClick: function(btn) {
        this.view.close();
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Maintance">
    Maintance: function(beanOption) {
        Ext.Ajax.request({
            url: prototype.url+'/Maintance',
            method: 'POST',
            timeout: 60000000,
            params: beanOption,
            beforerequest: Ext.getCmp('DataEntryAccountingMasterInterliForm').mask('Loading...'),
            success: function(response, opts){
                Ext.getCmp('DataEntryAccountingMasterInterliForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: res.intResult,
                        buttons: Ext.MessageBox.YES,
                        scope: this,
                        icon: Ext.MessageBox.INFO,
                        modal: true,
                        fn: function(btn) {
                            if (btn === 'yes') {
                                meDE.view.close();
                                Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                            }
                        }
                    });
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp('DataEntryAccountingMasterInterliForm').unmask();
            }
        });
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function() {
        this.setValue('cmbCtaType2', this.bean.A1740TIPO);
        
        this.setValue('txtA1740TITRA', this.bean.A1740TITRA);
        this.setValue('txtA1740SUBTI', this.bean.A1740SUBTI);
        this.setValue('txtA1740CATEG', this.bean.A1740CATEG);
        this.setValue('cmbINTNU', this.bean.A1740INTNU === 'YES' ? 'Y' : 'N');
        this.setValue('txtA1740CIA', this.bean.A1740CIA);
        this.setValue('txtA1740UNIDA', this.bean.A1740UNIDA);
        this.setValue('txtA1740CECOS', this.bean.A1740CECOS);
        this.setValue('txtA1740UBICA', this.bean.A1740UBICA);
        this.setValue('txtA1740CTA', this.bean.A1740CTA);
        this.setValue('txtA1740SCTA', this.bean.A1740SCTA);
        this.setValue('txtA1740EQUI', this.bean.A1740EQUI);
        this.setValue('txtA1740ICIA', this.bean.A1740ICIA);
        this.setValue('txtA1740CLIE', this.bean.A1740CLIE);
        this.setValue('txtA1740FINI', this.bean.A1740FINI);
        this.setValue('txtA1740FFIN', this.bean.A1740FFIN='9999/99/99' ? '' : this.bean.A1740FFIN);
        
        this.setValue('txtUSCR', this.bean.A1740REGIS);
        this.setValue('txtFECR', this.bean.A1740FREGI);
        this.setValue('txtHOCR', this.bean.A1740HREGI);
        this.setValue('txtUSUP', this.bean.A1740REGVI);
        this.setValue('txtFEUP', this.bean.A1740FREVI);
        this.setValue('txtHOUP', this.bean.A1740HREVI);
        
        this.setValue('lblA1740TITRA', this.bean.A1740TITRA);
        this.setValue('lblA1740TIPO', this.bean.A1740TIPO);
        this.setValue('lblA1740SUBTI', this.bean.A1740SUBTI);
        this.setValue('lblA1740CATEG', this.bean.A1740CATEG);
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanOption) {
        beanOption.A1740CCUST = '139';
	beanOption.A1740TITRA = this.getValue("txtA1740TITRA");//String(cmbDocumentType.selectedItem.data);
	beanOption.A1740TIPO = this.getValue("cmbCtaType");
	beanOption.A1740SUBTI = this.getValue("txtA1740SUBTI");
        beanOption.A1740INTNU = this.getValue("cmbINTNU");
	beanOption.A1740CATEG = this.getValue("txtA1740CATEG");
	beanOption.A1740CIA = this.getValue("txtA1740CIA");
	beanOption.A1740UNIDA = this.getValue("txtA1740UNIDA");
	beanOption.A1740CECOS = this.getValue("txtA1740CECOS");
	beanOption.A1740UBICA = this.getValue("txtA1740UBICA");
	beanOption.A1740CTA = this.getValue("txtA1740CTA");
	beanOption.A1740SCTA =  this.getValue("txtA1740SCTA");
	beanOption.A1740EQUI =  this.getValue("txtA1740EQUI");
	beanOption.A1740ICIA =  this.getValue("txtA1740ICIA");
	beanOption.A1740CLIE =  this.getValue("txtA1740CLIE");
	beanOption.A1740FINI = Ext.util.Format.date(this.getValue("txtA1740FINI"), 'Ymd');
        var fecha = Ext.util.Format.date(this.getValue("txtA1740FFIN"), 'Ymd');
        beanOption.A1740FFIN =  fecha=='' ? '99999999' : fecha;
	//beanOption.A1740FFIN =  extraer_separador_fecha(app.trim(txtA1740FFIN.text));
	beanOption.IN_A1740TITRA_OLD = this.getValue("lblA1740TITRA");
	beanOption.IN_A1740TIPO_OLD = this.getValue("lblA1740TIPO");
	beanOption.IN_A1740SUBTI_OLD = this.getValue("lblA1740SUBTI");
	beanOption.IN_A1740CATEG_OLD = this.getValue("lblA1740CATEG");
    },
    //</editor-fold>
    validaRequiredFields: function() {
        var bvalida = true;
        var TypeDocument = this.getValue("txtA1740TITRA");
        var cmbINTNU = Ext.getCmp(prototype.id + '-cmbINTNU').getValue();
        switch (TypeDocument) {
            case 'EMD':
                if (cmbINTNU ==="" || this.getValue("cmbCtaType2")==0 || this.getValue("txtA1740SUBTI") == "" || this.getValue("txtA1740CATEG") == "") {
                    bvalida = false;
                }
                break;
            case 'MPD':
                if (cmbINTNU ==="" ||  this.getValue("cmbCtaType2")==0 || this.getValue("txtA1740SUBTI") == "") {
                    bvalida = false;
                }
                break;
            default :
                if (cmbINTNU ==="" ||  this.getValue("txtA1740TITRA").length == 0 || this.getValue("cmbCtaType2")=="") {
                    bvalida = false;
                }
                break;
        }
        return bvalida;
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
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
//            this.btnSearch_click();
        }
    }
    // </editor-fold>
});


