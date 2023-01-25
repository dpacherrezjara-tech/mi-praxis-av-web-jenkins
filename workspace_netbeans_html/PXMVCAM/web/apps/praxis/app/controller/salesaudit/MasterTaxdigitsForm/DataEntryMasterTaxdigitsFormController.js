/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.MasterTaxdigitsForm.DataEntryMasterTaxdigitsFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryMasterTaxdigitsFormController',
    beanTMP: {},
    bean: {},
    urlWin01: CONTEXTPATH + '/MasterTaxdigitsForm',
    init: function (view) {
        var me = this;
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        switch (String(this.view.params.action)) {
            case 'U':
                var rec = this.view.params.rec;

                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-btn-save').hide();
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-btn-update').show();
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-btn-delete').show();

                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtCodTax').setValue(rec.get('A2658CODTX'));
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtCodTaxUse').setValue(rec.get('A2658CDTXU'));
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtDescription').setValue(rec.get('A2658DESCP'));
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtREGIS').setValue(rec.get('A2658REGIS'));
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtFREGI').setValue(rec.get('A2658FREGI'));
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtHREGI').setValue(rec.get('A2658HREGI'));
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtREVIS').setValue(rec.get('A2658REVIS'));
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtFREVI').setValue(rec.get('A2658FREVI'));
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtHREVI').setValue(rec.get('A2658HREVI'));

                break;
            case 'I':
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-btn-save').show();
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-btn-update').hide();
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-btn-delete').hide();

                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtCodTax').setValue('');
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtCodTaxUse').setValue('');
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtDescription').setValue('');
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtREGIS').setValue('');
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtFREGI').setValue('');
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtHREGI').setValue('');
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtREVIS').setValue('');
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtFREVI').setValue('');
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtHREVI').setValue('');

                break;
            default:
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-btn-save').hide();
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-btn-update').hide();
                Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-btn-delete').hide();
        }
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
            me.beanTMP.VP_ACTION = action;
            me.beanTMP.A2658CCUST = '139';
            me.beanTMP.A2658CODTX = Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtCodTax').getValue();
            me.beanTMP.A2658CDTXU = Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtCodTaxUse').getValue();
            me.beanTMP.A2658DESCP = Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtDescription').getValue();

            if (me.beanTMP.A2658CODTX === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Code Tax');
                return;
            }
            if (me.beanTMP.A2658CDTXU === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Code Tax to Use');
                return;
            }
            if (me.beanTMP.A2658DESCP === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Description');
                return;
            }

            Ext.Msg.show({
                title: '.: PRAXIS :.',
                message: 'SAVE RECORD?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-win'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();

                        Ext.Ajax.request({
                            url: me.urlWin01 + '/mantenimiento/',
                            timeout: 60000000,
                            method: 'POST',
                            params: me.beanTMP,
                            //params: {beanString: JSON.stringify(me.beanTMP)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'Operation was successful!' ) {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.idMasterTax + '-Contenedor').getController().onSearchClick();
                                            Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-win').close();

                                        }


                                    }});
                            }
                        });

                    }
                }
            });
        } else if (action === 'U' || action === 'D') {
            me.beanTMP.VP_ACTION = action;
            me.beanTMP.A2658CCUST = '139';
            me.beanTMP.A2658CODTX = Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtCodTax').getValue();
            me.beanTMP.A2658CDTXU = Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtCodTaxUse').getValue();
            me.beanTMP.A2658DESCP = Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtDescription').getValue();

            if (me.beanTMP.A2658CODTX === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Code Tax');
                return;
            }
            if (me.beanTMP.A2658CDTXU === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Code Tax to Use');
                return;
            }
            if (me.beanTMP.A2658DESCP === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Description');
                return;
            }

            Ext.Msg.show({
                title: '.: PRAXIS :.',
                message: 'UPDATE RECORD?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-win'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();

                        Ext.Ajax.request({
                            url: me.urlWin01 + '/mantenimiento/',
                            timeout: 60000000,
                            method: 'POST',
                            params: me.beanTMP,
                            //params: {beanString: JSON.stringify(me.beanTMP)},
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
                                            Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-win').close();

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
        Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-win').close();
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onLoadCalculosImpuestos: function (rec) {
        var me = this;
        me.bean.VP_CODTAX = Ext.getCmp(prototype.idDataEntryMasterTaxdigitsForm + '-txtCodTax').getValue();
        if (me.bean.VP_CODTAX === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Code Tax');
            return;
        }
        Ext.getCmp(prototype.id01 + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: me.urlWin01 + '/SearchQueryRFNDetail',
            method: 'POST',
            timeout: '300000',
            params: me.bean,
            success: function (response, options) {
                Ext.getCmp(prototype.id01 + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);
                // console.log(res);
                //  Ext.getCmp(prototype.id01 + '-txtAplicable').setValue(res.lst_RFNDAGNT[0].A3401STATU);



            }
        });
    }

});