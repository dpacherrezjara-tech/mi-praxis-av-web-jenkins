Ext.define('Ext.Praxis.controller.payments.AccountingPlan.DataEntryAccountingPlanController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAccountingPlanController',
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
        prototype.id = 'AccountingPlanForm';
        prototype.url = CONTEXTPATH + '/AccountingPlan';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
    },
    afterRender: function() {
        this.limpiarData();
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
        this.setValue('de-txtCODTRAN', this.beanResult.CODTRAN);
        this.setValue('de-txtDESCRI', this.beanResult.DESCRI);
        this.setValue('de-txtTIPREG', this.beanResult.TIPREG);
        this.setValue('de-txtCODEBANK', this.beanResult.CODEBANK);
        this.setValue('de-txtSCURRENCY', this.beanResult.SCURRENCY);
        this.setValue('de-txtSCOUNTRY', this.beanResult.SCOUNTRY);
        this.setValue('de-txtCODCLIT', this.beanResult.CODCLIT);
        this.setValue('de-txtCIACTA', this.beanResult.CIACTA);
        this.setValue('de-txtUNIDAD', this.beanResult.UNIDAD);
        this.setValue('de-txtCECOS', this.beanResult.CECOS);
        this.setValue('de-txtLOCAC', this.beanResult.LOCAC);
        this.setValue('de-txtCODCTA', this.beanResult.CODCTA);
        this.setValue('de-txtSUBCTA', this.beanResult.SUBCTA);
        this.setValue('de-txtEQUIPO', this.beanResult.EQUIPO);
        this.setValue('de-txtICIA', this.beanResult.ICIA);
        
        this.setValue('de-txtNROPOLIZ', this.beanResult.NROPOLIZ);
        this.setValue('de-txtCLASE', this.beanResult.CLASE);
        this.setValue('de-txtDIRCLIT', this.beanResult.DIRCLIT);
        this.setValue('de-txtCODAGRU', this.beanResult.CODAGRU);
        this.setValue('de-txtDESMLINE', this.beanResult.DESMLINE);
        
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
                ["", "(None)"],
                ["1", "Match"],
                ["2", "Sin Aclaracion"]
            ]
        }));
        cmbSTATT.setValue('');
        
        var cmbFTEA = Ext.getCmp(prototype.id + '-de-cmbFTEA');
        cmbFTEA.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["BX", "BANAMEX"],
                ["A", "AMEX"],
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
        
        beanTemp.CODTRAN = this.getValue("de-txtCODTRAN").trim();
        beanTemp.DESCRI = this.getValue("de-txtDESCRI").trim();
        beanTemp.TIPREG = this.getValue("de-txtTIPREG").trim();
        beanTemp.CODEBANK = this.getValue("de-txtCODEBANK").trim();
        beanTemp.SCURRENCY = this.getValue("de-txtSCURRENCY").trim();
        beanTemp.SCOUNTRY = this.getValue("de-txtSCOUNTRY").trim();
        beanTemp.CODCLIT = this.getValue("de-txtCODCLIT").trim();
        beanTemp.CIACTA = this.getValue("de-txtCIACTA").trim();
        beanTemp.UNIDAD = this.getValue("de-txtUNIDAD").trim();
        beanTemp.CECOS = this.getValue("de-txtCECOS").trim();
        beanTemp.LOCAC = this.getValue("de-txtLOCAC").trim();
        beanTemp.CODCTA = this.getValue("de-txtCODCTA").trim();
        beanTemp.SUBCTA = this.getValue("de-txtSUBCTA").trim();
        beanTemp.EQUIPO = this.getValue("de-txtEQUIPO").trim();
        beanTemp.ICIA = this.getValue("de-txtICIA").trim();
        beanTemp.NROPOLIZ = this.getValue("de-txtNROPOLIZ").trim();
        beanTemp.CLASE = this.getValue("de-txtCLASE").trim();
        beanTemp.DIRCLIT = this.getValue("de-txtDIRCLIT").trim();
        beanTemp.CODAGRU = this.getValue("de-txtCODAGRU").trim();
        beanTemp.DESMLINE = this.getValue("de-txtDESMLINE").trim();

//        console.log(beanTemp);
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
                meDE.beanResult = res.result;
                meDE.mostrarData();
            }
        });
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
        this.setValue('de-txtCODTRAN', '');
        this.setValue('de-txtDESCRI', '');
        this.setValue('de-txtTIPREG', '');
        this.setValue('de-txtCODCLIT', '');
        this.setValue('de-txtCODAGRU', '');
        this.setValue('de-txtCODEBANK', '');
        this.setValue('de-txtSCOUNTRY', '');
        this.setValue('de-txtSCURRENCY', '');
        this.setValue('de-txtNROPOLIZ', '');
        this.setValue('de-txtCLASE', '');
        this.setValue('de-txtDIRCLIT', '');
        this.setValue('de-txtCIACTA', '');
        this.setValue('de-txtUNIDAD', '');
        this.setValue('de-txtCECOS', '');
        this.setValue('de-txtLOCAC', '');
        this.setValue('de-txtCODCTA', '');
        this.setValue('de-txtSUBCTA', '');
        this.setValue('de-txtEQUIPO', '');
        this.setValue('de-txtICIA', '');
        this.setValue('de-txtDESMLINE', '');
        
        this.setValue('txtUSCR', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSUP', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
    },
    //</editor-fold>
    
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
                animateTarget: btn,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        var beanTemp = {};
                        this.llenarData(beanTemp);
                        beanTemp.option = 'U';
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

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    maintenanceBean: function(beanTemp) {
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({           
            url: prototype.url + '/maintenanceBean',
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
        if (this.getValue("de-txtSCOUNTRY") === '' || 
            this.getValue("de-txtCODEBANK") === '' || 
            this.getValue("de-txtSCURRENCY") === '' || 
            this.getValue("de-txtCODTRAN") === '' || 
            this.getValue("de-txtTIPREG") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function() {

        Ext.getCmp(prototype.id + '-de-txtCODTRAN').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtTIPREG').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCODEBANK').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtSCOUNTRY').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtSCURRENCY').setReadOnly(true);
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