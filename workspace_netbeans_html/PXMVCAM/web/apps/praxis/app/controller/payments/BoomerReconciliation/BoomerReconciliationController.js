/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.BoomerReconciliation.BoomerReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BoomerReconciliationController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanTkt: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    lstCard: [],
    lstBank: [],
    beanDetDay: {},
    beanDetCardS: {},
    beanDetCardNbr: {},
    beanDetDayS: {},
    beanDetCardNbrS: {},
    beanProMasterTicket: {},
    gridActual: '',
    panelActual: '',
    fileName: '',
    reg99: 0,
    me: '',
    searchParams: {},
    searchParamsTkt: {},
    paramsDetail: {},
    paramsDetailDay: {},
    paramsDetailCardS: {},
    paramsDetailCardNbr: {},
    paramsDetailDayS: {},
    paramsDetailCardNbrS: {},
    dataObtain: {},
    dataGrid: [],
    init: function(view) {
        me = this;
        prototype.id = 'BoomerReconciliationForm';
        prototype.url = CONTEXTPATH + '/BoomerReconciliation';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        prototypeProgram.view = 'payments-boomer-reconciliation-form';
        prototypeProgram.nprog = 'PX00000407';
        prototypeProgram.title = 'Boomer Reconciliation';
        prototypeProgram.modulo = '';

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#BoomerReconciliationForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#BoomerReconciliationForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#BoomerReconciliationForm-btnClear': {
                click: this.btnClear_click
            },
            '#BoomerReconciliationForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#BoomerReconciliationForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#BoomerReconciliationForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#BoomerReconciliationForm-btnBack': {
                click: this.btnBack_click
            },
            '#BoomerReconciliationForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#BoomerReconciliationForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#BoomerReconciliationForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#BoomerReconciliationForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#BoomerReconciliationForm-btn-pag-next': {
                click: this.pagNext
            },
            '#BoomerReconciliationForm-btn-pag-last': {
                click: this.pagLast
            },
        });
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    cbxDateFromYear_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue());
    },
    cbxDateFromMonth_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());
    },
    xpanel_afterrender: function(obj, e) {
        this.obtainData();
    },
    BuscarTKT_keyDownHandler: function(e, eOpts) {

        me.beanTkt = {};
        var txtTicket = Ext.getCmp(prototype.id + '-txtTicket').getValue();

        switch (eOpts.getKey()) {
            case 13:
                if (txtTicket !== '') {
                    if (txtTicket.trim().length === 13) {
                        var selectedValues = Ext.getCmp(prototype.id + '-rbgType').getValue();
                        switch (selectedValues.rbgType) {
                            case 'Sales':
                                me.beanTkt.IN_TDOC = 'S';
                                break;
                            case 'Refund':
                                me.beanTkt.IN_TDOC = 'R';
                                break;
                        }
                        me.beanTkt.IN_TICKET = txtTicket;
                        var beanStringTkt = JSON.stringify(me.beanTkt);
                        searchParamsTkt = {
                            beanString: beanStringTkt,
                            bean: me.beanTkt
                        };
//                        console.log(searchParamsTkt);
                        this.searchDetTICKET(me.beanTkt);

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
    tarjeta_keyDownHandler: function(e, eOpts) {

        var txtCard1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        if (eOpts.getKey() !== 9 && eOpts.getKey() !== 16) {
            if (txtCard1.trim().length === 6) {
                Ext.getCmp(prototype.id + '-txtCard2').focus(false, 200);
            }
        }
    },
    buscarCard_keyDownHandler: function(e, eOpts) {

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
    txtFilterValue_keyDownHandler: function(e, eOpts) {

        switch (eOpts.getKey()) {
            case 13:
                this.btnSearch_click();
        }
    },
    cmbTranType_changeHandler: function(e, eOpts) {

        var selectedValue = Ext.getCmp(prototype.id + '-rbgType').getValue();
        switch (selectedValue.rbgType) {
            case 'Sales':

                var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
                cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["SDATE", "Sales Date"],
                        ["BDATEP", "Reconciliation Date"]
                    ]
                }));
                cmbFecFiltro.setValue("SDATE");
                break;
            case 'Refund':

                var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
                cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["SDATE", "Refund Date"],
                        ["BDATEP", "Reconciliation Date"]
                    ]
                }));
                cmbFecFiltro.setValue("SDATE");
                break;
        }
        this.btnSearch_click();
    },
    searchDetTICKET: function(beanTkt) {
        win.lblUser_toolTip("Estructura: A2298");
        me.panelActual = '-boxDetTicket';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetTICKET'
                }, listeners: {
                    beforeload: function(obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParamsTkt;
                    },
                    load: function(obj) {
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
    obtainData: function() {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');

        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["SDATE", "Sales Date"],
                ["BDATEP", "Reconciliation Date"]
            ]
        }));
        cmbFecFiltro.setValue("SDATE");

        this.dataObtain.CARD = 2;
        this.dataObtain.BANK = 2;
        this.dataObtain.COUNTRY = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
//            beforerequest: Ext.getCmp(prototype.id + '-panelGridData').mask('Loading...'),
            params: {
                beanString: JSON.stringify(this.dataObtain)},
            success: function(response, options) {
//                Ext.getCmp(prototype.id + '-panelGridData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                me.lstCard = res.lstCard;
                var storeData = Ext.create('Ext.data.Store', {
                    data: me.lstCard,
                    autoLoad: true
                });
                me.lstBank = res.lstBank;
                var storeData2 = Ext.create('Ext.data.Store', {
                    data: me.lstBank,
                    autoLoad: true
                });

                me.lstCountry = res.lstCountry;

                Ext.getCmp(prototype.id + '-cmbCardType').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbCardType').setValue('');
                Ext.getCmp(prototype.id + '-cmbBank').bindStore(storeData2);
                Ext.getCmp(prototype.id + '-cmbBank').setValue('');

                me.btnSearch_click();
            }
        });
    },
    setFormatParameter: function() {
        me.bean = {};

        me.bean.strFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();

        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();

        var option = Ext.getCmp(prototype.id + '-rbgType').getValue();
        switch (option.rbgType) {
            case 'Sales':
                me.bean.IN_TDOC = 'S';
                break;
            case 'Refund':
                me.bean.IN_TDOC = 'R';
                break;
        }

        me.bean.IN_CARDC = Ext.getCmp(prototype.id + '-cmbCardType').getValue();
        me.bean.IN_CARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        me.bean.IN_CARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();
        me.bean.IN_MERCHN = Ext.getCmp(prototype.id + '-txtMERCHN').getValue();
        me.bean.IN_AGENT = Ext.getCmp(prototype.id + '-txtSAGENT').getValue();
        me.bean.IN_BANK = Ext.getCmp(prototype.id + '-cmbBank').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
//        console.log(searchParams);
    },
    btnSearch_click: function(obj, e) {
        if (win.getValue('txtPNR').trim() !== '') {
            if (Ext.getCmp(prototype.id + '-txtPNR').getValue().length === 6) {
                this.searchByPNR();
            } else {
                global.Msg({
                    msg: 'PNR must contain 6 characters.'
                });
            }
        } else {
            this.setFormatParameter();
            this.setGridData();
        }

    },
    setGridData: function() {
        win.lblUser_toolTip("Estructura: A2298");
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
                            if (data.strFecFiltro === "BDATEP") {
                                Ext.getCmp(prototype.id + '-adgSalDate').setText = "Reconciliation";
                            } else {
                                if (data.IN_TDOC === 'R') {
                                    Ext.getCmp(prototype.id + '-adgSalDate').setText = "Refund";
                                } else {
                                    Ext.getCmp(prototype.id + '-adgSalDate').setText = "Sales";
                                }
                            }

//                            Ext.getCmp(prototype.id + '-lblTotQMATCH').setText(Ext.util.Format.number(data.lngTotQMATCH, '0,000'));
//                            Ext.getCmp(prototype.id + '-lblTotQTEF').setText(Ext.util.Format.number(data.lngTotQTEF, '0,000'));
//                            Ext.getCmp(prototype.id + '-lblTotQPAS48').setText(Ext.util.Format.number(data.lngTotQPAS48, '0,000'));
//                            Ext.getCmp(prototype.id + '-lblTotQTOTSAL').setText(Ext.util.Format.number(data.lngTotQTOTSAL, '0,000'));
//                            Ext.getCmp(prototype.id + '-lblTotlngQMANUAL').setText(Ext.util.Format.number(data.lngTotQMANUAL, '0,000'));
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
    OnGridDetDay: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetDay';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetDay.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDetDay.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDetDay.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetDay.IN_PAYMENT = rowData.data.IN_PAYMENT;
        this.beanDetDay.IN_BANK = rowData.data.IN_BANK;
        this.beanDetDay.IN_CARDC = rowData.data.IN_CARDC;
        this.beanDetDay.IN_CARDN1 = rowData.data.IN_CARDN1;
        this.beanDetDay.IN_CARDN2 = rowData.data.IN_CARDN2;
        this.beanDetDay.SORIG = rowData.data.SORIG;
        this.beanDetDay.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDetDay.IN_AGENT = rowData.data.IN_AGENT;

        this.beanDetDay.strFormatDate = rowData.data.strFormatDate;
        this.beanDetDay.SCARCOD = rowData.data.SCARCOD;
        this.beanDetDay.strSORIG = rowData.data.strSORIG;
        this.beanDetDay.strDescCard = rowData.data.strDescCard;

        me.paramsDetailDay.beanString = JSON.stringify(this.beanDetDay);
        this.SetOnGridDetDay();
    },
    SetOnGridDetDay: function() {
        win.lblUser_toolTip("Estructura: A2298");
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
                    beforeload: function(obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = me.paramsDetailDay;
                    },
                    load: function(obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
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
                            var titulo = '';
                            var flagDrilDownByDay = 'Date';

                            if (flagDrilDownByDay !== 'Date') {
                                titulo = " - Card : " + data.SCARCOD + ' : ' + data.strDescCard;
                            }
                            if (data.strFecFiltro === 'BDATEP') {
                                Ext.getCmp(prototype.id + '-gridDetDay').setTitle('<center style="font-size:12px;">' + ' Reconciliation Date : ' + data.strFormatDate + titulo + '</center>');
                            } else {
                                if (data.IN_TDOC == 'R') {
                                    Ext.getCmp(prototype.id + '-gridDetDay').setTitle('<center style="font-size:12px;">' + ' Refund Date : ' + data.strFormatDate + titulo + '</center>');
                                } else {
                                    Ext.getCmp(prototype.id + '-gridDetDay').setTitle('<center style="font-size:12px;">' + ' Sales Date : ' + data.strFormatDate + titulo + '</center>');
                                }
                            }

//                            Ext.getCmp(prototype.id + '-lblTotDD_QMATCH').setText(Ext.util.Format.number(data.lngTotQMATCH, '0,000'));
//                            Ext.getCmp(prototype.id + '-lblTotDD_QTEF').setText(Ext.util.Format.number(data.lngTotQTEF, '0,000'));
//                            Ext.getCmp(prototype.id + '-lblTotDD_QPAS48').setText(Ext.util.Format.number(data.lngTotQPAS48, '0,000'));
//                            Ext.getCmp(prototype.id + '-lblTotDD_QMANUAL').setText(Ext.util.Format.number(data.lngTotQMANUAL, '0,000'));
                        }
                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDay').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    OnGridDetCardNbr: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetCardNbr';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetCardNbr.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDetCardNbr.SDATE = rowData.data.SDATE;
        this.beanDetCardNbr.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetCardNbr.IN_COUNTRY = rowData.data.IN_COUNTRY;
        this.beanDetCardNbr.IN_CARDN1 = rowData.data.IN_CARDN1;
        this.beanDetCardNbr.IN_CARDN2 = rowData.data.IN_CARDN2;
        this.beanDetCardNbr.IN_CARDC = rowData.data.IN_CARDC;
        this.beanDetCardNbr.SCURRENCY = rowData.data.SCURRENCY;
        this.beanDetCardNbr.SORIG = rowData.data.SORIG;
        this.beanDetCardNbr.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDetCardNbr.IN_AGENT = rowData.data.IN_AGENT;
        this.beanDetCardNbr.IN_BANK = rowData.data.IN_BANK;

        this.beanDetCardNbr.strFormatDate = rowData.data.strFormatDate;
        this.beanDetCardNbr.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDetCardNbr.IN_PAYMENT = rowData.data.IN_PAYMENT;
        this.beanDetCardNbr.strDescCard = rowData.data.strDescCard;

        me.paramsDetailCardNbr.beanString = JSON.stringify(this.beanDetCardNbr);
        this.setGridDetCardNbr();
    },
    setGridDetCardNbr: function() {
        win.lblUser_toolTip("Estructura: A2298");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetCardNumber'
                }, listeners: {
                    beforeload: function(obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = me.paramsDetailCardNbr;
                    },
                    load: function(obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
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

//                            Ext.getCmp(prototype.id + '-lblTotSVFOP').setText(Ext.util.Format.number(data.dblTotSVFOP, '0,000.00'));
                        }
                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetCardNbr').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);

        }
    },
    OnGridDetCardS: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        var cant = 0;
        switch (columnNum) {
            case 1 :
//                strGrilla = Grilla;
                rowData.data.IN_STVAL = '1';
                cant = rowData.data.lngQMATCH;
                break;
            case 2 :
                rowData.data.IN_STVAL = '4';
                cant = rowData.data.lngQMANUAL;
                break;
            case 3 :
                rowData.data.IN_STVAL = '2';
                cant = rowData.data.lngQTEF;
                break;
            case 4 :
                rowData.data.IN_STVAL = '3';
                cant = rowData.data.lngQPAS48;
                break;
        }

        if (cant > 0) {
            rowData.data.IN_BSTVAL = '';
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxDetCardByS';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanDetCardS.strFecFiltro = rowData.data.strFecFiltro;
            this.beanDetCardS.SDATE = rowData.data.SDATE;
            this.beanDetCardS.IN_TDOC = rowData.data.IN_TDOC;
            this.beanDetCardS.IN_CARDN1 = rowData.data.IN_CARDN1;
            this.beanDetCardS.IN_CARDN2 = rowData.data.IN_CARDN2;
            this.beanDetCardS.IN_CARDC = rowData.data.IN_CARDC;
            this.beanDetCardS.IN_BSTVAL = rowData.data.IN_BSTVAL;
            this.beanDetCardS.IN_STVAL = rowData.data.IN_STVAL;
            this.beanDetCardS.SCURRENCY = rowData.data.SCURRENCY;
            this.beanDetCardS.IN_MERCHN = rowData.data.IN_MERCHN;
            this.beanDetCardS.IN_AGENT = rowData.data.IN_AGENT;
            this.beanDetCardS.IN_BANK = rowData.data.IN_BANK;

            this.beanDetCardS.IN_SDATE = rowData.data.IN_SDATE;
            this.beanDetCardS.IN_SDATE = rowData.data.IN_SDATE;
            this.beanDetCardS.IN_SDATE = rowData.data.IN_SDATE;
            this.beanDetCardS.IN_SDATE = rowData.data.IN_SDATE;

            me.paramsDetailCardS.beanString = JSON.stringify(this.beanDetCardS);
            this.setGridDetCardS();
        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridDetCardS: function() {
        win.lblUser_toolTip("Estructura: A2298");
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetCardCodeByStval'
                }, listeners: {
                    beforeload: function(obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = me.paramsDetailCardS;
                    },
                    load: function(obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
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
                            Ext.getCmp(prototype.id + '-gridDetCardByS').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');

//                            Ext.getCmp(prototype.id + '-lblTotC_SCant').setText(Ext.util.Format.number(data.lngTotQACCB, '0,000'));
//                            Ext.getCmp(prototype.id + '-lblTotC_SVFOP').setText(Ext.util.Format.number(data.dblTotSVFOP, '0,000.00'));
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetCardByS').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
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
    OnGridDetDayS: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetDayByS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetDayS.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDetDayS.SDATE = rowData.data.SDATE;
        this.beanDetDayS.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetDayS.IN_CARDN1 = rowData.data.IN_CARDN1;
        this.beanDetDayS.IN_CARDN2 = rowData.data.IN_CARDN2;
        this.beanDetDayS.SCARCOD = rowData.data.SCARCOD;
        this.beanDetDayS.IN_BSTVAL = rowData.data.IN_BSTVAL;
        this.beanDetDayS.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDetDayS.SCURRENCY = rowData.data.SCURRENCY;
        this.beanDetDayS.SORIG = rowData.data.SORIG;
        this.beanDetDayS.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDetDayS.IN_AGENT = rowData.data.IN_AGENT;
        this.beanDetDayS.IN_BANK = rowData.data.IN_BANK;

        this.beanDetDayS.strFormatDate = rowData.data.strFormatDate;
        this.beanDetDayS.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDetDayS.IN_CARDC = rowData.data.IN_CARDC;
        this.beanDetDayS.strDescCard = rowData.data.strDescCard;
        this.beanDetDayS.strSORIG = rowData.data.strSORIG;
        this.beanDetDayS.strTitulo = rowData.data.strTitulo;

        me.paramsDetailDayS.beanString = JSON.stringify(this.beanDetDayS);
        this.setGridDetDayS();
    },
    setGridDetDayS: function() {
        win.lblUser_toolTip("Estructura: A2298");
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
                    beforeload: function(obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = me.paramsDetailDayS;
                    },
                    load: function(obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
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
                            Ext.getCmp(prototype.id + '-gridDetDayByS').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
//                            Ext.getCmp(prototype.id + '-lblTotD_SCant').setText(Ext.util.Format.number(data.lngTotQACCB, '0,000'));
//                            Ext.getCmp(prototype.id + '-lblTotD_SVFOP').setText(Ext.util.Format.number(data.dblTotSVFOP, '0,000.00'));
                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDayByS').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);

        }
    },
    OnGridDetCardNbrS: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        this.beanDetCardNbrS.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDetCardNbrS.SDATE = rowData.data.SDATE;
        this.beanDetCardNbrS.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetCardNbrS.IN_CARDN1 = rowData.data.IN_CARDN1;
        this.beanDetCardNbrS.IN_CARDN2 = rowData.data.IN_CARDN2;
        this.beanDetCardNbrS.SCARCOD = rowData.data.SCARCOD;
        this.beanDetCardNbrS.IN_BSTVAL = rowData.data.IN_BSTVAL;
        this.beanDetCardNbrS.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDetCardNbrS.SCURRENCY = rowData.data.SCURRENCY;
        this.beanDetCardNbrS.SORIG = rowData.data.SORIG;
        this.beanDetCardNbrS.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDetCardNbrS.IN_AGENT = rowData.data.IN_AGENT;
        this.beanDetCardNbrS.IN_BANK = rowData.data.IN_BANK;

        this.beanDetCardNbrS.strFormatDate = rowData.data.strFormatDate;
        this.beanDetCardNbrS.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDetCardNbrS.IN_CARDC = rowData.data.IN_CARDC;
        this.beanDetCardNbrS.strDescCard = rowData.data.strDescCard;

        me.paramsDetailCardNbrS.beanString = JSON.stringify(this.beanDetCardNbrS);
        this.setGridDetCardNbrBySMatch();
    },
    setGridDetCardNbrBySMatch: function() {
        win.lblUser_toolTip("Estructura: A2298");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetCardNbrByStval'
                }, listeners: {
                    beforeload: function(obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = me.paramsDetailCardNbrS;
                    },
                    load: function(obj) {
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
                            var flagStatus = '';
                            var data = obj.data.items[0].data;
                            if (data.IN_STVAL === '1') {
                                flagStatus = 'M';

                                me.drillDown.push(me.panelActual);
                                me.panelActual = '-boxDetCardNbrBySMatch';
                                global.selectedChild(me.childs, prototype.id + me.panelActual);
                                Ext.getCmp(prototype.id + '-gridDetCardNbrBySMatch').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                            } else {
                                flagStatus = 'S';

                                me.drillDown.push(me.panelActual);
                                me.panelActual = '-boxDetCardNbrByS';
                                global.selectedChild(me.childs, prototype.id + me.panelActual);
                                Ext.getCmp(prototype.id + '-gridDetCardNbrByS').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                            }
                        }
                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetCardNbrBySMatch').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-gridDetCardNbrByS').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);

        }
    },
    BuscarPNR_keyDownHandler: function(obj, e, eOpts) {
        switch (e.getKey()) {
            case 13:
                if (Ext.getCmp(prototype.id + '-txtPNR').getValue().length === 6) {
                    this.searchByPNR();
                } else {
                    global.Msg({
                        msg: 'PNR must contain 6 characters.'
                    });
                }
                break;
        }
    },
    searchByPNR: function() {
        var bean = {};
        bean.IN_PNR = Ext.getCmp(prototype.id + '-txtPNR').getValue();

        win.lblUser_toolTip("Estructura: A2298");
        me.panelActual = '-boxDetByPNR';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchByPNR'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            /*var obj = obj.data.items[0].data;
                             if (obj.strFecFiltro === 'DATEC') {
                             win.setText('adgSalDate', 'Reconciliation');
                             } else {
                             if (obj.IN_TDOC === 'R') {
                             win.setText('adgSalDate', 'Refund');
                             } else {
                             win.setText('adgSalDate', 'Sales');
                             }
                             me.DateControl = obj.strDescripcion;
                             win.setText('label_1', 'Sales Reconciliation ' + me.DateControl);
                             win.setText('ahDetCtry', 'Sales Reconciliation ' + me.DateControl);
                             win.setText('ahDetCard', 'Sales Reconciliation ' + me.DateControl);
                             win.setText('ahDetDay', 'Sales Reconciliation ' + me.DateControl);
                             }*/
                            var pag = Ext.getCmp(prototype.id + '-paggin7');
                            var pagData = pag.getPageData();
                            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                            Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetByPNR').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);
    },
    validateFields: function() {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
//    onEditClick: function(grid, rowIndex, colIndex) {
//        var rec = grid.getStore().getAt(rowIndex);
//        this.winDataEntry('U', rec);
//    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
//        var action = '';
////        console.log(rec);
//        if (rec.data.STVAL !== '1' && rec.data.STVAL !== '4') {
//            //Settlement sin Liquidación / Liquidación sin Settlement
//            action = 'U';
//        } else {
//            //Match
//            action = 'S';
//        }
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.BoomerReconciliationForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry,
                lstCard: me.lstCard,
                lstBank: me.lstBank
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
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-txtCard1').setValue('');
        Ext.getCmp(prototype.id + '-txtCard2').setValue('');
        Ext.getCmp(prototype.id + '-cmbCardType').setValue('');
        Ext.getCmp(prototype.id + '-txtMERCHN').setValue('');
        Ext.getCmp(prototype.id + '-txtSAGENT').setValue('');
        Ext.getCmp(prototype.id + '-txtPNR').setValue('');
//        Ext.getCmp(prototype.id + '-cmbBank').setValue('');
//        Ext.getCmp(prototype.id + '-txtTicket').setValue('');

    },
    btnExcel_click: function(obj, e) {

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

        this.setFormatParameter();
        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            case  '-boxDetDay':
                global.getFile(prototype.url + '/getXLSXDay?beanString=' + me.paramsDetailDay.beanString);
                break;
            case  '-boxDetCardNbr':
                global.getFile(prototype.url + '/getXLSXCardNbr?beanString=' + me.paramsDetailCardNbr.beanString);
                break;
            case  '-boxDetCardByS':
                global.getFile(prototype.url + '/getXLSXCardByS?beanString=' + me.paramsDetailCardS.beanString);
                break;
            case  '-boxDetDayByS':
                global.getFile(prototype.url + '/getXLSXDayByS?beanString=' + me.paramsDetailDayS.beanString);
                break;
            case  '-boxDetCardNbrBySMatch':
                global.getFile(prototype.url + '/getXLSXCardNbrBySMatch?beanString=' + me.paramsDetailCardNbrS.beanString);
                break;
            case  '-boxDetCardNbrByS':
                global.getFile(prototype.url + '/getXLSXCardNbrByS?beanString=' + me.paramsDetailCardNbrS.beanString);
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
        if (me.panelActual === '-panelGridData') {
            Ext.getCmp(prototype.id + '-pie').setVisible(false);
        } else {
            Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
            Ext.getCmp(prototype.id + '-pie').setVisible(true);
        }
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case '-boxDetDay':
                me.pagginActual = '-paggin2';
                break;
            case '-boxDetCardNbr':
                me.pagginActual = '-paggin3';
                break;
            case '-boxDetCardByS':
                me.pagginActual = '-paggin4';
                break;
            case '-boxDetDayByS':
                me.pagginActual = '-paggin5';
                break;
            case '-boxDetCardNbrBySMatch':
                me.pagginActual = '-paggin6';
                break;
            case '-boxDetCardNbrByS':
                me.pagginActual = '-paggin6';
                break;
            case '-boxDetByPNR':
                me.pagginActual = '-paggin7';
                break;
//            case '-boxDetMerchantByS':
//                me.pagginActual = '-paggin7';
//                break;
//            case '-boxByMerchant':
//                me.pagginActual = '-paggin8';
//                break;
        }
    },
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function(obj) {
        obj.setValue('01');
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
    getInt: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }


}
);