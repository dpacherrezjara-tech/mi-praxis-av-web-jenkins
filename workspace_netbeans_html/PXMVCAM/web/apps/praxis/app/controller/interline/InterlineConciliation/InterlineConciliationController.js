/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.interline.InterlineConciliation.InterlineConciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InterlineConciliationController',
    fecha: new Date(),
    childs: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    setContext: function() {
        me = this;
    },
    init: function(view) {
        me = this;
        prototype.id = 'InterlineConciliationForm';
        prototype.url = CONTEXTPATH + '/InterlineConciliation';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        me.panelActual = '-panelGridData';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;

        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
            // -------------------Eventos Genericos --------------------
            '#InterlineConciliationForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#InterlineConciliationForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#InterlineConciliationForm-btnClear': {
                click: this.btnClear_click
            },
            '#InterlineConciliationForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#InterlineConciliationForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#InterlineConciliationForm-btnDisplay': {
                click: this.btnDisplay_click
            },
            '#InterlineConciliationForm-btnBack': {
                click: this.btnBack_click
            },
            '#InterlineConciliationForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#InterlineConciliationForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#InterlineConciliationForm-btn-pag-next': {
                click: this.pagNext
            },
            '#InterlineConciliationForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#InterlineConciliationForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#InterlineConciliationForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#InterlineConciliationForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#InterlineConciliationForm-chkDetail': {
                change: this.btnSearch_click
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        Ext.getCmp(prototype.id + '-panelMain').show();
        Ext.getCmp(prototype.id + '-panelMainChart').hide();
        this.setStoreData();
        this.btnSearch_click();
    },
    btnDisplay_click: function() {
        var option = Ext.getCmp(prototype.id + '-panelMain');
        if (option.isVisible()) {
            Ext.getCmp(prototype.id + '-panelMain').hide();
            Ext.getCmp(prototype.id + '-panelMainChart').show();
            Ext.getCmp(prototype.id + '-cmbCoupon').show();
        } else {
            Ext.getCmp(prototype.id + '-panelMain').show();
            Ext.getCmp(prototype.id + '-panelMainChart').hide();
            Ext.getCmp(prototype.id + '-cmbCoupon').hide();
        }

        this.btnSearch_click();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
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
    setStoreData: function() {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");


        var cmbFECHA = Ext.getCmp(prototype.id + '-cmbFECHA');
        cmbFECHA.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Invoice Date"],
                ["0", "Flight Date"]

            ]
        }));
        cmbFECHA.setValue("1");

        var cmbCoupon = Ext.getCmp(prototype.id + '-cmbCoupon');
        cmbCoupon.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["1", "Exchange"],
                ["2", "Involuntary"]

            ]
        }));
        cmbCoupon.setValue("");

    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();

        var option = Ext.getCmp(prototype.id + '-panelMain');
        if (!option.isVisible()) {
            this.searchChart(obj, e);
        } else {
            if (searchParams.bean.chkDetail) {
                this.setGridDataDetail(obj, e);
            } else {
                this.setGridData(obj, e);
            }
        }

    },
    setFormatParameter: function() {
        var bean = {};

        bean.yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        bean.monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        bean.yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        bean.monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        bean.chkDetail = Ext.getCmp(prototype.id + '-chkDetail').getValue();

        bean.IN_FECHA_FROM = bean.yearFrom + "" + bean.monthFrom;
        bean.IN_FECHA_TO = bean.yearTo + "" + bean.monthTo;
        bean.IN_CARRIER = Ext.getCmp(prototype.id + '-txtCarrier').getValue();
        bean.IN_CITYPAIR = Ext.getCmp(prototype.id + '-txtCityPair').getValue();
        bean.FLAGI = Ext.getCmp(prototype.id + '-cmbCoupon').getValue();
        bean.IN_FECHA = Ext.getCmp(prototype.id + '-cmbFECHA').getValue();

        var beanString = JSON.stringify(bean);
        searchParams = {
            bean: bean,
            beanString: beanString
        };
    },
    searchChart: function(obj, val) {
        win.lblUser_toolTip("Estructura: A2858");
        me.panelActual = '-panelCarr';
        global.selectedChild(Ext.getCmp(prototype.id + '-panelMainChart').items.items, prototype.id + me.panelActual);
        me.setWidthPie();

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj});
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + '/searchChart'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
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
                            var items = [];
                            var items2 = [];
                            for (var i = 0; i < obj.data.length; i++) {
                                items.push(obj.data.items[i]);
                                if (i === 10)
                                    break;
                            }
                            for (var i = items.length - 1; i >= 0; i--) {
                                items2.push(items[i]);
                            }
                            var storeData = Ext.create('Ext.data.SimpleStore', {
                                data: items2,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-grafico01').bindStore(storeData);

                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataCarrChart').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    setGridDataByCityPairChart: function(data) {
        win.lblUser_toolTip("Estructura: A2858");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchCityChart'
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
                        var items = [];
                        var items2 = [];
                        for (var i = 0; i < obj.data.length; i++) {
                            items.push(obj.data.items[i]);
                            if (i === 10)
                                break;
                        }
                        for (var i = items.length - 1; i >= 0; i--) {
                            items2.push(items[i]);
                        }
                        var storeData = Ext.create('Ext.data.SimpleStore', {
                            data: items2,
                            autoLoad: true
                        });
                        Ext.getCmp(prototype.id + '-grafico02').bindStore(storeData);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataCityPairChart').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    onSearchByCityPairChart: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelCityPair';
        global.selectedChild(Ext.getCmp(prototype.id + '-panelMainChart').items.items, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataByCityPairChart();

    },
    onChangeTopMain: function(obj, value) {
        var obj = Ext.getCmp(prototype.id + '-gridDataCarrChart').getStore();

        var items = [];
        var items2 = [];
        for (var i = 0; i < obj.data.length; i++) {
            items.push(obj.data.items[i]);
            if (i === value)
                break;
        }
        for (var i = items.length - 1; i >= 0; i--) {
            items2.push(items[i]);
        }
        var storeData = Ext.create('Ext.data.SimpleStore', {
            data: items2,
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-grafico01').bindStore(storeData);
    },
    onChangeTopMain2: function(obj, value) {
        var obj = Ext.getCmp(prototype.id + '-gridDataCityPairChart').getStore();

        var items = [];
        var items2 = [];
        for (var i = 0; i < obj.data.length; i++) {
            items.push(obj.data.items[i]);
            if (i === value)
                break;
        }
        for (var i = items.length - 1; i >= 0; i--) {
            items2.push(items[i]);
        }
        var storeData = Ext.create('Ext.data.SimpleStore', {
            data: items2,
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-grafico02').bindStore(storeData);
    },
    setGridData: function(obj, val) {
        win.lblUser_toolTip("Estructura: A2858");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj});
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
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
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    setGridDataDetail: function(obj, val) {
        win.lblUser_toolTip("Estructura: A2858");
        me.panelActual = '-panelGridDataDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj});
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetail'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
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
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    setGridDataByMainCP: function(data) {
        win.lblUser_toolTip("Estructura: A2858");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchMainCP'
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
                        var bean = obj.data.items[0].data;
                        var titExc = '';
                        var title = '';
                        if (bean.IN_TRNCU === 'EXCH') {
                            titExc = ' ** EXCHANGE ** ';
                        } else if (bean.IN_TRNCU === 'INV') {
                            titExc = ' ** EXCHANGE INVOL ** ';
                        }
                        if (bean.IN_FECHA === '1') {
                            title = "Invoice Date : " + bean.strFormatDate + "  -  Carrier : " + bean.CARRIA + "  " + bean.strDescCarrier + titExc;

                        } else {
                            title = "Flight Date : " + bean.strFormatDate + "  -  Carrier : " + bean.CARRIA + "  " + bean.strDescCarrier + titExc;

                        }

                        Ext.getCmp(prototype.id + '-labelTitle2').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMainCP').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    onSearchByCityPairMain: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelByMainCP';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        switch (columnNum) {
            case 0:
                rowData.data.IN_TRNCU = '';
                break;
            case 4:
                rowData.data.IN_TRNCU = 'EXCH';
                break;
            case 5:
                rowData.data.IN_TRNCU = 'INV';
                break;
        }
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataByMainCP();

    },
    onClickSwap: function() {
        var option = Ext.getCmp(prototype.id + '-gridDataByTkt');
        if (option.isVisible()) {
            Ext.getCmp(prototype.id + '-gridDataByTkt').hide();
            Ext.getCmp(prototype.id + '-gridDataByTktSwap').show();
        } else {
            Ext.getCmp(prototype.id + '-gridDataByTkt').show();
            Ext.getCmp(prototype.id + '-gridDataByTktSwap').hide();
        }
    },
    setGridDataByTicket: function(data) {
        win.lblUser_toolTip("Estructura: A2858");
        me.setWidthPie();

        Ext.getCmp(prototype.id + '-gridDataByTkt').show();
        Ext.getCmp(prototype.id + '-gridDataByTktSwap').hide();


        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchByTkt'
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
                        var bean = obj.data.items[0].data;
                        var titExc = '';
                        var title = '';
                        if (bean.IN_TRNCU === 'EXCH') {
                            titExc = ' ** EXCHANGE ** ';
                        } else if (bean.IN_TRNCU === 'INV') {
                            titExc = ' ** EXCHANGE INVOL ** ';
                        }
                        if (bean.IN_FECHA === '1') {
                            title = "Invoice Date : " + bean.strFormatDate + "  -  Carrier : " + bean.CARRIA + "  " + bean.strDescCarrier
                                    + "  - City Pair : " + bean.CITYO + " " + bean.CITYD + titExc;

                        } else {
                            title = "Flight Date : " + bean.strFormatDate + "  -  Carrier : " + bean.CARRIA + "  " + bean.strDescCarrier
                                    + "  - City Pair : " + bean.CITYO + " " + bean.CITYD + titExc;

                        }

                        Ext.getCmp(prototype.id + '-labelTitle3').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataByTkt').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataByTktSwap').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    onSearchByTkt: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelByTicket';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataByTicket();

    },
    setGridDataByCityPair: function(data) {
        win.lblUser_toolTip("Estructura: A2858");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchByCityPair'
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
                        var bean = obj.data.items[0].data;
                        var titExc = '';
                        var title = '';
                        if (bean.IN_TRNCU === 'EXCH') {
                            titExc = ' ** EXCHANGE ** ';
                        } else if (bean.IN_TRNCU === 'INV') {
                            titExc = ' ** EXCHANGE INVOL ** ';
                        }
                        if (bean.IN_FECHA === '1') {
                            title = "Invoice Date : " + bean.strFormatDate + "  -  Carrier : " + bean.CARRIA + "  " + bean.strDescCarrier;

                        } else {
                            title = "Flight Date : " + bean.strFormatDate + "  -  Carrier : " + bean.CARRIA + "  " + bean.strDescCarrier;

                        }

                        Ext.getCmp(prototype.id + '-labelTitle5').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataCityPair').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    onSearchByCityPair: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelByCityPair';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataByCityPair();

    },
    validateFields: function() {
        var bean = searchParams.bean;
        var msj = '';

        if (bean.IN_CARRIER !== "" && bean.IN_CARRIER.length < 2) {
            msj = "Invalid Carrier.";
        }
        if (bean.IN_CITYPAIR !== "" && bean.IN_CITYPAIR.length < 6) {
            msj = "Invalid City Pair.";
        }
        return msj;
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
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-txtCarrier').setValue('');
        Ext.getCmp(prototype.id + '-txtCityPair').setValue('');

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
        var option = Ext.getCmp(prototype.id + '-gridDataByTkt');
        
        switch (me.panelActual) {
            case  '-panelGridData':
                var strEncode = encodeURI(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                console.log(strEncode);
                global.getFile(strEncode);
                break;
            case  '-panelGridDataDetail':
                var strEncode = encodeURI(prototype.url + '/getXLSXDetail?beanString=' + searchParams.beanString);
                console.log(strEncode);
                global.getFile(strEncode);
                break;
            case '-panelByMainCP':
                var strEncode = encodeURI(prototype.url + '/getXLSXByMainCP?beanString=' + me.paramsDetail.beanString);
                console.log(strEncode);
                global.getFile(strEncode);
            case '-panelByTicket':
                if (option.isVisible()) {
                    console.log("1");
                    global.getFile(prototype.url + '/getXLSXByTicket?beanString=' + me.paramsDetail.beanString);
                }else{
                    console.log("2");
                    global.getFile(prototype.url + '/getXLSXByTktSwap?beanString=' + me.paramsDetail.beanString);
                }
                break;
            case '-panelByCityPair':
                var strEncode = encodeURI(prototype.url + '/getXLSXByCityPair?beanString=' + me.paramsDetail.beanString);
                console.log(strEncode);
                global.getFile(strEncode);
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
//        console.log(ancho);
        Ext.getCmp(prototype.id + '-panelPie').setWidth(ancho);
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
            case  '-panelGridDataDetail':
                me.pagginActual = '-paggin';
                break;
            case '-panelByMainCP':
            case '-panelByCityPair':
                me.pagginActual = '-paggin2';
                break;
            case '-panelByTicket':
                me.pagginActual = '-paggin3';
                break;
        }
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
    getIntColor01: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#d5f4d5';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor1: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#d5f4d5';
        return Ext.util.Format.number(value, '0,000.00');
    }


});
