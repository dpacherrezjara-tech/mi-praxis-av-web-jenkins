Ext.define('Ext.Praxis.controller.sales.InputSchemeUpfront.DataEntryRegisterLabelInputSchemeUpfrontController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryRegisterLabelInputSchemeUpfrontController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    actionCode: '',
    bean: {},
    beanLabel: {},
    me: '',
    // </editor-fold>
    init: function(view) {
        me = this;
        this.p = this.view.params;
        this.actionCode = this.p.actionCode;
        this.bean = this.p.bean;
        this.beanLabel = this.p.beanLabel;
    },
    afterRender: function(){
        switch (this.actionCode) {
            case 'I':
                break;
            case 'U':
                this.mostrarData();
                break;
        }
    },
    mostrarData: function() {
        this.setClearCmp();
        this.setValue('EFFEC_DATE', this.beanLabel.A2862EFFST);
        this.setValue('TERM_DATE', this.beanLabel.A2862EFFEN);
        this.setValue('TXT_LABEL', this.beanLabel.A2862LABEN);
        this.setValue('TXT_LABEL_UDT', this.beanLabel.A2862LABEN);
        this.setValue('TXT_CRIERY', this.beanLabel.A2862CRITE);
        this.setValue('TXT_PERCENT_LABEL', this.beanLabel.A2862PERCE);
        this.setValue('TXT_DESCRIPTION', this.beanLabel.A2862LABED);
        this.setValue('CMBELEGIBLE', this.beanLabel.A2862LABET);
    },
    setClearCmp: function() {
        this.setValue('EFFEC_DATE', '');
        this.setValue('TERM_DATE', '');
        this.setValue('TXT_LABEL', '');
        this.setValue('TXT_LABEL_UDT', '');
        this.setValue('TXT_CRIERY', '');
        this.setValue('TXT_PERCENT_LABEL', '');
        this.setValue('CMBELEGIBLE', 'N');
        this.setValue('TXT_DESCRIPTION', '');
    },
    
    setSaveLabel: function(cmp) {
        var beanOption = {};
        var msn = 'Are you sure to insert?';
        this.llenarDataLabel(beanOption);
        var OP;
        if(cmp.id === prototype.id+'-btnx4') OP = 'I';
        else if(cmp.id === prototype.id+'-btnx3') OP = 'D';
        if(OP!=='D'){
            if(!this.set_validate_data_label(beanOption)) return;
	}else{
            if(!this.set_validate_data_label_del(beanOption))return;
	}
	if(OP==='D'){
            msn='Are you sure to delete?';
	}else{
            if(beanOption.A1155FMODI!=="")OP="U";
	}
	if(OP==='U')msn='Are you sure to update?';
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: msn,
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    beanOption.VP_ACTION = OP;
                    this.setMantenimientoLabel(beanOption);
                }
            }
        });
    },
    // <editor-fold defaultstate="collapsed" desc="setMantenimientoLabel">
    setMantenimientoLabel: function(beanOption) {
        Ext.Ajax.request({
            url: prototype.url+'/setMantenimientoLabel',
            method: 'POST',
            timeout: 60000000,
            params: beanOption,
            beforerequest: Ext.getCmp('DataEntryRegisterLabelInputSchemeUpfrontForm').mask('Loading...'),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var response = res.response;
                    var objA1155 = response[0];
                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: objA1155.OU_MESSAGE,
                        buttons: Ext.MessageBox.OK,
                        scope: this,
                        icon: Ext.MessageBox.INFO,
                        modal: true,
                        fn: function(btn) {
                            if (btn === 'ok') {
                                me.setClearCmp();
                                Ext.getCmp('DataEntryRegisterLabelInputSchemeUpfrontForm').unmask();
                                Ext.getCmp('DataEntryRegisterLabelInputSchemeUpfrontForm').close();
                                Ext.getCmp(prototype.id + '-btnSearch3').fireEvent('click', {});
                            }
                        }
                    });
                } else global.Msg({ msg: res.sesion });
                Ext.getCmp('DataEntryRegisterLabelInputSchemeUpfrontForm').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp('DataEntryRegisterLabelInputSchemeUpfrontForm').unmask();
            }
        });
    },
    // </editor-fold>
    llenarDataLabel: function(beanOption) {
        beanOption.A1155AIRLI='139';
	beanOption.A1155CODAC = this.bean.A1155CODAC;
	beanOption.A1155INDAC='U';
	beanOption.A1155VRSAC = this.bean.A1155VRSAC;
	beanOption.A1155FINI  = Ext.util.Format.date(this.getValue('EFFEC_DATE'), 'Ymd');
	beanOption.A1155FFIN  = Ext.util.Format.date(this.getValue('TERM_DATE'), 'Ymd');
	beanOption.A1155FMODI=this.getValue('TXT_LABEL_UDT');
	beanOption.A1155CIAFM=this.getValue('TXT_LABEL');
	beanOption.A1155FNAME=this.getValue('TXT_CRIERY');
	beanOption.A1155PORCENT=this.getValue('TXT_PERCENT_LABEL');
	beanOption.A1155CORRE = this.getValue('CMBELEGIBLE');
	beanOption.A1155FLGFE = this.getValue('TXT_DESCRIPTION');
    },
    set_validate_data_label: function (beanOption) {
        var vl_flag = true;
        if ( beanOption.A1155CODAC === ''){
            global.Msg({ msg: 'MSN, REGISTER SCHEMA ' });
            vl_flag = false;
        } else if ( beanOption.A1155VRSAC === ''){
            global.Msg({ msg: 'MSN, REGISTER SCHEMA ' });
            vl_flag = false;
        } else if ( beanOption.A1155FINI === ''){
            this.focus('EFFEC_DATE');
            global.Msg({ msg: 'Enter, Effective Date Open Label' });
            vl_flag = false;
        } else if ( beanOption.A1155PORCENT === ''){
            this.focus('TXT_PERCENT_LABEL');
            global.Msg({ msg: 'Enter, PERCENT.%' });
            vl_flag = false;
        } else if ( beanOption.A1155CIAFM === ''){
            this.focus('TXT_LABEL');
            global.Msg({ msg: 'Enter, Name Label' });
            vl_flag = false;
        } else if ( beanOption.A1155CORRE === ''){
            this.focus('CMBELEGIBLE');
            global.Msg({ msg: 'Selected, ELIGIBLE' });
            vl_flag = false;
        } else if ( beanOption.A1155FLGFE === ''){
            this.focus('TXT_DESCRIPTION');
            global.Msg({ msg: 'Enter, Description' });
            vl_flag = false;
        }
        return vl_flag;
    },
    set_validate_data_label_del: function (beanOption) {
        var vl_flag = true;
        if ( beanOption.A1155CODAC === ''){
            global.Msg({ msg: 'MSN, REGISTER SCHEMA ' });
            vl_flag = false;
        } else if ( beanOption.A1155VRSAC === ''){
            global.Msg({ msg: 'MSN, REGISTER SCHEMA ' });
            vl_flag = false;
        } else if ( beanOption.A1155CIAFM === ''){
            this.focus('TXT_LABEL');
            global.Msg({ msg: 'Enter, Name Label' });
            vl_flag = false;
        }
        return vl_flag;
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