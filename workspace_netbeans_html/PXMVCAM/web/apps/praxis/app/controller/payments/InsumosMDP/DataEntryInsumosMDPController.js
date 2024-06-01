Ext.define('Ext.Praxis.controller.payments.InsumosMDP.DataEntryInsumosMDPController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryInsumosMDPController',
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
        prototype.id = 'InsumosMDPForm';
        prototype.url = CONTEXTPATH + '/InsumosMDP';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
//        this.lstCountry = this.p.lstCountry;
//        this.obtainData();
    },
    afterRender: function() {
        switch (this.actionCode) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
//                console.log(meDE.bean.data, 'meDE.bean' )
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
        this.setValue('de-txtAPLIC', this.beanResult.APLIC);
        this.setValue('de-txtINPNAME', this.beanResult.INPNAME);
        this.setValue('de-txtSEQNUM', this.beanResult.SEQNUM);
        this.setValue('de-txtDENV', this.beanResult.DENV);
        this.setValue('de-txtNETDIR', this.beanResult.NETDIR);
        this.setValue('de-txtINPEXTE', this.beanResult.INPEXTE);
        this.setValue('de-txtINPTYPE', this.beanResult.INPTYPE);
        this.setValue('de-txtINPDESC', this.beanResult.INPDESC);
        this.setValue('de-txtLIBNAME', this.beanResult.LIBNAME);
        this.setValue('de-txtOUTNAME', this.beanResult.OUTNAME);
        this.setValue('de-txtFECPROC', this.beanResult.FECPROC);
        this.setValue('de-txtSTAT', this.beanResult.STAT);
        this.setValue('de-txtTABLA', this.beanResult.TABLA);
        this.setValue('de-txtQTYREG', this.beanResult.QTYREG);
        this.setValue('de-txtFASE', this.beanResult.FASE);

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },
    
    
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
//        beanTemp.CODEM = this.getValue("de-txtCODEM");
//        beanTemp.DESCR = this.getValue("de-txtDESCR");

        beanTemp.APLIC = this.getValue("de-txtAPLIC").trim();
        beanTemp.INPNAME = this.getValue("de-txtINPNAME").trim();
        beanTemp.TABLA = this.getValue("de-txtTABLA").trim();
        beanTemp.NETDIR = this.getValue("de-txtNETDIR").trim();
        beanTemp.INPDESC = this.getValue("de-txtINPDESC").trim();
        beanTemp.STAT = this.getValue("de-txtSTAT").trim();
        beanTemp.INPEXTE = this.getValue("de-txtINPEXTE").trim();
        beanTemp.OUTNAME = this.getValue("de-txtOUTNAME").trim();
        beanTemp.FASE = this.getValue("de-txtFASE").trim();
        beanTemp.INPTYPE = this.getValue("de-txtINPTYPE").trim();
        beanTemp.FECPROC = this.getValue("de-txtFECPROC").trim();
        beanTemp.DENV = this.getValue("de-txtDENV").trim();
        beanTemp.QTYREG = this.getValue("de-txtQTYREG").trim();
        beanTemp.LIBNAME = this.getValue("de-txtLIBNAME").trim();
        beanTemp.SEQNUM = this.getValue("de-txtSEQNUM").trim();     
        
        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();
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
                    
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        beanTemp.beanString = JSON.stringify(beanTemp);  // JSON:CONVERTIR
                        this.MaintenanceA2358(beanTemp);
                    } else {
                        global.Msg({msg: msjResult}); // golbla.Msg: es una funcion que se muestre un cuadro 
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
                            beanTemp.beanString = JSON.stringify(beanTemp);
                            this.MaintenanceA2358(beanTemp);
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
                    beanTemp.beanString = JSON.stringify(beanTemp);
                    this.MaintenanceA2358(beanTemp);
                }
            }
        });
    },
    onCancelClick: function(btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">  
    MaintenanceA2358: function(beanTemp) {
//        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({  //Es un llamado
            url: prototype.url + '/MaintenanceA2358', //ruta donde conecto con el controller.java
            method: 'POST',
            timeout: 60000000,
            params: beanTemp, //objeto temporal
//            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText); //cobierta la informacion para poder usarlo
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
        var msjResult = ''; //DECLARACION DE VARIABLE VACIA
        if (this.getValue("de-txtAPLIC") === '' || this.getValue("de-txtINPNAME") === '') { //CONDICION 
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function() {

        Ext.getCmp(prototype.id + '-de-txtAPLIC').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtINPNAME').setReadOnly(true);
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