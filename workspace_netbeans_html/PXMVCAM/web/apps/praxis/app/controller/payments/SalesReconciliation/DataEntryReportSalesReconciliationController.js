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


        Ext.getCmp(prototype.id + '-cmbDateFromDayReport').bindStore(win.getStoreDays(false));
        Ext.getCmp(prototype.id + '-cmbDateToDayReport').bindStore(win.getStoreDays(false));
        Ext.getCmp(prototype.id + '-cmbDateFromDayReport').setValue("01");
        Ext.getCmp(prototype.id + '-cmbDateToDayReport').setValue("01");
        
        
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify({
                    COUNTRY: 2,
                    CURRENCY: 2,
                })
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    console.log(res,'GA')
                    Ext.getCmp(prototype.id + '-cmbSCOUNTRY').bindStore(
                        Ext.create('Ext.data.Store', {data: res.lstCountry, autoLoad: true})
                    );
            
                    Ext.getCmp(prototype.id + '-cmbSCURRENCY').bindStore(
                        Ext.create('Ext.data.Store', {data: res.lstCurrencies, autoLoad: true})
                    );
                    
                    win.setValue('cmbSCOUNTRY', '');
                    win.setValue('cmbSCURRENCY', '');
                } else
//                    global.Msg({msg: res.sesion});
                    global.clear();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
        

        Ext.getCmp(prototype.id + '-cmbTDOCRe').bindStore(Ext.create('Ext.data.ArrayStore',
                {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["S", "Sales"],
                        ["R", "Refund"]
                    ]
                }));
        Ext.getCmp(prototype.id + '-cmbTDOCRe').setValue("S");
        
        Ext.getCmp(prototype.id + '-cmbSTREP').bindStore(Ext.create('Ext.data.ArrayStore',
                {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["", "All"],
                        ["M", "Match"],
                        ["P", "Pending"]
                    ]
                }));
        Ext.getCmp(prototype.id + '-cmbSTREP').setValue("");

        Ext.getCmp(prototype.id + '-cmbSCURRENCY').bindStore(Ext.create('Ext.data.ArrayStore',
                {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["COP", "Colombia"],
                        ["NOP", "Others"]
                    ]
                }));
        Ext.getCmp(prototype.id + '-cmbSCURRENCY').setValue("COP");

    },
    onChangeReport: function (radiogroup, newValue, oldValue){
        console.log('waaaa',newValue)
        if(newValue.tipor === "S"  ){
            Ext.getCmp(prototype.id + '-cmbDateFromDayReport').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbDateToDayReport').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbDateFromDayReport').hide();
            Ext.getCmp(prototype.id + '-cmbDateToDayReport').hide();
            Ext.getCmp(prototype.id + '-cmbTDOCRe').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbSTREP').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbSCURRENCY').setDisabled(true);
            Ext.getCmp(prototype.id + '-chkTPS').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbSCOUNTRY').setDisabled(true);
        
        }else{
            Ext.getCmp(prototype.id + '-cmbDateFromDayReport').setDisabled(false);
            Ext.getCmp(prototype.id + '-cmbDateToDayReport').setDisabled(false);
            Ext.getCmp(prototype.id + '-cmbDateFromDayReport').show();
            Ext.getCmp(prototype.id + '-cmbDateToDayReport').show();
            Ext.getCmp(prototype.id + '-cmbTDOCRe').setDisabled(false);
            Ext.getCmp(prototype.id + '-cmbSTREP').setDisabled(false);
            Ext.getCmp(prototype.id + '-cmbSCURRENCY').setDisabled(false);
            Ext.getCmp(prototype.id + '-chkTPS').setDisabled(false);
            Ext.getCmp(prototype.id + '-cmbSCOUNTRY').setDisabled(false);
        }

    },
    setFormatParameter: function () {
        me.bean = {};

        
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYearReport').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonthReport').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromDayReport').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateFromYearReport').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonthReport').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDayReport').getValue();
        me.bean.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOCRe').getValue();
        me.bean.IN_STAT = Ext.getCmp(prototype.id + '-cmbSTREP').getValue();
        me.bean.IN_SCURRENCY = Ext.getCmp(prototype.id + '-cmbSCURRENCY').getValue();
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbSCOUNTRY').getValue();
        me.bean.IN_TYPER = Ext.getCmp(prototype.id + '-rgTypeReport').getValue().tipor;
        if (win.getValue('chkTPS')) {
            me.bean.IN_TP = 'Y';
        } else {
            me.bean.IN_TP = 'N';
        }
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        console.log(searchParams,'searchParams')
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
        let rgTypeR = Ext.getCmp(prototype.id + '-rgTypeReport').getValue().tipor;
        this.setFormatParameter();
        if (rgTypeR == "D"){
            console.log(JSON.stringify(this.bean));
            global.getFile(prototype.url + '/getReport?beanString=' + encodeURI(JSON.stringify(me.bean)));
        }else{
            global.getFile(prototype.url + '/getReportSumary?beanString=' + encodeURI(JSON.stringify(me.bean)));
        }
        

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
    cbxDateFromDay_changeHandler: function () {
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

