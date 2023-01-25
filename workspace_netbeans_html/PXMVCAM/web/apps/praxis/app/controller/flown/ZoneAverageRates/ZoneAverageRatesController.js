/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.ZoneAverageRates.ZoneAverageRatesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ZoneAverageRatesController',
    fecha: new Date(),
    paginTem: '',
    paginActual: '',
    drillDown: [],
    dw_excel: false,
    gridActual: '',
    strTipo: '',
    bean: '',
    beanDetDay: {},
    beanDetZone: {},
    childs: '',
    panelActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    paramsDetailCoupon: {},
    setContext: function() {
        me = this;
    },
    init: function(view) {
        prototype.id = 'ZoneAverageRatesForm';
        prototype.url = CONTEXTPATH + '/ZoneAverageRates';
        me = this;

        me.gridActual = '-gridData';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ZoneAverageRatesForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ZoneAverageRatesForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ZoneAverageRatesForm-btnClear': {
                click: this.btnClear_click
            },
            '#ZoneAverageRatesForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ZoneAverageRatesForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ZoneAverageRatesForm-btnBack': {
                click: this.btnBack_click
            },
            '#ZoneAverageRatesForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ZoneAverageRatesForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ZoneAverageRatesForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ZoneAverageRatesForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------

            '#ZoneAverageRatesForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#ZoneAverageRatesForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            },
            '#ZoneAverageRatesForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#ZoneAverageRatesForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
//            '#ZoneAverageRatesForm-cmbDateFromDay': {
//                afterrender: this.afterRenderDay,
//                select: this.selectComboFromDay
//            }
        });
    },
    xpanel_afterrender: function(obj, e) {

        this.setStoreData();
        this.btnSearch_click();
    },
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function(obj) {
        obj.setValue('');
    },
//    afterRenderDay: function(obj) {
//        obj.setValue('');
//    },
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
//    selectComboFromDay: function(obj) {
//        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
//        comboToDay.setValue(obj.getValue());
//    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
//        var storeComboDataDay = win.getStoreDays(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
//        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
//        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');

        var cmbZone = Ext.getCmp(prototype.id + '-cmbZone');
        cmbZone.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "ALL"],
                ["ASI", "ASIA"],
                ["CAN", "CANADA"],
                ["CAR", "CARIBBEAN"],
                ["CAM", "CENTRAL AMERICA"],
                ["USA", "UNITED STATES"],
                ["EUR", "EUROPE"],
                ["FRO", "BORDER"],
                ["LOC", "LOCAL"],
                ["PLA", "BEACH"],
                ["SUD", "SOUTH AMERICA"],
                ["OCE", "OCEANIA"],
                ["AFR", "AFRICA"]
            ]
        }));
        cmbZone.setValue("");

        var cmbStock = Ext.getCmp(prototype.id + '-cmbStock');
        cmbStock.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "ALL"],
                ["139", "139"],
                ["OAL", "OAL"]
            ]
        }));
        cmbStock.setValue("");

        var cmbDateSel = Ext.getCmp(prototype.id + '-cmbDateSel');
        cmbDateSel.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["DFLIGHT", "Flight Date"],
                ["FCONT", "Accounting Date"]
            ]
        }));
        cmbDateSel.setValue("DFLIGHT");


    },
    btnSearch_click: function(obj, e) {
        var flag = Ext.getCmp(prototype.id + '-chkChangeView').getValue();
        console.log(flag);
        this.setSearchParams();
        if (flag) {
            this.setGridDataAverageByZone();
        } else {
            this.setGridData();
        }


    },
    setSearchParams: function() {
        me.bean = {};

        me.bean.IN_DATEF = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
//                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();


        me.bean.IN_DATET = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
//                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        me.bean.IN_ZONA = Ext.getCmp(prototype.id + '-cmbZone').getValue();
        me.bean.IN_CCIA = Ext.getCmp(prototype.id + '-cmbStock').getValue();

        me.bean.IN_DATE = Ext.getCmp(prototype.id + '-cmbDateSel').getValue();

        if (me.bean.IN_DATE === 'FCONT') {
            var flag = Ext.getCmp(prototype.id + '-chkDetailAll').getValue();
            if (flag) {
                me.bean.FLAG_ALL = "";
            } else {
                me.bean.FLAG_ALL = "Y";
            }
        }


        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        console.log(searchParams);

    },
    setGridData: function() {
        console.log('Entro');
        win.lblUser_toolTip("Estructura: A1692");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueZone.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-gridData').mask('Loading...');
//                    obj.proxy.extraParams = searchParams;
                    obj.proxy.extraParams = {beanString: searchParams, dw_excel: false};
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-gridData').unmask();
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);

                    if (res.success) {
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var bean = res.data[0];
                            if (bean.IN_DATE === "DFLIGHT") {
                                Ext.getCmp(prototype.id + '-rowDate').setText('FLIGHT');
                            } else {
                                Ext.getCmp(prototype.id + '-rowDate').setText('ACCOUNTING');
                            }

                            var lstData = res.data;
                            console.log(lstData);
                            var a = [];
                            var dataRoot = {text: '.', expanded: false, children: []};

                            Ext.Object.each(lstData, function(index, value) {
                                if (a.indexOf(value.DATE) < 0) {
                                    var x = [];

                                    var totQTY_CUPONES_CONT = 0;
                                    var totQTY_CUPONES_PEND = 0;
                                    var totVALOR_CUPONES_CONT = 0;
                                    var totPROMEDIO_CUPONES_CONT = 0;
                                    Ext.Object.each(lstData, function(index, valuex) {
                                        if (value.DATE === valuex.DATE) {
                                            totQTY_CUPONES_CONT += valuex.QTY_CUPONES_CONT;
                                            totQTY_CUPONES_PEND += valuex.QTY_CUPONES_PEND;
                                            totVALOR_CUPONES_CONT += valuex.VALOR_CUPONES_CONT;
                                            totPROMEDIO_CUPONES_CONT += valuex.PROMEDIO_CUPONES_CONT;
                                        }
                                    });

                                    a.push(value.DATE);
                                    dataRoot.children.push({
                                        DATE: value.DATE,
                                        COD_DESC_ZONA: '',
                                        MDACP: value.MDACP,
                                        QTY_CUPONES_CONT: totQTY_CUPONES_CONT,
                                        QTY_CUPONES_PEND: totQTY_CUPONES_PEND,
                                        VALOR_CUPONES_CONT: totVALOR_CUPONES_CONT,
                                        PROMEDIO_CUPONES_CONT: totPROMEDIO_CUPONES_CONT,
                                        IN_DATEF: value.IN_DATEF,
                                        IN_DATET: value.IN_DATET,
                                        expanded: false, children: []
                                    });
                                    var b = [];
                                    Ext.Object.each(lstData, function(index, value01) {
                                        if (value.DATE === value01.DATE) {
                                            //                                    b.push(value01.VNR);
                                            dataRoot.children[a.indexOf(value.DATE)].children.push({
                                                DATE: value01.DATE,
                                                ZONA: value01.ZONA,
                                                DESCZONA: value01.DESCZONA,
                                                COD_DESC_ZONA: value01.COD_DESC_ZONA,
                                                QTY_CUPONES: value01.QTY_CUPONES,
                                                QTY_CUPONES_CONT: value01.QTY_CUPONES_CONT,
                                                QTY_CUPONES_PEND: value01.QTY_CUPONES_PEND,
                                                MDACP: value01.MDACP,
                                                VALOR_CUPONES_CONT: value01.VALOR_CUPONES_CONT,
                                                VALOR_CUPONES_PEND: value01.VALOR_CUPONES_PEND,
                                                PROMEDIO_CUPONES_CONT: value01.PROMEDIO_CUPONES_CONT,
                                                PROMEDIO_CUPONES_PEND: value01.PROMEDIO_CUPONES_PEND,
                                                IN_DATEF: value01.IN_DATEF,
                                                IN_DATET: value01.IN_DATET,
                                                IN_DATE: value01.IN_DATE,
                                                IN_ZONA: value01.IN_ZONA,
                                                leaf: true
                                            });
                                        }
                                    });
                                }
                            });
                            console.log(dataRoot);



                            var storeTree = Ext.create('Ext.data.TreeStore', {
                                root: dataRoot
                            });

                            Ext.getCmp(prototype.id + '-gridData').setStore(storeTree);
                        }
                    }
                }
            }
        });
        global.clear();
//        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataAverageByZone: function() {
        console.log('Entro');
        win.lblUser_toolTip("Estructura: A1692");
        me.panelActual = '-panelAvrgByZone';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueZone.GridData', {
            proxy: {
                url: prototype.url + '/searchAverage'
            }, listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-gridDataAvrgByZone').mask('Loading...');
//                    obj.proxy.extraParams = searchParams;
                    obj.proxy.extraParams = {beanString: searchParams, dw_excel: false};
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-gridDataAvrgByZone').unmask();
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);

                    if (res.success) {
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var bean = res.data[0];
                            if (bean.IN_DATE === "DFLIGHT") {
                                Ext.getCmp(prototype.id + '-dateAvrgByZone').setText('FLIGHT');
                            } else {
                                Ext.getCmp(prototype.id + '-dateAvrgByZone').setText('ACCOUNTING');
                            }
                        }
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataAvrgByZone').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    onDetDayAverageByZones: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelAvrgByZoneDetDay';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanDetDay.IN_DATEF = rowData.data.DATE;
        this.beanDetDay.IN_DATE = rowData.data.IN_DATE;

        var flag = Ext.getCmp(prototype.id + '-chkDetailAll').getValue();
        if (flag) {
            this.beanDetDay.FLAG_ALL = "";
        } else {
            this.beanDetDay.FLAG_ALL = "Y";
        }

        console.log(this.beanDetDay);

        me.paramsDetail.beanString = JSON.stringify(this.beanDetDay);
        this.setGridDataAverageByZonesByDay();
    },
    setGridDataAverageByZonesByDay: function() {

        win.lblUser_toolTip("Estructura: A1692");
        me.panelActual = '-panelAvrgByZoneDetDay';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueZone.GridData', {
            proxy: {
                url: prototype.url + '/searchAverageDetDay'
            }, listeners: {
                beforeload: function(obj) {
                    //Ext.getCmp(prototype.id + '-gridDataAvrgByZoneDetDay').mask('Loading...');
//                    obj.proxy.extraParams = me.paramsDetail;
                    obj.proxy.extraParams = {beanString: me.paramsDetail, dw_excel: false};
                },
                load: function(obj) {
                    //Ext.getCmp(prototype.id + '-gridDataAvrgByZoneDetDay').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin3');
                    var pagData = pag.getPageData();
                    console.log(pagData);
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;                       
                        var mes = '';
                        switch (bean.DATE.substring(4, 6)) {
                            case  '01':
                                mes = ' - JAN';
                                break;
                            case  '02':
                                mes = ' - FEB';
                                break;
                            case  '03':
                                mes = ' - MAR';
                                break;
                            case  '04':
                                mes = ' - APR';
                                break;
                            case  '05':
                                mes = ' - MAY';
                                break;
                            case  '06':
                                mes = ' - JUN';
                                break;
                            case  '07':
                                mes = ' - JUL';
                                break;
                            case  '08':
                                mes = ' - AUG';
                                break;
                            case  '09':
                                mes = ' - SEP';
                                break;
                            case  '10':
                                mes = ' - OCT';
                                break;
                            case  '11':
                                mes = ' - NOV';
                                break;
                            case  '12':
                                mes = ' - DEC';
                                break;
                        }

                        if (bean.IN_DATE === "DFLIGHT") {
                            Ext.getCmp(prototype.id + '-dateAvrgByZoneDetDay').setText('FLIGHT');
                            Ext.getCmp(prototype.id + '-gridDataAvrgByZoneDetDay').setTitle('<center style="font-size:12px;">' + 'FLIGHT DATE: ' + bean.DATE.substring(0, 4) + mes + '</center>');
                        } else {
                            Ext.getCmp(prototype.id + '-dateAvrgByZoneDetDay').setText('ACCOUNTING');
                            Ext.getCmp(prototype.id + '-gridDataAvrgByZoneDetDay').setTitle('<center style="font-size:12px;">' + 'ACCOUNTING DATE: ' + bean.DATE.substring(0, 4) + mes + '</center>');
                        }

                        me.setWidthPie();
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataAvrgByZoneDetDay').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    onDetDay: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        if (rowData.data.children === null) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDetData';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanDetDay.IN_DATEF = rowData.data.IN_DATEF;
            this.beanDetDay.IN_DATET = rowData.data.IN_DATET;
            this.beanDetDay.IN_DATE = rowData.data.IN_DATE;

            var flag = Ext.getCmp(prototype.id + '-chkDetailAll').getValue();
            if (flag) {
                this.beanDetDay.FLAG_ALL = "";
            } else {
                this.beanDetDay.FLAG_ALL = "Y";
            }

            console.log(this.beanDetDay);

            me.paramsDetail.beanString = JSON.stringify(this.beanDetDay);
            this.setGridDataByDay();
        }
    },
    setGridDataByDay: function() {

        win.lblUser_toolTip("Estructura: A1692");
        me.panelActual = '-panelGridDetData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueZone.GridData', {
            proxy: {
                url: prototype.url + '/searchByDay'
            }, listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-gridDetData').mask('Loading...');
//                    obj.proxy.extraParams = me.paramsDetail;
                    obj.proxy.extraParams = {beanString: me.paramsDetail, dw_excel: false};
                },
                load: function(obj) {
                    Ext.getCmp(prototype.id + '-gridDetData').unmask();
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
                        var bean = obj.data.items[0].data;
                        var mes = '';
                        switch (bean.DATE.substring(4, 6)) {
                            case  '01':
                                mes = ' - JAN';
                                break;
                            case  '02':
                                mes = ' - FEB';
                                break;
                            case  '03':
                                mes = ' - MAR';
                                break;
                            case  '04':
                                mes = ' - APR';
                                break;
                            case  '05':
                                mes = ' - MAY';
                                break;
                            case  '06':
                                mes = ' - JUN';
                                break;
                            case  '07':
                                mes = ' - JUL';
                                break;
                            case  '08':
                                mes = ' - AUG';
                                break;
                            case  '09':
                                mes = ' - SEP';
                                break;
                            case  '10':
                                mes = ' - OCT';
                                break;
                            case  '11':
                                mes = ' - NOV';
                                break;
                            case  '12':
                                mes = ' - DEC';
                                break;
                        }

                        if (bean.IN_DATE === "DFLIGHT") {
                            Ext.getCmp(prototype.id + '-idDate').setText('FLIGHT');
                            Ext.getCmp(prototype.id + '-gridDetData').setTitle('<center style="font-size:12px;">' + 'FLIGHT DATE: ' + bean.DATE.substring(0, 4) + mes + '</center>');
                        } else {
                            Ext.getCmp(prototype.id + '-idDate').setText('ACCOUNTING');
                            Ext.getCmp(prototype.id + '-gridDetData').setTitle('<center style="font-size:12px;">' + 'ACCOUNTING DATE: ' + bean.DATE.substring(0, 4) + mes + '</center>');
                        }


                        me.setWidthPie();

                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDetData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    onDetZone: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        if (rowData.data.children === null) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDetZone';
            global.selectedChild(me.childs, prototype.id + me.panelActual);

            this.beanDetZone.IN_DATEF = rowData.data.IN_DATEF;
            this.beanDetZone.IN_DATET = rowData.data.IN_DATET;
            this.beanDetZone.IN_ZONA = rowData.data.IN_ZONA;

            this.beanDetZone.IN_DATE = rowData.data.IN_DATE;

            var flag = Ext.getCmp(prototype.id + '-chkDetailAll').getValue();
            if (flag) {
                this.beanDetZone.FLAG_ALL = "";
            } else {
                this.beanDetZone.FLAG_ALL = "Y";
            }

            console.log(this.beanDetZone);


            me.paramsDetail.beanString = JSON.stringify(this.beanDetZone);
            this.setGridDataByZone();
        }
    },
    setGridDataByZone: function() {

        win.lblUser_toolTip("Estructura: A1692");
        me.panelActual = '-panelGridDetZone';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.RevenueZone.GridData', {
            proxy: {
                url: prototype.url + '/searchByZone'
            }, listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-gridDetZone').mask('Loading...');
//                    obj.proxy.extraParams = me.paramsDetail;
                    obj.proxy.extraParams = {beanString: me.paramsDetail, dw_excel: false};
                },
                load: function(obj) {
                    Ext.getCmp(prototype.id + '-gridDetZone').unmask();
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
                        var mes = '';
                        switch (bean.DATE.substring(4, 6)) {
                            case  '01':
                                mes = ' - JAN';
                                break;
                            case  '02':
                                mes = ' - FEB';
                                break;
                            case  '03':
                                mes = ' - MAR';
                                break;
                            case  '04':
                                mes = ' - APR';
                                break;
                            case  '05':
                                mes = ' - MAY';
                                break;
                            case  '06':
                                mes = ' - JUN';
                                break;
                            case  '07':
                                mes = ' - JUL';
                                break;
                            case  '08':
                                mes = ' - AUG';
                                break;
                            case  '09':
                                mes = ' - SEP';
                                break;
                            case  '10':
                                mes = ' - OCT';
                                break;
                            case  '11':
                                mes = ' - NOV';
                                break;
                            case  '12':
                                mes = ' - DEC';
                                break;
                        }

                        if (bean.IN_DATE === "DFLIGHT") {
//                            Ext.getCmp(prototype.id + '-idDate').setText('FLIGHT');
                            Ext.getCmp(prototype.id + '-gridDetZone').setTitle('<center style="font-size:12px;">' + 'FLIGHT DATE: ' + bean.DATE.substring(0, 4) + mes + '</center>');
                        } else {
//                            Ext.getCmp(prototype.id + '-idDate').setText('ACCOUNTING');
                            Ext.getCmp(prototype.id + '-gridDetZone').setTitle('<center style="font-size:12px;">' + 'ACCOUNTING DATE: ' + bean.DATE.substring(0, 4) + mes + '</center>');
                        }


                        me.setWidthPie();

                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDetZone').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    showCheck: function(obj, e) {

        var chk = Ext.getCmp(prototype.id + '-cmbDateSel').getValue();

        if (chk === 'FCONT') {
            Ext.getCmp(prototype.id + '-chkDetailAll').show();
        } else {
            Ext.getCmp(prototype.id + '-chkDetailAll').hide();
        }

    },
    btnClear_click: function(obj, e) {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var zone = Ext.getCmp(prototype.id + '-cmbZone');
//        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
//        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var storeComboDataYear = win.getStoreYear2(false, yearFrom.getValue());

        yearFrom.setValue(this.fecha.getFullYear());
        yearTo.bindStore(storeComboDataYear);
        yearTo.setValue(this.fecha.getFullYear());
        monthFrom.setValue('');
        monthTo.setValue('');
        zone.setValue('');
//        dayFrom.setValue('');
//        dayTo.setValue('');
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

        console.log('------ Excel -------');
        console.log(me.panelActual);
//        
        me.dw_excel = true;
        if (me.panelActual === '-panelGridData') {
            global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
//            me.goURLpost('search', searchParams.beanString, Ext.getCmp(prototype.id + '-gridData').config.columns.items);
        } else if (me.panelActual === '-panelGridDetData') {
            global.getFile(prototype.url + '/getXLSX_Day?beanString=' + me.paramsDetail.beanString);
//            me.goURLpost('searchByDay', me.paramsDetail.beanString, Ext.getCmp(prototype.id + '-gridDetData').config.columns.items);
        } else if (me.panelActual === '-panelGridDetZone') {
            me.goURLpost('searchByZone', me.paramsDetail.beanString, Ext.getCmp(prototype.id + '-gridDetZone').config.columns.items);
        } else if (me.panelActual === '-panelAvrgByZone') {
            global.getFile(prototype.url + '/getXLSXAverage?beanString=' + searchParams.beanString);            
        } else if (me.panelActual === '-panelAvrgByZoneDetDay') {
            //me.goURLpost('searchAverageDetDay', me.paramsDetail.beanString, Ext.getCmp(prototype.id + '-gridDataAvrgByZoneDetDay').config.columns.items); 
            global.getFile(prototype.url + '/getXLSXAverageDetDay?beanString=' + me.paramsDetail.beanString);
        } else {
            me.dw_excel = false;
        }
    },
    goURLpost: function(method, parms, columns) {

        var js_columns = JSON.stringify(columns);

        var mapForm = document.createElement("form");
        mapForm.target = "_blank";
        mapForm.method = "POST"; // or "post" if appropriate
        mapForm.action = prototype.url + '/' + method + '?dw_excel=true';

        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "beanString";
        mapInput.value = parms;
        mapForm.appendChild(mapInput);

        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "columns";
        mapInput.value = js_columns;
        mapForm.appendChild(mapInput);

        document.body.appendChild(mapForm);


        mapForm.submit();
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    /*     
     * Funciones para la paginacion     
     */
    btnBack_click: function(obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
//            me.setWidthPie();
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
            case '-panelGridDetData':
                me.pagginActual = '-paggin';
                break;
            case '-panelGridDetZone':
                me.pagginActual = '-paggin2';
                break;
            case '-panelAvrgByZoneDetDay':
                me.pagginActual = '-paggin3';
                break;
        }
    },
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
    }
});
