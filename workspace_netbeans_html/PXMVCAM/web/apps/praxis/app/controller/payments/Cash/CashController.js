
Ext.define('Ext.Praxis.controller.payments.Cash.CashController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CashController',
    fecha: new Date(),
    stack: [],
    bean: {},
    beanList: {},
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    reg99: 0,
    me: '',
    dup: '',
    searchParams: {},
    paramsDetail: {},
    paramsTKT: {},
    dataObtain: {},
    beanTKT: {},
    dataGrid: [],
    init: function (view) {
        me = this;  
        prototype.id = 'CashForm';
        prototype.url = CONTEXTPATH + '/Cash';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-boxMainData';
        prototypeProgram.view = 'payments-cash-form';
        prototypeProgram.nprog = 'PX00001023';
        prototypeProgram.title = 'Cash';
        prototypeProgram.modulo = '';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#CashForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#CashForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CashForm-btnClear': {
                click: this.btnClear_click
            },
            '#CashForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CashForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#CashForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#CashForm-btnBack': {
                click: this.btnBack_click
            },
            '#CashForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#CashForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#CashForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CashForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CashForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CashForm-btn-pag-last': {
                click: this.pagLast
            }

        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
        this.HabilitarCampo();
    },
    
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    initDate: function () {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");
    },
    cbxDateFromYear_changeHandler: function () {
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue());
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    cbxDateToYear_changeHandler: function () {
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
    cbxDateFromMonth_changeHandler: function () {
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());
        if (Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() != '') {
            Ext.getCmp(prototype.id + '-cmbDateDay').setDisabled(false);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setDisabled(false);
        } else {
            Ext.getCmp(prototype.id + '-cmbDateDay').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setDisabled(true);
            Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
            Ext.getCmp(prototype.id + '-cmbDateDay').setValue('');
        }
    },
    cbxDateToMonth_changeHandler: function () {
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (comboToMonth.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(comboToMonth.getValue());
            }
        }
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    selectComboToDay: function (obj) {
        console.log('wadafa')
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
    setStoreData: function () {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);

        Ext.getCmp(prototype.id + '-cmbDateFromYear_IBT').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear_IBT').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateFromMonth_IBT').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth_IBT').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");

        Ext.getCmp(prototype.id + '-cmbDateDay_IBT').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay_IBT').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateDay_IBT').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay_IBT').setValue("");

        //        Ext.getCmp(prototype.id+'-cmbDateFromDay').bindStore(storeComboDataMonth);
        //        Ext.getCmp(prototype.id+'-cmbDateToDay').bindStore(storeComboDataMonth);
    },
    // </editor-fold>
    
    DeshabilitarCampo: function() {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').disable();
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').disable();
        Ext.getCmp(prototype.id + '-cmbDateFromDay').disable();
        Ext.getCmp(prototype.id + '-cmbDateToYear').disable();
        Ext.getCmp(prototype.id + '-cmbDateToMonth').disable();
        Ext.getCmp(prototype.id + '-cmbDateToDay').disable();
        Ext.getCmp(prototype.id + '-cmbPERNUM').disable();
        Ext.getCmp(prototype.id + '-cmbPROCIND').disable();
        Ext.getCmp(prototype.id + '-cmbCode').disable();
        Ext.getCmp(prototype.id + '-cmbTRANSTYPE').disable();
        Ext.getCmp(prototype.id + '-txtAGENTE').disable();
    },
    
    HabilitarCampo: function() {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').enable();
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').enable();
        Ext.getCmp(prototype.id + '-cmbDateFromDay').enable();
        Ext.getCmp(prototype.id + '-cmbDateToYear').enable();
        Ext.getCmp(prototype.id + '-cmbDateToMonth').enable();
        Ext.getCmp(prototype.id + '-cmbDateToDay').enable();
        Ext.getCmp(prototype.id + '-cmbPERNUM').enable();
        Ext.getCmp(prototype.id + '-cmbPROCIND').enable();
        Ext.getCmp(prototype.id + '-cmbCode').enable();
        Ext.getCmp(prototype.id + '-cmbTRANSTYPE').enable();
        Ext.getCmp(prototype.id + '-txtAGENTE').enable();
    },
    
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    
    BuscarTKT_keyDownHandler: function (e, eOpts) {
        var ticket = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        
        switch (eOpts.getKey()) {
            case  13:
                if (ticket.trim().length === 13) {
                    me.beanTKT.IN_TKT = ticket
                    var beanString = JSON.stringify(me.beanTKT);
                    me.paramsTKT = {
                        beanString: beanString,
                    };
                    this.setGridDataTKT();
                } else {
                    global.Msg({
                        msg: 'Ticket number must contain 13 digits.'
                    });
                }
                
                if(ticket.trim() !== ''){
                    this.DeshabilitarCampo();
                }
                break;
            case 8:
                this.HabilitarCampo();
                break;
            case 32:
                this.HabilitarCampo();
                break;
            case 46:
                this.HabilitarCampo();
                break;
        }
        
        if(ticket.trim() === ''){
            this.HabilitarCampo();
	} 
        
    },
    
    obtainData: function () {

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

        var cmbPERNUM = Ext.getCmp(prototype.id + '-cmbPERNUM');
        cmbPERNUM.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["01", "01"],
                ["02", "02"],
                ["03", "03"],
                ["04", "04"]
            ]
        }));
        cmbPERNUM.setValue("");

        var cmbPROCIND = Ext.getCmp(prototype.id + '-cmbPROCIND');
        cmbPROCIND.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["1", "1 - BILLED ELECTRONICALLY"],
                ["2", "2 - BILLED ELECTRONICALLY"],
                ["3", "3"],
                ["4", "4 - NOT PRESENTED TO CARD COMPANY"]
            ]
        }));
        cmbPROCIND.setValue("");
        
        var cmbTRANSTYPE = Ext.getCmp(prototype.id + '-cmbTRANSTYPE');
        cmbTRANSTYPE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["S", "SALES"],
                ["R", "REFUNDS"]
            ]
        }));
        cmbTRANSTYPE.setValue("S");

        this.dataObtain.CARD = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify({
                    COUNTRY: 2, CARD: 2, USERPERMIS : 2, NPROG: sessionStorage.getItem('nprog')
                })
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-cmbCountry').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCountry, autoLoad: true})
                            );
                    me.lstTarjetas = res.lstCard;
//                    Ext.getCmp(prototype.id + '-cmbCardType').bindStore(
//                            Ext.create('Ext.data.Store', {data: me.lstTarjetas, autoLoad: true})
//                            );
                    win.setValue('cmbCountry', '');
//                    win.setValue('cmbCardType', '');
                    me.btnSearch_click();
                } else
//                    global.Msg({msg: res.sesion});
                    global.clear();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },

    setFormatParameter: function () {
        me.bean = {};

        me.bean.IN_DATE_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + 
                                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
                        
        me.bean.IN_DATE_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                              Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                              Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        me.bean.PERIOD = Ext.getCmp(prototype.id + '-cmbPERNUM').getValue();
        me.bean.PROCIND = Ext.getCmp(prototype.id + '-cmbPROCIND').getValue();
        me.bean.ENTITY = Ext.getCmp(prototype.id + '-cmbCode').getValue();
        me.bean.AGENTE = Ext.getCmp(prototype.id + '-txtAGENTE').getValue( );
        me.bean.TRANSTYPE = Ext.getCmp(prototype.id + '-cmbTRANSTYPE').getValue();
                
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
        win.lblUser_toolTip("Estructura: MPF100NEW");
        let me = this;
        this.beanList.IN_TDOC = "";
        this.beanList.IN_COUNTRY = "";
        this.beanList.IN_PAYMENT = "";
        this.beanList.IN_CARDC = "";
        this.beanList.IN_TICKET = "";
        this.beanList.IN_FTE = "";
        this.beanList.IN_AFTE = "";
        this.beanList.IN_CARDN = "";
        this.beanList.IN_STVAL = "";
        this.beanList.IN_MERCHN = "";
        this.beanList.IN_ADYEN = "";
        this.beanList.IN_SCAR = "";
        this.beanList.IN_EXT = "";
        this.beanList.strFecFiltro = 'SDATE';
        
        this.beanList.strYearFrom  = String(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue());
        this.beanList.strMonthFrom =  String(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());
        this.beanList.strYearTo  =  String(Ext.getCmp(prototype.id + '-cmbDateToYear').getValue());
        this.beanList.strMonthTo =  String(Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue());
        me.panelActual = '-boxMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        }
        else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.beanList)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: MPF108");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
//                        global.Msg({msg: res.sesion});
                        global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    }
    },
    
    

    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },

    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            if (me.panelActual !== '-panelGridData') {
//                me.setWidthPie();
            }
            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
//                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },
    
    peek: function () {
        if (this.stack.length > 0) {
            return this.stack[this.stack.length - 1];
        } else
            return "";
    },  
    
    gridDetailMore: function (column, e, row, column, x, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxMainDetailDate';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var beanDet = x.record.data;
        console.log(beanDet,"Esto es un detalle")
//        win.selectedChild('vskMain', 'boxDetCountryS');
//
//        beanDet.CFUENTE = '1';
        beanDet.strYearFrom  = String(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue());
        beanDet.strMonthFrom =  String(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());
        beanDet.strYearTo  =  String(Ext.getCmp(prototype.id + '-cmbDateToYear').getValue());
        beanDet.strMonthTo =  String(Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue());
        this.searchDetMonth(beanDet);
    },
    
    bankAssignmentARC: function (column, e, row, column, x, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxMainDetailDate';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        Ext.getCmp(prototype.id + '-panelDetailDate').show();
        Ext.getCmp(prototype.id + '-panelMain').hide();
        var beanDet = x.record.data;
        console.log(beanDet,"Esto es un detalle")
        beanDet.strYearFrom  = String(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue());
        beanDet.strMonthFrom =  String(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());
        beanDet.strYearTo  =  String(Ext.getCmp(prototype.id + '-cmbDateToYear').getValue());
        beanDet.strMonthTo =  String(Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue());
        beanDet.IN_BANK = 'ARC';
        this.searchDetMonth(beanDet);
    },
    
    bankAssignmentBSP: function (column, e, row, column, x, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxMainDetailDate';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        Ext.getCmp(prototype.id + '-panelDetailDate').show();
        Ext.getCmp(prototype.id + '-panelMain').hide();
        var beanDet = x.record.data;
        console.log(beanDet,"Esto es un detalle")
        beanDet.strYearFrom  = String(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue());
        beanDet.strMonthFrom =  String(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());
        beanDet.strYearTo  =  String(Ext.getCmp(prototype.id + '-cmbDateToYear').getValue());
        beanDet.strMonthTo =  String(Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue());
        beanDet.IN_BANK = 'BSP';
        this.searchDetMonth(beanDet);
    },
    
    bankAssignmentVenta : function (column, e, row, column, x, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxMainDetailDate';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        Ext.getCmp(prototype.id + '-panelDetailDate').show();
        Ext.getCmp(prototype.id + '-panelMain').hide();
        var beanDet = x.record.data;
        console.log(beanDet,"Esto es un detalle")
        beanDet.strYearFrom  = String(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue());
        beanDet.strMonthFrom =  String(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());
        beanDet.strYearTo  =  String(Ext.getCmp(prototype.id + '-cmbDateToYear').getValue());
        beanDet.strMonthTo =  String(Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue());
        beanDet.IN_BANK = '';
        this.searchDetMonth(beanDet);
    },
    
    bankReportDay : function (column, e, row, column, x, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxMainDetailDay';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        console.log(me.drillDown,"Arreglo de paneles"),
        console.log(me.childs,"Arreglo de childs"),
        console.log(prototype.id + me.panelActual,"Arreglo de panelActual"),
                
        Ext.getCmp(prototype.id + '-panelDetailDay').show();
        Ext.getCmp(prototype.id + '-panelDetailDate').hide();
        var beanDet = x.record.data;
        console.log(beanDet,"Esto es un detalle")
        beanDet.strYearFrom  = String(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue());
        beanDet.strMonthFrom =  String(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());
        beanDet.strDayFrom =  String(Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue());
        beanDet.strYearTo  =  String(Ext.getCmp(prototype.id + '-cmbDateToYear').getValue());
        beanDet.strMonthTo =  String(Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue());
        beanDet.strDayTo =  String(Ext.getCmp(prototype.id + '-cmbDateToDay').getValue());

        beanDet.IN_BANK = '';
        this.searchDetDay(beanDet);
    },
    
    searchDetMonth: function (beanDet) {
        me.panelActual = '-boxMainDetailDate';
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetMonth'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDet)};
                },
                load: function (obj, obj2, success, response, obj5) {

//                    me.selectedChild('vskMain', 'boxDetCountryS');
                    win.lblUser_toolTip("Estructura: MPF100NEW");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetCountrySAC = res.data;
                        if (gridDetCountrySAC.length > 0) {
                            var Objtemp = gridDetCountrySAC[0];
//                            win.setTitle('gridDetCountryS', Objtemp.strTitulo);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }

                    } else
//                        global.Msg({msg: res.sesion});
                        global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataDetailDate').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    
    searchDetDay: function (beanDet) {
        me.panelActual = '-boxMainDetailDay';
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetDay'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDet)};
                },
                load: function (obj, obj2, success, response, obj5) {

//                    me.selectedChild('vskMain', 'boxDetCountryS');
                    win.lblUser_toolTip("Estructura: MPF100NEW");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var gridDetCountrySAC = res.data;
                        if (gridDetCountrySAC.length > 0) {
                            var Objtemp = gridDetCountrySAC[0];
//                            win.setTitle('gridDetCountryS', Objtemp.strTitulo);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }

                    } else
//                        global.Msg({msg: res.sesion});
                        global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataDetailDay').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    }, 
    
    
    
    
    
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cmbPERNUM').setValue('');
        Ext.getCmp(prototype.id + '-cmbPROCIND').setValue('');
        Ext.getCmp(prototype.id + '-cmbCode').setValue('');
        Ext.getCmp(prototype.id + '-txtAGENTE').setValue('');
        Ext.getCmp(prototype.id + '-txtTKT').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
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
                
        switch (me.panelActual) {
            case  '-boxMainData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(searchParams.beanString));
                break;
            case  '-boxMainDetailDate':
                global.getFile(prototype.url + '/getXLSXDetailMonth?beanString=' + searchParams.beanString);
                break;
            case  '-boxMainDetailDay':
                global.getFile(prototype.url + '/getXLSXDetailDay?beanString=' + searchParams.beanString);
                break;
        }
    },
    
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contFilter');
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
            case  '-boxMainData':
                me.pagginActual = '-paggin';
                break;
            case '-boxMainDetailDate':
                me.pagginActual = '-paggin2';
                break;
            case '-boxMainDetailDay':
                me.pagginActual = '-paggin3';
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