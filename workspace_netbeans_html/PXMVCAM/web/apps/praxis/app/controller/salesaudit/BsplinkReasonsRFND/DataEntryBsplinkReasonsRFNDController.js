/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Luis Remicio
 */
Ext.define('Ext.Praxis.controller.salesaudit.BsplinkReasonsRFND.DataEntryBsplinkReasonsRFNDController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryBsplinkReasonsRFNDController',

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
                
                Ext.getCmp(prototype.id01 + '-txtReason').setValue(Ext.String.trim(rec.get('A3404CODRZ')));
                Ext.getCmp(prototype.id01 + '-txtCRelation').setValue(Ext.String.trim(rec.get('A3404COMRE')));
                Ext.getCmp(prototype.id01 + '-txtCEs').setValue(Ext.String.trim(rec.get('A3404COMES')));
                Ext.getCmp(prototype.id01 + '-txtCEng').setValue(Ext.String.trim(rec.get('A3404COMEN')));
                Ext.getCmp(prototype.id01 + '-txtCPor').setValue(Ext.String.trim(rec.get('A3404COMPO')));
                Ext.getCmp(prototype.id01 + '-txtCFre').setValue(Ext.String.trim(rec.get('A3404COMFR')));
                
                Ext.getCmp(prototype.id01 + '-txtREGIS').setValue(rec.get('A3404REGIS'));
                Ext.getCmp(prototype.id01 + '-txtFREGI').setValue(rec.get('A3404FREGI'));
                Ext.getCmp(prototype.id01 + '-txtHREGI').setValue(rec.get('A3404HREGI'));
                Ext.getCmp(prototype.id01 + '-txtREVIS').setValue(rec.get('A3404REVIS'));
                Ext.getCmp(prototype.id01 + '-txtFREVI').setValue(rec.get('A3404FREVI'));
                Ext.getCmp(prototype.id01 + '-txtHREVI').setValue(rec.get('A3404HREVI'));
                
                this.OnLoadCmbFamily(rec.get('A3404FAMIL'));
                
                break;
            case 'I':
                Ext.getCmp(prototype.id01+'-btn-save').show();
                Ext.getCmp(prototype.id01+'-btn-update').hide();
                Ext.getCmp(prototype.id01+'-btn-delete').hide();
                
                this.OnLoadCmbFamily('');
                
                break;
            default:
                Ext.getCmp(prototype.id01+'-btn-save').hide();
                Ext.getCmp(prototype.id01+'-btn-update').hide();
                Ext.getCmp(prototype.id01+'-btn-delete').hide();
        }
    },
    onCloseClick: function (obj) {
        Ext.getCmp(prototype.id01 + '-win').close();
    },    
    OnLoadCmbFamily: function(id){
        var cmbFamily = Ext.getCmp(prototype.id01 + '-ComboBy');

        cmbFamily.bindStore(Ext.create('Ext.data.Store',{
            data: [
                { "code": "", "name": "SELECTED"},
                { "code": "Venta D", "name": "DIRECT SALE"},
                { "code": "Tktexpi", "name": "TICKET EXPIRED"},
                { "code": "Tarifa", "name": "FARE"},
                { "code": "Taxes", "name": "TAXES"},
                { "code": "Comision", "name": "COMMISSION"},
                { "code": "Formas P", "name": "PAYMENT"},
                { "code": "Cupon", "name": "CUPON"},
                { "code": "Boleto", "name": "TICKET"},
                { "code": "Authorise", "name": "AUTHORISE"}
            ]
        }));
        
        cmbFamily.setValue(id);
    },
    onSaveClick: function(obj){
         var me = this;
         var action = String(me.view.params.action);
         if (action === 'I'){
            me.beanTMP.IN_OPTION = action;
            
            me.beanTMP.IN_CODRAZ =  Ext.getCmp(prototype.id01 + '-txtReason').getValue();
            me.beanTMP.A3404CODRZ= Ext.getCmp(prototype.id01 + '-txtReason').getValue();
            me.beanTMP.A3404FAMIL = Ext.getCmp(prototype.id01 + '-ComboBy').getValue();
           
            me.beanTMP.A3404COMRE = Ext.getCmp(prototype.id01 + '-txtCRelation').getValue();
            me.beanTMP.A3404COMES =  Ext.getCmp(prototype.id01 + '-txtCEs').getValue();
            me.beanTMP.A3404COMEN =  Ext.getCmp(prototype.id01 + '-txtCEng').getValue();
            me.beanTMP.A3404COMPO = Ext.getCmp(prototype.id01 + '-txtCPor').getValue();
            me.beanTMP.A3404COMFR =Ext.getCmp(prototype.id01 + '-txtCFre').getValue();
            
            
            if (me.beanTMP.A3404COMRE === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Comment Relation');
                return;
            }
            if (me.beanTMP.A3404COMES === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Comment Description');
                return;
            }
            if (me.beanTMP.A3404COMEN === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Comment Description');
                return;
            }
            if (me.beanTMP.A3404COMFR === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Comment Description');
                return;
            }
            if (me.beanTMP.A3404COMPO === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Comment Description');
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
                            url: me.urlWin01 + '/MantRFNDReasaons/',
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
            me.beanTMP.IN_CODRAZ =  Ext.getCmp(prototype.id01 + '-txtReason').getValue();
            me.beanTMP.A3404CODRZ= Ext.getCmp(prototype.id01 + '-txtReason').getValue();
            me.beanTMP.A3404FAMIL = Ext.getCmp(prototype.id01 + '-ComboBy').getValue();
           
            me.beanTMP.A3404COMRE = Ext.getCmp(prototype.id01 + '-txtCRelation').getValue();
            me.beanTMP.A3404COMES =  Ext.getCmp(prototype.id01 + '-txtCEs').getValue();
            me.beanTMP.A3404COMEN =  Ext.getCmp(prototype.id01 + '-txtCEng').getValue();
            me.beanTMP.A3404COMPO = Ext.getCmp(prototype.id01 + '-txtCPor').getValue();
            me.beanTMP.A3404COMFR =Ext.getCmp(prototype.id01 + '-txtCFre').getValue();
            
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
                            url: me.urlWin01 + '/MantRFNDReasaons/',
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
    }

});