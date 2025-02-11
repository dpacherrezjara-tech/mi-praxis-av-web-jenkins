Ext.define('Ext.Praxis.controller.payments.HeadersReport.HeadersReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HeadersReportController',
    url: CONTEXTPATH + '/HeadersReport',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/HeadersReport',
        timeout: 0
    }),
    requestMisc: axios.create({
        baseURL: CONTEXTPATH + '/MiscellaneousCatalog',
        timeout: 0
    }),
    filters: [],
    init: function (view) {
    },
    afterRender: async function () {
        await this.loadFilters();
        this.onClickSearchBtn();
    },
    loadFilters: async function () {
        const me = this;
        const panelFilter = Ext.getCmp(prototype.id + '-contentFilter');
        panelFilter.setLoading(true);
        try {
            const res = await me.requestMisc.get('loadMdpFilters');
            if (res.status === 200) {
                me.filters = res.data;
                console.log(me.filters);
                const cmbProc = Ext.getCmp(prototype.id + '-cmbCODPRO');
                global.setComboStore(cmbProc, me.filters.PROCESADORES, 'CODE', 'NAME', '');
            }
        } catch (e) {
            console.error(e);
        } finally {
            panelFilter.setLoading(false);
        }
    },
    onClickSearchBtn: function () {
        const me = this;
        let params = me.formatParams();
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const panelDetail = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.Grids.HeadersGrid', {
            id: prototype.id + '-HeadersGrid-1',
            searchParams: params,
            filters: me.filters
        });
        mainPanel.add(panelDetail);
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
        Ext.getCmp(prototype.id + '-formFilters').getForm().reset();
    },
    formatParams: function () {
        const filters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        return filters.getValues();
    }
});