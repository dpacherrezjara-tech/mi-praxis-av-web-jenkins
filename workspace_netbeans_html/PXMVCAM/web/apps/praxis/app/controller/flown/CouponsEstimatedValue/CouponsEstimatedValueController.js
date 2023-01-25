/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.CouponsEstimatedValue.CouponsEstimatedValueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CouponsEstimatedValueController',
    fecha: new Date(),
    childs: '5',
    searchParams: {},
    searchParamsExc: {},
    me: '',
    panelActual: '',
    setContext: function () {
        me = this;
    },
    init: function(view) {
        prototype.id = 'CouponsEstimatedValueForm';
        prototype.url = CONTEXTPATH + '/CouponsEstimatedValue';
        me = this;
        me.panelActual = '-panelGridData';
//        global.selectedChild(me.childs, prototype.id + me.panelActual);

        prototypeProgram.view = 'flown-coupons-estimated-value-form';
        prototypeProgram.nprog = 'PX00000098';
        prototypeProgram.title = 'Pending Accounting Coupons';
        prototypeProgram.modulo = '';

        this.control({
            // -------------------Eventos Genericos --------------------
            '#CouponsEstimatedValueForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#CouponsEstimatedValueForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CouponsEstimatedValueForm-btnClear': {
//                click: this.btnClear_click
            },
            '#CouponsEstimatedValueForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#CouponsEstimatedValueForm-btnBack': {
                click: this.btnBack_click
            },
            '#CouponsEstimatedValueForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CouponsEstimatedValueForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CouponsEstimatedValueForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CouponsEstimatedValueForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CouponsEstimatedValueForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------

            '#CouponsEstimatedValueForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear
            },
            '#CouponsEstimatedValueForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            },
            '#CouponsEstimatedValueForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth
            },
            '#CouponsEstimatedValueForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth
            },
            '#CouponsEstimatedValueForm-txtTKT': {
                keyup: this.eventKey
            }

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
        var month = this.fecha.getMonth() + 1;
        if (month < 9) {
            obj.setValue('0' + month);
        } else {
            obj.setValue((month));
        }
    },
    selectComboFromDay: function(obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        var cmbFecha = Ext.getCmp(prototype.id + '-cmbFecha');
        cmbFecha.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["1", "VCR Date"],
                ["2", "Flight Date"],
                //["3", "Created Date"]

            ]}));
        cmbFecha.setValue("1");
        
        var cmbCARR = Ext.getCmp(prototype.id + '-cmbCARR');
        cmbCARR.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["5D", "5D"],
                ["AM", "AM"]

            ]}));
        cmbCARR.setValue("");
        
        var cmbZONAC = Ext.getCmp(prototype.id + '-cmbZONAC');
        cmbZONAC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["ASI", "ASIA"],
                ["CAN", "CANADA"],
                ["CAM", "CENTROAMERICA"],
                ["USA", "ESTADOS UNIDOS"],
                ["EUR", "EUROPA"],
                ["FRO", "FRONTERA"],
                ["LOC", "LOCAL"],
                ["PLA", "PLAYA"],
                ["SUD", "SUDAMERICA"],
                ["OCE", "OCEANIA"],
                ["AFR", "AFRICA"]

            ]}));
        cmbZONAC.setValue("");
        
        var cmbSTOCKAC = Ext.getCmp(prototype.id + '-cmbSTOCKAC');
        cmbSTOCKAC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["1", "139"],
                ["2", "OAL"]

            ]}));
        cmbSTOCKAC.setValue("");
        
        var cmbTypeAC = Ext.getCmp(prototype.id + '-cmbTypeAC');
        cmbTypeAC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["F", "FLOWN"],
                ["E", "EMD"]

            ]}));
        cmbTypeAC.setValue("F");
        
        var cmbFvalAC = Ext.getCmp(prototype.id + '-cmbFvalAC');
        cmbFvalAC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["e", "All"],
                ["1", "YES"],
                ["N", "NO"],
                ["D", "Duplicate"]

            ]}));
        cmbFvalAC.setValue("e");
    },
    btnSearch_click: function(obj, e) {

        this.setFormatParameter();
            
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {

        me.bean = {};
        me.bean.IN_TKT = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        me.bean.IN_SEQ = Ext.getCmp(prototype.id + '-txtSEQ').getValue();
        me.bean.IN_CARR = Ext.getCmp(prototype.id + '-cmbCARR').getValue();
        me.bean.IN_ZONA = Ext.getCmp(prototype.id + '-cmbZONAC').getValue();
        me.bean.IN_STVAL = Ext.getCmp(prototype.id + '-cmbSTOCKAC').getValue();
        me.bean.IN_TYPE = Ext.getCmp(prototype.id + '-cmbTypeAC').getValue();
        me.bean.IN_FVAL = Ext.getCmp(prototype.id + '-cmbFvalAC').getValue();
        me.bean.IN_TIPOFECHA = Ext.getCmp(prototype.id + '-cmbFecha').getValue();
        
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        
        me.bean.IN_FECHA_FROM = yearFrom.getValue() + monthFrom.getValue();
        me.bean.IN_FECHA_TO = yearTo.getValue() + monthTo.getValue();
                
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString
        };
//        console.log(me.bean);   
        
    },
    setGridData: function(obj, val) {
        win.lblUser_toolTip("Estructura: A1692");
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.CouponsEstimatedValue.GridData', {
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
                        else {
                            var data = obj.data.items[0].data;
//                            console.log(data);
                        }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    btnBack_click: function(obj, e) {

    },
    onBtnReverse: function() {

        if (true) {
            global.Msg({
                msg: 'Please select a Ticket of the list.'
            });
        } else {

        }
    }
    , 
    btnClear_click: function(obj, e) {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var txtTKT = Ext.getCmp(prototype.id + '-txtTKT');
        var txtSEQ = Ext.getCmp(prototype.id + '-txtSEQ');
        yearFrom.setValue(this.fecha.getFullYear());
        monthFrom.setValue("");
        yearTo.setValue("");
        monthTo.setValue("");
        txtTKT.setValue("");
        txtSEQ.setValue("");
    },
    btnExcel_click: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download data?',
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

        this.setFormatParameter();
//        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            default:
                global.Msg(
                    {msg: 'Under Construction'}
                );
        }

    },
    
//    exportExcel: function() {
//
//        switch (me.gridActual) {
//            case  '-gridData':
//                global.getFile(prototype.url + '/getXLSX?IN_CARRIER=' + searchParams.IN_CARRIER
//                        + '&FFLOW=' + searchParams.FFLOW
//                        + '&FSTAPO=' + searchParams.FSTAPO
//                        + '&IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM
//                        + '&IN_FECHA_TO=' + searchParams.IN_FECHA_TO
//                        + '&NFLIGHT=' + searchParams.NFLIGHT
//                        + '&IN_TKT=' + searchParams.IN_TKT);
//                break;
//
//
//            case '-gridDataDetail':
//                global.getFile(prototype.url + '/getDetailXLSX?strTipo=' + me.paramsDetail.strTipo
//                        + '&DFLIGHT=' + me.paramsDetail.DFLIGHT
//                        + '&NFLIGHT=' + me.paramsDetail.NFLIGHT
//                        + '&LEGSEQ=' + me.paramsDetail.LEGSEQ
//                        + '&CARRI=' + me.paramsDetail.CARRI
//                        + '&FFLOW=' + me.paramsDetail.FFLOW
//                        + '&FSTAPO=' + me.paramsDetail.FSTAPO
//                        );
//                break;
//        }
//    }
//    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-panelDateFilters');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
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
    },
    displayMasterTkt_clickHandler: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.strTicket.trim();
        var beanProMasterTicket = {};
        
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(8, 6);
//        beanProMasterTicket.IN_SEQ = '00';

        console.log(beanProMasterTicket);
        
        win.displayProMasterTicket(this, 'PendingAccountingCoupons', beanProMasterTicket);
    },
    
});
