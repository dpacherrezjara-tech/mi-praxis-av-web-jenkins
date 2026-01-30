Ext.define('Ext.Praxis.controller.payments.TemplateReconciliaCredit.TemplateReconciliaCreditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TemplateReconciliaCreditController',
    // <editor-fold defaultstate="collapsed" desc="Variable para guardar registros en memoria">
    allBandocRecords: [],
    localBandocStore: [],

    allHeaderRecords: [],
    localHeaderStore: [],

    allSettlementRecords: [],
    localSettlementStore: [],

    allDiscountRecords: [],
    localDiscountStore: [],

    allSaleRecords: [],
    localSaleStore: [],

    allSettlementRecordsReview: [],
    localSettlementStoreReview: [],

    allDiscountRecordsReview: [],
    localDiscountStoreReview: [],

    allBandocRecordsReview: [],
    localBandocStoreReview: [],

    allHeaderRecordsReview: [],
    localHeaderStoreReview: [],

    allSalesRecordsReview: [],
    localSalesStoreReview: [],
    // </editor-fold> 

    // <editor-fold defaultstate="collapsed" desc="Variable para guardar checks seleccionados">
    checkStateWMHSettlements: new Map(),
    checkStateWMHHeader: new Map(),
    checkStateWMHBandoc: new Map(),
    checkStateWMHDiscount: new Map(),
    checkStateWMHSale: new Map(),

    checkStateBandocReview: new Map(),
    checkStateHeaderReview: new Map(),
    checkStateSettlementsReview: new Map(),
    checkStateDiscountReview: new Map(),
    checkStateSalesReview: new Map(),
    // </editor-fold> 

    // <editor-fold defaultstate="collapsed" desc="Variable para guardar parametros">
    beanSettlements: {},
    beanSale: {},
    beanSaleReview: {},
    // </editor-fold> 

    esIgual: 0,
    esPercent: 0,

    esIgualWMH: 0,
    esPercentWMH: 0,

    fecha: new Date(),
    childs: '5',
    bean: '',
    beanDelete: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    reg99: 0,
    error: '',
    Fuente: '',
    me: '',
    searchParams: {},
    searchParamsDelete: {},
    paramsObtainData: {},
    lstSettlement: [],
    paramsDetail: {},
    dataObtain: {},
    lst: [],
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'TemplateReconciliaCreditForm';
        prototype.url = CONTEXTPATH + '/TemplateReconciliaCredit';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#TemplateReconciliaCreditForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#TemplateReconciliaCreditForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#TemplateReconciliaCreditForm-chkMarkSales': {
                click: this.markAllGridSale
            },
            '#TemplateReconciliaCreditForm-chkMarkBandocWMH': {
                click: this.markAllGridBandocWMH
            },
            '#TemplateReconciliaCreditForm-btnSearchSettlement': {
                click: this.searchSettlementsWMH
            },
            '#TemplateReconciliaCreditForm-btnSearchSale': {
                click: this.searchSalesWMH
            },
            '#TemplateReconciliaCreditForm-btnSearchBandoc': {
                click: this.fetchBandocWMH
            },
            '#TemplateReconciliaCreditForm-btnSearchDiscount': {
                click: this.searchDiscountsWMH
            },
            '#TemplateReconciliaCreditForm-btnSearchHeader': {
                click: this.searchHeaderWMH
            },
            '#TemplateReconciliaCreditForm-btnAddDiscount': {
                click: this.btnAddDiscount
            },
            '#TemplateReconciliaCreditForm-btnExecute': {
                click: this.verifyConciliationWMH
            },
            '#TemplateReconciliaCreditForm-btnClear': {
                click: this.btnClear_click
            },
            '#TemplateReconciliaCreditForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#TemplateReconciliaCreditForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#TemplateReconciliaCreditForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#TemplateReconciliaCreditForm-btnBack': {
                click: this.btnBack_click
            },
            '#TemplateReconciliaCreditForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#TemplateReconciliaCreditForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#TemplateReconciliaCreditForm-btn-pag-next': {
                click: this.pagNext
            },
            '#TemplateReconciliaCreditForm-btn-pag-last': {
                click: this.pagLast
            },
            '#TemplateReconciliaCreditForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth
            },
            '#TemplateReconciliaCreditForm-cmbYear': {
                afterrender: this.afterRenderYear
            },
            '#TemplateReconciliaCreditForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#TemplateReconciliaCreditForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#TemplateReconciliaCreditForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
    },
    obtainData: function () {
        this.paramsObtainData.IN_PF122CODPR = 2;
        this.paramsObtainData.COUNTRY = 2;

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {

                    me.lstProcessor = res.listaProcesadores;
                    me.lstCountry = res.lstCountry;

                    var storeData2 = Ext.create('Ext.data.Store', {
                        data: me.lstProcessor,
                        autoLoad: true
                    });

                    var storeData4 = Ext.create('Ext.data.Store', {
                        data: me.lstProcessor,
                        autoLoad: true
                    });

                    var storeData3 = Ext.create('Ext.data.Store', {
                        data: me.lstCountry,
                        autoLoad: true
                    });

                    Ext.getCmp(prototype.id + '-cmbProcessor').bindStore(storeData2);
                    Ext.getCmp(prototype.id + '-cmbProcessorReview').bindStore(storeData4);
                    Ext.getCmp(prototype.id + '-cmbProcessor').setValue('CM');
                    Ext.getCmp(prototype.id + '-cmbProcessorReview').setValue('AX');

                    Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                    Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

                } else
                    global.clear();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },

//    FUNCIONES PARA REVISAR CONCILIACION

    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Bandoc Review">
    searchBandocReview: function (e, eOpts) {
        if (eOpts.getKey() !== 13)
            return false;
        this.cleanGridsReview(true);
        this.fetchBandocReview();
    },
    fetchBandocReview: function () {
        let me = this;
        me.beanBandoc = {};
        me.checkStateBandocReview.clear();

        let getBandoc = Ext.getCmp(prototype.id + '-txtBandocReview').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClientReview').getValue();
        let getProcess = Ext.getCmp(prototype.id + '-cmbProcessorReview').getValue();

        me.beanBandoc.IN_CCUST = getCustomer;
        me.beanBandoc.IN_BANDOC = getBandoc;
        me.beanBandoc.IN_CODPRO = getProcess;

        let searchParamsBandoc = {
            beanString: JSON.stringify(me.beanBandoc)
        };

        me.getBandocReview(searchParamsBandoc);
    },
    getBandocReview: function (params) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridBandocReview');

        let currentStore = grid.getStore();
        if (currentStore) {
            currentStore.removeAll();
            grid.getView().refresh();
        }

        me.allBandocRecordsReview = [];
        me.localBandocStoreReview = null;

        grid.setLoading(true, 'Consultando extractos bancarios...');

        var store = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/getPendingDepositsReview',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            listeners: {
                beforeload: function (obj) {
                    obj.getProxy().setExtraParams(params);
                },
                load: function (s, records, successful) {
                    grid.setLoading(false);

                    if (!successful) {
                        global.Msg({msg: 'Error al obtener extractos.'});
                        return;
                    }

                    me.allBandocRecordsReview = records.map(r => r.data);
                    me.createLocalBandocReviewStore();

                }
            }
        });

        store.load();
    },
    createLocalBandocReviewStore: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridBandocReview');

        if (!me.allBandocRecordsReview?.length) {
            global.Msg({msg: 'No hay extractos para mostrar.'});
            return;
        }

        me.localBandocStoreReview = Ext.create('Ext.data.Store', {
            fields: Object.keys(me.allBandocRecordsReview[0]),
            data: me.allBandocRecordsReview,
            pageSize: 2,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {type: 'json'}
            }
        });

        grid.setStore(me.localBandocStoreReview);

        let pager = grid.getDockedItems('pagingtoolbar')[0];

        pager.un('change', me.syncTotalsToVisiblePageBandocReview, me);
        pager.on('change', me.syncTotalsToVisiblePageBandocReview, me);

        pager.bindStore(me.localBandocStoreReview);
        me.localBandocStoreReview.loadPage(1);
        grid.getView().refresh();
    },
    syncTotalsToVisiblePageBandocReview: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridBandocReview');
        let store = grid.getStore();

        if (!store || store.getCount() === 0)
            return;
        if (!me.allBandocRecordsReview?.length)
            return;

        let lastGlobal = me.allBandocRecordsReview[me.allBandocRecordsReview.length - 1];
        let lastVisible = store.getAt(store.getCount() - 1);

        lastVisible.set('TOTAL_NETO', lastGlobal.TOTAL_NETO || 0);
        lastVisible.commit();

        grid.getView().refresh();
    },
    checkBandocReview: async function (column, rowIndex, checked, record) {
        let me = this;
        let gridBandocReview = Ext.getCmp(prototype.id + '-gridBandocReview');
        let store = gridBandocReview.getStore();
        const rnActual = record.get('RN');

        if (checked) {
            me.checkStateBandocReview.clear();

            me.allBandocRecordsReview.forEach(r => {
                r.checkActive = false;
            });

            me.checkStateBandocReview.set(rnActual, true);

            store.each(function (rec) {
                if (rec !== record && rec.get('checkActive')) {
                    rec.set('checkActive', false);
                }
            });

            record.set('checkActive', true);

        } else {
            me.checkStateBandocReview.set(rnActual, false);
            record.set('checkActive', false);
        }

        if (checked) {

            let netoTotal = 0;
            let lastGlobal = me.allBandocRecordsReview[me.allBandocRecordsReview.length - 1];

            me.checkStateBandocReview.set(rnActual, checked);
            me.allBandocRecordsReview.forEach(r => {
                if (me.checkStateBandocReview.get(r.RN) === true) {
                    netoTotal += r.NETO || 0;
                }
            });
            lastGlobal.TOTAL_NETO = netoTotal;

            let lastVisible = store.getAt(store.getCount() - 1);
            lastVisible.set('TOTAL_NETO', netoTotal);
            lastVisible.commit();
            gridBandocReview.getView().refresh();

            let IN_CCUST = record.get('CCUST');
            let IN_BANDOC = record.get('BANDOC');
            let IN_CODPRO = Ext.getCmp(prototype.id + '-cmbProcessorReview').getValue();
            let IN_DATECI = record.get('DATECI');
            let IN_TRANCI = record.get('TRANCI');
            const esVenta = ["VN", "BM", "AB"].includes(IN_CODPRO);

            await me.searchHeaderReview(IN_CCUST, IN_BANDOC, IN_DATECI, IN_TRANCI, IN_CODPRO);
            await me.searchSettlementsReview(IN_CCUST, IN_BANDOC, IN_DATECI, IN_TRANCI, IN_CODPRO);
            await me.searchDiscountsReview(IN_CCUST, IN_BANDOC, IN_DATECI, IN_TRANCI, IN_CODPRO);

            if (esVenta) {

                await me.searchSalesReview(IN_CCUST, IN_BANDOC, IN_DATECI, IN_TRANCI, IN_CODPRO);
                await me.updateTotalsPanelReviewSales();
            } else {
                await me.updateTotalsPanelReview();
            }

        } else {
            let lastVisible = store.getAt(store.getCount() - 1);
            lastVisible.set('TOTAL_NETO', 0);
            lastVisible.commit();
            gridBandocReview.getView().refresh();
            me.cleanGridsReview(false);
            me.updateTotalsPanelReview();
        }

    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Header Review">
    searchHeaderReview: function (IN_CCUST, IN_BANDOC, IN_DATECI, IN_TRANCI, IN_CODPRO) {
        return this.fetchHeaderReview(IN_CCUST, IN_BANDOC, IN_DATECI, IN_TRANCI, IN_CODPRO);
    },
    fetchHeaderReview: function (IN_CCUST, IN_BANDOC, IN_DATECI, IN_TRANCI, IN_CODPRO) {
        let me = this;
        me.beanHeader = {};
        me.checkStateHeaderReview.clear();

        me.beanHeader.IN_CCUST = IN_CCUST;
        me.beanHeader.IN_BANDOC = IN_BANDOC;
        me.beanHeader.IN_DATECI = IN_DATECI;
        me.beanHeader.IN_TRANCI = IN_TRANCI;
        me.beanHeader.IN_PROCESSOR = IN_CODPRO;

        let searchParamsHeader = {
            beanString: JSON.stringify(me.beanHeader)
        };

        return me.getHeaderReview(searchParamsHeader); // Devuelve la Promise
    },
    getHeaderReview: function (params) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridCabeceraReview');

        let currentStore = grid.getStore();
        if (currentStore) {
            currentStore.removeAll();
            grid.getView().refresh();
        }

        me.allHeaderRecordsReview = [];
        me.localHeaderStoreReview = null;

        grid.setLoading(true, 'Consultando descuentos...');

        // Devolver una Promise
        return new Promise((resolve, reject) => {
            var store = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
                proxy: {
                    url: prototype.url + '/getHeaderDiscountsReview',
                    reader: {type: 'json', rootProperty: 'data', totalProperty: 'total'}
                },
                pageSize: 20,
                listeners: {
                    beforeload: function (obj) {
                        obj.getProxy().setExtraParams(params);
                    },
                    load: function (s, records, successful) {
                        grid.setLoading(false);

                        if (!successful) {
                            global.Msg({msg: 'Error al obtener header.'});
                            reject(new Error('Error al obtener header'));
                            return;
                        }

                        me.allHeaderRecordsReview = records.map(r => r.data);
                        me.allHeaderRecordsReview.forEach(r => {
                            me.checkStateHeaderReview.set(r.RN, true);
                        });

                        me.createLocalHeaderStoreReview();
                        resolve(); // Resolver la Promise cuando termine
                    },
                    exception: function (proxy, response, operation) {
                        grid.setLoading(false);
                        reject(new Error('Error en la solicitud'));
                    }
                }
            });

            store.load();
        });
    },
    createLocalHeaderStoreReview: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridCabeceraReview');

        if (!me.allHeaderRecordsReview?.length) {
            global.Msg({msg: 'No hay header  para mostrar.'});
            return;
        }

        me.localHeaderStoreReview = Ext.create('Ext.data.Store', {
            fields: Object.keys(me.allHeaderRecordsReview[0]),
            data: me.allHeaderRecordsReview,
            pageSize: 2,
            proxy: {type: 'memory', enablePaging: true, reader: {type: 'json'}}
        });

        grid.setStore(me.localHeaderStoreReview);

        let pager = grid.getDockedItems('pagingtoolbar')[0];
        pager.un('change', me.syncTotalsToVisiblePageHeaderReview, me);
        pager.on('change', me.syncTotalsToVisiblePageHeaderReview, me);
        pager.bindStore(me.localHeaderStoreReview);

        me.localHeaderStoreReview.loadPage(1);
        grid.getView().refresh();
    },
    syncTotalsToVisiblePageHeaderReview: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridCabeceraReview');
        let store = grid.getStore();

        if (!store || store.getCount() === 0)
            return;
        if (!me.allHeaderRecordsReview?.length)
            return;

        let lastGlobal = me.allHeaderRecordsReview[me.allHeaderRecordsReview.length - 1];
        let lastVisible = store.getAt(store.getCount() - 1);

        lastVisible.set('SUM_TOTAL', lastGlobal.SUM_TOTAL || 0);
        lastVisible.set('SUM_COMISION', lastGlobal.SUM_COMISION || 0);
        lastVisible.set('SUM_NETO', lastGlobal.SUM_NETO || 0);
        lastVisible.set('SUM_IMPORTEPAG', lastGlobal.SUM_IMPORTEPAG || 0);
        lastVisible.commit();

        grid.getView().refresh();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Liquidaciones Review">
    searchSettlementsReview: function (IN_CCUST, IN_BANDOC, IN_DATECI, IN_TRANCI, IN_CODPRO) {
        return this.fetchSettlementsReview(IN_CCUST, IN_BANDOC, IN_DATECI, IN_TRANCI, IN_CODPRO);
    },
    fetchSettlementsReview: function (IN_CCUST, IN_BANDOC, IN_DATECI, IN_TRANCI, IN_CODPRO) {
        let me = this;
        me.beanSettlements = {};
        me.checkStateSettlementsReview.clear();

        me.beanSettlements.IN_CCUST = IN_CCUST;
        me.beanSettlements.IN_BANDOC = IN_BANDOC;
        me.beanSettlements.IN_DATECI = IN_DATECI;
        me.beanSettlements.IN_TRANCI = IN_TRANCI;
        me.beanSettlements.IN_PROCESSOR = IN_CODPRO;

        console.log(me.beanSettlements, 'me.beanSettlements');

        let searchParamsSettlements = {
            beanString: JSON.stringify(me.beanSettlements)
        };

        return me.getSettlementsReview(searchParamsSettlements);
    },
    getSettlementsReview: function (params) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataSettlementReview');

        let currentStore = grid.getStore();
        if (currentStore) {
            currentStore.removeAll();
            grid.getView().refresh();
        }

        me.allSettlementRecordsReview = [];
        me.localSettlementStoreReview = null;

        grid.setLoading(true, 'Cargando liquidaciones...');

        // Devolver una Promise
        return new Promise((resolve, reject) => {
            var store = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
                proxy: {
                    url: prototype.url + '/getPendingSettlementsReview',
                    reader: {
                        type: 'json',
                        rootProperty: 'data',
                        totalProperty: 'total'
                    }
                },
                pageSize: 20,
                listeners: {
                    beforeload: function (obj) {
                        obj.getProxy().setExtraParams(params);
                    },
                    load: function (s, records, successful) {
                        grid.setLoading(false);
                        if (!successful) {
                            const errorMsg = 'Error al obtener liquidaciones.';
                            global.Msg({msg: errorMsg});
                            reject(new Error(errorMsg));
                            return;
                        }

                        me.allSettlementRecordsReview = records.map(r => r.data);
                        me.allSettlementRecordsReview.forEach(r => {
                            me.checkStateSettlementsReview.set(r.RN, true);
                        });

                        me.createLocalSettlementStoreReview();
                        resolve(me.allSettlementRecordsReview); // Resolver con los datos
                    },
                    exception: function (proxy, response, operation) {
                        grid.setLoading(false);
                        const errorMsg = 'Error en la solicitud de liquidaciones';
                        console.error(errorMsg, response);
                        reject(new Error(errorMsg));
                    }
                }
            });

            store.load();
        });
    },
    createLocalSettlementStoreReview: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataSettlementReview');

        if (!me.allSettlementRecordsReview?.length) {
            global.Msg({msg: 'No hay liquidaciones para mostrar.'});
            return;
        }

        me.localSettlementStoreReview = Ext.create('Ext.data.Store', {
            fields: Object.keys(me.allSettlementRecordsReview[0]),
            data: me.allSettlementRecordsReview,
            pageSize: 20,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {type: 'json'}
            }
        });

        grid.setStore(me.localSettlementStoreReview);

        let pager = grid.getDockedItems('pagingtoolbar')[0];

        // 👇 Conectar el sync con el nombre que querías, igual que en ventas
        pager.un('change', me.syncTotalsToVisiblePageSettReview, me);
        pager.on('change', me.syncTotalsToVisiblePageSettReview, me);

        me.localSettlementStoreReview.loadPage(1);
        grid.getView().refresh();
    },
    syncTotalsToVisiblePageSettReview: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataSettlementReview');
        let store = grid.getStore();

        if (!store || store.getCount() === 0)
            return;
        if (!me.allSettlementRecordsReview || me.allSettlementRecordsReview.length === 0)
            return;

        let lastGlobal = me.allSettlementRecordsReview[me.allSettlementRecordsReview.length - 1];
        console.log(lastGlobal, 'lastGlobal')
        let lastVisible = store.getAt(store.getCount() - 1);

        lastVisible.set('TOTAL_LIQ', lastGlobal.TOTAL_LIQ || 0);
        lastVisible.set('TOTAL_COMISION', lastGlobal.TOTAL_COMISION || 0);
        lastVisible.set('TOTAL_COMISTOTA', lastGlobal.TOTAL_COMISTOTA || 0);
        lastVisible.set('TOTAL_NETO', lastGlobal.TOTAL_NETO || 0);
        lastVisible.set('TOTAL_IMPORTEPAG', lastGlobal.TOTAL_IMPORTEPAG || 0);
        lastVisible.commit();

        grid.getView().refresh();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Liquidaciones Review">
    searchSalesReview: function (IN_CCUST, IN_BANDOC, IN_DATECI, IN_TRANCI, IN_CODPRO) {
        return this.fetchSalesReview(IN_CCUST, IN_BANDOC, IN_DATECI, IN_TRANCI, IN_CODPRO);
    },
    fetchSalesReview: function (IN_CCUST, IN_BANDOC, IN_DATECI, IN_TRANCI, IN_CODPRO) {
        let me = this;
        me.beanSaleReview = {};
        me.checkStateSalesReview.clear();

        me.beanSaleReview.IN_CCUST = IN_CCUST;
        me.beanSaleReview.IN_BANDOC = IN_BANDOC;
        me.beanSaleReview.IN_DATECI = IN_DATECI;
        me.beanSaleReview.IN_TRANCI = IN_TRANCI;
        me.beanSaleReview.IN_PROCESSOR = IN_CODPRO;

        console.log(me.beanSaleReview, 'me.beanSaleReview');

        let searchParamsSettlements = {
            beanString: JSON.stringify(me.beanSaleReview)
        };

        return me.getSalesReview(searchParamsSettlements);
    },
    getSalesReview: function (params) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataVentasReview');

        let currentStore = grid.getStore();
        if (currentStore) {
            currentStore.removeAll();
            grid.getView().refresh();
        }

        me.allSalesRecordsReview = [];
        me.localSalesStoreReview = null;

        grid.setLoading(true, 'Cargando Ventas...');

        // Devolver una Promise
        return new Promise((resolve, reject) => {
            var store = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
                proxy: {
                    url: prototype.url + '/getPendingSalesReview',
                    reader: {
                        type: 'json',
                        rootProperty: 'data',
                        totalProperty: 'total'
                    }
                },
                pageSize: 20,
                listeners: {
                    beforeload: function (obj) {
                        obj.getProxy().setExtraParams(params);
                    },
                    load: function (s, records, successful) {
                        grid.setLoading(false);
                        if (!successful) {
                            const errorMsg = 'Error al obtener ventas.';
                            global.Msg({msg: errorMsg});
                            reject(new Error(errorMsg));
                            return;
                        }

                        me.allSalesRecordsReview = records.map(r => r.data);
                        console.log(me.allSalesRecordsReview, 'allSalesRecordsReview')
                        me.allSalesRecordsReview.forEach(r => {
                            me.checkStateSalesReview.set(r.RN, true);
                        });

                        me.createLocalSalesStoreReview();
                        resolve(me.allSalesRecordsReview);
                    },
                    exception: function (proxy, response, operation) {
                        grid.setLoading(false);
                        const errorMsg = 'Error en la solicitud de liquidaciones';
                        console.error(errorMsg, response);
                        reject(new Error(errorMsg));
                    }
                }
            });

            store.load();
        });
    },
    createLocalSalesStoreReview: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataVentasReview');

        if (!me.allSalesRecordsReview?.length) {
            global.Msg({msg: 'No hay ventas para mostrar.'});
            return;
        }

        me.localSalesStoreReview = Ext.create('Ext.data.Store', {
            fields: Object.keys(me.allSalesRecordsReview[0]),
            data: me.allSalesRecordsReview,
            pageSize: 20,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {type: 'json'}
            }
        });

        grid.setStore(me.localSalesStoreReview);

        let pager = grid.getDockedItems('pagingtoolbar')[0];

        // 👇 Conectar el sync con el nombre que querías, igual que en ventas
        pager.un('change', me.syncTotalsToVisiblePageSalesReview, me);
        pager.on('change', me.syncTotalsToVisiblePageSalesReview, me);

        me.localSalesStoreReview.loadPage(1);
        grid.getView().refresh();
    },
    syncTotalsToVisiblePageSalesReview: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataVentasReview');
        let store = grid.getStore();

        if (!store || store.getCount() === 0)
            return;
        if (!me.allSalesRecordsReview || me.allSalesRecordsReview.length === 0)
            return;

        let lastGlobal = me.allSalesRecordsReview[me.allSalesRecordsReview.length - 1];
        console.log(lastGlobal, 'lastGlobal')
        let lastVisible = store.getAt(store.getCount() - 1);

        lastVisible.set('TOTAL_SVFOP', lastGlobal.TOTAL_SVFOP || 0);
        lastVisible.set('TOTAL_SVFOP_CONVERTED', lastGlobal.TOTAL_SVFOP_CONVERTED || 0);
        lastVisible.commit();

        grid.getView().refresh();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Descuentos Review">
    searchDiscountsReview: function (IN_CCUST, IN_BANDOC, IN_DATECI, IN_TRANCI, IN_CODPRO) {
        return this.fetchDiscountsReview(IN_CCUST, IN_BANDOC, IN_DATECI, IN_TRANCI, IN_CODPRO);
    },
    fetchDiscountsReview: function (IN_CCUST, IN_BANDOC, IN_DATECI, IN_TRANCI, IN_CODPRO) {
        let me = this;
        me.beanDiscounts = {};
        me.checkStateDiscountReview.clear();

        me.beanDiscounts.IN_CCUST = IN_CCUST;
        me.beanDiscounts.IN_BANDOC = IN_BANDOC;
        me.beanDiscounts.IN_DATECI = IN_DATECI;
        me.beanDiscounts.IN_TRANCI = IN_TRANCI;
        me.beanDiscounts.IN_PROCESSOR = IN_CODPRO;

        let searchParamsDiscounts = {
            beanString: JSON.stringify(me.beanDiscounts)
        };

        return me.getDiscountsReview(searchParamsDiscounts);
    },
    getDiscountsReview: function (params) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataDescuentosReview');

        let currentStore = grid.getStore();
        if (currentStore) {
            currentStore.removeAll();
            grid.getView().refresh();
        }

        me.allDiscountRecordsReview = [];
        me.localDiscountStoreReview = null;

        grid.setLoading(true, 'Consultando descuentos...');

        // Devolver una Promise
        return new Promise((resolve, reject) => {
            var store = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
                proxy: {
                    url: prototype.url + '/getPendingDiscountsReview',
                    reader: {type: 'json', rootProperty: 'data', totalProperty: 'total'}
                },
                pageSize: 20,
                listeners: {
                    beforeload: function (obj) {
                        obj.getProxy().setExtraParams(params);
                    },
                    load: function (s, records, successful) {
                        grid.setLoading(false);

                        if (!successful) {
                            const errorMsg = 'Error al obtener descuentos.';
                            global.Msg({msg: errorMsg});
                            reject(new Error(errorMsg));
                            return;
                        }

                        me.allDiscountRecordsReview = records.map(r => r.data);

                        // CORRECCIÓN IMPORTANTE: usar checkStateDiscountReview en lugar de checkStateBandocReview
                        me.allDiscountRecordsReview.forEach(r => {
                            me.checkStateDiscountReview.set(r.RN, true);
                        });

                        me.createLocalDiscountStoreReview();
                        resolve(me.allDiscountRecordsReview); // Resolver con los datos
                    },
                    exception: function (proxy, response, operation) {
                        grid.setLoading(false);
                        const errorMsg = 'Error en la solicitud de descuentos';
                        console.error(errorMsg, response);
                        reject(new Error(errorMsg));
                    }
                }
            });

            store.load();
        });
    },
    createLocalDiscountStoreReview: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataDescuentosReview');

        if (!me.allDiscountRecordsReview?.length) {
            global.Msg({msg: 'No hay descuentos para mostrar.'});
            return;
        }

        me.localDiscountStoreReview = Ext.create('Ext.data.Store', {
            fields: Object.keys(me.allDiscountRecordsReview[0]),
            data: me.allDiscountRecordsReview,
            pageSize: 20,
            proxy: {type: 'memory', enablePaging: true, reader: {type: 'json'}}
        });

        grid.setStore(me.localDiscountStoreReview);

        let pager = grid.getDockedItems('pagingtoolbar')[0];
        pager.un('change', me.syncTotalsToVisiblePageDiscountReview, me);
        pager.on('change', me.syncTotalsToVisiblePageDiscountReview, me);
        pager.bindStore(me.localDiscountStoreReview);

        me.localDiscountStoreReview.loadPage(1);
        grid.getView().refresh();
    },
    syncTotalsToVisiblePageDiscountReview: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataDescuentosReview');
        let store = grid.getStore();

        if (!store || store.getCount() === 0)
            return;
        if (!me.allDiscountRecordsReview?.length)
            return;

        let lastGlobal = me.allDiscountRecordsReview[me.allDiscountRecordsReview.length - 1];
        let lastVisible = store.getAt(store.getCount() - 1);

        lastVisible.set('TOTAL_IMPORTE', lastGlobal.TOTAL_IMPORTE || 0);
        lastVisible.set('TOTAL_IMPORTEPAG', lastGlobal.TOTAL_IMPORTEPAG || 0);
        lastVisible.commit();

        grid.getView().refresh();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Resultados Review">
    updateTotalsPanelReview: function () {
        let me = this;
        this.esIgual = 0;

        let totalDeposito = 0;
        let totalTotal = 0;
        let totalVentas = 0;
        let totalComision = 0;
        let totalDescuento = 0;

        if (me.allBandocRecordsReview && me.allBandocRecordsReview.length > 0) {
            me.allBandocRecordsReview.forEach(r => {
                if (me.checkStateBandocReview.get(r.RN) === true) {
                    totalDeposito += Number(r.NETO) || 0;
                }
            });
        }

        console.log(me.allSettlementRecordsReview, 'allSettlementRecordsReview')

        if (me.allSettlementRecordsReview.length > 0) {
            me.allSettlementRecordsReview.forEach(r => {
                if (me.checkStateSettlementsReview.get(r.RN) === true) {
                    totalVentas += r.TOTAL || 0;
                    totalComision += r.COMISION || 0;
                    totalTotal += r.TOTAL || 0;
                }
            });
        }

        if (me.allDiscountRecordsReview && me.allDiscountRecordsReview.length > 0) {
            me.allDiscountRecordsReview.forEach(r => {
                if (me.checkStateDiscountReview.get(r.RN) === true) {
                    totalDescuento += Number(r.IMPORTECeba) || 0;
                }
            });
        }

        let calculo = Math.abs(totalDeposito - (Math.abs(totalTotal) - Math.abs(totalComision) - Math.abs(totalDescuento)));

        console.log(totalDeposito, 'totalDeposito')
        console.log(totalTotal, 'totalTotal')
        console.log(totalComision, 'totalComision')
        console.log(totalDescuento, 'totalDescuento')

        let totalImplicado = Math.abs(totalDeposito)
                + Math.abs(totalVentas)
                + Math.abs(totalComision)
                + Math.abs(totalDescuento);

        let porcentaje = 0;
        if (totalImplicado > 0) {
            porcentaje = ((totalImplicado - calculo) / totalImplicado) * 100;
            porcentaje = Math.max(0, Math.min(100, porcentaje));
        }
        if (calculo === 0)
            porcentaje = 100;

        let formattedPercent = porcentaje.toFixed(2) + '%';

        let cmpDeposito = Ext.getCmp(prototype.id + '-txtTotalDepositoReview');
        let cmpVentas = Ext.getCmp(prototype.id + '-txtTotalReview');
        let cmpComision = Ext.getCmp(prototype.id + '-txtTotalComisionReview');
        let cmpDescuento = Ext.getCmp(prototype.id + '-txtTotalDescuentosReview');
        let cmpCalculo = Ext.getCmp(prototype.id + '-txtTotalCalculoReview');
        let cmpPercent = Ext.getCmp(prototype.id + '-txtPercentVentaReview');

        cmpDeposito?.setValue(Ext.util.Format.number(totalDeposito, '0,000.00'));
        cmpVentas?.setValue(Ext.util.Format.number(totalVentas, '0,000.00'));
        cmpComision?.setValue(Ext.util.Format.number(totalComision, '0,000.00'));
        cmpDescuento?.setValue(Ext.util.Format.number(totalDescuento, '0,000.00'));
        cmpCalculo?.setValue(Ext.util.Format.number(calculo, '0,000.00'));
        cmpPercent?.setValue(formattedPercent);

        this.esIgual = calculo === 0;
        let colorFondo = this.esIgual ? '#4CAF50' : '#F44336';
        let colorTexto = 'white';

        Ext.defer(() => {
            let el = cmpCalculo?.getEl();
            if (el)
                el.setStyle({'background-color': colorFondo, 'color': colorTexto, 'font-weight': 'bold'});
        }, 10);

        Ext.defer(() => {
            let elPercent = cmpPercent?.getEl();
            if (elPercent)
                elPercent.setStyle({'background-color': porcentaje === 100 ? '#4CAF50' : '#F44336', 'color': 'white', 'font-weight': 'bold'});
        }, 10);
    },
    updateTotalsPanelReviewSales: function () {
        let me = this;
        this.esIgual = 0;

        let totalDeposito = 0;
        let totalVentas = 0;
        let totalVentasConvertido = 0;

        if (me.allBandocRecordsReview && me.allBandocRecordsReview.length > 0) {
            me.allBandocRecordsReview.forEach(r => {
                if (me.checkStateBandocReview.get(r.RN) === true) {
                    totalDeposito += Number(r.NETO) || 0;
                }
            });
        }

        if (me.allSalesRecordsReview && me.allSalesRecordsReview.length > 0) {
            let lastGlobal = me.allSalesRecordsReview[me.allSalesRecordsReview.length - 1];
            totalVentas = Math.abs(Number(lastGlobal.TOTAL_SVFOP)) || 0;
            totalVentasConvertido = Math.abs(Number(lastGlobal.TOTAL_SVFOP_CONVERTED)) || 0;
        }

        let valueProccesor = Ext.getCmp(prototype.id + '-cmbProcessorReview').getValue();
        let baseValue = (valueProccesor === 'AB') ? totalVentas : totalVentasConvertido;

        let calculo = baseValue - totalDeposito;
        let porcentaje = calculo > 0 ? (calculo / baseValue) * 100 : 0;

        let formattedDeposito = Ext.util.Format.number(totalDeposito, '0,000.00');
        let formattedVentas = Ext.util.Format.number(baseValue, '0,000.00');
        let formattedCalculo = Ext.util.Format.number(calculo, '0,000.00');
        let formattedPorcentaje = Ext.util.Format.number(porcentaje, '0.00') + '%';

        let cmpDeposito = Ext.getCmp(prototype.id + '-txtTotalDepositoReview');
        let cmpVentas = Ext.getCmp(prototype.id + '-txtVentasReview');
        let cmpCalculo = Ext.getCmp(prototype.id + '-txtTotalCalculoReview');
        let cmpPorcentaje = Ext.getCmp(prototype.id + '-txtPercentVentaReview');

        cmpDeposito?.setValue(formattedDeposito);
        cmpVentas?.setValue(formattedVentas);
        cmpCalculo?.setValue(formattedCalculo);
        cmpPorcentaje?.setValue(formattedPorcentaje);

        let esNegativo = calculo < 0;

        if (esNegativo) {
            cmpCalculo?.getEl()?.setStyle({background: "#F44336", color: "white"});
            cmpPorcentaje?.getEl()?.setStyle({background: "#F44336", color: "white"});
            return;
        }

        let elCalculo = cmpCalculo?.getEl();
        if (elCalculo) {
            elCalculo.setStyle({background: "transparent", color: "black"});
        }

        this.esPercent = porcentaje >= 0 && porcentaje <= 10;

        let elPercent = cmpPorcentaje?.getEl();
        if (elPercent) {
            if (this.esPercent) {
                elPercent.setStyle({background: "#4CAF50", color: "white", fontWeight: "bold"});
            } else {
                elPercent.setStyle({background: "#F44336", color: "white", fontWeight: "bold"});
            }
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Limpiar Grillas y Resultados Review">
    cleanGridsReview: function (deleteStatement) {
        let me = this;

        // Siempre limpiar grids hijas (independiente de deleteStatement)
        const childGridsToClean = [
            '-gridCabeceraReview',
            '-gridDataSettlementReview',
            '-gridDataDescuentosReview',
            '-gridDataVentasReview'
        ];

        childGridsToClean.forEach(gridId => {
            const grid = Ext.getCmp(prototype.id + gridId);
            if (grid) {
                grid.getStore()?.removeAll();
                grid.getView()?.refresh();
            }
        });

        // Resetear arrays globales de grids hijas
        me.allSettlementRecordsReview = [];
        me.allDiscountRecordsReview = [];
        me.allHeaderRecordsReview = [];
        me.allSalesRecordsReview = [];

        // Resetear stores locales de grids hijas
        me.localSettlementStoreReview = null;
        me.localDiscountStoreReview = null;
        me.localHeaderStoreReview = null;
        me.localSalesStoreReview = null;

        // Limpiar maps de selección de grids hijas
        me.checkStateHeaderReview.clear();
        me.checkStateSettlementsReview.clear();
        me.checkStateDiscountReview.clear();
        me.checkStateSalesReview.clear();

        // Resetear campos de resultados
        const resultFields = [
            '-txtTotalDepositoReview',
            '-txtTotalReview',
            '-txtTotalComisionReview',
            '-txtTotalDescuentosReview',
            '-txtTotalCalculoReview',
            '-txtPercentVentaReview',
            '-txtVentasReview'
        ];

        resultFields.forEach(fieldId => {
            const field = Ext.getCmp(prototype.id + fieldId);
            if (field) {
                field.setValue('0.00');
                const el = field.getEl();
                if (el) {
                    el.setStyle({
                        'background-color': '',
                        'color': '',
                        'font-weight': ''
                    });
                }
            }
        });

        // Resetear variables de estado
        me.esIgual = 0;
        me.esPercent = 0;

        // SOLO si deleteStatement es true, limpiar gridBandocReview también
        if (deleteStatement) {
            // Limpiar gridBandocReview
            const bandocGrid = Ext.getCmp(prototype.id + '-gridBandocReview');
            if (bandocGrid) {
                bandocGrid.getStore()?.removeAll();
                bandocGrid.getView()?.refresh();
            }

            // Resetear datos de bandoc
            me.allBandocRecordsReview = [];
            me.localBandocStoreReview = null;
            me.checkStateBandocReview.clear();

            // NOTA: No limpiar txtBandocReview (como dijiste)
            // Ext.getCmp(prototype.id + '-txtBandocReview')?.setValue(''); // ← ESTO NO
        }
    },
    changeViewProcessorReview: function () {
        let getProcess = Ext.getCmp(prototype.id + '-cmbProcessorReview').getValue();
        console.log(getProcess, 'getProcess')
        this.cleanGridsReview();
        if (getProcess === "VN" || getProcess === "BM" || getProcess === "AB") {
            Ext.getCmp(prototype.id + '-panelDescuentoReview').setVisible(false);
            Ext.getCmp(prototype.id + '-panelTicketsReview').setVisible(true);
        } else {
            Ext.getCmp(prototype.id + '-panelDescuentoReview').setVisible(true);
            Ext.getCmp(prototype.id + '-panelTicketsReview').setVisible(false);
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Levantar Dataentry Para Modificar Descuentos">
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.TemplateReconciliaCreditForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: []
            }
        }).show();
    },
    btnAddDiscount: function () {
        let me = this;

        let getProcess = Ext.getCmp(prototype.id + '-cmbProcessorReview').getValue();
        if (getProcess !== 'CM') {
            Ext.Msg.alert('.:PRAXIS:.', 'Only processor CM is allowed to create international commission.');
            return;
        }

        let grid = Ext.getCmp(prototype.id + '-gridBandocReview');
        if (!grid) {
            console.error('gridDataBandocReview NO encontrado');
            return;
        }

        let store = grid.getStore();
        let records = store.getRange();

        let checkedRecords = records.filter(r => r.get('checkActive') === true);

        if (checkedRecords.length === 0) {
            global.Msg({msg: 'No Bandoc selected, please select a Bandoc first.'});
            return;
        }

        if (checkedRecords.length > 1) {
            global.Msg({msg: 'Please select only one Bandoc.'});
            return;
        }

        let selectedRecord = checkedRecords[0];

        let beanTemp = {
            IN_CCUST: this.trimValue(selectedRecord.get('CCUST')),
            IN_BANDOC: this.trimValue(selectedRecord.get('BANDOC')),
            IN_DATECI: this.trimValue(selectedRecord.get('DATECI')),
            IN_TRANCI: this.trimValue(selectedRecord.get('TRANCI'))
        };

        console.log('BEAN ADD DISCOUNT:', beanTemp);

        let box = Ext.getCmp(prototype.id + '-centerC');
        box.mask('Loading...');

        Ext.Ajax.request({
            url: prototype.url + '/addDiscountInternacional',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: Ext.encode(beanTemp)
            },
            success: function (response) {
                box.unmask();

                let res = Ext.JSON.decode(response.responseText);
                console.log(res);

                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    me.fetchBandocReview();
                } else {
                    global.Msg({msg: res.Mensaje || 'Error while adding discount.'});
                }
            },
            failure: function (err) {
                console.error("Error en la petición AJAX:", err);
                global.Msg({msg: 'Connection error.'});
                box.unmask();
            }
        });
    },
    // </editor-fold>

//    FUNCIONES PARA CONCILIAR

    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Bandoc WMH">
    searchBandocWMH: function (e, eOpts) {
        if (eOpts.getKey() !== 13)
            return false;
        this.fetchBandocWMH();
    },
    fetchBandocWMH: function () {
        let me = this;
        me.cleanGridsWMH();
        me.beanBandoc = {};
        me.checkStateWMHBandoc.clear();

        let getBandoc = Ext.getCmp(prototype.id + '-txtBandoc').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getDateFrom = Ext.Date.format(Ext.getCmp(prototype.id + '-txtFromBandoc').getValue(), 'Ymd');
        let getProcess = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();

        me.beanBandoc.IN_CCUST = getCustomer;
        me.beanBandoc.IN_BANDOC = getBandoc;
        me.beanBandoc.IN_DATEFROM = getDateFrom;
        me.beanBandoc.IN_CODPRO = getProcess;

        let searchParamsBandoc = {
            beanString: JSON.stringify(me.beanBandoc)
        };

        me.getBandocWMH(searchParamsBandoc);
    },
    getBandocWMH: function (params) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridBandoc');

        let currentStore = grid.getStore();
        if (currentStore) {
            currentStore.removeAll();
            grid.getView().refresh();
        }

        me.allBandocRecords = [];
        me.localBandocStore = null;

        grid.setLoading(true, 'Consultando extractos bancarios...');

        var store = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/getPendingDeposits',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            listeners: {
                beforeload: function (obj) {
                    obj.getProxy().setExtraParams(params);
                },
                load: function (s, records, successful) {
                    grid.setLoading(false);

                    if (!successful) {
                        global.Msg({msg: 'Error al obtener extractos.'});
                        return;
                    }

                    let valueProccesor = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
                    const esVenta = ["VN", "BM", "AB"].includes(valueProccesor);

                    me.allBandocRecords = records.map(r => r.data);

                    me.allBandocRecords.forEach(r => {
                        if (valueProccesor !== "BM" && valueProccesor !== "AB") {
                            me.checkStateWMHBandoc.set(r.RN, true);
                        } else {
                            me.checkStateWMHBandoc.set(r.RN, false);
                        }
                    });

                    me.createLocalBandocStore();

                    if (esVenta) {
                        me.updateGridTotalSalesWMH();
                    } else {
                        me.updateGridTotalWMH();
                    }
                }
            }
        });

        store.load();
    },
    createLocalBandocStoreBKP: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridBandoc');

        if (!me.allBandocRecords?.length) {
            global.Msg({msg: 'No hay extractos para mostrar.'});
            return;
        }

        me.localBandocStore = Ext.create('Ext.data.Store', {
            fields: Object.keys(me.allBandocRecords[0]),
            data: me.allBandocRecords,
            pageSize: 20,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {type: 'json'}
            }
        });

        grid.setStore(me.localBandocStore);

        let pager = grid.getDockedItems('pagingtoolbar')[0];

        pager.un('change', me.syncTotalsToVisiblePageBandoc, me);
        pager.on('change', me.syncTotalsToVisiblePageBandoc, me);

        pager.bindStore(me.localBandocStore);
        me.localBandocStore.loadPage(1);
        grid.getView().refresh();
    },
    createLocalBandocStore: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridBandoc');

        if (!me.allBandocRecords?.length) {
            global.Msg({msg: 'No hay extractos para mostrar.'});
            return;
        }

        // Obtener el procesador seleccionado
        let getProcess = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        const esVenta = ["VN", "BM", "AB"].includes(getProcess);

        // Configurar pageSize según el tipo de procesador
        const pageSize = esVenta ? me.allBandocRecords.length : 20;

        me.localBandocStore = Ext.create('Ext.data.Store', {
            fields: Object.keys(me.allBandocRecords[0]),
            data: me.allBandocRecords,
            pageSize: pageSize,
            proxy: {
                type: 'memory',
                enablePaging: !esVenta, // Solo habilitar paginación si NO es venta
                reader: {type: 'json'}
            }
        });

        grid.setStore(me.localBandocStore);

        let pager = grid.getDockedItems('pagingtoolbar')[0];

        if (pager) {
            if (esVenta) {
                // Ocultar pager para ventas
                pager.hide();
                // Remover eventos del pager
                pager.un('change', me.syncTotalsToVisiblePageBandoc, me);
            } else {
                // Mostrar pager para otros casos
                pager.show();
                // Configurar eventos del pager
                pager.un('change', me.syncTotalsToVisiblePageBandoc, me);
                pager.on('change', me.syncTotalsToVisiblePageBandoc, me);
            }

            pager.bindStore(me.localBandocStore);
        }

        // Cargar datos según el tipo de procesador
        if (esVenta) {
            me.localBandocStore.load(); // Cargar todos los registros sin paginación
        } else {
            me.localBandocStore.loadPage(1); // Cargar primera página con paginación
        }

        grid.getView().refresh();
    },
    syncTotalsToVisiblePageBandoc: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridBandoc');
        let store = grid.getStore();

        if (!store || store.getCount() === 0)
            return;
        if (!me.allBandocRecords?.length)
            return;

        let lastGlobal = me.allBandocRecords[me.allBandocRecords.length - 1];
        let lastVisible = store.getAt(store.getCount() - 1);

        lastVisible.set('TOTAL_NETO', lastGlobal.TOTAL_NETO || 0);
        lastVisible.commit();

        grid.getView().refresh();
    },
    updateGridBandocWMHBKP: function (column, rowIndex, checked, record) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridBandoc');
        let store = grid.getStore();

        if (!store || store.getCount() === 0)
            return;
        if (!me.allBandocRecords || me.allBandocRecords.length === 0)
            return;

        let rnActual = record.get('RN');
        me.checkStateWMHBandoc.set(rnActual, checked);

        let netoTotal = 0;
        me.allBandocRecords.forEach(r => {
            console.log('RN:', r.RN, 'NETO:', r.NETO);
            if (me.checkStateWMHBandoc.get(r.RN) === true) {
                netoTotal += r.NETO || 0;
            }
        });

        let lastGlobal = me.allBandocRecords[me.allBandocRecords.length - 1];
        lastGlobal.TOTAL_NETO = netoTotal;

        let lastVisible = store.getAt(store.getCount() - 1);
        lastVisible.set('TOTAL_NETO', netoTotal);
        lastVisible.commit();

        grid.getView().refresh();

        let valueProccesor = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        const esVenta = ["VN", "BM", "AB"].includes(valueProccesor);

        if (esVenta) {
            me.updateGridTotalSalesWMH();
        } else {
            me.updateGridTotalWMH();
        }
    },
    updateGridBandocWMH: function (column, rowIndex, checked, record) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridBandoc');
        let store = grid.getStore();

        if (!store || store.getCount() === 0)
            return;
        if (!me.allBandocRecords || me.allBandocRecords.length === 0)
            return;

        let rnActual = record.get('RN');
        me.checkStateWMHBandoc.set(rnActual, checked);

        let netoTotal = 0;
        me.allBandocRecords.forEach(r => {
            console.log('RN:', r.RN, 'NETO:', r.NETO);
            if (me.checkStateWMHBandoc.get(r.RN) === true) {
                netoTotal += r.NETO || 0;
            }
        });

        let lastGlobal = me.allBandocRecords[me.allBandocRecords.length - 1];
        lastGlobal.TOTAL_NETO = netoTotal;

        let lastVisible = store.getAt(store.getCount() - 1);
        lastVisible.set('TOTAL_NETO', netoTotal);
        lastVisible.commit();

        let valueProccesor = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        const esVenta = ["VN", "BM", "AB"].includes(valueProccesor);

        // SOLUCIÓN: Aplicar refreshNode solo para ventas
        if (esVenta) {
            let view = grid.getView();
            // Refrescar solo el nodo específico para evitar problemas visuales
            if (view && view.refreshNode) {
                try {
                    view.refreshNode(rowIndex);
                } catch (e) {
                    // Fallback a refresh completo si hay error
                    view.refresh();
                }
            } else {
                view.refresh();
            }

            me.updateGridTotalSalesWMH();
        } else {
            // Para otros casos, usar refresh normal como estaba
            grid.getView().refresh();
            me.updateGridTotalWMH();
        }
    },
    markAllGridBandocWMH: function (checkbox, newValue) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridBandoc');
        let store = grid.getStore();

        if (!me.allBandocRecords || me.allBandocRecords.length === 0) {
            return;
        }

        me.allBandocRecords.forEach(r => {
            me.checkStateWMHBandoc.set(r.RN, newValue);
        });

        store.each(record => {
            let rn = record.get('RN');
            record.set('checkActive', newValue);
            record.commit();
        });

        let netoTotal = 0;
        me.allBandocRecords.forEach(r => {
            console.log('RN:', r.RN, 'NETO:', r.NETO);
            if (me.checkStateWMHBandoc.get(r.RN) === true) {
                netoTotal += r.NETO || 0;
            }
        });

        let lastGlobal = me.allBandocRecords[me.allBandocRecords.length - 1];
        lastGlobal.TOTAL_NETO = netoTotal;

        let lastVisible = store.getAt(store.getCount() - 1);
        lastVisible.set('TOTAL_NETO', netoTotal);
        lastVisible.commit();

        grid.getView().refresh();

        let valueProccesor = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        const esVenta = ["VN", "BM", "AB"].includes(valueProccesor);

        if (esVenta) {
            me.updateGridTotalSalesWMH();
        } else {
            me.updateGridTotalWMH();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Liquidaciones WMH">
    searchSettlementsWMH: function () {
        this.fetchSettlementsWMH();
    },
    fetchSettlementsWMH: function () {
        let me = this;
        me.beanSettlements = {};
        me.checkStateWMHSettlements.clear();

        let getProcess = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getDateFrom = Ext.Date.format(Ext.getCmp(prototype.id + '-txtFromSett').getValue(), 'Ymd');
        let getDateTo = Ext.Date.format(Ext.getCmp(prototype.id + '-txtToSett').getValue(), 'Ymd');
        let getMerchand = Ext.getCmp(prototype.id + '-txtMerchand').getValue();
        let getLiquidacio = Ext.getCmp(prototype.id + '-txtLiquidacio').getValue();

        me.beanSettlements.IN_CCUST = getCustomer;
        me.beanSettlements.IN_FECHA_FROM = getDateFrom;
        me.beanSettlements.IN_FECHA_TO = getDateTo;
        me.beanSettlements.IN_PROCESSOR = getProcess;
        me.beanSettlements.IN_MERCHAND = getMerchand;
        me.beanSettlements.IN_LIQUIDACIO = getLiquidacio;

        let searchParamsSettlements = {
            beanString: JSON.stringify(me.beanSettlements)
        };

        me.getSettlementsWMH(searchParamsSettlements);
    },
    getSettlementsWMH: function (params) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataSettlement');

        let currentStore = grid.getStore();
        if (currentStore) {
            currentStore.removeAll();
            grid.getView().refresh();
        }

        me.allSettlementRecords = [];
        me.localSettlementStore = null;

        grid.setLoading(true, 'Cargando liquidaciones...');
        var store = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/getPendingSettlements',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            pageSize: 20,
            listeners: {
                beforeload: function (obj) {
                    obj.getProxy().setExtraParams(params);
                },
                load: function (s, records, successful) {
                    grid.setLoading(false);
                    if (!successful) {
                        global.Msg({msg: 'Error al obtener liquidaciones.'});
                        return;
                    }
                    me.allSettlementRecords = records.map(r => r.data);
                    me.allSettlementRecords.forEach(r => {
                        me.checkStateWMHSettlements.set(r.RN, true);
                    });
                    me.createLocalSettlementStore();
                    me.updateGridTotalWMH();
                }
            }
        });

        store.load();
    },
    createLocalSettlementStore: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataSettlement');

        if (!me.allSettlementRecords?.length) {
            global.Msg({msg: 'No hay liquidaciones para mostrar.'});
            return;
        }

        me.localSettlementStore = Ext.create('Ext.data.Store', {
            fields: Object.keys(me.allSettlementRecords[0]),
            data: me.allSettlementRecords,
            pageSize: 20,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {type: 'json'}
            }
        });

        grid.setStore(me.localSettlementStore);

        let pager = grid.getDockedItems('pagingtoolbar')[0];

        // 👇 Conectar el sync con el nombre que querías, igual que en ventas
        pager.un('change', me.syncTotalsToVisiblePageSett, me);
        pager.on('change', me.syncTotalsToVisiblePageSett, me);

        me.localSettlementStore.loadPage(1);
        grid.getView().refresh();
    },
    syncTotalsToVisiblePageSett: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataSettlement');
        let store = grid.getStore();

        if (!store || store.getCount() === 0)
            return;
        if (!me.allSettlementRecords || me.allSettlementRecords.length === 0)
            return;

        let lastGlobal = me.allSettlementRecords[me.allSettlementRecords.length - 1];
        let lastVisible = store.getAt(store.getCount() - 1);

        lastVisible.set('TOTAL_LIQ', lastGlobal.TOTAL_LIQ || 0);
        lastVisible.set('TOTAL_COMISION', lastGlobal.TOTAL_COMISION || 0);
        lastVisible.set('TOTAL_COMISTOTA', lastGlobal.TOTAL_COMISTOTA || 0);
        lastVisible.set('TOTAL_NETO', lastGlobal.TOTAL_NETO || 0);
        lastVisible.set('TOTAL_IMPORTEPAG', lastGlobal.TOTAL_IMPORTEPAG || 0);
        lastVisible.commit();

        grid.getView().refresh();
    },
    updateTotalsOnCheckWMH: function (column, rowIndex, checked, record) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataSettlement');
        let store = grid.getStore();
        if (!store || !me.allSettlementRecords?.length)
            return;

        let rn = record.get('RN');
        me.checkStateWMHSettlements.set(rn, checked);

        let totalLiq = 0, totalCom = 0, totalCms = 0, totalNet = 0, totalPag = 0;

        me.allSettlementRecords.forEach(r => {
            if (me.checkStateWMHSettlements.get(r.RN) === true) {
                totalLiq += r.TOTAL || 0;
                totalCom += r.COMISION || 0;
                totalCms += r.COMISTOTA || 0;
                totalNet += r.NETO || 0;
                totalPag += r.IMPORTEPAG || 0;
            }
        });

        let lastGlobal = me.allSettlementRecords[me.allSettlementRecords.length - 1];
        lastGlobal.TOTAL_LIQ = totalLiq;
        lastGlobal.TOTAL_COMISION = totalCom;
        lastGlobal.TOTAL_COMISTOTA = totalCms;
        lastGlobal.TOTAL_NETO = totalNet;
        lastGlobal.TOTAL_IMPORTEPAG = totalPag;

        let lastVisible = store.getAt(store.getCount() - 1);
        lastVisible.set('TOTAL_LIQ', totalLiq);
        lastVisible.set('TOTAL_COMISION', totalCom);
        lastVisible.set('TOTAL_COMISTOTA', totalCms);
        lastVisible.set('TOTAL_NETO', totalNet);
        lastVisible.set('TOTAL_IMPORTEPAG', totalPag);
        lastVisible.commit();

        grid.getView().refresh();
        me.updateGridTotalWMH();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Descuentos con Help">
    searchDiscountsWMH: function () {
        let me = this;
        let helpActivado = Ext.getCmp(prototype.id + '-chkMarkhELP')?.getValue() || false;

        if (helpActivado) {
            let hayCheck = me.allSettlementRecords.some(r => me.checkStateWMHSettlements.get(r.RN) === true);

            if (!hayCheck) {
                global.Msg({msg: 'Seleccione las liquidaciones primero.'});
                return;
            }

            this.fetchDiscountsWMHHelp();
        } else {
            this.fetchDiscountsWMH();
        }
    },
    fetchDiscountsWMHHelp: function () {
        let me = this;
        me.beanDiscounts = {};
        me.checkStateWMHDiscount.clear();

        let getProcess = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getDateFrom = Ext.Date.format(Ext.getCmp(prototype.id + '-txtFromDisc').getValue(), 'Ymd');
        let getDateTo = Ext.Date.format(Ext.getCmp(prototype.id + '-txtToDisc').getValue(), 'Ymd');
        let getMerchand = Ext.getCmp(prototype.id + '-txtMerchandDiscount').getValue();
        let getLiquidacio = Ext.getCmp(prototype.id + '-txtLiquidacioDiscount').getValue();

        let merchands = [];
        let liquidaciones = [];

        if (me.allSettlementRecords && me.allSettlementRecords.length > 0) {
            me.allSettlementRecords.forEach(sett => {

                if (me.checkStateWMHSettlements.get(sett.RN) === true) {

                    let merch = (sett.MERCHAND || '').toString().trim();
                    let liq = (sett.LIQUIDACIO || '').toString().trim();

                    if (merch && !merchands.includes(merch)) {
                        merchands.push(merch);
                    }

                    if (liq && !liquidaciones.includes(liq)) {
                        liquidaciones.push(liq);
                    }
                }
            });
        }

        me.beanDiscounts.IN_CCUST = getCustomer;
        me.beanDiscounts.IN_CODPRO = getProcess;
        me.beanDiscounts.IN_DATEFROM = getDateFrom;
        me.beanDiscounts.IN_DATETO = getDateTo;
        me.beanDiscounts.IN_MERCHAND = getMerchand;
        me.beanDiscounts.IN_LIQUIDACIO = getLiquidacio;

        let searchParamsDiscounts = {
            beanString: JSON.stringify(me.beanDiscounts),
            beanMerchand: JSON.stringify(merchands),
            beanLiquidation: JSON.stringify(liquidaciones)
        };

        console.log(searchParamsDiscounts, 'searchParamsDiscounts');
        me.getDiscountsWMHHelp(searchParamsDiscounts);
    },
    getDiscountsWMHHelp: function (params) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataDescuentos');

        let currentStore = grid.getStore();
        if (currentStore) {
            currentStore.removeAll();
            grid.getView().refresh();
        }

        me.allDiscountRecords = [];
        me.localDiscountStore = null;

        grid.setLoading(true, 'Consultando descuentos...');

        var store = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/getPendingDiscounts',
                reader: {type: 'json', rootProperty: 'data', totalProperty: 'total'}
            },
            pageSize: 20,
            listeners: {
                beforeload: function (obj) {
                    obj.getProxy().setExtraParams(params);
                },
                load: function (s, records, successful) {
                    grid.setLoading(false);

                    if (!successful) {
                        global.Msg({msg: 'Error al obtener descuentos.'});
                        return;
                    }

                    me.allDiscountRecords = records.map(r => r.data);

                    me.allDiscountRecords.forEach(r => {
                        if (r.checkActive === true) {
                            me.checkStateWMHDiscount.set(r.RN, true);
                        } else {
                            me.checkStateWMHDiscount.set(r.RN, false);
                        }
                    });

                    me.createLocalDiscountStoreHelp();
                    me.updateGridTotalWMH();
                }
            }
        });

        store.load();
    },
    createLocalDiscountStoreHelp: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataDescuentos');

        if (!me.allDiscountRecords?.length) {
            global.Msg({msg: 'No hay descuentos para mostrar.'});
            return;
        }

        me.localDiscountStore = Ext.create('Ext.data.Store', {
            fields: Object.keys(me.allDiscountRecords[0]),
            data: me.allDiscountRecords,
            pageSize: 20,
            proxy: {type: 'memory', enablePaging: true, reader: {type: 'json'}}
        });

        grid.setStore(me.localDiscountStore);

        let pager = grid.getDockedItems('pagingtoolbar')[0];
        pager.un('change', me.syncTotalsToVisiblePageDiscountHelp, me);
        pager.on('change', me.syncTotalsToVisiblePageDiscountHelp, me);
        pager.bindStore(me.localDiscountStore);

        me.localDiscountStore.loadPage(1);
        grid.getView().refresh();
    },
    syncTotalsToVisiblePageDiscountHelp: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataDescuentos');
        let store = grid.getStore();

        if (!store || store.getCount() === 0)
            return;
        if (!me.allDiscountRecords?.length)
            return;

        let lastGlobal = me.allDiscountRecords[me.allDiscountRecords.length - 1];
        let lastVisible = store.getAt(store.getCount() - 1);

        lastVisible.set('TOTAL_IMPORTE', lastGlobal.TOTAL_IMPORTE || 0);
        lastVisible.set('TOTAL_IMPORTEPAG', lastGlobal.TOTAL_IMPORTEPAG || 0);
        lastVisible.commit();

        grid.getView().refresh();
    },
    updateGridDiscountWMH: function (column, rowIndex, checked, record) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataDescuentos');
        let store = grid.getStore();

        if (!store || store.getCount() === 0)
            return;
        if (!me.allDiscountRecords?.length)
            return;

        if (record.data.blockChange) {
            record.set('checkActive', true);
            record.commit();
            return;
        }

        let rnActual = record.get('RN');
        me.checkStateWMHDiscount.set(rnActual, checked);

        let totalImport = 0;
        let totalImportPag = 0;

        me.allDiscountRecords.forEach(r => {
            if (me.checkStateWMHDiscount.get(r.RN) === true) {
                totalImport += r.IMPORTECeba || 0;
                totalImportPag += r.IMPORTEPAG || 0;
            }
        });

        let lastGlobal = me.allDiscountRecords[me.allDiscountRecords.length - 1];
        lastGlobal.TOTAL_IMPORTE = totalImport;
        lastGlobal.TOTAL_IMPORTEPAG = totalImportPag;

        let lastVisible = store.getAt(store.getCount() - 1);
        lastVisible.set('TOTAL_IMPORTE', totalImport);
        lastVisible.set('TOTAL_IMPORTEPAG', totalImportPag);
        lastVisible.commit();

        grid.getView().refresh();

        me.updateGridTotalWMH();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Descuentos sin Help">
    fetchDiscountsWMH: function () {
        let me = this;
        me.beanDiscounts = {};
        me.checkStateWMHDiscount.clear();

        let getProcess = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getDateFrom = Ext.Date.format(Ext.getCmp(prototype.id + '-txtFromDisc').getValue(), 'Ymd');
        let getDateTo = Ext.Date.format(Ext.getCmp(prototype.id + '-txtToDisc').getValue(), 'Ymd');
        let getMerchand = Ext.getCmp(prototype.id + '-txtMerchandDiscount').getValue();
        let getLiquidacio = Ext.getCmp(prototype.id + '-txtLiquidacioDiscount').getValue();

        me.beanDiscounts.IN_CCUST = getCustomer;
        me.beanDiscounts.IN_PROCESSOR = getProcess;
        me.beanDiscounts.IN_DATEFROM = getDateFrom;
        me.beanDiscounts.IN_DATETO = getDateTo;
        me.beanDiscounts.IN_MERCHAND = getMerchand;
        me.beanDiscounts.IN_LIQUIDACIO = getLiquidacio;

        let searchParamsDiscounts = {
            beanString: JSON.stringify(me.beanDiscounts)
        };

        console.log(searchParamsDiscounts, 'searchParamsDiscounts');
        me.getDiscountsWMH(searchParamsDiscounts);
    },
    getDiscountsWMH: function (params) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataDescuentos');

        let currentStore = grid.getStore();
        if (currentStore) {
            currentStore.removeAll();
            grid.getView().refresh();
        }

        me.allDiscountRecords = [];
        me.localDiscountStore = null;

        grid.setLoading(true, 'Consultando descuentos...');

        var store = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/getPendingDiscountsHelp',
                reader: {type: 'json', rootProperty: 'data', totalProperty: 'total'}
            },
            pageSize: 20,
            listeners: {
                beforeload: function (obj) {
                    obj.getProxy().setExtraParams(params);
                },
                load: function (s, records, successful) {
                    grid.setLoading(false);

                    if (!successful) {
                        global.Msg({msg: 'Error al obtener descuentos.'});
                        return;
                    }

                    me.allDiscountRecords = records.map(r => r.data);

                    me.allDiscountRecords.forEach(r => {
                        if (r.checkActive === true) {
                            me.checkStateWMHDiscount.set(r.RN, true);
                        } else {
                            me.checkStateWMHDiscount.set(r.RN, false);
                        }
                    });

                    me.createLocalDiscountStoreWMH();
                    me.updateGridTotalWMH();
                }
            }
        });

        store.load();
    },
    createLocalDiscountStoreWMH: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataDescuentos');

        if (!me.allDiscountRecords?.length) {
            global.Msg({msg: 'No hay descuentos para mostrar.'});
            return;
        }

        me.localDiscountStore = Ext.create('Ext.data.Store', {
            fields: Object.keys(me.allDiscountRecords[0]),
            data: me.allDiscountRecords,
            pageSize: 20,
            proxy: {type: 'memory', enablePaging: true, reader: {type: 'json'}}
        });

        grid.setStore(me.localDiscountStore);

        let pager = grid.getDockedItems('pagingtoolbar')[0];
        pager.un('change', me.syncTotalsToVisiblePageDiscountWMH, me);
        pager.on('change', me.syncTotalsToVisiblePageDiscountWMH, me);
        pager.bindStore(me.localDiscountStore);

        me.localDiscountStore.loadPage(1);
        grid.getView().refresh();
    },
    syncTotalsToVisiblePageDiscountWMH: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataDescuentos');
        let store = grid.getStore();

        if (!store || store.getCount() === 0)
            return;
        if (!me.allDiscountRecords?.length)
            return;

        let lastGlobal = me.allDiscountRecords[me.allDiscountRecords.length - 1];
        let lastVisible = store.getAt(store.getCount() - 1);

        lastVisible.set('TOTAL_IMPORTE', lastGlobal.TOTAL_IMPORTE || 0);
        lastVisible.set('TOTAL_IMPORTEPAG', lastGlobal.TOTAL_IMPORTEPAG || 0);
        lastVisible.commit();

        grid.getView().refresh();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Header WMH">
    searchHeaderWMH: function () {
        this.fetchHeaderWMH();
    },
    fetchHeaderWMH: function () {
        let me = this;
        me.beanHeader = {};
        me.checkStateWMHHeader.clear();

        let getProcess = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getDateFrom = Ext.Date.format(Ext.getCmp(prototype.id + '-txtFromHeader').getValue(), 'Ymd');
        let getDateTo = Ext.Date.format(Ext.getCmp(prototype.id + '-txtToHeader').getValue(), 'Ymd');

        me.beanHeader.IN_CCUST = getCustomer;
        me.beanHeader.IN_DATEFROM = getDateFrom;
        me.beanHeader.IN_DATETO = getDateTo;
        me.beanHeader.IN_PROCESSOR = getProcess;

        let searchParamsHeader = {
            beanString: JSON.stringify(me.beanHeader)
        };

        me.getHeaderWMH(searchParamsHeader);
    },
    getHeaderWMH: function (params) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridCabecera');

        let currentStore = grid.getStore();
        if (currentStore) {
            currentStore.removeAll();
            grid.getView().refresh();
        }

        me.allSettlementRecords = [];
        me.localHeaderStore = null;

        grid.setLoading(true, 'Cargando Header...');
        var store = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/getPendingHeader',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            listeners: {
                beforeload: function (obj) {
                    obj.getProxy().setExtraParams(params);
                },
                load: function (s, records, successful) {
                    grid.setLoading(false);
                    if (!successful) {
                        global.Msg({msg: 'Error al obtener Header.'});
                        return;
                    }
                    me.allHeaderRecords = records.map(r => r.data);
                    me.allHeaderRecords.forEach(r => {
                        me.checkStateWMHHeader.set(r.RN, false);
                    });
                    me.createLocalHeaderStore();
                }
            }
        });

        store.load();
    },
    createLocalHeaderStore: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridCabecera');

        if (!me.allHeaderRecords?.length) {
            global.Msg({msg: 'No hay header para mostrar.'});
            return;
        }

        me.localHeaderStore = Ext.create('Ext.data.Store', {
            fields: Object.keys(me.allHeaderRecords[0]),
            data: me.allHeaderRecords,
            pageSize: 2,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {type: 'json'}
            }
        });

        grid.setStore(me.localHeaderStore);

        let pager = grid.getDockedItems('pagingtoolbar')[0];

        pager.un('change', me.syncTotalsToVisiblePageHeader, me);
        pager.on('change', me.syncTotalsToVisiblePageHeader, me);

        me.localHeaderStore.loadPage(1);
        grid.getView().refresh();
    },
    syncTotalsToVisiblePageHeader: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridCabecera');
        let store = grid.getStore();

        if (!store || store.getCount() === 0)
            return;
        if (!me.allHeaderRecords || me.allHeaderRecords.length === 0)
            return;

        let lastGlobal = me.allHeaderRecords[me.allHeaderRecords.length - 1];
        let lastVisible = store.getAt(store.getCount() - 1);

        lastVisible.set('TOTAL_LIQ', lastGlobal.TOTAL_LIQ || 0);
        lastVisible.set('TOTAL_COMISION', lastGlobal.TOTAL_COMISION || 0);
        lastVisible.set('TOTAL_COMISTOTA', lastGlobal.TOTAL_COMISTOTA || 0);
        lastVisible.set('TOTAL_NETO', lastGlobal.TOTAL_NETO || 0);
        lastVisible.set('TOTAL_IMPORTEPAG', lastGlobal.TOTAL_IMPORTEPAG || 0);
        lastVisible.commit();

        grid.getView().refresh();
    },
    updateTotalsHeaderWMH: function (column, rowIndex, checked, record) {

        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridCabecera');
        let store = grid.getStore();
        if (!store || !me.allHeaderRecords?.length)
            return;

        let rn = record.get('RN');
        me.checkStateWMHHeader.set(rn, checked);

        let totalTotal = 0, totalCom = 0, totalNeto = 0, totalImportePag = 0;

        me.allHeaderRecords.forEach(r => {
            if (me.checkStateWMHHeader.get(r.RN) === true) {
                totalTotal += r.TOTAL || 0;
                totalCom += r.COMISION || 0;
                totalNeto += r.NETO || 0;
                totalImportePag += r.IMPORTEPAG || 0;
            }
        });

        let lastGlobal = me.allHeaderRecords[me.allHeaderRecords.length - 1];
        lastGlobal.SUM_TOTAL = totalTotal;
        lastGlobal.SUM_COMISION = totalCom;
        lastGlobal.SUM_NETO = totalNeto;
        lastGlobal.SUM_IMPORTEPAG = totalImportePag;

        let lastVisible = store.getAt(store.getCount() - 1);
        lastVisible.set('SUM_TOTAL', totalTotal);
        lastVisible.set('SUM_COMISION', totalCom);
        lastVisible.set('SUM_NETO', totalNeto);
        lastVisible.set('SUM_IMPORTEPAG', totalImportePag);
        lastVisible.commit();

        grid.getView().refresh();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Ventas WMH">
    searchSalesWMH: function () {
        this.fetchSaleWMH();
    },
    fetchSaleWMH: function () {
        let me = this;
        me.beanSale = {};
        me.checkStateWMHSale.clear();

        let getProcess = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getDateFrom = Ext.Date.format(Ext.getCmp(prototype.id + '-txtFromSale').getValue(), 'Ymd');
        let getDateTo = Ext.Date.format(Ext.getCmp(prototype.id + '-txtToSale').getValue(), 'Ymd');

        me.beanSale.IN_CCUST = getCustomer;
        me.beanSale.IN_DATEFROM = getDateFrom;
        me.beanSale.IN_DATETO = getDateTo;
        me.beanSale.IN_PROCESSOR = getProcess;

        let searchParamsSale = {
            beanString: JSON.stringify(me.beanSale)
        };

        me.getSaleWMH(searchParamsSale);
    },
    getSaleWMH: function (params) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataVentas');

        let currentStore = grid.getStore();
        if (currentStore) {
            currentStore.removeAll();
            grid.getView().refresh();
        }

        me.allSaleRecords = [];
        me.localSaleStore = null;

        grid.setLoading(true, 'Cargando Ventas...');
        var store = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/getPendingSales',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            pageSize: 20,
            listeners: {
                beforeload: function (obj) {
                    obj.getProxy().setExtraParams(params);
                },
                load: function (s, records, successful) {
                    grid.setLoading(false);
                    if (!successful) {
                        global.Msg({msg: 'Error al obtener liquidaciones.'});
                        return;
                    }
                    me.allSaleRecords = records.map(r => r.data);
                    me.createLocalSaleStore();
                    me.updateGridTotalSalesWMH();
                }
            }
        });

        store.load();
    },
    createLocalSaleStoreBKP: function () {
        let me = this;

        me.localSaleStore = Ext.create('Ext.data.Store', {
            fields: Object.keys(me.allSaleRecords[0]),
            data: me.allSaleRecords,
            pageSize: 20,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {type: 'json'}
            }
        });

        let grid = Ext.getCmp(prototype.id + '-gridDataVentas');
        grid.setStore(me.localSaleStore);

        let pager = grid.getDockedItems('pagingtoolbar')[0];

        pager.un('change', me.syncTotalsToVisiblePage, me);
        pager.on('change', me.syncTotalsToVisiblePage, me);

        me.localSaleStore.loadPage(1);
        grid.getView().refresh();
    },
    createLocalSaleStore: function () {
        let me = this;

        // Obtener el procesador seleccionado
        let getProcess = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        const esVenta = ["VN", "BM", "AB"].includes(getProcess);

        // Configurar pageSize según el tipo de procesador
        const pageSize = esVenta ? me.allSaleRecords.length : 20;

        me.localSaleStore = Ext.create('Ext.data.Store', {
            fields: Object.keys(me.allSaleRecords[0]),
            data: me.allSaleRecords,
            pageSize: pageSize,
            proxy: {
                type: 'memory',
                enablePaging: !esVenta, // Solo habilitar paginación si NO es venta
                reader: {type: 'json'}
            }
        });

        let grid = Ext.getCmp(prototype.id + '-gridDataVentas');
        grid.setStore(me.localSaleStore);

        let pager = grid.getDockedItems('pagingtoolbar')[0];

        if (pager) {
            if (esVenta) {
                // Ocultar pager para ventas
                pager.hide();
                // Remover eventos del pager
                pager.un('change', me.syncTotalsToVisiblePage, me);
            } else {
                // Mostrar pager para otros casos
                pager.show();
                // Configurar eventos del pager
                pager.un('change', me.syncTotalsToVisiblePage, me);
                pager.on('change', me.syncTotalsToVisiblePage, me);
            }

            pager.bindStore(me.localSaleStore);
        }

        // Cargar datos según el tipo de procesador
        if (esVenta) {
            me.localSaleStore.load(); // Cargar todos los registros sin paginación
        } else {
            me.localSaleStore.loadPage(1); // Cargar primera página con paginación
        }

        grid.getView().refresh();
    },
    syncTotalsToVisiblePage: function () {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataVentas');
        let store = grid.getStore();

        if (!store || store.getCount() === 0)
            return;
        if (!me.allSaleRecords || me.allSaleRecords.length === 0)
            return;

        store.each(record => {
            let rn = record.get('RN');
            let estado = me.checkStateWMHSale.get(rn) === true;
            record.set('checkActive', estado);
            record.commit();
        });

        let lastGlobal = me.allSaleRecords[me.allSaleRecords.length - 1];
        let lastVisible = store.getAt(store.getCount() - 1);

        lastVisible.set('TOTAL_SVFOP', lastGlobal.TOTAL_SVFOP || 0);
        lastVisible.set('TOTAL_SVFOP_CONVERTED', lastGlobal.TOTAL_SVFOP_CONVERTED || 0);
        lastVisible.commit();
        grid.getView().refresh();
    },
    updateGridSaleWMHBKP: function (column, rowIndex, checked, record) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataVentas');
        let store = grid.getStore();

        if (!store || store.getCount() === 0)
            return;
        if (!me.allSaleRecords || me.allSaleRecords.length === 0)
            return;

        let rnActual = record.get('RN');
        me.checkStateWMHSale.set(rnActual, checked);

        let totalLocal = 0;
        let totalConverted = 0;

        me.allSaleRecords.forEach(r => {
            let rn = r.RN;
            if (me.checkStateWMHSale.get(rn) === true) {
                totalLocal += r.SVFOP || 0;
                totalConverted += r.SVFOPCON || 0;
            }
        });

        let lastGlobal = me.allSaleRecords[me.allSaleRecords.length - 1];
        lastGlobal.TOTAL_SVFOP = totalLocal;
        lastGlobal.TOTAL_SVFOP_CONVERTED = totalConverted;

        let lastVisible = store.getAt(store.getCount() - 1);
        lastVisible.set('TOTAL_SVFOP', totalLocal);
        lastVisible.set('TOTAL_SVFOP_CONVERTED', totalConverted);
        lastVisible.commit();

        grid.getView().refresh();
        me.updateGridTotalSalesWMH();
    },
    updateGridSaleWMH: function (column, rowIndex, checked, record) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataVentas');
        let store = grid.getStore();

        if (!store || store.getCount() === 0)
            return;
        if (!me.allSaleRecords || me.allSaleRecords.length === 0)
            return;

        let rnActual = record.get('RN');
        me.checkStateWMHSale.set(rnActual, checked);

        let totalLocal = 0;
        let totalConverted = 0;

        me.allSaleRecords.forEach(r => {
            let rn = r.RN;
            if (me.checkStateWMHSale.get(rn) === true) {
                totalLocal += r.SVFOP || 0;
                totalConverted += r.SVFOPCON || 0;
            }
        });

        let lastGlobal = me.allSaleRecords[me.allSaleRecords.length - 1];
        lastGlobal.TOTAL_SVFOP = totalLocal;
        lastGlobal.TOTAL_SVFOP_CONVERTED = totalConverted;

        let lastVisible = store.getAt(store.getCount() - 1);
        lastVisible.set('TOTAL_SVFOP', totalLocal);
        lastVisible.set('TOTAL_SVFOP_CONVERTED', totalConverted);
        lastVisible.commit();

        // Obtener el tipo de procesador
        let getProcess = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        const esVenta = ["VN", "BM", "AB"].includes(getProcess);

        // Aplicar refreshNode solo para ventas
        if (esVenta) {
            let view = grid.getView();
            // Refrescar solo el nodo específico para evitar problemas visuales
            if (view && view.refreshNode) {
                try {
                    view.refreshNode(rowIndex);
                } catch (e) {
                    // Fallback a refresh completo si hay error
                    console.warn('Error en refreshNode, usando refresh completo:', e);
                    view.refresh();
                }
            } else {
                view.refresh();
            }
        } else {
            // Para otros casos, usar refresh normal
            grid.getView().refresh();
        }

        me.updateGridTotalSalesWMH();
    },
    markAllGridSale: function (checkbox, newValue) {
        let me = this;
        let grid = Ext.getCmp(prototype.id + '-gridDataVentas');
        let store = grid.getStore();

        if (!me.allSaleRecords || me.allSaleRecords.length === 0) {
            return;
        }

        // 1) Asignar check a TODO el dataset global
        me.allSaleRecords.forEach(r => {
            me.checkStateWMHSale.set(r.RN, newValue);
        });

        // 2) Pintar el estado en TODOS los records del store local (los que estén en la página actual)
        store.each(record => {
            let rn = record.get('RN');
            record.set('checkActive', newValue);
            record.commit();
        });

        // 3) Recalcular totales con la misma lógica que updateGridSaleWMH
        let totalLocal = 0;
        let totalConverted = 0;

        me.allSaleRecords.forEach(r => {
            if (me.checkStateWMHSale.get(r.RN) === true) {
                totalLocal += r.SVFOP || 0;
                totalConverted += r.SVFOPCON || 0;
            }
        });

        // 4) Guardar en el último global
        let lastGlobal = me.allSaleRecords[me.allSaleRecords.length - 1];
        lastGlobal.TOTAL_SVFOP = totalLocal;
        lastGlobal.TOTAL_SVFOP_CONVERTED = totalConverted;

        // 5) Pintar footer visual en la última fila visible de la página actual
        let tam = store.getCount();
        let lastVisible = store.getAt(tam - 1);

        if (lastVisible) {
            lastVisible.set('TOTAL_SVFOP', totalLocal);
            lastVisible.set('TOTAL_SVFOP_CONVERTED', totalConverted);
            lastVisible.commit();
        }

        // 6) Refresh UI
        grid.getView().refresh();

        // 7) Actualizar panel de totales
        me.updateGridTotalSalesWMH();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Resultados WMH">
    updateGridTotalWMH: function () {
        let me = this;
        this.esIgualWMH = 0;

        let totalDeposito = 0;
        let totalTotal = 0;
        let totalComision = 0;
        let totalDescuento = 0;

        // Contadores para saber si hay datos reales
        let tieneDepositos = false;
        let tieneLiquidaciones = false;
        let tieneDescuentos = false;

        if (me.allBandocRecords && me.allBandocRecords.length > 0) {
            me.allBandocRecords.forEach(r => {
                if (me.checkStateWMHBandoc.get(r.RN) === true) {
                    totalDeposito += Number(r.NETO) || 0;
                    tieneDepositos = true;
                }
            });
        }

        if (me.allSettlementRecords.length > 0) {
            me.allSettlementRecords.forEach(r => {
                if (me.checkStateWMHSettlements.get(r.RN) === true) {
                    totalTotal += r.TOTAL || 0;
                    totalComision += r.COMISION || 0;
                    tieneLiquidaciones = true;
                }
            });
        }

        if (me.allDiscountRecords && me.allDiscountRecords.length > 0) {
            me.allDiscountRecords.forEach(r => {
                if (me.checkStateWMHDiscount.get(r.RN) === true) {
                    totalDescuento += Number(r.IMPORTECeba) || 0;
                    tieneDescuentos = true;
                }
            });
        }

        const hayDatosReales = tieneDepositos || tieneLiquidaciones || tieneDescuentos;

        let calculo = 0;
        let porcentaje = 0;
        let totalImplicado = 0;
        let formattedPercent = '0.00%';

        if (hayDatosReales) {
            calculo = Math.abs(
                    totalDeposito
                    - (Math.abs(totalTotal) - Math.abs(totalComision) - Math.abs(totalDescuento))

                    );

            totalImplicado = Math.abs(totalDeposito)
                    + Math.abs(totalTotal)
                    + Math.abs(totalComision)
                    + Math.abs(totalDescuento);

            if (totalImplicado > 0) {
                porcentaje = ((totalImplicado - calculo) / totalImplicado) * 100;
                porcentaje = Math.max(0, Math.min(100, porcentaje));
            }

            if (calculo === 0) {
                porcentaje = 100;
            }

            formattedPercent = porcentaje.toFixed(2) + '%';
        }

        let cmpDeposito = Ext.getCmp(prototype.id + '-txtTotalDeposito');
        let cmpTotal = Ext.getCmp(prototype.id + '-txtTotal');
        let cmpComision = Ext.getCmp(prototype.id + '-txtTotalComision');
        let cmpDescuento = Ext.getCmp(prototype.id + '-txtTotalDescuentos');
        let cmpCalculo = Ext.getCmp(prototype.id + '-txtTotalCalculo');
        let cmpPercent = Ext.getCmp(prototype.id + '-txtPercentVenta');

        cmpDeposito?.setValue(Ext.util.Format.number(totalDeposito, '0,000.00'));
        cmpTotal?.setValue(Ext.util.Format.number(totalTotal, '0,000.00'));
        cmpComision?.setValue(Ext.util.Format.number(totalComision, '0,000.00'));
        cmpDescuento?.setValue(Ext.util.Format.number(totalDescuento, '0,000.00'));
        cmpCalculo?.setValue(Ext.util.Format.number(calculo, '0,000.00'));
        cmpPercent?.setValue(formattedPercent);

        if (!hayDatosReales) {
            Ext.defer(() => {
                let el = cmpCalculo?.getEl();
                if (el) {
                    el.setStyle({
                        'background-color': 'transparent',
                        'color': '#000000',
                        'font-weight': 'normal'
                    });
                }
            }, 10);

            Ext.defer(() => {
                let elPercent = cmpPercent?.getEl();
                if (elPercent) {
                    elPercent.setStyle({
                        'background-color': 'transparent',
                        'color': '#000000',
                        'font-weight': 'normal'
                    });
                }
            }, 10);

            this.esIgualWMH = false;
            return;
        }

        this.esIgualWMH = calculo === 0;
        let colorFondo = this.esIgualWMH ? '#4CAF50' : '#F44336';
        let colorTexto = 'white';

        Ext.defer(() => {
            let el = cmpCalculo?.getEl();
            if (el) {
                el.setStyle({
                    'background-color': colorFondo,
                    'color': colorTexto,
                    'font-weight': 'bold'
                });
            }
        }, 10);

        Ext.defer(() => {
            let elPercent = cmpPercent?.getEl();
            if (elPercent) {
                let percentColor = (porcentaje === 100) ? '#4CAF50' : '#F44336';
                elPercent.setStyle({
                    'background-color': percentColor,
                    'color': 'white',
                    'font-weight': 'bold'
                });
            }
        }, 10);
    },
    updateGridTotalSalesWMHOLD: function () {
        let me = this;
        this.esIgualWMH = 0;

        let totalDeposito = 0;
        let totalVentas = 0;
        let totalVentasConvertido = 0;

        if (me.allBandocRecords && me.allBandocRecords.length > 0) {
            me.allBandocRecords.forEach(r => {
                if (me.checkStateWMHBandoc.get(r.RN) === true) {
                    totalDeposito += Number(r.NETO) || 0;
                }
            });
        }

        if (me.allSaleRecords && me.allSaleRecords.length > 0) {
            let lastGlobal = me.allSaleRecords[me.allSaleRecords.length - 1];
            totalVentas = Math.abs(Number(lastGlobal.TOTAL_SVFOP)) || 0;
            totalVentasConvertido = Math.abs(Number(lastGlobal.TOTAL_SVFOP_CONVERTED)) || 0;
        }

        let valueProccesor = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        let baseValue = (valueProccesor === 'AB') ? totalVentas : totalVentasConvertido;

        let calculo = baseValue - totalDeposito;
        let porcentaje = calculo > 0 ? (calculo / baseValue) * 100 : 0;

        let formattedDeposito = Ext.util.Format.number(totalDeposito, '0,000.00');
        let formattedVentas = Ext.util.Format.number(baseValue, '0,000.00');
        let formattedCalculo = Ext.util.Format.number(calculo, '0,000.00');
        let formattedPorcentaje = Ext.util.Format.number(porcentaje, '0.00') + '%';

        let cmpDeposito = Ext.getCmp(prototype.id + '-txtTotalDeposito');
        let cmpVentas = Ext.getCmp(prototype.id + '-txtVentas');
        let cmpCalculo = Ext.getCmp(prototype.id + '-txtTotalCalculo');
        let cmpPorcentaje = Ext.getCmp(prototype.id + '-txtPercentVenta');

        cmpDeposito?.setValue(formattedDeposito);
        cmpVentas?.setValue(formattedVentas);
        cmpCalculo?.setValue(formattedCalculo);
        cmpPorcentaje?.setValue(formattedPorcentaje);

        let esNegativo = calculo < 0;

        if (esNegativo) {
            cmpCalculo?.getEl()?.setStyle({background: "#F44336", color: "white"});
            cmpPorcentaje?.getEl()?.setStyle({background: "#F44336", color: "white"});
            return;
        }

        let elCalculo = cmpCalculo?.getEl();
        if (elCalculo) {
            elCalculo.setStyle({background: "transparent", color: "black"});
        }

        this.esPercentWMH = porcentaje >= 0 && porcentaje <= 10;

        let elPercent = cmpPorcentaje?.getEl();
        if (elPercent) {
            if (this.esPercentWMH) {
                elPercent.setStyle({background: "#4CAF50", color: "white", fontWeight: "bold"});
            } else {
                elPercent.setStyle({background: "#F44336", color: "white", fontWeight: "bold"});
            }
        }
    },
    updateGridTotalSalesWMH: function () {
        let me = this;
        this.esIgualWMH = 0;

        let totalDeposito = 0;
        let totalVentas = 0;
        let totalVentasConvertido = 0;

        let hayDatosSeleccionados = false;
        let hayDepositosSeleccionados = false;
        let hayVentasValidas = false;


        if (me.allBandocRecords && me.allBandocRecords.length > 0) {
            let contadorSeleccionados = 0;

            me.allBandocRecords.forEach(r => {
                let estaSeleccionado = me.checkStateWMHBandoc.get(r.RN) === true;

                if (estaSeleccionado) {
                    totalDeposito += Number(r.NETO) || 0;
                    hayDepositosSeleccionados = true;
                    hayDatosSeleccionados = true;
                    contadorSeleccionados++;
                }
            });

        } else {
            console.log('No hay allBandocRecords o está vacío');
        }

        if (me.allSaleRecords && me.allSaleRecords.length > 0) {
            let lastGlobal = me.allSaleRecords[me.allSaleRecords.length - 1];

            totalVentas = Math.abs(Number(lastGlobal.TOTAL_SVFOP)) || 0;
            totalVentasConvertido = Math.abs(Number(lastGlobal.TOTAL_SVFOP_CONVERTED)) || 0;

            hayVentasValidas = (totalVentas > 0 || totalVentasConvertido > 0);

            if (hayVentasValidas || hayDepositosSeleccionados) {
                hayDatosSeleccionados = true;
            }

        } else {
            console.log('No hay allSaleRecords o está vacío');
        }

        let valueProccesor = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();

        let baseValue = (valueProccesor === 'AB') ? totalVentas : totalVentasConvertido;

        let calculo = baseValue - totalDeposito;

        let porcentaje = 0;
        if (calculo > 0 && baseValue > 0) {
            porcentaje = (calculo / baseValue) * 100;
        }

        let formattedDeposito = Ext.util.Format.number(totalDeposito, '0,000.00');
        let formattedVentas = Ext.util.Format.number(baseValue, '0,000.00');
        let formattedCalculo = Ext.util.Format.number(calculo, '0,000.00');
        let formattedPorcentaje = Ext.util.Format.number(porcentaje, '0.00') + '%';

        let cmpDeposito = Ext.getCmp(prototype.id + '-txtTotalDeposito');
        let cmpVentas = Ext.getCmp(prototype.id + '-txtVentas');
        let cmpCalculo = Ext.getCmp(prototype.id + '-txtTotalCalculo');
        let cmpPorcentaje = Ext.getCmp(prototype.id + '-txtPercentVenta');

        cmpDeposito?.setValue(formattedDeposito);
        cmpVentas?.setValue(formattedVentas);
        cmpCalculo?.setValue(formattedCalculo);
        cmpPorcentaje?.setValue(formattedPorcentaje);

        let hayValoresParaComparar = (baseValue > 0 || totalDeposito > 0);

        if (!hayDatosSeleccionados || !hayValoresParaComparar) {

            let elCalculo = cmpCalculo?.getEl();
            let elPercent = cmpPorcentaje?.getEl();

            if (elCalculo) {
                console.log('Aplicando estilo transparente a cálculo');
                elCalculo.setStyle({
                    background: "transparent",
                    color: "black",
                    fontWeight: "normal"
                });
            }

            if (elPercent) {
                console.log('Aplicando estilo transparente a porcentaje');
                elPercent.setStyle({
                    background: "transparent",
                    color: "black",
                    fontWeight: "normal"
                });
            }

            this.esPercentWMH = false;
            return;
        }

        let esNegativo = calculo < 0;

        if (esNegativo) {

            let elCalculoNeg = cmpCalculo?.getEl();
            let elPercentNeg = cmpPorcentaje?.getEl();

            elCalculoNeg?.setStyle({
                background: "#F44336",
                color: "white",
                fontWeight: "bold"
            });
            elPercentNeg?.setStyle({
                background: "#F44336",
                color: "white",
                fontWeight: "bold"
            });

            this.esPercentWMH = false;
            return;
        }

        let elCalculo = cmpCalculo?.getEl();
        if (elCalculo) {
            elCalculo.setStyle({
                background: "transparent",
                color: "black",
                fontWeight: "normal"
            });
        }

        this.esPercentWMH = porcentaje >= 0 && porcentaje <= 10;

        let elPercent = cmpPorcentaje?.getEl();
        if (elPercent) {
            if (calculo === 0) {
                elPercent.setStyle({
                    background: "#4CAF50",
                    color: "white",
                    fontWeight: "bold"
                });
            } else if (this.esPercentWMH) {
                elPercent.setStyle({
                    background: "#4CAF50",
                    color: "white",
                    fontWeight: "bold"
                });
            } else {
                elPercent.setStyle({
                    background: "#F44336",
                    color: "white",
                    fontWeight: "bold"
                });
            }
        } else {
            console.log('ERROR: elPercent no encontrado');
        }

    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Limpiar Grillas y Resultados">
    cleanGridsWMH: function () {
        let me = this;

        // Siempre limpiar grids hijas (independiente de deleteStatement)
        const childGridsToClean = [
            '-gridBandoc',
            '-gridCabecera',
            '-gridDataSettlement',
            '-gridDataDescuentos',
            '-gridDataVentas'
        ];

        childGridsToClean.forEach(gridId => {
            const grid = Ext.getCmp(prototype.id + gridId);
            if (grid) {
                grid.getStore()?.removeAll();
                grid.getView()?.refresh();
            }
        });

        // Resetear arrays globales de grids hijas
        me.allBandocRecords = [];
        me.allSettlementRecords = [];
        me.allDiscountRecords = [];

        // Resetear stores locales de grids hijas
        me.localBandocStore = null;
        me.localSettlementStore = null;
        me.localDiscountStore = null;



        // Limpiar maps de selección de grids hijas
        me.checkStateWMHBandoc.clear();
        me.checkStateWMHSettlements.clear();
        me.checkStateWMHDiscount.clear();

        // Resetear campos de resultados
        const resultFields = [
            '-txtTotalDeposito',
            '-txtTotal',
            '-txtTotalComision',
            '-txtTotalDescuentos',
            '-txtVentas',
            '-txtTotalCalculo',
            '-txtPercentVenta',
            '-txtTotalDiff'
        ];

        resultFields.forEach(fieldId => {
            const field = Ext.getCmp(prototype.id + fieldId);
            if (field) {
                field.setValue('0.00');
                const el = field.getEl();
                if (el) {
                    el.setStyle({
                        'background-color': '',
                        'color': '',
                        'font-weight': ''
                    });
                }
            }
        });

        // Resetear variables de estado
        me.esIgualWMH = 0;
        me.esPercentWMH = 0;
    },
    changeViewProcessor: function () {
        let getProcess = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        this.cleanGridsWMH();
        if (getProcess === "VN" || getProcess === "BM" || getProcess === "AB") {
            Ext.getCmp(prototype.id + '-panelDescuento').setVisible(false);
            Ext.getCmp(prototype.id + '-gridDataVentas').setVisible(true);
            Ext.getCmp(prototype.id + '-gridCabecera').setVisible(false);
            Ext.getCmp(prototype.id + '-saleFilters').setVisible(true);
            Ext.getCmp(prototype.id + '-setlementFilters').setVisible(false);
            Ext.getCmp(prototype.id + '-discountFilters').setVisible(false);
            Ext.getCmp(prototype.id + '-headerFilters').setVisible(false);
            Ext.getCmp(prototype.id + '-chkMarkBandocWMH').setDisabled(false);
            Ext.getCmp(prototype.id + '-height').setHeight(650);
        } else {
            Ext.getCmp(prototype.id + '-panelDescuento').setVisible(true);
            Ext.getCmp(prototype.id + '-gridDataVentas').setVisible(false);
            Ext.getCmp(prototype.id + '-gridCabecera').setVisible(true);
            Ext.getCmp(prototype.id + '-saleFilters').setVisible(false);
            Ext.getCmp(prototype.id + '-setlementFilters').setVisible(true);
            Ext.getCmp(prototype.id + '-discountFilters').setVisible(true);
            Ext.getCmp(prototype.id + '-headerFilters').setVisible(true);
            Ext.getCmp(prototype.id + '-chkMarkBandocWMH').setDisabled(true);
            Ext.getCmp(prototype.id + '-chkMarkBandocWMH').setValue(false);
            Ext.getCmp(prototype.id + '-height').setHeight(1300);
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Ejecucion">
    verifyConciliationWMH: function () {
        let checkBox = Ext.getCmp(prototype.id + '-chkMarkForced');
        let getForce = checkBox ? checkBox.getValue() : false;

        let message, title;

        if (getForce) {
            title = '.:PRAXIS:. - CONCILIACIÓN FORZADA';
            message = '¿Está seguro que desea ejecutar la conciliación forzada?<br><br>' +
                    '<b> ADVERTENCIA:</b> Esta opción permite realizar match a pesar de la diferencia de monto.';
        } else {
            title = '.:PRAXIS:.';
            message = '¿Está seguro que desea ejecutar la conciliación?';
        }

        Ext.Msg.show({
            title: title,
            msg: message,
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: getForce ? Ext.MessageBox.WARNING : Ext.MessageBox.QUESTION,
            modal: true,
            width: getForce ? 400 : 300,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.executeConciliationWMH();
                }
            }
        });
    },
    executeConciliationWMH: function () {
        let me = this;
        me.beanConciliation = {};

        let recordBandoc = me.allBandocRecords;
        let recordSettlements = me.allSettlementRecords;
        let recordDiscounts = me.allDiscountRecords;
        let recordVentas = me.allSaleRecords;
        let recordHeader = me.allHeaderRecords;

        let getProcess = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let checkBox = Ext.getCmp(prototype.id + '-chkMarkForced').getValue();;
        console.log(checkBox,'checkBox')
        let getForce = checkBox ? "Y" : "";
        console.log(getForce, 'getForce')
        const esVenta = ["VN", "BM", "AB"].includes(getProcess);

        let hayCheckBandoc = me.allBandocRecords.some(r => me.checkStateWMHBandoc.get(r.RN) === true);
        let hayCheckSettlement = me.allSettlementRecords.some(r => me.checkStateWMHSettlements.get(r.RN) === true);
        let hayCheckDiscount = me.allDiscountRecords.some(r => me.checkStateWMHDiscount.get(r.RN) === true);
        let hayCheckVentas = me.allSaleRecords.some(r => me.checkStateWMHSale.get(r.RN) === true);
        let hayCheckHeader = me.allHeaderRecords.some(r => me.checkStateWMHHeader.get(r.RN) === true);

        if (!hayCheckBandoc) {
            global.Msg({msg: 'No ha seleccionado un bandoc.'});
            return;
        }

        if (!esVenta) {
            if (!hayCheckSettlement) {
                global.Msg({msg: 'No ha seleccionado liquidaciones.'});
                return;
            }
        }

        if (esVenta) {
            if (!hayCheckVentas) {
                global.Msg({msg: 'No ha seleccionado ventas.'});
                return;
            }
        }

        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 4);
        const uniqueCode = (timestamp + random).substr(-10);

        let cleanSettlements = recordSettlements.filter(r => me.checkStateWMHSettlements.get(r.RN) === true)
                .map(function (item) {
                    return {
                        CCUST: me.trimValue(item.CCUST),
                        SDATE: me.trimValue(item.SDATE),
                        SCOUNTRY: me.trimValue(item.SCOUNTRY),
                        TDOC: me.trimValue(item.TDOC),
                        CODEBANK: me.trimValue(item.CODEBANK),
                        SCARCOD: me.trimValue(item.SCARCOD),
                        SCARDN: me.trimValue(item.SCARDN),
                        SAUTHOC: me.trimValue(item.SAUTHOC),
                        SEQ: me.trimValue(item.SEQ),
                        SVFOP: item.SVFOP,
                        TFILE: "60",
                        CODUNI: uniqueCode
                    };
                });

        let cleanDiscounts = recordDiscounts.filter(r => me.checkStateWMHDiscount.get(r.RN) === true)
                .map(function (item) {
                    return {
                        CCUST: me.trimValue(item.CCUST),
                        PRDA: me.trimValue(item.PRDA),
                        CODPRO: me.trimValue(item.CODPRO),
                        CCUSTPRO: me.trimValue(item.CCUSTPRO),
                        FLIQUIDACI: me.trimValue(item.FLIQUIDACI),
                        LIQUIDACIO: me.trimValue(item.LIQUIDACIO),
                        MERCHAND: me.trimValue(item.MERCHAND),
                        MONEDA: me.trimValue(item.MONEDA),
                        CODIGO: me.trimValue(item.CODIGO),
                        CORRL: me.trimValue(item.CORRL),
                        TFILE: "91",
                        CODUNI: uniqueCode
                    };
                });

        let cleanBandoc = recordBandoc.filter(r => me.checkStateWMHBandoc.get(r.RN) === true)
                .map(function (item) {
                    return {
                        CCUST: me.trimValue(item.CCUST),
                        ADATE: me.trimValue(item.ADATE),
                        SOCIETY: me.trimValue(item.SOCIETY),
                        CODEBANK_EC: me.trimValue(item.CODEBANK_EC),
                        BANDOC: me.trimValue(item.BANDOC),
                        TFILE: "02",
                        CODUNI: uniqueCode
                    };
                });

        let cleanSale = recordVentas.filter(r => me.checkStateWMHSale.get(r.RN) === true)
                .map(function (item) {
                    return {
                        CCUST: item.CCUST,
                        CCIA: item.CCIA,
                        FORMA: item.FORMA,
                        SERIE: item.SERIE,
                        TDOC: item.TDOC,
                        SCARDNCOR: item.SCARDNCOR,
                        SAUTHOC: item.SAUTHOC,
                        SEQ: item.SEQ,
                        CORRL: item.CORRL,
                        SVFOP: item.SVFOP,
                        TOTAL: item.TOTAL
                    };
                });

        let cleanHeader = recordHeader.filter(r => me.checkStateWMHHeader.get(r.RN) === true)
                .map(function (item) {
                    return {
                        CCUST: me.trimValue(item.CCUST),
                        PRDA: me.trimValue(item.PRDA),
                        CODPRO: me.trimValue(item.CODPRO),
                        CCUSTPRO: me.trimValue(item.CCUSTPRO),
                        FLIQUIDACI: me.trimValue(item.FLIQUIDACI),
                        LIQUIDACIO: me.trimValue(item.LIQUIDACIO),
                        MERCHAND: me.trimValue(item.MERCHAND),
                        MONEDA: me.trimValue(item.MONEDA),
                        MONEDALIQ: me.trimValue(item.MONEDALIQ),
                        PAISLIQ: me.trimValue(item.PAISLIQ),
                        SDATE: me.trimValue(item.SDATE),
                        TFILE: "83",
                        CODUNI: uniqueCode
                    };
                });

        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const formattedDate = `${year}${month}${day}`;

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const formattedTime = `${hours}${minutes}${seconds}`;

        me.beanConciliation.IN_CCUST = getCustomer;
        me.beanConciliation.IN_CODPRO = getProcess;
        me.beanConciliation.IN_FECR = `${formattedDate}`;
        me.beanConciliation.IN_HOCR = formattedTime;
        me.beanConciliation.IN_CODUNI = uniqueCode;
        me.beanConciliation.IN_FORCE = getForce;

        console.log(cleanDiscounts);
        console.log(cleanBandoc);
        console.log(cleanSettlements);
        console.log(cleanSale);
        console.log(cleanHeader);
        console.log(me.beanConciliation);

        let searchParamsConciliation = {
            beanString: JSON.stringify(me.beanConciliation),
            beanDiscounts: JSON.stringify(cleanDiscounts),
            beanBandoc: JSON.stringify(cleanBandoc),
            beanSettlements: JSON.stringify(cleanSettlements),
            beanSales: JSON.stringify(cleanSale),
            beanHeader: JSON.stringify(cleanHeader)
        };

        me.sendConciliation(searchParamsConciliation, function (response) {
            console.log(response);
            if (response.success) {
                Ext.Msg.alert('Éxito', response.result);

                Ext.Msg.show({
                    title: '✅ Éxito',
                    msg: response.result,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO,
                    modal: true,
                    closable: true,
                    autoClose: false,
                    scope: me,
                    fn: function (btn) {
                        if (btn === 'ok') {
                            me.fetchBandocWMH();
                        }
                    }
                });

            } else {
                Ext.Msg.alert('Error', response.result || 'Error desconocido');
            }
        });

    },
    sendConciliationOld: function (params, callback) {
        let me = this;
        let panel = Ext.getCmp(prototype.id + '-xpanel');
        panel.setLoading(true, 'Cargando liquidaciones...');

        Ext.Ajax.request({
            url: prototype.url + '/executeConciliation',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: params.beanString,
                beanDiscounts: params.beanDiscounts,
                beanBandoc: params.beanBandoc,
                beanHead: params.beanHeader,
                beanSettlements: params.beanSettlements,
                beanSales: params.beanSales
            },

            success: function (response) {
                panel.setLoading(false);
                let res = Ext.JSON.decode(response.responseText);

                if (res.result && res.result.includes("Operation Succefull")) {
                    // Mostrar mensaje persistente
                    Ext.Msg.show({
                        title: '✅ Éxito',
                        msg: 'Operation Successful',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO,
                        modal: true,
                        closable: true,
                        autoClose: false,
                        scope: me,
                        fn: function (btn) {
                            if (btn === 'ok') {
                            }
                        }
                    });

                    me.cleanGridsWMH();
                    me.updateGridTotalWMH();

                } else {
                    global.Msg({msg: res.result});
                    callback && callback(res);
                }
            },

            failure: function () {
                panel.setLoading(false);
                console.error("Error en la petición AJAX");
                global.Msg({msg: "Request failed while sending conciliation data."});
                callback && callback({success: false, result: "Request failed."});
            }
        });
    },
    sendConciliation: async function (params, callback) {
        let panel = Ext.getCmp(prototype.id + '-xpanel');
        panel.setLoading(true);

        try {
            console.log("Comprimiendo settlements...");

            const compressedSettlements = await me.gzipString(params.beanSettlements);
            console.log("Tamaño comprimido:", compressedSettlements.byteLength, "bytes");

            const compressedBase64 = me.arrayBufferToBase64(compressedSettlements);
            console.log("Tamaño Base64:", compressedBase64.length, "caracteres");
            console.log("Ratio compresión:", (params.beanSettlements.length / compressedBase64.length).toFixed(2) + "x");

            Ext.Ajax.request({
                url: prototype.url + '/executeConciliation',
                method: 'POST',
                timeout: 60000000,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                params: {
                    beanString: params.beanString,
                    beanDiscounts: params.beanDiscounts,
                    beanBandoc: params.beanBandoc,
                    beanHead: params.beanHeader,
                    beanSales: params.beanSales,
                    beanSettlementsCompressed: compressedBase64,
                    compression: 'gzip',
                    originalSize: params.beanSettlements.length
                },
                success: function (response) {
                    panel.setLoading(false);
                    let res = Ext.JSON.decode(response.responseText);
                    callback && callback(res);
                },
                failure: function (response) {
                    panel.setLoading(false);
                    console.error("Error en AJAX:", response.status, response.statusText);
                    callback && callback({success: false, result: "Request failed: " + response.statusText});
                }
            });

        } catch (error) {
            panel.setLoading(false);
            console.error("Error comprimiendo:", error);
            callback && callback({success: false, result: "Compression error: " + error.message});
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Cambiar Paneles">
    changeView: function () {
        var seg = Ext.getCmp(prototype.id + '-segViewMode');
        var value = seg.getValue();
        if (value === 0) {
            Ext.getCmp(prototype.id + '-panelModeReview').setVisible(false);
            Ext.getCmp(prototype.id + '-panelModeWork').setVisible(true);
            Ext.getCmp(prototype.id + '-panelGridData').setVisible(true);
            Ext.getCmp(prototype.id + '-panelGridDataReview').setVisible(false);
        } else {
            Ext.getCmp(prototype.id + '-panelModeReview').setVisible(true);
            Ext.getCmp(prototype.id + '-panelModeWork').setVisible(false);
            Ext.getCmp(prototype.id + '-panelGridData').setVisible(false);
            Ext.getCmp(prototype.id + '-panelGridDataReview').setVisible(true);
        }
    },
    // </editor-fold> 

    // <editor-fold defaultstate="collapsed" desc="Exportación Excel">
    exportConciliationToExcel: function () {
        let me = this;

        // Obtener solo registros con check (igual que en executeConciliationWMH)
        let checkedBandoc = me.allBandocRecords.filter(r => me.checkStateWMHBandoc.get(r.RN) === true);
        let checkedSettlements = me.allSettlementRecords.filter(r => me.checkStateWMHSettlements.get(r.RN) === true);
        let checkedDiscounts = me.allDiscountRecords.filter(r => me.checkStateWMHDiscount.get(r.RN) === true);
        let checkedVentas = me.allSaleRecords.filter(r => me.checkStateWMHSale.get(r.RN) === true);
        let checkedHeader = me.allHeaderRecords.filter(r => me.checkStateWMHHeader.get(r.RN) === true);

        // Verificar que haya al menos un registro seleccionado
        const totalChecked = checkedBandoc.length + checkedSettlements.length +
                checkedDiscounts.length + checkedVentas.length +
                checkedHeader.length;

        if (totalChecked === 0) {
            global.Msg({msg: 'No hay registros seleccionados para exportar.'});
            return;
        }

        // Crear objeto con todos los datos chequeados
        const exportData = {
            beanString: JSON.stringify({
                IN_CCUST: Ext.getCmp(prototype.id + '-typeClient').getValue(),
                IN_CODPRO: Ext.getCmp(prototype.id + '-cmbProcessor').getValue(),
                exportType: 'EXCEL'
            }),
            beanBandoc: JSON.stringify(checkedBandoc),
            beanSettlements: JSON.stringify(checkedSettlements),
            beanDiscounts: JSON.stringify(checkedDiscounts),
            beanSales: JSON.stringify(checkedVentas),
            beanHeader: JSON.stringify(checkedHeader)
        };

        // Comprimir settlements si son muchos
        if (exportData.beanSettlements.length > 100000) {
            me.exportConciliationExcelCompressed(exportData);
        } else {
            me.exportConciliationExcelNormal(exportData);
        }
    },
    exportConciliationExcelNormal: function (exportData) {
        let panel = Ext.getCmp(prototype.id + '-xpanel');
        panel.setLoading(true, 'Generando Excel...');

        // Crear formulario temporal para descarga
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = prototype.url + '/exportConciliationExcel';
        form.style.display = 'none';

        // Agregar parámetros como inputs hidden
        const params = {
            beanString: exportData.beanString,
            beanBandoc: exportData.beanBandoc,
            beanSettlements: exportData.beanSettlements,
            beanDiscounts: exportData.beanDiscounts,
            beanSales: exportData.beanSales,
            beanHeader: exportData.beanHeader
        };

        Object.keys(params).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = params[key];
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        panel.setLoading(false);
    },
    exportConciliationExcelCompressed: async function (exportData) {
        let panel = Ext.getCmp(prototype.id + '-xpanel');
        panel.setLoading(true, 'Comprimiendo datos para Excel...');

        try {
            // Comprimir settlements (el más grande)
            const compressedSettlements = await me.gzipString(exportData.beanSettlements);
            const compressedBase64 = me.arrayBufferToBase64(compressedSettlements);

            // Crear formulario
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = prototype.url + '/exportConciliationExcelCompressed';
            form.style.display = 'none';

            const params = {
                beanString: exportData.beanString,
                beanBandoc: exportData.beanBandoc,
                beanSettlementsCompressed: compressedBase64,
                beanDiscounts: exportData.beanDiscounts,
                beanSales: exportData.beanSales,
                beanHeader: exportData.beanHeader,
                compression: 'gzip',
                originalSize: exportData.beanSettlements.length
            };

            Object.keys(params).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = params[key];
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);

            setTimeout(() => {
                panel.setLoading(false);
                document.body.removeChild(form);
            }, 5000);

        } catch (error) {
            panel.setLoading(false);
            console.error("Error comprimiendo para Excel:", error);
            global.Msg({msg: "Error al generar Excel: " + error.message});
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Exportación Excel Review">
    exportConciliationToExcelReview: function () {
        let me = this;

        // Obtener TODOS los registros de las grids del review (sin filtro de check)
        let allBandocReview = me.allBandocRecordsReview || [];
        let allSettlementsReview = me.allSettlementRecordsReview || [];
        let allDiscountsReview = me.allDiscountRecordsReview || [];
        let allVentasReview = me.allSalesRecordsReview || [];
        let allHeaderReview = me.allHeaderRecordsReview || [];

        // Verificar que haya al menos un registro
        const totalRecords = allBandocReview.length + allSettlementsReview.length +
                allDiscountsReview.length + allVentasReview.length +
                allHeaderReview.length;

        if (totalRecords === 0) {
            global.Msg({msg: 'No hay registros para exportar en el review.'});
            return;
        }

        // Crear objeto con todos los datos
        const exportData = {
            beanString: JSON.stringify({
                IN_CCUST: Ext.getCmp(prototype.id + '-typeClientReview').getValue(),
                IN_CODPRO: Ext.getCmp(prototype.id + '-cmbProcessorReview').getValue(),
                exportType: 'EXCEL_REVIEW'
            }),
            beanBandoc: JSON.stringify(allBandocReview),
            beanSettlements: JSON.stringify(allSettlementsReview),
            beanDiscounts: JSON.stringify(allDiscountsReview),
            beanSales: JSON.stringify(allVentasReview),
            beanHeader: JSON.stringify(allHeaderReview)
        };

        // Comprimir settlements si son muchos
        if (exportData.beanSettlements.length > 100000) {
            me.exportConciliationExcelReviewCompressed(exportData);
        } else {
            me.exportConciliationExcelReviewNormal(exportData);
        }
    },
    exportConciliationExcelReviewNormal: function (exportData) {
        let panel = Ext.getCmp(prototype.id + '-xpanel');
        panel.setLoading(true, 'Generando Excel de Review...');

        // Crear formulario temporal para descarga
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = prototype.url + '/exportConciliationExcelReview';
        form.style.display = 'none';

        // Agregar parámetros como inputs hidden
        const params = {
            beanString: exportData.beanString,
            beanBandoc: exportData.beanBandoc,
            beanSettlements: exportData.beanSettlements,
            beanDiscounts: exportData.beanDiscounts,
            beanSales: exportData.beanSales,
            beanHeader: exportData.beanHeader
        };

        Object.keys(params).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = params[key];
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        panel.setLoading(false);
    },
    exportConciliationExcelReviewCompressed: async function (exportData) {
        let panel = Ext.getCmp(prototype.id + '-xpanel');
        panel.setLoading(true, 'Comprimiendo datos para Excel de Review...');

        try {
            // Comprimir settlements (el más grande)
            const compressedSettlements = await me.gzipString(exportData.beanSettlements);
            const compressedBase64 = me.arrayBufferToBase64(compressedSettlements);

            // Crear formulario
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = prototype.url + '/exportConciliationExcelReviewCompressed';
            form.style.display = 'none';

            const params = {
                beanString: exportData.beanString,
                beanBandoc: exportData.beanBandoc,
                beanSettlementsCompressed: compressedBase64,
                beanDiscounts: exportData.beanDiscounts,
                beanSales: exportData.beanSales,
                beanHeader: exportData.beanHeader,
                compression: 'gzip',
                originalSize: exportData.beanSettlements.length
            };

            Object.keys(params).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = params[key];
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);

            setTimeout(() => {
                panel.setLoading(false);
                document.body.removeChild(form);
            }, 5000);

        } catch (error) {
            panel.setLoading(false);
            console.error("Error comprimiendo para Excel Review:", error);
            global.Msg({msg: "Error al generar Excel: " + error.message});
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Exportar Excel">
    btnExcel_click: function (obj, e) {
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
    },
    exportExcel: function () {
        var seg = Ext.getCmp(prototype.id + '-segViewMode');
        var value = seg.getValue();
        if (value === 0) {
            this.exportConciliationToExcel();
        } else {
            this.exportConciliationToExcelReview();
        }
    },
    // </editor-fold> 

    // <editor-fold defaultstate="collapsed" desc="Helpers">
    trimValue: function (value) {
        if (value === null || value === undefined) {
            return '';
        }

        if (value === '') {
            return '';
        }

        let strValue;
        if (typeof value === 'string') {
            strValue = value;
        } else {
            strValue = String(value);
        }

        const trimmed = strValue.trim();
        return trimmed === '' ? '' : trimmed;
    },
    arrayBufferToBase64: function (buffer) {
        const bytes = new Uint8Array(buffer);
        const chunkSize = 0x8000; // 32768 bytes por chunk
        const chunks = [];

        for (let i = 0; i < bytes.length; i += chunkSize) {
            const chunk = bytes.slice(i, i + chunkSize);
            chunks.push(String.fromCharCode.apply(null, chunk));
        }

        return btoa(chunks.join(''));
    },
    arrayBufferToBase64Alt: function (buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;

        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary);
    },
    gzipString: async function (str) {
        const byteArray = new TextEncoder().encode(str);
        const cs = new CompressionStream('gzip');
        const writer = cs.writable.getWriter();
        writer.write(byteArray);
        writer.close();
        const compressed = await new Response(cs.readable).arrayBuffer();
        return compressed;
    },
    btnBack_click: function (obj, e) {
        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
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
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('01');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('01');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbProcessor').setValue('');
        Ext.getCmp(prototype.id + '-cmbStatus').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
        Ext.getCmp(prototype.id + '-txtCodeBank').setValue('');
        Ext.getCmp(prototype.id + '-txtSecuence').setValue('');
        Ext.getCmp(prototype.id + '-txtCardType').setValue('');
    },
    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        var month = this.fecha.getMonth() + 1;
        if (month < 9) {
            obj.setValue('0' + month);
        } else {
            obj.setValue((month));
        }
    },
    pagFirst: function (obj, e) {
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
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
        if (obj.getValue() !== '') {
            Ext.getCmp(prototype.id + '-cmbDateFromDay').setDisabled(false);
        }
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    }
    // </editor-fold>
}
);