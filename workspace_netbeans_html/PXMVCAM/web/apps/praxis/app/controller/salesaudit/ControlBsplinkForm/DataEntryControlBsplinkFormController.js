/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.ControlBsplinkForm.DataEntryControlBsplinkFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryControlBsplinkFormController',

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
                // Ext.getCmp(prototype.id01 + '-btn-delete').show();
                //Ext.getCmp(prototype.id01 + '-txtCountry').setReadOnly(true);
                Ext.getCmp(prototype.id01 + '-txtUSER').setReadOnly(true);
                Ext.getCmp(prototype.id01 + '-txtCountry').setValue(Ext.String.trim(rec.get('A3093PAIS')));
                Ext.getCmp(prototype.id01 + '-txtUSER').setValue(Ext.String.trim(rec.get('A3093USER')));
                Ext.getCmp(prototype.id01 + '-txtCORRL').setValue(Ext.String.trim(rec.get('A3093CORRL')));
                Ext.getCmp(prototype.id01 + '-txtFLAG').setValue(Ext.String.trim(rec.get('A3093FLAG')));
                Ext.getCmp(prototype.id01 + '-txtPassword').setValue('');

                Ext.getCmp(prototype.id01 + '-txtREGIS').setValue(rec.get('A3093REGIS'));
                Ext.getCmp(prototype.id01 + '-txtFREGI').setValue(rec.get('A3093FREGI'));
                Ext.getCmp(prototype.id01 + '-txtHREGI').setValue(rec.get('A3093HREGI'));
                Ext.getCmp(prototype.id01 + '-txtREVIS').setValue(rec.get('A3093REVIS'));
                Ext.getCmp(prototype.id01 + '-txtFREVI').setValue(rec.get('A3093FREVI'));
                Ext.getCmp(prototype.id01 + '-txtHREVI').setValue(rec.get('A3093HREVI'));

                break;
            case 'I':
                Ext.getCmp(prototype.id01 + '-btn-save').show();
                Ext.getCmp(prototype.id01 + '-btn-update').hide();
                Ext.getCmp(prototype.id01 + '-btn-delete').hide();

               // Ext.getCmp(prototype.id01 + '-txtCountry').setReadOnly(false);
                Ext.getCmp(prototype.id01 + '-txtUSER').setReadOnly(false);

                break;
            default:
                Ext.getCmp(prototype.id01 + '-btn-save').hide();
                Ext.getCmp(prototype.id01 + '-btn-update').hide();
                Ext.getCmp(prototype.id01 + '-btn-delete').hide();
               // Ext.getCmp(prototype.id01 + '-txtCountry').setReadOnly(true);
                Ext.getCmp(prototype.id01 + '-txtUSER').setReadOnly(true);
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onSaveClick: function (obj) {
        var me = this;
        var action = String(me.view.params.action);
        if (action === 'I') {
            me.beanTMP.VP_OPTION = action;

            me.beanTMP.A3093PAIS = Ext.getCmp(prototype.id01 + '-txtCountry').getValue();
            me.beanTMP.A3093USER = Ext.getCmp(prototype.id01 + '-txtUSER').getValue();
            me.beanTMP.A3093PASS = Ext.getCmp(prototype.id01 + '-txtPassword').getValue();
            me.beanTMP.A3093FLAG = '0';


            if (me.beanTMP.A3093PASS === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Password');
                return;
            }
            /*if (me.beanTMP.A3093PAIS === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Country');
                return;
            }*/
            if (me.beanTMP.A3093USER === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, USER');
                return;
            }

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
                            url: me.urlWin01 + '/ProcesaMantenimiento/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanTMP)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'Operation was successful!') {
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

            me.beanTMP.VP_OPTION = action;

            me.beanTMP.A3093PAIS = Ext.getCmp(prototype.id01 + '-txtCountry').getValue();
            me.beanTMP.A3093USER = Ext.getCmp(prototype.id01 + '-txtUSER').getValue();
            me.beanTMP.A3093PASS = Ext.getCmp(prototype.id01 + '-txtPassword').getValue();

            me.beanTMP.A3093CORRL = Ext.getCmp(prototype.id01 + '-txtCORRL').getValue();
            if (Ext.getCmp(prototype.id01 + '-txtFLAG').getValue() === 'Activo') {
                me.beanTMP.A3093FLAG = '0';
            } else {
                me.beanTMP.A3093FLAG = '1';
            }


            if (me.beanTMP.A3093PASS === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Password');
                return;
            }
            if (me.beanTMP.A3093PAIS === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Country');
                return;
            }
            if (me.beanTMP.A3093USER === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, USER');
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
                            url: me.urlWin01 + '/ProcesaMantenimiento/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanTMP)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'Operation was successful!') {
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
    },
    onCloseClick: function (btn) {
        this.view.close();
    }

});