Ext.define('Ext.Praxis.controller.payments.ProcessLogger.ProcessLoggerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessLoggerController',
    url: CONTEXTPATH + '/ProcessLog',
    urlMisc : CONTEXTPATH + '/MiscellaneousCatalog',
    procesadores: [],
    init: function (view) {
        prototype.id = 'ProcessLoggerForm';
        prototype.url = CONTEXTPATH + '/ProcessLog';
        prototype.width = 1850;
        prototype.height = 630;
        fechaActual = new Date(),mesActual = fechaActual.getMonth(),anioActual = fechaActual.getFullYear();
    },
    afterRender: async function () {
        await this.loadFilters();
        this.loadGrid();
    },
    loadFilters: async function () {
        const me = this;
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        filters.setLoading(true);
        try {
            const res = await global.callStoreGet('PRAXISMP','SPMC003',{});
            me.procesadores = res.lstRs.at(0);
            console.log('Procesadores Activos: ',me.procesadores);
        } catch (e) {
            console.error(e);
        } finally {
            filters.setLoading(false);
        }
        
    },
    loadGrid: async function () {
        const me = this;
        let params = me.formatParams();
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const panelDetail = Ext.create('Ext.Praxis.view.payments.ProcessLoggerForm.Grids.ProcessLoggerGrid', {
            id: prototype.id + '-ProcessLoggerGrid-1',
            searchParams: params
        });
        mainPanel.add(panelDetail);
    },
    formatParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        console.log('Search Params: ', formFilters.getValues());
        return formFilters.getValues();
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onClickSearchBtn: function () {
        this.loadGrid();
    },
    onDisplayFilterBtn: function () {
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        if (filters.isVisible()) {
            filters.hide();
        } else {
            filters.show();
        }
    },
    onClearOptionsBtn: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        formFilters.reset();
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
    onClickProcessBtn: function () {
        const me = this;
        const procWin = Ext.create('Ext.Praxis.view.payments.ProcessLoggerForm.DataEntrys.ProcessDataEntry', {
            id: prototype.id + '-ProcessDataEntry-1',
            procesadores: me.procesadores
        });
        procWin.show();
    },
    onClickProcessConcilBtn: function(){
        const me = this;
        const procWin = Ext.create('Ext.Praxis.view.payments.ProcessLoggerForm.DataEntrys.ProcessConciliationDataEntry', {
            id: prototype.id + '-ProcessConciliationDataEntry-1',
            procesadores: me.procesadores
        });
        procWin.show();
    }
    //</editor-fold>
});