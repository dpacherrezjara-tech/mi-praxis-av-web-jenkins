/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.BankReconciCommis.BankReconciCommisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BankReconciCommisController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanDay: {},
    beanDetTran: {},
    beanDetCard: {},
    beanBank: {},
    beanTkt: {},
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
        prototype.id = 'BankReconciCommisForm';
        prototype.url = CONTEXTPATH + '/BankReconciCommis';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#BankReconciCommisForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#BankReconciCommisForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#BankReconciCommisForm-btnClear': {
                click: this.btnClear_click
            },
            '#BankReconciCommisForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#BankReconciCommisForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#BankReconciCommisForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#BankReconciCommisForm-btnBack': {
                click: this.btnBack_click
            },
            '#BankReconciCommisForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#BankReconciCommisForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#BankReconciCommisForm-btn-pag-next': {
                click: this.pagNext
            },
            '#BankReconciCommisForm-btn-pag-last': {
                click: this.pagLast
            },
            '#BankReconciCommisForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#BankReconciCommisForm-cmbDateFromMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#BankReconciCommisForm-cmbDateToMonth': {
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


        var cmbSTVAL = Ext.getCmp(prototype.id + '-cmbSTVAL');
        cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All "],
                ["1", "Match"],
                ["2", "Settlement w/o Bank Account"],
                ["3", "Bank Account w/o Settlement"],
                ["4", "MATCH Difference"],
                ["R", "RFND"]
            ]
        }));
        cmbSTVAL.setValue("");

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

        me.bean.IN_STVAL = Ext.getCmp(prototype.id + '-cmbSTVAL').getValue();
        me.bean.IN_CODEBANK = Ext.getCmp(prototype.id + '-cmbBank').getValue();
        me.bean.IN_MERCHN = Ext.getCmp(prototype.id + '-txtMerchant').getValue();
        
        
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
        win.lblUser_toolTip("Estructura: A2345");
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
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
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
//                            var data = obj.data.items[0].data;
                        }
//                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataAirport').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-grafico01').bindStore(storeGridDatas);
        }
    },

    onGridDetDay: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

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
    
    setGridDataDetDay: function () {
        
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

    onGridDetTran: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        
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
    
    setParamsDetail: function(){
        var paramsDetail = {};
        paramsDetail.beanString = JSON.stringify(this.beanDetTran);
        return paramsDetail;
    },

    setGridDetTran: function () {
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
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.setParamsDetail();
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

    onGridDetCard: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        
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

    setGridDetCard: function () {
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

    onGridDetTkt: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        
        var flagStatus = '';
        
        if (rowData.data.lngQTYDOC > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxDetTicket';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            
            if(rowData.data.IN_STVAL !== "" || rowData.data.IN_BSTVAL !== ""){
                flagStatus = 'S';
            }else{
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

    setGridDetTkt: function () {
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

    imgByTDOC_clickHandler: function () {
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

        win.displayProMasterTicket(this, 'ViewBankReconciCommis', beanProMasterTicket);
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

        Ext.create('Ext.Praxis.view.payments.BankReconciCommisForm.DataEntry', {
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
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbSTVAL').setValue('');
        Ext.getCmp(prototype.id + '-cmbBank').setValue('');
        Ext.getCmp(prototype.id + '-txtMerchant').setValue('');
    },
    btnExcel_click: function (obj, e) {

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
            case  '-boxDetDay':
                global.getFile(prototype.url + '/getXLSXDay?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxDetTran':
                global.getFile(prototype.url + '/getXLSXTran?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxDetCard':
                global.getFile(prototype.url + '/getXLSXCard?beanString=' + me.paramsDetail.beanString);
                break;
//            case  '-boxDetTicket':
//                global.getFile(prototype.url + '/getXLSXTicket?beanString=' + me.paramsDetail.beanString);
//                break;
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
        if(me.panelActual === '-panelGridData' || me.panelActual === '-boxDetDay'){
            Ext.getCmp(prototype.id + '-pie').setVisible(false);
        }else{
            Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
            Ext.getCmp(prototype.id + '-pie').setVisible(true);
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case '-boxDetDay':
                me.pagginActual = '-paggin2';
                break;
            case '-boxDetTran':
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