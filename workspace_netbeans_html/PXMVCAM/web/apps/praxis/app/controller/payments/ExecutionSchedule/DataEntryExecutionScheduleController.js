/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.payments.ExecutionSchedule.DataEntryExecutionScheduleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryExecutionScheduleController',

    beanTMP: {},
    urlWin01: CONTEXTPATH + '/ExecutionSchedule',

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
                Ext.getCmp(prototype.id01 + '-txtStartdate').setValue(rec.get('A4718FINI').substring(0, 4) + "/" + rec.get('A4718FINI').substring(4, 6) + "/" + rec.get('A4718FINI').substring(6, 8));//Ext.String.trim(rec.get('A4718FDCAR')));
                Ext.getCmp(prototype.id01 + '-txtEnddate').setValue(rec.get('A4718FFIN').substring(0, 4) + "/" + rec.get('A4718FFIN').substring(4, 6) + "/" + rec.get('A4718FFIN').substring(6, 8));//Ext.String.trim(rec.get('A4718FDCAR')));
                Ext.getCmp(prototype.id01 + '-CmbProceType').setValue(Ext.String.trim(rec.get('A4718TYPE')));
                Ext.getCmp(prototype.id01 + '-CmbStatus').setValue(Ext.String.trim(rec.get('A4718ESTAT')));

                //
                this.OnLoadCmbStatus(Ext.String.trim(rec.get('A4718ESTAT')));
                this.OnLoadCmbArea(Ext.String.trim(rec.get('A4718TYPE')));
                if (Ext.String.trim(rec.get('A4718ESTAT')) !== 'P' && Ext.String.trim(rec.get('A4718ESTAT')) !== 'I') {
                    Ext.getCmp(prototype.id01 + '-btn-save').hide();
                    Ext.getCmp(prototype.id01 + '-btn-update').hide();
                    Ext.getCmp(prototype.id01 + '-btn-delete').hide();
                }
                //
                Ext.getCmp(prototype.id01 + '-txtA3406REGIS').setValue(rec.get('A4718USRIN'));
                Ext.getCmp(prototype.id01 + '-txtA3406FREGI').setValue(rec.get('A4718FECIN'));
                Ext.getCmp(prototype.id01 + '-txtA3406HREGI').setValue(rec.get('A4718HORIN'));
                Ext.getCmp(prototype.id01 + '-txtA3406REVIS').setValue(rec.get('A4718USRAC'));
                Ext.getCmp(prototype.id01 + '-txtA3406FREVI').setValue(rec.get('A4718FECAC'));
                Ext.getCmp(prototype.id01 + '-txtA3406HREVI').setValue(rec.get('A4718HORAC'));

                break;
            case 'I':
                Ext.getCmp(prototype.id01 + '-btn-save').show();
                Ext.getCmp(prototype.id01 + '-btn-update').hide();
                Ext.getCmp(prototype.id01 + '-btn-delete').hide();

                Ext.getCmp(prototype.id01 + '-txtStartdate').setValue('');
                Ext.getCmp(prototype.id01 + '-txtEnddate').setValue('');
                Ext.getCmp(prototype.id01 + '-CmbProceType').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406REGIS').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406FREGI').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406HREGI').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406REVIS').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406FREVI').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406HREVI').setValue('');
                this.OnLoadCmbStatus('P');
                this.OnLoadCmbArea('');

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
                {"code": "P", "name": "Enabled"},
                {"code": "I", "name": "Disabled"}
            ]
        }));

        cmbSearch.setValue(id);
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
    onDeleteClick: function (obj) {
        var me = this;
        me.beanTMP.IN_OPTION = 'D';
        me.beanTMP.A4718FINI = Ext.getCmp(prototype.id01 + '-txtStartdate').getRawValue();
        me.beanTMP.A4718FFIN = Ext.getCmp(prototype.id01 + '-txtEnddate').getRawValue();
        me.beanTMP.A4718TYPE = Ext.getCmp(prototype.id01 + '-CmbProceType').getValue();
        me.beanTMP.A4718FECIN = Ext.getCmp(prototype.id01 + '-txtA3406FREGI').getValue();
        me.beanTMP.A4718ESTAT = Ext.getCmp(prototype.id01 + '-CmbStatus').getValue();


        if (me.beanTMP.A4718FINI === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Execution date');
            return;
        }
        if (me.beanTMP.A4718FFIN === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Execution date');
            return;
        }
        if (me.beanTMP.A4718TYPE === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Processor Type');
            return;
        }
        if (me.beanTMP.A4718ESTAT === '') {
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
                        url: me.urlWin01 + '/mantenimientoCalendar/',
                        timeout: 60000000,
                        method: 'POST',
                        params: {beanString: JSON.stringify(me.beanTMP)},
                        success: function (response, options) {
                            mask.hide();
                            var res = Ext.JSON.decode(response.responseText);
                            var vp_icon = 0;
                            if (res.data === 'Record inserted' || res.data === 'Record Update' || res.data === 'Record Eliminated' || res.data === 'Record disabled') {
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
            me.beanTMP.A4718FINI = Ext.getCmp(prototype.id01 + '-txtStartdate').getRawValue();
            me.beanTMP.A4718FFIN = Ext.getCmp(prototype.id01 + '-txtEnddate').getRawValue();
            me.beanTMP.A4718TYPE = Ext.getCmp(prototype.id01 + '-CmbProceType').getValue();
            me.beanTMP.A4718FECIN = Ext.getCmp(prototype.id01 + '-txtA3406FREGI').getValue();
            me.beanTMP.A4718ESTAT = Ext.getCmp(prototype.id01 + '-CmbStatus').getValue();


            if (me.beanTMP.A4718FINI === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Execution date');
                return;
            }
            if (me.beanTMP.A4718FFIN === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Execution date');
                return;
            }
            if (me.beanTMP.A4718TYPE === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Processor Type');
                return;
            }
            if (me.beanTMP.A4718ESTAT === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Status');
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
                            url: me.urlWin01 + '/mantenimientoCalendar/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanTMP)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'Record inserted') {
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
            me.beanTMP.A4718FINI = Ext.getCmp(prototype.id01 + '-txtStartdate').getRawValue();
            me.beanTMP.A4718FFIN = Ext.getCmp(prototype.id01 + '-txtEnddate').getRawValue();
            me.beanTMP.A4718TYPE = Ext.getCmp(prototype.id01 + '-CmbProceType').getValue();
            me.beanTMP.A4718FECIN = Ext.getCmp(prototype.id01 + '-txtA3406FREGI').getValue();
            me.beanTMP.A4718ESTAT = Ext.getCmp(prototype.id01 + '-CmbStatus').getValue();


            if (me.beanTMP.A4718FINI === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Execution date');
                return;
            }
            if (me.beanTMP.A4718FFIN === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Execution date');
                return;
            }
            if (me.beanTMP.A4718TYPE === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Processor Type');
                return;
            }
            if (me.beanTMP.A4718ESTAT === '') {
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
                            url: me.urlWin01 + '/mantenimientoCalendar/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanTMP)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'Record inserted' || res.data === 'Record Update' || res.data === 'Record Eliminated' || res.data === 'Record disabled') {
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