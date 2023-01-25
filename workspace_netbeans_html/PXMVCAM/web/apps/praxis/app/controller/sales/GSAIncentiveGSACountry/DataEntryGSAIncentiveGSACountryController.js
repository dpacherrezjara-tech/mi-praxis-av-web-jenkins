/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.GSAIncentiveGSACountry.DataEntryGSAIncentiveGSACountryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/GSAIncentiveGSACountry',
    lblPreffixOld: '',
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
//                Ext.getCmp(prototype.id + '-btn-update').show();
//                Ext.getCmp(prototype.id + '-btn-delete').show();
                break;
        }


    },
    getDataInputs: function() {

        var p = this.view.params;
        var data = p.rec.data;
        Ext.getCmp(prototype.id + '-txtGSA').setValue(data.A1839GSA.trim());
        Ext.getCmp(prototype.id + '-txtArea').setValue(data.A1839AREA.trim());
        Ext.getCmp(prototype.id + '-txtCountry').setValue(data.A1839PAIS.trim());
        Ext.getCmp(prototype.id + '-txtDescription').setValue(data.A1839DPAIS.trim());
        Ext.getCmp(prototype.id + '-txtCountryIATA').setValue(data.A1839IATA.trim());
        Ext.getCmp(prototype.id + '-txtLocalCurrency').setValue(data.A1839MLOC.trim());
        Ext.getCmp(prototype.id + '-txtPaymentCurrency').setValue(data.A1839MPAG.trim());
        Ext.getCmp(prototype.id + '-txtRazonSocial').setValue(data.A1839RSOC.trim());
        Ext.getCmp(prototype.id + '-txtContact').setValue(data.A1839CONT.trim());
        Ext.getCmp(prototype.id + '-txtEmail').setValue(data.A1839EMAIL.trim());
    }
//    getDataEntryValues: function(strOption) {
//
//        var OPCION = strOption;
//        var A2448CCUST = '139';
//        var A2448IATA = Ext.getCmp(prototype.id + '-TXT_A1874IATA').getValue();
//        var A2448CODEA = Ext.getCmp(prototype.id + '-TXT_A1874CODEA').getValue();
//        var A2448DESCR = Ext.getCmp(prototype.id + '-TXT_A1874DESCR').getValue();
//        var A2448FORMA = Ext.getCmp(prototype.id + '-TXT_A1874FORMA').getValue();
//        var A2448TRNCU = Ext.getCmp(prototype.id + '-TXT_A2448TRNCU').getValue();
//        var A2448CLASX = Ext.getCmp(prototype.id + '-TXT_A1874CLASX').getValue();
//        var A2448CODEX = Ext.getCmp(prototype.id + '-TXT_A1874CODEX').getValue();
//        var A2448SCODX = Ext.getCmp(prototype.id + '-TXT_A1874SCODX').getValue();
//        var A2448IATAX = Ext.getCmp(prototype.id + '-TXT_A2448IATAX').getValue();
//        var A2448MCARR = Ext.getCmp(prototype.id + '-TXT_A1874MCARR').getValue();
//        var A2448TPASS = Ext.getCmp(prototype.id + '-TXT_A1874TPASS').getValue();
//        var A2448ACODE = Ext.getCmp(prototype.id + '-TXT_A1874ACODE').getValue();
//        var A2448TOUR = Ext.getCmp(prototype.id + '-TXT_A1874TOUR').getValue();
//        var A2448FBASI = Ext.getCmp(prototype.id + '-TXT_A1874FBASI').getValue();
//        var A2448TDESI = Ext.getCmp(prototype.id + '-TXT_A1874FBASI').getValue();
//        var A2448CLASS = Ext.getCmp(prototype.id + '-TXT_A1874CLASS').getValue();
//        var A2448CODE = Ext.getCmp(prototype.id + '-TXT_A1874CODE').getValue();
//        var A2448SCODE = Ext.getCmp(prototype.id + '-TXT_A1874SCODE').getValue();
//        var A2448MOPAY = Ext.getCmp(prototype.id + '-TXT_A1874MOPAY').getValue();
//        var A2448ANCIL = Ext.getCmp(prototype.id + '-TXT_A1874ANCIL').getValue();
//        var A2448COMM = Ext.Number.parseInt(Ext.getCmp(prototype.id + '-TXT_A1874COMM').getValue().replace('.', ''));
//        var A2448FINIV = Ext.util.Format.date(Ext.getCmp(prototype.id + '-TXT_A1874FINIV').getValue(), 'Ymd');
//        var A2448FFINV = Ext.util.Format.date(Ext.getCmp(prototype.id + '-TXT_A1874FFINV').getValue(), 'Ymd');
//
//
//        return {
//            OPCION: OPCION,
//            A2448CCUST: A2448CCUST,
//            A2448IATA: A2448IATA,
//            A2448CODEA: A2448CODEA,
//            A2448DESCR: A2448DESCR,
//            A2448FORMA: A2448FORMA,
//            A2448TRNCU: A2448TRNCU,
//            A2448CLASX: A2448CLASX,
//            A2448CODEX: A2448CODEX,
//            A2448SCODX: A2448SCODX,
//            A2448IATAX: A2448IATAX,
//            A2448MCARR: A2448MCARR,
//            A2448TPASS: A2448TPASS,
//            A2448ACODE: A2448ACODE,
//            A2448TOUR: A2448TOUR,
//            A2448FBASI: A2448FBASI,
//            A2448TDESI: A2448TDESI,
//            A2448CLASS: A2448CLASS,
//            A2448CODE: A2448CODE,
//            A2448SCODE: A2448SCODE,
//            A2448MOPAY: A2448MOPAY,
//            A2448ANCIL: A2448ANCIL,
//            A2448COMM: A2448COMM,
//            A2448FINIV: A2448FINIV,
//            A2448FFINV: A2448FFINV
//        };
//    },
//    onSaveClick: function(btn) {
//        var p = this.view.params;
//        var strOption = p.action;
//        var params = this.getDataEntryValues(strOption);
//        var strMsg = this.validateForm(params);
//
//        if (strMsg.trim() !== '') {
//            global.Msg({
//                msg: strMsg
//            });
//        }
//        else {
//            Ext.Msg.show({
//                title: '.:PRAXIS:.',
//                msg: 'Are you sure to insert?',
//                buttons: Ext.MessageBox.YESNO,
//                scope: this,
//                icon: Ext.MessageBox.QUESTION,
//                modal: true,
//                fn: function(btn) {
//                    if (btn === 'yes') {
//                        this.view.params.action = "I";
//                        this.crud();
//                    }
//                }
//            });
//        }
//    },
//    crud: function() {
//        var p = this.view.params;
//        var strOption = p.action;
//
//        Ext.Ajax.request({
//            url: this.url + '/mantenimiento',
//            method: 'POST',
//            timeout: 60000000,
//            params: this.getDataEntryValues(strOption),
//            beforerequest: Ext.getCmp(prototype.id + '-DataEntryPercentCommissionForm').mask('Loading...', ''),
//            success: function(response, options) {
//                var res = Ext.JSON.decode(response.responseText);
//                var objRtn = res.objRtn;
//                console.log(objRtn);
//                Ext.getCmp(prototype.id + '-DataEntryPercentCommissionForm').unmask('Loading...', '');
//                global.Msg({
//                    msg: objRtn.dbException.MESSAGE,
//                    icon: 1,
//                    fn: function() {
//                        //exito
//                        Ext.getCmp(prototype.id + '-DataEntryPercentCommissionForm').close();
//                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
//                    }
//                });
//            }
//        });
//    },
//    onUpdateClick: function(btn) {
//
//
//        var p = this.view.params;
//        var strOption = p.action;
//        var params = this.getDataEntryValues(strOption);
//        var strMsg = this.validateForm(params);
//
//        if (strMsg.trim() !== '') {
//            global.Msg({
//                msg: strMsg
//            });
//        }
//        else {
//            Ext.Msg.show({
//                title: '.:PRAXIS:.',
//                msg: 'Are you sure to update ?',
//                scope: this,
//                buttons: Ext.MessageBox.YESNO,
//                icon: Ext.MessageBox.QUESTION,
//                modal: true,
//                fn: function(btn) {
//                    if (btn === 'yes') {
//                        this.view.params.action = "U";
//                        this.crud();
//                    }
//                }
//            });
//        }
//    },
//    onDeleteClick: function(btn) {
//
//        Ext.Msg.show({
//            title: '.:PRAXIS:.',
//            msg: 'Are you sure to delete ?',
//            buttons: Ext.MessageBox.YESNO,
//            scope: this,
//            icon: Ext.MessageBox.QUESTION,
//            modal: true,
//            fn: function(btn) {
//                if (btn === 'yes') {
//                    this.view.params.action = "D";
//
//                    this.crud();
//                }
//            }
//        });
//    },
//    get_ValidaCodeIATA: function() {
//        var iata = Ext.getCmp(prototype.id + '-TXT_A1874IATA').getValue();
//        if (iata !== '') {
//            Ext.Ajax.request({
//                url: this.url + '/validarCodigoIATA',
//                method: 'POST',
//                timeout: 60000000,
//                beforerequest: Ext.getCmp(prototype.id + '-DataEntryPercentCommissionForm').mask('Loading...', ''),
//                params: {
//                    VP_OPTION: 'A',
//                    VP_PARAM: iata
//                },
//                success: function(response, options) {
//                    var res = Ext.JSON.decode(response.responseText);
//                    var result = res.result;
//                    Ext.getCmp(prototype.id + '-DataEntryPercentCommissionForm').unmask('Loading...', '');
//                    if (result === '') {
//                        global.Msg({
//                            msg: 'IATA Code Not Found'
//                        });
//                    } else {
//                        Ext.getCmp(prototype.id + '-TXT_A1874IATA_DES').setValue(result);
//                    }
//                }
//            });
//        }
//
//    },
//    onUpperValue: function(field, newValue, oldValue) {
//        field.setValue(newValue.toUpperCase());
//    },
//    validateForm: function(params) {
//
//        var mensaje = "";
//        if (params.OPCION === 'I') {
//            if (params.A2448CODEA === '') {
//                mensaje = 'Required Field, Agreement Code';
//                Ext.getCmp(prototype.id + '-TXT_A1874CODEA').focus();
//                return mensaje;
//            }
//            if (params.A2448IATA === '') {
//                mensaje = 'Required Field, IATA Code';
//                Ext.getCmp(prototype.id + '-TXT_A1874IATA').focus();
//                return mensaje;
//            }
//            if (params.A2448FORMA === '') {
//                mensaje = 'Required Field, Emission Form ';
//                Ext.getCmp(prototype.id + '-TXT_A1874FORMA').focus();
//                return mensaje;
//            }
//            if (params.A2448FINIV === '') {
//                mensaje = 'Required Field, Validity date';
//                Ext.getCmp(prototype.id + '-TXT_A1874FINIV').focus();
//                return mensaje;
//            }
//            if (params.A2448FFINV === '') {
//                mensaje = 'Required Field, Validity date ';
//                Ext.getCmp(prototype.id + '-TXT_A1874FFINV').focus();
//                return mensaje;
//            }
//        } else {
//            if (params.A2448FINIV === '') {
//                mensaje = 'Required Field, Validity date  ';
//                Ext.getCmp(prototype.id + '-TXT_A1874FINIV').focus();
//                return mensaje;
//            }
//            if (params.A2448FFINV === '') {
//                mensaje = 'Required Field, Validity date  ';
//                Ext.getCmp(prototype.id + '-TXT_A1874FFINV').focus();
//                return mensaje;
//            }
//        }
//
//        return mensaje;
//
//    }
//
    ,
    onCancelClick: function(btn) {
        this.view.close();
    },
});


