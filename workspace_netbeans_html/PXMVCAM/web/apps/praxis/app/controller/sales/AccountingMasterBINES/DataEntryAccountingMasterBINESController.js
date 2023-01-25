/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.AccountingMasterBINES.DataEntryAccountingMasterBINESController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/AccountingMasterBINES',
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

        //-de-cboBank
        var cboNature = Ext.getCmp(prototype.id + '-de-cboNature');
        cboNature.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["DÉBITO", "DÉBITO"],
                ["CRÉDITO", "CRÉDITO"]
            ]
        }));
        cboNature.setValue("");

        var cboBrand = Ext.getCmp(prototype.id + '-de-cboBrand');
        cboBrand.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["CARNET", "CARNET"],
                ["MASTERCARD", "MASTERCARD"],
                ["PRIVADA", "PRIVADA"],
                ["VISA", "VISA"]
            ]
        }));
        cboBrand.setValue("");

        var storeComboDatas = Ext.create('Ext.Praxis.store.sales.AccountingMasterBINES.FilterBank', {
            proxy: {
                url: prototype.url + '/getBank2'
            }
        });
        Ext.getCmp(prototype.id + '-de-cboBank').bindStore(storeComboDatas);
        Ext.getCmp(prototype.id + '-de-cboBank').setValue("Select");
    },
    getDataInputs: function() {
        var p = this.view.params;
        var data = p.rec.data;


        Ext.getCmp(prototype.id + '-de-txtPreffix').setValue(data.A1830PREFI);
        Ext.getCmp(prototype.id + '-de-txtProduct').setValue(data.A1830PRODU);
        Ext.getCmp(prototype.id + '-de-txtBrandCode').setValue(data.A1830CODMA);
        Ext.getCmp(prototype.id + '-de-txtBrandCode2').setValue(data.A1830CODM2);
        Ext.getCmp(prototype.id + '-de-txtBrandCode3').setValue(data.A1830CODM3);
        Ext.getCmp(prototype.id + '-de-txtBrandCode4').setValue(data.A1830CODM4);
        Ext.getCmp(prototype.id + '-de-txtBrandCode5').setValue(data.A1830CODM5);
        Ext.getCmp(prototype.id + '-de-txtBrandCode6').setValue(data.A1830CODM6);
        Ext.getCmp(prototype.id + '-de-txtNatureCode').setValue(data.A1830CODNA);
        Ext.getCmp(prototype.id + '-de-cboBank').setValue(data.A1830BANCO);
        Ext.getCmp(prototype.id + '-de-cboNature').setValue(data.A1830NATUR);
        Ext.getCmp(prototype.id + '-de-cboBrand').setValue(data.A1830MARCA);
        Ext.getCmp(prototype.id + '-de-txtStartDate').setValue(data.A1830FINI);
        Ext.getCmp(prototype.id + '-de-txtEndDate').setValue(data.A1830FFIN);

        Ext.getCmp(prototype.id + '-de-txtUSCR').setValue(data.A1830REGIS);
        Ext.getCmp(prototype.id + '-de-txtFECR').setValue(data.A1830FREGI);
        Ext.getCmp(prototype.id + '-de-txtHOCR').setValue(data.A1830HREGI);
        Ext.getCmp(prototype.id + '-de-txtUSUP').setValue(data.A1830REGVI);
        Ext.getCmp(prototype.id + '-de-txtFEUP').setValue(data.A1830FREVI);
        Ext.getCmp(prototype.id + '-de-txtHOUP').setValue(data.A1830HREVI);




        this.lblPreffixOld = data.A1830PREFI;


    },
    getDataEntryValues: function(strOption) {


        var A1830CCUST = '139';
        var A1830PREFI = Ext.getCmp(prototype.id + '-de-txtPreffix').getValue();
        var A1830PRODU = Ext.getCmp(prototype.id + '-de-txtProduct').getValue();
        var A1830CODMA = Ext.getCmp(prototype.id + '-de-txtBrandCode').getValue();
        var A1830CODM2 = Ext.getCmp(prototype.id + '-de-txtBrandCode2').getValue();
        var A1830CODM3 = Ext.getCmp(prototype.id + '-de-txtBrandCode3').getValue();
        var A1830CODM4 = Ext.getCmp(prototype.id + '-de-txtBrandCode4').getValue();
        var A1830CODM5 = Ext.getCmp(prototype.id + '-de-txtBrandCode5').getValue();
        var A1830CODM6 = Ext.getCmp(prototype.id + '-de-txtBrandCode6').getValue();
        var A1830CODNA = Ext.getCmp(prototype.id + '-de-txtNatureCode').getValue();
        var A1830BANCO = Ext.getCmp(prototype.id + '-de-cboBank').getValue();
        var A1830NATUR = Ext.getCmp(prototype.id + '-de-cboNature').getValue();
        var A1830MARCA = Ext.getCmp(prototype.id + '-de-cboBrand').getValue();        
        var A1830FINI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-txtStartDate').getValue(), 'Ymd');
        var A1830FFIN = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-txtEndDate').getValue(), 'Ymd');       
        var IN_A1830PREFI_OLD = this.lblPreffixOld;

//        if (A1830FINI === '') {
//            A1830FINI = '99999999';
//        }
        if (A1830FFIN === '') {
            A1830FFIN = '99999999';
        }      
        return {
            strOption: strOption,
            A1830CCUST: A1830CCUST,
            A1830PREFI: A1830PREFI,
            A1830PRODU: A1830PRODU,
            A1830CODMA: A1830CODMA,
            A1830CODM2: A1830CODM2,
            A1830CODM3: A1830CODM3,
            A1830CODM4: A1830CODM4,
            A1830CODM5: A1830CODM5,
            A1830CODM6: A1830CODM6,
            A1830CODNA: A1830CODNA,
            A1830BANCO: A1830BANCO,
            A1830NATUR: A1830NATUR,
            A1830MARCA: A1830MARCA,
            A1830FINI: A1830FINI,
            A1830FFIN: A1830FFIN,
            IN_A1830PREFI_OLD: IN_A1830PREFI_OLD
          

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
    onCancelClick: function(btn){
        this.view.close();
    },
    validateForm: function() {


        var mensaje = "";
        var txtPreffix = Ext.getCmp(prototype.id + '-de-txtPreffix').getValue();
        var cboBank = Ext.getCmp(prototype.id + '-de-cboBank').getValue();
        var cboNature = Ext.getCmp(prototype.id + '-de-cboNature').getValue();
        var cboBrand = Ext.getCmp(prototype.id + '-de-cboBrand').getValue();
        
        if(cboBank==='Select'){
            cboBank='';
        }
        if (txtPreffix === '' || cboBank === '' || cboNature === '' || cboBrand === '') {
            mensaje = 'Insert fields required.';
        }
        return mensaje;

    }


});


