Ext.define('Ext.Praxis.controller.payments.Miscellaneous.DataEntryMiscellaneousController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryMiscellaneousController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    copia: '',
    // </editor-fold>
    init: function (view) {
        prototype.id = 'MiscellaneousForm';
        prototype.url = CONTEXTPATH + '/MiscellaneousPayment';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lst = this.p.lst;
//        console.log(this.p);
//        this.obtainData();
    },
    afterRender: function () {
//        console.log('afterRender');
        this.obtainData();
        switch (this.actionCode) {
            case 'I':
                this.setearCamposClave();
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
        console.log(meDE.beanResult);
        this.setValue('de-txtCodeTable', this.beanResult.TTABLA);
        this.setValue('de-txtCTable', this.beanResult.CODETB);
        this.copia = this.getValue('de-txtCTable');
        this.setValue('de-txtCDesc1', this.beanResult.DESCRE1);
        this.setValue('de-txtCDesc2', this.beanResult.DESCRE2);
        this.setValue('cmbDoc', this.beanResult.TDOC);
//        this.setValue('de-txtCant1', this.beanResult.CANT1);
//        this.setValue('de-txtCant2', this.beanResult.CANT2);
        this.setValue('de-txtINI', this.beanResult.DATINI);
        this.setValue('de-txtFIN', this.beanResult.DATFIN);
        this.setValue('cmbStval', this.beanResult.STVAL);

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },
    obtainData: function () {
        var cmbStval = Ext.getCmp(prototype.id + '-cmbStval');
        cmbStval.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "none"],
                ["V", "Vigente"],
                ["A", "Anulado"]
            ]
        }));
        cmbStval.setValue('');

        var cmbDoc = Ext.getCmp(prototype.id + '-cmbDoc');
        cmbDoc.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "none"],
                ["S", "Sales"],
                ["R", "Refund"],
                ["A", "Adjustment"],
                ["N", "ADM/NOTA CARGO"]
            ]
        }));
        cmbDoc.setValue('');

    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {
        beanTemp.TTABLA = this.getValue("de-txtCodeTable");
        beanTemp.CODETB = this.getValue("de-txtCTable");
        beanTemp.CODETBCO = this.copia;
        beanTemp.DESCRE1 = this.getValue("de-txtCDesc1");
        beanTemp.DESCRE2 = this.getValue("de-txtCDesc2");
        beanTemp.TDOC = this.getValue("cmbDoc");
//        beanTemp.CANT1 = this.getValue("de-txtCant1");
//        var a =  this.getValue("de-txtCant1");
//        if( a === ''){
//            beanTemp.CANT1 = 0;
//        }
//        beanTemp.CANT2 = this.getValue("de-txtCant2");
//        var b =  this.getValue("de-txtCant1");
//        if( b === ''){
//            beanTemp.CANT1 = 0;
//        }
        beanTemp.DATINI = this.getValue("de-txtINI");
        beanTemp.DATFIN = this.getValue("de-txtFIN");
        beanTemp.STVAL = this.getValue("cmbStval");

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();
    },
    getData: function () {
        var beanString = JSON.stringify(meDE.bean.data);
        console.log(beanString);
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
                console.log(meDE.mostrarData());
            }
        });
    },
    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        //this.setValue('txtCODSOUR', '');

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
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        beanTemp.beanString = JSON.stringify(beanTemp);
                        this.MaintenanceA4169(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
        var msj = this.validateDates();

        if (msj === '') {
            Ext.Msg.show(
                    {
                        title: '.:PRAXIS:.',
                        msg: 'Are you sure to update?',
                        buttons: Ext.MessageBox.YESNO,
                        scope: this,
                        animateTarget: btn,
                        icon: Ext.MessageBox.QUESTION,
                        modal: true,
                        fn: function (btn) {
                            if (btn === 'yes') {
                                var beanTemp = {};
                                this.llenarData(beanTemp);
                                beanTemp.option = 'U';
                                beanTemp.beanString = JSON.stringify(beanTemp);
                                this.MaintenanceA4169(beanTemp);
                            }
                        }
                    });
        } else {
            global.Msg({msg: msj});
        }

    },
    validateDates: function () {
        var DATINI = this.getValue("de-txtINI");
        var DATFIN = this.getValue("de-txtFIN");
        var msj = '';

        if (DATINI.length === 8 && DATFIN.length === 8) {
            if (DATFIN < DATINI) {
                msj = 'Error in dates';
            }
        } else {
            msj = 'Error in date lenghts'
        }

        return msj;
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
                    beanTemp.option = 'D';
                    beanTemp.beanString = JSON.stringify(meDE.beanResult);
                    this.MaintenanceA4169(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>
    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceA4169: function (beanTemp) {
//        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA4169',
            method: 'POST',
            timeout: 60000000,
            params: beanTemp,
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
                    global.Msg({msg: 'An error occurred'});
                }
            }
        });
    },
    //</editor-fold>

    validacionInsert: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtCodeTable") === '' /* || this.getValue("de-txtCant1") === '' || this.getValue("de-txtCant2") === '' */ || this.getValue("de-txtCDesc1") === '' || this.getValue("cmbDoc") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {
        Ext.getCmp(prototype.id + '-de-txtCodeTable').setReadOnly(true);
    },
    setearCamposClave: function () {
        Ext.getCmp(prototype.id + '-de-txtCodeTable').setValue('89');
        //Ext.getCmp(prototype.id + '-de-txtCodeTable').setReadOnly(true);
    },
    Habilitarlbl: function () {
//        Ext.getCmp(prototype.id + '-lblDescripcion').show();
//        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
//        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function () {
//        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
//            Ext.getCmp(prototype.id + '-lbldes').hide();
//        } else {
//            Ext.getCmp(prototype.id + '-lbldes').show();
//        }
    },
    Habilitarlbl1: function () {
//        Ext.getCmp(prototype.id + '-lbldes').hide();
//        if (this.getValue("txtCODSOUR") == '') {
//            Ext.getCmp(prototype.id + '-lbldes2').hide();
//        } else {
//            Ext.getCmp(prototype.id + '-lbldes2').show();
//        }
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