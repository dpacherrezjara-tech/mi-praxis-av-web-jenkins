/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.AccountingMasterFgForm.DataEntryAccountingMasterFgFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAccountingMasterFgFormController',
    urlWin01: '',
    beanTMP: {},
    beanMant: {},
    campo:'',
    /**
     * Constructor
     */
    init: function (view) {
        var me = this;
        this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var p = this.view.params;
        switch (p.action) {
            case 'I':
                Ext.getCmp(prototype.id2 + '-btn-delete').hide();
                Ext.getCmp(prototype.id2 + '-btn-update').hide();
                Ext.getCmp(prototype.id2 + '-btn-save').show();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id2 + '-btn-save').hide();
                Ext.getCmp(prototype.id2 + '-btn-update').show();
                Ext.getCmp(prototype.id2 + '-btn-delete').show();
                break;
        }
        // global.AccessControlMaganer();

    },
    getDataInputs: function () {
        var p = this.view.params;
        var data = p.rec.data;

        Ext.getCmp(prototype.id2 + '-txtAgru').setValue(Ext.String.trim(data.DESCAGRUP));
        this.campo=Ext.String.trim(data.DESCAGRUP);
        //DESCAGRUP

        Ext.getCmp(prototype.id2 + '-txtUSCR').setValue(data.REGIS);
        Ext.getCmp(prototype.id2 + '-txtFECR').setValue(data.FREGI);
        Ext.getCmp(prototype.id2 + '-txtHOCR').setValue(data.HREGI);
        Ext.getCmp(prototype.id2 + '-txtUSUP').setValue(data.REVIS);
        Ext.getCmp(prototype.id2 + '-txtFEUP').setValue(data.FREVI);
        Ext.getCmp(prototype.id2 + '-txtHOUP').setValue(data.HREVI);




    },
    onSaveClick: function (btn) {

        var strMsg = this.validateForm();

        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXISEX:.',
                msg: 'Are you sure to insert?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "I";
                        this.crud();
                    }
                }
            });
        }
    },
    crud: function () {
        var me = this;
        var p = me.view.params;
        var strOption = p.action;
        me.beanMant.VP_OPCION = strOption;
        me.beanMant.DESCU = Ext.getCmp(prototype.id2 + '-txtAgru').getValue();
        me.beanMant.DESCAGRUP = me.campo;
        

        Ext.Ajax.request({
            url: this.urlWin01 + '/setMasterInvoiceFG',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(me.beanMant)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.msg;
                global.Msg({
                    msg: msg,
                    icon: 1,
                    fn: function () {
                        //exito                       
                        if (msg !== 'RECORD EXISTS') {
                             me.view.close();
                            Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
                        }

                    }
                });
            }
        });
    },
    onUpdateClick: function (btn) {


        var strMsg = this.validateForm();

        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXISEX:.',
                msg: 'Are you sure to update ?',
                scope: this,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "U";

                        this.crud();
                    }
                }
            });
        }
    }
    ,
    onDeleteClick: function (btn) {

        Ext.Msg.show({
            title: '.:PRAXISEX:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.view.params.action = "D";

                    this.crud();
                }
            }
        });
    },
    validateForm: function () {

        var mensaje = "";
        var txtAgru = Ext.getCmp(prototype.id2 + '-txtAgru').getValue();

        if (txtAgru === '' ) {
            mensaje = 'Insert fields required.';
        }
        return mensaje;
    },
    onCancelClick: function (btn) {
        this.view.close();
    }

});




