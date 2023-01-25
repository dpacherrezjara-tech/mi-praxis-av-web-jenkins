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
Ext.define('Ext.Praxis.controller.salesaudit.LoadMassiveDebitsForm.LoadMassiveDebitsSubiArchivoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadMassiveDebitsSubiArchivoController',
    BeanSave: {},
    BeanInitial: {},
    Combo: '',
    Botones: '',
    urlWin01: CONTEXTPATH + '/LoadMassiveDebitsForm',
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
        var CmbArea = Ext.getCmp(prototype.id3 + '-CmbArea');
        var CmbType = Ext.getCmp(prototype.id3 + '-CmbType');

        CmbType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Select"},
                {"code": "MP", "name": "BAD PRACTICE"},
                {"code": "BK", "name": "BACKEND"},
                {"code": "CA", "name": "CANCEL ADMS"},
                {"code": "FC", "name": "FACT. COMMISSION"},
                {"code": "FA", "name": "FACT. NOT SEND"},
                {"code": "GR", "name": "GENERAL"},
                {"code": "AP", "name": "SETTINGS UPFRONT"},
                {"code": "UP", "name": "UPFRONT"},
                {"code": "RT", "name": "RETENTION"}
                //{"code": "FR", "name": "FRANQUICIAS"},
               
            ]
        }));

        CmbArea.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Select"},
                {"code": "CR", "name": "CREDIT AND COBRANZA"},
                {"code": "VI", "name": "SALE INDIRECTA"},
                {"code": "DI", "name": "SALE DIRECTA"},
                {"code": "CM", "name": "COMMISSION"}
            ]
        }));

    },
    onClickCancel: function (btn) {
        this.view.close();

    },
    onClickSave: function (btn) {
        var me = this;
        var CmbArea = Ext.getCmp(prototype.id3 + '-CmbArea').getValue();
        var CmbType = Ext.getCmp(prototype.id3 + '-CmbType').getValue();
        var File = Ext.getCmp( prototype.id3 + '-File').getValue();

        if (CmbArea === '') {
            Ext.MessageBox.alert('PRAXIS', "Select Area", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id3 + '-CmbArea').focus();", 100);
            });
            return;
        }
        if (CmbType === '') {
            Ext.MessageBox.alert('PRAXIS', "Select Type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id3 + '-CmbType').focus();", 100);
            });
            return;

        }
        if (File === '') {
            Ext.MessageBox.alert('PRAXIS', "Select File", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id3 + '-File').focus();", 100);
            });
            return;

        }
        me.BeanInitial.IN_AREA = CmbArea;
        me.BeanInitial.IN_TYPE = CmbType;
        me.BeanInitial.File = File;
        var form = Ext.getCmp(prototype.id3 + '-form-01').getForm();
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
                            Ext.getCmp(prototype.id + '-Contenedor').getController().imgSearch_clickHandler();
                            Ext.getCmp(prototype.id3 + '-win').close();

                        }


                    }});
            }
        });


    }
});

