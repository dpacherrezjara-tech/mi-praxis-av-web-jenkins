/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.IataemailcatalogReportForm.DataEntryIataemailcatalogReportFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryIataemailcatalogReportFormController',
    beanTMP: {},
    urlWin01: CONTEXTPATH + '/IataemailcatalogReportForm',
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
        var cmbCountry = Ext.getCmp(prototype.idEmailcatalog + '-txtA3948PAIS');
        cmbCountry.setStore(me.view.params.reccountry);
        switch (String(this.view.params.action)) {
            case 'U':
                var rec = this.view.params.rec;

                Ext.getCmp(prototype.idEmailcatalog + '-btn-save').hide();
                Ext.getCmp(prototype.idEmailcatalog + '-btn-update').show();
                Ext.getCmp(prototype.idEmailcatalog + '-btn-delete').show();

                //Ext.getCmp(prototype.idEmailcatalog + '-txtA3948ZONA').setValue(rec.get('A3948ZONA'));
                Ext.getCmp(prototype.idEmailcatalog + '-txtA3948PAIS').setValue(rec.get('A3948PAIS'));
                Ext.getCmp(prototype.idEmailcatalog + '-txtA3948GSA').setValue(rec.get('A3948GSA'));
                Ext.getCmp(prototype.idEmailcatalog + '-txtA3948RESPO').setValue(rec.get('A3948RESPO'));
                //Ext.getCmp(prototype.idEmailcatalog + '-txtIATAman').setValue(rec.get('A3948AGETE'));

                Ext.getCmp(prototype.idEmailcatalog + '-txtmailagency').setValue(rec.get('A3948COREG'));
                Ext.getCmp(prototype.idEmailcatalog + '-txtmailAirline').setValue(rec.get('A3948CORER'));
                Ext.getCmp(prototype.idEmailcatalog + '-Cmbstatus').setValue(rec.get('A3948FLAG'));

                
                Ext.getCmp(prototype.idEmailcatalog + '-checkbox1').setValue(Ext.String.trim(rec.get('A3948BILLI')));
                Ext.getCmp(prototype.idEmailcatalog + '-checkbox2').setValue(Ext.String.trim(rec.get('A3948DAILY')));
                Ext.getCmp(prototype.idEmailcatalog + '-checkbox3').setValue(Ext.String.trim(rec.get('A3948CSETT')));
                Ext.getCmp(prototype.idEmailcatalog + '-checkbox4').setValue(Ext.String.trim(rec.get('A3948OPERA')));
                Ext.getCmp(prototype.idEmailcatalog + '-checkbox5').setValue(Ext.String.trim(rec.get('A3948AGENC')));
                Ext.getCmp(prototype.idEmailcatalog + '-checkbox6').setValue(Ext.String.trim(rec.get('A3948COMPA')));
                Ext.getCmp(prototype.idEmailcatalog + '-checkbox7').setValue(Ext.String.trim(rec.get('A3948NCOMP')));
                


                Ext.getCmp(prototype.idEmailcatalog + '-txtA3406REGIS').setValue(rec.get('A3948REGIS'));
                Ext.getCmp(prototype.idEmailcatalog + '-txtA3406FREGI').setValue(rec.get('A3948FREGI'));
                Ext.getCmp(prototype.idEmailcatalog + '-txtA3406HREGI').setValue(rec.get('A3948HREGI'));
                Ext.getCmp(prototype.idEmailcatalog + '-txtA3406REVIS').setValue(rec.get('A3948REVIS'));
                Ext.getCmp(prototype.idEmailcatalog + '-txtA3406FREVI').setValue(rec.get('A3948FREVI'));
                Ext.getCmp(prototype.idEmailcatalog + '-txtA3406HREVI').setValue(rec.get('A3948HREVI'));
                break;
            case 'I':
                Ext.getCmp(prototype.idEmailcatalog + '-btn-save').show();
                Ext.getCmp(prototype.idEmailcatalog + '-btn-update').hide();
                Ext.getCmp(prototype.idEmailcatalog + '-btn-delete').hide();

                //Ext.getCmp(prototype.idEmailcatalog + '-txtA3948ZONA').setValue('');
                Ext.getCmp(prototype.idEmailcatalog + '-txtA3948PAIS').setValue('');
                Ext.getCmp(prototype.idEmailcatalog + '-txtA3948GSA').setValue('');
                Ext.getCmp(prototype.idEmailcatalog + '-txtA3948RESPO').setValue('');
                //Ext.getCmp(prototype.idEmailcatalog + '-txtIATAman').setValue(rec.get('A3948AGETE'));

                Ext.getCmp(prototype.idEmailcatalog + '-txtmailagency').setValue('');


                Ext.getCmp(prototype.idEmailcatalog + '-txtA3406REGIS').setValue('');
                Ext.getCmp(prototype.idEmailcatalog + '-txtA3406FREGI').setValue('');
                Ext.getCmp(prototype.idEmailcatalog + '-txtA3406HREGI').setValue('');
                Ext.getCmp(prototype.idEmailcatalog + '-txtA3406REVIS').setValue('');
                Ext.getCmp(prototype.idEmailcatalog + '-txtA3406FREVI').setValue('');
                Ext.getCmp(prototype.idEmailcatalog + '-txtA3406HREVI').setValue('');

                break;
            default:
                Ext.getCmp(prototype.idEmailcatalog + '-btn-save').hide();
                Ext.getCmp(prototype.idEmailcatalog + '-btn-update').hide();
                Ext.getCmp(prototype.idEmailcatalog + '-btn-delete').hide();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    OnLoadCmbStatus: function (id) {
        var cmbSearch = Ext.getCmp(prototype.idEmailcatalog + '-Cmbstatus');

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
            me.beanTMP.IN_OPTION = action;
            me.beanTMP.A3948ZONA = '';//Ext.getCmp(prototype.idEmailcatalog + '-txtA3948ZONA').getValue();
            me.beanTMP.A3948PAIS = Ext.getCmp(prototype.idEmailcatalog + '-txtA3948PAIS').getValue();
            me.beanTMP.A3948GSA = Ext.getCmp(prototype.idEmailcatalog + '-txtA3948GSA').getValue();
            me.beanTMP.A3948RESPO = Ext.getCmp(prototype.idEmailcatalog + '-txtA3948RESPO').getValue();
            me.beanTMP.A3948AGETE = '';

            me.beanTMP.A3948COREG = Ext.getCmp(prototype.idEmailcatalog + '-txtmailagency').getValue();
            me.beanTMP.A3948CORER = Ext.getCmp(prototype.idEmailcatalog + '-txtmailAirline').getValue();
            me.beanTMP.A3948CORRL = '';
            me.beanTMP.A3948FLAG = Ext.getCmp(prototype.idEmailcatalog + '-Cmbstatus').getValue();
            me.beanTMP.A3948BILLI = Ext.getCmp(prototype.idEmailcatalog + '-checkbox1').getValue();
            me.beanTMP.A3948DAILY = Ext.getCmp(prototype.idEmailcatalog + '-checkbox2').getValue();
            me.beanTMP.A3948CSETT = Ext.getCmp(prototype.idEmailcatalog + '-checkbox3').getValue();
            me.beanTMP.A3948OPERA = Ext.getCmp(prototype.idEmailcatalog + '-checkbox4').getValue();
            me.beanTMP.A3948AGENC = Ext.getCmp(prototype.idEmailcatalog + '-checkbox5').getValue();
            me.beanTMP.A3948COMPA = Ext.getCmp(prototype.idEmailcatalog + '-checkbox6').getValue();
            me.beanTMP.A3948NCOMP = Ext.getCmp(prototype.idEmailcatalog + '-checkbox7').getValue();


            /*if (me.beanTMP.A3948ZONA === '') {
             Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Zone');
             return;
             }*/
            if (me.beanTMP.A3948PAIS === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Country');
                return;
            }
            if (me.beanTMP.A3948GSA === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, GSA');
                return;
            }
            if (me.beanTMP.A3948CORER === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Airline E-Mail');
                return;
            }
            if (me.beanTMP.A3948COREG === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Agency E-Mail');
                return;
            }
            if (!Ext.getCmp(prototype.idEmailcatalog + '-checkbox7').getValue() && !Ext.getCmp(prototype.idEmailcatalog + '-checkbox6').getValue() && !Ext.getCmp(prototype.idEmailcatalog + '-checkbox1').getValue() && !Ext.getCmp(prototype.idEmailcatalog + '-checkbox2').getValue() && !Ext.getCmp(prototype.idEmailcatalog + '-checkbox3').getValue() && !Ext.getCmp(prototype.idEmailcatalog + '-checkbox4').getValue() && !Ext.getCmp(prototype.idEmailcatalog + '-checkbox5').getValue()) {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, the file type');
                return;
            }

            Ext.Msg.show({
                title: '.: PRAXIS :.',
                message: 'SAVE RECORD?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idEmailcatalog + '-win'), {
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
                                            Ext.getCmp(prototype.idEmailcatalog + '-win').close();

                                        }


                                    }});
                            }
                        });

                    }
                }
            });
        } else if (action === 'U' || action === 'D') {
            me.beanTMP.IN_OPTION = action;
            me.beanTMP.A3948ZONA = '';//Ext.getCmp(prototype.idEmailcatalog + '-txtA3948ZONA').getValue();
            me.beanTMP.A3948PAIS = Ext.getCmp(prototype.idEmailcatalog + '-txtA3948PAIS').getValue();
            me.beanTMP.A3948GSA = Ext.getCmp(prototype.idEmailcatalog + '-txtA3948GSA').getValue();
            me.beanTMP.A3948RESPO = Ext.getCmp(prototype.idEmailcatalog + '-txtA3948RESPO').getValue();
            me.beanTMP.A3948AGETE = '';
            //me.beanTMP.A3948AGETE = Ext.getCmp(prototype.idEmailcatalog + '-txtIATAman').getValue();

            me.beanTMP.A3948COREG = Ext.getCmp(prototype.idEmailcatalog + '-txtmailagency').getValue();
            me.beanTMP.A3948CORER = Ext.getCmp(prototype.idEmailcatalog + '-txtmailAirline').getValue();
            me.beanTMP.A3948CORRL = rec.get('A3948CORRL');
            me.beanTMP.A3948FLAG = Ext.getCmp(prototype.idEmailcatalog + '-Cmbstatus').getValue();
            me.beanTMP.A3948BILLI = Ext.getCmp(prototype.idEmailcatalog + '-checkbox1').getValue();
            me.beanTMP.A3948DAILY = Ext.getCmp(prototype.idEmailcatalog + '-checkbox2').getValue();
            me.beanTMP.A3948CSETT = Ext.getCmp(prototype.idEmailcatalog + '-checkbox3').getValue();
            me.beanTMP.A3948OPERA = Ext.getCmp(prototype.idEmailcatalog + '-checkbox4').getValue();
            me.beanTMP.A3948AGENC = Ext.getCmp(prototype.idEmailcatalog + '-checkbox5').getValue();
            me.beanTMP.A3948COMPA = Ext.getCmp(prototype.idEmailcatalog + '-checkbox6').getValue();
            me.beanTMP.A3948NCOMP = Ext.getCmp(prototype.idEmailcatalog + '-checkbox7').getValue();

            if (!Ext.getCmp(prototype.idEmailcatalog + '-checkbox7').getValue() && !Ext.getCmp(prototype.idEmailcatalog + '-checkbox6').getValue() && !Ext.getCmp(prototype.idEmailcatalog + '-checkbox1').getValue() && !Ext.getCmp(prototype.idEmailcatalog + '-checkbox1').getValue() && !Ext.getCmp(prototype.idEmailcatalog + '-checkbox2').getValue() && !Ext.getCmp(prototype.idEmailcatalog + '-checkbox3').getValue() && !Ext.getCmp(prototype.idEmailcatalog + '-checkbox4').getValue() && !Ext.getCmp(prototype.idEmailcatalog + '-checkbox5').getValue()) {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, the file type');
                return;
            }
            /*if (me.beanTMP.A3948ZONA === '') {
             Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Zone');
             return;
             }*/
            if (me.beanTMP.A3948PAIS === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Country');
                return;
            }
            if (me.beanTMP.A3948GSA === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, GSA');
                return;
            }
            if (me.beanTMP.A3948CORER === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Airline E-Mail');
                return;
            }
            if (me.beanTMP.A3948COREG === '') {
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
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idEmailcatalog + '-win'), {
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
                                            Ext.getCmp(prototype.idIataemail + '-Contenedor').getController().onSearchClick();
                                            Ext.getCmp(prototype.idEmailcatalog + '-win').close();

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
        Ext.getCmp(prototype.idEmailcatalog + '-win').close();
    }

});