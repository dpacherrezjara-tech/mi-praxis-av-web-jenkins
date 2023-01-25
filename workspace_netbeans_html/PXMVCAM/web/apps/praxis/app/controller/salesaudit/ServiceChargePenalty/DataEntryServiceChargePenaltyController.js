/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.salesaudit.ServiceChargePenalty.DataEntryServiceChargePenaltyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/ServiceChargePenalty',
    A2252SEQ: '',
    A2252TRNCU: '',
    meDe: '',
    params: '',
    /**
     * Constructor
     */
    init: function(view) {
        meDe = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        var p = this.view.params;
        this.setStoreData();
        switch (p.action) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-save').show();
                break;
            case 'U':

                Ext.getCmp(prototype.id + '-de-cmbDeType').setReadOnly(true);
                Ext.getCmp(prototype.id + '-de-cmbCode').setReadOnly(true);
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                break;
        }


    },
    setStoreData: function() {

        var cmbDeType = Ext.getCmp(prototype.id + '-de-cmbDeType');
        cmbDeType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["SALE", "SALE"],
                ["EXCH", "EXCH"],
                ["RFND", "RFND"],
                ["ADM", "ADM"]
            ]
        }));
        cmbDeType.setValue('');

        var cmbCode = Ext.getCmp(prototype.id + '-de-cmbCode');
        cmbCode.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["P1", "P1"],
                ["P2", "P2"],
                ["P3", "P3"],
                ["FOB", "FOB"],
                ["CARGO", "CHARGE"],
                ["PREMIO", "PREMIO"]
            ]
        }));
        cmbCode.setValue('');

        var cmbAmouType = Ext.getCmp(prototype.id + '-de-cmbAmouType');
        cmbAmouType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["P", "Percentage"],
                ["A", "Amount"]
            ]
        }));
        cmbAmouType.setValue('');


        var cmbIva = Ext.getCmp(prototype.id + '-de-cmbIva');
        cmbIva.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["Y", "YES"],
                ["N", "NOT"]
            ]
        }));
        cmbIva.setValue('');
    },
    getDataInputs: function() {

        var p = this.view.params;
        var data = p.rec.data;

        Ext.getCmp(prototype.id + '-de-cmbDeType').setValue(data.A2252TRNCU.trim());
        Ext.getCmp(prototype.id + '-de-cmbCode').setValue(data.A2252COD.trim());
        Ext.getCmp(prototype.id + '-de-cmbAmouType').setValue(data.A2252INDIC.trim());
        Ext.getCmp(prototype.id + '-de-cmbIva').setValue(data.A2252IVA.trim());
        Ext.getCmp(prototype.id + '-de-lbldescri').setValue(data.A2252DESCR.trim());
        Ext.getCmp(prototype.id + '-de-txtmda').setValue(data.A2252MDA.trim());
        Ext.getCmp(prototype.id + '-de-txtAmount').setValue(data.A2252VALOR);
        meDe.A2252TRNCU = data.A2252TRNCU;
        meDe.A2252SEQ = data.A2252SEQ;

        Ext.getCmp(prototype.id + '-de-txtFechaOpen').setValue(data.A2252DATEF.substr(0, 4) + '/' + data.A2252DATEF.substr(4, 2) + '/' + data.A2252DATEF.substr(6, 2));
        Ext.getCmp(prototype.id + '-de-txtFechaClose').setValue(data.A2252DATET.substr(0, 4) + '/' + data.A2252DATET.substr(4, 2) + '/' + data.A2252DATET.substr(6, 2));


        Ext.getCmp(prototype.id + '-de-txtREGIS').setValue(data.A2252REGIS.trim());
        Ext.getCmp(prototype.id + '-de-txtFREGI').setValue(data.A2252FREGI.trim());
        Ext.getCmp(prototype.id + '-de-txtHREGI').setValue(data.A2252HREGI.trim());
        Ext.getCmp(prototype.id + '-de-txtREVIS').setValue(data.A2252REVIS.trim());
        Ext.getCmp(prototype.id + '-de-txtFREVI').setValue(data.A2252FREVI.trim());
        Ext.getCmp(prototype.id + '-de-txtHREVI').setValue(data.A2252HREVI.trim());


    },
    getDataEntryValues: function(strOption) {


        meDe.bean = {};
        meDe.bean.VP_FILTER = strOption;
        meDe.bean.VP_Type = Ext.getCmp(prototype.id + '-de-cmbDeType').getValue();
        meDe.bean.A2252COD = Ext.getCmp(prototype.id + '-de-cmbCode').getValue();
        meDe.bean.A2252INDIC = Ext.getCmp(prototype.id + '-de-cmbAmouType').getValue();
        meDe.bean.A2252IVA = Ext.getCmp(prototype.id + '-de-cmbIva').getValue();
        meDe.bean.A2252VALOR = Ext.getCmp(prototype.id + '-de-txtAmount').getValue();
        meDe.bean.A2252DESCR = Ext.getCmp(prototype.id + '-de-lbldescri').getValue();
        meDe.bean.A2252MDA = Ext.getCmp(prototype.id + '-de-txtmda').getValue();
        meDe.bean.A2252TRNCU = meDe.A2252TRNCU;
        meDe.bean.A2252SEQ = meDe.A2252SEQ;

        meDe.bean.A2252DATEF = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-txtFechaOpen').getValue(), 'Ymd');
        meDe.bean.A2252DATET = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-txtFechaClose').getValue(), 'Ymd');

        var beanString = JSON.stringify(meDe.bean);
        meDe.params = {
            bean: meDe.bean,
            beanString: beanString
        };

        return meDe.params;
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
            url: this.url + '/mantenimientoCharge',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                console.log(objRtn);
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
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
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    validateForm: function(params) {
        params = params.bean;


        var mensaje = "";
   

        if (params.VP_Type === '') {
            mensaje = 'Required Field, Transaction';
            Ext.getCmp(prototype.id + '-de-cmbDeType').focus();
            return mensaje;
        }
        if (params.A2252COD === '') {
            mensaje = 'Required Field, Code';
            Ext.getCmp(prototype.id + '-de-cmbCode').focus();
            return mensaje;
        }
        if (params.A2252INDIC === '') {
            mensaje = 'Required Field, Amount type';
            Ext.getCmp(prototype.id + '-de-cmbAmouType').focus();
            return mensaje;
        }
        if (params.A2252IVA === '') {
            mensaje = 'Required Field, Application Iva';
            Ext.getCmp(prototype.id + '-de-cmbIva').focus();
            return mensaje;
        }
        if (params.A2252VALOR === '') {
            mensaje = 'Required Field, Amount ';
            Ext.getCmp(prototype.id + '-de-txtAmount').focus();
            return mensaje;
        }

        if (params.A2252DATEF === '') {
            mensaje = 'Required Field, Date Efective ';
            Ext.getCmp(prototype.id + '-de-txtFechaOpen').focus();
            return mensaje;
        }
        if (params.A2252DATET === '') {
            mensaje = 'Required Field, Date Discontinuity  ';
            Ext.getCmp(prototype.id + '-de-txtFechaClose').focus();
            return mensaje;
        }


        return mensaje;

    }


});


