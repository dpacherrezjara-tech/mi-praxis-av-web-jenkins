Ext.define('Ext.Praxis.controller.payments.Emails.DataEntryEmailsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryEmailsController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    dataObtain: {},
    copia: '',
    // </editor-fold>
    init: function (view) {
        prototype.id = 'EmailsForm';
        prototype.url = CONTEXTPATH + '/Emails';
        prototype.url_amex = CONTEXTPATH + '/SalesReconciliAmex';
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
    },
    setButtons: function () {
        switch (this.actionCode) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.getData();
                this.desHabilitartxt();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {
        console.log(meDE.beanResult);
        this.setValue('de-txtCODIGO', this.beanResult.CODIGO);

        this.setValue('de-cmbCBANK', this.beanResult.CBANK);
        this.setValue('de-cmbSCARCOD', this.beanResult.SCARCOD);
        this.setValue('de-txtFTE', this.beanResult.FTE);
        this.setValue('de-txtDESCR', this.beanResult.DESCR);
        this.setValue('de-cmbZONA', this.beanResult.ZONA);

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);

        this.setGridEMAIL(this.beanResult.CODIGO);
    },
    obtainData: function () {

        var beanZonas = {};

        Ext.Ajax.request({
            url: prototype.url_amex + '/getZonas',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: JSON.stringify(beanZonas)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-de-cmbZONA').bindStore(
                            Ext.create('Ext.data.Store', {data: res.data, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-de-cmbZONA').setValue('');


                }
            }
        });

        this.dataObtain.CARD = 2;
        this.dataObtain.BANK = 1;

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-de-cmbCBANK').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstBank, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-de-cmbCBANK').setValue('');

                    Ext.getCmp(prototype.id + '-de-cmbSCARCOD').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-de-cmbSCARCOD').setValue('');

                    meDE.setButtons();
                    Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                } else
                    global.Msg({msg: res.sesion});
            }
        });
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {
        beanTemp.CODIGO = this.getValue("de-txtCODIGO");
        beanTemp.CBANK = this.getValue("de-cmbCBANK");
        beanTemp.SCARCOD = this.getValue("de-cmbSCARCOD");
        beanTemp.FTE = this.getValue("de-txtFTE");
        beanTemp.DESCR = this.getValue("de-txtDESCR");
        beanTemp.ZONA = this.getValue("de-cmbZONA");

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();

        var listaGrilla = Ext.getCmp(prototype.id + '-gridEMAIL').getStore().data;
        var beanDet = {};
        var listaNueva = [];

        for (var i = 0; i < listaGrilla.length; i++) {
            beanDet = listaGrilla.items[i];

            var beanNuevo = {};
            beanNuevo.EMAIL = beanDet.data.EMAIL;
            beanNuevo.CODIGO = this.getValue("de-txtCODIGO");
            listaNueva.push(beanNuevo);
        }
        beanTemp.lstDetalle = listaNueva;
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
                    //var msjResult = this.validacionInsert(beanTemp);
                    var msjResult = '';
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        beanTemp.beanString = JSON.stringify(beanTemp);
                        this.MaintenanceA4172(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
        //var msj = this.validateDates();
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
                                this.MaintenanceA4172(beanTemp);
                            }
                        }
                    });
        } else {
            global.Msg({msg: msj});
        }

    },
    validateDates: function () {
        var msj = '';

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
                    this.MaintenanceA4172(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>
    //<editor-fold defaultstate="collapsed" desc="MaintenanceA4172">
    MaintenanceA4172: function (beanTemp) {
//        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA4172',
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
        if (this.getValue("de-txtCDesc1") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    Habilitarlbl: function () {
//        Ext.getCmp(prototype.id + '-lblDescripcion').show();
//        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
//        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function () {
        Ext.getCmp(prototype.id + '-de-txtCODIGO').setReadOnly(true);
    },
    Habilitarlbl1: function () {
//        Ext.getCmp(prototype.id + '-lbldes').hide();
//        if (this.getValue("txtCODSOUR") == '') {
//            Ext.getCmp(prototype.id + '-lbldes2').hide();
//        } else {
//            Ext.getCmp(prototype.id + '-lbldes2').show();
//        }
    },
    addEMAIL: function () {
        var email = Ext.getCmp(prototype.id + '-txtEMAIL').getValue();
        if (email !== '') {
            var re = /\S+@\S+\.\S+/;
            if (re.test(email)) {
                var beanTemp = {};
                var store_gridEMAIL = Ext.getCmp(prototype.id + '-gridEMAIL').getStore();
                beanTemp.EMAIL = Ext.getCmp(prototype.id + '-txtEMAIL').getValue();
                this.insertEMAIL(store_gridEMAIL, beanTemp);
            } else {
                global.Msg({msg: 'Enter a valid email'});
            }
        } else {
            global.Msg({msg: 'Empty field'});
        }
    },
    insertEMAIL: function (store_gridEMAIL, objEMAIL) {
        var dataRow = {};
        var duplicado = false;
        if (store_gridEMAIL.data.length > 0) {
            for (var i = 0; i < store_gridEMAIL.data.length; i++) {
                var dataRow1 = store_gridEMAIL.data.items[i];
                if (dataRow1.data.EMAIL === this.getValue("txtEMAIL")) {
                    duplicado = true;
                }
            }
            if (!duplicado) {
                dataRow = store_gridEMAIL.data.items[store_gridEMAIL.data.length - 1 ].copy();
                dataRow.id = 'ItrecordEMAIL' + Math.random();
                dataRow.data.EMAIL = this.getValue("txtEMAIL");
            }
        } else {
            dataRow.id = 'ItrecordEMAIL';
            dataRow.EMAIL = Ext.getCmp(prototype.id + '-txtEMAIL').getValue();
        }

        console.log(dataRow);
        if (!duplicado) {
            store_gridEMAIL.add(dataRow);
            Ext.getCmp(prototype.id + '-gridEMAIL').getView().refresh();
            this.clearEMAIL();
        } else {
            global.Msg({msg: 'Registro duplicado'});
        }
        console.log(store_gridEMAIL.data.length);
    },
    removeEMAIL: function (record) {
        var store_gridEMAIL = Ext.getCmp(prototype.id + '-gridEMAIL').getStore();
        var rowIndex = store_gridEMAIL.indexOf(record);
        store_gridEMAIL.removeAt(rowIndex);

        var beanTemp = {};
        beanTemp.changeEMAIL = true;
        Ext.getCmp(prototype.id + '-gridEMAIL').getView().refresh();
        console.log(store_gridEMAIL.data.length);
    },
    clearEMAIL: function () {
        Ext.getCmp(prototype.id + '-txtEMAIL').setValue('');
    },
    setGridEMAIL: function (CODIGO) {

        Ext.Ajax.request({
            url: prototype.url + '/searchEMAIL',
            method: 'POST',
            timeout: 60000000,
//            params: beanTemp,
            params: {CODIGO: CODIGO},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                var storeData = Ext.create('Ext.data.Store', {
                    data: res.data,
                    autoLoad: true
                });

                Ext.getCmp(prototype.id + '-gridEMAIL').bindStore(storeData);

            }
        });
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