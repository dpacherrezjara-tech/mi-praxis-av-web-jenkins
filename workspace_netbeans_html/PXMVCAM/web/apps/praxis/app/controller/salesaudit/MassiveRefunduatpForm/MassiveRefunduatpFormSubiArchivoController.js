/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormSubiArchivoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MassiveRefunduatpFormSubiArchivoController',
    BeanSave: {},
    BeanInitial: {},
    Combo: '',
    Botones: '',
    urlWin01: CONTEXTPATH + '/MassiveRefunduatpForm',
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresFilters();

    },
    setStoresFilters: function () {
        var CmbType = Ext.getCmp(prototype.idMassiveRefunduatpFormSubiArchivo + '-CmbType');

        CmbType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "MA", "name": "LAYOUT DETAIL"},
                {"code": "GP", "name": "LAYOUT TOTAL"}

            ]
        }));

    },
    onClickCancel: function (btn) {
        this.view.close();

    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onClickSave: function (btn) {
        var me = this;
        var File = Ext.getCmp(prototype.idMassiveRefunduatpFormSubiArchivo + '-File').getValue();
        var CmbType = Ext.getCmp(prototype.idMassiveRefunduatpFormSubiArchivo + '-CmbType').getValue();

        if (CmbType === '') {
            Ext.MessageBox.alert('PRAXIS', "Select Type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idMassiveRefunduatpFormSubiArchivo + '-CmbType').focus();", 100);
            });
            return;
        }
        if (File === '') {
            Ext.MessageBox.alert('PRAXIS', "Select File", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idMassiveRefunduatpFormSubiArchivo + '-File').focus();", 100);
            });
            return;

        }
        me.BeanInitial.IN_NAME = File;
        me.BeanInitial.IN_TYPE = CmbType;
        var form = Ext.getCmp(prototype.idMassiveRefunduatpFormSubiArchivo + '-form-01').getForm();
        form.submit({
            url: me.urlWin01 + '/insertTracingFile/',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {beanString: JSON.stringify(me.BeanInitial)
            },
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                Ext.Msg.alert('Success', 'Your sure to upload the file "' + res.data + '" has been uploaded.');
                var vp_icon = 0;
                if (res.result === 'RECORD INSERTED') {
                    vp_icon = 1;
                }
                global.Msg({msg: res.result, icon: vp_icon, fn: function () {
                        if (vp_icon === 1) {
                            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-Contenedor').getController().onSearchClick();
                            Ext.getCmp(prototype.idMassiveRefunduatpFormSubiArchivo + '-win').close();

                        }


                    }});
            }
        });


    }
});
