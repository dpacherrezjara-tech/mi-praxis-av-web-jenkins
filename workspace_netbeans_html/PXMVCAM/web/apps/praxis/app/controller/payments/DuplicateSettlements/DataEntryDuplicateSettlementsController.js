Ext.define('Ext.Praxis.controller.payments.DuplicateSettlements.DataEntryDuplicateSettlementsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryDuplicateSettlementsController',
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
        prototype.id = 'DuplicateSettlementsForm';
        prototype.url = CONTEXTPATH + '/DuplicateSettlements';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
    },
    afterRender: function () {
//        this.obtainData();
        switch (this.actionCode) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.mostrarData();
                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
//                Ext.getCmp(prototype.id + '-btn-update').show();
//                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {
        console.log('Mostrar Data',this.bean);
        
        // DETAIL (DATA ENTRY – CAMPOS DEL GRID)
        this.setValue('de-txtCCUST', this.bean.data.CCUST);
        this.setValue('de-txtSDATE', this.bean.data.SDATE); 
        this.setValue('de-txtSCOUNTRY', this.bean.data.SCOUNTRY);
        this.setValue('de-txtTDOC', this.bean.data.TDOC);
        this.setValue('de-txtCODEBANK', this.bean.data.CODEBANK);
        this.setValue('de-txtSCARCOD', this.bean.data.SCARCOD);
        this.setValue('de-txtSCARDN', this.bean.data.SCARDN);
        this.setValue('de-txtSAUTHOC', this.bean.data.SAUTHOC);
        this.setValue('de-txtSEQ', this.bean.data.SEQ);
        this.setValue('de-txtNEGOC', this.bean.data.NEGOC);

        let importe = this.bean.data.SVFOP;
        if (importe !== null && importe !== undefined) {
            this.setValue('de-txtSVFOP', importe); 
        }

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

        beanTemp.IN_CCUST = this.bean.data.CCUST;
        beanTemp.IN_SDATE = this.bean.data.SDATE;
        beanTemp.IN_SCOUNTRY = this.bean.data.SCOUNTRY;
        beanTemp.IN_TDOC = this.bean.data.TDOC;
        beanTemp.IN_CODEBANK = this.bean.data.CODEBANK;
        beanTemp.IN_SCARCOD = this.bean.data.SCARCOD;
        beanTemp.IN_SCARDN = this.bean.data.SCARDN;
        beanTemp.IN_SAUTHOC = this.bean.data.SAUTHOC;
        beanTemp.IN_SEQ = this.bean.data.SEQ;
        beanTemp.IN_SVFOP = this.bean.data.SVFOP;
        beanTemp.IN_NEGOC = this.getValue("de-txtNEGOC");
        
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
                   var btnSearch = Ext.getCmp(prototype.id + '-btnSearch');
                   btnSearch.fireEvent('click', btnSearch);

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

        let camposDeshabilitar = [
            'de-txtSVFOP',
            'de-txtCCUST',
            'de-txtSDATE',
            'de-txtSCOUNTRY',
            'de-txtCODEBANK',
            'de-txtSCARCOD',
            'de-txtSCARDN',
            'de-txtSAUTHOC',
            'de-txtSEQ',
            'de-txtSVFOP',
            'de-txtTDOC'
        ];

        camposDeshabilitar.forEach(id => {
            let cmp = Ext.getCmp(prototype.id + '-' + id);
            if (cmp)
                cmp.setReadOnly(true);
        });
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
})