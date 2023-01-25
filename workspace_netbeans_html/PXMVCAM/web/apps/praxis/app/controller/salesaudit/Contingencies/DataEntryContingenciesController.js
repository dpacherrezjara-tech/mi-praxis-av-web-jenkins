/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.salesaudit.Contingencies.DataEntryContingenciesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/Contingencies',
    A2536ID: '',
    A2536KEY: '',
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
        Ext.getCmp(prototype.id + '-de-Route1').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-Route2').setReadOnly(true);
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
    setStoreData: function() {

//        var cmbDeType = Ext.getCmp(prototype.id + '-de-cmbDeType');
//        cmbDeType.bindStore(Ext.create('Ext.data.ArrayStore', {
//            autoLoad: false,
//            fields: ['code', 'name'],
//            data: [
//                ["", "Select"],
//                ["SALE", "SALE"],
//                ["EXCH", "EXCH"],
//                ["RFND", "RFND"],
//                ["ADM", "ADM"]
//            ]
//        }));
//        cmbDeType.setValue('');
    },
    getDataInputs: function() {

        var p = this.view.params;
        var data = p.rec.data;

        Ext.getCmp(prototype.id + '-de-Route1').setValue(data.A2536FFROM.trim());
        Ext.getCmp(prototype.id + '-de-Route2').setValue(data.A2536FTO.trim());
        Ext.getCmp(prototype.id + '-de-FromTo').setValue(data.A2536FALE.trim());
        Ext.getCmp(prototype.id + '-de-lblString').setValue(data.A2536FLOWD.trim());
        Ext.getCmp(prototype.id + '-de-lblReservation').setValue(data.A2536SERV.trim());
        Ext.getCmp(prototype.id + '-de-lbldescri').setValue(data.A2536DESC.trim());
        meDe.A2536ID = data.A2536KEY;
        meDe.A2536KEY = data.A2536KEY;

        Ext.getCmp(prototype.id + '-de-RfndDate1').setValue(data.A2536APPF.substr(0, 4) + '/' + data.A2536APPF.substr(4, 2) + '/' + data.A2536APPF.substr(6, 2));
        Ext.getCmp(prototype.id + '-de-RfndDate2').setValue(data.A2536APPT.substr(0, 4) + '/' + data.A2536APPT.substr(4, 2) + '/' + data.A2536APPT.substr(6, 2));
        Ext.getCmp(prototype.id + '-de-Emission1').setValue(data.A2536EMIF.substr(0, 4) + '/' + data.A2536EMIF.substr(4, 2) + '/' + data.A2536EMIF.substr(6, 2));
        Ext.getCmp(prototype.id + '-de-Emission2').setValue(data.A2536EMIT.substr(0, 4) + '/' + data.A2536EMIT.substr(4, 2) + '/' + data.A2536EMIT.substr(6, 2));


        Ext.getCmp(prototype.id + '-de-txtREGIS').setValue(data.A2536INGRE.trim());
        Ext.getCmp(prototype.id + '-de-txtFREGI').setValue(data.A2536FINGR.trim());
        Ext.getCmp(prototype.id + '-de-txtHREGI').setValue(data.A2536HINGR.trim());
        Ext.getCmp(prototype.id + '-de-txtREVIS').setValue(data.A2536MODIF.trim());
        Ext.getCmp(prototype.id + '-de-txtFREVI').setValue(data.A2536FMODI.trim());
        Ext.getCmp(prototype.id + '-de-txtHREVI').setValue(data.A2536HMODI.trim());


    },
    getDataEntryValues: function(strOption) {

        meDe.bean = {};
        meDe.bean.VP_FILTER = strOption;
        meDe.bean.A2536FFROM = Ext.getCmp(prototype.id + '-de-Route1').getValue();
        meDe.bean.A2536FTO = Ext.getCmp(prototype.id + '-de-Route2').getValue();
        meDe.bean.A2536FLOWD = Ext.getCmp(prototype.id + '-de-lblString').getValue();
        meDe.bean.A2536FALE = Ext.getCmp(prototype.id + '-de-FromTo').getValue();
        meDe.bean.A2536SERV = Ext.getCmp(prototype.id + '-de-lblReservation').getValue();
        meDe.bean.A2536DESC = Ext.getCmp(prototype.id + '-de-lbldescri').getValue();
        meDe.bean.A2536KEY = meDe.A2536ID;
        meDe.bean.A2536ID = meDe.A2536KEY;

        meDe.bean.A2536APPF = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-RfndDate1').getValue(), 'Ymd');
        meDe.bean.A2536APPT = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-RfndDate2').getValue(), 'Ymd');
        meDe.bean.A2536EMIF = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-Emission1').getValue(), 'Ymd');
        meDe.bean.A2536EMIT = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-Emission2').getValue(), 'Ymd');

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
            url: this.url + '/mantenimientoContingencies',
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


        if (params.A2536FFROM === '') {
            mensaje = 'Required Field, Route From';
            Ext.getCmp(prototype.id + '-de-Route1').focus();
            return mensaje;
        }
        if (params.A2536FTO === '') {
            mensaje = 'Required Field, Route To';
            Ext.getCmp(prototype.id + '-de-Route2').focus();
            return mensaje;
        }
        if (params.A2536FALE === '') {
            mensaje = 'Required Field, Route From/To ';
            Ext.getCmp(prototype.id + '-de-FromTo').focus();
            return mensaje;
        }
        if (params.A2536APPF === '') {
            mensaje = 'Required Field, Effective Date';
            Ext.getCmp(prototype.id + '-de-RfndDate1').focus();
            return mensaje;
        }
        if (params.A2536APPT === '') {
            mensaje = 'Required Field, Discontinued Date ';
            Ext.getCmp(prototype.id + '-de-RfndDate2').focus();
            return mensaje;
        }



        return mensaje;

    }


});


