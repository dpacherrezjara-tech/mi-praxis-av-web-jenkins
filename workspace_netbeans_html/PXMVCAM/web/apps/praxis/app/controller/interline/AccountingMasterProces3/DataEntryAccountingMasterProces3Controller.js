Ext.define('Ext.Praxis.controller.interline.AccountingMasterProces3.DataEntryAccountingMasterProces3Controller',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAccountingMasterProces3Controller',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    msjAlert: '',
    beanOption: '',
    meDE: '',
    PERMISO: false,
    // </editor-fold>
    init: function(view) {
        meDE = this;
        this.setStoreData();
    },
    afterRender: function(){
        this.p = this.view.params;
        this.objPermiso = this.p.objPermiso;
        
        meDE.PERMISO = win.validateAccess(this.objPermiso, this.p.action);
        
        Ext.getCmp(prototype.id+'-btn-save').hide();
        Ext.getCmp(prototype.id+'-btn-update').hide();
        Ext.getCmp(prototype.id+'-btn-delete').hide();
        Ext.getCmp(prototype.id+'-btn-cancel').show();
        switch( this.p.action ){
            case 'M':
                if(meDE.PERMISO){
                    this.mostrarData(this.p.rec);
                    Ext.getCmp(prototype.id+'-btn-update').show();
                    if(this.p.rec.data.ESTADO === 'Error'){
                        Ext.getCmp(prototype.id+'-btn-delete').show();
                    }else{
                        Ext.getCmp(prototype.id+'-btn-delete').hide();
                    }  
                }
                break;
            case 'A':
                if(meDE.PERMISO){
                    Ext.getCmp(prototype.id+'-btn-save').show();
                }
                break;
        }
        // global.AccessControlMaganer();
    },
    mostrarCampo: function() {
        var strModulo = this.getValue("cbxModulo");
        this.limpiarData();
        switch (strModulo) {
            case "PSALES" : case "PFLOWN" : case "PADJMA" :
                Ext.getCmp(prototype.id + '-boxFecha').show();
                Ext.getCmp(prototype.id + '-boxPeriodo').hide();
                break;
            case "PAPINT" : case "PARINT" : case 'PIXPEST': case 'PIXCEST': case 'PIXPREV': case 'PIXCREV': 
                Ext.getCmp(prototype.id + '-boxFecha').hide();
                Ext.getCmp(prototype.id + '-boxPeriodo').show();
                break;
        }
    },
    limpiarData: function() {
        this.setValue('cbxDateYear', new Date().getFullYear());
        var mes = new Date().getMonth()+1;
        if(mes < 10) mes = "0"+mes;
        this.setValue('cbxDateMonth', mes);
        this.setValue('txtProcessDate', '');
        this.setValue('USCR', '');
        this.setValue('FECR', '');
        this.setValue('HOCR', '');
        this.setValue('USUP', '');
        this.setValue('FEUP', '');
        this.setValue('HOUP', '');
        this.setValue('cbxDatePeriod', '');
    },
    
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id+'-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id+'-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id+'-cbxDateYear').bindStore(storeComboDataYear);
        
        var storeComboDataMonth = win.getStoreMonth(false);
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-cbxDateMonth').bindStore(storeComboDataMonth);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(rec) {
        // <editor-fold defaultstate="collapsed" desc="Iniciar Combo Date">
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        this.setValue('cbxDateYear', new Date().getFullYear());
        var mes = new Date().getMonth()+1;
        if(mes < 10) mes = "0"+mes;
        this.setValue('cmbDateFromMonth', mes);
        this.setValue('cmbDateToMonth', mes);
        this.setValue('cbxDateMonth', mes);
        // </editor-fold>
        
        this.setValue('cbxModulo', rec.get('A1955MODUL'));
        
        switch (rec.get('A1955MODUL')) {
            case 'PSALES': case 'PFLOWN': case 'PADJMA':
                Ext.getCmp(prototype.id+'-boxFecha').show();
                Ext.getCmp(prototype.id+'-boxPeriodo').hide();
                this.setValue('txtProcessDate', Ext.Date.parseDate(rec.get('A1955FPROC'), "Ymd"));
                break;
            case 'PAPINT': case 'PARINT': case 'PIXPEST': case 'PIXCEST': case 'PIXPREV': case 'PIXCREV':
                Ext.getCmp(prototype.id+'-boxFecha').hide();
                Ext.getCmp(prototype.id+'-boxPeriodo').show();
                this.setValue('cbxDateYear', rec.get('A1955FPROC').substring(0,4));
                this.setValue('cbxDateMonth', rec.get('A1955FPROC').substring(4,6));
                this.setValue('cbxDatePeriod', rec.get('A1955FPROC').substring(6,8));
                break;
        }
        
        // <editor-fold defaultstate="collapsed" desc="ControlData">
        this.setValue('USCR', rec.get('A1955USRIN'));
        this.setValue('FECR', rec.get('A1955FECIN'));
        this.setValue('HOCR', rec.get('A1955HORIN'));
        this.setValue('USUP', rec.get('A1955USRAC'));
        this.setValue('FEUP', rec.get('A1955FECAC'));
        this.setValue('HOUP', rec.get('A1955HORAC'));
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Navegación">
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
    onCancelClick: function(btn){
        this.view.close();
    },
    onDeleteClick: function(btn){
        if (this.validaRequiredFields()) {
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
    // </editor-fold>
    
    validaRequiredFields: function() {
        var cbxModulo = this.getValue('cbxModulo');
        if (cbxModulo==='') {
            this.msjAlert='Select Module.';
            return false;
        } else {
            switch (cbxModulo) {
                case "PSALES" : case "PFLOWN": case "PADJMA" :
                    if (this.getValue('txtProcessDate')==='') {
                        this.msjAlert='Enter correct data';
                        return false;
                    }
                    break;
                case "PAPINT" : case "PARINT" : case 'PIXPEST': case 'PIXCEST': case 'PIXPREV': case 'PIXCREV':
                    if (this.getValue('cbxDatePeriod')==='') {
                        this.msjAlert='Enter correct data.';
                        return false;
                    }
                    break;
                case "PCADUCOS" :
                    if (this.getValue('txtProcessDate')==='') {
                        this.msjAlert='Enter correct data';
                        return false;
                    }
                    break;
            }
        }
        return true;
    },
    
    crud: function() {
        Ext.Ajax.request({
            url: prototype.url + '/Maintance',
            method: 'POST',
            timeout: 60000000,
            params: this.beanOption,
            beforerequest: Ext.getCmp('DataEntryAccountingMasterProces3Form').mask('Loading...'),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msg = res.intResult;
                    var icon=1;
                    if(msg==='RECORD EXISTS'){
                        icon=2;
                    }
                    global.Msg({
                        msg: msg,
                        icon: icon,
                        fn: function() {
                            if (msg==='RECORD INSERTED' || msg==='RECORD REMOVED') {
                                Ext.getCmp('DataEntryAccountingMasterProces3Form').close(),
                                Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                            }
                        }
                    });
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                Ext.getCmp('DataEntryAccountingMasterProces3Form').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp('DataEntryAccountingMasterProces3Form').unmask();
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
        
        var A1955KEY2 = '', A1955KEY4 = '', IN_FECHA_PROCESO = '';
        var A1955MODUL = this.getValue('cbxModulo');
        
        switch (this.getValue('cbxModulo')) {
            case "PSALES" : case "PFLOWN": case "PADJMA" :
                IN_FECHA_PROCESO = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtProcessDate').getValue(), 'Ymd');
                break;
            case "PAPINT" : case "PARINT" : case 'PIXPEST': case 'PIXCEST': case 'PIXPREV': case 'PIXCREV':
                IN_FECHA_PROCESO = this.getValue('cbxDateYear')+this.getValue('cbxDateMonth')+this.getValue('cbxDatePeriod');
                break;
            case "PCADUCOS" :
                IN_FECHA_PROCESO = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtProcessDate').getValue(), 'Ymd');
                A1955KEY2 = this.getValue('cmbDateFromYear')+this.getValue('cmbDateFromMonth');
                A1955KEY4 = this.getValue('cmbDateToYear')+this.getValue('cmbDateToMonth');
                break;
        }
        
        this.beanOption = {
            A1955MODUL: A1955MODUL,
            IN_FECHA_PROCESO: IN_FECHA_PROCESO,
            A1955KEY2: A1955KEY2,
            A1955KEY4: A1955KEY4,
            strOption: this.view.params.action
        };
    }
});