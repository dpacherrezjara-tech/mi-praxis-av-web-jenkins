Ext.define('Ext.Praxis.controller.payments.CargoGuide.DataEntryCargoGuideController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCargoGuideController',
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
        prototype.id = 'CargoGuideForm';
        prototype.url = CONTEXTPATH + '/CargoGuide';
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
                this.searchMPF291ByBatch();
                Ext.getCmp(prototype.id + '-de-btnDownloadPDF').show();
                Ext.getCmp(prototype.id + '-de-btnPreviewPDF').show();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {

        this.setValue('de-txtRN', this.bean.data.RN);
        this.setValue('de-txtCCUST', this.bean.data.CCUST);
        this.setValue('de-txtADATE', this.bean.data.ADATE);
        this.setValue('de-txtPAYDATE', this.bean.data.PAYDAY);
        this.setValue('de-txtCOUNTRY', this.bean.data.SCOUNTRY);
        this.setValue('de-txtNCICLO', this.bean.data.NCICLO);
        this.setValue('de-txtMETPAGO', this.bean.data.METPAGO);
        this.setValue('de-txtNPAGE', this.bean.data.NPAGE);
        this.setValue('de-txtCUSCA', this.bean.data.CUSCA);
        this.setValue('de-txtCODPSE', this.bean.data.CODPSE);
        this.setValue('de-txtBANDOC', this.bean.data.BANDOC);
        this.setValue('de-txtSTATE', this.bean.data.STATE);

        this.setValue('de-txtMONEDA', this.bean.data.SCURRENCY);

        let importe = this.bean.data.MONTO;
        
        if (importe !== null && importe !== undefined) {
            this.setValue('de-txtIMPORTE', importe); 
        }

        // AUDIT INFORMATION
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
        beanTemp.IN_SCOUNTRY = this.bean.data.SCOUNTRY;
        beanTemp.IN_NPAGE = this.bean.data.NPAGE;
        beanTemp.IN_PAYDAY = this.bean.data.PAYDAY;
        beanTemp.IN_TYPE = this.bean.data.TYPE;
        beanTemp.IN_SEQ = this.bean.data.SEQ;
        beanTemp.IN_MONTO =  this.getValue('de-txtIMPORTE');
        beanTemp.IN_ADATE =  this.getValue('de-txtADATE');
        beanTemp.IN_CUSCA =  this.getValue('de-txtCUSCA');
        beanTemp.IN_CODPSE = this.getValue('de-txtCODPSE');
        beanTemp.IN_CBATCH = this.bean.data.CBATCH;
        beanTemp.IN_DATEBAT = this.bean.data.DATEBAT;
        beanTemp.IN_STATE = this.getValue('de-txtSTATE');

        console.log(beanTemp);

    },
    searchMPF291ByBatch: function () {
        var win   = this.view;
        var data  = this.bean.data;
        var grid  = Ext.getCmp(prototype.id + '-de-gridMPF291');
        var panel = Ext.getCmp(prototype.id + '-de-panelMPF291');

        var bean = {
            IN_CBATCH:  data.CBATCH  || '',
            IN_DATEBAT: data.DATEBAT || ''
        };

        win.mask('Loading linked records...');

        Ext.Ajax.request({
            url: prototype.url + '/searchMPF291ByBatch',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            success: function (response) {
                win.unmask();
                var res     = Ext.JSON.decode(response.responseText);
                var records = res.data || [];
                grid.getStore().loadData(records);
                panel.setVisible(records.length > 0);
                if (records.length > 0) {
                    win.setHeight(820);
                    win.center();
                }
            },
            failure: function () {
                win.unmask();
                Ext.Msg.alert('Error', 'Could not load linked MPF291 records.');
            }
        });
    },

    onDownloadPDF: function () {
        var sfile = (this.bean && this.bean.data) ? (this.bean.data.SFILE || '') : '';
        if (!sfile) {
            Ext.Msg.alert('Warning', 'No file associated with this record (SFILE is empty).');
            return;
        }
        window.open(prototype.url + '/downloadPDF?sfile=' + encodeURIComponent(sfile) + '&disposition=attachment');
    },

    onPreviewPDF: function () {
        var sfile = (this.bean && this.bean.data) ? (this.bean.data.SFILE || '') : '';
        if (!sfile) {
            Ext.Msg.alert('Warning', 'No file associated with this record (SFILE is empty).');
            return;
        }
        var url = prototype.url + '/downloadPDF?sfile=' + encodeURIComponent(sfile) + '&disposition=inline';
        Ext.create('Ext.window.Window', {
            title: 'PDF Preview — ' + sfile,
            width: 900,
            height: 700,
            modal: true,
            layout: 'fit',
            items: [{
                xtype: 'component',
                autoEl: {
                    tag: 'iframe',
                    src: url,
                    frameborder: '0',
                    style: 'width:100%;height:100%;border:none;'
                }
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                layout: {pack: 'center'},
                items: [{
                    text: 'Close',
                    scale: 'medium',
                    handler: function (btn) { btn.up('window').close(); }
                }]
            }]
        }).show();
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
        console.log(beanTemp,'beanTemp')
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
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click');

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
            'de-txtRN',
            'de-txtCCUST',
            'de-txtPAYDATE',
            'de-txtCOUNTRY',
            'de-txtNCICLO',
            'de-txtMETPAGO',
            'de-txtNPAGE',
            'de-txtBANDOC',
            'de-txtMONEDA',
            'de-txtUSCR',
            'de-txtFECR',
            'de-txtHOCR',
            'de-txtUSUP',
            'de-txtFEUP',
            'de-txtHOUP'
        ];

        camposDeshabilitar.forEach(id => {
            let cmp = Ext.getCmp(prototype.id + '-' + id);
            if (cmp)
                cmp.setReadOnly(true);
        });

        // Campos editables en modo Update
        ['de-txtIMPORTE', 'de-txtCUSCA', 'de-txtCODPSE'].forEach(id => {
            let cmp = Ext.getCmp(prototype.id + '-' + id);
            if (cmp)
                cmp.setReadOnly(false);
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