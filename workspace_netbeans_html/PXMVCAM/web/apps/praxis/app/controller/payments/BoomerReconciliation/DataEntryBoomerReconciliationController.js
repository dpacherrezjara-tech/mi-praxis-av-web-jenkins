Ext.define('Ext.Praxis.controller.payments.BoomerReconciliation.DataEntryBoomerReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryBoomerReconciliationController',
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
    init: function(view) {
        prototype.id = 'BoomerReconciliationForm';
        prototype.url = CONTEXTPATH + '/BoomerReconciliation';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
        this.lstCard = this.p.lstCard;
        this.lstBank = this.p.lstBank;
        this.obtainData();
    },
    afterRender: function() {
//        this.obtainData();
        switch (this.actionCode) {
            case 'S':
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.getData();
//                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function() {
//        console.log(this.beanResult);
        this.setValue('de-txtTicket', this.beanResult.strTicket);
        this.setValue('de-txtSEQ', this.beanResult.SEQ);
        this.setValue('de-cmbTDOC', this.beanResult.TDOC);
        
        this.setValue('de-cmbSCARCOD', this.beanResult.SCARCOD);
        this.setValue('de-txtCard1', this.beanResult.IN_CARDN1);
        this.setValue('de-txtCard2', this.beanResult.IN_CARDN2);
        
        this.setValue('de-txtSDATE', this.beanResult.SDATE);
        this.setValue('de-txtSAGENT', this.beanResult.SAGENT);
        this.setValue('de-txtSPNR', this.beanResult.SPNR);
        
        this.setValue('de-cmbSCOUNTRY', this.beanResult.SCOUNTRY);
        this.setValue('de-cmbSTVAL', this.beanResult.STVAL);
        
        this.setValue('de-txtSVFOP', Ext.util.Format.number(this.beanResult.SVFOP, '0,000.00'));
        this.setValue('de-txtSCURRENCY', this.beanResult.SCURRENCY);
        this.setValue('de-txtSAUTHOC', this.beanResult.SAUTHOC);
        
        this.setValue('de-cmbBCARCOD', this.beanResult.BCARCOD);
        this.setValue('de-txtCardB1', this.beanResult.strBCard1);
        this.setValue('de-txtCardB2', this.beanResult.strBCard2);
        
        this.setValue('de-txtDAMOUNT', Ext.util.Format.number(this.beanResult.DAMOUNT, '0,000.00'));
        this.setValue('de-txtBCURRENCY', this.beanResult.BCURRENCY);
        this.setValue('de-txtBDATEP', this.beanResult.BDATEP);
        
        this.setValue('de-txtDATEP', this.beanResult.BDATEL);
        this.setValue('de-cmbCODEBANK', this.beanResult.CBANK);
        
        this.setValue('de-txtDAMOUNTR', Ext.util.Format.number(this.beanResult.DAMOUNT, '0,000.00'));
        this.setValue('de-txtCURRENCYR', this.beanResult.SCURRENCYRF);
        this.setValue('de-txtMERCHNR', this.beanResult.MERCHNR);
                
        this.setValue('de-txtDESCRI', this.beanResult.strDescripcion);  
        
        this.setValue('de-txtCERROR', this.beanResult.CERROR);
        this.setValue('de-txtDESERROR', this.beanResult.strDescError);
        
        this.setValue('de-cmbSTATUSC', this.beanResult.STATUSC);
        this.setValue('de-txtDATEC', this.beanResult.DATEC);
        this.setValue('de-txtComment', this.beanResult.strComment);

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },
    obtainData: function() {   
        
        var cmbTDOC = Ext.getCmp(prototype.id + '-de-cmbTDOC');
        cmbTDOC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["S", "Sales"],
                ["R", "Refund"]
            ]
        }));
        cmbTDOC.setValue('');
        
        var cmbSTVAL = Ext.getCmp(prototype.id + '-de-cmbSTVAL');
        cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["1", "Match"],
                ["2", "Settlement without Payment"],
                ["3", "Payment without Settlement"],
                ["4", "Match Manual"]
            ]
        }));
        cmbSTVAL.setValue('');
        
        var cmbSTATUSC = Ext.getCmp(prototype.id + '-de-cmbSTATUSC');
        cmbSTATUSC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Pending"],
                ["1", "Processed"]
            ]
        }));
        cmbSTATUSC.setValue('');
        
        var storeData = Ext.create('Ext.data.Store', {
            data: this.lstCard,
            autoLoad: true
        });
        
        var storeData2 = Ext.create('Ext.data.Store', {
            data: this.lstCountry,
            autoLoad: true
        });
        
        var storeData3 = Ext.create('Ext.data.Store', {
            data: this.lstCard,
            autoLoad: true
        });
        
        var storeData4 = Ext.create('Ext.data.Store', {
            data: this.lstBank,
            autoLoad: true
        });

        Ext.getCmp(prototype.id + '-de-cmbSCARCOD').bindStore(storeData);
        Ext.getCmp(prototype.id + '-de-cmbSCARCOD').setValue('');
        
        Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY').bindStore(storeData2);
        Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY').setValue('');
        
        Ext.getCmp(prototype.id + '-de-cmbBCARCOD').bindStore(storeData3);
        Ext.getCmp(prototype.id + '-de-cmbBCARCOD').setValue('');
        
        Ext.getCmp(prototype.id + '-de-cmbCODEBANK').bindStore(storeData4);
        Ext.getCmp(prototype.id + '-de-cmbCODEBANK').setValue('');
        
//        this.dataObtain.BANK = 2;
//        Ext.Ajax.request({
//            url: prototype.urlMaster + '/obtainData',
//            method: 'POST',
//            timeout: 60000000,
////            beforerequest: Ext.getCmp(prototype.id + '-panelGridData').mask('Loading...'),
//            params: {
//                beanString: JSON.stringify(this.dataObtain)},
//            success: function (response, options) {
////                Ext.getCmp(prototype.id + '-panelGridData').unmask('Loading...');
//                var res = Ext.JSON.decode(response.responseText);
//
//                var lstCard = res.lstCard;
//                var storeData = Ext.create('Ext.data.Store', {
//                    data: lstCard,
//                    autoLoad: true
//                });
//                var lstBank = res.lstBank;
//                var storeData2 = Ext.create('Ext.data.Store', {
//                    data: lstBank,
//                    autoLoad: true
//                });
//
//                Ext.getCmp(prototype.id + '-de-cmbSCARCOD').bindStore(storeData);
//                Ext.getCmp(prototype.id + '-de-cmbSCARCOD').setValue('');
////                Ext.getCmp(prototype.id + '-cmbBank').bindStore(storeData2);
////                Ext.getCmp(prototype.id + '-cmbBank').setValue('');
//            }
//        });

    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
        
        //Llenando los valores ingresados por el usuario =======
        beanTemp.strComment = 'BOOMER MATCH ' + this.getValue("de-txtComment");
        
        //Guardando valores originales =========================
        beanTemp.strTicket = this.beanResult.strTicket;
        beanTemp.CCIA = this.beanResult.CCIA;
        beanTemp.FORMA = this.beanResult.FORMA;
        beanTemp.SERIE = this.beanResult.SERIE;
//        beanTemp.CUPON = this.beanResult.CUPON;
        beanTemp.SEQ = this.beanResult.SEQ;
        beanTemp.TDOC = this.beanResult.TDOC;
        beanTemp.SCARCOD = this.beanResult.SCARCOD;
        beanTemp.SCARDN = this.beanResult.SCARDN;
        beanTemp.STVAL = this.beanResult.STVAL;
        
        /*
        beanTemp.SDATE = this.beanResult.SDATE;
        beanTemp.SAGENT = this.beanResult.SAGENT;
        beanTemp.SCOUNTRY = this.beanResult.SCOUNTRY;
        beanTemp.SVFOP = this.beanResult.SVFOP;
        beanTemp.SCURRENCY = this.beanResult.SCURRENCY;
        beanTemp.SAUTHOC = this.beanResult.SAUTHOC;
        beanTemp.BCARCOD = this.beanResult.BCARCOD;
        beanTemp.BCARDN = this.beanResult.BCARDN;
        
        beanTemp.DAMOUNT = this.beanResult.DAMOUNT;
        beanTemp.BCURRENCY = this.beanResult.BCURRENCY;
        beanTemp.BDATEP = this.beanResult.BDATEP;
        beanTemp.BDATEL = this.beanResult.BDATEL;
        beanTemp.CODEBANK = this.beanResult.CODEBANK;
        beanTemp.DAMOUNTR = this.beanResult.DAMOUNTR;
        beanTemp.SCURRENCYRF = this.beanResult.SCURRENCYRF;
        beanTemp.MERCHNR = this.beanResult.MERCHNR;
        beanTemp.DESCRI = this.beanResult.DESCRI;
        beanTemp.CERROR = this.beanResult.CERROR;
        beanTemp.STATUSC = this.beanResult.STATUSC;
        beanTemp.DATEC = this.beanResult.DATEC;
        */
    },
    getData: function() {
        
        var beanString = JSON.stringify(meDE.bean.data);
        Ext.Ajax.request({
            url: prototype.url + '/searchBean',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
                meDE.beanResult = res.data;
                if (meDE.beanResult.STVAL !== '1' && meDE.beanResult.STVAL !== '4') {
                    //Settlement sin Liquidación / Liquidación sin Settlement
                    Ext.getCmp(prototype.id + '-btn-update').show();
                } else {
                    //Match
                    Ext.getCmp(prototype.id + '-btn-update').hide();
                }
                meDE.mostrarData();
            }
        });
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
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
    toUpperCase: function(obj, value, opts) {
//        console.log(obj);
//        console.log(value);
//        console.log(opts);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        this.maintenanceBean(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });         
    },
    onUpdateClick: function(btn) {
        Ext.Msg.show(
            {
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
//                animateTarget: btn,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        var beanTemp = {};
                        this.llenarData(beanTemp);
//                        beanTemp.option = 'U';
                        var msjResult = this.validacionUpdate(beanTemp);
			var comentario = (Ext.getCmp(prototype.id + '-de-txtComment').getValue()).trim();
                        if(msjResult === ''){
                            if(comentario !== ''){
                                if(this.beanResult.STVAL !== "1" && this.beanResult.STVAL !== "4"){
                                    this.executeOption(beanTemp);;//false(VALIDA Y MODIFICA)
                                }else{
                                    global.Msg({msg: 'Update can not be applied.'});
                                }
                            }else{
                                global.Msg({msg: 'Comment field is required.'});
//                                Ext.getCmp(prototype.id + '-de-txtComment').focus(false, 200);
                            }
			}else{
                            global.Msg({msg: msjResult});
			}
                    }
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
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    beanTemp.option = 'D';
                    this.maintenanceBean(beanTemp);
                }
            }
        });
    },
    onCancelClick: function(btn) {
        this.view.close();
    },
    // </editor-fold>
    
    validacionUpdate: function(btn) {
        var msjResult = '';
        return msjResult;
    },
    
    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    executeOption: function(beanTemp) {
        Ext.Ajax.request({
            url: prototype.url + '/executeOption',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanTemp)},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    Ext.getCmp(prototype.id + '-dataEntry').close();
//                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                } else
                    global.Msg({msg: ''});
            }
        });
    },
    //</editor-fold>

    validacionInsert: function(beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtCODEBANK") === '' || this.getValue("de-cmbCOUNTRY") === '' || this.getValue("de-txtCURRENC") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function() {

        Ext.getCmp(prototype.id + '-de-cmbCOUNTRY').setReadOnly(true);
    },
    Habilitarlbl: function() {
        Ext.getCmp(prototype.id + '-lblDescripcion').show();
        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function() {
        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
            Ext.getCmp(prototype.id + '-lbldes').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes').show();
        }
    },
    Habilitarlbl1: function() {
        Ext.getCmp(prototype.id + '-lbldes').hide();
        if (this.getValue("txtCODSOUR") == '') {
            Ext.getCmp(prototype.id + '-lbldes2').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes2').show();
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
//            this.btnSearch_click();
        }
    }
// </editor-fold>
});