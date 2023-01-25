/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * LoadticketReportFormSubiArchivoController
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.LoadticketReportForm.LoadticketReportFormSubiArchivoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadticketReportFormSubiArchivoController',
    BeanSave: {},
    BeanInitial: {},
    Combo: '',
    Botones: '',
    urlWin01: CONTEXTPATH + '/LoadticketReportForm',
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;

    },
    onClickCancel: function (btn) {
        this.view.close();

    },
    onClickSave: function (btn) {
        var me = this;
        var File = Ext.getCmp( prototype.idLoadLoadticketReport + '-File').getValue();

        if (File === '') {
            Ext.MessageBox.alert('PRAXIS', "Select File", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idLoadLoadticketReport + '-File').focus();", 100);
            });
            return;

        }
        me.BeanInitial.File = File;
        var form = Ext.getCmp(prototype.idLoadLoadticketReport + '-form-01').getForm();
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
                            Ext.getCmp(prototype.idLoadticketLoadticket + '-Contenedor').getController().onSearchClick();
                            Ext.getCmp(prototype.idLoadLoadticketReport + '-win').close();

                        }


                    }});
            }
        });


    }
});

