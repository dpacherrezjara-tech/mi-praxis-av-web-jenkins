Ext.define('Ext.Praxis.controller.payments.ProcessLogger.ProcessLoggerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessLoggerController',
    url:     CONTEXTPATH + '/ProcessLog',
    urlMisc: CONTEXTPATH + '/MiscellaneousCatalog',
    procesadores: [],

    init: function (view) {
        prototype.id     = 'ProcessLoggerForm';
        prototype.url    = CONTEXTPATH + '/ProcessLog';
        prototype.width  = 1850;
        prototype.height = 630;
        fechaActual = new Date();
        mesActual   = fechaActual.getMonth();
        anioActual  = fechaActual.getFullYear();
    },

    afterRender: async function () {
        await this.loadFilters();
        this.loadGrid();
    },

    loadFilters: async function () {
        const me      = this;
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        filters.setLoading(true);
        try {
            const res    = await global.callStoreGet('PRAXISMP', 'SPMC003', {});
            me.procesadores = res.lstRs.at(0);
            me.admins       = res.lstRs.at(1);
        } catch (e) {
            console.error(e);
        } finally {
            filters.setLoading(false);
        }
    },

    loadGrid: function () {
        const me        = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        const gridId    = prototype.id + '-ProcessLoggerGrid-1';

        let grid = Ext.getCmp(gridId);

        if (!grid) {
            mainPanel.removeAll();
            grid = Ext.create('Ext.Praxis.view.payments.ProcessLoggerForm.Grids.ProcessLoggerGrid', {
                id:          gridId,
                width:       prototype.width,
                height:      prototype.height,
                storeParams: me.formatParams()
            });
            mainPanel.add(grid);
        } else {
            grid.getController().reload(me.formatParams());
        }
    },

    formatParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters');
        if (!formFilters) return {};
        return formFilters.getForm().getValues();
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
        const formFilters = Ext.getCmp(prototype.id + '-formFilters');
        if (formFilters) formFilters.getForm().reset();
    },

    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },

    onClickProcessBtn: function () {
        const me = this;
        const procWin = Ext.create('Ext.Praxis.view.payments.ProcessLoggerForm.DataEntrys.ProcessDataEntry', {
            id:           prototype.id + '-ProcessDataEntry-1',
            procesadores: me.procesadores,
            admins:       me.admins
        });
        procWin.show();
    },

    onClickProcessConcilBtn: function () {
        const me = this;
        const procWin = Ext.create('Ext.Praxis.view.payments.ProcessLoggerForm.DataEntrys.ProcessConciliationDataEntry', {
            id:           prototype.id + '-ProcessConciliationDataEntry-1',
            procesadores: me.procesadores
        });
        procWin.show();
    }
    //</editor-fold>
});
