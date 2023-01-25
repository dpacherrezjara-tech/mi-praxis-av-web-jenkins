Ext.define('Ext.Praxis.controller.sales.CommissionBSPASR.DataEntryAcuseCommissionBSPASRController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAcuseCommissionBSPASRController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    msjAlert: '',
    p: {},
    me: '',
    // </editor-fold>
    init: function(view) {
        me: this;
    },
    afterRender: function(){
        this.p = this.view.params;
        switch (this.p.action) {
            case 'U':
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').show();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                break;
        }
        // global.AccessControlMaganer();
    },
    onDateChange: function(cmp, newDate, oldDate, eOpts) {
        if (cmp.isValid()) {
            if (newDate!==''&&newDate!==null) {
                var data = this.p.data;
                var FechaAcuse = newDate.getTime();// FECHA DE ACUSE
                var FechaEnvio = new Date(data.A1775FENV.substring(0,4)+'/'+data.A1775FENV.substring(4,6)+'/'+data.A1775FENV.substring(6,8)).getTime();// FECHA DE ENVIO DEL CORREO
                var fechaHoy = new Date().getTime();// FECHA HOY
                if ((FechaEnvio > FechaAcuse || FechaAcuse > fechaHoy) && FechaAcuse !== "") {
                    global.Msg({
                        msg: 'Invalid date, enter later or equal to the date of shipment date or a date not more today',
                        fn: function(btn) {
                            if (btn === 'ok'){
                                try {
                                    me.setValue('txtA1775FACUS', '');
                                    me.focus('txtA1775FACUS');
                                } catch(e) {
                                    console.log("Error: "+e.message);
                                }
                            }
                        }
                    });
                }
            }
        }
    },
    onTimeChange: function(cmp, newDate, oldDate, eOpts) {
        var FechaAcuse = Ext.util.Format.date(me.getValue('txtA1775FACUS'), 'Ymd');
        if (FechaAcuse!=='') {
            var FechaEnvio = this.p.data.A1775FENV;
            if (FechaAcuse===FechaEnvio) {
                var hourAcuse = me.getValue('txtA1775HACUS').replace(":","").replace(":","").replace(":","");
                var hourSend = this.p.data.A1775HENV;
                if (Number(hourAcuse) < Number(hourSend)) {
                    global.Msg({
                        msg: 'Invalid Hour, enter later or equal to the Hour of send',
                        fn: function(btn) {
                            if (btn === 'ok'){
                                try {
                                    me.setValue('txtA1775HACUS', '');
                                } catch(e) {
                                    console.log("Error: "+e.message);
                                }
                            }
                        }
                    });
                }
            }
        }
//        if (cmp.isValid()) if (newDate!=='') {
//            var data = this.p.data;
//            var FechaAcuse = newDate.getTime();// FECHA DE ACUSE
//            var FechaEnvio = new Date(data.A1775FENV.substring(0,4)+'/'+data.A1775FENV.substring(4,6)+'/'+data.A1775FENV.substring(6,8)).getTime();// FECHA DE ENVIO DEL CORREO
//            var fechaHoy = new Date().getTime();// FECHA HOY
//            if ((FechaEnvio > FechaAcuse || FechaAcuse > fechaHoy) && FechaAcuse !== "") {
//                Ext.Msg.show({message: ''});
//                global.Msg({
//                    msg: 'Invalid date, enter later or equal to the date of shipment date or a date not more today',
//                    fn: function(btn) {
//                        if (btn === 'ok'){
//                            Ext.getCmp(prototype.id+'-txtA1775FACUS').setValue('');
//                        }
//                    }
//                });
//            }
//        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(file) {
        this.setValue('txtA1775GSA2', file.A1775GSA);
        this.setValue('txtA1839RSOC', file.A1839RSOC);
        this.setValue('txtA1775LOTE', file.A1775LOTE);
        this.setValue('txtA1775FINI', file.PERIODRPTE);
        this.setValue('txtA1775PAIS2', file.A1775PAIS);
        this.setValue('txtA1839EMAIL', file.A1839EMAIL);
        this.setValue('txtEmailCcp', file.EmailCcp);
        this.setValue('txtAsunto', file.Asunto);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onUpdateClick: function(btn) {
        if (this.validaRequiredFields()) {
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
                        console.log("Pendiente validar");
//                        this.llenarData();
//                        this.view.params.action = "U";
//                        this.crud();
                    }
                }
            });
        } else {
            if (this.msjAlert === '') {
                global.Msg({
                    msg: 'You must enter all required fields.'
                });
            } else {
                global.Msg({
                    msg: this.msjAlert
                });
            }
        }
    },
    onCancelClick: function(){
        this.view.close();
    },
    // </editor-fold>
    
    validaRequiredFields: function() {
        var txtA1775FACUS = Ext.util.Format.date(this.getValue('txtA1775FACUS'), 'Ymd');
        var txtA1775HACUS = Ext.getCmp(prototype.id + '-txtA1775HACUS').getValue();
        if (txtA1775FACUS ==="") {
            this.focus('txtA1775FACUS');
            this.msjAlert = "Required Field, DATE ";
            return false;
        }
        if (txtA1775HACUS ==="") {
            this.msjAlert = "Required Field, Time ";
            this.focus('txtA1775HACUS');
            return false;
        }
        return true;
    },
    crud: function() {
        Ext.Ajax.request({
            url: prototype.url + '/setSQP00105Filter',
            method: 'POST',
            timeout: 60000000,
            params: searchParams,
            beforerequest: Ext.getCmp('DataEntryAcuseCommissionBSPASRForm').mask('Loading...'),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msg = res.MESSAGE;
                    var icon=1;
                    if(msg==='DUPLICATE KEY, VERIFY!'){
                        icon=2;
                    }
                    global.Msg({
                        msg: msg,
                        icon: icon,
                        fn: function() {
                            Ext.getCmp('DataEntryAcuseCommissionBSPASRForm').close(),
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        }
                    });
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                Ext.getCmp('DataEntryAcuseCommissionBSPASRForm').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp('DataEntryAcuseCommissionBSPASRForm').unmask();
            }
        });
    },
    // <editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function() {
        var p = this.view.params;

        searchParams = {};
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var actionCode = p.action;
        var txtA1775GSA = this.getValue("txtA1775GSA3");
        var txtA1775PAIS = this.getValue("txtA1775PAIS3");
        var txtA1775LOTE = this.getValue("txtA1775LOTE2");
        var txtA1775FACUS = this.getValue("txtA1775FACUS");
        var txtA1775HACUS = this.getValue("txtA1775HACUS");
        // </editor-fold>
        
        var data = this.p.data;
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            VP_ACTION: actionCode,
            VP_A1775CCUST: '139',
            VP_A1775GSA: txtA1775GSA,
            VP_A1775PAIS: txtA1775PAIS,
            VP_A1775LOTE: txtA1775LOTE,
            VP_A1775MDALC: data.A1775MDALC,
            A1775FACUS: txtA1775FACUS,
            A1775HACUS: txtA1775HACUS
        };
        // </editor-fold>
    },
    // </editor-fold>
    
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