/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.DataRequestedByBank.DataRequestedByBankController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataRequestedByBankController',
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
    init: function (view) {
        me = this;
        prototype.id = 'DataRequestedByBankForm';
        prototype.url = CONTEXTPATH + '/DataRequestedByBank';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        
        prototypeProgram.view = 'payments-data-requested-by-bank-form';
        prototypeProgram.nprog = 'PX00000404';
        prototypeProgram.title = 'Data Requested by Bank';
        prototypeProgram.modulo = '';

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#DataRequestedByBankForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#DataRequestedByBankForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#DataRequestedByBankForm-btnClear': {
                click: this.btnClear_click
            },
            '#DataRequestedByBankForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#DataRequestedByBankForm-imgExcelH': {
                click: this.imgExcelHis_clickHandler
            },
            '#DataRequestedByBankForm-imgExcelC': {
                click: this.imgExcelChareBack_clickHandler
            },
            '#DataRequestedByBankForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#DataRequestedByBankForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#DataRequestedByBankForm-btnBack': {
                click: this.btnBack_click
            },
            '#DataRequestedByBankForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#DataRequestedByBankForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#DataRequestedByBankForm-btn-pag-next': {
                click: this.pagNext
            },
            '#DataRequestedByBankForm-btn-pag-last': {
                click: this.pagLast
            },
            '#DataRequestedByBankForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#DataRequestedByBankForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#DataRequestedByBankForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            }

        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    checkIATA: function (a, b, bol, rowData, e, f, g, h) {

        console.log(bol);
        console.log(rowData.data.STVAL);

        me.lstSendIata = [];

        var gridTemp = [];
        if (rowData.data.STVAL === '' || rowData.data.STVAL === '1') {
            //Linked
            rowData.data.IN_SELECT = bol.toString();

            if (bol === true) {
//                gridLstSendBankAC.addItem(ObjectUtil.copy(data));
                me.lstSendIata.push(rowData.data);
                console.log(me.lstSendIata);

            } else {
                for (var j = 0; j < me.lstSendIata.length; j++) {
                    if (me.lstSendIata[j].SENTDATE === rowData.data.SENTDATE &&
                            me.lstSendIata[j].MERCHN === rowData.data.MERCHN &&
                            me.lstSendIata[j].STVAL === rowData.data.STVAL) {
                        me.lstSendIata.splice(j, 1);
                        console.log(me.lstSendIata);
                    }
                }
            }
//            gridDataAC.itemUpdated(data);
//            gridDataAC.refresh();

        } else {
            if (bol === true) {
                if (rowData.data.STVAL === '3') {
                    global.Msg({msg: 'Information already sent to IATA.'});
                } else {
                    global.Msg({msg: 'Error: Information cant not be sent to IATA. Only Status *Stand By* allowed.'});
                }
            }
        }

    },
    checkBANK: function (a, b, bol, rowData, e, f, g, h) {

        console.log(bol);
//        me.lstSendBank = [];

//        var copylstSendBank = [];
        if (rowData.data.STVAL === '3') {
            //Linked
            rowData.data.IN_SELECT = bol.toString();

            if (bol === true) {
//                gridLstSendBankAC.addItem(ObjectUtil.copy(data));
                me.lstSendBank.push(rowData.data);
//                copylstSendBank = me.lstSendBank;
                console.log(me.lstSendBank);

            } else {
                for (var j = 0; j < me.lstSendBank.length; j++) {
                    if (me.lstSendBank[j].SENTDATE === rowData.data.SENTDATE &&
                            me.lstSendBank[j].MERCHN === rowData.data.MERCHN &&
                            me.lstSendBank[j].STVAL === rowData.data.STVAL) {
                        me.lstSendBank.splice(j, 1);
                        console.log(me.lstSendBank);
                    }
                }
            }
//            gridDataAC.itemUpdated(data);
//            gridDataAC.refresh();

        } else {
            if (bol === true) {
                if (rowData.data.STVAL === '4') {
                    global.Msg({msg: 'This information has already sent to Bank'});
                } else {
                    global.Msg({msg: 'This information is not Linked.'});
                }
            }
        }
    },
    sendMail_clickHandler: function () {

        var mailTo = Ext.getCmp(prototype.id + '-cmbEmail').getValue();
        console.log(mailTo);

        if (mailTo === 'IATA') {
            console.log(me.lstSendIata);
            if (me.lstSendIata.length > 0) {
                Ext.Msg.show({
                    title: '.:Confirmation:.',
                    msg: 'Sure to Send Email to IATA?',
                    buttons: Ext.MessageBox.OKCANCEL,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'ok') {
//                            this.sendEmailtoIATA(me.lstSendIata);
                            console.log(me.lstSendIata);

                            var listaCadena = JSON.stringify(me.lstSendIata);
//                            console.log(listaCadena);

                            Ext.Ajax.request({
                                url: prototype.url + '/sendEmailtoIATA',
                                method: 'POST',
                                timeout: 60000000,
                                beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
                                params: {lista: listaCadena},
                                success: function (response, options) {
                                    Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');
                                    var res = Ext.JSON.decode(response.responseText);
                                    console.log(res);
                                    var msjError = String(res.msjError);

                                    if (msjError !== "") {
                                        global.Msg({msg: msjError});

//                                        if(msjError.substr(0, 5) !== 'Error'){
                                        if (msjError.startsWith('Error')) {
                                            me.btnSearch_click();
                                        }
                                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                    }
                                }
                            });
                        }
                    }
                });
            } else {
                global.Msg({msg: 'Please select the information you want to send.'});
            }
        } else {
            console.log(me.lstSendBank);
            if (me.lstSendBank.length > 0) {
                Ext.Msg.show({
                    title: '.:Confirmation:.',
                    msg: 'Sure to Send Email to Bank?',
                    buttons: Ext.MessageBox.OKCANCEL,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'ok') {
//                            this.sendEmailtoBank(gridLstSendBankAC);
                            console.log(me.lstSendBank);
                            var listaCadena = JSON.stringify(me.lstSendBank);
//                            console.log(listaCadena);

                            Ext.Ajax.request({
                                url: prototype.url + '/sendEmailtoBank',
                                method: 'POST',
                                timeout: 60000000,
                                beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
                                params: {lista: listaCadena},
                                success: function (response, options) {
                                    Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');
                                    var res = Ext.JSON.decode(response.responseText);
                                    console.log(res);
                                    var msjError = String(res.msjError);

                                    if (msjError !== "") {
                                        global.Msg({msg: msjError});

//                                        if(msjError.substr(0, 5) !== 'Error'){
                                        if (msjError.startsWith('Error')) {
                                            me.btnSearch_click();
                                        }
                                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                    }
                                }
                            });
                        }
                    }
                });
            } else {
                global.Msg({msg: 'Please select the information you want to send.'});
            }
        }

    },
    
    onSendEmail: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        
//        if(rowData.data.DATES !== '' && rowData.data.STVAL === '3'){
        if(rowData.data.DATES !== ''){
            console.log(rowData.data);
            
            Ext.Msg.show({
                title: '.:Confirmation:.',
                msg: 'Sure to Send Email to Bank?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        var lstObj = [];
                        lstObj.push(rowData.data);
                        
                        console.log(lstObj);
                        var listaRow = JSON.stringify(lstObj);

                        Ext.Ajax.request({
                            url: prototype.url + '/sendEmail',
                            method: 'POST',
                            timeout: 60000000,
                            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
                            params: {listaRow: listaRow},
                            success: function (response, options) {
                                Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');
                                var res = Ext.JSON.decode(response.responseText);
                                console.log(res);
                                var msjError = String(res.msjError);
                //
                                if (msjError !== "") {
                                    global.Msg({msg: msjError});
//                                    if (msjError.startsWith('Error')) {
//                                        me.btnSearch_click();
//                                    }
//                                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                }else{
                                    global.Msg({msg: "Error Email"});
                                }
                            }
                        });
                    }   
                }

            });
        }
    },
    
    sendEmailtoIATA: function () {

        var beanString = JSON.stringify(meDE.bean.data);
//        console.log(beanString);

        Ext.Ajax.request({
            url: prototype.url + '/searchCompleteDetail',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-panelGridData').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-panelGridData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanResult = res.result;
                meDE.mostrarData();
            }
        });
    },
    eventKey2: function (e, eOpts) {
        var strTkt = e.value.replace(' ', '');
        console.log(strTkt);
        if (eOpts.getKey() === 13) {
            this.viewMasterTkt(strTkt);
        }
    },
    viewMasterTkt: function (strTkt) {
        
        this.beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        this.beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        this.beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
//        this.beanProMasterTicket.IN_SEQ = '00';

        console.log(this.beanProMasterTicket);
        win.displayProMasterTicket(this, 'RequestedBank', this.beanProMasterTicket);
    },
    imgExcelHis_clickHandler: function () {

        me.bean = {};
        me.bean.IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateDay').getValue();


        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        me.bean.IN_CARDC = Ext.getCmp(prototype.id + '-cmbCardType').getValue();
        me.bean.IN_CARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        me.bean.IN_CARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();
        me.bean.IN_MERCHN = Ext.getCmp(prototype.id + '-txtMERCHN').getValue();
        me.bean.IN_AGENT = Ext.getCmp(prototype.id + '-txtSAGENT').getValue();
        me.bean.IN_AUTHNBR = Ext.getCmp(prototype.id + '-txtAUTHNBR').getValue();
        me.bean.IN_CODEBANK = Ext.getCmp(prototype.id + '-cmbBankCode').getValue();
        me.bean.IN_STVAL = Ext.getCmp(prototype.id + '-cmbStatus').getValue();
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParamsExcelHis = {
            beanString: beanString,
            bean: me.bean
        };
        console.log(searchParamsExcelHis);

        var selectedValue = Ext.getCmp(prototype.id + '-rbgType').getValue();
        switch (selectedValue.rb) {
            case 'ACLARACIONES':
//                console.log('ACLARACIONES');
                if (me.bean.IN_CODEBANK === 'BN' && me.bean.IN_STVAL === '5') {
                    Ext.Msg.show({
                        title: '.:Confirmation:.',
                        msg: 'Download Excel ?',
                        buttons: Ext.MessageBox.OKCANCEL,
                        scope: this,
                        icon: Ext.MessageBox.QUESTION,
                        modal: true,
                        fn: function (btn) {
                            if (btn === 'ok') {
//                                this.exportHistoricalBN();
                                global.getFile(prototype.url + '/exportHistoricalBN?beanString=' + searchParamsExcelHis.beanString);
                            }
                        }
                    });
                } else {
                    Ext.Msg.show({
                        title: '.:Confirmation:.',
                        msg: 'Download Excel ?',
                        buttons: Ext.MessageBox.OKCANCEL,
                        scope: this,
                        icon: Ext.MessageBox.QUESTION,
                        modal: true,
                        fn: function (btn) {
                            if (btn === 'ok') {
//                                this.exportHistorical();
                                global.getFile(prototype.url + '/exportHistorical?beanString=' + searchParamsExcelHis.beanString);
                            }
                        }
                    });
                }
                break;
            case 'AVISOS':
//                console.log('AVISOS');
                Ext.Msg.show({
                    title: '.:Confirmation:.',
                    msg: 'Presionar OK para Call Center o Web. Presionar CANCEL para Franquicias',
                    buttons: Ext.MessageBox.OKCANCEL,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'ok') {
//                            this.exportHistoricalAvisos();
                            global.getFile(prototype.url + '/exportHistoricalAvisos?beanString=' + searchParamsExcelHis.beanString);
                        } else if (btn === 'cancel') {
//                            this.exportHistoricalAvisosFra();
                            global.getFile(prototype.url + '/exportHistoricalAvisosFra?beanString=' + searchParamsExcelHis.beanString);
                        }
                    }
                });
                break;
        }

    },
    imgExcelChareBack_clickHandler: function () {

        me.bean = {};
        me.bean.IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateDay').getValue();


        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParamsExcelCharge = {
            beanString: beanString,
            bean: me.bean
        };
        console.log(searchParamsExcelCharge);

        Ext.Msg.show({
            title: '.:Confirmation:.',
            msg: 'Download Charge Back Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(prototype.url + '/exportChargeBack?beanString=' + searchParamsExcelCharge.beanString);
                }
            }
        });

    },
    obtainData: function () {
        
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(false);
        var storeComboDataDay = win.getStoreDays(true);
        
        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);
        Ext.getCmp(prototype.id + '-cmbDateDay').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');

        var cmbEmail = Ext.getCmp(prototype.id + '-cmbEmail');
        cmbEmail.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["IATA", "to IATA"],
                ["BANK", "to Bank"]
            ]
        }));
        cmbEmail.setValue("IATA");

        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["SENTDATE", "Reception Date"],
                ["SALEDATE", "Sale Date"],
                ["FECR", "Creation Date"],
                ["FECSELEC", "GDS Date"],
                ["DATEN", "Bank Date"]
            ]
        }));
        cmbFecFiltro.setValue("SENTDATE");

        var cmbStatus = Ext.getCmp(prototype.id + '-cmbStatus');
        cmbStatus.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["1", "Stand By"],
                ["2", "Sent to Office"],
                ["3", "Linked"],
                ["4", "Sent to Bank"],
                ["5", "Chargeback"],
                ["6", "Reverse Chargeback"]
            ]
        }));
        cmbStatus.setValue("");

        var cmbTCARD = Ext.getCmp(prototype.id + '-cmbTCARD');
        cmbTCARD.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["A", "All"],
                ["N", "National"],
                ["I", "International"],
                ["", "Others"]
            ]
        }));
        cmbTCARD.setValue("A");

        this.dataObtain.BANK = 2;
        this.dataObtain.CARD = 2;
        this.dataObtain.COUNTRY = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);

                me.lstBank = res.lstBank;
                me.lstCard = res.lstCard;
                me.lstCountry = res.lstCountry;

                var storeData = Ext.create('Ext.data.Store', {
                    data: me.lstBank,
                    autoLoad: true
                });
                var storeData2 = Ext.create('Ext.data.Store', {
                    data: me.lstCard,
                    autoLoad: true
                });
                var storeData3 = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });

                Ext.getCmp(prototype.id + '-cmbBankCode').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbBankCode').setValue('');

                Ext.getCmp(prototype.id + '-cmbCardType').bindStore(storeData2);
                Ext.getCmp(prototype.id + '-cmbCardType').setValue('');

                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

                me.btnSearch_click();
            }
        });
    },
    cmbTranType_changeHandler: function () {

        var selectedValue = Ext.getCmp(prototype.id + '-rbgType').getValue();
        switch (selectedValue.rb) {
            case 'ACLARACIONES':
                console.log('Clarifications');
                var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
                cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["SENTDATE", "Reception Date"],
                        ["SALEDATE", "Sale Date"],
                        ["FECR", "Creation Date"],
                        ["FECSELEC", "GDS Date"],
                        ["DATEN", "Bank Date"]
                    ]
                }));
                cmbFecFiltro.setValue("SENTDATE");
                Ext.getCmp(prototype.id + '-txtSAGENT').setReadOnly(false);
                Ext.getCmp(prototype.id + '-cmbStatus').setReadOnly(false);
                break;
            case 'AVISOS':
                console.log('Bank Notice');
                var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
                cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["APLIDATE", "Application Date"],
                        ["FECSELEC", "Selection Date"]
                    ]
                }));
                cmbFecFiltro.setValue("APLIDATE");
                Ext.getCmp(prototype.id + '-txtSAGENT').setValue('');
                Ext.getCmp(prototype.id + '-cmbStatus').setValue('');
                Ext.getCmp(prototype.id + '-txtSAGENT').setReadOnly(true);
                Ext.getCmp(prototype.id + '-cmbStatus').setReadOnly(true);
                break;
        }

        this.btnSearch_click();
    },
    setFormatParameter: function () {
        me.bean = {};
        me.beanTKT = {};

        var ticket = Ext.getCmp(prototype.id + '-txtTicket').getValue();

        if (ticket.trim() !== '') {
            if (ticket.trim().length === 13) {
                me.bean.IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
                me.beanTKT.IN_TDOC = ticket;

                if (me.bean.IN_DATE === 'DATEN') {
                    this.searchDetUsos_TKT(me.beanTKT);
                } else {
                    this.searchDetCardTKT(me.beanTKT);
                }
            } else {
                global.Msg({msg: 'Ticket number must contain 13 digits.'});
                Ext.getCmp(prototype.id + '-txtTicket').setValue('');
            }
        } else {
            me.bean.IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
            me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                    Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                    Ext.getCmp(prototype.id + '-cmbDateDay').getValue();


            me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                    Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                    Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

            me.bean.IN_CARDC = Ext.getCmp(prototype.id + '-cmbCardType').getValue();
            me.bean.IN_CARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
            me.bean.IN_CARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();
            me.bean.IN_MERCHN = Ext.getCmp(prototype.id + '-txtMERCHN').getValue();
            me.bean.IN_AGENT = Ext.getCmp(prototype.id + '-txtSAGENT').getValue();
            me.bean.IN_AUTHNBR = Ext.getCmp(prototype.id + '-txtAUTHNBR').getValue();
            me.bean.IN_CODEBANK = Ext.getCmp(prototype.id + '-cmbBankCode').getValue();
            me.bean.IN_TCARD = Ext.getCmp(prototype.id + '-cmbTCARD').getValue();
            me.bean.IN_STVAL = Ext.getCmp(prototype.id + '-cmbStatus').getValue();
            me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();

            var beanString = JSON.stringify(me.bean);
            searchParams = {
                beanString: beanString,
                bean: me.bean
            };
            console.log(searchParams);

            var option = Ext.getCmp(prototype.id + '-rbgType').getValue();
            switch (option.rb) {
                case 'ACLARACIONES':
                    console.log('Clarifications');
                    this.search();
                    break;
                case 'AVISOS':
                    console.log('Bank Notice');
                    this.searchAvisos();
                    break;
            }
        }
    },
    searchDetCardTKT: function (bean) {
        win.lblUser_toolTip("Estructura: A2331");
        
        var tkt = JSON.stringify(bean);
        console.log(tkt);
        
        Ext.getCmp(prototype.id + '-pie').hide();

        Ext.Ajax.request({
            url: prototype.url + '/searchDetCardTKT',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            params: {beanString: tkt},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                if (res.data.length === 0) {
                    global.Msg({
                        msg: 'Data not found.'
                    });
                } else {
                    me.drillDown.push(me.panelActual);
                    me.panelActual = '-boxCardDataTKT';
                    global.selectedChild(me.childs, prototype.id + me.panelActual);
                    
                    var data = res.data[0];
                    var lstData = res.data;
                    
                    console.log(data);

                    var filDate = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
                    var descFilDate = '';

                    if (filDate === 'SALEDATE') {
                        descFilDate = 'Sale Date';
                    } else if (filDate === 'FECR') {
                        descFilDate = 'Creation Date';
                    } else if (filDate === 'FECSELEC') {
                        descFilDate = 'GDS Date';
                    } else {
                        descFilDate = 'Reception Date';
                    }
//
                    var tit = Ext.getCmp(prototype.id + '-gridCardDataTKT');
                    tit.setTitle('<center style="font-size:12px;">' + descFilDate + ' : ' + data.strFormatDate + ' - Merchant Number : ' + data.MERCHN + ' ' + data.MERCHNAM + '</center>');

                    var a = [];
                    var dataRoot = {text: '.', expanded: false, children: []};

                    Ext.Object.each(lstData, function (index, value) {
                        if (a.indexOf(value.strDescripcion) < 0) {
                            var x = [];

                            var TOT_pos = 0;
                            var TOT_VFOP = 0;
                            var TOT_TOTCUP = 0;
                            var TOT_AUTAMOUNT = 0;
                            Ext.Object.each(lstData, function (index, valuex) {
                                if (value.strDescripcion === valuex.strDescripcion) {
                                    TOT_pos += valuex.pos;
                                    TOT_VFOP += valuex.VFOP;
                                    TOT_AUTAMOUNT += valuex.AUTAMOUNT;
                                    TOT_TOTCUP += valuex.TOTCUP;
                                }
                            });

                            a.push(value.strDescripcion);
                            dataRoot.children.push({
                                strDescripcion: value.strDescripcion,
                                pos: TOT_pos,
                                strTicket: '',
                                VFOP: TOT_VFOP,
                                AUTAMOUNT: value.AUTAMOUNT,
                                AUTHNBR: value.AUTHNBR,
                                SALEDATE: value.SALEDATE,
                                AGENTE: value.AGENTE,
                                TOTCUP: TOT_TOTCUP,
                                strImgLink: '',
                                DATES: value.DATES,
                                DATEN: value.DATEN,
                                expanded: false, children: []
                            });
                            var b = [];
                            Ext.Object.each(lstData, function (index, value01) {
                                if (value.strDescripcion === value01.strDescripcion) {
//                                    b.push(value01.VNR);
                                    dataRoot.children[a.indexOf(value.strDescripcion)].children.push({
                                        strDescripcion: value01.strDescripcion,
                                        CODMOTI: value01.CODMOTI,
                                        CLINAME: value01.CLINAME,
                                        pos: value01.pos,
                                        strTicket: value01.strTicket,
                                        strDescStatus: value01.strDescStatus,
                                        FOLIO: value01.FOLIO,
                                        SCOUNTRY: value01.SCOUNTRY,
                                        VFOP: value01.VFOP,
                                        AUTAMOUNT: value01.AUTAMOUNT,
                                        AUTHNBR: value01.AUTHNBR,
                                        SALEDATE: value01.SALEDATE,
                                        AGENTE: value01.AGENTE,
                                        TOTCUP: value01.TOTCUP,
                                        strUsoCpn1: value01.strUsoCpn1,
                                        strUsoCpn2: value01.strUsoCpn2,
                                        strUsoCpn3: value01.strUsoCpn3,
                                        strUsoCpn4: value01.strUsoCpn4,
                                        strImgLink: value01.strImgLink,
                                        DATES: value01.DATES,
                                        DATEN: value01.DATEN,
                                        //DataEntry Update
                                        MERCHN: value01.MERCHN,
                                        SENTDATE: value01.SENTDATE,
                                        MERCHNAM: value01.MERCHNAM,
                                        CARDNBR: value01.CARDNBR,
                                        NUMREFER: value01.NUMREFER,
                                        SQCRFILE: value01.SQCRFILE,
                                        STVAL: value01.STVAL,
                                        CODEBANK: value01.CODEBANK,
                                        SCARCOD: value01.SCARCOD,
                                        IATADATE: value01.IATADATE,
                                        CERROR: value01.CERROR,
                                        //DataEntry Delete
                                        TDOC: value01.TDOC,
                                        CCIA: value01.CCIA,
                                        FORMA: value01.FORMA,
                                        SERIE: value01.SERIE,
                                        leaf: true
                                    });
                                }
                            });
                        }
                    });
//                    console.log(dataRoot);
//                    prototype.id_TOT_lngTotDocs_ = data.lngTotDocs;

                    Ext.getCmp(prototype.id + '-lblTotQTKTTKT').setText(Ext.util.Format.number(data.lngTotDocs, '0,000'));
                    Ext.getCmp(prototype.id + '-lblTotVFOPTKT').setText(Ext.util.Format.number(data.dblTotVFOP, '0,000.00'));
                    Ext.getCmp(prototype.id + '-lblTotAUTAMOUNTDTKT').setText(Ext.util.Format.number(data.dblTotAUTAMOUNT, '0,000.00'));
                    Ext.getCmp(prototype.id + '-lblTotTOTCUPTKT').setText(Ext.util.Format.number(data.lngTotTOTCUP, '0,000'));

                    var storeTree = Ext.create('Ext.data.TreeStore', {
                        root: dataRoot
                    });

                    Ext.getCmp(prototype.id + '-gridCardDataTKT').setStore(storeTree);
                }
            }
        });
    },
    /*
    setFormatParameter: function () {
        me.bean = {};
        me.beanTKT = {};

        var ticket = Ext.getCmp(prototype.id + '-txtTicket').getValue();

        if (ticket.trim() !== '') {
            if (ticket.trim().length === 13) {
                me.bean.IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
                me.beanTKT.IN_TDOC = ticket;

                if (me.bean.IN_DATE === 'DATEN') {
                    this.searchDetUsos_TKT(me.beanTKT);
                } else {
                    this.searchDetCardTKT(me.beanTKT);
                }
            } else {
                global.Msg({msg: 'Ticket number must contain 13 digits.'});
                Ext.getCmp(prototype.id + '-txtTicket').setValue('');
            }
        } else {
            me.bean.IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
            me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                    Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                    Ext.getCmp(prototype.id + '-cmbDateDay').getValue();


            me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                    Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                    Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

            me.bean.IN_CARDC = Ext.getCmp(prototype.id + '-cmbCardType').getValue();
            me.bean.IN_CARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
            me.bean.IN_CARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();
            me.bean.IN_MERCHN = Ext.getCmp(prototype.id + '-txtMERCHN').getValue();
            me.bean.IN_AGENT = Ext.getCmp(prototype.id + '-txtSAGENT').getValue();
            me.bean.IN_AUTHNBR = Ext.getCmp(prototype.id + '-txtAUTHNBR').getValue();
            me.bean.IN_CODEBANK = Ext.getCmp(prototype.id + '-cmbBankCode').getValue();
            me.bean.IN_TCARD = Ext.getCmp(prototype.id + '-cmbTCARD').getValue();
            me.bean.IN_STVAL = Ext.getCmp(prototype.id + '-cmbStatus').getValue();
            me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();

            var beanString = JSON.stringify(me.bean);
            searchParams = {
                beanString: beanString,
                bean: me.bean
            };
            console.log(searchParams);
        }
    },
    */
    
    btnSearch_click: function (obj, e) {
        
        Ext.getCmp(prototype.id + '-pie').show();
        
        me.lstSendBank = [];
        me.lstSendIata = [];
        this.setFormatParameter();
        var option = Ext.getCmp(prototype.id + '-rbgType').getValue();
        switch (option.rb) {
            case 'ACLARACIONES':
                console.log('Clarifications');
                this.search();
                break;
            case 'AVISOS':
                console.log('Bank Notice');
                this.searchAvisos();
                break;
        }
    },
    search: function () {
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
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
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

                            if (titIN_DATE === 'Reception' || titIN_DATE === 'Bank') {
                                Ext.getCmp(prototype.id + '-adgTitFecha').setText('Clarifications');
                            }

                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataAirport').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    searchAvisos: function () {
        win.lblUser_toolTip("Estructura: A2335");
        me.panelActual = '-boxMainAvisos';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchAvisos'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
//                        console.log(obj.data);
                        var pag = Ext.getCmp(prototype.id + '-paggin2');
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
            Ext.getCmp(prototype.id + '-gridMainAvisos').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },

    onViewDetCard: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

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
        console.log(this.beanDetCard);

        me.paramsDetail.beanString = JSON.stringify(this.beanDetCard);
        this.setGridDataDetCard_2();
    },
    setGridDataDetCard_2: function () {
        win.lblUser_toolTip("Estructura: A2331");
        var cadena = me.paramsDetail.beanString;

        Ext.Ajax.request({
            url: prototype.url + '/searchDetCard',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            params: {beanString: cadena},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                if (res.data.length === 0) {
                    global.Msg({
                        msg: 'Data not found.'
                    });
                } else {
                    me.drillDown.push(me.panelActual);
                    me.panelActual = '-boxCardData';
                    global.selectedChild(me.childs, prototype.id + me.panelActual);
                    var data = res.data[0];
                    var lstData = res.data;
                    console.log(data);
//                    console.log(data.lngTotDocs);
//                    var bean = res.data.items[0].data;
//
                    var filDate = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
                    var descFilDate = '';

                    if (filDate === 'SALEDATE') {
                        descFilDate = 'Sale Date';
                    } else if (filDate === 'FECR') {
                        descFilDate = 'Creation Date';
                    } else if (filDate === 'FECSELEC') {
                        descFilDate = 'GDS Date';
                    } else {
                        descFilDate = 'Reception Date';
                    }
//
                    var tit = Ext.getCmp(prototype.id + '-gridCardData');
                    tit.setTitle('<center style="font-size:12px;">' + descFilDate + ' : ' + data.strFormatDate + ' - Merchant Number : ' + data.MERCHN + ' ' + data.MERCHNAM + '</center>');

                    var a = [];
                    var dataRoot = {text: '.', expanded: false, children: []};

                    Ext.Object.each(lstData, function (index, value) {
//                        console.log(value);
                        if (a.indexOf(value.strDescripcion) < 0) {
                            var x = [];

                            var TOT_pos = 0;
                            var TOT_VFOP = 0;
                            var TOT_TOTCUP = 0;
                            var TOT_AUTAMOUNT = 0;
                            Ext.Object.each(lstData, function (index, valuex) {
                                if (value.strDescripcion === valuex.strDescripcion) {
                                    TOT_pos += valuex.pos;
                                    TOT_VFOP += valuex.VFOP;
                                    TOT_AUTAMOUNT += valuex.AUTAMOUNT;
                                    TOT_TOTCUP += valuex.TOTCUP;
                                }
                            });

//                            console.log(TOT_VFOP);

                            a.push(value.strDescripcion);
                            dataRoot.children.push({
                                strDescripcion: value.strDescripcion,
                                pos: TOT_pos,
                                strTicket: '',
                                VFOP: TOT_VFOP,
                                AUTAMOUNT: value.AUTAMOUNT,
                                AUTHNBR: value.AUTHNBR,
                                SALEDATE: value.SALEDATE,
                                AGENTE: value.AGENTE,
                                TOTCUP: TOT_TOTCUP,
                                strImgLink: '',
                                DATES: value.DATES,
                                DATEN: '0',
                                expanded: false, children: []
                            });
                            var b = [];
                            Ext.Object.each(lstData, function (index, value01) {
                                if (value.strDescripcion === value01.strDescripcion) {
//                                    b.push(value01.VNR);
                                    dataRoot.children[a.indexOf(value.strDescripcion)].children.push({
                                        strDescripcion: value01.strDescripcion,
                                        CODMOTI: value01.CODMOTI,
                                        CLINAME: value01.CLINAME,
                                        pos: value01.pos,
                                        strTicket: value01.strTicket,
                                        strDescStatus: value01.strDescStatus,
                                        FOLIO: value01.FOLIO,
                                        SCOUNTRY: value01.SCOUNTRY,
                                        VFOP: value01.VFOP,
                                        AUTAMOUNT: value01.AUTAMOUNT,
                                        AUTHNBR: value01.AUTHNBR,
                                        SALEDATE: value01.SALEDATE,
                                        AGENTE: value01.AGENTE,
                                        TOTCUP: value01.TOTCUP,
                                        strUsoCpn1: value01.strUsoCpn1,
                                        strUsoCpn2: value01.strUsoCpn2,
                                        strUsoCpn3: value01.strUsoCpn3,
                                        strUsoCpn4: value01.strUsoCpn4,
                                        strImgLink: value01.strImgLink,
                                        DATES: value01.DATES,
                                        DATEN: value01.DATEN,
                                        //DataEntry Update
                                        MERCHN: value01.MERCHN,
                                        SENTDATE: value01.SENTDATE,
                                        MERCHNAM: value01.MERCHNAM,
                                        CARDNBR: value01.CARDNBR,
                                        NUMREFER: value01.NUMREFER,
                                        SQCRFILE: value01.SQCRFILE,
                                        STVAL: value01.STVAL,
                                        CODEBANK: value01.CODEBANK,
                                        SCARCOD: value01.SCARCOD,
                                        IATADATE: value01.IATADATE,
                                        CERROR: value01.CERROR,
                                        //DataEntry Delete
                                        TDOC: value01.TDOC,
                                        CCIA: value01.CCIA,
                                        FORMA: value01.FORMA,
                                        SERIE: value01.SERIE,
                                        leaf: true
                                    });
                                }
                            });
                        }
                    });
//                    console.log(dataRoot);
//                    prototype.id_TOT_lngTotDocs_ = data.lngTotDocs;

                    Ext.getCmp(prototype.id + '-lngTotDocs').setText(Ext.util.Format.number(data.lngTotDocs, '0,000'));
                    Ext.getCmp(prototype.id + '-dblTotVFOP').setText(Ext.util.Format.number(data.dblTotVFOP, '0,000.00'));
                    Ext.getCmp(prototype.id + '-dblTotAUTAMOUNT').setText(Ext.util.Format.number(data.dblTotAUTAMOUNT, '0,000.00'));
                    Ext.getCmp(prototype.id + '-lngTotTOTCUP').setText(Ext.util.Format.number(data.lngTotTOTCUP, '0,000'));

                    var storeTree = Ext.create('Ext.data.TreeStore', {
                        root: dataRoot
                    });

                    Ext.getCmp(prototype.id + '-gridCardData').setStore(storeTree);
                }
            }
        });
    },
    setGridDataDetCard: function () {
        win.lblUser_toolTip("Estructura: A2331");

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetCard'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
//                        var pag = Ext.getCmp(prototype.id + '-paggin3');
//                        var pagData = pag.getPageData();
//                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            console.log(data);

                            var filDate = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
                            var descFilDate = '';

                            if (filDate === 'SALEDATE') {
                                descFilDate = 'Sale Date';
                            } else if (filDate === 'FECR') {
                                descFilDate = 'Creation Date';
                            } else if (filDate === 'FECSELEC') {
                                descFilDate = 'GDS Date';
                            } else {
                                descFilDate = 'Reception Date';
                            }

                            var tit = Ext.getCmp(prototype.id + '-gridCardData');
                            tit.setTitle('<center style="font-size:12px;">' + descFilDate + ' : ' + data.strFormatDate + ' - Merchant Number : ' + data.MERCHN + ' ' + data.MERCHNAM + '</center>');

                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridCardData').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        }
    },

    onViewDetNoMatch: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxNoMatchData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        if (rowData.data.lngQNMATCH > 0) {

            this.beanDetNoMatch.IN_DATE = rowData.data.IN_DATE;
            this.beanDetNoMatch.IN_FECHA_FROM = rowData.data.IN_FECHA_FROM;
            this.beanDetNoMatch.IN_FECHA_TO = rowData.data.IN_FECHA_TO;
            this.beanDetNoMatch.SENTDATE = rowData.data.SENTDATE;
            this.beanDetNoMatch.IN_CARDC = rowData.data.IN_CARDC;
            this.beanDetNoMatch.IN_CARDN1 = rowData.data.IN_CARDN1;
            this.beanDetNoMatch.IN_CARDN2 = rowData.data.IN_CARDN2;
            this.beanDetNoMatch.MERCHN = rowData.data.MERCHN;
            this.beanDetNoMatch.IN_AGENT = rowData.data.IN_AGENT;
            this.beanDetNoMatch.IN_AUTHNBR = rowData.data.IN_AUTHNBR;
            this.beanDetNoMatch.STVAL = rowData.data.STVAL;
            this.beanDetNoMatch.DATES = rowData.data.DATES;
            this.beanDetNoMatch.CODEBANK = rowData.data.CODEBANK;
            this.beanDetNoMatch.IN_COUNTRY = rowData.data.IN_COUNTRY;
            this.beanDetNoMatch.IN_TCARD = rowData.data.IN_TCARD;
            this.beanDetNoMatch.IN_MERCHN = rowData.data.IN_MERCHN;
            this.beanDetNoMatch.IN_CODEBANK = rowData.data.IN_CODEBANK;
            this.beanDetNoMatch.IN_COUNTRY = rowData.data.IN_COUNTRY;
//            console.log(this.beanDetNoMatch);

            me.paramsDetail.beanString = JSON.stringify(this.beanDetNoMatch);
            this.setGridDataDetNoMatch();
        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridDataDetNoMatch: function () {
        win.lblUser_toolTip("Estructura: A2331");

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetNoMatch'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
//                        var pag = Ext.getCmp(prototype.id + '-paggin4');
//                        var pagData = pag.getPageData();
//                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            console.log(data);

                            var filDate = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
                            var descFilDate = '';

                            if (filDate === 'SALEDATE') {
                                descFilDate = 'Sale Date';
                            } else if (filDate === 'FECR') {
                                descFilDate = 'Creation Date';
                            } else if (filDate === 'FECSELEC') {
                                descFilDate = 'GDS Date';
                            } else {
                                descFilDate = 'Reception Date';
                            }

                            var tit = Ext.getCmp(prototype.id + '-gridNoMatchData');
                            tit.setTitle('<center style="font-size:12px;">' + descFilDate + ' : ' + data.SENTDATE + '  - Merchant Number : ' + data.MERCHN + '  ' + data.MERCHNAM + '</center>');
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridNoMatchData').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
        }
    },

    onViewDetUsos: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

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
    setGridDataDetUsos: function () {
        win.lblUser_toolTip("Estructura: A2331");

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetUsos'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
//                        var pag = Ext.getCmp(prototype.id + '-paggin5');
//                        var pagData = pag.getPageData();
//                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            console.log(data);

                            var filDate = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
                            var descFilDate = '';

                            if (filDate === 'SALEDATE') {
                                descFilDate = 'Sale Date';
                            } else if (filDate === 'FECR') {
                                descFilDate = 'Creation Date';
                            } else if (filDate === 'FECSELEC') {
                                descFilDate = 'GDS Date';
                            } else {
                                descFilDate = 'Reception Date';
                            }

                            var tit = Ext.getCmp(prototype.id + '-gridUsosData');
                            tit.setTitle('<center style="font-size:12px;">' + descFilDate + ' : ' + data.strFormatDate + '  - Merchant Number : ' + data.MERCHN + ' ' + data.MERCHNAM + '   - Status : ' + data.strDescStatus + '</center>');
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridUsosData').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
        }
    },

    onGridDetAvisos: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetAvisos';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetAvisos.IN_DATE = rowData.data.IN_DATE;
        this.beanDetAvisos.APLIDATE = rowData.data.APLIDATE;
        this.beanDetAvisos.IN_CARDC = rowData.data.IN_CARDC;
        this.beanDetAvisos.IN_CARDN1 = rowData.data.IN_CARDN1;
        this.beanDetAvisos.IN_CARDN2 = rowData.data.IN_CARDN2;
        this.beanDetAvisos.MERCHN = rowData.data.MERCHN;
        this.beanDetAvisos.IN_AUTHNBR = rowData.data.IN_AUTHNBR;
        this.beanDetAvisos.CODEBANK = rowData.data.CODEBANK;
        this.beanDetAvisos.STVAL = rowData.data.STVAL;
        this.beanDetAvisos.IN_FECHA_FROM = rowData.data.IN_FECHA_FROM;
        this.beanDetAvisos.IN_FECHA_TO = rowData.data.IN_FECHA_TO;
        this.beanDetAvisos.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDetAvisos.IN_CODEBANK = rowData.data.IN_CODEBANK;
        this.beanDetAvisos.strDescStatus = rowData.data.strDescStatus;
//        console.log(this.beanDetAvisos);

        me.paramsDetail.beanString = JSON.stringify(this.beanDetAvisos);
        this.setGridDataDetAvisos2();
    },
    setGridDataDetAvisos2: function () {
        win.lblUser_toolTip("Estructura: A2335");
        var cadena = me.paramsDetail.beanString;

        Ext.Ajax.request({
            url: prototype.url + '/searchDetAvisos',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            params: {beanString: cadena},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                if (res.data.length === 0) {
                    global.Msg({
                        msg: 'Data not found.'
                    });
                } else {
                    var data = res.data[0];
                    var lstData = res.data;
                    console.log(data);
//                    console.log(data.lngTotDocs);

                    var tit = Ext.getCmp(prototype.id + '-gridDetAvisos');
                    tit.setTitle('<center style="font-size:12px;">' + 'Application Date : ' + data.APLIDATE + '  - Merchant Number : ' + data.MERCHN + ' ' + data.MERCHNAM
                            + '  - Bank Code : ' + data.CODEBANK + '</center>');



                    var a = [];
                    var dataRoot = {text: '.', expanded: false, children: []};

                    Ext.Object.each(lstData, function (index, value) {
//                        console.log(value);
                        if (a.indexOf(value.strDescripcion) < 0) {
                            var x = [];

                            var TOT_QTYTRNX = 0;
                            var TOT_AUTAMOUNT = 0;
                            Ext.Object.each(lstData, function (index, valuex) {
                                if (value.strDescripcion === valuex.strDescripcion) {
                                    TOT_QTYTRNX += valuex.QTYTRNX;
                                    TOT_AUTAMOUNT += valuex.AUTAMOUNT;
                                }
                            });

                            console.log(value.lngQNMATCH);

                            a.push(value.strDescripcion);
                            dataRoot.children.push({
                                strDescripcion: value.strDescripcion,
                                QTYTRNX: TOT_QTYTRNX,
//                                AUTHNBR: (value.lngQNMATCH) === 0 ? '0' : value.lngQNMATCH,
                                AUTHNBR: '',
                                AUTAMOUNT: TOT_AUTAMOUNT,
                                strTicket: '',
                                expanded: true, children: []
                            });
                            var b = [];
                            Ext.Object.each(lstData, function (index, value01) {
                                if (value.strDescripcion === value01.strDescripcion) {
//                                    b.push(value01.VNR);
                                    dataRoot.children[a.indexOf(value.strDescripcion)].children.push({
                                        strDescripcion: value01.strDescripcion,
                                        QTYTRNX: value01.QTYTRNX,
                                        AUTHNBR: value01.AUTHNBR,
                                        AGENTE: value01.AGENTE,
                                        AUTAMOUNT: value01.AUTAMOUNT,
                                        CONCEPT: value01.CONCEPT,
                                        strDescStatus: value01.strDescStatus,
                                        SENTDATE: value01.SENTDATE,
                                        MERCHN: value01.MERCHN,
                                        CARDNBR: value01.CARDNBR,
                                        SQCRFILE: value01.SQCRFILE,
                                        strTicket: value01.strTicket,
                                        strUsoCpn1: value01.strUsoCpn1,
                                        strUsoCpn2: value01.strUsoCpn2,
                                        strUsoCpn3: value01.strUsoCpn3,
                                        strUsoCpn4: value01.strUsoCpn4,
                                        SALEDATE: value01.SALEDATE,
                                        leaf: true
                                    });
                                }
                            });
                        }
                    });
                    console.log(dataRoot);
//                    prototype.id_TOT_lngTotDocs_ = data.lngTotQTYTRNX;

                    Ext.getCmp(prototype.id + '-AvilngTotQTYTRNX').setText(Ext.util.Format.number(data.lngTotQTYTRNX, '0,000'));
                    Ext.getCmp(prototype.id + '-AvidblTotAUTAMOUNT').setText(Ext.util.Format.number(data.dblTotAUTAMOUNT, '0,000'));


                    var storeTree = Ext.create('Ext.data.TreeStore', {
                        root: dataRoot
                    });

                    Ext.getCmp(prototype.id + '-gridDetAvisos').setStore(storeTree);
                }
            }
        });

    },
    setGridDataDetAvisos: function () {
        win.lblUser_toolTip("Estructura: A2335");

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetAvisos'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin6');
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
                            console.log('data');
                            console.log(data);
                        }
                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetAvisos').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
        }
    },

    onViewDetNoMatchAvisos: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        if (rowData.data.lngQNMATCH > 0) {

            console.log(rowData.data.STVAL);
            this.beanDetNoMatchAvisos.MERCHN = rowData.data.MERCHN;
            this.beanDetNoMatchAvisos.IN_DATE = rowData.data.IN_DATE;
            this.beanDetNoMatchAvisos.APLIDATE = rowData.data.APLIDATE;
            this.beanDetNoMatchAvisos.IN_CARDC = rowData.data.IN_CARDC;
            this.beanDetNoMatchAvisos.IN_CARDN1 = rowData.data.IN_CARDN1;
            this.beanDetNoMatchAvisos.IN_CARDN2 = rowData.data.IN_CARDN2;
            this.beanDetNoMatchAvisos.IN_AUTHNBR = rowData.data.IN_AUTHNBR;
            this.beanDetNoMatchAvisos.CODEBANK = rowData.data.CODEBANK;
            this.beanDetNoMatchAvisos.STVAL = rowData.data.STVAL;

            this.beanDetNoMatchAvisos.IN_FECHA_FROM = rowData.data.IN_FECHA_FROM;
            this.beanDetNoMatchAvisos.IN_FECHA_TO = rowData.data.IN_FECHA_TO;
            this.beanDetNoMatchAvisos.IN_MERCHN = rowData.data.IN_MERCHN;
            this.beanDetNoMatchAvisos.IN_CODEBANK = rowData.data.IN_CODEBANK;
            this.beanDetNoMatchAvisos.strDescStatus = rowData.data.strDescStatus;
//            console.log(this.beanDetNoMatchAvisos);
            me.paramsDetAvisos.beanString = JSON.stringify(this.beanDetNoMatchAvisos);

            if (rowData.data.STVAL === '2') {
                this.searchDetAvisos_A2290_2();
            } else {
                this.searchDetAvisosNoMatch();
            }

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }

    },
    searchDetAvisos_A2290_2: function () {
        win.lblUser_toolTip("Estructura: A2335");

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetAvisos';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var cadena = me.paramsDetAvisos.beanString;
        Ext.Ajax.request({
            url: prototype.url + '/searchDetAvisos_A2290',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            params: {beanString: cadena},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                if (res.data.length === 0) {
                    global.Msg({
                        msg: 'Data not found.'
                    });
                } else {
                    var data = res.data[0];
                    var lstData = res.data;
                    console.log(data);
//                    console.log(data.lngTotDocs);

                    var tit = Ext.getCmp(prototype.id + '-gridDetAvisos');
                    tit.setTitle('<center style="font-size:12px;">' + 'Application Date : ' + data.APLIDATE + '  - Merchant Number : ' + data.MERCHN + ' ' + data.MERCHNAM
                            + '  - Bank Code : ' + data.CODEBANK + '</center>');



                    var a = [];
                    var dataRoot = {text: '.', expanded: false, children: []};

                    Ext.Object.each(lstData, function (index, value) {
//                        console.log(value);
                        if (a.indexOf(value.strDescripcion) < 0) {
                            var x = [];

                            var TOT_QTYTRNX = 0;
                            var TOT_AUTAMOUNT = 0;
                            Ext.Object.each(lstData, function (index, valuex) {
                                if (value.strDescripcion === valuex.strDescripcion) {
                                    TOT_QTYTRNX += valuex.QTYTRNX;
                                    TOT_AUTAMOUNT += valuex.AUTAMOUNT;
                                }
                            });

                            console.log(value.lngQNMATCH);

                            a.push(value.strDescripcion);
                            dataRoot.children.push({
                                strDescripcion: value.strDescripcion,
                                QTYTRNX: TOT_QTYTRNX,
//                                AUTHNBR: (value.lngQNMATCH) === 0 ? '0' : value.lngQNMATCH,
                                AUTHNBR: '',
                                AUTAMOUNT: TOT_AUTAMOUNT,
                                strTicket: '',
                                expanded: true, children: []
                            });
                            var b = [];
                            Ext.Object.each(lstData, function (index, value01) {
                                if (value.strDescripcion === value01.strDescripcion) {
//                                    b.push(value01.VNR);
                                    dataRoot.children[a.indexOf(value.strDescripcion)].children.push({
                                        strDescripcion: value01.strDescripcion,
                                        QTYTRNX: value01.QTYTRNX,
                                        AUTHNBR: value01.AUTHNBR,
                                        AGENTE: value01.AGENTE,
                                        AUTAMOUNT: value01.AUTAMOUNT,
                                        CONCEPT: value01.CONCEPT,
                                        SENTDATE: value01.SENTDATE,
                                        MERCHN: value01.MERCHN,
                                        CARDNBR: value01.CARDNBR,
                                        SQCRFILE: value01.SQCRFILE,
                                        strDescStatus: value01.strDescStatus,
                                        strTicket: value01.strTicket,
                                        strUsoCpn1: value01.strUsoCpn1,
                                        strUsoCpn2: value01.strUsoCpn2,
                                        strUsoCpn3: value01.strUsoCpn3,
                                        strUsoCpn4: value01.strUsoCpn4,
                                        SALEDATE: value01.SALEDATE,
                                        leaf: true
                                    });
                                }
                            });
                        }
                    });
                    console.log(dataRoot);
//                    prototype.id_TOT_lngTotDocs_ = data.lngTotQTYTRNX;

                    Ext.getCmp(prototype.id + '-AvilngTotQTYTRNX').setText(Ext.util.Format.number(data.lngTotQTYTRNX, '0,000'));
                    Ext.getCmp(prototype.id + '-AvidblTotAUTAMOUNT').setText(Ext.util.Format.number(data.dblTotAUTAMOUNT, '0,000'));


                    var storeTree = Ext.create('Ext.data.TreeStore', {
                        root: dataRoot
                    });

                    Ext.getCmp(prototype.id + '-gridDetAvisos').setStore(storeTree);
                }
            }
        });

    },
    searchDetAvisos_A2290: function () {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetAvisos';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        win.lblUser_toolTip("Estructura: A2335");
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetAvisos_A2290'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
//                        var pag = Ext.getCmp(prototype.id + '-paggin7');
//                        var pagData = pag.getPageData();
//                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);

                            var tit = Ext.getCmp(prototype.id + '-gridDetAvisos');
                            tit.setTitle('<center style="font-size:12px;">' + 'Application Date : ' + data.APLIDATE + '  - Merchant Number : ' + data.MERCHN + ' ' + data.MERCHNAM + '   - Bank Code : ' + data.CODEBANK + '</center>');
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetAvisos').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);
        }
    },
    searchDetAvisosNoMatch: function () {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetAvisosNoMatch';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        win.lblUser_toolTip("Estructura: A2335");
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetAvisosNoMatch'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetAvisos;
                    },
                    load: function (obj) {
//                        var pag = Ext.getCmp(prototype.id + '-paggin8');
//                        var pagData = pag.getPageData();
//                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);

                            var tit = Ext.getCmp(prototype.id + '-gridDetAvisosNoMatch');
                            tit.setTitle('<center style="font-size:12px;">' + 'Application Date : ' + data.APLIDATE + '  - Merchant Number : ' + data.MERCHN + ' ' + data.MERCHNAM + '   - Bank Code : ' + data.CODEBANK + '</center>');
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetAvisosNoMatch').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin8').bindStore(storeGridDatas);
        }
    },

    onGridDetBank: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetBank';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanBank.IN_TDOC = rowData.data.IN_TDOC;
        this.beanBank.IN_DATE = rowData.data.IN_DATE;
        this.beanBank.SDATE = rowData.data.SDATE;
        this.beanBank.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanBank.IN_BANK = rowData.data.IN_BANK;
        this.beanBank.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanBank.strFormatDate = rowData.data.strFormatDate;

        me.paramsDetail.beanString = JSON.stringify(this.beanBank);
        this.setGridDataDetBank();
    },
    setGridDataDetBank: function () {
        win.lblUser_toolTip("Estructura: A2292");

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetBank'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin2');
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

                            Ext.getCmp(prototype.id + '-gridDetBank').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                            Ext.getCmp(prototype.id + '-lblTotB_QMATCH').setText(Ext.util.Format.number(data.lngTotQMATCH, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotB_QPAS48').setText(Ext.util.Format.number(data.lngTotQPAS48, '0,000'));
                            Ext.getCmp(prototype.id + '-totQBANKRFND').setText(Ext.util.Format.number(data.totQBANKRFND, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotB_QPAID').setText(Ext.util.Format.number(data.lngTotQPAID, '0,000'));
                            Ext.getCmp(prototype.id + '-lngTotB_QDIFF').setText(Ext.util.Format.number(data.lngTotQDIFF, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotB_QTOTSAL').setText(Ext.util.Format.number(data.lngTotQTOTSAL, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotB_QTOTWS').setText(Ext.util.Format.number(data.lngTotQTOTWS, '0,000'));

                            Ext.getCmp(prototype.id + '-lblTotB_QTEF').setText(Ext.util.Format.number(data.lngTotQTEF, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotB_QTYDOC').setText(Ext.util.Format.number(data.lngTotQTYDOC, '0,000'));
                        }
                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetBank').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    onGridDetDay: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetDay';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDay.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDay.IN_DATE = rowData.data.IN_DATE;
        this.beanDay.SDATE = rowData.data.SDATE;
        this.beanDay.CBANK = rowData.data.CBANK;
        this.beanDay.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDay.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanDay.strFormatDate = rowData.data.strFormatDate;
        this.beanDay.strCREJEC = rowData.data.strCREJEC;

        me.paramsDetail.beanString = JSON.stringify(this.beanDay);
        this.setGridDataDetDay();
    },
    setGridDataDetDay: function () {
        win.lblUser_toolTip("Estructura: A2292");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetDay'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin3');
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
                            var value = Ext.getCmp(prototype.id + '-htDetDay');
                            if (data.IN_DATE === "DATEP") {
                                value.setText = "Deposit";
                            } else {
                                value.setText = "Payment";
                            }

                            Ext.getCmp(prototype.id + '-gridDetDay').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                            Ext.getCmp(prototype.id + '-lblTotD_QMATCH').setText(Ext.util.Format.number(data.lngTotQMATCH, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotD_QPAS48').setText(Ext.util.Format.number(data.lngTotQPAS48, '0,000'));
                            Ext.getCmp(prototype.id + '-totQBANKRFND2').setText(Ext.util.Format.number(data.totQBANKRFND, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotD_QPAID').setText(Ext.util.Format.number(data.lngTotQPAID, '0,000'));
                            Ext.getCmp(prototype.id + '-lngTotD_QDIFF').setText(Ext.util.Format.number(data.lngTotQDIFF, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotD_QTOTSAL').setText(Ext.util.Format.number(data.lngTotQTOTSAL, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotD_QTOTWS').setText(Ext.util.Format.number(data.lngTotQTOTWS, '0,000'));

                            Ext.getCmp(prototype.id + '-lblTotD_QTEF').setText(Ext.util.Format.number(data.lngTotQTEF, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotD_QTYDOC').setText(Ext.util.Format.number(data.lngTotQTYDOC, '0,000'));
                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDay').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        }
    },
    onGridDetMerchant: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetMerchant';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanMerchant.IN_TDOC = rowData.data.IN_TDOC;
        this.beanMerchant.IN_DATE = rowData.data.IN_DATE;
        this.beanMerchant.SDATE = rowData.data.SDATE;
        this.beanMerchant.CBANK = rowData.data.CBANK;
        this.beanMerchant.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanMerchant.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanMerchant.strFormatDate = rowData.data.strFormatDate;
        this.beanMerchant.strCREJEC = rowData.data.strCREJEC;

        me.paramsDetail.beanString = JSON.stringify(this.beanMerchant);
        this.setGridDataDetMerchant();
    },
    setGridDataDetMerchant: function () {
        win.lblUser_toolTip("Estructura: A2292");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetMerchant'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin4');
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
//                            console.log(data);
                            Ext.getCmp(prototype.id + '-gridDetMerchant').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                            Ext.getCmp(prototype.id + '-lblTotAMOUNT').setText(Ext.util.Format.number(data.dblTotAMOUNT, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotAMOUNTR').setText(Ext.util.Format.number(data.dblTotAMOUNTR, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotM_QTEF').setText(Ext.util.Format.number(data.lngTotQTEF, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotM_QTYDOC').setText(Ext.util.Format.number(data.lngTotQTYDOC, '0,000'));
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetMerchant').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
        }
    },
    onGridDetBankS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        console.log(columnNum);
        var cant = 0;
        switch (columnNum) {
            case 1 :
                rowData.data.IN_STVAL = '1';
                cant = rowData.data.lngQMATCH;
                break;
            case 2 :
                rowData.data.IN_STVAL = '4';
                cant = rowData.data.lngQDIFF;
                break;
            case 4 :
                rowData.data.IN_STVAL = '2';
                cant = rowData.data.Total;
                break;
            case 5 :
                rowData.data.IN_STVAL = '3';
                cant = rowData.data.lngQPAID;
                break;
        }

        if (cant > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxDetBankByS';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanBankS.IN_TDOC = rowData.data.IN_TDOC;
            this.beanBankS.IN_DATE = rowData.data.IN_DATE;
            this.beanBankS.SDATE = rowData.data.SDATE;
            this.beanBankS.IN_MERCHN = rowData.data.IN_MERCHN;
            this.beanBankS.IN_STVAL = rowData.data.IN_STVAL;
            this.beanBankS.IN_BANK = rowData.data.IN_BANK;
            this.beanBankS.IN_TTRAN = rowData.data.IN_TTRAN;
            this.beanBankS.strFormatDate = rowData.data.strFormatDate;

            me.paramsDetail.beanString = JSON.stringify(this.beanBankS);
            this.setGridDataDetBankS();
        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridDataDetBankS: function () {
        win.lblUser_toolTip("Estructura: A2292");
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetBankByStval'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin5');
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

                            Ext.getCmp(prototype.id + '-gridDetBankByS').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                            Ext.getCmp(prototype.id + '-lblTot_BS_QACCB').setText(Ext.util.Format.number(data.lngTotQACCB, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTot_BS_QTEF').setText(Ext.util.Format.number(data.lngTotQTEF, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTot_BS_QTYDOC').setText(Ext.util.Format.number(data.lngTotQTYDOC, '0,000'));
                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetBankByS').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
        }
    },
    OnGridDetDayByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetDayByS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDayByS.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDayByS.IN_DATE = rowData.data.IN_DATE;
        this.beanDayByS.SDATE = rowData.data.SDATE;
        this.beanDayByS.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDayByS.CBANK = rowData.data.CBANK;
        this.beanDayByS.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDayByS.SCURRENCY = rowData.data.SCURRENCY;
        this.beanDayByS.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanDayByS.strFormatDate = rowData.data.strFormatDate;
        this.beanDayByS.strCREJEC = rowData.data.strCREJEC;
        this.beanDayByS.strTitulo = rowData.data.strTitulo;

        me.paramsDetail.beanString = JSON.stringify(this.beanDayByS);
        this.setGridDataDetDayBys();
    },
    setGridDataDetDayBys: function () {
        win.lblUser_toolTip("Estructura: A2292");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetDayByStval'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                        var pag = Ext.getCmp(prototype.id + '-paggin6');
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

                            Ext.getCmp(prototype.id + '-gridDetDayBys').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                            Ext.getCmp(prototype.id + '-lblTot_DS_QACCB').setText(Ext.util.Format.number(data.lngTotQACCB, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTot_DS_QTEF').setText(Ext.util.Format.number(data.lngTotQTEF, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTot_DS_QTYDOC').setText(Ext.util.Format.number(data.lngTotQTYDOC, '0,000'));
                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDayBys').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
        }
    },
    OnGridDetMerchantByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetMerchantByS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanMerchantByS.IN_TDOC = rowData.data.IN_TDOC;
        this.beanMerchantByS.IN_DATE = rowData.data.IN_DATE;
        this.beanMerchantByS.SDATE = rowData.data.SDATE;
        this.beanMerchantByS.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanMerchantByS.CBANK = rowData.data.CBANK;
        this.beanMerchantByS.IN_STVAL = rowData.data.IN_STVAL;
        this.beanMerchantByS.SCURRENCY = rowData.data.SCURRENCY;
        this.beanMerchantByS.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanMerchantByS.strFormatDate = rowData.data.strFormatDate;
        this.beanMerchantByS.strCREJEC = rowData.data.strCREJEC;

        me.paramsDetail.beanString = JSON.stringify(this.beanMerchantByS);
        this.setGridDataDetMerchantBys();
    },
    setGridDataDetMerchantBys: function () {
        win.lblUser_toolTip("Estructura: A2292");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetMerchantByStval'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
//                        console.log(obj.data);
                        var pag = Ext.getCmp(prototype.id + '-paggin7');
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

                            Ext.getCmp(prototype.id + '-gridDetMerchantBys').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                            Ext.getCmp(prototype.id + '-lblTot_MS_AMOUNT').setText(Ext.util.Format.number(data.dblTotAMOUNT, '0,000'));
                            Ext.getCmp(prototype.id + '-totAMTRFND_F').setText(Ext.util.Format.number(data.dblTotAMOUNTR, '0,000'));
                            Ext.getCmp(prototype.id + '-totDIFF_SVFOP_F').setText(Ext.util.Format.number(data.dblTotSVFOP, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTot_MS_AMOUNTR').setText(Ext.util.Format.number(data.dblTotAVFOP, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTot_MS_QTEF').setText(Ext.util.Format.number(data.lngTotQTEF, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTot_MS_QTYDOC').setText(Ext.util.Format.number(data.lngTotQTYDOC, '0,000'));
                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetMerchantBys').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);
        }
    },
    OnGridByMerchant: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        var QTY = 0;
        switch (columnNum) {
            case 1 :
                rowData.data.IN_TDOC = '';
                QTY = rowData.data.MERCHN;
                break;
            case 4 :
                rowData.data.IN_TDOC = 'S';
                QTY = rowData.data.AMOUNTS;
                break;
            case 5 :
                rowData.data.IN_TDOC = 'R';
                QTY = rowData.data.AMOUNTR;
                break;
        }

        if (QTY > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxByMerchant';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanByMerchant.IN_TDOC = rowData.data.IN_TDOC;
            this.beanByMerchant.IN_DATE = rowData.data.IN_DATE;
            this.beanByMerchant.SDATE = rowData.data.SDATE;
            this.beanByMerchant.MERCHN = rowData.data.MERCHN;
            this.beanByMerchant.CBANK = rowData.data.CBANK;
            this.beanByMerchant.IN_STVAL = rowData.data.IN_STVAL;
            this.beanByMerchant.SCURRENCY = rowData.data.SCURRENCY;
            this.beanByMerchant.DATEF = rowData.data.DATEF;
            this.beanByMerchant.strFormatDate = rowData.data.strFormatDate;
            this.beanByMerchant.strTitulo = rowData.data.strTitulo;

            me.paramsDetail.beanString = JSON.stringify(this.beanByMerchant);
            this.setGridByMerchant();
        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridByMerchant: function () {
        win.lblUser_toolTip("Estructura: A2291");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchByMerchant'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin8');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                            Ext.getCmp(prototype.id + '-totSVFOP').setText('');
                            Ext.getCmp(prototype.id + '-totQTYDOC').setText('');
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);
                            Ext.getCmp(prototype.id + '-gridByMerchant').setTitle('<center style="font-size:12px;">' + data.strTitulo + ' Merchant Code ' + data.MERCHN + ' (' + data.strDescMerchn + ') ' + '</center>');
                            Ext.getCmp(prototype.id + '-totSVFOP').setText(Ext.util.Format.number(data.totSVFOP, '0,000'));
                            Ext.getCmp(prototype.id + '-totQTYDOC').setText(Ext.util.Format.number(data.totQTYDOC, '0,000'));
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridByMerchant').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin8').bindStore(storeGridDatas);
        }
    },

    imgByTDOC_clickHandler: function () {
//        this.btnSearch_click();
    },
    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    onDeleteClick: function (grid, rowIndex, colIndex, a, b, c) {
        var rec = grid.getStore().getAt(rowIndex);
        if (rec.data.children === null) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to delete Ticket?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        this.executeDeleteClarification(rec.data);
                    }
                }
            });
        } else {
            global.Msg({msg: 'Please Select Ticket'});
        }
        ;
    },
    executeDeleteClarification: function (bean) {
        var beanString = JSON.stringify(bean);
        Ext.Ajax.request({
            url: prototype.url + '/executeDeleteClarification',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                } else {
                    global.Msg({msg: 'An error occurred'});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        if (rec.data.children === null || rec.data.children === undefined) {
            this.winDataEntry('U', rec);
        } else {
            global.Msg({msg: 'Please Select Ticket'});
        }
        ;
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.DataRequestedByBankForm.DataEntry', {
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
    onEditClick2: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        console.log('rec');
        console.log(rec);
        if (rec.data.children === null || rec.data.children === undefined) {
            this.winDataEntry2('U', rec);
        } else {
            global.Msg({msg: 'Please Select Ticket'});
        }
        ;
    },
    winDataEntry2: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.DataRequestedByBankForm.DataEntryAvisos', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
//                lstCountry: me.lstCountry
                lstCard: me.lstCard,
                lstBank: me.lstBank
            }
        }).show();
    },
    viewImagen: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
//        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntryViewImagen('U', rowData);
    },
    winDataEntryViewImagen: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.DataRequestedByBankForm.DataEntryImagen', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec
//                lstCountry: me.lstCountry
            }
        }).show();
    },
    btnBack_click: function (obj, e) {
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
    btnClear_click: function (obj, e) {
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

        Ext.getCmp(prototype.id + '-cmbCardType').setValue('');
        Ext.getCmp(prototype.id + '-txtCard1').setValue('');
        Ext.getCmp(prototype.id + '-txtCard2').setValue('');
        Ext.getCmp(prototype.id + '-txtMERCHN').setValue('');
        Ext.getCmp(prototype.id + '-txtSAGENT').setValue('');
        Ext.getCmp(prototype.id + '-txtAUTHNBR').setValue('');
    },
    btnExcel_click: function (obj, e) {

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
                fn: function (btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function () {

        this.setFormatParameter();
        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            case  '-boxMainAvisos':
                global.getFile(prototype.url + '/getXLSXDos?beanString=' + searchParams.beanString);
                break;
            case  '-boxCardData':
                global.getFile(prototype.url + '/getXLSXTres?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxNoMatchData':
                global.getFile(prototype.url + '/getXLSXCuatro?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxUsosData':
                global.getFile(prototype.url + '/getXLSXCinco?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxDetAvisos':
                global.getFile(prototype.url + '/getXLSXSeis?beanString=' + me.paramsDetail.beanString);
                break;
        }
    },
    onDownloadFile: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                var resultByte = res.bytes;
                var bytes = new Uint8Array(resultByte); // pass your byte response to this constructor
                var blob = new Blob([bytes], {type: "application/png"});// change resultByte to bytes

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = me.fileName;
                link.click();
            }
        });
    },
    btnFilter_click: function (obj) {

        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {

        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case '-boxMainAvisos':
                me.pagginActual = '-paggin2';
                break;
            case '-boxCardData':
                me.pagginActual = '-paggin3';
                break;
            case '-boxNoMatchData':
                me.pagginActual = '-paggin4';
                break;
            case '-boxUsosData':
                me.pagginActual = '-paggin5';
                break;
            case '-boxDetAvisos':
                me.pagginActual = '-paggin6';
                break;
        }
    },
    txtFilterValue_keyDownHandler: function (e, eOpts) {

        switch (eOpts.getKey()) {
            case 13:
                this.btnSearch_click();
        }
    },
    tarjeta_keyDownHandler: function (e, eOpts) {

        var txtCard1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        if (eOpts.getKey() !== 9 && eOpts.getKey() !== 16) {
            if (txtCard1.trim().length === 6) {
                Ext.getCmp(prototype.id + '-txtCard2').focus(false, 200);
            }
        }
    },
    buscarCard_keyDownHandler: function (e, eOpts) {

        var txtCard1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        var txtCard2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();

        if (txtCard1 !== '' || txtCard2 !== '') {
            switch (eOpts.getKey()) {
                case 13:
                    if (txtCard1.trim().length === 6 && txtCard2.trim().length === 4) {
                        this.btnSearch_click();
                    } else {
                        global.Msg({msg: 'Credit Card Number must contain 10 digits.'});
                        Ext.getCmp(prototype.id + '-txtCard1').setValue('');
                        Ext.getCmp(prototype.id + '-txtCard2').setValue('');
                    }
            }
        } else {
            global.Msg({msg: 'Credit Card Number must contain 10 digits.'});
            Ext.getCmp(prototype.id + '-txtCard1').setValue('');
            Ext.getCmp(prototype.id + '-txtCard2').setValue('');
        }
    },
    BuscarTKT_keyDownHandler: function (e, eOpts) {

        me.beanTkt = {};
        var txtTicket = Ext.getCmp(prototype.id + '-txtTicket').getValue();

        switch (eOpts.getKey()) {
            case 13:
                if (txtTicket !== '') {
                    if (txtTicket.trim().length === 13) {
                        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();

                        me.bean.IN_DATE = cmbFecFiltro;
                        me.beanTkt.IN_TDOC = txtTicket;

                        var beanStringTkt = JSON.stringify(me.beanTkt);
                        searchParamsTkt = {
                            beanString: beanStringTkt,
                            bean: me.beanTkt
                        };
//                        console.log(searchParamsTkt);
                        if (me.bean.IN_DATE === 'DATEN') {
                            this.searchDetUsos_TKT(me.beanTkt);
                        } else {
                            this.searchDetCardTKT(me.beanTkt);
                        }
                    } else {
                        global.Msg({msg: 'Ticket number must contain 13 digits.'});
                        Ext.getCmp(prototype.id + '-txtTicket').setValue('');
                    }
                } else {
                    this.btnSearch_click();
                }
                break;
        }
    },
    searchDetUsos_TKT: function (beanTkt) {
        win.lblUser_toolTip("Estructura: A2331");
        me.panelActual = '-boxUsosData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetUsos_TKT'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParamsTkt;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            console.log(data);
                        }
//                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetTicket').bindStore(storeGridDatas);
        }
    },
    gridData_VIEWTKT_clickHandler: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.strTicket;
        this.beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        this.beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        this.beanProMasterTicket.IN_SERIE = strTkt.substr(8, 7);
        this.beanProMasterTicket.IN_SEQ = '00';
        console.log(this.beanProMasterTicket);

        win.displayProMasterTicket(this, 'BoomerConciliation', this.beanProMasterTicket);
    },
    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        var month = this.fecha.getMonth() + 1;
        if (month < 9) {
            obj.setValue('0' + month);
        } else {
            obj.setValue((month));
        }
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }

}
);