Ext.define('Ext.Praxis.controller.payments.StatementReconciliations.DataEntryStatementReconciliationsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryStatementReconciliationsController',
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
        prototype.id = 'StatementReconciliationsForm';
        prototype.url = CONTEXTPATH + '/StatementReconciliations';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
        this.obtainData();
    },
    afterRender: function() {
        this.obtainData();
        switch (this.actionCode) {
//            case 'I':
//                console.log('dd');
//
//                Ext.getCmp(prototype.id + '-btn-save').show();
//                Ext.getCmp(prototype.id + '-btn-update').hide();
//                Ext.getCmp(prototype.id + '-btn-delete').hide();
//                Ext.getCmp(prototype.id + '-btn-cancel').show();
//                break;
            case 'U':
                this.getData();
//                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
//                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function() {
            
        this.setValue('de-txtSCOUNTRY', this.beanResult.SCOUNTRY);
        this.setValue('de-cmbSTVAL', this.beanResult.STVAL);
        this.setValue('de-txtSDATE', this.beanResult.SDATE);
        this.setValue('de-txtADATE', this.beanResult.ADATE);
        this.setValue('de-txtCODEBANK', this.beanResult.CODEBANK);
        this.setValue('de-txtBANDOC', this.beanResult.BANDOC);
        this.setValue('de-txtSCURRENCY', this.beanResult.SCURRENCY);
        this.setValue('de-txtNETO', this.beanResult.NETO);
        this.setValue('de-txtQTYTRAS', this.beanResult.QTYTRAS);
//        this.setValue('de-txtQTYTRAN1', this.beanResult.QTYTRAN1);
//        this.setValue('de-txtQTYTRAN3', this.beanResult.QTYTRAN3);
        this.setValue('de-txtVALDATE', this.beanResult.VALDATE);

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },
    obtainData: function() {
        
        var cmbSTVAL = Ext.getCmp(prototype.id + '-de-cmbSTVAL');
        cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", ""],
                ["1", "Match"],
                ["2", "Bank Without Payment"],
                ["3", "Payment Without Bank"]
            ]
        }));
        cmbSTVAL.setValue('');
        
//        this.dataObtain.BANK = 2;
//        Ext.Ajax.request({
//            url: prototype.urlMaster + '/obtainData',
//            method: 'POST',
//            timeout: 60000000,
//            params: {
//                beanString: JSON.stringify(this.dataObtain)},
//            success: function (response, options) {
//                var res = Ext.JSON.decode(response.responseText);
//
//                var lstBank = res.lstBank;
//                var storeData = Ext.create('Ext.data.Store', {
//                    data: lstBank,
//                    autoLoad: true
//                });
//                
//                Ext.getCmp(prototype.id + '-de-cmbCODEBANK').bindStore(storeData);
//                Ext.getCmp(prototype.id + '-de-cmbCODEBANK').setValue('');
//            }
//        });

    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
//        console.log('llenarData');
        beanTemp.SCOUNTRY = this.getValue("de-txtSCOUNTRY");
        beanTemp.STVAL = this.getValue("de-cmbSTVAL");
        beanTemp.SDATE = this.getValue("de-txtSDATE");
        beanTemp.ADATE = this.getValue("de-txtADATE");
        beanTemp.CODEBANK = this.getValue("de-txtCODEBANK");
        beanTemp.BANDOC = this.getValue("de-txtBANDOC");
        beanTemp.SCURRENCY = this.getValue("de-txtSCURRENCY");
        beanTemp.NETO = this.getValue("de-txtNETO");
        beanTemp.QTYTRAS = this.getValue("de-txtQTYTRAS");
//        beanTemp.QTYTRAN1 = this.getValue("de-txtQTYTRAN1");
//        beanTemp.QTYTRAN3 = this.getValue("de-txtQTYTRAN3");
        beanTemp.VALDATE = this.getValue("de-txtVALDATE");
       
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
            url: prototype.url + '/searchBean',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
                meDE.beanResult = res.data;
                meDE.mostrarData();

            }
        });
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
        this.setValue('txtSCOUNTRY', '');
        this.setValue('cmbSTVAL', '');
        this.setValue('txtSDATE', '');
        this.setValue('txtADATE', '');
        this.setValue('txtCODEBANK', '');
        this.setValue('txtBANDOC', '');
        this.setValue('txtSCURRENCY', '');
        this.setValue('txtNETO', '');
        this.setValue('txtQTYTRAN1', '');
        this.setValue('txtQTYTRAN3', '');
        this.setValue('txtVALDATE', '');
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
                        this.maintenanceBean(beanTemp);
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
                            this.maintenanceBean(beanTemp);
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
                    this.maintenanceBean(beanTemp);
                }
            }
        });
    },
    onCancelClick: function(btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    maintenanceBean: function(beanTemp) {
//        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/maintenanceBean',
            method: 'POST',
            timeout: 60000000,
            params: beanTemp,
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
        if (this.getValue("de-txtCODEBANK") === '' || this.getValue("de-cmbCOUNTRY") === '' || this.getValue("de-txtCURRENC") === '') {
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
        if (this.getValue("txtCODSOUR") == '') {
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