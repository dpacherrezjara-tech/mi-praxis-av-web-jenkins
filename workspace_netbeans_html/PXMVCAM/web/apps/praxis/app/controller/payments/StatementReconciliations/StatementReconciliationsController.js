/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.StatementReconciliations.StatementReconciliationsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StatementReconciliationsController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanBank: {},
    beanDay: {},
    beanLiquida: {},
    beanDetails: {},
    beanDetBankByS: {},
    beanDetCross: {},
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    reg99: 0,
    me: '',
    searchParams: {},
    paramsDetail: {},
    dataObtain: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'StatementReconciliationsForm';
        prototype.url = CONTEXTPATH + '/StatementReconciliations';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#StatementReconciliationsForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#StatementReconciliationsForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#StatementReconciliationsForm-btnClear': {
                click: this.btnClear_click
            },
            '#StatementReconciliationsForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#StatementReconciliationsForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#StatementReconciliationsForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#StatementReconciliationsForm-btnBack': {
                click: this.btnBack_click
            },
            '#StatementReconciliationsForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#StatementReconciliationsForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#StatementReconciliationsForm-btn-pag-next': {
                click: this.pagNext
            },
            '#StatementReconciliationsForm-btn-pag-last': {
                click: this.pagLast
            },
            '#StatementReconciliationsForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#StatementReconciliationsForm-cmbDateFromMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#StatementReconciliationsForm-cmbDateToMonth': {
//                afterrender: this.afterRenderMonth,
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
    obtainData: function () {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');


        var cmbDateSel = Ext.getCmp(prototype.id + '-cmbDateSel');
        cmbDateSel.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["VALDATE", "Value Date"],
                ["ADATE", "Abono Date"]
            ]
        }));
        cmbDateSel.setValue("VALDATE");

        var cmbEFTE = Ext.getCmp(prototype.id + '-cmbEFTE');
        cmbEFTE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["BX", "BANAMEX"],
                ["4401", "BANAMEX BOOMER CTA 4401"],
                ["8221", "BANAMEX BOOMER CTA 8221"],
                ["9133", "BANAMEX OPER.FRANQ. 9133"]
            ]
        }));
        cmbEFTE.setValue("");

        var cmbTTRAN = Ext.getCmp(prototype.id + '-cmbTTRAN');
        cmbTTRAN.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["C", "Charge"],
                ["A", "Pay"]
            ]
        }));
        cmbTTRAN.setValue("");

        this.dataObtain.BANK = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);

                var lstBank = res.lstBank;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstBank,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbBank').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbBank').setValue('');
                me.btnSearch_click();
            }
        });
    },

    setFormatParameter: function () {
        me.bean = {};

        me.bean.strYearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        me.bean.strMonthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();

        me.bean.strYearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        me.bean.strMonthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();

        var option = Ext.getCmp(prototype.id + '-rbgType').getValue();
        switch (option) {
            case 'rbSALES':
                me.bean.IN_TDOC = 'S';
                break;
            case 'rbREFUND':
                me.bean.IN_TDOC = 'R';
                break;
        }

        me.bean.IN_DATE = Ext.getCmp(prototype.id + '-cmbDateSel').getValue();
        me.bean.IN_MERCHN = Ext.getCmp(prototype.id + '-txtLiquida').getValue();
        me.bean.IN_BANK = Ext.getCmp(prototype.id + '-cmbBank').getValue();
        me.bean.IN_AFTE = Ext.getCmp(prototype.id + '-cmbEFTE').getValue();
        me.bean.IN_TTRAN = Ext.getCmp(prototype.id + '-cmbTTRAN').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },

    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },

    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPF102");
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
                            var value = Ext.getCmp(prototype.id + '-htDate');
                            if (data.IN_DATE === "DATEP") {
                                value.setText = "Deposit";
                            } else {
                                value.setText = "Payment";
                            }
                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
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
        win.lblUser_toolTip("Estructura: MPF102");

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
        win.lblUser_toolTip("Estructura: MPF102");
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
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDay').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        }
    },

    onGridDetLiquida: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetLiquida';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanLiquida.IN_TDOC = rowData.data.IN_TDOC;
        this.beanLiquida.IN_DATE = rowData.data.IN_DATE;
        this.beanLiquida.SDATE = rowData.data.SDATE;
        this.beanLiquida.CBANK = rowData.data.CBANK;
        this.beanLiquida.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanLiquida.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanLiquida.IN_QTYTRAN1 = rowData.data.QTYTRAN1;
        this.beanLiquida.strFormatDate = rowData.data.strFormatDate;
        this.beanLiquida.strCREJEC = rowData.data.strCREJEC;

        me.paramsDetail.beanString = JSON.stringify(this.beanLiquida);
        this.setGridDataDetLiquida();
    },

    setGridDataDetLiquida: function () {
        win.lblUser_toolTip("Estructura: MPF102");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetLiquida'
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
                            Ext.getCmp(prototype.id + '-gridDetLiquida').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetLiquida').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
        }
    },

    onGridDetDetails: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetDetails';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetails.BANDOC = rowData.data.BANDOC;
        this.beanDetails.VALDATE = rowData.data.VALDATE;
        this.beanDetails.SCOUNTRY = rowData.data.SCOUNTRY;
        this.beanDetails.CODEBANK = rowData.data.CODEBANK;

        me.paramsDetail.beanString = JSON.stringify(this.beanDetails);
        this.setGridDataDetDetails();
    },

    setGridDataDetDetails: function () {
        win.lblUser_toolTip("Estructura: MPF101");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetDetails'
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
                            Ext.getCmp(prototype.id + '-gridDetDetails').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDetails').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
        }
    },

    //<editor-fold defaultstate="collapsed" desc="onGridDetBankS">
    onGridDetBankS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        var cant = 0;
        switch (columnNum) {
            case 1:
                console.log('ENTRA AL MATCH');
                rowData.data.IN_STVAL = '1';
                cant = rowData.data.lngQMATCH;
                break;
            case 2:
                console.log('ENTRA AL DIFF');
                rowData.data.IN_STVAL = '4';
                cant = rowData.data.lngQDIFF;
                break;
            case 4:
                console.log('ENTRA AL PEND');
                rowData.data.IN_STVAL = 'P';
                cant = rowData.data.lngQPEND;
                break;
        }
        
        if (cant > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDetBankByS';

            me.flag = 'all';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            console.log(rowData.data.SDATE, 'valor IN_SDATE')
            this.beanDetBankByS.strFecFiltro = 'VALDATE';
            this.beanDetBankByS.IN_SDATE = rowData.data.SDATE;
            this.beanDetBankByS.IN_STVAL = rowData.data.IN_STVAL;
            this.beanDetBankByS.strFormatDate = rowData.data.strFormatDate;
            console.log(this.beanDetBankByS);
            me.paramsDetail.beanString = JSON.stringify(this.beanDetBankByS);
            this.setGridDataDetBankS();

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }

    },
    setGridDataDetBankS: function (data) {
        win.lblUser_toolTip("Estructura: MPF102");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetBankCodeByStval'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin5');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//                    console.log(obj.data);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } 
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetBankByS').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
    },
    onGridDetQtyByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        
        let qty = rowData.data.lngQACCB;
        if (qty > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDetDayByS';

            me.flag = 'all';
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

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }

    },
    onGridDataCross: function (obj, metaData, rowNum, columnNum, obj2, rowData){
        let qty = rowData.data.QTYTRAN1;
        if (qty > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataCross';

            me.flag = 'all';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.beanDetCross.IN_VALDATE = rowData.data.VALDATE;
            this.beanDetCross.IN_CODEBANK = rowData.data.CODEBANK;
            this.beanDetCross.IN_UNICODE = rowData.data.UNICODE;

            me.paramsDetail.beanString = JSON.stringify(this.beanDetCross);
            this.setGridDataCross();

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridDataCross: function () {
        win.lblUser_toolTip("Estructura: MPF060");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetCross'
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
//                            Ext.getCmp(prototype.id + '-gridDataCross').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataCross').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
        }
    },

    eventKey_BANDOC: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            if(Ext.getCmp(prototype.id + '-txtBANDOC').getValue() !== ''){
                this.btnSearch_BANDOC();
            }else{
                this.btnSearch_click();
            }
            
        }
    },
    btnSearch_BANDOC: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        console.log(this.childs);
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetDetails';
        global.selectedChild(this.childs, prototype.id + me.panelActual);

        this.beanDetails.BANDOC = Ext.getCmp(prototype.id + '-txtBANDOC').getValue();
        this.beanDetails.CODEBANK = "";

        me.paramsDetail.beanString = JSON.stringify(this.beanDetails);
        this.setGridDataDetBANDOC();
    },

    setGridDataDetBANDOC: function () {
        win.lblUser_toolTip("Estructura: MPF101");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetDetails'
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
                            Ext.getCmp(prototype.id + '-gridDetDetails').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDetails').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
        }
    },

    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.StatementReconciliationsForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry
            }
        }).show();
    },
    btnBack_click: function (obj, e) {
        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.setWidthPie();
            this.getPaggin();
            if (me.pagginActual !== '') {
                console.log(me.pagginActual);
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
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-txtLiquida').setValue('');
        Ext.getCmp(prototype.id + '-cmbTTRAN').setValue('');
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
        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            case  '-boxDetBank':
                global.getFile(prototype.url + '/getXLSXbank?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxDetDay':
                global.getFile(prototype.url + '/getXLSXDay?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxDetLiquida':
                global.getFile(prototype.url + '/getXLSXLiquida?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxDetBankByS':
                global.getFile(prototype.url + '/getXLSXBankByS?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxDetDayByS':
                global.getFile(prototype.url + '/getXLSXDayByS?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxDetLiquidaByS':
                global.getFile(prototype.url + '/getXLSXLiquidaByS?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxByLiquida':
                global.getFile(prototype.url + '/getXLSXByLiquida?beanString=' + me.paramsDetail.beanString);
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
            case '-boxDetBank':
                me.pagginActual = '-paggin2';
                break;
            case '-boxDetDay':
                me.pagginActual = '-paggin3';
                break;
            case '-boxDetLiquida':
                me.pagginActual = '-paggin4';
                break;
            case '-boxDetDetails':
                me.pagginActual = '-paggin5';
                break;
            case '-boxDetDayByS':
                me.pagginActual = '-paggin6';
                break;
            case '-boxDetLiquidaByS':
                me.pagginActual = '-paggin7';
                break;
            case '-boxByLiquida':
                me.pagginActual = '-paggin8';
                break;
        }
    },
    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        obj.setValue('01');
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