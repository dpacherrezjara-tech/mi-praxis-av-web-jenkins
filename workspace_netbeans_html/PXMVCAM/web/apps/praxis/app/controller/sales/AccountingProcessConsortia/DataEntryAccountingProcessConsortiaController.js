Ext.define('Ext.Praxis.controller.sales.AccountingProcessConsortia.DataEntryAccountingProcessConsortiaController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAccountingProcessConsortiaController',
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
                Ext.getCmp(prototype.id+'-btn-update').hide();
                if(this.p.rec.data.ESTADO === 'Error'){
                    Ext.getCmp(prototype.id+'-btn-delete').show();
                }else{
                    Ext.getCmp(prototype.id+'-btn-delete').hide();
                }                            
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
        global.AccessControlMaganer();
    },
    onMostrarCampoChange: function(cmp, newValue, oldValue, eOpts) {
        this.limpiarCampos();
        var strModulo = this.getValue('cbxModulo');
        
        switch (strModulo) {
            case 'PCONSORTIA':
            case '':
                Ext.getCmp(prototype.id+'-boxFecha').show();
                Ext.getCmp(prototype.id+'-boxCaducos').hide();                
                break;
        }
    },        
    
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id+'-cmbDateFromYear').bindStore(storeComboDataYear);
        //Ext.getCmp(prototype.id+'-cmbDateToYear').bindStore(storeComboDataYear);
        //Ext.getCmp(prototype.id+'-cbxDateYear').bindStore(storeComboDataYear);
        
        var storeComboDataMonth = win.getStoreMonth(false);
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').bindStore(storeComboDataMonth);
        //Ext.getCmp(prototype.id+'-cmbDateToMonth').bindStore(storeComboDataMonth);
        //Ext.getCmp(prototype.id+'-cbxDateMonth').bindStore(storeComboDataMonth);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(rec) {
        // <editor-fold defaultstate="collapsed" desc="Iniciar Combo Date">
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        //this.setValue('cmbDateToYear', new Date().getFullYear());
        //this.setValue('cbxDateYear', new Date().getFullYear());
        var mes = new Date().getMonth()+1;
        if(mes < 10) mes = "0"+mes;
        this.setValue('cmbDateFromMonth', mes);
        //this.setValue('cmbDateToMonth', mes);
        //this.setValue('cbxDateMonth', mes);
        // </editor-fold>
        
        this.setValue('cbxModulo', rec.get('A1955MODUL'));
        Ext.getCmp(prototype.id+'-cbxModulo').setReadOnly(true);
        
        switch (rec.get('A1955MODUL')) {
            case 'PCONSORTIA': case 'PFLOWN': case 'PADJMA': case "PPCONSORTIA" :  
                Ext.getCmp(prototype.id+'-boxFecha').show();
                //Ext.getCmp(prototype.id+'-boxPeriodo').hide();
                Ext.getCmp(prototype.id+'-boxCaducos').hide();
                this.setValue('txtProcessDate', Ext.Date.parseDate(rec.get('A1955FPROC'), "Ymd"));
                break;
            /*case 'PAPINT': case 'PARINT':
                Ext.getCmp(prototype.id+'-boxFecha').hide();
                //Ext.getCmp(prototype.id+'-boxPeriodo').show();
                Ext.getCmp(prototype.id+'-boxCaducos').hide();
                this.setValue('cbxDateYear', rec.get('A1955FPROC').substring(0,4));
                this.setValue('cbxDateMonth', rec.get('A1955FPROC').substring(4,6));
                this.setValue('cbxDatePeriod', rec.get('A1955FPROC').substring(6,8));
                break;*/
            case 'PCADUCOS':
                Ext.getCmp(prototype.id+'-boxFecha').hide();
                //Ext.getCmp(prototype.id+'-boxPeriodo').hide();
                Ext.getCmp(prototype.id+'-boxCaducos').show();                
                
                this.setValue('txtProcessDate', Ext.Date.parseDate(rec.get('A1955FPROC'), "Ymd"));
                this.setValue('cmbDateFromYear', rec.get('A1955KEY4').substring(0,4));
                this.setValue('cmbDateFromMonth', rec.get('A1955KEY4').substring(4,6));
                //this.setValue('cmbDateToYear', rec.get('A1955KEY4').substring(0,4));
                //this.setValue('cmbDateToMonth', rec.get('A1955KEY4').substring(4,6));
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
    
    // <editor-fold defaultstate="collapsed" desc="CRUD">
    onSaveClick: function(btn) {
        if (this.validaRequiredFields()) {
            switch (this.getValue('cbxModulo')) {
                case "PCONSORTIA" : 
                case "PCADUCOS" : 
                case "PADJMA" : 
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
                    break;            
                case "PPCONSORTIA" :
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
                                this.crudPending();
                            }
                        }
                    });
                    break;            
            }   
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
        switch (this.getValue('cbxModulo')) {
            case "PCONSORTIA" : 
                dataentryParams = {};
                dataentryParams.IN_MODULO = 'SALES';
                dataentryParams.IN_FECHA_PROCESO = this.p.rec.get('A1955FPROC');
                this.setReverse(this.p.rec);
                break;
            case "PCADUCOS" : case "PADJMA" : 
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
                break;            
            case "PPCONSORTIA" :
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
                            this.crudPending();
                        }
                    }
                });
                break;            
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
                case "PCONSORTIA":                           
                    if (this.getValue('txtProcessDate')==='' || this.getValue('txtProcessDate') === null) {
                        this.msjAlert='Enter correct data';
                        return false;
                    }
                    break;
            }
        }
        return true;
    },
    
    crud: function() {
        var mod = this;
        Ext.Ajax.request({
            url: prototype.url + '/Maintance',
            method: 'POST',
            timeout: 60000000,
            params: this.beanOption,
            
            beforerequest: Ext.getCmp('DataEntryAccountingProcessConsortiaForm').mask('Loading...'),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msg = res.intResult;                    
                    /*var cbxModulo = mod.getValue('cbxModulo');
                    if(cbxModulo==='PCONSORTIA')
                    {
                        var lstGroups = res.lstGroups;
                        if(lstGroups.length>0)
                        {
                            var groups = '';
                            for(var i=0 ; i<lstGroups.length; i++)
                            {
                                if(i<(lstGroups.length-1))
                                    groups+=lstGroups[i].A1955ERRLG+',';
                                else
                                    groups+=lstGroups[i].A1955ERRLG;
                            }
                            msg = 'Observed Groups: ' + groups 
                        }
                    }*/
                        
                    var icon=1;
                    if(msg==='RECORD EXISTS'){
                        icon=2;
                    }
                    global.Msg({
                        msg: msg,
                        icon: icon,
                        fn: function() {
                            if (msg==='RECORD INSERTED') {
                                Ext.getCmp('DataEntryAccountingProcessConsortiaForm').close(),
                                Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                            }
                        }
                    });
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                Ext.getCmp('DataEntryAccountingProcessConsortiaForm').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp('DataEntryAccountingProcessConsortiaForm').unmask();
            }
        });
    },
    
    crudPending: function() {
        Ext.Ajax.request({
            url: prototype.url + '/MaintancePending',
            method: 'POST',
            timeout: 60000000,
            params: this.beanOption,
            beforerequest: Ext.getCmp('DataEntryAccountingProcessConsortiaForm').mask('Loading...'),
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
                            if (msg==='RECORD INSERTED') {
                                Ext.getCmp('DataEntryAccountingProcessConsortiaForm').close(),
                                Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                            }
                        }
                    });
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                Ext.getCmp('DataEntryAccountingProcessConsortiaForm').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp('DataEntryAccountingProcessConsortiaForm').unmask();
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
            case "PCONSORTIA":
                IN_FECHA_PROCESO = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtProcessDate').getValue(), 'Ymd');
                break;
        }
        
        this.beanOption = {
            A1955MODUL: A1955MODUL,
            IN_FECHA_PROCESO: IN_FECHA_PROCESO,
            A1955KEY2: A1955KEY2,
            A1955KEY4: A1955KEY4,
            strOption: this.view.params.action
        };
    },
    limpiarCampos: function() {
        var mes = new Date().getMonth()+1;
        if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').setValue(mes);
        Ext.getCmp(prototype.id+'-cmbDateFromYear').setValue(new Date().getFullYear());               
        this.setValue("txtProcessDate", "");
    },    
    setReverse: function(objDT){
        Ext.Ajax.request({
            url: prototype.url + '/searchReversa',
            method: 'POST',
            timeout: 60000000,
            params: dataentryParams,
            //beforerequest: Ext.getCmp('DataEntryAccountingProcessConsortiaForm').mask('Loading...'),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {                    
                    Ext.create('Ext.Praxis.view.sales.AccountingProcessConsortiaForm.DataEntryReverse', {
                        id: 'DataEntryReverseAccountingProcessConsortiaForm',
                        params: {
                            rec: res.data,
                            obj: objDT.data
                        }
                    }).show();                   
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                //Ext.getCmp('DataEntryAccountingProcessConsortiaForm').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                //Ext.getCmp('DataEntryAccountingProcessConsortiaForm').unmask();
            }
        });
    }
});