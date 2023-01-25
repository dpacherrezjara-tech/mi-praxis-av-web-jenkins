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
Ext.define('Ext.Praxis.controller.sales.ADJMassiveaccountingForm.LoadADJMassiveaccountingSubiArchivoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadADJMassiveaccountingSubiArchivoController',
    BeanInitial: {},
    urlWin01: CONTEXTPATH + '/ADJMassiveaccountingForm',
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
        var CmbType = Ext.getCmp(prototype.idADJLoadADJMassive + '-CmbType');

        CmbType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Select"},
                {"code": "SALE", "name": "Sale/Exch/Rfnd"},
                {"code": "FLWN", "name": "Flown/EMD-Flown"},
                {"code": "IXP", "name": "IXP"},
                {"code": "IXC", "name": "IXC"},
                {"code": "DISC", "name": "DISC"}

            ]
        }));

    },
    onClickCancel: function (btn) {
        this.view.close();

    },
    onClickSave: function (btn) {
        var me = this;
        var CmbType = Ext.getCmp(prototype.idADJLoadADJMassive + '-CmbType').getValue();
        var File = Ext.getCmp(prototype.idADJLoadADJMassive + '-File').getValue();

        if (CmbType === '') {
            Ext.MessageBox.alert('PRAXIS', "Select Type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idADJLoadADJMassive + '-CmbType').focus();", 100);
            });
            return;
        }
        if (File === '') {
            Ext.MessageBox.alert('PRAXIS', "Select File", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idADJLoadADJMassive + '-File').focus();", 100);
            });
            return;

        }
        me.BeanInitial.VP_OPTION = CmbType;
        me.BeanInitial.File = File;
        var url = '';
        if (CmbType === 'FLWN' || CmbType === 'IXP' || CmbType === 'IXC') {
            url = me.urlWin01+''+'/validar_excel_adjmassive/';
        } else {
            url = me.urlWin01+''+'/validar_excel_adjmassive_sale/';
        }
        console.log( me.BeanInitial);
        var form = Ext.getCmp(prototype.idADJLoadADJMassive + '-form-01').getForm();
        form.submit({
            url: url,
            waitMsg: 'Uploading your sure to upload the file...',
            params: {beanString:JSON.stringify(me.BeanInitial)},
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                Ext.Msg.alert('Success', 'Your sure to upload the file "' + res.data + '" has been uploaded.');
                var vp_icon = 0;
                if (res.result === 'Proceso Culminado') {
                    vp_icon = 1;
                }
                global.Msg({msg: res.result, icon: vp_icon, fn: function () {
                        if (vp_icon === 1) {
                            Ext.getCmp(prototype.idADJMassive + '-Contenedor').getController().imgSearch_clickHandler();
                            Ext.getCmp(prototype.idADJLoadADJMassive + '-win').close();

                        }


                    }});
            }
        });


    }
});

