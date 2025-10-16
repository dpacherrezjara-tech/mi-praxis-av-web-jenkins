
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
            '#ReportsForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#ReportsForm-cmbDateToYear': {
                select: this.selectComboToYear
            },
            '#ReportsForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#ReportsForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#ReportsForm-cmbDateDay': {
                select: this.selectComboFromDay
            },
            '#ReportsForm-cmbDateToDay': {
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
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);
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
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
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
                ["SDATE", "Val Date"],
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
        this.paramsObtainData.IN_PF122CODPR = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
//            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {
//                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                console.log(res,'resresres')
                
                me.lstBank = res.lstBank;
                me.lstCard = res.lstCard;
                me.lstCountry = res.lstCountry;
                me.lstProcessor = res.listaProcesadores;

                var storeData = Ext.create('Ext.data.Store', {
                    data: me.lstBank,
                    autoLoad: true
                });

                var storeData3 = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });
                
                var storeData4 = Ext.create('Ext.data.Store', {
                    data: me.lstProcessor,
                    autoLoad: true
                });
                
                
                Ext.getCmp(prototype.id + '-cmbBank').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbProcessor').bindStore(storeData4);
                Ext.getCmp(prototype.id + '-cmbProcessor').setValue('');
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
        me.bean.IN_FECHA_FROM = 
            me.safeValue(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue()) +
            me.safeValue(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue()) +
            me.safeValue(Ext.getCmp(prototype.id + '-cmbDateDay').getValue());

         me.bean.IN_FECHA_TO = 
            me.safeValue(Ext.getCmp(prototype.id + '-cmbDateToYear').getValue()) +
            me.safeValue(Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue()) +
            me.safeValue(Ext.getCmp(prototype.id + '-cmbDateToDay').getValue());
    
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_CODEBANK = Ext.getCmp(prototype.id + '-cmbBank').getValue();
        me.bean.IN_STVAL = Ext.getCmp(prototype.id + '-cmbSTVAL').getValue();
        me.bean.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();
        me.bean.IN_CODPRO = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
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
        

        console.log(me.bean, 'me.beanAAAAAA')
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    
    setFormatParameter2: function () {
        me.bean = {};
        me.bean.IN_FECFILTRO = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue() == 'SDATE' ? 'S' : 'A';
        me.bean.IN_FECHA_FROM = 
             me.safeValue(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue()) +
             me.safeValue(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue()) +
             me.safeValue(Ext.getCmp(prototype.id + '-cmbDateDay').getValue());

          me.bean.IN_FECHA_TO = 
             me.safeValue(Ext.getCmp(prototype.id + '-cmbDateToYear').getValue()) +
             me.safeValue(Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue()) +
             me.safeValue(Ext.getCmp(prototype.id + '-cmbDateToDay').getValue());
     
        me.bean.IN_CODPRO = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },

    btnSearch_click: function (obj, e) {
        console.log(me.panelActual,'me.panelActual')
        if ( me.panelActual == '-panelGridSumaryMain' ){
            this.setFormatParameter2();
            this.setGridSumaryMain()
        }else{
            this.setFormatParameter();
            this.setGridData();
        }
        
        
        Ext.Ajax.request({
            url: prototype.url + '/verifyExchangeRates',    
            method: 'POST',
            timeout: 60000000,
            params: searchParams,
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);

                var lbl = Ext.getCmp(prototype.id + '-lblExchangeMessage');
                var lbl2 = Ext.getCmp(prototype.id + '-lblExchangeMessage2');

                if (lbl) {
                    // 🔹 Mostrar mensaje principal
                    lbl.setValue(res.message);
                    lbl2.setValue(res.message);

                    // 🔹 Si hay data, construir el contenido del tooltip
                    if (res.data && res.data.length > 0) {
                        let tooltipHtml = '<b>Registros sin tipo de cambio:</b><br><table style="font-size:12px;border-collapse:collapse;">';
                        tooltipHtml += '<tr><th style="padding:2px 5px;">Fecha</th><th style="padding:2px 5px;">Moneda</th><th style="padding:2px 5px;">Cantidad</th></tr>';
                        res.data.forEach(r => {
                            tooltipHtml += `<tr>
                                <td style="padding:2px 5px;">${r.SDATE}</td>
                                <td style="padding:2px 5px;">${r.SCURRENCY}</td>
                                <td style="padding:2px 5px;">${r.QTY}</td>
                            </tr>`;
                        });
                        tooltipHtml += '</table>';
                        lbl.tooltip.update(tooltipHtml);
                        lbl2.tooltip.update(tooltipHtml);

                        // Color de advertencia si hay errores
                        lbl.setFieldStyle('color: #d9534f; font-weight: bold;');
                        lbl2.setFieldStyle('color: #d9534f; font-weight: bold;');
                    } else {
                        // Caso sin errores
                        lbl.tooltip.update('Todo con tipo de cambio.');
                        lbl.setFieldStyle('color: #28a745; font-weight: bold;');
                        
                        lbl2.tooltip.update('Todos los registros cuentan con tipo de cambio.');
                        lbl2.setFieldStyle('color: #28a745; font-weight: bold;');
                    }
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

        
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
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000.00'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000.00'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000.00'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
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
            Ext.getCmp(prototype.id + '-containerFilters1').hide()
            Ext.getCmp(prototype.id + '-containerFilters2').hide()
            Ext.getCmp(prototype.id + '-lblExchangeMessage2').show()
            Ext.getCmp(prototype.id + '-pie').hide()
            this.setFormatParameter2();
            this.setGridSumaryMain()
            Ext.getCmp(prototype.id + '-panelHeight').setHeight(720);
        }else{
             Ext.getCmp(prototype.id + '-panelHeight').setHeight(620);
            Ext.getCmp(prototype.id + '-containerFilters1').show()
            Ext.getCmp(prototype.id + '-containerFilters2').show()
            Ext.getCmp(prototype.id + '-lblExchangeMessage2').hide()
            Ext.getCmp(prototype.id + '-pie').show()
            this.setFormatParameter();
            this.setGridData();
        }
    },
    setGridSumaryMain: function () {
        win.lblUser_toolTip("Estructura: MPF101");
        me.drillDown.push(me.panelActual);
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
                            
                            let lastRecord = lstData.length > 0 ? lstData[lstData.length - 1] : null;
                            console.log(lastRecord,'lastRecord')
                            let QTY_TOTAL_REFUND = lastRecord.QTY_TOTAL_REFUND;
                            let AMOUNT_TOTAL_REFUND_USD = lastRecord.AMOUNT_TOTAL_REFUND_USD;
                            let AMOUNT_TOTAL_REFUND_SEND = lastRecord.AMOUNT_TOTAL_REFUND_SEND;
                            let AMOUNT_TOTAL_REFUND_SAP = lastRecord.AMOUNT_TOTAL_REFUND_SAP;
                            let AMOUNT_TOTAL_REFUND_PENDING_USD = lastRecord.AMOUNT_TOTAL_REFUND_PENDING_USD;
                            
                             let QTY_TOTAL_CHGBACK = lastRecord.QTY_TOTAL_CHGBACK;
                            let AMOUNT_TOTAL_CHGBACK_USD = lastRecord.AMOUNT_TOTAL_CHGBACK_USD;
                            let AMOUNT_TOTAL_CHGBACK_SEND = lastRecord.AMOUNT_TOTAL_CHGBACK_SEND;
                            let AMOUNT_TOTAL_CHGBACK_SAP = lastRecord.AMOUNT_TOTAL_CHGBACK_SAP;
                            let AMOUNT_TOTAL_CHGBACK_PENDING_USD = lastRecord.AMOUNT_TOTAL_CHGBACK_PENDING_USD;
                            
                             let QTY_TOTAL_REVERSE_CHGBACK = lastRecord.QTY_TOTAL_REVERSE_CHGBACK;
                            let AMOUNT_TOTAL_REVERSE_CHGBACK_USD = lastRecord.AMOUNT_TOTAL_REVERSE_CHGBACK_USD;
                            let AMOUNT_TOTAL_REVERSE_CHGBACK_SEND = lastRecord.AMOUNT_TOTAL_REVERSE_CHGBACK_SEND;
                            let AMOUNT_TOTAL_REVERSE_CHGBACK_SAP = lastRecord.AMOUNT_TOTAL_REVERSE_CHGBACK_SAP;
                            let AMOUNT_TOTAL_REVERSE_CHGBACK_PENDING_USD = lastRecord.AMOUNT_TOTAL_REVERSE_CHGBACK_PENDING_USD;
                            
                             let QTY_TOTAL_ACRED = lastRecord.QTY_TOTAL_ACRED;
                            let AMOUNT_TOTAL_ACRED_USD = lastRecord.AMOUNT_TOTAL_ACRED_USD;
                            let AMOUNT_TOTAL_ACRED_SEND = lastRecord.AMOUNT_TOTAL_ACRED_SEND;
                            let AMOUNT_TOTAL_ACRED_SAP = lastRecord.AMOUNT_TOTAL_ACRED_SAP;
                            let AMOUNT_TOTAL_ACRED_PENDING_USD = lastRecord.AMOUNT_TOTAL_ACRED_PENDING_USD;
                            
                             let QTY_TOTAL_PENDING = lastRecord.QTY_TOTAL_PENDING;
                            let AMOUNT_TOTAL_PENDING_USD = lastRecord.AMOUNT_TOTAL_PENDING_USD;
                            let AMOUNT_TOTAL_PENDING_SEND = lastRecord.AMOUNT_TOTAL_PENDING_SEND;
                            let AMOUNT_TOTAL_PENDING_SAP = lastRecord.AMOUNT_TOTAL_PENDING_SAP;
                            
                            let QTY_TOTAL_GRANT = lastRecord.QTY_TOTAL_GRANT;
                            let AMOUNT_TOTAL_GRANT_USD = lastRecord.AMOUNT_TOTAL_GRANT_USD;
                            
                            console.log(lstData, 'console.log(lstData)')
                            let a = [];
                            let dataRoot = {text: '.', expanded: false, children: []};

                            Ext.Object.each(lstData, function (index, value) {
                                if (a.indexOf(value.strFormatDate) < 0) {
                                    let x = [];
                                    
                                    let V_QTY_REFUND = 0;
                                    let V_AMOUNT_REFUND_USD = 0;
                                    let V_AMOUNT_REFUND_SEND = 0;
                                    let V_AMOUNT_REFUND_SAP = 0;
                                    let V_AMOUNT_REFUND_PENDING_SAP = 0;

                                     let V_QTY_CHGBACK =0;
                                    let V_AMOUNT_CHGBACK_USD = 0;
                                    let V_AMOUNT_CHGBACK_SEND = 0;
                                    let V_AMOUNT_CHGBACK_SAP =0;
                                    let V_AMOUNT_CHGBACK_PENDING_SAP = 0;

                                     let V_QTY_REVERSE_CHGBACK = 0;
                                    let V_AMOUNT_REVERSE_CHGBACK_USD = 0;
                                    let V_AMOUNT_REVERSE_CHGBACK_SEND = 0;
                                    let V_AMOUNT_REVERSE_CHGBACK_SAP = 0;
                                     let V_AMOUNT_REVERSE_PENDING_CHGBACK_SAP = 0;

                                     let V_QTY_ACRED = 0;
                                    let V_AMOUNT_ACRED_USD = 0;
                                    let V_AMOUNT_ACRED_SEND = 0;
                                    let V_AMOUNT_ACRED_SAP = 0;
                                    let V_AMOUNT_ACRED_PENDING_SAP = 0;

                                     let V_QTY_PENDING = 0;
                                    let V_AMOUNT_PENDING_USD = 0;
                                    let V_AMOUNT_PENDING_SEND = 0;
                                    let V_AMOUNT_PENDING_SAP = 0;
                                    
                                    let V_QTY_GRANT = 0;
                                    let V_AMOUNT_GRANT = 0;
                                    
                                    
                        
                                    Ext.Object.each(lstData, function (index, valuex) {
                                        if (value.strFormatDate === valuex.strFormatDate) {
                                             V_QTY_REFUND += valuex.QTY_REFUND;
                                            V_AMOUNT_REFUND_USD += valuex.AMOUNT_REFUND_USD;
                                             V_AMOUNT_REFUND_SEND += valuex.AMOUNT_REFUND_SEND;
                                            V_AMOUNT_REFUND_SAP+= valuex.AMOUNT_REFUND_SAP;
                                            V_AMOUNT_REFUND_PENDING_SAP+= valuex.AMOUNT_REFUND_PENDING_SAP;

                                            V_QTY_CHGBACK += valuex.QTY_CHGBACK;
                                            V_AMOUNT_CHGBACK_USD += valuex.AMOUNT_CHGBACK_USD;
                                           V_AMOUNT_CHGBACK_SEND += valuex.AMOUNT_CHGBACK_SEND;
                                            V_AMOUNT_CHGBACK_SAP += valuex.AMOUNT_CHGBACK_SAP;
                                            V_AMOUNT_CHGBACK_PENDING_SAP += valuex.AMOUNT_CHGBACK_PENDING_SAP;

                                            V_QTY_REVERSE_CHGBACK += valuex.QTY_REVERSE_CHGBACK;
                                             V_AMOUNT_REVERSE_CHGBACK_USD += valuex.AMOUNT_REVERSE_CHGBACK_USD;
                                             V_AMOUNT_REVERSE_CHGBACK_SEND += valuex.AMOUNT_REVERSE_CHGBACK_SEND;
                                            V_AMOUNT_REVERSE_CHGBACK_SAP += valuex.AMOUNT_REVERSE_CHGBACK_SAP;
                                            V_AMOUNT_REVERSE_PENDING_CHGBACK_SAP += valuex.AMOUNT_REVERSE_PENDING_CHGBACK_SAP;

                                            V_QTY_ACRED += valuex.QTY_ACRED;
                                            V_AMOUNT_ACRED_USD += valuex.AMOUNT_ACRED_USD;
                                            V_AMOUNT_ACRED_SEND += valuex.AMOUNT_ACRED_SEND;
                                            V_AMOUNT_ACRED_SAP += valuex.AMOUNT_ACRED_SAP;
                                            V_AMOUNT_ACRED_PENDING_SAP += valuex.AMOUNT_ACRED_PENDING_SAP;

                                              V_QTY_PENDING += valuex.QTY_PENDING;
                                             V_AMOUNT_PENDING_USD += valuex.AMOUNT_PENDING_USD;
                                             V_AMOUNT_PENDING_SEND += valuex.AMOUNT_PENDING_SEND;
                                             V_AMOUNT_PENDING_SAP += valuex.AMOUNT_PENDING_SAP;
                                             
                                             V_QTY_GRANT += valuex.QTY_GRANT;
                                            V_AMOUNT_GRANT += valuex.AMOUNT_GRANT;

                                            console.log("==========")
                                        }
                                    });


                                    a.push(value.strFormatDate);
                                    dataRoot.children.push({
                                        strFormatDate: value.strFormatDate,
                                        IN_FECFILTRO: value.IN_FECFILTRO,
                                        
                                        QTY_REFUND : V_QTY_REFUND ,
                                        AMOUNT_REFUND_USD : V_AMOUNT_REFUND_USD ,
                                        AMOUNT_REFUND_SEND : V_AMOUNT_REFUND_SEND ,
                                        AMOUNT_REFUND_SAP : V_AMOUNT_REFUND_SAP ,
                                        AMOUNT_REFUND_PENDING_SAP : V_AMOUNT_REFUND_PENDING_SAP ,
                                        
                                        QTY_CHGBACK : V_QTY_CHGBACK ,
                                        AMOUNT_CHGBACK_USD : V_AMOUNT_CHGBACK_USD ,
                                        AMOUNT_CHGBACK_SEND : V_AMOUNT_CHGBACK_SEND ,
                                        AMOUNT_CHGBACK_SAP : V_AMOUNT_CHGBACK_SAP ,
                                        AMOUNT_CHGBACK_PENDING_SAP : V_AMOUNT_CHGBACK_PENDING_SAP ,
                                        
                                        QTY_REVERSE_CHGBACK : V_QTY_REVERSE_CHGBACK ,
                                        AMOUNT_REVERSE_CHGBACK_USD : V_AMOUNT_REVERSE_CHGBACK_USD ,
                                        AMOUNT_REVERSE_CHGBACK_SEND : V_AMOUNT_REVERSE_CHGBACK_SEND ,
                                        AMOUNT_REVERSE_CHGBACK_SAP : V_AMOUNT_REVERSE_CHGBACK_SAP ,
                                        AMOUNT_REVERSE_PENDING_CHGBACK_SAP : V_AMOUNT_REVERSE_CHGBACK_SAP ,
                                        
                                        QTY_ACRED : V_QTY_ACRED ,
                                        AMOUNT_ACRED_USD : V_AMOUNT_ACRED_USD ,
                                        AMOUNT_ACRED_SEND : V_AMOUNT_ACRED_SEND ,
                                        AMOUNT_ACRED_SAP : V_AMOUNT_ACRED_SAP,
                                        AMOUNT_ACRED_PENDING_SAP: V_AMOUNT_ACRED_PENDING_SAP,
                                        
                                        QTY_PENDING : V_QTY_PENDING ,
                                        AMOUNT_PENDING_USD : V_AMOUNT_PENDING_USD ,
                                        AMOUNT_PENDING_SEND : V_AMOUNT_PENDING_SEND ,
                                        AMOUNT_PENDING_SAP : V_AMOUNT_PENDING_SAP ,
                                        
                                        QTY_GRANT : V_QTY_GRANT ,
                                        AMOUNT_GRANT : V_AMOUNT_GRANT,

                                        expanded: false, children: []
                                    });
                                    
                                    let b = [];
                                    Ext.Object.each(lstData, function (index, value01) {
                                        if (value.strFormatDate === value01.strFormatDate) {
                                            console.log(value01,'value01')
                                            dataRoot.children[a.indexOf(value.strFormatDate)].children.push({
                                                strFormatDate: value01.strFormatDate,
                                                CCUST: value01.CCUST,
                                                IN_FECFILTRO: value01.IN_FECFILTRO,
                                                
                                                QTY_REFUND : value01.QTY_REFUND ,
                                                AMOUNT_REFUND_USD : value01.AMOUNT_REFUND_USD ,
                                                AMOUNT_REFUND_PENDING_SAP :value01.AMOUNT_REFUND_PENDING_SAP,
                                                AMOUNT_REFUND_SEND : value01.AMOUNT_REFUND_SEND ,
                                                AMOUNT_REFUND_SAP : value01.AMOUNT_REFUND_SAP ,

                                                QTY_CHGBACK : value01.QTY_CHGBACK ,
                                                AMOUNT_CHGBACK_USD : value01.AMOUNT_CHGBACK_USD ,
                                                AMOUNT_CHGBACK_PENDING_SAP: value01.AMOUNT_CHGBACK_PENDING_SAP,
                                                AMOUNT_CHGBACK_SEND : value01.AMOUNT_CHGBACK_SEND ,
                                                AMOUNT_CHGBACK_SAP : value01.AMOUNT_CHGBACK_SAP ,

                                                QTY_REVERSE_CHGBACK : value01.QTY_REVERSE_CHGBACK ,
                                                AMOUNT_REVERSE_CHGBACK_USD : value01.AMOUNT_REVERSE_CHGBACK_USD ,
                                                AMOUNT_REVERSE_PENDING_CHGBACK_SAP: value01.AMOUNT_REVERSE_PENDING_CHGBACK_SAP,
                                                AMOUNT_REVERSE_CHGBACK_SEND : value01.AMOUNT_REVERSE_CHGBACK_SEND ,
                                                AMOUNT_REVERSE_CHGBACK_SAP : value01.AMOUNT_REVERSE_CHGBACK_SAP ,

                                                QTY_ACRED : value01.QTY_ACRED ,
                                                AMOUNT_ACRED_USD : value01.AMOUNT_ACRED_USD ,
                                                AMOUNT_ACRED_PENDING_SAP: value01.AMOUNT_ACRED_PENDING_SAP,
                                                AMOUNT_ACRED_SEND : value01.AMOUNT_ACRED_SEND ,
                                                AMOUNT_ACRED_SAP : value01.AMOUNT_ACRED_SAP,

                                                QTY_PENDING : value01.QTY_PENDING ,
                                                AMOUNT_PENDING_USD : value01.AMOUNT_PENDING_USD ,
                                                AMOUNT_PENDING_SEND :value01.AMOUNT_PENDING_SEND ,
                                                AMOUNT_PENDING_SAP : value01.AMOUNT_PENDING_SAP ,
                                                
                                                 QTY_GRANT : value01.QTY_GRANT ,
                                                AMOUNT_GRANT : value01.AMOUNT_GRANT ,
                                                
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
                            
                          
                            
                            Ext.getCmp(prototype.id + '-QTY_TOTAL_REFUND').setText(Ext.util.Format.number(QTY_TOTAL_REFUND, '0,000'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_REFUND_USD').setText(Ext.util.Format.number(AMOUNT_TOTAL_REFUND_USD, '0,000.00'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_REFUND_PENDING_USD').setText(Ext.util.Format.number(AMOUNT_TOTAL_REFUND_PENDING_USD, '0,000.00'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_REFUND_SEND').setText(Ext.util.Format.number(AMOUNT_TOTAL_REFUND_SEND, '0,000.00'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_REFUND_SAP').setText(Ext.util.Format.number(AMOUNT_TOTAL_REFUND_SAP, '0,000.00'));
                            
                             Ext.getCmp(prototype.id + '-QTY_TOTAL_CHGBACK').setText(Ext.util.Format.number(QTY_TOTAL_CHGBACK, '0,000'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_CHGBACK_USD').setText(Ext.util.Format.number(AMOUNT_TOTAL_CHGBACK_USD, '0,000.00'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_CHGBACK_PENDING_USD').setText(Ext.util.Format.number(AMOUNT_TOTAL_CHGBACK_PENDING_USD, '0,000.00'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_CHGBACK_SEND').setText(Ext.util.Format.number(AMOUNT_TOTAL_CHGBACK_SEND, '0,000.00'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_CHGBACK_SAP').setText(Ext.util.Format.number(AMOUNT_TOTAL_CHGBACK_SAP, '0,000.00'));
                            
                             Ext.getCmp(prototype.id + '-QTY_TOTAL_REVERSE_CHGBACK').setText(Ext.util.Format.number(QTY_TOTAL_REVERSE_CHGBACK, '0,000'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_USD').setText(Ext.util.Format.number(AMOUNT_TOTAL_REVERSE_CHGBACK_USD, '0,000.00'));
                             Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_PENDING_USD').setText(Ext.util.Format.number(AMOUNT_TOTAL_REVERSE_CHGBACK_PENDING_USD, '0,000.00'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_SEND').setText(Ext.util.Format.number(AMOUNT_TOTAL_REVERSE_CHGBACK_SEND, '0,000.00'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_REVERSE_CHGBACK_SAP').setText(Ext.util.Format.number(AMOUNT_TOTAL_REVERSE_CHGBACK_SAP, '0,000.00'));
                            
                             Ext.getCmp(prototype.id + '-QTY_TOTAL_ACRED').setText(Ext.util.Format.number(QTY_TOTAL_ACRED, '0,000'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_ACRED_USD').setText(Ext.util.Format.number(AMOUNT_TOTAL_ACRED_USD, '0,000.00'));
                             Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_ACRED_PENDING_USD').setText(Ext.util.Format.number(AMOUNT_TOTAL_ACRED_PENDING_USD, '0,000.00'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_ACRED_SEND').setText(Ext.util.Format.number(AMOUNT_TOTAL_ACRED_SEND, '0,000.00'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_ACRED_SAP').setText(Ext.util.Format.number(AMOUNT_TOTAL_ACRED_SAP, '0,000.00'));
                            
                            Ext.getCmp(prototype.id + '-QTY_TOTAL_PENDING').setText(Ext.util.Format.number(QTY_TOTAL_PENDING, '0,000'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_PENDING_USD').setText(Ext.util.Format.number(AMOUNT_TOTAL_PENDING_USD, '0,000.00'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_PENDING_SEND').setText(Ext.util.Format.number(AMOUNT_TOTAL_PENDING_SEND, '0,000.00'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_PENDING_SAP').setText(Ext.util.Format.number(AMOUNT_TOTAL_PENDING_SAP, '0,000.00'));
                            
                            Ext.getCmp(prototype.id + '-QTY_TOTAL_GRANT').setText(Ext.util.Format.number(QTY_TOTAL_GRANT, '0,000'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_GRANT').setText(Ext.util.Format.number(AMOUNT_TOTAL_GRANT_USD, '0,000.00'));
                            
                            
                            var data = lastRecord;
                            console.log(lastRecord, 'datadata');
                            console.log(obj, 'objobj');
                            
                            let item = {};
                            let item2 = {};
                            let item3 = {};
                            let item4 = {};
                            let item5 = {};
                            let totals = [];
let totalCantidad = lastRecord.QTY_TOTAL_REFUND +
    lastRecord.QTY_TOTAL_CHGBACK +
    lastRecord.QTY_TOTAL_REVERSE_CHGBACK +
    lastRecord.QTY_TOTAL_ACRED +
    lastRecord.QTY_TOTAL_PENDING;

let refundMatch = (lastRecord.QTY_TOTAL_REFUND / totalCantidad) * 100;
let chgbkMatch = (lastRecord.QTY_TOTAL_CHGBACK / totalCantidad) * 100;
let reverseChgbkMatch = (lastRecord.QTY_TOTAL_REVERSE_CHGBACK / totalCantidad) * 100;
let acreditMatch = (lastRecord.QTY_TOTAL_ACRED / totalCantidad) * 100;
let othersPend = (lastRecord.QTY_TOTAL_PENDING / totalCantidad) * 100;

if (obj.data.items.length > 0) {
    totals.push({
        LABEL: 'Refund',
        Perc2: lastRecord.QTY_TOTAL_REFUND,
        VENDOR: 'Refund:\n' + Ext.util.Format.number(refundMatch, '0.00%')
    });
    
    totals.push({
        LABEL: 'Pending',
        Perc2: lastRecord.QTY_TOTAL_PENDING,
        VENDOR: 'Pending:\n' + Ext.util.Format.number(othersPend, '0.00%')
    });
    totals.push({
        LABEL: 'Chgback',
        Perc2: lastRecord.QTY_TOTAL_CHGBACK,
        VENDOR: 'Chgback:\n' + Ext.util.Format.number(chgbkMatch, '0.00%')
    });
    totals.push({
        LABEL: 'Acredit',
        Perc2: lastRecord.QTY_TOTAL_ACRED,
        VENDOR: 'Acredit:\n'+ Ext.util.Format.number(acreditMatch, '0.00%')
    });
    totals.push({
        LABEL: 'Chgback Reverse',
        Perc2: lastRecord.QTY_TOTAL_REVERSE_CHGBACK,
        VENDOR: 'Chgback Reverse:\n' + Ext.util.Format.number(reverseChgbkMatch, '0.00%')
    });
}

var storeData1er = Ext.create('Ext.data.Store', {
    data: totals,
    autoLoad: true
});

Ext.getCmp(prototype.id + '-displayPolarSM').bindStore(storeData1er);
//Ext.getCmp(prototype.id + '-lblTittlePaidSumaryMain').setText('Totals Debits: ' + Ext.util.Format.number(totalCantidad, '0,000.00'));

    // Supongamos que ya tienes lastRecord con tus datos
// Supongamos que lastRecord ya contiene tus montos
let dataBar = [
    {
        category: 'Refund',
        USD: lastRecord.AMOUNT_TOTAL_REFUND_USD,
        SEND: lastRecord.AMOUNT_TOTAL_REFUND_SEND,
        SAP: lastRecord.AMOUNT_TOTAL_REFUND_SAP
    },
    {
        category: 'Chargeback',
        USD: lastRecord.AMOUNT_TOTAL_CHGBACK_USD,
        SEND: lastRecord.AMOUNT_TOTAL_CHGBACK_SEND,
        SAP: lastRecord.AMOUNT_TOTAL_CHGBACK_SAP
    },
    {
        category: 'Reverse ChgBck',
        USD: lastRecord.AMOUNT_TOTAL_REVERSE_CHGBACK_USD,
        SEND: lastRecord.AMOUNT_TOTAL_REVERSE_CHGBACK_SEND,
        SAP: lastRecord.AMOUNT_TOTAL_REVERSE_CHGBACK_SAP
    },
    {
        category: 'Acreditaciones',
        USD: lastRecord.AMOUNT_TOTAL_ACRED_USD,
        SEND: lastRecord.AMOUNT_TOTAL_ACRED_SEND,
        SAP: lastRecord.AMOUNT_TOTAL_ACRED_SAP
    },
    {
        category: 'Pendiente',
        USD: lastRecord.AMOUNT_TOTAL_PENDING_USD,
        SEND: 0,
        SAP: 0
    }
];

// Asignar store al gráfico
let chart = Ext.getCmp(prototype.id + '-displayBarSM');
chart.setStore({
    fields: ['category', 'USD', 'SEND', 'SAP'],
    data: dataBar
});

// Opcional: definir títulos de la serie (se hace aquí porque no se puede en HTML si es dinámico)
chart.getSeries()[0].setTitle(['Amount USD', 'Amount SEND', 'Amount SAP']);


//Ext.getCmp(prototype.id + '-displayBarSM').bindStore(chart);
    
    
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
    getPeriodoYYYYMM: function(strFormatDate) {
        if (!strFormatDate) return null;

        strFormatDate = strFormatDate.trim();
        let partes = strFormatDate.split('-');

        let anio = partes[0];
        let mesTxt = partes[1];
        let dia = partes.length === 3 ? partes[2] : null;

        const meses = {
            Jan: '01', Feb: '02', Mar: '03', Apr: '04',
            May: '05', Jun: '06', Jul: '07', Aug: '08',
            Sep: '09', Oct: '10', Nov: '11', Dec: '12'
        };

        let mes = meses[mesTxt] || '00';

        if (dia) {
            if (dia.length === 1) dia = '0' + dia;
            return anio + mes + dia;
        } else {
            return anio + mes;
        }
    },
    onGridDataDetail: function (column, e, rowIndex, colIndex, rowData) {
        console.log(rowData,'rowData')
        let esPadre = rowData.record.childNodes.length ? true : false;
        let rowPadre = rowData.record.data;
        let opcion = colIndex;
        let fecha = this.getPeriodoYYYYMM(rowPadre.strFormatDate);
        me.bean = {};
        
        console.log(opcion,'opcion')
        switch (opcion) {
            case 1:
//                GRANT TOTAL CCUST 
                me.bean.IN_CONT = "";
                me.bean.IN_TDOC = "";
                break;
            case 2:
//                GRANT TOTAL QTY 
                me.bean.IN_CONT = "";
                me.bean.IN_TDOC = "";
                break;
             case 4:
//                REEMBOLSO QTY
                me.bean.IN_CONT = "";
                me.bean.IN_TDOC = "R";
                break;
            case 6:
//                REEMBOLSO AMOUNT PEN
                me.bean.IN_CONT = "RPEN";
                me.bean.IN_TDOC = "R";
                 break;
             case 7:
//                REEMBOLSO AMOUNT SEND
                me.bean.IN_CONT = "RSEND";
                me.bean.IN_TDOC = "R";
                break;
            case 8:
//                REEMBOLSO AMOUNT AMOUNT SAP
                me.bean.IN_CONT = "RSAP";
                me.bean.IN_TDOC = "R";
                break;
             case 9:
//                CHARBACK
                me.bean.IN_CONT = "";
                me.bean.IN_TDOC = "C";
                break;
            case 11:
//                CHARBACK SEND
                 me.bean.IN_CONT = "CPEN";
                me.bean.IN_TDOC = "C";
                break;
            case 12:
//                CHARBACK SEND
                 me.bean.IN_CONT = "CSEND";
                me.bean.IN_TDOC = "C";
                break;
            case 13:
//                CHARBACK SAP
                 me.bean.IN_CONT = "CSAP";
                me.bean.IN_TDOC = "C";
                break;
            case 14:
//                REVERSA CHARBACK
                me.bean.IN_CONT = "";
                me.bean.IN_TDOC = "RC";
                break;
        case 16:
//                REVERSA CHARBACK SEND
                me.bean.IN_CONT = "RVPEN";
                me.bean.IN_TDOC = "RC";
                break;
          case 17:
//                REVERSA CHARBACK SEND
                me.bean.IN_CONT = "RVSEND";
                me.bean.IN_TDOC = "RC";
                break;
            case 18:
//                REVERSA CHARBACK SAP
                me.bean.IN_CONT = "RVSAP";
                me.bean.IN_TDOC = "RC";
                break;
            case 19:
//                ACREDITACIONES
                me.bean.IN_CONT = "";
                me.bean.IN_TDOC = "A";
                break;
             case 21:
//                ACREDITACIONES SEND
                me.bean.IN_CONT = "APEN";
                me.bean.IN_TDOC = "A";
                 break;
            case 22:
//                ACREDITACIONES SEND
                me.bean.IN_CONT = "ASEND";
                me.bean.IN_TDOC = "A";
                break;
            case 23:
//                ACREDITACIONES SAP
                me.bean.IN_CONT = "ASAP";
                me.bean.IN_TDOC = "A";
                break;
            case 24:
//                PENDIENTE
                me.bean.IN_CONT = "";
                me.bean.IN_TDOC = "P";
                break;
            default:
                resultado = 'AV GROUP';
                break;
        }
        
        
        if (esPadre) {
            me.bean.IN_CCUST = "";
        } else {
            me.bean.IN_CCUST =rowPadre.CCUST;
        }
        
        me.bean.IN_DATE = fecha;
        me.bean.IN_FECFILTRO = rowPadre.IN_FECFILTRO;
        me.bean.IN_CODPRO = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();

        me.paramsDetail.beanString = JSON.stringify(me.bean);
        
        console.log(me.panelActual, 'me.panelActual')
        console.log(me.bean, 'searchParamsDETAILLLL')
        
        this.setGridDataDetail();
    },
    setGridDataDetail: function (){
        win.lblUser_toolTip("Estructura: MPF101");
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDataDetail';
        Ext.getCmp(prototype.id + '-panelHeight').setHeight(620);
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
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin3');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000.00'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000.00'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000.00'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
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
            
             let summaryBoolean = Ext.getCmp(prototype.id + '-panelGridSumaryMain').isVisible()
                if ( !summaryBoolean ){
                    Ext.getCmp(prototype.id + '-containerFilters1').hide()
                    Ext.getCmp(prototype.id + '-containerFilters2').hide()
                    Ext.getCmp(prototype.id + '-lblExchangeMessage2').show()
                    Ext.getCmp(prototype.id + '-pie').hide()
                    Ext.getCmp(prototype.id + '-panelHeight').setHeight(700);
                }else{
                     Ext.getCmp(prototype.id + '-panelHeight').setHeight(620);
                    Ext.getCmp(prototype.id + '-containerFilters1').show()
                    Ext.getCmp(prototype.id + '-containerFilters2').show()
                    Ext.getCmp(prototype.id + '-lblExchangeMessage2').hide()
                    Ext.getCmp(prototype.id + '-pie').show()
                }
            
            
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
//            me.setWidthPie();
            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000.00'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000.00'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000.00'));
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
            case  '-panelGridSumaryMain':
                global.getFile(prototype.url + '/getXLSXDashboard?beanString=' + encodeURI(searchParams.beanString));
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
//        var option = Ext.getCmp(prototype.id + '-contFilter');
//        if (option.isVisible(option)) {
//            option.setVisible(false);
//        } else {
//            option.setVisible(true);
//        }
    },
    setWidthPie: function () {

        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        console.log(ancho, 'ancho')
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-boxMainData':
                me.pagginActual = '-paggin';
                Ext.getCmp(prototype.id + '-panelHeight').setHeight(620);
                Ext.getCmp(prototype.id + '-lblExchangeMessage2').hide()
                break;
            case  '-panelGridSumaryMain':
                me.pagginActual = '-paggin2';
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                Ext.getCmp(prototype.id + '-panelHeight').setHeight(690);
                Ext.getCmp(prototype.id + '-lblExchangeMessage2').show()
                break;
            case  '-boxDataDetail':
                me.pagginActual = '-paggin3';
                Ext.getCmp(prototype.id + '-panelHeight').setHeight(620);
                Ext.getCmp(prototype.id + '-lblExchangeMessage2').hide()
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
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00.00');
    },
    getText: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00.00');
    },
    getDoubleColor2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00.00');
    },
    getDoubleColor3: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00.00');
    },
    safeValue: function safeValue(value) {
        return (value && value !== 'null' && value !== 'undefined') ? value : '';
    }
}
);