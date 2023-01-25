/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.EmailcatalogReportForm.DataEntryEmailcatalogReportFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryEmailcatalogReportFormController',
    beanTMP: {},
    urlWin01: CONTEXTPATH + '/EmailcatalogReportForm',
    A3406FALTA: '',
    init: function (view) {
        var me = this;
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.OnLoadCmbStatus();
        switch (String(this.view.params.action)) {
            case 'U':
                var rec = this.view.params.rec;

                Ext.getCmp(prototype.idEmailcaDataEn + '-btn-save').hide();
                Ext.getCmp(prototype.idEmailcaDataEn + '-btn-update').show();
                Ext.getCmp(prototype.idEmailcaDataEn + '-btn-delete').show();

                Ext.getCmp(prototype.idEmailcaDataEn + '-txtmailAirline').setValue('');
                Ext.getCmp(prototype.idEmailcaDataEn + '-txtIATAman').setValue(rec.get('A3903AGETE'));
                Ext.getCmp(prototype.idEmailcaDataEn + '-txtmailagency').setValue(rec.get('A3903COREG'));
                Ext.getCmp(prototype.idEmailcaDataEn + '-txtmailAirline').setValue(rec.get('A3903CORER'));
                Ext.getCmp(prototype.idEmailcaDataEn + '-CmbStatus').setValue(rec.get('A3903FLAG'));


                Ext.getCmp(prototype.idEmailcaDataEn + '-txtA3406REGIS').setValue(rec.get('A3903REGIS'));
                Ext.getCmp(prototype.idEmailcaDataEn + '-txtA3406FREGI').setValue(rec.get('A3903FREGI'));
                Ext.getCmp(prototype.idEmailcaDataEn + '-txtA3406HREGI').setValue(rec.get('A3903HREGI'));
                Ext.getCmp(prototype.idEmailcaDataEn + '-txtA3406REVIS').setValue(rec.get('A3903REVIS'));
                Ext.getCmp(prototype.idEmailcaDataEn + '-txtA3406FREVI').setValue(rec.get('A3903FREVI'));
                Ext.getCmp(prototype.idEmailcaDataEn + '-txtA3406HREVI').setValue(rec.get('A3903HREVI'));
                break;
            case 'I':
                Ext.getCmp(prototype.idEmailcaDataEn + '-btn-save').show();
                Ext.getCmp(prototype.idEmailcaDataEn + '-btn-update').hide();
                Ext.getCmp(prototype.idEmailcaDataEn + '-btn-delete').hide();

                Ext.getCmp(prototype.idEmailcaDataEn + '-txtIATAman').setValue('');
                Ext.getCmp(prototype.idEmailcaDataEn + '-txtmailagency').setValue('');
                Ext.getCmp(prototype.idEmailcaDataEn + '-CmbStatus').setValue('');
                Ext.getCmp(prototype.idEmailcaDataEn + '-txtA3406REGIS').setValue('');
                Ext.getCmp(prototype.idEmailcaDataEn + '-txtA3406FREGI').setValue('');
                Ext.getCmp(prototype.idEmailcaDataEn + '-txtA3406HREGI').setValue('');
                Ext.getCmp(prototype.idEmailcaDataEn + '-txtA3406REVIS').setValue('');
                Ext.getCmp(prototype.idEmailcaDataEn + '-txtA3406FREVI').setValue('');
                Ext.getCmp(prototype.idEmailcaDataEn + '-txtA3406HREVI').setValue('');

                break;
            default:
                Ext.getCmp(prototype.idEmailcaDataEn + '-btn-save').hide();
                Ext.getCmp(prototype.idEmailcaDataEn + '-btn-update').hide();
                Ext.getCmp(prototype.idEmailcaDataEn + '-btn-delete').hide();
        }
    },

    OnLoadCmbStatus: function (id) {
        var cmbSearch = Ext.getCmp(prototype.idEmailcaDataEn + '-CmbStatus');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "A", "name": "Enabled"},
                {"code": "E", "name": "Disabled"}
            ]
        }));
    },
    onSaveClick: function (obj) {
        var me = this;
        me.onGrabarClick('I');
    },
    onUpdateClick: function (obj) {
        var me = this;
         me.onGrabarClick('U');
    },
    onDeleteClick: function (obj) {
        var me = this;
         me.onGrabarClick('D');
    },
    onGrabarClick: function (action) {
        var me = this;
        var rec = this.view.params.rec;

        if (action === 'I') {
            me.beanTMP.IN_OPCION = action;
            me.beanTMP.A3903AGETE = Ext.getCmp(prototype.idEmailcaDataEn + '-txtIATAman').getValue();
            me.beanTMP.A3903CORER = Ext.getCmp(prototype.idEmailcaDataEn + '-txtmailAirline').getValue();
            me.beanTMP.A3903COREG = Ext.getCmp(prototype.idEmailcaDataEn + '-txtmailagency').getValue();
            me.beanTMP.A3903CORRL = '';
            me.beanTMP.A3903FLAG = Ext.getCmp(prototype.idEmailcaDataEn + '-CmbStatus').getValue();

            if (me.beanTMP.A3903AGETE === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Iata');
                return;
            }
            if (me.beanTMP.A3903CORER === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Airline E-Mail');
                return;
            }
            if (me.beanTMP.A3903COREG === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Agency E-Mail');
                return;
            }

            Ext.Msg.show({
                title: '.: PRAXIS :.',
                message: 'SAVE RECORD?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idEmailcaDataEn + '-win'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();

                        Ext.Ajax.request({
                            url: me.urlWin01 + '/mantenimiento/',
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
                                            Ext.getCmp(prototype.idEmailcaDataEn + '-win').close();

                                        }


                                    }});
                            }
                        });

                    }
                }
            });
        } else if (action === 'U' || action === 'D') {
            me.beanTMP.IN_OPCION = action;
            me.beanTMP.A3903AGETE = Ext.getCmp(prototype.idEmailcaDataEn + '-txtIATAman').getValue();
            me.beanTMP.A3903CORER = Ext.getCmp(prototype.idEmailcaDataEn + '-txtmailAirline').getValue();
            me.beanTMP.A3903COREG = Ext.getCmp(prototype.idEmailcaDataEn + '-txtmailagency').getValue();
            me.beanTMP.A3903CORRL = rec.get('A3903CORRL');
            me.beanTMP.A3903FLAG = Ext.getCmp(prototype.idEmailcaDataEn + '-CmbStatus').getValue();

            if (me.beanTMP.A3903AGETE === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Iata');
                return;
            }
            if (me.beanTMP.A3903CORER === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Airline E-Mail');
                return;
            }
            if (me.beanTMP.A3903COREG === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Agency E-Mail');
                return;
            }

            Ext.Msg.show({
                title: '.: PRAXIS :.',
                message: 'UPDATE RECORD?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idEmailcaDataEn + '-win'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();

                        Ext.Ajax.request({
                            url: me.urlWin01 + '/mantenimiento/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanTMP)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD INSERTED' || res.data === 'RECORD UPDATE' || res.data === 'RECORD DELETE') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.id + '-Contenedor').getController().onSearchClick();
                                            Ext.getCmp(prototype.idEmailcaDataEn + '-win').close();

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
        Ext.getCmp(prototype.idEmailcaDataEn + '-win').close();
    }

});