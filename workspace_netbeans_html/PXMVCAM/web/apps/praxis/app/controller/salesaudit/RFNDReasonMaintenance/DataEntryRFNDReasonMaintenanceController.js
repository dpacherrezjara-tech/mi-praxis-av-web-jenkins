/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.RFNDReasonMaintenance.DataEntryRFNDReasonMaintenanceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryRFNDReasonMaintenanceController',

    beanTMP: {},
    urlWin01: '',

    A3406FALTA: '',

    init: function (view) {
        var me = this;
        this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        switch (String(this.view.params.action)) {
            case 'U':
                var rec = this.view.params.rec;

                Ext.getCmp(prototype.id01 + '-btn-save').hide();
                Ext.getCmp(prototype.id01 + '-btn-update').show();
                Ext.getCmp(prototype.id01 + '-btn-delete').show();

                Ext.getCmp(prototype.id01 + '-txtReason').setValue(Ext.String.trim(rec.get('A3651CODRZ')));
                Ext.getCmp(prototype.id01 + '-txtCRelation').setValue(Ext.String.trim(rec.get('A3651COMRE')));
                Ext.getCmp(prototype.id01 + '-txtCEs').setValue(Ext.String.trim(rec.get('A3651COMES')));
                Ext.getCmp(prototype.id01 + '-txtCEng').setValue(Ext.String.trim(rec.get('A3651COMEN')));
                Ext.getCmp(prototype.id01 + '-txtCPor').setValue(Ext.String.trim(rec.get('A3651COMPO')));
                Ext.getCmp(prototype.id01 + '-txtCFre').setValue(Ext.String.trim(rec.get('A3651COMFR')));

                Ext.getCmp(prototype.id01 + '-txtREGIS').setValue(rec.get('A3651REGIS'));
                Ext.getCmp(prototype.id01 + '-txtFREGI').setValue(rec.get('A3651FREGI'));
                Ext.getCmp(prototype.id01 + '-txtHREGI').setValue(rec.get('A3651HREGI'));
                Ext.getCmp(prototype.id01 + '-txtREVIS').setValue(rec.get('A3651REVIS'));
                Ext.getCmp(prototype.id01 + '-txtFREVI').setValue(rec.get('A3651FREVI'));
                Ext.getCmp(prototype.id01 + '-txtHREVI').setValue(rec.get('A3651HREVI'));

                this.OnLoadCmbFamily(rec.get('A3651FAMIL'));

                break;
            case 'I':
                Ext.getCmp(prototype.id01 + '-btn-save').show();
                Ext.getCmp(prototype.id01 + '-btn-update').hide();
                Ext.getCmp(prototype.id01 + '-btn-delete').hide();

                this.OnLoadCmbFamily('');

                break;
            default:
                Ext.getCmp(prototype.id01 + '-btn-save').hide();
                Ext.getCmp(prototype.id01 + '-btn-update').hide();
                Ext.getCmp(prototype.id01 + '-btn-delete').hide();
        }
    },

    OnLoadCmbFamily: function (id) {
        var cmbFamily = Ext.getCmp(prototype.id01 + '-ComboBy');

        cmbFamily.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "Authorise", "name": "AUTHORISE"},
                {"code": "Rejected", "name": "REJECTED"}
            ]
        }));
        

        cmbFamily.setValue(id);
    },
    onCloseClick: function (obj) {
        Ext.getCmp(prototype.id01 + '-win').close();
    },
    onSaveClick: function (obj) {
        var me = this;
        var action = String(me.view.params.action);
        if (action === 'I') {
            me.beanTMP.IN_OPTION = action;

            me.beanTMP.IN_CODRAZ = Ext.getCmp(prototype.id01 + '-txtReason').getValue();
            me.beanTMP.A3651CODRZ = Ext.getCmp(prototype.id01 + '-txtReason').getValue();
            me.beanTMP.A3651FAMIL = Ext.getCmp(prototype.id01 + '-ComboBy').getValue();

            me.beanTMP.A3651COMRE = Ext.getCmp(prototype.id01 + '-txtCRelation').getValue();
            me.beanTMP.A3651COMES = Ext.getCmp(prototype.id01 + '-txtCEs').getValue();
            me.beanTMP.A3651COMEN = Ext.getCmp(prototype.id01 + '-txtCEng').getValue();
            me.beanTMP.A3651COMPO = Ext.getCmp(prototype.id01 + '-txtCPor').getValue();
            me.beanTMP.A3651COMFR = Ext.getCmp(prototype.id01 + '-txtCFre').getValue();

            if (me.beanTMP.A3651FAMIL === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Family');
                return;
            }
            if (me.beanTMP.A3651COMRE === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Comment Relation');
                return;
            }
            if (me.beanTMP.A3651COMES === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Comment Description');
                return;
            }
            if (me.beanTMP.A3651COMEN === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Comment Description');
                return;
            }
            /*if (me.beanTMP.A3651COMFR === ''){
             Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Comment Description');
             return;
             }
             if (me.beanTMP.A3651COMPO === ''){
             Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Comment Description');
             return;
             }*/

            Ext.Msg.show({
                title: '.: PRAXIS :.',
                message: 'SAVE RECORD?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
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
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
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
        } else if (action === 'U' || action === 'D') {

            me.beanTMP.IN_OPTION = action;
            me.beanTMP.IN_CODRAZ = Ext.getCmp(prototype.id01 + '-txtReason').getValue();
            me.beanTMP.A3651CODRZ = Ext.getCmp(prototype.id01 + '-txtReason').getValue();
            me.beanTMP.A3651FAMIL = Ext.getCmp(prototype.id01 + '-ComboBy').getValue();

            me.beanTMP.A3651COMRE = Ext.getCmp(prototype.id01 + '-txtCRelation').getValue();
            me.beanTMP.A3651COMES = Ext.getCmp(prototype.id01 + '-txtCEs').getValue();
            me.beanTMP.A3651COMEN = Ext.getCmp(prototype.id01 + '-txtCEng').getValue();
            me.beanTMP.A3651COMPO = Ext.getCmp(prototype.id01 + '-txtCPor').getValue();
            me.beanTMP.A3651COMFR = Ext.getCmp(prototype.id01 + '-txtCFre').getValue();

            if (me.beanTMP.A3651FAMIL === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Family');
                return;
            }
            if (me.beanTMP.A3406USER === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field');
                return;
            }
            if (me.beanTMP.A3406PAIS === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Country');
                return;
            }
            if (me.beanTMP.A3406FLAG === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Status');
                return;
            }

            Ext.Msg.show({
                title: '.: PRAXIS :.',
                message: 'UPDATE RECORD?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
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
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
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