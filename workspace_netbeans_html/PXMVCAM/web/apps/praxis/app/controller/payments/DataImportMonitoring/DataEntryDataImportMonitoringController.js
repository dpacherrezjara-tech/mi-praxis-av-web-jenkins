Ext.define('Ext.Praxis.controller.payments.DataImportMonitoring.DataEntryDataImportMonitoringController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryDataImportMonitoringController',
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
        prototype.id = 'DataImportMonitoringForm';
        prototype.url = CONTEXTPATH + '/DataImportMonitoring';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
    },
    afterRender: function () {
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
                this.mostrarData();
//                this.getData();
//                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {
        console.log('Mostrar Data')
        this.setValue('de-txtCCUST', this.bean.data.CCUST);
        this.setValue('de-txtROBOTNAME', this.bean.data.ROBOTNAME);
        this.setValue('de-cmbFREQTYPE', this.bean.data.FREQTYPE);
        this.setValue('de-cmbFREQDAYS', this.bean.data.FREQDAYS);
        this.setValue('de-txtTIMEEXEC', this.bean.data.TIMEEXEC);
        this.setValue('de-cmbSTATUSRO', this.bean.data.STATUSRO);
        this.setValue('de-txtLIVE_STATUS', this.bean.data.LIVE_STATUS);
        this.setValue('de-txtLIVE_PID', this.bean.data.LIVE_PID);
        this.setValue('de-txtLIVE_SECONDS', this.bean.data.LIVE_RUNNING_SECONDS);
        this.setValue('de-txtLASTEXECD', this.bean.data.LASTEXECD);
        this.setValue('de-txtLASTEXECH', this.bean.data.LASTEXECH);

        this.setValue('de-txtUSCR', this.bean.data.USCR);
        this.setValue('de-txtFECR', this.bean.data.FECR);
        this.setValue('de-txtHOCR', this.bean.data.HOCR);
        this.setValue('de-txtUSUP', this.bean.data.USUP);
        this.setValue('de-txtFEUP', this.bean.data.FEUP);
        this.setValue('de-txtHOUP', this.bean.data.HOUP);
    },
    obtainData: function () {

        console.log("obtainData");

        var cmbFreqType = Ext.getCmp(prototype.id + '-de-cmbFREQTYPE');
        cmbFreqType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "None"],
                ["D", "Daily"],
                ["W", "Weekly"],
                ["M", "Monthly"],
                ["N", "Not Scheduled"]
            ]
        }));

        var cmbFREQDAYS = Ext.getCmp(prototype.id + '-de-cmbFREQDAYS');
        cmbFREQDAYS.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["A", "All Days"],
                ["W", "Weekdays"],
                ["S", "Weekend"],
                ["", "None"]
            ]
        }));

        var cmb = Ext.getCmp(prototype.id + '-de-cmbSTATUSRO');
        cmb.bindStore(Ext.create('Ext.data.ArrayStore', {
            fields: ['code', 'name'],
            data: [
                ["A", "Active"],
                ["I", "Inactive"]
            ]
        }));

    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {
        console.log('llenarData');

        beanTemp.IN_CLIENT = this.getValue("de-txtCCUST");
        beanTemp.IN_NAME = this.getValue("de-txtROBOTNAME");
        beanTemp.IN_FREQTYPE = this.getValue("de-cmbFREQTYPE");
        beanTemp.IN_FREQDAYS = this.getValue("de-cmbFREQDAYS");
        beanTemp.IN_TIMEEXEC = this.getValue("de-txtTIMEEXEC");
        beanTemp.IN_STATUSRO = this.getValue("de-cmbSTATUSRO");
        
        beanTemp.IN_CRON = this.buildCron(
            beanTemp.IN_FREQTYPE,
            beanTemp.IN_FREQDAYS,
            beanTemp.IN_TIMEEXEC
        );

        console.log("CRON generado:", beanTemp.IN_CRON);

        console.log(beanTemp);

    },
    getData: function () {
//        console.log('getData');
        var beanString = JSON.stringify(meDE.bean.data);
//        console.log(beanString);

//        Ext.Ajax.request({
//            url: prototype.url + '/searchCompleteDetail',
//            method: 'POST',
//            timeout: 60000000,
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
//            params: {beanString: beanString},
//            success: function (response, options) {
//                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
//                var res = Ext.JSON.decode(response.responseText);
//                meDE.beanResult = res.result;
//                meDE.mostrarData();
//
//            }
//        });
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
    onUpdateClick: function (btn) {
        console.log('onUpdateClick');
        console.log(btn, 'BTN')
        this.update(btn);
    },
    update: function (btn) {
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
                    this.llenarData(beanTemp);
                    beanTemp.option = 'D';
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
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA2280',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
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
        if (this.getValue("de-txtCODE") === '' || this.getValue("de-txtCODEBANK") === '' || this.getValue("de-txtCOUNTRY") === '' || this.getValue("de-txtCURRENC") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {

        Ext.getCmp(prototype.id + '-de-cmbCOUNTRY').setReadOnly(true);
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
        console.log(prototype.id + '-' + id, 'uu')
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
    buildCron: function (freqType, freqDays, timeExec) {
        if (!freqType || freqType === "N")
            return "0 0 0 31 2 ?"; // deshabilitado

        let hour = timeExec.substring(0, 2);
        let minute = timeExec.substring(2, 4);

        if (freqType === "D") {
            return `0 ${minute} ${hour} * * ?`;
        }

        if (freqType === "W") {
            if (freqDays === "W")
                return `0 ${minute} ${hour} ? * MON-FRI`;
            if (freqDays === "S")
                return `0 ${minute} ${hour} ? * SAT,SUN`;
            return `0 ${minute} ${hour} * * ?`;
        }

        if (freqType === "M") {
            return `0 ${minute} ${hour} 1 * ?`;
        }

        return "0 0 0 31 2 ?"; // safe fallback
    }
// </editor-fold>
});