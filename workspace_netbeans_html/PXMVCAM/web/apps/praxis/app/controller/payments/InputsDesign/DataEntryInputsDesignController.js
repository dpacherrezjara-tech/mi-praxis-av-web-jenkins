Ext.define('Ext.Praxis.controller.payments.InputsDesign.DataEntryInputsDesignController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryInputsDesignController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function (view) {
        prototype.id = 'InputsDesignForm';
        prototype.url = CONTEXTPATH + '/InputsDesign';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
//        this.obtainData();
    },
    afterRender: function () {
        switch (this.actionCode) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.getData();
                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {

        this.setValue('de-txtCPROGRAM', this.beanResult.CPROGRAM);
        this.setValue('de-txtNPROGRAM', this.beanResult.NPROGRAM);
        this.setValue('de-txtDELILNK', this.beanResult.DELILNK);

        this.setValue('de-txtSCOUNTRY', this.beanResult.SCOUNTRY);
        this.setValue('de-txtRSCOUNTRY', this.beanResult.RSCOUNTRY);
        this.setValue('de-txtCODEBANK', this.beanResult.CODEBANK);
        this.setValue('de-txtRCODEBANK', this.beanResult.RCODEBANK);
        this.setValue('de-txtPRDA', this.beanResult.PRDA);
        this.setValue('de-txtRPRDA', this.beanResult.RPRDA);
        this.setValue('de-txtTRAN', this.beanResult.TRANE);
        this.setValue('de-txtRTRAN', this.beanResult.RTRAN);
        this.setValue('de-txtTDOC', this.beanResult.TDOC);
        this.setValue('de-txtRTDOC', this.beanResult.RTDOC);
        this.setValue('de-txtSDATE', this.beanResult.SDATE);


        if (this.beanResult.RSDATE.includes("-")) {
            var subListas = this.beanResult.RSDATE.split("-");
            this.setValue('de-cmbRSDATE', subListas[0]);
            var checkbox = Ext.getCmp(prototype.id + '-chkRSDATE');
            checkbox.setValue(true);
        } else {
            this.setValue('de-cmbRSDATE', this.beanResult.RSDATE);
        }

        this.setValue('de-txtADATE', this.beanResult.ADATE);
        this.setValue('de-cmbRADATE', this.beanResult.RADATE);

        if (this.beanResult.RADATE.includes("-")) {
            var subListas = this.beanResult.RADATE.split("-");
            this.setValue('de-cmbRADATE', subListas[0]);
            var checkbox = Ext.getCmp(prototype.id + '-chkRADATE');
            checkbox.setValue(true);
        } else {
            this.setValue('de-cmbRADATE', this.beanResult.RADATE);
        }

        this.setValue('de-txtSAGENT', this.beanResult.SAGENT);
        this.setValue('de-txtRSAGENT', this.beanResult.RSAGENT);
        this.setValue('de-txtMERCHAND', this.beanResult.MERCHAND);
        this.setValue('de-txtRMERCHAND', this.beanResult.RMERCHAND);
        this.setValue('de-txtTERMI', this.beanResult.TERMI);
        this.setValue('de-txtRTERMI', this.beanResult.RTERMI);
        this.setValue('de-txtSCARCOD', this.beanResult.SCARCOD);
        this.setValue('de-txtRSCARCOD', this.beanResult.RSCARCOD);
        this.setValue('de-txtSCARDN', this.beanResult.SCARDN);
        this.setValue('de-txtRSCARDN', this.beanResult.RSCARDN);
        this.setValue('de-txtSCARDNCOR', this.beanResult.SCARDNCOR);
        this.setValue('de-txtRSCARDNCOR', this.beanResult.RSCARDNCOR);
        this.setValue('de-txtSAUTHOC', this.beanResult.SAUTHOC);
        this.setValue('de-txtRSAUTHOC', this.beanResult.RSAUTHOC);
        this.setValue('de-txtSDATEXP', this.beanResult.SDATEXP);
        this.setValue('de-txtRSDATEXP', this.beanResult.RSDATEXP);
        this.setValue('de-txtSPNR', this.beanResult.SPNR);
        this.setValue('de-txtRSPNR', this.beanResult.RSPNR);
        this.setValue('de-txtTIPOTAR', this.beanResult.TIPOTAR);
        this.setValue('de-txtRTIPOTAR', this.beanResult.RTIPOTAR);
        this.setValue('de-txtRED', this.beanResult.RED);
        this.setValue('de-txtRRED', this.beanResult.RRED);
        this.setValue('de-txtACCNUMBER', this.beanResult.ACCNUMBER);
        this.setValue('de-txtRACCNUMBER', this.beanResult.RACCNUMBER);
        this.setValue('de-txtCCIA', this.beanResult.CCIA);
        this.setValue('de-txtRCCIA', this.beanResult.RCCIA);
        this.setValue('de-txtFORMA', this.beanResult.FORMA);
        this.setValue('de-txtRFORMA', this.beanResult.RFORMA);
        this.setValue('de-txtSERIE', this.beanResult.SERIE);
        this.setValue('de-txtRSERIE', this.beanResult.RSERIE);
        this.setValue('de-txtSCURRENCY', this.beanResult.SCURRENCY);
        this.setValue('de-txtRSCURRENCY', this.beanResult.RSCURRENCY);
        this.setValue('de-txtSALEVAL', this.beanResult.SALEVAL);
        this.setValue('de-txtRSALEVAL', this.beanResult.RSALEVAL);
        this.setValue('de-txtSVFOP', this.beanResult.SVFOPE);
        this.setValue('de-txtRSVFOP', this.beanResult.RSVFOP);
        this.setValue('de-txtIVA', this.beanResult.IVA);
        this.setValue('de-txtRIVA', this.beanResult.RIVA);
        this.setValue('de-txtPROPINA', this.beanResult.PROPINA);
        this.setValue('de-txtRPROPINA', this.beanResult.RPROPINA);
        this.setValue('de-txtTOTAL', this.beanResult.TOTAL);
        this.setValue('de-txtRTOTAL', this.beanResult.RTOTAL);
        this.setValue('de-txtCOMISION', this.beanResult.COMISION);
        this.setValue('de-txtRCOMISION', this.beanResult.RCOMISION);
        this.setValue('de-txtBASEFUE', this.beanResult.BASEFUE);
        this.setValue('de-txtRBASEFUE', this.beanResult.RBASEFUE);
        this.setValue('de-txtRTEFUE', this.beanResult.RTEFUE);
        this.setValue('de-txtRRTEFUE', this.beanResult.RRTEFUE);
        this.setValue('de-txtRTEIVA', this.beanResult.RTEIVA);
        this.setValue('de-txtRRTEIVA', this.beanResult.RRTEIVA);
        this.setValue('de-txtBASICA', this.beanResult.BASICA);
        this.setValue('de-txtRBASICA', this.beanResult.RBASICA);
        this.setValue('de-txtRTEICA', this.beanResult.RTEICA);
        this.setValue('de-txtRRTEICA', this.beanResult.RRTEICA);
        this.setValue('de-txtNETO', this.beanResult.NETO);
        this.setValue('de-txtRNETO', this.beanResult.RNETO);
        this.setValue('de-txtFLOAD', this.beanResult.FLOAD);
        this.setValue('de-txtLDATE', this.beanResult.LDATE);
        this.setValue('de-txtTDATE', this.beanResult.TDATE);
        this.setValue('de-txtSORIG', this.beanResult.SORIG);

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },

    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp, option) {
        var beanTemp = {};

        beanTemp.option = option;
        beanTemp.CPROGRAM = this.getValue("de-txtCPROGRAM");
        beanTemp.NPROGRAM = this.getValue("de-txtNPROGRAM");
        beanTemp.DELILNK = this.getValue("de-txtDELILNK");
        console.log(beanTemp.CPROGRAM);
        console.log(beanTemp.NPROGRAM);
        console.log(beanTemp.DELILNK);

        beanTemp.SCOUNTRY = this.getValue("de-txtSCOUNTRY");
        beanTemp.RSCOUNTRY = this.getValue("de-txtRSCOUNTRY");
        beanTemp.CODEBANK = this.getValue("de-txtCODEBANK");
        beanTemp.RCODEBANK = this.getValue("de-txtRCODEBANK");
        beanTemp.PRDA = this.getValue("de-txtPRDA");
        beanTemp.RPRDA = this.getValue("de-txtRPRDA");
        beanTemp.TRANE = this.getValue("de-txtTRAN");
        beanTemp.RTRAN = this.getValue("de-txtRTRAN");
        beanTemp.TDOC = this.getValue("de-txtTDOC");
        beanTemp.RTDOC = this.getValue("de-txtRTDOC");
        beanTemp.SDATE = this.getValue("de-txtSDATE");
        beanTemp.RSDATE = this.getValue("de-cmbRSDATE");

        var checkboxSDATE = Ext.getCmp(prototype.id + '-chkRSDATE');

        if (checkboxSDATE.checked) {
            beanTemp.RSDATE = beanTemp.RSDATE + "-";
        }

        beanTemp.ADATE = this.getValue("de-txtADATE");
        beanTemp.RADATE = this.getValue("de-cmbRADATE");

        var checkboxADATE = Ext.getCmp(prototype.id + '-chkRADATE');

        if (checkboxADATE.checked) {
            beanTemp.RADATE = beanTemp.RADATE + "-";
        }

        beanTemp.SAGENT = this.getValue("de-txtSAGENT");
        beanTemp.RSAGENT = this.getValue("de-txtRSAGENT");
        beanTemp.MERCHAND = this.getValue("de-txtMERCHAND");
        beanTemp.RMERCHAND = this.getValue("de-txtRMERCHAND");
        beanTemp.TERMI = this.getValue("de-txtTERMI");
        beanTemp.RTERMI = this.getValue("de-txtRTERMI");
        beanTemp.SCARCOD = this.getValue("de-txtSCARCOD");
        beanTemp.RSCARCOD = this.getValue("de-txtRSCARCOD");
        beanTemp.SCARDN = this.getValue("de-txtSCARDN");
        beanTemp.RSCARDN = this.getValue("de-txtRSCARDN");
        beanTemp.SCARDNCOR = this.getValue("de-txtSCARDNCOR");
        beanTemp.RSCARDNCOR = this.getValue("de-txtRSCARDNCOR");
        beanTemp.SAUTHOC = this.getValue("de-txtSAUTHOC");
        beanTemp.RSAUTHOC = this.getValue("de-txtRSAUTHOC");
        beanTemp.SDATEXP = this.getValue("de-txtSDATEXP");
        beanTemp.RSDATEXP = this.getValue("de-txtRSDATEXP");
        beanTemp.SPNR = this.getValue("de-txtSPNR");
        beanTemp.RSPNR = this.getValue("de-txtRSPNR");
        beanTemp.TIPOTAR = this.getValue("de-txtTIPOTAR");
        beanTemp.RTIPOTAR = this.getValue("de-txtRTIPOTAR");
        beanTemp.RED = this.getValue("de-txtRED");
        beanTemp.RRED = this.getValue("de-txtRRED");
        beanTemp.ACCNUMBER = this.getValue("de-txtACCNUMBER");
        beanTemp.RACCNUMBER = this.getValue("de-txtRACCNUMBER");
        beanTemp.CCIA = this.getValue("de-txtCCIA");
        beanTemp.RCCIA = this.getValue("de-txtRCCIA");
        beanTemp.FORMA = this.getValue("de-txtFORMA");
        beanTemp.RFORMA = this.getValue("de-txtRFORMA");
        beanTemp.SERIE = this.getValue("de-txtSERIE");
        beanTemp.RSERIE = this.getValue("de-txtRSERIE");
        beanTemp.SCURRENCY = this.getValue("de-txtSCURRENCY");
        beanTemp.RSCURRENCY = this.getValue("de-txtRSCURRENCY");
        beanTemp.SALEVAL = this.getValue("de-txtSALEVAL");
        beanTemp.RSALEVAL = this.getValue("de-txtRSALEVAL");
        beanTemp.SVFOPE = this.getValue("de-txtSVFOP");
        beanTemp.RSVFOP = this.getValue("de-txtRSVFOP");
        beanTemp.IVA = this.getValue("de-txtIVA");
        beanTemp.RIVA = this.getValue("de-txtRIVA");
        beanTemp.PROPINA = this.getValue("de-txtPROPINA");
        beanTemp.RPROPINA = this.getValue("de-txtRPROPINA");
        beanTemp.TOTAL = this.getValue("de-txtTOTAL");
        beanTemp.RTOTAL = this.getValue("de-txtRTOTAL");
        beanTemp.COMISION = this.getValue("de-txtCOMISION");
        beanTemp.RCOMISION = this.getValue("de-txtRCOMISION");
        beanTemp.BASEFUE = this.getValue("de-txtBASEFUE");
        beanTemp.RBASEFUE = this.getValue("de-txtRBASEFUE");
        beanTemp.RTEFUE = this.getValue("de-txtRTEFUE");
        beanTemp.RRTEFUE = this.getValue("de-txtRRTEFUE");
        beanTemp.RTEIVA = this.getValue("de-txtRTEIVA");
        beanTemp.RRTEIVA = this.getValue("de-txtRRTEIVA");
        beanTemp.BASICA = this.getValue("de-txtBASICA");
        beanTemp.RBASICA = this.getValue("de-txtRBASICA");
        beanTemp.RTEICA = this.getValue("de-txtRTEICA");
        beanTemp.RRTEICA = this.getValue("de-txtRRTEICA");
        beanTemp.NETO = this.getValue("de-txtNETO");
        beanTemp.RNETO = this.getValue("de-txtRNETO");
        beanTemp.FLOAD = this.getValue("de-txtFLOAD");
        beanTemp.LDATE = this.getValue("de-txtLDATE");
        beanTemp.TDATE = this.getValue("de-txtTDATE");
        beanTemp.SORIG = this.getValue("de-txtSORIG");

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();

        var beanString = JSON.stringify(beanTemp);
        searchParams = {
//            bean: me.bean,
            beanString: beanString
        };
        ;
    },
    getData: function () {

        var cmbRSDATE = Ext.getCmp(prototype.id + '-de-cmbRSDATE');
        cmbRSDATE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['CODE', 'NAME'],
            data: [
                ["", "Select"],
                ["1", "DD/MM/YYYY"],
                ["2", "Other"]
//                ["3", ""],
//                ["4", ""]
            ]
        }));
        cmbRSDATE.setValue("");

        var cmbRADATE = Ext.getCmp(prototype.id + '-de-cmbRADATE');
        cmbRADATE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['CODE', 'NAME'],
            data: [
                ["", "Select"],
                ["1", "DD/MM/YYYY"],
                ["2", "Other"]
//                ["3", ""],
//                ["4", ""]
            ]
        }));
        cmbRADATE.setValue("");

        var beanString = JSON.stringify(meDE.bean.data);
        Ext.Ajax.request({
            url: prototype.url + '/searchCompleteDetail',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanResult = res.result;
                meDE.mostrarData();

            }
        });
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        this.setValue('txtCODSOUR', '');
        this.setValue('txtDESSOU', '');
        this.setValue('txtGRUSOR', '');
        this.setValue('txtstrGRUSOR', '');
        Ext.getCmp(prototype.id + '-lblDescripcion').setText('');
        Ext.getCmp(prototype.id + '-lblDescripcion2').setText('');
        this.setValue('txtUSCR', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSUP', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
    },
    //</editor-fold>
    toUpperCase: function (obj, value, opts) {
        console.log(obj);
        console.log(value);
        console.log(opts);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    var option = 'I';
                    this.llenarData(beanTemp, option);
                    var msjResult = this.validacionInsert(beanTemp);

                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        this.MaintenanceMPFUNI(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update ?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            var beanTemp = {};
                            var option = 'U';
                            this.llenarData(beanTemp, option);
                            this.MaintenanceMPFUNI(beanTemp);
                        }
                    }
                });
    },
    onDeleteClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    var option = 'D';
                    this.llenarData(beanTemp, option);
                    this.MaintenanceMPFUNI(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceMPFUNI">
    MaintenanceMPFUNI: function (beanTemp) {
//        var beanString = JSON.stringify(beanTemp);

        var beanString = JSON.stringify(this.beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceMPFUNI',
            method: 'POST',
            timeout: 60000000,
            params: searchParams,
//            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    Ext.getCmp(prototype.id + '-dataEntry').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                } else {
                    Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                }

            }
        });
    },
    //</editor-fold>

    validacionInsert: function (beanTemp) {
        var msjResult = '';
//        if (this.getValue("de-txtCODEM") === '') {
//            msjResult = "You must enter the required field.";
//        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {

//        Ext.getCmp(prototype.id + '-de-txtCODEM').setReadOnly(true);
    },
    Habilitarlbl: function () {
        Ext.getCmp(prototype.id + '-lblDescripcion').show();
        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function () {
        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
            Ext.getCmp(prototype.id + '-lbldes').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes').show();
        }
    },
    Habilitarlbl1: function () {
        Ext.getCmp(prototype.id + '-lbldes').hide();
        if (this.getValue("txtCODSOUR") === '') {
            Ext.getCmp(prototype.id + '-lbldes2').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes2').show();
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
//            this.btnSearch_click();
        }
    }
// </editor-fold>
});