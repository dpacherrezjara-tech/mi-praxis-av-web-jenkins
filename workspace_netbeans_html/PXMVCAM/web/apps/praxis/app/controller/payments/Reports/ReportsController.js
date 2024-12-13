
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
        
        let title_module = '<h2 class="label-praxis-module"><span style="font-size: 11pt; font-family: Arial; font-weight: bold;">PAYMENTS CONTROL </span>' + '<br>' + 'Debits Reports' + '</h2>';
        $('#divTitle').html(title_module);
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
        me.bean.IN_FECFILTRO = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue() == 'SDATE' ? 'S' : 'A';
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
    
    setFormatParameter2: function () {
        me.bean = {};
        me.bean.IN_FECFILTRO = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue() == 'SDATE' ? 'S' : 'A';
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },

    btnSearch_click: function (obj, e) {
        
//        let summaryBoolean = Ext.getCmp(prototype.id + '-panelGridSumaryMain').isVisible()
//        let detailBoolean = Ext.getCmp(prototype.id + '-boxMainData').isVisible()
        if ( me.panelActual == '-panelGridSumaryMain' ){
            this.setFormatParameter2();
            this.setGridSumaryMain()
        }else{
            this.setFormatParameter();
            this.setGridData();
        }
        
    },

    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPF101");
        me.panelActual = '-boxMainData';
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
    btnDisplay_click: function(){
        let summaryBoolean = Ext.getCmp(prototype.id + '-panelGridSumaryMain').isVisible()
        let detailBoolean = Ext.getCmp(prototype.id + '-boxMainData').isVisible()
        console.log(summaryBoolean, 'summaryBoolean')
        if ( !summaryBoolean ){
            console.log('wadafafaf')
            Ext.getCmp(prototype.id + '-containerFilters1').hide()
            Ext.getCmp(prototype.id + '-containerFilters2').hide()
            
            this.setFormatParameter2();
            this.setGridSumaryMain()
        }else{
            
            Ext.getCmp(prototype.id + '-containerFilters1').show()
            Ext.getCmp(prototype.id + '-containerFilters2').show()
            this.setFormatParameter();
            this.setGridData();
        }
        

    },
    setGridSumaryMain: function () {
        win.lblUser_toolTip("Estructura: MPF101");
        
        me.panelActual = '-panelGridSumaryMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            console.log('entra al llamado')
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchSumaryMain'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                       
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            // Setear treePanel
                            let lstData = []
                            for (let value of obj.data.items) {

                                lstData.push(value.data)
                            }
                            let totQTYTOTAL = lstData[0].totQTYTOTAL;
                            let totQDMATCH = lstData[0].totQDMATCH;
                            let totADMATCH = lstData[0].totADMATCH;
                            let totQRMATCH = lstData[0].totQRMATCH;
                            let totARMATCH = lstData[0].totARMATCH;
                            let totQCMATCH = lstData[0].totQCMATCH;
                            let totACMATCH = lstData[0].totACMATCH;
                            let totQAMATCH = lstData[0].totQAMATCH;
                            let totAAMATCH = lstData[0].totAAMATCH;
                            let totQDPEND = lstData[0].totQDPEND;
                            let totADPEND = lstData[0].totADPEND;
                            console.log(lstData, 'console.log(lstData)')
                            let a = [];
                            let dataRoot = {text: '.', expanded: false, children: []};

                            Ext.Object.each(lstData, function (index, value) {
                                if (a.indexOf(value.strFormatDate) < 0) {
                                    let x = [];

                                    let V_QDMATCH = 0;
                                    let V_QRMATCH = 0;
                                    let V_QCMATCH = 0;
                                    let V_QAMATCH = 0;
                                    let V_QDPEND = 0;
                                    let V_QTYTOTAL = 0;
                                    let V_ADMATCH = 0;
                                    let V_ARMATCH = 0;
                                    let V_ACMATCH = 0;
                                    let V_AAMATCH = 0;
                                    let V_ADPEND = 0;
                                    


                                    Ext.Object.each(lstData, function (index, valuex) {
                                        if (value.strFormatDate === valuex.strFormatDate) {
                                            V_QDMATCH += valuex.QDMATCH;
                                            V_QRMATCH += valuex.QRMATCH;
                                            V_QCMATCH += valuex.QCMATCH;
                                            V_QAMATCH += valuex.QAMATCH;
                                            V_QDPEND += valuex.QDPEND;
                                            V_QTYTOTAL += valuex.QTYTOTAL;
                                            V_ADMATCH += valuex.ADMATCH;
                                            V_ARMATCH += valuex.ARMATCH;
                                            V_ACMATCH += valuex.ACMATCH;
                                            V_AAMATCH += valuex.AAMATCH;
                                            V_ADPEND += valuex.ADPEND;
                                        }
                                    });


                                    a.push(value.strFormatDate);
                                    dataRoot.children.push({
                                        strFormatDate: value.strFormatDate,
                                        IN_FECFILTRO: value.IN_FECFILTRO,
                                        QDMATCH : V_QDMATCH ,
                                        QRMATCH : V_QRMATCH ,
                                        QCMATCH : V_QCMATCH ,
                                        QAMATCH : V_QAMATCH ,
                                        QDPEND : V_QDPEND  ,
                                        QTYTOTAL : V_QTYTOTAL,
                                        ADMATCH : V_ADMATCH ,
                                        ARMATCH : V_ARMATCH ,
                                        ACMATCH : V_ACMATCH ,
                                        AAMATCH : V_AAMATCH ,
                                        ADPEND : V_ADPEND  ,

                                        expanded: false, children: []
                                    });
                                    let b = [];
                                    Ext.Object.each(lstData, function (index, value01) {
                                        if (value.strFormatDate === value01.strFormatDate) {
                                            dataRoot.children[a.indexOf(value.strFormatDate)].children.push({
                                                strFormatDate: value01.strFormatDate,
                                                CCUST: value01.CCUST,
//                                                FCHILD: value01.FCHILD,
                                                IN_FECFILTRO: value01.IN_FECFILTRO,
                                                QDMATCH : value01.QDMATCH,
                                                QRMATCH : value01.QRMATCH,
                                                QCMATCH : value01.QCMATCH,
                                                QAMATCH : value01.QAMATCH,
                                                QDPEND : value01.QDPEND,
                                                QTYTOTAL : value01.QTYTOTAL,
                                                ADMATCH : value01.ADMATCH,
                                                ARMATCH : value01.ARMATCH,
                                                ACMATCH : value01.ACMATCH,
                                                AAMATCH : value01.AAMATCH,
                                                ADPEND : value01.ADPEND,
                                                leaf: true
                                            });
                                        }
                                    });
                                }
                            });
                            console.log(dataRoot, 'dataRoot')
                            var storeTree = Ext.create('Ext.data.TreeStore', {
                                root: dataRoot
                            });

                            Ext.getCmp(prototype.id + '-gridSumaryMain').setStore(storeTree);
                            
                            Ext.getCmp(prototype.id + '-totQTYTOTAL').setText(Ext.util.Format.number(totQTYTOTAL, '0,000'));
                            Ext.getCmp(prototype.id + '-totQDMATCH').setText(Ext.util.Format.number(totQDMATCH, '0,000'));
                            Ext.getCmp(prototype.id + '-totADMATCH').setText(Ext.util.Format.number(totADMATCH, '0,000'));
                            Ext.getCmp(prototype.id + '-totQRMATCH').setText(Ext.util.Format.number(totQRMATCH, '0,000'));
                            Ext.getCmp(prototype.id + '-totARMATCH').setText(Ext.util.Format.number(totARMATCH, '0,000'));
                            Ext.getCmp(prototype.id + '-totQCMATCH').setText(Ext.util.Format.number(totQCMATCH, '0,000'));
                            Ext.getCmp(prototype.id + '-totACMATCH').setText(Ext.util.Format.number(totACMATCH, '0,000'));
                            Ext.getCmp(prototype.id + '-totQAMATCH').setText(Ext.util.Format.number(totQAMATCH, '0,000'));
                            Ext.getCmp(prototype.id + '-totAAMATCH').setText(Ext.util.Format.number(totAAMATCH, '0,000'));
                            Ext.getCmp(prototype.id + '-totQDPEND').setText(Ext.util.Format.number(totQDPEND, '0,000'));
                            Ext.getCmp(prototype.id + '-totADPEND').setText(Ext.util.Format.number(totADPEND, '0,000'));
                            
                            var data = obj.data.items[0].data;
                            console.log(data, 'datadata');
                            console.log(obj, 'objobj');
                            
                            let item = {};
                            let item2 = {};
                            let item3 = {};
                            let item4 = {};
                            let item5 = {};
                            let totals = [];
                            let charts = [];
                            let debitoMatch = (obj.data.items[0].data.totQDMATCH / obj.data.items[0].data.totQTYTOTAL) * 100;
                            let refundMatch = (obj.data.items[0].data.totQRMATCH / obj.data.items[0].data.totQTYTOTAL) * 100;
                            let chgbkMatch = (obj.data.items[0].data.totQCMATCH / obj.data.items[0].data.totQTYTOTAL) * 100;
                            let acreditMatch = (obj.data.items[0].data.totQAMATCH / obj.data.items[0].data.totQTYTOTAL) * 100;
                            let debitoPend = (obj.data.items[0].data.totQDPEND / obj.data.items[0].data.totQTYTOTAL) * 100;
                            
                            if (obj.data.items.length > 0) {
                                item.Perc2 = obj.data.items[0].data.totQDMATCH;
                                var debitsM = "Debito:\n" + Ext.util.Format.number(obj.data.items[0].data.totQDMATCH, '0,000') + "\n" + Ext.util.Format.number(debitoMatch, '0.00%');
                                item.VENDOR = debitsM;
                                totals.push(item);
                                
                                item2.Perc2 = obj.data.items[0].data.totQRMATCH;
                                var refundM = "Refund:\n" + Ext.util.Format.number(obj.data.items[0].data.totQRMATCH, '0,000') + "\n" + Ext.util.Format.number(refundMatch, '0.00%');
                                item2.VENDOR = refundM;
                                totals.push(item2);

                                item3.Perc2 = obj.data.items[0].data.totQCMATCH;
                                var chgbackM = "Chgback:\n" + Ext.util.Format.number(obj.data.items[0].data.totQCMATCH, '0,000') + "\n" + Ext.util.Format.number(chgbkMatch, '0.00%');
                                item3.VENDOR = chgbackM;
                                totals.push(item3);
                                
                                item4.Perc2 = obj.data.items[0].data.totQAMATCH;
                                var acreditM = "Acredit:\n" + Ext.util.Format.number(obj.data.items[0].data.totQAMATCH, '0,000') + "\n" + Ext.util.Format.number(acreditMatch, '0.00%');
                                item4.VENDOR = acreditM;
                                totals.push(item4);
                                
                                item5.Perc2 = obj.data.items[0].data.totQDPEND;
                                var debitsP = "Pending:\n" + Ext.util.Format.number(obj.data.items[0].data.totQDPEND, '0,000') + "\n" + Ext.util.Format.number(debitoPend, '0.00%');
                                item5.VENDOR = debitsP;
                                totals.push(item5);
                            } else {
                                totals.push({})
                            }


                            var storeData1er = Ext.create('Ext.data.Store', {
                                data: totals,
                                autoLoad: true
                            });
                            Ext.getCmp(prototype.id + '-displayPolarSM').bindStore(storeData1er);
                            Ext.getCmp(prototype.id + '-lblTittlePaidSumaryMain').setText('Totals Debits: ' + Ext.util.Format.number(obj.data.items[0].data.totQTYTOTAL, '0,000'))
                            
                            
                        }
//                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            
//            Ext.getCmp(prototype.id + '-gridSumaryMain').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    onGridDataDetail: function (column, e, row, column, x, rowData) {
        
        console.log(rowData, 'rowData')
        console.log(rowData.data.children, 'rowData')
        console.log(column, 'column')
        me.bean = {};
        let dateFormat = {
            '2024-Jan': '202401',
            '2024-Feb': '202402',
            '2024-Mar': '202403',
            '2024-Apr': '202404',
            '2024-May': '202405',
            '2024-Jun': '202406',
            '2024-Jul': '202407',
            '2024-Aug': '202408',
            '2024-Sep': '202409',
            '2024-Oct': '202410',
            '2024-Nov': '202411',
            '2024-Dec': '202412',

        };
        if( !rowData.data.children ){
            me.bean.IN_CCUST = rowData.data.CCUST;
        }else {
            me.bean.IN_CCUST = '';
        }
        me.bean.IN_DATE = dateFormat[rowData.data.strFormatDate];
        
        if ( column === 1 ){
            me.bean.IN_TDOC = 'Z';
        }else if( column === 2 ){
            me.bean.IN_TDOC = 'D';
        }else if( column === 4 ){
            me.bean.IN_TDOC = 'R';
        }else if ( column === 6 ){
            me.bean.IN_TDOC = 'C';
        }else if ( column === 8 ){
            me.bean.IN_TDOC = 'A';
        }else if ( column === 10 ){
            me.bean.IN_TDOC = 'P';
        }
        
        me.bean.IN_FECFILTRO = rowData.data.IN_FECFILTRO;
        
        me.paramsDetail.beanString = JSON.stringify(me.bean);
        var beanString = JSON.stringify(me.bean);
//        searchParams = {
//            beanString: beanString,
//            bean: me.bean
//        };
        console.log(searchParams, 'searchParams')
        me.drillDown.push(me.panelActual);
//        me.typeBean = 'D' // DRILL DOWN
        this.setGridDataDetail();


    },
    setGridDataDetail: function (){
        win.lblUser_toolTip("Estructura: MPF101");
        me.panelActual = '-boxDataDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDataDetail'
                }, listeners: {
                    beforeload: function (obj) {
//                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
//                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
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
                            var data = obj.data.items[0].data;
                            console.log(data);
                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
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
            case  '-boxDataDetail':
//                  console.log(me.paramsDetail.beanString, 'me.paramsDetail.beanString')
                global.getFile(prototype.url + '/getXLSXDetail?beanString=' + encodeURI(me.paramsDetail.beanString));
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
        console.log(ancho, 'ancho')
//        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-boxMainData':
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridSumaryMain':
                me.pagginActual = '-paggin2';
                break;
            case  '-boxDataDetail':
                me.pagginActual = '-paggin3';
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