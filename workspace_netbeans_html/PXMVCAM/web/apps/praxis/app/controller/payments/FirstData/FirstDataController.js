/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.FirstData.FirstDataController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FirstDataController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanDay: {},
    beanDetTran: {},
    beanDetCard: {},
    beanBank: {},
    beanTkt: {},
    beanDet: {},
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
    init: function(view) {
        me = this;
        prototype.id = 'FirstDataForm';
        prototype.url = CONTEXTPATH + '/FirstData';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridByMonth';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#FirstDataForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#FirstDataForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#FirstDataForm-btnClear': {
                click: this.btnClear_click
            },
            '#FirstDataForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#FirstDataForm-btnPdf': {
                click: this.btnPdf_click
            },
            '#FirstDataForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#FirstDataForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#FirstDataForm-btnBack': {
                click: this.btnBack_click
            },
            '#FirstDataForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#FirstDataForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#FirstDataForm-btn-pag-next': {
                click: this.pagNext
            },
            '#FirstDataForm-btn-pag-last': {
                click: this.pagLast
            },
            '#FirstDataForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#FirstDataForm-cmbDateFromMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#FirstDataForm-cmbDateToMonth': {
//                afterrender: this.afterRenderMonth,
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
    obtainData: function() {

        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

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

        me.btnSearch_click();
    },
    setFormatParameter: function() {
        me.bean = {};

        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_SCURRENCY = Ext.getCmp(prototype.id + '-cmbFindByCurrency').getValue();
        me.bean.IN_MERCHNP = Ext.getCmp(prototype.id + '-txtMerch').getValue()
        me.bean.IN_CARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        me.bean.IN_CARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();
        me.bean.IN_TIPOFEC = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
        me.bean.IN_NUMLIQUI = Ext.getCmp(prototype.id + '-txtSettlement').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    setFormatParameterForExcelGridDataMain: function() {
        me.bean = {};
        var grid = Ext.getCmp(prototype.id + '-gridDataMain').getStore().data.items[0]
        
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_SCURRENCY = Ext.getCmp(prototype.id + '-cmbFindByCurrency').getValue();
        me.bean.IN_MERCHNP = Ext.getCmp(prototype.id + '-txtMerch').getValue()
        me.bean.IN_CARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        me.bean.IN_CARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();
        me.bean.IN_TIPOFEC = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
        me.bean.IN_DATE = grid.get("TIPOFEC").substring(0,6);
        me.bean.IN_NUMLIQUI = Ext.getCmp(prototype.id + '-txtSettlement').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    setFormatParameterForExcelBySettlement: function() {
        me.bean = {};
        var grid = Ext.getCmp(prototype.id + '-gridDataMainBySettlement').getStore().data.items[0]
        
        me.bean.IN_SCURRENCY = grid.get("SCURRENCY");
        me.bean.IN_MERCHNP = grid.get("MERCHNP");
        me.bean.IN_CARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        me.bean.IN_CARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();
        me.bean.IN_TIPOFEC = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
        me.bean.IN_DATE = grid.get("TIPOFEC");
        me.bean.IN_NUMLIQUI = grid.get("NUMLIQUI");

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    setFormatParameterBySettlement: function() {
        me.bean = {};
        var grid = Ext.getCmp(prototype.id + '-gridDataMainBySettlement').getStore().data.items[0]
        //console.log(Ext.getCmp(prototype.id + '-gridDataMainBySettlement').getStore().data.items[0].get('NUMLIQUI'));

        me.bean.IN_NUMLIQUI = grid.get('NUMLIQUI');
        me.bean.IN_SCURRENCY = grid.get('SCURRENCY');
        me.bean.IN_FPRESENT = grid.get('FPRESENT');
        me.bean.IN_MERCHNP = grid.get('MERCHNP');

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    cmbfiltro_clickHandler: function(){
        this.setFormatParameter();
        this.setGridDataByMonth();
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridDataByMonth();
    },
    setGridData: function() {
        win.lblUser_toolTip("Estructura: A2338");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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
                        var IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
                        var titIN_DATE = '';

                        if (IN_DATE === 'FPRESENT') {
                            titIN_DATE = 'Presentation';
                        } else if (IN_DATE === 'SDATE') {
                            titIN_DATE = 'Sale';
                        }

                        Ext.getCmp(prototype.id + '-adgTitFecha2').setText(titIN_DATE);
                        
                        Ext.getCmp(prototype.id + '-gridDataMain').setTitle('<center style="font-size:12px;">' + titIN_DATE + ' Date: ' + data.strFormatDate + '</center>');
                        
                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMain').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataMain').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    onGridBySettlement: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataBySettlement';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        if (rowData.data.NUMLIQUI !== '') {

            this.beanDet.IN_NUMLIQUI = rowData.data.NUMLIQUI;
            this.beanDet.IN_SCURRENCY = rowData.data.SCURRENCY;
            this.beanDet.IN_TIPOFEC = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
            this.beanDet.IN_DATE = rowData.data.TIPOFEC;
            this.beanDet.IN_MERCHNP = rowData.data.MERCHNP;

            console.log('data')
            console.log(rowData.data);

            me.paramsDetail.beanString = JSON.stringify(this.beanDet);
            this.setGridDataBySettlement();
        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridDataBySettlement: function() {
        win.lblUser_toolTip("Estructura: A2338");

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchBySettlement'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function(obj) {
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

                            //Ext.getCmp(prototype.id + '-gridDataDet').setTitle('<center style="font-size:12px;">' + bean.strTitulo + '</center>');
                            //console.log(data);
                            var IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
                            var titIN_DATE = '';

                            if (IN_DATE === 'FPRESENT') {
                                titIN_DATE = 'Presentation';
                            } else if (IN_DATE === 'SDATE') {
                                titIN_DATE = 'Sale';
                            }

                            Ext.getCmp(prototype.id + '-adgTitFecha3').setText(titIN_DATE);

                            var tit = Ext.getCmp(prototype.id + '-gridDataMainBySettlement');
                            if (data.DESC_MERCHANT == undefined) {
                                data.DESC_MERCHANT = "";
                            }
                            tit.setTitle('<center style="font-size:12px;">' + 'Settlement Number: ' + data.NUMLIQUI + ' - Currency: ' + data.SCURRENCY + ' - Merchant: ' + data.MERCHNP + ' ' + data.DESC_MERCHANT + '</center>');
                        }
                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataMainBySettlement').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-gridDataMainBySettlement').setStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    setGridDataByMonth: function() {
        win.lblUser_toolTip("Estructura: A2338");
        me.panelActual = '-panelGridByMonth';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchByMonths'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
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
                        var IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
                        var titIN_DATE = '';

                        if (IN_DATE === 'FPRESENT') {
                            titIN_DATE = 'Presentation';
                        } else if (IN_DATE === 'SDATE') {
                            titIN_DATE = 'Sale';
                        }

                        Ext.getCmp(prototype.id + '-adgTitFecha').setText(titIN_DATE);
                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataByMonth').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataByMonth').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    onGridDataMain: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        if (rowData.data.QtySETTLEMENT !== '') {

            this.beanDet.IN_DATE = rowData.data.TIPOFEC;
            this.beanDet.strFormatDate = rowData.data.strFormatDate;
            this.beanDet.IN_SCURRENCY = Ext.getCmp(prototype.id + '-cmbFindByCurrency').getValue();
            this.beanDet.IN_MERCHNP = Ext.getCmp(prototype.id + '-txtMerch').getValue()
            this.beanDet.IN_CARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
            this.beanDet.IN_CARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();
            this.beanDet.IN_TIPOFEC = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
            this.beanDet.IN_NUMLIQUI = Ext.getCmp(prototype.id + '-txtSettlement').getValue();
            
            console.log(this.beanDet);
            me.paramsDetail.beanString = JSON.stringify(this.beanDet);
            this.setGridData();
        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    tarjeta_keyDownHandler: function(e, eOpts) {
        if (eOpts.getKey() !== 9 && eOpts.getKey() !== 16) {
            if (Ext.getCmp(prototype.id + '-txtCard1').getValue().length === 6) {
                Ext.getCmp(prototype.id + '-txtCard2').focus();
            }
        }
    },
    buscarCard_keyDownHandler: function(e, eOpts, a, b, c) {
        if (Ext.getCmp(prototype.id + '-txtCard1').getValue() !== '' || Ext.getCmp(prototype.id + '-txtCard2').getValue() !== '') {
            console.log(eOpts.getKey());
            switch (eOpts.getKey()) {
                case 13:
                    if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim().length === 6
                            && Ext.getCmp(prototype.id + '-txtCard2').getValue().trim().length === 4) {
                        this.eventKey(e, eOpts);
                    } else {
                        global.Msg({
                            msg: 'Credit Card Number must contain 10 digits.'
                        });
                        Ext.getCmp(prototype.id + '-txtCard1').setValue('');
                        Ext.getCmp(prototype.id + '-txtCard2').setValue('');
                    }
            }
        } else {
            global.Msg({
                msg: 'Credit Card Number must contain 10 digits.'
            });
            Ext.getCmp(prototype.id + '-txtCard1').setValue('');
            Ext.getCmp(prototype.id + '-txtCard2').setValue('');
        }
    },
    setGridDataItinerary: function() {
        win.lblUser_toolTip("Estructura: IMF141");
        me.panelActual = '-panelGridDataItinerary';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchItinerary'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                            var data = obj.data.items[0].data;
                    }
//                        me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataItinerary').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataItinerary').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataFirstData: function() {
        win.lblUser_toolTip("Estructura: IMF140");
        me.panelActual = '-panelGridDataFirstData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchFirstData'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                            var data = obj.data.items[0].data;
                    }
//                        me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataFirstData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataFirstData').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataFirstDataPercentage: function() {
        win.lblUser_toolTip("Estructura: IMF140");
        me.panelActual = '-panelGridDataFirstDataPercentage';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        console.log(prototype.url)
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchPercentage'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                            var data = obj.data.items[0].data;
                    }
//                        me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataFirstDataPercentage').bindStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-gridDataFirstData').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    onGridDetDay: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetDay';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDay.strFecFiltro = rowData.data.strFecFiltro;
        this.beanDay.strYearFrom = rowData.data.strYearFrom;
        this.beanDay.strYearTo = rowData.data.strYearTo;
        this.beanDay.strMonthFrom = rowData.data.strMonthFrom;
        this.beanDay.strMonthTo = rowData.data.strMonthTo;

        this.beanDay.BDATEP = rowData.data.BDATEP;
        this.beanDay.IN_CODEBANK = rowData.data.IN_CODEBANK;
        this.beanDay.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDay.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDay.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanDay.strFormatDate = rowData.data.strFormatDate;

        me.paramsDetail.beanString = JSON.stringify(this.beanDay);
//        console.log(this.beanDay);
        this.setGridDataDetDay();
    },
    setGridDataDetDay: function() {

        win.lblUser_toolTip("Estructura: A2345");
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
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function(obj) {
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
                            Ext.getCmp(prototype.id + '-gridDetDay').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
//                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDay').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    onGridDetTran: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        var cant = 0;
        switch (columnNum) {
            case 2 :
                rowData.data.IN_STVAL = '1';
                cant = rowData.data.QMATCH;
                break;
            case 4 :
                rowData.data.IN_STVAL = '2';
                cant = rowData.data.QLIQUI;
                break;
            case 6 :
                rowData.data.IN_STVAL = '3';
                cant = rowData.data.QBANK;
                break;
            case 8 :
                rowData.data.IN_STVAL = '4';
                cant = rowData.data.QDIFF;
                break;
        }
//
        if (cant > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxDetTran';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanDetTran.strFecFiltro = rowData.data.strFecFiltro;
            this.beanDetTran.BDATEP = rowData.data.BDATEP;
            this.beanDetTran.IN_CODEBANK = rowData.data.IN_CODEBANK;
            this.beanDetTran.IN_MERCHN = rowData.data.IN_MERCHN;
            this.beanDetTran.IN_STVAL = rowData.data.IN_STVAL;

            this.beanDetTran.strYearFrom = rowData.data.strYearFrom;
            this.beanDetTran.strYearTo = rowData.data.strYearTo;
            this.beanDetTran.strMonthFrom = rowData.data.strMonthFrom;
            this.beanDetTran.strMonthTo = rowData.data.strMonthTo;

//            me.paramsDetail.beanString = JSON.stringify(this.beanDetTran);
//            console.log(this.beanDetTran);
            this.setGridDetTran();

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setParamsDetail: function() {
        var paramsDetail = {};
        paramsDetail.beanString = JSON.stringify(this.beanDetTran);
        return paramsDetail;
    },
    setGridDetTran: function() {
        win.lblUser_toolTip("Estructura: A2345");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetTrans'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = me.setParamsDetail();
                    },
                    load: function(obj) {
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
                            Ext.getCmp(prototype.id + '-gridDetTran').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');

                            Ext.getCmp(prototype.id + '-lblTotT_QTYTRAN').setText(Ext.util.Format.number(data.totQTYTRAN, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotT_SVFOP').setText(Ext.util.Format.number(data.totSVFOP, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotT_MONBTCRE1').setText(Ext.util.Format.number(data.totMONBTCRE1, '0,000'));
//                            Ext.getCmp(prototype.id + '-lblTotT_RATCNAC1').setText(Ext.util.Format.number(data.totRATCNAC1, '0,000'));

                            Ext.getCmp(prototype.id + '-lblTotT_COMITCRE1').setText(Ext.util.Format.number(data.totCOMITCRE1, '0,000.00'));
                            Ext.getCmp(prototype.id + '-lblTotT_IVACRE1').setText(Ext.util.Format.number(data.totIVACRE1, '0,000.00'));
                            Ext.getCmp(prototype.id + '-lblTotT_MONBTDEB1').setText(Ext.util.Format.number(data.totMONBTDEB1, '0,000'));
//                            Ext.getCmp(prototype.id + '-lblTotT_RATDNAC1').setText(Ext.util.Format.number(data.totRATDNAC1, '0,000'));

                            Ext.getCmp(prototype.id + '-lblTotT_COMITDEB1').setText(Ext.util.Format.number(data.totCOMITDEB1, '0,000.00'));
                            Ext.getCmp(prototype.id + '-lblTotT_IVADEB1').setText(Ext.util.Format.number(data.totIVADEB1, '0,000.00'));
                            Ext.getCmp(prototype.id + '-lblTotT_MONBTEXT1').setText(Ext.util.Format.number(data.totMONBTEXT1, '0,000'));
//                            Ext.getCmp(prototype.id + '-lblTotT_RATCEXT1').setText(Ext.util.Format.number(data.totRATCEXT1, '0,000'));

                            Ext.getCmp(prototype.id + '-lblTotT_COMITEXT1').setText(Ext.util.Format.number(data.totCOMITEXT1, '0,000.00'));
                            Ext.getCmp(prototype.id + '-lblTotT_IVAEXT1').setText(Ext.util.Format.number(data.totIVAEXT1, '0,000.00'));

                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetTran').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        }
    },
    onGridDetCard: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        var cant = 0;
        switch (columnNum) {
            case 2 :
                rowData.data.IN_STVAL = '';
                cant = 1;
                break;
            case 9 :
                rowData.data.IN_STVAL = 'C';
                cant = rowData.data.COMITCRE1;
                break;
            case 13 :
                rowData.data.IN_STVAL = 'D';
                cant = rowData.data.COMITDEB1;
                break;
            case 17 :
                rowData.data.IN_STVAL = 'F';
                cant = rowData.data.COMITEXT1;
                break;
        }

        if (cant !== 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxDetCard';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanDetCard.strFecFiltro = rowData.data.strFecFiltro;
            this.beanDetCard.BDATEP = rowData.data.BDATEP;
            this.beanDetCard.CODEBANK = rowData.data.CODEBANK;
            this.beanDetCard.MERCHN = rowData.data.MERCHN;
            this.beanDetCard.DATEF = rowData.data.DATEF;
            this.beanDetCard.IN_STVAL = rowData.data.IN_STVAL;
            this.beanDetCard.strTitulo = rowData.data.strTitulo;
            this.beanDetCard.strBCard1 = rowData.data.strDescBank;

            this.beanDetCard.strYearFrom = rowData.data.strYearFrom;
            this.beanDetCard.strYearTo = rowData.data.strYearTo;
            this.beanDetCard.strMonthFrom = rowData.data.strMonthFrom;
            this.beanDetCard.strMonthTo = rowData.data.strMonthTo;

            me.paramsDetail.beanString = JSON.stringify(this.beanDetCard);
//            console.log(this.beanDetTran);
            this.setGridDetCard();

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridDetCard: function() {
        win.lblUser_toolTip("Estructura: A2290");
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetCard'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function(obj) {
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
                            Ext.getCmp(prototype.id + '-gridDetCard').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetCard').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
        }
    },
    onGridDetTkt: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        var flagStatus = '';

        if (rowData.data.lngQTYDOC > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxDetTicket';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            if (rowData.data.IN_STVAL !== "" || rowData.data.IN_BSTVAL !== "") {
                flagStatus = 'S';
            } else {
                flagStatus = '';
            }

            this.beanTkt.FCONC = rowData.data.FCONC;
            this.beanTkt.TDOC = rowData.data.TDOC;
            this.beanTkt.SDATE = rowData.data.SDATE;
            this.beanTkt.SCOUNTRY = rowData.data.SCOUNTRY;
            this.beanTkt.TDOC = rowData.data.TDOC;
            this.beanTkt.CODEBANK = rowData.data.CODEBANK;
            this.beanTkt.SCARCOD = rowData.data.SCARCOD;
            this.beanTkt.SCARDN = rowData.data.SCARDN;
            this.beanTkt.SAUTHOC = rowData.data.SAUTHOC;
            this.beanTkt.SVFOP = rowData.data.SVFOP;
            this.beanTkt.SEQNUM = rowData.data.SEQNUM;
            this.beanTkt.NUMREF = rowData.data.NUMREF;

            this.beanTkt.strDescCard = rowData.data.strDescCard;
            this.beanTkt.strFormatDate = rowData.data.strFormatDate;
            this.beanTkt.strDescCountry = rowData.data.strDescCountry;
            this.beanTkt.IN_SDATE = rowData.data.IN_SDATE;
            this.beanTkt.IN_TDOC = rowData.data.IN_TDOC;
            this.beanTkt.IN_PAYMENT = rowData.data.IN_PAYMENT;
            this.beanTkt.IN_CARDN = rowData.data.IN_CARDN;
            this.beanTkt.IN_CARDC = rowData.data.IN_CARDC;
            this.beanTkt.NUMREF = rowData.data.NUMREF;
            this.beanTkt.strTitulo = rowData.data.strTitulo;
            this.beanTkt.FTE = rowData.data.FTE;

            this.beanTkt.BAID = rowData.data.BAID;

            me.paramsDetail.beanString = JSON.stringify(this.beanTkt);
            this.setGridDetTkt();
        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridDetTkt: function() {
        win.lblUser_toolTip("Estructura: A2290");
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetTicket'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function(obj) {
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

                            Ext.getCmp(prototype.id + '-gridDetTicket').setTitle('<center style="font-size:12px;">' + data.strTitulo + ' - CC Nbr: ' + data.ACARDN + '</center>');
                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetTicket').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
        }
    },
    imgByTDOC_clickHandler: function() {
//        this.btnSearch_click();
    },
    gridData_VIEWTKT_clickHandler: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.strTicket;
        var beanProMasterTicket = {};
//        
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(8, 7);
//        beanProMasterTicket.IN_SEQ = '00';

//        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFirstData', beanProMasterTicket);
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
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.FirstDataForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry
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
        Ext.getCmp(prototype.id + '-cmbFindByCurrency').setValue('ARS');
        Ext.getCmp(prototype.id + '-txtMerch').setValue('');
        Ext.getCmp(prototype.id + '-txtSettlement').setValue('');
    },
    btnExcel_click: function(obj, e) {

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
    },
    exportExcel: function() {
        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-panelGridData':
                this.setFormatParameterForExcelGridDataMain();
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            case  '-panelGridDataBySettlement':
                this.setFormatParameterForExcelBySettlement()
                global.getFile(prototype.url + '/getXLSXBySettlement?beanString=' + searchParams.beanString);
                break;
            case  '-panelGridByMonth':
                this.setFormatParameter()
                global.getFile(prototype.url + '/getXLSXByMonth?beanString=' + searchParams.beanString);
                break;
        }
    },
    btnPdf_click: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Pdf ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportPdf();
                }
            }
        });
    },
    exportPdf: function() {
        this.setFormatParameter();
        global.getFile(prototype.url + '/getPDF?beanString=' + searchParams.beanString);
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
            case '-panelGridDataBySettlement':
                me.pagginActual = '-paggin2';
                break;
            case '-panelGridByMonth':
                me.pagginActual = '-paggin3';
                break;
            case '-boxDetCard':
                me.pagginActual = '-paggin4';
                break;
            case '-boxDetTicket':
                me.pagginActual = '-paggin5';
                break;
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


