Ext.define('Ext.Praxis.controller.payments.StatementRules.DataEntryStatementRulesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryStatementRulesController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    lstCurreny: [],
    lstCorep: [],
    paramsObtainData: {},
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function (view) {
        prototype.id = 'StatementRulesForm';
        prototype.url = CONTEXTPATH + '/StatementRules';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
        this.obtainData();
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
    obtainData: function () {

        this.paramsObtainData.COUNTRY = 2;
        this.paramsObtainData.CURRENCY = 2;
        this.paramsObtainData.COREP = 2;

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                me.lstCountry = res.lstCountry;
                me.lstCurrency = res.lstCountry;
                me.lstCorep = res.lstProcessor;

                var storeDataCountry = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });
                var storeDataCurrency = Ext.create('Ext.data.Store', {
                    data: me.lstCurrency,
                    autoLoad: true
                });
                var storeDataCorep = Ext.create('Ext.data.Store', {
                    data: lstCorep,
                    autoLoad: true
                });

                Ext.getCmp(prototype.id + '-cmbCOUNTRY').bindStore(storeDataCountry);
                Ext.getCmp(prototype.id + '-cmbCURRENCY').bindStore(storeDataCurrency);
                Ext.getCmp(prototype.id + '-cmbCOREP').bindStore(storeDataCorep);
                Ext.getCmp(prototype.id + '-cmbCOUNTRY').setValue('');
                Ext.getCmp(prototype.id + '-cmbCURRENCY').setValue('');
                Ext.getCmp(prototype.id + '-cmbCOREP').setValue('');
                global.clear();
            }
        });
    },
    mostrarData: function () {
        this.setValue('de-txtCOREP', this.beanResult.COREP);
        this.setValue('de-txtACCOUNT', this.beanResult.ACCOUNT);
        this.setValue('de-txtSCOUNTRY', this.beanResult.SCOUNTRY);
        this.setValue('de-txtSOCIETY', this.beanResult.SOCIETY);
        this.setValue('de-txtSCURRENCY', this.beanResult.SCURRENCY);
        this.setValue('de-txtTEXTOLAR', this.beanResult.TEXTOLAR);

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },

    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {

        if (beanTemp.option === 'I' || beanTemp.option === 'D') {
            beanTemp.IN_COREP = this.getValue("de-txtCOREP");
            beanTemp.IN_ACCOUNT = this.getValue("de-txtACCOUNT");
            beanTemp.IN_SCOUNTRY = this.getValue("de-txtSCOUNTRY");
            beanTemp.IN_SOCIETY = this.getValue("de-txtSOCIETY");
            beanTemp.IN_SCURRENCY = this.getValue("de-txtSCURRENCY");
            beanTemp.IN_TEXTOLAR = this.getValue("de-txtTEXTOLAR");
        } else if (beanTemp.option === 'U') {
            beanTemp.IN_COREP = this.getValue("de-txtCOREP");
            beanTemp.IN_ACCOUNT = this.beanResult.ACCOUNT;
            beanTemp.IN_SCOUNTRY = this.beanResult.SCOUNTRY;
            beanTemp.IN_SOCIETY = this.beanResult.SOCIETY;
            beanTemp.IN_SCURRENCY = this.beanResult.SCURRENCY;
            beanTemp.IN_TEXTOLAR = this.beanResult.TEXTOLAR;

            beanTemp.IN_COREPNEW = this.getValue("de-txtCOREP");
            beanTemp.IN_ACCOUNTNEW = this.getValue("de-txtACCOUNT");
            beanTemp.IN_SCOUNTRYNEW = this.getValue("de-txtSCOUNTRY");
            beanTemp.IN_SOCIETYNEW = this.getValue("de-txtSOCIETY");
            beanTemp.IN_SCURRENCYNEW = this.getValue("de-txtSCURRENCY");
            beanTemp.IN_TEXTOLARNEW = this.getValue("de-txtTEXTOLAR");
        }

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();
    },
    getData: function () {

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
        this.setValue('txtCOREP', '');
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
                    beanTemp.option = 'I';
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);

                    if (msjResult === '') {
                        this.MaintenanceMPF071(beanTemp);
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
                            beanTemp.option = 'U';
                            this.llenarData(beanTemp);
                            this.MaintenanceMPF071(beanTemp);
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
                    beanTemp.option = 'D';
                    this.llenarData(beanTemp);
                    this.MaintenanceMPF071(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceMPF071">
    MaintenanceMPF071: function (beanTemp) {
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceMPF071',
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
                } else
                    global.Msg({msg: ''});
            }
        });
    },
    //</editor-fold>

    validacionInsert: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtCOREP") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {

        Ext.getCmp(prototype.id + '-de-txtCOREP').setReadOnly(true);
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