Ext.define('Ext.Praxis.controller.payments.RobotConfig.DataEntryRobotConfigController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryRobotConfigController',
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
        prototype.id = 'RobotConfigForm';
        prototype.url = CONTEXTPATH + '/RobotConfig';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
    },

    afterRender: function () {
        this.obtainData();
//        console.log('afterRender');
        switch (this.actionCode) {
            case 'I':

//              cmbSCOUNTRY.setValue('');
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

        console.log('dadsadasdadasdadad',meDE.beanResult )        
      
        this.setValue('de-txtCODES', meDE.beanResult.CODES)
        this.setValue('de-txtNAME', meDE.beanResult.NAME)
        this.setValue('de-txtDECRIPT', meDE.beanResult.DECRIPT)
        
        var cmbSTVAL = Ext.getCmp(prototype.id + '-cmbSTVAL');
        cmbSTVAL.setValue(meDE.beanResult.STVAL);

        this.setValue('txtUSCR', meDE.beanResult.USCR);
        this.setValue('txtFECR', meDE.beanResult.FECR);
        this.setValue('txtHOCR', meDE.beanResult.HOCR);
        this.setValue('txtUSUP', meDE.beanResult.USUP);
        this.setValue('txtFEUP', meDE.beanResult.FEUP);
        this.setValue('txtHOUP', meDE.beanResult.HOUP);

    },
    obtainData: function () {
      var cmbSTVAL = Ext.getCmp(prototype.id + '-cmbSTVAL');
        cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Enabled"],
                ["0", "Disabled"]
            ]
        }));
        cmbSTVAL.setValue('1');  
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">

    getData: function () {
        var beanString = JSON.stringify(meDE.bean.data);

        Ext.Ajax.request({
            url: prototype.url + '/searchHeaderDetail',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                console.log(response, 'RESPONSE REQUEST')
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var resDETAIL = Ext.JSON.decode(response.responseText);
                console.log(resDETAIL.result, 'watafaaaaaaaaaaaaaaaaaaaaaa')
                meDE.beanResult = resDETAIL.result;
                meDE.mostrarData();
                 
            }
        });        
    },
    //</editor-fold>

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
                        this.MaintenanceHeader(beanTemp);
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
                                meDE.MaintenanceHeader(beanTemp);
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
                    this.MaintenanceHeader(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceHeader: function (beanTemp) {
//        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceHeader',
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
        /*if (this.getValue("de-txtMERCHN") === '') {
            msjResult = "You must enter the required field.";
        }*/
        return msjResult;
    },
    validacionUpdate: function (beanTemp) {
        var msjResult = '';

        return msjResult;
    },
    DeshabilitarCampoClave: function () {
        Ext.getCmp(prototype.id + '-de-txtCODES').setReadOnly(true);
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
    },
// </editor-fold>
    llenarData: function (beanTemp) {
//        console.log('llenarData');

        beanTemp.CODES = this.getValue("de-txtCODES");
        beanTemp.NAME = this.getValue("de-txtNAME");
        beanTemp.DECRIPT = this.getValue("de-txtDECRIPT");
        beanTemp.STVAL = this.getValue("cmbSTVAL");
        
//        console.log(beanTemp);
    },

});