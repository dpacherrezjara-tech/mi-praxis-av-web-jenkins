/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.flown.AverageFareEMD.DataEntryAverageFareEMDController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/AverageFareEMD',
    aeropuertos: {},
    existAirport: false,
    aux: false,
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
        console.log("URL : " + this.url);
        var p = this.view.params;
        this.setStoreData();

        switch (p.action) {
            case 'I':
//                this.onClearInputs();
//                Ext.getCmp(prototype.id + '-btn-delete').hide();
//                Ext.getCmp(prototype.id + '-btn-update').hide();
                //                Ext.getCmp(prototype.id + '-btn-save').show();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-subCode').setReadOnly(true);
                Ext.getCmp(prototype.id + '-rfic').setReadOnly(true);
                Ext.getCmp(prototype.id + '-subCodeDescription').setReadOnly(true);


                this.view.setHeight(this.view.getHeight());
                break;
        }
        // global.AccessControlMaganer();
    },
    setStoreData: function() {
        var cmbCurrency = Ext.getCmp(prototype.id + '-cmbCurrency');
        cmbCurrency.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["USD", "USD"],
                ["MXN", "MXN"],
                ["EUR", "EUR"]
            ]}));
    }
    ,
    onUpdateClick: function(btn) {
        var p = this.view.params;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to update ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
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
    ,
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
    }
    ,
    onSaveClick: function(btn) {
        console.log("La opcion no esta implementada");
    }
    ,
    crud: function() {
        var p = this.view.params;
        rec = p.rec;

        var strOption = p.action;

        console.log('opcion : ' + strOption);

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
    getDataEntryValues: function(strOption) {

        var SUBCD = Ext.getCmp(prototype.id + '-subCode').getValue();
        var RFIC = Ext.getCmp(prototype.id + '-rfic').getValue();
        var CURRENC = Ext.getCmp(prototype.id + '-cmbCurrency').getValue();
        var VALOR = Ext.getCmp(prototype.id + '-amount').getValue();

        if(VALOR===''){
            VALOR=0;
        }
        return {
            strOption: strOption,
            SUBCD: SUBCD,
            RFIC: RFIC,
            CURRENC: CURRENC,
            VALOR: VALOR
        };
    }
    ,
    onCancelClick: function(btn) {
        Ext.getCmp(prototype.id + '-dataEntry').close();
    }
    ,
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }
    ,
    onClearInputs: function() {
        //Ext.getCmp(prototype.id + '-flightDate').setValue('');       
    }
    , getDataInputs: function() {
        var p = this.view.params;
        rec = p.rec;

        Ext.getCmp(prototype.id + '-subCode').setValue(rec.get('SUBCD'));
        Ext.getCmp(prototype.id + '-rfic').setValue(rec.get('RFIC'));
        Ext.getCmp(prototype.id + '-subCodeDescription').setValue(rec.get('DES_SUBCD'));
        Ext.getCmp(prototype.id + '-cmbCurrency').setValue(rec.get('CURRENC'));
        Ext.getCmp(prototype.id + '-amount').setValue(Ext.util.Format.number(rec.get('VALOR'), '0000.00'));
                               
        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('USCR'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('FECR'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('HOCR'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('USUP'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('FEUP'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('HOUP'));

    }



});


