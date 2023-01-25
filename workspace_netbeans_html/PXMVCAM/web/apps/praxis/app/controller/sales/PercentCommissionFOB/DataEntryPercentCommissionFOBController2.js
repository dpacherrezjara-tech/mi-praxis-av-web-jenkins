/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.PercentCommissionFOB.DataEntryPercentCommissionFOBController2', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController2',
    url: CONTEXTPATH + '/PercentCommissionFOB',
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
                Ext.getCmp(prototype.id + '-btn-delete2').hide();
                Ext.getCmp(prototype.id + '-btn-update2').hide();
                Ext.getCmp(prototype.id + '-btn-save2').show();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-save2').hide();
                Ext.getCmp(prototype.id + '-btn-update2').show();
                Ext.getCmp(prototype.id + '-btn-delete2').show();
                break;
        }


    },
    getDataInputs: function() {

        var p = this.view.params;
        var data = p.rec.data;
        console.log(data);

        Ext.getCmp(prototype.id + '-TXT_A1874CODEA').setValue(data.A1874CODEA.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874IATA').setValue(data.A1874IATA.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874IATA_DES').setValue(data.A003KEY3.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874DESCR').setValue(data.A1874DESCR.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874FORMA').setValue(data.A1874FORMA.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874CLASX').setValue(data.A1874CLASX.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874CODEX').setValue(data.A1874CODEX.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874SCODX').setValue(data.A1874SCODX.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874MCARR').setValue(data.A1874MCARR.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874TPASS').setValue(data.A1874TPASS.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874ACODE').setValue(data.A1874ACODE.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874TOUR').setValue(data.A1874TOUR.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874FBASI').setValue(data.A1874FBASI.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874CLASS').setValue(data.A1874CLASS.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874CODE').setValue(data.A1874CODE.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874SCODE').setValue(data.A1874SCODE.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874MOPAY').setValue(data.A1874MOPAY.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874ANCIL').setValue(data.A1874ANCIL.trim());
        Ext.getCmp(prototype.id + '-TXT_A1874COMM').setValue(Ext.util.Format.number(data.A1874COMM, '0,000.00'));
        Ext.getCmp(prototype.id + '-TXT_A1874FINIV').setValue(data.A1874FINIV.substr(0, 4) + '/' + data.A1874FINIV.substr(4, 2) + '/' + data.A1874FINIV.substr(6, 2));
        Ext.getCmp(prototype.id + '-TXT_A1874FFINV').setValue(data.A1874FFINV.substr(0, 4) + '/' + data.A1874FFINV.substr(4, 2) + '/' + data.A1874FFINV.substr(6, 2));

    },
    getDataEntryValues: function(strOption) {

        var OPCION = strOption;
        var A1874CCUST = '139';
        var A1874IATA = Ext.getCmp(prototype.id + '-TXT_A1874IATA').getValue();
        var A1874CODEA = Ext.getCmp(prototype.id + '-TXT_A1874CODEA').getValue();
        var A1874DESCR = Ext.getCmp(prototype.id + '-TXT_A1874DESCR').getValue();
        var A1874FORMA = Ext.getCmp(prototype.id + '-TXT_A1874FORMA').getValue();
        var A1874CLASX = Ext.getCmp(prototype.id + '-TXT_A1874CLASX').getValue();
        var A1874CODEX = Ext.getCmp(prototype.id + '-TXT_A1874CODEX').getValue();
        var A1874SCODX = Ext.getCmp(prototype.id + '-TXT_A1874SCODX').getValue();
        var A1874MCARR = Ext.getCmp(prototype.id + '-TXT_A1874MCARR').getValue();
        var A1874TPASS = Ext.getCmp(prototype.id + '-TXT_A1874TPASS').getValue();
        var A1874ACODE = Ext.getCmp(prototype.id + '-TXT_A1874ACODE').getValue();
        var A1874TOUR = Ext.getCmp(prototype.id + '-TXT_A1874TOUR').getValue();
        var A1874FBASI = Ext.getCmp(prototype.id + '-TXT_A1874FBASI').getValue();
        var A1874TDESI = Ext.getCmp(prototype.id + '-TXT_A1874FBASI').getValue();
        var A1874CLASS = Ext.getCmp(prototype.id + '-TXT_A1874CLASS').getValue();
        var A1874CODE = Ext.getCmp(prototype.id + '-TXT_A1874CODE').getValue();
        var A1874SCODE = Ext.getCmp(prototype.id + '-TXT_A1874SCODE').getValue();
        var A1874MOPAY = Ext.getCmp(prototype.id + '-TXT_A1874MOPAY').getValue();
        var A1874ANCIL = Ext.getCmp(prototype.id + '-TXT_A1874ANCIL').getValue();
//        var A1874COMM = Ext.Number.parseInt(Ext.getCmp(prototype.id + '-TXT_A1874COMM').getValue().replace(',', ''));
        var A1874COMM = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-TXT_A1874COMM').getValue().replace(",", ""));
        var A1874FINIV = Ext.util.Format.date(Ext.getCmp(prototype.id + '-TXT_A1874FINIV').getValue(), 'Ymd');
        var A1874FFINV = Ext.util.Format.date(Ext.getCmp(prototype.id + '-TXT_A1874FFINV').getValue(), 'Ymd');


        return {
            OPCION: OPCION,
            A1874CCUST: A1874CCUST,
            A1874IATA: A1874IATA,
            A1874CODEA: A1874CODEA,
            A1874DESCR: A1874DESCR,
            A1874FORMA: A1874FORMA,
            A1874CLASX: A1874CLASX,
            A1874CODEX: A1874CODEX,
            A1874SCODX: A1874SCODX,
            A1874MCARR: A1874MCARR,
            A1874TPASS: A1874TPASS,
            A1874ACODE: A1874ACODE,
            A1874TOUR: A1874TOUR,
            A1874FBASI: A1874FBASI,
           // A1874TDESI: A1874TDESI,
            A1874CLASS: A1874CLASS,
            A1874CODE: A1874CODE,
            A1874SCODE: A1874SCODE,
            A1874MOPAY: A1874MOPAY,
            A1874ANCIL: A1874ANCIL,
            A1874COMM: A1874COMM,
            A1874FINIV: A1874FINIV,
            A1874FFINV: A1874FFINV
        };
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);

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

        Ext.Ajax.request({
            url: this.url + '/mantenimiento2',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            beforerequest: Ext.getCmp(prototype.id + '-DataEntryPercentCommissionFOBForm2').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
//                console.log(objRtn);
                Ext.getCmp(prototype.id + '-DataEntryPercentCommissionFOBForm2').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: 1,
                    fn: function() {
                        //exito
                        Ext.getCmp(prototype.id + '-DataEntryPercentCommissionFOBForm2').close();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    onUpdateClick: function(btn) {


        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);

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
    get_ValidaCodeIATA: function() {
        var iata = Ext.getCmp(prototype.id + '-TXT_A1874IATA').getValue();
        if (iata !== '') {
            Ext.Ajax.request({
                url: this.url + '/validarCodigoIATA',
                method: 'POST',
                timeout: 60000000,
                beforerequest: Ext.getCmp(prototype.id + '-DataEntryPercentCommissionFOBForm2').mask('Loading...', ''),
                params: {
                    VP_OPTION: 'A',
                    VP_PARAM: iata
                },
                success: function(response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var result = res.result;
                    Ext.getCmp(prototype.id + '-DataEntryPercentCommissionFOBForm2').unmask('Loading...', '');
                    if (result === '') {
                        global.Msg({
                            msg: 'IATA Code Not Found'
                        });
                    } else {
                        Ext.getCmp(prototype.id + '-TXT_A1874IATA_DES').setValue(result);
                    }
                }
            });
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    validateForm: function(params) {

        var mensaje = "";
        if (params.OPCION === 'I') {
            if (params.A1874CODEA === '') {
                mensaje = 'Required Field, Agreement Code';
                Ext.getCmp(prototype.id + '-TXT_A1874CODEA').focus();
                return mensaje;
            }
            if (params.A1874IATA === '') {
                mensaje = 'Required Field, IATA Code';
                Ext.getCmp(prototype.id + '-TXT_A1874IATA').focus();
                return mensaje;
            }
            if (params.A1874FORMA === '') {
                mensaje = 'Required Field, Emission Form ';
                Ext.getCmp(prototype.id + '-TXT_A1874FORMA').focus();
                return mensaje;
            }
            if (params.A1874FINIV === '') {
                mensaje = 'Required Field, Validity date';
                Ext.getCmp(prototype.id + '-TXT_A1874FINIV').focus();
                return mensaje;
            }
            if (params.A1874FFINV === '') {
                mensaje = 'Required Field, Validity date ';
                Ext.getCmp(prototype.id + '-TXT_A1874FFINV').focus();
                return mensaje;
            }
        } else {
            if (params.A1874FINIV === '') {
                mensaje = 'Required Field, Validity date  ';
                Ext.getCmp(prototype.id + '-TXT_A1874FINIV').focus();
                return mensaje;
            }
            if (params.A1874FFINV === '') {
                mensaje = 'Required Field, Validity date  ';
                Ext.getCmp(prototype.id + '-TXT_A1874FFINV').focus();
                return mensaje;
            }
        }

        return mensaje;

    },
    onCancelClick: function() {
        Ext.getCmp(prototype.id + '-DataEntryPercentCommissionFOBForm2').close();
    }

});


