/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.BankReconciliation.BankReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BankReconciliationController',
    fecha: new Date(),
    childs: '',
    beanTemp: {},
    beanDetDay: {},
    beanDet: {},
    beanDet2: {},
    beanDet3: {},
    beanDetCardNbr: {},
    beanDetCardByS: {},
    beanDetDayByS: {},
    beanDetCardNbrByS: {},
    beanDetTicket: {},
    beanboxDetTktS2: {},
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    flag: '',
    flagStatus: '',
    flagDrilDownByDay: '',
    lstBank: [],
    bean_detail: [],
    bean_detailT: [],
    lstCard: [],
    lstCountry: [],
    me: '',
    searchParams: {},
    paramsObtainData: {},
    paramsDetail: {},
    init: function (view) {
        me = this;
        prototype.id = 'BankReconciliationForm';
        prototype.url = CONTEXTPATH + '/BankReconciliation';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
            // -------------------Eventos Genericos --------------------
            '#BankReconciliationForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#BankReconciliationForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#BankReconciliationForm-btnClear': {
                click: this.btnClear_click
            },
            '#BankReconciliationForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#BankReconciliationForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#BankReconciliationForm-btnBack': {
                click: this.btnBack_click
            },
            '#BankReconciliationForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#BankReconciliationForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#BankReconciliationForm-btn-pag-next': {
                click: this.pagNext
            },
            '#BankReconciliationForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#BankReconciliationForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#BankReconciliationForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#BankReconciliationForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#BankReconciliationForm-chkADYEN': {
                change: this.btnSearch_click
            },
            '#BankReconciliationForm-rbgType': {
                change: this.cmbTranType_changeHandler
            },
            '#BankReconciliationForm-imgSwap1': {
                click: this.btnImgSwap1
            }
        });
    },
    xpanel_afterrender: function (obj, e) {
        this.setStoreData();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    tarjeta_keyDownHandler: function (e, eOpts) {
        if (eOpts.getKey() !== 9 && eOpts.getKey() !== 16) {
            if (Ext.getCmp(prototype.id + '-txtCard1').getValue().length === 6) {
                Ext.getCmp(prototype.id + '-txtCard2').focus();
            }
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
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
    //<editor-fold defaultstate="collapsed" desc="setStoreData">
    setStoreData: function () {

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");


        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["SDATE", "Sales Date"],
                        //["BDATEP", "Reconciliation Date"]
            ]
        }));
        cmbFecFiltro.setValue("SDATE");

        var cmbFTE = Ext.getCmp(prototype.id + '-cmbFTE');
        cmbFTE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["B", "BSP"],
                ["A", "ARC"],
                ["S", "ASR"]
            ]
        }));
        cmbFTE.setValue("");

        var cmbNEGOC = Ext.getCmp(prototype.id + '-cmbNEGOC');
        cmbNEGOC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["1", "PASAJES"],
                ["2", "CARGO"],
                ["3", "CORREO"],
                ["S", "STANDBY"],
            ]
        }));
        cmbNEGOC.setValue("");

        this.paramsObtainData.BANK = 2;
        this.paramsObtainData.COUNTRY = 2;
        this.paramsObtainData.CARD = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
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
                Ext.getCmp(prototype.id + '-cmbBank').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbCardType').bindStore(storeData2);
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbBank').setValue('');
                Ext.getCmp(prototype.id + '-cmbCardType').setValue('');
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
                global.clear();
//                me.btnSearch_click();
            }
        });

        Ext.Ajax.request({
            url: prototype.url + '/obtainMessagesF',
            method: 'POST',
            timeout: 60000000,
//            beforerequest: Ext.getCmp(prototype.id + '-panelMain').mask('Loading...'),
            params: {},
//            beforerequest: Ext.getCmp(prototype.id + '-panelGridDataMain').mask('Loading...'),
            success: function (response, opts) {

                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    me.bean_detail = res.result;
                    //llenar grilla gridDataInfoScan
                    var storeDataC = Ext.create('Ext.data.Store', {
                        data: res.dataC,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-cmbCOMENTF').bindStore(storeDataC);
                    Ext.getCmp(prototype.id + '-cmbCOMENTF').setValue('');

                    var storeDataT = Ext.create('Ext.data.Store', {
                        data: res.dataT,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-cmbAGENCY').bindStore(storeDataT);
                    Ext.getCmp(prototype.id + '-cmbAGENCY').setValue('');


                    console.log('INICIO');
                    setTimeout(() => {
//                        Ext.getCmp(prototype.id + '-panelMain').unmask('Loading...');
                        me.btnSearch_click();
                    }, 2000);

                    console.log('FIN');
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
        });

    },
    //</editor-fold>
    BuscarPNR_keyDownHandler: function (obj, e, eOpts) {
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
    searchByPNR: function () {
        var bean = {};
        bean.IN_PNR = Ext.getCmp(prototype.id + '-txtPNR').getValue()
        me.panelActual = '-boxDetByPNR'; //boxDetByPNRpanelGridData
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchByPNR'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: MPF101");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {

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
        Ext.getCmp(prototype.id + '-paggin11').bindStore(storeGridDatas);
    },
    btnSearch_click: function (obj, e) {
        console.log('btnSearch_click');
        this.beanDetDay.IN_CARDN1 = '';
        this.beanDetDay.IN_CARDN2 = '';
        this.beanDetDay.IN_SCARDNCOR = '';
        this.beanDetDay.IN_SAUTHOC = '';
        this.beanDetDay.IN_SDATE = '';
        this.beanDetDay.IN_STVAL = '';
        this.beanDetDay.IN_TDOC = '';
        this.beanDetDay.IN_COUNTRY = '';
        this.beanDetDay.IN_NEGOC = '';
        this.beanDetDay.IN_COMENT = '';
        this.beanDetDay.IN_AGENCY = '';

        if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim() !== '' || Ext.getCmp(prototype.id + '-txtCard2').getValue().trim() !== '' || Ext.getCmp(prototype.id + '-txtAUTHOC').getValue().trim() !== '' || Ext.getCmp(prototype.id + '-cmbNEGOC').getValue().trim() !== '' || Ext.getCmp(prototype.id + '-cmbCOMENTF').getValue() !== '' || Ext.getCmp(prototype.id + '-cmbAGENCY').getValue() !== '') {

            me.panelActual = '-panelGridDataDetalle';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim() !== '' && Ext.getCmp(prototype.id + '-txtCard2').getValue().trim() !== '') {
                if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim().length === 6 && Ext.getCmp(prototype.id + '-txtCard2').getValue().trim().length === 4) {
                    this.beanDetDay.IN_CARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue().trim();
                    this.beanDetDay.IN_CARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue().trim();

                } else {
                    global.Msg({
                        msg: 'Credit Card Number must contain 10 digits.'
                    });
                    Ext.getCmp(prototype.id + '-txtCard1').setValue('');
                    Ext.getCmp(prototype.id + '-txtCard2').setValue('');
                }
            } else if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim() === '' && Ext.getCmp(prototype.id + '-txtCard2').getValue().trim() !== '') {
                if (Ext.getCmp(prototype.id + '-txtCard2').getValue().trim().length === 4) {
                    this.beanDetDay.IN_SCARDNCOR = Ext.getCmp(prototype.id + '-txtCard2').getValue().trim();
                } else {
                    global.Msg({
                        msg: 'Correlative Number must contain 4 digits.'
                    });
                    Ext.getCmp(prototype.id + '-txtCard2').setValue('');
                }
            }
//            if (Ext.getCmp(prototype.id + '-txtAUTHOC').getValue().trim() > 0) {
//                if (Ext.getCmp(prototype.id + '-txtAUTHOC').getValue().trim().length === 8) {
            this.beanDetDay.IN_SAUTHOC = Ext.getCmp(prototype.id + '-txtAUTHOC').getValue().trim();
//                } else {
//                    global.Msg({
//                        msg: 'Authorization Code Number must contain 8 digits.'
//                    });
//                    Ext.getCmp(prototype.id + '-txtAUTHOC').setValue('');
//                }
//            }
//            if (Ext.getCmp(prototype.id + '-cmbNEGOC').getValue().trim() !== '') {
            this.beanDetDay.IN_NEGOC = Ext.getCmp(prototype.id + '-cmbNEGOC').getValue().trim();
//            }
//            if (Ext.getCmp(prototype.id + '-cmbCOMENTF').getValue().trim() !== '') {
            this.beanDetDay.IN_COMENT = Ext.getCmp(prototype.id + '-cmbCOMENTF').getValue().trim();
//            }
//            if (Ext.getCmp(prototype.id + '-cmbAGENCY').getValue().trim() !== '') {
            this.beanDetDay.IN_AGENCY = Ext.getCmp(prototype.id + '-cmbAGENCY').getValue().trim();
//            }

            me.paramsDetail.beanString = JSON.stringify(this.beanDetDay);
            console.log(me.paramsDetail.beanString);
            this.setGridDataDetalle();

        } else {
            this.setFormatParameter();
            this.setGridDataMain(obj, e);

        }
    },
    cmbTranType_changeHandler: function () {
        var selectedValue = Ext.getCmp(prototype.id + '-rbgType').getValue().rbgType;
        switch (selectedValue) {
            case 'rbSALES':
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
            case 'rbREFUND':
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
    setFormatParameter: function () {
        var bean = {};

        bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        bean.IN_CARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        bean.IN_CARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();
        bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        bean.strFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();

        var beanString = JSON.stringify(bean);
        searchParams = {
            beanString: beanString,
            bean: bean
        };
    },
    btnImgSwap1: function () {
        var panel1 = Ext.getCmp(prototype.id + '-gridData');
        var panel2 = Ext.getCmp(prototype.id + '-gridDataSwap');
        if (panel1.isVisible()) {
            panel1.setVisible(false);
            panel2.setVisible(true);
        } else {
            panel1.setVisible(true);
            panel2.setVisible(false);
        }
    },
    setGridDataMain: function (obj, val) {
        win.lblUser_toolTip("Estructura: MPF107");
        if (me.panelActual !== '-panelGridDataMain') {
            me.panelActual = '-panelGridDataMain';
            Ext.getCmp(prototype.id + '-gridDataMain').setVisible(true);
        }
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + '/searchMain'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                        Ext.getCmp(prototype.id + '-panelGridDataMain').mask('Loading...');
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-panelGridDataMain').unmask();
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
                            var obj = obj.data.items[0].data;
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataMain').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    //<editor-fold defaultstate="collapsed" desc="onGridCountry">
    onGridCountry: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataCountry';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

//        this.beanDetDay.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDetDay.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDetDay.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetDay.IN_COUNTRY = rowData.data.IN_COUNTRY;
        this.beanDetDay.strFormatDate = rowData.data.strFormatDate;
        this.beanDetDay.strFecFiltro = rowData.data.strFecFiltro;

        me.paramsDetail.beanString = JSON.stringify(this.beanDetDay);
        this.setGridDataCountry();
    },
    setGridDataCountry: function (data) {
        win.lblUser_toolTip("Estructura: MPF107 ");
//        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchCountry'
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
                        var bean = obj.data.items[0].data;
                        var title = '';
                        title = " Sales Date : " + bean.strFormatDate;
                        console.log(title);
                        Ext.getCmp(prototype.id + '-labelTitle1').setText(title);
                        Ext.getCmp(prototype.id + '-labelTitle1').setVisible(true);
                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataCountry').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="onGridDay">
    onGridDay: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDay';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

//        this.beanDetDay.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDetDay.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDetDay.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetDay.IN_COUNTRY = rowData.data.SCOUNTRY;
        this.beanDetDay.strFormatDate = rowData.data.strFormatDate;

        me.paramsDetail.beanString = JSON.stringify(this.beanDetDay);
        this.setGridDataDay();
    },
    setGridDataDay: function (data) {
        win.lblUser_toolTip("Estructura: MPF101");
//        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDay'
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
                        var bean = obj.data.items[0].data;
                        var title = '';
                        title = " Sales Date : " + bean.IN_SDATE + " - Country : " + bean.IN_COUNTRY;
                        console.log(title);
                        Ext.getCmp(prototype.id + '-labelTitle2').setText(title);
                        Ext.getCmp(prototype.id + '-labelTitle2').setVisible(true);
                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDay').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    //</editor-fold>
    ////<editor-fold defaultstate="collapsed" desc="onGridDay">
    setGridDataDayBySTVAL: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        var cant = 0;
        switch (columnNum) {
            case 1:
                console.log('ENTRA AL MATCH');
                rowData.data.IN_STVAL = '1';
                cant = rowData.data.lngQMATCH;
                break;
            case 2:
                console.log('ENTRA AL MANUAL');
                rowData.data.IN_STVAL = '5';
                cant = rowData.data.lngQMANUAL;
                break;
            case 3:
                console.log('ENTRA AL DIFF');
                rowData.data.IN_STVAL = '4';
                cant = rowData.data.lngQDIFF;
                break;
            case 4:
                console.log('ENTRA AL PEND');
                rowData.data.IN_STVAL = '3';
                cant = rowData.data.lngQPEND;
                break;
        }

        if (cant > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataDetalle';

            me.flag = 'all';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.beanDetDay.strFecFiltro = 'SDATE';
//            this.beanDetCardByS.strFecFiltro = rowData.data.;
            this.beanDetDay.IN_SDATE = rowData.data.SDATE;
            this.beanDetDay.IN_TDOC = rowData.data.TDOC;
            this.beanDetDay.IN_COUNTRY = rowData.data.SCOUNTRY;
            this.beanDetDay.IN_CARDN1 = rowData.data.IN_CARDN1;
            this.beanDetDay.IN_CARDN2 = rowData.data.IN_CARDN2;
            this.beanDetDay.IN_CARDC = rowData.data.IN_CARDC;
            this.beanDetDay.IN_STVAL = rowData.data.IN_STVAL;
            this.beanDetDay.SCURRENCY = rowData.data.SCURRENCY;
            this.beanDetDay.IN_MERCHN = rowData.data.IN_MERCHN;
            this.beanDetDay.IN_AGENT = rowData.data.IN_AGENT;
            this.beanDetDay.IN_BANK = rowData.data.IN_BANK;
            this.beanDetDay.IN_NEGOC = "1";

            me.paramsDetail.beanString = JSON.stringify(this.beanDetDay);
            this.setGridDataDetalle();

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }

    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="onGridDetalle">
    onGridDetalle: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetalle';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

//        this.beanDetDay.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDetDay.IN_SDATE = rowData.data.SDATE;
        this.beanDetDay.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetDay.IN_COUNTRY = rowData.data.IN_COUNTRY;
        this.beanDetDay.strFormatDate = rowData.data.strFormatDate;
        this.beanDetDay.IN_NEGOC = "1";

        me.paramsDetail.beanString = JSON.stringify(this.beanDetDay);
        this.setGridDataDetalle();
    },
    onGridDetalleCargo: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetalle';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

//        this.beanDetDay.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDetDay.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDetDay.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetDay.IN_COUNTRY = rowData.data.SCOUNTRY;
        this.beanDetDay.strFormatDate = rowData.data.strFormatDate;
        this.beanDetDay.IN_NEGOC = "2";

        me.paramsDetail.beanString = JSON.stringify(this.beanDetDay);
        this.setGridDataDetalle();
    },
    onGridDetalleCorreo: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetalle';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

//        this.beanDetDay.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDetDay.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDetDay.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetDay.IN_COUNTRY = rowData.data.SCOUNTRY;
        this.beanDetDay.strFormatDate = rowData.data.strFormatDate;
        this.beanDetDay.IN_NEGOC = "3";

        me.paramsDetail.beanString = JSON.stringify(this.beanDetDay);
        this.setGridDataDetalle();
    },
    setGridDataDetalle: function (data) {
        win.lblUser_toolTip("Estructura: MPF101");
//        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetalle'
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
                        var bean = obj.data.items[0].data;
                        var title = '';
                        if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim() !== '' || Ext.getCmp(prototype.id + '-txtCard2').getValue().trim() !== '' || Ext.getCmp(prototype.id + '-txtAUTHOC').getValue().trim() !== '' || Ext.getCmp(prototype.id + '-cmbNEGOC').getValue().trim() !== '' || Ext.getCmp(prototype.id + '-cmbCOMENTF').getValue() !== '' || Ext.getCmp(prototype.id + '-cmbAGENCY').getValue() !== '') {
                            title = " ";
                        } else {
                            title = " Sales Date : " + bean.SDATE + " - Country : " + bean.IN_COUNTRY;
                        }

                        console.log(title);
                        Ext.getCmp(prototype.id + '-labelTitle3').setText(title);
                        Ext.getCmp(prototype.id + '-labelTitle3').setVisible(true);
                        console.log(bean);
                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetalle').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="onGridTicket">
    onGridTicket: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataTicket';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

//        this.beanDetDay.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDetDay.TRANC = rowData.data.TRANC;
        this.beanDetDay.DATEC = rowData.data.DATEC;
        console.log(rowData.data);

        me.paramsDetail.beanString = JSON.stringify(this.beanDetDay);
        this.setGridDataTicket();
    },
    setGridDataTicket: function (data) {
        win.lblUser_toolTip("Estructura: MPF100");
//        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchTicket'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
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
                        var bean = obj.data.items[0].data;

                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataTicket').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="onGridDetCardS">
    onGridDetCardSMain: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        var cant = 0;
        switch (columnNum) {
            case 1:
                console.log('ENTRA AL MATCH');
                rowData.data.IN_STVAL = '1';
                cant = rowData.data.lngQMATCH;
                break;
            case 7:
//                rowData.data.IN_STVAL = '5';
//                cant = rowData.data.lngQMANUAL;
                break;
            case 3:
                console.log('ENTRA AL MANUAL');
                rowData.data.IN_STVAL = '5';
                cant = rowData.data.lngQMANUAL;
                break;
            case 4:
                console.log('ENTRA AL DIFF');
                rowData.data.IN_STVAL = '4';
                cant = rowData.data.lngQDIFF;
                break;
            case 5:
                console.log('ENTRA AL PEND');
                rowData.data.IN_STVAL = '3';
                cant = rowData.data.lngQPEND;
                break;
        }

//        console.log(columnNum)
//        console.log(cant)
//        console.log("Row data")
//        console.log(rowData.data)

        if (cant > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDetCardByS';

            me.flag = 'all';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanDetCardByS.strFecFiltro = 'SDATE';
//            this.beanDetCardByS.strFecFiltro = rowData.data.;
            this.beanDetCardByS.IN_SDATE = rowData.data.IN_SDATE;
            this.beanDetCardByS.IN_TDOC = rowData.data.IN_TDOC;
            this.beanDetCardByS.IN_CARDN1 = rowData.data.IN_CARDN1;
            this.beanDetCardByS.IN_CARDN2 = rowData.data.IN_CARDN2;
            this.beanDetCardByS.IN_CARDC = rowData.data.IN_CARDC;
            this.beanDetCardByS.IN_STVAL = rowData.data.IN_STVAL;
            this.beanDetCardByS.SCURRENCY = rowData.data.SCURRENCY;
            this.beanDetCardByS.IN_MERCHN = rowData.data.IN_MERCHN;
            this.beanDetCardByS.IN_AGENT = rowData.data.IN_AGENT;
            this.beanDetCardByS.IN_BANK = rowData.data.IN_BANK;
            this.beanDetCardByS.IN_COUNTRY = rowData.data.IN_COUNTRY;
            this.beanDetCardByS.IN_FTE = rowData.data.IN_FTE;
            this.beanDetCardByS.IN_ADYEN = rowData.data.IN_ADYEN;
            this.beanDetCardByS.IN_CODEBANK = rowData.data.CODEBANK;
            this.beanDetCardByS.strFormatDate = rowData.data.strFormatDate;
            console.log(this.beanDetCardByS);
            me.paramsDetail.beanString = JSON.stringify(this.beanDetCardByS);
            this.setGridDataDetCardS();

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }

    },
    onGridDetCardS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        var cant = 0;
        switch (columnNum) {
            case 2:
                console.log('ENTRA AL MATCH');
                rowData.data.IN_STVAL = '1';
                cant = rowData.data.lngQMATCH;
                break;
            case 3:
                console.log('ENTRA AL MANUAL');
                rowData.data.IN_STVAL = '5';
                cant = rowData.data.lngQMANUAL;
                break;
            case 4:
                console.log('ENTRA AL DIFF');
                rowData.data.IN_STVAL = '4';
                cant = rowData.data.lngQDIFF;
                break;
            case 5:
                console.log('ENTRA AL PEND');
                rowData.data.IN_STVAL = '3';
                cant = rowData.data.lngQPEND;
                break;
        }
        if (cant > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDetCardByS';

            me.flag = 'all';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanDetCardByS.strFecFiltro = 'SDATE';
//            this.beanDetCardByS.strFecFiltro = rowData.data.;
            this.beanDetCardByS.IN_SDATE = rowData.data.IN_SDATE;
            this.beanDetCardByS.IN_TDOC = rowData.data.IN_TDOC;
            this.beanDetCardByS.IN_CARDN1 = rowData.data.IN_CARDN1;
            this.beanDetCardByS.IN_CARDN2 = rowData.data.IN_CARDN2;
            this.beanDetCardByS.IN_CARDC = rowData.data.IN_CARDC;
            this.beanDetCardByS.IN_STVAL = rowData.data.IN_STVAL;
            this.beanDetCardByS.SCURRENCY = rowData.data.SCURRENCY;
            this.beanDetCardByS.IN_MERCHN = rowData.data.IN_MERCHN;
            this.beanDetCardByS.IN_AGENT = rowData.data.IN_AGENT;
            this.beanDetCardByS.IN_BANK = rowData.data.IN_BANK;
            this.beanDetCardByS.IN_COUNTRY = rowData.data.IN_COUNTRY;
            this.beanDetCardByS.IN_FTE = rowData.data.IN_FTE;
            this.beanDetCardByS.IN_ADYEN = rowData.data.IN_ADYEN;
            this.beanDetCardByS.IN_CODEBANK = rowData.data.CODEBANK;
            this.beanDetCardByS.strFormatDate = rowData.data.strFormatDate;
            console.log(this.beanDetCardByS);
            me.paramsDetail.beanString = JSON.stringify(this.beanDetCardByS);
            this.setGridDataDetCardS();

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }

    },
    openQuery: function (column, e, row, column, x, rowData) {

        var beanQuery = rowData.data;
        var BankReconciliation = Ext.create('Ext.Praxis.view.program.ProBankReconciliationTktForm', {id: 'ProBankReconciliationTktForm'});
        var controller = BankReconciliation.getController();
        controller.bean = beanQuery;
        controller.startDisplay();
        BankReconciliation.show();
    },
    setGridDataDetCardS: function (data) {
        win.lblUser_toolTip("Estructura: MPF101");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCardCodeByStval'
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
//                    console.log(obj.data);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var title = '';
                        title = bean.strTitulo;
                        Ext.getCmp(prototype.id + '-gridDataDetCardByS').setTitle('<center style="font-size:12px;">' + title + '</center>');
//                        Ext.getCmp(prototype.id + '-labelTitle2').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetCardByS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
    },

    //<editor-fold defaultstate="collapsed" desc="onGridDetDayByS">
    onGridDetDayByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDetDayByS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetDayByS.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDetDayByS.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDetDayByS.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetDayByS.IN_CARDN1 = rowData.data.IN_CARDN1;
        this.beanDetDayByS.IN_CARDN2 = rowData.data.IN_CARDN2;
        this.beanDetDayByS.SCARCOD = rowData.data.SCARCOD;
        this.beanDetDayByS.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDetDayByS.SCURRENCY = rowData.data.SCURRENCY;
        this.beanDetDayByS.SORIG = rowData.data.SORIG;
        this.beanDetDayByS.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDetDayByS.IN_AGENT = rowData.data.IN_AGENT;
        this.beanDetDayByS.IN_BANK = rowData.data.IN_BANK;
        this.beanDetDayByS.SCOUNTRY = rowData.data.SCOUNTRY;
        this.beanDetDayByS.IN_FTE = rowData.data.IN_FTE;
        this.beanDetDayByS.IN_ADYEN = rowData.data.IN_ADYEN;
        this.beanDetDayByS.strFormatDate = rowData.data.strFormatDate;
        this.beanDetDayByS.IN_CARDC = rowData.data.IN_CARDC;
        this.beanDetDayByS.strDescCard = rowData.data.strDescCard;
        this.beanDetDayByS.strSORIG = rowData.data.strSORIG;
        this.beanDetDayByS.strDescCountry = rowData.data.strDescCountry;
        this.beanDetDayByS.strTitulo = rowData.data.strTitulo;
        this.beanDetDayByS.IN_CODEBANK = rowData.data.CODEBANK;

        me.paramsDetail.beanString = JSON.stringify(this.beanDetDayByS);
        this.setGridDataDetDayByS();

    },
    setGridDataDetDayByS: function (data) {
        win.lblUser_toolTip("Estructura: MPF101");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetDayByStval'
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
                        var bean = obj.data.items[0].data;
                        var title = '';
                        title = bean.strTitulo;
//                        Ext.getCmp(prototype.id + '-labelTitle4').setText(title);
//                        Ext.getCmp(prototype.id + '-gridDataDetDayByS').setTitle('<center style="font-size:12px;">' + title + '</center>');
                        Ext.getCmp(prototype.id + 'lblTitulo').setText(title);
                        console.log(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetDayByS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="onGridDetCardNbrByS">
    onGridDetCardNbrByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDetCardNbrByS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetCardNbrByS.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDetCardNbrByS.SDATE = rowData.data.SDATE;
        this.beanDetCardNbrByS.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetCardNbrByS.IN_CARDN1 = rowData.data.IN_CARDN1;
        this.beanDetCardNbrByS.IN_CARDN2 = rowData.data.IN_CARDN2;
        this.beanDetCardNbrByS.SCARCOD = rowData.data.SCARCOD;
        this.beanDetCardNbrByS.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDetCardNbrByS.SCURRENCY = rowData.data.SCURRENCY;
        this.beanDetCardNbrByS.SORIG = rowData.data.SORIG;
        this.beanDetCardNbrByS.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDetCardNbrByS.IN_AGENT = rowData.data.IN_AGENT;
        this.beanDetCardNbrByS.IN_BANK = rowData.data.IN_BANK;
        this.beanDetCardNbrByS.SCOUNTRY = rowData.data.SCOUNTRY;
        this.beanDetCardNbrByS.IN_FTE = rowData.data.IN_FTE;
        this.beanDetCardNbrByS.IN_ADYEN = rowData.data.IN_ADYEN;
        this.beanDetCardNbrByS.strFormatDate = rowData.data.strFormatDate;
        this.beanDetCardNbrByS.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDetCardNbrByS.IN_CARDC = rowData.data.IN_CARDC;
        this.beanDetCardNbrByS.strDescCard = rowData.data.strDescCard;
        this.beanDetCardNbrByS.strDescCountry = rowData.data.strDescCountry;
        this.beanDetCardNbrByS.IN_CODEBANK = rowData.data.CODEBANK;
//        console.log(this.beanDetCardNbrByS.IN_STVAL);

        me.paramsDetail.beanString = JSON.stringify(this.beanDetCardNbrByS);
        this.setGridDataDetCardNbrByS();

    },
    setGridDataDetCardNbrByS: function (data) {
        win.lblUser_toolTip("Estructura: MPF101");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetCardNbrByStval'
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
                        var bean = obj.data.items[0].data;
                        var title = '';
                        title = bean.strTitulo;
//                        Ext.getCmp(prototype.id + '-labelTitle5').setText(title);
                        Ext.getCmp(prototype.id + '-gridDataDetCardNbrByS').setTitle('<center style="font-size:12px;">' + title + '</center>');
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetCardNbrByS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
    },

    //</editor-fold>

    gridData_VIEWTKT_clickHandler: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.strTicket;
        var beanProMasterTicket = {};
//        
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(8, 7);
        beanProMasterTicket.IN_SEQ = '00';

//        console.log(beanProMasterTicket);
        prototypeProgram.view = 'payments-bank-reconciliation-form';
        prototypeProgram.nprog = 'PX00000269';
        prototypeProgram.title = 'Bank Reconciliation';
        prototypeProgram.modulo = '';

        win.displayProMasterTicket(this, 'BankConciliation', beanProMasterTicket);
    },
    onGridData_VIEWTKT_clickHandler: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.strTicket;
        var beanProMasterTicket = {};
//        
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(8, 6);
        beanProMasterTicket.IN_SEQ = '00';

//        console.log(beanProMasterTicket);
        prototypeProgram.view = 'payments-bank-reconciliation-form';
        prototypeProgram.nprog = 'PX00000269';
        prototypeProgram.title = 'Bank Reconciliation';
        prototypeProgram.modulo = '';

        win.displayCustomViewTicket(this, 'BankConciliation', beanProMasterTicket);
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);

        console.log('RECDATA');
        console.log(rec.data);
        if (rec.data.IN_ADYEN === 'Y' && (rec.data.IN_STVAL === '2' || rec.data.IN_STVAL === '3')) {
            this.searchBeanAdyen(rec);
        } else {
            this.searchBean(rec);
//            if (rec.data.STVAL !== '1' && rec.data.STVAL !== '4') {
//                console.log('if');
//                this.winDataEntry('U', rec);
//            }
//            else {
//                this.winDataEntry('S', rec);
//                console.log('else');
//            }
        }
    },
    searchBean: function (rec) {

        Ext.Ajax.request({
            url: prototype.url + '/searchBeanAMDP',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(rec.data)},
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
//                console.log(response);
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
//                if (res.success) {
                if (res.success) {
                    var beanCons = res.result;
                    console.log('beanCons');
                    console.log(beanCons);
                    if (beanCons !== null) {
                        me.winDataEntry('U', beanCons);
                    } else {
                        global.Msg({
                            msg: 'An error has ocurred. Please contact our System Department'
                        });
                    }

                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },
    winDataEntry: function (action, beanCons) {
        action = action === null || action === undefined ? 'U' : action;

        Ext.create('Ext.Praxis.view.payments.BankReconciliationForm.DataEntryAMDP', {
            id: prototype.id + '-dataEntryAMDP',
            params: {
                action: action,
                lstCountry: me.lstCountry,
                lstCard: me.lstCard,
                lstBank: me.lstBank,
                beanCons: beanCons
            }
        }).show();
    },
    searchBeanAdyen: function (rec) {

        Ext.Ajax.request({
            url: prototype.url + '/searchBeanAdyen',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(rec.data)},
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
//                console.log(response);
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
//                if (res.success) {
                if (res.length !== 0) {
                    var lstBeanAdyen = res;
                    me.winDataEntryAdyen(lstBeanAdyen, rec);
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
//                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },
    winDataEntryAdyen: function (lstA2290, rec) {
//        action = action === null || action === undefined ? 'U' : action;
//        rec = rec === null || rec === undefined ? {} : rec;


        Ext.create('Ext.Praxis.view.payments.BankReconciliationForm.DataEntryAdyen', {
            id: prototype.id + '-dataEntry',
            params: {
//                action: action,
                rec: rec,
//                lstCountry: me.lstCountry,
//                lstCard: me.lstCard,
//                lstBank: me.lstBank
                lstA2290: lstA2290
            }
        }).show();
    },
    validateFields: function () {
        var msj = '';
        return msj;
    },
    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            if (me.panelActual !== '-panelGridData') {
                me.setWidthPie();
            }
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
//    onViewDet: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
//
//        if (rowData.data.SCARCOD !== 'AX' || rowData.data.SCOUNTRY !== 'MX') {
//            return;
//        }
//
//        me.drillDown.push(me.panelActual);
//        me.panelActual = '-panelGridDet';
//        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        if (rowData.data.SAGENT !== '') {
//
//            this.beanDet.IN_SDATE = rowData.data.SDATE;
//            this.beanDet.IN_EPAAMEDATA = rowData.data.SCARDN;
//            this.beanDet.IN_MERCHN = rowData.data.MERCHN;
//
//            this.beanDet.FTE_PREV = rowData.data.FTE;
//            this.beanDet.SCARCOD_PREV = rowData.data.SCARCOD;
//            this.beanDet.SCARDN_PREV = rowData.data.SCARDN;
//            this.beanDet.SEQNUM_PREV = rowData.data.SEQNUM;
//            this.beanDet.SORIG_PREV = rowData.data.strSORIG;
//            this.beanDet.MERCHN_PREV = rowData.data.MERCHN;
//            this.beanDet.SAUTHOC_PREV = rowData.data.SAUTHOC;
//            this.beanDet.SCURRENCY_PREV = rowData.data.SCURRENCY;
//            this.beanDet.SVFOP_PREV = rowData.data.SVFOP;
//
//
//            /*this.beanDet.SCARCOD = rowData.data.SCARCOD;
//             this.beanDet.strDescCard = rowData.data.strDescCard;
//             this.beanDet.strFecFiltro = rowData.data.strFecFiltro;
//             this.beanDet.IN_TDOC = rowData.data.IN_TDOC;*/
//            this.beanDet.strTitulo = rowData.data.strTitulo;
//
////            console.log('data')
////            console.log(rowData.data);
//
//            me.paramsDetail.beanString = JSON.stringify(this.beanDet);
//            this.setGridDataDet();
//        } else {
//            global.Msg({
//                msg: 'Data not found.'
//            });
//        }
//    },
//    setGridDataDet: function () {
//        win.lblUser_toolTip("Estructura: A2309B");
//
//
//        Ext.Ajax.request({
//            url: prototype.url + '/searchDet',
//            method: 'POST',
//            timeout: 60000000,
//            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
//            params: {beanString: me.paramsDetail},
//            success: function (response, options) {
//                Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');
//                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
//
//                var storeData = Ext.create('Ext.data.Store', {
//                    data: res.data,
//                    autoLoad: true
//                });
//
//                if (res.settl1.length > 1) {
//                    var storeSettlData1 = Ext.create('Ext.data.Store', {
//                        data: res.settl1,
//                        autoLoad: true
//                    });
//
//                    Ext.getCmp(prototype.id + '-gridDataPrevSettlement').bindStore(storeSettlData1);
//                } else {
//                    Ext.getCmp(prototype.id + '-gridDataPrevSettlement').setVisible(false);
//                    Ext.getCmp(prototype.id + '-tbspacerSettlement').setVisible(false);
//                }
//
//                Ext.getCmp(prototype.id + '-gridDataDet').bindStore(storeData);
//            }
//        })
//    },
//    onGridDetByBatch: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
//        me.drillDown.push(me.panelActual);
//        me.panelActual = '-panelGridDetByBatch';
//        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        if (rowData.data.SAGENT !== '') {
//
//            this.beanDet.IN_EPAAMEDATA = rowData.data.SCARDN;
//            this.beanDet.IN_PRDA = rowData.data.PRDA;
//            this.beanDet.IN_SETTLD = rowData.data.SETTLD;
//            this.beanDet.IN_NBATCH = rowData.data.NBATCH;
//
//            /*this.beanDet.SCARCOD = rowData.data.SCARCOD;
//             this.beanDet.strDescCard = rowData.data.strDescCard;
//             this.beanDet.strFecFiltro = rowData.data.strFecFiltro;
//             this.beanDet.IN_TDOC = rowData.data.IN_TDOC;*/
//            this.beanDet.strTitulo = rowData.data.strTitulo;
//
////            console.log('data')
////            console.log(rowData.data);
//
//            me.paramsDetail.beanString = JSON.stringify(this.beanDet);
//            this.setGridDataDetByBatch();
//        } else {
//            global.Msg({
//                msg: 'Data not found.'
//            });
//        }
//    },
//    setGridDataDetByBatch: function () {
//        win.lblUser_toolTip("Estructura: A2309B");
//
//        var msj = this.validateFields();
//        if (msj !== '') {
//            global.Msg({msg: msj
//            });
//        } else {
//            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
//                proxy: {
//                    url: prototype.url + '/searchDetByBatch'
//                }, listeners: {
//                    beforeload: function (obj) {
//                        obj.proxy.extraParams = me.paramsDetail;
//                    },
//                    load: function (obj) {
//                        /*var pag = Ext.getCmp(prototype.id + '-paggin9');
//                         var pagData = pag.getPageData();
//                         Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                         Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                         Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));*/
//                        if (obj.data.length === 0) {
//                            global.Msg({
//                                msg: 'Data not found.'
//                            });
//                        } else {
//                            var bean = obj.data.items[0].data;
//
//                            Ext.getCmp(prototype.id + '-gridDataDetByBatch').setTitle('<center style="font-size:12px;">' + bean.strTitulo + '</center>');
//                            //console.log(data);
//
//                            //var tit = Ext.getCmp(prototype.id + '-gridDataDetByBatch');
//                            //tit.setTitle('<center style="font-size:12px;">' + descFilDate + ' : ' + data.strFormatDate + '  - Card Number : ' + data.SCARDN + ' ' + data.MERCHNAM + '   - Status : ' + data.strDescStatus + '</center>');
//                        }
//                        //me.setWidthPie();
//                    }
//                }
//            });
//
//            global.clear();
//            Ext.getCmp(prototype.id + '-gridDataDetByBatch').bindStore(storeGridDatas);
//            //Ext.getCmp(prototype.id + '-paggin9').bindStore(storeGridDatas);
//        }
//    },
    gridDetTicketS_clickHandler: function (column, e, row, column, x, rowData) {
        var beanDetE = x.record.data;

        beanDetE.IN_SDATE = beanDetE.SDATE;

        console.log(this.strSTVAL);
        if (this.strSTVAL === 'SETT') {
            console.log("win.selectedChild('vskMain', 'boxDetTktS_P');");
            console.log("this.searchDetTktByStval_Pay(beanDetE);");
            //            win.selectedChild('vskMain', 'boxDetTktS_P');
            //            this.searchDetTktByStval_Pay(beanDetE);
        } else {
            if (beanDetE.CERROR !== "") {
                beanDetE.IN_CERROR = beanDetE.CERROR;
            } else {
                beanDetE.IN_CERROR = "";
            }
            //win.selectedChild('vskMain', 'boxDetTicket');
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxDetTktS';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.searchDetTktByStval(beanDetE);
        }
    },
    searchDetTktByStval: function (beanDetE) {
        //me.f_boxDetTktS = '2';
        me.beanboxDetTktS2 = beanDetE;
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTktByStval'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanboxDetTktS2)};
                },
                load: function (obj, obj2, success, response, obj5) {

//                    me.selectedChild('vskMain', 'boxDetTktMatch');
                    win.lblUser_toolTip("Estructura: MPF101");

                    var res = Ext.JSON.decode(response._response.responseText);


                    if (res.success) {
                        var gridDetTktSAC = res.data;
                        if (gridDetTktSAC.length > 0) {
                            var obj = {};
                            for (var l = 0; l < gridDetTktSAC.length; l++) {
                                obj = gridDetTktSAC[l];
                                if (obj.IN_STVAL === "5") {
                                    if (obj.strPEM === "ACCB") {
                                        break;
                                    }
                                } else {
                                    break;
                                }
                            }
                            if (obj !== null) {

                                if (obj.IN_STVAL === '1') {
                                    win.setTitle('gridDetTktMatch', obj.strTitulo);
                                    //                                var storeGridDatas = Ext.create("Ext.Praxis.store.payments.GridData", {data: gridDetTktSAC});
//                                   Ext.getCmp(prototype.id + '-gridDetTktMatch').bindStore(storeGridDatas);
//                                   Ext.getCmp(prototype.id + '-paggin9').bindStore(storeGridDatas);
                                    //me.selectedChild('boxDetTicket', 'boxDetTktMatch');
                                    Ext.getCmp(prototype.id + '-cmbError').hide();
                                } else {
                                    //                                Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(
                                    //                                        Ext.create("Ext.Praxis.store.payments.GridData", {data: gridDetTktSAC})
                                    //                                        );
//                                   Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(storeGridDatas);
//                                   Ext.getCmp(prototype.id + '-paggin10').bindStore(storeGridDatas);

                                    var pag = Ext.getCmp(prototype.id + '-paggin13');
                                    var pagData = pag.getPageData();
                                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                                    Ext.getCmp(prototype.id + '-cmbError').show();
                                    //me.selectedChild('panelMain', 'boxDetTktS');
                                    win.setText('lblTitDetTktByStval', obj.strTitulo);
                                    if (obj.IN_TDOC === 'R') {
                                        win.setText('hcDetTktS', 'Refund');
                                    } else {
                                        win.setText('hcDetTktS', 'Sales');
                                    }
                                }
                            }
                            // Colocando los Errores ==============================================
                            var lstError = res.lstError;
                            var errors = new Array();
                            errors.push(['', 'All']);
                            lstError.forEach(function callback(currentValue, index, array) {
                                errors.push([currentValue.CERROR, currentValue.strDescripcion]);
                            });
                            var store = Ext.create('Ext.data.ArrayStore', {
                                storeId: 'errors', autoLoad: true, data: errors, fields: ['code', 'name']
                            });
                            Ext.getCmp(prototype.id + '-cmbError').bindStore(store);
                            win.setValue('cmbError', '');

                            // ====================================================================
                        } else {
                            win.setTitle('gridDetTktMatch', '');
                            win.setText('lblTitDetTktByStval', '');
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetTktMatch').bindStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-paggin9').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetTktByStval').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin13').bindStore(storeGridDatas);
    },
    showTicket: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        if (rowData.data.NUMREF.substr(0, 3) === '139') {
            console.log('RowData');
            console.log(rowData.data);
            me.viewMasterTkt(rowData.data);
        }
    },
    viewMasterTkt: function (data) {

        prototypeProgram.view = 'payments-bank-reconciliation-form';
        prototypeProgram.nprog = 'PX00000095';
        prototypeProgram.title = 'Bank Reconciliation';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = data.NUMREF.substr(0, 3);
        beanProMasterTicket.IN_FORMA = data.NUMREF.substr(3, 4);
        beanProMasterTicket.IN_SERIE = data.NUMREF.substr(7, 6);
        console.log(beanProMasterTicket);
        //beanProMasterTicket.IN_SEQ = data.SEQRO;

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    btnClear_click: function (obj, e) {

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
        Ext.getCmp(prototype.id + '-cmbBank').setValue('');
        Ext.getCmp(prototype.id + '-cmbCardType').setValue('');
        Ext.getCmp(prototype.id + '-txtCard1').setValue('');
        Ext.getCmp(prototype.id + '-txtCard2').setValue('');
        Ext.getCmp(prototype.id + '-txtMERCHN').setValue('');
        Ext.getCmp(prototype.id + '-txtSAGENT').setValue('');
        Ext.getCmp(prototype.id + '-cmbFTE').setValue('');
        Ext.getCmp(prototype.id + '-txtPNR').setValue('');
        Ext.getCmp(prototype.id + '-txtAUTHOC').setValue('');
        Ext.getCmp(prototype.id + '-cmbNEGOC').setValue('');
        Ext.getCmp(prototype.id + '-cmbCOMENTF').setValue('');
        Ext.getCmp(prototype.id + '-cmbAGENCY').setValue('');

    },
    btnExcel_click: function (obj, e) {

        this.setFormatParameter();
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
        switch (me.panelActual) {
            case  '-panelGridDataMain':
                global.getFile(prototype.url + '/getXLSXMain?beanString=' + searchParams.beanString);
                break;
            case '-panelGridDataCountry':
                global.getFile(prototype.url + '/getXLSXCountry?beanString=' + me.paramsDetail.beanString);
                break;
            case '-panelGridDataDay':
                global.getFile(prototype.url + '/getXLSXDay?beanString=' + me.paramsDetail.beanString);
                break;
            case '-panelGridDataDetalle':
                global.getFile(prototype.url + '/getXLSXDetalle?beanString=' + me.paramsDetail.beanString);
                break;
            case '-panelGridDataTicket':
                global.getFile(prototype.url + '/getXLSXTicket?beanString=' + me.paramsDetail.beanString);
                break;
            case '-panelGridDetCardByS':
                global.getFile(prototype.url + '/getXLSXDetCardByS?beanString=' + me.paramsDetail.beanString);
                break;
            case '-panelGridDetDayByS':
                global.getFile(prototype.url + '/getXLSXDetDayByS?beanString=' + me.paramsDetail.beanString);
                break;
            case '-panelGridDetCardNbrByS':
                global.getFile(prototype.url + '/getXLSXDetCardNbrByS?beanString=' + me.paramsDetail.beanString);
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

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
        console.log(ancho);
        if (ancho > 650) {
            Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        } else {
            Ext.getCmp(prototype.id + '-pie').setWidth(650);
        }
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridDataMain':
                me.pagginActual = '-paggin';
                break;
            case '-panelGridDataCountry':
                me.pagginActual = '-paggin2';
                break;
            case '-panelGridDataDay':
                me.pagginActual = '-paggin3';
                break;
            case '-panelGridDataDetalle':
                me.pagginActual = '-paggin4';
                break;
            case '-gridDataDetCardByS':
                me.pagginActual = '-paggin5';
                break;
            case '-gridDataDetDayByS':
                me.pagginActual = '-paggin6';
                break;
            case '-panelGridDataTicket':
                me.pagginActual = '-paggin7';
                break;
        }
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
    }


});
