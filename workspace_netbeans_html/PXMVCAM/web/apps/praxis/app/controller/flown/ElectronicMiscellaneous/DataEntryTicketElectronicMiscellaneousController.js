/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.flown.ElectronicMiscellaneous.DataEntryTicketElectronicMiscellaneousController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryTicketController',
    url: CONTEXTPATH + '/ElectronicMiscellaneous',
    id: prototype.id + '-t' + '-controller',
    fechaHoy: new Date(),
    meDE_T: '',
    init: function(view) {
        meDE_T = this;
    },
    afterRender: function() {
        this.setStoreData();
        this.p = this.view.params;
        switch (this.p.action) {
            case 'I':
                Ext.getCmp(prototype.id + '-t' + '-btn-save').show();
                this.disabledField();//La version de flex lo mantiene asi
                break;
            case 'U':
                Ext.getCmp(prototype.id + '-t' + '-btn-update').show();
                Ext.getCmp(prototype.id + '-t' + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-t' + '-btn-cancel').show();
                this.getDataInputs();
//                this.disabledField();
                this.view.setHeight(this.view.getHeight());
                break;
        }
        // global.AccessControlMaganer();
    },
    onFocusLeaveOpe: function(obj) {
        console.log(obj.getValue());

        if (obj.getValue().trim() !== '5D' && obj.getValue().trim() !== 'AM') {
            Ext.getCmp(prototype.id + '-t' + '-txtCARR').setValue('');
        }
    },
    setStoreData: function() {
        var cmbTEMD = Ext.getCmp(prototype.id + '-t' + '-cmbTEMD');
        var cmbFLOAD = Ext.getCmp(prototype.id + '-t' + '-cmbFLOAD');
        var cmbSTVAL = Ext.getCmp(prototype.id + '-t' + '-cmbSTVAL');
        var cmbSTORG = Ext.getCmp(prototype.id + '-t' + '-cmbSTORG');
        var cmbTDOC = Ext.getCmp(prototype.id + '-t' + '-cmbTDOC');
        var cmbTVTA = Ext.getCmp(prototype.id + '-t' + '-cmbTVTA');
        var cmbTOPUS = Ext.getCmp(prototype.id + '-t' + '-cmbTOPUS');
        var cmbTPAX = Ext.getCmp(prototype.id + '-t' + '-cmbTPAX');
        var cmbFTE = Ext.getCmp(prototype.id + '-t' + '-cmbFTE');
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
        cmbFLOAD.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["M", "Manual"],
                ["1", "Load"]
            ]}));
        cmbFLOAD.setValue("");
        cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["0", "Hard Block"],
                ["1", "Pending"],
                ["2", "Valued"],
                ["3", "Closed"]
            ]}));
        cmbSTVAL.setValue("");
        cmbFTE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["B", "BSP"],
                ["A", "ARC"],
                ["S", "ASR"],
                ["T", "TCN"]
            ]}));
        cmbFTE.setValue("");
        cmbSTORG.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["1", "Interline"],
                ["2", "Online"]
            ]}));
        cmbSTORG.setValue("");
        cmbTDOC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["T", "Ticket"],
                ["E", "Excess"],
                ["M", "MCO"]
            ]}));
        cmbTDOC.setValue("");
        cmbTVTA.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["D", "Domestic"],
                ["I", "International"]

            ]}));
        cmbTVTA.setValue("");
        cmbTPAX.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["AD", "Adult"],
                ["CH", "Child"],
                ["IN", "Infant"]

            ]}));
        cmbTPAX.setValue("");
        cmbTOPUS.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["D", "Domestic"],
                ["I", "International"]

            ]}));
        cmbTOPUS.setValue("");
    },
    disabledField: function() {

        Ext.getCmp(prototype.id + '-t' + '-txtCDOC').setReadOnly(true);
        Ext.getCmp(prototype.id + '-t' + '-txtTicket').setReadOnly(true);
        Ext.getCmp(prototype.id + '-t' + '-txtPSVVTA').setReadOnly(true);
        Ext.getCmp(prototype.id + '-t' + '-txtAGTIA').setReadOnly(true);
        Ext.getCmp(prototype.id + '-t' + '-txtFVTA').disable(true);
        Ext.getCmp(prototype.id + '-t' + '-cmbTDOC').disable(true);
        Ext.getCmp(prototype.id + '-t' + '-cmbTVTA').disable(true);
        Ext.getCmp(prototype.id + '-t' + '-cmbTPAX').disable(true);
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

        var fieldsValues = {};
        fieldsValues = this.getDataEntryValues();

        console.log(fieldsValues);
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

        
        var rec = this.p.rec.data;
        
        var strTicket = Ext.getCmp(prototype.id + '-t' + '-txtTicket').getValue().trim() + Ext.getCmp(prototype.id + '-t' + '-txtCupon').getValue().trim();
        var CCIA = strTicket.substring(0, 3);
        var FORMA = strTicket.substring(3, 7);
        var SERIE = strTicket.substring(7, 13);
        var CUPON = rec.CUPON;
        var CUPONNEW = Ext.getCmp(prototype.id + '-t' + '-txtCupon').getValue().trim();
        var SEQ = Ext.getCmp(prototype.id + '-t' + '-txtSEQ').getValue().trim();
        var DCHEQ = Ext.getCmp(prototype.id + '-t' + '-txtDCHEQ').getValue().trim();
        var CDEPART = Ext.getCmp(prototype.id + '-t' + '-txtCDEPART').getValue().trim().toUpperCase();
        var CARRIVA = Ext.getCmp(prototype.id + '-t' + '-txtCARRIVA').getValue().trim().toUpperCase();
        var ZONA = Ext.getCmp(prototype.id + '-t' + '-txtZONE').getValue().trim().toUpperCase();
        var NFLIGHT = Ext.getCmp(prototype.id + '-t' + '-txtNFLIGHT').getValue().trim();
        NFLIGHT = global.fillZero(NFLIGHT, 4);
        var FECVAL = Ext.util.Format.date(Ext.getCmp(prototype.id + '-t' + '-txtFECVAL').getValue(), 'Ymd');
        var NPLANE = Ext.getCmp(prototype.id + '-t' + '-txtNPLANE').getValue().trim();
        var ITINERA = Ext.getCmp(prototype.id + '-t' + '-txtITINERA').getValue().trim();
        var LEGSEQ = Ext.getCmp(prototype.id + '-t' + '-txtLEGSEQ').getValue().trim();
        var FTE = Ext.getCmp(prototype.id + '-t' + '-cmbFTE').getValue().trim();
        var CDOC = Ext.getCmp(prototype.id + '-t' + '-txtCDOC').getValue().trim().toUpperCase();
        var TDOC = Ext.getCmp(prototype.id + '-t' + '-cmbTDOC').getValue().trim();
        var PSVVTA = Ext.getCmp(prototype.id + '-t' + '-txtPSVVTA').getValue().trim().toUpperCase();
        var AGTIA = Ext.getCmp(prototype.id + '-t' + '-txtAGTIA').getValue().trim().toUpperCase();
        var FVTA = Ext.util.Format.date(Ext.getCmp(prototype.id + '-t' + '-txtFVTA').getValue(), 'Ymd');
        var TVTA = Ext.getCmp(prototype.id + '-t' + '-cmbTVTA').getValue();
        var TPAX = Ext.getCmp(prototype.id + '-t' + '-cmbTPAX').getValue();
        var TOPUS = Ext.getCmp(prototype.id + '-t' + '-cmbTOPUS').getValue();
        var CARR = Ext.getCmp(prototype.id + '-t' + '-txtCARR').getValue().trim().toUpperCase();
        var CABI = Ext.getCmp(prototype.id + '-t' + '-txtCABI').getValue().trim().toUpperCase();
        var CLAS = Ext.getCmp(prototype.id + '-t' + '-txtCLAS').getValue().trim().toUpperCase();
        var FBASE = Ext.getCmp(prototype.id + '-t' + '-txtFBASE').getValue().trim().toUpperCase();
        var TEMD = Ext.getCmp(prototype.id + '-t' + '-cmbTEMD').getValue();
        var FLOAD = Ext.getCmp(prototype.id + '-t' + '-cmbFLOAD').getValue();
        var RECODE = Ext.getCmp(prototype.id + '-t' + '-txtRECODE').getValue().trim().toUpperCase();
        var TKTASO = Ext.getCmp(prototype.id + '-t' + '-txtTKTASO').getValue().trim();
        var FVAL = Ext.getCmp(prototype.id + '-t' + '-txtFVAL').getValue().trim();
        var IDCON = Ext.getCmp(prototype.id + '-t' + '-txtIDCON').getValue().trim();
        var MDACP = Ext.getCmp(prototype.id + '-t' + '-txtMDACP').getValue().trim();
        //Solo se usara para la validacion de las fechas
        var cmpFCONT = Ext.getCmp(prototype.id + '-t' + '-txtFCONT');
        var cmpDFLIGHT = Ext.getCmp(prototype.id + '-t' + '-txtDFLIGHT');
        var cmpFECVAL = Ext.getCmp(prototype.id + '-t' + '-txtFECVAL');
        var cmpFVTA = Ext.getCmp(prototype.id + '-t' + '-txtFVTA');
        //Fecha Contable (x ahora lo saca de la Fecha de Vuelo a pedido de ENS)
        var FCONT = Ext.util.Format.date(Ext.getCmp(prototype.id + '-t' + '-txtFCONT').getValue(), 'Ymd');
        var DFLIGHT = Ext.util.Format.date(Ext.getCmp(prototype.id + '-t' + '-txtDFLIGHT').getValue(), 'Ymd');
        if (FCONT === '' && DFLIGHT.length === 8) {
            FCONT = DFLIGHT.substring(0, 6);
        }
        //Valida el origen según la CIA.
        var STORG;
        var cia = strTicket.substring(0, 3);
        if (cia === '139') {
            STORG = '2';
            Ext.getCmp(prototype.id + '-t' + '-cmbSTORG').setValue('2');
        } else {
            STORG = '1';
            Ext.getCmp(prototype.id + '-t' + '-cmbSTORG').setValue('1');
        }
        var STVAL;
        if (this.p.action === 'I') {
            STVAL = '1';
            Ext.getCmp(prototype.id + '-t' + '-cmbSTVAL').setValue('1');
        } else {
            STVAL = Ext.getCmp(prototype.id + '-t' + '-cmbSTVAL').getValue();
        }
        //Si la secuencia está en blanco (Insert), coloca x defecto '00'
        if (SEQ.trim() === '') {
            SEQ = '00';
        }
        var VCPN = Ext.getCmp(prototype.id + '-t' + '-txtVCPN').getValue().trim();
        if (VCPN === '') {
            VCPN = 0;
        }
        var COMISI = Ext.getCmp(prototype.id + '-t' + '-txtCOMISI').getValue().trim();
        if (COMISI === '') {
            COMISI = 0;
        }
        var VTAX = Ext.getCmp(prototype.id + '-t' + '-txtVTAX').getValue().trim();
        if (VTAX === '') {
            VTAX = 0;
        }
        var VCPMX = Ext.getCmp(prototype.id + '-t' + '-txtVCPMX').getValue().trim();
        if (VCPMX === '') {
            VCPMX = 0;
        }
        var TCMUS = Ext.getCmp(prototype.id + '-t' + '-txtTCMUS').getValue().trim();
        if (TCMUS === '') {
            TCMUS = 0;
        }
        var VCPUS = Ext.getCmp(prototype.id + '-t' + '-txtVCPUS').getValue().trim();
        if (VCPUS === '') {
            VCPUS = 0;
        }

        return {
            strOption: this.p.action,
            strTicket: strTicket,
            CCIA: CCIA,
            FORMA: FORMA,
            SERIE: SERIE,
            CUPON: CUPON,
            CUPONNEW: CUPONNEW,
            SEQ: SEQ,
            DCHEQ: DCHEQ,
            CDEPART: CDEPART,
            CARRIVA: CARRIVA,
            ZONA: ZONA,
            FECVAL: FECVAL,
            NPLANE: NPLANE,
            ITINERA: ITINERA,
            LEGSEQ: LEGSEQ,
            FTE: FTE,
            CDOC: CDOC,
            TDOC: TDOC,
            PSVVTA: PSVVTA,
            AGTIA: AGTIA,
            FVTA: FVTA,
            TVTA: TVTA,
            TPAX: TPAX,
            TOPUS: TOPUS,
            CARR: CARR,
            CABI: CABI,
            CLAS: CLAS,
            FBASE: FBASE,
            TEMD: TEMD,
            FLOAD: FLOAD,
            RECODE: RECODE,
            TKTASO: TKTASO,
            FVAL: FVAL,
            IDCON: IDCON,
            MDACP: MDACP,
            cmpFCONT: cmpFCONT,
            cmpDFLIGHT: cmpDFLIGHT,
            cmpFECVAL: cmpFECVAL,
            cmpFVTA: cmpFVTA,
            FCONT: FCONT,
            DFLIGHT: DFLIGHT,
            STORG: STORG,
            STVAL: STVAL,
            VCPN: VCPN,
            COMISI: COMISI,
            VTAX: VTAX,
            VCPMX: VCPMX,
            TCMUS: TCMUS,
            VCPUS: VCPUS,
            NFLIGHT: NFLIGHT,
        };
    },
    validationFields: function(bean) {

        var rec = this.p.rec.data;
        var msjResult = "";

        if (bean.strTicket === '') {
            msjResult = "A Ticket number is required.";
            return msjResult;
        }
        if (bean.DCHEQ === '') {
            msjResult = "A Check Digit is required.";
            return msjResult;
        }
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
        if (bean.CABI === '') {
            msjResult = "Cabin field is required.";
            return msjResult;
        }
        if (bean.CLAS === '') {
            msjResult = "Class field is required.";
            return msjResult;
        }
        if (bean.FBASE === '') {
            msjResult = "Fare Basis field is required.";
            return msjResult;
        }
        if (bean.CARR === '') {
            msjResult = "Carrier is required.";
            return msjResult;
        }
        //Validación solicitada por ENS y ROSSANAR 20160706
        if ((bean.TKTASO.trim() !== rec.TKTASO.trim()) && bean.FLOAD !== "M") {
            msjResult = "The Associated Ticket has been changed. Please set Flag Load = Manual.";
            return msjResult;
        }
        if (bean.strTicket.length < 12) {
            msjResult = "Invalid Ticket Number.";
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
        if (!bean.cmpFECVAL.isValid()) {
            msjResult = "Invalid Value Date.";
            return msjResult;
        }
        var fechaHoy = Ext.util.Format.date(this.fechaHoy, 'Ymd');

        if (msjResult.trim() === '') {
            if (parseInt(bean.FVTA) > parseInt(bean.DFLIGHT)) {
                msjResult = "Sales Date cannot be higher than Flight Date";
                return msjResult;
            } else {
                if (parseInt(bean.FVTA) > parseInt(fechaHoy)) {
                    msjResult = "Sales Date cannot be higher than Current Date";
                    return msjResult;
                }
                if (parseInt(bean.DFLIGHT) > parseInt(fechaHoy)) {
                    msjResult = "Flight Date cannot be higher than Current Date";
                    return msjResult;
                }
            }
        }

        return msjResult;
    },
    crud: function() {
        Ext.Ajax.request({
            url: this.url + '/executeOptionTkt',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryTicket').mask('Loading...'),
            params: this.getDataEntryValues(),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msj = res.msj;
                global.Msg({
                    msg: msj,
                    icon: 1,
                    fn: function() {
                        //exito
                        Ext.getCmp(prototype.id + '-dataEntryTicket').close();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
                Ext.getCmp(prototype.id + '-dataEntryTicket').unmask();
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
        Ext.getCmp(prototype.id + '-dataEntryTicket').close();
    },
    getDataInputs: function() {
        var rec = this.p.rec.data;
        var paramsIN = {
            CCIA: rec.CCIA,
            FORMA: rec.FORMA,
            SERIE: rec.SERIE,
            CUPON: rec.CUPON,
            SEQ: rec.SEQ
        };
        Ext.Ajax.request({
            url: prototype.url + '/searcheEntyTKT',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryTicket').mask('Loading...'),
            params: paramsIN,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var rec = res.beanConsTkt;
                meDE_T.showDataInputs(rec);
                Ext.getCmp(prototype.id + '-dataEntryTicket').unmask();
            }
        });
    },
    showDataInputs: function(rec) {
        
        Ext.getCmp(prototype.id + '-t' + '-txtTicket').setValue(rec.strTicket.trim());
        Ext.getCmp(prototype.id + '-t' + '-txtRoll').setValue(rec.SEQRO.trim());
        Ext.getCmp(prototype.id + '-t' + '-txtCupon').setValue(rec.CUPON.trim());
        Ext.getCmp(prototype.id + '-t' + '-txtDCHEQ').setValue(rec.DCHEQ.trim());
        Ext.getCmp(prototype.id + '-t' + '-txtSEQ').setValue(rec.SEQ.trim());
        Ext.getCmp(prototype.id + '-t' + '-txtFCONT').setValue(rec.FCONT.trim());
        Ext.getCmp(prototype.id + '-t' + '-txtCDEPART').setValue(rec.CDEPART.trim());
        Ext.getCmp(prototype.id + '-t' + '-txtCARRIVA').setValue(rec.CARRIVA.trim());
        Ext.getCmp(prototype.id + '-t' + '-txtZONE').setValue(rec.ZONA.trim());
        Ext.getCmp(prototype.id + '-t' + '-txtNFLIGHT').setValue(rec.NFLIGHT);
        Ext.getCmp(prototype.id + '-t' + '-txtDFLIGHT').setValue(rec.DFLIGHT);
        Ext.getCmp(prototype.id + '-t' + '-txtFECVAL').setValue(rec.FECVAL);
        Ext.getCmp(prototype.id + '-t' + '-txtNPLANE').setValue(rec.NPLANE);
        Ext.getCmp(prototype.id + '-t' + '-txtITINERA').setValue(rec.ITINERA);
        Ext.getCmp(prototype.id + '-t' + '-txtLEGSEQ').setValue(rec.LEGSEQ);
        Ext.getCmp(prototype.id + '-t' + '-cmbSTORG').setValue(rec.STORG);
        Ext.getCmp(prototype.id + '-t' + '-cmbSTVAL').setValue(rec.STVAL);
        Ext.getCmp(prototype.id + '-t' + '-cmbFTE').setValue(rec.FTE);
        Ext.getCmp(prototype.id + '-t' + '-txtCDOC').setValue(rec.CDOC);
        Ext.getCmp(prototype.id + '-t' + '-cmbTDOC').setValue(rec.TDOC);
        Ext.getCmp(prototype.id + '-t' + '-txtPSVVTA').setValue(rec.PSVVTA);
        Ext.getCmp(prototype.id + '-t' + '-txtAGTIA').setValue(rec.AGTIA);
        Ext.getCmp(prototype.id + '-t' + '-txtFVTA').setValue(rec.FVTA);
        Ext.getCmp(prototype.id + '-t' + '-cmbTVTA').setValue(rec.TVTA);
        Ext.getCmp(prototype.id + '-t' + '-cmbTPAX').setValue(rec.TPAX);
        Ext.getCmp(prototype.id + '-t' + '-cmbTOPUS').setValue(rec.TOPUS);
        Ext.getCmp(prototype.id + '-t' + '-txtCARR').setValue(rec.CARR);
        Ext.getCmp(prototype.id + '-t' + '-txtCABI').setValue(rec.CABI);
        Ext.getCmp(prototype.id + '-t' + '-txtCLAS').setValue(rec.CLAS);
        Ext.getCmp(prototype.id + '-t' + '-txtFBASE').setValue(rec.FBASE);
        Ext.getCmp(prototype.id + '-t' + '-txtMDACP').setValue(rec.MDACP);
        Ext.getCmp(prototype.id + '-t' + '-txtVCPN').setValue(Ext.util.Format.number(rec.VCPN, '0,000.00')); // Formato double        
        Ext.getCmp(prototype.id + '-t' + '-txtCOMISI').setValue(Ext.util.Format.number(rec.COMISI, '0,000.00')); // Formato double
        Ext.getCmp(prototype.id + '-t' + '-txtVTAX').setValue(Ext.util.Format.number(rec.VTAX, '0,000.00')); // Formato double
        Ext.getCmp(prototype.id + '-t' + '-txtVCPMX').setValue(Ext.util.Format.number(rec.VCPMX, '0,000.00')); // Formato double
        Ext.getCmp(prototype.id + '-t' + '-txtTCMUS').setValue(Ext.util.Format.number(rec.TCMUS, '0,000.00')); // Formato double
        Ext.getCmp(prototype.id + '-t' + '-txtVCPUS').setValue(Ext.util.Format.number(rec.VCPUS, '0,000.00')); // Formato double
        Ext.getCmp(prototype.id + '-t' + '-txtUSCR').setValue(rec.USCR);
        Ext.getCmp(prototype.id + '-t' + '-txtFECR').setValue(rec.FECR);
        Ext.getCmp(prototype.id + '-t' + '-txtHOCR').setValue(rec.HOCR);
        Ext.getCmp(prototype.id + '-t' + '-txtUSUP').setValue(rec.USUP);
        Ext.getCmp(prototype.id + '-t' + '-txtFEUP').setValue(rec.FEUP);
        Ext.getCmp(prototype.id + '-t' + '-txtHOUP').setValue(rec.HOUP);
        Ext.getCmp(prototype.id + '-t' + '-cmbTEMD').setValue(rec.TEMD);
        Ext.getCmp(prototype.id + '-t' + '-cmbFLOAD').setValue(rec.FLOAD);
        Ext.getCmp(prototype.id + '-t' + '-txtRECODE').setValue(rec.RECODE);
        Ext.getCmp(prototype.id + '-t' + '-txtTKTASO').setValue(rec.TKTASO);
        Ext.getCmp(prototype.id + '-t' + '-txtFVAL').setValue(rec.FVAL);
        Ext.getCmp(prototype.id + '-t' + '-txtIDCON').setValue(rec.IDCON);
        Ext.create('Ext.tip.ToolTip', {
            target: prototype.id + '-t' + '-txtCDEPART',
            html: rec.strDescCDEPART.trim()
        });
        Ext.create('Ext.tip.ToolTip', {
            target: prototype.id + '-t' + '-txtCARRIVA',
            html: rec.strDescCARRIVA.trim()
        });
        Ext.create('Ext.tip.ToolTip', {
            target: prototype.id + '-t' + '-txtPSVVTA',
            html: rec.strDescPSVVTA.trim()
        });
//        if (rec.SEQ.trim() === '') {
//            Ext.getCmp(prototype.id + '-t' + '-txtDCHEQ').setValue('00');
//        } else {
//            Ext.getCmp(prototype.id + '-t' + '-txtDCHEQ').setValue(rec.SEQ.trim());
//        }

        //Sólo son editables si la información que viene es vacía (A pedido de Javier Toledo)
        if (rec.CDOC.trim() === '' && rec.TDOC.trim() === '' && rec.PSVVTA.trim() === '' && rec.AGTIA.trim() === '' && rec.FVTA.trim() === ''
                && rec.TVTA.trim() === '' && rec.TPAX.trim() === '') {
            //Mantener activados
        } else {
            this.disabledField();
        }






    }
});


