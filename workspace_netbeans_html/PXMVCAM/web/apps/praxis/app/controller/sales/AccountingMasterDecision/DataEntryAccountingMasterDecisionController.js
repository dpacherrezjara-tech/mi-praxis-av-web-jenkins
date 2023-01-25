/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.AccountingMasterDecision.DataEntryAccountingMasterDecisionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/AccountingMasterDecision',
    lblA1834FP: '',
    lblA1834FUENT: '',
    lblA1834SUBFU: '',
    lblA1834TTARJ: '',
    lblA1834STTAR: '',
    lblA1834CIAOP: '',
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
        var cbxFP = Ext.getCmp(prototype.id + '-de-cbxFP');
        cbxFP.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["CA", "CASH"],
                ["CC", "CREDIT CARD"]
            ]
        }));
        cbxFP.setValue("");

        var cbxSource = Ext.getCmp(prototype.id + '-de-cbxSource');
        cbxSource.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["ARC", "ARC"],
                ["BSP", "BSP"],
                ["ASR", "ASR"]

            ]
        }));
        cbxSource.setValue("");

        var cbxA1834TVISA = Ext.getCmp(prototype.id + '-de-cbxA1834TVISA');
        cbxA1834TVISA.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["S", "Only Visa"],
                ["N", "No Visa"]

            ]
        }));
        cbxA1834TVISA.setValue("");


        var cbxA1834TMCAR = Ext.getCmp(prototype.id + '-de-cbxA1834TMCAR');
        cbxA1834TMCAR.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["S", "Only Mastercard"],
                ["N", "No Mastercard"]

            ]
        }));
        cbxA1834TMCAR.setValue("");

        var cbxA1834OTROS = Ext.getCmp(prototype.id + '-de-cbxA1834OTROS');
        cbxA1834OTROS.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["S", "All- (Visa +MC)"]


            ]
        }));
        cbxA1834OTROS.setValue("");

        var cbxA1834TPOLI = Ext.getCmp(prototype.id + '-de-cbxA1834TPOLI');
        cbxA1834TPOLI.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["AP", "AP"],
                ["GL", "GL"],
                ["AR", "AR"]

            ]
        }));
        cbxA1834TPOLI.setValue("");
    },
    getDataInputs: function() {
        var p = this.view.params;
        var data = p.rec.data;



        Ext.getCmp(prototype.id + '-de-cbxFP').setValue(data.A1834FP);
        Ext.getCmp(prototype.id + '-de-cbxSource').setValue(data.A1834FUENT);
        Ext.getCmp(prototype.id + '-de-txtA1834SUBFU').setValue(data.A1834SUBFU);
        Ext.getCmp(prototype.id + '-de-txtA1834TTARJ').setValue(data.A1834TTARJ);
        Ext.getCmp(prototype.id + '-de-txtA1834STTAR').setValue(data.A1834STTAR);
        Ext.getCmp(prototype.id + '-de-txtA1834CIAOP').setValue(data.A1834CIAOP);
        Ext.getCmp(prototype.id + '-de-txtA1834DESFP').setValue(data.A1834DESFP);
        Ext.getCmp(prototype.id + '-de-txtA1834COMBI').setValue(data.A1834COMBI);
        Ext.getCmp(prototype.id + '-de-cbxA1834TVISA').setValue(data.A1834TVISA);
        Ext.getCmp(prototype.id + '-de-cbxA1834TMCAR').setValue(data.A1834TMCAR);
        Ext.getCmp(prototype.id + '-de-cbxA1834OTROS').setValue(data.A1834OTROS);
        Ext.getCmp(prototype.id + '-de-cbxA1834TPOLI').setValue(data.A1834TPOLI);


        Ext.getCmp(prototype.id + '-de-txtA1834FINI').setValue(data.A1834FINI);
        Ext.getCmp(prototype.id + '-de-txtA1834FFIN').setValue(data.A1834FFIN === '9999/99/99' ? '' : data.A1834FFIN);

        Ext.getCmp(prototype.id + '-de-txtA1834ALF01').setValue(data.A1834ALF01.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834ALF02').setValue(data.A1834ALF02.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834ALF03').setValue(data.A1834ALF03.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834ALF04').setValue(data.A1834ALF04.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834ALF05').setValue(data.A1834ALF05.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834ALF06').setValue(data.A1834ALF06.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834ALF07').setValue(data.A1834ALF07.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834ALF08').setValue(data.A1834ALF08.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834ALF09').setValue(data.A1834ALF09.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834ALF10').setValue(data.A1834ALF10.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834ALF11').setValue(data.A1834ALF11.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834ALF12').setValue(data.A1834ALF12.trim());

        Ext.getCmp(prototype.id + '-de-txtA1834NUM01').setValue(data.A1834NUM01.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834NUM02').setValue(data.A1834NUM02.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834NUM03').setValue(data.A1834NUM03.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834NUM04').setValue(data.A1834NUM04.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834NUM05').setValue(data.A1834NUM05.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834NUM06').setValue(data.A1834NUM06.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834NUM07').setValue(data.A1834NUM07.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834NUM08').setValue(data.A1834NUM08.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834NUM09').setValue(data.A1834NUM09.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834NUM10').setValue(data.A1834NUM10.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834NUM11').setValue(data.A1834NUM11.trim());
        Ext.getCmp(prototype.id + '-de-txtA1834NUM12').setValue(data.A1834NUM12.trim());

        Ext.getCmp(prototype.id + '-de-txtUSCR').setValue(data.A1834REGIS);
        Ext.getCmp(prototype.id + '-de-txtFECR').setValue(data.A1834FREGI);
        Ext.getCmp(prototype.id + '-de-txtHOCR').setValue(data.A1834HREGI);
        Ext.getCmp(prototype.id + '-de-txtUSUP').setValue(data.A1834REGVI);
        Ext.getCmp(prototype.id + '-de-txtFEUP').setValue(data.A1834FREVI);
        Ext.getCmp(prototype.id + '-de-txtHOUP').setValue(data.A1834HREVI);


        this.lblA1834FP = data.A1834FP;
        this.lblA1834FUENT = data.A1834FUENT;
        this.lblA1834SUBFU = data.A1834SUBFU;
        this.lblA1834TTARJ = data.A1834TTARJ;
        this.lblA1834STTAR = data.A1834STTAR;
        this.lblA1834CIAOP = data.A1834CIAOP;



    },
    getDataEntryValues: function(strOption) {


        var A1834CCUST = '139';
        var A1834FP = Ext.getCmp(prototype.id + '-de-cbxFP').getValue();
        var A1834FUENT = Ext.getCmp(prototype.id + '-de-cbxSource').getValue();
        var A1834SUBFU = Ext.getCmp(prototype.id + '-de-txtA1834SUBFU').getValue();
        var A1834TTARJ = Ext.getCmp(prototype.id + '-de-txtA1834TTARJ').getValue();
        var A1834STTAR = Ext.getCmp(prototype.id + '-de-txtA1834STTAR').getValue();
        var A1834CIAOP = Ext.getCmp(prototype.id + '-de-txtA1834CIAOP').getValue();
        var A1834DESFP = Ext.getCmp(prototype.id + '-de-txtA1834DESFP').getValue();
        var A1834COMBI = Ext.getCmp(prototype.id + '-de-txtA1834COMBI').getValue();
        var A1834TVISA = Ext.getCmp(prototype.id + '-de-cbxA1834TVISA').getValue();
        var A1834TMCAR = Ext.getCmp(prototype.id + '-de-cbxA1834TMCAR').getValue();
        var A1834OTROS = Ext.getCmp(prototype.id + '-de-cbxA1834OTROS').getValue();
        var A1834TPOLI = Ext.getCmp(prototype.id + '-de-cbxA1834TPOLI').getValue();       
       
        var A1834FINI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-txtA1834FINI').getValue(), 'Ymd');
        var A1834FFIN = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-txtA1834FFIN').getValue(), 'Ymd');
        var A1834ALF01 = Ext.getCmp(prototype.id + '-de-txtA1834ALF01').getValue();
        var A1834ALF02 = Ext.getCmp(prototype.id + '-de-txtA1834ALF02').getValue();
        var A1834ALF03 = Ext.getCmp(prototype.id + '-de-txtA1834ALF03').getValue();
        var A1834ALF04 = Ext.getCmp(prototype.id + '-de-txtA1834ALF04').getValue();
        var A1834ALF05 = Ext.getCmp(prototype.id + '-de-txtA1834ALF05').getValue();
        var A1834ALF06 = Ext.getCmp(prototype.id + '-de-txtA1834ALF06').getValue();
        var A1834ALF07 = Ext.getCmp(prototype.id + '-de-txtA1834ALF07').getValue();
        var A1834ALF08 = Ext.getCmp(prototype.id + '-de-txtA1834ALF08').getValue();
        var A1834ALF09 = Ext.getCmp(prototype.id + '-de-txtA1834ALF09').getValue();
        var A1834ALF10 = Ext.getCmp(prototype.id + '-de-txtA1834ALF10').getValue();
        var A1834ALF11 = Ext.getCmp(prototype.id + '-de-txtA1834ALF11').getValue();
        var A1834ALF12 = Ext.getCmp(prototype.id + '-de-txtA1834ALF12').getValue();
        var A1834NUM01 = Ext.getCmp(prototype.id + '-de-txtA1834NUM01').getValue();
        var A1834NUM02 = Ext.getCmp(prototype.id + '-de-txtA1834NUM02').getValue();
        var A1834NUM03 = Ext.getCmp(prototype.id + '-de-txtA1834NUM03').getValue();
        var A1834NUM04 = Ext.getCmp(prototype.id + '-de-txtA1834NUM04').getValue();
        var A1834NUM05 = Ext.getCmp(prototype.id + '-de-txtA1834NUM05').getValue();
        var A1834NUM06 = Ext.getCmp(prototype.id + '-de-txtA1834NUM06').getValue();
        var A1834NUM07 = Ext.getCmp(prototype.id + '-de-txtA1834NUM07').getValue();
        var A1834NUM08 = Ext.getCmp(prototype.id + '-de-txtA1834NUM08').getValue();
        var A1834NUM09 = Ext.getCmp(prototype.id + '-de-txtA1834NUM09').getValue();
        var A1834NUM10 = Ext.getCmp(prototype.id + '-de-txtA1834NUM10').getValue();
        var A1834NUM11 = Ext.getCmp(prototype.id + '-de-txtA1834NUM11').getValue();
        var A1834NUM12 = Ext.getCmp(prototype.id + '-de-txtA1834NUM12').getValue();
        var IN_A1834FP_OLD = this.lblA1834FP;
        var IN_A1834FUENT_OLD = this.lblA1834FUENT;
        var IN_A1834SUBFU_OLD = this.lblA1834SUBFU;
        var IN_A1834TTARJ_OLD = this.lblA1834TTARJ;
        var IN_A1834STTAR_OLD = this.lblA1834STTAR;
        var IN_A1834CIAOP_OLD = this.lblA1834CIAOP;

        if (A1834FFIN === '') {
            A1834FFIN = '99999999';
        }
        
        
        return {
            strOption: strOption,
           A1834CCUST:A1834CCUST,
           A1834FP:A1834FP,
           A1834FUENT:A1834FUENT,
           A1834SUBFU:A1834SUBFU,
           A1834TTARJ:A1834TTARJ,
           A1834STTAR:A1834STTAR,
           A1834CIAOP:A1834CIAOP,
           A1834DESFP:A1834DESFP,
           A1834COMBI:A1834COMBI,
           A1834TVISA:A1834TVISA,
           A1834TMCAR:A1834TMCAR,
           A1834OTROS:A1834OTROS,
           A1834TPOLI:A1834TPOLI,
           A1834FINI:A1834FINI,
           A1834FFIN:A1834FFIN,
           A1834ALF01:A1834ALF01,
           A1834ALF02:A1834ALF02,
           A1834ALF03:A1834ALF03,
           A1834ALF04:A1834ALF04,
           A1834ALF05:A1834ALF05,
           A1834ALF06:A1834ALF06,
           A1834ALF07:A1834ALF07,
           A1834ALF08:A1834ALF08,
           A1834ALF09:A1834ALF09,
           A1834ALF10:A1834ALF10,
           A1834ALF11:A1834ALF11,
           A1834ALF12:A1834ALF12,
           A1834NUM01:A1834NUM01,
           A1834NUM02:A1834NUM02,
           A1834NUM03:A1834NUM03,
           A1834NUM04:A1834NUM04,
           A1834NUM05:A1834NUM05,
           A1834NUM06:A1834NUM06,
           A1834NUM07:A1834NUM07,
           A1834NUM08:A1834NUM08,
           A1834NUM09:A1834NUM09,
           A1834NUM10:A1834NUM10,
           A1834NUM11:A1834NUM11,
           A1834NUM12:A1834NUM12,
           IN_A1834FP_OLD:IN_A1834FP_OLD,
           IN_A1834FUENT_OLD:IN_A1834FUENT_OLD,
           IN_A1834SUBFU_OLD:IN_A1834SUBFU_OLD,
           IN_A1834TTARJ_OLD:IN_A1834TTARJ_OLD,
           IN_A1834STTAR_OLD:IN_A1834STTAR_OLD,
           IN_A1834CIAOP_OLD:IN_A1834CIAOP_OLD      
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
       
        var cbxFP = Ext.getCmp(prototype.id + '-de-cbxFP').getValue();
        var cbxSource = Ext.getCmp(prototype.id + '-de-cbxSource').getValue();
        var txtA1834TTARJ = Ext.getCmp(prototype.id + '-de-txtA1834TTARJ').getValue();
        var txtA1834CIAOP = Ext.getCmp(prototype.id + '-de-txtA1834CIAOP').getValue();
        if (cbxFP === '' || cbxSource === '' || txtA1834TTARJ === '' || txtA1834CIAOP === '') {
            mensaje = 'Insert fields required.';
        }
        return mensaje;

    },
    onCancelClick: function(btn){
        this.view.close();
    }



});


