Ext.define('Ext.Praxis.controller.payments.TemplateReconciliation.TemplateReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TemplateReconciliationController',
    fecha: new Date(),
    objA3096: {},
    bean: {},
    beanTicket: {},
    beanExcel: {},
    beanDetDay: {},
    beanDebits: {},
    beanBandoc: {},
    beanDiscounts: {},
    beanSettlements: {},
    beanHead: {},
    beanConciliation: {},
    loadDate: '',
    searchParams: {},
    paramsObtainData: {},
    paramsDetail: {},
    me: '',
    childs: '',
    drillDown: [],
    gridActual: '-boxMainData',
    boxActual: '-vskMain',
    pagginActual: '-paggin',
    user: '',
    columnCode: '',
    init: function (view) {
        me = this;
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        prototype.urlBank = CONTEXTPATH + '/BankReconciliation';
//        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataDetalle';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        console.log(this.childS, 'HIJOSSSS')
        this.control({
            // -------------------Eventos Genericos --------------------
            '#TemplateReconciliationForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#TemplateReconciliationForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#TemplateReconciliationForm-btnClear': {
                click: this.btnClear_click
            },
            '#TemplateReconciliationForm-btnBack': {
                click: this.btnBack_click
            },
            '#TemplateReconciliationForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#TemplateReconciliationForm-cmbDateToYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#TemplateReconciliationForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#TemplateReconciliationForm-cmbDateFromDay': {
                afterrender: this.afterRenderDay,
                select: this.selectComboFromDay
            },
            '#TemplateReconciliationForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth
            },
            '#TemplateReconciliationForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#TemplateReconciliationForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#TemplateReconciliationForm-btn-pag-next': {
                click: this.pagNext
            },
            '#TemplateReconciliationForm-btn-pag-last': {
                click: this.pagLast
            },
            '#TemplateReconciliationForm-btnTxtLayoutBsplink': {
                click: this.btnTxtLayoutBsplink
            },
            '#TemplateReconciliationForm-btnTxtLayoutBsplink_UATP': {
                click: this.btnTxtLayoutBsplink_UATP
            },
            '#TemplateReconciliationForm-btnTxtLayoutBsplink_UATPUnif': {
                click: this.btnTxtLayoutBsplink_UATPUnif
            },
            '#TemplateReconciliationForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#TemplateReconciliationForm-btnLog': {
                click: this.executeLog
            },
            '#TemplateReconciliationForm-btnExcelLog': {
                click: this.btnExcelLog_click
            },
        });

    },
    init_this: function () {
        me = this;
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
//        this.btnSearch_click();
    },
    
    btnSearch_click: function () {
        this.setFormatParameter();
//        this.search();
    },
    setFormatParameter: function () {
        
        me.bean = {};
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getProcessor = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();
        let getDateFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateDay').getValue();
        let getDateTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        me.bean.IN_CCUST = getCustomer;
//        me.bean.IN_DATE = getSettlementDate;
        me.bean.IN_DATE_FROM = getDateFrom;
        me.bean.IN_DATE_TO = getDateTo;
        me.bean.IN_CODPRO = 'WPP';
        me.panelActual = '-vskMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.searchParams.beanString = JSON.stringify(me.bean);
        console.log(me.bean, 'me.bean')
        
    },
    search: function () {
        
        let lstData = []

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/getPendingSettlements'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function(obj) {
                    console.log(obj,'obj')
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    console.log(pagData,'pagData')

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
//        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    showGrid: function (nameGrid) {

        if (me.drillDown.indexOf(nameGrid) === -1) {
            var paginacion = Ext.getCmp(prototype.id + '-boxPag');
            //Mostrar paginacion
            if (nameGrid === '-vskMain' || nameGrid === '-panelGridDataDetalle')
            {
                paginacion.setVisible(true);
            } else {
                paginacion.setVisible(false);
            }

            me.drillDown.push(nameGrid);
            Ext.getCmp(prototype.id + me.boxActual).hide();
            me.boxActual = nameGrid;
            Ext.getCmp(prototype.id + me.boxActual).show();
            console.log(me.drillDown,'me.drillDown')
        }
    },
    btnExcel_click: function () {
        this.setFormatParameter();
        console.log(this.searchParams,'this.searchParams')
        Ext.Msg.show({
            title: '.:PRAXISEX:.',
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
        console.log(this.boxActual,'this.boxActual')
        console.log(me.boxActual,'this.boxActual')
        if (this.boxActual === '-boxMainData') {
            console.log('entre excel')
            me.goURLpost('excelAccountingInterfaces', this.searchParams.beanString, Ext.getCmp(prototype.id + '-gridData').config.columns.items);
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridDataDetalle':
                me.pagginActual = '-paggin';
                break;
            case '-vskMain':
                me.pagginActual = '-paggin2';
                break;
            case '-panelGridDataDay':
                me.pagginActual = '-paggin3';
                break;
            case '-panelGridDataDetalle':
                me.pagginActual = '-paggin4';
                break;
            case '-panelGridDetCardByS':
                me.pagginActual = '-paggin5';
                break;
            case '-panelGridDetCardNbrByS':
                me.pagginActual = '-paggin6';
                break;
            case '-panelGridDataTicket':
                me.pagginActual = '-paggin7';
                break;
            case '-panelGridDetDayByS':
                me.pagginActual = '-paggin8';
                break;
            case '-boxDebitsData':
                me.pagginActual = '-pagginDebits';
                break;
            case '-panelGridDetCardByS_Debits':
                me.pagginActual = '-pagginDebits_country';
                break;
            case '-panelGridDataDetalle_DEBITS':
                me.pagginActual = '-pagginDebits_detail';
                break;
        }

    },
    goURLpost: function (method, parms, columns) {

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
        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "columns";
        mapInput.value = js_columns;
        mapForm.appendChild(mapInput);
        document.body.appendChild(mapForm);
        mapForm.submit();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    joinMultiSelect: function (element){
        let comboBox = element.getValue();
        return comboBox.join('|');
    },
    selectedChild: function (padre, child, add) {
        add = add === undefined ? true : add;
        if (add && this.peek() !== prototype.id + '-' + child)
            this.stack.push(prototype.id + '-' + child);
        win.selectedChild(padre, child);
        var paggin = this.getPaggin();
        if (paggin === null) {
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
            Ext.getCmp(prototype.id + '-boxPagDetail').hide();
            console.log('NIKAAAAAAAAAA')
        } else {
            var pagData = paggin.getPageData();
            console.log('selectedChild');
            console.log(padre + child + add);
            console.log(Ext.getCmp(prototype.id + '-paggin9'));
            console.log(paggin);
            console.log(pagData);

            var currentPage = win.formatLngNumber(pagData.currentPage);
            var pageCount = win.formatLngNumber(pagData.pageCount);
            var total = win.formatLngNumber(pagData.total);

            win.setText('lblPagActual', currentPage);
            win.setText('lblPagTotal', pageCount);
            win.setText('lblRowsTotal', total);

            Ext.getCmp(prototype.id + '-boxPaginacion').show();
            Ext.getCmp(prototype.id + '-boxPagDetail').show();

            var width = 0, wt;
            var boxChild = Ext.getCmp(prototype.id + '-' + child).items.items;
            for (var i = 0; i < boxChild.length; i++) {
                wt = boxChild[i].getWidth();
                if (wt > width) {
                    width = wt;
                }
            }
            Ext.getCmp(prototype.id + '-boxPagDetail').setWidth(width);
        }
    },
    updateTotalsOnCheck: function (column, rowIndex, checked, record) {
        let recordSettlements = me.getGridRecords(prototype.id + '-gridData');
        let totalSettlements = 0;
        let totalComision = 0;
        let totalComistota = 0;
        let totalNeto = 0;
        
        for (let row of recordSettlements) {
            totalSettlements += row.TOTAL;
            totalComision += row.COMISION;
            totalComistota += row.COMISTOTA;
            totalNeto += row.NETO;
        }
        
        var grid = Ext.getCmp(prototype.id + '-gridData');
        var store = grid.getStore();

        store.suspendEvents();
        store.each(function (record) {
            record.set('select', true);
            record.commit();
        });
        store.resumeEvents();
        
        var tam = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items.length;
        var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[tam-1].data;
        
        data.TOTAL_LIQ = totalSettlements;
        data.TOTAL_COMISION = totalComision;
        data.TOTAL_COMISTOTA = totalComistota;
        data.TOTAL_NETO = totalNeto;
        grid.getView().refresh();
    },
    updateGridBandoc: function (column, rowIndex, checked, record) {
        var grid = Ext.getCmp(prototype.id + '-gridData21');
        var store = grid.getStore();

        store.suspendEvents();
        store.each(function (record) {
            record.set('select', true);
            record.commit();
        });
        store.resumeEvents();
        grid.getView().refresh();
    },
    updateGridDiscount: function (column, rowIndex, checked, record) {
        var grid = Ext.getCmp(prototype.id + '-gridDataDescuentos');
        var store = grid.getStore();

        store.suspendEvents();
        store.each(function (record) {
            record.set('select', true);
            record.commit();
        });
        store.resumeEvents();
        grid.getView().refresh();
    },
    updateGridHead: function (column, rowIndex, checked, record) {
        var grid = Ext.getCmp(prototype.id + '-gridDataCabecera');
        var store = grid.getStore();

        store.suspendEvents();
        store.each(function (record) {
            record.set('select', true);
            record.commit();
        });
        store.resumeEvents();
        grid.getView().refresh();
    },
    searchAllGrid: function (e, eOpts) {
        if (eOpts.getKey() !== 13) return false;
        this.searchDiscounts();
        this.searchSettlements();
    },
    verifyConciliation: function() {
        Ext.Msg.show({
            title: '.:PRAXISEX:.',
            msg: 'Are you sure you want to execute the conciliation?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.executeConciliation();
                }
            }
        });
    },
    executeConciliation: function() {
        let me = this;
        me.beanConciliation = {};
        
        let recordDiscounts = me.getGridRecords(prototype.id + '-gridDataDescuentos');
        let recordBandoc = me.getGridRecords(prototype.id + '-gridData21');
        let recordSettlements = me.getGridRecords(prototype.id + '-gridData');
        let recordHead = me.getGridRecords(prototype.id + '-gridDataCabecera');
        let getProcess = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();

        me.beanConciliation.IN_CCUST = getCustomer;
        me.beanConciliation.IN_CODPRO = getProcess;

        let searchParamsConciliation = {
            beanString: JSON.stringify(me.beanConciliation),
            beanDiscounts: JSON.stringify(recordDiscounts),
            beanBandoc: JSON.stringify(recordBandoc),
            beanHead: JSON.stringify(recordHead),
            beanSettlements: JSON.stringify(recordSettlements)
        };
        
        console.log(searchParamsConciliation, 'searchParamsConciliation');
        
        me.sendConciliation(searchParamsConciliation, function(responseData) {
            console.log(responseData)
        });
        
    },
    sendConciliation: function (params, callback) {
        Ext.Ajax.request({
            url: prototype.url + '/executeConciliation',
            method: 'POST',
            timeout: 60000000,
            params: params,
            beforerequest:  Ext.getCmp(prototype.id + '-xpanel').mask('Loading...'),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-xpanel').unmask('Loading...');
                let res = Ext.JSON.decode(response.responseText);

                if (!res.success) {
                    global.Msg({msg: res.sesion});
                } else {
                    
                    if (!res.data.length) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                    
                    callback(res); // Retorna los datos mediante callback
                }
            },
            failure: function(response, options) {
                Ext.getCmp(prototype.id + '-xpanel').unmask('Loading...');
                console.error("Error en la petición AJAX");
                global.Msg({msg: "Error al obtener datos"});
            }
        });
    },
    getGridRecords: function(gridId) {
        var grid = Ext.getCmp(gridId);
        if (!grid) {
            console.error('Grid not found with ID:', gridId);
            return [];
        }

        var store = grid.getStore();
        if (!store) {
            console.error('The grid has no associated store.');
            return [];
        }

        return store.getRange()
            .map(record => record.getData())
            .filter(data => data.checkActive === true);
    },
    getGridRecordsSettlements: function(gridId) {
        var grid = Ext.getCmp(gridId);
        if (!grid) {
            console.error('Grid not found with ID:', gridId);
            return [];
        }

        var store = grid.getStore();
        if (!store) {
            console.error('The grid has no associated store.');
            return [];
        }

        return store.getRange()
            .map(record => record.getData())
            .filter(data => data.checkActive === true);
    },
    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Bandoc">
    searchBandoc: function (e, eOpts) {
        if (eOpts.getKey() !== 13) return false;
        this.fetchBandoc();
    },
    fetchBandoc: function () {
        let me = this;
        me.beanBandoc = {};

        let getBandoc = Ext.getCmp(prototype.id + '-txtBandoc').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();

        me.beanBandoc.IN_CCUST = getCustomer;
        me.beanBandoc.IN_BANDOC = getBandoc;
        me.beanBandoc.IN_DATEFROM = '';
        me.beanBandoc.IN_DATETO = '';
        me.beanBandoc.IN_CODPRO = '';

        let searchParamsBandoc = {
            beanString: JSON.stringify(me.beanBandoc)
        };

        console.log(searchParamsBandoc, 'searchParamsBandoc');

        me.getBandoc(searchParamsBandoc, function(responseData) {
            let store = Ext.create('Ext.data.Store', {
                data: responseData.data
            });

            Ext.getCmp(prototype.id + '-gridData21').bindStore(store);
        });
    },
    getBandoc: function (params, callback) {
        Ext.Ajax.request({
            url: prototype.url + '/getPendingDeposits',
            method: 'POST',
            timeout: 60000000,
            params: params,
            beforerequest:  Ext.getCmp(prototype.id + '-gridData21').mask('Loading...'),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-gridData21').unmask('Loading...');
                let res = Ext.JSON.decode(response.responseText);

                if (!res.success) {
                    global.Msg({msg: res.sesion});
                } else {
                    
                    if (!res.data.length) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                    
                    callback(res); // Retorna los datos mediante callback
                }
            },
            failure: function(response, options) {
                Ext.getCmp(prototype.id + '-gridData21').unmask('Loading...');
                console.error("Error en la petición AJAX");
                global.Msg({msg: "Error al obtener datos"});
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Descuentos">
    searchDiscounts: function () {
        this.fetchDiscounts();
    },
    fetchDiscounts: function () {
        let me = this;
        me.beanDiscounts = {};

        let getProcess = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getDateFrom = Ext.Date.format(Ext.getCmp(prototype.id + '-txtFromDisc').getValue(), 'Ymd');
        let getDateTo = Ext.Date.format(Ext.getCmp(prototype.id + '-txtToDisc').getValue(), 'Ymd');
        let getMerchant = Ext.getCmp(prototype.id + '-txtMerchant').getValue();
        let getLiquidation = Ext.getCmp(prototype.id + '-txtLiquidation').getValue();

        me.beanDiscounts.IN_CCUST = getCustomer;
        me.beanDiscounts.IN_CODPRO = getProcess;
        me.beanDiscounts.IN_DATEFROM = getDateFrom;
        me.beanDiscounts.IN_DATETO = getDateTo;
        me.beanSettlements.IN_MERCHANT = getMerchant;
        me.beanSettlements.IN_LIQUIDATION = getLiquidation;

        let searchParamsDiscounts = {
            beanString: JSON.stringify(me.beanDiscounts)
        };

        console.log(searchParamsDiscounts, 'searchParamsDiscounts');

        me.getDiscounts(searchParamsDiscounts, function(responseData) {
            let store = Ext.create('Ext.data.Store', {
                data: responseData.data
            });

            Ext.getCmp(prototype.id + '-gridDataDescuentos').bindStore(store);
        });
    },
    getDiscounts: function (params, callback) {
        Ext.Ajax.request({
            url: prototype.url + '/getPendingDiscounts',
            method: 'POST',
            timeout: 60000000,
            params: params,
            beforerequest:  Ext.getCmp(prototype.id + '-gridDataDescuentos').mask('Loading...'),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-gridDataDescuentos').unmask('Loading...');
                let res = Ext.JSON.decode(response.responseText);

                if (!res.success) {
                    global.Msg({msg: res.sesion});
                } else {
                    
                    if (!res.data.length) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                    
                    callback(res); // Retorna los datos mediante callback
                }
            },
            failure: function(response, options) {
                Ext.getCmp(prototype.id + '-gridDataDescuentos').unmask('Loading...');
                console.error("Error en la petición AJAX");
                global.Msg({msg: "Error al obtener datos"});
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Liquidaciones">
    searchSettlements: function () {
        this.fetchSettlements();
    },
    fetchSettlements: function () {
        let me = this;
        me.beanSettlements = {};

        let getProcess = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getDateFrom = Ext.Date.format(Ext.getCmp(prototype.id + '-txtFromSett').getValue(), 'Ymd');
        let getDateTo = Ext.Date.format(Ext.getCmp(prototype.id + '-txtToSett').getValue(), 'Ymd');
        let getMerchant = Ext.getCmp(prototype.id + '-txtMerchant').getValue();
        let getLiquidation = Ext.getCmp(prototype.id + '-txtLiquidation').getValue();
        
        me.beanSettlements.IN_CCUST = getCustomer;
        me.beanSettlements.IN_DATEFROM = getDateFrom;
        me.beanSettlements.IN_DATETO = getDateTo;
        me.beanSettlements.IN_CODPRO = getProcess;
        me.beanSettlements.IN_MERCHANT = getMerchant;
        me.beanSettlements.IN_LIQUIDATION = getLiquidation;

        let searchParamsSettlements = {
            beanString: JSON.stringify(me.beanSettlements)
        };

        console.log(searchParamsSettlements, 'searchParamsBandoc');

        me.getSettlements(searchParamsSettlements, function(responseData) {
            let store = Ext.create('Ext.data.Store', {
                data: responseData.data
            });

            Ext.getCmp(prototype.id + '-gridData').bindStore(store);
        });
    },
    getSettlements: function (params, callback) {
        Ext.Ajax.request({
            url: prototype.url + '/getPendingSettlements',
            method: 'POST',
            timeout: 60000000,
            params: params,
            beforerequest:  Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...');
                let res = Ext.JSON.decode(response.responseText);

                if (!res.success) {
                    global.Msg({msg: res.sesion});
                } else {
                    
                    if (!res.data.length) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                    
                    callback(res); // Retorna los datos mediante callback
                }
            },
            failure: function(response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...');
                console.error("Error en la petición AJAX");
                global.Msg({msg: "Error al obtener datos"});
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Cabecera">
    searchHead: function () {
        this.fetchHead();
    },
    fetchHead: function () {
        let me = this;
        me.beanHead = {};

        let getProcess = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getDateFrom = Ext.getCmp(prototype.id + '-cmbDateFromYearHead').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonthHead').getValue() + Ext.getCmp(prototype.id + '-cmbDateDayHead').getValue();
        let getDateTo = Ext.getCmp(prototype.id + '-cmbDateToYearHead').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonthHead').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDayHead').getValue();

        me.beanHead.IN_CCUST = getCustomer;
        me.beanHead.IN_DATEFROM = getDateFrom;
        me.beanHead.IN_DATETO = getDateTo;
        me.beanHead.IN_CODPRO = getProcess;

        let searchParamsHead = {
            beanString: JSON.stringify(me.beanHead)
        };

        console.log(searchParamsHead, 'searchParamsHead');

        me.getHead(searchParamsHead, function(responseData) {
            let store = Ext.create('Ext.data.Store', {
                data: responseData.data
            });

            Ext.getCmp(prototype.id + '-gridDataCabecera').bindStore(store);
        });
    },
    getHead: function (params, callback) {
        Ext.Ajax.request({
            url: prototype.url + '/getPendingHeads',
            method: 'POST',
            timeout: 60000000,
            params: params,
            beforerequest:  Ext.getCmp(prototype.id + '-gridDataCabecera').mask('Loading...'),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-gridDataCabecera').unmask('Loading...');
                let res = Ext.JSON.decode(response.responseText);

                if (!res.success) {
                    global.Msg({msg: res.sesion});
                } else {
                    
                    if (!res.data.length) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                    
                    callback(res); // Retorna los datos mediante callback
                }
            },
            failure: function(response, options) {
                Ext.getCmp(prototype.id + '-gridDataCabecera').unmask('Loading...');
                console.error("Error en la petición AJAX");
                global.Msg({msg: "Error al obtener datos"});
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    cbxDateFromYear_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue());
    },
    cbxDateFromMonth_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());
    },
    cbxDateFromDay_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue(Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue());
    },
    cbxDateFromYear_changeHandlerDesc: function() {
        Ext.getCmp(prototype.id + '-cmbDateToYearDesc').setValue(Ext.getCmp(prototype.id + '-cmbDateFromYearDesc').getValue());
    },
    cbxDateFromMonth_changeHandlerDesc: function() {
        Ext.getCmp(prototype.id + '-cmbDateToMonthDesc').setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonthDesc').getValue());
    },
    cbxDateFromDay_changeHandlerDesc: function() {
        Ext.getCmp(prototype.id + '-cmbDateToDayDesc').setValue(Ext.getCmp(prototype.id + '-cmbDateFromDayDesc').getValue());
    },
    cbxDateFromYear_changeHandlerHead: function() {
        Ext.getCmp(prototype.id + '-cmbDateToYearHead').setValue(Ext.getCmp(prototype.id + '-cmbDateFromYearHead').getValue());
    },
    cbxDateFromMonth_changeHandlerHead: function() {
        Ext.getCmp(prototype.id + '-cmbDateToMonthHead').setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonthHead').getValue());
    },
    cbxDateFromDay_changeHandlerHead: function() {
        Ext.getCmp(prototype.id + '-cmbDateToDayHead').setValue(Ext.getCmp(prototype.id + '-cmbDateFromDayHead').getValue());
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Paginado">
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        console.log(this.getPaggin(), 'this.getPaggin')
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        console.log(pag, 'pag')
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Llenar Filtros">
    setStoreData: function () {
        // Obtener la fecha de ayer
//        var yesterday = new Date();
//        yesterday.setMonth(yesterday.getMonth() - 1);
//
//        var month = yesterday.getMonth() + 1;
//        var day = yesterday.getDate();
//        var year = yesterday.getFullYear();
//
//        if (month < 10) {
//            month = '0' + month;
//        }
//
//        if (day < 10) {
//            day = '0' + day;
//        }
//
//        var storeComboDataYear = win.getStoreYear(false);
//        var storeComboDataMonth = win.getStoreMonth(true);
//        var storeComboDataDay = win.getStoreDays(true);
//        
//        /* cabecera */
//        Ext.getCmp(prototype.id + '-cmbDateFromYearHead').bindStore(storeComboDataYear);
//        Ext.getCmp(prototype.id + '-cmbDateToYearHead').bindStore(storeComboDataYear);
//        Ext.getCmp(prototype.id + '-cmbDateFromMonthHead').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateToMonthHead').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateDayHead').bindStore(storeComboDataDay);
//        Ext.getCmp(prototype.id + '-cmbDateToDayHead').bindStore(storeComboDataDay);
//        
//        /* blue */
//        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
//        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
//        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateDay').bindStore(storeComboDataDay);
//        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);
//        
//        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(year);
//        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(year);
//        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);
//        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);
//        Ext.getCmp(prototype.id + '-cmbDateDay').setValue('01'); // Ahora se establece el día de ayer
//        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('15');
//        
//        /* orange */
//        Ext.getCmp(prototype.id + '-cmbDateFromYearDesc').bindStore(storeComboDataYear);
//        Ext.getCmp(prototype.id + '-cmbDateToYearDesc').bindStore(storeComboDataYear);
//        Ext.getCmp(prototype.id + '-cmbDateFromMonthDesc').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateToMonthDesc').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateDayDesc').bindStore(storeComboDataDay);
//        Ext.getCmp(prototype.id + '-cmbDateToDayDesc').bindStore(storeComboDataDay);
//        
//        Ext.getCmp(prototype.id + '-cmbDateFromYearHead').setValue(year);
//        Ext.getCmp(prototype.id + '-cmbDateToYearHead').setValue(year);
//        Ext.getCmp(prototype.id + '-cmbDateFromMonthHead').setValue(month);
//        Ext.getCmp(prototype.id + '-cmbDateToMonthHead').setValue(month);
//        Ext.getCmp(prototype.id + '-cmbDateDayHead').setValue('01');
//        Ext.getCmp(prototype.id + '-cmbDateToDayHead').setValue('15');
//        
//        
//        Ext.getCmp(prototype.id + '-cmbDateFromYearDesc').setValue(year);
//        Ext.getCmp(prototype.id + '-cmbDateToYearDesc').setValue(year);
//        Ext.getCmp(prototype.id + '-cmbDateFromMonthDesc').setValue(month);
//        Ext.getCmp(prototype.id + '-cmbDateToMonthDesc').setValue(month);
//        Ext.getCmp(prototype.id + '-cmbDateDayDesc').setValue('01'); // Ahora se establece el día de ayer
//        Ext.getCmp(prototype.id + '-cmbDateToDayDesc').setValue('15');
        
        this.paramsObtainData.COREP = 2;
        
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
                var lstProcessor = res.lstProcessor;
               
                var storeDataProcessor = Ext.create('Ext.data.Store', {
                    data: lstProcessor,
                    autoLoad: true
                });
                
                Ext.getCmp(prototype.id + '-cmbCOREP').bindStore(storeDataProcessor);
                Ext.getCmp(prototype.id + '-cmbCOREP').setValue('EV');
            }
        });
    },
    // </editor-fold>
});