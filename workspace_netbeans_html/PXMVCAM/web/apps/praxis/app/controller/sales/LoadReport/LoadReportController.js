/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.LoadReport.LoadReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadReportController',
    fecha: new Date(),
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    searchParamsAmt: {},
    bean: {},
    init: function (view) {
    },
    /*onPagingBeforeChange01: function (obj, page, opts) {
        obj.store.proxy.extraParams = this.bean;
    },*/
    OnBeforeShow: function () {
        prototype.id = 'LoadReportForm';
        prototype.idGr = 'DataEntryInteractvsPraxis';
        prototype.widthContenedor = 1366;
        prototype.heightContenedor = 768;
        prototype.url = CONTEXTPATH + '/LoadReport';
    },
    afterRender: function (obj, e) {
        this.setStoreData();
        this.btnSearch_click();
        //Ext.getCmp(prototype.id + '-paggin').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    onFromYearChange: function(combo, newValue, oldValue, eOpts) {
        var comboToYear = Ext.getCmp(prototype.id+'-cmbDateYear2');
        var cmbDateFromMonth = Ext.getCmp(prototype.id+'-cmbDateMonth');
        if (newValue!=='') {
            if (comboToYear.getValue()!=='') {
                if (newValue > comboToYear.getValue()) {
                    comboToYear.setValue(newValue);
                }
            } else comboToYear.setValue(newValue);
        } else {
            cmbDateFromMonth.setValue(newValue);
            comboToYear.setValue(newValue);
        }
    },
    onToYearChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromYear = Ext.getCmp(prototype.id+'-cmbDateYear');
        var cmbDateToMonth = Ext.getCmp(prototype.id+'-cmbDateMonth2');
        if (newValue!=='') {
            if (comboFromYear.getValue()!=='') {
                if (newValue < comboFromYear.getValue()) {
                    comboFromYear.setValue(newValue);
                }
            } else comboFromYear.setValue(newValue);
        } else {
            cmbDateToMonth.setValue(newValue);
            comboFromYear.setValue(newValue);
        }
    },
    onFromMonthChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromDay = Ext.getCmp(prototype.id+'-cmbDateDay');
        var comboToMonth = Ext.getCmp(prototype.id+'-cmbDateMonth2');
        if (newValue!=='') {
            var store = win.getStoreDays2(true, this.getValue("cmbDateYear"), Number(newValue) - 1);
            comboFromDay.bindStore(store);
            comboFromDay.setValue('');
            
            if (this.getValue("cmbDateYear")==='') this.setValue("cmbDateYear", new Date().getFullYear());
            if (this.getValue("cmbDateYear") === this.getValue("cmbDateYear2")) {
                if (comboToMonth.getValue()!=='') {
                    if (newValue > comboToMonth.getValue()) {
                        comboToMonth.setValue(newValue);
                    }
                } else comboToMonth.setValue(newValue);
            }
        } else {
            comboFromDay.setValue(newValue);
            if (this.getValue("cmbDateYear") === this.getValue("cmbDateYear2")) comboToMonth.setValue(newValue);
        }
    },
    onToMonthChange: function(combo, newValue, oldValue, eOpts) {
        var comboToDay = Ext.getCmp(prototype.id+'-cmbDateDay2');
        var comboFromMonth = Ext.getCmp(prototype.id+'-cmbDateMonth');
        if (newValue!=='') {
            var store = win.getStoreDays2(true, this.getValue("cmbDateYear2"), Number(newValue) - 1);
            comboToDay.bindStore(store);
            comboToDay.setValue('');
            
            if (this.getValue("cmbDateYear")==='') this.setValue("cmbDateYear", new Date().getFullYear());
            if (this.getValue("cmbDateYear") === this.getValue("cmbDateYear2")) {
                if (comboFromMonth.getValue()!=='') {
                    if (newValue < comboFromMonth.getValue()) {
                        comboFromMonth.setValue(newValue);
                    }
                } else comboFromMonth.setValue(newValue);
            }
        } else {
            comboToDay.setValue(newValue);
            if (this.getValue("cmbDateYear") === this.getValue("cmbDateYear2")) comboFromMonth.setValue(newValue);
        }
    },
    onFromDayChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromDay = Ext.getCmp(prototype.id+'-cmbDateDay');
        var comboFromMonth = Ext.getCmp(prototype.id+'-cmbDateMonth');
        var cmbDateToMonth = Ext.getCmp(prototype.id+'-cmbDateMonth2');
        var comboToDay = Ext.getCmp(prototype.id+'-cmbDateDay2');
        var cmbDateToDay = Ext.getCmp(prototype.id+'-cmbDateDay2');
        if (newValue!=='') {
            if (comboFromMonth.getValue()==='') {
                comboFromMonth.setValue("01");
                if (this.getValue("cmbDateYear") === this.getValue("cmbDateYear2")) {
                    cmbDateToMonth.setValue("01");
                    cmbDateToDay.setValue(newValue);
                }
            }
            if (comboToDay.getValue()!=='') {
                if (newValue > comboToDay.getValue()) {
                    comboToDay.setValue(newValue);
                }
            } else comboToDay.setValue(newValue);
            comboFromDay.setValue(newValue);
        } else {
            if (this.getValue("cmbDateYear") === this.getValue("cmbDateYear2")) comboToDay.setValue(newValue);
        }
    },
    onToDayChange: function(combo, newValue, oldValue, eOpts) { 
        var comboToDay = Ext.getCmp(prototype.id+'-cmbDateDay');
        var comboToMonth = Ext.getCmp(prototype.id+'-cmbDateMonth2');
        var cmbDateFromMonth = Ext.getCmp(prototype.id+'-cmbDateMonth');
        var comboFromDay = Ext.getCmp(prototype.id+'-cmbDateDay');
        var cmbDateFromDay = Ext.getCmp(prototype.id+'-cmbDateDay');
        if (newValue!=='') {
            if (comboToMonth.getValue()==='') {
                comboToMonth.setValue("01");
                if (this.getValue("cmbDateYear") === this.getValue("cmbDateYear2")) {
                    cmbDateFromMonth.setValue("01");
                    cmbDateFromDay.setValue(newValue);
                }
            }
            if (comboFromDay.getValue()!=='') {
                if (newValue < comboFromDay.getValue()) {
                    comboFromDay.setValue(newValue);
                }
            } else comboFromDay.setValue(newValue);
            comboToDay.setValue(newValue);
        } else {
            if (this.getValue("cmbDateYear") === this.getValue("cmbDateYear2")) comboFromDay.setValue(newValue);
        }
    },
    // </editor-fold>
    setStoreData: function () {
        Ext.getCmp(prototype.id + '-cmbDateYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateYear2').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateMonth2').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateDay2').bindStore(win.getStoreDays(true));
        
        var mes = this.fecha.getMonth()+1;
        if(mes < 10) mes = "0"+mes;
        var day = this.fecha.getDate()-1;
        Ext.getCmp(prototype.id + '-cmbDateYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateMonth').setValue(mes);
        Ext.getCmp(prototype.id + '-cmbDateDay').setValue(day);
        Ext.getCmp(prototype.id + '-cmbDateYear2').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateMonth2').setValue(mes);
        Ext.getCmp(prototype.id + '-cmbDateDay2').setValue(day);
        
        Ext.getCmp(prototype.id + '-txtStation').setValue("00000000");

        var cmbDate = Ext.getCmp(prototype.id + '-cmbDate');
        var cmbState = Ext.getCmp(prototype.id + '-cmbState');
        var cmbStatus = Ext.getCmp(prototype.id + '-cmbStatus');
        var cmbStatusAmt = Ext.getCmp(prototype.id + '-cmbStatusAmt');
        
        cmbDate.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["FREPOR", "Report Date"]
            ]
        }));
        cmbDate.setValue("FREPOR");

        cmbState.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                [0, "All"],
                [1, "Interact Loaded"],
                [2, "Match"],
                [3, "Avra Only"]
            ]
        }));
        cmbState.setValue("0");
        
        cmbStatus.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["AL", "All"],
                ["CL", "Closed"],
                ["AC", "Automatic Closed"],
                ["", "Empty"]
            ]
        }));
        cmbStatus.setValue("AL");
        
        cmbStatusAmt.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["A", "All"],
                ["Y", "Yes"],
                ["N", "No"]
            ]
        }));
        cmbStatusAmt.setValue("A");
    },
    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);
    },
    btnSearch_clickAmount: function (obj, e) {
        this.setFormatParameterAmt();
        this.setGridDataAmount(obj, e);
    },
    setFormatParameter: function () {
        var filterType = Ext.getCmp(prototype.id + '-cmbDate').getValue();
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateYear').getValue();
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateMonth').getValue();
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateDay').getValue();
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateYear2').getValue();
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateMonth2').getValue();
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateDay2').getValue();
        if (yearFrom === null || yearFrom === '') {
            Ext.getCmp(prototype.id + '-cmbDateYear').setValue(this.fecha.getFullYear());
            yearFrom = '' + this.fecha.getFullYear();
        }
        if (monthFrom === null || monthFrom === '') {
            monthFrom = '';
        }
        if (dayFrom === null || dayFrom === '') {
            dayFrom = '';
        }
        if (yearTo === null || yearTo === '') {
            Ext.getCmp(prototype.id + '-cmbDateYear2').setValue(this.fecha.getFullYear());
            yearTo = '' + this.fecha.getFullYear();
        }
        if (monthTo === null || monthTo === '') {
            monthTo = '';
        }
        if (dayTo === null || dayTo === '') {
            dayTo = '';
        }
        //var FECHARPT = year + month + day;
        var WKSTAT = Ext.getCmp(prototype.id + '-txtStation').getValue();
        var PSTATE = Ext.getCmp(prototype.id + '-cmbState').getValue();
        var ST = Ext.getCmp(prototype.id + '-cmbStatus').getValue();
        var SAMT = Ext.getCmp(prototype.id + '-cmbStatusAmt').getValue();
            
        searchParams = {
            filterType: filterType,
            yearFrom: yearFrom,
            monthFrom: monthFrom,
            dayFrom: dayFrom,
            yearTo: yearTo,
            monthTo: monthTo,
            dayTo: dayTo,
            WKSTAT: WKSTAT,
            PSTATE: PSTATE,
            ST: ST,
            SAMT: SAMT
        };
    },
    setFormatParameterAmt: function () {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateYear').getValue();
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateMonth').getValue();
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateDay').getValue();
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateYear2').getValue();
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateMonth2').getValue();
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateDay2').getValue();
        if (yearFrom === null || yearFrom === '') {
            Ext.getCmp(prototype.id + '-cmbDateYear').setValue(this.fecha.getFullYear());
            yearFrom = '' + this.fecha.getFullYear();
        }
        if (monthFrom === null || monthFrom === '') {
            monthFrom = '';
        }
        if (dayFrom === null || dayFrom === '') {
            dayFrom = '';
        }
        if (yearTo === null || yearTo === '') {
            Ext.getCmp(prototype.id + '-cmbDateYear2').setValue(this.fecha.getFullYear());
            yearTo = '' + this.fecha.getFullYear();
        }
        if (monthTo === null || monthTo === '') {
            monthTo = '';
        }
        if (dayTo === null || dayTo === '') {
            dayTo = '';
        }
        var IN_FREPOR_FROM = yearFrom + monthFrom + dayFrom;
	var IN_FREPOR_TO = yearTo + monthTo + dayTo;
        var WKSTAT = '';
        var gridIata = Ext.getCmp(prototype.id + '-gridData');
        if (gridIata.getSelectionModel().hasSelection()) {
            var row = gridIata.getSelectionModel().getSelection()[0];
            WKSTAT = row.data.STATION;
            IN_FREPOR_FROM = row.data.FREPOR;
            IN_FREPOR_TO = row.data.FREPOR;
        }
        searchParamsAmt = {
            IN_FREPOR_FROM: IN_FREPOR_FROM,
            IN_FREPOR_TO: IN_FREPOR_TO,
            WKSTAT: WKSTAT
        };
    },
    setGridData: function (obj, val) {
        win.lblUser_toolTip("Estructura: PXF051");
        this.setFormatParameter();
        /*var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
            });
        } else {*/
            var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
                proxy: {
                    url: prototype.url + '/loadPXF051'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        //}
    },
    setGridDataAmount: function (obj, val) {
        this.setFormatParameterAmt();
        /*filter.yearFrom = app.getYearCode(cmbDateFromYear.selectedItem.data);
        filter.monthFrom = app.getMonthCode(cmbDateFromMonth.selectedItem.data);
        filter.dayFrom = app.getDayCode(cmbDateFromDay.selectedItem.data);
        filter.yearTo = app.getYearCode(cmbDateToYear.selectedItem.data);
        filter.monthTo = app.getMonthCode(cmbDateToMonth.selectedItem.data);
        filter.dayTo = app.getDayCode(cmbDateToDay.selectedItem.data);

        filter.IN_FREPOR_FROM = filter.yearFrom + filter.monthFrom + filter.dayFrom;
        filter.IN_FREPOR_TO = filter.yearTo + filter.monthTo + filter.dayTo;

        if(gridDataPXF051.length > 0 && gridTransactions.selectedIndex > -1){
                var filterBean:PXF051 = PXF051(gridDataPXF051.getItemAt(gridTransactions.selectedIndex));
                filter.IN_WKSTAT = filterBean.STATION;
                filter.IN_FREPOR_FROM = filterBean.FREPOR;
                filter.IN_FREPOR_TO = filterBean.FREPOR;
        }*/
        var storeGridDatasAmt = Ext.create('Ext.Praxis.store.sales.GridData', {
            proxy: {
                url: prototype.url + '/loadPX108S02PXF053'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParamsAmt;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataAmt').bindStore(storeGridDatasAmt);
    },
    onInfInteract: function (obj, metaData, rowNum, column, obj2, rowData) {
        var data = rowData.data;
        if(data.WKSTAT !== undefined && data.SAMT === 'Y'){
            var paramsInfInt = {
                STATION: data.STATION,
                FREPOR: data.FREPOR
            };
            var dataEntryInfInteract = Ext.create('Ext.Praxis.view.sales.LoadReportForm.DataEntryInfInteract', {
                id: prototype.id + '-dataEntyInfInteract',
                params: paramsInfInt
            });
            dataEntryInfInteract.show();
	}else{
            global.Msg({
                msg: 'Station not found or Status is "N"'
            });
        }
    },
    onConciliationTexto: function (obj, metaData, rowNum, column, obj2, rowData) {
        var data = rowData.data;
        if(data.WKSTAT !== undefined){
            var paramsContxt = {
                STATION: data.WKSTAT,
                FREPOR: data.FREPOR
            };
            var dataEntryInfInteract = Ext.create('Ext.Praxis.view.sales.LoadReportForm.DataEntryInfInteract', {
                id: prototype.id + '-dataEntyInfInteract',
                params: paramsContxt
            });
            dataEntryInfInteract.show();
	}
    },
    onChangeTab: function(obj, current, before) {
        var tabActual = current.id;
        switch (tabActual) {
            case prototype.id+ '-tabIata':
                break;
            case prototype.id+ '-tabAmount':
                this.btnSearch_clickAmount();
                break;
        }
    },
    /**
     * Metodos usados para editar
     * */
    btnAdd_click: function (obj, e) {
        this.winDataEntry('I');
    },
    winDataEntry: function (action, data) {
        action = action === null || action === undefined ? 'U' : action;
        data = data === null || data === undefined ? {} : data;
        
        var dataEntry = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                data: data
            }
        });
        dataEntry.show();
    },
    onEditClick: function (obj, metaData, rowNum, column, obj2, rowData) {
        var data = rowData.data;
        this.winDataEntry('U', data);
    },
    btnBack_click: function (obj, e) {
        global.showMenu();
    },
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cmbDateYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateDay').setValue('');
        Ext.getCmp(prototype.id + '-txtCountry').setValue('');
        Ext.getCmp(prototype.id + '-cmbBanco').setValue('');
        Ext.getCmp(prototype.id + '-txtCurrency').setValue('');
        Ext.getCmp(prototype.id + '-txtIata').setValue('');
        Ext.getCmp(prototype.id + '-txtGroup').setValue('');
        Ext.getCmp(prototype.id + '-txtIdFil').setValue('');
        Ext.getCmp(prototype.id + '-txtCia').setValue('');
        Ext.getCmp(prototype.id + '-txtTicket').setValue('');
        Ext.getCmp(prototype.id + '-cmbStatus').setValue('');
        Ext.getCmp(prototype.id + '-cmbSource').setValue('');
        if (e === '') {
            Ext.getCmp(prototype.id + '-cmbDate').setValue('');
        }
    },
    btnExcel_click: function (obj, e) {
        Ext.Msg.show({
            title: '.:PRAXISAM:.',
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
        global.getFile(prototype.url + '/getXLSX?AIRLINE=' + searchParams.AIRLINE
                + '&CIUVT=' + searchParams.CIUVT
                + '&FECHARPT=' + searchParams.FECHARPT
                + '&FUENTE=' + searchParams.FUENTE
                + '&PAIS=' + searchParams.PAIS
                + '&BANCO=' + searchParams.BANCO
                + '&MONEDA=' + searchParams.MONEDA
                + '&FLAG=' + searchParams.FLAG
                + '&GRUPO=' + searchParams.GRUPO
                + '&IATA=' + searchParams.IATA
                + '&TKT=' + searchParams.TKT
                + '&STPRO=' + searchParams.STPRO);
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contenedor-filters');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});