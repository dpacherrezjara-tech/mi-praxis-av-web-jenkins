Ext.define('Ext.Praxis.controller.payments.MerchantNumber.DataEntryMerchantNumberController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryMerchantNumberController',
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
    init: function (view) {
        prototype.id = 'MerchantNumberForm';
        prototype.url = CONTEXTPATH + '/MerchantNumber';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
//        console.log(this.p);
//        this.obtainData();
    },
    afterRender: function () {
//        console.log('afterRender');
        switch (this.actionCode) {
            case 'I':
                var cmbUNIOPE = Ext.getCmp(prototype.id + '-de-cmbUNIOPE');
                cmbUNIOPE.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["", "None"],
                        ["1", "Aerovias MX"],
                        ["2", "Aeromexico Cargo"],
                        ["3", "PLM"]
                    ]
                }));
                cmbUNIOPE.setValue('');
                var cmbSTATUS = Ext.getCmp(prototype.id + '-de-cmbSTATUS');
                cmbSTATUS.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["", "None"],
                        ["0", "Disabled"],
                        ["1", "Enabled"],
                    ]
                }));
                cmbSTATUS.setValue('');
                var cmbCANAL = Ext.getCmp(prototype.id + '-de-cmbCANAL');
                cmbCANAL.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["", "none"],
                        ["ATO", "ATO - Aeropuert"],
                        ["CTO", "CTO - Oficina"],
                        ["CCT", "CCT - Reserva"],
                        ["WEB", "WEB - Web"],
                        ["GSA", "GSA - G.S.Agte"],
                        ["FRA", "FRA - Franquic"],
                    ]
                }));
                cmbCANAL.setValue('');
                var cmbSCOUNTRY = Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY');
                cmbSCOUNTRY.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["", "none"],
                        ["US", "US - UNITED STATES"],
                        ["CA", "CA - CANADA"],
                        ["AR", "AR - ARGENTINA"],
                        ["JP", "JP - JAPAN"],
                        ["ES", "ES - SPAIN"],
                        ["MX", "MX - MEXICO"],
                    ]
                }));
                cmbSCOUNTRY.setValue('');
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
//        console.log(meDE.beanResult);
//        console.log(this.beanResult.CODEREJ);
        this.setValue('de-txtMERCHN', this.beanResult.MERCHN);
        this.setValue('de-txtMERCHP', this.beanResult.MERCHP);
        this.setValue('de-txtDESCR', this.beanResult.DESCR);
        this.setValue('de-txtRSOCIAL', this.beanResult.RSOCIAL);
        this.setValue('de-cmbCANAL', this.beanResult.CANAL);
        this.setValue('de-cmbSCOUNTRY', this.beanResult.SCOUNTRY);
        this.setValue('de-txtNameCTRY', this.beanResult.strDescripCtry);
        this.setValue('de-cmbUNIOPE', this.beanResult.UNIOPE);
        this.setValue('de-cmbSTATUS', this.beanResult.STATUS);

        this.setValue('de-txtCODCLIT1', this.beanResult.CODCLIT1);
        this.setValue('de-txtDIRCLIT1', this.beanResult.DIRCLIT1);
        this.setValue('de-txtDIRCLIT2', this.beanResult.DIRCLIT2);
        this.setValue('de-txtCODCLIT2', this.beanResult.CODCLIT2);

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);

        this.setGridIATA(this.beanResult.MERCHN);
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {
//        console.log('llenarData');

        beanTemp.MERCHN = this.getValue("de-txtMERCHN");
        beanTemp.MERCHP = this.getValue("de-txtMERCHP");
        beanTemp.DESCR = this.getValue("de-txtDESCR");
        beanTemp.RSOCIAL = this.getValue("de-txtRSOCIAL");
        beanTemp.CANAL = this.getValue("de-cmbCANAL");
        beanTemp.SCOUNTRY = this.getValue("de-cmbSCOUNTRY");
        beanTemp.UNIOPE = this.getValue("de-cmbUNIOPE");
        beanTemp.STATUS = this.getValue("de-cmbSTATUS");

        beanTemp.CODCLIT1 = this.getValue("de-txtCODCLIT1");
        beanTemp.DIRCLIT1 = this.getValue("de-txtDIRCLIT1");
        beanTemp.DIRCLIT2 = this.getValue("de-txtDIRCLIT2");
        beanTemp.CODCLIT2 = this.getValue("de-txtCODCLIT2");

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();

//        console.log(beanTemp);

        var listaGrilla = Ext.getCmp(prototype.id + '-gridIATA').getStore().data;
        var beanDet = {};
        var listaNueva = [];

        for (var i = 0; i < listaGrilla.length; i++) {
            beanDet = listaGrilla.items[i];

            var beanNuevo = {};
            beanNuevo.CIATA = beanDet.data.CIATA;
            beanNuevo.MERCHN = this.getValue("de-txtMERCHN");
            beanNuevo.SCOUNTRY = beanDet.data.SCOUNTRY;
            beanNuevo.CANAL = beanDet.data.CANAL;

            listaNueva.push(beanNuevo);
        }
        beanTemp.lstDetalle = listaNueva;

    },
    getData: function () {
//        console.log('getData');
        var cmbUNIOPE = Ext.getCmp(prototype.id + '-de-cmbUNIOPE');
        cmbUNIOPE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "None"],
                ["1", "Aerovias MX"],
                ["2", "Aeromexico Cargo"],
                ["3", "PLM"]
            ]
        }));
        cmbUNIOPE.setValue('');
        var cmbSTATUS = Ext.getCmp(prototype.id + '-de-cmbSTATUS');
        cmbSTATUS.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "None"],
                ["0", "Disabled"],
                ["1", "Enabled"],
            ]
        }));
        cmbSTATUS.setValue('');

        var cmbCANAL = Ext.getCmp(prototype.id + '-de-cmbCANAL');
        cmbCANAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "none"],
                ["ATO", "ATO - Aeropuert"],
                ["CTO", "CTO - Oficina"],
                ["CCT", "CCT - Reserva"],
                ["WEB", "WEB - Web"],
                ["GSA", "GSA - G.S.Agte"],
                ["FRA", "FRA - Franquic"],
            ]
        }));

        var cmbSCOUNTRY = Ext.getCmp(prototype.id + '-de-cmbSCOUNTRY');
        cmbSCOUNTRY.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "none"],
                ["US", "US - UNITED STATES"],
                ["CA", "CA - CANADA"],
                ["AR", "AR - ARGENTINA"],
                ["JP", "JP - JAPAN"],
                ["ES", "ES - SPAIN"],
                ["MX", "MX - MEXICO"],
            ]
        }));


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
        //this.setValue('-de-cmbUNIOPE', '');
    },
    //</editor-fold>
    toUpperCase: function (obj, value, opts) {
//        console.log(obj);
//        console.log(value);
//        console.log(opts);
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
                        this.MaintenanceA2354(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
        console.log('onUpdateClick');
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update ?',
                    buttons: Ext.MessageBox.YESNO,
                    //scope: this,
                    //animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            var beanTemp = {};
                            
                            var msjResult = meDE.validacionUpdate(beanTemp);
                            if (msjResult === '') {
                                meDE.llenarData(beanTemp);
                                beanTemp.option = 'U';
                                meDE.MaintenanceA2354(beanTemp);
                            } else {
                                global.Msg({msg: msjResult});
                            }
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
                    this.llenarData(beanTemp);
                    beanTemp.option = 'D';
                    this.MaintenanceA2354(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceA2354: function (beanTemp) {
//        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA2354',
            method: 'POST',
            timeout: 60000000,
//            params: beanTemp,
            params: {beanString: beanString, option: beanTemp.option},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
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

    validacionInsert: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtMERCHN") === '') {
            msjResult = "You must enter the required field.";
        }
        if (this.getValue("de-txtMERCHP") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    validacionUpdate: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtMERCHP").trim() === '') {
            msjResult = "The field Merchant Payment cannot be left empty";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {
        Ext.getCmp(prototype.id + '-de-txtMERCHN').setEditable(false);
        Ext.getCmp(prototype.id + '-de-txtNameCTRY').setReadOnly(true);
    },
    Habilitarlbl: function () {
        Ext.getCmp(prototype.id + '-lblDescripcion').show();
        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function () {
        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
            Ext.getCmp(prototype.id + '-lbldes').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes').show();
        }
    },
    Habilitarlbl1: function () {
        Ext.getCmp(prototype.id + '-lbldes').hide();
        if (this.getValue("txtCODSOUR") === '') {
            Ext.getCmp(prototype.id + '-lbldes2').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes2').show();
        }
    },
    getIATAList: function () {

        var lstIATA = []; // empty array
        var storeIATA = Ext.getCmp(prototype.id + '-gridIATA').getStore();
        var selIATA = storeIATA.getRange();

        Ext.each(selIATA, function (item) {
            var Obj = {
                CIATA: item.get('CIATA'),
            };
            lstIATA.push(Obj);
        }, this);

        console.log(lstIATA);
        var a = [];
        var data = [];
        for (var vi = 0; vi < lstIATA.length; ++vi) {
            // console.log(lstFOPVta[vi]);
            if (a.indexOf(String(lstIATA[vi].CIATA)) < 0) {
                a.push(String(lstIATA[vi].CIATA));

                data.push({
                    CIATA: String(lstIATA[vi].CIATA)
                })
            } else {
                data[a.indexOf(String(lstIATA[vi].CIATA))].CIATA = String(lstIATA[vi].CIATA);
            }
        }
        console.log(data);
        return data;
    },
    addIATA: function () {
        if (Ext.getCmp(prototype.id + '-txtIATA').getValue() !== '') {
            var beanTemp = {};
            beanTemp.changeIATA = true;
            var store_gridIATA = Ext.getCmp(prototype.id + '-gridIATA').getStore();
            var new_IATA = Ext.getCmp(prototype.id + '-txtIATA').getValue()

            Ext.Ajax.request({
                url: prototype.url + '/validateIATA',
                method: 'POST',
                timeout: 60000000,
//            params: beanTemp,
                params: {IATA: new_IATA},
                beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
                success: function (response, opts) {
                    Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                    var res = Ext.JSON.decode(response.responseText);
                    console.log(res);
                    if (res.total > 0) {
                        meDE.insertIATA(store_gridIATA, res.data[0]);
                    } else {
                        global.Msg({msg: 'Not Found / No Travel Agency'});
                    }

                }
            });

        } else {
            global.Msg({msg: 'Registro vacío'});
        }
    },
    insertIATA: function (store_gridIATA, objIATA) {
        var dataRow = {};
        var duplicado = false;
        if (store_gridIATA.data.length > 0) {
            for (var i = 0; i < store_gridIATA.data.length; i++) {
                var dataRow1 = store_gridIATA.data.items[i];
                if (dataRow1.data.CIATA === this.getValue("txtIATA")) {
                    duplicado = true;
                }
            }
            if (!duplicado) {
                dataRow = store_gridIATA.data.items[store_gridIATA.data.length - 1 ].copy();
                dataRow.id = 'ItrecordIATA' + Math.random();
                dataRow.data.CIATA = this.getValue("txtIATA");
                dataRow.data.strDESCRIP = objIATA.A003KEY1;
                dataRow.data.SCOUNTRY = objIATA.A003PAIS;
                dataRow.data.CANAL = objIATA.A003CANAL;
            }
        } else {
            dataRow.id = 'ItrecordIATA';
            dataRow.CIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
            dataRow.strDESCRIP = objIATA.A003KEY1;
            dataRow.SCOUNTRY = objIATA.A003PAIS;
            dataRow.CANAL = objIATA.A003CANAL;
        }

        console.log(dataRow);
        if (!duplicado) {
            store_gridIATA.add(dataRow);
            Ext.getCmp(prototype.id + '-gridIATA').getView().refresh();
            this.clearIATA();
        } else {
            global.Msg({msg: 'Registro duplicado'});
        }
        console.log(store_gridIATA.data.length);
    },
    removeIATA: function (record) {
        var store_gridIATA = Ext.getCmp(prototype.id + '-gridIATA').getStore();
        var rowIndex = store_gridIATA.indexOf(record);
        store_gridIATA.removeAt(rowIndex);

        var beanTemp = {};
        beanTemp.changeIATA = true;
        Ext.getCmp(prototype.id + '-gridIATA').getView().refresh();
        console.log(store_gridIATA.data.length);
    },
    clearIATA: function () {
        Ext.getCmp(prototype.id + '-txtIATA').setValue('');
    },
    setGridIATA: function (MERCHN) {

        Ext.Ajax.request({
            url: prototype.url + '/searchIATA',
            method: 'POST',
            timeout: 60000000,
//            params: beanTemp,
            params: {MERCHN: MERCHN},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                var storeData = Ext.create('Ext.data.Store', {
                    data: res.data,
                    autoLoad: true
                });

                Ext.getCmp(prototype.id + '-gridIATA').bindStore(storeData);

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