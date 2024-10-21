
Ext.define('Ext.Praxis.controller.payments.BalanceAnalysisByAge.BalanceAnalysisByAgeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BalanceAnalysisByAgeController',
    fecha: new Date(),
    childs: '5',
    bean: '',
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
    paramsObtainData: {},
    paramsTKT: {},
    dataObtain: {},
    beanTKT: {},
    bean_detail: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'BalanceAnalysisByAgeForm';
        prototype.url = CONTEXTPATH + '/BalanceAnalysisByAge';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-boxPendingData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#BalanceAnalysisByAgeForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#BalanceAnalysisByAgeForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#BalanceAnalysisByAgeForm-btnClear': {
                click: this.btnClear_click
            },
            '#BalanceAnalysisByAgeForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#BalanceAnalysisByAgeForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#BalanceAnalysisByAgeForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#BalanceAnalysisByAgeForm-btnBack': {
                click: this.btnBack_click
            },
            '#BalanceAnalysisByAgeForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#BalanceAnalysisByAgeForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#BalanceAnalysisByAgeForm-btn-pag-next': {
                click: this.pagNext
            },
            '#BalanceAnalysisByAgeForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#BalanceAnalysisByAgeForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#BalanceAnalysisByAgeForm-cmbDateToYear': {
                select: this.selectComboToYear
            },
            '#BalanceAnalysisByAgeForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#BalanceAnalysisByAgeForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
        });
    },
    xpanel_afterrender: function (obj, e) {
        this.setStoreData();
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
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        console.log(storeComboDataYear, 'comboToYear')
        console.log(comboToYear, 'comboToYear')
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
        console.log(obj, 'obj from month')
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function (obj) {
        console.log(obj, 'obj to month')
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },

    //<editor-fold defaultstate="collapsed" desc="setStoreData">
    setStoreData: function () {
        var month = this.fecha.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");


    },
    obtainData: function () {

        this.paramsObtainData.BANK = 2;
        this.paramsObtainData.COUNTRY = 2;
        this.paramsObtainData.CARD = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);


                me.lstBank = res.lstBank;
                me.lstCard = res.lstCard;
                me.lstCountry = res.lstCountry;

                var storeData = Ext.create('Ext.data.Store', {
                    data: me.lstBank,
                    autoLoad: true
                });

                var storeData3 = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
                global.clear();
                me.btnSearch_click();
            }
        });


    },

    setFormatParameter: function () {
        me.bean = {};
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtAGENCY').getValue();
        me.bean.IN_PERCENTAGE = Ext.getCmp(prototype.id + '-cmbPercentage').getValue();

        console.log(me.bean, 'me.bean')
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    setFormatParameter2: function () {
        me.bean = {};
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtAGENCY').getValue();
        me.bean.IN_PERCENTAGE = Ext.getCmp(prototype.id + '-cmbPercentage').getValue();
        me.bean.IN_CANAL = Ext.getCmp(prototype.id + '-cmbSource').getValue();
       

        console.log(me.bean, 'me.bean')
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },

    btnSearch_click: function (obj, e) {

        let panelReportDay = Ext.getCmp(prototype.id + '-boxPendingData')
        let panelMain = Ext.getCmp(prototype.id + '-boxMainData')
        if (panelReportDay.isVisible()) {
            this.setFormatParameter2();
            this.setGridReportDay();
        } else {
            this.setFormatParameter();
            this.setGridData();
        }
    },

    isVacio: function (elemento) {
        if (elemento.getValue() === '') {
            return true;
        } else {
            return false;
        }
    },

    onReportDayPending: function () {
        let panelReportDay = Ext.getCmp(prototype.id + '-boxPendingData')
        let panelMain = Ext.getCmp(prototype.id + '-boxMainData')
        if (!panelReportDay.isVisible()) {

            this.setGridReportDay()
            panelReportDay.show()
            panelMain.hide()
        } else {
            panelReportDay.hide()
            me.panelActual = '-boxMainData';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.setGridData()
            panelMain.show()
        }
    },
    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPF117");
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
//                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
//                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
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
                            console.log(data);
                        }
                        me.setWidthPie();
                    }
                },remoteSort: true
            });
            global.clear();
            let tittleCountry = Ext.getCmp(prototype.id + '-cmbCountry').getValue() === '' ? 'All Countries' : Ext.getCmp(prototype.id + '-cmbCountry').getRawValue();
            let tittleDate = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() === Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() ? Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() : Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + ' - ' + Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
            Ext.getCmp(prototype.id + '-lblTittleGrid').setText(tittleDate + ' | ' + tittleCountry)

            Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    setGridReportDay: function () {
        win.lblUser_toolTip("Estructura: MPF118");
        me.panelActual = '-boxPendingData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchRD'
                }, listeners: {
                    beforeload: function (obj) {

                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj, obj2, success, response, obj5) {
                        var pag = Ext.getCmp(prototype.id + '-paggin2');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        // ------------------ GRAFICOS -------------------------

                        var item = {};
                        var item2 = {};
                        var totals = [];
                        var charts = [];

                        item2.Perc2 = obj.data.items[0].data.totSVFOPUSD;
                        var Total = "Total:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSD, '0,000');
                        item2.VENDOR = Total;
                        totals.push(item2);

                        item.Perc2 = obj.data.items[0].data.totSVFOPUSDP;
                       var Paid = "Paid:\n" + Ext.util.Format.number(obj.data.items[0].data.totSVFOPUSDP, '0,000');
                        item.VENDOR = Paid;
                        totals.push(item);

                        var storeData1er = Ext.create('Ext.data.Store', {
                            data: totals,
                            autoLoad: true
                        });
                        Ext.getCmp(prototype.id + '-displayPolar').bindStore(storeData1er);

                        var res = Ext.JSON.decode(response._response.responseText);
                        
                        
                        if ( res.data2.length > 0 ){
                            for (let i = 0; i < res.data2.length; i++) {
                                console.log(i);
                                console.log(res, 'holaaa');
                                let AMOUNT = res.data2[i].SVFOPUSD;
                                let SAGENT = res.data2[i].SAGENT;
                                let SDATE = res.data2[i].SDATE;
                                charts.push({strDescription: SAGENT + "\n" +SDATE , AMOUNT: AMOUNT});
                            }
                        }else{
                                charts.push({strDescription: 'Not found'  , AMOUNT: 1});
                        }
                        
                        

                        var storeData1ercharts = Ext.create('Ext.data.Store', {
                            data: charts,
                            autoLoad: true
                        });
                        
                        Ext.getCmp(prototype.id + '-displayGraf').bindStore(storeData1ercharts);
                        
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            Ext.getCmp(prototype.id + '-txtFECR').setValue(data.FECR)
                            Ext.getCmp(prototype.id + '-txtHOCR').setValue(data.HOCR)
                            
                            console.log(data,'hola mundo');
                            console.log(obj.data.items,'obj. data');
                        }
                         me.setWidthPie();
                    }
                }
            });
            global.clear();
            let tittleCountry = Ext.getCmp(prototype.id + '-cmbCountry').getValue() === '' ? 'All Countries' : Ext.getCmp(prototype.id + '-cmbCountry').getRawValue();
            let tittleDate = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() === Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() ? Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() : Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + ' - ' + Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
            Ext.getCmp(prototype.id + '-lblTittleGrid2').setText(tittleDate + ' - ' + tittleCountry)

            Ext.getCmp(prototype.id + '-gridPendingData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    clickColumn: function (ct, column, e, t, eOpts) {
        me.bean = {};
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtAGENCY').getValue();
        me.bean.IN_PERCENTAGE = Ext.getCmp(prototype.id + '-cmbPercentage').getValue();
        me.bean.IN_CANAL = Ext.getCmp(prototype.id + '-cmbSource').getValue();
        if(column.text.includes('Pending')){
            me.bean.IN_TYPEPERC = 'S'
        }else if(column.text.includes('Paid')){
            me.bean.IN_TYPEPERC = 'P'
        } else if( column.text.includes('Amount') ){
            me.bean.IN_TYPEPERC = 'A'
        }
        if(Ext.getCmp(prototype.id + '-hidePENDING').isVisible()){
            me.bean.IN_ORDER = 'ASC'
            Ext.getCmp(prototype.id + '-hidePENDING').hide()
        }else{
            me.bean.IN_ORDER = 'DESC'
            Ext.getCmp(prototype.id + '-hidePENDING').show()
        }
        
        

        console.log(me.bean, 'me.bean')
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        
        this.setGridReportDay();
            
        
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

        Ext.create('Ext.Praxis.view.payments.BalanceAnalysisByAgeForm.DataEntry', {
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
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

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
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contFilter');
        if (option.isVisible(option)) {
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
            case  '-boxPendingData':
                me.pagginActual = '-paggin2';
                break;
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