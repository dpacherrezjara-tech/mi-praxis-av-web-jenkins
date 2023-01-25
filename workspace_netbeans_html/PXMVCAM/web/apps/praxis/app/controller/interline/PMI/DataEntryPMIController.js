    Ext.define('Ext.Praxis.controller.interline.PMI.DataEntryPMIController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryPMIController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    action: '',
    bean: {},
    // </editor-fold>
    afterRender: function(){
        me = this;
        this.p = this.view.params;
        this.action = this.p.action;
        this.bean = this.p.data;
        switch (this.action) {
            case 'I':
                this.HabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.DeshabilitarCampoClave();
                this.mostrarData();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
        // global.AccessControlMaganer();
    },
    mostrarData: function() {
        this.setValue('txtAGREEINDS', this.bean.AGREEINDS);
        this.setValue('txtPMI', this.bean.PMI);
        this.cambiarCombo(Ext.getCmp(prototype.id + '-cmbAVAIBLE'), this.bean.AVAIBLE);
        this.cambiarCombo(Ext.getCmp(prototype.id + '-cmbDUPLICATE'), this.bean.DUPLICATE);
        this.cambiarCombo(Ext.getCmp(prototype.id + '-cmbCARRMATCH'), this.bean.CARRMATCH);
        this.cambiarCombo(Ext.getCmp(prototype.id + '-cmbFAREMATCH'), this.bean.FAREMATCH);
        this.cambiarCombo(Ext.getCmp(prototype.id + '-cmbTAXMATCH'), this.bean.TAXMATCH);
        this.cambiarCombo(Ext.getCmp(prototype.id + '-cmbUATPMATCH'), this.bean.UATPMATCH);
        
        this.setValue('txtVALIDPMI', this.bean.VALIDPMI);
        this.setValue('txtAGREEINDV', this.bean.AGREEINDV);
        this.setValue('txtCOMMENTS', this.bean.COMMENTS);
        
        this.setValue('txtUSCR', this.bean.USCR);
        this.setValue('txtFECR', this.bean.FECR);
        this.setValue('txtHOCR', this.bean.HOCR);
        this.setValue('txtUSUP', this.bean.USUP);
        this.setValue('txtFEUP', this.bean.FEUP);
        this.setValue('txtHOUP', this.bean.HOUP);
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
        beanTemp.AGREEINDS = this.getValue("txtAGREEINDS");
        beanTemp.PMI = this.getValue("txtPMI");
        beanTemp.AVAIBLE = this.getValue("cmbAVAIBLE");
        beanTemp.DUPLICATE = this.getValue("cmbDUPLICATE");
        beanTemp.CARRMATCH = this.getValue("cmbCARRMATCH");
        beanTemp.FAREMATCH = this.getValue("cmbFAREMATCH");
        beanTemp.TAXMATCH = this.getValue("cmbTAXMATCH");
        beanTemp.UATPMATCH = this.getValue("cmbUATPMATCH");
        beanTemp.VALIDPMI = this.getValue("txtVALIDPMI");
        beanTemp.AGREEINDV = this.getValue("txtAGREEINDV");
        beanTemp.COMMENTS = this.getValue("txtCOMMENTS");

        beanTemp.USCR = this.getValue("txtUSCR");
        beanTemp.FECR = this.getValue("txtFECR");
        beanTemp.HOCR = this.getValue("txtHOCR");
        beanTemp.USUP = this.getValue("txtUSUP");
        beanTemp.FEUP = this.getValue("txtFEUP");
        beanTemp.HOUP = this.getValue("txtHOUP");
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
        this.setValue('txtAGREEINDS', '');
        this.setValue('txtPMI', '');
        this.setValue('cmbAVAIBLE', '');
        this.setValue('cmbDUPLICATE', '');
        this.setValue('cmbCARRMATCH', '');
        this.setValue('cmbFAREMATCH', '');
        this.setValue('cmbTAXMATCH', '');
        this.setValue('cmbUATPMATCH', '');
        this.setValue('txtVALIDPMI', '');
        this.setValue('txtAGREEINDV', '');
        this.setValue('txtCOMMENTS', '');
        
        this.setValue('txtUSCR', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSUP', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
    },
    //</editor-fold>
    
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
                    if(msjResult == ''){
                        beanTemp.option = 'I';
                        this.MaintenanceA1849(beanTemp);
                    }else{
                        global.Msg({ msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function(btn) {
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
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    beanTemp.option = 'I';
                    this.MaintenanceA1849(beanTemp);
                }
            }
        });
    },
    onCancelClick: function(btn){
        this.view.close();
        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
    },
    // </editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1849">
    MaintenanceA1849: function(beanTemp) {
        Ext.Ajax.request({
            url: prototype.url+'/MaintenanceA1849',
            method: 'POST',
            timeout: 60000000,
            params: beanTemp,
            beforerequest: Ext.getCmp('DataEntryPMIForm').mask('Loading...'),
            success: function(response, opts){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    global.Msg({ msg: res.Mensaje });
                    Ext.getCmp('DataEntryPMIForm').unmask();
                    me.view.close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp('DataEntryPMIForm').unmask();
            }
        });
    },
    //</editor-fold>

    validacionInsert: function(beanTemp) {
        var msjResult = '';
        return msjResult;
    },
    cambiarCombo: function(cb, flag) {
        if(flag=='YES'){
            cb.setValue('Y');
	}else if(flag=='NO'){
            cb.setValue('N');
	}else{
            cb.setValue('');
	}
    },
    DeshabilitarCampoClave: function() {
        Ext.getCmp(prototype.id + '-txtAGREEINDS').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtVALIDPMI').setReadOnly(true);
    },
    HabilitarCampoClave: function() {
        Ext.getCmp(prototype.id + '-txtAGREEINDS').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtVALIDPMI').setReadOnly(false);
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
//            this.btnSearch_click();
        }
    }
    // </editor-fold>
});