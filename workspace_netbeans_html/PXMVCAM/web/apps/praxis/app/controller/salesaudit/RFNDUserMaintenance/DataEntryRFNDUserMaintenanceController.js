/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.RFNDUserMaintenance.DataEntryRFNDUserMaintenanceController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryRFNDUserMaintenanceController',

    beanTMP: {},
     urlWin01: '',
    
    A3650FALTA: '',

    init: function(view){
        var me = this;
        this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function(){
        switch(String(this.view.params.action)){
            case 'U':
                var rec = this.view.params.rec;
                
                Ext.getCmp(prototype.id01+'-btn-save').hide();
                Ext.getCmp(prototype.id01+'-btn-update').show();
                Ext.getCmp(prototype.id01+'-btn-delete').show();
                
                Ext.getCmp(prototype.id01 + '-txtA2665DESCR').setValue(rec.get('A3650NAME'));
                Ext.getCmp(prototype.id01 + '-txtuser').setValue(rec.get('A3650USER'));
                //Ext.getCmp(prototype.id01 + '-txtpais').setValue(rec.get('A3406PAIS'));
                this.OnLoadCmbStatus(rec.get('A3650FLAG') === 'Enabled' ? 'AC' : 'IN');
                this.OnLoadCmbArea(rec.get('A3650AREACOD'));
                Ext.getCmp(prototype.id01 + '-CmbArea').disable();
                Ext.getCmp(prototype.id01 + '-txtA3406REGIS').setValue(rec.get('A3650REGIS'));
                Ext.getCmp(prototype.id01 + '-txtA3406FREGI').setValue(rec.get('A3650FREGI'));
                Ext.getCmp(prototype.id01 + '-txtA3406HREGI').setValue(rec.get('A3650HREGI'));
                Ext.getCmp(prototype.id01 + '-txtA3406REVIS').setValue(rec.get('A3650REVIS'));
                Ext.getCmp(prototype.id01 + '-txtA3406FREVI').setValue(rec.get('A3650FREVI'));
                Ext.getCmp(prototype.id01 + '-txtA3406HREVI').setValue(rec.get('A3650HREVI'));
                this.A3650FALTA = rec.get('A3650FALTA');
                
                break;
            case 'I':
                Ext.getCmp(prototype.id01+'-btn-save').show();
                Ext.getCmp(prototype.id01+'-btn-update').hide();
                Ext.getCmp(prototype.id01+'-btn-delete').hide();
                
                Ext.getCmp(prototype.id01 + '-txtA2665DESCR').setValue('');
                Ext.getCmp(prototype.id01 + '-txtuser').setValue('');
                Ext.getCmp(prototype.id01 + '-CmbArea').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406REGIS').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406FREGI').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406HREGI').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406REVIS').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406FREVI').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406HREVI').setValue('');
                this.OnLoadCmbStatus('AC');
                this.OnLoadCmbArea('');
                
                break;
            default:
                Ext.getCmp(prototype.id01+'-btn-save').hide();
                Ext.getCmp(prototype.id01+'-btn-update').hide();
                Ext.getCmp(prototype.id01+'-btn-delete').hide();
        }
    },
    
    OnLoadCmbStatus: function(id){
        var cmbSearch = Ext.getCmp(prototype.id01 + '-CmbStatus');

        cmbSearch.bindStore(Ext.create('Ext.data.Store',{
            data: [
                { "code": "AC", "name": "Enabled"},
                { "code": "IN", "name": "Disabled"}
            ]
        }));
        
        cmbSearch.setValue(id);
    },
    OnLoadCmbArea: function(id){
        var cmbArea = Ext.getCmp(prototype.id01 + '-CmbArea');
        cmbArea.bindStore(Ext.create('Ext.data.Store',{
            data: [
                { "code": "", "name": "SELECT"},
                { "code": "0002", "name": "CENTRE AND SOUTH AMERICA"},
                { "code": "0003", "name": "EUROPE AND ASIA"},
                { "code": "0001", "name": "MEXICO"},
                { "code": "0004", "name": "USA AND CANADA"}
            ]
        }));
        
        cmbArea.setValue(Ext.String.trim(id));
    },
    
    onSaveClick: function(obj){
         var me = this;
        var action = String(me.view.params.action);
        
        if (action === 'I'){
            me.beanTMP.IN_OPTION = action;
            me.beanTMP.A3650NAME = Ext.getCmp(prototype.id01 + '-txtA2665DESCR').getValue();
            me.beanTMP.A3650USER = Ext.getCmp(prototype.id01 + '-txtuser').getValue();
            me.beanTMP.A3650AREA = Ext.getCmp(prototype.id01 + '-CmbArea').getValue();
            me.beanTMP.A3650FLAG = Ext.getCmp(prototype.id01 + '-CmbStatus').getValue();
            me.beanTMP.A3650FALTA = '';
            
            if (me.beanTMP.A3650USER === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field');
                return;
            }
            if (me.beanTMP.A3650AREA === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, AREA');
                return;
            }
            if (me.beanTMP.A3650FLAG === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Status');
                return;
            }
            
            Ext.Msg.show({
                title: '.: PRAXIS :.',
                message: 'SAVE RECORD?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(btn) {
                    if ( btn === 'yes' ){
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id01 + '-win'), {
                                msg: 'Please Wait....'
                            });
                        mask.show();
                        
                        Ext.Ajax.request({
                            url: me.urlWin01 + '/mantenimientoRfndUser/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanTMP)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD INSERTED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function() {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.id + '-Contenedor').getController().onSearchClick();
                                            Ext.getCmp(prototype.id01 + '-win').close();

                                        }


                                    }});
                            }
                        });
                        
                    }
                }
            });
        }else if (action === 'U' || action === 'D'){
            me.beanTMP.IN_OPTION = action;
            me.beanTMP.A3650NAME = Ext.getCmp(prototype.id01 + '-txtA2665DESCR').getValue();
            me.beanTMP.A3650USER = Ext.getCmp(prototype.id01 + '-txtuser').getValue();
            me.beanTMP.A3650AREA = Ext.getCmp(prototype.id01 + '-CmbArea').getValue();
            me.beanTMP.A3650FLAG = Ext.getCmp(prototype.id01 + '-CmbStatus').getValue();
            me.beanTMP.A3650FALTA = me.A3650FALTA;
            
            if (me.beanTMP.A3650USER === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field');
                return;
            }
            if (me.beanTMP.A3650AREA === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, AREA');
                return;
            }
            if (me.beanTMP.A3650FLAG === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Status');
                return;
            }
            
            Ext.Msg.show({
                title: '.: PRAXIS :.',
                message: 'UPDATE RECORD?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(btn) {
                    if ( btn === 'yes' ){
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id01 + '-win'), {
                                msg: 'Please Wait....'
                            });
                        mask.show();
                        
                        Ext.Ajax.request({
                            url: me.urlWin01 + '/mantenimientoRfndUser/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanTMP)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD INSERTED' || res.data === 'RECORD UPDATE' || res.data === 'RECORD DISABLED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function() {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.id + '-Contenedor').getController().onSearchClick();
                                            Ext.getCmp(prototype.id01 + '-win').close();

                                        }


                                    }});
                            }
                        });
                        
                    }
                }
            });
        }
    },
    
    onCloseClick: function(obj){
        Ext.getCmp(prototype.id01 + '-win').close();
    },

});