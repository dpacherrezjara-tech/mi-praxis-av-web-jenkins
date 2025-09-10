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
        const rb = Ext.getCmp(prototype.id + '-viewOption').getValue().opcion;
        if (rb === '1') {
            let params = me.formatParams();
            const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
            mainPanel.removeAll();
            const panelDetail = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.Grids.HeadersGrid', {
                id: prototype.id + '-HeadersGrid-1',
                searchParams: params,
                filters: me.filters
            });
            mainPanel.add(panelDetail);
        } else if (rb === '3') {
            let params = me.formatParamsIntegrator();
            const mainPanel = Ext.getCmp(prototype.id + '-contentIntegrator');
            mainPanel.removeAll();
            const panelDetail = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.Grids.HeaderIntegratorGrid', {
                id: prototype.id + '-HeaderIntegratorGrid-1',
                searchParams: params,
                filters: me.filters
            });
            mainPanel.add(panelDetail);

        } 

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
    },

    formatParamsIntegrator: function () {
        const filters = Ext.getCmp(prototype.id + '-formFiltersIntegrator').getForm();
        return filters.getValues();
    },
    onProcessClick: function () {
        const win = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.DownloadHeadersDataEntry', {
            id: prototype.id + '-DownloadHeadersDataEntry-1'
        });
        win.show();
    },
    onChangeView: function (field, newValue) {
        if (newValue.opcion === '2') {
            Ext.getCmp(prototype.id + '-filterReport').hide();
            Ext.getCmp(prototype.id + '-mainContent').hide();
            Ext.getCmp(prototype.id + '-dayPilotCmp').show();
            Ext.getCmp(prototype.id + '-filterIntegrator').hide();
            Ext.getCmp(prototype.id + '-contentIntegrator').hide();
        } else if (newValue.opcion === '3') {
            Ext.getCmp(prototype.id + '-filterReport').hide();
            Ext.getCmp(prototype.id + '-mainContent').hide();
            Ext.getCmp(prototype.id + '-dayPilotCmp').hide();
            Ext.getCmp(prototype.id + '-filterIntegrator').show();
            Ext.getCmp(prototype.id + '-contentIntegrator').show();

        } else {
            Ext.getCmp(prototype.id + '-filterReport').show();
            Ext.getCmp(prototype.id + '-mainContent').show();
            Ext.getCmp(prototype.id + '-dayPilotCmp').hide();
            Ext.getCmp(prototype.id + '-filterIntegrator').hide();
            Ext.getCmp(prototype.id + '-contentIntegrator').hide();
        }
    },
    
     onChangeDateSTBtn: function (obj) {
        let option = obj.id.split('-').at(-1);

        const from = Ext.getCmp(prototype.id + '-datefieldFromST');
        const to = Ext.getCmp(prototype.id + '-datefieldToST');

        const from2 = Ext.getCmp(prototype.id + '-datefieldFromST2');
        const to2 = Ext.getCmp(prototype.id + '-datefieldToST2');
        const opts = {
            'datefieldFromST': () => {
                to.setValue(from.getValue());
            },
            'datefieldToST': () => {
                if (to.getValue() < from.getValue()) {
                    from.setValue(to.getValue());
                }
            }
        };
        opts[option]();
    }
});