Ext.define('Ext.Praxis.controller.payments.SalesReconciliation.DataEntryReportSalesReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryReportSalesReconciliationController',
    meDe: '',
    actionCode: '',
    bean: {},
    bean_detail: {},
    bean_scan: {},
    lstA1852: {},
    lstAmounts: [],
    lstSendManual: [],
    lstBlocked: [],
    lstAdjustment: [],
    sumAmount: 0,
    sumAmountBlocked: 0,
    dataObtain: {},
    init: function (view) {
        meDe = this;
        this.p = this.view.params;
        this.lstAdjustment = [];
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.xpanel_afterrender();
    },
    xpanel_afterrender: function (obj, e) {
        this.setStoreData();
        this.initDate();
    },
    initDate: function () {
        Ext.getCmp(prototype.id + '-cmbDateFromYearReport').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYearReport').setValue(new Date().getFullYear());
        var mes = new Date().getMonth() + 1;

        if (mes < 10) {
            mes = "0" + mes;
        }

        Ext.getCmp(prototype.id + '-cmbDateFromMonthReport').setValue(mes);
        Ext.getCmp(prototype.id + '-cmbDateToMonthReport').setValue(mes);
    },
    setStoreData: function () {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateFromYearReport').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYearReport').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(false);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthReport').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonthReport').bindStore(storeComboDataMonth);


        Ext.getCmp(prototype.id + '-cmbDateFromDayReport').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDayReport').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDayReport').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDayReport').setValue("");

        Ext.getCmp(prototype.id + '-cmbTDOCRe').bindStore(Ext.create('Ext.data.ArrayStore',
        {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["S", "Sales"],
                ["R", "Refund"]
            ]
        }));
        Ext.getCmp(prototype.id + '-cmbTDOCRe').setValue("S");

    },
    setFormatParameter: function () {
        me.bean = {};

        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYearReport').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonthReport').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromDayReport').getValue();
//        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYearReport').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonthReport').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDayReport').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateFromYearReport').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonthReport').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDayReport').getValue();
        me.bean.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOCRe').getValue();


        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    imgExcel: function (obj, e) {

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    exportExcel: function () {

        this.setFormatParameter();
        console.log(JSON.stringify(this.bean));
        global.getFile(prototype.url + '/getReport?beanString=' + encodeURI(JSON.stringify(me.bean)));

    },
    cbxDateFromYear_changeHandler: function () {
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYearReport');
        let comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYearReport');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonthReport');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthReport');
        Ext.getCmp(prototype.id + '-cmbDateToYearReport').setValue(Ext.getCmp(prototype.id + '-cmbDateFromYearReport').getValue());
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue());
        }
    },
    cbxDateToYear_changeHandler: function () {
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYearReport');
        let comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYearReport');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonthReport');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthReport');
        if (comboToYear.getValue() < comboFromYear.getValue()) {
            comboFromYear.setValue(comboToYear.getValue());
        }
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue());
        }
    },
    cbxDateFromMonth_changeHandler: function () {
        Ext.getCmp(prototype.id + '-cmbDateToMonthReport').setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonthReport').getValue());
        if (Ext.getCmp(prototype.id + '-cmbDateFromMonthReport').getValue() !== '') {
            Ext.getCmp(prototype.id + '-cmbDateFromDayReport').setDisabled(false);
            Ext.getCmp(prototype.id + '-cmbDateToDayReport').setDisabled(false);
        } else {
            Ext.getCmp(prototype.id + '-cmbDateFromDayReport').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbDateToDayReport').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbDateToDayReport').setValue('');
            Ext.getCmp(prototype.id + '-cmbDateFromDayReport').setValue('');
        }
    },
    cbxDateFromDay_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToDayReport').setValue(Ext.getCmp(prototype.id + '-cmbDateFromDayReport').getValue());
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    cbxDateToMonth_changeHandler: function () {
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYearReport');
        let comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYearReport');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonthReport');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthReport');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (comboToMonth.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(comboToMonth.getValue());
            }
        }
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDayReport');
        comboToDay.setValue(obj.getValue());
    },
    selectComboToDay: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYearReport');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYearReport');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonthReport');
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthReport');
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateDayReport');
        if (comboFromMonth.getValue() === comboToMonth.getValue()) {
            if (obj.getValue() < comboFromDay.getValue()) {
                comboFromDay.setValue(obj.getValue());
            }
        }
        if (comboFromDay.getValue() === '') {

            comboFromDay.setValue(obj.getValue())
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
    },
// </editor-fold>

});

