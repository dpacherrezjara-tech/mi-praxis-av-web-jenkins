Ext.define('Ext.Praxis.controller.payments.AgentsCatalog.DataEntryAgentsCatalogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAgentsCatalogController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanCity: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function (view) {
        prototype.id = 'AgentsCatalogForm';
        prototype.url = CONTEXTPATH + '/AgentsCatalog';
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
        this.obtainData();
        switch (this.actionCode) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.obtainDataCitys();
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
//        console.log(meDE.beanResult, );
        console.log(this.beanResult, 'this.beanResult')
//        this.setValue('de-txtCAGENCY', this.beanResult.CAGENCY);
        this.setValue('de-txtCAGENCY', this.beanResult.SAGENT);
//        this.setValue('de-txtNAMEA', this.beanResult.NAMEA);
        this.setValue('de-txtNAMEA', this.beanResult.DESCSAGENT);
        this.setValue('de-txtCANAL', this.beanResult.CANAL);
        this.setValue('de-cmbCOUNTRY', this.beanResult.COUNTRY);
        this.setValue('de-cmbCITY', this.beanResult.CITY);
        this.setValue('de-cmbNEGOC', this.beanResult.NEGOC);
        this.setValue('de-cmbTERMI', this.beanResult.TERMI);
        this.setValue('de-cmbCONTACT', this.beanResult.CONTAC);
        this.setValue('de-cmbEMAILS', this.beanResult.EMAILS);
        this.setValue('de-cmbNPHONE', this.beanResult.NPHONE);
        this.setValue('de-cmbEMAILS2', this.beanResult.EMAILS2);
        this.setValue('de-cmbEMAILS3', this.beanResult.EMAILS3);
        this.setValue('de-cmbEMAILS4', this.beanResult.EMAILS4);
        this.setValue('de-cmbEMAILS5', this.beanResult.EMAILS5);

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
        
        this.setValue('textCIACOME', this.beanResult.CIACOME.trim());
        this.setValue('txtSBENCEN', this.beanResult.SBENCEN.trim());
        this.setValue('textSOCIETY', this.beanResult.SOCIETY.trim());
    },
    obtainData: function () {
        Ext.getCmp(prototype.id + '-de-cmbCOUNTRY').bindStore(
                Ext.create('Ext.data.Store', {data: this.lstCountry, autoLoad: true})
                );
        Ext.getCmp(prototype.id + '-de-cmbCOUNTRY').setValue('');

        var cmbNEGOC = Ext.getCmp(prototype.id + '-de-cmbNEGOC');
        cmbNEGOC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "PASAJES"],
                ["2", "CARGA"],
                ["3", "CORREO"],
            ]
        }));
        cmbNEGOC.setValue('1');

    },
    obtainDataCitys: function () {
        
        if (meDE.bean.data.COUNTRY !== '') {
            meDE.beanCity = {};
            meDE.beanCity.COUNTRY = meDE.bean.data.COUNTRY;

            var beanString = JSON.stringify(meDE.beanCity);
            Ext.Ajax.request({
                url: prototype.url + '/obtainCitys',
                method: 'POST',
                timeout: 60000000,
                params: {beanString: beanString},
                beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
                success: function (response, opts) {
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    var res = Ext.JSON.decode(response.responseText);
                    if (res.success) {

                        var storeData = Ext.create('Ext.data.Store', {
                            data: res.data,
                            autoLoad: true
                        });
                        Ext.getCmp(prototype.id + '-de-cmbCITY').bindStore(storeData);

                    } else {
                        global.Msg({msg: res.Mensaje});
                    }
                },
                failure: function (response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                }
            });
        } 
    },
    searchCitys: function () {
        if (this.getValue("de-cmbCOUNTRY") !== '') {
            meDE.beanCity = {};
            meDE.beanCity.COUNTRY = Ext.getCmp(prototype.id + '-de-cmbCOUNTRY').getValue();

            var beanString = JSON.stringify(meDE.beanCity);
            Ext.Ajax.request({
                url: prototype.url + '/obtainCitys',
                method: 'POST',
                timeout: 60000000,
                params: {beanString: beanString},
                beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
                success: function (response, opts) {
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    var res = Ext.JSON.decode(response.responseText);
                    if (res.success) {

                        var storeData = Ext.create('Ext.data.Store', {
                            data: res.data,
                            autoLoad: true
                        });
                        Ext.getCmp(prototype.id + '-de-cmbCITY').bindStore(storeData);
                        Ext.getCmp(prototype.id + '-de-cmbCITY').setValue('');

                    } else {
                        global.Msg({msg: res.Mensaje});
                    }
                },
                failure: function (response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                }
            });
        }
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {
        beanTemp.NEW_CAGENCY = this.getValue("de-txtCAGENCY");
        beanTemp.CANAL = this.getValue("de-txtCANAL");
        beanTemp.COUNTRY = this.getValue("de-cmbCOUNTRY");
        beanTemp.NAMEA = this.getValue("de-txtNAMEA");
        beanTemp.CITY = this.getValue("de-cmbCITY");
        beanTemp.NEGOC = this.getValue("de-cmbNEGOC");
        beanTemp.TERMI = this.getValue("de-cmbTERMI");
        beanTemp.CONTAC = this.getValue("de-cmbCONTACT");
        beanTemp.EMAILS = this.getValue("de-cmbEMAILS");
        beanTemp.NPHONE = this.getValue("de-cmbNPHONE");
        beanTemp.CAGENCY = this.beanResult.SAGENT;
        beanTemp.EMAILS2 = this.getValue("de-cmbEMAILS2");
        beanTemp.EMAILS3 = this.getValue("de-cmbEMAILS3");
        beanTemp.EMAILS4 = this.getValue("de-cmbEMAILS4");
        beanTemp.EMAILS5 = this.getValue("de-cmbEMAILS5");
       

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();
        
        beanTemp.SBENCEN = this.getValue("txtSBENCEN").trim();
        beanTemp.SOCIETY = this.getValue("textSOCIETY").trim();
        beanTemp.CIACOME = this.getValue("textCIACOME").trim();
        
        console.log(beanTemp, 'beanTemp');
    },
    getData: function () {
        var beanString = JSON.stringify(meDE.bean.data);
//        console.log(beanString);
        Ext.Ajax.request({
            url: prototype.url + '/searchCompleteDetail',
            method: 'POST',
            timeout: 60000000,
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
//                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log('res.result', res.result)
                meDE.beanResult = res.result;
                meDE.mostrarData();

            }
        });
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        this.setValue('de-txtCAGENCY', '');
        this.setValue('de-txtCANAL', '');
        this.setValue('de-cmbCOUNTRY', '');
        this.setValue('de-txtNAMEA', '');

        this.setValue('txtUSCR', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSUP', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
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
                        beanTemp.beanString = JSON.stringify(beanTemp);
                        this.MaintenanceMPF106(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to update ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    beanTemp.option = 'U';
                    beanTemp.beanString = JSON.stringify(beanTemp);
                    this.MaintenanceMPF106(beanTemp);
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
                    beanTemp.beanString = JSON.stringify(meDE.beanResult);
                    this.MaintenanceMPF106(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceMPF106: function (beanTemp) {
        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceMPF106',
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
        if (this.getValue("de-txtCAGENCY") === '' || this.getValue("de-cmbCOUNTRY") === '' || this.getValue("de-txtNAMEA") === ''
                || this.getValue("txtSBENCEN") === '' || this.getValue("textSOCIETY") === '') {
            msjResult = "You must enter the required field.";
            return msjResult;
        }
        
        if (parseInt(this.getValue("txtSBENCEN").length) !== 8) {
            msjResult = "The Profit Center must be at least 8 characters.";
            return msjResult;
        }
        
        if (parseInt(this.getValue("textSOCIETY").length) !== 4) {
            msjResult = "Society must be at least 4 characters.";
            return msjResult;
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {
        Ext.getCmp(prototype.id + '-de-txtCAGENCY').setReadOnly(true);
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