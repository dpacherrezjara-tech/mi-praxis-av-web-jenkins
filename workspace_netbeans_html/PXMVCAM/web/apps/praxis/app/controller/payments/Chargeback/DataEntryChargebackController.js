Ext.define('Ext.Praxis.controller.payments.Chargeback.DataEntryChargebackController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryChargebackController',
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
        prototype.id = 'ChargebackForm';
        prototype.url = CONTEXTPATH + '/Chargeback';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
        this.obtainData();
    },
    afterRender: function() {
//        this.obtainData();
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
    
    mostrarData: function() {
//        console.log(meDE.beanResult);
        this.setValue('txtCARDNBR', this.beanResult.CARDNBR);
        this.setValue('txtCONCEPT', this.beanResult.CONCEPT);
        this.setValue('txtAUTHNBR', this.beanResult.AUTHNBR);
        this.setValue('txtAPLIDATE', this.beanResult.APLIDATE);
        this.setValue('txtNATURE', this.beanResult.NATURE);
        this.setValue('txtREMEDATE', this.beanResult.REMEDATE);
        this.setValue('txtREMETIPO', this.beanResult.REMETIPO);
        this.setValue('txtREMEFOLIO', this.beanResult.REMEFOLIO);
        
        this.setValue('txtSCARCOD', this.beanResult.SCARCOD);
        this.setValue('txtMERCHNREC', this.beanResult.MERCHNREC);
        this.setValue('txtMERCHNAM', this.beanResult.MERCHNAM);
        this.setValue('txtCURRAUTH', this.beanResult.CURRAUTH);
        this.setValue('txtCURRAUTH2', this.beanResult.CURRAUTH);
        this.setValue('txtCURRAUTH3', this.beanResult.CURRAUTH);
        
        this.setValue('txtFECSELEC', this.beanResult.FECSELEC);
                
        if(this.beanResult.CODEBANK === 'AX'){
            this.setValue('de-cmbFTEA', 'AMEX');
	}else if(this.beanResult.CODEBANK === 'BX'){
            this.setValue('de-cmbFTEA', 'BANAMEX');
	}else if(this.beanResult.CODEBANK === 'P'){
            this.setValue('de-cmbFTEA', 'PAYPAL');
	}else if(this.beanResult.CODEBANK === 'ST'){
            this.setValue('de-cmbFTEA', 'SANTANDER');
	}
        
        if(this.beanResult.FSELEC === 'L'){
		this.setValue('de-cmbFSELEC', 'Load');
	}
	
        if(this.beanResult.STATT === '1'){
            this.setValue('de-cmbSTATT', 'Match');
	}else if(this.beanResult.STATT === '2'){
            this.setValue('de-cmbSTATT', 'Sin Aclaracion');
	}else if(this.beanResult.STATT === '3'){
            this.setValue('de-cmbSTATT', 'Aviso sin EECC');
	}else if(this.beanResult.STATT === '4'){
            this.setValue('de-cmbSTATT', 'EECC sin Aclaracion');
	}else if(this.beanResult.STATT === '5'){
            this.setValue('de-cmbSTATT', 'Reversa ChargeBack(Pendiente)');
	}else if(this.beanResult.STATT === '6'){
            this.setValue('de-cmbSTATT', 'Reversa ChargeBack(Aplicada)');
	}
        
        this.setValue('txtAUTAMOUNT', Ext.util.Format.number(this.beanResult.AUTAMOUNT, '0,000.00'));
        this.setValue('txtOPEAMOUNT', Ext.util.Format.number(this.beanResult.OPEAMOUNT, '0,000.00'));
        this.setValue('txtIVA', Ext.util.Format.number(this.beanResult.IVA, '0,000.00'));

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },
    
    obtainData: function() {
        
        var cmbSTATT = Ext.getCmp(prototype.id + '-de-cmbSTATT');
        cmbSTATT.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "ALL"],
                ["1", "Match"],
                ["2", "Sin aclaracion"],
                ["3", "Aviso sin EECC"],
                ["4", "EECC sin Aclaracion"],
                ["5", "Reversa ChargeBack(Pendiente)"],
                ["6", "Reversa ChargeBack(Aplicada)"]
            ]
        }));
        cmbSTATT.setValue('');
        
        var cmbFTEA = Ext.getCmp(prototype.id + '-de-cmbFTEA');
        cmbFTEA.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "ALL"],
                ["BX", "BANAMEX"],
                ["AX", "AMEX"],
                ["ST", "SANTANDER"],
                ["P", "PAYPAL"]
            ]
        }));
        cmbFTEA.setValue('BX');
        
        var cmbFSELEC = Ext.getCmp(prototype.id + '-de-cmbFSELEC');
        cmbFSELEC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "(None)"],
                ["L", "Load"]
            ]
        }));
        cmbFSELEC.setValue('');

    },
    
    llenarData: function(beanTemp) {
        
        var STATT = this.getValue("de-cmbSTATT").trim();
        var CODEBANK = this.getValue("de-cmbFTEA").trim();
        
        if(STATT === 'Match'){
            beanTemp.STATT = '1';
        }else if(STATT === 'Sin Aclaracion'){
            beanTemp.STATT = '2';
	}else if(STATT === 'Aviso sin EECC'){
            beanTemp.STATT = '3';
	}else if(STATT === 'EECC sin Aclaracion'){
            beanTemp.STATT = '4';
	}else if(STATT === 'Reversa ChargeBack(Pendiente)'){
            beanTemp.STATT = '5';
	}else if(STATT === 'Reversa ChargeBack(Aplicada)'){
            beanTemp.STATT = '6';
	}
        
        
        beanTemp.MERCHNREC = this.getValue("txtMERCHNREC");
        beanTemp.MERCHNAM = this.getValue("txtMERCHNAM");
        
        beanTemp.APLIDATE = this.getValue("txtAPLIDATE");
        beanTemp.NATURE = this.getValue("txtNATURE");
        beanTemp.CONCEPT = this.getValue("txtCONCEPT");
        
        beanTemp.REMEDATE = this.getValue("txtREMEDATE");
        beanTemp.REMETIPO = this.getValue("txtREMETIPO");
        beanTemp.REMEFOLIO = this.getValue("txtREMEFOLIO");
        
        if(CODEBANK === 'AMEX'){
            beanTemp.CODEBANK = 'AX';
        }else if(CODEBANK === 'BANAMEX'){
            beanTemp.CODEBANK = 'BX';
	}else if(CODEBANK === 'PAYPAL'){
            beanTemp.CODEBANK = 'P';
	}else if(CODEBANK === 'SANTANDER'){
            beanTemp.CODEBANK = 'ST';
	}
        
        beanTemp.SCARCOD = this.getValue("txtSCARCOD");
        beanTemp.CARDNBR = this.getValue("txtCARDNBR");
        beanTemp.AUTHNBR = this.getValue("txtAUTHNBR");
        
        var FSELEC = this.getValue("de-cmbFSELEC");
        if(FSELEC === 'Load'){
	    beanTemp.FSELEC = 'L';
	}else{
            beanTemp.FSELEC = '';
        }
        
        beanTemp.FECSELEC = this.getValue("txtFECSELEC");
        
        beanTemp.CURRAUTH = this.getValue("txtCURRAUTH");
        
        beanTemp.CURRAUTH = this.getValue("txtCURRAUTH2");
        beanTemp.CURRAUTH = this.getValue("txtCURRAUTH3");
        
        if (this.getValue("txtAUTAMOUNT").trim() !== '') {
            beanTemp.AUTAMOUNT = Number(this.getValue('txtAUTAMOUNT').replace(',', '').trim());
        }else{
            beanTemp.AUTAMOUNT = 0;
        }
        
        if (this.getValue("txtOPEAMOUNT").trim() !== '') {
            beanTemp.OPEAMOUNT = Number(this.getValue('txtOPEAMOUNT').replace(',', '').trim());
        }else{
            beanTemp.OPEAMOUNT = 0;
        }
        
        if (this.getValue("txtIVA").trim() !== '') {
            beanTemp.IVA = Number(this.getValue('txtIVA').replace(',', '').trim());
        }else{
            beanTemp.IVA = 0;
        }

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();

        console.log(beanTemp);
    },
    
    getData: function() {
        
        var beanString = JSON.stringify(meDE.bean.data);
        Ext.Ajax.request({
            url: prototype.url + '/searchCompleteDetail',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanResult = res.result;
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
        console.log(obj);
        console.log(value);
        console.log(opts);
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
                    console.log('onSaveClick');
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
        console.log('onUpdateClick');
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update ?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function(btn) {
                        if (btn === 'yes') {
                            var beanTemp = {};
                            this.llenarData(beanTemp);
                            beanTemp.option = 'U';
                            beanTemp.SQCRFILE = meDE.beanResult.SQCRFILE;
                            this.maintenanceBean(beanTemp);
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

    //<editor-fold defaultstate="collapsed" desc="maintenanceBean">
    maintenanceBean: function(beanTemp) {
        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({           
            url: prototype.url + '/MaintenanceA2295',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: beanString,
                option: beanTemp.option
            },
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    Ext.getCmp(prototype.id + '-dataEntry').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});

                } else
                    global.Msg({msg: ''});
            }
        });
    },
    //</editor-fold>

    validacionInsert: function(beanTemp) {
        var msjResult = '';
        if (this.getValue("txtCARDNBR") === '' || 
            this.getValue("txtAUTHNBR") === '' || 
            this.getValue("txtMERCHNREC") === '' || 
            this.getValue("txtREMEDATE") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function() {

        Ext.getCmp(prototype.id + '-txtCARDNBR').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtMERCHNAM').setReadOnly(true);
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
        if (this.getValue("txtCODSOUR") === '') {
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