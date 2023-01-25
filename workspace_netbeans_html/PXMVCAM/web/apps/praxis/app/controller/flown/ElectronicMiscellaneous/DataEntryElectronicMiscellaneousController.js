/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.flown.ElectronicMiscellaneous.DataEntryElectronicMiscellaneousController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/ElectronicMiscellaneous',
    id: prototype.id + '-controller',  
    meDE: '',
    init: function(view) {
        meDE = this;

    },
    afterRender: function() {
        this.setStoreData();
        this.p = this.view.params;
        switch (this.p.action) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-save').show();
                break;
            case 'U':
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-update').show();
                this.getDataInputs();
                this.disabledField();
                this.view.setHeight(this.view.getHeight());
                break;
        }
        // global.AccessControlMaganer();
    },
    setStoreData: function() {
        var cmbTEMD = Ext.getCmp(prototype.id + '-cmbTEMD');
        var cmbSTVAL = Ext.getCmp(prototype.id + '-cmbSTVAL');
        var cmbTOPER = Ext.getCmp(prototype.id + '-cmbTOPER');
        var cmbFSTAPO = Ext.getCmp(prototype.id + '-cmbFSTAPO');
        var cmbFFLOW = Ext.getCmp(prototype.id + '-cmbFFLOW');


        cmbTEMD.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["S", "Stand Alone"],
                ["A", "Use Companion"],
                ["H", "Miscellaneous"]
            ]}));
        cmbTEMD.setValue("");
        cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["1", "Stand By"],
                ["2", "On Process"],
                ["3", "Closed"]
            ]}));
        cmbSTVAL.setValue("");
        cmbTOPER.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["D", "Domestic"],
                ["I", "International"]

            ]}));
        cmbTOPER.setValue("");
        cmbFFLOW.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["P", "Scheduled"],
                ["C", "Charter"],
                ["X", "Canceled"],
                ["U", "Unscheduled"]

            ]}));
        cmbFFLOW.setValue("");
        cmbFSTAPO.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["1", "Pending"],
                ["2", "Valorizado"]


            ]}));
        cmbFSTAPO.setValue("");
    },
    disabledField: function() {
        Ext.getCmp(prototype.id + '-txtCDEPART').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtCARRIVA').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtDFLIGHT').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtNFLIGHT').setReadOnly(true);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onSaveClick: function() {
        var fieldsValues = {};
        fieldsValues = this.getDataEntryValues();
        var mensaje = this.validationFields(fieldsValues);

        if (mensaje.trim() === '') {
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
        } else {
            global.Msg({
                msg: mensaje
            });
        }
    },
    onUpdateClick: function(btn) {
        //var p = this.view.params;

        var fieldsValues = {};
        fieldsValues = this.getDataEntryValues();
        var mensaje = this.validationFields(fieldsValues);


        if (mensaje.trim() === '') {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.p.action = "U";
                        this.crud();
                    }
                }
            });
        } else {
            global.Msg({
                msg: mensaje
            });
        }

    },
    getDataEntryValues: function() {

        var CDEPART = Ext.getCmp(prototype.id + '-txtCDEPART').getValue().toUpperCase();
        var CARRIVA = Ext.getCmp(prototype.id + '-txtCARRIVA').getValue().toUpperCase();
        var ZONA = Ext.getCmp(prototype.id + '-txtZONE').getValue().toUpperCase();
        var NFLIGHT = Ext.getCmp(prototype.id + '-txtNFLIGHT').getValue();
        NFLIGHT = global.fillZero(NFLIGHT, 4);
        var FFLOW = Ext.getCmp(prototype.id + '-cmbFFLOW').getValue();
        var FSTAPO = Ext.getCmp(prototype.id + '-cmbFSTAPO').getValue();
        var STVAL = Ext.getCmp(prototype.id + '-cmbSTVAL').getValue();
        var TEMD = Ext.getCmp(prototype.id + '-cmbTEMD').getValue();
        var TOPER = Ext.getCmp(prototype.id + '-cmbTOPER').getValue();
        var QCPNEMD = Ext.getCmp(prototype.id + '-txtQCPNEMD').getValue();
        var QCPNSTAS = Ext.getCmp(prototype.id + '-txtQCPNSTAS').getValue();
        var QCPNUSEA = Ext.getCmp(prototype.id + '-txtQCPNUSEA').getValue();
        var QCPNVAL = Ext.getCmp(prototype.id + '-txtQCPNVAL').getValue();
        var QCPNOTHE = Ext.getCmp(prototype.id + '-txtQCPNOTHE').getValue();
        var DFLIGHT = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtDFLIGHT').getValue(), 'Ymd');
        var FCLOSE = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFCLOSE').getValue(), 'Ymd');
        var FSENDEM = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFSENDEM').getValue(), 'Ymd');


        if (QCPNOTHE.trim() === '') {
            QCPNOTHE = 0;
        }
        if (QCPNEMD.trim() === '') {
            QCPNEMD = 0;
        }
        if (QCPNSTAS.trim() === '') {
            QCPNSTAS = 0;
        }
        if (QCPNUSEA.trim() === '') {
            QCPNUSEA = 0;
        }
        if (QCPNVAL.trim() === '') {
            QCPNVAL = 0;
        }
        if (DFLIGHT === null) {
            DFLIGHT = '';
        }
        if (FCLOSE === null) {
            FCLOSE = '';
        }
        if (FSENDEM === null) {
            FSENDEM = '';
        }

        return {
            strOption: this.p.action,
            cmpDFLIGHT: Ext.getCmp(prototype.id + '-txtDFLIGHT'),
            cmpFCLOSE: Ext.getCmp(prototype.id + '-txtFCLOSE'),
            cmpFSENDEM: Ext.getCmp(prototype.id + '-txtFSENDEM'),
            CDEPART: CDEPART,
            CARRIVA: CARRIVA,
            ZONA: ZONA,
            NFLIGHT: NFLIGHT,
            DFLIGHT: DFLIGHT,
            FCLOSE: FCLOSE,
            FSENDEM: FSENDEM,
            FFLOW: FFLOW,
            FSTAPO: FSTAPO,
            STVAL: STVAL,
            TEMD: TEMD,
            TOPER: TOPER,
            QCPNEMD: QCPNEMD,
            QCPNSTAS: QCPNSTAS,
            QCPNUSEA: QCPNUSEA,
            QCPNVAL: QCPNVAL,
            QCPNOTHE: QCPNOTHE
        };

    },
    validationFields: function(bean) {

        var msjResult = "";
        if (bean.CDEPART === '') {
            msjResult = "A Departure City is required.";
            return msjResult;
        }
        if (bean.CARRIVA === '') {
            msjResult = "An Arrival City is required.";
            return msjResult;
        }
        if (bean.NFLIGHT === '') {
            msjResult = "A Flight Number is required.";
            return msjResult;
        }
        if (bean.DFLIGHT === '') {
            msjResult = "A Flight Date is required.";
            return msjResult;
        }

        if (bean.CDEPART.length !== 3) {
            msjResult = "Invalid Departure City.";
            return msjResult;
        }
        if (bean.CARRIVA.length !== 3) {
            msjResult = "Invalid Arrival City.";
            return msjResult;
        }

        if (!bean.cmpDFLIGHT.isValid()) {
            msjResult = "Invalid Flight Date.";
            return msjResult;
        }
        if (!bean.cmpFCLOSE.isValid()) {
            msjResult = "Invalid Close Date.";
            return msjResult;
        }
        if (!bean.cmpFSENDEM.isValid()) {
            msjResult = "Invalid Sending Date.";
            return msjResult;
        }




        return msjResult;
    },
    crud: function() {
        Ext.Ajax.request({
            url: this.url + '/maintenanceA1817',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: this.getDataEntryValues(),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msj = res.msj;
                global.Msg({
                    msg: msj,
                    icon: 1,
                    fn: function() {
                        //exito
                        Ext.getCmp(prototype.id + '-dataEntry').close();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },
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
                    this.p.action = "D";
                    this.crud();
                }
            }
        });
    },
    onCancelClick: function(btn) {
        Ext.getCmp(prototype.id + '-dataEntry').close();
    },
    getDataInputs: function() {
        var rec = this.p.rec.data;
        var paramsIN = {
            DFLIGHT: rec.DFLIGHT,
            NFLIGHT: rec.NFLIGHT,
            CDEPART: rec.CDEPART,
            CARRIVA: rec.CARRIVA
        };
        Ext.Ajax.request({
            url: prototype.url + '/searchCompleteInfo',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: paramsIN,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var rec = res.beanConsTkt;

                meDE.showDataInputs(rec);

                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },
    showDataInputs: function(rec) {

        Ext.getCmp(prototype.id + '-txtCDEPART').setValue(rec.CDEPART.trim());
        Ext.getCmp(prototype.id + '-txtCARRIVA').setValue(rec.CARRIVA.trim());
        Ext.getCmp(prototype.id + '-txtZONE').setValue(rec.ZONA.trim());
        Ext.getCmp(prototype.id + '-txtNFLIGHT').setValue(rec.NFLIGHT.trim());
        Ext.getCmp(prototype.id + '-txtDFLIGHT').setValue(rec.DFLIGHT.trim());
        Ext.getCmp(prototype.id + '-cmbSTVAL').setValue(rec.STVAL.trim());
        Ext.getCmp(prototype.id + '-cmbFFLOW').setValue(rec.FFLOW.trim());
        Ext.getCmp(prototype.id + '-cmbTOPER').setValue(rec.TOPER.trim());
        Ext.getCmp(prototype.id + '-cmbTEMD').setValue(rec.TEMD.trim());
        Ext.getCmp(prototype.id + '-cmbFSTAPO').setValue(rec.FSTAPO.trim());
        Ext.getCmp(prototype.id + '-txtFCLOSE').setValue(rec.FCLOSE.trim());
        Ext.getCmp(prototype.id + '-txtFSENDEM').setValue(rec.FSENDEM.trim());

        Ext.getCmp(prototype.id + '-txtQCPNVAL').setValue(rec.QCPNVAL);
        Ext.getCmp(prototype.id + '-txtQCPNOTHE').setValue(rec.QCPNOTHE);
        Ext.getCmp(prototype.id + '-txtQCPNSTAS').setValue(rec.QCPNSTAS);
        Ext.getCmp(prototype.id + '-txtQCPNUSEA').setValue(rec.QCPNUSEA);
        Ext.getCmp(prototype.id + '-txtQCPNEMD').setValue(rec.QCPNEMD);

        Ext.getCmp(prototype.id + '-txtUSCR').setValue(rec.USCR.trim());
        Ext.getCmp(prototype.id + '-txtFECR').setValue(rec.FECR.trim());
        Ext.getCmp(prototype.id + '-txtHOCR').setValue(rec.HOCR.trim());
        Ext.getCmp(prototype.id + '-txtUSUP').setValue(rec.USUP.trim());
        Ext.getCmp(prototype.id + '-txtFEUP').setValue(rec.FEUP.trim());
        Ext.getCmp(prototype.id + '-txtHOUP').setValue(rec.HOUP.trim());

    }
});


