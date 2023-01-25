Ext.define('Ext.Praxis.controller.payments.ZonesMp.DataEntryZonesMpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryZonesMpController',
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
        prototype.id = 'ZonesMpForm';
        prototype.url = CONTEXTPATH + '/ZonesMp';
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
        //this.obtainData();
        switch (this.actionCode) {
            case 'I':
                //this.setearCamposClave();
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.getData();
                //this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {
        this.setValue('de-txtZONE', this.beanResult.ZONA);
        this.setValue('de-txtCOUNT', this.beanResult.PAIS);
        this.setValue('de-txtDESCR_PAIS', this.beanResult.DESCR_PAIS);
        this.setValue('de-txtINSUM', this.beanResult.INSUMP);
        this.setValue('de-txtDESC', this.beanResult.DESCRE);

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
        beanTemp.ZONA = this.getValue("de-txtZONE");
        beanTemp.PAIS = this.getValue("de-txtCOUNT");
        beanTemp.INSUMP = this.getValue("de-txtINSUM");
        beanTemp.DESCRE = this.getValue("de-txtDESC");

        if (this.beanResult === {}) {
            beanTemp.IN_ZONA = '';
            beanTemp.IN_PAIS = '';
            beanTemp.IN_INSUMP = '';
        } else {
            beanTemp.IN_ZONA = this.beanResult.ZONA;
            beanTemp.IN_PAIS = this.beanResult.PAIS;
            beanTemp.IN_INSUMP = this.beanResult.INSUMP;
        }


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
                    var msjResult = '';
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        beanTemp.beanString = JSON.stringify(beanTemp);
                        this.MaintenanceA4170(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
        var msj = '';

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
                                this.MaintenanceA4170(beanTemp);
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
                    /*var beanTemp = {};
                     beanTemp.option = 'D';
                     beanTemp.beanString = JSON.stringify(meDE.beanResult);*/
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    beanTemp.option = 'D';
                    beanTemp.beanString = JSON.stringify(beanTemp);
                    this.MaintenanceA4170(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>
    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceA4170: function (beanTemp) {
//        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA4170',
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