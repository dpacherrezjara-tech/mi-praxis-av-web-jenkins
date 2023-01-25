/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.flown.PassengerConciliation.DataEntryPassengerConciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/PassengerConciliation',
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
                //Ext.getCmp(prototype.id + '-btn-save').show();
                break;
            case 'U':
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                this.getDataInputs();
                this.view.setHeight(this.view.getHeight());
                break;
        }
        // global.AccessControlMaganer();
    },
    setStoreData: function() {

        var cmbFSTAPO = Ext.getCmp(prototype.id + '-cmbFSTAPO');
        cmbFSTAPO.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["1", "Pending"],
                ["2", "Valued"],
                ["3", "Closed"]

            ]}));
        cmbFSTAPO.setValue("1");
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
            url: prototype.url + '/searchBean',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: paramsIN,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var rec = res.bean;

                console.log(rec);
                meDE.showDataInputs(rec);

                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },
    showDataInputs: function(rec) {

        if (rec.DFLIGHT.trim() === '' && rec.NFLIGHT.trim() === '' && rec.CDEPART.trim() === '' && rec.CARRIVA.trim() === '') {
            global.Msg({
                msg: 'Record not found'
            });
        } else {
            var total = rec.QCPNVC + rec.QCPNOCR + rec.QCPNMA;
            var total2 = rec.QCPNON + rec.QCPNOAL + rec.QCPCFRE;
            var total3 = rec.QCPCABY + rec.QCPCABF;
            var total4 = rec.QCPAD + rec.QCPCHD + rec.QCPINF;
            Ext.getCmp(prototype.id + '-txtCARRI').setValue(rec.CARRI.trim());
            Ext.getCmp(prototype.id + '-txtCDEPART').setValue(rec.CDEPART.trim());
            Ext.getCmp(prototype.id + '-txtCARRIVA').setValue(rec.CARRIVA.trim());
            Ext.getCmp(prototype.id + '-txtNFLIGHT').setValue(rec.NFLIGHT.trim());
            Ext.getCmp(prototype.id + '-txtZONE').setValue(rec.ZONE.trim());
            Ext.getCmp(prototype.id + '-txtLEGSEQ').setValue(rec.LEGSEQ.trim());
            Ext.getCmp(prototype.id + '-txtDFLIGHT').setValue(rec.DFLIGHT.trim());
            Ext.getCmp(prototype.id + '-txtQCPNVC').setValue(rec.QCPNVC);
            Ext.getCmp(prototype.id + '-txtQCPNON').setValue(rec.QCPNON);
            Ext.getCmp(prototype.id + '-txtQCPNOAL').setValue(rec.QCPNOAL);
            Ext.getCmp(prototype.id + '-txtQCPNMA').setValue(rec.QCPNMA);
            Ext.getCmp(prototype.id + '-txtQCPNOCR').setValue(rec.QCPNOCR);
            Ext.getCmp(prototype.id + '-txtQCPNFRE').setValue(rec.QCPCFRE);
            Ext.getCmp(prototype.id + '-txtQCPCABY').setValue(rec.QCPCABY);
            Ext.getCmp(prototype.id + '-txtQCPCABF').setValue(rec.QCPCABF);
            Ext.getCmp(prototype.id + '-txtQCPAD').setValue(rec.QCPAD);
            Ext.getCmp(prototype.id + '-txtQCPCHD').setValue(rec.QCPCHD);
            Ext.getCmp(prototype.id + '-txtQCPINF').setValue(rec.QCPINF);
            Ext.getCmp(prototype.id + '-txtTotal').setValue(total);
            Ext.getCmp(prototype.id + '-txtTotal2').setValue(total2);
            Ext.getCmp(prototype.id + '-txtTotal3').setValue(total3);
            Ext.getCmp(prototype.id + '-txtTotal4').setValue(total4);
            Ext.getCmp(prototype.id + '-txtFCLOSE').setValue(rec.FCLOSE.trim());
            Ext.getCmp(prototype.id + '-txtQCPNVAL').setValue(rec.QCPNVAL);
            Ext.getCmp(prototype.id + '-cmbFSTAPO').setValue(rec.FSTAPO);
            Ext.getCmp(prototype.id + '-txtUSCR').setValue(rec.USCR.trim());
            Ext.getCmp(prototype.id + '-txtFECR').setValue(rec.FECR.trim());
            Ext.getCmp(prototype.id + '-txtHOCR').setValue(rec.HOCR.trim());
            Ext.getCmp(prototype.id + '-txtUSUP').setValue(rec.USUP.trim());
            Ext.getCmp(prototype.id + '-txtFEUP').setValue(rec.FEUP.trim());
            Ext.getCmp(prototype.id + '-txtHOUP').setValue(rec.HOUP.trim());
        }
    }

});


