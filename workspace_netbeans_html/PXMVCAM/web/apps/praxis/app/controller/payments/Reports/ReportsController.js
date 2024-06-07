
Ext.define('Ext.Praxis.controller.payments.Reports.ReportsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ReportsController',
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
        prototype.id = 'ReportsForm';
        prototype.url = CONTEXTPATH + '/Reports';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-boxMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#ReportsForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ReportsForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ReportsForm-btnClear': {
                click: this.btnClear_click
            },
            '#ReportsForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ReportsForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ReportsForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#ReportsForm-btnBack': {
                click: this.btnBack_click
            },
            '#ReportsForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ReportsForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ReportsForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ReportsForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#BankReconciliationForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#BankReconciliationForm-cmbDateToYear': {
                select: this.selectComboToYear
            },
            '#BankReconciliationForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#BankReconciliationForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#BankReconciliationForm-cmbDateDay': {
                select: this.selectComboFromDay
            },
            '#BankReconciliationForm-cmbDateToDay': {
                select: this.selectComboToDay
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
        if( comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue() ){
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboToYear: function (obj) {
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        if( comboToYear.getValue() < comboFromYear.getValue()  ){
           comboFromYear.setValue(comboToYear.getValue()); 
        }
        if( comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue() ){
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
    selectComboFromDay: function (obj) {
        console.log(obj, 'obj day from')
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
        console.log('sdadsadadsad')
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
        if(comboFromDay.getValue() === ''){
            
            comboFromDay.setValue(obj.getValue())
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
        Ext.getCmp(prototype.id + '-cmbDateDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateDay').setValue("");

    },
    obtainData: function () {
        
        Ext.Ajax.request({
            url: prototype.url + '/obtainMessagesDT',
            method: 'POST',
            timeout: 60000000,
            params: {},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
//                    me.bean_detail = res.result;
                    //llenar grilla gridDataInfoScan
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    console.log(res.data, 'res.data')
                    console.log(storeData, 'storeData')
                    Ext.getCmp(prototype.id + '-cmbDebitType').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-cmbDebitType').setValue('');
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["SDATE", "Sales Date"],
                ["ADATE", "Payment Date"]
            ]
        }));
        cmbFecFiltro.setValue("SDATE");
        
        var cmbSTVAL = Ext.getCmp(prototype.id + '-cmbSTVAL');
        cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["1", "Match Automatic"],
                ["5", "Match Manual"],
                ["3", "Pending"]
            ]
        }));
        cmbSTVAL.setValue("");
        
        var cmbTDOC = Ext.getCmp(prototype.id + '-cmbTDOC');
        cmbTDOC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["R", "Refund"],
                ["C", "Chargeback"],
                ["A", "Acreditaciones"]
            ]
        }));
        cmbTDOC.setValue("");

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
                Ext.getCmp(prototype.id + '-cmbBank').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbBank').setValue('');
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
                global.clear();
                me.btnSearch_click();
            }
        });


    },

    setFormatParameter: function () {
        me.bean = {};
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_CODEBANK = Ext.getCmp(prototype.id + '-cmbBank').getValue();
        me.bean.IN_STVAL = Ext.getCmp(prototype.id + '-cmbSTVAL').getValue();
        me.bean.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();
        if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim() !== '' && Ext.getCmp(prototype.id + '-txtCard2').getValue().trim() !== '') {
            if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim().length === 6 && Ext.getCmp(prototype.id + '-txtCard2').getValue().trim().length === 4) {
                me.bean.IN_CARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue().trim();
                me.bean.IN_CARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue().trim();
            } else {
                global.Msg({
                    msg: 'Credit Card Number must contain 10 digits.'
                });
                Ext.getCmp(prototype.id + '-txtCard1').setValue('');
                Ext.getCmp(prototype.id + '-txtCard2').setValue('');
            }
        } else if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim() === '' && Ext.getCmp(prototype.id + '-txtCard2').getValue().trim() !== '') {
            if (Ext.getCmp(prototype.id + '-txtCard2').getValue().trim().length === 4) {
                me.bean.IN_SCARDNCOR = Ext.getCmp(prototype.id + '-txtCard2').getValue().trim();
            } else {
                global.Msg({
                    msg: 'Correlative Number must contain 4 digits.'
                });
                Ext.getCmp(prototype.id + '-txtCard2').setValue('');
            }
        } else if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim() !== '' && Ext.getCmp(prototype.id + '-txtCard2').getValue().trim() === '') {
            if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim().length === 6) {
                me.bean.IN_CARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue().trim();
            } else {
                global.Msg({
                    msg: 'Number must contain 6 digits.'
                });
                Ext.getCmp(prototype.id + '-txtCard1').setValue('');
            }
        }
        me.bean.IN_SAUTHOC = Ext.getCmp(prototype.id + '-txtAUTHOC').getValue().trim();
        console.log(Ext.getCmp(prototype.id + '-cmbDebitType').getValue(), 'wadafa')
        me.bean.IN_DEBTYPE = Ext.getCmp(prototype.id + '-cmbDebitType').getValue();

        console.log(me.bean, 'me.bean')
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
        win.lblUser_toolTip("Estructura: MPF101");
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
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
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
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.ReportsForm.DataEntry', {
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
        Ext.getCmp(prototype.id + '-txtCard1').setValue('');
        Ext.getCmp(prototype.id + '-txtAUTHOC').setValue('');
        Ext.getCmp(prototype.id + '-txtCard2').setValue('');
        Ext.getCmp(prototype.id + '-cmbBank').setValue('');
        Ext.getCmp(prototype.id + '-cmbSTVAL').setValue('');
        Ext.getCmp(prototype.id + '-cmbTDOC').setValue('');
        Ext.getCmp(prototype.id + '-cmbDebitType').setValue('');
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