Ext.define('Ext.Praxis.controller.payments.CreditCard.DataEntryCreditCardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCreditCardController',
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
        prototype.id = 'CreditCardForm';
        prototype.url = CONTEXTPATH + '/CreditCard';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
//        console.log(this.p);
//        this.obtainData();
    },
    afterRender: function() {
//        console.log('afterRender');
        this.obtainData();
        switch (this.actionCode) {
            case 'I':
//                console.log('dd');

                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.getData();
//                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function() {
//        console.log(meDE.beanResult);
//        console.log(this.beanResult.CODEREJ);
        this.setValue('de-txtCODE', this.beanResult.CODE);
        this.setValue('de-txtNAMEC', this.beanResult.NAME);
        this.setValue('de-txtCODEBANK', this.beanResult.CODEBANK);
        this.setValue('de-txtNAMEBANK', this.beanResult.NAMEBANK);
        this.setValue('de-txtCOUNTRY', this.beanResult.COUNTRY);
        this.setValue('de-txtCURRENC', this.beanResult.CURRENC);
        this.setValue('de-txtCLIENTE', this.beanResult.CLIENTE);
        
        this.setValue('cmbFSTAT', this.beanResult.FSTAT);
        this.setValue('cmbFNOBANK', this.beanResult.FNOBANK);
        this.setValue('de-txtCLIENTE', this.beanResult.CLIENTE);
        this.setValue('de-txtCLIENTE', this.beanResult.CLIENTE);
        this.setValue('de-txtCLIENTE', this.beanResult.CLIENTE);



        this.setValue('de-txtRATECON', Ext.util.Format.number(this.beanResult.RATECON, '0,000.00'));
        this.setValue('de-txtRATECOP1', Ext.util.Format.number(this.beanResult.RATECOP1, '0,000.00'));
        this.setValue('de-txtRATECOP2', Ext.util.Format.number(this.beanResult.RATECOP2, '0,000.00'));
        this.setValue('de-txtRATEIVA', Ext.util.Format.number(this.beanResult.RATEIVA, '0,000.00'));
        this.setValue('de-txtCODEQUIV', this.beanResult.CODEQUIV);

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },
    obtainData: function() {
//        console.log('obtainData');

        var cmbFSTAT = Ext.getCmp(prototype.id + '-cmbFSTAT');
        cmbFSTAT.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "None"],
                ["O", "Open"],
                ["C", "Closed"]
            ]
        }));

        cmbFSTAT.setValue('');

        var cmbFNOBANK = Ext.getCmp(prototype.id + '-cmbFNOBANK');
        cmbFNOBANK.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "None"],
                ["B", "Original Boomers"],
                ["A", "Additional Boomers"],
                ["P", "Paypal"],
                ["U", "UATP"]
            ]
        }));

        cmbFNOBANK.setValue('');

//        Ext.getCmp(prototype.id + '-de-cmbCOUNTRY').bindStore(
//                Ext.create('Ext.data.Store', {data: this.lstCountry, autoLoad: true})
//                );
//        Ext.getCmp(prototype.id + '-de-cmbCOUNTRY').setValue('');

    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
//        console.log('llenarData');

        beanTemp.CODE = this.getValue("de-txtCODE");
        beanTemp.NAME = this.getValue("de-txtNAMEC");
        beanTemp.NAMEBANK = this.getValue("de-txtNAMEBANK");
        beanTemp.CLIENTE = this.getValue("de-txtCLIENTE");
        beanTemp.FSTAT = this.getValue("cmbFSTAT");
        beanTemp.RATECON = this.getValue("de-txtRATECON");
        beanTemp.RATECOP1 = this.getValue("de-txtRATECOP1");
        beanTemp.RATECOP2 = this.getValue("de-txtRATECOP2");
        beanTemp.RATEIVA = this.getValue("de-txtRATEIVA");

        beanTemp.CODEBANK = me.bean.CODEBANK === undefined ? '' : me.bean.CODEBANK;
        beanTemp.COUNTRY = me.bean.COUNTRY === undefined ? '' : me.bean.COUNTRY;
        beanTemp.CURRENC = me.bean.CURRENC === undefined ? '' : me.bean.CURRENC;
        beanTemp.FNOBANK = me.bean.FNOBANK === undefined ? '' : me.bean.FNOBANK;


        beanTemp.NEW_CODEBANK = this.getValue("de-txtCODEBANK");
        beanTemp.NEW_COUNTRY = this.getValue("de-txtCOUNTRY");
        beanTemp.NEW_CURRENC = this.getValue("de-txtCURRENC");
        beanTemp.NEW_FNOBANK = this.getValue("cmbFNOBANK");


        beanTemp.CODEQUIV = this.getValue("de-txtCODEQUIV");

        if (beanTemp.RATECON.trim() === '') {
            beanTemp.RATECON = 0;
        }
        if (beanTemp.RATECOP1.trim() === '') {
            beanTemp.RATECOP1 = 0;
        }
        if (beanTemp.RATECOP2.trim() === '') {
            beanTemp.RATECOP2 = 0;
        }
        if (beanTemp.RATEIVA.trim() === '') {
            beanTemp.RATEIVA = 0;
        }


        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();

//        console.log(beanTemp);

    },
    getData: function() {
//        console.log('getData');
        var beanString = JSON.stringify(meDE.bean.data);
//        console.log(beanString);

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
                    console.log('onSaveClick');
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        this.MaintenanceA2280(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function(btn) {
//        console.log('onUpdateClick');
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
                            this.MaintenanceA2280(beanTemp);
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
                    this.MaintenanceA2280(beanTemp);
                }
            }
        });
    },
    onCancelClick: function(btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceA2280: function(beanTemp) {
//        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
//        console.log(beanString);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA2280',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);

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
        if (this.getValue("de-txtCODE") === '' || this.getValue("de-txtCODEBANK") === '' || this.getValue("de-txtCOUNTRY") === '' || this.getValue("de-txtCURRENC") === '') {
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