/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.AccountingSupplier.DataEntryAccountingSupplierController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/AccountingSupplier',
    lblA1806TIPO: '',
    lblA1806PROVE: '',
    lblA1806NUM: '',
    storeCiudades: {},
    storePaises: {},
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
                ["", "-Select-"],
                ["03", "CONNECT"],
                ["06", "FRANCHISE OPERATOR"],
                ["08", "SISTEM"],
                ["09", "CARGO"],
                ["37", "CENTRO DE SERVICIOS COMPARTIDOS"]

            ]
        }));
        cbxType.setValue("");
    },
    getDataInputs: function() {
        var p = this.view.params;
        var data = p.rec.data;



        Ext.getCmp(prototype.id + '-cbxType').setValue(data.A1806TIPOC);

        Ext.getCmp(prototype.id + '-txtA1806PROVE').setValue(data.A1806PROVE);
        Ext.getCmp(prototype.id + '-txtA1806NUM').setValue(data.A1806NUM);
        Ext.getCmp(prototype.id + '-txtA1806REFE').setValue(data.A1806REFE);
        Ext.getCmp(prototype.id + '-txtA1806CIA').setValue(data.A1806CIA);
        Ext.getCmp(prototype.id + '-txtA1806UNIDA').setValue(data.A1806UNIDA);
        Ext.getCmp(prototype.id + '-txtA1806CENCO').setValue(data.A1806CENCO);
        Ext.getCmp(prototype.id + '-txtA1806UBICA').setValue(data.A1806UBICA);
        Ext.getCmp(prototype.id + '-txtA1806CUENT').setValue(data.A1806CUENT);
        Ext.getCmp(prototype.id + '-txtA1806SUBCT').setValue(data.A1806SUBCT);
        Ext.getCmp(prototype.id + '-txtA1806EQUI').setValue(data.txtA1806EQUI);
        Ext.getCmp(prototype.id + '-txtA1806INCIA').setValue(data.txtA1806INCIA);


        Ext.getCmp(prototype.id + '-txtUSCR').setValue(data.A1806REGIS);
        Ext.getCmp(prototype.id + '-txtFECR').setValue(data.A1806SUBCT);
        Ext.getCmp(prototype.id + '-txtHOCR').setValue(data.A1806HREGI);
        Ext.getCmp(prototype.id + '-txtUSUP').setValue(data.A1806REGVI);
        Ext.getCmp(prototype.id + '-txtFEUP').setValue(data.A1806FREVI);
        Ext.getCmp(prototype.id + '-txtHOUP').setValue(data.A1806HREVI);


        Ext.getCmp(prototype.id + '-txtStartDate').setValue(data.A1806FINI);

        Ext.getCmp(prototype.id + '-txtEndDate').setValue(data.A1806FFIN);





//	txtStartDate.text = app.trim(beanDTY.A1806FINI)=='9999/99/99' ? '' : app.trim(beanDTY.A1806FINI);// app.trim(bean.A1806FINI);
//	txtEndDate.text = app.trim(beanDTY.A1806FFIN)=='9999/99/99' ? '' : app.trim(beanDTY.A1806FFIN);
        this.lblA1806TIPO = data.A1806TIPOC;
        this.lblA1806PROVE = data.A1806PROVE;
        this.lblA1806NUM = data.A1806NUM;





    },
    getDataEntryValues: function(strOption) {


        var A1806CCUST = '139';
        var A1806TIPOC = Ext.getCmp(prototype.id + '-cbxType').getValue().trim();
        var A1806PROVE = Ext.getCmp(prototype.id + '-txtA1806PROVE').getValue().trim();
        var A1806NUM = Ext.getCmp(prototype.id + '-txtA1806NUM').getValue().trim();
        var A1806REFE = Ext.getCmp(prototype.id + '-txtA1806REFE').getValue().trim();

        var A1806CIA = Ext.getCmp(prototype.id + '-txtA1806CIA').getValue().trim();
        var A1806UNIDA = Ext.getCmp(prototype.id + '-txtA1806UNIDA').getValue().trim();
        var A1806CENCO = Ext.getCmp(prototype.id + '-txtA1806CENCO').getValue().trim();
        var A1806UBICA = Ext.getCmp(prototype.id + '-txtA1806UBICA').getValue().trim();
        var A1806CUENT = Ext.getCmp(prototype.id + '-txtA1806CUENT').getValue().trim();
        var A1806SUBCT = Ext.getCmp(prototype.id + '-txtA1806SUBCT').getValue().trim();
        var A1806EQUI = Ext.getCmp(prototype.id + '-txtA1806EQUI').getValue().trim();
        var A1806INCIA = Ext.getCmp(prototype.id + '-txtA1806INCIA').getValue().trim();


        var A1806FINI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtStartDate').getValue(), 'Ymd').trim();
        var A1806FFIN = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtEndDate').getValue(), 'Ymd').trim();
        var IN_A1806TIPOC_OLD = this.lblA1806TIPO.trim();
        var IN_A1806NUM_OLD = this.lblA1806NUM.trim();

        if (A1806FINI === '') {
            A1806FINI = '99999999';
        }
        if (A1806FFIN === '') {
            A1806FFIN = '99999999';
        }


        return {
            strOption: strOption,
            A1806CCUST: A1806CCUST,
            A1806TIPOC: A1806TIPOC,
            A1806PROVE: A1806PROVE,
            A1806NUM: A1806NUM,
            A1806REFE: A1806REFE,
            A1806CIA: A1806CIA,
            A1806UNIDA: A1806UNIDA,
            A1806CENCO: A1806CENCO,
            A1806UBICA: A1806UBICA,
            A1806CUENT: A1806CUENT,
            A1806SUBCT: A1806SUBCT,
            A1806EQUI: A1806EQUI,
            A1806INCIA: A1806INCIA,
            A1806FINI: A1806FINI,
            A1806FFIN: A1806FFIN,
            IN_A1806TIPOC_OLD: IN_A1806TIPOC_OLD,
            IN_A1806NUM_OLD: IN_A1806NUM_OLD

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
                    msg:msg,
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
        var cmbType = Ext.getCmp(prototype.id + '-cbxType').getValue();
        if (cmbType === '') {
            mensaje = 'Insert fields required.';
        }
        return mensaje;

    },
    onCancelClick: function(btn){
        this.view.close();
    }



});


