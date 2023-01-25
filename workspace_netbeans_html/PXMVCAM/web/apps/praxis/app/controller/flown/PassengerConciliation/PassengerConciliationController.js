/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.PassengerConciliation.PassengerConciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PassengerConciliationController',
    fecha: new Date(),
    paginTem: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    strTipo: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    paramsDetailTicket: {},
    setContext: function() {
        me = this;
    },
    init: function(view) {
        prototype.id = 'PassengerConciliationForm';
        prototype.url = CONTEXTPATH + '/PassengerConciliation';
        me = this;
        me.gridActual = '-gridData';
        this.control({
            // -------------------Eventos Genericos --------------------
            '#PassengerConciliationForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#PassengerConciliationForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#PassengerConciliationForm-btnClear': {
                click: this.btnClear_click
            },
            '#PassengerConciliationForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#PassengerConciliationForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#PassengerConciliationForm-btnBack': {
                click: this.btnBack_click
            },
            '#PassengerConciliationForm-btnQuery': {
                click: this.btnQuery_click
            },
            '#PassengerConciliationForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#PassengerConciliationForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#PassengerConciliationForm-btn-pag-next': {
                click: this.pagNext
            },
            '#PassengerConciliationForm-btn-pag-last': {
                click: this.pagLast
            },

            //-----------------Eventos Especificos -------------------

            '#PassengerConciliationForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#PassengerConciliationForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            },
            '#PassengerConciliationForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#PassengerConciliationForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#PassengerConciliationForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
            '#PassengerConciliationForm-cmbValorizado': {
                change: this.onChangeCmb
            },
            '#PassengerConciliationForm-txtFlight': {
                keyup: this.eventKey,
                focusleave: this.onFocusLeave
            },
            '#PassengerConciliationForm-txtTKT': {
                keyup: this.eventKey
            }

        });
    },
    xpanel_afterrender: function(obj, e) {


        this.setStoreData();
        this.showGridActual();
        //comentar al inicio
        this.btnSearch_click();
    },
    showGridActual: function() {
        this.hideAllGrid();
        switch (me.gridActual) {
            case  '-gridData':
//                Ext.getCmp(prototype.id + '-panelDataSummary').show();
                Ext.getCmp(prototype.id + '-panelPagination').hide();
                Ext.getCmp(prototype.id + '-pie').hide();
                Ext.getCmp(prototype.id + '-labelTitle').hide();

                break;
            case '-gridDataDetail':
//                Ext.getCmp(prototype.id + '-panelDataDetailSummary').show();
                Ext.getCmp(prototype.id + '-panelPagination').hide();
                Ext.getCmp(prototype.id + '-pie').hide();
                Ext.getCmp(prototype.id + '-labelTitle').show();
                break;
            case '-gridDataDetailTicket':
                Ext.getCmp(prototype.id + '-panelPagination').show();
                Ext.getCmp(prototype.id + '-pie').show();
                Ext.getCmp(prototype.id + '-labelTitle').hide();
                break;
            case '-gridDataDetailTicketSecundario':
                Ext.getCmp(prototype.id + '-panelPagination').show();
                Ext.getCmp(prototype.id + '-pie').show();
                Ext.getCmp(prototype.id + '-labelTitle').hide();
                break;
        }
        Ext.getCmp(prototype.id + this.gridActual).show();
    },
    hideAllGrid: function() {
        Ext.getCmp(prototype.id + '-gridData').hide();
//        Ext.getCmp(prototype.id + '-panelDataSummary').hide();
        Ext.getCmp(prototype.id + '-gridDataDetail').hide();
//        Ext.getCmp(prototype.id + '-panelDataDetailSummary').hide();
        Ext.getCmp(prototype.id + '-gridDataDetailTicket').hide();
        Ext.getCmp(prototype.id + '-gridDataDetailTicketSecundario').hide();
    },
    onFocusLeave: function(obj) {
        var flightNum = Ext.getCmp(prototype.id + '-txtFlight');
        if (flightNum.getValue().length >= 1) {
            while (flightNum.getValue().length < 4) {
                flightNum.setValue('0' + flightNum.getValue());
            }
        }
    },
    onChangeCmb: function(obj) {
        // this.btnSearch_click();
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function(obj) {
        obj.setValue('');
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
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataYear2 = win.getStoreYear2(false, this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear2);
        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        var storeComboDataDay = win.getStoreDays(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");

        var cmbFlagFlown = Ext.getCmp(prototype.id + '-cmbFlagFlown');
        var cbxCarrier = Ext.getCmp(prototype.id + '-cbxCarrier');
        var cmbValorizado = Ext.getCmp(prototype.id + '-cmbValorizado');


        cmbFlagFlown.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["P", "Scheduled"],
                ["C", "Charter"],
                ["X", "Canceled"],
                ["U", "Unscheduled"]
            ]}));
        cmbFlagFlown.setValue("");

        cbxCarrier.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["AM", "Aeroméxico"],
                ["5D", "AM Connect"],
                ["VW", "Aeromar"]

            ]}));
        cbxCarrier.setValue("");

        cmbValorizado.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["V", "Valued"],
                ["NV", "Not Valued"]

            ]}));
        cmbValorizado.setValue("");

    },
    btnSearch_click: function(obj, e) {

        this.setFormatParameter();
        if (searchParams.IN_TKT.trim() !== '') {
            if (searchParams.IN_TKT.trim().length === 13) {
                this.setGridDataTicket();
                me.drillDown.push(me.gridActual);
                me.gridActual = '-gridDataDetailTicketSecundario';
                this.showGridActual();
            } else {
                global.Msg({
                    msg: 'Ticket number must contain 13 digits.'
                });
            }
        } else {
            me.drillDown = [];
            me.gridActual = '-gridData';
            this.showGridActual();
            this.setGridData(obj, e);
        }

    },
    setFormatParameter: function() {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');

        if (dayFrom.getValue() === null || dayFrom.getValue() === '') {
            dayFrom.setValue('');
            dayTo.setValue('');
        } else {
            if (dayTo.getValue() === null || dayTo.getValue() === '') {
                dayTo.setValue(31);
            }
        }

        var IN_CARRIER = Ext.getCmp(prototype.id + '-cbxCarrier').getValue();
        var FFLOW = Ext.getCmp(prototype.id + '-cmbFlagFlown').getValue();
        var FSTAPO = Ext.getCmp(prototype.id + '-cmbValorizado').getValue();
        var NFLIGHT = Ext.getCmp(prototype.id + '-txtFlight').getValue();
        var IN_TKT = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        var IN_FECHA_FROM = yearFrom.getValue() + monthFrom.getValue() + dayFrom.getValue();
        var IN_FECHA_TO = yearTo.getValue() + monthTo.getValue() + dayTo.getValue();

        searchParams = {
            IN_CARRIER: IN_CARRIER,
            FFLOW: FFLOW,
            FSTAPO: FSTAPO,
            IN_FECHA_FROM: IN_FECHA_FROM,
            IN_FECHA_TO: IN_FECHA_TO,
            NFLIGHT: NFLIGHT,
            IN_TKT: IN_TKT
        };
//        console.log("IN_FECHA_FROM : " + IN_FECHA_FROM);
//        console.log("IN_FECHA_TO : " + IN_FECHA_TO);
//        console.log("IN_NFLIGHT : " + NFLIGHT);
//        console.log("IN_TKT : " + IN_TKT);
//        console.log("IN_CARRIER : " + IN_CARRIER);
//        console.log("FFLOW : " + FFLOW);
//        console.log("FSTAPO : " + FSTAPO);
    },
    setGridData: function(obj, val) {
//        this.clearTotalRowGridData();
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    console.log(obj.data);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
//                        me.setTotalRowGridData(bean);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
    },
    setGridDataDetail: function() {

//        this.clearTotalRowGridDataDetail();
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        console.log(bean);
//                        me.setTotalRowGridDataDetail(bean);
                        
                        var tit = Ext.getCmp(prototype.id + '-gridDataDetail');
                        tit.setTitle('<center style="font-size:12px;">' + 'Flight Date: ' + ' : ' + bean.strFormatDate.substr(0, 4) + ' ' + 
                                win.getAbreviaturaMes(bean.DFLIGHT.substr(4, 2)) + ' - ' + bean.strTitulo +'</center>');
                    }
                }
            }
        });

        global.clear();
//        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataDetail').setStore(storeGridDatas);

    },
    setGridDataDetailTicket: function() {

        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/searchDetailTicket'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString:JSON.stringify(me.paramsDetailTicket)};
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
                    }else{
                        var data = obj.data.items[0].data;
                        console.log(data);
                        
                        var tit = Ext.getCmp(prototype.id + '-gridDataDetailTicket');
                        tit.setTitle('<center style="font-size:12px;">' + 'Flight Date: ' + ' : ' + data.strFormatDate + '  - Flight Nbr: ' + data.NFLIGHT + '  - Departure: ' + data.CDEPART + '  - Arrival: ' + data.CARRIVA + '-' + data.strDescripcion +'</center>');
                        
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailTicket').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    setGridDataTicket: function() {

        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/searchTKT'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {
                        IN_TKT: Ext.getCmp(prototype.id + '-txtTKT').getValue()
                    };
                },
                load: function(obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin2');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailTicketSecundario').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    onSetGridDataDetail: function(obj, metaData, rowNum, column, obj2, rowData) {

        me.drillDown.push(me.gridActual);
        me.gridActual = '-gridDataDetail';
        this.showGridActual();
        var data = rowData.data;
        var strTipo = '';
        var cant = 0;
        switch (column) {
            case 3:
                strTipo = 'QREC';
                cant = data.lngQPHY;
                break;
            case 4:
                strTipo = 'QCLO';
                cant = data.lngQCLO;
                break;
            case 5:
                strTipo = 'QPEN';
                cant = data.lngQPRO;
                break;
            case 6:
                strTipo = 'QVAL';
                cant = data.QCPNVAL;
                break;
        }

        me.paramsDetail = {
            strTipo: strTipo,
            DFLIGHT: data.DFLIGHT,
            NFLIGHT: data.NFLIGHT,
            LEGSEQ: data.LEGSEQ,
            CARRI: data.CARRI,
            FFLOW: data.FFLOW,
            FSTAPO: data.FSTAPO
        };
        if (cant > 0) {
            this.setGridDataDetail();
        }
    }
    ,
    onSetGridDataDetailTicket: function(obj, metaData, rowNum, column, obj2, rowData) {
        me.drillDown.push(me.gridActual);
        me.gridActual = '-gridDataDetailTicket';
        this.showGridActual();
        var data = rowData.data;
        var strTipo = '';
        var cant = 0;
        switch (column) {
            case 4:
                strTipo = 'QREC';
                cant = data.QCPNVC;
                break;
            case 8:
                strTipo = 'QAM';
                cant = data.QCPNMA;
                break;
        }

        me.paramsDetailTicket = {
            strTipo: strTipo,
            DFLIGHT: data.DFLIGHT,
            FSTAPO: data.FSTAPO,
            NFLIGHT: data.NFLIGHT,
            CDEPART: data.CDEPART,
            CARRIVA: data.CARRIVA,
            CARRI: Ext.getCmp(prototype.id + '-cbxCarrier').getValue(),
            LEGSEQ: data.LEGSEQ
        };

        if (cant > 0) {
            this.setGridDataDetailTicket();
        }
    },
    eventKey: function(e, eOpts) {

        if (eOpts.getKey() === 13) {
            var flightNum = Ext.getCmp(prototype.id + '-txtFlight');
            if (flightNum.getValue().length >= 1) {
                while (flightNum.getValue().length < 4) {
                    flightNum.setValue('0' + flightNum.getValue());
                }
            }
            this.btnSearch_click();
        }
    },
    btnBack_click: function(obj, e) {


        if (me.drillDown.length > 0) {
            me.gridActual = me.drillDown.pop();
            this.showGridActual();
            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        }
    }
    , btnClear_click: function(obj, e) {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var txtTKT = Ext.getCmp(prototype.id + '-txtTKT');
        var txtFlight = Ext.getCmp(prototype.id + '-txtFlight');
        yearFrom.setValue(this.fecha.getFullYear());
        var storeComboDataYear = win.getStoreYear2(false, yearFrom.getValue());
        yearTo.bindStore(storeComboDataYear);
        yearTo.setValue(this.fecha.getFullYear());
        monthFrom.setValue('');
        monthTo.setValue('');
        dayFrom.setValue('');
        dayTo.setValue('');
        txtTKT.setValue('');
        txtFlight.setValue('');
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

        switch (me.gridActual) {
            case  '-gridData':
                global.getFile(prototype.url + '/getXLSX?IN_CARRIER=' + searchParams.IN_CARRIER
                        + '&FFLOW=' + searchParams.FFLOW
                        + '&FSTAPO=' + searchParams.FSTAPO
                        + '&IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM
                        + '&IN_FECHA_TO=' + searchParams.IN_FECHA_TO
                        + '&NFLIGHT=' + searchParams.NFLIGHT
                        + '&IN_TKT=' + searchParams.IN_TKT);
                break;


            case '-gridDataDetail':
                global.getFile(prototype.url + '/getDetailXLSX?strTipo=' + me.paramsDetail.strTipo
                        + '&DFLIGHT=' + me.paramsDetail.DFLIGHT
                        + '&NFLIGHT=' + me.paramsDetail.NFLIGHT
                        + '&LEGSEQ=' + me.paramsDetail.LEGSEQ
                        + '&CARRI=' + me.paramsDetail.CARRI
                        + '&FFLOW=' + me.paramsDetail.FFLOW
                        + '&FSTAPO=' + me.paramsDetail.FSTAPO
                        );
                break;
            case '-gridDataDetailTicket':
                global.getFileExcelPost('searchDetailTicket',JSON.stringify(me.paramsDetailTicket) , Ext.getCmp(prototype.id + '-gridDataDetailTicket').config.columns.items);
                break;
        }
    }
    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    /**
     * Metodos usados para editar
     * */
    btnAdd_click: function(obj, e) {
        switch (me.gridActual) {
            case  '-gridData':
                break;
            case '-gridDataDetail':
                this.winDataEntry('I');
                break;
            case '-gridDataDetailTicket':
                this.winDataEntry2('I');
                break;
        }
    },
    btnQuery_click: function() {
        var myForm = document.createElement('FORM');
        myForm.method = 'post';
        myForm.action = CONTEXTPATH + '/Home#program-query-flight-form';
        myForm.id = 'QueryFlightForm';
        document.body.appendChild(myForm);
        myForm.submit();
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);
    },
    winDataEntry: function(action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        all = all === null || all === undefined ? {} : all;

        var dataEntry = Ext.create('Ext.Praxis.view.flown.PassengerConciliationForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                all: all,
                rowIndex: rowIndex
            }
        });
        dataEntry.setId(prototype.id + "-dataEntry");
        dataEntry.show();
    },
//    clearTotalRowGridData: function(bean) {
//        Ext.getCmp(prototype.id + '-totLngQPHY').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totLngQCLO').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totLngQPRO').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totQCPNVAL').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totQCPNOAL').setHtml(Ext.util.Format.number(0, '0,000.0') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totQCPNON').setHtml(Ext.util.Format.number(0, '0,000.0') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totLngQDIFF').setHtml(Ext.util.Format.number(0, '0,000.0') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totLngQACC').setHtml(Ext.util.Format.number(0, '0,000.0') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totQCPNTOT').setHtml(Ext.util.Format.number(0, '0,000.0') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totQCPCON').setHtml(Ext.util.Format.number(0, '0,000.0') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totA1791ORAV').setHtml(Ext.util.Format.number(0, '000') + '%&nbsp');
//        Ext.getCmp(prototype.id + '-totVCPNLOC').setHtml(Ext.util.Format.number(0, '0,000.0') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totVCPNUSD').setHtml(Ext.util.Format.number(0, '0,000.0') + '&nbsp');
//    },
//    setTotalRowGridData: function(bean) {
//        Ext.getCmp(prototype.id + '-totLngQPHY').setHtml(Ext.util.Format.number(bean.totLngQPHY, '0,000') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totLngQCLO').setHtml(Ext.util.Format.number(bean.totLngQCLO, '0,000') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totLngQPRO').setHtml(Ext.util.Format.number(bean.totLngQPRO, '0,000') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totQCPNVAL').setHtml(Ext.util.Format.number(bean.totQCPNVAL, '0,000') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totQCPNOAL').setHtml(Ext.util.Format.number(bean.totQCPNOAL, '0,000.00') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totQCPNON').setHtml(Ext.util.Format.number(bean.totQCPNON, '0,000.00') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totLngQDIFF').setHtml(Ext.util.Format.number(bean.totLngQDIFF, '0,000.00') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totLngQACC').setHtml(Ext.util.Format.number(bean.totLngQACC, '0,000.00') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totQCPNTOT').setHtml(Ext.util.Format.number(bean.totQCPNTOT, '0,000.00') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totQCPCON').setHtml(Ext.util.Format.number(bean.totQCPCON, '0,000.00') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totA1791ORAV').setHtml(Ext.util.Format.number(bean.totA1791ORAV, '0,000') + '%&nbsp');
//        Ext.getCmp(prototype.id + '-totVCPNLOC').setHtml(Ext.util.Format.number(bean.totVCPNLOC, '0,000.00') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totVCPNUSD').setHtml(Ext.util.Format.number(bean.totVCPNUSD, '0,000.00') + '&nbsp');
//    },
//    clearTotalRowGridDataDetail: function(bean) {
//        Ext.getCmp(prototype.id + '-totQCPNVC2').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totQCPNVAL2').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totlngQDIFF2').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totQCPNOAL2').setHtml(Ext.util.Format.number(0, '0,000') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totQCPNMA2').setHtml(Ext.util.Format.number(0, '0,000.0') + '&nbsp');
//    },
//    setTotalRowGridDataDetail: function(bean) {
//        Ext.getCmp(prototype.id + '-totQCPNVC2').setHtml(Ext.util.Format.number(bean.totQCPNVC, '0,000') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totQCPNVAL2').setHtml(Ext.util.Format.number(bean.totQCPNVAL, '0,000') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totlngQDIFF2').setHtml(Ext.util.Format.number(bean.totlngQDIFF, '0,000') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totQCPNOAL2').setHtml(Ext.util.Format.number(bean.totQCPNOAL, '0,000') + '&nbsp');
//        Ext.getCmp(prototype.id + '-totQCPNMA2').setHtml(Ext.util.Format.number(bean.totQCPNMA, '0,000.00') + '&nbsp');
//    },
    /*     
     * Funciones para la paginacion     
     */
    showTicket: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        console.log('RowData');
        console.log(rowData.data);
        me.viewMasterTkt(rowData.data);
    },
    viewMasterTkt: function(data) {

        prototypeProgram.view = 'flown-passenger-conciliation-form';
        prototypeProgram.nprog = 'PX00000095';
        prototypeProgram.title = 'Passenger Conciliation';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = data.CCIA;
        beanProMasterTicket.IN_FORMA = data.FORMA;
        beanProMasterTicket.IN_SERIE = data.SERIE;
        beanProMasterTicket.IN_SEQ = data.SEQRO;

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    getPaggin: function() {
        switch (me.gridActual) {
            case  '-gridData':
                break;
            case '-gridDataDetail':
                me.pagginActual = '-paggin';
                break;
            case '-gridDataDetailTicket':
                me.pagginActual = '-paggin2';
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
