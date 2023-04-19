Ext.define('Ext.Praxis.controller.payments.CreditCard.DataEntryCommCreditCardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCommCreditCardController',
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
//        this.obtainData();
    },
    afterRender: function() {
//        console.log('afterRender');
        this.obtainData();
        switch (this.actionCode) {
            case 'I':
                Ext.getCmp(prototype.id + '-gridDataCommInfo').getStore().removeAll();
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
        console.log(this.beanResult);

        this.setValue('de-txtCODE', this.beanResult.CODE);
        this.setValue('de-txtNAMEC', this.beanResult.NAMECAR);
        this.setValue('de-txtCODEBANK', this.beanResult.CODEBANK);
        this.setValue('de-txtNAMEBANK', this.beanResult.NAMEBANK);
        this.setValue('de-txtBSPBANK', this.beanResult.BSPBANK);
        this.setValue('de-txtCOUNTRY', this.beanResult.COUNTRY);
        this.setValue('de-txtCURRENC', this.beanResult.CURRENC);
        this.setValue('de-txtCLIENTE', this.beanResult.CLIENTE);
        this.setValue('de-txtNAMEBSPBANK', this.beanResult.strBSPBANK);

        this.setValue('cmbFSTAT', this.beanResult.FSTAT);
        this.setValue('cmbFNOBANK', this.beanResult.FNOBANK);

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);

        var storeData = Ext.create('Ext.data.Store', {
            data: this.beanResult.lstDetalle,
            autoLoad: true
        });

        Ext.getCmp(prototype.id + '-gridDataCommInfo').bindStore(storeData);

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

    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {

        beanTemp.CODE = this.getValue("de-txtCODE");
        beanTemp.NAME = this.getValue("de-txtNAMEC");
        beanTemp.NAMEBANK = this.getValue("de-txtNAMEBANK");
        beanTemp.BSPBANK = this.getValue("de-txtBSPBANK");
        beanTemp.CLIENTE = this.getValue("de-txtCLIENTE");
        beanTemp.FSTAT = this.getValue("cmbFSTAT");

        beanTemp.CODEBANK = this.beanResult.CODEBANK === undefined ? '' : this.beanResult.CODEBANK;
        beanTemp.COUNTRY = this.beanResult.COUNTRY === undefined ? '' : this.beanResult.COUNTRY;
        beanTemp.CURRENC = this.beanResult.CURRENC === undefined ? '' : this.beanResult.CURRENC;
        beanTemp.FNOBANK = this.beanResult.FNOBANK === undefined ? '' : this.beanResult.FNOBANK;

        beanTemp.NEW_CODEBANK = this.getValue("de-txtCODEBANK");
        beanTemp.NEW_COUNTRY = this.getValue("de-txtCOUNTRY");
        beanTemp.NEW_CURRENC = this.getValue("de-txtCURRENC");
        beanTemp.NEW_FNOBANK = this.getValue("cmbFNOBANK");
        beanTemp.CODEQUIV = this.getValue("de-txtCODEQUIV");

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();


        var listaGrilla = Ext.getCmp(prototype.id + '-gridDataCommInfo').getStore().data;
        var beanDet = {};
        var listaNueva = [];

        for (var i = 0; i < listaGrilla.length; i++) {
            beanDet = listaGrilla.items[i];

            var beanNuevo = {};
            beanNuevo.TCOMIS = beanDet.data.TCOMIS;
            beanNuevo.DCOMIS = beanDet.data.DCOMIS;
            beanNuevo.FECFROM = beanDet.data.FECFROM;
            beanNuevo.FECTO = beanDet.data.FECTO;
            beanNuevo.SEQ = beanDet.data.SEQ;
            beanNuevo.BASEC = beanDet.data.BASEC;
            beanNuevo.MONTO = beanDet.data.MONTO;
            beanNuevo.MESES = beanDet.data.MESES;
            beanNuevo.RATE = parseFloat((beanDet.data.RATE + '').trim().replace(',', ''));
            beanNuevo.RATEIVA = parseFloat((beanDet.data.RATEIVA + '').trim().replace(',', ''));

            listaNueva.push(beanNuevo);
        }
        beanTemp.lstDetalle = listaNueva;

        console.log(beanTemp);

    },
    getData: function() {
//        console.log('getData');

        win.lblUser_toolTip("Estructura: A2348");
        var beanString = JSON.stringify(meDE.bean.data);

        Ext.Ajax.request({
            url: prototype.url + '/searchCompleteComm',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                meDE.beanResult = res.beanComplete;
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
    //
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
                        this.MaintenanceA2348Comm(beanTemp);
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
                            this.MaintenanceA2348Comm(beanTemp);
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
                    this.MaintenanceA2348Comm(beanTemp);
                }
            }
        });
    },
    onCancelClick: function(btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA2348Comm">
    MaintenanceA2348Comm: function(beanTemp) {

        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA2348Comm',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
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

                } else {
                    global.Msg({msg: ''})
                }
                ;
            }
        });
    },
    //</editor-fold>
    btnAddComissionInformation_click: function() {
        Ext.getCmp(prototype.id + '-hboxEdit').show();
        this.setValue('de-txtSEQ', "");
        this.setValue('de-txtCCOMIS', "");
        this.setValue('de-txtDCOMIS', "");
        this.setValue('de-txtFECFROM', "");
        this.setValue('de-txtFECTO', "");
        this.setValue('de-cmbBASEC', "");
        this.setValue('de-txtRATE', "");
        this.setValue('de-txtRATEIVA', "");
        this.setValue('de-txtMONTO', "");
        this.setValue('de-txtMESES', "");
    },
    onEditClickDEComm: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        console.log(rec);
        Ext.getCmp(prototype.id + '-hboxEdit').show();
        this.setValue('de-txtSEQ', rec.data.SEQ);
        this.setValue('de-txtCCOMIS', rec.data.TCOMIS);
        this.setValue('de-txtDCOMIS', rec.data.DCOMIS);
        this.setValue('de-txtFECFROM', rec.data.FECFROM);
        this.setValue('de-txtFECTO', rec.data.FECTO);
        this.setValue('de-cmbBASEC', rec.data.BASEC);
        this.setValue('de-txtRATE', rec.data.RATE);
        this.setValue('de-txtRATEIVA', rec.data.RATEIVA);
        this.setValue('de-txtMONTO', rec.data.MONTO);
        this.setValue('de-txtMESES', rec.data.MESES);
    },
    btnImgCancel_click: function() {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to cancel ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    Ext.getCmp(prototype.id + '-hboxEdit').hide();
                }
            }
        });

    },
    btnImgSave_click: function() {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to save/update ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    if (this.getValue('de-txtFECFROM').length < 8 || this.getValue('de-txtFECTO').length < 8) {
                        global.Msg({msg: 'Invalid Length Date'})
                    } else if (this.getValue('de-txtFECFROM') > this.getValue('de-txtFECTO')) {
                        global.Msg({msg: 'Invalid Date. *From Date* is greather than *To Date*'})
                    } else {

                        var SEQ = this.getValue('de-txtSEQ');
                        var CCOMIS = this.getValue('de-txtCCOMIS');
                        var DCOMIS = this.getValue('de-txtDCOMIS');
                        var FECFROM = this.getValue('de-txtFECFROM');
                        var FECTO = this.getValue('de-txtFECTO');
                        var BASEC = this.getValue('de-cmbBASEC');
                        var RATE = this.getValue('de-txtRATE');
                        var RATEIVA = this.getValue('de-txtRATEIVA');
                        var MONTO = this.getValue('de-txtMONTO');
                        var MESES = this.getValue('de-txtMESES');

                        var NEW_SEQ = 0;
                        var dataRow = {};
                        dataRow.SEQ = SEQ;
                        dataRow.TCOMIS = CCOMIS;
                        dataRow.DCOMIS = DCOMIS;
                        dataRow.FECFROM = FECFROM;
                        dataRow.FECTO = FECTO;
                        dataRow.BASEC = BASEC;
                        dataRow.RATE = RATE;
                        dataRow.RATEIVA = RATEIVA;
                        dataRow.MONTO = MONTO;
                        dataRow.MESES = MESES;

                        var strMessage = this.validacionDetalle(dataRow);

                        if (strMessage === "") {
                            var store_gridDataCommInfo = Ext.getCmp(prototype.id + '-gridDataCommInfo').getStore();

                            if (this.getValue('de-txtSEQ') === '') {
                                //AGREGAR LOGICA CORRELATIVO SEQ
                                for (var i = 0; i < store_gridDataCommInfo.data.length; i++) {
                                    NEW_SEQ = NEW_SEQ + 1;
                                    store_gridDataCommInfo.data.items[i].data.SEQ = this.fillZeros(3, NEW_SEQ.toString());
                                }
                                dataRow.SEQ = this.fillZeros(3, (NEW_SEQ + 1).toString());
                                store_gridDataCommInfo.add(dataRow);
                                Ext.getCmp(prototype.id + '-gridDataCommInfo').getView().refresh();
                            } else {
                                //Actualiza                
                                console.log(store_gridDataCommInfo);
                                for (var i = 0; i < store_gridDataCommInfo.data.length; i++) {
                                    if (store_gridDataCommInfo.data.items[i].data.SEQ === SEQ) {
                                        store_gridDataCommInfo.data.items[i].data.TCOMIS = CCOMIS;
                                        store_gridDataCommInfo.data.items[i].data.DCOMIS = DCOMIS;
                                        store_gridDataCommInfo.data.items[i].data.FECFROM = FECFROM;
                                        store_gridDataCommInfo.data.items[i].data.FECTO = FECTO;
                                        store_gridDataCommInfo.data.items[i].data.BASEC = BASEC;
                                        store_gridDataCommInfo.data.items[i].data.RATE = RATE;
                                        store_gridDataCommInfo.data.items[i].data.RATEIVA = RATEIVA;
                                        store_gridDataCommInfo.data.items[i].data.MONTO = MONTO;
                                        store_gridDataCommInfo.data.items[i].data.MESES = MESES;
                                        Ext.getCmp(prototype.id + '-gridDataCommInfo').getView().refresh();
                                        break;
                                    }
                                }

                            }
                            Ext.getCmp(prototype.id + '-hboxEdit').hide();
                        } else {
                            global.Msg({msg: strMessage})
                        }
                    }
                }
            }
        });

    },
    btnImgDelete_click: function() {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var SEQ = this.getValue('de-txtSEQ');
                    var NEW_SEQ = 0;
                    var store_gridDataCommInfo = Ext.getCmp(prototype.id + '-gridDataCommInfo').getStore();

                    for (var i = 0; i < store_gridDataCommInfo.data.length; i++) {
                        if (store_gridDataCommInfo.data.items[i].data.SEQ === SEQ) {
                            var posicion = i;
                            break;
                        }
                    }

                    store_gridDataCommInfo.removeAt(posicion);

                    for (var i = 0; i < store_gridDataCommInfo.data.length; i++) {
                        NEW_SEQ = NEW_SEQ + 1;
                        store_gridDataCommInfo.data.items[i].data.SEQ = this.fillZeros(3, NEW_SEQ.toString());
                    }

                    Ext.getCmp(prototype.id + '-gridDataCommInfo').getView().refresh();
                    Ext.getCmp(prototype.id + '-hboxEdit').hide();
                }
            }
        });
    },
    validacionDetalle: function(dataRow) {        
        var store_gridDataCommInfo = Ext.getCmp(prototype.id + '-gridDataCommInfo').getStore();
        var msjError = "";
        for (var i = 0; i < store_gridDataCommInfo.data.length; i++) {
            if (store_gridDataCommInfo.data.items[i].data.TCOMIS === dataRow.TCOMIS &&
                    store_gridDataCommInfo.data.items[i].data.DCOMIS === dataRow.DCOMIS &&
                    store_gridDataCommInfo.data.items[i].data.FECFROM === dataRow.FECFROM &&
                    store_gridDataCommInfo.data.items[i].data.FECTO === dataRow.FECTO && dataRow.SEQ === "" /*&&
                     store_gridDataCommInfo.data.items[i].data.BASEC === dataRow.BASEC &&
                     store_gridDataCommInfo.data.items[i].data.RATE === dataRow.RATE &&
                     store_gridDataCommInfo.data.items[i].data.RATEIVA === dataRow.RATEIVA &&
                     store_gridDataCommInfo.data.items[i].data.MONTO === dataRow.MONTO &&
                     store_gridDataCommInfo.data.items[i].data.MESES === dataRow.MESES*/) {
                msjError = "Error: Record already exists.";
                break;
            } else if (store_gridDataCommInfo.data.items[i].data.TCOMIS === dataRow.TCOMIS) {
                var tmpFrom = store_gridDataCommInfo.data.items[i].data.FECFROM;
                var tmpTo = store_gridDataCommInfo.data.items[i].data.FECTO;
                var tmpFromNuevo = dataRow.FECFROM;
                var tmpToNuevo = dataRow.FECTO;
                if (tmpFromNuevo !== tmpFrom || tmpToNuevo !== tmpTo) {
                    msjError = "Error: Date Crossing";
                    break;
                }
            }
        }
        return msjError;
    },
    validacionInsert: function(beanTemp) {
        var msjResult = '';
        var store_gridDataCommInfo = Ext.getCmp(prototype.id + '-gridDataCommInfo').getStore();
        if (this.getValue("de-txtCODE") === '' || this.getValue("de-txtCODEBANK") === '' || this.getValue("de-txtCOUNTRY") === '' || this.getValue("de-txtCURRENC") === '') {
            msjResult = "You must enter the required field.";
        } else if (store_gridDataCommInfo.data.length === 0) {
            msjResult = "You must enter at least one commission.";
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
    },
    fillZeros: function(size, value) {
        for (var i = value.length; i < size; i++) {
            value = '0' + value;
        }
        return value;
    },
// </editor-fold>
});