
Ext.define('Ext.Praxis.controller.payments.NoBankInformationReport.NoBankInformationReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.NoBankInformationReportController',
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
    paramsTKT: {},
    dataObtain: {},
    beanTKT: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'NoBankInformationReportForm';
        prototype.url = CONTEXTPATH + '/NoBankInformationReport';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-boxData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#NoBankInformationReportForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#NoBankInformationReportForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#NoBankInformationReportForm-btnClear': {
                click: this.btnClear_click
            },
            '#NoBankInformationReportForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#NoBankInformationReportForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#NoBankInformationReportForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#NoBankInformationReportForm-btnBack': {
                click: this.btnBack_click
            },
            '#NoBankInformationReportForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#NoBankInformationReportForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            },
            '#NoBankInformationReportForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#NoBankInformationReportForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            }
//            '#NoBankInformationReportForm-cmbDateFromDay': {
//                select: this.selectComboFromDay
//            }

        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
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

        var cmbFNoBank = Ext.getCmp(prototype.id + '-cmbFNoBank');
        cmbFNoBank.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["B", "Original Boomers"],
                ["A", "Additional Boomers"],
                ["P", "PayPal"],
                ["U", "UATP"]
            ]
        }));
        cmbFNoBank.setValue("");
        
        me.btnSearch_click();

    },

    setFormatParameter: function () {
        me.bean = {};
        me.bean.strYearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        me.bean.strMonthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();             
        me.bean.strYearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        me.bean.strMonthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        
        me.bean.IN_FNOBANK = Ext.getCmp(prototype.id + '-cmbFNoBank').getValue(); 
        
        var option = Ext.getCmp(prototype.id + '-rbgType').getValue();
            switch (option.rbgType) {
                case 'Sales':
                    me.bean.IN_TDOC = 'S';
                    break;
                case 'Refund':
                    me.bean.IN_TDOC = 'R';
                    break;
            }
                
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    
    cmbTranType_changeHandler: function () {
        var rad = Ext.getCmp(prototype.id + '-rbgType').getValue().rbgType;
        
        switch(rad){
            case 'Sales':
                Ext.getCmp(prototype.id + '-lblFechaFiltro').setText('Sales Date');
                break;
                    
            case 'Refund':
                Ext.getCmp(prototype.id + '-lblFechaFiltro').setText('Refund Date');
                break;
        }
        me.btnSearch_click();
    },
    
    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },

    setGridData: function () {
        win.lblUser_toolTip("Estructura: A2293");
        me.panelActual = '-boxData';
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
                        } 
                        else {
                            var data = obj.data.items[0].data;
//                            console.log(data);
                            Ext.getCmp(prototype.id + '-lblTotQMATCH').setText(Ext.util.Format.number(data.lngTotQMATCH, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotQSTWPY').setText(Ext.util.Format.number(data.lngTotQSTWPY, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotQPYWST').setText(Ext.util.Format.number(data.lngTotQPYWST, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotTOTSET').setText(Ext.util.Format.number(data.lngTotTOTSET, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotQACCEP').setText(Ext.util.Format.number(data.lngTotQACCEP, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotQREJEC').setText(Ext.util.Format.number(data.lngTotQREJEC, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotQSUSPE').setText(Ext.util.Format.number(data.lngTotQSUSPE, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotTOTBNK').setText(Ext.util.Format.number(data.lngTotTOTBNK, '0,000'));
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
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
//        Ext.getCmp(prototype.id + '-cmbFNoBank').setValue('');
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
//        if(dup){
//            me.bean.strOrden = '1';
//            me.paramsDetail.beanString = JSON.stringify(me.bean);
//        }else{ 
//            me.bean.strOrden = '0';
//            me.paramsDetail.beanString = JSON.stringify(me.bean);
//        }
        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-boxData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
//                global.getFile(prototype.url + '/getXLSX?beanString=' + me.paramsDetail.beanString);
                break;
//            case  '-panelGridData':
//                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
//                break;
            default:
                global.Msg(
                     {msg: 'Under Construction'
                });
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
//        console.log(ancho);
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-boxData':
                me.pagginActual = '-paggin';
                break;
            case '-boxTKT':
                me.pagginActual = '-paggin2';
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