/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Luis Remicio
 */
Ext.define('Ext.Praxis.controller.salesaudit.BsplinkUserMaintenanceRFND.DataEntryUserMaintenanceController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryUserMaintenanceController',

    beanTMP: {},
     urlWin01: '',
    
    A3406FALTA: '',

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
                
                Ext.getCmp(prototype.id01 + '-txtA2665DESCR').setValue(rec.get('A3406DESCR'));
                Ext.getCmp(prototype.id01 + '-txtuser').setValue(rec.get('A3406USER'));
                Ext.getCmp(prototype.id01 + '-txtpais').setValue(rec.get('A3406PAIS'));
                this.OnLoadCmbStatus(rec.get('A3406FLAG') == 'Enabled' ? 'AC' : 'IN');
                // Ext.getCmp(prototype.id01 + '-CmbStatus').setValue(rec.get('A3406FLAG') == 'Enabled' ? 'AC' : 'IN');
                
                Ext.getCmp(prototype.id01 + '-txtA3406REGIS').setValue(rec.get('A3406REGIS'));
                Ext.getCmp(prototype.id01 + '-txtA3406FREGI').setValue(rec.get('A3406FREGI'));
                Ext.getCmp(prototype.id01 + '-txtA3406HREGI').setValue(rec.get('A3406HREGI'));
                Ext.getCmp(prototype.id01 + '-txtA3406REVIS').setValue(rec.get('A3406REVIS'));
                Ext.getCmp(prototype.id01 + '-txtA3406FREVI').setValue(rec.get('A3406FREVI'));
                Ext.getCmp(prototype.id01 + '-txtA3406HREVI').setValue(rec.get('A3406HREVI'));
                this.A3406FALTA = rec.get('A3406FALTA');
                
                break;
            case 'I':
                Ext.getCmp(prototype.id01+'-btn-save').show();
                Ext.getCmp(prototype.id01+'-btn-update').hide();
                Ext.getCmp(prototype.id01+'-btn-delete').hide();
                
                Ext.getCmp(prototype.id01 + '-txtA2665DESCR').setValue('');
                Ext.getCmp(prototype.id01 + '-txtuser').setValue('');
                Ext.getCmp(prototype.id01 + '-txtpais').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406REGIS').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406FREGI').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406HREGI').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406REVIS').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406FREVI').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406HREVI').setValue('');
                this.OnLoadCmbStatus('AC');
                
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
                { "code": "IN", "name": "Disabled"},
            ]
        }));
        
        cmbSearch.setValue(id);
    },
    
    onSaveClick: function(obj){
         var me = this;
        var action = String(me.view.params.action);
        
        if (action === 'I'){
            me.beanTMP.IN_OPTION = action;
            me.beanTMP.A3406DESCR = Ext.getCmp(prototype.id01 + '-txtA2665DESCR').getValue();
            me.beanTMP.A3406USER = Ext.getCmp(prototype.id01 + '-txtuser').getValue();
            me.beanTMP.A3406PAIS = Ext.getCmp(prototype.id01 + '-txtpais').getValue();
            me.beanTMP.A3406FLAG = Ext.getCmp(prototype.id01 + '-CmbStatus').getValue();
            me.beanTMP.A3406FALTA = '';
            
            if (me.beanTMP.A3406USER === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field');
                return;
            }
            if (me.beanTMP.A3406PAIS === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Country');
                return;
            }
            if (me.beanTMP.A3406FLAG === ''){
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
            me.beanTMP.A3406DESCR = Ext.getCmp(prototype.id01 + '-txtA2665DESCR').getValue();
            me.beanTMP.A3406USER = Ext.getCmp(prototype.id01 + '-txtuser').getValue();
            me.beanTMP.A3406PAIS = Ext.getCmp(prototype.id01 + '-txtpais').getValue();
            me.beanTMP.A3406FLAG = Ext.getCmp(prototype.id01 + '-CmbStatus').getValue();
            me.beanTMP.A3406FALTA = me.A3406FALTA;
            
            if (me.beanTMP.A3406USER === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field');
                return;
            }
            if (me.beanTMP.A3406PAIS === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Country');
                return;
            }
            if (me.beanTMP.A3406FLAG === ''){
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