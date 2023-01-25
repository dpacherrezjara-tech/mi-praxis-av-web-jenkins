Ext.define('Ext.Praxis.controller.payments.SourceControl.DataEntrySourceControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntrySourceControlController',
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
        prototype.id = 'SourceControlForm';
        prototype.url = CONTEXTPATH + '/SourceControl';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
        console.log(this.p);
//        this.obtainData();
    },
    afterRender: function() {
        console.log('afterRender');
        switch (this.actionCode) {
//            case 'I':
//                Ext.getCmp(prototype.id + '-btn-save').show();
//                Ext.getCmp(prototype.id + '-btn-update').hide();
//                Ext.getCmp(prototype.id + '-btn-delete').hide();
//                Ext.getCmp(prototype.id + '-btn-cancel').show();
//                break;
            case 'U':
                this.getData();
                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },

    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
        
//        beanTemp.TOTREG = this.getValue("de-txtCODE");
        beanTemp.TOTACU = this.getValue("de-txtCODEN");
        beanTemp.COMENT = this.getValue("de-txtCODEQUIV");
        beanTemp.STAT = this.getValue("de-txtSTAT");
        beanTemp.CCUST = this.getValue("de-txtCCUST");
        beanTemp.NOMFILE = this.getValue("de-txtNOMFILE");
        beanTemp.FPROC = this.getValue("de-txtFPROC");
        
        beanTemp.TOTDIA = this.getValue("de-txtTOTDIA");
        beanTemp.TOTFIN = this.getValue("de-txtTOTFIN");
        beanTemp.TOTREG = this.getValue("de-txtTOTREG");
        
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
                console.log(res);
                meDE.beanResult = res.result;
                meDE.mostrarData();

            }
        });
    },
    
    mostrarData: function() {
        console.log(meDE.beanResult);

        this.setValue('de-txtCODEN', this.beanResult.TOTACU);
        this.setValue('de-txtCODEQUIV', this.beanResult.COMENT.trim());
        this.setValue('de-txtCCUST', this.beanResult.CCUST);
        this.setValue('de-txtNOMFILE', this.beanResult.NOMFILE);
        this.setValue('de-txtFPROC', this.beanResult.FPROC);
        this.setValue('de-txtSTAT', this.beanResult.STAT);
        this.setValue('de-txtTOTDIA', this.beanResult.TOTDIA);
        this.setValue('de-txtTOTFIN', this.beanResult.TOTFIN);
        this.setValue('de-txtTOTREG', this.beanResult.TOTREG);
        

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
//    limpiarData: function() {
//        this.setValue('txtCODSOUR', '');
//        this.setValue('txtDESSOU', '');
//        this.setValue('txtGRUSOR', '');
//        this.setValue('txtstrGRUSOR', '');
//        Ext.getCmp(prototype.id + '-lblDescripcion').setText('');
//        Ext.getCmp(prototype.id + '-lblDescripcion2').setText('');
//        this.setValue('txtUSCR', '');
//        this.setValue('txtFECR', '');
//        this.setValue('txtHOCR', '');
//        this.setValue('txtUSUP', '');
//        this.setValue('txtFEUP', '');
//        this.setValue('txtHOUP', '');
//    },
    //</editor-fold>
    toUpperCase: function(obj, value, opts) {
        console.log(obj);
        console.log(value);
        console.log(opts);
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
                            this.Maintenance(beanTemp);
                        }
                    }
                });
    },
   
    onCancelClick: function(btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    Maintenance: function(beanTemp) {
        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/Maintenance',
            method: 'POST',
            timeout: 60000000,
            params: beanTemp,
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

//    validacionInsert: function(beanTemp) {
//        var msjResult = '';
//        if (this.getValue("de-txtCODEBANK") === '' || this.getValue("de-cmbCOUNTRY") === '' || this.getValue("de-txtCURRENC") === '') {
//            msjResult = "You must enter the required field.";
//        }
//        return msjResult;
//    },
    DeshabilitarCampoClave: function() {

        Ext.getCmp(prototype.id + '-de-txtCODEN').setReadOnly(true);
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