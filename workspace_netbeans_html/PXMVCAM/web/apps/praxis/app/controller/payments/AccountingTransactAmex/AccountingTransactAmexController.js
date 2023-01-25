Ext.define('Ext.Praxis.controller.payments.AccountingTransactAmex.AccountingTransactAmexController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingTransactAmexController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    lstBank: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    searchParamsByDate: {},
    paramsDetail: {},
    paramsDetailByDate: {},
    paramsDetailByQty: {},
    paramsDetailByDay: {},
    paramsDetailByAccounting: {},
    beanDetByDate: {},
    beanDetByAcount: {},
    beanDetByDebug: {},
    beanDetByPNR: {},
    beanDetByDay: {},
    beanDetByQty: {},
    beanDetByAccounting: {},
    dataObtain: {},
    init: function (view) {
        me = this;
        prototype.id = 'AccountingTransactAmexForm';
        prototype.url = CONTEXTPATH + '/AccountingTransactAmex';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.obtainData();

        this.control({
            '#AccountingTransactAmexForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AccountingTransactAmexForm-btnClear': {
                click: this.btnClear_click
            },
            '#AccountingTransactAmexForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AccountingTransactAmexForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#AccountingTransactAmexForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#AccountingTransactAmexForm-btnBack': {
                click: this.btnBack_click
            },
            '#AccountingTransactAmexForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AccountingTransactAmexForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AccountingTransactAmexForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AccountingTransactAmexForm-btn-pag-last': {
                click: this.pagLast
            }
        });
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

        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');

        var cmbTDOC = Ext.getCmp(prototype.id + '-cmbTDOC');
        cmbTDOC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["S", "Sales"],
                ["R", "Refund"]
            ]
        }));
        cmbTDOC.setValue("S");

        var cmbComplements = Ext.getCmp(prototype.id + '-cmbComplements');
        cmbComplements.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["9353227755", "Plusgrade"],
                        //["8133735688", "Ligas"],
                        //["9352724851", "Tablet"]
            ]
        }));
        cmbComplements.setValue("");

        var cmbDateSel = Ext.getCmp(prototype.id + '-cmbDateSel');
        cmbDateSel.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                //   ["PRDA", "Processing Date"],
                ["PAYDATE", "Payment Date"]
            ]
        }));
        cmbDateSel.setValue("PAYDATE");

        this.btnSearch_click();
    },
    setDataTo: function () {
        var copYear = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(copYear);
        var copMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(copMonth);
    },
    setFormatParameter: function () {

        me.bean = {};
        me.bean.IN_DATEFROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        me.bean.IN_DATETO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        me.bean.IN_DATE = Ext.getCmp(prototype.id + '-cmbDateSel').getValue();
        me.bean.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();
        me.bean.IN_COMPLEMENT = Ext.getCmp(prototype.id + '-cmbComplements').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
    },
    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    setGridData: function () {
        win.lblUser_toolTip("Estructura: A4116");
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
                        obj.proxy.extraParams = searchParams
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
//                        console.log(obj.data);
                        me.setWidthPie();
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
            Ext.getCmp(prototype.id + '-gridMainAcountTransact').bindStore(storeGridDatas);
            //Ext.getCmp(prototype.id + '-gridMainAcountTransact').setStore(storeGridDatas);
            //Ext.getCmp(prototype.id + '-displayChart01').bindStore(storeGridDatas);
            //Ext.getCmp(prototype.id + '-displayChart02').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    onGridDetByDate: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataByDate';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDetByDate.IN_DATE = rowData.data.IN_DATE;
        this.beanDetByDate.IN_DATE_VALUE = rowData.data.PAYDATE;
        this.beanDetByDate.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();
        this.beanDetByDate.IN_COMPLEMENT = rowData.data.IN_COMPLEMENT;
        this.beanDetByDate.BSUMDATE = rowData.data.BSUMDATE;
        this.beanDetByDate.SCURRENCY = rowData.data.SCURRENCY;

        console.log(this.beanDetByDate);
        me.paramsDetailByDate.beanString = JSON.stringify(this.beanDetByDate);
        this.setGridDataDetByDate();
    },
    onGridDetByAcount: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataByDate';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetByAcount.IN_DATE = rowData.data.IN_DATE;
        this.beanDetByAcount.IN_DATE_VALUE = rowData.data.PAYDATE;
        this.beanDetByAcount.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();
        this.beanDetByAcount.IN_STCONL = '1';
        this.beanDetByAcount.IN_COMPLEMENT = rowData.data.IN_COMPLEMENT;
        this.beanDetByAcount.BSUMDATE = rowData.data.BSUMDATE;
        this.beanDetByAcount.SCURRENCY = rowData.data.SCURRENCY;

        console.log(this.beanDetByAcount);
        me.paramsDetailByDate.beanString = JSON.stringify(this.beanDetByAcount);
        this.setGridDataDetByDate();
    },
    onGridDetByPending: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataByDate';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetByDebug.IN_DATE = rowData.data.IN_DATE;
        this.beanDetByDebug.IN_DATE_VALUE = rowData.data.PAYDATE;
        this.beanDetByDebug.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();
        this.beanDetByDebug.IN_STCONL = '';
        this.beanDetByDebug.IN_COMPLEMENT = rowData.data.IN_COMPLEMENT;
        this.beanDetByDebug.BSUMDATE = rowData.data.BSUMDATE;
        this.beanDetByDebug.SCURRENCY = rowData.data.SCURRENCY;

        console.log(this.beanDetByDebug);
        me.paramsDetailByDate.beanString = JSON.stringify(this.beanDetByDebug);
        this.setGridDataDetByDate();
    },
    onGridDetByPNR: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        if (me.panelActual !== '-panelGridDataByDate') {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataByDate';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        }

        this.beanDetByPNR.IN_DATE = Ext.getCmp(prototype.id + '-cmbDateSel').getValue();
        this.beanDetByPNR.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();
        this.beanDetByPNR.IN_PNR = Ext.getCmp(prototype.id + '-txtPNR').getValue();
        this.beanDetByPNR.IN_COMPLEMENT = rowData.data.IN_COMPLEMENT;

        console.log(this.beanDetByPNR);
        me.paramsDetailByDate.beanString = JSON.stringify(this.beanDetByPNR);
        this.setGridDataDetByDate();
    },
    setGridDataDetByDate: function () {
        win.lblUser_toolTip("Estructura: A4116");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchByDate'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = me.paramsDetailByDate;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    me.setWidthPie();

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }


                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridMainDataByDate').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridMainDataByDate').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    onGridDetByQty: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataByQty';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetByQty.IN_DATE_VALUE = rowData.data.PAYDATE;
        this.beanDetByQty.IN_DATE = rowData.data.IN_DATE;
        this.beanDetByQty.IN_SPNR = rowData.data.SPNR;
        this.beanDetByQty.IN_ISREFNBR = rowData.data.ISREFNBR;
        this.beanDetByQty.IN_BSUMDATE = rowData.data.IN_BSUMDATE;
        this.beanDetByQty.IN_FREGLA = rowData.data.FREGLA;
        this.beanDetByQty.IN_SCARDN = rowData.data.SCARDN;
        this.beanDetByQty.IN_SAUTHOC = rowData.data.SAUTHOC;
        this.beanDetByQty.IDITEMS = rowData.data.IDITEMS;
        this.beanDetByQty.IDITEMT = rowData.data.IDITEMT;

        console.log(this.beanDetByQty);

        me.paramsDetailByQty.beanString = JSON.stringify(this.beanDetByQty);
        this.setGridDataDetByQty();
    },
    setGridDataDetByQty: function () {
        win.lblUser_toolTip("Estructura: A4116");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchByQty'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = me.paramsDetailByQty;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    var pag = Ext.getCmp(prototype.id + '-paggin3');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    me.setWidthPie();

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridMainDataByQty').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridMainDataByQty').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    onGridDetByDay: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataByDay';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetByDay.IN_DATE = rowData.data.IN_DATE;
        this.beanDetByDay.IN_DATE_VALUE = rowData.data.PAYDATE;
        this.beanDetByDay.strFormatDate = rowData.data.strFormatDate;
        this.beanDetByDay.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();
        this.beanDetByDay.IN_COMPLEMENT = rowData.data.IN_COMPLEMENT;
        this.beanDetByDay.IN_SCURRENCY = rowData.data.SCURRENCY;

        console.log(this.beanDetByDay);

        me.paramsDetailByDay.beanString = JSON.stringify(this.beanDetByDay);
        this.setGridDataDetByDay();
    },
    setGridDataDetByDay: function () {
        win.lblUser_toolTip("Estructura: A4116");

        Ext.Ajax.request({
            url: prototype.url + '/searchByDay',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-panelGridDataByDay').mask('Loading...'),
            params: {beanString: me.paramsDetailByDay.beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-panelGridDataByDay').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                console.log(res);

                if (res.data.length === 0) {
                    global.Msg({
                        msg: 'Data not found.'
                    });
                } else {
                    var lstData = res.data;

                    var a = [];
                    var dataRoot = {text: '.', expanded: false, children: []};
                    console.log(lstData)
                    Ext.Object.each(lstData, function (index, value) {
                        if (a.indexOf(value.PAYDATE) < 0) {
                            var TOT_ACCOUNTED = 0;
                            var TOT_PENDING = 0;
                            var TOT_TOTAL = 0;

                            var TOT_QTY_ACCOUNTED = 0;
                            var TOT_QTY_PENDING = 0;
                            var TOT_QTY_TOTAL = 0;

                            Ext.Object.each(lstData, function (index, valuex) {
                                if (value.PAYDATE === valuex.PAYDATE) {
                                    TOT_ACCOUNTED += valuex.TGROSAMOUN_ACCOUNTED;
                                    TOT_PENDING += valuex.TGROSAMOUN_PENDING;
                                    TOT_TOTAL += valuex.TGROSAMOUN;

                                    TOT_QTY_ACCOUNTED += valuex.QTY_ACCOUNTED;
                                    TOT_QTY_PENDING += valuex.QTY_PENDING;
                                    TOT_QTY_TOTAL += valuex.QTY_TOTAL;
                                }
                            });

                            a.push(value.PAYDATE);
                            dataRoot.children.push({
                                PAYDATE: value.PAYDATE,
                                BSUMDATE: '',
                                SCURRENCY: value.SCURRENCY,
                                TGROSAMOUN_ACCOUNTED: TOT_ACCOUNTED,
                                QTY_ACCOUNTED: TOT_QTY_ACCOUNTED,
                                TGROSAMOUN_PENDING: TOT_PENDING,
                                QTY_PENDING: TOT_QTY_PENDING,
                                TGROSAMOUN: TOT_TOTAL,
                                QTY_TOTAL: TOT_QTY_TOTAL,
                                expanded: false, children: []
                            });

                            Ext.Object.each(lstData, function (index, value01) {
                                if (value.PAYDATE === value01.PAYDATE) {
                                    dataRoot.children[a.indexOf(value.PAYDATE)].children.push({
                                        PAYDATE: value01.PAYDATE,
                                        BSUMDATE: value01.BSUMDATE,
                                        SCURRENCY: value01.SCURRENCY,
                                        TGROSAMOUN_ACCOUNTED: value01.TGROSAMOUN_ACCOUNTED,
                                        QTY_ACCOUNTED: value01.QTY_ACCOUNTED,
                                        TGROSAMOUN_PENDING: value01.TGROSAMOUN_PENDING,
                                        QTY_PENDING: value01.QTY_PENDING,
                                        TGROSAMOUN: value01.TGROSAMOUN,
                                        QTY_TOTAL: value01.QTY_TOTAL,
                                        leaf: true
                                    });
                                }
                            });
                        }
                    });
                    console.log('seteando Tree Store')
                    var storeTree = Ext.create('Ext.data.TreeStore', {
                        root: dataRoot
                    });
                    console.log(storeTree)
                    console.log(dataRoot)
                    console.log(a)
                    Ext.getCmp(prototype.id + '-gridMainDataByDay').setStore(storeTree);
                }
            }
        });
    },
    onGridDetByAccounting: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataByAccounting';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDetByAccounting.IN_TKT = rowData.data.ISREFNBR;
        this.beanDetByAccounting.IN_AREFNBR = rowData.data.AREFNBR;
        this.beanDetByAccounting.IDCON = rowData.data.IDCONL;
        this.beanDetByAccounting.PAYDATE = rowData.data.PAYDATE;
        this.beanDetByAccounting.BSUMDATE = rowData.data.BSUMDATE;
        console.log(this.beanDetByAccounting);
        me.paramsDetailByAccounting.beanString = JSON.stringify(this.beanDetByAccounting);
        this.setGridDataDetByAccounting();
    },
    setGridDataDetByAccounting: function () {
        win.lblUser_toolTip("Estructura: A4183");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchByAccounting'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = me.paramsDetailByAccounting;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();

                    var pag = Ext.getCmp(prototype.id + '-paggin5');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    me.setWidthPie();
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-gridMainDataByAccounting').setTitle('<center style="font-size:12px;">PAYMENT DATE: ' + data.PAYDATE + '   -     SALES DATE: ' + data.BSUMDATE  + '</center>');
                        //Ext.getCmp(prototype.id + '-gridMainDataByAccounting').setTitle('<center style="font-size:12px;">Ticket: ' + data.TKT + ' - Accounting ID: ' + data.IDCON + '</center>');
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridMainDataByAccounting').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridMainDataByAccounting').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
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

        Ext.create('Ext.Praxis.view.payments.AccountingTransactAmexForm.DataEntry', {
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
        Ext.getCmp(prototype.id + '-cmbCode').setValue('');
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

        this.setFormatParameter();
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            case  '-panelGridDataByDate':
                global.getFile(prototype.url + '/getXLSXByDate?beanString=' + searchParams.beanString);
                break;
            case  '-panelGridDataByQty':
                global.getFile(prototype.url + '/getXLSXByQty?beanString=' + searchParams.beanString);
                break;
            case  '-panelGridDataByDay':
                global.getFile(prototype.url + '/getXLSXByDay?beanString=' + searchParams.beanString);
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    rbChangeType_tc: function () {
        var selectedValue = Ext.getCmp(prototype.id + '-radiogroupType_tc').getValue().rbgType_tc;

        switch (selectedValue) {
            case 'A':
                //Ext.getCmp(prototype.id + '-displayChart01').setVisible(true);
                //Ext.getCmp(prototype.id + '-displayChart02').setVisible(false);
                break;
            case 'T':
                //Ext.getCmp(prototype.id + '-displayChart01').setVisible(false);
                //Ext.getCmp(prototype.id + '-displayChart02').setVisible(true);
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
    viewTicket: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        var strTkt = rowData.data.A4183TICKET;

        prototypeProgram.view = 'payments-accounting-transact-amex-form';
        prototypeProgram.nprog = 'PX00000590';
        prototypeProgram.title = 'Accounting Transaction AMEX';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    viewTKT: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        var strTkt = rowData.data.TKT;

        prototypeProgram.view = 'payments-accounting-transact-amex-form';
        prototypeProgram.nprog = 'PX00000590';
        prototypeProgram.title = 'Accounting Transaction AMEX';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    viewTKTconSEQ: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        var strTkt = rowData.data.A4183TICKET;
        var valida = rowData.data.A4183SEQ;
        if (valida === '001') {
            prototypeProgram.view = 'payments-accounting-transact-amex-form';
            prototypeProgram.nprog = 'PX00000590';
            prototypeProgram.title = 'Accounting Transaction AMEX';
            prototypeProgram.modulo = '';

            var beanProMasterTicket = {};

            beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
            beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
            beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);

            console.log(beanProMasterTicket);

            win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
        }
        else{
            console.log('No es indice');
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
        console.log(me.panelActual);
        if (me.panelActual === '-panelGridData' || me.panelActual === '-panelGridDataByDate' || me.panelActual === '-panelGridDataByQty' || me.panelActual == '-panelGridDataByNew') {
            var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
            Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
            Ext.getCmp(prototype.id + '-pie').setVisible(true);
        } else {
            Ext.getCmp(prototype.id + '-pie').setVisible(false);
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridDataByDate':
                me.pagginActual = '-paggin2';
                break;
            case  '-panelGridDataByQty':
                me.pagginActual = '-paggin3';
                break;
            case  '-panelGridDataByDay':
                me.pagginActual = '-paggin4';
                break;
            case  '-panelGridDataByAccounting':
                me.pagginActual = '-paggin5';
                break;
        }
    },
    filterPNR: function (e, eOpts) {
        switch (eOpts.getKey()) {
            case 13:
                this.onGridDetByPNR();
        }
    },
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
