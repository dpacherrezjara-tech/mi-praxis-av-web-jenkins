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
    beanMerchant: {},
    beanBankS: {},
    beanDayByS: {},
    beanMerchantByS: {},
    beanByMerchant: {},
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
                ["BDATEP", "Payment Date"],
                ["DATEP", "Deposit Date"]
            ]
        }));
        cmbDateSel.setValue("BDATEP");

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
        me.bean.IN_MERCHN = Ext.getCmp(prototype.id + '-txtMerchant').getValue();
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
        win.lblUser_toolTip("Estructura: A2292");
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
                            var value = Ext.getCmp(prototype.id + '-htDate');
                            if (data.IN_DATE === "DATEP") {
                                value.setText = "Deposit";
                            } else {
                                value.setText = "Payment";
                            }
                            Ext.getCmp(prototype.id + '-lblTotQMATCH').setText(Ext.util.Format.number(data.lngTotQMATCH, '0,000'));
                            Ext.getCmp(prototype.id + '-totTotal').setText(Ext.util.Format.number(data.totTotal, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotQPAID').setText(Ext.util.Format.number(data.lngTotQPAID, '0,000'));
                            Ext.getCmp(prototype.id + '-lngTotQDIFF').setText(Ext.util.Format.number(data.lngTotQDIFF, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotQTOTSAL').setText(Ext.util.Format.number(data.lngTotQTOTSAL, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotQTOTWS').setText(Ext.util.Format.number(data.lngTotQTOTWS, '0,000'));
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
        Ext.getCmp(prototype.id + '-txtMerchant').setValue('');
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
            case  '-boxDetMerchant':
                global.getFile(prototype.url + '/getXLSXMerchant?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxDetBankByS':
                global.getFile(prototype.url + '/getXLSXBankByS?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxDetDayByS':
                global.getFile(prototype.url + '/getXLSXDayByS?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxDetMerchantByS':
                global.getFile(prototype.url + '/getXLSXMerchantByS?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxByMerchant':
                global.getFile(prototype.url + '/getXLSXByMerchant?beanString=' + me.paramsDetail.beanString);
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
            case '-boxDetMerchant':
                me.pagginActual = '-paggin4';
                break;
            case '-boxDetBankByS':
                me.pagginActual = '-paggin5';
                break;
            case '-boxDetDayByS':
                me.pagginActual = '-paggin6';
                break;
            case '-boxDetMerchantByS':
                me.pagginActual = '-paggin7';
                break;
            case '-boxByMerchant':
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