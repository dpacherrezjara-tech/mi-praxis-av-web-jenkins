/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.AccountingMasterTNU.DataEntryAccountingMasterTNUController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/AccountingMasterTNU',
    txt_IN_A1833TDOC_OLD: '',
    txt_IN_A1833CONC_OLD: '',
    txt_IN_A1833CODIV_OLD: '',
    txt_IN_A1833TASIN_OLD: '',
    txt_IN_A1833TASFI_OLD: '',
    txt_IN_A1833FINI_OLD: '',
    txt_IN_A1833FFIN_OLD: '',
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


        var cboDocType = Ext.getCmp(prototype.id + '-de-cboDocType');
        cboDocType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["TKT", "TKT"],
                ["RFN", "RFN"]
            ]
        }));
        cboDocType.setValue("");

        var cboIVACode = Ext.getCmp(prototype.id + '-de-cboIVACode');
        cboIVACode.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["MX", "Multicurrency (MX)"],
                ["XO", "Origin (XO)"]
            ]
        }));
        cboIVACode.setValue("");


        Ext.getCmp(prototype.id + '-de-txtRateLevel').setValue('0.0');
        Ext.getCmp(prototype.id + '-de-txtBeginRate').setValue('0.0');
        Ext.getCmp(prototype.id + '-de-txtEndRate').setValue('0.0');


    },
    getDataInputs: function() {
        var p = this.view.params;
        var data = p.rec.data;


        Ext.getCmp(prototype.id + '-de-cboDocType').setValue(data.A1833TDOC);
        Ext.getCmp(prototype.id + '-de-txtConcept').setValue(data.A1833CONC);
        Ext.getCmp(prototype.id + '-de-cboIVACode').setValue(data.A1833CODIV);
        Ext.getCmp(prototype.id + '-de-txtRateLevel').setValue(Ext.util.Format.number(data.A1833SUBTI, '0.00'));
        Ext.getCmp(prototype.id + '-de-txtBeginRate').setValue(Ext.util.Format.number(data.A1833TASIN, '0,000.00'));
        Ext.getCmp(prototype.id + '-de-txtEndRate').setValue(Ext.util.Format.number(data.A1833TASFI, '0,000.00'));        
        Ext.getCmp(prototype.id + '-de-txtDescription').setValue(data.A1833DESCR);

        Ext.getCmp(prototype.id + '-de-txtStartDate').setValue(data.A1833FINI);
        Ext.getCmp(prototype.id + '-de-txtEndDate').setValue(data.A1833FFIN);


        Ext.getCmp(prototype.id + '-de-txtUSCR').setValue(data.A1833REGIS);
        Ext.getCmp(prototype.id + '-de-txtFECR').setValue(data.A1833FREGI);
        Ext.getCmp(prototype.id + '-de-txtHOCR').setValue(data.A1833HREGI);
        Ext.getCmp(prototype.id + '-de-txtUSUP').setValue(data.A1833REGVI);
        Ext.getCmp(prototype.id + '-de-txtFEUP').setValue(data.A1833FREVI);
        Ext.getCmp(prototype.id + '-de-txtHOUP').setValue(data.A1833HREVI);

        this.lblPreffixOld = data.A1830PREFI;


        this.txt_IN_A1833TDOC_OLD = data.A1833TDOC;
        this.txt_IN_A1833CONC_OLD = data.A1833CONC;
        this.txt_IN_A1833CODIV_OLD = data.A1833CODIV;

        this.txt_IN_A1833TASIN_OLD = data.A1833TASIN;
        this.txt_IN_A1833TASFI_OLD = data.A1833TASFI;
        this.txt_IN_A1833FINI_OLD = data.A1833FINI;
        this.txt_IN_A1833FFIN_OLD = data.A1833FFIN;
     



    },
    getDataEntryValues: function(strOption) {


        var A1833CCUST = '139';
        var A1833CONC = Ext.getCmp(prototype.id + '-de-txtConcept').getValue();
        var A1833SUBTI = Ext.util.Format.number(Ext.getCmp(prototype.id + '-de-txtRateLevel').getValue(), '0');
        var A1833TDOC = Ext.getCmp(prototype.id + '-de-cboDocType').getValue();
        var A1833CODIV = Ext.getCmp(prototype.id + '-de-cboIVACode').getValue();
        var A1833TASIN = Ext.getCmp(prototype.id + '-de-txtBeginRate').getValue();
        var A1833TASFI = Ext.getCmp(prototype.id + '-de-txtEndRate').getValue();
        var A1833DESCR = Ext.getCmp(prototype.id + '-de-txtDescription').getValue();
        var A1833FINI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-txtStartDate').getValue(), 'Ymd');
        var A1833FFIN = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-txtEndDate').getValue(), 'Ymd');

        var IN_A1833TDOC_OLD = '' + this.txt_IN_A1833TDOC_OLD;
        var IN_A1833CONC_OLD = '' + this.txt_IN_A1833CONC_OLD;
        var IN_A1833CODIV_OLD = '' + this.txt_IN_A1833CODIV_OLD;
        var IN_A1833TASIN_OLD = '' + this.txt_IN_A1833TASIN_OLD;
        var IN_A1833TASFI_OLD = '' + this.txt_IN_A1833TASFI_OLD;
        console.log('IN_A1833TASIN_OLD : ' + this.txt_IN_A1833TASIN_OLD);
        console.log('IN_A1833TASFI_OLD : ' + this.txt_IN_A1833TASFI_OLD);
       
        
      
        
         var IN_A1833FINI_OLD;

        if (this.txt_IN_A1833FINI_OLD === '9999/99/99') {
            IN_A1833FINI_OLD = '99999999';
        } else if (this.txt_IN_A1833FINI_OLD.trim() !== '') {
            IN_A1833FINI_OLD = Ext.util.Format.date(this.txt_IN_A1833FINI_OLD, 'Ymd');
        }
        
        var IN_A1833FFIN_OLD;

        if (this.txt_IN_A1833FFIN_OLD === '9999/99/99') {
            IN_A1833FFIN_OLD = '99999999';
        } else if (this.txt_IN_A1833FFIN_OLD.trim() !== '') {
            IN_A1833FFIN_OLD = Ext.util.Format.date(this.txt_IN_A1833FFIN_OLD, 'Ymd');
        }


        if (A1833FFIN === '') {
            A1833FFIN = '99999999';
        }


        return {
            strOption: strOption,
            A1833CCUST: A1833CCUST,
            A1833CONC: A1833CONC,
            A1833SUBTI: A1833SUBTI,
            A1833TDOC: A1833TDOC,
            A1833CODIV: A1833CODIV,
            A1833TASIN: A1833TASIN,
            A1833TASFI: A1833TASFI,
            A1833DESCR: A1833DESCR,
            A1833FINI: A1833FINI,
            A1833FFIN: A1833FFIN,
            IN_A1833TDOC_OLD: IN_A1833TDOC_OLD,
            IN_A1833CONC_OLD: IN_A1833CONC_OLD,
            IN_A1833CODIV_OLD: IN_A1833CODIV_OLD,
            IN_A1833TASIN_OLD: IN_A1833TASIN_OLD,
            IN_A1833TASFI_OLD: IN_A1833TASFI_OLD,
            IN_A1833FINI_OLD: IN_A1833FINI_OLD,
            IN_A1833FFIN_OLD: IN_A1833FFIN_OLD

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
        var cboDocType = Ext.getCmp(prototype.id + '-de-cboDocType').getValue();
        var txtConcept = Ext.getCmp(prototype.id + '-de-txtConcept').getValue();
        var cboIVACode = Ext.getCmp(prototype.id + '-de-cboIVACode').getValue();
        var txtBeginRate = Ext.getCmp(prototype.id + '-de-txtBeginRate').getValue();
        var txtEndRate = Ext.getCmp(prototype.id + '-de-txtEndRate').getValue();
        var txtStartDate = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-txtStartDate').getValue(), 'Ymd')

        if (cboDocType === '' || txtConcept === '' || cboIVACode === '' || txtBeginRate === '' || txtEndRate === '' || txtStartDate === '') {
            mensaje = 'Insert fields required.';
        }
        return mensaje;

    }


});


