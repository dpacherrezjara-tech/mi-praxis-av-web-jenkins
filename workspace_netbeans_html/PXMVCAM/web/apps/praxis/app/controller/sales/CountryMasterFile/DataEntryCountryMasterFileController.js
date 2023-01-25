/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : CountryMasterFileController                       *                          
 * Created on : 07/03/2018, 15:56:15                              *               
 * Author     : Gregory Sánchez (gsanchez)                        *           
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 20-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

Ext.define('Ext.Praxis.controller.sales.CountryMasterFile.DataEntryCountryMasterFileController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCountryMasterFileController',

    init: function(view){
    },
    afterRender: function(){
        this.p = this.view.params;
        switch( this.p.action ){
            case 'U':
                this.getDataInputs(this.p.rec);
                Ext.getCmp(prototype.id + '-txtA006PAIS').setReadOnly(true);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').show();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                Ext.getCmp(prototype.id + '-txtNameCountry').focus();
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                Ext.getCmp(prototype.id + '-txtA006PAIS').setReadOnly(false);
                Ext.getCmp(prototype.id + '-txtA006PAIS').focus();
                break;
        }
        switch (this.p.selectedValue) {
            case 'CU':
                Ext.getCmp(prototype.id+'-pnlAlpha').setHeight(0);
                Ext.getCmp(prototype.id + '-txtA006NOMMONEDA').maxLength = 21;
                Ext.getCmp(prototype.id + '-lblCodNum').setWidth(120);
                Ext.getCmp(prototype.id + '-valCurrencyNum').show();
                break;
            default:
                Ext.getCmp(prototype.id+'-pnlAlpha').setHeight(25);
                Ext.getCmp(prototype.id + '-txtA006NOMMONEDA').maxLength = 17;
                Ext.getCmp(prototype.id + '-lblCodNum').setWidth(140);
                Ext.getCmp(prototype.id + '-valCurrencyNum').hide();
                break;
        }
        global.AccessControlMaganer();
    },
    getDataInputs: function(rec) {

        Ext.getCmp(prototype.id + '-txtA006PAIS').setValue(rec.get('A006KEY'));
        Ext.getCmp(prototype.id + '-txtNameCountry').setValue(rec.get('A006KEY1'));
        Ext.getCmp(prototype.id + '-txtA006MONEDA').setValue(rec.get('CODMONEDANUM'));
        Ext.getCmp(prototype.id + '-txtA006CODMONEDAALPHA').setValue(rec.get('CODMONEDAALPHA'));
        Ext.getCmp(prototype.id + '-txtA006NOMMONEDA').setValue(rec.get('NOMMONEDA'));
        
//        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A1740REGIS'));
//        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A1740FREGI'));
//        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A1740HREGI'));
//        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A1740REGVI'));
//        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A1740FREVI'));
//        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A1740HREVI'));

    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    validaRequiredFields: function() {
        var bvalida = true;
        var cod_num = "0";
        
        if (Ext.getCmp(prototype.id+'-pnlAlpha').getHeight() === 0) cod_num = "1";
        
        var txtA006PAIS = Ext.getCmp(prototype.id + '-txtA006PAIS').getValue();
        var txtNameCountry = Ext.getCmp(prototype.id + '-txtNameCountry').getValue();
        var txtA006MONEDA = Ext.getCmp(prototype.id + '-txtA006MONEDA').getValue();
//        if (txtA006PAIS === "" || txtNameCountry === "" || (cod_num === "1" && txtA006MONEDA === "")) {
//            Ext.getCmp(prototype.id + '-txtA006PAIS').focus();
//            bvalida = false;
//        }
        if (txtA006PAIS ==="") {
            Ext.getCmp(prototype.id + '-txtA006PAIS').focus();
            bvalida = false;
        } else if (txtNameCountry ==="") {
            Ext.getCmp(prototype.id + '-txtNameCountry').focus();
            bvalida = false;
        } else if (cod_num === "1" && txtA006MONEDA === "") {
            Ext.getCmp(prototype.id + '-txtA006MONEDA').focus();
            bvalida = false;
        }
        return bvalida;
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        
        if (this.validaRequiredFields()) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert ?',
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
        } else {
            global.Msg({
                msg: 'You must enter all required fields.',
                fn: function() {}
            });
        }
    },
//    onUpdateClick: function(btn) {
//        var p = this.view.params;
//        Ext.Msg.show({
//            title:'.:PRAXIS:.',
//            msg: 'Are you sure to update ?',
//            buttons: Ext.MessageBox.YESNO,
//            scope: this,
//            animateTarget: btn,
//            icon: Ext.MessageBox.QUESTION,
//            modal: true,
//            fn: function(btn){
//                if (btn === 'yes'){
//                    console.log("LISTO PARA UPDATE");
////                    this.view.params.action = "U";
////                    this.save();
//                }
//            }
//        });
//    },
    onDeleteClick: function(btn) {
        var p = this.view.params;
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
    crud: function() {
        Ext.Ajax.request({
            url: prototype.url + '/maintanceA006',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.intResult;
                var icon=1;
                if(msg==='DUPLICATE KEY, VERIFY!'){
                    icon=2;
                }

                global.Msg({
                    msg: msg,
                    icon: icon,
                    fn: function() {
                        //exito
                        Ext.getCmp('DataEntryCountryMasterFileForm').close(),
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    getDataEntryValues: function() {
        var p = this.view.params;

        var strOption = p.action;
        var selectedValue = p.selectedValue;
        var strCampo;
        
        switch (selectedValue) {
            case "CU":
                strCampo = "CURRENCY";
                break;
            case "NAME":
                strCampo = "OTHERS";
                break;
            case "CO":
                strCampo = "COUNTRYS";
                break;
        }
        
        var A006KEY = Ext.getCmp(prototype.id + '-txtA006PAIS').getValue();
        var A006KEY1 = Ext.getCmp(prototype.id + '-txtNameCountry').getValue();
        var CODMONEDANUM = Ext.getCmp(prototype.id + '-txtA006MONEDA').getValue();
        var CODMONEDAALPHA = Ext.getCmp(prototype.id + '-txtA006CODMONEDAALPHA').getValue();
        var NOMMONEDA = Ext.getCmp(prototype.id + '-txtA006NOMMONEDA').getValue();
        
        return {
            strOption: strOption,
            strCampo: strCampo,
            A006KEY: A006KEY,
            A006KEY1: A006KEY1,
            CODMONEDANUM: CODMONEDANUM,
            CODMONEDAALPHA: CODMONEDAALPHA,
            NOMMONEDA: NOMMONEDA
        };
    }
    
});