Ext.define('Ext.Praxis.controller.panel.Users.DataEntryUsersController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryUsersController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    msjAlert: '',
    beanOption: '',
    dataentryParams: {},
    // </editor-fold>
    init: function(view) {
        this.setStoreData();
    },
    afterRender: function(){
        this.p = this.view.params;
        
        switch( this.p.action ){
            case 'U':
                this.mostrarData(this.p.rec);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').show();
                Ext.getCmp(prototype.id+'-btn-delete').show();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
//                Ext.getCmp(prototype.id + '-obj').setValue("X");
//                Ext.getCmp(prototype.id + '-obj').focus();
                break;                
                
        }
        this.setValue("cboCity", "");
        // global.AccessControlMaganer();
    },
    onMostrarCampoChange: function(cmp, newValue, oldValue, eOpts) {
        this.limpiarCampos();        
    },        
    
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    setStoreData: function() {
        
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(rec) {
        console.log('log rec');
        console.log(rec);
        this.setValue('txtUSR', rec.get('USR'));
        this.setValue('cboCity', rec.get('CITY'));
        Ext.getCmp(prototype.id+'-chkStatus').setValue(rec.get('STAT') === 'ACTIVO' ? true : false);
        
        // <editor-fold defaultstate="collapsed" desc="ControlData">
        this.setValue('USCR', rec.get('USCR'));
        this.setValue('FECR', rec.get('DTCR'));
        //this.setValue('HOCR', rec.get('HOCR'));
        this.setValue('USUP', rec.get('USUP'));
        this.setValue('FEUP', rec.get('DTUP'));
        //this.setValue('HOUP', rec.get('HOUP'));
        // </editor-fold>
    },
    // </editor-fold>   
    
    // <editor-fold defaultstate="collapsed" desc="CRUD">
    onSaveClick: function(btn) {
        if (this.validaRequiredFields()) {            
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "I";
                        this.llenarData();
                        this.crud();
                    }
                }
            });               
        } else {
            var msg = this.msjAlert;
            if (msg==='') msg = 'You must enter all required fields.';
            global.Msg({
                msg: msg
            });
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
                        this.view.params.action = "U";
                        this.llenarData();
                        this.crud();
                    }
                }
            });               
        } else {
            var msg = this.msjAlert;
            if (msg==='') msg = 'You must enter all required fields.';
            global.Msg({
                msg: msg
            });
        }
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onDeleteClick: function(btn){        
                         
    },
    // </editor-fold>
    
    validaRequiredFields: function() {
        if(this.p.action==='I')
        {
            if (this.getValue('txtUSR')==='' || this.getValue('txtDESC')==='' || this.getValue('cboCity') === '') {
                this.msjAlert='Enter mandatory data';
                return false;
            }  
        }
        
        if(this.p.action==='U')
        {
            if (this.getValue('txtUSR')==='' || this.getValue('cboCity') === '') {
                this.msjAlert='Enter mandatory data';
                return false;
            }      
        }        
              
        return true;
    },
    
    crud: function() {
        var mod = this;
        Ext.Ajax.request({
            url: prototype.url + '/setMantUser',
            method: 'POST',
            timeout: 60000000,
            params: this.beanOption,
            
            beforerequest: Ext.getCmp('DataEntryUsersForm').mask('Loading...'),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msg = res.response;
                    var msgInt = res.sql_code;
                        
                    var icon=1;
                    if(msgInt==='779'){
                        icon=2;
                    }
                    global.Msg({
                        msg: msg,
                        icon: icon,
                        fn: function() {
                            if (msgInt==='779') {
                                Ext.getCmp('DataEntryUsersForm').close(),
                                Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                            }
                        }
                    });
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                Ext.getCmp('DataEntryUsersForm').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp('DataEntryUsersForm').unmask();
            }
        });
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
    // </editor-fold>
    
    llenarData: function() {
        this.beanOption = {};
        
        var USR = this.getValue('txtUSR');
        var DESC = this.getValue('txtDESC');
        var CITY = this.getValue('cboCity');
        var chkExpiredDate = Ext.getCmp(prototype.id+'-chkExpiredDate').getValue() ? 'true' : 'false';
        var DTEXPIRED = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtExpDate').getValue(), 'Ymd')        
        var chkPass = Ext.getCmp(prototype.id+'-chkPass').getValue() ? 'true' : 'false';
        var txtPass = this.getValue('txtPass');
        var strOption = this.p.action;
        var STAT =  Ext.getCmp(prototype.id+'-chkStatus').getValue() ? 'A' : 'L';
        this.beanOption = {
            USR: USR,
            DESC: DESC,
            CITY: CITY,
            chkExpiredDate: chkExpiredDate,
            DTEXPIRED: DTEXPIRED,
            chkPass: chkPass,
            txtPass: txtPass,
            STAT: STAT,
            strOption: strOption
        };
        console.log('beanOption');
        console.log(this.beanOption);    
    },
    limpiarCampos: function() {
                     
        //this.setValue("txtProcessDate", "");
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },   
});