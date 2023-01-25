Ext.define('Ext.Praxis.controller.payments.SalesCompensation.DataEntrySalesCompensationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntrySalesCompensationController',
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
        prototype.id = 'SalesCompensationForm';
        prototype.url = CONTEXTPATH + '/SalesCompensation';
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
        this.setValue('de-txtCODEBANK', this.beanResult.CODEBANK);
        this.setValue('de-txtNAMEBANK', this.beanResult.NAMEBANK);
        this.setValue('de-cmbCOUNTRY', this.beanResult.COUNTRY);
        this.setValue('de-txtCURRENC', this.beanResult.CURRENC);
        this.setValue('de-txtCLIENTE', this.beanResult.CLIENTE);
        this.setValue('cmbFSTAT', this.beanResult.FSTAT);

        this.setValue('cmbFINSUMO', this.beanResult.FINSUMO);
        this.setValue('cmbCODEBANKN', this.beanResult.CODBANKN);
        this.setValue('txtDOCNUM', this.beanResult.DOCNUM);
        this.setValue('de-txtRATECON', Ext.util.Format.number(this.beanResult.RATECON, '0,000.00'));
        this.setValue('de-txtRATECOP1', Ext.util.Format.number(this.beanResult.RATECOP1, '0,000.00'));
        this.setValue('de-txtRATECOP2', Ext.util.Format.number(this.beanResult.RATECOP2, '0,000.00'));
        this.setValue('de-txtRATEIVA', Ext.util.Format.number(this.beanResult.RATEIVA, '0,000.00'));

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },
    obtainData: function () {

        var cmbCODEBANKN = Ext.getCmp(prototype.id + '-cmbCODEBANKN');
        cmbCODEBANKN.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Empty"],
                ["001", "001-BANAMEX"],
                ["002", "002-SANTANDER"],
                ["003", "003-BANORTE"],
                ["004", "004-BBVA"],
                ["005", "005-AMEX"]
            ]
        }));
        cmbCODEBANKN.setValue('');

        var cmbFINSUMO = Ext.getCmp(prototype.id + '-cmbFINSUMO');
        cmbFINSUMO.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Pending"],
                ["P", "In Progress"],
                ["I", "Implemented"]
            ]
        }));
        cmbFINSUMO.setValue('');

        var cmbFSTAT = Ext.getCmp(prototype.id + '-cmbFSTAT');
        cmbFSTAT.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["O", "Open"],
                ["C", "Closed"]
            ]
        }));
        cmbFSTAT.setValue('C');

        Ext.getCmp(prototype.id + '-de-cmbCOUNTRY').bindStore(
                Ext.create('Ext.data.Store', {data: this.lstCountry, autoLoad: true})
                );
        Ext.getCmp(prototype.id + '-de-cmbCOUNTRY').setValue('');

    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {
//        console.log(beanTemp);
        beanTemp.CODEBANK = this.getValue("de-txtCODEBANK");
        beanTemp.NAMEBANK = this.getValue("de-txtNAMEBANK");
        beanTemp.COUNTRY = this.getValue("de-cmbCOUNTRY");
        beanTemp.CURRENC = this.getValue("de-txtCURRENC");
        beanTemp.CLIENTE = this.getValue("de-txtCLIENTE");
        beanTemp.FSTAT = this.getValue("cmbFSTAT");
        beanTemp.FINSUMO = this.getValue("cmbFINSUMO");
        beanTemp.CODBANKN = this.getValue("cmbCODEBANKN");

        if (this.getValue("de-txtRATEIVA") !== '') {
            beanTemp.DOCNUM = Number(this.getValue("txtDOCNUM").trim().replace(',', ''));
        } else {
            beanTemp.DOCNUM = 0;
        }
        
        if (this.getValue("de-txtRATECON") !== '') {
            beanTemp.RATECON = Number(this.getValue("de-txtRATECON").trim().replace(',', ''));
        } else {
            beanTemp.RATECON = 0;
        }
        
        if (this.getValue("de-txtRATECOP1") !== '') {
            beanTemp.RATECOP1 = Number(this.getValue("de-txtRATECOP1").trim().replace(',', ''));
        } else {
            beanTemp.RATECOP1 = 0;
        }
        
        if (this.getValue("de-txtRATECOP2") !== '') {
            beanTemp.RATECOP2 = Number(this.getValue("de-txtRATECOP2").trim().replace(',', ''));
        } else {
            beanTemp.RATECOP2 = 0;
        }
        
        if (this.getValue("de-txtRATEIVA") !== '') {
            beanTemp.RATEIVA = Number(this.getValue("de-txtRATEIVA").trim().replace(',', ''));
        } else {
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
    getData: function () {
        var beanString = JSON.stringify(meDE.bean.data);
//        console.log(beanString);
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
                        this.MaintenanceA2280(beanTemp);
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
                        this.llenarData(beanTemp);
                        beanTemp.option = 'U';
                        beanTemp.beanString = JSON.stringify(beanTemp);;
                        this.MaintenanceA2280(beanTemp);
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
                    this.MaintenanceA2280(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceA2280: function (beanTemp) {
//        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA2280',
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
                } else{
                    global.Msg({msg: 'An error occurred'});
                }
            }
        });
    },
    //</editor-fold>

    validacionInsert: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtCODEBANK") === '' || this.getValue("de-cmbCOUNTRY") === '' || this.getValue("de-txtCURRENC") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {
        Ext.getCmp(prototype.id + '-de-txtCODEBANK').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-cmbCOUNTRY').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCURRENC').setReadOnly(true);
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
        if (this.getValue("txtCODSOUR") == '') {
            Ext.getCmp(prototype.id + '-lbldes2').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes2').show();
        }
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