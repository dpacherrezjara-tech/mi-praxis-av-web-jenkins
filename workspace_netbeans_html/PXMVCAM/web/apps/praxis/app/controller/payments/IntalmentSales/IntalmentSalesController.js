/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.IntalmentSales.IntalmentSalesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.IntalmentSalesController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanDetMain: {},
    beanDetPri: {},
    beanDetPri2: {},
    beanDet: {},
    beanTKTexcel: {},
    beanBankS: {},
    beanDayByS: {},
    beanMerchantByS: {},
    beanByMerchant: {},
    dataGrafico: [],
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
        prototype.id = 'IntalmentSalesForm';
        prototype.url = CONTEXTPATH + '/IntalmentSales';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#IntalmentSalesForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#IntalmentSalesForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#IntalmentSalesForm-btnClear': {
                click: this.btnClear_click
            },
            '#IntalmentSalesForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#IntalmentSalesForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#IntalmentSalesForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#IntalmentSalesForm-btnBack': {
                click: this.btnBack_click
            },
            '#IntalmentSalesForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#IntalmentSalesForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#IntalmentSalesForm-btn-pag-next': {
                click: this.pagNext
            },
            '#IntalmentSalesForm-btn-pag-last': {
                click: this.pagLast
            },
            '#IntalmentSalesForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#IntalmentSalesForm-cmbDateFromMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#IntalmentSalesForm-cmbDateToMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            }

        });
    },
    xpanel_afterrender: function(obj, e) {
        this.obtainData();
    },
    eventKey: function(e, eOpts) {

        console.log(eOpts.getKey());
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    eventKey2: function(e, eOpts) {
        var strTkt = e.value.replace(' ','');
        if (eOpts.getKey() === 13) {
            this.on_VIEWTKT_clickHandler(strTkt);
        }
    },
    tarjeta_keyDownHandler: function(e, eOpts) {
        if (eOpts.getKey() !== 9 && eOpts.getKey() !== 16) {
            if (Ext.getCmp(prototype.id + '-txtCard1').getValue().length === 6) {
                Ext.getCmp(prototype.id + '-txtCard2').focus();
            }
        }
    },
    BuscarTAR_keyDownHandler: function(e, eOpts, a, b, c) {
        if (Ext.getCmp(prototype.id + '-txtCard1').getValue() !== '' || Ext.getCmp(prototype.id + '-txtCard2').getValue() !== '') {
            console.log(eOpts.getKey());
            switch (eOpts.getKey()) {
                case 13:
                    if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim().length === 6 && Ext.getCmp(prototype.id + '-txtCard2').getValue().trim().length === 4) {
                        this.eventKey(e, eOpts);
                    } else {
                        global.Msg({
                            msg: 'CC Number must contain 10 digits.'
                        });
                        Ext.getCmp(prototype.id + '-txtCard1').setValue('');
                        Ext.getCmp(prototype.id + '-txtCard2').setValue('');
                    }
                    if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim() !== '' && Ext.getCmp(prototype.id + '-txtCard2').getValue().trim() !== '') {
                        console.log('Hola');
                        Ext.getCmp(prototype.id + '-cmbIN_FTE').disabled = true;
                        Ext.getCmp(prototype.id + '-cmbSTATT').disabled = true;
                        Ext.getCmp(prototype.id + '-txtMERCHN').setReadOnly(true);
                    }
                    break;
                case 8:
                    console.log('Backspace');
                    this.habilitarFiltros2();
                    break;
                case 32:
                    console.log('Spacebar');
                    this.habilitarFiltros2();
                    break;
                case 46:
                    console.log('Delete');
                    this.habilitarFiltros2();
                    break;
            }
            if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim() === '' && Ext.getCmp(prototype.id + '-txtCard2').getValue().trim() === '') {
                this.habilitarFiltros2();
            }
        }
    },
    habilitarFiltros2: function() {
        Ext.getCmp(prototype.id + '-cmbIN_FTE').disabled = false;
        Ext.getCmp(prototype.id + '-cmbSTATT').disabled = false;
        Ext.getCmp(prototype.id + '-txtMERCHN').setReadOnly(false);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    obtainData: function() {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

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


        var cmbSourceCode = Ext.getCmp(prototype.id + '-cmbIN_FTE');
        cmbSourceCode.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "ALL"],
                ["B", "BSP"],
                ["A", "ARC"],
                ["S", "ASR"],
                ["T", "TCN"]
            ]
        }));
        cmbSourceCode.setValue("");

        var cmbStatus = Ext.getCmp(prototype.id + '-cmbSTATT');
        cmbStatus.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["1", "Match"],
                ["2", "Match Difference"],
                ["3", "Match without EMD"],
                ["4", "Match Manual"],
                ["5", "Liquid Without Sales"]
            ]
        }));
        cmbStatus.setValue("");


        this.dataObtain.BANK = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.dataObtain)},
            success: function(response, options) {
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
    cmbTranType_changeHandler: function() {
        this.btnSearch_click();
    },
    setFormatParameter: function() {
        me.bean = {};

        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateDay').getValue();


        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();


        me.bean.IN_AUTHNBR = Ext.getCmp(prototype.id + '-txtMERCHN').getValue();
        me.bean.IN_FTE = Ext.getCmp(prototype.id + '-cmbIN_FTE').getValue();
        me.bean.IN_STVAL = Ext.getCmp(prototype.id + '-cmbSTATT').getValue();
        me.bean.IN_BANK = Ext.getCmp(prototype.id + '-cmbBank').getValue();
        var check = Ext.getCmp(prototype.id + '-rbgTDOC').getValue();
        if (check.rb === 'S') {
            me.bean.IN_TDOC = 'S';
        } else {
            me.bean.IN_TDOC = 'R';
        }

        me.bean.IN_CARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        me.bean.IN_CARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();
        me.bean.IN_PNR = Ext.getCmp(prototype.id + '-txtPNR').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        console.log(searchParams);
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    setGridData: function() {
        win.lblUser_toolTip("Estructura: A2340");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchMain'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
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
                            var dataGrafico = [];
                            var dataGrafico2 = [];
                            for (var i = 0; i < obj.data.items.length; i++) {
                                var item = {};
                                item.strFormatDate = obj.data.items[i].data.strFormatDate.substring(5, 8);
                                item.TOTAL_1 = obj.data.items[i].data.TOTALCOM_1 + obj.data.items[i].data.TOTALCOM_2;
                                item.TOTAL_2 = -(obj.data.items[i].data.T_DIFF_2 + obj.data.items[i].data.T_DIFF_3);
                                dataGrafico.push(item);
                                if (i === 0) {
                                    var item2 = {};
                                    item2.TOTAL = obj.data.items[i].data.totTOTALCOM_1 + obj.data.items[i].data.totTOTALCOM_2;
                                    item2.LABEL = 'Total Paid, ' + Ext.util.Format.number(item2.TOTAL, '0,000');
                                    item2.TOOLTIP = 'Total Paid, ' + Ext.util.Format.number(item2.TOTAL * 100 /
                                            (item2.TOTAL - (obj.data.items[i].data.totT_DIFF_2 + obj.data.items[i].data.totT_DIFF_3)), '0.00') + '%';
                                    dataGrafico2.push(item2);
                                    item2 = {};
                                    item2.TOTAL = -(obj.data.items[i].data.totT_DIFF_2 + obj.data.items[i].data.totT_DIFF_3);
                                    item2.LABEL = 'Total Receivable, ' + Ext.util.Format.number(item2.TOTAL, '0,000');
                                    item2.TOOLTIP = 'Total Receivable, ' + Ext.util.Format.number(item2.TOTAL * 100 /
                                            (obj.data.items[i].data.totTOTALCOM_1 + obj.data.items[i].data.totTOTALCOM_2 + item2.TOTAL), '0.00') + '%';
                                    dataGrafico2.push(item2);
                                }
                            }
                            var storeDataGrafico = Ext.create('Ext.data.Store', {
                                data: dataGrafico,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-grafico01').bindStore(storeDataGrafico);
                            var storeDataGrafico2 = Ext.create('Ext.data.Store', {
                                data: dataGrafico2,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-grafico02').bindStore(storeDataGrafico2);

                        }
//                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataAirport').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    onGridDetMain: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxMainDataPriDet';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetMain.SDATE = rowData.data.SDATE;
        this.beanDetMain.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetMain.IN_AUTHNBR = rowData.data.IN_AUTHNBR;
        this.beanDetMain.IN_FTE = rowData.data.IN_FTE;
        this.beanDetMain.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDetMain.IN_CARDN1 = rowData.data.IN_CARDN1;
        this.beanDetMain.IN_CARDN2 = rowData.data.IN_CARDN2;
        this.beanDetMain.IN_BANK = rowData.data.IN_FTE;
        this.beanDetMain.IN_PNR = rowData.data.IN_BANK;
        this.beanDetMain.IN_FECHA_FROM = rowData.data.IN_FECHA_FROM;
        this.beanDetMain.IN_FECHA_TO = rowData.data.IN_FECHA_TO;
        this.beanDetMain.strFormatDate = rowData.data.strFormatDate;
        this.beanDetMain.CURRENPAY = rowData.data.CURRENPAY;
        this.beanDetMain.strTitulo = rowData.data.strTitulo;
        console.log(this.beanDetMain);


        me.paramsDetail.beanString = JSON.stringify(this.beanDetMain);
        this.setGridDataDetMain();
    },
    setGridDataDetMain: function() {
        win.lblUser_toolTip("Estructura: A2340");

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchMainDet'
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
                            Ext.getCmp(prototype.id + '-gridDataAirportDet').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                            console.log(data);
                        }
                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDataAirportDet').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    onGridDetPri: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        if (rowData.data.QTYTKT_1 > 0 || rowData.data.QTYTKT_2 > 0 ||
                rowData.data.QTYTKT_3 > 0 || rowData.data.QTYTKT_5 > 0 ||
                rowData.data.QTYTKT_8 > 0 || rowData.data.QTYDOCS > 0 || rowData.data.QTYDOCR > 0) {

            switch (columnNum) {
                case 3 :
                    rowData.data.STVAL = '1';
                    break;
                case 6 :
                    rowData.data.STVAL = '6';
                    break;
                case 7 :
                    rowData.data.STVAL = '2';
                    break;
                case 11 :
                    rowData.data.STVAL = '3';
                    break;
                case 15 :
                    rowData.data.STVAL = '5';
                    break;
            }

            this.beanDetPri.IN_FECHA_FROM = rowData.data.IN_FECHA_FROM;
            this.beanDetPri.IN_FECHA_TO = rowData.data.IN_FECHA_TO;
            this.beanDetPri.SDATE = rowData.data.SDATE;
            this.beanDetPri.IN_TDOC = rowData.data.IN_TDOC;
            this.beanDetPri.IN_AUTHNBR = rowData.data.IN_AUTHNBR;
            this.beanDetPri.IN_FTE = rowData.data.IN_FTE;
            this.beanDetPri.STVAL = rowData.data.STVAL;
            this.beanDetPri.IN_CARDN1 = rowData.data.IN_CARDN1;
            this.beanDetPri.IN_CARDN2 = rowData.data.IN_CARDN2;
            this.beanDetPri.IN_BANK = rowData.data.IN_BANK;
            this.beanDetPri.IN_PNR = rowData.data.IN_PNR;
            this.beanDetPri.IN_STVAL = rowData.data.IN_STVAL;
            this.beanDetPri.strTitulo = rowData.data.strTitulo;
            console.log(this.beanDetPri);

            me.paramsDetail.beanString = JSON.stringify(this.beanDetPri);
            this.setGridDataDetPri();
        }
        else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    onGridDetPri2: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        if (rowData.data.QTYTKT_1 > 0 || rowData.data.QTYTKT_2 > 0 ||
                rowData.data.QTYTKT_3 > 0 || rowData.data.QTYTKT_5 > 0 ||
                rowData.data.QTYTKT_8 > 0 || rowData.data.QTYDOCS > 0 || rowData.data.QTYDOCR > 0) {

            switch (columnNum) {
                case 2 :
                    rowData.data.STVAL = '1';
                    break;
                case 5 :
                    rowData.data.STVAL = '6';
                    break;
                case 6 :
                    rowData.data.STVAL = '2';
                    break;
                case 10 :
                    rowData.data.STVAL = '3';
                    break;
                case 14 :
                    rowData.data.STVAL = '5';
                    break;
                case 15 :
                    rowData.data.STVAL = '8';
                    break;
                case 16 :
                    rowData.data.STVAL = 'AP';
                    break;
                case 17 :
                    rowData.data.STVAL = 'AO';
                    break;
                case 18 :
                    rowData.data.STVAL = 'AC';
                    break;
            }

            this.beanDetPri2.IN_FECHA_FROM = rowData.data.IN_FECHA_FROM;
            this.beanDetPri2.IN_FECHA_TO = rowData.data.IN_FECHA_TO;
            this.beanDetPri2.SDATE = rowData.data.SDATE;
            this.beanDetPri2.IN_TDOC = rowData.data.IN_TDOC;
            this.beanDetPri2.IN_AUTHNBR = rowData.data.IN_AUTHNBR;
            this.beanDetPri2.IN_FTE = rowData.data.IN_FTE;
            this.beanDetPri2.STVAL = rowData.data.STVAL;
            this.beanDetPri2.IN_CARDN1 = rowData.data.IN_CARDN1;
            this.beanDetPri2.IN_CARDN2 = rowData.data.IN_CARDN2;
            this.beanDetPri2.IN_BANK = rowData.data.IN_BANK;
            this.beanDetPri2.IN_PNR = rowData.data.IN_PNR;
            this.beanDetPri2.IN_STVAL = rowData.data.IN_STVAL;
            this.beanDetPri2.strTitulo = rowData.data.strTitulo;
            console.log(this.beanDetPri2);

            me.paramsDetail.beanString = JSON.stringify(this.beanDetPri2);
            this.setGridDataDetPri();
        }
        else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridDataDetPri: function() {
        win.lblUser_toolTip("Estructura: A2340");
        me.setWidthPie();
        this.setFormatParameter();
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
                        obj.proxy.extraParams = me.paramsDetail;
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
                            Ext.getCmp(prototype.id + '-gridMainData').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                            console.log(data);
                        }
                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        }
    },
    onGridDet: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetTkt';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        if (rowData.data.QTYTKT > 0) {

            this.beanDet.SDATEVTA = rowData.data.SDATEVTA;
            this.beanDet.TDOC = rowData.data.TDOC;
            this.beanDet.SAUTHOC = rowData.data.SAUTHOC;
            this.beanDet.FTE = rowData.data.FTE;
            this.beanDet.SCARDN = rowData.data.SCARDN;
            this.beanDet.NAID = rowData.data.NAID;
            this.beanDet.STVAL = rowData.data.STVAL;
            this.beanDet.SPNR = rowData.data.SPNR;
            this.beanDet.CODEBANK = rowData.data.CODEBANK;
            this.beanDet.IN_FECHA_FROM = rowData.data.IN_FECHA_FROM;
            this.beanDet.IN_FECHA_TO = rowData.data.IN_FECHA_TO;
            this.beanDet.strDescStatus = rowData.data.strDescStatus;
            this.beanDet.strDescCard = rowData.data.strDescCard;
            this.beanDet.strSCARF = rowData.data.strSCARF;
            this.beanDet.strTitulo = rowData.data.strTitulo;
            console.log(this.beanDet);

            me.paramsDetail.beanString = JSON.stringify(this.beanDet);
            this.setGridDataDet();
        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }
    },
    setGridDataDet: function() {
        console.log('Hola');
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
                    url: prototype.url + '/searchDet'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function(obj) {
                        console.log(obj);
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
                            Ext.getCmp(prototype.id + '-gridDetTkt').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
//                        me.setWidthPie();
                          Ext.getCmp(prototype.id + '-pie').setVisible(false);
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetTkt').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
        }
    },
    on_VIEWTKT_clickHandler: function(strTkt) {
        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
        beanProMasterTicket.IN_SEQ = '00';
        console.log(beanProMasterTicket.IN_CIA);
        console.log(beanProMasterTicket.IN_FORMA);
        console.log(beanProMasterTicket.IN_SERIE);


        win.displayProMasterTicket(this, 'ViewDOT', beanProMasterTicket);
    },
    imgByTDOC_clickHandler: function() {
//        this.btnSearch_click();
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

        Ext.create('Ext.Praxis.view.payments.IntalmentSalesForm.DataEntry', {
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
    btneventKey_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-txtMERCHN').setValue('');
        Ext.getCmp(prototype.id + '-txtCard1').setValue('');
        Ext.getCmp(prototype.id + '-txtCard2').setValue('');
        Ext.getCmp(prototype.id + '-cmbIN_FTE').setValue('');
    },
    btnExcel_click: function(obj, e) {

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
            case  '-boxMainDataPriDet':
                global.getFile(prototype.url + '/getXLSXDos?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxMainData':
                global.getFile(prototype.url + '/getXLSXTres?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxDetTkt':
                global.getFile(prototype.url + '/getXLSXCuatro?beanString=' + me.paramsDetail.beanString);
                break;
        }
    },
    btnTicketExcel_click: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Export to excel? MAY DELAY SOME MINUTES',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    if (rowData.data.QTYTKT_1 !== 0 || rowData.data.QTYTKT_2 !== 0 ||
                            rowData.data.QTYTKT_3 !== 0 || rowData.data.QTYTKT_5 !== 0) {
                        this.setFormatParameter();

                        switch (columnNum) {
                            case 3 :
                                rowData.data.STVAL = '1';
                                break;
                            case 7 :
                                rowData.data.STVAL = '2';
                                break;
                            case 11 :
                                rowData.data.STVAL = '3';
                                break;
                        }

                        this.beanTKTexcel.IN_FECHA_FROM = rowData.data.IN_FECHA_FROM;
                        this.beanTKTexcel.IN_FECHA_TO = rowData.data.IN_FECHA_TO;
                        this.beanTKTexcel.SDATE = rowData.data.SDATE;
                        this.beanTKTexcel.IN_TDOC = rowData.data.IN_TDOC;
                        this.beanTKTexcel.IN_AUTHNBR = rowData.data.IN_AUTHNBR;
                        this.beanTKTexcel.IN_FTE = rowData.data.IN_FTE;
                        this.beanTKTexcel.IN_CARDN1 = rowData.data.IN_CARDN1;
                        this.beanTKTexcel.IN_CARDN2 = rowData.data.IN_CARDN2;
                        this.beanTKTexcel.STVAL = rowData.data.STVAL;
                        this.beanTKTexcel.IN_BANK = rowData.data.IN_BANK;
                        this.beanTKTexcel.IN_PNR = rowData.data.IN_PNR;
                        this.beanTKTexcel.IN_STVAL = rowData.data.IN_STVAL;
                        this.beanTKTexcel.strDescStatus = rowData.data.strDescStatus;
                        this.beanTKTexcel.strDescCard = rowData.data.strDescCard;
                        searchParams.beanString = JSON.stringify(this.beanTKTexcel);
                        Ext.Msg.show({
                            title: '.:PRAXIS:.',
                            msg: 'Export to excel?',
                            buttons: Ext.MessageBox.OKCANCEL,
                            scope: this,
                            icon: Ext.MessageBox.QUESTION,
                            modal: true,
                            fn: function(btn) {
                                if (btn === 'ok') {
                                    this.exportTicketExcel();
                                }
                            }
                        });

                    } else {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
    },
    btnTicketExcel_click2: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Export to excel? MAY DELAY SOME MINUTES',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    if (rowData.data.QTYTKT_1 !== 0 || rowData.data.QTYTKT_2 !== 0 ||
                            rowData.data.QTYTKT_3 !== 0 || rowData.data.QTYTKT_5 !== 0) {
                        this.setFormatParameter();

                        switch (columnNum) {
                            case 4 :
                                rowData.data.STVAL = '1';
                                break;
                            case 8 :
                                rowData.data.STVAL = '2';
                                break;
                            case 12 :
                                rowData.data.STVAL = '3';
                                break;
                            case 16 :
                                rowData.data.STVAL = '5';
                                break;
                        }

                        this.beanTKTexcel.IN_FECHA_FROM = rowData.data.IN_FECHA_FROM;
                        this.beanTKTexcel.IN_FECHA_TO = rowData.data.IN_FECHA_TO;
                        this.beanTKTexcel.SDATE = rowData.data.SDATE;
                        this.beanTKTexcel.IN_TDOC = rowData.data.IN_TDOC;
                        this.beanTKTexcel.IN_AUTHNBR = rowData.data.IN_AUTHNBR;
                        this.beanTKTexcel.IN_FTE = rowData.data.IN_FTE;
                        this.beanTKTexcel.IN_CARDN1 = rowData.data.IN_CARDN1;
                        this.beanTKTexcel.IN_CARDN2 = rowData.data.IN_CARDN2;
                        this.beanTKTexcel.STVAL = rowData.data.STVAL;
                        this.beanTKTexcel.IN_BANK = rowData.data.IN_BANK;
                        this.beanTKTexcel.IN_PNR = rowData.data.IN_PNR;
                        this.beanTKTexcel.IN_STVAL = rowData.data.IN_STVAL;
                        this.beanTKTexcel.strDescStatus = rowData.data.strDescStatus;
                        this.beanTKTexcel.strDescCard = rowData.data.strDescCard;
                        me.paramsDetail.beanString = JSON.stringify(this.beanTKTexcel);
                        Ext.Msg.show({
                            title: '.:PRAXIS:.',
                            msg: 'Export to excel?',
                            buttons: Ext.MessageBox.OKCANCEL,
                            scope: this,
                            icon: Ext.MessageBox.QUESTION,
                            modal: true,
                            fn: function(btn) {
                                if (btn === 'ok') {
                                    this.exportTicketExcel();
                                }
                            }
                        });

                    } else {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
    },
    exportTicketExcel: function() {

        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/searchDetTicketExcel?beanString=' + searchParams.beanString);
                break;
            case  '-boxMainDataPriDet':
                global.getFile(prototype.url + '/searchDetTicketExcel?beanString=' + me.paramsDetail.beanString);
                break;
        }

    },
    onDownloadFile: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function(response, options) {
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
            case '-boxMainDataPriDet':
                me.pagginActual = '-paggin2';
                break;
            case '-boxMainData':
                me.pagginActual = '-paggin3';
                break;
            case '-boxDetTkt':
                me.pagginActual = '-paggin4';
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