Ext.define('Ext.Praxis.controller.panel.PerPro.DataEntryPerProController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryPerProController',
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
        // global.AccessControlMaganer();
    },
    onMostrarCampoChange: function(cmp, newValue, oldValue, eOpts) {
//        this.limpiarCampos();
        
    },        
    
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    setStoreData: function() {
        
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(rec) {
        console.log('log rec');
        console.log(rec);
        this.setValue('USR', rec.get('USR'));
        this.setValue('NPROG', rec.get('NPROG'));
        this.setValue('PROG', rec.get('PROG'));
        Ext.getCmp(prototype.id+'-chkStatus').setValue(rec.get('STAT') === 'A' ? true : false);
        Ext.getCmp(prototype.id+'-chkAccess').setValue(rec.get('PERMA') === 'Y' ? true : false);
        Ext.getCmp(prototype.id+'-chkRead').setValue(rec.get('PERML') === 'Y' ? true : false);
        Ext.getCmp(prototype.id+'-chkInsert').setValue(rec.get('PERMC') === 'Y' ? true : false);
        Ext.getCmp(prototype.id+'-chkUpdate').setValue(rec.get('PERMM') === 'Y' ? true : false);
        Ext.getCmp(prototype.id+'-chkExport').setValue(rec.get('PERMX') === 'Y' ? true : false);
        Ext.getCmp(prototype.id+'-chkDelete').setValue(rec.get('PERME') === 'Y' ? true : false);
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
                        this.llenarData();
                        //console.log(this.beanOption);
                        this.crud();
                    }
                }
            });                       
    },
    // </editor-fold>
    
    validaRequiredFields: function() {
        if (this.getValue('USR')==='' || this.getValue('NPROG') === null) {
            this.msjAlert='Enter correct data';
            return false;
        }
        return true;
    },
    
    crud: function() {
        var mod = this;
        Ext.Ajax.request({
            url: prototype.url + '/crud',
            method: 'POST',
            timeout: 60000000,
            params: this.beanOption,
            
            beforerequest: Ext.getCmp('DataEntryPerProForm').mask('Loading...'),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msg = res.response;                    
                    var icon=1;
                    global.Msg({
                        msg: msg,
                        icon: icon,
                        fn: function() {
                            if (msg==='Operation was successful') {
                                Ext.getCmp('DataEntryPerProForm').unmask();
//                                Ext.getCmp('DataEntryPerProForm').close(),
//                                Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                            }
                        }
                    });
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                Ext.getCmp('DataEntryPerProForm').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp('DataEntryPerProForm').unmask();
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
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    // </editor-fold>
    
    llenarData: function() {
        this.beanOption = {};
        
        var USR = this.getValue('USR');
        var NPROG = this.getValue('NPROG');
        var STAT =  Ext.getCmp(prototype.id+'-chkStatus').getValue() ? 'A' : 'L';
        var PERMA =  Ext.getCmp(prototype.id+'-chkAccess').getValue() ? 'Y' : 'N';
        var PERML =  Ext.getCmp(prototype.id+'-chkRead').getValue() ? 'Y' : 'N';
        var PERMC =  Ext.getCmp(prototype.id+'-chkInsert').getValue() ? 'Y' : 'N';
        var PERMM =  Ext.getCmp(prototype.id+'-chkUpdate').getValue() ? 'Y' : 'N';
        var PERMX =  Ext.getCmp(prototype.id+'-chkExport').getValue() ? 'Y' : 'N';
        var PERME =  Ext.getCmp(prototype.id+'-chkDelete').getValue() ? 'Y' : 'N';
        this.beanOption = {
            USR: USR,
            NPROG: NPROG,
            STAT: STAT,
            PERMA: PERMA,
            PERML: PERML,
            PERMC: PERMC,
            PERMM: PERMM,
            PERMX: PERMX,
            PERME: PERME,
            strOption: this.view.params.action
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