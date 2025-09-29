/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.payments.UserMaintenance.DataEntryUserMaintenanceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryUserMaintenanceController',

    beanTMP: {},
    urlWin01: CONTEXTPATH + '/UserMaintenance',

    A3650FALTA: '',

    init: function (view) {
        var me = this;
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

                Ext.getCmp(prototype.id01 + '-txtA2665DESCR').setValue(Ext.String.trim(rec.get('A4717DECRI')));
                Ext.getCmp(prototype.id01 + '-txtuser').setValue(Ext.String.trim(rec.get('A4717USER')));
                // Ext.getCmp(prototype.id01 + '-txtpass').setValue(Ext.String.trim(rec.get('A4717PASS')));
                Ext.getCmp(prototype.id01 + '-CmbProceType').setValue(Ext.String.trim(rec.get('A4717TYPE')));
                Ext.getCmp(prototype.id01 + '-CmbStatus').setValue(Ext.String.trim(rec.get('A4717ESTAT')));
                Ext.getCmp(prototype.id01 + '-CmbProcessso').setValue(Ext.String.trim(rec.get('A4717PROCE')));
                Ext.getCmp(prototype.id01 + '-CmbVerifica').setValue(Ext.String.trim(rec.get('A4717VERIF')));
                Ext.getCmp(prototype.id01 + '-txtcorreo').setValue(Ext.String.trim(rec.get('A4717CORR')));

                //
                this.OnLoadCmbStatus(Ext.String.trim(rec.get('A4717ESTAT')));
                this.OnLoadCmbArea(Ext.String.trim(rec.get('A4717TYPE')));
                this.OnLoadCmbProcessso(Ext.String.trim(rec.get('A4717PROCE')));
                this.CmbVerifica(Ext.String.trim(rec.get('A4717VERIF')));
                //
                Ext.getCmp(prototype.id01 + '-CmbProceType').disable();
                Ext.getCmp(prototype.id01 + '-txtuser').disable();
                Ext.getCmp(prototype.id01 + '-txtA3406REGIS').setValue(rec.get('A4717USRIN'));
                Ext.getCmp(prototype.id01 + '-txtA3406FREGI').setValue(rec.get('A4717FECIN'));
                Ext.getCmp(prototype.id01 + '-txtA3406HREGI').setValue(rec.get('A4717HORIN'));
                Ext.getCmp(prototype.id01 + '-txtA3406REVIS').setValue(rec.get('A4717USRAC'));
                Ext.getCmp(prototype.id01 + '-txtA3406FREVI').setValue(rec.get('A4717FECAC'));
                Ext.getCmp(prototype.id01 + '-txtA3406HREVI').setValue(rec.get('A4717HORAC'));

                break;
            case 'I':
                Ext.getCmp(prototype.id01 + '-btn-save').show();
                Ext.getCmp(prototype.id01 + '-btn-update').hide();
                Ext.getCmp(prototype.id01 + '-btn-delete').hide();

                Ext.getCmp(prototype.id01 + '-txtA2665DESCR').setValue('');
                Ext.getCmp(prototype.id01 + '-txtuser').setValue('');
                Ext.getCmp(prototype.id01 + '-CmbProceType').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406REGIS').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406FREGI').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406HREGI').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406REVIS').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406FREVI').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406HREVI').setValue('');
                this.OnLoadCmbStatus('A');
                this.OnLoadCmbArea('');
                this.OnLoadCmbProcessso('T');
                this.CmbVerifica('S');

                break;
            default:
                Ext.getCmp(prototype.id01 + '-btn-save').hide();
                Ext.getCmp(prototype.id01 + '-btn-update').hide();
                Ext.getCmp(prototype.id01 + '-btn-delete').hide();
        }
    },
    OnLoadCmbStatus: function (id) {
        var cmbSearch = Ext.getCmp(prototype.id01 + '-CmbStatus');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "A", "name": "Enabled"},
                {"code": "I", "name": "Disabled"}
            ]
        }));

        cmbSearch.setValue(id);
    },
    OnLoadCmbProcessso: function (id) {
        var cmbSearch = Ext.getCmp(prototype.id01 + '-CmbProcessso');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "T", "name": "Every day"},
                {"code": "D", "name": "Programmed"}
            ]
        }));

        cmbSearch.setValue(id);
    },
    CmbVerifica: function (id) {
        var CmbVerifica = Ext.getCmp(prototype.id01 + '-CmbVerifica');

        CmbVerifica.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "S", "name": "No code"},
                {"code": "D", "name": "2FA"},
                {"code": "E", "name": "Email(OTP)"},
                {"code": "C", "name": "Captcha code"}
            ]
        }));

        CmbVerifica.setValue(id);
    },
    OnLoadCmbArea: function (id) {
        var cmbArea = Ext.getCmp(prototype.id01 + '-CmbProceType');
        cmbArea.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "PSE", "name": "PSE"},
                {"code": "CRDO", "name": "Credomatic"},
                {"code": "WOIQ", "name": "Worldpay IQ"},
                {"code": "ECAD", "name": "Elavon CAD"},
                {"code": "EEUR", "name": "Elavon EUR"},
                {"code": "PBDI", "name": "PB-DINERS"},
                {"code": "PBPV", "name": "PB-PVA"},
                {"code": "SAFE", "name": "SAFETYPAY"},
                {"code": "CODE", "name": "CODENSA"}
            ]
        }));

        cmbArea.setValue(Ext.String.trim(id));
    },
    onDeleClick: function (obj) {
        var me = this;
        me.beanTMP.IN_OPTION = "D";
        me.beanTMP.A4717USER = Ext.getCmp(prototype.id01 + '-txtuser').getValue();
        me.beanTMP.A4717PASS = Ext.getCmp(prototype.id01 + '-txtpass').getValue();
        me.beanTMP.A4717TYPE = Ext.getCmp(prototype.id01 + '-CmbProceType').getValue();
        me.beanTMP.A4717ESTAT = Ext.getCmp(prototype.id01 + '-CmbStatus').getValue();
        me.beanTMP.A4717PROCE = Ext.getCmp(prototype.id01 + '-CmbProcessso').getValue();
        me.beanTMP.A4717VERIF = Ext.getCmp(prototype.id01 + '-CmbVerifica').getValue();
        me.beanTMP.A4717DECRI = Ext.getCmp(prototype.id01 + '-txtA2665DESCR').getValue();
        me.beanTMP.A4717CORR = Ext.getCmp(prototype.id01 + '-txtcorreo').getValue();
        me.beanTMP.A4717LIK = '';

        if (me.beanTMP.A4717USER === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Required Field, User');
            return;
        }
        if (me.beanTMP.A4717TYPE === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Processor Type');
            return;
        }
        if (me.beanTMP.A4717ESTAT === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Status');
            return;
        }
        if (me.beanTMP.A4717PROCE === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Process');
            return;
        }
        if (me.beanTMP.A4717VERIF === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Verification');
            return;
        }
        if (me.beanTMP.txtcorreo === '' && ['D', 'E', 'C'].includes(me.beanTMP.A4717VERIF)) {
            Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Email Robot');
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
                        url: me.urlWin01 + '/mantenimientoUser/',
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
                                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                        Ext.getCmp(prototype.id01 + '-win').close();

                                    }


                                }});
                        }
                    });

                }
            }
        });

    },

    onSaveClick: function (obj) {
        var me = this;
        var action = String(me.view.params.action);

        if (action === 'I') {
            me.beanTMP.IN_OPTION = action;
            me.beanTMP.A4717USER = Ext.getCmp(prototype.id01 + '-txtuser').getValue();
            me.beanTMP.A4717PASS = Ext.getCmp(prototype.id01 + '-txtpass').getValue();
            me.beanTMP.A4717TYPE = Ext.getCmp(prototype.id01 + '-CmbProceType').getValue();
            me.beanTMP.A4717ESTAT = Ext.getCmp(prototype.id01 + '-CmbStatus').getValue();
            me.beanTMP.A4717PROCE = Ext.getCmp(prototype.id01 + '-CmbProcessso').getValue();
            me.beanTMP.A4717VERIF = Ext.getCmp(prototype.id01 + '-CmbVerifica').getValue();
            me.beanTMP.A4717DECRI = Ext.getCmp(prototype.id01 + '-txtA2665DESCR').getValue();
            me.beanTMP.A4717CORR = Ext.getCmp(prototype.id01 + '-txtcorreo').getValue();
            me.beanTMP.A4717LIK = '';

            if (me.beanTMP.A4717USER === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, User');
                return;
            }
            if (me.beanTMP.A4717TYPE === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Processor Type');
                return;
            }
            if (me.beanTMP.A4717ESTAT === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Status');
                return;
            }
            if (me.beanTMP.A4717PROCE === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Process');
                return;
            }
            if (me.beanTMP.A4717VERIF === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Verification');
                return;
            }
            if (me.beanTMP.A4717CORR === '' && ['D', 'E', 'C'].includes(me.beanTMP.A4717VERIF)) {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Email Robot');
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
                            url: me.urlWin01 + '/mantenimientoUser/',
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
                                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
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
            me.beanTMP.A4717USER = Ext.getCmp(prototype.id01 + '-txtuser').getValue();
            me.beanTMP.A4717PASS = Ext.getCmp(prototype.id01 + '-txtpass').getValue();
            me.beanTMP.A4717TYPE = Ext.getCmp(prototype.id01 + '-CmbProceType').getValue();
            me.beanTMP.A4717ESTAT = Ext.getCmp(prototype.id01 + '-CmbStatus').getValue();
            me.beanTMP.A4717PROCE = Ext.getCmp(prototype.id01 + '-CmbProcessso').getValue();
            me.beanTMP.A4717VERIF = Ext.getCmp(prototype.id01 + '-CmbVerifica').getValue();
            me.beanTMP.A4717DECRI = Ext.getCmp(prototype.id01 + '-txtA2665DESCR').getValue();
            me.beanTMP.A4717CORR = Ext.getCmp(prototype.id01 + '-txtcorreo').getValue();
            me.beanTMP.A4717LIK = '';

            if (me.beanTMP.A4717USER === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, User');
                return;
            }
            if (me.beanTMP.A4717PASS === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Pass');
                return;
            }
            if (me.beanTMP.A4717TYPE === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Processor Type');
                return;
            }
            if (me.beanTMP.A4717ESTAT === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Status');
                return;
            }
            if (me.beanTMP.A4717PROCE === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Process');
                return;
            }
            if (me.beanTMP.A4717VERIF === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Verification');
                return;
            }
            if (me.beanTMP.txtcorreo === '' && ['D', 'E', 'C'].includes(me.beanTMP.A4717VERIF)) {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Email Robot');
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
                            url: me.urlWin01 + '/mantenimientoUser/',
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
                                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
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

    onCloseClick: function (obj) {
        Ext.getCmp(prototype.id01 + '-win').close();
    }

});