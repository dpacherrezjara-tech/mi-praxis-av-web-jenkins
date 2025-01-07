Ext.define('Ext.Praxis.controller.payments.ExchangeRate.DataEntryExchangeRateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryExchangeRateController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanDataEntry: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function (view) {
        prototype.id = 'ExchangeRateForm';
        prototype.url = CONTEXTPATH + '/ExchangeRate';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
//        this.lstCountry = this.p.lstCountry;
//        this.obtainData();
    },
    afterRender: function () {
        switch (this.actionCode) {
            case 'I':
                this.obtainData();
                win.setValue('cmbSCURRENCY1', '');
                win.setValue('cmbSCURRENCY2', '');
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
//                console.log(meDE.bean.data, 'meDE.bean' )
                this.obtainData();
                this.getData();
                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {
        this.setValue('de-txtDATECH', this.beanResult.DATECH);
        this.setValue('cmbSCURRENCY1', this.beanResult.SCURRENCY1);
        this.setValue('cmbSCURRENCY2', this.beanResult.SCURRENCY2);
        this.setValue('de-txtFACTORD', this.beanResult.FACTORD);
        this.setValue('de-txtFACTORA', this.beanResult.FACTORA);
        this.setValue('de-txtRATE', this.beanResult.RATE);
        
        this.beanResult.TCCOTIND = this.beanResult.TCCOTIND  == 0E-8 ? '0.00000000' : this.beanResult.TCCOTIND;
        this.setValue('de-txtTCCOTIND', this.beanResult.TCCOTIND);
        this.beanResult.TCCOTIND2 = this.beanResult.TCCOTIND2  == 0E-8 ? '0.00000000' : this.beanResult.TCCOTIND2;
        this.setValue('de-txtTCCOTIND2', this.beanResult.TCCOTIND2);
        this.setValue('de-txtTCCOTDIR', this.beanResult.TCCOTDIR);
        this.setValue('de-txtTCCOTDIR2', this.beanResult.TCCOTDIR2);
        this.setValue('de-txtTREG', this.beanResult.TREG);
        this.setValue('de-txtSIGN', this.beanResult.SIGN);
        
//        this.setValue('de-txtLIBNAME', this.beanResult.LIBNAME);
//        this.setValue('de-txtOUTNAME', this.beanResult.OUTNAME);
//        this.setValue('de-txtFECPROC', this.beanResult.FECPROC);
//        this.setValue('de-txtSTAT', this.beanResult.STAT);
//        this.setValue('de-txtTABLA', this.beanResult.TABLA);
//        this.setValue('de-txtQTYREG', this.beanResult.QTYREG);
//        this.setValue('de-txtFASE', this.beanResult.FASE);

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },

    obtainData: function () {
    
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify({
                    CURRENCY: 2
                })
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-cmbSCURRENCY1').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCurrencies, autoLoad: true})
                            )
                    Ext.getCmp(prototype.id + '-cmbSCURRENCY2').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCurrencies, autoLoad: true})
                            );



                } else
                    global.clear();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
        
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    
    
    
    llenarData: function (beanTemp) {
//        beanTemp.CODEM = this.getValue("de-txtCODEM");
//        beanTemp.DESCR = this.getValue("de-txtDESCR");

        beanTemp.DATECH = this.getValue("de-txtDATECH").trim();
        beanTemp.SCURRENCY1 = this.getValue("de-txtCURRENCY1").trim();
        beanTemp.SCURRENCY2 = this.getValue("de-txtCURRENCY2").trim();
        beanTemp.FACTORD = this.getValue("de-txtFACTORD").trim();
        beanTemp.FACTORA = this.getValue("de-txtFACTORA").trim();
        beanTemp.TREG = this.getValue("de-txtTREG").trim();
        beanTemp.SIGN = this.getValue("de-txtSIGN").trim();
        beanTemp.RATE = this.getValue("de-txtRATE").trim();
        beanTemp.TCCOTIND = this.getValue("de-txtTCCOTIND").trim();
        beanTemp.TCCOTDIR = this.getValue("de-txtTCCOTDIR").trim();
        beanTemp.TCCOTIND2 = this.getValue("de-txtTCCOTIND2").trim();
        beanTemp.TCCOTDIR2 = this.getValue("de-txtTCCOTDIR2").trim();
        

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();
    },
    
    getData: function () {
        console.log(meDE.bean, 'meDE.bean')
        this.beanDataEntry = {};
        this.beanDataEntry.DATECH = meDE.bean.DATECH
        this.beanDataEntry.SCURRENCY1 = meDE.bean.SCURRENCY1
        this.beanDataEntry.SCURRENCY2 = meDE.bean.SCURRENCY2
        var beanString = JSON.stringify(this.beanDataEntry);
        //console.log('rata',meDE.bean.data)
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
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);

                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        beanTemp.beanString = JSON.stringify(beanTemp);  // JSON:CONVERTIR
                        this.MaintenanceA2358(beanTemp);
                    } else {
                        global.Msg({msg: msjResult}); // golbla.Msg: es una funcion que se muestre un cuadro 
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
                            beanTemp.beanString = JSON.stringify(beanTemp);
                            this.MaintenanceA2358(beanTemp);
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
                    beanTemp.beanString = JSON.stringify(beanTemp);
                    this.MaintenanceA2358(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">  
    MaintenanceA2358: function (beanTemp) {
//        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({//Es un llamado
            url: prototype.url + '/MaintenanceA2358', //ruta donde conecto con el controller.java
            method: 'POST',
            timeout: 60000000,
            params: beanTemp, //objeto temporal
//            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText); //cobierta la informacion para poder usarlo
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
        var msjResult = ''; //DECLARACION DE VARIABLE VACIA
        if (this.getValue("de-txtDATECH") === '' || this.getValue("de-txtCURRENCY1") === ''|| this.getValue("de-txtCURRENCY2") === '') { //CONDICION 
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {

        Ext.getCmp(prototype.id + '-de-txtDATECH').setReadOnly(true);
        Ext.getCmp(prototype.id + '-cmbSCURRENCY1').setReadOnly(true);
        Ext.getCmp(prototype.id + '-cmbSCURRENCY2').setReadOnly(true);
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