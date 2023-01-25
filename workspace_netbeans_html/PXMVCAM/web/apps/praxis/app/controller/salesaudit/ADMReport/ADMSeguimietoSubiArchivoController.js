/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Zenobio Perez
 */
Ext.define('Ext.Praxis.controller.salesaudit.ADMReport.ADMSeguimietoSubiArchivoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ADMSeguimietoSubiArchivoController',
    BeanSave: {},
    BeanInitial: {},
    Combo: '',
    Botones: '',
    urlWin01: CONTEXTPATH + '/ADMReport',
    init: function (view) {
        var me = this;
        //this.urlWin01 = Ext.String.trim(this.view.params.url01);
        //me.setStoresFilters();
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        if (String(this.view.params.action) === 'CAMBIOS') {
            me.cargaIniDatos();
        } else {
            me.cargaDatos();
        }

    },
    cargaDatos: function () {
        var me = this;
        rec = me.view.params.rec;
        me.BeanInitial = rec;
        var cmbStatus = Ext.getCmp(prototype.id6 + '-ComboStatus');
        var cmbStatus2 = Ext.getCmp(prototype.id6 + '-ComboStatus2');
        Ext.getCmp(prototype.id6 + '-MemoNumber').setValue(rec[0].A2548FTE);
        Ext.getCmp(prototype.id6 + '-Save').show();
        if (Ext.String.trim(rec[0].A2548FTE) === 'ASR' || Ext.String.trim(rec[0].A2548FTE) === 'MAN') {
            cmbStatus.show();
            cmbStatus2.hide();
            me.Combo = '1';
        } else {
            cmbStatus.hide();
            cmbStatus2.show();
            me.Combo = '2';
        }


    },
    setStoresFilters: function () {
        var cmbStatus = Ext.getCmp(prototype.id6 + '-ComboStatus');
        var cmbStatus2 = Ext.getCmp(prototype.id6 + '-ComboStatus2');

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Select"},
                {"code": "AP", "name": "Approved"},
                {"code": "CU", "name": "Cleared Up"},
                {"code": "CO", "name": "Condoned"},
                {"code": "PA", "name": "Billed"},
                {"code": "ZE", "name": "Authorized"},
                {"code": "RE", "name": "Rejected"},
                {"code": "JU", "name": "Justified"},
                {"code": "AI", "name": "Reaudited"},
                {"code": "DI", "name": "Disputed"},
                {"code": "DE", "name": "Rejected Dispute"},
                {"code": "WA", "name": "Accepte Dispute"}
            ]
        }));

        cmbStatus2.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Select"},
                {"code": "ZE", "name": "Authorized"},
                {"code": "PI", "name": "Billed GDS"},
                {"code": "CU", "name": "Cleared Up"},
                {"code": "CO", "name": "Condoned"},
                {"code": "DI", "name": "Disputed"},
                {"code": "JU", "name": "Justified"},
                {"code": "RE", "name": "Rejected"},
                {"code": "AI", "name": "Reaudited"}
            ]
        }));

    },
    onClickCancel: function (btn) {
        this.view.close();

    },
    onClickSave: function (btn) {
        var me = this;
        var cmbStatus1 = Ext.getCmp(prototype.id6 + '-ComboStatus');
        var cmbStatus2 = Ext.getCmp(prototype.id6 + '-ComboStatus2');
        var File = Ext.getCmp(prototype.id6 + '-File').getValue();
        var ComboStatus = '';
        if (me.Combo !== '') {
            if (me.Combo === '1') {
                ComboStatus = cmbStatus1.getValue();
            }
            if (me.Combo === '2') {
                ComboStatus = cmbStatus2.getValue();
            }
        } else {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Status');
            return;
        }
        if (Ext.getCmp(prototype.id6 + '-Argument').getValue() === '') {
            Ext.MessageBox.alert('PRAXIS', "Enter issue reason", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id6 + '-Argument').focus();", 100);
            });
            return;
        }
        if (Ext.getCmp(prototype.id6 + '-Argument').getValue() !== '') {
            if (Ext.getCmp(prototype.id6 + '-Argument').getValue().length > 500) {
                Ext.MessageBox.alert('PRAXIS', "The Argument must not exceed 500 characters", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id6 + '-Argument').focus();", 100);
                });
                return;
            }

        }
        for (var w = 0; w < me.BeanInitial.length; w++) {
            if (me.BeanInitial[w].A2548FLAG === 'X' || me.BeanInitial[w].A2548FLAG === 'R' || me.BeanInitial[w].A2548FLAG === 'N' || me.BeanInitial[w].A2548FLAG === 'B' || me.BeanInitial[w].A2548FLAG === 'C') {
                Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states,Canceled,Billed,Rejected,Reaudited,Condoned');
                return;
            }
            if (me.BeanInitial[w].A2548FLAG === 'D' && ComboStatus === 'DI') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (me.BeanInitial[w].A2548FLAG === 'J' && ComboStatus === 'JU') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (me.BeanInitial[w].A2548FLAG === 'N' && ComboStatus === 'RE') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (me.BeanInitial[w].A2548FLAG === 'R' && ComboStatus === 'AI') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (me.BeanInitial[w].A2548FLAG === 'E' && ComboStatus === 'DE') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (me.BeanInitial[w].A2548FLAG === 'Z' && ComboStatus === 'ZE') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (me.BeanInitial[w].A2548FLAG === 'A' && ComboStatus === 'AP') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (me.BeanInitial[w].A2548FLAG === 'U' && ComboStatus === 'CU') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (me.BeanInitial[w].A2548FLAG === 'C' && ComboStatus === 'CO') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (me.BeanInitial[w].A2548FLAG === 'P' && ComboStatus === 'PA') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (me.BeanInitial[w].A2548FLAG === 'I' && ComboStatus === 'PA') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (me.BeanInitial[w].A2548FLAG === 'Z' && ComboStatus === 'ZE') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            if (me.BeanInitial[w].A2548FLAG === 'W' && ComboStatus === 'WA') {
                Ext.Msg.alert('.: Warning :.', 'The state cannot be the same');
                return;
            }
            //A2548FTE
            if (Ext.String.trim(me.BeanInitial[w].A2548NMEMO) !== '') {
                if (me.BeanInitial[w].A2548FTE === 'BSP') {
                    if (ComboStatus === 'AP') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states, Authorized,Rejected,Reaudited');
                        return;
                    }
                    if (ComboStatus === 'CU') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states, Authorized,Rejected,Reaudited');
                        return;
                    }
                    if (ComboStatus === 'DI') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states, Authorized,Rejected,Reaudited');
                        return;
                    }
                    if (ComboStatus === 'DE') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states, Authorized,Rejected,Reaudited');
                        return;
                    }
                    if (ComboStatus === 'WA') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states, Authorized,Rejected,Reaudited');
                        return;
                    }
                }
                if (me.BeanInitial[w].A2548FTE === 'ARC') {
                    if (ComboStatus === 'CU') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states, Authorized,Rejected,Reaudited');
                        return;
                    }
                    if (ComboStatus === 'CO') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states, Authorized,Rejected,Reaudited');
                        return;
                    }
                    if (ComboStatus === 'PA') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states, Authorized,Rejected,Reaudited');
                        return;
                    }
                    if (ComboStatus === 'DI') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states, Authorized,Rejected,Reaudited');
                        return;
                    }
                    if (ComboStatus === 'DE') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states, Authorized,Rejected,Reaudited');
                        return;
                    }
                    if (ComboStatus === 'WA') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states, Authorized,Rejected,Reaudited');
                        return;
                    }
                }
                if (me.BeanInitial[w].A2548FTE === 'ASR' || me.BeanInitial[w].A2548FTE === 'MAN') {
                    if (ComboStatus === 'AP') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states,Approved ,Cleared Up,Rejected,Authorized,Reaudited,Disputed');
                        return;
                    }
                    if (ComboStatus === 'CU') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states,Approved ,Cleared Up,Rejected,Authorized,Reaudited,Disputed');
                        return;
                    }
                    if (ComboStatus === 'RE') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states,Approved ,Cleared Up,Rejected,Authorized,Reaudited,Disputed');
                        return;
                    }
                    if (ComboStatus === 'ZE') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states,Approved ,Cleared Up,Rejected,Authorized,Reaudited,Disputed');
                        return;
                    }
                    if (ComboStatus === 'AI') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states,Approved ,Cleared Up,Rejected,Authorized,Reaudited,Disputed');
                        return;
                    }
                    if (ComboStatus === 'DI') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states,Approved ,Cleared Up,Rejected,Authorized,Reaudited,Disputed');
                        return;
                    }
                    if (ComboStatus === 'DE') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states,Approved ,Cleared Up,Rejected,Authorized,Reaudited,Disputed');
                        return;
                    }
                    if (ComboStatus === 'WA') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states,Approved ,Cleared Up,Rejected,Authorized,Reaudited,Disputed');
                        return;
                    }
                }
            } else {
                if (me.BeanInitial[w].A2548FTE === 'BSP') {
                    if (ComboStatus === 'DI') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states,Approved ,Cleared Up,Rejected,Authorized,Reaudited,Disputed');
                        return;
                    }
                }
                if (me.BeanInitial[w].A2548FTE === 'ARC') {
                    if (ComboStatus === 'DI') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states,Approved ,Cleared Up,Rejected,Authorized,Reaudited,Disputed');
                        return;
                    }
                }
                if (me.BeanInitial[w].A2548FTE === 'ASR' || me.BeanInitial[w].A2548FTE === 'MAN') {
                    if (me.BeanInitial[w].A2548FLAG !== 'Y' && ComboStatus === 'DI') {
                        Ext.Msg.alert('.: Warning :.', 'The transaction does not have a debit number therefore you must select the following states,pending');
                        return;
                    }
                }
            }


        }
        if (File !== '') {
            File = File.replace(/C:\\fakepath\\/g, '');
            if (File.length > 40) {
                Ext.Msg.alert('.: PRAXIS :.', 'The file name total must not exceed 40 characters');
                return;
            }
        }
        var form = Ext.getCmp(prototype.id6 + '-form-01').getForm();
        form.submit({
            url: me.urlWin01 + '/insertLisTracingFile/',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {beanlst: JSON.stringify(me.BeanInitial),
                ComboStatus: ComboStatus,
                argument: Ext.getCmp(prototype.id6 + '-Argument').getValue(),
                folio: Ext.getCmp(prototype.id6 + '-Folio').getValue()
            },
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                Ext.Msg.alert('Success', 'Your sure to upload the file "' + res.data + '" has been uploaded.');
                var vp_icon = 0;
                if (res.data === 'RECORD INSERTED') {
                    vp_icon = 1;
                }
                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                        if (vp_icon === 1) {
                            Ext.getCmp(prototype.id + '-Contenedor').getController().imgSearch_clickHandler();
                            Ext.getCmp(prototype.id6 + '-win').close();

                        }


                    }});
            }
        });


    }
});

