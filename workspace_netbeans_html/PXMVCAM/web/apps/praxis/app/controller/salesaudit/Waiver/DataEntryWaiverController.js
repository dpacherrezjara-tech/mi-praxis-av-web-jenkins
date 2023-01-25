/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.salesaudit.Waiver.DataEntryWaiverController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/Waiver',
    A2536ID: '',
    A2536KEY: '',
    meDe: '',
    A2537KEY: '',
    A2537ID: '',
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
//        Ext.getCmp(prototype.id + '-de-Route1').setReadOnly(true);
//        Ext.getCmp(prototype.id + '-de-Route2').setReadOnly(true);
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

        var AppliSale = Ext.getCmp(prototype.id + '-de-AppliSale');
        AppliSale.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Not"],
                ["X", "Yes"]
            ]
        }));
        AppliSale.setValue('');
        var AppliRfnd = Ext.getCmp(prototype.id + '-de-AppliRfnd');
        AppliRfnd.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Not"],
                ["X", "Yes"]
            ]
        }));
        AppliRfnd.setValue('');
        var AppliExch = Ext.getCmp(prototype.id + '-de-AppliExch');
        AppliExch.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Not"],
                ["X", "Yes"]
            ]
        }));
        AppliExch.setValue('');


    },
    getDataInputs: function() {

        var p = this.view.params;
        var data = p.rec.data;

        Ext.getCmp(prototype.id + '-de-Country').setValue(data.A2537CNTRY.trim());
        Ext.getCmp(prototype.id + '-de-txtCia').setValue(data.A2537CCUST.trim());
        Ext.getCmp(prototype.id + '-de-txtFrmaSerie').setValue(data.A2537FORMA.trim() + data.A2537SERIE.trim());
        Ext.getCmp(prototype.id + '-de-TourCode').setValue(data.A2537TCODE.trim());
        Ext.getCmp(prototype.id + '-de-Pnr').setValue(data.A2537PNR.trim());
        Ext.getCmp(prototype.id + '-de-Iata').setValue(data.A2537IATA.trim());
        Ext.getCmp(prototype.id + '-de-NameAgency').setValue(data.A2537AGENT.trim());
        Ext.getCmp(prototype.id + '-de-Agent').setValue(data.A2537NAGEN.trim());
        Ext.getCmp(prototype.id + '-de-NPax').setValue(data.A2537NUPAX.trim());
        Ext.getCmp(prototype.id + '-de-NamePax').setValue(data.A2537NPAX.trim());
        Ext.getCmp(prototype.id + '-de-Route').setValue(data.A2537RUTA.trim());
        Ext.getCmp(prototype.id + '-de-Classe').setValue(data.A2537CLASE.trim());
        Ext.getCmp(prototype.id + '-de-RateAppli').setValue(data.A2537FAPP.trim());
        Ext.getCmp(prototype.id + '-de-RatePay').setValue(data.A2537TPAY.trim());
        Ext.getCmp(prototype.id + '-de-CurPay').setValue(data.A2537MPAY.trim());
        Ext.getCmp(prototype.id + '-de-RateLower').setValue(data.A2537FREB.trim());
        Ext.getCmp(prototype.id + '-de-CurLower').setValue(data.A2537MREB.trim());
        Ext.getCmp(prototype.id + '-de-CodeWaiver').setValue(data.A2537CWAIV.trim());
        Ext.getCmp(prototype.id + '-de-AppliSale').setValue(data.A2537APPS.trim());
        Ext.getCmp(prototype.id + '-de-AppliRfnd').setValue(data.A2537APPR.trim());
        Ext.getCmp(prototype.id + '-de-AppliExch').setValue(data.A2537APPE.trim());
        Ext.getCmp(prototype.id + '-de-AcctionWaiver').setValue(data.A2537ACTW.trim());
        Ext.getCmp(prototype.id + '-de-lbldescri').setValue(data.A2537DESC.trim());
        Ext.getCmp(prototype.id + '-de-lbldescri').setValue(data.A2537DESC.trim());
        meDe.A2537KEY = data.A2537KEY;
        meDe.A2537ID = data.A2537ID;

        Ext.getCmp(prototype.id + '-de-RequestDate').setValue(data.A2537DSOLI.substr(0, 4) + '/' + data.A2537DSOLI.substr(4, 2) + '/' + data.A2537DSOLI.substr(6, 2));
        Ext.getCmp(prototype.id + '-de-RfndDate').setValue(data.A2537DRFND.substr(0, 4) + '/' + data.A2537DRFND.substr(4, 2) + '/' + data.A2537DRFND.substr(6, 2));
        Ext.getCmp(prototype.id + '-de-EmissionDate').setValue(data.A2537DEMI.substr(0, 4) + '/' + data.A2537DEMI.substr(4, 2) + '/' + data.A2537DEMI.substr(6, 2));
        Ext.getCmp(prototype.id + '-de-FlownDate').setValue(data.A2537DVOL.substr(0, 4) + '/' + data.A2537DVOL.substr(4, 2) + '/' + data.A2537DVOL.substr(6, 2));


        Ext.getCmp(prototype.id + '-de-txtREGIS').setValue(data.A2537INGRE.trim());
        Ext.getCmp(prototype.id + '-de-txtFREGI').setValue(data.A2537FINGR.trim());
        Ext.getCmp(prototype.id + '-de-txtHREGI').setValue(data.A2537HINGR.trim());
        Ext.getCmp(prototype.id + '-de-txtREVIS').setValue(data.A2537MODIF.trim());
        Ext.getCmp(prototype.id + '-de-txtFREVI').setValue(data.A2537FMODI.trim());
        Ext.getCmp(prototype.id + '-de-txtHREVI').setValue(data.A2537HMODI.trim());


    },
    getDataEntryValues: function(strOption) {

        meDe.bean = {};
        meDe.bean.VP_FILTER = strOption;
        meDe.bean.A2537CNTRY = Ext.getCmp(prototype.id + '-de-Country').getValue();
        meDe.bean.A2537CCUST = Ext.getCmp(prototype.id + '-de-txtCia').getValue();
        meDe.bean.A2537FORMA = Ext.getCmp(prototype.id + '-de-txtFrmaSerie').getValue().substring(0, 4);
        meDe.bean.A2537SERIE = Ext.getCmp(prototype.id + '-de-txtFrmaSerie').getValue().substring(4, 10);
        meDe.bean.A2537TCODE = Ext.getCmp(prototype.id + '-de-TourCode').getValue();
        meDe.bean.A2537PNR = Ext.getCmp(prototype.id + '-de-Pnr').getValue();
        meDe.bean.A2537IATA = Ext.getCmp(prototype.id + '-de-Iata').getValue();
        meDe.bean.A2537AGENT = Ext.getCmp(prototype.id + '-de-NameAgency').getValue();
        meDe.bean.A2537NAGEN = Ext.getCmp(prototype.id + '-de-Agent').getValue();
        meDe.bean.A2537NUPAX = Ext.getCmp(prototype.id + '-de-NPax').getValue();
        meDe.bean.A2537NPAX = Ext.getCmp(prototype.id + '-de-NamePax').getValue();
        meDe.bean.A2537RUTA = Ext.getCmp(prototype.id + '-de-Route').getValue();
        meDe.bean.A2537CLASE = Ext.getCmp(prototype.id + '-de-Classe').getValue();
        meDe.bean.A2537FAPP = Ext.getCmp(prototype.id + '-de-RateAppli').getValue();
        meDe.bean.A2537MAPP = Ext.getCmp(prototype.id + '-de-CurAppli').getValue();
        meDe.bean.A2537TPAY = Ext.getCmp(prototype.id + '-de-RatePay').getValue();
        meDe.bean.A2537MPAY = Ext.getCmp(prototype.id + '-de-CurPay').getValue();
        meDe.bean.A2537FREB = Ext.getCmp(prototype.id + '-de-RateLower').getValue();
        meDe.bean.A2537MREB = Ext.getCmp(prototype.id + '-de-CurLower').getValue();
        meDe.bean.A2537CWAIV = Ext.getCmp(prototype.id + '-de-CodeWaiver').getValue();
        meDe.bean.A2537APPS = Ext.getCmp(prototype.id + '-de-AppliSale').getValue();
        meDe.bean.A2537APPR = Ext.getCmp(prototype.id + '-de-AppliRfnd').getValue();
        meDe.bean.A2537APPE = Ext.getCmp(prototype.id + '-de-AppliExch').getValue();
        meDe.bean.A2537APPE = Ext.getCmp(prototype.id + '-de-AppliExch').getValue();
        meDe.bean.A2537ACTW = Ext.getCmp(prototype.id + '-de-AcctionWaiver').getValue();
        meDe.bean.A2537DESC = Ext.getCmp(prototype.id + '-de-lbldescri').getValue();
        meDe.bean.A2537KEY = meDe.A2537KEY;
        meDe.bean.A2537ID = meDe.A2537ID;

        meDe.bean.A2537DSOLI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-RequestDate').getValue(), 'Ymd');
        meDe.bean.A2537DRFND = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-RfndDate').getValue(), 'Ymd');
        meDe.bean.A2537DEMI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-EmissionDate').getValue(), 'Ymd');
        meDe.bean.A2537DVOL = Ext.util.Format.date(Ext.getCmp(prototype.id + '-de-FlownDate').getValue(), 'Ymd');

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
            url: this.url + '/mantenimientoWaiver',
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


        if (params.A2537DSOLI === '') {
            mensaje = 'Required Field, Request Date';
            Ext.getCmp(prototype.id + '-de-RequestDate').focus();
            return mensaje;
        }

        return mensaje;

    }


});


