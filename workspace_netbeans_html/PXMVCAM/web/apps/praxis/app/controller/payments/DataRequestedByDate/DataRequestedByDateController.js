/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.DataRequestedByDate.DataRequestedByDateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataRequestedByDateController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanDetAvisos: {},
    beanDetCard: {},
    beanDetNoMatch: {},
    beanDetNoMatchAvisos: {},
    beanDetUsos: {},
    beanBank: {},
    beanDay: {},
    beanMerchant: {},
    beanBankS: {},
    beanDayByS: {},
    beanMerchantByS: {},
    beanByMerchant: {},
    searchParamsTkt: {},
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    lstSendBank: [],
    lstSendIata: [],
    lstBank: [],
    lstCard: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    reg99: 0,
    me: '',
    searchParams: {},
    searchParamsExcelHis: {},
    searchParamsExcelCharge: {},
    paramsDetail: {},
    paramsDetAvisos: {},
    beanProMasterTicket: {},
    dataObtain: {},
    dataGrid: [],
    init: function(view) {
        me = this;
        prototype.id = 'DataRequestedByDateForm';
        prototype.url = CONTEXTPATH + '/DataRequestedByDate';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        prototypeProgram.view = 'payments-data-requested-by-date-form';
        prototypeProgram.nprog = 'PX00000573';
        prototypeProgram.title = 'Data Requested by Date';
        prototypeProgram.modulo = '';

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#DataRequestedByDateForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#DataRequestedByDateForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#DataRequestedByDateForm-btnClear': {
                click: this.btnClear_click
            },
            '#DataRequestedByDateForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#DataRequestedByDateForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#DataRequestedByDateForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#DataRequestedByDateForm-btnBack': {
                click: this.btnBack_click
            },
            '#DataRequestedByDateForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#DataRequestedByDateForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#DataRequestedByDateForm-btn-pag-next': {
                click: this.pagNext
            },
            '#DataRequestedByDateForm-btn-pag-last': {
                click: this.pagLast
            },
            '#DataRequestedByDateForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#DataRequestedByDateForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#DataRequestedByDateForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            }

        });
    },
    xpanel_afterrender: function(obj, e) {
        this.obtainData();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    eventKey2: function(e, eOpts) {
        var strTkt = e.value.replace(' ', '');
        console.log(strTkt);
        if (eOpts.getKey() === 13) {
            this.viewMasterTkt(strTkt);
        }
    },
    viewMasterTkt: function(strTkt) {

        this.beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        this.beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        this.beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
//        this.beanProMasterTicket.IN_SEQ = '00';

        console.log(this.beanProMasterTicket);
        win.displayProMasterTicket(this, 'RequestedBank', this.beanProMasterTicket);
    },
    obtainData: function() {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        /*var month = this.fecha.getMonth() + 1;
         
         if (month < 10) {
         month = '0' + month;
         }
         */
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateDay').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');

        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                //["SENTDATE", "Reception Date"],
                //["SALEDATE", "Sale Date"],
                ["FECR", "Creation Date"],
                        //["FECSELEC", "GDS Date"],
                        //["DATEN", "Bank Date"]
            ]
        }));
        cmbFecFiltro.setValue("FECR");

        this.btnSearch_click();
    },
    cmbTranType_changeHandler: function() {
        var selectedValue = Ext.getCmp(prototype.id + '-radiogroupType').getValue().rbgType;
        console.log(selectedValue);
        switch (selectedValue) {
            case 'cb':
                this.setFormatParameter();
                this.search();
                break;
            case 'ss':
                this.setFormatParameterInteract();
                this.searchInteract();
                break;
        }
    },
    setFormatParameter: function() {
        me.bean = {};

        me.bean.IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateDay').getValue();

        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        console.log(searchParams);
    },
    setFormatParameterInteract: function() {
        me.bean = {};

        me.bean.IN_DATEFROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateDay').getValue();

        me.bean.IN_DATETO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        console.log(searchParams);
    },
    btnSearch_click: function(obj, e) {
        
        Ext.getCmp(prototype.id + '-pie').show();
        this.cmbTranType_changeHandler();
        //this.setFormatParameter();
        //this.search();
    },
    search: function() {
        win.lblUser_toolTip("Estructura: A2331");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function(obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
//                        console.log(obj.data);
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            console.log(data);

                            var IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
                            var titIN_DATE = '';

                            if (IN_DATE === 'SALEDATE') {
                                titIN_DATE = 'Sales';
                            } else if (IN_DATE === 'FECR') {
                                titIN_DATE = 'Creation';
                            } else if (IN_DATE === 'DATEN') {
                                titIN_DATE = 'Bank';
                            } else if (IN_DATE === 'FECSELEC') {
                                titIN_DATE = 'GDS';
                            } else {
                                titIN_DATE = 'Reception';
                            }

                            Ext.getCmp(prototype.id + '-adgTitFecha').setText(titIN_DATE);

                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataMain').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    searchInteract: function() {
        win.lblUser_toolTip("Estructura: A3676");
        me.panelActual = '-panelGridStatusSabre';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchInteractSabre'
                }, listeners: {
                    beforeload: function(obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
//                        console.log(obj.data);
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            console.log(data);
                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataStatusSabre').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    onViewDetCard: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

//        me.drillDown.push(me.panelActual);
//        me.panelActual = '-boxCardData';
//        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetCard.IN_DATE = rowData.data.IN_DATE;
        this.beanDetCard.IN_FECHA_FROM = rowData.data.IN_FECHA_FROM;
        this.beanDetCard.IN_FECHA_TO = rowData.data.IN_FECHA_TO;
        this.beanDetCard.SENTDATE = rowData.data.SENTDATE;
        this.beanDetCard.IN_CARDC = rowData.data.IN_CARDC;
        this.beanDetCard.IN_CARDN1 = rowData.data.IN_CARDN1;
        this.beanDetCard.IN_CARDN2 = rowData.data.IN_CARDN2;
        this.beanDetCard.MERCHN = rowData.data.MERCHN;
        this.beanDetCard.IN_AGENT = rowData.data.IN_AGENT;
        this.beanDetCard.IN_AUTHNBR = rowData.data.IN_AUTHNBR;
        this.beanDetCard.STVAL = rowData.data.STVAL;
        this.beanDetCard.DATES = rowData.data.DATES;
        this.beanDetCard.CODEBANK = rowData.data.CODEBANK;
        this.beanDetCard.IN_COUNTRY = rowData.data.IN_COUNTRY;
        this.beanDetCard.DATEN = rowData.data.DATEN;
        this.beanDetCard.IN_TCARD = rowData.data.IN_TCARD;
        this.beanDetCard.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDetCard.IN_CODEBANK = rowData.data.IN_CODEBANK;
//        console.log(this.beanDetCard);

        me.paramsDetail.beanString = JSON.stringify(this.beanDetCard);
        this.setGridDataDetCard_2();
    },
    onViewDetUsos: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxUsosData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        if (rowData.data.DATEN !== '') {

            this.beanDetUsos.IN_DATE = rowData.data.IN_DATE;
            this.beanDetUsos.IN_FECHA_FROM = rowData.data.IN_FECHA_FROM;
            this.beanDetUsos.IN_FECHA_TO = rowData.data.IN_FECHA_TO;
            this.beanDetUsos.SENTDATE = rowData.data.SENTDATE;
            this.beanDetUsos.IN_CARDC = rowData.data.IN_CARDC;
            this.beanDetUsos.IN_CARDN1 = rowData.data.IN_CARDN1;
            this.beanDetUsos.IN_CARDN2 = rowData.data.IN_CARDN2;
            this.beanDetUsos.MERCHN = rowData.data.MERCHN;
            this.beanDetUsos.IN_AGENT = rowData.data.IN_AGENT;
            this.beanDetUsos.IN_AUTHNBR = rowData.data.IN_AUTHNBR;
            this.beanDetUsos.STVAL = rowData.data.STVAL;
            this.beanDetUsos.DATEN = rowData.data.DATEN;
            this.beanDetUsos.CODEBANK = rowData.data.CODEBANK;
            this.beanDetUsos.IN_COUNTRY = rowData.data.IN_COUNTRY;
            this.beanDetUsos.IN_TCARD = rowData.data.IN_TCARD;
            this.beanDetUsos.IN_MERCHN = rowData.data.IN_MERCHN;
            this.beanDetUsos.IN_CODEBANK = rowData.data.IN_CODEBANK;
//            console.log(this.beanDetUsos);

            me.paramsDetail.beanString = JSON.stringify(this.beanDetUsos);
            this.setGridDataDetUsos();
        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    validateFields: function() {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        if (rec.data.children === null || rec.data.children === undefined) {
            this.winDataEntry('U', rec);
        } else {
            global.Msg({msg: 'Please Select Ticket'});
        }
        ;
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.DataRequestedByDateForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
//                lstCountry: me.lstCountry,
                lstCard: me.lstCard,
                lstBank: me.lstBank
            }
        }).show();
    },
    onEditClick2: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        if (rec.data.children === null || rec.data.children === undefined) {
            this.winDataEntry2('U', rec);
        } else {
            global.Msg({msg: 'Please Select Ticket'});
        }
        ;
    },
    viewImagen: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
//        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntryViewImagen('U', rowData);
    },
    winDataEntryViewImagen: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.DataRequestedByDateForm.DataEntryImagen', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec
//                lstCountry: me.lstCountry
            }
        }).show();
    },
    btnBack_click: function(obj, e) {
        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.setWidthPie();
            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());

        var month = this.fecha.getMonth() + 1;
        if (month < 9) {
            Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('0' + month);
            Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('0' + month);
        } else {
            Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);
            Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);
        }

        Ext.getCmp(prototype.id + '-cmbDateDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
    },
    btnExcel_click: function(obj, e) {

//        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function() {

        //this.setFormatParameter();
        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-panelGridData':
                this.setFormatParameter();
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            case  '-panelGridStatusSabre':
                this.setFormatParameterInteract();
                global.getFile(prototype.url + '/getXLSXInteractSabre?beanString=' + searchParams.beanString);
                break;
        }
    },
    btnFilter_click: function(obj) {

        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function() {

        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridStatusSabre':
                me.pagginActual = '-paggin2';
                break;
        }
    },
    gridData_VIEWTKT_clickHandler: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.strTicket;
        this.beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        this.beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        this.beanProMasterTicket.IN_SERIE = strTkt.substr(8, 7);
        this.beanProMasterTicket.IN_SEQ = '00';
        console.log(this.beanProMasterTicket);

        win.displayProMasterTicket(this, 'BoomerConciliation', this.beanProMasterTicket);
    },
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function(obj) {
        var month = this.fecha.getMonth() + 1;
        if (month < 9) {
            obj.setValue('0' + month);
        } else {
            obj.setValue((month));
        }
    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function(obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectComboFromDay: function(obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
}
);