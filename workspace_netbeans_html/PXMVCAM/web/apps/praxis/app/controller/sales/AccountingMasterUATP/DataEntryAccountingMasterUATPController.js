/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.AccountingMasterUATP.DataEntryAccountingMasterUATPController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/AccountingMasterUATP',
    lblTarjetaOld: '',
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
        var cbxType = Ext.getCmp(prototype.id + '-cbxType');
        cbxType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["CCAM", "CCAM"],
                ["UATP", "UATP"],
                ["BOOM", "BOOM"]

            ]
        }));
        cbxType.setValue("");

        var cbxMode = Ext.getCmp(prototype.id + '-cbxMode');
        cbxMode.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Counted"],
                ["C", "Credit"]
            ]
        }));
        cbxMode.setValue("");
    },
    getDataInputs: function() {
        var p = this.view.params;
        var data = p.rec.data;



        Ext.getCmp(prototype.id + '-cbxType').setValue(data.A1820TIPO);

        Ext.getCmp(prototype.id + '-txtA1820TCUAT').setValue(Ext.String.trim(data.A1820TCUAT));
        Ext.getCmp(prototype.id + '-txtA1820DOCU').setValue(Ext.String.trim(data.A1820DOCU));
        Ext.getCmp(prototype.id + '-txtA1820DESCR').setValue(Ext.String.trim(data.A1820DESCR));
        Ext.getCmp(prototype.id + '-txtA1820CLIEN').setValue(Ext.String.trim(data.A1820CLIEN));
        Ext.getCmp(prototype.id + '-txtA1820DIREC').setValue(Ext.String.trim(data.A1820DIREC));
        Ext.getCmp(prototype.id + '-txtA1820CIA').setValue(Ext.String.trim(data.A1820CIA));
        Ext.getCmp(prototype.id + '-txtA1820UNID').setValue(Ext.String.trim(data.A1820UNID));
        Ext.getCmp(prototype.id + '-txtA1820CECO').setValue(Ext.String.trim(data.A1820CECO));
        Ext.getCmp(prototype.id + '-txtA1820UBI').setValue(Ext.String.trim(data.A1820UBI));
        Ext.getCmp(prototype.id + '-txtA1820CTA').setValue(Ext.String.trim(data.A1820CTA));
        Ext.getCmp(prototype.id + '-txtA1820SCTA').setValue(Ext.String.trim(data.A1820SCTA));
        Ext.getCmp(prototype.id + '-txtA1820EQUI').setValue(Ext.String.trim(data.A1820EQUI));
        Ext.getCmp(prototype.id + '-txtA1820ICIA').setValue(Ext.String.trim(data.A1820ICIA)); 
        Ext.getCmp(prototype.id + '-txtA1820FINI').setValue( Ext.util.Format.date(data.A1820FINI, 'Y/m/d'));              
        Ext.getCmp(prototype.id + '-txtA1820FFIN').setValue( Ext.util.Format.date(data.A1820FFIN, 'Y/m/d'));   
        Ext.getCmp(prototype.id + '-cbxMode').setValue(Ext.String.trim(data.A1820MODO));          
        Ext.getCmp(prototype.id + '-txtUSCR').setValue(data.A1820REGIS);
        Ext.getCmp(prototype.id + '-txtFECR').setValue(data.A1820FREGI);
        Ext.getCmp(prototype.id + '-txtHOCR').setValue(data.A1820HREGI);
        Ext.getCmp(prototype.id + '-txtUSUP').setValue(data.A1820REGVI);
        Ext.getCmp(prototype.id + '-txtFEUP').setValue(data.A1820FREVI);
        Ext.getCmp(prototype.id + '-txtHOUP').setValue(data.A1820HREVI);       

        this.lblTarjetaOld = data.A1820TCUAT;    
	

    },
    getDataEntryValues: function(strOption) {


        var A1820CCUST = '139';
        var A1820TIPO = Ext.getCmp(prototype.id + '-cbxType').getValue();
        var A1820TCUAT = Ext.getCmp(prototype.id + '-txtA1820TCUAT').getValue();
        var A1820DOCU = Ext.getCmp(prototype.id + '-txtA1820DOCU').getValue();
        var A1820DESCR = Ext.getCmp(prototype.id + '-txtA1820DESCR').getValue();
        var A1820CLIEN = Ext.getCmp(prototype.id + '-txtA1820CLIEN').getValue();
        var A1820DIREC = Ext.getCmp(prototype.id + '-txtA1820DIREC').getValue();
        var A1820CIA = Ext.getCmp(prototype.id + '-txtA1820CIA').getValue();
        var A1820UNID = Ext.getCmp(prototype.id + '-txtA1820UNID').getValue();
        var A1820CECO = Ext.getCmp(prototype.id + '-txtA1820CECO').getValue();
        var A1820UBI = Ext.getCmp(prototype.id + '-txtA1820UBI').getValue();
        var A1820CTA = Ext.getCmp(prototype.id + '-txtA1820CTA').getValue();
        var A1820SCTA = Ext.getCmp(prototype.id + '-txtA1820SCTA').getValue();
        var A1820EQUI = Ext.getCmp(prototype.id + '-txtA1820EQUI').getValue();
        var A1820ICIA = Ext.getCmp(prototype.id + '-txtA1820ICIA').getValue();
        var A1820MODO = Ext.getCmp(prototype.id + '-cbxMode').getValue();       
        var A1820FINI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1820FINI').getValue(), 'Ymd');
        var A1820FFIN = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1820FFIN').getValue(), 'Ymd');
        var IN_A1820TCUAT_OLD = this.lblTarjetaOld;

        if (A1820FINI === '') {
            A1820FINI = '99999999';
        }
        if (A1820FFIN === '') {
            A1820FFIN = '99999999';
        }
        
        return {
            strOption: strOption,
            A1820CCUST: A1820CCUST,
            A1820TIPO: A1820TIPO,
            A1820TCUAT: A1820TCUAT,
            A1820DOCU: A1820DOCU,
            A1820DESCR: A1820DESCR,
            A1820CLIEN: A1820CLIEN,
            A1820DIREC: A1820DIREC,
            A1820CIA: A1820CIA,
            A1820UNID: A1820UNID,
            A1820CECO: A1820CECO,
            A1820UBI: A1820UBI,
            A1820CTA: A1820CTA,
            A1820SCTA: A1820SCTA,
            A1820EQUI: A1820EQUI,
            A1820ICIA: A1820ICIA,
            A1820MODO: A1820MODO,
            A1820FINI: A1820FINI,
            A1820FFIN: A1820FFIN,
            IN_A1820TCUAT_OLD: IN_A1820TCUAT_OLD

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
        var txtA1820TCUAT = Ext.getCmp(prototype.id + '-txtA1820TCUAT').getValue();
       
        if (txtA1820TCUAT.trim() === '') {
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


