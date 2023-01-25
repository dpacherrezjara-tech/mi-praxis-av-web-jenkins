/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.PercentCommissionFOB.DataEntryPercentCommissionFOBController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
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


    },
    getDataInputs: function() {

        var p = this.view.params;
        var data = p.rec.data;

        Ext.getCmp(prototype.id + '-TXT_A1742CODEA').setValue(data.A1742CODEA.trim());
        Ext.getCmp(prototype.id + '-TXT_A1742DESCR').setValue(data.A1742DESCR.trim());
        Ext.getCmp(prototype.id + '-TXT_A1742FORMA').setValue(data.A1742FORMA.trim());
        Ext.getCmp(prototype.id + '-TXT_A1742CLASX').setValue(data.A1742CLASX.trim());
        Ext.getCmp(prototype.id + '-TXT_A1742CODEX').setValue(data.A1742CODEX.trim());
        Ext.getCmp(prototype.id + '-TXT_A1742SCODX').setValue(data.A1742SCODX.trim());
        Ext.getCmp(prototype.id + '-TXT_A1742MCARR').setValue(data.A1742MCARR.trim());
        Ext.getCmp(prototype.id + '-TXT_A1742TPASS').setValue(data.A1742TPASS.trim());
        Ext.getCmp(prototype.id + '-TXT_A1742ACODE').setValue(data.A1742ACODE.trim());
        Ext.getCmp(prototype.id + '-TXT_A1742TOUR').setValue(data.A1742TOUR.trim());
        Ext.getCmp(prototype.id + '-TXT_A1742FBASI').setValue(data.A1742FBASI.trim());
        Ext.getCmp(prototype.id + '-TXT_A1742CLASS').setValue(data.A1742CLASS.trim());
        Ext.getCmp(prototype.id + '-TXT_A1742CODE').setValue(data.A1742CODE.trim());
        Ext.getCmp(prototype.id + '-TXT_A1742SCODE').setValue(data.A1742SCODE.trim());
        Ext.getCmp(prototype.id + '-TXT_A1742MOPAY').setValue(data.A1742MOPAY.trim());
        Ext.getCmp(prototype.id + '-TXT_A1742ANCIL').setValue(data.A1742ANCIL.trim());
        Ext.getCmp(prototype.id + '-TXT_A1742COMM').setValue(Ext.util.Format.number(data.A1742COMM, '0,000.00'));
        Ext.getCmp(prototype.id + '-TXT_A1742FINIV').setValue(data.A1742FINIV.substr(0, 4) + '/' + data.A1742FINIV.substr(4, 2) + '/' + data.A1742FINIV.substr(6, 2));
        Ext.getCmp(prototype.id + '-TXT_A1742FFINV').setValue(data.A1742FFINV.substr(0, 4) + '/' + data.A1742FINIV.substr(4, 2) + '/' + data.A1742FFINV.substr(6, 2));

    },
    getDataEntryValues: function(strOption) {

        var OPCION = strOption;
        var A1742CCUST = '139';

        var A1742CODEA = Ext.getCmp(prototype.id + '-TXT_A1742CODEA').getValue();
        var A1742DESCR = Ext.getCmp(prototype.id + '-TXT_A1742DESCR').getValue();
        var A1742FORMA = Ext.getCmp(prototype.id + '-TXT_A1742FORMA').getValue();
        var A1742CLASX = Ext.getCmp(prototype.id + '-TXT_A1742CLASX').getValue();
        var A1742CODEX = Ext.getCmp(prototype.id + '-TXT_A1742CODEX').getValue();
        var A1742SCODX = Ext.getCmp(prototype.id + '-TXT_A1742SCODX').getValue();
        var A1742MCARR = Ext.getCmp(prototype.id + '-TXT_A1742MCARR').getValue();
        var A1742TPASS = Ext.getCmp(prototype.id + '-TXT_A1742TPASS').getValue();
        var A1742ACODE = Ext.getCmp(prototype.id + '-TXT_A1742ACODE').getValue();
        var A1742TOUR = Ext.getCmp(prototype.id + '-TXT_A1742TOUR').getValue();
        var A1742FBASI = Ext.getCmp(prototype.id + '-TXT_A1742FBASI').getValue();
        var A1742CLASS = Ext.getCmp(prototype.id + '-TXT_A1742CLASS').getValue();
        var A1742CODE = Ext.getCmp(prototype.id + '-TXT_A1742CODE').getValue();
        var A1742SCODE = Ext.getCmp(prototype.id + '-TXT_A1742SCODE').getValue();
        var A1742MOPAY = Ext.getCmp(prototype.id + '-TXT_A1742MOPAY').getValue();
        var A1742ANCIL = Ext.getCmp(prototype.id + '-TXT_A1742ANCIL').getValue();
//        var A1742COMM = Ext.Number.parseInt(Ext.getCmp(prototype.id + '-TXT_A1742COMM').getValue().replace(',', ''));
        var A1742COMM = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-TXT_A1742COMM').getValue().replace(",", ""));
        var A1742FINIV = Ext.util.Format.date(Ext.getCmp(prototype.id + '-TXT_A1742FINIV').getValue(), 'Ymd');
        var A1742FFINV = Ext.util.Format.date(Ext.getCmp(prototype.id + '-TXT_A1742FFINV').getValue(), 'Ymd');


        return {
            OPCION: OPCION,
            A1742CCUST: A1742CCUST,
            A1742CODEA: A1742CODEA,
            A1742DESCR: A1742DESCR,
            A1742FORMA: A1742FORMA,
            A1742CLASX: A1742CLASX,
            A1742CODEX: A1742CODEX,
            A1742SCODX: A1742SCODX,
            A1742MCARR: A1742MCARR,
            A1742TPASS: A1742TPASS,
            A1742ACODE: A1742ACODE,
            A1742TOUR: A1742TOUR,
            A1742FBASI: A1742FBASI,
            A1742CLASS: A1742CLASS,
            A1742CODE: A1742CODE,
            A1742SCODE: A1742SCODE,
            A1742MOPAY: A1742MOPAY,
            A1742ANCIL: A1742ANCIL,
            A1742COMM: A1742COMM,
            A1742FINIV: A1742FINIV,
            A1742FFINV: A1742FFINV
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
            url: this.url + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            beforerequest: Ext.getCmp(prototype.id + '-DataEntryPercentCommissionFOBForm').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                console.log(objRtn);
                Ext.getCmp(prototype.id + '-DataEntryPercentCommissionFOBForm').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: 1,
                    fn: function() {
                        //exito
                        Ext.getCmp(prototype.id + '-DataEntryPercentCommissionFOBForm').close();
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
        var iata = Ext.getCmp(prototype.id + '-TXT_AA1742IATA').getValue();
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
                        Ext.getCmp(prototype.id + '-TXT_AA1742IATA_DES').setValue(result);
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
            if (params.AA1742CODEA === '') {
                mensaje = 'Required Field, Agreement Code';
                Ext.getCmp(prototype.id + '-TXT_AA1742CODEA').focus();
                return mensaje;
            }
            if (params.AA1742FORMA === '') {
                mensaje = 'Required Field, Emission Form ';
                Ext.getCmp(prototype.id + '-TXT_AA1742FORMA').focus();
                return mensaje;
            }
            if (params.AA1742FINIV === '') {
                mensaje = 'Required Field, Validity date';
                Ext.getCmp(prototype.id + '-TXT_AA1742FINIV').focus();
                return mensaje;
            }
            if (params.AA1742FFINV === '') {
                mensaje = 'Required Field, Validity date ';
                Ext.getCmp(prototype.id + '-TXT_AA1742FFINV').focus();
                return mensaje;
            }
        } else {
            if (params.AA1742FINIV === '') {
                mensaje = 'Required Field, Validity date  ';
                Ext.getCmp(prototype.id + '-TXT_AA1742FINIV').focus();
                return mensaje;
            }
            if (params.AA1742FFINV === '') {
                mensaje = 'Required Field, Validity date  ';
                Ext.getCmp(prototype.id + '-TXT_AA1742FFINV').focus();
                return mensaje;
            }
        }

        return mensaje;

    },
    onCancelClick: function() {
        Ext.getCmp(prototype.id + '-DataEntryPercentCommissionFOBForm').close();
    }

});


