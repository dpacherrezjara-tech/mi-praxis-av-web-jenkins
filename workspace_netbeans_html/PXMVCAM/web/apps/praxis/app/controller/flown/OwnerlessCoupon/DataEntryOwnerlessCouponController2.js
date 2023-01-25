

Ext.define('Ext.Praxis.controller.flown.OwnerlessCoupon.DataEntryOwnerlessCouponController2', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController2',
    url: CONTEXTPATH + '/OwnerlessCoupon',
    searchParams: {},
    p: {},
    init: function(view) {
        var me = this;

    },
    onQtyCouponsClick: function() {
        var option = Ext.getCmp(prototype.id2 + '-txtDESCRIP');
        if (option.isVisible()) {
            option.setVisible(false);
            Ext.getCmp(prototype.id2 + '-txtA1691-DESCRIP-label').setVisible(false);
        } else {
            option.setVisible(true);
            Ext.getCmp(prototype.id2 + '-txtA1691-DESCRIP-label').setVisible(true);
        }
    },
    beforeRender:function(){
        console.log("Antes de renderizar");
        this.p = this.view.params;
        this.setDataStore();
        switch (this.p.action) {
            case 'U':
                this.getDataInputs();
                break;
        }
    },
    afterRender: function() {
        this.p = this.view.params;
        this.setDataStore();
        switch (this.p.action) {
            case 'U':
                this.getDataInputs();
                break;
        }
        // global.AccessControlMaganer();
    },
    setDataStore: function() {

        var cmbSTVAL = Ext.getCmp(prototype.id2 + '-cmbSTVAL');
        cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["2", "In process"],
                ["3", "Conciliation"],
                ["4", "Closed"]

            ]}));

        var cmbFSTASS = Ext.getCmp(prototype.id2 + '-cmbFSTASS');
        cmbFSTASS.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Stand By"],
                ["1", "Received"]

            ]}));
        var cmbFFLOW = Ext.getCmp(prototype.id2 + '-cmbFFLOW');
        cmbFFLOW.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["P", "Scheduled"],
                ["U", "Unscheduled"],
                ["C", "Charter"],
                ["X", "Canceled"]


            ]}));

        var cmbTOPER = Ext.getCmp(prototype.id2 + '-cmbTOPER');
        cmbTOPER.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["D", "Domestic"],
                ["I", "International"]

            ]}));

        var cmbFSTAOD = Ext.getCmp(prototype.id2 + '-cmbFSTAOD');
        cmbFSTAOD.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Stand By"],
                ["1", "Received"]

            ]}));

        var cmbFSTAVC = Ext.getCmp(prototype.id2 + '-cmbFSTAVC');
        cmbFSTAVC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Stand By"],
                ["1", "Received"]

            ]}));
        var cmbFSTAPO = Ext.getCmp(prototype.id2 + '-cmbFSTAPO');
        cmbFSTAPO.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["1", "Pending"],
                ["2", "Valued"],
                ["3", "Closed"]
            ]}));
        var cmbFSTAFI = Ext.getCmp(prototype.id2 + '-cmbFSTAFI');
        cmbFSTAFI.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Stand By"],
                ["1", "Received"]
            ]}));




    }

    ,
    onPrevClick: function() {
        var all = this.p.all;
        var rec;
        var rowIndex = this.p.rowIndex;
        if (this.p.rowIndex > 0) {
            console.log("Entro 1");
            rec = all.getAt(rowIndex - 1);
            this.p = {action: "U", rec: rec, all: this.p.all, rowIndex: rowIndex - 1};
            this.getDataInputs();
        }
    },
    onNextClick: function() {
        var all = this.p.all;
        var rec;
        var rowIndex = this.p.rowIndex;
        if (this.p.rowIndex < 19) {
            console.log("Entro 2");
            rec = all.getAt(rowIndex + 1);
            this.p = {action: "U", rec: rec, all: this.p.all, rowIndex: rowIndex + 1};
            this.getDataInputs();
        }
    }

    ,
    getDataInputs: function() {

        var rec = this.p.rec;
        var DFLIGHT = rec.get('DFLIGHT');
        var NFLIGHT = rec.get('NFLIGHT');
        var CDEPART = rec.get('CDEPART');
        var CARRIVA = rec.get('CARRIVA');

        console.log(" ---> DFLIGHT : " + rec.get('DFLIGHT'));
        console.log(" ---> NFLIGHT : " + rec.get('NFLIGHT'));
        console.log(" ---> CDEPART : " + rec.get('CDEPART'));
        console.log(" ---> CARRIVA : " + rec.get('CARRIVA'));


        Ext.Ajax.request({
            url: prototype.url + '/searchBeanCarr',
            method: 'POST',
            timeout: 60000000,
            
            params: {
                DFLIGHT: DFLIGHT,
                NFLIGHT: NFLIGHT,
                CDEPART: CDEPART,
                CARRIVA: CARRIVA
            },
            success: function(response, options) {
                var resp = Ext.JSON.decode(response.responseText);


                Ext.getCmp(prototype.id2 + '-txtDFLIGHT').setValue(resp.beanCons.DFLIGHT);
                Ext.getCmp(prototype.id2 + '-txtNFLIGHT').setValue(resp.beanCons.NFLIGHT);
                Ext.getCmp(prototype.id2 + '-cmbSTVAL').setValue(resp.beanCons.STVAL);
                Ext.getCmp(prototype.id2 + '-txtCDEPART').setValue(resp.beanCons.CDEPART);
                Ext.create('Ext.tip.ToolTip', {
                    target: prototype.id2 + '-txtCDEPART',
                    html: resp.beanCons.strDescCDEPART
                });    

                Ext.getCmp(prototype.id2 + '-txtCARRIVA').setValue(resp.beanCons.CARRIVA);
                 Ext.create('Ext.tip.ToolTip', {
                    target: prototype.id2 + '-txtCARRIVA',
                    html: resp.beanCons.strDescCARRIVA
                });
                
                Ext.getCmp(prototype.id2 + '-txtZONE').setValue(resp.beanCons.ZONE);
                Ext.getCmp(prototype.id2 + '-txtCARRI').setValue(resp.beanCons.CARRI);
                Ext.getCmp(prototype.id2 + '-txtLEGSEQ').setValue(resp.beanCons.LEGSEQ);
                Ext.getCmp(prototype.id2 + '-txtFSENDSS').setValue(resp.beanCons.FSENDSS);
                Ext.getCmp(prototype.id2 + '-cmbFSTASS').setValue(resp.beanCons.FSTASS);
                Ext.getCmp(prototype.id2 + '-cmbFFLOW').setValue(resp.beanCons.FFLOW);
                Ext.getCmp(prototype.id2 + '-txtNPLANE').setValue(resp.beanCons.NPLANE);
                Ext.getCmp(prototype.id2 + '-cmbTOPER').setValue(resp.beanCons.TOPER);
                Ext.getCmp(prototype.id2 + '-txtDESCRIP').setValue(resp.beanCons.strDescripcion);
                Ext.getCmp(prototype.id2 + '-txtFSENDOD').setValue(resp.beanCons.FSENDOD);
                Ext.getCmp(prototype.id2 + '-txtQCPNOD').setValue(resp.beanCons.QCPNOD);
                Ext.getCmp(prototype.id2 + '-cmbFSTAOD').setValue(resp.beanCons.FSTAOD);
                Ext.getCmp(prototype.id2 + '-txtFOPERZUL').setValue(resp.beanCons.FOPERZUL);
                Ext.getCmp(prototype.id2 + '-txtQCPTRA').setValue(resp.beanCons.QCPTRA);
                Ext.getCmp(prototype.id2 + '-txtFSENDVC').setValue(resp.beanCons.FSENDVC);
                Ext.getCmp(prototype.id2 + '-txtQCPNVC').setValue(resp.beanCons.QCPNVC);
                Ext.getCmp(prototype.id2 + '-cmbFSTAVC').setValue(resp.beanCons.FSTAVC);
                Ext.getCmp(prototype.id2 + '-txtQCPNOCR').setValue(resp.beanCons.QCPNOCR);
                Ext.getCmp(prototype.id2 + '-txtQCPNMA').setValue(resp.beanCons.QCPNMA);
                Ext.getCmp(prototype.id2 + '-txtQCPNTOT').setValue(resp.beanCons.QCPNTOT);

                Ext.getCmp(prototype.id2 + '-txtFCLOSE').setValue(resp.beanCons.FCLOSE);
                Ext.getCmp(prototype.id2 + '-txtQCPNVAL').setValue(resp.beanCons.QCPNVAL);
                Ext.getCmp(prototype.id2 + '-cmbFSTAPO').setValue(resp.beanCons.FSTAPO);
                Ext.getCmp(prototype.id2 + '-txtFSENDFI').setValue(resp.beanCons.FSENDFI);
                Ext.getCmp(prototype.id2 + '-txtQCPNFI').setValue(resp.beanCons.QCPNFI);
                Ext.getCmp(prototype.id2 + '-cmbFSTAFI').setValue(resp.beanCons.FSTAFI);

                Ext.getCmp(prototype.id2 + '-txtLOCDEP').setValue(resp.beanCons.LOCDEP);
                Ext.getCmp(prototype.id2 + '-txtLOCARR').setValue(resp.beanCons.LOCARR);
                Ext.getCmp(prototype.id2 + '-txtUTCDEP').setValue(resp.beanCons.UTCDEP);
                Ext.getCmp(prototype.id2 + '-txtUTCARR').setValue(resp.beanCons.UTCARR);



                Ext.getCmp(prototype.id2 + '-txt-USCR').setValue(resp.beanCons.USCR);
                Ext.getCmp(prototype.id2 + '-txt-FECR').setValue(resp.beanCons.FECR);
                Ext.getCmp(prototype.id2 + '-txt-HOCR').setValue(resp.beanCons.HOCR);
                Ext.getCmp(prototype.id2 + '-txt-USUP').setValue(resp.beanCons.USUP);
                Ext.getCmp(prototype.id2 + '-txt-FEUP').setValue(resp.beanCons.FEUP);
                Ext.getCmp(prototype.id2 + '-txt-HOUP').setValue(resp.beanCons.HOUP);



            },
            failure: function(form, action) {
                if (action.failureType === 'server') {
                    obj = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.alert('Server Error!', obj.msg);
                } else {
                    Ext.Msg.alert('Warning!', action.response.responseText);
                }
            }
        });
    },
    onCancelClick: function(btn) {
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }


});