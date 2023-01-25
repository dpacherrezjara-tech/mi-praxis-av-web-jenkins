    Ext.define('Ext.Praxis.controller.plm.MasterClassifications.DataEntryMasterClassificationsController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryMasterClassificationsController',
    bean: {},
    beanOption: {},
    init: function(view) {
    },
    afterRender: function(){
        switch(this.actionCode){
            case 'I':
                win.visible('1-btn-save', true);
                win.visible('1-btn-update', false);
                win.visible('1-btn-delete', false);
                break;
            case 'U':
                win.visible('1-btn-save', false);
                win.visible('1-btn-update', true);
                win.visible('1-btn-delete', true);
                this.mostrarData();
                break;
        }
    },
    mostrarData: function () {
        win.setValue('1-txtCode', this.bean.A3379CLASI);
        win.setValue('1-txtDescription', this.bean.A3379DCLAS);
        win.setValue('1-lblCLASI_OLD', this.bean.A3379CLASI);
        
        win.setValue('1-txtUSCR', this.bean.A3379USCR);
        if( this.bean.A3379FHCR !== "" ){
            win.setValue('1-txtFECR', this.bean.A3379FHCR.substring(0,4)+"/"+this.bean.A3379FHCR.substring(5,7)+"/"+this.bean.A3379FHCR.substring(8,10));
            win.setValue('1-txtHOCR', this.bean.A3379FHCR.substring(11,13)+":"+this.bean.A3379FHCR.substring(14,16)+":"+this.bean.A3379FHCR.substring(17,19));
        }else{
            win.setValue('1-txtFECR', "");
            win.setValue('1-txtHOCR', "");
        }
        win.setValue('1-txtUSUP', this.bean.A3379USUP);
        if( this.bean.A3379FCUP !== "" ){
            win.setValue('1-txtFEUP', this.bean.A3379FCUP.substring(0,4)+"/"+this.bean.A3379FCUP.substring(5,7)+"/"+this.bean.A3379FCUP.substring(8,10));
            win.setValue('1-txtHOUP', this.bean.A3379FCUP.substring(11,13)+":"+this.bean.A3379FCUP.substring(14,16)+":"+this.bean.A3379FCUP.substring(17,19));
        }else{
            win.setValue('1-txtFEUP', "");
            win.setValue('1-txtHOUP', "");
        }
    },
    llenarData: function(){
        this.beanOption.IN_A3379CLASI = win.getValue('1-txtCode');
        this.beanOption.IN_A3379DCLAS = win.getValue('1-txtDescription');
        this.beanOption.IN_A3379CLASI_OLD = win.getValue('1-lblCLASI_OLD');
    },
        
    //<editor-fold defaultstate="collapsed" desc="button">
    btnInsert_clickHandler: function () {
        if(this.validaRequiredFields()){
            if(win.getValue('1-txtCode').trim().length < 3){
                global.Msg({msg: 'Code must be of 3 characters'});
		return;
            }
            this.llenarData();
            
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert? ',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.CRUD(this.beanOption, 'I');
                    }
                }
            });
        }else{
            global.Msg({msg: 'Insert fields required.'});
        }
    },
    btnUpdate_clickHandler: function () {
        if(this.validaRequiredFields()){
            if(win.getValue('1-txtCode').trim().length < 3){
                global.Msg({msg: 'Code must be of 3 characters'});
		return;
            }
            this.llenarData();
            
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.CRUD(this.beanOption, 'U');
                    }
                }
            });
        }else{
            global.Msg({msg: 'Insert fields required.'});
        }
    },
    btnDelete_clickHandler: function () {
        this.llenarData();
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.CRUD(this.beanOption, 'D');
                }
            }
        });
    },
    onCancelClick: function () {
        this.view.close();
    },
    //</editor-fold>
    
    validaRequiredFields: function(){
        var bvalida = true;								
	if( win.getValue('1-txtDescription').trim().length === 0 || win.getValue('1-txtCode').trim().length === 0 ){
            bvalida = false;
	}
	return bvalida;
    },
    
    //<editor-fold defaultstate="collapsed" desc="mantenimientoEMD">
    CRUD: function (beanOption, strOption) {
        var me1 = this;
        Ext.Ajax.request({
            url: prototype.url + '/CRUD',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanOption),strOption: strOption},
            beforerequest: Ext.getCmp('DataEntryMasterClassificationsForm').mask('Loading...'),
            success: function (response, opts) {
                console.log("B");
                Ext.getCmp('DataEntryMasterClassificationsForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: res.MESSAGE,
                        buttons: Ext.MessageBox.YES,
                        scope: this,
                        icon: Ext.MessageBox.INFO,
                        modal: true,
                        fn: function(btn) {
                            me.search(me.bean);
                            me1.view.close();
                        }
                    });
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryMasterClassificationsForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
});