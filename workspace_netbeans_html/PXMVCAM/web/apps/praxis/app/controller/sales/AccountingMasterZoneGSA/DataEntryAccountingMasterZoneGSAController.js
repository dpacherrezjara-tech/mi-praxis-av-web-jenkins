/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.AccountingMasterZoneGSA.DataEntryAccountingMasterZoneGSAController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/AccountingMasterZoneGSA',
    lblA1769CATEG: '',
    lblA1769CODIG: '',
    lblA1769FINI: '',
    lblA1769FFIN: '',
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

        Ext.getCmp(prototype.id + '-txtA1769CATEG').setValue(data.A1769CATEG);
        Ext.getCmp(prototype.id + '-txtA1769CODIG').setValue(data.A1769CODIG);
        Ext.getCmp(prototype.id + '-txtA1769VALOR').setValue(data.A1769VALOR);
        Ext.getCmp(prototype.id + '-txtA1769DESC').setValue(data.A1769DESC.trim());


        Ext.getCmp(prototype.id + '-txtStartDate').setValue(data.A1769FINI === "99999999" ? "" : data.A1769FINI);
        Ext.getCmp(prototype.id + '-txtEndDate').setValue(data.A1769FFIN === "99999999" ? "" : data.A1769FFIN);

        Ext.getCmp(prototype.id + '-txtUSCR').setValue(data.A1769REGIS);
        Ext.getCmp(prototype.id + '-txtFECR').setValue(data.A1769FREGI);
        Ext.getCmp(prototype.id + '-txtHOCR').setValue(data.A1769HREGI);
        Ext.getCmp(prototype.id + '-txtUSUP').setValue(data.A1769REGVI);
        Ext.getCmp(prototype.id + '-txtFEUP').setValue(data.A1769FREVI);
        Ext.getCmp(prototype.id + '-txtHOUP').setValue(data.A1769HREVI);


        this.lblA1769CATEG = data.A1769CATEG;
        this.lblA1769CODIG = data.A1769CODIG;


        if (data.A1769FINI === '9999/99/99') {
            this.lblA1769FINI = '99999999';
        } else if (data.A1769FINI.trim() !== '') {
            this.lblA1769FINI = Ext.util.Format.date(data.A1769FINI, 'Ymd');
        }
        if (data.A1769FFIN === '9999/99/99') {
            this.lblA1769FFIN = '99999999';
        } else if (data.A1769FFIN.trim() !== '') {
            this.lblA1769FFIN = Ext.util.Format.date(data.A1769FFIN, 'Ymd');
        }



        console.log("-->lblA1769FINI" + this.lblA1769FINI);
        console.log("-->lblA1769FFIN" + this.lblA1769FFIN);


    },
    getDataEntryValues: function(strOption) {


        var A1769CCUST = '139';
        var A1769CATEG = Ext.getCmp(prototype.id + '-txtA1769CATEG').getValue();
        var A1769CODIG = Ext.getCmp(prototype.id + '-txtA1769CODIG').getValue();
        var A1769VALOR = Ext.getCmp(prototype.id + '-txtA1769VALOR').getValue();
        var A1769DESC = Ext.getCmp(prototype.id + '-txtA1769DESC').getValue();
        var A1769FINI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtStartDate').getValue(), 'Ymd');
        var A1769FFIN = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtEndDate').getValue(), 'Ymd');
        var IN_A1769CATEG_OLD = this.lblA1769CATEG;
        var IN_A1769CODIG_OLD = this.lblA1769CODIG;
        var IN_A1769FINI_OLD = this.lblA1769FINI;
        var IN_A1769FFIN_OLD = this.lblA1769FFIN;

        if (A1769FFIN === '') {
            A1769FFIN = '99999999';
        }


        return {
            strOption: strOption,
            A1769CCUST: A1769CCUST,
            A1769CATEG: A1769CATEG,
            A1769CODIG: A1769CODIG,
            A1769VALOR: A1769VALOR,
            A1769DESC: A1769DESC,
            A1769FINI: A1769FINI,
            A1769FFIN: A1769FFIN,
            IN_A1769CATEG_OLD: IN_A1769CATEG_OLD,
            IN_A1769CODIG_OLD: IN_A1769CODIG_OLD,
            IN_A1769FINI_OLD: IN_A1769FINI_OLD,
            IN_A1769FFIN_OLD: IN_A1769FFIN_OLD

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
                        if (!msg === 'RECORD EXISTS') {
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        }

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
        var txtA1769CATEG = Ext.getCmp(prototype.id + '-txtA1769CATEG').getValue();
        var txtA1769CODIG = Ext.getCmp(prototype.id + '-txtA1769CODIG').getValue();
        var txtA1769VALOR = Ext.getCmp(prototype.id + '-txtA1769VALOR').getValue();

        if (txtA1769CATEG === '' || txtA1769CODIG === '' || txtA1769VALOR === '') {
            mensaje = 'Insert fields required.';
        }
        return mensaje;
    },
    onCancelClick: function(btn){
        this.view.close();
    }

});




