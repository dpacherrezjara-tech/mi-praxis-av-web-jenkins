/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.AccountingMasterCCAM.DataEntryAccountingMasterCCAMController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/AccountingMasterCCAM',
    lblA1819TACC: '',
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
        this.setDataStore();
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
    setDataStore: function() {
        var cbxA1819TIPO = Ext.getCmp(prototype.id + '-cbxA1819TIPO');
        cbxA1819TIPO.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["GL", "GL"],
                ["AR", "AR"]

            ]
        }));
        cbxA1819TIPO.setValue("");
    },
    getDataInputs: function() {
        var p = this.view.params;
        var data = p.rec.data;



        Ext.getCmp(prototype.id + '-cbxA1819TIPO').setValue(data.A1819TIPO);

        Ext.getCmp(prototype.id + '-txtA1819TACC').setValue(data.A1819TACC);
        Ext.getCmp(prototype.id + '-txtA1819CLIEN').setValue(data.A1819CLIEN);
        Ext.getCmp(prototype.id + '-txtA1819NATU').setValue(data.A1819NATU);
        Ext.getCmp(prototype.id + '-txtA1819DESCR').setValue(data.A1819DESCR.trim());
        Ext.getCmp(prototype.id + '-txtA1819CIA').setValue(data.A1819CIA);
        Ext.getCmp(prototype.id + '-txtA1819UNID').setValue(data.A1819UNID);
        Ext.getCmp(prototype.id + '-txtA1819CECO').setValue(data.A1819CECO);
        Ext.getCmp(prototype.id + '-txtA1819UBI').setValue(data.A1819UBI);
        Ext.getCmp(prototype.id + '-txtA1819CTA').setValue(data.A1819CTA);
        Ext.getCmp(prototype.id + '-txtA1819SCTA').setValue(data.A1819SCTA);
        Ext.getCmp(prototype.id + '-txtA1819EQUI').setValue(data.A1819EQUI);
        Ext.getCmp(prototype.id + '-txtA1819ICIA').setValue(data.A1819ICIA);
        Ext.getCmp(prototype.id + '-txtA1819DIREC').setValue(data.A1819DIREC);
        Ext.getCmp(prototype.id + '-txtA1819MODO').setValue(data.A1819MODO);
        Ext.getCmp(prototype.id + '-txtA1819FINI').setValue(data.A1819FINI);
        Ext.getCmp(prototype.id + '-txtA1819FFIN').setValue(data.A1819FFIN);
        Ext.getCmp(prototype.id + '-txtUSCR').setValue(data.A1819REGIS);
        Ext.getCmp(prototype.id + '-txtFECR').setValue(data.A1819FREGI);
        Ext.getCmp(prototype.id + '-txtHOCR').setValue(data.A1819HREGI);
        Ext.getCmp(prototype.id + '-txtUSUP').setValue(data.A1819REGVI);
        Ext.getCmp(prototype.id + '-txtFEUP').setValue(data.A1819FREVI);
        Ext.getCmp(prototype.id + '-txtHOUP').setValue(data.A1819HREVI);

        //txtA1819FINI.text = Util.parseStringToDate(app.trim(beanDTY.A1819FINI));
        //txtA1819FFIN.text = beanDTY.A1819FFIN == "99999999" ? "" : Util.parseStringToDate(app.trim(beanDTY.A1819FFIN));

        this.lblA1819TACC = data.A1819TACC;
        console.log(this.lblA1819TACC);


    },
    getDataEntryValues: function(strOption) {


        var A1806CCUST = '139';
        var A1819TACC = Ext.getCmp(prototype.id + '-txtA1819TACC').getValue();
        var A1819NATU = Ext.getCmp(prototype.id + '-txtA1819NATU').getValue();
        var A1819DESCR = Ext.getCmp(prototype.id + '-txtA1819DESCR').getValue();
        var A1819CLIEN = Ext.getCmp(prototype.id + '-txtA1819CLIEN').getValue();
        var A1819DIREC = Ext.getCmp(prototype.id + '-txtA1819DIREC').getValue();
        var A1819TIPO = Ext.getCmp(prototype.id + '-cbxA1819TIPO').getValue();
        var A1819MODO = Ext.getCmp(prototype.id + '-txtA1819MODO').getValue();
        var A1819CIA = Ext.getCmp(prototype.id + '-txtA1819CIA').getValue();
        var A1819UNID = Ext.getCmp(prototype.id + '-txtA1819UNID').getValue();
        var A1819CECO = Ext.getCmp(prototype.id + '-txtA1819CECO').getValue();
        var A1819UBI = Ext.getCmp(prototype.id + '-txtA1819UBI').getValue();
        var A1819CTA = Ext.getCmp(prototype.id + '-txtA1819CTA').getValue();
        var A1819SCTA = Ext.getCmp(prototype.id + '-txtA1819SCTA').getValue();
        var A1819EQUI = Ext.getCmp(prototype.id + '-txtA1819EQUI').getValue();
        var A1819ICIA = Ext.getCmp(prototype.id + '-txtA1819ICIA').getValue();
        var A1819FINI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1819FINI').getValue(), 'Ymd');
        var A1819FFIN = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1819FFIN').getValue(), 'Ymd');
        var IN_A1819TACC_OLD = this.lblA1819TACC;
        

        if (A1819FINI === '') {
            A1819FINI = '99999999';
        }
        if (A1819FFIN === '') {
            A1819FFIN = '99999999';
        }
        return {
            strOption: strOption,
            A1819CCUST: '139',
            A1819TACC: A1819TACC,
            A1819NATU: A1819NATU,
            A1819DESCR: A1819DESCR,
            A1819CLIEN: A1819CLIEN,
            A1819DIREC: A1819DIREC,
            A1819TIPO: A1819TIPO,
            A1819MODO: A1819MODO,
            A1819CIA: A1819CIA,
            A1819UNID: A1819UNID,
            A1819CECO: A1819CECO,
            A1819UBI: A1819UBI,
            A1819CTA: A1819CTA,
            A1819SCTA: A1819SCTA,
            A1819EQUI: A1819EQUI,
            A1819ICIA: A1819ICIA,
            A1819FINI: A1819FINI,
            A1819FFIN: A1819FFIN,
            IN_A1819TACC_OLD: IN_A1819TACC_OLD

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
        var cbxA1819TIPO = Ext.getCmp(prototype.id + '-cbxA1819TIPO').getValue();
        var txtA1819TACC = Ext.getCmp(prototype.id + '-txtA1819TACC').getValue();
        if(txtA1819TACC === '' || cbxA1819TIPO === ''){
            mensaje = 'Insert fields required.';
        }
        return mensaje;

    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },



});


