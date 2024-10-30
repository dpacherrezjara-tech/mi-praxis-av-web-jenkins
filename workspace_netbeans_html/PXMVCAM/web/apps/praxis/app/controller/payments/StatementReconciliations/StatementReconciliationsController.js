Ext.define('Ext.Praxis.controller.payments.StatementReconciliations.StatementReconciliationsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StatementReconciliationsController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanBank: {},
    beanDay: {},
    beanDayByS: {},
    beanLiquida: {},
    beanLiquidaDate: {},
    beanLiquidaByS: {},
    beanDetails: {},
    beanDetBankByS: {},
    beanDetCross: {},
    beanPendings: {},
    beanProceLiqByS: {},
    beanLiqDetail: {},
    beanDayLiqByS: {},
    beanDetailLiqByS: {},
    paginActual: '',
    recGlobal: '',  
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    fileLIQvsEC: '',
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
//          -------------------Eventos Genericos --------------------
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
                select: this.selectComboFromYear
            },
            '#StatementReconciliationsForm-cmbDateToYear': {
                select: this.selectComboToYear
            },
            '#StatementReconciliationsForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#StatementReconciliationsForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#StatementReconciliationsForm-cmbDateDay': {
                select: this.selectComboFromDay
            },
            '#StatementReconciliationsForm-cmbDateToDay': {
                select: this.selectComboToDay
            },
            '#StatementReconciliationsForm-cmbCOREP': {
                select: this.selectCombocmbCOREP
            },
            '#StatementReconciliationsForm-cmbBank': {
                select: this.selectCombocmbBank
            }

        });
    },
    xpanel_afterrender: function (obj, e) {
        $('#StatementReconciliationsForm-btnToggleSwitchFT').change(function () {
            me.procesador();
        });

        this.obtainData();
    },
    procesador: function () {
        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            Ext.getCmp(prototype.id + '-TEST').show();
        } else {
            Ext.getCmp(prototype.id + '-TEST').hide();
        }
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

        Ext.getCmp(prototype.id + '-cmbDateDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");


        var cmbDateSel = Ext.getCmp(prototype.id + '-cmbDateSel');
        cmbDateSel.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["VALDATE", "Payment Date"],
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
        this.dataObtain.COUNTRY = 2;
        this.dataObtain.COREP = 2;


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

                var lstCountry = res.lstCountry;
                var storeDataCountry = Ext.create('Ext.data.Store', {
                    data: lstCountry,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeDataCountry);
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

                var lstProcessor = res.lstProcessor;
                var storeDataProcessor = Ext.create('Ext.data.Store', {
                    data: lstProcessor,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCOREP').bindStore(storeDataProcessor);
                Ext.getCmp(prototype.id + '-cmbCOREP').setValue('');


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
        me.bean.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();

        me.bean.IN_DATE = Ext.getCmp(prototype.id + '-cmbDateSel').getValue();
        me.bean.IN_MERCHN = Ext.getCmp(prototype.id + '-txtLiquida').getValue();
        me.bean.IN_AFTE = Ext.getCmp(prototype.id + '-cmbEFTE').getValue();
        me.bean.IN_TTRAN = Ext.getCmp(prototype.id + '-cmbTTRAN').getValue();

        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_BANK = Ext.getCmp(prototype.id + '-cmbBank').getValue();
        me.bean.IN_COREP = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();

        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            me.bean.IN_EXT = 'N';
        } else {
            me.bean.IN_EXT = 'Y';
        }

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },

    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
        if (Ext.getCmp(prototype.id + '-txtBANDOC').getValue() !== '' || Ext.getCmp(prototype.id + '-cmbDateDay').getValue() !== ''
                || Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() !== '' || Ext.getCmp(prototype.id + '-cmbStatus').getValue() !== '') {
            this.btnSearch_BANDOC();
        } else {
            this.setGridData();
        }


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
    onGridDetProceLIQByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        var cant = 0;
        switch (columnNum) {
            case 8:
                console.log('ENTRA AL MATCH');
                rowData.data.IN_STVAL = "1";
                cant = rowData.data.lngQTMATCH;
                break;
            case 10:
                console.log('ENTRA AL MANUAL');
                rowData.data.IN_STVAL = "5";
                cant = rowData.data.lngQTMANUAL;
                break;
            case 11:
                console.log('ENTRA AL PEND');
                rowData.data.IN_STVAL = "3";
                cant = rowData.data.lngQTPEND;
                break;
        }

        if (cant > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDetProceLIQ';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanProceLiqByS.IN_DATE = rowData.data.SDATE;
            this.beanProceLiqByS.strFormatDate = rowData.data.strFormatDate;
            this.beanProceLiqByS.IN_BANK = rowData.data.IN_CBANK;
            this.beanProceLiqByS.IN_STVAL = rowData.data.IN_STVAL;
            this.beanProceLiqByS.IN_COUNTRY = rowData.data.IN_COUNTRY;
            this.beanProceLiqByS.IN_TDOC = rowData.data.IN_TDOC;
            this.beanProceLiqByS.IN_COREP = rowData.data.IN_COREP;

            let proces = Ext.getCmp(prototype.id + '-TEST');
            if (!proces.isVisible()) {
                this.beanProceLiqByS.IN_EXT = 'N';
            } else {
                this.beanProceLiqByS.IN_EXT = 'Y';
            }

            me.paramsDetail.beanString = JSON.stringify(this.beanProceLiqByS);

            this.setGridDataDetProceLIQByS();

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }

    },
    setGridDataDetProceLIQByS: function () {
        win.lblUser_toolTip("Estructura: MPF060");

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetProceLiq'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin14');
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

                            Ext.getCmp(prototype.id + '-gridDataDetProceLIQ').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetProceLIQ').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin14').bindStore(storeGridDatas);
        }
    },
    onViewClickLiqDetail: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDetLiqDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanLiqDetail.IN_DATE = rowData.data.SDATE;
        this.beanLiqDetail.strFormatDate = rowData.data.strFormatDate;
        this.beanLiqDetail.IN_BANK = rowData.data.IN_BANK;
        this.beanLiqDetail.IN_STVAL = '3';
        this.beanLiqDetail.IN_COUNTRY = rowData.data.IN_COUNTRY;
        this.beanLiqDetail.IN_TDOC = rowData.data.IN_TDOC;
        this.beanLiqDetail.IN_COREP = rowData.data.IN_COREP;

        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            this.beanLiqDetail.IN_EXT = 'N';
        } else {
            this.beanLiqDetail.IN_EXT = 'Y';
        }

        me.paramsDetail.beanString = JSON.stringify(this.beanLiqDetail);

        this.setGridDataDetLiqDetail();
    },

    setGridDataDetLiqDetail: function () {
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
                    url: prototype.url + '/searchDetLiqDetail'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin17');
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
                            Ext.getCmp(prototype.id + '-gridDataDetLiqDetail').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetLiqDetail').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin17').bindStore(storeGridDatas);
        }
    },
    onGridDetBank: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetProce';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanBank.IN_TDOC = rowData.data.IN_TDOC;
        this.beanBank.IN_DATE = rowData.data.IN_DATE;
        this.beanBank.IN_SDATE = rowData.data.SDATE;
        this.beanBank.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanBank.IN_BANK = rowData.data.IN_BANK;
        this.beanBank.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanBank.IN_COUNTRY = rowData.data.IN_COUNTRY;
        this.beanBank.strFormatDate = rowData.data.strFormatDate;
        this.beanBank.IN_COREP = rowData.data.IN_COREP;

        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            this.beanBank.IN_EXT = 'N';
        } else {
            this.beanBank.IN_EXT = 'Y';
        }

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
                        var pag = Ext.getCmp(prototype.id + '-paggin12');
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

                            Ext.getCmp(prototype.id + '-gridDetProce').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetProce').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin12').bindStore(storeGridDatas);
        }
    },

    onGridDetDay: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetDay';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.beanDay.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDay.IN_DATE = rowData.data.IN_DATE;
        this.beanDay.IN_SDATEE = rowData.data.IN_SDATE;
        this.beanDay.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDay.IN_CBANK = rowData.data.CBANK == '**' ? this.beanDay.IN_CBANK = rowData.data.CBANK : this.beanDay.IN_CBANK = rowData.data.IN_CBANK;
        this.beanDay.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanDay.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanDay.IN_COUNTRY = rowData.data.SCOUNTRY;
        this.beanDay.IN_COREP = rowData.data.COREP;
        this.beanDay.strFormatDate = rowData.data.strFormatDate;
        this.beanDay.strCREJEC = rowData.data.strCREJEC;
        this.beanDay.strDescripcion = rowData.data.strDescripcion;
        this.beanDay.strDescripcionSCOUNTRY = rowData.data.strDescripcionSCOUNTRY;
        this.beanDay.strDescripcionCOREP = rowData.data.strDescripcionCOREP;
        
        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            this.beanDay.IN_EXT = 'N';
        } else {
            this.beanDay.IN_EXT = 'Y';
        }
        
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

    onGridDetDayProcLIQByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDetDayProcLIQByS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDayLiqByS.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDayLiqByS.IN_DATE = rowData.data.IN_DATE;
        this.beanDayLiqByS.IN_CBANK = rowData.data.CBANK;
        this.beanDayLiqByS.IN_COUNTRY = rowData.data.SCOUNTRY;
        this.beanDayLiqByS.IN_COREP = rowData.data.COREP;
        this.beanDayLiqByS.IN_SCURRENCY = rowData.data.SCURRENCY;
        this.beanDayLiqByS.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDayLiqByS.strFormatDate = rowData.data.strFormatDate;
        this.beanDayLiqByS.strDescripcion = rowData.data.strDescripcion;
        this.beanDayLiqByS.strDescripcionSCOUNTRY = rowData.data.strDescripcionSCOUNTRY;
        this.beanDayLiqByS.strDescripcionCOREP = rowData.data.strDescripcionCOREP;
        
        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            this.beanDayLiqByS.IN_EXT = 'N';
        } else {
            this.beanDayLiqByS.IN_EXT = 'Y';
        }
        
        me.paramsDetail.beanString = JSON.stringify(this.beanDayLiqByS);

        this.setGridDataDetDayProcLIQByS();
    },

    setGridDataDetDayProcLIQByS: function () {
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
                    url: prototype.url + '/searchDetDayProcLIQByS'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin15');
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
                            Ext.getCmp(prototype.id + '-lblTittleProcLIQByS').setText(data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDayProcLIQByS').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin15').bindStore(storeGridDatas);
        }
    },

    onGridDetLiquida: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetLiquida';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanLiquidaDate.IN_TDOC = rowData.data.IN_TDOC;
        this.beanLiquidaDate.IN_DATE = rowData.data.IN_DATE;
        this.beanLiquidaDate.IN_SDATE = rowData.data.SDATE;
        this.beanLiquidaDate.IN_CBANK = rowData.data.IN_CBANK;
        this.beanLiquidaDate.IN_STVAL = "";
        this.beanLiquidaDate.IN_MERCHN = rowData.data.IN_MERCHN;
        this.beanLiquidaDate.IN_SDATEE = rowData.data.IN_SDATEE;
        this.beanLiquidaDate.IN_TTRAN = rowData.data.IN_TTRAN;
        this.beanLiquidaDate.IN_QTYTRAN1 = rowData.data.QTYTRAN1;
        this.beanLiquidaDate.strFormatDate = rowData.data.strFormatDate;
        this.beanLiquidaDate.strCREJEC = rowData.data.strCREJEC;
        this.beanLiquidaDate.IN_COUNTRY = rowData.data.IN_COUNTRY;
        this.beanLiquidaDate.IN_COREP = rowData.data.IN_COREP;
        this.beanLiquidaDate.strDescripcion = rowData.data.strDescripcion;
        this.beanLiquidaDate.strDescripcionSCOUNTRY = rowData.data.strDescripcionSCOUNTRY;
        this.beanLiquidaDate.strDescripcionCOREP = rowData.data.strDescripcionCOREP;
        
        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            this.beanLiquidaDate.IN_EXT = 'N';
        } else {
            this.beanLiquidaDate.IN_EXT = 'Y';
        }
        
        me.paramsDetail.beanString = JSON.stringify(this.beanLiquidaDate);
        this.setGridDataDetLiquida();
    },

    onGridDetLiquidaStvalDrill: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetLiquida';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanLiquida.IN_DATE = rowData.data.IN_DATE;
        this.beanLiquida.IN_TDOC = rowData.data.IN_TDOC;
        this.beanLiquida.IN_STVAL = rowData.data.IN_STVAL;
        this.beanLiquida.IN_SDATE = rowData.data.SDATE;
        this.beanLiquida.IN_SDATEE = rowData.data.IN_SDATEE;
        this.beanLiquida.IN_CBANK = rowData.data.IN_CBANK;
        this.beanLiquida.IN_SCURRENCY = rowData.data.SCURRENCY;
        this.beanLiquida.IN_COUNTRY = rowData.data.IN_COUNTRY;
        this.beanLiquida.IN_COREP = rowData.data.IN_COREP;
        this.beanLiquida.strDescripcion = rowData.data.strDescripcion;
        this.beanLiquida.strDescripcionSCOUNTRY = rowData.data.strDescripcionSCOUNTRY;
        this.beanLiquida.strDescripcionCOREP = rowData.data.strDescripcionCOREP;

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
                            win.setText('lblTittleByLiquidaS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetLiquida').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
        }
    },
    onGridDetLiquidaByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        var cant = 0;
        switch (columnNum) {
            case 1:
                console.log('ENTRA AL MATCH');
                rowData.data.IN_STVAL = "1";
                cant = rowData.data.lngQMATCH;
                break;
            case 2:
                console.log('ENTRA AL DIFF');
                rowData.data.IN_STVAL = "5";
                cant = rowData.data.lngQDIFF;
                break;
            case 4:
                console.log('ENTRA AL PEND');
                rowData.data.IN_STVAL = "P";
                cant = rowData.data.lngQPEND;
                break;
        }

        if (cant > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-boxDetLiquidaByS';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanLiquidaByS.IN_DATE = rowData.data.IN_DATE;
            this.beanLiquidaByS.IN_SDATE = rowData.data.SDATE;
            this.beanLiquidaByS.IN_CBANK = rowData.data.IN_CBANK;
            this.beanLiquidaByS.IN_SDATEE = rowData.data.IN_SDATEE;
            this.beanLiquidaByS.IN_STVAL = rowData.data.IN_STVAL;
            this.beanLiquidaByS.IN_COUNTRY = rowData.data.IN_COUNTRY;
            this.beanLiquidaByS.IN_COREP = rowData.data.IN_COREP;
            this.beanLiquidaByS.strDescripcion = rowData.data.strDescripcion
            this.beanLiquidaByS.strDescripcionSCOUNTRY = rowData.data.strDescripcionSCOUNTRY
            this.beanLiquidaByS.strDescripcionCOREP = rowData.data.strDescripcionCOREP

            me.paramsDetail.beanString = JSON.stringify(this.beanLiquidaByS);
            this.setGridDataDetLiquidaByS();

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }

    },
    setGridDataDetLiquidaByS: function () {
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
                    url: prototype.url + '/searchDetLiquidaByS'
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
                            var data = obj.data.items[0].data;
                            Ext.getCmp(prototype.id + '-gridDetLiquidaByS').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetLiquidaByS').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);
        }
    },

    onGridDetDetails: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        if (rowData.data.STVAL != 'Match' && rowData.data.STVAL != 'Match Manual') {
            return false
        }
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetDetails';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetails.BANDOC = rowData.data.BANDOC;
        this.beanDetails.VALDATE = rowData.data.VALDATE;
        this.beanDetails.SCOUNTRY = rowData.data.SCOUNTRY;
        this.beanDetails.CODEBANK = rowData.data.CODEBANK;
        this.beanDetails.strCREJEC = rowData.data.strCREJEC;
        this.beanDetails.strTitulo = "Bank : " + this.beanDetails.CODEBANK + " - Bandoc : " + this.beanDetails.BANDOC;
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
    onGridDetDetailProceByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDetDetailProceByS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDetailLiqByS.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetailLiqByS.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDetailLiqByS.IN_SDATE = rowData.data.SDATE;
        this.beanDetailLiqByS.IN_CBANK = rowData.data.IN_CBANK;
        this.beanDetailLiqByS.IN_SCURRENCY = rowData.data.SCURRENCY;
        this.beanDetailLiqByS.IN_COUNTRY = rowData.data.IN_COUNTRY;
        this.beanDetailLiqByS.IN_COREP = rowData.data.IN_COREP;
        this.beanDetailLiqByS.strDescripcion = rowData.data.strDescripcion;
        this.beanDetailLiqByS.strDescripcionSCOUNTRY = rowData.data.strDescripcionSCOUNTRY;
        this.beanDetailLiqByS.strDescripcionCOREP = rowData.data.strDescripcionCOREP;

        me.paramsDetail.beanString = JSON.stringify(this.beanDetailLiqByS);

        this.setGridDataDetDetailProceByS();
    },

    setGridDataDetDetailProceByS: function () {
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
                    url: prototype.url + '/searchDetDetailProceByS'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin16');
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
                            Ext.getCmp(prototype.id + '-gridDataDetDetailProceByS').setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetDetailProceByS').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin16').bindStore(storeGridDatas);
        }
    },

    //<editor-fold defaultstate="collapsed" desc="onGridDetBankS">
    onGridDetBankS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        var cant = 0;
        let consultPath = '';
        let gridId = '';
        let panelId = '';
        let pagginId = '';
        switch (columnNum) {
            case 1:
                console.log('ENTRA AL MATCH');
                rowData.data.IN_STVAL = "1";
                cant = rowData.data.lngQMATCH;
                consultPath = 'searchDetBankByS';
                gridId = 'gridDataDetProceByS';
                panelId = 'panelGridDetProceByS';
                pagginId = 'paggin11';
                break;
            case 3:
                console.log('ENTRA AL MANUAL');
                rowData.data.IN_STVAL = "5";
                cant = rowData.data.lngQMANUAL;
                consultPath = 'searchDetBankByS';
                gridId = 'gridDataDetProceByS';
                panelId = 'panelGridDetProceByS';
                pagginId = 'paggin11';
                break;
            case 4:
                console.log('ENTRA AL PEND');
                rowData.data.IN_STVAL = "P";
                cant = rowData.data.lngQPEND;
                consultPath = 'searchDetBankByPend';
                panelId = 'panelGridDetProceByPend';
                gridId = 'gridDataDetProceByPend';
                pagginId = 'paggin13';
                break;
            case 6:
                console.log('ENTRA AL PEND1');
                rowData.data.IN_STVAL = "E";
                cant = rowData.data.lngQPEND1;
                consultPath = 'searchDetBankByPend';
                panelId = 'panelGridDetProceByPend';
                gridId = 'gridDataDetProceByPend';
                pagginId = 'paggin13';
                break;
        }

        if (cant > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = `-${panelId}`;

            me.flag = 'all';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.beanDetBankByS.IN_DATE = rowData.data.IN_DATE;
            this.beanDetBankByS.IN_TDOC = rowData.data.IN_TDOC;
            this.beanDetBankByS.IN_SDATE = rowData.data.SDATE;
            this.beanDetBankByS.IN_STVAL = rowData.data.IN_STVAL;
            this.beanDetBankByS.IN_SDATEE = rowData.data.IN_SDATE;
            this.beanDetBankByS.IN_BANK = rowData.data.IN_BANK;
            this.beanDetBankByS.IN_COUNTRY = rowData.data.IN_COUNTRY;
            this.beanDetBankByS.IN_COREP = rowData.data.IN_COREP;
            let proces = Ext.getCmp(prototype.id + '-TEST');
            if (!proces.isVisible()) {
                this.beanDetBankByS.IN_EXT = 'N';
            } else {
                this.beanDetBankByS.IN_EXT = 'Y';
            }

            me.paramsDetail.beanString = JSON.stringify(this.beanDetBankByS);
            this.setGridDataDetBankS(consultPath, gridId, pagginId);

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }

    },
    setGridDataDetBankS: function (consultPath, gridId, pagginId) {
        win.lblUser_toolTip("Estructura: MPF102");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + `/${consultPath}`
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + "-" + pagginId);
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
                        Ext.getCmp(prototype.id + `-${gridId}`).setTitle('<center style="font-size:12px;">' + data.strTitulo + '</center>');
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + "-" + gridId).bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + "-" + pagginId).bindStore(storeGridDatas);
    },
    onGridDetCountryByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

    },
    onGridDetDayBySS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDetDayByS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDayByS.IN_CBANK = rowData.data.CBANK == '**' ? this.beanDayByS.IN_CBANK = rowData.data.CBANK : this.beanDayByS.IN_CBANK = rowData.data.IN_CBANK;
        this.beanDayByS.IN_DATE = rowData.data.IN_DATE;
        this.beanDayByS.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDayByS.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDayByS.IN_SDATEE = rowData.data.IN_SDATE;
        this.beanDayByS.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDayByS.IN_SCURRENCY = rowData.data.SCURRENCY;
        this.beanDayByS.IN_COUNTRY = rowData.data.SCOUNTRY;
        this.beanDayByS.IN_COREP = rowData.data.COREP;

        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            this.beanDayByS.IN_EXT = 'N';
        } else {
            this.beanDayByS.IN_EXT = 'Y';
        }

        this.beanDayByS.strDescripcion = rowData.data.strDescripcion;
        this.beanDayByS.strDescripcionSCOUNTRY = rowData.data.strDescripcionSCOUNTRY;
        this.beanDayByS.strDescripcionCOREP = rowData.data.strDescripcionCOREP;
        me.paramsDetail.beanString = JSON.stringify(this.beanDayByS);
        this.setGridDataDetDayByS();
    },
    onGridDetDayByS: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        var cant = 0;

        switch (columnNum) {
            case 4:
                console.log('ENTRA AL MATCH');
                rowData.data.IN_STVAL = "1";
                cant = rowData.data.lngQMATCH;
                break;
            case 5:
                console.log('ENTRA AL DIFF');
                rowData.data.IN_STVAL = "5";
                cant = rowData.data.lngQDIFF;
                break;
            case 7:
                console.log('ENTRA AL PEND');
                rowData.data.IN_STVAL = "P";
                cant = rowData.data.lngQPEND;
                break;
        }
        if (cant > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDetDayByS'

            me.flag = 'all';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.beanDetBankByS.IN_DATE = rowData.data.IN_DATE;
            this.beanDetBankByS.IN_SDATE = rowData.data.IN_SDATE;
            this.beanDetBankByS.IN_TDOC = rowData.data.IN_TDOC;
            this.beanDetBankByS.IN_STVAL = rowData.data.IN_STVAL;
            this.beanDetBankByS.IN_SDATEE = rowData.data.IN_SDATE;
            this.beanDetBankByS.IN_CBANK = rowData.data.CBANK == '**' ? this.beanDetBankByS.IN_CBANK = rowData.data.CBANK : this.beanDetBankByS.IN_CBANK = rowData.data.IN_CBANK;
            this.beanDetBankByS.IN_COUNTRY = rowData.data.SCOUNTRY;
            this.beanDetBankByS.IN_COREP = rowData.data.COREP;
            this.beanDetBankByS.strDescripcion = rowData.data.strDescripcion;
            this.beanDetBankByS.strDescripcionSCOUNTRY = rowData.data.strDescripcionSCOUNTRY;
            this.beanDetBankByS.strDescripcionCOREP = rowData.data.strDescripcionCOREP;

            let proces = Ext.getCmp(prototype.id + '-TEST');
            if (!proces.isVisible()) {
                this.beanDetBankByS.IN_EXT = 'N';
            } else {
                this.beanDetBankByS.IN_EXT = 'Y';
            }

            me.paramsDetail.beanString = JSON.stringify(this.beanDetBankByS);
            this.setGridDataDetDayByS();

        } else {
            global.Msg({
                msg: 'Data not found.'
            });
        }

    },
    setGridDataDetDayByS: function ( ) {
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
                    url: prototype.url + '/searchDetDayByS'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin9');
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
                            win.setText('lblTittleByDayS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetDayByS').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin9').bindStore(storeGridDatas);
        }
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
    onGridDataCross: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        let qty = rowData.data.QTYTRAN1;
        if (qty > 0) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataCross';

            me.flag = 'all';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.beanDetCross.IN_VALDATE = rowData.data.VALDATE;
            this.beanDetCross.IN_CODEBANK = rowData.data.CODEBANK;
            this.beanDetCross.IN_MERCHAND = rowData.data.MERCHAND;

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
            if (Ext.getCmp(prototype.id + '-txtBANDOC').getValue() !== '' || Ext.getCmp(prototype.id + '-cmbDateDay').getValue() !== ''
                    || Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() !== '' || Ext.getCmp(prototype.id + '-cmbStatus').getValue() !== '') {
                this.btnSearch_BANDOC();
            } else {
                this.btnSearch_click();
            }

        }
    },
    btnSearch_BANDOC: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetDetails';
        global.selectedChild(this.childs, prototype.id + me.panelActual);

        this.beanDetails.strYearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        this.beanDetails.strMonthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        this.beanDetails.strDayFrom = Ext.getCmp(prototype.id + '-cmbDateDay').getValue();
        this.beanDetails.strYearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        this.beanDetails.strMonthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        this.beanDetails.strDayTo = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        this.beanDetails.IN_BANDOC = Ext.getCmp(prototype.id + '-txtBANDOC').getValue();
        this.beanDetails.IN_CODEBANK = Ext.getCmp(prototype.id + '-cmbBank').getValue();
        this.beanDetails.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();
        this.beanDetails.IN_STVAL = Ext.getCmp(prototype.id + '-cmbStatus').getValue();
        this.beanDetails.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        this.beanDetails.IN_COREP = Ext.getCmp(prototype.id + '-cmbCOREP').getValue()
        let proces = Ext.getCmp(prototype.id + '-TEST');
        if (!proces.isVisible()) {
            this.beanDetails.IN_EXT = 'N';
        } else {
            this.beanDetails.IN_EXT = 'Y';
        }
        me.paramsDetail.beanString = JSON.stringify(this.beanDetails);
        this.setGridDataDetBANDOC();
    },
    setGridDataDetBANDOC: function () {
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
        
        me.recGlobal = grid.getStore().getAt(rowIndex);
        
        if (rec.data.SCOUNTRY === 'CO' && rec.data.SCURRENCY === 'COP') {
            this.winDataEntry('U', rec);
        } else {
            this.winDataEntryEx('U', rec);
        }

    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.StatementReconciliationsForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry,
                controllerParent: me,
                panelActual : me.panelActual,
                paramsGrid : me.paramsDetail
            }
        }).show();
    },
    winDataEntryEx: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.StatementReconciliationsForm.DataEntryEx', {
            id: prototype.id + '-dataEntryEx',
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
        Ext.getCmp(prototype.id + '-txtBANDOC').setValue('');
        Ext.getCmp(prototype.id + '-cmbEFTE').setValue('');
        Ext.getCmp(prototype.id + '-cmbTDOC').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
        Ext.getCmp(prototype.id + '-cmbBank').setValue('');

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

        console.log('oeoeoeoe');
        console.log(me.panelActual);

        this.setFormatParameter();
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(searchParams.beanString));
                break;
            case  '-boxDetBank':
                global.getFile(prototype.url + '/getXLSXbank?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case  '-boxDetDay':
                global.getFile(prototype.url + '/getXLSXDay?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case  '-boxDetLiquida':
                global.getFile(prototype.url + '/getXLSXLiquida?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case  '-boxDetLiquidaByS':
                global.getFile(prototype.url + '/getXLSXLiquidaByS?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case '-panelGridDetBankByS':
                global.getFile(prototype.url + '/getXLSXBankByS?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case '-panelGridDetDayByS':
                global.getFile(prototype.url + '/getXLSXDayByS?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case '-panelGridDetLiqDetail':
                global.getFile(prototype.url + '/getXLSXDetLiqDetail?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case '-panelGridDetDetailProceByS':
                global.getFile(prototype.url + '/getXLSXDetDetailProceByS?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case '-boxDetDetails':
                global.getFile(prototype.url + '/getXLSXDetDetails?beanString=' + encodeURI(me.paramsDetail.beanString));
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
                var bytes = new Uint8Array(resultByte);
                var blob = new Blob([bytes], {type: "application/png"});

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = me.fileName;
                link.click();
            }
        });
    },

    onLoadClick_conciliaEC: function () {

        var valorExt = Ext.getCmp(prototype.id + '-cmbExt').getValue();
        
        if(valorExt === 'E'){
            var msjPregunta = '', msjError = '';
            msjPregunta = 'Sure to load file?';

            if (msjError === '') {
                Ext.MessageBox.show({
                    title: 'Icon Support',
                    msg: msjPregunta,
                    buttons: Ext.MessageBox.OKCANCEL,
                    icon: Ext.MessageBox.WARNING,
                    fn: function (btn) {
                        if (btn === 'ok') {
                            me.onFileLoadToTemp();
                        }
                    }
                });
            }
        }else if(valorExt === 'C'){
            var msjPregunta = '', msjError = '';
            msjPregunta = 'Sure to load file?';

            if (msjError === '') {
                Ext.MessageBox.show({
                    title: 'Icon Support',
                    msg: msjPregunta,
                    buttons: Ext.MessageBox.OKCANCEL,
                    icon: Ext.MessageBox.WARNING,
                    fn: function (btn) {
                        if (btn === 'ok') {
                            me.onFileLoadColombia();
                        }
                    }
                });
            }
        }
    },
    onFileLoadToTemp_bk: function () {



        var me = this;
        let beanValidation = {}

        beanValidation.IN_ACCNUMBER = '***********';
        var fileField = Ext.getCmp(prototype.id + '-file');
        var file = fileField.fileInputEl.dom.files[0];
        let beanString = JSON.stringify(beanValidation);
        if (!file) {
            Ext.MessageBox.alert('PRAXIS', "::: Select only one file. Please :::", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-File').focus();", 100);
            });
            return;
        }

        // Crear una instancia de FormData para enviar el archivo
        var formData = new FormData();
        formData.append('excelfile', file);

        // Realizar una solicitud AJAX para cargar el archivo
        Ext.Ajax.request({
            url: prototype.url + '/setUploadLiquivsEC',
            method: 'POST',
            rawData: formData,
            params: {beanString: beanString},
            // Configurar el tipo de contenido adecuado y el encabezado
            headers: {
                'Content-Type': null // Dejar que el navegador establezca el tipo de contenido
            },
            success: function (response) {

                var res = Ext.JSON.decode(response.responseText);
                var msjResult = res.msjResult;
                global.Msg({msg: msjResult});
//                var res = Ext.decode(response.responseText);
//                console.log(res);
//                if (res.success) {
//                    var msjResult = res.msjResult;
////                    let msjResult = res.msjResult;
////                    if(objResult.isInvalid){
////                        global.Msg({msg: "The account number is different"});
////                        return false;
////                    }
//                    console.log('*************************************')
//                    console.log( msjResult)
//                    global.Msg({msg: msjResult});
////                    let numberWithCommas = me.formatNumberWithCommas_string(objResult.netoAcum);
////                    Ext.getCmp(prototype.id + '-de-txtSumAmount').setValue(numberWithCommas);
////                    me.validationAmount();
//                    // No es necesario restaurar el archivo ya que no se borra el campo de archivo
//                } else {
//                    global.Msg({msg: "Error Excel Load"});
//                }
            },
            failure: function (response) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

    },

    onFileLoadToTemp: function () {

    console.log('onFileLoadToTemp');

//        var me = this;
//        let beanValidation = {}
//
//        beanValidation.IN_ACCNUMBER = '***********';
////        var fileField = Ext.getCmp(prototype.id + '-file');
////        var file = fileField.fileInputEl.dom.files[0];
//
//        var file = Ext.getCmp(prototype.id + '-file').getValue();
//        let beanString = JSON.stringify(beanValidation);
//        if (!file) {
//            Ext.MessageBox.alert('PRAXIS', "::: Select only one file. Please :::", function (btn, text) {
//                if (btn === 'ok' || btn === 'cancel')
//                    setTimeout("Ext.getCmp(prototype.id + '-File').focus();", 100);
//            });
//            return;
//        }
//
//        var form = Ext.getCmp(prototype.id + '-formLIQvsEC').getForm();
//
//        // Realizar una solicitud AJAX para cargar el archivo
//        form.submit({
//            url: prototype.url + '/setUploadLiquivsEC',
//            waitMsg: 'Uploading your sure to upload the file...',
////            method: 'POST',
////            rawData: formData,
//            params: {fileName: file, beanString: beanString},
////            // Configurar el tipo de contenido adecuado y el encabezado
////            headers: {
////                'Content-Type': null // Dejar que el navegador establezca el tipo de contenido
////            },
//            success: function (f, o) {
//
//                var res = Ext.decode(o.response.responseText);
//                var msjResult = res.msjResult;
//                global.Msg({msg: msjResult});
//
//            },
//            failure: function (response) {
//                console.log('server-side failure with status code ' + response.status);
//            }
//        });

    },
    
    onFileLoadColombia: function () {

    console.log('onFileLoadColombia');

//        var me = this;
//        let beanValidation = {}
//
//        beanValidation.IN_ACCNUMBER = '***********';
////        var fileField = Ext.getCmp(prototype.id + '-file');
////        var file = fileField.fileInputEl.dom.files[0];
//
//        var file = Ext.getCmp(prototype.id + '-file').getValue();
//        let beanString = JSON.stringify(beanValidation);
//        if (!file) {
//            Ext.MessageBox.alert('PRAXIS', "::: Select only one file. Please :::", function (btn, text) {
//                if (btn === 'ok' || btn === 'cancel')
//                    setTimeout("Ext.getCmp(prototype.id + '-File').focus();", 100);
//            });
//            return;
//        }
//
//        var form = Ext.getCmp(prototype.id + '-formLIQvsEC').getForm();
//
//        // Realizar una solicitud AJAX para cargar el archivo
//        form.submit({
//            url: prototype.url + '/setUploadLiquivsECColombia',
//            waitMsg: 'Uploading your sure to upload the file...',
////            method: 'POST',
////            rawData: formData,
//            params: {fileName: file, beanString: beanString},
////            // Configurar el tipo de contenido adecuado y el encabezado
////            headers: {
////                'Content-Type': null // Dejar que el navegador establezca el tipo de contenido
////            },
//            success: function (f, o) {
//
//                var res = Ext.decode(o.response.responseText);
//                var msjResult = res.msjResult;
//                global.Msg({msg: msjResult});
//
//            },
//            failure: function (response) {
//                console.log('server-side failure with status code ' + response.status);
//            }
//        });

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
            case '-boxDetLiquidaByS':
                me.pagginActual = '-paggin7';
                break;
            case '-boxByLiquida':
                me.pagginActual = '-paggin8';
                break;
            case '-panelGridDetDayByS':
                me.pagginActual = '-paggin9';
                break;
            case '-panelPendings':
                me.pagginActual = '-paggin10';
                break;
            case '-panelGridDetProceByS':
                me.pagginActual = '-paggin11';
                break;
            case '-boxDetProce':
                me.pagginActual = '-paggin12';
                break;
            case '-panelGridDetProceByPend':
                me.pagginActual = '-paggin13';
                break;
            case '-panelGridDetProceLIQ':
                me.pagginActual = '-paggin14';
                break;
            case '-panelGridDetDayProcLIQByS':
                me.pagginActual = '-paggin15';
                break;
            case '-panelGridDetDetailProceByS':
                me.pagginActual = '-paggin16';
                break;
            case '-panelGridDetLiqDetail':
                me.pagginActual = '-paggin17';
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
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboToYear: function (obj) {
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        if (comboToYear.getValue() < comboFromYear.getValue()) {
            comboFromYear.setValue(comboToYear.getValue());
        }
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
        if (obj.getValue() != '') {
            Ext.getCmp(prototype.id + '-cmbDateDay').setDisabled(false);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setDisabled(false);

        } else {
            Ext.getCmp(prototype.id + '-cmbDateDay').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
            Ext.getCmp(prototype.id + '-cmbDateDay').setValue('');
        }
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
    selectComboToDay: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateDay');
        if (comboFromMonth.getValue() === comboToMonth.getValue()) {
            if (obj.getValue() < comboFromDay.getValue()) {
                comboFromDay.setValue(obj.getValue());
            }
        }
        if (comboFromDay.getValue() === '') {

            comboFromDay.setValue(obj.getValue())
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