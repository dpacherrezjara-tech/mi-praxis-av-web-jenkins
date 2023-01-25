Ext.define('Ext.Praxis.controller.interline.WorkProgressReport.WorkProgressReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.WorkProgressReportController',
    me: '',
    dataObtain: {},
    childs: '',
    stack: [],
    bean: {},
    //<editor-fold defaultstate="collapsed" desc="gridData">
    gridDataAC: {},
    gridData2AC: {},
    gridDataRatesAC: {},
    gridDataByMonthAC: {},
    gridDataByCurrencyhAC: {},
    gridDataByTdocMonthAC: {},
    gridDataByTdocCurrAC: {},
    //</editor-fold>
    paramsTDOC: {},
    paramsTkt: {},
//    _path: '',
    init: function(view) {
        me = this;
        prototype.id = 'WorkProgressReportForm';
        prototype.url = CONTEXTPATH+'/WorkProgressReport';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-boxConsultas').items.items;
        this.setStoreData();
        this.obtainData();
    },
    afterRender: function () {
        this.initDate();
        this.setValue('cmbAerolinea', '');
        this.setValue('cmbSourceCode', '');
        this.imgSearch_clickHandler();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    initDate: function () {
//        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        var mes = new Date().getMonth()+1;
        if(mes < 10) mes = "0"+mes;
//        Ext.getCmp(prototype.id+'-cmbDateFromMonth').setValue(mes);
        Ext.getCmp(prototype.id+'-cmbDateToMonth').setValue(mes);
    },
    cbxDateFromYear_changeHandler: function() {
        this.setValue('cmbDateToYear', this.getValue("cmbDateFromYear"));
    },
    cbxDateFromMonth_changeHandler: function() {
        this.setValue('cmbDateToMonth', this.getValue("cmbDateFromMonth"));
    },
    cbxDateFromDay_changeHandler: function() {
        this.setValue('cmbDateToDay', this.getValue("cmbDateFromDay"));
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
//        Ext.getCmp(prototype.id+'-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id+'-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(false);
//        Ext.getCmp(prototype.id+'-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-cmbDateToMonth').bindStore(storeComboDataMonth);
    },
    // </editor-fold>
    //<editor-fold defaultstate="collapsed" desc="obtainData">
    obtainData: function () {
        this.dataObtain.USO = 4;
        this.dataObtain.AIRLINE = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: { beanString: JSON.stringify(this.dataObtain) },
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-cmbSourceCode').bindStore(
                        Ext.create('Ext.data.Store', { data: res.lstUSO, autoLoad: true })
                    );
            
                    Ext.getCmp(prototype.id + '-cmbAerolinea').bindStore(
                        Ext.create('Ext.data.Store', { data: res.lstAIRLINE, autoLoad: true })
                    );
                } else global.Msg({msg: res.sesion});
            }
        });
    },
    //</editor-fold>
    change_clickHandler: function () {
        if (this.getValue("cmbSelectGrafic") === 1) {
            this.StyleGrafic01();
            this.displayWorkProgressChart_01();
        } else if (this.getValue("cmbSelectGrafic") === 2) {
            this.StyleGrafic02();
            this.displayWorkProgressChart_02();
        }
    },
    displayWorkProgressChart_01: function () {
        var data, items;
        var obj = me.gridDataAC[0];
        var obj2 = me.gridDataRatesAC[0];
        
        //<editor-fold defaultstate="collapsed" desc="chart_01">
        data = new Array();
        
        items = {};
        items.mes = obj.strDescripcion4;
        items.valor = obj2.totNet1;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion3;
        items.valor = obj2.totNet2;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion2;
        items.valor = obj2.totNet3;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion1;
        items.valor = obj2.totNet4;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion;
        items.valor = obj2.totNet5;
        data.push(items);
        
        items = {};
        items.mes = obj.strFormatDate4;
        items.valor = obj2.totNet6;
        data.push(items);
        
        Ext.getCmp(prototype.id + '-chart_01').bindStore(
            Ext.create('Ext.data.Store', { data: data, autoLoad: true })
        );
        //</editor-fold>
        
        //<editor-fold defaultstate="collapsed" desc="line_01">
        data = new Array();
        
        items = {};
        items.mes = obj.strDescripcion4;
        items.Audit = obj.totAud1;
        items.Rej = obj.totRej1;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion3;
        items.Audit = obj.totAud2;
        items.Rej = obj.totRej2;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion2;
        items.Audit = obj.totAud3;
        items.Rej = obj.totRej3;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion1;
        items.Audit = obj.totAud4;
        items.Rej = obj.totRej4;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion;
        items.Audit = obj.totAud5;
        items.Rej = obj.totRej5;
        data.push(items);
        
        items = {};
        items.mes = obj.strFormatDate4;
        items.Audit = obj.totAud6;
        items.Rej = obj.totRej6;
        data.push(items);
        
        Ext.getCmp(prototype.id + '-line_01').bindStore(
            Ext.create('Ext.data.Store', { data: data, autoLoad: true })
        );
//        //</editor-fold>
    },
    displayWorkProgressChart_02: function () {
        var data, items;
        var obj = me.gridDataAC[0];
        
        var obj2 = me.gridData2AC[0];
        //<editor-fold defaultstate="collapsed" desc="line_02">
        data = new Array();
        
        items = {};
        items.mes = obj.strDescripcion4;
        items.Audit = obj2.Aud1;
        items.Rej = obj2.Rej1;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion3;
        items.Audit = obj2.Aud2;
        items.Rej = obj2.Rej2;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion2;
        items.Audit = obj2.Aud3;
        items.Rej = obj2.Rej3;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion1;
        items.Audit = obj2.Aud4;
        items.Rej = obj2.Rej4;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion;
        items.Audit = obj2.Aud5;
        items.Rej = obj2.Rej5;
        data.push(items);
        
        items = {};
        items.mes = obj.strFormatDate4;
        items.Audit = obj2.Aud6;
        items.Rej = obj2.Rej6;
        data.push(items);
        
        Ext.getCmp(prototype.id + '-line_02').bindStore(
            Ext.create('Ext.data.Store', { data: data, autoLoad: true })
        );
        //</editor-fold>
        
        obj2 = me.gridData2AC[1];
        //<editor-fold defaultstate="collapsed" desc="line_03">
        data = new Array();
        
        items = {};
        items.mes = obj.strDescripcion4;
        items.Audit = obj2.Aud1;
        items.Rej = obj2.Rej1;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion3;
        items.Audit = obj2.Aud2;
        items.Rej = obj2.Rej2;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion2;
        items.Audit = obj2.Aud3;
        items.Rej = obj2.Rej3;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion1;
        items.Audit = obj2.Aud4;
        items.Rej = obj2.Rej4;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion;
        items.Audit = obj2.Aud5;
        items.Rej = obj2.Rej5;
        data.push(items);
        
        items = {};
        items.mes = obj.strFormatDate4;
        items.Audit = obj2.Aud6;
        items.Rej = obj2.Rej6;
        data.push(items);
        
        Ext.getCmp(prototype.id + '-line_03').bindStore(
            Ext.create('Ext.data.Store', { data: data, autoLoad: true })
        );
        //</editor-fold>
    },
    displayWorkProgressChart_03: function () {
        var data, items;
        var obj = me.gridDataAC[0];
        
        //<editor-fold defaultstate="collapsed" desc="chart_02">
        data = new Array();
        
        items = {};
        items.mes = obj.strDescripcion4;
        items.valor = obj.totAud1;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion3;
        items.valor = obj.totAud2;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion2;
        items.valor = obj.totAud3;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion1;
        items.valor = obj.totAud4;
        data.push(items);
        
        items = {};
        items.mes = obj.strDescripcion;
        items.valor = obj.totAud5;
        data.push(items);
        
        items = {};
        items.mes = obj.strFormatDate4;
        items.valor = obj.totAud6;
        data.push(items);
        
        Ext.getCmp(prototype.id + '-chart_02').bindStore(
            Ext.create('Ext.data.Store', { data: data, autoLoad: true })
        );
        //</editor-fold>
        
        //<editor-fold defaultstate="collapsed" desc="line_04">
        Ext.getCmp(prototype.id + '-line_04').bindStore(
            Ext.create('Ext.data.Store', { data: me.gridDataAC, autoLoad: true })
        );
        //</editor-fold>
    },
    //<editor-fold defaultstate="collapsed" desc="Grapic">
    StyleGrafic01: function () {
        Ext.getCmp(prototype.id + '-boxChart_01').setVisible(!Ext.getCmp(prototype.id + '-boxChart_01').isVisible());
        Ext.getCmp(prototype.id + '-boxChart_02').hide();
        
        Ext.getCmp(prototype.id + '-cmbSelectGrafic').show();
        Ext.getCmp(prototype.id + '-box_Rates').setWidth('75%');
        Ext.getCmp(prototype.id + '-gridData3').setHeight(50);
        Ext.getCmp(prototype.id + '-gridData3').bindStore(
            Ext.create('Ext.data.Store', { data: [me.gridDataRatesAC[2]], autoLoad: true })
        );
        Ext.getCmp(prototype.id + '-box_DocType').setVisible(!Ext.getCmp(prototype.id + '-box_DocType').isVisible());
        Ext.getCmp(prototype.id + '-gridData').show();
    },
    StyleGrafic02: function () {
        Ext.getCmp(prototype.id + '-boxChart_01').setVisible(!Ext.getCmp(prototype.id + '-boxChart_01').isVisible());
        Ext.getCmp(prototype.id + '-boxChart_02').setVisible(!Ext.getCmp(prototype.id + '-boxChart_02').isVisible());
        
        Ext.getCmp(prototype.id + '-box_DocType').setWidth('75%');
        Ext.getCmp(prototype.id + '-box_DocType').setVisible(!Ext.getCmp(prototype.id + '-box_DocType').isVisible());
        Ext.getCmp(prototype.id + '-gridData').setVisible(!Ext.getCmp(prototype.id + '-gridData').isVisible());
    },
    StyleGrafic03: function () {
        Ext.getCmp(prototype.id + '-box_DocType').setVisible(!Ext.getCmp(prototype.id + '-box_DocType').isVisible());
        Ext.getCmp(prototype.id + '-box_Rates').setVisible(!Ext.getCmp(prototype.id + '-box_Rates').isVisible());
    },
    StyleNormal: function () {
        Ext.getCmp(prototype.id + '-boxChart_01').hide();
        Ext.getCmp(prototype.id + '-boxChart_02').hide();
        
        Ext.getCmp(prototype.id + '-cmbSelectGrafic').hide();
        Ext.getCmp(prototype.id + '-box_Rates').setWidth('100%');
        Ext.getCmp(prototype.id + '-gridData3').setHeight(165);
        Ext.getCmp(prototype.id + '-gridData3').bindStore(
            Ext.create('Ext.data.Store', { data: me.gridDataRatesAC, autoLoad: true })
        );
        Ext.getCmp(prototype.id + '-gridData').show();
        
        Ext.getCmp(prototype.id + '-box_DocType').setWidth('100%');
        Ext.getCmp(prototype.id + '-box_DocType').show();
        this.setValue('cmbSelectGrafic', 1);
    },
    StyleNormal_02: function () {
        Ext.getCmp(prototype.id + '-box_DocType').setVisible(!Ext.getCmp(prototype.id + '-box_DocType').isVisible());
        Ext.getCmp(prototype.id + '-box_Rates').setVisible(!Ext.getCmp(prototype.id + '-box_Rates').isVisible());
    },
    //</editor-fold>
    imgByMonth_clickHandler: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.bean.FINVOICE = data.FINVOICE;
        this.searchByMonth(this.bean);
    },
    imgByTdoc_clickHandler: function (column, e, row, column, x, rowData) {
        this.paramsTDOC = x.record.data;
        this.searchByTDOC(this.paramsTDOC);
    },
    imgByINVOICE_clickHandler: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.searchByInvoice(data);
    },
    imgByTkt_clickHandler: function (column, e, row, column, x, rowData) {
        this.paramsTkt = x.record.data;
        this.searchByTkt(this.paramsTkt);
    },
    viewA728: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var nroprt = data.NROPRT;
        
        this.post_to_url(CONTEXTPATH + '/Home?'
            + 'strMod=WorkProgress&'
            + 'nroprt=' + nroprt
            + '#program-prorrateo-a728-form', {}, 'post', 'ProrrateoA728Form');
    },
    post_to_url: function(path, params, method, id) {
        method = method || "post";

        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);
        form.setAttribute("id", id);

        document.body.appendChild(form);
        form.submit();
    },

    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
	this.bean.IN_FECHA_TO = this.getValue("cmbDateToYear") + this.getValue("cmbDateToMonth");
	this.bean.IN_SELECTBY = this.getValue("cmbSelectBy");
	this.bean.IN_TYPEDOC = this.getValue("cmbTypeDoc");
	this.bean.IN_TIPOFECHA = this.getValue("cmbFecha");
	this.bean.IN_AIRLINE = this.getValue("cmbAerolinea");
	this.bean.IN_SOURCE = this.getValue("cmbSourceCode");
        
        this.search(this.bean);
    },
    imgFilter_clickHandler: function() {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) option.hide();
        else option.show();
    },
    imgExcel_clickHandler: function(obj, e) {
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
    imgClear_clickHandler: function(obj, e) {
    },
    imgChart_clickHandler: function() {
        if (this.peek().includes("boxMainData") && !Ext.getCmp(prototype.id + '-gridData_SUP').isVisible()) {
            Ext.getCmp(prototype.id + '-contentFilter').hide();
            if (this.getValue("cmbSelectBy") === 1) {
                if (Ext.getCmp(prototype.id + '-cmbSelectGrafic').isVisible()) {
                    this.StyleNormal();
                } else {
                    this.change_clickHandler();
                }
            } else {
                Ext.getCmp(prototype.id + '-boxChart_03').setVisible(!Ext.getCmp(prototype.id + '-boxChart_03').isVisible());
                if (Ext.getCmp(prototype.id + '-boxChart_03').isVisible()) {
                    this.StyleGrafic03();
                    this.displayWorkProgressChart_03();
                } else {
                    this.StyleNormal_02();
                }
            }
        }
    },
    imgBack_clickHandler: function() {
        if (this.peek().includes("boxMainData")) {
            global.showMenu();
        } else {
            this.stack.pop();
            global.selectedChild(this.childs, this.peek());
            if (this.peek().includes("boxMainData")) {
                this.selectedChild('boxMainData', '', false);
            } else if (this.peek().includes("boxDetailData")) {
                this.selectedChild('boxDetailData', '', false);
            } else if (this.peek().includes("boxDetailByTdocData")) {
                this.selectedChild('boxDetailByTdocData', 'paggin', false);
            }
        }
    },
    // </editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean) {
        this.stack = [];
        this.selectedChild('boxMainData');
        Ext.Ajax.request({
            url: prototype.url + '/search',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getBody().mask('Loading...'),
            success: function (response, opts) {
                Ext.getBody().unmask();
                win.lblUser_toolTip("Estructura: WRF016");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.gridDataAC = res.listaData;
                    var store1 = Ext.create('Ext.data.Store', { data: me.gridDataAC, autoLoad: true });
                    Ext.getCmp(prototype.id + '-gridData').bindStore(store1);
                    Ext.getCmp(prototype.id + '-gridData_AMT').bindStore(store1);
                    Ext.getCmp(prototype.id + '-gridData_SUP').bindStore(store1);
                    
                    me.gridData2AC = res.listaData2;
                    var store2 = Ext.create('Ext.data.Store', { data: me.gridData2AC, autoLoad: true });
                    Ext.getCmp(prototype.id + '-gridData2').bindStore(store2);
                    Ext.getCmp(prototype.id + '-gridData2_AMT').bindStore(store2);
                    
                    me.gridDataRatesAC = res.listaRates;
                    var store3 = Ext.create('Ext.data.Store', { data: me.gridDataRatesAC, autoLoad: true });
                    Ext.getCmp(prototype.id + '-gridData3').bindStore(store3);
                    
                    if (me.getValue("cmbSelectBy") === 1) {
                        Ext.getCmp(prototype.id + '-gridData_SUP').hide();
                        Ext.getCmp(prototype.id + '-gridData_AMT').hide();
                        Ext.getCmp(prototype.id + '-gridData2_AMT').hide();
                        Ext.getCmp(prototype.id + '-gridData').show();
                        Ext.getCmp(prototype.id + '-gridData2').show();
                    } else {
                        Ext.getCmp(prototype.id + '-gridData_SUP').hide();
                        Ext.getCmp(prototype.id + '-gridData').hide();
                        Ext.getCmp(prototype.id + '-gridData2').hide();
                        Ext.getCmp(prototype.id + '-gridData_AMT').show();
                        Ext.getCmp(prototype.id + '-gridData2_AMT').show();
                    }
                    
                    if (store1.data.length > 0) {
                        var obj = me.gridDataAC[0];
                        //<editor-fold defaultstate="collapsed" desc="Set Column Name">
                        var columnName = (me.getValue("cmbFecha") === 1)? 'Clearing Date':'Invoice Date';
                        Ext.getCmp(prototype.id + '-titHorzFecha3').setText(columnName);
                        Ext.getCmp(prototype.id + '-titHorzFecha1').setText(columnName);
                        Ext.getCmp(prototype.id + '-titHorzFecha2').setText(columnName);
                        columnName = (me.getValue("cmbFecha") === 1)? 'Invoice Date':'Clearing Date';
                        Ext.getCmp(prototype.id + '-titVertFecha3').setText(columnName);
                        Ext.getCmp(prototype.id + '-titVertFecha1').setText(columnName);
                        Ext.getCmp(prototype.id + '-titVertFecha2').setText(columnName);

                        Ext.getCmp(prototype.id + '-titFecha6_SUPP').setText(obj.strFormatDate4);
                        Ext.getCmp(prototype.id + '-titFecha6_AMT').setText(obj.strFormatDate4);
                        Ext.getCmp(prototype.id + '-titFecha_6').setText(obj.strFormatDate4);
                        Ext.getCmp(prototype.id + '-titFecha6').setText(obj.strFormatDate4);

                        Ext.getCmp(prototype.id + '-titFecha5_SUPP').setText(obj.strDescripcion);
                        Ext.getCmp(prototype.id + '-titFecha5_AMT').setText(obj.strDescripcion);
                        Ext.getCmp(prototype.id + '-titFecha_5').setText(obj.strDescripcion);
                        Ext.getCmp(prototype.id + '-titFecha5').setText(obj.strDescripcion);

                        Ext.getCmp(prototype.id + '-titFecha4_SUPP').setText(obj.strDescripcion1);
                        Ext.getCmp(prototype.id + '-titFecha4_AMT').setText(obj.strDescripcion1);
                        Ext.getCmp(prototype.id + '-titFecha_4').setText(obj.strDescripcion1);
                        Ext.getCmp(prototype.id + '-titFecha4').setText(obj.strDescripcion1);

                        Ext.getCmp(prototype.id + '-titFecha3_SUPP').setText(obj.strDescripcion2);
                        Ext.getCmp(prototype.id + '-titFecha3_AMT').setText(obj.strDescripcion2);
                        Ext.getCmp(prototype.id + '-titFecha_3').setText(obj.strDescripcion2);
                        Ext.getCmp(prototype.id + '-titFecha3').setText(obj.strDescripcion2);

                        Ext.getCmp(prototype.id + '-titFecha2_AMT').setText(obj.strDescripcion3);
                        Ext.getCmp(prototype.id + '-titFecha_2').setText(obj.strDescripcion3);
                        Ext.getCmp(prototype.id + '-titFecha2').setText(obj.strDescripcion3);
                        
                        Ext.getCmp(prototype.id + '-titFecha1_AMT').setText(obj.strDescripcion4);
                        Ext.getCmp(prototype.id + '-titFecha_1').setText(obj.strDescripcion4);
                        Ext.getCmp(prototype.id + '-titFecha1').setText(obj.strDescripcion4);
                        //</editor-fold>
                    }
//                    else {
//                        global.Msg({msg: 'Data not found'});
//                    }
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getBody().unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchByMonth">
    searchByMonth: function (bean) {
        Ext.Ajax.request({
            url: prototype.url + '/searchByMonth',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp(prototype.id + '-boxMainData').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-boxMainData').unmask();
                win.lblUser_toolTip("Estructura: WRF001");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.gridDataByMonthAC = res.listaData;
                    var store1 = Ext.create('Ext.data.Store', { data: me.gridDataByMonthAC, autoLoad: true });
                    Ext.getCmp(prototype.id + '-gridDetailByMonth').bindStore(store1);
                    
                    me.gridDataByCurrencyhAC = res.lstCurrency;
                    var store2 = Ext.create('Ext.data.Store', { data: me.gridDataByCurrencyhAC, autoLoad: true });
                    Ext.getCmp(prototype.id + '-gridDetailByCurr').bindStore(store2);
                    
                    if (store1.data.length > 0) {
                        Ext.getCmp(prototype.id + '-contentFilter').hide();
                        me.selectedChild('boxDetailData');
                    } else {
                        global.Msg({msg: 'Data Not Found.'});
                    }
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp(prototype.id + '-boxMainData').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchByTDOC">
    searchByTDOC: function (paramsTDOC) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchByTDOC'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxDetailData').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(paramsTDOC)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + '-boxDetailData').unmask();
                    win.lblUser_toolTip("Estructura: WRF001");
                    if (obj.data.length > 0) {
                        if(!me.peek().includes('boxDetailByTdocData')) me.selectedChild('boxDetailByTdocData', 'paggin');
                        else me.selectedChild('boxDetailByTdocData', 'paggin', false);
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetailByTdocMonth').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        
        Ext.Ajax.request({
            url: prototype.url + '/searchByTDOC',
            method: 'POST',
            timeout: 60000000,
            params: { beanString: JSON.stringify(paramsTDOC) },
            beforerequest: Ext.getCmp(prototype.id + '-gridDetailByTdocCurr').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-gridDetailByTdocCurr').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-gridDetailByTdocCurr').bindStore(
                        Ext.create("Ext.Praxis.store.interline.GridData", { data: res.lstCurrency })
                    );
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp(prototype.id + '-gridDetailByTdocCurr').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchByInvoice">
    searchByInvoice: function (bean) {
        Ext.Ajax.request({
            url: prototype.url + '/searchByInvoice',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp(prototype.id + '-boxDetailByTdocData').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-boxDetailByTdocData').unmask();
                win.lblUser_toolTip("Estructura: WRF001");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var objResult = res.objWRF016Filter;
                    me.selectedChild('boxDetailByInvoiceNbr');
                    //<editor-fold defaultstate="collapsed" desc="Detail of Invoice">
                    me.setValue('lbl_AIRLINE_DES', objResult.AIRLINE +" - " + objResult.strDescripcion);
                    me.setValue('lbl_STVAL_DES', objResult.strDescripcion1);
                    me.setValue('lbl_INVOICE', objResult.INVOICE);
                    me.setValue('lbl_TUSO', objResult.TUSO);
                    me.setValue('lbl_GRUPO', objResult.GRUPO);
                    me.setValue('lbl_FINVOICE', objResult.strFormatDate);
                    me.setValue('lbl_PERMONT', objResult.PERMONT);
                    me.setValue('lbl_FECLIMIT', objResult.strFormatDate2);
                    me.setValue('lbl_FCLEAR', objResult.strFormatDate1);
                    me.setValue('lbl_NETI', Ext.util.Format.number(objResult.NETI, '0,000.00')+' '+ objResult.CURRENC);
                    me.setValue('lbl_SPA', objResult.strDescripcion2);
                    me.setValue('lbl_IMG', Ext.util.Format.number(objResult.PCUPON, '0,000'));
                    me.setValue('lbl_DATENV', objResult.strFormatDate3);
                    me.setValue('lbl_FECL', objResult.strFormatDate4);
                    me.setValue('lbl_ETKT', Ext.util.Format.number(objResult.QETKT, '0,000'));
                    //</editor-fold>
                    
                    //<editor-fold defaultstate="collapsed" desc="Invoice Quantity Cpns">
                    me.setValue('lbl_MONEDA', objResult.CURRENP);
                    me.setValue('lbl_TUSO_DES', objResult.strDescripcion3);
                    me.setValue('lbl_QCUPON', Ext.util.Format.number(objResult.QCUPON, '0,000'));
                    me.setValue('lbl_GROSSI', Ext.util.Format.number(objResult.GROSSI, '0,000.00'));
                    me.setValue('lbl_GROSSN', Ext.util.Format.number(objResult.GROSSN, '0,000.00'));
                    me.setValue('lbl_PERC', Ext.util.Format.number((objResult.GROSSI>0)?(objResult.GROSSN * 100) / objResult.GROSSI:0, '0,000.00') + '%');
                    me.setValue('lbl_PCUPON', Ext.util.Format.number(objResult.PCUPON, '0,000'));
                    me.setValue('lbl_PERC2', Ext.util.Format.number((objResult.QCUPON>0)?(objResult.PCUPON * 100) / objResult.QCUPON:0, '0,000.00') + '%');
                    me.setValue('lbl_ISCI', Ext.util.Format.number(objResult.ISCI, '0,000.00'));
                    me.setValue('lbl_ISCN', Ext.util.Format.number(objResult.ISCN, '0,000.00'));
                    me.setValue('lbl_PERC3', Ext.util.Format.number((objResult.ISCI>0)?(objResult.ISCN * 100) / objResult.ISCI:0, '0,000.00') + '%');
                    me.setValue('lbl_QAUDI', Ext.util.Format.number(objResult.QAUDI, '0,000'));
                    me.setValue('lbl_PERC4', Ext.util.Format.number((objResult.QCUPON>0)?(objResult.QAUDI * 100) / objResult.QCUPON:0, '0,000.00') + '%');
                    me.setValue('lbl_TAXI', Ext.util.Format.number(objResult.TAXI, '0,000.00'));
                    me.setValue('lbl_TAXN', Ext.util.Format.number(objResult.TAXN, '0,000.00'));
                    me.setValue('lbl_PERC5', Ext.util.Format.number((objResult.TAXI>0)?(objResult.TAXN * 100) / objResult.TAXI:0, '0,000.00') + '%');
                    me.setValue('lbl_NETI2', Ext.util.Format.number(objResult.NETI, '0,000'));
                    me.setValue('lbl_NETO', Ext.util.Format.number(objResult.NETO, '0,000'));
                    me.setValue('lbl_PERC6', Ext.util.Format.number((objResult.NETI>0)?(objResult.NETO * 100) / objResult.NETI:0, '0,000.00') + '%');
                    //</editor-fold>
                    
                    //<editor-fold defaultstate="collapsed" desc="Quantity RM">
                    var ttlRm = objResult.QRM;
                    var ttlGross = objResult.QRMGROSS;
                    var ttlISC = objResult.QRMISC;
                    var ttlTax = objResult.QRMTAX;
                    var ttlOthers = objResult.QRMOTH;
                    
                    var perGross = 0;
                    var perIsc = 0;
                    var perTax = 0;
                    var perOthers = 0;
                    
                    if (ttlRm > 0) {
                        perGross = (ttlGross * 100) / ttlRm;
                        perIsc = (ttlISC * 100) / ttlRm;
                        perTax = (ttlTax * 100) / ttlRm;
                        perOthers = (ttlOthers * 100) / ttlRm;
                        
                        if ((perGross + perIsc + perTax + perOthers) > 0 && perGross + perIsc + perTax + perOthers < 100) {
                            while ((perGross + perIsc + perTax + perOthers) < 100) {

                                if (perGross > 0) {
                                    perGross = perGross + 1;
                                } else if (perIsc > 0) {
                                    perIsc = perIsc + 1;
                                } else if (perTax > 0) {
                                    perTax = perTax + 1;
                                } else if (perOthers > 0) {
                                    perOthers = perOthers + 1;
                                }
                            }
                        }
                    }
                    
                    me.setValue('lbl_QRM', Ext.util.Format.number(objResult.QRM, '0,000'));
                    me.setValue('lbl_Rate1', (objResult.QRM>0)?'100%':'0%');
                    me.setValue('lbl_QRMGROSS', Ext.util.Format.number(objResult.QRMGROSS, '0,000'));
                    me.setValue('lbl_PERC7', Ext.util.Format.number(perGross, '0,000')+'%');
                    me.setValue('lbl_QRMISC', Ext.util.Format.number(objResult.QRMISC, '0,000'));
                    me.setValue('lbl_PERC8', Ext.util.Format.number(perIsc, '0,000')+'%');
                    me.setValue('lbl_QRMTAX', Ext.util.Format.number(objResult.QRMTAX, '0,000'));
                    me.setValue('lbl_PERC9', Ext.util.Format.number(perTax, '0,000')+'%');
                    me.setValue('lbl_QRMOTH', Ext.util.Format.number(objResult.QRMOTH, '0,000'));
                    me.setValue('lbl_PERC10', Ext.util.Format.number(perOthers, '0,000')+'%');
                    //</editor-fold>
                    
                    //<editor-fold defaultstate="collapsed" desc="Adjustment">
                    if(objResult.strFlag=='true') {
                        Ext.getCmp(prototype.id + '-box_Adjustment').show();
                        me.setValue('lbl_ICUPON', Ext.util.Format.number(objResult.ICUPON, '0,000'));
                        me.setValue('lbl_IFARE', Ext.util.Format.number(objResult.IFARE, '0,000.00'));
                        me.setValue('lbl_IISC', Ext.util.Format.number(objResult.IISC, '0,000.00'));
                        me.setValue('lbl_ITAX', Ext.util.Format.number(objResult.ITAX, '0,000.00'));
                        
                        me.setValue('lbl_IOTHER', Ext.util.Format.number(objResult.IOTHER, '0,000.00'));
                        me.setValue('lbl_INETO', Ext.util.Format.number(objResult.INETO, '0,000.00'));
                        me.setValue('lbl_COMMENTS', objResult.COMENT1 + ' ' + objResult.COMENT2);
                    } else {
                        Ext.getCmp(prototype.id + '-box_Adjustment').hide();
                    }
                    //</editor-fold>
                } else global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                Ext.getCmp(prototype.id + '-boxDetailByTdocData').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchByTkt">
    searchByTkt: function (paramsTkt) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchByTkt'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxDetailByTdocData').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(paramsTkt)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + '-boxDetailByTdocData').unmask();
                    win.lblUser_toolTip("Estructura: WRF002");
                    if (obj.data.length > 0) {
                        if(!me.peek().includes('boxDetailByTktData')) me.selectedChild('boxDetailByTktData', 'paggin2');
                        else me.selectedChild('boxDetailByTktData', 'paggin2', false);
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetailByTktMonth').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        
        Ext.Ajax.request({
            url: prototype.url + '/searchByTkt',
            method: 'POST',
            timeout: 60000000,
            params: { beanString: JSON.stringify(paramsTkt) },
            beforerequest: Ext.getCmp(prototype.id + '-gridDetailByTktCurr').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-gridDetailByTktCurr').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-gridDetailByTktCurr').bindStore(
                        Ext.create("Ext.Praxis.store.interline.GridData", { data: res.lstCurrency })
                    );
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp(prototype.id + '-gridDetailByTktCurr').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>

    exportExcel: function() {
//        global.getFile(_path);
        var panel = this.peek().substr(this.peek().indexOf('-')+1);
        console.log(panel);
        switch (panel) {
            case  'boxMainData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(this.bean)));
                break;
            case  'boxDetailData':
                global.getFile(prototype.url + '/getXLSX_Month?beanString=' + encodeURI(JSON.stringify(this.bean)));
                break;
            case 'boxDetailByTdocData':
                global.getFile(prototype.url + '/getXLSX_TdocData?beanString=' + encodeURI(JSON.stringify(this.paramsTDOC)));
                break;
            case 'boxDetailByTktData':
                global.getFile(prototype.url + '/getXLSX_TktData?beanString=' + encodeURI(JSON.stringify(this.paramsTkt)));
                break;
        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (this.peek().includes("boxDetailByTdocData")) {
            Ext.getCmp(prototype.id+'-paggin').moveFirst();
        } else if (this.peek().includes("boxDetailByTktData")) {
            Ext.getCmp(prototype.id+'-paggin2').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (this.peek().includes("boxDetailByTdocData")) {
            Ext.getCmp(prototype.id+'-paggin').movePrevious();
        } else if (this.peek().includes("boxDetailByTktData")) {
            Ext.getCmp(prototype.id+'-paggin2').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (this.peek().includes("boxDetailByTdocData")) {
            Ext.getCmp(prototype.id+'-paggin').moveNext();
        } else if (this.peek().includes("boxDetailByTktData")) {
            Ext.getCmp(prototype.id+'-paggin2').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (this.peek().includes("boxDetailByTdocData")) {
            Ext.getCmp(prototype.id+'-paggin').moveLast();
        } else if (this.peek().includes("boxDetailByTktData")) {
            Ext.getCmp(prototype.id+'-paggin2').moveLast();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function (boxId, pagginId, add) {
        global.selectedChild(this.childs, prototype.id + '-' + boxId);
        add = add === null || add === undefined ? true : add;
        if(add) this.stack.push(prototype.id + '-' + boxId);
        
        if (pagginId === null || pagginId === undefined || pagginId.length === 0) {
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
            Ext.getCmp(prototype.id + '-pie').hide();
        } else {
            //<editor-fold defaultstate="collapsed" desc="setPaggin">
            var pagData = Ext.getCmp(prototype.id + '-' + pagginId).getPageData();
            
            var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
            var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
            var total = Ext.util.Format.number(pagData.total, '0,000');

            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
            Ext.getCmp(prototype.id + '-lbl-total').setText(total);
            //</editor-fold>
            Ext.getCmp(prototype.id + '-boxPaginacion').show();
            Ext.getCmp(prototype.id + '-pie').show();
            
            var width = 0, wt;
            var boxChild = Ext.getCmp(prototype.id + '-' + boxId).items.items;
            for (var i = 0; i < boxChild.length; i++) {
                wt = boxChild[i].getWidth();
                if (wt > width) {
                    width = wt;
                }
            }
            Ext.getCmp(prototype.id + '-pie').setWidth(width);
        }
    },
    peek: function () {
        return this.stack[this.stack.length - 1];
    },
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.imgSearch_clickHandler();
        }
    }
    // </editor-fold>
});
