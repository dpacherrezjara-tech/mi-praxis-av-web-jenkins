/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.AccountingMasterTravel.DataEntryAccountingMasterTravelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/AccountingMasterTravel',
    lblA1838TIPO: '',
    lblA1838AGENT: '',
    /**
     * Constructor
     */
    init: function(view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        var p = this.view.params;

        switch (p.action) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-save').show();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                break;
        }
        global.AccessControlMaganer();

    },
    getDataInputs: function() {
        var p = this.view.params;
        var data = p.rec.data;

        Ext.getCmp(prototype.id + '-txtA1838TIPO').setValue(data.A1838TIPO);
        Ext.getCmp(prototype.id + '-txtA1838AGENT').setValue(data.A1838AGENT);
        Ext.getCmp(prototype.id + '-txtA1838DESCR').setValue(data.A1838DESCR.trim());
        Ext.getCmp(prototype.id + '-txtA1838CIA').setValue(data.A1838CIA);
        Ext.getCmp(prototype.id + '-txtA1838UNIDA').setValue(data.A1838UNIDA);
        Ext.getCmp(prototype.id + '-txtA1838CENCO').setValue(data.A1838CENCO);
        Ext.getCmp(prototype.id + '-txtA1838UBICA').setValue(data.A1838UBICA);
        Ext.getCmp(prototype.id + '-txtA1838CUENT').setValue(data.A1838CUENT);
        Ext.getCmp(prototype.id + '-txtA1838SUBCT').setValue(data.A1838SUBCT);
        Ext.getCmp(prototype.id + '-txtA1838EQUI').setValue(data.A1838EQUI);
        Ext.getCmp(prototype.id + '-txtA1838INCIA').setValue(data.A1838INCIA);
        Ext.getCmp(prototype.id + '-txtA1838FINI').setValue(data.A1838FINI);
     Ext.getCmp(prototype.id + '-txtA1838FFIN').setValue(data.A1838FFIN === "99999999" ? "" : data.A1838FFIN);
    //    Ext.getCmp(prototype.id + '-txtA1838FFIN').setValue(data.A1838FFIN );
        Ext.getCmp(prototype.id + '-txtUSCR').setValue(data.A1838REGIS);
        Ext.getCmp(prototype.id + '-txtFECR').setValue(data.A1838FREGI);
        Ext.getCmp(prototype.id + '-txtHOCR').setValue(data.A1838HREGI);
        Ext.getCmp(prototype.id + '-txtUSUP').setValue(data.A1838REGVI);
        Ext.getCmp(prototype.id + '-txtFEUP').setValue(data.A1838FREVI);
        Ext.getCmp(prototype.id + '-txtHOUP').setValue(data.A1838HREVI);
        
        console.log(data.txtA1838FFIN);

        this.lblA1838TIPO = data.A1838TIPO;
        this.lblA1838AGENT = data.A1838AGENT;
    },
    getDataEntryValues: function(strOption) {


        var A1838CCUST = '139';
        var A1838TIPO = Ext.getCmp(prototype.id + '-txtA1838TIPO').getValue();
        var A1838AGENT = Ext.getCmp(prototype.id + '-txtA1838AGENT').getValue();
        var A1838DESCR = Ext.getCmp(prototype.id + '-txtA1838DESCR').getValue();
        var A1838CIA = Ext.getCmp(prototype.id + '-txtA1838CIA').getValue();
        var A1838UNIDA = Ext.getCmp(prototype.id + '-txtA1838UNIDA').getValue();
        var A1838CENCO = Ext.getCmp(prototype.id + '-txtA1838CENCO').getValue();
        var A1838UBICA = Ext.getCmp(prototype.id + '-txtA1838UBICA').getValue();
        var A1838CUENT = Ext.getCmp(prototype.id + '-txtA1838CUENT').getValue();
        var A1838SUBCT = Ext.getCmp(prototype.id + '-txtA1838SUBCT').getValue();
        var A1838EQUI = Ext.getCmp(prototype.id + '-txtA1838EQUI').getValue();
        var A1838INCIA = Ext.getCmp(prototype.id + '-txtA1838INCIA').getValue();
        var A1838FINI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1838FINI').getValue(), 'Ymd');
        var A1838FFIN = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1838FFIN').getValue(), 'Ymd');
        var IN_A1838TIPO_OLD = this.lblA1838TIPO;
        var IN_A1838AGENT_OLD = this.lblA1838AGENT;

//        if (A1838FFIN === '') {
//            A1838FFIN = '99999999';
//        }
        return {
            strOption: strOption,
            A1838CCUST: '139',
            A1838TIPO: A1838TIPO,
            A1838AGENT: A1838AGENT,
            A1838DESCR: A1838DESCR,
            A1838CIA: A1838CIA,
            A1838UNIDA: A1838UNIDA,
            A1838CENCO: A1838CENCO,
            A1838UBICA: A1838UBICA,
            A1838CUENT: A1838CUENT,
            A1838SUBCT: A1838SUBCT,
            A1838EQUI: A1838EQUI,
            A1838INCIA: A1838INCIA,
            A1838FINI: A1838FINI,
            A1838FFIN: A1838FFIN,
            IN_A1838TIPO_OLD: IN_A1838TIPO_OLD,
            IN_A1838AGENT_OLD: IN_A1838AGENT_OLD

        };
    },
    onSaveClick: function(btn) {

        var strMsg = this.validateForm();

        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        }
        else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "I";
                        this.crud();
                    }
                }
            });
        }
    },
    crud: function() {
        var p = this.view.params;
        var strOption = p.action;
        console.log(this.getDataEntryValues(strOption));

        Ext.Ajax.request({
            url: this.url + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.msg;


                global.Msg({
                    msg: msg,
                    icon: 1,
                    fn: function() {
                        //exito
                        Ext.getCmp(prototype.id + '-dataEntry').close();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    onUpdateClick: function(btn) {


        var strMsg = this.validateForm();

        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        }
        else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                scope: this,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "U";

                        this.crud();
                    }
                }
            });
        }
    }
    ,
    onDeleteClick: function(btn) {

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.view.params.action = "D";

                    this.crud();
                }
            }
        });
    },
    validateForm: function() {

        var mensaje = "";
        var txtA1838TIPO = Ext.getCmp(prototype.id + '-txtA1838TIPO').getValue();
        if (txtA1838TIPO === '') {
            mensaje = 'Insert fields required.';
        }
        return mensaje;
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }

});


